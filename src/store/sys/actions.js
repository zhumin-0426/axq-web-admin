/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:30
 * @LastEditTime: 2021-10-03 15:48:09
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/store/sys/actions.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import { SocketIo } from '@/libs/js/socket';
import * as types from './mutation-types';
import { model } from '@/model';

const { AxqStaff } = model.collection;
const { Request } = model;

export const actions = {
  async loadStaffAccessRuleList ({ dispatch, commit }) {
    const staffInfo = await dispatch('staff/getStaffInfo', {}, { root: true });
    const { isAdmin, accessExtraJson } = staffInfo;
    return new Promise((resolve) => {
      AxqStaff.sendApi('staffAccessRuleList').then(res => {
        const { status, data } = res;
        if (status) {
          const accessRuleIds = data.map(i => i.id);
          commit(types.SET_MENU, { isAdmin, accessRuleIds });
          commit(types.SET_IS_DYNAMIC_ROUTES_READY, { isAdmin, accessRuleIds });
          commit(types.SET_ACCESS_RULE_IDS, accessRuleIds);
          resolve();
        }
      });
    });
  },
  initWs ({ commit }) {
    const socket = new SocketIo();
    socket.listen('connect', () => {
      commit(types.SET_WS_READY, true);
    });
    socket.listen('disconnect', () => {
      commit(types.SET_WS_READY, false);
      $log4js.log('ws client has disconnected from server');
    });
    socket.listen('login-status', msg => {
      socket.emit('join', 'room_admin_public')
      socket.listen('joined', (room,) => {
        if (room === 'room_admin_public') {
          socket.listen('axq-print-status', msg => {
            commit(types.SET_WS_AXQ_PRINT_STATUS, msg);
          });
          socket.listen('sys-app-update', msg => {
            const { isWillUpdate } = msg;
            commit(types.SET_WS_UPDATE_IS_WILL_UPDATE, isWillUpdate);
          });
        }
      });
    });
  },
  getUpdateVersion ({ commit }) {
    const request = new Request();
    request.do('open', 'sys', 'appVersion', { params: { type: 1, version: 'latest' }, data: {} }).then(res => {
      const { status, data } = res;
      if (status) {
        commit(types.SET_WS_UPDATE_VERSION, data);
      }
    });
  }
};
