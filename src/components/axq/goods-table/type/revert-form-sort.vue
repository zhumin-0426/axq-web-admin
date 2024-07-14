<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-08 14:21:12
 * @LastEditTime: 2021-08-27 09:15:03
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/goods-table/type/revert-form-sort.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div
    class="cell-revert-form_sort"
    :class="{'cell-revert-form_sort--active': Number(value.qualified) > 0 || Number(value.unQualified) > 0}"
  >
    <span v-if="value._extra.disable">--</span>
    <template v-else>
      <input class="s-qualified" v-model="value.qualified" :disabled="cellConfig.qualifiedLock" />
      <input
        class="s-unQualified"
        v-model="value.unQualified"
        :disabled="cellConfig.unQualifiedLock"
      />
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
        qualified: 0,
        unQualified: 0
      }
    };
  },
  computed: {
    qualified () {
      return Number(this.value.qualified);
    },
    unQualified () {
      return Number(this.value.unQualified);
    }
  },
  watch: {
    value: {
      handler: function (e) {
        this.$emit('change', { goodsItems: this.goodsItems, value: e });
      },
      deep: true
    },
    qualified: function (e, eOld) {
      if (this.cellConfig.unQualifiedLock && e - eOld) {
        this.value.unQualified = this.value.unQualified - (e - eOld);
      }
    },
    unQualified: function (e, eOld) {
      if (this.cellConfig.qualifiedLock && e - eOld) {
        this.value.qualified = this.value.qualified - (e - eOld);
      }
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
.cell-revert-form_sort {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
  input {
    display: inline-block;
    width: 30px;
    height: 100%;
    border: none;
    border-radius: 0;
    outline: none;
    text-align: center;
    vertical-align: middle;
  }
  &--active {
    input {
      color: white;
    }
    .s-qualified {
      background: #1890ff;
    }
    .s-unQualified {
      background: #f56c6c;
    }
  }
}
</style>
