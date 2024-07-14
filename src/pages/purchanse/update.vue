<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-08 08:30:18
 * @LastEditTime: 2022-05-03 13:53:12
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/purchanse/update.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="purchanse-update">
    <form-validate
      ref="purchanseUpdate"
      type="step"
      :form="form.value"
      :force-valid-field="form.forceValidField"
      :step-config="form.stepConfig"
      :fill="form.fn.fill"
      @ok="form.fn.okHandler"
    >
      <template slot="step-0" v-if="adaptor.attr.ready">
        <div class="u-goods-items">
          <div class="i-field">
            <div class="f-left">
              <el-row>
                <el-col :span="10">
                  <div class="_field">
                    <div class="f-label">
                      <span>订单编号：</span>
                    </div>
                    <div class="f-value">
                      <span>{{ this.form.value.sn.value }}</span>
                    </div>
                  </div>
                  <div class="_field" v-if="viewNodeVisable.fn.do(1)">
                    <div class="f-label">
                      <span>选择代理：</span>
                    </div>
                    <div class="f-value">
                      <options-selector
                        :mode="4"
                        :placeholder="
                          distributor.nickname ? distributor.nickname : `店主/手机号`
                        "
                        :config="{ req: options.fn.distributorQuery }"
                        @change="options.fn.distributorChangeHandler"
                      ></options-selector>
                    </div>
                  </div>
                  <div class="_field" v-if="viewNodeVisable.fn.do(2)">
                    <div class="f-label">
                      <span>业绩时间：</span>
                    </div>
                    <div class="f-value">
                      <el-date-picker
                        v-model="options.attr.achieveTime"
                        type="month"
                        placeholder="选择月"
                        size="small"
                        style="width: 196px"
                        @change="options.fn.achieveTimeChangeHandler"
                      ></el-date-picker>
                    </div>
                  </div>
                  <div class="_field" v-if="viewNodeVisable.fn.do(3)">
                    <div class="f-label">
                      <span>快递方式：</span>
                    </div>
                    <div class="f-value">
                      <options-selector
                        :mode="2"
                        :config="{
                          key: 'sysExpress',
                          value: this.form.value.sysExpress.value.name,
                        }"
                        @change="options.fn.sysExpressChangeHandler"
                      ></options-selector>
                    </div>
                  </div>
                </el-col>
                <el-col :span="14">
                  <axq-achieve-query
                    :member-id="form.value.memberId.value"
                    v-if="viewNodeVisable.fn.do(4)"
                  ></axq-achieve-query>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div class="_field" v-if="viewNodeVisable.fn.do(5)">
                    <div class="f-label">
                      <span>打印订单价格：</span>
                    </div>
                    <div class="f-value">
                      <switch-selector
                        :mode="1"
                        tip="切换店主订单打印价格方式，是否继续？"
                        :config="{
                          value: form.value.printType.value || 1,
                          selectorList: [
                            { value: 1, label: '是' },
                            { value: 2, label: '否' },
                          ],
                        }"
                        @change="switchSelector.fn.updateDistributorPrintType"
                      ></switch-selector>
                      <p style="marginleft: 20px; color: #fe011f">
                        注：切换店主订单打印价格方式，下次订单将默认为最后一次打印方式
                      </p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div class="_field" v-if="viewNodeVisable.fn.do(18)">
                    <div class="f-label">
                      <span>订单发货方式：</span>
                    </div>
                    <div class="f-value">
                      <switch-selector
                        :mode="1"
                        :config="{
                          value: form.value.deliveryType.value || 1,
                          selectorList: [
                            { value: 1, label: '齐码发货' },
                            { value: 2, label: '拆单发货' },
                          ],
                          noConfirm: true,
                        }"
                        @change="form.value.deliveryType.value = $event.value"
                      ></switch-selector>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div class="_field" v-if="viewNodeVisable.fn.do(6)">
                    <div class="f-label">
                      <span>收货地址：</span>
                    </div>
                    <div class="f-value">
                      <options-selector
                        ref="optionsSelectorAddress"
                        :mode="1"
                        :config="{
                          req: options.fn.addressQuery,
                          value: form.value.fullAddress.value,
                        }"
                        @change="options.fn.addressChangeHandler"
                      ></options-selector>
                      <el-button
                        size="mini"
                        type="primary"
                        style="marginleft: 10px"
                        @click.native="
                          $refs.popupConfirmAddressAdd.open({
                            triggerClose: popup.addressAdd.fn.closeHandler,
                            triggerHidden: popup.addressAdd.fn.hiddenHandler,
                          })
                        "
                        >新增</el-button
                      >
                    </div>
                  </div>
                  <div class="_field" v-if="viewNodeVisable.fn.do(12)">
                    <div class="f-label">
                      <span>收货姓名：</span>
                    </div>
                    <div class="f-value">
                      <el-input v-model="form.value.recipient.value"></el-input>
                    </div>
                  </div>
                  <div class="_field" v-if="viewNodeVisable.fn.do(13)">
                    <div class="f-label">
                      <span>收货联系：</span>
                    </div>
                    <div class="f-value">
                      <el-input v-model="form.value.recipientMobile.value"></el-input>
                    </div>
                  </div>
                  <div class="_field" v-if="viewNodeVisable.fn.do(14)">
                    <div class="f-label">
                      <span>收货地址：</span>
                    </div>
                    <div class="f-value">
                      <el-input
                        type="textarea"
                        :rows="5"
                        v-model="form.value.fullAddress.value"
                      ></el-input>
                    </div>
                  </div>
                  <div class="_field _field_goods" v-if="viewNodeVisable.fn.do(7)">
                    <div class="f-label">
                      <span>选择商品：</span>
                    </div>
                    <div class="f-value">
                      <div class="v-selector">
                        <options-selector
                          :mode="4"
                          :config="{ req: addGoods.fn.goodsQuery }"
                          @change="addGoods.fn.goodsChangeHandler"
                        ></options-selector>
                        <el-button
                          type="primary"
                          size="mini"
                          style="marginleft: 10px"
                          @click.native="addGoods.fn.add"
                          >添加</el-button
                        >
                      </div>
                      <div class="v-result">
                        <div class="r-no-data" v-if="!addGoods.attr.select.length">
                          <span>暂无选择商品</span>
                        </div>
                        <div class="r-list" v-else>
                          <div
                            class="l-item"
                            :class="{
                              'l-item-active': key === addGoods.attr.index,
                            }"
                            :key="key"
                            @click="addGoods.fn.changeGoods(key)"
                            v-for="(item, key) in addGoods.attr.select"
                          >
                            <i
                              class="iconfont icon-V error"
                              style="color: #f56c6c"
                              v-if="item.achieveError"
                            ></i>
                            <span> {{ `${item.goods.name}/${item.quantity}` }}件 </span>
                            <i
                              class="iconfont icon-shanchu1 close"
                              @click="addGoods.fn.delete(key)"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="f-right">
              <div class="r-payment">
                <div class="p-toolbar">
                  <div class="t-left">
                    <p>
                      订单合计：
                      <em
                        >需支付：￥{{ payment.attr.result.amountNeed | amountFormat }}</em
                      >/ 已支付：
                      <em>￥{{ payment.attr.result.amountPayed | amountFormat }}</em>
                    </p>
                  </div>
                  <div class="t-right">
                    <el-button-group>
                      <el-button type="warning" size="mini" @click.native="reset"
                        >重置</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        v-submit="{
                          action: () => {
                            $refs.purchanseUpdate.next();
                          },
                        }"
                        >保存</el-button
                      >
                    </el-button-group>
                  </div>
                </div>
                <div
                  class="_field p-customize-amount-actual"
                  style="paddingbottom: 10px"
                  v-if="viewNodeVisable.fn.do(14)"
                >
                  <div class="f-label">
                    <span>实收金额：</span>
                  </div>
                  <div class="f-value">
                    <el-input
                      type="number"
                      v-model="form.value.amountActual.value"
                      size="mini"
                    ></el-input>
                  </div>
                </div>
                <div class="p-way">
                  <axq-payment
                    ref="axqPayment"
                    :config="{ noCheck: true }"
                    :member-id="
                      form.value.memberId.value ? Number(form.value.memberId.value) : 0
                    "
                    :is-new-distributor="distributor.isNewDistributor === 1 ? 1 : 0"
                    :is-query-freeze="1"
                    :hidden-payment-way="payment.fn.hiddenPaymentWay"
                    :load-payment-form="payment.fn.loadPaymentForm"
                    @change="payment.fn.paymentChangeHandler"
                    @remark-change="payment.fn.remarkChangeHandler"
                    @payment-voucher-change="payment.fn.paymentVoucherChangeHandler"
                  ></axq-payment>
                </div>
              </div>
            </div>
          </div>
          <div class="i-table" v-if="viewNodeVisable.fn.do(8)">
            <div class="t-tip" v-if="addGoods.attr.select.length">
              <div class="t-item">
                <span class="dot" style="background: #1890ff; color: white"></span>
                <span>数量正常</span>
              </div>
              <div class="t-item">
                <span class="dot" style="background: #f56c6c; color: white"></span>
                <span>超出可用库存</span>
              </div>
              <div
                class="t-item"
                v-if="
                  $_.get(addGoods.attr.select, `[${addGoods.attr.index}].achieveError`)
                "
              >
                <p class="error">
                  购买商品积分不满足整数（{{
                    $_.get(addGoods.attr.select, `[${addGoods.attr.index}].achieve`)
                  }}），请调整商品规格数量！
                </p>
              </div>
            </div>
            <div class="t-input">
              <axq-goods-table
                ref="addGoodsTable"
                :type="2"
                :cell-config="{
                  noLimit: [2, 3, 5, 6].includes(type),
                  defaultValue: (v) => {
                    return {
                      _extra: {
                        limit: v.stock,
                      },
                      quantity: '',
                    };
                  },
                  valueFilter: (v) => {
                    return Number(v.quantity) > 0;
                  },
                }"
                :visible="[
                  addGoods.attr.select.length
                    ? addGoods.attr.select[addGoods.attr.index]
                      ? addGoods.attr.select[addGoods.attr.index].goods.id
                      : -1
                    : -1,
                ]"
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
                @change="addGoods.fn.changeHandler"
              ></axq-goods-table>
            </div>
            <div class="t-info">
              <span>合计 （{{ addGoods.attr.total }}）件</span>
            </div>
          </div>
          <div class="i-table" v-if="viewNodeVisable.fn.do(15)">
            <div class="t-input">
              <axq-goods-series-table
                ref="addGoodsSeriesTable"
                @change="addGoodsSeries.fn.changeHandler"
              ></axq-goods-series-table>
            </div>
          </div>
        </div>
        <div class="u-gift" v-if="viewNodeVisable.fn.do(9)">
          <div class="g-title">
            <p>选择赠送商品</p>
          </div>
          <div class="g-selector">
            <div class="_field _field_gift">
              <div class="f-label">
                <span>选择赠品：</span>
              </div>
              <div class="f-value">
                <div class="v-selector">
                  <options-selector
                    :mode="4"
                    :config="{ req: addGift.fn.goodsQuery }"
                    @change="addGift.fn.goodsChangeHandler"
                  ></options-selector>
                  <el-button
                    type="primary"
                    size="mini"
                    style="marginleft: 10px"
                    @click.native="addGift.fn.add"
                    >添加</el-button
                  >
                </div>
                <div class="v-result">
                  <div class="r-no-data" v-if="!addGift.attr.select.length">
                    <span>暂无选择赠品</span>
                  </div>
                  <div class="r-list" v-else>
                    <div
                      class="l-item"
                      :class="{ 'l-item-active': key === addGift.attr.index }"
                      :key="key"
                      @click="addGift.fn.changeGoods(key)"
                      v-for="(item, key) in addGift.attr.select"
                    >
                      <span>{{ `${item.goods.name}/${item.quantity}` }}件</span>
                      <i
                        class="iconfont icon-shanchu1"
                        @click="addGift.fn.delete(key)"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="g-table">
            <div class="i-input">
              <axq-goods-table
                ref="addGiftTable"
                :type="2"
                :cell-config="{
                  defaultValue: (v) => {
                    return {
                      _extra: {
                        limit: v.stock,
                      },
                      quantity: '',
                    };
                  },
                  valueFilter: (v) => {
                    return Number(v.quantity) > 0;
                  },
                }"
                :visible="[
                  addGift.attr.select.length
                    ? addGift.attr.select[addGift.attr.index]
                      ? addGift.attr.select[addGift.attr.index].goods.id
                      : -1
                    : -1,
                ]"
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
                @change="addGift.fn.changeHandler"
              ></axq-goods-table>
            </div>
            <div class="t-info">
              <span>合计 （{{ addGift.attr.total }}）件</span>
            </div>
          </div>
        </div>
      </template>
      <div class="u-result" slot="result">
        <div class="r-icon">
          <i class="iconfont icon-chenggong"></i>
        </div>
        <div class="r-text">
          <span>更新订单成功</span>
        </div>
        <div class="r-description">
          <p>
            提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用 Message
            全局提示反馈即可。灰色区域可以显示一些补充的信息。
          </p>
        </div>
        <div class="r-link">
          <el-button
            type="primary"
            style="margin-left: 8px"
            @click.native="rep(`/purchanse/${params.id}?type=${type}`)"
            >查看订单</el-button
          >
          <el-button
            type="primary"
            style="margin-left: 8px"
            @click.native="printer.fn.do(params.id)"
            >打印订单</el-button
          >
          <el-button style="margin-left: 8px" @click.native="rep('/purchanse/list')"
            >返回列表</el-button
          >
        </div>
      </div>
    </form-validate>
    <popup-confirm
      ref="popupConfirmAddressAdd"
      title="添加地址"
      :config="{ width: 700, height: 400 }"
    >
      <div class="popup-confirm_address-add">
        <form-validate
          ref="addressAdd"
          :form="popup.addressAdd.attr.form"
          :validator="entitys.MemberAddress.formUtil().validate"
        >
          <form-validate-field
            label="区域"
            :field="popup.addressAdd.attr.form.provinceId"
          >
            <options-selector
              :mode="3"
              :config="{ key: 'sysRegion' }"
              @change="popup.addressAdd.fn.provinceChangeHandler"
            ></options-selector>
          </form-validate-field>
          <form-validate-field
            label="详细地址"
            :field="popup.addressAdd.attr.form.fullAddress"
          >
            <el-input
              type="textarea"
              :rows="5"
              v-model="popup.addressAdd.attr.form.fullAddress.value"
            ></el-input>
          </form-validate-field>
          <form-validate-field
            label="收件人"
            :field="popup.addressAdd.attr.form.consignee"
          >
            <el-input v-model="popup.addressAdd.attr.form.consignee.value"></el-input>
          </form-validate-field>
          <form-validate-field
            label="联系电话"
            :field="popup.addressAdd.attr.form.mobile"
          >
            <el-input v-model="popup.addressAdd.attr.form.mobile.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from "@/components/form-validate";
