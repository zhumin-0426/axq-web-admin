<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-10 19:56:38
 * @LastEditTime: 2021-12-11 10:11:36
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/goods-series-table/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="goods-series-table">
    <div class="t-unit">
      <span>件</span>
    </div>
    <div class="t-list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column :label="item.name" :key="key" v-for="(item, key) in columns">
          <template slot-scope="props">
            <el-input
              type="number"
              v-model="tableData[props.$index][key].quantity"
              v-if="config.editable"
            ></el-input>
            <span v-else>{{ tableData[props.$index][key].quantity }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Request } from '@/model/request';
export default {
  props: {
    config: {
      type: Object,
      default () {
        return {
          editable: true
        };
      }
    }
  },
  data () {
    return {
      reqeust: new Request(),
      goodsSeries: [],
      tableData: []
    };
  },
  computed: {
    columns () {
      return this.goodsSeries.map(i => {
        return {
          id: i.id,
          name: i.name
        };
      });
    }
  },
  watch: {
    tableData: {
      handler: function (e) {
        this.$emit('change', e[0].map(i => ({ id: i.id, quantity: Number(i.quantity) })));
      },
      deep: true
    }
  },
  methods: {
    getGoodsSeries () {
      this.reqeust.do('open', 'enum', 'lst', { params: { key: 'goodsSeries' }, data: {} }).then(res => {
        const { status, data } = res;
        if (status) {
          this.tableData.push(data.map(i => ({ quantity: 0, id: i.id })));
          this.goodsSeries = data.map(i => ({ id: i.id, name: i.name }));
        } else {
          this.$message({
            message: '获取组合信息错误',
            type: 'error'
          });
        }
      });
    },
    setValue (id, quantity) {
      for (let i = 0; i < this.tableData[0].length; i++) {
        if (this.tableData[0][i].id === id) {
          this.tableData[0][i].quantity = quantity;
          break;
        }
      }
    }
  },
  created () {
    this.getGoodsSeries();
  }
};
</script>

<style lang="less">
.goods-series-table {
  display: flex;
  align-items: center;
  .t-unit {
  }
}
</style>
