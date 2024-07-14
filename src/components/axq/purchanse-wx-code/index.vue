<!--
 * @Author: 码上talk|RC/3189482282@qq.com
 * @Date: 2022-02-19 08:30:09
 * @LastEditTime: 2022-02-19 09:05:00
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/components/axq/purchanse-wx-code/index.vue
-->
<template>
  <img
    class="wx-entry-url"
    style="display: inline-block;"
    :src="wxEntryUrlFinal"
    :width="width"
    :height="height"
    alt
  />
</template>

<script>
import { model } from '@/model';
const { Request } = model;
export default {
  props: ['purchanseId', 'url', 'width', 'height'],
  data () {
    return {
      request: new Request(),
      wxEntryUrlFinal: this.url
    }
  },
  watch: {
    'purchanseId': function (e) {
      e && this.getWxEntryUrl();
    }
  },
  methods: {
    getWxEntryUrl () {
      this.request.do('open', 'purchanse', 'wxEntryUrl', { params: { purchanseId: this.purchanseId }, data: {} }).then(res => {
        const { status, data } = res;
        if (status) {
          this.wxEntryUrlFinal = data;
        } else {
          this.$message.error('获取订单码失败');
        }
      });
    }
  },
  created () {
    !this.url && this.purchanseId && this.getWxEntryUrl();
  }
}
</script>

<style lang="less">
</style>