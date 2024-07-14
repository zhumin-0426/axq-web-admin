/*
 * @Author: 码上talk|RC
 * @Date: 2021-04-26 21:12:46
 * @LastEditTime: 2022-06-05 13:40:26
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/mixins/type/filter.js
 * Just do what I think it is right
 */
import Vue from 'vue';

import dayjs from 'dayjs';
import { appConfig } from '@/config/app'
var currency = require('currency.js')

Vue.mixin({
  filters: {
    prefixOssUrl (val) {
      return appConfig.staticUrl + val
    },
    suffixOssUrl (url, type = 'ID_CARD_CERTIFICATE') {
      const l = [
        {
          key: 'ID_CARD_CERTIFICATE',
          value: '?x-oss-process=image/auto-orient,1/quality,q_90/watermark,text_5LuF55So5LqO5YKy6Zuq5qOL5bmz5Y-w5a6e5ZCN6K6k6K-B,color_000000,size_30,rotate_31,fill_1,t_29,x_10,y_10'
        }
      ]
      return url + l.find(x => x.key === type ).value
    },
    timeFormat (d, f = 'YYYY-MM-DD HH:mm') {
      if (!d) {
        return '2019-01-01 00:00';
      }
      return dayjs(d).format(f);
    },
    amountFormat (number, decimals = 2, thousands_sep = '', coin_symbol='') {
      /*
      * 参数说明：
      * number：要格式化的数字
      * decimals：保留几位小数
      * thousands_sep：千分位符号
      * coin_symbol：货币符号
      * */
      return currency(number, { precision: decimals, separator: thousands_sep, symbol: coin_symbol}).format();
    },
    addUp (a, key) {
      if (!Array.isArray(a)) {
        return 0;
      }
      let n = 0;
      a.forEach(i => {
        n = n + Number(i[key]);
      });
      return n;
    },
    boolean2str (b) {
      return b ? '是' : '否';
    },
    customizeOptionFilter (key, options, noneStr = '/') {
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === key) {
          return options[i].label || noneStr;
        }
      }
      return noneStr;
    },
    paymentBankFilter (arr) {
      const len = arr.toParse().length - 1;
      return arr.toParse().reduce((p, c, index) => {
        if (len !== index) {
          return p + `${c.name}/￥${c.amount}` + '/';
        } else {
          return p + `${c.name}/￥${c.amount}`;
        }
      }, '');
    },
    divisorFilter (arr) {
      if (!Array.isArray(arr) || arr.length !== 2 || !arr[0] || !arr[1]) {
        return '/';
      }
      return arr[1] === 1 ? arr[0] : `${arr[0]}/${arr[1]}`;
    },
    dopStatusFilter (s) {
      const l = [
        {
          key: 'GOT',
          name: '开单'
        },
        {
          key: 'DEPARTURE',
          name: '出站'
        },
        {
          key: 'ARRIVAL',
          name: '进站'
        },
        {
          key: 'ADVANCE_DELIVERY',
          name: '预派送'
        },
        {
          key: 'SENT_SCAN',
          name: '派送'
        },
        {
          key: 'ERROR',
          name: '滞留,延时派送'
        },
        {
          key: 'FAILED',
          name: '客户拒签/运单作废'
        },
        {
          key: 'SIGNED',
          name: '签收'
        },
        {
          key: 'BACK_SIGNED',
          name: '退回件签收'
        },
        {
          key: 'OPERATETRACK',
          name: '转寄'
        },
        {
          key: 'STA_INBOUND',
          name: '快递员入柜'
        },
        {
          key: 'STA_SIGN',
          name: '用户提货（快递柜签收）'
        },
      ];
      const tar = $_.find(l, x => { return x.key === s });
      return tar ? tar.name : '未知状态';
    },
    playmentTypeFilter(s) {
      if(s===1) return '支付宝'
      if(s===2) return '微信'
      if(s===3) return '银行卡'
      if(s===4) return '现金'
    },
    validtimeFilter(t) {
     return dayjs().isBefore(t) ? '有效' : '无效';
    },
    signStatusFilter(v) {
      if (v === 1)  {
        return '保存' 
      }
      if (v === 2) {
        return '待签署'
      } 
      if (v === 3) {
        return '已签署'
      } 
    },
    getAchieveTime(v){
      let achieveAllocateJson = $_.get(v, "achieveAllocateJson"), list = void 0;
      if(typeof achieveAllocateJson === 'string'){
        list = JSON.parse(achieveAllocateJson);
      }else{
        list = achieveAllocateJson || [];
      }
      return list.length ? `${list[0].year}年${list[0].month}月` : dayjs($_.get(v, "achieveTime")).format('YYYY-MM')
    }
  }
});

