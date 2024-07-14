<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-08 14:21:12
 * @LastEditTime: 2021-08-24 19:12:20
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/goods-table_v2/type/stock-check.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="cell-stock_check" @click="_doInputHandler">
    <template v-if="cellConfig.step === 1">
      <span>{{value.stockSys }}</span>/
      <span style="color: rgb(109, 1, 255);">{{ value.stockFreeze }}</span>
    </template>
    <el-input
      ref="inputStockReal"
      size="mini"
      :min="0"
      :max="10000"
      v-model="value.stockReal"
      @blur="_blurHandler"
      v-if="cellConfig.step === 2"
    ></el-input>
    <span
      :style="{color:  value.stockReal - value.stockSys - value.stockFreeze=== 0 ? '#1890ff' : '#F56C6C'}"
      v-if="cellConfig.step === 3"
    >{{ value.stockReal -value.stockSys - value.stockFreeze }}</span>
  </div>
</template>

<script>
export default {
  props: ['cellConfig'],
  data () {
    return {
      goodsItems: null,
      value: {
        stockFreeze: '',
        stockReal: '',
        stockSys: ''
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
    _doInputHandler () {
      if (this.cellConfig.step !== 2) {
        return;
      }
      if (this.value.stockReal == 0) {
        this.value.stockReal = '';
      }
      this.$nextTick(() => {
        this.$refs.inputStockReal.focus();
      });
    },
    _blurHandler () {
      if (!this.value.stockReal) {
        this.value.stockReal = 0;
      }
    },
    setValue (gi, v) {
      this.goodsItems = gi;
      for (let i in this.value) {
        this.value[i] = v[i];
      }
    }
  }
};
</script>

<style lang="less">
.cell-stock_check {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  input {
    display: inline-block;
    width: 100%;
    border: none;
    outline: none;
    background: none;
    text-align: center;
    vertical-align: middle;
  }
}
</style>
