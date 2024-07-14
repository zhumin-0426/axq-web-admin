<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 11:31:40
 * @LastEditTime: 2022-04-01 09:48:50
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/progress/revert-form.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="progress progress_revert-form">
    <div class="p-step">
      <el-steps :active="active - 1" finish-status="success">
        <el-step :title="item" :key="key" v-for="(item, key) in list"></el-step>
      </el-steps>
    </div>
    <div class="p-info">
      <template v-if="approval.status === 1 || approval.status ===2">
        <template v-if="$_.get(approval, 'approvalTimelineList[0].status') === 2">
          <div class="error">
            <i class="iconfont icon-shibai1"></i>
            <template v-if="active === 3 && (axqStaffInfo.deptId === 11 || isAdmin)">
              <p>请查看核对备注信息并修改信息后，再重新提交</p>
              <div>
                <el-button
                  type="primary"
                  @click.native="$refs.popupConfirmRevertFormUpdate.open({triggerOpen: popup.revertFormUpdate.fn.openHandler, triggerClose: popup.revertFormUpdate.fn.closeHandler})"
                >重新修改</el-button>
                <el-button type="danger" @click.native="$emit('retreat')">驳回</el-button>
              </div>
            </template>
            <p v-else>审核不通过</p>
            <div class="e_remark">
              <div class="r-item">
                <div class="i-label">
                  <span>备注：</span>
                </div>
                <div
                  class="i-value"
                >{{ blankGet($_.get(approval.approvalTimelineList, '[0].remark')) }}</div>
              </div>
              <div class="r-item" v-if="$_.get(approval.approvalTimelineList, '[0].fileJson')">
                <div class="i-label">
                  <span>附件：</span>
                </div>
                <div class="i-value">
                  <file-previewer :value="$_.get(approval.approvalTimelineList, '[0].fileJson')"></file-previewer>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="revert-form-item">
            <div class="title">
              <div class="t-left">
                <span class="t-left-title">调换单信息：</span>
              </div>
              <div class="t-right"></div>
            </div>
            <div class="content">
              <p>退换货编号：{{ $_.get(approval, `approvalSubRevertForm.revertForm.sn`) }}</p>
              <p>店主：{{ $_.get(approval, `approvalSubRevertForm.revertForm.distributor.nickname`) }}/{{ $_.get(approval, `approvalSubRevertForm.revertForm.distributor.id`) }}</p>
              <p>袋子费金额：{{ $_.get(approval, `approvalSubRevertForm.revertForm.amountPackage`) }}元</p>
            </div>
          </div>
          <div class="revert-form-item">
            <div class="title">
              <div class="t-left">
                <span class="t-left-title">支付信息：</span>
                <span
                  class="link"
                  @click="$refs.popupConfirmRevertFormUpdate.open({triggerOpen: popup.revertFormUpdate.fn.openHandler, triggerClose: popup.revertFormUpdate.fn.closeHandler})"
                  v-if="active === 2"
                >添加支付信息></span>
              </div>
              <div class="t-right"></div>
            </div>
            <div class="content">
              <grid :col="3">
                <grid-item
                  label="余额支付："
                  v-if="$_.get(approval, `approvalSubRevertForm.revertForm.paymentBalanceAmount`) > 0"
                >
                  <span>{{ $_.get(approval, `approvalSubRevertForm.revertForm.paymentBalanceAmount`) }}元</span>
                </grid-item>
                <grid-item
                  label="思雪余额支付："
                  v-if="$_.get(approval, `approvalSubRevertForm.revertForm.paymentSixueBalanceAmount`) > 0"
                >
                  <span>{{ $_.get(approval, `approvalSubRevertForm.revertForm.paymentSixueBalanceAmount`) }}元</span>
                </grid-item>
                <grid-item
                  label="微信支付："
                  v-if="$_.get(approval, `approvalSubRevertForm.revertForm.paymentWeixinAmount`) > 0"
                >
                  <span>{{ $_.get(approval, `approvalSubRevertForm.revertForm.paymentWeixinAmount`) }}元</span>
                </grid-item>
                <grid-item
                  label="支付宝支付："
                  v-if="$_.get(approval, `approvalSubRevertForm.revertForm.paymentAlipayAmount`) > 0"
                >
                  <span>{{ $_.get(approval, `approvalSubRevertForm.revertForm.paymentAlipayAmount`) }}元</span>
                </grid-item>
                <grid-item
                  label="刷卡："
                  v-if="$_.get(approval, `approvalSubRevertForm.revertForm.paymentCashAmount`) > 0"
                >
                  <span>{{ $_.get(approval, `approvalSubRevertForm.revertForm.paymentCashAmount`) }}元</span>
                </grid-item>
                <grid-item
                  label="银行卡支付："
                  v-if="$_.get(approval, `approvalSubRevertForm.revertForm.paymentBankAmount`) > 0"
                >
                  <div
                    class="paymentBank"
                    v-for="(i,k) in $_.get(approval, `approvalSubRevertForm.revertForm.paymentBankJson`).toParse()"
                    :key="k"
                  >
                    <p>{{ i.name }}：{{ i.amount }}元</p>
                  </div>
                </grid-item>
              </grid>
              <p>收货地址：{{ $_.get(approval, `approvalSubRevertForm.revertForm.recipient`) }}/{{ $_.get(approval, `approvalSubRevertForm.revertForm.recipientMobile`) }}{{ $_.get(approval, `approvalSubRevertForm.revertForm.fullAddress`) }}</p>
              <p>备注信息：{{ $_.get(approval, `approvalSubRevertForm.revertForm.remark`) }}</p>
              <p>客服审核人：{{ $_.get(approval, `approvalSubRevertForm.revertForm.customerService.nickname`) }}</p>
              <p>客服审核时间：{{ $_.get(approval, `approvalSubRevertForm.revertForm.customerServiceApprovedTime`) }}</p>
              <template v-if="approval.status ===2">
                <p>财务审核人：{{ $_.get(approval, `approvalSubRevertForm.revertForm.financialService.nickname`) }}</p>
                <p>财务审核时间：{{ $_.get(approval, `approvalSubRevertForm.revertForm.financialServiceApprovedTime`) }}</p>
              </template>
            </div>
          </div>
          <div class="revert-form-item">
            <div class="title">
              <div class="t-left">
                <span class="t-left-title">转存信息：</span>
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
                v-if="$_.get(approval, `approvalSubRevertForm.revertForm.ptType`) === 1 && transferObj.goodsItemsNumBoList.length"
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
                v-if="$_.get(approval, `approvalSubRevertForm.revertForm.ptType`) === 2 && transferObj.goodsItemsNumBoList.length"
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
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="error" v-if="approval.status === 3">
          <i class="iconfont icon-shibai1"></i>
          <p>审核不通过</p>
          <p>备注：{{ blankGet($_.get(approval.approvalTimelineList, '[0].remark')) }}</p>
          <div class="c-item c-item_sack-img">
            <div class="i-lable">附件：</div>
            <div class="i-value">
              <file-previewer :value="$_.get(approval.approvalTimelineList, '[0].fileJson')"></file-previewer>
            </div>
          </div>
          <p>财务审核人：{{ $_.get(approval, `approvalSubRevertForm.revertForm.distributor.financialService`) }}</p>
          <p>财务审核时间：{{ $_.get(approval, `approvalSubRevertForm.revertForm.distributor.financialServiceApprovedTime`) }}</p>
        </div>
        <div class="error" v-if="approval.status === 4">
          <i class="iconfont icon-shibai1"></i>
          <p>审核已取消</p>
        </div>
      </template>
    </div>
    <popup-confirm
      ref="popupConfirmRevertFormUpdate"
      title="添加支付信息"
      :config="{ width: 900, height: 500 }"
    >
      <div class="popup-confirm_revert-form-update">
        <form-validate
          ref="revertFormUpdate"
          :form="popup.revertFormUpdate.attr.form"
          :validator="entitys.RevertForm.formUtil().validate"
          :fill="popup.revertFormUpdate.fn.fill"
        >
          <form-validate-field label="快递方式">
            <div class="u-express" style="display: flex;">
              <options-selector
                :mode="2"
                :config="{ key: 'sysExpress' }"
                style="width: 150px"
                @change="(e) => {this.popup.revertFormUpdate.attr.form.sysExpressId.value = e;}"
              ></options-selector>
            </div>
          </form-validate-field>
          <form-validate-field label="收货地址">
            <div class="u-address" style="display: flex;">
              <options-selector
                ref="optionsSelectorAddress"
                :mode="1"
                :config="{ req: popup.revertFormUpdate.fn.addressQuery}"
                @change="popup.revertFormUpdate.fn.addressChangeHandler"
              ></options-selector>
              <el-button
                size="mini"
                type="primary"
                style="marginLeft: 10px"
                @click.native="$refs.popupConfirmAddressAdd.open({triggerClose: popup.addressAdd.fn.closeHandler, triggerHidden: popup.addressAdd.fn.hiddenHandler})"
              >新增</el-button>
            </div>
          </form-validate-field>
          <form-validate-field label="支付信息">
            <div class="u-payment">
              <div class="p-result">
                <p>
                  袋子费合计：
                  <em>￥{{ popup.revertFormUpdate.attr.amountNeed | amountFormat}}</em>/
                  已支付：
                  <em>￥{{ popup.revertFormUpdate.attr.amountPayed | amountFormat}}</em>
                </p>
              </div>
              <div class="p-way">
                <axq-payment
                  ref="axqPayment"
                  :mode="2"
                  :is-query-freeze="1"
                  :member-id="popup.revertFormUpdate.attr.info.distributorId"
                  :hidden-payment-way="popup.revertFormUpdate.fn.hiddenPaymentWay"
                  :load-payment-form="popup.revertFormUpdate.fn.loadPaymentForm"
                  @change="popup.revertFormUpdate.fn.paymentChangeHandler"
                  @remark-change="popup.revertFormUpdate.fn.remarkChangeHandler"
                ></axq-payment>
              </div>
            </div>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAddressAdd" title="添加地址" :config="{ width: 700, height: 400 }">
      <div class="popup-confirm_address-add">
        <form-validate
          ref="addressAdd"
          :form="popup.addressAdd.attr.form"
          :validator="entitys.MemberAddress.formUtil().validate"
        >
          <form-validate-field label="区域" :field="popup.addressAdd.attr.form.provinceId">
            <options-selector
              :mode="3"
              :config="{ key: 'sysRegion' }"
              @change="popup.addressAdd.fn.provinceChangeHandler"
            ></options-selector>
          </form-validate-field>
          <form-validate-field label="详细地址" :field="popup.addressAdd.attr.form.fullAddress">
            <el-input
              type="textarea"
              :rows="5"
              v-model="popup.addressAdd.attr.form.fullAddress.value"
            ></el-input>
          </form-validate-field>
          <form-validate-field label="收件人" :field="popup.addressAdd.attr.form.consignee">
            <el-input v-model="popup.addressAdd.attr.form.consignee.value"></el-input>
          </form-validate-field>
          <form-validate-field label="联系电话" :field="popup.addressAdd.attr.form.mobile">
            <el-input v-model="popup.addressAdd.attr.form.mobile.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';