import formValidateField from "@/components/form-validate/field";
import popupConfirm from "@/components/popup/type/confirm";
import optionsSelector from "@/components/options-selector";
import axqAchieveQuery from "@/components/axq/achieve-query";
import axqGoodsTable from "@/components/axq/goods-table";
import axqGoodsSeriesTable from "@/components/axq/goods-series-table";
import switchSelector from "@/components/switch-selector";
import axqPayment from "@/components/axq/payment";
import Printer from "@/components/axq/printer";

import { model } from "@/model";
import { formToolkit } from "@/model/form-toolkit";

const {
  Member,
  MemberAddress,
  Goods,
  Purchanse,
  PurchanseGoodsItems,
  PurchanseGoodsSeries,
  PurchanseGift,
} = model.collection;
export default {
  components: {
    formValidate,
    formValidateField,
    popupConfirm,
    optionsSelector,
    axqAchieveQuery,
    axqGoodsTable,
    axqGoodsSeriesTable,
    switchSelector,
    axqPayment,
  },
  data() {
    return {
      params: this.$route.params,
      type: Number(this.$route.query.type),
      distributor: new Member(),
      entitys: {
        Purchanse,
        MemberAddress,
      },
      adaptor: {
        attr: {
          ready: false,
        },
        fn: {
          init: () => {
            this.adaptor.attr.ready = false;
            this.form.value = Purchanse.formUtil().generator("update", "default");
            this.form.value.type.value = Number(this.$route.query.type);
            this.adaptor.attr.ready = true;
          },
          getPaymentForm: () => {
            let f = {
              purchanseId: Number(this.params.id),
              purchanseType: this.type,
              paymentClearType: this.payment.attr.type.active,
              paymentWeixinAmount: this.payment.attr.way.weixin.active
                ? this.payment.attr.way.weixin.amount
                  ? this.payment.attr.way.weixin.amount
                  : 0
                : 0,
              paymentAlipayAmount: this.payment.attr.way.alipay.active
                ? this.payment.attr.way.alipay.amount
                  ? this.payment.attr.way.alipay.amount
                  : 0
                : 0,
              paymentCashAmount: this.payment.attr.way.cash.active
                ? this.payment.attr.way.cash.amount
                  ? this.payment.attr.way.cash.amount
                  : 0
                : 0,
              paymentParamsBankBoList: this.payment.attr.way.bank.active
                ? this.payment.attr.way.bank.result
                : [],
            };
            if (this.type !== 3) {
              f = Object.assign(f, {
                type: 1,
                paymentParamsGoodsItemsBoList: this.form.value.purchanseGoodsItemsList.value.map(
                  (i) => {
                    return {
                      goodsItemsId: i.goodsItemsId.value,
                      quantity: i.quantity.value,
                    };
                  }
                ),
              });
              if (this.type !== 5) {
                f = Object.assign(f, {
                  memberId: this.form.value.memberId.value
                    ? this.form.value.memberId.value
                    : 3,
                  paymentIsUseBalance: this.payment.attr.way.balance.active ? 1 : 0,
                  paymentIsUseGoodsSeriesPrestore: this.payment.attr.way.prestore.active
                    ? 1
                    : 0,
                });
              }
            } else {
              f = Object.assign(f, {
                type: 2,
                paymentParamsGoodsItemsBoList: [],
                paymentParamsGoodsSeriesBoList: this.form.value.purchanseGoodsPrestoreList.value.map(
                  (i) => {
                    return {
                      goodsSeriesId: i.goodsSeriesId.value,
                      quantity: i.quantity.value,
                    };
                  }
                ),
              });
            }
            return f;
          },
          setDefaultValue: (e) => {
            this.$refs.axqPayment.loadData({
              remark: e._raw.remark,
              paymentVoucherJson: e._raw.paymentVoucherJson,
            });
            if (e.member) {
              this.distributor = e.member;
            }
            if (this.form.value.achieveTime.value) {
              this.options.attr.achieveTime = this.$dayjs(
                this.form.value.achieveTime.value
              ).format("YYYY-MM-DD");
            }
            if (this.type !== 3) {
              this.addGoods.attr.index = 0;
              const { purchanseGoodsItemsList } = e;
              purchanseGoodsItemsList.forEach((i) => {
                const goods = i.goodsItems.goods;
                if (
                  !this.addGoods.attr.select
                    .map((j) => {
                      return j.goods.id;
                    })
                    .includes(goods.id)
                ) {
                  this.addGoods.attr.select.push({
                    goods: goods,
                    quantity: 0,
                    achieve: 0,
                    achieveError: false,
                  });
                }
                this.$refs.addGoodsTable.setVal(goods.id, {
                  goodsItemsId: i.goodsItemsId,
                  value: {
                    quantity: i.quantity,
                    _extra: { limit: i.goodsItems.stock + i.quantity },
                  },
                });
              });
            } else {
              e.purchanseGoodsSeriesList.forEach((i) => {
                this.$refs.addGoodsSeriesTable.setValue(i.goodsSeries.id, i.quantity);
              });
            }
            if (this.type !== 5 && this.type !== 3) {
              this.addGift.attr.index = 0;
              const { purchanseGiftList } = e;
              purchanseGiftList.forEach((i) => {
                const goods = i.goodsItems.goods;
                if (
                  !this.addGift.attr.select
                    .map((j) => {
                      return j.goods.id;
                    })
                    .includes(goods.id)
                ) {
                  this.addGift.attr.select.push({
                    goods: goods,
                    quantity: 0,
                  });
                }
                this.$refs.addGiftTable.setVal(goods.id, {
                  goodsItemsId: i.goodsItemsId,
                  value: {
                    quantity: i.quantity,
                    _extra: { limit: i.goodsItems.stock + i.quantity },
                  },
                });
              });
            }
          },
        },
      },
      viewNodeVisable: {
        fn: {
          do: (n) => {
            if (n === 1) {
              return this.type !== 5;
            }
            if (n === 2) {
              return this.type === 3;
            }
            if (n === 3) {
              return this.type !== 3;
            }
            if (n === 4) {
              return (
                (this.type === 1 || this.type === 2 || this.type === 3) &&
                this.form.value.memberId.value
              );
            }
            if (n === 5) {
              return this.type !== 3 && this.type !== 5 && this.form.value.memberId.value;
            }
            if (n === 6) {
              return (
                [1, 2, 4, 6, 7].includes(this.type) && this.form.value.memberId.value
              );
            }
            if (n === 7) {
              return this.type !== 3;
            }
            if (n === 8) {
              return this.type !== 3;
            }
            if (n === 9) {
              return this.type !== 5 && this.type !== 3;
            }
            if (n === 10) {
              return this.type !== 5 || this.type !== 3;
            }
            if (n === 11) {
              return this.type !== 5;
            }
            if (n === 12) {
              return this.type === 5;
            }
            if (n === 13) {
              return this.type === 5;
            }
            if (n === 14) {
              return this.type === 5;
            }
            if (n === 15) {
              return this.type === 3;
            }
            if (n === 16) {
              return this.payment.attr.type.active === 1;
            }
            if (n === 18) {
              return (
                (this.type === 2 || this.type === 7) && this.form.value.memberId.value
              );
            }
          },
        },
      },
      options: {
        attr: {
          achieveTime: this.$dayjs().format("YYYY-MM-DD"),
        },
        fn: {
          achieveTimeChangeHandler: (e) => {
            this.form.value.achieveTime.value = this.$dayjs(e).format("YYYY-MM-DD");
          },
          distributorQuery: (e, ok) => {
            Member.sendApi("page", {
              params: {},
              data: {
                query: {
                  type: 7,
                  status: 1,
                  keyword: e,
                  isValidDistributor: 1,
                  customerServiceId: this.isAdmin
                    ? ""
                    : this.$_.get(
                        this.axqStaffInfo,
                        "accessExtraJson.allowedGetAllDistributor"
                      ) === 1
                    ? ""
                    : this.axqStaffInfo.id,
                },
              },
            }).then((res) => {
              const { data } = res;
              ok(data.map((i) => ({ value: i.id, label: `${i.nickname}/${i.mobile}` })));
            });
          },
          distributorChangeHandler: (e) => {
            if (!e) {
              this.distributor = new Member();
              this.form.value.memberId.value = 0;
              this.form.value.axqSelfEmployedLaborerId.value = 0;
              return;
            }
            Member.sendApi("info", { params: {}, data: { query: { id: e } } }).then(
              (res) => {
                const { status, data } = res;
                if (status) {
                  const { axqSelfEmployedLaborerId } = data.info;
                  this.distributor = new Member(data.info);
                  this.form.value.memberId.value = e;
                  this.form.value.axqSelfEmployedLaborerId.value = axqSelfEmployedLaborerId;
                } else {
                  this.$message({
                    message: "获取店主信息错误",
                    type: "warning",
                  });
                }
              }
            );
          },
          sysExpressChangeHandler: (e) => {
            this.form.value.sysExpressId.value = e;
          },
          addressQuery: (ok) => {
            Member.sendApi("addressPage", {
              params: {},
              data: { query: { memberId: this.form.value.memberId.value } },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: `${i.consignee}/${i.mobile}/${i.fullAddress}`,
                    _raw: i,
                  }))
                );
              } else {
                this.$message({
                  message: "获取店主地址错误",
                  type: "warning",
                });
              }
            });
          },
          addressChangeHandler: (e, _raw) => {
            const {
              consignee,
              mobile,
              provinceId,
              provinceName,
              cityId,
              cityName,
              districtId,
              districtName,
              fullAddress,
            } = _raw;
            this.form.value.recipient.value = consignee;
            this.form.value.recipientMobile.value = mobile;
            this.form.value.provinceId.value = provinceId;
            this.form.value.provinceName.value = provinceName;
            this.form.value.cityId.value = cityId;
            this.form.value.cityName.value = cityName;
            this.form.value.districtId.value = districtId;
            this.form.value.districtName.value = districtName;
            this.form.value.fullAddress.value = fullAddress;
          },
          sysBankChangeHandler: (e) => {
            const { id, _raw } = e;
            this.payment.attr.way.bank.type = id;
            this.payment.attr.way.bank.name = _raw.name;
          },
        },
      },
      form: {
        value: null,
        forceValidField: (() => {
          const type = Number(this.$route.query.type);
          if ([1, 2, 6, 7].includes(type)) {
            return ["memberId", "fullAddress", "sysExpressId"];
          }
          if (type === 3) {
            return ["memberId", "purchanseGoodsSeriesList"];
          }
          if (type === 5) {
            return ["recipient", "recipientMobile", "fullAddress"];
          }
        })(),
        stepConfig: {
          noProgress: true,
          noValidate: true,
          list: [
            {
              _validateField: [""],
              title: "步骤一",
              description: "填写订单",
            },
          ],
        },
        fn: {
          fill: (callback) => {
            Purchanse.sendApi(
              "info",
              {
                params: {},
                data: { dataType: 2, query: { id: Number(this.params.id) } },
              },
              { parse4Entity: true }
            ).then((res) => {
              const { status, data } = res;
              if (status) {
                callback(Purchanse, data._raw);
                this.adaptor.fn.setDefaultValue(data);
              } else {
                this.$message({
                  message: "获取订单信息错误",
                  type: "error",
                });
              }
            });
          },
          okHandler: (ev) => {
            this.updatePurchanse(ev);
          },
        },
      },
      addGoods: {
        attr: {
          tmp: null,
          index: -1,
          select: [],
          total: 0,
        },
        fn: {
          goodsQuery: (e, ok) => {
            let type = 1;
            if ([6, 7].includes(this.type)) {
              type = 2;
            }
            if (this.type === 5) {
              type = "";
            }
            Goods.sendApi("page", {
              params: {},
              data: { query: { keyword: e, status: 1, type } },
            }).then((res) => {
              const { data } = res;
              ok(data.map((i) => ({ value: i.id, label: i.name })));
            });
          },
          goodsChangeHandler: (e) => {
            this.addGoods.attr.tmp = e;
          },
          add: () => {
            if (!this.addGoods.attr.tmp) {
              this.$message({
                message: "请选择商品",
                type: "warning",
              });
              return;
            }
            for (const i in this.addGoods.attr.select) {
              if (this.addGoods.attr.select[i].goods.id === this.addGoods.attr.tmp) {
                this.$message({
                  message: "商品已添加",
                  type: "warning",
                });
                return;
              }
            }
            Goods.sendApi(
              "info",
              { params: {}, data: { query: { id: this.addGoods.attr.tmp } } },
              { parse4Entity: true, showLoading: true, errorTip: "获取商品信息详情错误" }
            ).then((res) => {
              const { status, data } = res;
              if (status) {
                const { goodsItemsList } = data;
                if (data._raw.isStockChecking) {
                  this.$message.warning("该商品正在盘点中~");
                  return;
                }
                this.addGoods.attr.select.push({
                  goods: data,
                  quantity: 0,
                  achieve: 0,
                  achieveError: false,
                });
                this.addGoods.attr.index = this.addGoods.attr.select.length - 1;
                this.$refs.addGoodsTable.setVal(
                  data,
                  goodsItemsList.map((i) => ({
                    goodsItemsId: i.id,
                    value: { _extra: { limit: i.stock }, quantity: "" },
                  }))
                );
              }
            });
          },
          delete: (index) => {
            this.$refs.addGoodsTable.clear([this.addGoods.attr.select[index].goods.id]);
            this.addGoods.attr.index = this.addGoods.attr.select.length - 2;
            this.addGoods.attr.select.splice(index, 1);
          },
          changeHandler: ({ current, sort, all }) => {
            let achieveErrorGoodsIds = [];
            let isAchieveError =
              all
                .filter((j) => {
                  const isError =
                    [1, 2].includes(this.type) &&
                    this.$_.get(j, "goodsItems.integralGiveDividend") === 1 &&
                    this.$_.get(j, "goodsItems.integralGiveDivisor") === 3;
                  if (isError) {
                    achieveErrorGoodsIds.push(this.$_.get(j, "goodsItems.goodsId"));
                    achieveErrorGoodsIds = Array.from(new Set(achieveErrorGoodsIds));
                  }
                  return isError;
                })
                .reduce((p, c) => p + Number(c.value.quantity), 0) %
                3 !==
              0;
            this.addGoods.attr.select.forEach((i) => {
              i.quantity = 0;
              i.achieve = 0;
              i.achieveError = achieveErrorGoodsIds.includes(i.goods.id)
                ? isAchieveError
                : false;
            });
            this.addGoods.attr.total = 0;
            this.form.value.purchanseGoodsItemsList.value = [];
            for (const i in all) {
              const quantity = Number(all[i].value.quantity);
              if (quantity > 0) {
                const f = PurchanseGoodsItems.formUtil().generator("add", "default");
                f.goodsItemsId.value = all[i].goodsItemsId;
                f.quantity.value = quantity;
                this.form.value.purchanseGoodsItemsList.value.push(f);
              }
              for (const j in this.addGoods.attr.select) {
                if (this.addGoods.attr.select[j].goods.id === all[i].goodsId) {
                  this.addGoods.attr.select[j].quantity =
                    this.addGoods.attr.select[j].quantity + quantity;
                  if ([1, 2].includes(this.type)) {
                    this.addGoods.attr.select[j].achieve =
                      (this.$_.get(all[i], "goodsItems.integralGiveDividend") *
                        this.addGoods.attr.select[j].quantity) /
                      this.$_.get(all[i], "goodsItems.integralGiveDivisor");
                  }
                  this.addGoods.attr.total = this.addGoods.attr.total + quantity;
                  break;
                }
              }
            }
            this.$refs.axqPayment.update();
          },
          changeGoods: (i) => {
            this.addGoods.attr.index = i;
          },
        },
      },
      addGift: {
        attr: {
          tmp: null,
          index: -1,
          select: [],
          total: 0,
        },
        fn: {
          goodsQuery: (e, ok) => {
            Goods.sendApi("page", {
              params: {},
              data: { query: { keyword: e, status: 1 } },
            }).then((res) => {
              const { data } = res;
              ok(data.map((i) => ({ value: i.id, label: i.name })));
            });
          },
          goodsChangeHandler: (e) => {
            this.addGift.attr.tmp = e;
          },
          add: () => {
            if (!this.addGift.attr.tmp) {
              this.$message({
                message: "请选择赠品",
                type: "warning",
              });
              return;
            }
            for (const i in this.addGift.attr.select) {
              if (this.addGift.attr.select[i].goods.id === this.addGift.attr.tmp) {
                this.$message({
                  message: "赠品已添加",
                  type: "warning",
                });
                return;
              }
            }
            Goods.sendApi(
              "info",
              { params: {}, data: { query: { id: this.addGift.attr.tmp } } },
              { parse4Entity: true, showLoading: true, errorTip: "获取商品信息详情错误" }
            ).then((res) => {
              const { status, data } = res;
              if (status) {
                const { goodsItemsList } = data;
                if (data._raw.isStockChecking) {
                  this.$message.warning("该商品正在盘点中~");
                  return;
                }
                this.addGift.attr.select.push({
                  goods: data,
                  quantity: 0,
                });
                this.addGift.attr.index = this.addGift.attr.select.length - 1;
                this.$refs.addGiftTable.setVal(
                  data,
                  goodsItemsList.map((i) => ({
                    goodsItemsId: i.id,
                    value: { _extra: { limit: i.stock }, quantity: "" },
                  }))
                );
              }
            });
          },
          delete: (index) => {
            this.$refs.addGiftTable.clear([this.addGift.attr.select[index].goods.id]);
            this.addGift.attr.index = this.addGift.attr.select.length - 2;
            this.addGift.attr.select.splice(index, 1);
          },
          changeHandler: ({ current, sort, all }) => {
            this.addGift.attr.select.forEach((i) => {
              i.quantity = 0;
            });
            this.addGift.attr.total = 0;
            this.form.value.purchanseGiftList.value = [];
            for (const i in all) {
              const quantity = Number(all[i].value.quantity);
              if (quantity > 0) {
                const f = PurchanseGift.formUtil().generator("add", "default");
                f.goodsItemsId.value = all[i].goodsItemsId;
                f.quantity.value = quantity;
                this.form.value.purchanseGiftList.value.push(f);
              }
              for (const j in this.addGift.attr.select) {
                if (this.addGift.attr.select[j].goods.id === all[i].goodsId) {
                  this.addGift.attr.select[j].quantity =
                    this.addGift.attr.select[j].quantity + quantity;
                  this.addGift.attr.total = this.addGift.attr.total + quantity;
                  break;
                }
              }
            }
          },
          changeGoods: (i) => {
            this.addGift.attr.index = i;
          },
        },
      },
      addGoodsSeries: {
        fn: {
          changeHandler: (e) => {
            this.form.value.purchanseGoodsSeriesList.value = [];
            for (const i in e) {
              if (Number(e[i].quantity) > 0) {
                const f = PurchanseGoodsSeries.formUtil().generator("add", "default");
                f.goodsSeriesId.value = e[i].id;
                f.quantity.value = e[i].quantity;
                this.form.value.purchanseGoodsSeriesList.value.push(f);
              }
            }
            this.distributor.id && this.$refs.axqPayment.update();
          },
        },
      },
      payment: {
        attr: {
          result: {
            amountNeed: 0,
            amountPayed: 0,
            integralAchieveGive: 0,
          },
        },
        fn: {
          loadPaymentForm: () => {
            return {
              purchanseType: this.type,
              purchanseId: Number(this.params.id),
              paymentParamsGoodsItemsBoList: this.form.value.purchanseGoodsItemsList.value.map(
                (i) => {
                  return {
                    goodsItemsId: i.goodsItemsId.value,
                    quantity: i.quantity.value,
                  };
                }
              ),
              paymentParamsGoodsSeriesBoList: this.form.value.purchanseGoodsSeriesList.value.map(
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
            this.payment.attr.result = e;
          },
          remarkChangeHandler: (e) => {
            this.form.value.remark.value = e;
          },
          paymentVoucherChangeHandler: (e) => {
            this.form.value.paymentVoucherJson.value = e;
          },
        },
      },
      popup: {
        addressAdd: {
          attr: {
            form: MemberAddress.formUtil().generator("add", "default"),
          },
          fn: {
            provinceChangeHandler: (e) => {
              const [provinceId, cityId, districtId] = e.map((i) => i._raw.id);
              const [provinceName, cityName, districtName] = e.map((i) => i._raw.name);
              this.popup.addressAdd.attr.form.provinceId.value = provinceId;
              this.popup.addressAdd.attr.form.cityId.value = cityId;
              this.popup.addressAdd.attr.form.districtId.value = districtId;
              this.popup.addressAdd.attr.form.provinceName.value = provinceName;
              this.popup.addressAdd.attr.form.cityName.value = cityName;
              this.popup.addressAdd.attr.form.districtName.value = districtName;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.popup.addressAdd.attr.form.fullAddress.value =
                this.popup.addressAdd.attr.form.provinceName.value +
                this.popup.addressAdd.attr.form.cityName.value +
                this.popup.addressAdd.attr.form.districtName.value +
                this.popup.addressAdd.attr.form.fullAddress.value;
              this.popup.addressAdd.attr.form.memberId.value = this.form.value.memberId.value;
              this.$refs.addressAdd.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  MemberAddress.sendApi("addressAdd", { params: {}, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.optionsSelectorAddress.reload();
                        this.$message({
                          message: "代理地址添加成功",
                          type: "success",
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: "代理地址添加失败",
                          type: "warning",
                        });
                      }
                    }
                  );
                } else {
                  errorCallback();
                  this.$message({
                    message: "请确认信息",
                    type: "warning",
                  });
                }
              });
            },
            hiddenHandler: () => {
              this.popup.addressAdd.attr.form = MemberAddress.formUtil().generator(
                "add",
                "default"
              );
            },
          },
        },
      },
      printer: {
        fn: {
          do: (id) => {
            new Printer(1).run({}, { purchanseId: id });
          },
        },
      },
      switchSelector: {
        fn: {
          updateDistributorPrintType: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: { type: 11, id: this.distributor.id },
              data: { value, remark: "" },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                this.form.value.printType.value = value;
                ok();
              } else {
                this.$message.error("更新代理订单打印价格方式失败");
                error();
              }
            });
          },
        },
      },
    };
  },
  watch: {
    "form.value.memberId.value": function (e) {
      if (e) {
        if (this.$refs.optionsSelectorAddress) {
          this.$refs.optionsSelectorAddress.reload();
          this.$refs.optionsSelectorAddress.reset();
        }
        this.form.value.printType.value =
          this.distributor._raw.favorPurchansePrintType || 1;
      }
    },
  },
  methods: {
    reset() {
      this.$confirm("是否重置当前订单信息？当前页面信息将重置", "重置提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.location.reload();
        })
        .catch(() => {});
    },
    updatePurchanse(e) {
      const paymentCheck = this.$refs.axqPayment.check();
      if (!paymentCheck.ok) {
        return;
      }
      if (
        this.addGoods.attr.select.some((x) => {
          return x.achieveError;
        })
      ) {
        this.$message.warning("商品赠送业绩不满足整数~");
        return;
      }
      const { rawForm, callback } = e;
      const { ok, form } = formToolkit.validate(rawForm);
      if (ok) {
        const type = Number(this.$route.query.type);
        const { purchanseGoodsItemsList, purchanseGiftList } = form;
        if ([1, 2, 6, 7].includes(type)) {
          if (!purchanseGoodsItemsList.length && !purchanseGiftList.length) {
            this.$message.warning("请至少选择一款商品规格~");
            return;
          }
        }
        if (
          purchanseGoodsItemsList.some(
            (x) => x.quantity < 0 || String(x.quantity).indexOf(".") > -1
          )
        ) {
          this.$message.warning("输入参数不合法，请校验购买商品数量");
          reutrn;
        }
        if (
          purchanseGiftList.some(
            (x) => x.quantity < 0 || String(x.quantity).indexOf(".") > -1
          )
        ) {
          this.$message.warning("输入参数不合法，请校验赠送商品数量");
          reutrn;
        }
        Purchanse.sendApi(
          "update",
          {
            params: {
              id: Number(this.params.id),
              checkPayment: paymentCheck.checkPayment,
            },
            data: Object.assign(
              { paymentParamsBo: paymentCheck.paymentParamsBo },
              { purchanse: form }
            ),
          },
          { showLoading: true }
        ).then((res) => {
          const { status, message } = res;
          if (status) {
            callback();
          } else {
            this.$message({
              message,
              type: "error",
            });
          }
        });
      } else {
        this.$message({
          message: "请校验输入信息",
          type: "warning",
        });
      }
    },
  },
  created() {
    this.adaptor.fn.init();
  },
};
</script>

