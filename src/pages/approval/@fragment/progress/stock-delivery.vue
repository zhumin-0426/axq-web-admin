<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 11:31:40
 * @LastEditTime: 2021-10-29 14:00:02
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/progress/stock-delivery.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="progress progress_stock-delivery">
    <div class="p-step">
      <el-steps :active="active - 1" finish-status="success">
        <el-step :title="item" :key="key" v-for="(item, key) in list"></el-step>
      </el-steps>
    </div>
    <div class="p-info">
      <template v-if="approval.status === 1">
        <div class="title">
          <div class="t-left">
            <span>异常送货单信息：</span>
          </div>
          <div class="t-right"></div>
        </div>
        <div class="content">
          <p>应入库数量：{{ addUpBy($_.get(approval, "approvalSubUnusualStockDelivery.stockDelivery"), 'stockDeliveryGoodsItemsList', (v) => {return v.quantity}) }}</p>
          <p>实际入库数量：{{ addUpBy($_.get(approval, "approvalSubUnusualStockDelivery.stockDelivery"), 'stockDeliveryGoodsItemsList', (v) => {return v.quantityHasStockIn}) }}</p>
          <p>提交人：{{ blankGet($_.get(approval, `approvalSubUnusualStockDelivery.operator.nickname`)) }}</p>
          <p>入库备注：{{ blankGet($_.get(approval, `approvalSubUnusualStockDelivery.remark`)) }}</p>
        </div>
      </template>
      <template v-else>
        <div class="ok" v-if="approval.status === 2">
          <p>应入库数量：{{ addUpBy($_.get(approval, "approvalSubUnusualStockDelivery.stockDelivery"), 'stockDeliveryGoodsItemsList', (v) => {return v.quantity}) }}</p>
          <p>实际入库数量：{{ addUpBy($_.get(approval, "approvalSubUnusualStockDelivery.stockDelivery"), 'stockDeliveryGoodsItemsList', (v) => {return v.quantityHasStockIn}) }}</p>
          <p>提交人：{{ blankGet($_.get(approval, `approvalSubUnusualStockDelivery.operator.nickname`)) }}</p>
          <p>备注：{{ blankGet($_.get(approval, `approvalSubUnusualStockDelivery.remark`)) }}</p>
          <p>提交时间：{{ blankGet($_.get(approval, `approvalSubUnusualStockDelivery.operator.createTime`)) }}</p>
          <p>审核人：{{ blankGet($_.get(getUniqueTimeline(approval, 0), `checker.nickname`)) }}</p>
          <p>审核时间：{{ blankGet($_.get(getUniqueTimeline(approval, 0), `createTime`)) }}</p>
        </div>
        <div class="error" v-if="approval.status === 3">
          <i class="iconfont icon-shibai1"></i>
          <p>审核不通过</p>
          <p>备注：{{ blankGet($_.get(approval.approvalTimelineList, '[0].remark')) }}</p>
          <div class="c-item">
            <div class="i-lable">附件：</div>
            <div class="i-value">
              <file-previewer :value="$_.get(approval.approvalTimelineList, '[0].fileJson')"></file-previewer>
            </div>
          </div>
        </div>
        <div class="error" v-if="approval.status === 4">
          <i class="iconfont icon-shibai1"></i>
          <p>审核已取消</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import filePreviewer from '@/components/file-previewer';
import cellGroup from '@/components/cell/group';
import cellItem from '@/components/cell/item';

export default {
  components: {
    filePreviewer,
    cellGroup,
    cellItem
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
      type: Number(this.$route.query.type)
    };
  },
  computed: {
    list () {
      const total = [];
      const pre = ['创建异常送货单'];
      const last = ['已通过'];
      return total.concat(pre).concat(this.approval.approvalWorkflowList.map(i => i.name)).concat(last);
    },
    active () {
      if (this.approval.status === 2) {
        return this.approval.approvalWorkflowList.length + 3;
      }
      return this.approval.approvalWorkflowList.map(i => i.id).indexOf(this.approval.workflowId) + 2;
    }
  },
  methods: {
  }
};
</script>

<style lang="less">
@import url("./less/index.less");
.progress {
  &_stock-delivery {
    .p-info {
      .c-item {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .i-value {
          i {
            color: #515a6e;
            font-size: 22px;
          }
        }
      }
    }
    .popup-confirm {
      &_ccb-verify {
        padding: 20px;
      }
    }
  }
}
</style>
