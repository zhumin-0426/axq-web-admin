<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-08 14:21:12
 * @LastEditTime: 2021-10-27 08:48:20
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/goods-table/type/stock-delivery.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div
    class="cell--stock-delivery"
    :class="{'cell-stock-delivery--active': value.quantity !== value.quantityHasStockIn}"
  >
    <span v-if="value._extra.disable">--</span>
    <template v-else>
      <span>{{value.quantity}}/</span>
      <span>{{value.quantityHasStockIn}}</span>
    </template>
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
          disable: false
        },
        quantity: 0,
        quantityHasStockIn: 0
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
.cell-stock-delivery {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  &--active {
    background: #f56c6c;
    span {
      color: white;
    }
  }
}
</style>
