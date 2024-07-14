<!--
 * @Author: 码上talk|RC
 * @Date: 2021-09-19 19:04:05
 * @LastEditTime: 2021-11-08 18:23:19
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/pages/stock/in/minus.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="stock-in-minus">
    <div class="m-scanner">
      <axq-code-scanner
        ref="axqCodeScanner"
        :mode="3"
        required-status="STOCK_IN"
        @ok="scanner.fn.okHandler"
      ></axq-code-scanner>
    </div>
    <div class="m-toolbar">
      <div class="t-left">
        <span>扫码合计：{{list.reduce((p, c) => {return p + c.quantity }, 0)}}</span>
      </div>
      <div class="t-right">
        <el-button-group>
          <el-button type="danger" size="small" @click.native="flush">清空</el-button>
          <el-button type="primary" size="small" @click.native="minus">确认</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="m-table">
      <el-table :data="list" style="width: 100%" max-height="550">
        <el-table-column fixed prop="date" label="序号" width="150">
          <template slot-scope="props">
            <p>{{ props.$index + 1 }}</p>
          </template>
        </el-table-column>
        <el-table-column label="商品">
          <template slot-scope="props">
            <p>{{ props.row.goodsItems.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="规格">
          <template slot-scope="props">
            <p>{{ props.row.goodsItems.specJson2str() }}</p>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="props">
            <p>{{ props.row.quantity }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axqCodeScanner from '@/components/axq/code-scanner';
import TraceLog from '@/utils/traceLog';
import { model } from '@/model';

const {
  StockIn
} = model.collection;
export default {
  components: {
    axqCodeScanner
  },
  data () {
    return {
      traceLog: new TraceLog().setType(8),
      list: [],
      scanner: {
        fn: {
          okHandler: (e) => {
            this.traceLog.add(e, {}, {}).then(res => {
              const { goodsItems } = res;
              const tar = this.$_.find(this.list, x => { return x.goodsItems.id === goodsItems.id });
              if (tar) {
                tar.quantity++;
                return;
              }
              this.list.push({
                goodsItems,
                quantity: 1
              });
            }).catch(e => {
              this.$refs.axqCodeScanner.blur();
              if (e && (e + '').indexOf('TypeError') > -1) {
                e = '数据错误~';
              }
              this.$alert(e, {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            });

          }
        }
      },
    }
  },
  methods: {
    flush () {
      this.$confirm('是否清除当前扫码信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list = [];
        this.traceLog.clear();
      }).catch(() => {
      });
    },
    minus () {
      if (!this.list.length) {
        this.$message.warning('请扫码录入信息');
        return;
      }
      this.$confirm('是否清除扫码列表所有入库数量?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        StockIn.sendApi('stockInMinus', { params: {}, data: this.traceLog.json }).then(res => {
          const { status, data } = res;
          if (status) {
            this.$message.success('清除入库成功');
            this.list = [];
            this.traceLog.clear();
          } else {
            this.$message.error('清除入库失败');
          }
        });
      }).catch(() => {
      });
    }
  }
}
</script>

<style lang="less">
.stock-in-minus {
  padding: 20px;
  background: white;
  .m-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>