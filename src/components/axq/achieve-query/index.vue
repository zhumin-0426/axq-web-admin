<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-08 09:00:03
 * @LastEditTime: 2021-06-08 17:00:43
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/achieve-query/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="achieve-query">
    <div class="q-toolbar">
      <div class="t-left">
        <span>业绩查询</span>
        <el-date-picker
          type="year"
          placeholder="选择年"
          size="small"
          style="width: 203px; margin: 0 20px"
          v-model="value"
          @change="changeHandler"
        ></el-date-picker>
        <el-button type="primary" size="small" @click="changeHandler">查询</el-button>
      </div>
    </div>
    <div class="q-table">
      <el-table :data="achieveMonthly" style="width: 100%;" border>
        <el-table-column :label="`${item}月`" width="55px" :key="key" v-for="(item, key) in month">
          <template slot-scope="props">
            <p>
              {{
              achieveMonthly[props.$index][key].achieve
              ? achieveMonthly[props.$index][key].achieve
              : "0"
              }}
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { model } from '@/model';
const { Member } = model.collection;
export default {
  props: ['memberId'],
  data () {
    return {
      value: this.$dayjs(),
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      achieve: []
    };
  },
  computed: {
    achieveMonthly () {
      const h = [];
      const l = [];
      const fullMonth = this.month.map(z => `${this.$dayjs(this.value).format('YYYY')}-${z}`);
      for (let i = 0; i < fullMonth.length; i++) {
        let ok = false;
        for (let j = 0; j < this.achieve.length; j++) {
          if (fullMonth[i] === this.$dayjs(`${this.achieve[j].year}-${this.achieve[j].month}`).format('YYYY-M')) {
            l.push({
              achieve: this.achieve[j].integral
            });
            ok = true;
            break;
          }
        }
        if (ok) {
          continue;
        }
        l.push({
          achieve: 0
        });
      }
      h.push(l);
      return h;
    }
  },
  watch: {
    memberId: function () {
      this.changeHandler();
    }
  },
  methods: {
    changeHandler (e) {
      this.getDistributorAchieve();
    },
    getDistributorAchieve () {
      Member.sendApi('achieveList', { params: {}, data: { query: { memberId: this.memberId, year: this.$dayjs(this.value).format('YYYY') } } }).then(res => {
        const { status, data } = res;
        if (status) {
          this.achieve = data;
        } else {
          this.$message({
            message: '获取店主业绩信息错误',
            type: 'warning'
          });
        }
      });
    }
  },
  created () {
    this.getDistributorAchieve();
  }
};
</script>

<style lang="less">
.achieve-query {
  .q-toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 22px;
  }
}
</style>
