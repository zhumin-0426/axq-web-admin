<!--
 * @Author: 码上talk|RC
 * @Date: 2021-06-29 19:58:14
 * @LastEditTime: 2022-03-25 10:30:07
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/input/type/divisor.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="input-divisor">
    <el-input type="text" clearable v-model="val"></el-input>
    <!-- <p v-if="!isValid">仅支持数字/分母表达式：1/3</p> -->
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number]
  },
  data () {
    return {
      val: this.value || 0,
      isValid: true
    };
  },
  watch: {
    value: function (e) {
      this.val = e + '';
    },
    val: function (e) {
      this.$emit('input', e);
      this.isValid = e.isNumber();
      if (this.isValid) {
        let a = 1;
        let b = 1;
        const f = e.split('/');
        if (f.length === 2) {
          a = Number(f[0]);
          b = Number(f[1]);
        } else {
          a = Number(f[0]);
        }
        this.$emit('divisor-value', [a, b]);
      }else {
        this.$message({
          message: '仅支持数字或分母表达式：1/3',
          type: 'warning'
        })
      }
    }
  }
};
</script>

<style lang="less">
.input-divisor {
  position: relative;
  p {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #f56c6c;
  }
}
</style>
