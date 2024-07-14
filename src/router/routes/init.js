/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:30
 * @LastEditTime: 2021-09-24 15:51:20
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/router/routes/init.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
export const init = [
  {
    name: '/',
    path: '/',
    redirect: '/_developing'
  },
  {
    name: 'default',
    path: '/default',
    component: () => import('@/layout/default/index'),
    children: [
      {
        name: 'login',
        path: '/login',
        meta: {
          title: '登录',
          requiresAuth: false
        },
        component: () => import('@/pages/login')
      },
      {
        name: '404',
        path: '/404',
        meta: {
          title: '404',
          requiresAuth: false
        },
        component: () => import('@/pages/404')
      },
      {
        name: 'versionLog',
        path: '/version-log',
        meta: {
          title: '更新版本',
          requiresAuth: false
        },
        component: () => import('@/pages/version-log')
      },
      {
        name: '_test',
        path: '/_test',
        meta: {
          title: '_test',
          requiresAuth: false
        },
        component: () => import('@/pages/_test')
      }
    ]
  },
  {
    name: 'auth_init',
    path: '/auth_init',
    component: () => import('@/layout/auth/index'),
    children: [
      {
        name: 'index',
        path: '/index',
        redirect: '/_developing',
        meta: {
          title: '首页',
          requiresAuth: true
        },
        component: () => import('@/pages/index')
      },
      {
        name: 'accountProfile',
        path: '/account/profile',
        meta: {
          title: '个人资料',
          requiresAuth: true
        },
        component: () => import('@/pages/account/profile/index')
      },
      {
        name: 'accountSetting',
        path: '/account/setting',
        meta: {
          title: '账户设置',
          requiresAuth: true
        },
        component: () => import('@/pages/account/setting/index')
      },
      {
        name: '403',
        path: '/403',
        meta: {
          title: '403',
          requiresAuth: true
        },
        component: () => import('@/pages/403')
      },
      {
        name: '500',
        path: '/500',
        meta: {
          title: '500',
          requiresAuth: true
        },
        component: () => import('@/pages/500')
      },
      {
        name: '_developing',
        path: '/_developing',
        meta: {
          title: '页面开发中~',
          requiresAuth: false
        },
        component: () => import('@/pages/_developing')
      }
    ]
  }
];
