/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:29
 * @LastEditTime: 2021-05-29 11:18:50
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/middleware/beforeEach.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import { router } from '@/router';
import { sessionLib } from '@/libs/js/session';
import { store } from '@/store';
import dynamicRoutes from '@/router/routes/dynamic';

router.beforeEach(async (to, from, next) => {
  if (!store.state.sys.isDaynamicRoutesReady) {
    if (!sessionLib.get() && to.path === '/login') {
      next();
      return;
    }
    await store.dispatch('sys/loadStaffAccessRuleList', {});
    next({
      ...to,
      replace: true
    });
  } else {
    if (!to.matched.length) {
      const routes = [];
      dynamicRoutes.forEach(i => {
        i.children && i.children.forEach(j => {
          routes.push({
            path: j.path
          });
        });
      });
      if (routes.map(i => i.path).includes(to.path)) {
        next({ path: '/403' });
        return;
      }
      next({ path: '/404', query: { redirect: to.fullPath } });
      return;
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!sessionLib.get()) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});
