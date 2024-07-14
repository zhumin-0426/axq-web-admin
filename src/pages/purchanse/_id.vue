<template>
  <div class="info-base purchanse-info">
    <div class="b-block">
      <div class="b-title">
        <span>订单详情</span>
        <el-tag
          v-if="infoGet('_raw.isNewDistributor')"
          style="marginleft: 10px; color: #409eff"
          >新店主订单</el-tag
        >
      </div>
      <div class="b-box">
        <div class="b-box_console">
          <div class="c-left">
            <grid :col="3">
              <grid-item label="订单编号：">
                <span>{{ infoGet("sn") }}</span>
              </grid-item>
              <grid-item label="代理名称：">
                <span
                  >{{ infoGet("_raw.member.nickname") }}/{{
                    infoGet("_raw.member.id")
                  }}</span
                >
              </grid-item>
              <grid-item label="商品数量：">
                <span>{{ infoGet("_raw.goodsItemsQuantity") }}</span>
              </grid-item>
              <grid-item label="订单金额：">
                <span>￥{{ infoGet("amount") | amountFormat }}</span>
              </grid-item>
              <grid-item label="订单时间：">
                <span>{{ infoGet("_raw.createTime") }}</span>
              </grid-item>
              <grid-item label="业绩积分：" v-if="viewNodeVisable.fn.do(11)">
                <span>
                  {{
                    infoGet("_raw.integralAchieveGive")
                      ? infoGet("_raw.integralAchieveGive")
                      : "/"
                  }}
                </span>
              </grid-item>
              <grid-item label="业绩时间：" v-if="viewNodeVisable.fn.do(11)">
                <span>{{ infoGet("_raw") | getAchieveTime }}</span>
              </grid-item>
              <grid-item label="快递方式：">
                <span>{{ infoGet("_raw.sysExpress.name") }}</span>
              </grid-item>
              <grid-item label="收货地址：" v-if="viewNodeVisable.fn.do(6)">
                <span>{{ infoGet("_raw.fullAddress") }}</span>
              </grid-item>
            </grid>
          </div>
          <div class="c-right">
            <div class="r-btns">
              <div class="b-sub">
                <el-button-group>
                  <el-button
                    size="small"
                    type="warning"
                    @click.native="action.fn.update2cancel"
                    v-if="viewNodeVisable.fn.do(1)"
                    >取消订单</el-button
                  >
                  <el-button
                    size="small"
                    type="warning"
                    style="marginleft: 10px"
                    @click.native="
                      action.fn.addApprovalCancelPurchanse(1, {
                        title: '异常订单',
                        text: '将该订单设置未异常订单？',
                        textSuccess: '异常订单已提交审核',
                        textError: '异常订单提交失败',
                      })
                    "
                    v-if="viewNodeVisable.fn.do(2)"
                    >异常订单</el-button
                  >
                  <el-button
                    size="small"
                    type="warning"
                    @click.native="
                      action.fn.addApprovalCancelPurchanse(2, {
                        title: '废弃订单',
                        text: '将该订单设置未废弃订单？',
                        textSuccess: '废弃订单已提交审核',
                        textError: '废弃订单提交失败',
                      })
                    "
                    v-if="viewNodeVisable.fn.do(3)"
                    >废弃订单</el-button
                  >
                </el-button-group>
              </div>
              <div class="b-main">
                <el-button
                  size="small"
                  style="width: 80px"
                  @click.native="action.fn.print"
                  v-if="viewNodeVisable.fn.do(12)"
                  >打印</el-button
                >
                <el-button
                  size="small"
                  type="primary"
                  @click.native="action.fn.submit"
                  v-if="viewNodeVisable.fn.do(9)"
                  >重新提交</el-button
                >
                <el-button
                  size="small"
                  type="primary"
                  @click.native="action.fn.addApprovalPurchanse"
                  v-if="viewNodeVisable.fn.do(5)"
                  >提交审核</el-button
                >
                <el-button
                  size="small"
                  type="primary"
                  @click.native="
                    $refs.popupConfirmPay.open({
                      triggerOpen: popup.pay.fn.openHandler,
                      triggerClose: popup.pay.fn.closeHandler,
                    })
                  "
                  v-if="viewNodeVisable.fn.do(10)"
                  >完善支付信息</el-button
                >
              </div>
            </div>
            <div class="r-info">
              <div class="ri-item">
                <div class="key">
                  <span>状态</span>
                </div>
                <div class="value">
                  <span>
                    {{ entitys.Purchanse.filter("status", infoGet("status")) }}
                  </span>
                </div>
              </div>
              <div class="ri-item">
                <div class="key">
                  <span>金额</span>
                </div>
                <div class="value">
                  <span>￥{{ infoGet("amount") | amountFormat }}</span>
                </div>
              </div>
            </div>
            <p class="r-info-remark" v-if="viewNodeVisable.fn.do(9)">
              备注：{{
                $_.get(
                  infoGet("_raw.approvalTimelineList", []).find((i) => i.status === 2),
                  "remark"
                )
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="b-block">
      <div class="b-title">
        <span>支付信息</span>
        <span>实际支付：￥{{ infoGet("_raw.amountActual") | amountFormat }}</span>
        <span
          style="color: #ed4014"
          v-if="infoGet('_raw.amountActual') - infoGet('_raw.amount') > 0"
          >（超出转存余额￥{{
            ( !!infoGet("_raw.isNewDistributor", 0) ? infoGet("_raw.amountActual") - infoGet("_raw.amount") - (infoGet("_raw.integralAchieveGive") * 35) :   (infoGet("_raw.amountActual") - infoGet("_raw.amount"))   ) | amountFormat
          }}）</span
        >
      </div>
      <div class="b-box">
        <cell-group>
          <cell-item
            label="微信支付："
            class="g-item"
            v-if="infoGet('_raw.paymentWeixinAmount') > 0"
          >
            <span>{{ infoGet("_raw.paymentWeixinAmount") }}元</span>
          </cell-item>
          <cell-item
            label="余额支付："
            class="g-item"
            v-if="infoGet('_raw.paymentBalanceAmount') > 0"
          >
            <span>{{ infoGet("_raw.paymentBalanceAmount") }}元</span>
          </cell-item>
          <cell-item
            label="支付宝："
            class="g-item"
            v-if="infoGet('_raw.paymentAlipayAmount') > 0"
          >
            <span>{{ infoGet("_raw.paymentAlipayAmount") }}元</span>
          </cell-item>
          <cell-item
            label="刷卡："
            class="g-item"
            v-if="infoGet('_raw.paymentCashAmount') > 0"
          >
            <span>{{ infoGet("_raw.paymentCashAmount") }}元</span>
          </cell-item>
          <cell-item
            label="银行卡："
            class="g-item"
            v-if="infoGet('_raw.paymentBankJson').toParse().length > 0"
          >
            <div
              class="paymentBank"
              v-for="(i, k) in infoGet('_raw.paymentBankJson').toParse()"
              :key="k"
            >
              <p>{{ i.name }}：{{ i.amount }}元</p>
            </div>
          </cell-item>
          <cell-item
            label="思雪余额："
            class="g-item"
            v-if="infoGet('_raw.paymentSixueBalanceAmount') > 0"
          >
            <span>{{ infoGet("_raw.paymentSixueBalanceAmount") }}元</span>
          </cell-item>
          <cell-item
            label="组合支付："
            class="g-item"
            v-if="infoGet('_raw.paymentGoodsSeriesPrestoreAmount') > 0"
          >
            <span style="marginright: 20px"
              >{{ infoGet("_raw.paymentGoodsSeriesPrestoreAmount") }}元</span
            >
            <elastic-table
              :column="column"
              :table-data="infoGet('_raw.paymentGoodsSeriesPrestoreJson', []).toParse()"
            ></elastic-table>
          </cell-item>
          <cell-item
            label="支付凭证："
            class="g-item"
            v-if="[1, 2].includes(infoGet('_raw.type'))"
          >
            <file-previewer :value="infoGet('_raw.paymentVoucherJson')"></file-previewer>
          </cell-item>
          <cell-item label="备注：" class="g-item">
            <span>{{ infoGet("_raw.remark") || "--" }}</span>
          </cell-item>
        </cell-group>
      </div>
    </div>
    <div class="b-block" v-if="viewNodeVisable.fn.do(6)">
      <div class="b-title">
        <span
          >购买规格（合计：{{
            infoGet("_raw.purchanseGoodsItemsList", []) | addUp("quantity")
          }}/件）</span
        >
      </div>
      <div class="b-box">
        <axq-goods-table
          ref="addGoodsTable"
          :type="1"
          :cell-config="{
            defaultValue: (v) => {
              return {
                _extra: {
                  limit: v.stock,
                },
                quantity: 0,
              };
            },
          }"
          :config="{
            xAxisHook: [
              (v) => {
                return v.quantity;
              },
            ],
            xAxiRender: (n, l) => {
              return `<span>${n}（${l[0]}/件）</span>`;
            },
          }"
        ></axq-goods-table>
      </div>
    </div>
    <div class="b-block" v-if="viewNodeVisable.fn.do(7)">
      <div class="b-title">
        <span
          >购买组合（合计：{{
            infoGet("_raw.purchanseGoodsSeriesList", []) | addUp("quantity")
          }}/件）</span
        >
      </div>
      <div class="b-box">
        <axq-goods-series-table
          ref="addGoodsSeriesTable"
          :config="{ editable: false }"
        ></axq-goods-series-table>
      </div>
    </div>
    <div class="b-block" v-if="viewNodeVisable.fn.do(8)">
      <div class="b-title">
        <span
          >赠送商品（合计：{{
            infoGet("_raw.purchanseGiftList", []) | addUp("quantity")
          }}/件）</span
        >
      </div>
      <div class="b-box">
        <axq-goods-table
          ref="addGiftTable"
          :type="1"
          :cell-config="{
            defaultValue: (v) => {
              return {
                _extra: {
                  limit: v.stock,
                },
                quantity: 0,
              };
            },
          }"
        ></axq-goods-table>
      </div>
    </div>
    <popup-confirm ref="popupConfirmPay" title="完善支付信息">
      <div class="popup-confirm_pay">
        <form-validate
          ref="formValidatePurchanseUpdate"
          :form="popup.pay.attr.form"
          :validator="entitys.Purchanse.formUtil().validate"
          :fill="popup.pay.fn.fill"
        >
          <div class="p-info">
            <p>
              订单合计：
              <em style="marginright: 20px"
                >需支付：￥{{ popup.pay.attr.result.amountNeed | amountFormat }}</em
              >
              已支付：
              <em>￥{{ popup.pay.attr.result.amountPayed | amountFormat }}</em>
            </p>
          </div>
          <div class="p-way">
            <div class="p-way">
              <axq-payment
                ref="axqPayment"
                :config="{ noCheck: false }"
                :is-query-freeze="1"
                :is-new-distributor="this.infoGet('_raw.isNewDistributor')"
                :member-id="this.infoGet('_raw.memberId')"
                :hidden-payment-way="popup.pay.fn.hiddenPaymentWay"
                :load-payment-form="popup.pay.fn.loadPaymentForm"
                @change="popup.pay.fn.paymentChangeHandler"
                @remark-change="popup.pay.fn.remarkChangeHandler"
                @payment-voucher-change="popup.pay.fn.paymentVoucherChangeHandler"
              ></axq-payment>
            </div>
          </div>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import infoMixin from "@/mixins/type/info";
