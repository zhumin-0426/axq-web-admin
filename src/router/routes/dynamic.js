/*
 * @Author: 码上talk|RC
 * @Date: 2021-04-26 11:40:02
 * @LastEditTime: 2022-03-10 10:32:45
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/router/routes/dynamic.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

const dynamic = [
  {
    name: 'auth_dynamic',
    path: '/auth_dynamic',
    component: () => import('@/layout/auth/index'),
    children: [
      {
        name: 'goodsList',
        path: '/goods/list',
        meta: {
          title: '商品列表',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/goods/list')
      },
      {
        name: 'goodsAdd',
        path: '/goods/add',
        meta: {
          title: '商品添加',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/goods/add')
      },
      {
        name: 'goodsUpdate',
        path: '/goods/update/:id',
        meta: {
          title: '商品更新',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/goods/update')
      },
      {
        name: 'goodsInfo',
        path: '/goods/:id',
        meta: {
          title: '商品详情',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/goods/_id')
      },
      {
        name: 'goodsCategory',
        path: '/goods-category/list',
        meta: {
          title: '分类列表',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/goods/category/list')
      },
      {
        name: 'goodsSpec',
        path: '/goods-sepc-category/list',
        meta: {
          title: '规格分类',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/goods/spec/category-list')
      },
      {
        name: 'goodsSeries',
        path: '/goods-series/list',
        meta: {
          title: '组合管理',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/goods/series/list')
      },
      {
        name: 'approvalList',
        path: '/approval/list',
        meta: {
          title: '审批',
          requiresAuth: true,
          accessRuleId: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 54, 59]
        },
        component: () => import('@/pages/approval/list')
      },
      {
        name: 'approvalInfo',
        path: '/approval/:id',
        meta: {
          title: '审批详情',
          requiresAuth: true,
          accessRuleId: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 54]
        },
        component: () => import('@/pages/approval/_id')
      },
      {
        name: 'approvalTypeList',
        path: '/approval-type/list',
        meta: {
          title: '审批分类',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/approval/type/list')
      },
      {
        name: 'stockDeliveryList',
        path: '/stock-delivery/list',
        meta: {
          title: '送货列表',
          requiresAuth: true,
          accessRuleId: [53]
        },
        component: () => import('@/pages/stock/delivery/list')
      },
      {
        name: 'stockDeliveryAdd',
        path: '/stock-delivery/add',
        meta: {
          title: '送货单添加',
          requiresAuth: true,
          accessRuleId: [53]
        },
        component: () => import('@/pages/stock/delivery/add')
      },
      {
        name: 'stockInList',
        path: '/stock-in/list',
        meta: {
          title: '入库列表',
          requiresAuth: true,
          accessRuleId: [42]
        },
        component: () => import('@/pages/stock/in/list')
      },
      {
        name: 'stockInAdd',
        path: '/stock-in/add',
        meta: {
          title: '入库添加',
          requiresAuth: true,
          accessRuleId: [42]
        },
        component: () => import('@/pages/stock/in/add')
      },
      {
        name: 'stockInMinus',
        path: '/stock-in/minus',
        meta: {
          title: '入库清除',
          requiresAuth: true,
          accessRuleId: [52]
        },
        component: () => import('@/pages/stock/in/minus')
      },
      {
        name: 'stockOutList',
        path: '/stock-out/list',
        meta: {
          title: '出库列表',
          requiresAuth: true,
          accessRuleId: [43]
        },
        component: () => import('@/pages/stock/out/list')
      },
      {
        name: 'stockOutAdd',
        path: '/stock-out/add',
        meta: {
          title: '出库添加',
          requiresAuth: true,
          accessRuleId: [43]
        },
        component: () => import('@/pages/stock/out/add')
      },
      {
        name: 'stockCheckList',
        path: '/stock-check/list',
        meta: {
          title: '盘点记录',
          requiresAuth: true,
          accessRuleId: [44]
        },
        component: () => import('@/pages/stock/check/list')
      },
      {
        name: 'stockCheckAdd',
        path: '/stock-check/add',
        meta: {
          title: '盘点添加',
          requiresAuth: true,
          accessRuleId: [44]
        },
        component: () => import('@/pages/stock/check/add')
      },
      {
        name: 'revertFormList',
        path: '/revert-form/list',
        meta: {
          title: '调换货单列表',
          requiresAuth: true,
          accessRuleId: [45]
        },
        component: () => import('@/pages/revert/form/list')
      },
      {
        name: 'revertFormAdd',
        path: '/revert-form/Add',
        meta: {
          title: '调换货单添加',
          requiresAuth: true,
          accessRuleId: [45]
        },
        component: () => import('@/pages/revert/form/add')
      },
      {
        name: 'revertFormSort',
        path: '/revert-form/sort/:id',
        meta: {
          title: '调换货单分拣',
          requiresAuth: true,
          accessRuleId: [45]
        },
        component: () => import('@/pages/revert/form/sort')
      },
      {
        name: 'stockQuery',
        path: '/stock/query',
        meta: {
          title: '库存查询',
          requiresAuth: true,
          accessRuleId: [51]
        },
        component: () => import('@/pages/stock/query/index')
      },
      {
        name: 'purchanseList',
        path: '/purchanse/list',
        meta: {
          title: '订单列表',
          requiresAuth: true,
          accessRuleId: [2, 3, 4, 5]
        },
        component: () => import('@/pages/purchanse/list')
      },
      {
        name: 'purchanseUnstockoutList',
        path: '/purchanse-unstockout/list',
        meta: {
          title: '待出库单',
          requiresAuth: true,
          accessRuleId: [43]
        },
        component: () => import('@/pages/purchanse/unstockout/list')
      },
      {
        name: 'purchanseAdd',
        path: '/purchanse/add',
        meta: {
          title: '订单添加',
          requiresAuth: true,
          accessRuleId: [2, 3, 4, 5]
        },
        component: () => import('@/pages/purchanse/add')
      },
      {
        name: 'purchanseUpdate',
        path: '/purchanse/update/:id',
        meta: {
          title: '订单更新',
          requiresAuth: true,
          accessRuleId: [2, 3, 4, 5]
        },
        component: () => import('@/pages/purchanse/update')
      },
      {
        name: 'purchanseInfo',
        path: '/purchanse/:id',
        meta: {
          title: '订单详情',
          requiresAuth: true,
          accessRuleId: [2, 3, 4, 5, 11, 43]
        },
        component: () => import('@/pages/purchanse/_id')
      },
      {
        name: 'memberList',
        path: '/member/list',
        meta: {
          title: '会员列表',
          requiresAuth: true,
          accessRuleId: [31, 32]
        },
        component: () => import('@/pages/member/list')
      },
      {
        name: 'memberInfo',
        path: '/member/:id',
        meta: {
          title: '会员详情',
          requiresAuth: true,
          accessRuleId: [31, 32]
        },
        component: () => import('@/pages/member/_id')
      },
      {
        name: 'memberTransferList',
        path: '/member-transfer/list',
        meta: {
          title: '挪动记录',
          requiresAuth: true,
          accessRuleId: [31, 32]
        },
        component: () => import('@/pages/member/transfer/list')
      },
      {
        name: 'memberTransferAdd',
        path: '/member-transfer/add',
        meta: {
          title: '团队挪动',
          requiresAuth: true,
          accessRuleId: [31, 32]
        },
        component: () => import('@/pages/member/transfer/add')
      },
      {
        name: 'memberRelate',
        path: '/member-chain',
        meta: {
          title: '会员关系',
          requiresAuth: true,
          accessRuleId: [31, 32]
        },
        component: () => import('@/pages/member/chain')
      },
      {
        name: 'shopList',
        path: '/shop/list',
        meta: {
          title: '店铺列表',
          requiresAuth: true,
          accessRuleId: [34, 35]
        },
        component: () => import('@/pages/shop/list')
      },
      {
        name: 'cashRegister',
        path: '/cash-register',
        meta: {
          title: '收银管理',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/cash-register')
      },
      {
        name: 'shopInfo',
        path: '/shop/:id',
        meta: {
          title: '店铺详情',
          requiresAuth: true,
          accessRuleId: [34, 35]
        },
        component: () => import('@/pages/shop/_id')
      },
      {
        name: 'regionAllocateList',
        path: '/region-allocate/list',
        meta: {
          title: '区域列表',
          requiresAuth: true,
          accessRuleId: [50]
        },
        component: () => import('@/pages/region/allocate/list')
      },
      {
        name: 'traceBatchList',
        path: '/trace-batch/list',
        meta: {
          title: '生成批次',
          requiresAuth: true,
          accessRuleId: [37]
        },
        component: () => import('@/pages/trace/batch-list')
      },
      {
        name: 'traceBind',
        path: '/trace/bind',
        meta: {
          title: '防伪绑定',
          requiresAuth: true,
          accessRuleId: [38]
        },
        component: () => import('@/pages/trace/bind')
      },
      {
        name: 'traceQuery',
        path: '/trace/query',
        meta: {
          title: '溯源查询',
          requiresAuth: true,
          accessRuleId: [39]
        },
        component: () => import('@/pages/trace/query')
      },
      {
        name: 'traceFlush',
        path: '/trace/flush',
        meta: {
          title: '清除溯源',
          requiresAuth: true,
          accessRuleId: [40]
        },
        component: () => import('@/pages/trace/flush')
      },
      {
        name: 'datavStock',
        path: '/datav/stock',
        meta: {
          title: '仓库数据',
          requiresAuth: true,
          accessRuleId: [55]
        },
        component: () => import('@/pages/datav/stock/index')
      },
      {
        name: 'datavStock',
        path: '/datav/region-shop',
        meta: {
          title: '区域数据',
          requiresAuth: true,
          accessRuleId: [57]
        },
        component: () => import('@/pages/datav/region-shop/index')
      },
      {
        name: 'couponList',
        path: '/coupon/list',
        meta: {
          title: '代金券列表',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/coupon/list')
      },
      {
        name: 'activityTypeList',
        path: '/activity-type/list',
        meta: {
          title: '活动类型',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/activity/type/list')
      },
      {
        name: 'maBannerList',
        path: '/ma-banner/list',
        meta: {
          title: '小程序轮播图',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/ma/banner/list')
      },
      {
        name: 'maLive',
        path: '/ma-live/index',
        meta: {
          title: '直播管理',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/ma/live/index')
      },
      {
        name: 'axqVideo',
        path: '/axq-video/list',
        meta: {
          title: '视频列表',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/video/list')
      },
      {
        name: 'axqNotice',
        path: '/axq-notice/list',
        meta: {
          title: '通知列表',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/notice/list')
      },
      {
        name: 'axqArticle',
        path: '/axq-article/list',
        meta: {
          title: '报道列表',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/article/list')
      },
      {
        name: 'axqDevelopTimeline',
        path: '/axq-develop-timeline/list',
        meta: {
          title: '发展历程',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/develop-timeline/list')
      },
      {
        name: 'axqIntroduce',
        path: '/axq-introduce',
        meta: {
          title: '企业介绍',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/introduce/default')
      },
      {
        name: 'axqMaterialList',
        path: '/axq-material/list',
        meta: {
          title: '素材管理',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/material/list')
      },
      {
        name: 'axqEmployedLaborerList',
        path: '/axq-self-employed-laborer/list',
        meta: {
          title: '个体户',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/self-employed-laborer/list')
      },
      {
        name: 'axqFeedbackList',
        path: '/axq-feedback/list',
        meta: {
          title: '意见反馈',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/feedback/list')
      },
      {
        name: 'axqDeptList',
        path: '/axq-dept/list',
        meta: {
          title: '部门列表',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/dept/list')
      },
      {
        name: 'axqJobList',
        path: '/axq-job/list',
        meta: {
          title: '职位列表',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/job/list')
      },
      {
        name: 'axqStaffList',
        path: '/axq-staff/list',
        meta: {
          title: '职员列表',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/staff/list')
      },
      {
        name: 'axqAccessRuleList',
        path: '/axq-access-rule/list',
        meta: {
          title: '权限列表',
          requiresAuth: true,
          accessRuleId: 9999
        },
        component: () => import('@/pages/axq/access-rule/list')
      },
      {
        name: 'sysBankList',
        path: '/sys-bank/list',
        meta: {
          title: '收款银行',
          requiresAuth: true,
          accessRuleId: [48]
        },
        component: () => import('@/pages/sys/bank/list')
      },
      {
        name: 'sysExpressList',
        path: '/sys-express/list',
        meta: {
          title: '物流列表',
          requiresAuth: true,
          accessRuleId: [47]
        },
        component: () => import('@/pages/sys/express/list')
      },
      {
        name: 'sysPrintTask',
        path: '/sys-print-task',
        meta: {
          title: '打印服务',
          requiresAuth: true,
          accessRuleId: [49]
        },
        component: () => import('@/pages/sys/print-task')
      }
    ]
  }
];

export default dynamic;
