/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:29
 * @LastEditTime: 2022-06-13 18:10:20
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/mixins/type/utils.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Vue from 'vue';
import dayjs from 'dayjs';
Vue.mixin({
  methods: {
    suffixOssUrl (url, type = 'ID_CARD_CERTIFICATE') {
      const l = [
        {
          key: 'ID_CARD_CERTIFICATE',
          value: '?x-oss-process=image/auto-orient,1/quality,q_90/watermark,text_5LuF55So5LqO5YKy6Zuq5qOL5bmz5Y-w5a6e5ZCN6K6k6K-B,color_000000,size_30,rotate_31,fill_1,t_29,x_10,y_10'
        }
      ]
      return url + l.find(x => x.key === type).value
    },
    getDayjsObj (v) {
      return dayjs(v);
    },
    blankGet (s, k) {
      if (s instanceof Object) {
        return $_.get(s, k) || '--';
      }
      return s || '--';
    },
    getObjByKey (a, key, value) {
      a = a || [];
      for (let i = 0; i < a.length; i++) {
        if (a[i][key] === value) {
          return a[i];
        }
      }
      return {};
    },
    isObjHasBlank (obj, skipAttr = []) {
      for (let i in obj) {
        if (!obj[i] && !skipAttr.includes(i)) {
          return true;
        }
      }
    },
    getYear (d) {
      return this.$dayjs(d).year();
    },
    getMonth (d) {
      return this.$dayjs(d).month() + 1;
    },
    getServerExceptionMsg (s) {
      if (!s) {
        return '服务端错误~'
      } else {
        const mk = s.split('BizException: ')
        return mk.length === 2 ? mk[1] : s
      }
    },
    isTraceCode (s) {
      let b = false;
      let t = '';
      if (s.indexOf('m.aoxqwl.com/trace/query?qrCode=') > -1) {
        b = true;
        t = s.split('?qrCode=')[1];
      }
      if (s.length === 8 && /^[A-Z][0-9]*/.test(s)) {
        b = true;
        t = s;
      }
      return { b, t };
    },
    isTraceCaptcha (s) {
      let b = false;
      let t = '';
      if (s.length <= 8 && /[0-9]*[A-Z]$/.test(s)) {
        b = true;
        t = s;
      }
      if (s.indexOf('m.aoxqwl.com/trace/query?captcha=') > -1) {
        b = true;
        t = s.split('?captcha=')[1];
      }
      return { b, t };
    },
    isTraceCodeV1 (s) {
      return s.indexOf('aoxueqio2o.com') > -1;
    },
    getUniArr (a) {
      return Array.from(new Set(a));
    },
    reloadPage () {
      window.location.reload();
    },
    getPaymentStrFilter (o) {
      const { paymentIsUseBalance, paymentBalanceAmount, paymentIsUseSixueBalance, paymentSixueBalanceAmount, paymentIsUseGoodsSeriesPrestore, paymentGoodsSeriesPrestoreAmount, paymentWeixinAmount, paymentAlipayAmount, paymentCashAmount,  paymentBankJson } = o || {};
      const paymentBankArr = paymentBankJson ? JSON.parse(paymentBankJson) : [];
      let l = [];
      if (paymentIsUseBalance) {
        l.push(`余额支付：￥${paymentBalanceAmount}`)
      }
      if (paymentIsUseSixueBalance) {
        l.push(`思雪余额支付：￥${paymentSixueBalanceAmount}`)
      }
      if (paymentIsUseGoodsSeriesPrestore && paymentGoodsSeriesPrestoreAmount>0) {
        l.push(`组合支付：￥${paymentGoodsSeriesPrestoreAmount}`)
      }
      if (paymentWeixinAmount) {
        l.push(`微信支付：￥${paymentWeixinAmount}`)
      }
      if (paymentAlipayAmount) {
        l.push(`支付宝支付：￥${paymentAlipayAmount}`)
      }
      if (paymentCashAmount) {
        l.push(`刷卡支付：￥${paymentCashAmount}`)
      }
      if (paymentBankArr.length) {
        paymentBankArr.forEach(i => {
          l.push(`${i.name}：${i.amount}`);
        });
      }
      return l;
    },
    addUpBy (o, p, cb) {
      return this.$_.get(o, p, []).reduce((p, c) => { return p + cb(c) }, 0);
    },
    formatDate (t = '') {
      return this.$dayjs(`${new Date()}`).format("YYYY-MM-DD") + '\xa0' + t
    },
    formatProvince (v) {
      return v.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
    },
    fullAddressSubstring(v) {
      const reg = /.+?(省|市|自治区|自治州|行政区|盟|旗|县|区|乡)/g 
      const area = v.match(reg) 
      if (!area) {
        return v
      }
      let len = 0
      for (let i = 0; i < area.length; i++) { 
        len += area[i].length
      }
      return v.substring(len)
    }
  }
});