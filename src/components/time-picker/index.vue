<!--
 * @Author: 码上talk|RC
 * @Date: 2021-06-19 16:44:22
 * @LastEditTime: 2022-03-10 15:07:18
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/time-picker/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="time-picker">
    <el-date-picker
      class="time-picker-select"
      v-model="value"
      :type="type"
      size="small"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default() {
        return "daterange";
      },
    },
    data: [Array, String],
    noValue: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      value: this.noValue ? "" : this.data || $dayjs(),
    };
  },
  watch: {
    value: function (e) {
      this.$emit(
        "change",
        e
          ? Array.isArray(e)
            ? e.map((i) => this.$dayjs(i).format("YYYY-MM-DD"))
            : this.$dayjs(e).format("YYYY-MM-DD")
          : this.type === "daterange"
          ? []
          : ""
      );
    },
  },
  methods: {
    reset() {
      this.value = this.type === "daterange" ? [] : "";
    },
  },
};
</script>

<style lang="less" scoped>
.time-picker {
  width: 100%;
  .time-picker-select {
    width: 100%;
  }
}
</style>
