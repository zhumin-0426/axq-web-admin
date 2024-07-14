/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:28
 * @LastEditTime: 2022-02-21 15:29:10
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/main.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Vue from 'vue';
import App from './App.vue';
import ElementUI, { Message } from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import '@/libs/js/prototype';
import { router } from './router';
import { store } from './store';
import { layout } from './layout';
import './middleware/beforeEach';
import './middleware/afterEach';
import './mixins';
import './directives';
import './assets/styles/var.less';
import './assets/styles/page.less';
import './assets/styles/popup.less';
import './assets/styles/info-preview.less';
import './assets/styles/info-base.less';
import './assets/styles/form-table.less';
import './assets/styles/normalize.less';
import './assets/fonts/iconfont.less';
import VueClipboard from 'vue-clipboard2';
import amap from '@/libs/amap';
import { Log4js } from '@/utils/log4js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import * as echarts from 'echarts';
const _ = require('lodash');

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);


Vue.use(ElementUI);
Vue.use(layout);
Vue.use(amap, {
  ak: 'd0903fb92c5b625f7714e2c10376f626',
  version: '2.0'
});
Vue.use(VueClipboard);
Vue.config.productionTip = false;
Vue.$_ = Vue.prototype.$_ = window.$_ = _;
Vue.$Message = Vue.prototype.$Message = window.$Message = Message;
Vue.$dayjs = Vue.prototype.$dayjs = window.$dayjs = dayjs;
Vue.$log4js = Vue.prototype.$log4js = window.$log4js = new Log4js();
Vue.$echarts = Vue.prototype.$echarts = echarts;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
