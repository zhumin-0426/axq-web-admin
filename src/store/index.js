/*
 * @Author: 码上talk|RC
 * @Date: 2021-04-26 11:40:02
 * @LastEditTime: 2021-09-15 16:46:58
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/store/index.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Vue from 'vue';
import Vuex from 'vuex';

import staff from './staff';
import sys from './sys';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    staff,
    sys
  },
  state: {
    isLogin: false,
    isAdmin: true
  },
  mutations: {
    setIsLogin (state, b) {
      state.isLogin = b;
    },
    setIsAdmin (state, b) {
      state.isAdmin = b;
    }
  },
  actions: {
    appInit ({ dispatch }) {
      $log4js.debug('=============== 🐶 App is started 🥳 ===================');
      dispatch('sys/initWs', { root: true });
    }
  }
});
