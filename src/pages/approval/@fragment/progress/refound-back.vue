<template>
  <div class="progress progress_shop-apply">
    <div class="p-step">
      <el-steps :active="active + moveStep - 1" finish-status="success">
        <el-step
           v-for="(item, key) in list"
          :title="item"
          :description="active - 1 === key ? '最新审核节点' : ''"
          :key="key"
        ></el-step>
      </el-steps>
    </div>
    <div class="p-info">
      <template v-if="active + moveStep < 7">
        <template v-if="$_.get(approval, 'approvalTimelineList[0].status') === 2">
          <template v-if="active + moveStep === 2">
            <div class="title">
               <strong>错账信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                  <grid-item label="店主姓名：">
                    <span>
                         {{$_.get(approval, `approvalSubRefund.member.nickname`)}}
                    </span>
                  </grid-item>
                   <grid-item label="错账余额：">
                    <span>
                          {{$_.get(approval, `approvalSubRefund.amount`)}}元
                    </span>
                  </grid-item>
                   <grid-item label="公户名称：">
                    <span>
                       {{$_.get(approval, `approvalSubRefund.axqSelfEmployedLaborer.name`)}}
                    </span>
                  </grid-item>
                  <grid-item label="转账时间：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.accountData.time`)}}
                    </span>
                  </grid-item>
                  <grid-item label="转账人：">
                    <span>
                       {{$_.get(approval, `approvalSubRefund.accountData.accountOwner`)}}
                    </span>
                  </grid-item>
                  <grid-item label="开户行：">
                    <span>
                       {{$_.get(approval, `approvalSubRefund.accountData.accountOpen`)}}
                    </span>
                  </grid-item>
                   <grid-item label="银行卡号：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.accountData.account`)}}
                    </span>
                  </grid-item>
                </grid>
                <grid>
                  <grid-item label="备注信息：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.remark`)}}
                    </span>
                  </grid-item>
                </grid>
                <div class="title">
               <strong>财务审核信息</strong>
            </div>
            <div class="content">
                  <grid :col="3">
                    <grid-item label="审核人：">
                      <span>
                          {{$_.get(approval, `approvalTimelineList[0].checker.nickname`)}}
                      </span>
                      </grid-item>
                      <grid-item label="审核时间：">
                        <span>
                            {{$_.get(approval, `approvalTimelineList[0].createTime`)}}
                        </span>
                      </grid-item>
                  </grid>
                <grid>
                  <grid-item label="备注信息：">
                    <span>
                                               {{$_.get(approval, `approvalTimelineList`)[0].remark}}
                    </span>
                  </grid-item>
                </grid>
            </div>
            </div>
             </template>
             <template v-if="active + moveStep === 3">
            <div class="title">
               <strong>错账信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                  <grid-item label="店主姓名：">
                    <span>
                         {{$_.get(approval, `approvalSubRefund.member.nickname`)}}
                    </span>
                  </grid-item>
                   <grid-item label="错账余额：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.amount`)}}元
                    </span>
                  </grid-item>
                   <grid-item label="公户名称：">
                    <span>
                       {{$_.get(approval, `approvalSubRefund.axqSelfEmployedLaborer.name`)}}
                    </span>
                  </grid-item>
                  <grid-item label="转账时间：">
                    <span>
                      {{$_.get(approval, `approvalSubRefund.accountData.time`)}}
                    </span>
                  </grid-item>
                  <grid-item label="转账人：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.accountData.accountOwner`)}}
                    </span>
                  </grid-item>
                  <grid-item label="开户行：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.accountData.accountOpen`)}}
                    </span>
                  </grid-item>
                   <grid-item label="银行卡号：">
                    <span>
                         {{$_.get(approval, `approvalSubRefund.accountData.account`)}}
                    </span>
                  </grid-item>
                </grid>
                <grid>
                  <grid-item label="备注信息：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.remark`)}}
                    </span>
                  </grid-item>
                </grid>
            </div>
            <div class="title">
               <strong>财务审核信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                  <grid-item label="审核人：">
                    <span>
                        {{$_.get(approval, `approvalTimelineList[0].checker.nickname`)}}
                    </span>
                  </grid-item>
                   <grid-item label="审核时间：">
                    <span>
                        {{$_.get(approval, `approvalTimelineList[0].createTime`)}}
                    </span>
                  </grid-item>
                </grid>
            </div>
             <div class="title">
               <strong>出纳审核信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                    <grid-item label="退回转账凭证：">
                    <span>
                      <file-uploader
                      :max="1"
                      :value="paymentVoucherJson"
                      @change="refoundBackImg"
                      ></file-uploader>
                    </span>
                  </grid-item>
                </grid>
            </div>
          </template>
        </template>
        <template v-else>
          <template v-if="active + moveStep === 2">
            <div class="title">
               <strong>错账信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                  <grid-item label="店主姓名：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.member.nickname`)}}
                    </span>
                  </grid-item>
                   <grid-item label="错账余额：">
                    <span>
                          {{$_.get(approval, `approvalSubRefund.amount`)}}元
                    </span>
                  </grid-item>
                   <grid-item label="公户名称：">
                    <span>
                       {{$_.get(approval, `approvalSubRefund.axqSelfEmployedLaborer.name`)}}
                    </span>
                  </grid-item>
                  <grid-item label="转账时间：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.accountData.time`)}}
                    </span>
                  </grid-item>
                  <grid-item label="转账人：">
                    <span>
                       {{$_.get(approval, `approvalSubRefund.accountData.accountOwner`)}}
                    </span>
                  </grid-item>
                  <grid-item label="开户行：">
                    <span>
                       {{$_.get(approval, `approvalSubRefund.accountData.accountOpen`)}}
                    </span>
                  </grid-item>
                   <grid-item label="银行卡号：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.accountData.account`)}}
                    </span>
                  </grid-item>
                </grid>
                <grid>
                  <grid-item label="备注信息：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.remark`)}}
                    </span>
                  </grid-item>
                </grid>
            </div>
          </template>
          <template v-if="active + moveStep === 3">
            <div class="title">
               <strong>错账信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                  <grid-item label="店主姓名：">
                    <span>
                         {{$_.get(approval, `approvalSubRefund.member.nickname`)}}
                    </span>
                  </grid-item>
                   <grid-item label="错账余额：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.amount`)}}元
                    </span>
                  </grid-item>
                   <grid-item label="公户名称：">
                    <span>
                       {{$_.get(approval, `approvalSubRefund.axqSelfEmployedLaborer.name`)}}
                    </span>
                  </grid-item>
                  <grid-item label="转账时间：">
                    <span>
                      {{$_.get(approval, `approvalSubRefund.accountData.time`)}}
                    </span>
                  </grid-item>
                  <grid-item label="转账人：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.accountData.accountOwner`)}}
                    </span>
                  </grid-item>
                  <grid-item label="开户行：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.accountData.accountOpen`)}}
                    </span>
                  </grid-item>
                   <grid-item label="银行卡号：">
                    <span>
                         {{$_.get(approval, `approvalSubRefund.accountData.account`)}}
                    </span>
                  </grid-item>
                </grid>
                <grid>
                  <grid-item label="备注信息：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.remark`)}}
                    </span>
                  </grid-item>
                </grid>
            </div>
            <div class="title">
               <strong>财务审核信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                  <grid-item label="审核人：">
                    <span>
                      {{$_.get(approval, `approvalTimelineList`).length!==0?$_.get(approval, `approvalTimelineList`)[$_.get(approval, `approvalTimelineList`).length-1].checker.nickname:$_.get(approval, `approvalTimelineList`)[0].checker.nickname}}
                    </span>
                  </grid-item>
                   <grid-item label="审核时间：">
                    <span>
                       {{$_.get(approval, `approvalTimelineList`).length!==0?$_.get(approval, `approvalTimelineList`)[$_.get(approval, `approvalTimelineList`).length-1].createTime:$_.get(approval, `approvalTimelineList`)[0].createTime}}
                    </span>
                  </grid-item>
                </grid>
            </div>
             <div class="title">
               <strong>出纳审核信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                    <grid-item label="退回转账凭证：">
                    <span>
                      <file-uploader
                      :max="1"
                      :value="paymentVoucherJson"
                      @change="refoundBackImg"
                      ></file-uploader>
                    </span>
                  </grid-item>
                </grid>
            </div>
          </template>
          <template v-if="active + moveStep === 5">
            <div class="title">
               <strong>错账信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                  <grid-item label="店主姓名：">
                    <span>
                         {{$_.get(approval, `approvalSubRefund.member.nickname`)}}
                    </span>
                  </grid-item>
                   <grid-item label="错账余额：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.amount`)}}元
                    </span>
                  </grid-item>
                   <grid-item label="公户名称：">
                    <span>
                       {{$_.get(approval, `approvalSubRefund.axqSelfEmployedLaborer.name`)}}
                    </span>
                  </grid-item>
                  <grid-item label="转账时间：">
                    <span>
                      {{$_.get(approval, `approvalSubRefund.accountData.time`)}}
                    </span>
                  </grid-item>
                  <grid-item label="转账人：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.accountData.accountOwner`)}}
                    </span>
                  </grid-item>
                  <grid-item label="开户行：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.accountData.accountOpen`)}}
                    </span>
                  </grid-item>
                   <grid-item label="银行卡号：">
                    <span>
                         {{$_.get(approval, `approvalSubRefund.accountData.account`)}}
                    </span>
                  </grid-item>
                </grid>
                <grid>
                  <grid-item label="备注信息：">
                    <span>
                        {{$_.get(approval, `approvalSubRefund.remark`)}}
                    </span>
                  </grid-item>
                </grid>
            </div>
            <div class="title">
               <strong>财务审核信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                  <grid-item label="审核人：">
                    <span>
                      {{$_.get(approval, `approvalTimelineList`).length!==0?$_.get(approval, `approvalTimelineList`)[$_.get(approval, `approvalTimelineList`).length-1].checker.nickname:$_.get(approval, `approvalTimelineList`)[0].checker.nickname}}
                    </span>
                  </grid-item>
                   <grid-item label="审核时间：">
                    <span>
                       {{$_.get(approval, `approvalTimelineList`).length!==0?$_.get(approval, `approvalTimelineList`)[$_.get(approval, `approvalTimelineList`).length-1].createTime:$_.get(approval, `approvalTimelineList`)[0].createTime}}
                    </span>
                  </grid-item>
                </grid>
            </div>
            <div class="title">
               <strong>出纳审核信息</strong>
            </div>
            <div class="content">
                <grid :col="3">
                    <grid-item label="退回反转凭证：">
                      <template v-if="$_.get(approval, 'approvalSubRefund.accountData.fileJson[0]')">
                        <file-previewer
                          :value="$_.get(approval, 'approvalSubRefund.accountData.fileJson[0]')?JSON.stringify([JSON.parse($_.get(approval, 'approvalSubRefund.accountData.fileJson[0]'))]):''"
                        >
                        </file-previewer>
                      </template>
                      <template v-else>
                          无
                      </template>
                    </grid-item>
                </grid>
                <grid :col="2">
                  <grid-item label="审核人：">
                    <span>
                        {{$_.get(approval, `approvalTimelineList[0].checker.nickname`)}}
                    </span>
                  </grid-item>
                   <grid-item label="审核时间：">
                    <span>
                        {{$_.get(approval, `approvalTimelineList[0].createTime`)}}
                    </span>
                  </grid-item>
                </grid>
            </div>
          </template>
        </template>
      </template>
    </div>
    <popup-confirm
      ref="popupConfirmShopApplyUpdate"
      :title="popup.regionShopApplyUpdate.attr.title"
      :config="{ width: 900, height: 500 }"
    >
      <div class="form-table popup-confirm_shop-apply-update">
        <form-validate
          ref="regionShopApplyUpdate"
          :form="popup.regionShopApplyUpdate.attr.form"
          :validator="entitys.Approval.formUtil().validate"
          :fill="popup.regionShopApplyUpdate.fn.fill"
        >
          <template v-if="popup.regionShopApplyUpdate.attr.type === 1">
            <grid :col="1">
              <grid-item>
                <form-validate-field label="申请人：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `applier.nickname`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="申请区域：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `regionAllocate.name`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item v-if="approval.typeId === 2">
                <form-validate-field label="是否需要保证金：">
                  <el-radio-group
                    v-model="
                      popup.regionShopApplyUpdate.attr.form[
                        adaptor.fn.getFormSub()
                      ].value.depositIsRequire.value
                    "
                  >
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </form-validate-field>
              </grid-item>
              <template
                v-if="
                  approval.typeId === 1 ||
                    (approval.typeId === 2 && popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositIsRequire.value)
                "
              >
                <grid-item>
                  <form-validate-field label="付款方式："
                  :field="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositPaymentType">
                    <el-select
                      size="small"
                      class="el-select"
                      v-model="
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.depositPaymentType.value
                      "
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in popup.regionShopApplyUpdate.attr
                          .paymentTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </form-validate-field>
                </grid-item>
                <grid-item>
                  <form-validate-field label="付款时间："
                    :field="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositPayTime">
                    <el-date-picker
                      size="small"
                      class="el-date-picker"
                      v-model="
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.depositPayTime.value
                      "
                    ></el-date-picker>
                  </form-validate-field>
                </grid-item>
                <grid-item>
                  <form-validate-field label="付款人："
                    :field="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositPayer">
                    <el-input
                      size="small"
                      v-model="
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.depositPayer.value
                      "
                    ></el-input>
                  </form-validate-field>
                </grid-item>
                <grid-item>
                  <form-validate-field label="付款金额："
                    :field="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositAmount">
                    <el-input
                      size="small"
                      v-model="
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.depositAmount.value
                      "
                    ></el-input>
                  </form-validate-field>
                </grid-item>
                <grid-item style="margintop: 10px" class="g-item-upload">
                  <form-validate-field label="上传凭证："
                    :field="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositAmount">
                    <file-uploader
                      :max="10"
                      @change="
                        (e) => {
                          popup.regionShopApplyUpdate.attr.form[
                            adaptor.fn.getFormSub()
                          ].value.fileDeposit.value = e;
                        }
                      "
                    ></file-uploader>
                    <file-previewer
                        
                    >
                    </file-previewer>
                  </form-validate-field>
                </grid-item>
              </template>
            </grid>
          </template>
          <template v-if="popup.regionShopApplyUpdate.attr.type === 2">
            <grid :col="2">
              <grid-item>
                <form-validate-field label="申请人：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `applier.nickname`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="申请区域：">
                  <p>
                    {{
                      $_.get(
                      this.adaptor.fn.getApprovalSub(),
                      `regionAllocate.name`
                      )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="地址：">
                  <options-selector 
                    :mode="3" 
                    :config="{ key: 'sysRegion',value:`${popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.provinceName.value|| ''}${popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.cityName.value || ''}-${popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.districtName.value || ''}`}"
                    @change="options.fn.regionChangeHandler"></options-selector>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="详细地址：">
                  <el-input
                    v-model="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.addressFull.value"
                  ></el-input>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="街道电话：">
                  <el-input
                    v-model="
                      popup.regionShopApplyUpdate.attr.form[
                        adaptor.fn.getFormSub()
                      ].value.addressContact.value
                    "
                  ></el-input>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="店铺面积：">
                  <el-input
                    v-model="
                      popup.regionShopApplyUpdate.attr.form[
                        adaptor.fn.getFormSub()
                      ].value.addressArea.value
                    "
                  ></el-input>
                </form-validate-field>
              </grid-item>
            </grid>
          </template>
          <template v-if="popup.regionShopApplyUpdate.attr.type === 3">
            <grid :col="1">
              <grid-item>
                <form-validate-field label="申请人：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `applier.nickname`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="申请区域：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `regionAllocate.name`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item class="g-item-upload">
                <form-validate-field label="签约文件：">
                  <file-uploader
                    :max="10"
                    @change="
                      (e) => {
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.fileTenancyAgreement.value = e;
                      }
                    "
                  ></file-uploader>
                </form-validate-field>
              </grid-item>
            </grid>
          </template>
          <template v-if="popup.regionShopApplyUpdate.attr.type === 4">
            <grid :col="1">
              <grid-item>
                <form-validate-field label="申请人：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `applier.nickname`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="申请区域：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `regionAllocate.name`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item class="g-item-upload">
                <form-validate-field label="装修照片：">
                  <file-uploader
                    :max="10"
                    @change="
                      (e) => {
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.fileFixture.value = e;
                      }
                    "
                  ></file-uploader>
                </form-validate-field>
              </grid-item>
            </grid>
          </template>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';
import popupConfirm from '@/components/popup/type/confirm';
import imgVideoUploader from '@/components/img-video-uploader';
import imgVideoPreviewer from '@/components/img-video-previewer';
import fileUploader from '@/components/file-uploader';
import filePreviewer from '@/components/file-previewer';
import optionsSelector from '@/components/options-selector';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';

import { model } from '@/model';
import { formToolkit } from '@/model/form-toolkit';
const { Approval, ApprovalSubRegionAllocateAgent, ApprovalSubShop ,ApprovalSubRefund } =
  model.collection;

export default {
  components: {
    formValidate,
    formValidateField,
    popupConfirm,
    imgVideoUploader,
    imgVideoPreviewer,
    fileUploader,
    filePreviewer,
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
          workflowList: [],
          workflowId: -1
        };
      }
    }
  },
  data () {
    return {
      paymentVoucherJson:[],
      moveStep: 0,
      entitys: {
        Approval
      },
      adaptor: {
        fn: {
          getFormSub: () => {
            if (this.approval.typeId === 1) {
              return 'approvalSubRegionAllocateAgent';
            }
            if (this.approval.typeId === 2) {
              return 'approvalSubShop';
            }
          },
          getApprovalSub: () => {
            if (this.approval.typeId === 1) {
              return this.approval.approvalSubRegionAllocateAgent;
            }
            if (this.approval.typeId === 2) {
              return this.approval.approvalSubShop;
            }
          },
          getApprovalTimelineList: () => {
            return this.approval.approvalTimelineList;
          }
        }
      },
      options:{
        fn: {
          regionChangeHandler: (e) => {
            const [provinceId, cityId, districtId] = e.map(i => i.id);
            const [provinceName, cityName, districtName] = e.map(i => i._raw.name);
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.provinceId.value = provinceId;
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.cityId.value = cityId;
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.districtId.value = districtId;
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.provinceName.value = provinceName;
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.cityName.value = cityName;
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.districtName.value = districtName;
          }
        }
      },
      popup: {
        regionShopApplyUpdate: {
          attr: {
            title: '',
            paymentTypeList: [
              {
                label: '转账',
                value: 1
              },
              {
                label: '现金',
                value: 2
              },
              {
                label: '刷卡',
                value: 3
              },
              {
                label: '微信',
                value: 4
              },
              {
                label: '支付宝',
                value: 5
              }
            ],
            form: (() => {
              let f = {};
              if (this.approval.typeId === 1) {
                f = Approval.formUtil().generator(
                  'update',
                  'approvalSubRegionAllocateAgent'
                );
                f.approvalSubRegionAllocateAgent.value =
                  ApprovalSubRegionAllocateAgent.formUtil().generator(
                    'update',
                    'default'
                  );
              } else {
                f = Approval.formUtil().generator('update', 'approvalSubShop');
                f.approvalSubShop.value = ApprovalSubShop.formUtil().generator(
                  'update',
                  'default'
                );
              }
              return f;
            })()
          },
          fn: {
            fill: (callback) => {
              callback(Approval, this.approval);
            },
            openHandler: (ok, params) => {
              this.popup.regionShopApplyUpdate.attr.type = params.type;
              this.popup.regionShopApplyUpdate.attr.title = params.title;
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.regionShopApplyUpdate.validate().then((result) => {
                const { ok, form } = result;
                  Approval.sendApi('update', {
                    params: { id: Number(this.$route.params.id) },
                    data: form
                  }).then((res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$emit('update');
                      this.$message({
                        message: '修改成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '修改失败',
                        type: 'warning'
                      });
                    }
                  });

              });
            }
          }
        }
      }
    };
  },
  computed: {
    list () {
      const total = [];
      const pre = [
        this.approval.typeId === 18 ? '创建退回申请' : ''
      ];
      const last = [this.approval.status === 2 ? '已通过' : '未通过'];
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
    }
  },
  methods: {
    doUpdate (s) {
      const step2config = {
        3: {
          title: '修改保证金',
          type: 1
        },
        4: {
          title: '修改地址',
          type: 2
        },
        5: {
          title: '修改签约信息',
          type: 3
        },
        6: {
          title: '装修申请',
          type: 4
        }
      };
      this.$refs.popupConfirmShopApplyUpdate.open({
        triggerOpen: this.popup.regionShopApplyUpdate.fn.openHandler,
        triggerClose: this.popup.regionShopApplyUpdate.fn.closeHandler,
        params: step2config[s]
      });
    },
    doMoveStep (n) {
      if (this.active + this.moveStep === 2 && n === -1) {
        this.$message({
          message: '当前为初始化节点',
          type: 'warning'
        });
        return;
      }
      if (this.moveStep === 0 && n === 1) {
        this.$message({
          message: '当前节点为审核最新状态',
          type: 'warning'
        });
        return;
      }
      this.moveStep = this.moveStep + n;
    },
    refoundBackImg (e) {
      let fileJson = JSON.parse(e).map(item => {
        return JSON.stringify(item);
      })
      if (!fileJson.length) {
        this.paymentVoucherJson = [];
        return
      }
      if (this.paymentVoucherJson.length && fileJson[0].oss.filename === JSON.parse(this.paymentVoucherJson[0]).oss.filename) {
        return
      }

      let info = (() => {
        const f1 = Approval.formUtil().generator(
          "update",
          "approvalSubRefund"
        );
        const f2 = ApprovalSubRefund.formUtil().generator(
          "update",
          "default"
        );
        f1.approvalSubRefund.value = f2;
        return f1;
      })();
      console.log("info",info)
      info.approvalSubRefund.value.memberId.value = this.$_.get(this.approval, `approvalSubRefund.memberId`);
      info.approvalSubRefund.value.axqSelfEmployedLaborerId.value = this.$_.get(this.approval, `approvalSubRefund.axqSelfEmployedLaborerId`);
      info.approvalSubRefund.value.id.value = this.$_.get(this.approval, `approvalSubRefund.id`);
      info.approvalSubRefund.value.approvalId.value = this.$_.get(this.approval, `approvalSubRefund.approvalId`);
      info.approvalSubRefund.value.operatorId.value = this.$_.get(this.approval, `approvalSubRefund.operatorId`);
     info.approvalSubRefund.value.accountData.value = {
        account: this.$_.get(this.approval, `approvalSubRefund.accountData.account`),
        accountOpen: this.$_.get(this.approval, `approvalSubRefund.accountData.accountOpen`),
        accountOwner: this.$_.get(this.approval, `approvalSubRefund.accountData.accountOwner`),
        time:this.$_.get(this.approval, `approvalSubRefund.accountData.time`),
        fileJson
      }
      const { ok, form } = formToolkit.validate(info);
      if (ok) {
        Object.assign(form, {
          id: this.approval.id,
          status: this.approval.status,
          typeId: this.approval.typeId,
          workflowId: this.approval.workflowId
        });
        Approval.sendApi("update", {
          params: {
            id: this.approval.id
          },
          data: form,
        }).then((res) => {
          const { status, data } = res;
          if (status) {
            this.$message({
              message: "退回转账凭证上传成功",
              type: "success",
            });
            this.paymentVoucherJson = info.approvalSubDistributorBalanceChange.value.returnData.value.fileJson;
          } else {
            this.$refs.sendBackFileUploader.remove(0);
            this.$message({
              message: "退回转账凭证上传失败",
              type: "error",
            });
          }
        });
      }
    }
  },
};
</script>

