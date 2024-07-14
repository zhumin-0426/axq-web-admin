<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-08 14:21:12
 * @LastEditTime: 2022-02-12 13:34:30
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/goods-table/type/text.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div
    class="cell-text"
    :class="{'cell-text--active': value.quantity > 0}"
    :style="{background: Number(value.quantity) > 0 ? $_.get(cellConfig, 'activeStyle.background') : null}"
  >
    <span
      :style="{color: Number(value.quantity) > 0 ? $_.get(cellConfig, 'activeStyle.color') : null}"
    >{{value.quantity}}</span>
  </div>
</template>

<script>
export default {
  props: ['cellConfig'],
  data () {
    return {
      goodsItems: null,
      value: {
        _extra: {
          stockFreeze: 0,
          stock: 0
        },
        quantity: 0
      }
    };
  },
  watch: {
    value: {
      handler: function (e) {
        this.$emit('change', { goodsItems: this.goodsItems, value: e });
      },
      deep: true
    }
  },
  methods: {
    setValue (gi, v) {
      this.goodsItems = gi;
      for (let i in this.value) {
        if (i === '_extra') {
          for (let j in this.value._extra) {
            this.value._extra[j] = this.$_.get(v[i], j);
          }
          continue;
        }
        this.value[i] = v[i];
      }
    }
  }
};
</script>

<style lang="less">
.cell-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  &--active {
    background: #1890ff;
    span {
      color: white;
    }
  }
}
</style>
