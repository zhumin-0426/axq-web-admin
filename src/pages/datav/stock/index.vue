<!--
 * @Author: 码上talk|RC/3189482282@qq.com
 * @Date: 2021-11-29 08:03:07
 * @LastEditTime: 2021-12-29 11:00:47
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/pages/datav/stock/index.vue
-->
<template>
  <div class="datav">
    <div class="v-type">
      <div class="t-item" :class="{'t-item-active': type === 1}" @click="type = 1">
        <span>库存数据</span>
      </div>
      <div class="t-item" :class="{'t-item-active': type === 2}" @click="type = 2">
        <span>进仓数据</span>
      </div>
      <div class="t-item" :class="{'t-item-active': type === 3}" @click="type = 3">
        <span>出仓数据</span>
      </div>
      <div class="t-item" :class="{'t-item-active': type === 4}" @click="type = 4">
        <span>送货单数据</span>
      </div>
      <div class="t-item" :class="{'t-item-active': type === 5}" @click="type = 5">
        <span>绑码数据</span>
      </div>
    </div>
    <div class="v-content">
      <fragment-stock v-if="type === 1"></fragment-stock>
      <fragment-stock-in v-if="type === 2"></fragment-stock-in>
      <fragment-stock-out v-if="type === 3"></fragment-stock-out>
      <fragment-delivery v-if="type === 4"></fragment-delivery>
      <fragment-bind v-if="type === 5"></fragment-bind>
    </div>
  </div>
</template>

<script>
  import fragmentStock from './@fragment/stock';
  import fragmentStockIn from './@fragment/stock-in';
  import fragmentStockOut from './@fragment/stock-out';
  import fragmentDelivery from './@fragment/delivery';
  import fragmentBind from './@fragment/bind';

  export default {
    components: {
      fragmentStock,
      fragmentStockIn,
      fragmentStockOut,
      fragmentDelivery,
      fragmentBind
    },
    data() {
      return {
        type: 1
      };
    }
  };
</script>

<style lang="less" scoped>
  .datav {
    user-select: none;

    .v-type {
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

    .v-content {
      margin-top: 20px;
    }
  }
</style>