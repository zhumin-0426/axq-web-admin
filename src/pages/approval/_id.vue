<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 11:25:52
 * @LastEditTime: 2022-05-16 10:03:33
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/_id.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="info-base approval-info">
    <div class="b-block">
      <div class="b-title">
        <span>审核详情</span>
        <el-tag
          v-if="$_.get(adaptor.fn.getPurchanse(), 'isNewDistributor')"
          style="marginleft: 10px; color: #409eff"
          >新店主订单</el-tag
        >
      </div>
      <div class="b-box b-box_console">
        <div class="c-left">
          <grid :col="3">
            <grid-item label="审核编号：">
              <span>{{ infoGet("sn") }}</span>
            </grid-item>
             <template v-if="viewNodeVisable.fn.do(16)&&infoGet('approvalSubDistributorBalanceChange.type')">
                <grid-item label="制单人：">
                  <span>{{infoGet("_raw.approvalSubDistributorBalanceChange.operator.nickname")}}</span>
                </grid-item>
            </template>
            <template v-if="viewNodeVisable.fn.do(1)">
              <grid-item label="申请人：">
                <template v-if="[1,2].includes(infoGet('typeId'))">
                  <span>
                    {{ $_.get(adaptor.fn.getShopApply(), "applier.nickname") }}/ {{ $_.get(adaptor.fn.getShopApply(), "applier.id") }}
                  </span>
                </template>
                <template v-else>
                  <span>
                    {{ $_.get(adaptor.fn.getShopApply(), "applier.nickname") }}
                  </span>
                </template>
              </grid-item>
              <template v-if="![1,2].includes(infoGet('typeId'))">
                <grid-item label="申请人电话：">
                  <span>{{ $_.get(adaptor.fn.getShopApply(), "applier.mobile") }}</span>
                </grid-item>
              </template>
              <grid-item label="申请方式：">
                <span>
                  {{
                    $_.get(adaptor.fn.getShopApply(), "type") === 1
                      ? "个人申请"
                      : "他人申请"
                  }}
                </span>
              </grid-item>
              <grid-item label="上级推荐人：">
                <template v-if="[1,2].includes(infoGet('typeId'))">
                  <span>
                    {{ $_.get(adaptor.fn.getShopApply(), "inviteMember.nickname") }}/{{ $_.get(adaptor.fn.getShopApply(), "inviteMember.id") }}
                  </span>
                </template>
                <template v-else>
                  <span>
                    {{ $_.get(adaptor.fn.getShopApply(), "inviteMember.nickname") }}
                  </span>
                </template>
              </grid-item>
              <template v-if="![1,2].includes(infoGet('typeId'))">
                <grid-item label="上级推荐人电话：">
                  <span>
                    {{ $_.get(adaptor.fn.getShopApply(), "inviteMember.mobile") }}
                  </span>
                </grid-item>
              </template>
              <grid-item label="上级总代：">
                <template v-if="[1,2].includes(infoGet('typeId'))">
                  <span>
                    {{ $_.get(adaptor.fn.getShopApply(), "superiorDistributor.nickname") }}/{{$_.get(adaptor.fn.getShopApply(), "superiorDistributor.id")}}
                  </span>
                </template>
                <template v-else>
                    {{ $_.get(adaptor.fn.getShopApply(), "superiorDistributor.nickname") }}
                </template>
              </grid-item>
              <template v-if="![1,2].includes(infoGet('typeId'))">
                <grid-item label="上级总代电话：">
                  <span>
                    {{ $_.get(adaptor.fn.getShopApply(), "superiorDistributor.mobile") }}
                  </span>
                </grid-item>
              </template>
              <grid-item label="团队领导人：">
                 <template v-if="[1,2].includes(infoGet('typeId'))">
                    <span>
                      {{ $_.get(adaptor.fn.getShopApply(), "topDistributor.nickname") }}/{{ $_.get(adaptor.fn.getShopApply(), "topDistributor.id") }}
                    </span>
                 </template>
                 <template v-else>
                    <span>
                      {{ $_.get(adaptor.fn.getShopApply(), "topDistributor.nickname") }}
                    </span>
                 </template>
              </grid-item>
              <template v-if="![1,2].includes(infoGet('typeId'))">
                <grid-item label="团队领导人电话：">
                  <span>
                    {{ $_.get(adaptor.fn.getShopApply(), "topDistributor.mobile") }}
                  </span>
                </grid-item>
              </template>
              <grid-item label="提交人：">
                <template v-if="[1,2].includes(infoGet('typeId'))">
                  <span>
                    {{ $_.get(adaptor.fn.getShopApply(), "creator.nickname") }}/{{ $_.get(adaptor.fn.getShopApply(), "creator.id") }}
                  </span>
                </template>
                <template v-else>
                  <span>
                    {{ $_.get(adaptor.fn.getShopApply(), "creator.nickname") }}
                  </span>
                </template>
              </grid-item>
               <template v-if="![1,2].includes(infoGet('typeId'))">
                  <grid-item label="提交人电话：">
                    <span>
                      {{ $_.get(adaptor.fn.getShopApply(), "creator.mobile") }}
                    </span>
                  </grid-item>
               </template>
              <grid-item label="提交时间：">
                <span>
                  {{ $_.get(adaptor.fn.getShopApply(), "createTime") }}
                </span>
              </grid-item>
              <grid-item label="申请区域：">
                <span>
                  {{
                    `${$_.get(adaptor.fn.getShopApply(), "regionAllocate.provinceName")}-
                  ${$_.get(adaptor.fn.getShopApply(), "regionAllocate.cityName")}-
                  ${$_.get(adaptor.fn.getShopApply(), "regionAllocate.districtName")}-
                  ${$_.get(adaptor.fn.getShopApply(), "regionAllocate.name")},
                  ${$_.get(adaptor.fn.getShopApply(), "regionAllocate.remark")}`
                  }}
                </span>
              </grid-item>
            </template>
            <template v-if="viewNodeVisable.fn.do(2)">
            <template v-if="[3,4,5,12,13,8].includes(infoGet('typeId'))">
              <grid-item label="客户名称：">
                <span>
                  {{ $_.get(adaptor.fn.getPurchanse(), "member.nickname") }}/
                  {{ $_.get(adaptor.fn.getPurchanse(), "member.id") }}
                </span>
              </grid-item>
            </template>
            <template v-else>
              <grid-item label="客户名称：">
                <span>
                  {{ $_.get(adaptor.fn.getPurchanse(), "member.nickname") }}/
                  {{ $_.get(adaptor.fn.getPurchanse(), "member.mobile") }}
                </span>
              </grid-item>
            </template>
              <grid-item label="制单人：">
                <span>
                  {{ $_.get(adaptor.fn.getPurchanse(), "documentMaker.nickname") }}
                </span>
              </grid-item>
              <grid-item label="订单编号：">
                <span>{{ $_.get(adaptor.fn.getPurchanse(), "sn") }}</span>
              </grid-item>
              <grid-item label="订单金额：">
                <span> {{ $_.get(adaptor.fn.getPurchanse(), "amount") }}元 </span>
              </grid-item>
              <grid-item label="订单时间：">
                <span>
                  {{ $_.get(adaptor.fn.getPurchanse(), "createTime") }}
                </span>
              </grid-item>
            </template>
            <template v-if="viewNodeVisable.fn.do(3)">
              <grid-item label="代理名称：">
                <span>
                  {{
                    blankGet(
                      infoGet(
                        "_raw.approvalSubRevertForm.revertForm.distributor.nickname"
                      )
                    )
                  }}/
                  {{
                    blankGet(
                      infoGet("_raw.approvalSubRevertForm.revertForm.distributor.id")
                    )
                  }}
                </span>
              </grid-item>
              <grid-item label="制单人：">
                <span>
                  {{ infoGet("_raw.approvalSubRevertForm.revertForm.operator.nickname") }}
                </span>
              </grid-item>
              <grid-item label="订单时间：">
                <span>
                  {{ infoGet("_raw.approvalSubRevertForm.revertForm.createTime") }}
                </span>
              </grid-item>
            </template>
            <template v-if="viewNodeVisable.fn.do(4)">
              <grid-item label="送货单号：">
                <span>{{
                  infoGet("_raw.approvalSubUnusualStockDelivery.stockDelivery.offlineSn")
                }}</span>
              </grid-item>
              <grid-item label="商品数量：">
                <span>{{
                  addUpBy(
                    infoGet("_raw.approvalSubUnusualStockDelivery.stockDelivery"),
                    "stockDeliveryGoodsItemsList",
                    (v) => {
                      return v.quantity;
                    }
                  )
                }}</span>
              </grid-item>
              <grid-item label="制单人：">
                <span>{{
                  infoGet(
                    "_raw.approvalSubUnusualStockDelivery.stockDelivery.documentMaker.nickname"
                  )
                }}</span>
              </grid-item>
            </template>
            <template v-if="viewNodeVisable.fn.do(5)">
              <grid-item label="申请人：" v-if="infoGet('typeId') === 11 &&(infoGet('approvalSubDistributorBalanceChange.type')===1||infoGet('approvalSubDistributorBalanceChange.type')===2||infoGet('approvalSubDistributorBalanceChange.type')===3)">
                <span>{{ infoGet("_raw.approvalSubDistributorBalanceChange.operator.nickname") }}</span>
              </grid-item>
              <grid-item :label="infoGet('typeId') === 11 ? '申请时间：' : '创建时间：' ">
                <span>{{ infoGet("createTime") }}</span>
              </grid-item>
            </template>
            <template v-if="viewNodeVisable.fn.do(14)">
              <grid-item label="类型：">
                <span>{{
                  { 1: "店铺转让", 2: "店铺关闭" }[
                    infoGet("_raw.approvalSubShopChange.type")
                  ]
                }}</span>
              </grid-item>
              <grid-item label="操作人：">
                <span>{{ infoGet("_raw.approvalSubShopChange.operator.nickname") }}</span>
              </grid-item>
              <grid-item label="申请时间：">
                <span>{{ infoGet("_raw.createTime") }}</span>
              </grid-item>
            </template>
            <template v-if="viewNodeVisable.fn.do(15)">
              <grid-item label="制单人：">
                <span>
                  {{ infoGet("_raw.approvalSubRefund.operator.nickname") }}
                </span>
              </grid-item>
              <grid-item label="申请时间：">
                <span>
                  {{ infoGet("_raw.approvalSubRefund.createTime") }}
                </span>
              </grid-item>
            </template>
          </grid>
        </div>
        <div class="c-right">
          <div class="r-btns">
            <div class="b-sub">
              <el-button
                style="width: 88px"
                size="small"
                v-if="[3, 4, 5, 7, 8, 9, 12, 13, 15].includes(infoGet('typeId'))"
                @click.native="action.fn.print"
                >打印
              </el-button>
              <el-button
                style="width: 88px"
                size="small"
                v-if="[3, 4, 7, 12, 13].includes(infoGet('typeId'))"
                @click.native="action.fn.remotePrint"
                >仓库打印
              </el-button>
              <el-button
                style="width: 88px"
                type="danger"
                size="small"
                v-if="viewNodeVisable.fn.do(6)"
                @click.native="action.fn.cancel"
                >取消</el-button
              >
              <el-button
                style="width: 88px"
                type="warning"
                size="small"
                @click.native="
                  action.fn.doAgree(false, {
                    title: '审核不通过',
                    text: '是否拒绝该申请',
                    successText: '审核已拒绝',
                    errorText: '审核拒绝失败',
                  })
                "
                v-if="
                  infoGet('status') === 1 && !infoGet('workflow.config.disableNoAgree', 0)
                "
                >不通过</el-button
              >
            </div>
            <div class="b-main">
              <el-button
                style="width: 88px; height: 32px"
                type="primary"
                size="small"
                @click.native="
                  action.fn.doAgree(true, {
                    title: '审核通过',
                    text: '是否同意该申请',
                    successText: '审核节点已通过',
                    errorText: '审核节点通过失败',
                  })
                "
                v-if="infoGet('status') === 1"
                >通过</el-button
              >
            </div>
          </div>
          <div class="r-info">
            <div class="ri-item">
              <div class="key">
                <span>类型</span>
              </div>
              <div class="value">
                <span class="v-text">{{
                  infoGet("typeId") === 11 ? ({
                    1:'余额充值',2: '余额转让',3: '余额退回',4:'开拓奖励划转'
                  })[infoGet("_raw.approvalSubDistributorBalanceChange.type")] : entity.Approval.filter("type", infoGet("typeId"))
                }}</span>
                <el-tag
                  size="mini"
                  v-if="$_.get(adaptor.fn.getPurchanse(), 'isNewDistributor')"
                  >新店主</el-tag
                >
              </div>
            </div>
            <div class="ri-item">
              <div class="key">
                <span>状态</span>
              </div>
              <div class="value">
                <span
                  class="v-text"
                  style="color: #1890ff"
                  v-if="infoGet('status') === 1"
                  >{{ entity.Approval.filter("status", infoGet("status")) }}</span
                >
                <span
                  class="v-text"
                  style="color: #19be6b"
                  v-if="infoGet('status') === 2"
                  >{{ entity.Approval.filter("status", infoGet("status")) }}</span
                >
                <span
                  class="v-text"
                  style="color: #ff4d4f"
                  v-if="infoGet('status') === 3"
                  >{{ entity.Approval.filter("status", infoGet("status")) }}</span
                >
                <span
                  class="v-text"
                  style="color: #f56c6c"
                  v-if="infoGet('status') === 4"
                  >{{ entity.Approval.filter("status", infoGet("status")) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="b-block">
      <div class="b-title">
        <span>审核进度</span>
      </div>
      <div class="b-box b-box_progress">
        <fragment-progress-shop-apply
          ref="fragmentProgress"
          :approval="infoGet('_raw')"
          @update="_boot"
          v-if="viewNodeVisable.fn.do(1)"
        ></fragment-progress-shop-apply>
        <fragment-progress-purchanse
          ref="fragmentProgress"
          :approval="infoGet('_raw')"
          @update="_boot"
          v-if="[3, 4, 5, 7, 12, 13].includes(infoGet('typeId'))"
        ></fragment-progress-purchanse>
        <fragment-progress-revert-form
          ref="fragmentProgress"
          :approval="infoGet('_raw')"
          @update="_boot"
          @retreat="action.fn.retreat"
          v-if="viewNodeVisable.fn.do(3)"
        ></fragment-progress-revert-form>
        <fragment-progress-distributor-balance-return
          ref="fragmentProgress"
          :approval="infoGet('_raw')"
          @update="_boot"
          v-if="viewNodeVisable.fn.do(8)"
        ></fragment-progress-distributor-balance-return>
        <fragment-progress-purchanse-cancel
          ref="fragmentProgress"
          :approval="infoGet('_raw')"
          @update="_boot"
          v-if="viewNodeVisable.fn.do(10)"
        ></fragment-progress-purchanse-cancel>
        <fragment-progress-shop-ccb-pay
          ref="fragmentProgress"
          :approval="infoGet('_raw')"
          @update="_boot"
          v-if="viewNodeVisable.fn.do(11)"
        ></fragment-progress-shop-ccb-pay>
        <fragment-progress-achieve-transfer
          ref="fragmentProgress"
          :approval="infoGet('_raw')"
          @update="_boot"
          v-if="viewNodeVisable.fn.do(12)"
        ></fragment-progress-achieve-transfer>
        <fragment-progress-stock-delivery
          ref="fragmentProgress"
          :approval="infoGet('_raw')"
          @update="_boot"
          v-if="viewNodeVisable.fn.do(13)"
        ></fragment-progress-stock-delivery>
        <fragment-progress-shop-change
          ref="fragmentProgress"
          :approval="infoGet('_raw')"
          @update="_boot"
          v-if="viewNodeVisable.fn.do(14)"
        >
        </fragment-progress-shop-change>
        <fragment-progress-refound-back
          ref="fragmentProgress"
          :approval="infoGet('_raw')"
          @update="_boot"
          v-if="viewNodeVisable.fn.do(15)"
        ></fragment-progress-refound-back>
      </div>
    </div>
    <fragment-info-purchanse
      :purchanse-id="adaptor.fn.getPurchanse().id"
      :approval="infoGet('_raw')"
      v-if="[3, 4, 5, 7, 12, 13].includes(infoGet('typeId'))"
    ></fragment-info-purchanse>
    <fragment-info-revert-form
      :approval="infoGet('_raw')"
      v-if="viewNodeVisable.fn.do(3)"
    ></fragment-info-revert-form>
    <fragment-info-cancel-purchanse
      :approval="infoGet('_raw')"
      v-if="viewNodeVisable.fn.do(10)"
    >
    </fragment-info-cancel-purchanse>
    <fragment-info-stock-delivery
      :approval="infoGet('_raw')"
      v-if="viewNodeVisable.fn.do(13)"
    >
    </fragment-info-stock-delivery>
    <popup-confirm ref="popupConfirmApprovalCancel" title="审核取消">
      <div class="popup-confirm_approval-cancel">
        <div class="d-item">
          <div class="i-label">
            <span>备注信息：</span>
          </div>
          <div class="i-value">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="留下你的反馈信息，让协同更方便~"
              v-model="popup.cancel.attr.remark"
            >
            </el-input>
          </div>
        </div>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmApprovalDisagree" title="审核不通过">
      <div class="popup-confirm_approval-disagree">
        <div class="d-item">
          <div class="i-label">
            <span>备注信息：</span>
          </div>
          <div class="i-value">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="留下你的反馈信息，让协同更方便~"
              v-model="popup.disagree.attr.remark"
            >
            </el-input>
          </div>
        </div>
        <div class="d-item">
          <div class="i-label">
            <span>附件信息：</span>
          </div>
          <div class="i-value">
            <file-uploader
              :max="3"
              @change="popup.disagree.fn.disAgreementChangeHandler"
            ></file-uploader>
          </div>
        </div>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import infoMixin from "@/mixins/type/info";
import fragmentProgressPurchanse from "./@fragment/progress/purchanse";
import fragmentProgressShopApply from "./@fragment/progress/shop-apply";
import fragmentProgressRefoundBack from "./@fragment/progress/refound-back"
import fragmentProgressRevertForm from "./@fragment/progress/revert-form";
import fragmentProgressDistributorBalanceReturn from "./@fragment/progress/distributor-balance-return";
import fragmentProgressPurchanseCancel from "./@fragment/progress/purchanse-cancel";
import fragmentProgressShopCcbPay from "./@fragment/progress/shop-ccb-pay";
import fragmentProgressAchieveTransfer from "./@fragment/progress/achieve-transfer";
import fragmentProgressStockDelivery from "./@fragment/progress/stock-delivery";
import fragmentProgressShopChange from "./@fragment/progress/shop-change";
import fragmentInfoPurchanse from "./@fragment/info/purchanse";
import fragmentInfoRevertForm from "./@fragment/info/revert-form";
import fragmentInfoCancelPurchanse from "./@fragment/info/cancel-purchanse";
import fragmentInfoStockDelivery from "./@fragment/info/stock-delivery";
import popupConfirm from "@/components/popup/type/confirm";
import fileUploader from "@/components/file-uploader";
import Printer from "@/components/axq/printer";
import grid from "@/components/grid";
import gridItem from "@/components/grid/item";
import switchSelector from "@/components/switch-selector";
import { model } from "@/model";
import { mapState } from "vuex";

const { Approval, Purchanse } = model.collection;
export default {
  mixins: [infoMixin],
  components: {
    fragmentProgressPurchanse,
    fragmentProgressShopApply,
    fragmentProgressRevertForm,
    fragmentProgressDistributorBalanceReturn,
    fragmentProgressPurchanseCancel,
    fragmentProgressShopCcbPay,
    fragmentProgressAchieveTransfer,
    fragmentProgressStockDelivery,
    fragmentProgressShopChange,
    fragmentInfoPurchanse,
    fragmentProgressRefoundBack,
    fragmentInfoRevertForm,
    fragmentInfoCancelPurchanse,
    fragmentInfoStockDelivery,
    popupConfirm,
    fileUploader,
    grid,
    gridItem,
    switchSelector,
  },
  provide: {
    getUniqueTimeline(approval, workflowIndex) {
      const { _self } = this;
      const workflow = _self.$_.get(approval, `approvalWorkflowList[${workflowIndex}]`);
      return (
        _self.$_.find(_self.$_.get(approval, "approvalTimelineList"), (i) => {
          return i.workflowId == _self.$_.get(workflow, "id");
        }) || {}
      );
    },
  },
  data() {
    return {
      type: Number(this.$route.query.type),
      info: {
        config: {
          entity: "Approval",
          action: "info",
          params: {
            type: Number(this.$route.query.type),
          },
        },
        result: {},
      },
      entity: {
        Approval,
      },
      adaptor: {
        fn: {
          getShopApply: () => {
            if (this.infoGet("typeId") === 1) {
              return this.infoGet("_raw.approvalSubRegionAllocateAgent");
            }
            if (this.infoGet("typeId") === 2) {
              return this.infoGet("_raw.approvalSubShop");
            }
          },
          getPurchanse: () => {
            if (this.infoGet("typeId") === 3) {
              return this.infoGet("_raw.approvalSubPurchanseStandard.purchanse");
            }
            if (this.infoGet("typeId") === 4) {
              return this.infoGet("_raw.approvalSubPurchansePresale.purchanse");
            }
            if (this.infoGet("typeId") === 5) {
              return this.infoGet("_raw.approvalSubPurchansePrestore.purchanse");
            }
            if (this.infoGet("typeId") === 7) {
              return this.infoGet("_raw.approvalSubPurchanseCustomize.purchanse");
            }
            if (this.infoGet("typeId") === 8) {
              return this.infoGet("_raw.approvalSubCancelPurchanse.purchanse");
            }
            if (this.infoGet("typeId") === 12) {
              return this.infoGet("_raw.approvalSubPurchanseSixue.purchanse");
            }
            if (this.infoGet("typeId") === 13) {
              return this.infoGet("_raw.approvalSubPurchanseSixuePresale.purchanse");
            }
            return {};
          },
        },
      },
      viewNodeVisable: {
        fn: {
          do: (n) => {
            if (n === 1) {
              return [1, 2].includes(this.infoGet("typeId"));
            }
            if (n === 2) {
              return [3, 4, 5, 7, 8, 12, 13].includes(this.infoGet("typeId"));
            }
            if (n === 3) {
              return this.infoGet("typeId") === 9;
            }
            if (n === 4) {
              return this.infoGet("typeId") === 16;
            }
            if (n === 5) {
              return [10, 11, 16].includes(this.infoGet("typeId"));
            }
            if (n === 6) {
              return (
                [1, 2].includes(this.infoGet("typeId")) && this.infoGet("status") === 1
              );
            }
            if (n === 8) {
              return this.infoGet("typeId") === 11;
            }
            if (n === 9) {
              return [10, 11].includes(this.infoGet("typeId"));
            }
            if (n === 10) {
              return this.infoGet("typeId") === 8;
            }
            if (n === 11) {
              return this.infoGet("typeId") === 14;
            }
            if (n === 12) {
              return this.infoGet("typeId") === 15;
            }
            if (n === 13) {
              return this.infoGet("typeId") === 16;
            }
            if (n === 14) {
              return this.infoGet("typeId") === 17;
            }
            if (n === 15) {
              return this.infoGet("typeId") === 18;
            }
            if (n === 16) {
              return this.infoGet("typeId") === 11;
            }
          },
        },
      },
      action: {
        fn: {
          preDo: (b, title, text) => {
            return new Promise((resolve, reject) => {
              if (
                b &&
                this.$refs.fragmentProgress &&
                this.$refs.fragmentProgress._checkEnableSubmit
              ) {
                const { ok, message } = this.$refs.fragmentProgress._checkEnableSubmit();
                if (!ok) {
                  this.$message.warning(message);
                  reject();
                  return;
                }
              }
              if ([3, 4, 7, 12, 13].includes(this.infoGet("typeId")) && b) {
                let isAutoPrintInStorehouse = 1;
                const onlineAxqPrinterSize = this.$_.get(
                  this.ws,
                  "axqPrintStatus.onlineAxqPrinterSize",
                  0
                );
                const h = this.$createElement;
                this.$msgbox({
                  title: "审核操作",
                  message: h(
                    "div",
                    {
                      key: $dayjs().millisecond(),
                    },
                    [
                      h(
                        "div",
                        {
                          style: {
                            paddingBottom: "10px",
                          },
                        },
                        [
                          h(
                            "p",
                            null,
                            `是否同时打印仓库订单，该过程在仓库中完成。当前在线打印机共 ${onlineAxqPrinterSize} 台`
                          ),
                        ]
                      ),
                      h(
                        switchSelector,
                        {
                          props: {
                            config: {
                              noConfirm: true,
                              selectorList: [
                                {
                                  value: 0,
                                  label: "否",
                                },
                                {
                                  value: 1,
                                  label: "是",
                                },
                              ],
                              value: 1,
                            },
                          },
                          on: {
                            change: ($event) => {
                              isAutoPrintInStorehouse = $event.value;
                            },
                          },
                        },
                        ""
                      ),
                    ]
                  ),
                  showCancelButton: true,
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  beforeClose: (action, instance, done) => {
                    if (action === "confirm") {
                      done();
                      resolve({
                        isAutoPrintInStorehouse,
                      });
                    } else {
                      done();
                    }
                  },
                }).then((action) => {});
                return;
              }
              if (b) {
                this.$confirm(text, title, {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                })
                  .then(() => {
                    resolve({});
                  })
                  .catch(() => {});
              } else {
                this.$refs.popupConfirmApprovalDisagree.open({
                  triggerOpen: this.popup.disagree.fn.openHandler,
                  triggerClose: this.popup.disagree.fn.closeHandler,
                  params: {
                    title,
                    confirm: (e) => {
                      resolve(e);
                    },
                  },
                });
              }
            });
          },
          cancel: () => {
            this.$refs.popupConfirmApprovalCancel.open({
              triggerOpen: this.popup.cancel.fn.openHandler,
              triggerClose: this.popup.cancel.fn.closeHandler,
              params: {
                confirm: (e) => {
                  Approval.sendApi(
                    "updateStatus",
                    {
                      params: {
                        id: Number(this.params.id),
                        status: 4,
                      },
                      data: e,
                    },
                    {
                      showLoading: true,
                    }
                  ).then((res) => {
                    const { status, data } = res;
                    if (status) {
                      this.$message({
                        message: "审核已取消",
                        type: "success",
                      });
                      this._boot();
                    } else {
                      this.$message({
                        message: "审核取消失败",
                        type: "error",
                      });
                    }
                  });
                },
              },
            });
          },
          doAgree: (b, config) => {
            const { title, text, successText, errorText } = config;
            this.action.fn
              .preDo(b, title, text)
              .then((e) => {
                const { isAutoPrintInStorehouse } = e || {};
                Approval.sendApi(
                  "doAgree",
                  {
                    params: {
                      id: Number(this.params.id),
                      isAgree: b,
                    },
                    data: {
                      remark: e.remark,
                      fileJson: this.popup.disagree.attr.fileJson,
                      checkerIds: "",
                      isAutoPrintInStorehouse,
                    },
                  },
                  {
                    showLoading: true,
                  }
                ).then((res) => {
                  const { status, data, code, message } = res;
                  if (status) {
                    this.$message({
                      message: successText,
                      type: "success",
                    });
                    this._boot();
                  } else {
                    if (code === 2001) {
                      this.$notify.error({
                        title: "权限受限",
                        message: "当前审核环节无权限，请勿操作！",
                      });
                      return;
                    }
                    this.$message({
                      message: this.getServerExceptionMsg(message),
                      type: "error",
                    });
                  }
                });
              })
              .catch(() => {});
          },
          retreat: () => {
            Approval.sendApi(
              "retreat",
              {
                params: {
                  id: Number(this.params.id),
                },
                data: {
                  remark: "",
                  fileJson: "",
                  checkerIds: "",
                },
              },
              {
                showLoading: true,
              }
            ).then((res) => {
              const { status, data } = res;
              if (status) {
                this.$message({
                  message: "已驳回",
                  type: "success",
                });
                this._boot();
              } else {
                this.$message({
                  message: "驳回失败",
                  type: "error",
                });
              }
            });
          },
          print: () => {
            if (this.infoGet("typeId") === 9) {
              new Printer(4).run(
                {},
                {
                  revertFormId: this.infoGet("_raw.approvalSubRevertForm.revertForm.id"),
                }
              );
              return;
            }
            if (this.infoGet("typeId") === 15) {
              new Printer(3).run(
                {},
                {
                  approvalId: this.infoGet("_raw.id"),
                }
              );
              return;
            }
            new Printer(1).run(
              {},
              { purchanseId: this.adaptor.fn.getPurchanse().id, forceStatus: 1 }
            );
          },
          remotePrint: () => {
            this.$confirm("提交仓库打印, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                Purchanse.sendApi(
                  "callPrint",
                  { params: { id: this.adaptor.fn.getPurchanse().id }, data: {} },
                  { errorTip: "加入仓库打印队列失败" }
                ).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    this.$message.success("加入仓库打印队列成功");
                  }
                });
              })
              .catch((e) => {});
          },
        },
      },
      popup: {
        cancel: {
          attr: {
            confirmCallback: null,
            remark: "",
            fileJson: "",
          },
          fn: {
            openHandler: (ok, params) => {
              const { confirm } = params;
              this.popup.cancel.attr.confirmCallback = confirm;
              ok();
            },
            closeHandler: (ok) => {
              this.popup.cancel.attr.confirmCallback &&
                this.popup.cancel.attr.confirmCallback({
                  remark: this.popup.cancel.attr.remark,
                });
              ok();
            },
          },
        },
        disagree: {
          attr: {
            confirmCallback: null,
            remark: "",
            fileJson: "",
          },
          fn: {
            openHandler: (ok, params) => {
              const { confirm } = params;
              this.popup.disagree.attr.confirmCallback = confirm;
              ok();
            },
            closeHandler: (ok) => {
              this.popup.disagree.attr.confirmCallback &&
                this.popup.disagree.attr.confirmCallback({
                  remark: this.popup.disagree.attr.remark,
                });
              ok();
            },
            disAgreementChangeHandler: (e) => {
              this.popup.disagree.attr.fileJson = e;
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState("sys", ["ws"]),
  }
};
</script>

<style lang="less">
.approval-info {
  .b-block {
    .b-box {
      &_console {
        display: flex;
        padding: 0 20px;

        .c-left {
          width: 70%;
        }

        .c-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex: 1;

          .r-btns {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 70px;

            .b-sub {
              display: flex;
              align-items: center;
            }

            .b-main {
              margin-left: 10px;
            }
          }

          .r-info {
            display: flex;

            .ri-item {
              display: flex;
              flex-direction: column;
              align-items: flex-end;

              .key {
                span {
                  color: rgba(0, 0, 0, 0.45);
                }
              }

              .value {
                display: flex;
                align-items: center;
                margin-top: 10px;

                .v-text {
                  font-size: 24px;
                  color: rgba(0, 0, 0, 0.85);
                }
              }

              &:not(:first-child) {
                margin-left: 30px;
              }
            }
          }
        }
      }
    }
  }

  .popup-confirm {
    &_approval-cancel {
      padding: 20px;

      .d-item {
        display: flex;
        align-items: center;

        .i-label {
          width: 100px;
        }

        .i-value {
          flex: 1;
        }

        &:not(:first-child) {
          margin-top: 20px;
        }
      }
    }

    &_approval-disagree {
      padding: 20px;

      .d-item {
        display: flex;
        align-items: center;

        .i-label {
          width: 100px;
        }

        .i-value {
          flex: 1;
        }

        &:not(:first-child) {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
