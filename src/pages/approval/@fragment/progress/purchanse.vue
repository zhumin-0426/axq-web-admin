<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 11:31:40
 * @LastEditTime: 2022-04-18 14:26:50
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/progress/purchanse.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="progress progress_purchanse">
    <div class="p-step">
      <el-steps :active="active - 1" finish-status="success">
        <el-step :title="item" :key="key" v-for="(item, key) in list"></el-step>
      </el-steps>
    </div>
    <div class="p-info">
      <template v-if="approval.status === 1 || approval.status === 2">
        <div class="block">
          <div class="b-title">
            <span>订单信息</span>
          </div>
          <div class="content content_step1">
            <grid :col="3">
              <grid-item label="订单编号：">
                <span>{{ purchanse.sn }}</span>
              </grid-item>
              <grid-item label="代理名称：" v-if="approval.typeId !==7">
                <template v-if="[3,4,5,12,13].includes(approval.typeId)">
                    <span>{{ purchanse.member.nickname }}/{{ purchanse.member.id }}</span>
                </template>
                <template v-else>
                    <span>{{ purchanse.member.nickname }}/{{ purchanse.member.mobile }}</span>
                </template>
              </grid-item>
              <grid-item label="订单数量：">
                <span>{{ purchanse.goodsItemsQuantity }}</span>
              </grid-item>
              <grid-item label="订单金额：">
                <span>{{ purchanse.amount }}元</span>
              </grid-item>
              <grid-item label="订单时间：">
                <span>{{ purchanse.createTime }}</span>
              </grid-item>
              <template v-if="[3, 4, 5].includes(type)">
                <grid-item label="业绩积分：">
                  <span>{{ purchanse.integralAchieveGive }}</span>
                </grid-item>
                <grid-item label="业绩时间：">
                  <span>{{ purchanse | getAchieveTime }}</span>
                </grid-item>
              </template>
              <grid-item label="快递方式：" v-if="approval.typeId !==5">
                <span>{{ $_.get(purchanse, 'sysExpress.name') }}</span>
              </grid-item>
              <grid-item label="收货地址：">
                <span>{{ purchanse.fullAddress }}</span>
              </grid-item>
            </grid>
          </div>
        </div>
        <div class="block">
          <div class="b-title">
            <span>支付信息 实收￥{{ purchanse.amountActual }}</span>
            <span
              style="color:#ed4014;"
              v-if="purchanse.amountActual - purchanse.amount > 0"
            >(超出转存余额￥{{ ( purchanse.isNewDistributor ?  purchanse.amountActual - purchanse.amount - (purchanse.integralAchieveGive * 35) : purchanse.amountActual - purchanse.amount) | amountFormat }})</span>
          </div>
          <div class="content content_step1">
            <cell-group>
              <cell-item label="微信支付：" class="g-item" v-if="purchanse.paymentWeixinAmount > 0">
                <span>{{ purchanse.paymentWeixinAmount }}元</span>
              </cell-item>
              <cell-item label="余额支付：" class="g-item" v-if="purchanse.paymentBalanceAmount > 0">
                <span>{{ purchanse.paymentBalanceAmount }}元</span>
              </cell-item>
              <cell-item label="支付宝：" class="g-item" v-if="purchanse.paymentAlipayAmount > 0">
                <span>{{ purchanse.paymentAlipayAmount }}元</span>
              </cell-item>
              <cell-item label="刷卡：" class="g-item" v-if="purchanse.paymentCashAmount > 0">
                <span>{{ purchanse.paymentCashAmount }}元</span>
              </cell-item>
              <cell-item label="银行卡：" class="g-item" v-if="purchanse.paymentBankAmount > 0">
                <div
                  class="paymentBank"
                  v-for="(i,k) in purchanse.paymentBankJson.toParse()"
                  :key="k"
                >
                  <p>{{ i.name }}：{{ i.amount }}元</p>
                </div>
              </cell-item>
              <cell-item
                label="思雪余额："
                class="g-item"
                v-if="purchanse.paymentSixueBalanceAmount > 0"
              >
                <span>{{ purchanse.paymentSixueBalanceAmount }}元</span>
              </cell-item>
              <cell-item
                label="组合支付："
                class="g-item"
                v-if="purchanse.paymentGoodsSeriesPrestoreAmount > 0"
              >
                <span style="marginRight:20px;">{{ purchanse.paymentGoodsSeriesPrestoreAmount }}元</span>
                <elastic-table
                  :column="column"
                  :table-data="purchanse.paymentGoodsSeriesPrestoreJson.toParse()"
                ></elastic-table>
              </cell-item>
            </cell-group>
            <div v-if="[3, 4].includes(type)" style="display:flex;align-items:center;">
              <span style="marginTop:10px">支付凭证:</span>
              <file-previewer :value="$_.get(purchanse, 'paymentVoucherJson')"></file-previewer>
            </div>
            <div class="content-remark">
              <div style="marginTop:10px">备注：</div>
              <p class="content-remark-text">{{ purchanse.remark }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="approval.status === 3">
        <div class="error">
          <i class="iconfont icon-shibai1"></i>
          <p>审核未通过</p>
          <p>备注：{{ blankGet($_.get(approval.approvalTimelineList, '[0].remark')) }}</p>
          <div class="c-item c-item_purchanse-img">
            <div class="i-lable">附件：</div>
            <div class="i-value">
              <file-previewer :value="$_.get(approval.approvalTimelineList, '[0].fileJson')"></file-previewer>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="approval.status === 4">
        <div class="error">
          <i class="iconfont icon-shibai1"></i>
          <p>审核已取消</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import filePreviewer from '@/components/file-previewer';
import popupConfirm from '@/components/popup/type/confirm';
import optionsSelector from '@/components/options-selector';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';
import cellGroup from '@/components/cell/group.vue';
import cellItem from '@/components/cell/item.vue';
import elasticTable from '@/components/elastic-table';

export default {
  components: {
    filePreviewer,
    popupConfirm,
    optionsSelector,
    grid,
    gridItem,
    cellGroup,
    cellItem,
    elasticTable
  },
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
      adaptor: {
        attr: {
          ready: false
        },
        fn: {
          getPurchanse: () => {
            if (this.type === 3) {
              return this.$_.get(this.approval, 'approvalSubPurchanseStandard.purchanse');
            }
            if (this.type === 4) {
              return this.$_.get(this.approval, 'approvalSubPurchansePresale.purchanse');
            }
            if (this.type === 5) {
              return this.$_.get(this.approval, 'approvalSubPurchansePrestore.purchanse');
            }
            if (this.type === 7) {
              return this.$_.get(this.approval, 'approvalSubPurchanseCustomize.purchanse');
            }
            if (this.type === 8) {
              const t = this.$_.get(this.approval, 'approvalSubCancelPurchanse.purchanseType');
              if (t === 1) {
                return this.$_.get(this.approval, 'approvalSubCancelPurchanse.purchanse');
              }
              if (t === 2) {
                return this.$_.get(this.approval, 'approvalSubCancelPurchanse.purchanse');
              }
              if (t === 3) {
                return this.$_.get(this.approval, 'approvalSubCancelPurchanse.purchanse');
              }
              if (t === 4) {
                return this.$_.get(this.approval, 'approvalSubCancelPurchanse.purchanse');
              }
              if (t === 5) {
                return this.$_.get(this.approval, 'approvalSubCancelPurchanse.purchanse');
              }
            }
            if (this.type === 12) {
              return this.$_.get(this.approval, 'approvalSubPurchanseSixue.purchanse');
            }
            if (this.type === 13) {
              return this.$_.get(this.approval, 'approvalSubPurchanseSixuePresale.purchanse');
            }
          }
        }
      },
      options: {
        fn: {
          sysBankChangeHandler: () => { }
        }
      },
      column: [
        {
          prop: 'goodsSeries.name',
          width: 100,
          label: '组合',
          selectable: false
        },
        {
          prop: 'goodsSeries.amount',
          width: 100,
          label: '单价'
        },
        {
          prop: 'quantity',
          width: 100,
          label: '抵扣数量'
        }
      ]
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
    purchanse () {
      return this.adaptor.fn.getPurchanse();
    }
  }
};
</script>

<style lang="less">
@import url("./less/index.less");
.progress {
  &_purchanse {
    .p-info {
      .content {
        &_step1 {
          .g-item {
            display: flex;
            align-items: flex-start;
            .paymentBank {
              p {
                margin-top: 0px;
              }
            }
          }
          .content-remark {
            display: flex;
            align-items: flex-start;
            .content-remark-text {
              width: 973px;
              height: 93px;
              background: #ffffff;
              border: 1px solid #c0c4cc;
            }
          }
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
