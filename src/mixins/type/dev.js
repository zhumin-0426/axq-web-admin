/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:29
 * @LastEditTime: 2021-05-08 11:08:37
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/mixins/type/dev.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Vue from 'vue';
import { Random } from 'mockjs';
Vue.mixin({
  methods: {
    developing () {
      this.$message.warning({
        message: '开发中...'
      });
    },
    getMockImg (text, size = '320x304') {
      const color = Random.color().replace('#', '');
      let httpIMG = `https://dummyimage.com/${size}/${color}/fff`;
      if (text) {
        httpIMG += `?text=${text}`;
      }
      return httpIMG;
    },
    log () {
      console.log(...arguments);
    }
  }
});
