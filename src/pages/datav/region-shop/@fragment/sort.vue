<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-19 11:48:47
 * @LastEditTime: 2022-01-07 09:33:33
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/datav/region-shop/@fragment/sort.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->

<template>
  <div class="sort">
    <div class="s-main" @click="toggleSort()">
      <div class="m-label">{{ label }}</div>
      <div class="m-icon">
        <i class="iconfont icon-xiangshangbeifen up" :class="{ active: sort === 'asc' }"></i>
        <i class="iconfont icon-xiangxia down" :class="{ active: sort === 'desc' }"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      label: String,
    },
    data() {
      return {
        sort: ''
      };
    },
    methods: {
      toggleSort() {
        if (this.sort === 'asc') {
          this.sort = 'desc';
        } else {
          this.sort = 'asc';
        }
        this.$emit('toggleSort', this.sort)
      }
    }
  };
</script>

<style lang="less">
  .sort {
    width: 100%;

    .s-main {
      display: flex;
      align-items: center;

      .m-lable {
        padding-right: 20px;
      }

      .m-icon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 10px;
        width: 20px;
        height: 20px;

        .up,
        .down {
          width: 8px;
          height: 8px;
          font-size: 12px;
          color: #9a999c;
        }


        .active {
          color: #1890ff;
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>