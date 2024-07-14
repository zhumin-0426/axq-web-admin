<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-20 16:34:09
 * @LastEditTime: 2021-07-20 17:19:24
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/cash-register/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="cash-register">
    <div class="r-type">
      <div class="t-item" :class="{'t-item-active': type === 1}" @click="type = 1">
        <span>收银机列表</span>
      </div>
      <div class="t-item" :class="{'t-item-active': type === 2}" @click="type = 2">
        <span>对面屏管理</span>
      </div>
    </div>
    <div class="r-content">
      <fragment-list v-if="type === 1"></fragment-list>
      <fragment-ext-screen-material v-else></fragment-ext-screen-material>
    </div>
  </div>
</template>

<script>
import fragmentList from './@fragment/list';
import fragmentExtScreenMaterial from './@fragment/ext-screen-material';
export default {
  components: {
    fragmentList,
    fragmentExtScreenMaterial
  },
  data () {
    return {
      type: 1
    };
  }
};
</script>

<style lang="less">
.cash-register {
  .r-type {
    display: flex;
    padding: 0 10px;
    background: white;
    .t-item {
      display: flex;
      align-items: flex-end;
      height: 70px;
      padding: 0 10px;
      span {
        padding: 10px 0;
      }
      &-active {
        position: relative;
        &:after {
          position: absolute;
          content: "";
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: #1890ff;
        }
      }
      &:not(:first-child) {
        margin-left: 20px;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .r-content {
    padding: 20px;
    margin-top: 20px;
    background: white;
  }
}
</style>
