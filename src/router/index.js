/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:30
 * @LastEditTime: 2021-05-08 11:07:50
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/router/index.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import { init } from './routes/init';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: init
});
