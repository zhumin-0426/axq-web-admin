<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-08 14:21:12
 * @LastEditTime: 2021-10-26 09:32:13
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/goods-table/type/input.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div
    class="cell-input"
    :class="{'cell-input--active': Number(value.quantity) > 0, 'cell-input--error': Number(value.quantity) > Number(value._extra.limit) && !cellConfig.noLimit}"
    @click="_doInputHandler"
  >
    <span v-if="value._extra.disable">--</span>
    <input
      v-model="value.quantity"
      :placeholder="value._extra.limit"
      @blur="_blurHandler"
      :disabled="value._extra.lock"
      v-else
    />
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
          disable: false,
          lock: false,
          limit: 0
        },
        quantity: ''
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
      if (this.value.quantity == 0 && !this.value._extra.disable) {
        this.value.quantity = '';
      }
    },
    _blurHandler () {
      if (!this.value.quantity) {
        this.value.quantity = 0;
      }
    },
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
.cell-input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
  padding: 0 10px;
  input {
    display: inline-block;
    width: 100%;
    border: none;
    outline: none;
    background: none;
    text-align: center;
    vertical-align: middle;
  }
  &--active {
    background: #1890ff;
    input {
      color: white;
    }
  }
  &--error {
    background: #f56c6c;
    input {
      color: white;
    }
  }
}
</style>