<style lang="less">
.purchanse-update {
  padding: 20px;
  margin-top: 20px;
  background: white;
  ._field {
    display: flex;
    align-items: center;
    .f-label {
      margin-left: 20px;
    }
    .f-value {
      display: flex;
      align-items: center;
    }
    &_goods,
    &_gift {
      align-items: flex-start;
      .f-value {
        display: block;
        .v-selector {
          display: flex;
          align-items: center;
        }
        .v-result {
          .r-list {
            display: flex;
            flex-wrap: wrap;
            padding: 20px 0;
            .l-item {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 32px;
              padding: 0 20px;
              margin-right: 20px;
              margin-bottom: 10px;
              background: #ffffff;
              border: 1px solid #c5c8ce;
              border-radius: 5px;
              .close {
                position: absolute;
                top: -15px;
                right: -15px;
                font-size: 30px;
                color: #fe011f;
              }
              &-active {
                border: 1px solid #2d8cf0;
                span {
                  color: #2d8cf0;
                }
              }
              &:hover {
                cursor: pointer;
              }
            }
          }
          .r-no-data {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100px;
          }
        }
      }
    }
    &_weixin {
      .f-value {
        display: flex;
        flex-wrap: wrap;
        .v-item {
          display: flex;
          align-items: center;
          width: 200px;
          &:nth-child(2n + 1) {
            margin-right: 20px;
          }
        }
      }
    }
    &_bank {
      .f-value {
        display: block;
        .v-list {
          .l-item {
            display: flex;
            align-items: center;
            &:not(:first-child) {
              margin-top: 10px;
            }
          }
        }
        .v-add {
          display: flex;
          align-items: center;
          padding-top: 10px;
        }
      }
    }
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
  .u-goods-items {
    .i-field {
      display: flex;
      .f-left {
        width: 60%;
        padding-right: 20px;
        border-right: 1px solid #ebeef5;
        .el-row {
          &:not(:first-child) {
            margin-top: 20px;
          }
        }
      }
      .f-right {
        flex: 1;
        padding-left: 20px;
        .r-payment {
          .p-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
    .i-table {
      .t-tip {
        display: flex;
        align-items: center;
        height: 50px;
        .t-item {
          display: flex;
          align-items: center;
          .dot {
            display: inline-block;
            width: 15px;
            height: 15px;
          }
          .error {
            color: #f56c6c;
          }
          span {
            &:not(:first-child) {
              margin-left: 10px;
            }
          }
          &:not(:first-child) {
            margin-left: 20px;
          }
        }
      }
      .t-input {
        padding: 20px 0;
      }
    }
  }
  .u-gift {
  }
  .u-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    .r-icon {
      i {
        font-size: 100px;
        color: #19be6b;
      }
    }
    .r-text {
      font-size: 18px;
      color: #000;
    }
    .r-description {
      padding: 20px 0;
    }
  }
  .popup-confirm {
    &_address-add {
      padding: 20px;
    }
  }
}
</style>
