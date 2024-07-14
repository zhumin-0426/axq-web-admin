<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 11:31:40
 * @LastEditTime: 2022-06-13 14:37:04
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/progress/achieve-transfer.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="progress progress_achieve-transfer">
    <div class="p-step">
      <el-steps :active="active - 1" finish-status="success">
        <el-step :title="item" :key="key" v-for="(item, key) in list"></el-step>
      </el-steps>
    </div>
    <div class="p-info">
      <div class="content" v-if="approval.status < 3">
        <p class="content_title">业绩转出代理信息：</p>
        <grid :col="2">
          <grid-item>
            代理姓名/ID：{{ $_.get(approval, `approvalSubAchieveTransfer.give.nickname`)}}/{{
            $_.get(approval, `approvalSubAchieveTransfer.give.id`) }}
          </grid-item>
          <grid-item>
            业绩时间：{{$_.get(approval, `approvalSubAchieveTransfer.giveTime`) | timeFormat("YYYY-MM")}}
          </grid-item>
          <grid-item>
            转出业绩: {{ $_.get(approval, `approvalSubAchieveTransfer.integral`) }}
          </grid-item>
          <grid-item>
            转让后总业绩: {{ giveAchieveTransferAfter }}
          </grid-item>
        </grid>
        <p class="content_title">业绩接收代理信息：</p>
        <grid :col="2">
          <grid-item>
            代理姓名/ID：{{$_.get(approval, `approvalSubAchieveTransfer.recipient.nickname`)}}/
            {{$_.get(approval, `approvalSubAchieveTransfer.recipient.id`)}}
          </grid-item>
          <grid-item>
            业绩时间：{{$_.get(approval, `approvalSubAchieveTransfer.achieveTime`) | timeFormat("YYYY-MM") }}
          </grid-item>
          <grid-item>
            转入业绩: {{ $_.get(approval, `approvalSubAchieveTransfer.integral`) }}
          </grid-item>
          <grid-item>
            接收后总业绩: {{ recipientTransferAfter }}
          </grid-item>
        </grid>
        <grid :col="2">
          <grid-item>
            审核人：{{$_.get(approval, `approvalTimelineList[0].checker.nickname`)}}
          </grid-item>
          <grid-item>
            审核时间：{{$_.get(approval, `approvalTimelineList[0].createTime`)}}
          </grid-item>
          <grid-item>
            备注：{{ $_.get(approval, `approvalSubAchieveTransfer.remark`) }}
          </grid-item>
        </grid>
      </div>
      <template v-else>
        <div class="error" v-if="approval.status === 3">
          <i class="iconfont icon-shibai1"></i>
          <p>审核不通过</p>
          <p>备注：{{ blankGet($_.get(approval.approvalTimelineList, "[0].remark")) }}</p>
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
import cellGroup from "@/components/cell/group";
import cellItem from "@/components/cell/item";
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';

export default {
  components: {
    cellGroup,
    cellItem,
    grid,
    gridItem
  },
  props: {
    approval: {
      type: Object,
      default () {
        return {
          approvalWorkflowList: [],
          workflowId: -1,
        };
      },
    },
  },
  data () {
    return {
      type: Number(this.$route.query.type),
    };
  },
  computed: {
    list () {
      const total = [];
      const pre = ["创建业绩转让申请"];
      const last = ["已通过"];
      return total
        .concat(pre)
        .concat(this.approval.approvalWorkflowList.map((i) => i.name))
        .concat(last);
    },
    active () {
      if (this.approval.status === 2) {
        return this.approval.approvalWorkflowList.length + 3;
      }
      return (
        this.approval.approvalWorkflowList
          .map((i) => i.id)
          .indexOf(this.approval.workflowId) + 2
      );
    },
    giveAchieveTransferAfter() {
      const achieve = Number(this.$_.get(this.approval, 'approvalSubAchieveTransfer.giveAchieve.integral',0))+Number(this.$_.get(this.approval, 'approvalSubAchieveTransfer.giveAchieve.integralFreeze',0))- Number(this.$_.get(this.approval, `approvalSubAchieveTransfer.integral`,0));
      const giveAchieveNewJson = JSON.parse(this.$_.get(this.approval, 'approvalSubAchieveTransfer.giveAchieveNewJson'));
      const giveAchieve = giveAchieveNewJson ?  giveAchieveNewJson.integral + giveAchieveNewJson.integralFreeze : 0;
      return this.$_.get(this.approval, 'status') !== 2 ? achieve : giveAchieve ;
    },
    recipientTransferAfter() {
      const achieve = Number(this.$_.get(this.approval, 'approvalSubAchieveTransfer.recipientAchieve.integral',0))+Number(this.$_.get(this.approval, 'approvalSubAchieveTransfer.recipientAchieve.integralFreeze',0))+ Number(this.$_.get(this.approval, `approvalSubAchieveTransfer.integral`));
      const recipientAchieveNewJson = JSON.parse(this.$_.get(this.approval, 'approvalSubAchieveTransfer.recipientAchieveNewJson'));
      const recipientAchieve = recipientAchieveNewJson ?  recipientAchieveNewJson.integral + recipientAchieveNewJson.integralFreeze : 0;
      return this.$_.get(this.approval, 'status') !== 2 ? achieve  : recipientAchieve ;
    }
  },
  methods: {},
};
</script>

<style lang="less">
@import url("./less/index.less");
.progress {
  &_achieve-transfer {
    .p-info {
      .content {
        &_title {
          font-weight: bold;
        }
      }
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
  }
}
</style>