import filePreviewer from '@/components/file-previewer';
import popupConfirm from '@/components/popup/type/confirm';
import optionsSelector from '@/components/options-selector';
import axqPayment from '@/components/axq/payment';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';

import { model } from '@/model';
const {
  RevertForm,
  Member,
  MemberAddress
} = model.collection;

export default {
  components: {
    filePreviewer,
    formValidate,
    formValidateField,
    popupConfirm,
    optionsSelector,
    axqPayment,
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
      entitys: {
        RevertForm,
        MemberAddress
      },
      popup: {
        revertFormUpdate: {
          attr: {
            info: {},
            form: RevertForm.formUtil().generator('update', 'default'),
            amountNeed: 0,
            amountPayed: 0,
            integralAchieveGive: 0
          },
          fn: {
            fill: (callback) => {
              callback(RevertForm, this.popup.revertFormUpdate.attr.info);
            },
            addressQuery: (ok) => {
              Member.sendApi('addressPage', { params: {}, data: { query: { memberId: this.popup.revertFormUpdate.attr.form.distributorId.value } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  ok(data.map(i => ({ value: i.id, label: `${i.consignee}/${i.mobile}/${i.fullAddress}`, _raw: i })));
                } else {
                  this.$message({
                    message: '获取店主地址错误',
                    type: 'warning'
                  });
                }
              });
            },
            addressChangeHandler: (e, _raw) => {
              const { consignee, mobile, provinceId, provinceName, cityId, cityName, districtId, districtName, fullAddress } = _raw;
              this.popup.revertFormUpdate.attr.form.recipient.value = consignee;
              this.popup.revertFormUpdate.attr.form.recipientMobile.value = mobile;
              this.popup.revertFormUpdate.attr.form.provinceId.value = provinceId;
              this.popup.revertFormUpdate.attr.form.provinceName.value = provinceName;
              this.popup.revertFormUpdate.attr.form.cityId.value = cityId;
              this.popup.revertFormUpdate.attr.form.cityName.value = cityName;
              this.popup.revertFormUpdate.attr.form.districtId.value = districtId;
              this.popup.revertFormUpdate.attr.form.districtName.value = districtName;
              this.popup.revertFormUpdate.attr.form.fullAddress.value = fullAddress;
            },
            loadPaymentForm: () => {
              return {
                revertFormId: this.popup.revertFormUpdate.attr.info.id,
                distributorId: this.popup.revertFormUpdate.attr.info.distributorId
              };
            },
            hiddenPaymentWay: () => {
              const w = ['prestore'];
              if (this.popup.revertFormUpdate.attr.info.ptType === 1) {
                w.push('sixueBalance');
              }
              if (this.popup.revertFormUpdate.attr.info.ptType === 2) {
                w.push('balance');
              }
              return w;
            },
            paymentChangeHandler: (e) => {
              const { amountNeed, amountPayed } = e;
              this.popup.revertFormUpdate.attr.amountNeed = amountNeed;
              this.popup.revertFormUpdate.attr.amountPayed = amountPayed;
            },
            remarkChangeHandler: (e) => {
              this.popup.revertFormUpdate.attr.form.remark.value = e;
            },
            openHandler: (ok) => {
              this.popup.revertFormUpdate.attr.form = RevertForm.formUtil().generator('update', 'default');
              RevertForm.sendApi('formInfo', { params: {}, data: { query: { id: this.$_.get(this.approval, 'approvalSubRevertForm.revertForm.id') } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.revertFormUpdate.attr.info = data;
                  ok();
                  this.$nextTick(() => {
                    this.$refs.axqPayment.update();
                  });
                } else {
                  this.$message({
                    message: '获取调换货单信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const paymentCheck = this.$refs.axqPayment.check();
              if (!paymentCheck.ok) {
                errorCallback();
                return;
              }
              this.$refs.revertFormUpdate.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  RevertForm.sendApi('formUpdate', { params: { id: this.popup.revertFormUpdate.attr.info.id, isSubmitApproval: true, type: 2 }, data: { revertPaymentParamsBo: paymentCheck.paymentParamsBo, revertForm: form } }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$emit('update');
                        this.$message({
                          message: '调换货更新成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '调换货更新失败',
                          type: 'warning'
                        });
                      }
                    }
                  );
                } else {
                  errorCallback();
                  this.$message({
                    message: '请确认信息',
                    type: 'warning'
                  });
                }
              });
            }
          }
        },
        addressAdd: {
          attr: {
            form: MemberAddress.formUtil().generator('add', 'default')
          },
          fn: {
            provinceChangeHandler: (e) => {
              const [provinceId, cityId, districtId] = e.map(i => i._raw.id);
              const [provinceName, cityName, districtName] = e.map(i => i._raw.name);
              this.popup.addressAdd.attr.form.provinceId.value = provinceId;
              this.popup.addressAdd.attr.form.cityId.value = cityId;
              this.popup.addressAdd.attr.form.districtId.value = districtId;
              this.popup.addressAdd.attr.form.provinceName.value = provinceName;
              this.popup.addressAdd.attr.form.cityName.value = cityName;
              this.popup.addressAdd.attr.form.districtName.value = districtName;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.popup.addressAdd.attr.form.fullAddress.value = this.popup.addressAdd.attr.form.provinceName.value +
                this.popup.addressAdd.attr.form.cityName.value +
                this.popup.addressAdd.attr.form.districtName.value +
                this.popup.addressAdd.attr.form.fullAddress.value;
              this.popup.addressAdd.attr.form.memberId.value = this.popup.revertFormUpdate.attr.form.distributorId.value;
              this.$refs.addressAdd.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  MemberAddress.sendApi('addressAdd', { params: {}, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.optionsSelectorAddress.reload();
                        this.$message({
                          message: '代理地址添加成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '代理地址添加失败',
                          type: 'warning'
                        });
                      }
                    }
                  );
                } else {
                  errorCallback();
                  this.$message({
                    message: '请确认信息',
                    type: 'warning'
                  });
                }
              });
            },
            hiddenHandler:()=>{
              this.popup.addressAdd.attr.form = MemberAddress.formUtil().generator('add', 'default');
            }
          }
        }
      }
    };
  },
  computed: {
    list () {
      const total = [];
      const pre = ['创建袋子费'];
      const last = ['已通过'];
      return total.concat(pre).concat(this.approval.approvalWorkflowList.map(i => i.name)).concat(last);
    },
    active () {
      if (this.approval.status === 2) {
        return this.approval.approvalWorkflowList.length + 3;
      }
      return this.approval.approvalWorkflowList.map(i => i.id).indexOf(this.approval.workflowId) + 2;
    },
    paymentBankJson () {
      if (this.approval.approvalSubRevertForm.revertForm.paymentBankJson) {
        return this.approval.approvalSubRevertForm.revertForm.paymentBankJson.toParse().map(i => i.amount).join('/');
      }
      return [];
    },
    transferObj () {
      const j = this.$_.get(this.approval, 'approvalSubRevertForm.revertForm.transferBalanceGoodsSeriesJson');
      return j ? JSON.parse(j) : { goodsSeriesNumBoList: [], goodsItemsNumBoList: [], };
    },
    transferJson2GoodsSeries () {
      const j = this.$_.get(this.approval, 'approvalSubRevertForm.revertForm.transferBalanceGoodsSeriesJson');
      const k = j ? JSON.parse(j) : { goodsSeriesNumBoList: [], };
      const column = [];
      const data = {};
      for (let i = 0; i < k.goodsSeriesNumBoList.length; i++) {
        const g = k.goodsSeriesNumBoList[i];
        column.push(g.goodsSeriesName);
        data[g.goodsSeriesName] = g.quantity;
      }
      return {
        column,
        data
      };
    }

  },
  methods: {
    _checkEnableSubmit () {
      let r = {
        ok: true,
        message: ''
      }
      if (this.$_.get(this.approval, `approvalSubRevertForm.revertForm.amountPackage`) && this.$_.get(this.approval, `approvalSubRevertForm.revertForm.amountPackage`) > this.$_.get(this.approval, `approvalSubRevertForm.revertForm.amountPackageActual`)) {
        return {
          ok: false,
          message: '请填写支付信息'
        }
      }
      return r;
    }
  }
};
</script>

<style lang="less">
@import url("./less/index.less");
.progress {
  &_revert-form {
    .p-info {
      .error {
        .e_remark {
          width: 100%;
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
      .content {
        .t-item {
          margin-bottom: 20px;
          .i-title {
            margin-bottom: 20px;
          }
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .t-left {
          font-size: 14px;
          .t-left-title {
            font-weight: bold;
            font-size: 14px;
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
    }
    .popup-confirm {
      &_revert-form-update {
        padding: 20px;
      }
      &_address-add {
        padding: 20px;
      }
    }
  }
}
</style>
