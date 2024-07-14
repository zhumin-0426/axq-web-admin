<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-07 19:33:43
 * @LastEditTime: 2022-06-18 17:59:17
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="approval-list">
    <div class="l-type">
      <div class="t-item" :class="{ 't-item-active': item.value === page.form.query.typeId }" :key="key"
        v-for="(item, key) in getAccessValidList(entitys.Approval._options.type)" @click="changeType(item)">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="l-list">
      <list-page ref="listPage" :config="page.config" :form="page.form" :hidden-action="
        () => {
          let l = [];
          if (![1, 2].includes(page.form.query.typeId)) {
            l.push('add');
          }
          if ([1, 2, 8, 11, 14, 15, 16, 17,18].includes(page.form.query.typeId)) {
            l.push('excel');
          }
          return l;
        }
      " @add="add" @form-reset="page.fn.resetHandler" :load-excel-config="page.excel.fn.loadConfig">
        <template slot="query">
          <template v-if="[1, 2].includes(page.form.query.typeId)">
            <div class="q-block">
              <div class="b-item">
                <options-selector :key="page.form.query.typeId" :mode="3"
                  :config="{ key: 'sysRegion', checkStrictly: true }" @change="options.fn.regionChangeHandler">
                </options-selector>
              </div>
            </div>
            <div class="q-block">
              <div class="b-item">
                <options-selector :key="page.form.query.typeId" :mode="4" ref="memberOptionsSelector"
                  placeholder="会员/ID/手机号" :config="{ req: options.fn.memberQuery }"
                  @change="options.fn.memberChangeHandler"></options-selector>
              </div>
            </div>
            <div class="q-block">
              <div class="b-item">
                <options-selector :key="page.form.query.typeId" :mode="1" ref="workflowOptionsSelector"
                  placeholder="审核进度" :config="{ options: adaptor.fn.getOptionsWorkflow }"
                  @change="options.fn.workflowChangeHandler">
                </options-selector>
              </div>
            </div>
          </template>
          <template v-if="page.form.query.typeId === 11" >
            <div class="q-block">
              <div class="b-item">
                <options-selector  :mode="1"  placeholder="余额明细" 
                  :config="{ value: page.form.query.type, isClearable: true, options: [{label: '充值',value: 1},{label:'转让',value:2},{label:'退回',value:3},{label:'划转',value:4}] }"
                   @change="options.fn.balanceTypeChangeHandler">
                </options-selector>
              </div>
            </div>
            <div class="q-block"  v-show="page.form.query.type !== 4">
              <div class="b-item">
                <options-selector  :mode="1"  placeholder="余额类型"
                  :config="{ options: [{label: '傲雪棋余额',value: 1},{label:'思雪余额',value:2}] }"
                  @change="page.form.query.balanceType = $event">
                </options-selector>
              </div>
            </div>
            <div class="q-block" v-show="page.form.query.type === 3"  >
              <div class="b-item">
                <options-selector  :mode="1"  placeholder="审核状态"
                  :config="{ value: page.form.query.status, options: [{label:'审核中',value: 1},{label:'已退回',value:2},{label:'不通过',value:3}]}"
                  @change="options.fn.statusChangeHandler">
                </options-selector>
              </div>
            </div>
            <div class="q-block" v-show="page.form.query.type !== 3">
              <div class="b-item">
                <options-selector  :mode="1"  placeholder="审核状态"
                  :config="{  value: page.form.query.status, options: [{label: '审核中',value: 1},{label:'已通过',value:2},{label:'未通过',value:3}] }"
                  @change="options.fn.statusChangeHandler">
                </options-selector>
              </div>
            </div>
            <div class="q-block" v-show="page.form.query.type === 1">
              <div class="b-item">
                <options-selector  :mode="1" placeholder="充值方式"
                  :config="{ value: page.form.query.topUpType, options: [{label: '现金',value: 1},{label:'销售奖励',value:2},{label:'转账',value:3}] }"
                  @change="page.form.query.topUpType = $event">
                </options-selector>
              </div>
            </div>
            <div class="q-block">
              <div class="b-item">
                <options-selector 
                  :mode="4" ref="distributorOptionsSelector" 
                  :placeholder="'店主/手机号/ID'" 
                  :config="{ req: options.fn.distributorQuery }" @change="options.fn.distributorChangeHandler">
                </options-selector>
              </div>
            </div>
          </template>
          <template v-else-if="page.form.query.typeId!==18">
            <div class="q-block">
              <div class="b-item">
                <options-selector :key="page.form.query.typeId" :mode="1" ref="statusOptionsSelector" placeholder="审核状态"
                  :config="{ options: entitys.Approval._options.status }" @change="options.fn.statusChangeHandler">
                </options-selector>
              </div>
            </div>
          </template>
          <template v-else-if="page.form.query.typeId===18">
            <div class="q-block">
              <div class="b-item">
                <options-selector :key="page.form.query.typeId" :mode="1" ref="statusOptionsSelector" placeholder="审核状态"
                  :config="{ options: entitys.Approval._refoundOptions.status }" @change="options.fn.statusChangeHandler">
                </options-selector>
              </div>
            </div>
          </template>
          <div class="q-block" v-if="[3, 4, 5, 7, 12, 13, 9].includes(page.form.query.typeId)">
            <div class="b-item">
              <options-selector :mode="1" ref="checkStatusOptionsSelector" placeholder="复审状态"
                :config="{ options: entitys.Approval._options.checkStatus }"
                @change="options.fn.checkStatusChangeHandler">
              </options-selector>
            </div>
          </div>
          <div class="q-block" v-if="![1, 2, 11, 17].includes(page.form.query.typeId)">
            <div class="b-item">
              <options-selector :key="page.form.query.typeId" :mode="4" ref="distributorOptionsSelector" :placeholder="
                [3, 4, 5, 12, 13, 8, 9, 15, 18].includes(page.form.query.typeId) ? '店主/ID/手机号' : '收货人/手机号'
              " :config="{ req: options.fn.distributorQuery }" @change="options.fn.distributorChangeHandler">
              </options-selector>
            </div>
          </div>
          <template v-if="page.form.query.typeId === 17">
            <div class="q-block">
              <div class="b-item">
                <options-selector :key="page.form.query.typeId" :mode="4" ref="distributorOptionsSelector"
                  placeholder="转让店主/ID/手机号" :config="{ req: options.fn.distributorQuery }"
                  @change="options.fn.transferDistributorChangeHandler">
                </options-selector>
              </div>
            </div>
            <div class="q-block">
              <div class="b-item">
                <options-selector :key="page.form.query.typeId" :mode="4" ref="distributorOptionsSelector"
                  placeholder="接收店主/ID/手机号" :config="{ req: options.fn.distributorQuery }"
                  @change="options.fn.receiveDistributorChangeHandler">
                </options-selector>
              </div>
            </div>
          </template>
          <div class="q-block" v-if="![17].includes(page.form.query.typeId)">
            <div class="b-item">
              <options-selector :key="page.form.query.typeId" :mode="4" ref="documentMakerOptionsSelector"
                :placeholder="page.form.query.typeId === 9 ? '专属客服' : '制单人'"
                :config="{ req: options.fn.documentMakerQuery }" @change="options.fn.documentMakerChangeHandler">
              </options-selector>
            </div>
          </div>
          <div class="q-block" v-if="[16, 17].includes(page.form.query.typeId)">
            <div class="b-item">
              <options-selector :key="page.form.query.typeId" :mode="4" ref="operatorOptionsSelector" placeholder="提交人"
                :config="{ req: options.fn.operatorQuery }" @change="options.fn.operatorChangeHandler">
              </options-selector>
            </div>
          </div>
          <template v-if="![11,18].includes(page.form.query.typeId)">
            <div class="q-block">
              <div class="b-item">
                <el-input size="small" :placeholder="
                  [1, 2].includes(page.form.query.typeId) ? '区域/地址' : '编号'
                " v-model="page.form.query.keyword"></el-input>
              </div>
            </div>
          </template>
          <template v-if="![1, 2, 11,18].includes(page.form.query.typeId)">
            <div class="q-block">
              <list-sort ref="listSort" :sort-list="options.fn.loadSortConfig" :order="page.form.order"></list-sort>
            </div>
          </template>
          <template v-if="[18].includes(page.form.query.typeId)">
              <div class="b-item" style="width: 200px;margin-left: 10px;">
                <time-picker ref="timePicker" @change="options.fn.timeChangeHandler"></time-picker>
              </div>
          </template>
          <div class="q-block" v-if="[1, 2, 11].includes(page.form.query.typeId)" :key="page.form.query.typeId">
            <time-picker style="width: 230px" :data="[page.form.query.startTime,page.form.query.endTime]" 
             @change="page.timePicker.fn" ref="multipleTimePicker"></time-picker>
          </div>
        </template>
        <template slot="excel-config_1">
          <div class="e-item">
            <div class="i-label">
              <span>财务审核通过</span>
            </div>
            <div class="i-value">
              <time-picker :data="[$dayjs().format('YYYY-MM-DD'), $dayjs().format('YYYY-MM-DD')]" type="daterange"
                placeholder="选择审核通过日期" @change="page.excel.fn.approvedTimeChangeHandler"></time-picker>
            </div>
          </div>
          <div class="e-item">
            <div class="i-label">
              <span>业绩时间</span>
            </div>
            <div class="i-value">
              <time-picker type="month" :no-value="true" placeholder="选择业绩时间"
                @change="page.excel.fn.achieveTimeChangeHandler"></time-picker>
            </div>
          </div>
        </template>
        <template slot="action" v-if="[18].includes(page.form.query.typeId)">
            <el-button size="small" type="primary" @click="addRefund">添加申请</el-button>
        </template>
      </list-page>
    </div>

    <popup-confirm ref="popupConfirmApprovalSubRegionAllocateAgentAdd" title="添加区域申请">
      <div class="popup-confirm_approval-sub-region-allocate-agent-add">
        <form-validate ref="approvalSubRegionAllocateAgentAdd"
          :form="popup.approvalSubRegionAllocateAgentAdd.attr.form">
          <form-validate-field label="申请区域：" :field="
            popup.approvalSubRegionAllocateAgentAdd.attr.form
              .approvalSubRegionAllocateAgent
          ">
            <div class="a-item">
              <div class="i-option">
                <options-selector :mode="3" :config="{ key: 'sysRegion', checkStrictly: true }" @change="
                  popup.approvalSubRegionAllocateAgentAdd.fn.provinceChangeHandler
                "></options-selector>
              </div>
              <div class="i-value">
                <el-table :data="popup.approvalSubRegionAllocateAgentAdd.attr.regionAllocateList" stripe
                  style="width: 100%" highlight-current-row @row-click="
                    popup.approvalSubRegionAllocateAgentAdd.fn.regionAllocateSelect
                  ">
                  <el-table-column label="选择">
                    <template slot-scope="props">
                      <el-checkbox :value="
                        popup.approvalSubRegionAllocateAgentAdd.attr
                          .regionAllocateActive.id === props.row.id
                      "></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column prop="id" label="序号"></el-table-column>
                  <el-table-column prop="name" label="名称"></el-table-column>
                  <el-table-column prop="remark" label="街道"></el-table-column>
                </el-table>
              </div>
            </div>
          </form-validate-field>
          <form-validate-field label="申请人：" :field="
            popup.approvalSubRegionAllocateAgentAdd.attr.form
              .approvalSubRegionAllocateAgent
          ">
            <div class="a-item a-item_member">
              <div class="i-option">
                <options-selector :mode="4" placeholder="店主/ID" :config="{
                  req: popup.approvalSubRegionAllocateAgentAdd.fn.memberQuery,
                }" @change="popup.approvalSubRegionAllocateAgentAdd.fn.memberChangeHandler"></options-selector>
              </div>
              <div class="i-value">
                <grid :col="3">
                  <grid-item label="姓名：">
                    <span>
                      {{
                          blankGet(
                            $_.get(
                              popup.approvalSubRegionAllocateAgentAdd.attr.applier,
                              "nickname"
                            )
                          )
                      }}
                      {{
                          blankGet(
                            $_.get(
                              popup.approvalSubRegionAllocateAgentAdd.attr.applier,
                              "id"
                            )
                          )
                      }}
                    </span>
                  </grid-item>
                  <grid-item label="类型：">
                    <span>
                      {{
                          blankGet(
                            entitys.Member.filter(
                              "type",
                              $_.get(
                                popup.approvalSubRegionAllocateAgentAdd.attr.applier,
                                "type"
                              )
                            )
                          )
                      }}
                    </span>
                  </grid-item>
                  <grid-item label="推荐人：">
                    <span>
                      {{
                          blankGet(
                            $_.get(
                              popup.approvalSubRegionAllocateAgentAdd.attr.applier,
                              "parent.nickname"
                            )
                          )
                      }}
                      {{
                          blankGet(
                            $_.get(
                              popup.approvalSubRegionAllocateAgentAdd.attr.applier,
                              "parent.id"
                            )
                          )
                      }}
                    </span>
                  </grid-item>
                  <grid-item label="上级代理：">
                    <span>
                      {{
                          blankGet(
                            $_.get(
                              popup.approvalSubRegionAllocateAgentAdd.attr.applier,
                              "distributor.nickname"
                            )
                          )
                      }}
                      {{
                          blankGet(
                            $_.get(
                              popup.approvalSubRegionAllocateAgentAdd.attr.applier,
                              "distributor.id"
                            )
                          )
                      }}
                    </span>
                  </grid-item>
                  <grid-item label="注册时间：">
                    <span>
                      {{
                          blankGet(
                            $_.get(
                              popup.approvalSubRegionAllocateAgentAdd.attr.applier,
                              "createTime"
                            )
                          )
                      }}
                    </span>
                  </grid-item>
                </grid>
              </div>
            </div>
          </form-validate-field>
          <form-validate-field label="团队领导人：" :field="
            popup.approvalSubRegionAllocateAgentAdd.attr.form
              .approvalSubRegionAllocateAgent
          ">
            <options-selector :mode="4" placeholder="店主/ID" :config="{

              req: popup.approvalSubRegionAllocateAgentAdd.fn.teamLeaderQuery,
            }" @change="popup.approvalSubRegionAllocateAgentAdd.fn.teamLeaderChangeHandler"></options-selector>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmApprovalSubShopAdd" title="添加店铺">
      <div class="popup-confirm_approval-sub-shop-add">
        <form-validate ref="approvalSubShopAdd" :form="popup.approvalSubShopAdd.attr.form">
          <form-validate-field label="申请区域：" :field="popup.approvalSubShopAdd.attr.form.approvalSubShop">
            <div class="a-item">
              <div class="i-option">
                <options-selector :mode="3" :config="{ key: 'sysRegion', checkStrictly: true }"
                  @change="popup.approvalSubShopAdd.fn.provinceChangeHandler"></options-selector>
              </div>
              <div class="i-value">
                <el-table :data="popup.approvalSubShopAdd.attr.regionAllocateList" stripe style="width: 100%"
                  highlight-current-row @row-click="popup.approvalSubShopAdd.fn.regionAllocateSelect">
                  <el-table-column label="选择">
                    <template slot-scope="props">
                      <el-checkbox :value="
                        popup.approvalSubShopAdd.attr.regionAllocateActive.id ===
                        props.row.id
                      ">
                      </el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column prop="id" label="序号"></el-table-column>
                  <el-table-column prop="name" label="名称"></el-table-column>
                  <el-table-column prop="regionAllocateAgentName" label="拥有人"></el-table-column>
                  <el-table-column prop="remark" label="街道"></el-table-column>
                </el-table>
              </div>
            </div>
          </form-validate-field>
          <form-validate-field label="申请人：" :field="popup.approvalSubShopAdd.attr.form.approvalSubShop">
            <div class="a-item a-item_member">
              <div class="i-option">
                <options-selector :mode="4" placeholder="店主/ID"
                  :config="{ req: popup.approvalSubShopAdd.fn.memberQuery }"
                  @change="popup.approvalSubShopAdd.fn.memberChangeHandler"></options-selector>
              </div>
              <div class="i-value">
                <grid :col="3">
                  <grid-item label="姓名：">
                    <span>
                      {{
                          blankGet(
                            $_.get(popup.approvalSubShopAdd.attr.applier, "nickname")
                          )
                      }}
                      {{
                          blankGet(
                            $_.get(popup.approvalSubShopAdd.attr.applier, "id")
                          )
                      }}
                    </span>
                  </grid-item>
                  <grid-item label="类型：">
                    <span>
                      {{
                          blankGet(
                            entitys.Member.filter(
                              "type",
                              $_.get(popup.approvalSubShopAdd.attr.applier, "type")
                            )
                          )
                      }}
                    </span>
                  </grid-item>
                  <grid-item label="推荐人：">
                    <span>
                      {{
                          blankGet(
                            $_.get(popup.approvalSubShopAdd.attr.applier, "parent.nickname")
                          )
                      }}
                      {{
                          blankGet(
                            $_.get(popup.approvalSubShopAdd.attr.applier, "parent.id")
                          )
                      }}
                    </span>
                  </grid-item>
                  <grid-item label="上级代理：">
                    <span>
                      {{
                          blankGet(
                            $_.get(
                              popup.approvalSubShopAdd.attr.applier,
                              "distributor.nickname"
                            )
                          )
                      }}
                      {{
                          blankGet(
                            $_.get(
                              popup.approvalSubShopAdd.attr.applier,
                              "distributor.id"
                            )
                          )
                      }}
                    </span>
                  </grid-item>
                  <grid-item label="注册时间：">
                    <span>
                      {{
                          blankGet(
                            $_.get(popup.approvalSubShopAdd.attr.applier, "createTime")
                          )
                      }}
                    </span>
                  </grid-item>
                </grid>
              </div>
            </div>
          </form-validate-field>
          <form-validate-field label="团队领导人：" :field="popup.approvalSubShopAdd.attr.form.approvalSubShop">
            <options-selector :mode="4" placeholder="店主/ID"
              :config="{ req: popup.approvalSubShopAdd.fn.teamLeaderQuery }"
              @change="popup.approvalSubShopAdd.fn.teamLeaderChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field v-if="
            popup.approvalSubShopAdd.attr.regionAllocateActive.isEnableRegionApply === 1
          " label="区域授权附件：" :field="popup.approvalSubShopAdd.attr.form.approvalSubShop">
            <file-uploader :max="2" @change="popup.approvalSubShopAdd.fn.fileAuthorizeAgreementChangeHandler">
            </file-uploader>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmApprovalSubRefundAdd" title="错账退回申请">
      <div class="popup-confirm_approval-sub-refund-add">
        <form-validate>
          <form-validate-field label="店主姓名" :field="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.memberId">
             <options-selector :mode="4" placeholder="店主/ID" :config="{
                  req: popup.approvalSubRefundAdd.fn.memberQuery,
              }" @change="popup.approvalSubRefundAdd.fn.memberChangeHandler"></options-selector>
         </form-validate-field>
          <form-validate-field label="转账人姓名" :field="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.accountOwner">
            <el-input placeholder="请输转账人姓名姓名" v-model="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.accountOwner.value"></el-input>
          </form-validate-field>
          <form-validate-field label="银行卡号" :field="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.account">
            <el-input placeholder="请正确输入银行卡号" v-model="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.account.value"></el-input>
          </form-validate-field>
          <form-validate-field label="开户行" :field="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.accountOpen">
            <el-input placeholder="请输入开户行" v-model="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.accountOpen.value"></el-input>
          </form-validate-field>
          <form-validate-field label="错账金额" :field="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.amount">
            <el-input placeholder="请输入金额" v-model="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.amount.value"></el-input>
          </form-validate-field>
          <form-validate-field label="公户名称" :field="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.axqSelfEmployedLaborerId">
            <options-selector ref="sysBankOptionsSelector" :mode="2" :config="{ key: 'axqSelfEmployedLaborer' }"
              @change="options.fn.sysBankChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field label="转账日期" :field="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.time">
             <el-date-picker v-model="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.time.value" type="date" placeholder="选择日期"></el-date-picker>
          </form-validate-field>
          <form-validate-field label="备注" :field="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.remark">
            <el-input type="textarea" :rows="5" v-model="popup.approvalSubRefundAdd.attr.form.approvalSubRefund.remark.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from "@/components/form-validate";