import axqGoodsTable from "@/components/axq/goods-table";
import axqGoodsSeriesTable from "@/components/axq/goods-series-table";
import formValidate from "@/components/form-validate";
import formValidateField from "@/components/form-validate/field";
import popupConfirm from "@/components/popup/type/confirm";
import axqPayment from "@/components/axq/payment";
import Printer from "@/components/axq/printer";
import grid from "@/components/grid";
import gridItem from "@/components/grid/item";
import cellGroup from "@/components/cell/group.vue";
import cellItem from "@/components/cell/item.vue";
import elasticTable from "@/components/elastic-table";
import filePreviewer from "@/components/file-previewer";
import { model } from "@/model";
const { Purchanse, GoodsItems, Approval } = model.collection;

export default {
  mixins: [infoMixin],
  components: {
    axqGoodsTable,
    axqGoodsSeriesTable,
    formValidate,
    formValidateField,
    axqPayment,
    popupConfirm,
    grid,
    gridItem,
    cellGroup,
    cellItem,
    elasticTable,
    filePreviewer,
  },
  data() {
    return {
      type: Number(this.$route.query.type),
      from: this.$route.query.from,
      payment: {
        paymentList: [],
      },
      info: {
        config: {
          entity: "Purchanse",
          action: "info",
        },
        result: {},
        callback: () => {
          this.adaptor.fn.setVeiwInfo();
        },
      },
      entitys: {
        Purchanse,
      },
      adaptor: {
        fn: {
          setVeiwInfo: () => {
            if (this.type !== 3) {
              this.infoGet("_raw.purchanseGoodsItemsList").forEach((i) => {
                this.$refs.addGoodsTable.setVal(i.goodsItems.goodsId, {
                  goodsItemsId: i.goodsItemsId,
                  value: { quantity: i.quantity },
                });
              });
            }
            if (this.type !== 3 && this.type !== 5) {
              this.infoGet("_raw.purchanseGiftList").forEach((i) => {
                this.$refs.addGiftTable.setVal(i.goodsItems.goodsId, {
                  goodsItemsId: i.goodsItemsId,
                  value: { quantity: i.quantity },
                });
              });
            }
            if (this.type === 3) {
              this.infoGet("_raw.purchanseGoodsSeriesList").forEach((i) => {
                this.$refs.addGoodsSeriesTable.setValue(i.goodsSeriesId, i.quantity);
              });
            }
          },
          getSubmitApprovalCancelPurchanseForm: (type) => {
            const f = {
              typeId: 8,
              approvalSubCancelPurchanse: {
                cancelType: type,
                purchanseType: this.type,
                purchanseId: Number(this.params.id),
              },
            };
            return f;
          },
          getSubmitApprovalPurchanseForm: () => {
            const f = {};
            if (this.type === 1) {
              f.typeId = 3;
              f.approvalSubPurchanseStandard = {
                purchanseId: Number(this.params.id),
              };
            }
            if (this.type === 2) {
              f.typeId = 4;
              f.approvalSubPurchansePresale = {
                purchanseId: Number(this.params.id),
              };
            }
            if (this.type === 3) {
              f.typeId = 5;
              f.approvalSubPurchansePrestore = {
                purchanseId: Number(this.params.id),
              };
            }
            if (this.type === 5) {
              f.typeId = 7;
              f.approvalSubPurchanseCustomize = {
                purchanseId: Number(this.params.id),
              };
            }
            if (this.type === 6) {
              f.typeId = 12;
              f.approvalSubPurchanseSixue = {
                purchanseId: Number(this.params.id),
              };
            }
            if (this.type === 7) {
              f.typeId = 13;
              f.approvalSubPurchanseSixuePresale = {
                purchanseId: Number(this.params.id),
              };
            }
            return f;
          },
        },
      },
      viewNodeVisable: {
        fn: {
          do: (n) => {
            if (n === 1) {
              return [0, 2].includes(this.infoGet("status"));
            }
            if (n === 2) {
              return (
                this.infoGet("status") === 4 &&
                this.type !== 3 &&
                this.from === "unstockout"
              );
            }
            if (n === 3) {
              return (
                this.infoGet("status") === 3 &&
                this.type !== 3 &&
                this.from === "unstockout"
              );
            }
            if (n === 5) {
              return (
                this.infoGet("status") === 0 && this.infoGet("_raw.paymentStatus") === 2
              );
            }
            if (n === 6) {
              return this.type !== 3;
            }
            if (n === 7) {
              return this.type === 3;
            }
            if (n === 8) {
              return this.type !== 3 && this.type !== 5;
            }
            if (n === 9) {
              return (
                this.infoGet("status") === 2 && this.infoGet("_raw.paymentStatus") === 2
              );
            }
            if (n === 10) {
              return (
                [0, 2].includes(this.infoGet("status")) &&
                this.infoGet("_raw.paymentStatus") === 1
              );
            }
            if (n === 11) {
              return [1, 2, 3].includes(this.type);
            }
            if (n === 12) {
              return this.from !== "unstockout";
            }
          },
        },
      },
      action: {
        fn: {
          update2cancel: () => {
            this.$confirm("是否取消该订单，改操作无法返回", "取消订单", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                Purchanse.sendApi(
                  "updateStatus",
                  { params: { id: Number(this.params.id), status: 8 }, data: {} },
                  { showLoading: true }
                ).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    this.$message({
                      message: "订单已取消",
                      type: "success",
                    });
                    this._boot();
                  } else {
                    this.$message({
                      message: "订单取消失败",
                      type: "error",
                    });
                  }
                });
              })
              .catch(() => {});
          },
          print: () => {
            new Printer(1).run({}, { purchanseId: this.infoGet("_raw.id") });
          },
          addApprovalCancelPurchanse: (type, config) => {
            this.$confirm(config.text, config.title, {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                Approval.sendApi(
                  "add",
                  {
                    params: {},
                    data: this.adaptor.fn.getSubmitApprovalCancelPurchanseForm(type),
                  },
                  { showLoading: true }
                ).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    this.$message({
                      message: config.textSuccess,
                      type: "success",
                    });
                    this._boot();
                  } else {
                    this.$message({
                      message: config.textError,
                      type: "error",
                    });
                  }
                });
              })
              .catch(() => {});
          },
          addApprovalPurchanse: () => {
            this.$confirm("是否提交该订单审核？审核期间无法修改", "提交审核", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "info",
            })
              .then(() => {
                Approval.sendApi(
                  "add",
                  { params: {}, data: this.adaptor.fn.getSubmitApprovalPurchanseForm() },
                  { showLoading: true }
                ).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    this.$message({
                      message: "订单已提交审核",
                      type: "success",
                    });
                    this._boot();
                  } else {
                    this.$message({
                      message: "订单提交审核失败",
                      type: "error",
                    });
                  }
                });
              })
              .catch(() => {});
          },
          submit: () => {
            this.$confirm("是否重新提交订单审核？", "提交审核", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "info",
            })
              .then(() => {
                Approval.sendApi(
                  "submit",
                  { params: { id: this.infoGet("_raw.approvalId") }, data: {} },
                  { showLoading: true }
                ).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    this.$message({
                      message: "订单已提交审核",
                      type: "success",
                    });
                    this._boot();
                  } else {
                    this.$message({
                      message: "订单提交审核失败",
                      type: "error",
                    });
                  }
                });
              })
              .catch(() => {});
          },
        },
      },
      popup: {
        pay: {
          attr: {
            info: {},
            form: Purchanse.formUtil().generator("update", "default"),
            result: {
              amountNeed: 0,
              amountPayed: 0,
              integralAchieveGive: 0,
            },
          },
          fn: {
            fill: (callback) => {
              callback(Purchanse, this.infoGet("_raw"));
            },
            openHandler: (ok) => {
              this.popup.pay.attr.form = Purchanse.formUtil().generator(
                "update",
                "default"
              );
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              const paymentCheck = this.$refs.axqPayment.check();
              if (!paymentCheck.ok) {
                errorCallback();
                return;
              }
              this.$refs.formValidatePurchanseUpdate.validate().then((e) => {
                const { ok, form } = e;
                if (ok) {
                  Purchanse.sendApi("update", {
                    params: {
                      id: Number(this.params.id),
                      checkPayment: paymentCheck.checkPayment,
                    },
                    data: Object.assign(
                      { paymentParamsBo: paymentCheck.paymentParamsBo },
                      { purchanse: form }
                    ),
                  }).then((res) => {
                    const { status } = res;
                    if (status) {
                      okCallback();
                      this._boot();
                      this.$message({
                        message: "支付信息更新成功",
                        type: "success",
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: "支付信息更新失败",
                        type: "error",
                      });
                    }
                  });
                } else {
                  errorCallback();
                  this.$message({
                    message: "请校验输入信息",
                    type: "warning",
                  });
                }
              });
            },
            loadPaymentForm: () => {
              return {
                purchanseId: this.infoGet("_raw.id"),
                purchanseType: this.type,
                paymentParamsGoodsItemsBoList: this.popup.pay.attr.form.purchanseGoodsItemsList.value.map(
                  (i) => {
                    return {
                      goodsItemsId: i.goodsItemsId.value,
                      quantity: i.quantity.value,
                    };
                  }
                ),
                paymentParamsGoodsSeriesBoList: this.popup.pay.attr.form.purchanseGoodsSeriesList.value.map(
                  (i) => {
                    return {
                      goodsSeriesId: i.goodsSeriesId.value,
                      quantity: i.quantity.value,
                    };
                  }
                ),
              };
            },
            hiddenPaymentWay: () => {
              if (this.type === 1 || this.type === 2) {
                return ["sixueBalance"];
              }
              if (this.type === 3) {
                return ["prestore", "sixueBalance"];
              }
              if (this.type === 5) {
                return ["prestore", "balance", "sixueBalance"];
              }
              if (this.type === 6 || this.type === 7) {
                return ["prestore", "balance"];
              }
            },
            paymentChangeHandler: (e) => {
              this.popup.pay.attr.result = e;
            },
            remarkChangeHandler: (e) => {
              this.popup.pay.attr.form.remark.value = e;
            },
            paymentVoucherChangeHandler: (e) => {
              this.popup.pay.attr.form.paymentVoucherJson.value = e;
            }
          },
        },
      },
      column: [
        {
          prop: "goodsSeries.name",
          width: 100,
          label: "组合",
          selectable: false,
        },
        {
          prop: "goodsSeries.amount",
          width: 100,
          label: "单价",
        },
        {
          prop: "quantity",
          width: 100,
          label: "抵扣数量",
        },
      ],
    };
  },
};
</script>

<style lang="less">
.purchanse-info {
  .b-block {
    padding: 0 20px;
    .b-box {
      .g-item {
        display: flex;
        align-items: flex-start;
        .paymentBank {
          p {
            margin-top: 0px;
          }
        }
      }
      &_console {
        display: flex;
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
            height: 70px;
            .b-sub {
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
                margin-top: 10px;
                span {
                  font-size: 24px;
                  color: rgba(0, 0, 0, 0.85);
                }
              }
              &:not(:first-child) {
                margin-left: 30px;
              }
            }
          }
          .r-info-remark {
            width: 180px;
            word-wrap: break-word;
            word-break: normal;
            font-size: 20px;
            color: rgba(236, 25, 25, 0.85);
          }
        }
      }
      .playment {
        width: 67.8%;
      }
    }
  }
  .popup-confirm {
    &_pay {
      padding: 20px;
    }
  }
}
</style>
