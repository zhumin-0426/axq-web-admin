<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-20 16:34:09
 * @LastEditTime: 2021-11-06 09:53:12
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/ma/live/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="ma-live">
    <div class="l-type">
      <div class="t-item" :class="{'t-item-active': type === 1}" @click="type = 1">
        <span>直播间</span>
      </div>
      <div class="t-item" :class="{'t-item-active': type === 2}" @click="type = 2">
        <span>录播列表</span>
      </div>
    </div>
    <div class="l-content">
      <fragment-room-list v-if="type === 1"></fragment-room-list>
      <fragment-record-list v-else></fragment-record-list>
    </div>
  </div>
</template>

<script>
import fragmentRoomList from './@fragment/room-list';
import fragmentRecordList from './@fragment/record-list';
export default {
  components: {
    fragmentRoomList,
    fragmentRecordList
  },
  data () {
    return {
      type: 1
    };
  }
};
</script>

<style lang="less">
.ma-live {
  .l-type {
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
  .l-content {
    padding: 20px;
    margin-top: 20px;
    background: white;
  }
}
</style>
