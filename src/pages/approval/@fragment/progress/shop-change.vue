<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 11:31:40
 * @LastEditTime: 2022-06-20 12:28:58
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/progress/shop-change.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="progress progress_shop-change">
    <div class="p-step">
      <el-steps :active="active - 1" finish-status="success">
        <el-step :title="item" :key="key" v-for="(item, key) in list"></el-step>
      </el-steps>
    </div>
    <div class="p-info">
      <template v-if="approval.status < 3">
        <template v-if="$_.get(approval, 'approvalTimelineList[0].status') === 2">
          <div class="error">
            <i class="iconfont icon-shibai1"></i>
            <p>审核不通过</p>
            <div class="e_remark">
              <div class="r-item">
                <span
                  >备注：{{
                    blankGet($_.get(approval.approvalTimelineList, "[0].remark"))
                  }}</span
                >
              </div>
              <div
                class="r-item"
                v-if="$_.get(approval.approvalTimelineList, '[0].fileJson')"
              >
                <div class="i-label">
                  <span>附件：</span>
                </div>
                <div class="i-value">
                  <file-previewer
                    :value="$_.get(approval.approvalTimelineList, '[0].fileJson')"
                  ></file-previewer>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="title">
            <div class="t-left">
              <span>{{
                $_.get(approval, "approvalSubShopChange.type") === 1
                  ? "店铺转让信息"
                  : "店铺关闭信息"
              }}</span>
            </div>
          </div>
          <template v-if="$_.get(approval, 'approvalSubShopChange.type') === 1">
            <grid :col="3">
              <grid-item> 店铺名称：{{ shopInfo(1) }} </grid-item>
              <grid-item> 店铺地址：{{ shopInfo(2) }} </grid-item>
              <grid-item>
                转让店主姓名/ID：{{
                  $_.get(approval, "approvalSubShopChange.transfer.nickname")
                }}/{{ $_.get(approval, `approvalSubShopChange.transfer.id`) }}
              </grid-item>
              <grid-item>
                接收店主姓名/ID：{{
                  $_.get(approval, "approvalSubShopChange.receive.nickname")
                }}/{{ $_.get(approval, `approvalSubShopChange.receive.id`) }}
              </grid-item>
              <grid-item>
                会员挪给新店主：{{
                  $_.get(approval, "approvalSubShopChange.isTransferShopMember")
                    ? "是"
                    : "否"
                }}
              </grid-item>
              <grid-item>
                会员归属店铺：{{
                  $_.get(approval, "approvalSubShopChange.receiveShop.name") || "--"
                }}
              </grid-item>
              <grid-item>
                备注信息：{{ $_.get(approval, "approvalSubShopChange.remark") }}
              </grid-item>
            </grid>
            <div class="title">
              <div class="t-left">
                <span>接收店主保证金信息</span>
                <span
                  v-if="active === 2"
                  class="l-link"
                  @click="
                    $refs.popupConfirmReceiveDepositUpdate.open({
                      triggerOpen: popup.approvalSubShopChangeUpdate.fn.openHandler,
                      triggerClose: popup.approvalSubShopChangeUpdate.fn.closeHandler,
                    })
                  "
                >
                  修改保证金信息>
                </span>
              </div>
            </div>
            <grid :col="3">
              <grid-item>
                缴纳人:{{ $_.get(approval, "approvalSubShopChange.receive.nickname") }}
              </grid-item>
              <grid-item>
                保证金缴纳：{{
                  $_.get(approval, "approvalSubShopChange.receiveDepositAmount", 0)
                }}
              </grid-item>
              <grid-item>
                缴纳时间：{{
                  $_.get(approval, "approvalSubShopChange.receiveDepositPayTime", "")
                }}
              </grid-item>
              <grid-item>
                缴纳方式:{{
                  $_.get(approval, "approvalSubShopChange.receiveDepositPayType")
                    | payTypeFilter
                }}
              </grid-item>
            </grid>
            <div class="p-info_cell">
              保证金凭证：
              <file-previewer
                :value="$_.get(approval, 'approvalSubShopChange.receiveDepositFileJson')"
              >
              </file-previewer>
            </div>
            <template
              v-if="active > 2 && $_.get(approval, 'approvalSubShopChange.shopDeposit')"
            >
              <div class="auditor">
                <span>审核人：{{ approvalNickname }}</span>
                <span>审核时间：{{ approvalTime }}</span>
              </div>
              <div class="title">
                <div class="t-left">
                  <span>转让店主原保证金凭证信息</span>
                </div>
              </div>
              <grid :col="3">
                <grid-item>
                  缴纳人:{{
                    $_.get(approval, "approvalSubShopChange.shopDeposit.paymentPayer")
                  }}
                </grid-item>
                <grid-item>
                  保证金缴纳：{{
                    $_.get(approval, "approvalSubShopChange.shopDeposit.amount")
                  }}元
                </grid-item>
                <grid-item>
                  缴纳时间：{{
                    $_.get(approval, "approvalSubShopChange.shopDeposit.paymentTime")
                  }}
                </grid-item>
                <grid-item>
                  缴纳方式:{{
                    $_.get(approval, "approvalSubShopChange.shopDeposit.paymentType")
                      | payTypeFilter
                  }}
                </grid-item>
              </grid>
              <div class="p-info_cell">
                <span>原保证金凭证：</span>
                <file-previewer
                  :value="$_.get(approval, 'approvalSubShopChange.shopDeposit.fileJson')"
                >
                </file-previewer>
              </div>
              <div class="title">
                <div class="t-left">
                  <span>转让店主原保证金退回信息</span>
                  <span
                    v-if="active === 3"
                    class="l-link"
                    @click="
                      $refs.popupConfirmDepositReturnUpdate.open({
                        triggerOpen: popup.approvalSubShopChangeUpdate.fn.openHandler,
                        triggerClose: popup.approvalSubShopChangeUpdate.fn.closeHandler,
                      })
                    "
                  >
                    添加退回保证金信息>
                  </span>
                </div>
              </div>
              <grid :col="3">
                <grid-item>
                  收款人:{{
                    $_.get(
                      approval,
                      "approvalSubShopChange.transferDepositReturnReceiver"
                    )
                  }}
                </grid-item>
                <grid-item>
                  收款账号：{{
                    $_.get(approval, "approvalSubShopChange.transferDepositReturnAccount")
                  }}
                </grid-item>
                <grid-item>
                  开户行:
                  {{
                    $_.get(approval, "approvalSubShopChange.transferDepositReturnBank")
                  }}
                </grid-item>
                <grid-item>
                  退回时间:
                  {{
                    $_.get(approval, "approvalSubShopChange.transferDepositReturnTime")
                  }}
                </grid-item>
                <grid-item>
                  备注信息：{{
                    $_.get(approval, "approvalSubShopChange.transferDepositReturnRemark")
                  }}
                </grid-item>
              </grid>
              <div class="p-info_cell">
                <span>原保证金退回凭证：</span>
                <file-previewer
                  :value="
                    $_.get(approval, 'approvalSubShopChange.transferDepositFileJson')
                  "
                >
                </file-previewer>
              </div>
            </template>
            <div class="auditor" v-if="active === 4">
              <span
                >审核人：{{
                  $_.get(approval, "approvalTimelineList[0].checker.nickname")
                }}</span
              >
              <span
                >审核时间：{{
                  $_.get(approval, "approvalTimelineList[0].createTime")
                }}</span
              >
            </div>
          </template>
          <template v-else>
            <grid :col="3">
              <grid-item> 店铺名称：{{ shopInfo(1) }} </grid-item>
              <grid-item> 店铺地址：{{ shopInfo(2) }} </grid-item>
              <grid-item>
                店主姓名/ID：
                {{ $_.get(approval, "approvalSubShopChange.transfer.nickname") }}
                /{{ $_.get(approval, "approvalSubShopChange.transfer.id") }}
              </grid-item>
              <grid-item>
                会员归属店铺：{{
                  $_.get(approval, "approvalSubShopChange.receiveShop.name") || "--"
                }}
              </grid-item>
              <grid-item>
                备注信息：{{ $_.get(approval, "approvalSubShopChange.remark") }}
              </grid-item>
            </grid>
            <template v-if="active > 2">
              <div class="auditor">
                <span>审核人：{{ approvalNickname }}</span>
                <span>审核时间：{{ approvalTime }}</span>
              </div>
              <template v-if="$_.get(approval, 'approvalSubShopChange.shopDeposit')">
                <div class="title">
                  <div class="t-left">
                    <span>店主原保证金凭证信息</span>
                  </div>
                </div>
                <grid :col="3">
                  <grid-item>
                    缴纳人:{{
                      $_.get(approval, "approvalSubShopChange.shopDeposit.paymentPayer")
                    }}
                  </grid-item>
                  <grid-item>
                    保证金缴纳：{{
                      $_.get(approval, "approvalSubShopChange.shopDeposit.amount")
                    }}元
                  </grid-item>
                  <grid-item>
                    缴纳时间：{{
                      $_.get(approval, "approvalSubShopChange.shopDeposit.paymentTime")
                    }}
                  </grid-item>
                  <grid-item>
                    缴纳方式:{{
                      $_.get(approval, "approvalSubShopChange.shopDeposit.paymentType")
                        | payTypeFilter
                    }}
                  </grid-item>
                </grid>
                <div class="p-info_cell">
                  <span>原保证金凭证：</span>
                  <file-previewer
                    :value="
                      $_.get(approval, 'approvalSubShopChange.shopDeposit.fileJson')
                    "
                  >
                  </file-previewer>
                </div>
                <div class="title">
                  <div class="t-left">
                    <span>店主原保证金退回信息</span>
                    <span
                      v-if="active === 3"
                      class="l-link"
                      @click="
                        $refs.popupConfirmDepositReturnUpdate.open({
                          triggerOpen: popup.approvalSubShopChangeUpdate.fn.openHandler,
                          triggerClose: popup.approvalSubShopChangeUpdate.fn.closeHandler,
                        })
                      "
                    >
                      添加退回保证金信息>
                    </span>
                  </div>
                </div>
                <grid :col="3">
                  <grid-item>
                    收款人:{{
                      $_.get(
                        approval,
                        "approvalSubShopChange.transferDepositReturnReceiver"
                      )
                    }}
                  </grid-item>
                  <grid-item>
                    收款账号：{{
                      $_.get(
                        approval,
                        "approvalSubShopChange.transferDepositReturnAccount"
                      )
                    }}
                  </grid-item>
                  <grid-item>
                    开户行:
                    {{
                      $_.get(approval, "approvalSubShopChange.transferDepositReturnBank")
                    }}
                  </grid-item>
                  <grid-item>
                    退回时间:
                    {{
                      $_.get(approval, "approvalSubShopChange.transferDepositReturnTime")
                    }}
                  </grid-item>
                  <grid-item>
                    备注信息：{{
                      $_.get(
                        approval,
                        "approvalSubShopChange.transferDepositReturnRemark"
                      )
                    }}
                  </grid-item>
                </grid>
                <div class="p-info_cell">
                  <span>原保证金退回凭证：</span>
                  <file-previewer
                    :value="
                      $_.get(approval, 'approvalSubShopChange.transferDepositFileJson')
                    "
                  >
                  </file-previewer>
                </div>
              </template>
            </template>
            <div class="auditor" v-if="active === 4">
              <span
                >审核人：{{
                  $_.get(approval, "approvalTimelineList[0].checker.nickname")
                }}</span
              >
              <span
                >审核时间：{{
                  $_.get(approval, "approvalTimelineList[0].createTime")
                }}</span
              >
            </div>
          </template>
        </template>
      </template>
      <template v-else>
        <div class="error" v-if="approval.status === 3">
          <i class="iconfont icon-shibai1"></i>
          <p>审核不通过</p>
          <p>备注：{{ blankGet($_.get(approval.approvalTimelineList, "[0].remark")) }}</p>
          <div class="c-item">
            <div class="i-lable">附件：</div>
            <div class="i-value">
              <file-previewer
                :value="$_.get(approval.approvalTimelineList, '[0].fileJson')"
              ></file-previewer>
            </div>
          </div>
        </div>
        <div class="error" v-if="approval.status === 4">
          <i class="iconfont icon-shibai1"></i>
          <p>审核已取消</p>
        </div>
      </template>
    </div>
    <popup-confirm
      ref="popupConfirmReceiveDepositUpdate"
      title="添加接收店主保证金信息"
      :config="{ width: 900, height: 500 }"
    >
      <div class="popup-confirm_receive-deposit-update">
        <form-validate
          ref="regionShopApplyUpdate"
          :form="popup.approvalSubShopChangeUpdate.attr.form"
          :validator="entitys.Approval.formUtil().validate"
          :fill="popup.approvalSubShopChangeUpdate.fn.fill"
        >
          <form-validate-field
            label="缴纳方式："
            :field="
              popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                .receiveDepositPayType
            "
          >
            <el-select
              size="small"
              style="width: 150px"
              v-model="
                popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                  .receiveDepositPayType.value
              "
            >
              <el-option
                v-for="item in popup.approvalSubShopChangeUpdate.attr.paymentTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </form-validate-field>
          <form-validate-field
            label="缴纳金额："
            :field="
              popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                .receiveDepositAmount
            "
          >
            <el-input
              size="small"
              style="width: 150px"
              clearable
              v-model="
                popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                  .receiveDepositAmount.value
              "
            ></el-input>
          </form-validate-field>
          <form-validate-field
            label="缴纳时间："
            :field="
              popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                .receiveDepositPayTime
            "
          >
            <el-date-picker
              size="small"
              style="width: 150px"
              value-format="yyyy-MM-dd"
              v-model="
                popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                  .receiveDepositPayTime.value
              "
            >
            </el-date-picker>
          </form-validate-field>
          <form-validate-field
            label="上传凭证："
            :field="
              popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                .receiveDepositFileJson
            "
          >
            <file-uploader
              :max="2"
              @change="
                (e) =>
                  (popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value.receiveDepositFileJson.value = e)
              "
            >
            </file-uploader>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmDepositReturnUpdate"
      title="添加原保证金退回信息"
      :config="{ width: 900, height: 500 }"
    >
      <div class="popup-confirm_deposit-return-update">
        <form-validate
          ref="regionShopApplyUpdate"
          :form="popup.approvalSubShopChangeUpdate.attr.form"
          :validator="entitys.Approval.formUtil().validate"
          :fill="popup.approvalSubShopChangeUpdate.fn.fill"
        >
          <form-validate-field label="收款人：">
            <el-input
              clearable
              style="width: 300px"
              v-model="
                popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                  .transferDepositReturnReceiver.value
              "
            >
            </el-input>
          </form-validate-field>
          <form-validate-field label="收款账号：">
            <el-input
              clearable
              style="width: 300px"
              v-model="
                popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                  .transferDepositReturnAccount.value
              "
            >
            </el-input>
          </form-validate-field>
          <form-validate-field label="开户行：">
            <el-input
              clearable
              style="width: 300px"
              v-model="
                popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                  .transferDepositReturnBank.value
              "
            >
            </el-input>
          </form-validate-field>
          <form-validate-field
            label="退回金额："
            :field="
              popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                .transferDepositAmount
            "
          >
            <el-input
              size="small"
              style="width: 150px"
              clearable
              v-model="
                popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                  .transferDepositAmount.value
              "
            ></el-input>
          </form-validate-field>
          <form-validate-field label="退回时间：">
            <el-date-picker
              size="small"
              style="width: 150px"
              value-format="yyyy-MM-dd"
              v-model="
                popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                  .transferDepositReturnTime.value
              "
            >
            </el-date-picker>
          </form-validate-field>
          <form-validate-field label="上传凭证：">
            <file-uploader
              :max="6"
              @change="
                (e) =>
                  (popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value.transferDepositFileJson.value = e)
              "
            >
            </file-uploader>
          </form-validate-field>
          <form-validate-field label="备注：">
            <el-input
              style="width: 300px"
              type="textarea"
              :rows="5"
              placeholder="留下你的反馈信息，让协同更方便~"
              v-model="
                popup.approvalSubShopChangeUpdate.attr.form.approvalSubShopChange.value
                  .transferDepositReturnRemark.value
              "
            ></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import cellGroup from "@/components/cell/group";