<style lang="less">
@import url("./less/index.less");
.progress {
  &_shop-apply {
    .p-info {
      .error {
        .e_remark {
          margin-top: 10px;
          .r-item {
            display: flex;
            .i-label {
              width: 100px;
            }
            .i-value {
              flex: 1;
            }
            &:not(:first-child) {
              margin-top: 10px;
            }
          }
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .t-left {
          .node-name {
            font-weight: bold;
          }
          .link {
            font-size: 14px;
            color: #1890ff;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .t-right {
        }
      }
      .content {
        .content-remark {
          display: flex;
          justify-content: flex-start;
          .content-remark-text {
            display: inline-block;
            width: 350px;
            height: 90px;
            background: #ffffff;
            border: 1px solid #c0c4cc;
          }
        }
        .c-item {
          &_file-authorize-agreement {
            display: flex;
            align-items: flex-start;
            .i-value {
              width: 400px;
            }
          }
          &_deposit-img {
            display: flex;
            align-items: flex-start;
            .i-label {
            }
            .i-value {
              width: 400px;
            }
          }
          &_tenancy-img {
            display: flex;
            align-items: flex-start;
            .i-label {
            }
            .i-value {
              display: flex;
              align-items: center;
              width: 400px;
            }
          }
          &_fixture-img {
            display: flex;
            align-items: flex-start;
            .i-label {
            }
            .i-value {
              width: 400px;
            }
          }
        }
      }
    }
    .popup-confirm {
      &_shop-apply-update {
        padding: 20px;
        .el-select {
          width: 100px;
        }
        .el-date-picker {
          width: 200px;
        }
        .g-item-upload {
          align-items: flex-start;
        }
      }
    }
  }
}
</style>
