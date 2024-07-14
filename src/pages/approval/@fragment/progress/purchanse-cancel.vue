<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 11:31:40
 * @LastEditTime: 2022-04-20 09:23:48
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/progress/purchanse-cancel.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="progress progress_purchanse-cancel">
    <div class="p-step">
      <el-steps :active="active - 1" finish-status="success">
        <el-step :title="item" :key="key" v-for="(item, key) in list"></el-step>
      </el-steps>
    </div>
    <div class="p-info">
      <template v-if="approval.status === 3">
        <div class="error">
          <i class="iconfont icon-shibai1"></i>
          <p>审核未通过</p>
          <p>备注：{{ blankGet($_.get(approval.approvalTimelineList, '[0].remark')) }}</p>
          <p>附件：/</p>
        </div>
      </template>
      <template v-else-if="approval.status === 4">
        <div class="error">
          <i class="iconfont icon-shibai1"></i>
          <p>审核已取消</p>
        </div>
      </template>
      <template v-else>
        <div class="b-block">
          <div class="b-item">
            <div class="title">
              <div class="t-left">
                <span style="font-weight: bold;">订单信息：</span>
              </div>
            </div>
            <div class="content content_step1">
              <grid :col="2">
                <grid-item label="已出库：">
                  <span>{{ transferObj.amountStockOut }}元</span>
                </grid-item>
                <grid-item label="未出库：">
                  <span>{{ transferObj.amountNotStockOut }}元</span>
                </grid-item>
              </grid>
            </div>
            <div class="b-item">
              <div class="title">
                <div class="t-left">
                  <span style="font-weight: bold;">转存信息</span>
                </div>
              </div>
              <div class="content">
                <div class="t-item" v-if="!$_.isEmpty(transferJson2GoodsSeries.data)">
                  <div class="i-title">
                    <span>转存组合</span>
                  </div>
                  <div class="i-table">
                    <el-table style="width: 100%" border :data="[transferJson2GoodsSeries.data]">
                      <el-table-column
                        :label="item"
                        :key="key"
                        v-for="(item, key) in transferJson2GoodsSeries.column"
                      >
                        <template slot-scope="props">
                          <p>{{ props.row[item] }}</p>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <div
                  class="t-item"
                  v-if="![6, 7].includes($_.get(approval, `approvalSubCancelPurchanse.purchanse.type`)) && transferObj.goodsItemsNumBoList.length"
                >
                  <div class="i-title">
                    <span>转存余额：￥{{ transferObj.amount | amountFormat}}</span>
                  </div>
                  <div class="i-table">
                    <el-table :data="transferObj.goodsItemsNumBoList" style="width: 100%">
                      <el-table-column label="款号">
                        <template slot-scope="props">
                          <p>{{ props.row.goodsItems.name }}</p>
                        </template>
                      </el-table-column>
                      <el-table-column label="件数">
                        <template slot-scope="props">
                          <p>{{ props.row.quantity }}</p>
                        </template>
                      </el-table-column>
                      <el-table-column label="单价">
                        <template slot-scope="props">
                          <p>{{ props.row.amount }}</p>
                        </template>
                      </el-table-column>
                      <el-table-column label="合计">
                        <template slot-scope="props">
                          <p>{{ props.row.amount * props.row.quantity }}</p>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <div
                  class="t-item"
                  v-if="[6, 7].includes($_.get(approval, `approvalSubCancelPurchanse.purchanse.type`)) && transferObj.goodsItemsNumBoList.length"
                >
                  <div class="i-title">
                    <span>转存思雪余额：￥{{ transferObj.amount | amountFormat}}</span>
                  </div>
                  <div class="i-table">
                    <el-table :data="transferObj.goodsItemsNumBoList" style="width: 100%">
                      <el-table-column label="款号">
                        <template slot-scope="props">
                          <p>{{ props.row.goodsItems.name }}</p>
                        </template>
                      </el-table-column>
                      <el-table-column label="件数">
                        <template slot-scope="props">
                          <p>{{ props.row.quantity }}</p>
                        </template>
                      </el-table-column>
                      <el-table-column label="单价">
                        <template slot-scope="props">
                          <p>{{ props.row.amount }}</p>
                        </template>
                      </el-table-column>
                      <el-table-column label="合计">
                        <template slot-scope="props">
                          <p>{{ props.row.amount * props.row.quantity }}</p>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <div class="t-item">
                  <p style="color: #FF4F4F;">温馨提示：异常订单将未出库产品转存到客户组合和余款；点击转存后系统自动转存，无需手动添加。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import optionsSelector from '@/components/options-selector';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';

import { model } from '@/model';

const {
  Purchanse
} = model.collection;

export default {
  components: {
    optionsSelector,
    grid,
    gridItem
  },
  inject: ['getUniqueTimeline'],
  props: {
    approval: {
      type: Object,
      default () {
        return {
          approvalWorkflowList: [],
          workflowId: -1
        };
      }
    }
  },
  data () {
    return {
      type: Number(this.$route.query.type),
      options: {
        fn: {
          sysBankChangeHandler: () => { }
        }
      }
    };
  },
  computed: {
    list () {
      const total = [];
      const pre = ['创建订单审核'];
      const last = ['已通过'];
      return total.concat(pre).concat(this.approval.approvalWorkflowList.map(i => i.name)).concat(last);
    },
    active () {
      if (this.approval.status === 2) {
        return this.approval.approvalWorkflowList.length + 3;
      }
      return this.approval.approvalWorkflowList.map(i => i.id).indexOf(this.approval.workflowId) + 2;
    },
    transferObj () {
      const j = this.$_.get(this.approval, 'approvalSubCancelPurchanse.purchanse.transferBalanceGoodsSeriesJson');
      return j ? JSON.parse(j) : { goodsSeriesNumBoList: [], goodsItemsNumBoList: [], };
    },
    transferJson2GoodsSeries () {
      const j = this.$_.get(this.approval, 'approvalSubCancelPurchanse.purchanse.transferBalanceGoodsSeriesJson');
      const k = j ? JSON.parse(j) : { goodsSeriesNumBoList: [] };
      const column = [];
      const data = {};
      for (let i = 0; i < k.goodsSeriesNumBoList.length; i++) { 
        const g=k.goodsSeriesNumBoList[i];
        column.push(g.goodsSeriesName);
        data[g.goodsSeriesName]=g.quantity;
      }
      return {
        column,
        data
      };
    }
  }
};
</script>

<style lang="less">
@import url("./less/index.less");
.progress {
  &_purchanse-cancel {
    .p-info {
      .content {
        .t-item {
          margin-top: 20px;
          padding: 0 1.5px;
          .i-title {
            margin-bottom: 10px;
          }
        }
        &_step1 {
          p {
            span {
              padding-left: 20px;
              color: #1890ff;
              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>
