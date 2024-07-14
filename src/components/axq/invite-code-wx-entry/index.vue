<!--
 * @Author: 码上talk|RC
 * @Date: 2021-08-14 10:52:09
 * @LastEditTime: 2021-08-14 11:22:40
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/components/axq/invite-code-wx-entry/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <img :src="inviteCodeWxEntryFinal" alt />
</template>

<script>
import { model } from '@/model';
const { Request } = model;
export default {
  props: ['memberId', 'url'],
  data () {
    return {
      request: new Request(),
      inviteCodeWxEntryFinal: this.url
    }
  },
  created () {
    !this.url && this.request.do('open', 'member', 'inviteCodeWxEntry', { params: { memberId: this.memberId }, data: {} }).then(res => {
      const { status, data } = res;
      if (status) {
        this.inviteCodeWxEntryFinal = data;
      } else {
        this.$message.error('获取会员邀请码失败');
      }
    });
  }
}
</script>