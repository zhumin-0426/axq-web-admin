/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:30
 * @LastEditTime: 2021-09-08 18:15:29
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/store/staff/actions.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import * as types from './mutation-types';
import { sessionLib } from '@/libs/js/session';
import { model } from '@/model';

const { AxqStaff } = model.collection;

export const actions = {
  getStaffInfo ({ commit }) {
    return new Promise((resolve) => {
      AxqStaff.sendApi('staffInfo').then(res => {
        const { status, data } = res;
        if (status) {
          const { isAdmin } = data;
          commit(types.SET_INFO, new AxqStaff(data));
          commit('setIsLogin', true, { root: true });
          commit('setIsAdmin', !!isAdmin, { root: true });
          resolve(data);
        }
      });
    });
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      AxqStaff.sendApi('staffLogout').then(res => {
        const { status } = res;
        if (status) {
          sessionLib.clear();
          commit(types.SET_INFO, new AxqStaff());
          commit('setIsLogin', false, { root: true });
          resolve();
        } else {
          reject(new Error('staffLogout'));
        }
      });
    });
  }
};