import formValidateField from "@/components/form-validate/field";
import listPage from "@/components/list-page";
import listSort from "@/components/list-sort";
import optionsSelector from "@/components/options-selector";
import timePicker from "@/components/time-picker";
import popupConfirm from "@/components/popup/type/confirm";
import fileUploader from "@/components/file-uploader";
import grid from "@/components/grid";
import gridItem from "@/components/grid/item";
import { formToolkit } from "@/model/form-toolkit";
import { model } from "@/model";
import { mapState } from "vuex";

const {
  Approval,
  Member,
  AxqStaff,
  ApprovalSubRegionAllocateAgent,
  ApprovalSubShop,
  ApprovalSubShopChange,
  ApprovalSubCancelPurchanse,
  RegionAllocate,
  Purchanse,
  RevertForm,
  ApprovalSubRefund
} = model.collection;
export default {
  components: {
    formValidate,
    formValidateField,
    listPage,
    listSort,
    optionsSelector,
    popupConfirm,
    fileUploader,
    grid,
    gridItem,
    timePicker,
  },
  data() {
    return {
      tabIndex: 1,
      entitys: {
        Approval,
        Member,
      },
      options: {
        fn: {
          timeChangeHandler: (e) => {
            const [startTime, endTime] = e;
            this.page.form.query.startTime = startTime;
            this.page.form.query.endTime = endTime;
          },
          sysBankChangeHandler: (e, _raw) => {
            this.popup.approvalSubRefundAdd.attr.form.approvalSubRefund.axqSelfEmployedLaborerId.value = e
          },
          regionChangeHandler: (e) => {
            const [provinceId, cityId, districtId] = e.map((i) => i.id);
            this.page.form.query.provinceId = provinceId;
            this.page.form.query.cityId = cityId;
            this.page.form.query.districtId = districtId;
          },
          statusChangeHandler: (e) => {
            this.page.form.query.status = e;
          },
          checkStatusChangeHandler: (e) => {
            this.page.form.query.checkStatus = e;
          },
          workflowChangeHandler: (e) => {
            this.page.form.query.workflowId = e;
          },
          documentMakerQuery: (e, ok) => {
            let deptId = "";
            if ([3, 4, 5, 6, 7, 12, 13].includes(this.page.form.query.typeId)) {
              deptId = 11;
            }
            AxqStaff.sendApi("staffPage", {
              params: {},
              data: {
                query: {
                  keyword: e,
                  deptId,
                },
              },
            }).then((res) => {
              const { data } = res;
              ok(
                data.map((i) => ({
                  value: i.id,
                  label: i.nickname,
                }))
              );
            });
          },
          documentMakerChangeHandler: (e) => {
            if(this.page.form.query.typeId===18){
               this.page.form.query.operatorId = e
            }else{
                this.page.form.query.documentMakerId = e;
            }
          },
          operatorQuery: (e, ok) => {
            AxqStaff.sendApi("staffPage", {
              params: {},
              data: {
                query: {
                  keyword: e,
                },
              },
            }).then((res) => {
              const { data } = res;
              ok(
                data.map((i) => ({
                  value: i.id,
                  label: i.nickname,
                }))
              );
            });
          },
          operatorChangeHandler: (e) => {
            this.page.form.query.operatorId = e;
          },
          memberQuery: (e, ok) => {
            Member.sendApi("page", {
              params: {},
              data: {
                query: {
                  keyword: e,
                },
              },
            }).then((res) => {
              const { data } = res;
              ok(
                data.map((i) => ({
                  value: i.id,
                  label: `${i.nickname}/${i.id}`,
                }))
              );
            });
          },
          memberChangeHandler: (e) => {
            this.page.form.query.memberId = e;
          },
          distributorQuery: (e, ok) => {
            Member.sendApi("page", {
              params: {},
              data: {
                query: {
                  type: 7,
                  keyword: e,
                },
              },
            }).then((res) => {
              const { data } = res;
              ok(
                data.map((i) => ({
                  value: i.id,
                  label: `${i.nickname}/${i.id}`,
                }))
              );
            });
          },
          distributorChangeHandler: (e) => {
            if(this.page.form.query.typeId===18){
              this.page.form.query.merberId = e;
            }else{
              this.page.form.query.distributorId = e;
            }
          },
          transferDistributorChangeHandler: (e) => {
            this.page.form.query.transferId = e;
          },
          receiveDistributorChangeHandler: (e) => {
            this.page.form.query.receiveId = e;
          },
          balanceTypeChangeHandler:(e)=>{
            if(e !== 1){
              this.page.form.query.topUpType = "";
            }
            if(e === 4){
              this.page.form.query.balanceType = "";
            }
            this.page.form.query.type = e;
          },
          loadSortConfig: () => {
            const s = [];
            if (this.page.form.query.typeId > 2 && this.page.form.query.typeId !== 11) {
              s.push({
                label: "创建时间",
                value: "createTime",
                order: "desc",
              })
            }
            if (this.page.form.query.typeId === 9) {
              s.push({
                label: "客服审核时间",
                value: "customerServiceApprovedTime",
                order: "desc",
              });
            }
            return s;
          },
        },
      },
      adaptor: {
        fn: {
          getOptionsWorkflow: () => {
            if (this.page.form.query.typeId === 1) {
              return ApprovalSubRegionAllocateAgent._options.workflow;
            }
            if (this.page.form.query.typeId === 2) {
              return ApprovalSubShop._options.workflow;
            }
            return [];
          },
        },
      },
      page: {
        config: {
          entity: "Approval",
          action: "page",
          column: [
            {
              prop: "id",
              label: "ID",
            },
            {
              columns: () => {
                if (this.page.form.query.typeId === 1) {
                  return [
                    {
                      prop: "",
                      label: "申请人/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.applierName)}/${this.blankGet(
                              props.row._raw.applierMemberId
                            )}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "上级推荐人/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.inviteMemberName
                            )}/${this.blankGet(props.row._raw.inviteMemberId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "上级总代/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.superiorDistributorName
                            )}/${this.blankGet(props.row._raw.superiorDistributorId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "团队领导人/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.topDistributorName
                            )}/${this.blankGet(props.row._raw.topDistributorId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "申请区域",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            this.blankGet(
                              `${props.row._raw.provinceName}-${props.row._raw.cityName}-${props.row._raw.districtName}-${props.row._raw.regionAllocateName}`
                            )
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "提交人",
                      VNodes: [
                        ({ h, props }) => {
                          return h("div", `${this.blankGet(props.row._raw.creatorName)}`);
                        },
                      ],
                    },
                    {
                      prop: "status",
                      label: "进度",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            {},
                            ApprovalSubRegionAllocateAgent.filter(
                              "workflow",
                              props.row._raw.workflowId
                            )
                          );
                        },
                        ({ h, props }) => {
                          return h(
                            "p",
                            {},
                            props.row._raw.workflowId === 12 &&
                              props.row._raw.depositPassedTime
                              ? `保证金通过时间：${$dayjs().diff(
                                $dayjs(props.row._raw.depositPassedTime),
                                "day"
                              )}天`
                              : ""
                          );
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 2) {
                  return [
                    {
                      prop: "",
                      label: "申请人/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.applierName)}/${this.blankGet(
                              props.row._raw.applierMemberId
                            )}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "上级推荐人/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.inviteMemberName
                            )}/${this.blankGet(props.row._raw.inviteMemberId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "上级总代/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.topDistributorName
                            )}/${this.blankGet(props.row._raw.superiorDistributorId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "团队领导人/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.superiorDistributorName
                            )}/${this.blankGet(props.row._raw.topDistributorId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "申请区域/方式",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            this.blankGet(
                              `${props.row._raw.provinceName}-${props.row._raw.cityName}-${props.row._raw.districtName}-${props.row._raw.regionAllocateName}`
                            )
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "区域所有人/电话",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            this.blankGet(
                              `${props.row._raw.regionAllocateAgentName}/${props.row._raw.regionAllocateAgentMobile}`
                            )
                          );
                        },
                      ],
                    },
                    {
                      prop: "status",
                      label: "进度",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            {},
                            ApprovalSubShop.filter("workflow", props.row._raw.workflowId)
                          );
                        },
                        ({ h, props }) => {
                          return h(
                            "p",
                            {},
                            props.row._raw.workflowId === 17 &&
                              props.row._raw.depositPassedTime
                              ? `保证金通过时间：${$dayjs().diff(
                                $dayjs(props.row._raw.depositPassedTime),
                                "day"
                              )}天`
                              : ""
                          );
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 3) {
                  return [
                    {
                      prop: "",
                      label: "订单编号",
                      VNodes: (props) => {
                        const waitPrintPurchanseList = this.$_.get(
                          this.ws,
                          "axqPrintStatus.waitPrintPurchanseList",
                          []
                        );
                        const btns = [
                          ({ h, props }) => {
                            return h("p", `${this.blankGet(props.row._raw.purchanseSn)}`);
                          },
                        ];
                        if (props.row._raw.isNewDistributor) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "新店主订单"
                            );
                          });
                        }
                        if (props.row._raw.purchanseGenType === 2) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "店主创建"
                            );
                          });
                        }
                        if (waitPrintPurchanseList.includes(props.row._raw.purchanseId)) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                  type: "warning",
                                },
                              },
                              "等待仓库打印"
                            );
                          });
                        }
                        if (props.row._raw.checkStatus === 1) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "客服复审通过"
                            );
                          });
                        }
                        if (props.row._raw.checkStatus > 1) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "客服复审通过"
                            );
                          });
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "财务复审通过"
                            );
                          });
                        }
                        return btns;
                      },
                    },
                    {
                      prop: "",
                      label: [3, 4, 5, 12, 13].includes(this.page.form.query.typeId) ? "ID/店主" : "ID/店主/手机号",
                      VNodes: [
                        ({ h, props }) => {
                          const content = [3, 4, 5, 12, 13].includes(this.page.form.query.typeId) ? `${this.blankGet(props.row._raw.distributorId)}/${this.blankGet(props.row._raw.distributorName)}` : `${this.blankGet(
                            props.row._raw.distributorId
                          )}/${this.blankGet(
                            props.row._raw.distributorName
                          )}/${this.blankGet(props.row._raw.distributorMobile)}`
                          return h(
                            "p",
                            content
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "关联账户",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.axqSelfEmployedLaborerName)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "订单金额",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.amount)}`);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "下单时间",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.purchanseCreateTime)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "制单人",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.documentMakerName)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "支付方式",
                      width: 150,
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "div",
                            {},
                            this.getPaymentStrFilter(props.row._raw).map((i) => {
                              return h("p", {}, i);
                            })
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "备注",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.remark)}`);
                        },
                      ],
                    },
                  ];
                }
                if ([4, 5, 12, 13].includes(this.page.form.query.typeId)) {
                  const waitPrintPurchanseList = this.$_.get(
                    this.ws,
                    "axqPrintStatus.waitPrintPurchanseList",
                    []
                  );
                  return [
                    {
                      prop: "",
                      label: "订单编号",
                      VNodes: (props) => {
                        const btns = [
                          ({ h, props }) => {
                            return h("p", `${this.blankGet(props.row._raw.purchanseSn)}`);
                          },
                        ];
                        if (props.row._raw.isNewDistributor) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "新店主订单"
                            );
                          });
                        }
                        if (props.row._raw.purchanseGenType === 2) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "店主创建"
                            );
                          });
                        }
                        if (waitPrintPurchanseList.includes(props.row._raw.purchanseId)) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                  type: "warning",
                                },
                              },
                              "等待仓库打印"
                            );
                          });
                        }
                        if (props.row._raw.checkStatus === 1) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "客服复审通过"
                            );
                          });
                        }
                        if (props.row._raw.checkStatus > 1) {
                          if (this.page.form.query.typeId !== 5) {
                            btns.push(({ h, props }) => {
                              return h(
                                "el-tag",
                                {
                                  props: {
                                    size: "mini",
                                  },
                                },
                                "客服复审通过"
                              );
                            });
                          }
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "财务复审通过"
                            );
                          });
                        }
                        return btns;
                      },
                    },
                    {
                      prop: "",
                      label: "ID/店主",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.distributorId
                            )}/${this.blankGet(
                              props.row._raw.distributorName
                            )}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "关联账户",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.axqSelfEmployedLaborerName)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "订单金额",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.amount)}`);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "下单时间",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.purchanseCreateTime)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "制单人",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.documentMakerName)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "支付方式",
                      width: 150,
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "div",
                            {},
                            this.getPaymentStrFilter(props.row._raw).map((i) => {
                              return h("p", {}, i);
                            })
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "备注",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.remark)}`);
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 7) {
                  const waitPrintPurchanseList = this.$_.get(
                    this.ws,
                    "axqPrintStatus.waitPrintPurchanseList",
                    []
                  );
                  return [
                    {
                      prop: "",
                      label: "订单编号",
                      VNodes: (props) => {
                        const btns = [
                          ({ h, props }) => {
                            return h("p", `${this.blankGet(props.row._raw.purchanseSn)}`);
                          },
                        ];
                        if (waitPrintPurchanseList.includes(props.row._raw.purchanseId)) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                  type: "warning",
                                },
                              },
                              "等待仓库打印"
                            );
                          });
                        }
                        if (props.row._raw.checkStatus === 1) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "客服复审通过"
                            );
                          });
                        }
                        if (props.row._raw.checkStatus > 1) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "客服复审通过"
                            );
                          });
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "财务复审通过"
                            );
                          });
                        }
                        return btns;
                      },
                    },
                    {
                      prop: "",
                      label: "实收金额",
                      VNodes: [
                        ({ h }) => {
                          return h("p", "/");
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "收货人",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.recipient)}`);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "联系方式",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.recipientMobile)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "下单时间",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.purchanseCreateTime)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "制单人",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.documentMakerName)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "支付方式",
                      width: 150,
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "div",
                            {},
                            this.getPaymentStrFilter(props.row._raw).map((i) => {
                              return h("p", {}, i);
                            })
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "备注",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.remark)}`);
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 8) {
                  return [
                    {
                      prop: "",
                      label: "订单编号",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.purchanseSn)}`);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "类型",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            ApprovalSubCancelPurchanse.filter(
                              "type",
                              props.row._raw.cancelType
                            )
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "店主",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.distributorName
                            )}/${this.blankGet(props.row._raw.distributorId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "订单金额",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.amount)}`);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "下单时间",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.purchanseCreateTime)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "提交人",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.documentMakerName)}`
                          );
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 9) {
                  return [
                    {
                      prop: "",
                      label: "退换货单编号",
                      VNodes: (props) => {
                        const btns = [
                          ({ h, props }) => {
                            return h(
                              "p",
                              `${this.blankGet(props.row._raw.revertFormSn)}`
                            );
                          },
                        ];
                        if (props.row._raw.checkStatus > 1) {
                          btns.push(({ h, props }) => {
                            return h(
                              "el-tag",
                              {
                                props: {
                                  size: "mini",
                                },
                              },
                              "财务复审通过"
                            );
                          });
                        }
                        return btns;
                      },
                    },
                    {
                      prop: "",
                      label: "金额",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.amountPackage)}`);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "店主/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.distributorName
                            )}/${this.blankGet(props.row._raw.id)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "专属客服",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.customerServiceName)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "客服审核时间",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${props.row._raw.status === 3
                              ? ""
                              : this.blankGet(
                                props.row._raw.customerServiceApprovedTime
                              )
                            }`
                          );
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 11) {
                  return [
                    ...(this.page.form.query.type === 1 || 
                    this.page.form.query.type === 3) ? [
                    {
                        prop: "",
                        label: "店主/ID",
                        VNodes: [
                          ({ h, props }) => {
                            return h(
                              "p",
                              `${this.blankGet(
                                props.row._raw.distributorName
                              )}/${this.blankGet(props.row._raw.distributorId)}`
                            );
                          },
                        ],
                    },
                    ]:[],
                    ...this.page.form.query.type === 1 ? [
                    {
                      prop: "",
                      label: "余额类型",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            props.row._raw.balanceType === 1 ? "傲雪棋余额" : "思雪余额"
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "充值金额",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.amount)}`);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "充值方式",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            ({1:'现金',2:'销售奖励',3:'转账'})[ this.blankGet(
                              props.row._raw.topUpType
                            )]
                          );
                        },
                      ],
                    },
                    ]:[],
                    ...this.page.form.query.type === 2 ? [
                    {
                      prop: "",
                      label: "转让店主",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                              `${this.blankGet(
                                props.row._raw.distributorName
                              )}/${this.blankGet(props.row._raw.distributorId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "接收店主",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                                props.row._raw.receiverName
                              )}/${this.blankGet(props.row._raw.receiverId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "转让金额",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                             this.blankGet(props.row._raw.amount)
                          );
                        },
                      ],
                    },
                    ]:[],
                    ...this.page.form.query.type === 3 ? [
                    {
                      prop: "",
                      label: "退回金额",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                              this.blankGet(props.row._raw.amount)
                          );
                        },
                      ],
                    },
                    ]:[],
                    ...this.page.form.query.type === 4 ? [
                        {
                          prop: "",
                          label: "新店主/ID",
                          VNodes: [
                            ({ h, props }) => {
                              const content = `${props.row._raw.distributorName}/${props.row._raw.distributorId}`
                              return h(
                                "p",
                                 content
                              );
                            },
                          ],
                        },
                        {
                          prop: "",
                          label: "接收店主/ID",
                          VNodes: [
                            ({ h, props }) => {
                              const content = this.blankGet(props.row._raw.receiverName)?`${this.blankGet(props.row._raw.receiverName)}/${this.blankGet(props.row._raw.receiverId)}`:'无'
                              return h(
                                "p",
                                content
                              );
                            },
                          ],
                        },
                        {
                          prop: "",
                          label: "划转金额",
                          VNodes: [
                            ({ h, props }) => {
                              return h(
                                "p",
                                  this.blankGet(props.row._raw.amount)
                              );
                            },
                          ],
                        },
                    ] :[],
                    {
                      prop: "",
                      label: "制单人",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.operatorName)}`);
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 14) {
                  return [
                    {
                      prop: "",
                      label: "店铺",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", props.row._raw.shopName);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "操作人",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", props.row._raw.operatorName);
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 15) {
                  return [
                    {
                      prop: "",
                      label: "业绩接收代理",
                      VNodes: [
                        ({ h, props }) => {
                          const content = `${props.row._raw.recipientName}/${props.row._raw.recipientId}`
                          return h("p", content);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "业绩出让代理",
                      VNodes: [
                        ({ h, props }) => {
                          const content = `${props.row._raw.giveName}/${props.row._raw.giveId}`
                          return h("p", content);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "业绩",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", props.row._raw.integral);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "业绩时间",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            this.$dayjs(props.row._raw.achieveTime).format("YYYY-MM")
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "制单人",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", props.row._raw.operatorName);
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 16) {
                  return [
                    {
                      prop: "",
                      label: "送货单号",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.offlineSn)}`);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "送货数量",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", props.row._raw.quantity);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "制单人",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", props.row._raw.documentMakerName);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "提交人",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.operatorName)}`);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "备注",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${this.blankGet(props.row._raw.remark)}`);
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 17) {
                  return [
                    {
                      prop: "sn",
                      label: "编号",
                    },
                    {
                      prop: "",
                      label: "店铺ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", props.row._raw.shopId);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "类型",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            ApprovalSubShopChange.filter("type", props.row._raw.type)
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "转让店主姓名/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.transferNickname
                            )}/${this.blankGet(props.row._raw.transferId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "接收店主姓名/ID",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(
                              props.row._raw.receiveNickname
                            )}/${this.blankGet(props.row._raw.receiveId)}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "操作人",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", props.row._raw.nickname);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "备注",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", this.blankGet(props.row._raw.remark));
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "进度",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            ApprovalSubShopChange.filter(
                              "workflow",
                              props.row._raw.workflowId
                            )
                          );
                        },
                      ],
                    },
                  ];
                }
                if (this.page.form.query.typeId === 18) {
                  return [
                    {
                      prop: "",
                      label: "店主/ID",
                       VNodes: [
                        ({ h, props }) => {
                          const content = `${props.row._raw.transferNickname}/${props.row._raw.transferId}`
                          return h("p", content);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "收款人",
                      VNodes: [
                        ({ h, props }) => {
                          const content = JSON.parse(props.row._raw.accountData).accountOwner
                          return h("p", content);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "错账余额",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", props.row._raw.amount);
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "制单人",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", props.row._raw.operatorName);
                        },
                      ],
                    }
                  ]
                }
              },
            },
            {
              prop: "status",
              label: "审核状态",
              VNodes: [
                ({ h, props }) => {
                  return h(
                    "p",
                    {
                      style: (() => {
                        let color = "";
                        if (props.row.status === 2) {
                          color = "#67C23A";
                        }
                        if (props.row.status === 3) {
                          color = "#E6A23C";
                        }
                        if (props.row.status === 4) {
                          color = "#F56C6C";
                        }
                        return {
                          color,
                        };
                      })(),
                    },
                    this.page.form.query.typeId === 11 ? 
                    ( this.page.form.query.type === 3 ? {1:'审核中',2:'已退回',3:'不通过'} : {1:'审核中',2:'已通过',3:"未通过" })[props.row.status] :
                    this.entitys.Approval.filter("status", props.row.status)
                  );
                },
              ],
            },
            {
              columns: () => {
                return [{
                  prop: "",
                  label: this.page.form.query.typeId === 11 ?'申请时间':"创建时间",
                  VNodes: [
                    ({ h, props }) => {
                      return h(
                        "p",
                        props.row.createTime
                      );
                    },
                  ],
                }]
              }
            },
            {
              fixed: "right",
              prop: "action",
              label: "操作",
              VNodes: (props) => {
                let btn = [
                  ({ h, props }) => {
                    return h(
                      "el-button",
                      {
                        props: {
                          type: "primary",
                          size: "mini",
                        },
                        nativeOn: {
                          click: () => {
                            this.go(
                              `/approval/${props.row.id}?type=${this.page.form.query.typeId}`
                            );
                          },
                        },
                      },
                      "详情"
                    );
                  },
                ];
                if (
                  ([3, 4, 7, 12, 13].includes(this.page.form.query.typeId) &&
                    props.row._raw.checkStatus === 1) ||
                  (this.page.form.query.typeId === 5 && !props.row._raw.checkStatus) ||
                  (this.page.form.query.typeId === 9 && !props.row._raw.checkStatus)
                ) {
                  btn.push(({ h, props }) => {
                    return h(
                      "el-button",
                      {
                        props: {
                          type: "primary",
                          size: "mini",
                          disabled: props.row.status && props.row.status !== 2,
                        },
                        nativeOn: {
                          click: () => {
                            this.updateCheckStatus(props.row, 3);
                          },
                        },
                      },
                      "复审通过"
                    );
                  });
                }
                return btn;
              },
            },
          ],
          formQueryPreHook: () => {
            let f = {};
            if (!this.isAdmin) {
              if ([3, 4, 5, 7, 8, 9, 12, 13].includes(this.page.form.query.typeId)) {
                f.customerServiceId =
                  this.axqStaffInfo.deptId === 11 &&
                    !this.$_.get(
                      this.axqStaffInfo,
                      "accessExtraJson.allowedGetAllDistributor"
                    )
                    ? this.axqStaffInfo.id
                    : "";
                f.financialServiceId =
                  this.axqStaffInfo.deptId === 9 &&
                    !this.$_.get(
                      this.axqStaffInfo,
                      "accessExtraJson.allowedGetAllDistributor"
                    )
                    ? this.axqStaffInfo.id
                    : "";
              }
            }
            return f;
          },
          allowExportExcel: true,
        },
        form: {
          query: {
            typeId: Number(this.$route.query.type) || 1,
            workflowId: "",
            distributorId: "",
            memberId: "",
            status: "",
            keyword: "",
            operatorId: "",
            documentMakerId: "",
            provinceId: "",
            cityId: "",
            districtId: "",
            transferId: "",
            receiveId: "",
            checkStatus: "",
            balanceType: "",
            type: "",
            topUpType:"",
            startTime:"",
            endTime:"",
          },
          order: {
            createTime: "desc",
            customerServiceApprovedTime: "desc",
            depositPassedTime: "asc",
          },
        },
        timePicker: {
          1: {
            startTime: "",
            endTime: ""
          },
          2: {
            startTime: "",
            endTime: ""
          },
          11: {
            startTime: "",
            endTime: ""
          },
          fn: (timeArr) => {
            this.page.form.query.startTime = this.page.timePicker[this.page.form.query.typeId].startTime = timeArr[0];
            this.page.form.query.endTime = this.page.timePicker[this.page.form.query.typeId].endTime = this.$dayjs(timeArr[1]).add(1, 'd').format('YYYY-MM-DD');
          }
        },
        excel: {
          attr: {
            config: {
              params: {
                approvedStartTime: this.$dayjs().format("YYYY-MM-DD"),
                approvedEndTime: this.$dayjs().format("YYYY-MM-DD"),
                achieveYear: "",
                achieveMonth: "",
              },
              data: {},
            },
          },
          fn: {
            loadConfig: () => {
              return this.page.excel.attr.config;
            },
            approvedTimeChangeHandler: (e) => {
              this.page.excel.attr.config.params.approvedStartTime = e[0];
              this.page.excel.attr.config.params.approvedEndTime = e[1];
            },
            achieveTimeChangeHandler: (e) => {
              this.page.excel.attr.config.params.achieveYear = e ? this.getYear(e) : "";
              this.page.excel.attr.config.params.achieveMonth = e ? this.getMonth(e) : "";
            },
          },
        },
        fn: {
          resetHandler: () => {
            if ([1, 2].includes(this.tabIndex)) {
              this.$refs.memberOptionsSelector.reset();
              this.$refs.workflowOptionsSelector.reset();
            } else {
              this.$refs.distributorOptionsSelector.reset();
            }
            if (this.tabIndex === 16) {
              this.$refs.operatorOptionsSelector.reset();
            }
            this.$refs.statusOptionsSelector.reset();
            this.$refs.checkStatusOptionsSelector.reset();
            this.$refs.documentMakerOptionsSelector.reset();
          },
        },
      },
      popup: {
        approvalSubRegionAllocateAgentAdd: {
          attr: {
            form: Approval.formUtil().generator("add", "approvalSubRegionAllocateAgent"),
            regionAllocateList: [],
            regionAllocateActive: {},
            applier: {},
            teamLeaderId: 0,
          },
          fn: {
            provinceChangeHandler: (e) => {
              const [provinceId, cityId, districtId] = e.map((i) => i.id);
              RegionAllocate.sendApi("allocatePage", {
                params: {
                  pageIndex: 1,
                  pageSize: 10,
                },
                data: {
                  query: {
                    provinceId,
                    cityId,
                    districtId,
                    status: 1,
                    visible: 1,
                    isEnableRegionApply: 1,
                  },
                },
              }).then((res) => {
                const { status, data } = res;
                if (status) {
                  this.popup.approvalSubRegionAllocateAgentAdd.attr.regionAllocateList = data;
                } else {
                  this.$message({
                    message: "获取该地区信息失败",
                    type: "error",
                  });
                }
              });
            },
            regionAllocateSelect: (e) => {
              this.popup.approvalSubRegionAllocateAgentAdd.attr.regionAllocateActive = e;
            },
            memberQuery: (e, ok) => {
              Member.sendApi("page", {
                params: {},
                data: {
                  query: {
                    keyword: e,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: `${i.nickname}/${i.id}`,
                  }))
                );
              });
            },
            memberChangeHandler: (e) => {
              if (e) {
                Member.sendApi("info", {
                  params: {},
                  data: {
                    query: {
                      id: e,
                    },
                  },
                }).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    this.popup.approvalSubRegionAllocateAgentAdd.attr.applier = data.info;
                  } else {
                    this.$message({
                      message: "获取会员信息失败",
                      type: "error",
                    });
                  }
                });
              }
            },
            teamLeaderQuery: (e, ok) => {
              Member.sendApi("page", {
                params: {},
                data: {
                  type: 7,
                  query: {
                    keyword: e,
                    isTeamLeader: 1,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: `${i.nickname}/${i.id}`,
                  }))
                );
              });
            },
            teamLeaderChangeHandler: (e) => {
              this.popup.approvalSubRegionAllocateAgentAdd.attr.teamLeaderId = e;
            },
            buildForm: () => {
              const f = ApprovalSubRegionAllocateAgent.formUtil().generator(
                "add",
                "default"
              );
              f.regionAllocateId.value = this.popup.approvalSubRegionAllocateAgentAdd.attr.regionAllocateActive.id;
              f.topDistributorId.value = this.popup.approvalSubRegionAllocateAgentAdd.attr.teamLeaderId;
              f.superiorDistributorId.value = this.popup.approvalSubRegionAllocateAgentAdd.attr.applier.distributorPId;
              f.inviteMemberId.value = this.popup.approvalSubRegionAllocateAgentAdd.attr.applier.pid;
              f.applierId.value = this.popup.approvalSubRegionAllocateAgentAdd.attr.applier.id;
              this.popup.approvalSubRegionAllocateAgentAdd.attr.form.approvalSubRegionAllocateAgent.value = f;
            },
            hiddenHandler: () => {
              this.popup.approvalSubRegionAllocateAgentAdd.attr = {
                form: Approval.formUtil().generator("add", "approvalSubRegionAllocateAgent"),
                regionAllocateList: [],
                regionAllocateActive: {},
                applier: {},
                teamLeaderId: 0,
              }
            },
            closeHandler: (okCallback, errorCallback) => {
              this.popup.approvalSubRegionAllocateAgentAdd.fn.buildForm();
              const { ok, form } = formToolkit.validate(
                this.popup.approvalSubRegionAllocateAgentAdd.attr.form
              );
              if (ok) {
                Approval.sendApi("add", {
                  params: {},
                  data: form,
                }).then((res) => {
                  const { status, data, message } = res;
                  if (status) {
                    okCallback();
                    this.$refs.listPage.query();
                    this.$message({
                      message: "区域审核添加成功",
                      type: "success",
                    });
                  } else {
                    errorCallback();
                    this.$message({
                      message: message.getServerMessage(),
                      type: "warning",
                    });
                  }
                });
              } else {
                errorCallback();
                this.$message({
                  message: "请确认信息",
                  type: "warning",
                });
              }
            },
          },
        },
        approvalSubShopAdd: {
          attr: {
            form: Approval.formUtil().generator("add", "approvalSubShop"),
            regionAllocateList: [],
            regionAllocateActive: {},
            applier: {},
            teamLeaderId: 0,
            fileAuthorizeAgreement: "",
          },
          fn: {
            provinceChangeHandler: (e) => {
              const [provinceId, cityId, districtId] = e.map((i) => i.id);
              RegionAllocate.sendApi("allocatePage", {
                params: {
                  pageIndex: 1,
                  pageSize: 10,
                },
                data: {
                  query: {
                    provinceId,
                    cityId,
                    districtId,
                    status: "2,3,4",
                    visible: 1,
                    isEnableUnlimitShopApply: 1,
                  },
                },
              }).then((res) => {
                const { status, data } = res;
                if (status) {
                  this.popup.approvalSubShopAdd.attr.regionAllocateList = data;
                } else {
                  this.$message({
                    message: "获取该地区信息失败",
                    type: "error",
                  });
                }
              });
            },
            regionAllocateSelect: (e) => {
              this.popup.approvalSubShopAdd.attr.regionAllocateActive = e;
            },
            memberQuery: (e, ok) => {
              Member.sendApi("page", {
                params: {},
                data: {
                  query: {
                    keyword: e,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: `${i.nickname}/${i.id}`,
                  }))
                );
              });
            },
            memberChangeHandler: (e) => {
              if (e) {
                Member.sendApi("info", {
                  params: {},
                  data: {
                    query: {
                      id: e,
                    },
                  },
                }).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    this.popup.approvalSubShopAdd.attr.applier = data.info;
                  } else {
                    this.$message({
                      message: "获取会员信息失败",
                      type: "error",
                    });
                  }
                });
              }
            },
            teamLeaderQuery: (e, ok) => {
              Member.sendApi("page", {
                params: {},
                data: {
                  type: 7,
                  query: {
                    keyword: e,
                    isTeamLeader: 1,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: `${i.nickname}/${i.id}`,
                  }))
                );
              });
            },
            teamLeaderChangeHandler: (e) => {
              this.popup.approvalSubShopAdd.attr.teamLeaderId = e;
            },
            fileAuthorizeAgreementChangeHandler: (e) => {
              this.popup.approvalSubShopAdd.attr.fileAuthorizeAgreement = e;
            },
            buildForm: () => {
              const f = ApprovalSubShop.formUtil().generator("add", "default");
              f.regionAllocateId.value = this.popup.approvalSubShopAdd.attr.regionAllocateActive.id;
              f.topDistributorId.value = this.popup.approvalSubShopAdd.attr.teamLeaderId;
              f.superiorDistributorId.value = this.popup.approvalSubShopAdd.attr.applier.distributorPId;
              f.inviteMemberId.value = this.popup.approvalSubShopAdd.attr.applier.pid;
              f.applierId.value = this.popup.approvalSubShopAdd.attr.applier.id;
              f.fileAuthorizeAgreement.value = this.popup.approvalSubShopAdd.attr.fileAuthorizeAgreement;
              this.popup.approvalSubShopAdd.attr.form.approvalSubShop.value = f;
            },
            hiddenHandler: () => {
              this.popup.approvalSubShopAdd.attr = {
                form: Approval.formUtil().generator("add", "approvalSubShop"),
                regionAllocateList: [],
                regionAllocateActive: {},
                applier: {},
                teamLeaderId: 0,
                fileAuthorizeAgreement: "",
              }
            },
            closeHandler: (okCallback, errorCallback) => {
              this.popup.approvalSubShopAdd.fn.buildForm();
              const { ok, form } = formToolkit.validate(
                this.popup.approvalSubShopAdd.attr.form
              );
              if (ok) {
                Approval.sendApi("add", {
                  params: {},
                  data: form,
                }).then((res) => {
                  const { status, data, message } = res;
                  if (status) {
                    okCallback();
                    this.$refs.listPage.query();
                    this.$message({
                      message: "店铺审核添加成功",
                      type: "success",
                    });
                  } else {
                    errorCallback();
                    this.$message({
                      message: message.getServerMessage(),
                      type: "warning",
                    });
                  }
                });
              } else {
                errorCallback();
                this.$message({
                  message: "请确认信息",
                  type: "warning",
                });
              }
            },
          },
        },
        approvalSubRefundAdd: {
          attr: {
            form: (()=>{
              const f1 = Approval.formUtil().generator("add", "approvalSubRefund")
              f1.approvalSubRefund = ApprovalSubRefund.formUtil().generator("add", "default")
              return f1
            })()  
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
                this.popup.approvalSubRefundAdd.attr.form.typeId.value = this.page.form.query.typeId
                const { ok, form } = formToolkit.validate(this.popup.approvalSubRefundAdd.attr.form.approvalSubRefund);
                const form1 = {
                  typeId: this.page.form.query.typeId,
                  ApprovalSubRefund: {
                  memberId: form.memberId,
                      axqSelfEmployedLaborerId: form.axqSelfEmployedLaborerId,
                      accountData: {
                          accountOwner: form.accountOwner,
                          accountOpen: form.accountOpen,
                          account: form.account,
                          time: this.$dayjs(form.time).format("YYYY-MM-DD"),
                      },
                      amount: form.amount,
                      remark:  form.remark,
                  }
                }
                if(ok){
                    Approval.sendApi("add", {
                      params: {},
                      data: form1,
                    }).then((res) => {
                      const { status, data, message } = res;
                      if (status) {
                        okCallback();
                        this.$refs.listPage.query();
                        this.$message({
                          message: "错账退回申请添加成功",
                          type: "success",
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: message.getServerMessage(),
                          type: "warning",
                        });
                      }
                  });
                }else{
                  errorCallback()
                }
            },
            hiddenHandler: () => {
              this.popup.approvalSubRefundAdd.attr.form = (()=>{
                const f1 = Approval.formUtil().generator("add", "approvalSubRefund")
                f1.approvalSubRefund = ApprovalSubRefund.formUtil().generator("add", "default")
                return f1
              })() 
            },
            memberQuery: (e, ok) => {
              Member.sendApi("page", {
                params: {},
                data: {
                  query: {
                    keyword: e,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: `${i.nickname}/${i.id}`,
                  }))
                );
              });
            },
            memberChangeHandler: (e) => {
              if (e) {
                Member.sendApi("info", {
                  params: {},
                  data: {
                    query: {
                      id: e,
                    },
                  },
                }).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    this.popup.approvalSubRefundAdd.attr.form.approvalSubRefund.memberId.value = data.info.id;
                  } else {
                    this.$message({
                      message: "获取会员信息失败",
                      type: "error",
                    });
                  }
                });
              }
            }
          }
        }
      },
    };
  },
  computed: {
    ...mapState("sys", ["ws"]),
  },
  watch: {
    $route: function () {
      this.$nextTick(() => {
        this.$refs.listSort?.reload();
      });
    },
  },
  created() {
    this.page.config.allowExportExcel = !!this.$_.get(this.axqStaffInfo, 'accessExtraJson.isEnableExcel');
    this.page.form.query.typeId = this.getAccessValidList(Approval._options.type).length
      ? this.getAccessValidList(Approval._options.type)[0].value
      : Number(this.$route.query.type);
  },
  methods: {
    changeType(item) {
      this.rep(`/approval/list?type=${item.value}`);
      this.tabIndex = item.value;
      this.page.form.query.typeId = item.value;
      this.page.form.query.status = "";
      this.page.form.query.workflowId = "";
      this.page.form.query.provinceId = "";
      this.page.form.query.cityId = "";
      this.page.form.query.districtId = "";
      this.page.form.query.startTime = null;
      this.page.form.query.endTime = null;
      this.page.form.order.createTime = 'desc';
      this.page.form.query.balanceType =  "";
      this.page.form.query.type= '';
      this.page.form.query.topUpType = "";

      if (this.page.form.query.typeId === 11){
        this.page.form.query.type = 1;
      }

      if ([1, 2, 11].includes(this.page.form.query.typeId)) {
        this.page.form.query.startTime = this.page.timePicker[this.page.form.query.typeId].startTime;
        this.page.form.query.endTime = this.page.timePicker[this.page.form.query.typeId].endTime
        this.$nextTick(() => {
          this.$refs.workflowOptionsSelector?.reload();
        });
      }
      this.$refs.listPage.query();
    },
    add() {
      if (this.page.form.query.typeId === 1) {
        this.$refs.popupConfirmApprovalSubRegionAllocateAgentAdd.open({
          triggerHidden: this.popup.approvalSubRegionAllocateAgentAdd.fn.hiddenHandler,
          triggerClose: this.popup.approvalSubRegionAllocateAgentAdd.fn.closeHandler,
        });
      }
      if (this.page.form.query.typeId === 2) {
        this.$refs.popupConfirmApprovalSubShopAdd.open({
          triggerHidden: this.popup.approvalSubShopAdd.fn.hiddenHandler,
          triggerClose: this.popup.approvalSubShopAdd.fn.closeHandler,
        });
      }
    },
    addRefund() {
      this.$refs.popupConfirmApprovalSubRefundAdd.open({
          triggerClose: this.popup.approvalSubRefundAdd.fn.closeHandler,
          triggerHidden:this.popup.approvalSubRefundAdd.fn.hiddenHandler
      })
    },
    updateCheckStatus(row, status) {
      const { revertFormId, revertFormSn, purchanseId, purchanseSn } = row._raw;
      const status2msg = {
        3: {
          title: "复审通过",
          text: `是否确认订单${revertFormSn || purchanseSn}复审通过？`,
        },
        4: {
          title: "复审不通过",
          text: `是否确认订单${revertFormSn || purchanseSn}复审不通过？`,
        },
      };
      this.$confirm(status2msg[status].text, status2msg[status].title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          (revertFormId ? RevertForm : Purchanse)
            .sendApi("updateSingleField", {
              params: {
                id: revertFormId || purchanseId,
                type: 1,
              },
              data: {
                value: status,
              },
            })
            .then((res) => {
              const { status } = res;
              if (status) {
                this.$refs.listPage.query();
                this.$message.success("更新成功");
              } else {
                this.$message.error("更新失败");
              }
            });
        })
        .catch(() => { });
    },
  },
};
</script>

<style lang="less">
.approval-list {
  .l-type {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    width: 100%;
    background: white;
    overflow-x: hidden;

    .t-item {
      display: flex;
      align-items: flex-end;
      padding: 0 20px;

      span {
        padding: 30px 0 10px;
        white-space: nowrap;
      }

      &-active {
        position: relative;

        &:after {
          position: absolute;
          content: "";
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: #1890ff;
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .l-list {
    padding: 20px;
    margin-top: 20px;
    background: white;
  }

  .popup-confirm {
    &_approval-sub-region-allocate-agent-add {
      padding: 20px;

      .a-item {
        .i-option {
          padding-bottom: 20px;
        }

        &_member {
          .i-value {
            table {
              width: 100%;

              tbody {
                tr {
                  td {
                    p {
                      margin: 0;
                    }
                  }

                  &:not(:last-child) {
                    td {
                      padding-bottom: 16px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    &_approval-sub-shop-add {
      padding: 20px;

      .a-item {
        .i-option {
          padding-bottom: 20px;
        }

        &_member {
          .i-value {
            table {
              width: 100%;

              tbody {
                tr {
                  td {
                    p {
                      margin: 0;
                    }
                  }

                  &:not(:last-child) {
                    td {
                      padding-bottom: 16px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    &_approval-sub-refund-add {
      padding: 20px;
    }
  }
}
</style>
