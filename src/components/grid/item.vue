<!--
 * @Author: 码上talk|RC
 * @Date: 2021-06-22 19:01:02
 * @LastEditTime: 2022-05-05 16:39:49
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/grid/item.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="grid-item">
    <div class="i-label">
      {{ label }}
    </div>
    <div class="i-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default () {
        return '';
      }
    }
  }
};
</script>

<style lang="less">
.grid-item {
  display: flex;
  align-items: center;
  .i-label {
    white-space: nowrap;
  }
}
</style>