import cellItem from "@/components/cell/item";
import fileUploader from "@/components/file-uploader";
import filePreviewer from "@/components/file-previewer";
import grid from "@/components/grid";
import gridItem from "@/components/grid/item";
import popupConfirm from "@/components/popup/type/confirm";
import formValidate from "@/components/form-validate";
import formValidateField from "@/components/form-validate/field";

import { formToolkit } from "@/model/form-toolkit";

import { model } from "@/model";
const { Approval, ApprovalSubShopChange } = model.collection;

export default {
  components: {
    cellGroup,
    cellItem,
    fileUploader,
    filePreviewer,
    grid,
    gridItem,
    popupConfirm,
    formValidate,
    formValidateField,
  },
  props: {
    approval: {
      type: Object,
      default() {
        return {
          approvalWorkflowList: [],
          workflowId: -1,
        };
      },
    },
  },
  data() {
    return {
      type: Number(this.$route.query.type),
      entitys: {
        Approval,
      },
      popup: {
        approvalSubShopChangeUpdate: {
          attr: {
            paymentTypeList: [
              {
                label: "转账",
                value: 1,
              },
              {
                label: "现金",
                value: 2,
              },
              {
                label: "刷卡",
                value: 3,
              },
            ],
            form: (() => {
              const f1 = Approval.formUtil().generator("update", "approvalSubShopChange");
              const f2 = ApprovalSubShopChange.formUtil().generator("update", "default");
              f1.approvalSubShopChange.value = f2;
              return f1;
            })(),
            info: {},
          },
          fn: {
            fill: (callback) => {
              callback(Approval, this.popup.approvalSubShopChangeUpdate.attr.info._raw);
            },
            openHandler: (ok) => {
              Approval.sendApi(
                "info",
                {
                  params: {},
                  data: {
                    query: {
                      type: 17,
                      id: Number(this.$route.params.id),
                    },
                  },
                },
                { parse4Entity: true }
              ).then((res) => {
                const { status, data } = res;
                if (status) {
                  this.popup.approvalSubShopChangeUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: "获取店铺变更审核信息失败",
                    type: "warning",
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { form } = formToolkit.validate(
                this.popup.approvalSubShopChangeUpdate.attr.form
              );
              if (
                this.$_.get(this.approval, "approvalSubShopChange.type") === 1 &&
                this.active === 2 &&
                (!form.approvalSubShopChange.receiveDepositPayType ||
                 !form.approvalSubShopChange.receiveDepositAmount ||
                  !form.approvalSubShopChange.receiveDepositPayTime ||
                  !form.approvalSubShopChange.receiveDepositFileJson)
              ) {
                this.$message({
                  message: "请填写接收店主保证金信息",
                  type: "warning",
                });
                errorCallback();
                return;
              }
              Approval.sendApi(
                "update",
                {
                  params: {
                    id: Number(this.$route.params.id),
                  },
                  data: form,
                },
                {
                  showLoading: true,
                }
              ).then((res) => {
                const { status } = res;
                if (status) {
                  okCallback();
                  this.$emit("update");
                  this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                } else {
                  errorCallback();
                  this.$message({
                    message: "修改失败",
                    type: "warning",
                  });
                }
              });
            },
          },
        },
      },
    };
  },
  computed: {
    list() {
      const total = [];
      const pre = ["创建店铺转让申请"];
      const last = ["已通过"];
      return total
        .concat(pre)
        .concat(this.approval.approvalWorkflowList.map((i) => i.name))
        .concat(last);
    },
    active() {
      if (this.approval.status === 2) {
        return this.approval.approvalWorkflowList.length + 2;
      }
      return (
        this.approval.approvalWorkflowList
          .map((i) => i.id)
          .indexOf(this.approval.workflowId) + 2
      );
    },
    approvalNickname() {
      return this.$_.get(this.approval, "approvalTimelineList", []).length
        ? this.$_.get(this.approval, "approvalTimelineList", []).find(
            (v) => v.workflowId === 38
          ).checker.nickname
        : "--";
    },
    approvalTime() {
      return this.$_.get(this.approval, "approvalTimelineList", []).length
        ? this.$_.get(this.approval, "approvalTimelineList", []).find(
            (v) => v.workflowId === 38
          ).createTime
        : "--";
    },
  },
  filters: {
    payTypeFilter(v) {
      if (v === 1) {
        return "转账";
      }
      if (v === 2) {
        return "现金";
      }
      if (v === 3) {
        return "刷卡";
      }
      return "--";
    },
  },
  methods: {
    shopInfo(type) {
      const {
        name = "",
        provinceName = "",
        cityName = "",
        districtName = "",
        fullAddress = "",
      } = this.$_.get(this.approval, "approvalSubShopChange.shop") || {};
      const shopOldJson = this.$_.get(this.approval, "approvalSubShopChange.shopOldJson")
        ? JSON.parse(this.$_.get(this.approval, "approvalSubShopChange.shopOldJson"))
        : "";
      if (type === 1) {
        return shopOldJson ? shopOldJson.name : name;
      }
      if (type === 2) {
        return shopOldJson
          ? (shopOldJson.provinceName || "") +
              (shopOldJson.cityName || "") +
              (shopOldJson.districtName || "") +
              (shopOldJson.fullAddress || "")
          : (provinceName || "") +
              (cityName || "") +
              (districtName || "") +
              (fullAddress || "");
      }
    },
    _checkEnableSubmit() {
      let r = {
        ok: true,
        message: "",
      };
      if (
        this.$_.get(this.approval, "approvalSubShopChange.type") === 1 &&
        this.active === 2 &&
        (this.$_.get(this.approval, "approvalSubShopChange.receiveDepositPayType") ===
          0 ||
          !this.$_.get(this.approval, "approvalSubShopChange.receiveDepositFileJson"))
      ) {
        return {
          ok: false,
          message: "请填写接收店主保证金信息",
        };
      }
      return r;
    },
  },
};
</script>

<style lang="less">
@import url("./less/index.less");

.progress {
  &_shop-change {
    .p-info {
      .title {
        .t-left {
          display: flex;
          align-items: center;
          margin-left: -14px;
          margin-bottom: 20px;

          &::before {
            content: "";
            display: block;
            margin-right: 11px;
            width: 3px;
            height: 13px;
            background: #515a6e;
          }

          span {
            font-size: 14px;
            font-weight: bold;
            color: #515a6e;
          }

          .l-link {
            margin-left: 20px;
            color: #3f9ffe;
            cursor: pointer;
          }
        }
      }

      .content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        font-size: 14px;
        font-weight: 400;
        color: #333;

        p {
          display: flex;
          align-items: end;
        }

        p:not(:first-child) {
          margin-top: 0;
        }

        .remark {
          display: flex;

          > span:first-child {
            white-space: nowrap;
            margin-right: 16px;
          }
        }
      }

      .auditor {
        display: flex;
        margin-bottom: 30px;
        font-size: 14px;
        font-weight: 400;
        color: #333;

        > span:last-child {
          padding-left: 28%;
        }
      }

      &_cell {
        display: flex;
      }
    }
  }

  .popup-confirm {
    &_receive-deposit-update,
    &_deposit-return-update {
      padding-top: 30px;
    }
  }
}
</style>
