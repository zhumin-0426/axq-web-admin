<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-08 08:30:18
 * @LastEditTime: 2022-06-13 18:11:15
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/purchanse/add.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="purchanse-add">
    <div class="a-type">
      <div
        class="t-item"
        :class="{ 't-item-active': type === item.value }"
        :key="key"
        v-for="(item, key) in entitys.Purchanse._options.type"
        @click="changeType(item)"
      >
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="a-main">
      <form-validate
        ref="purchanseAdd"
        type="step"
        :form="form.value"
        :force-valid-field="form.forceValidField"
        :step-config="form.stepConfig"
        @ok="form.fn.okHandler"
      >
        <template slot="step-0" v-if="adaptor.attr.ready">
          <div class="m-goods-items">
            <div class="i-field">
              <div class="f-left">
                <el-row>
                  <el-col :span="10">
                    <div class="_field" v-if="viewNodeVisable.fn.do(1)">
                      <div class="f-label">
                        <span>选择代理：</span>
                      </div>
                      <div class="f-value" style="display: block">
                        <div class="v-item">
                          <options-selector
                            :mode="4"
                            placeholder="店主/手机号/ID"
                            :config="{ req: options.fn.distributorQuery }"
                            @change="options.fn.distributorChangeHandler"
                          ></options-selector>
                        </div>
                        <div
                          class="v-item"
                          v-if="distributor.id"
                          style="display: flex; align-items: center; margin-top: 10px"
                        >
                          <el-input
                            type="textarea"
                            style="width: 100px"
                            disabled
                            :value="$_.get(distributor, '_raw.axqRemark')"
                          ></el-input>
                          <el-button
                            size="mini"
                            type="primary"
                            style="marginleft: 20px"
                            @click.native="
                              $refs.popupConfirmMemberUpdate.open({
                                triggerOpen: popup.memberUpdate.fn.openHandler,
                                triggerClose: popup.memberUpdate.fn.closeHandler,
                                params: { distributorId: distributor.id },
                              })
                            "
                            >修改</el-button
                          >
                        </div>
                      </div>
                    </div>
                    <div class="_field" v-if="viewNodeVisable.fn.do(6)">
                      <div class="f-label">
                        <span>个体工商户：</span>
                      </div>
                      <div class="f-value">
                        <el-input
                          disabled
                          size="mini"
                          :value="
                            blankGet(
                              $_.get(distributor, '_raw.axqSelfEmployedLaborer.name')
                            )
                          "
                        ></el-input>
                        <el-button
                          type="primary"
                          size="mini"
                          style="marginleft: 10px"
                          v-clipboard:copy="
                            `
户名：${blankGet($_.get(distributor, '_raw.axqSelfEmployedLaborer.name'))} \r
账户：${blankGet($_.get(distributor, '_raw.axqSelfEmployedLaborer.bankNumber'))}\r
银行类型：${blankGet($_.get(distributor, '_raw.axqSelfEmployedLaborer.bank.name'))} \r
开户行：${blankGet($_.get(distributor, '_raw.axqSelfEmployedLaborer.bankOpenAddress'))} 
                            `
                          "
                          v-clipboard:success="
                            () => {
                              $message.success('复制成功');
                            }
                          "
                          >复制</el-button
                        >
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
                          style="width: 150px"
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
                          :config="{ key: 'sysExpress' }"
                          style="width: 150px"
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
                    <div
                      class="new-distributor-achive"
                      style="display: flex; justifycontent: center"
                      v-if="viewNodeVisable.fn.do(17)"
                    >
                      <div class="a-item">
                        <span>新店主任务业绩：1000</span>
                      </div>
                      <div class="a-item" style="marginleft: 10px">
                        <span
                          >已完成：{{
                            $_.get(distributor, "_raw.memberStatistics.addUpAchieve") || 0
                          }}</span
                        >
                      </div>
                      <div class="a-item" style="marginleft: 10px">
                        <span
                          >未完成：{{
                            1000 -
                            ($_.get(distributor, "_raw.memberStatistics.addUpAchieve") ||
                              0)
                          }}</span
                        >
                      </div>
                    </div>
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
                            value:
                              $_.get(distributor, '_raw.favorPurchansePrintType') || 1,
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
                            value: 1,
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
                            enableDelete: true,
                            deleteTip: '删除代理该地址',
                          }"
                          @change="options.fn.addressChangeHandler"
                          @delete="options.fn.addressDeleteHandler"
                          class="options-selector"
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
                        <el-input
                          v-model="form.value.recipient.value"
                          size="small"
                        ></el-input>
                      </div>
                    </div>
                    <div class="_field" v-if="viewNodeVisable.fn.do(13)">
                      <div class="f-label">
                        <span>收货联系：</span>
                      </div>
                      <div class="f-value">
                        <el-input
                          v-model="form.value.recipientMobile.value"
                          size="small"
                        ></el-input>
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
                          size="small"
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
                            @click.native="addGoods.fn.add"
                            >选择</el-button
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
                                v-if="item.achieveError || item.stockLimit"
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
                        订单合计：{{ payment.attr.result.amountNeed | amountFormat }}元
                        <em style="marginleft: 20px"
                          >已支付：{{
                            payment.attr.result.amountPayed | amountFormat
                          }}元</em
                        >
                        <em style="marginleft: 20px"
                          >还需支付：{{
                            (payment.attr.result.amountPayed -
                              payment.attr.result.amountNeed >=
                            0
                              ? 0
                              : payment.attr.result.amountNeed -
                                payment.attr.result.amountPayed) | amountFormat
                          }}元</em
                        >
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
                              $refs.purchanseAdd.next();
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
                  @change="addGoodsSeries.fn.changeHandler"
                ></axq-goods-series-table>
              </div>
            </div>
          </div>
          <div class="m-gift" v-if="viewNodeVisable.fn.do(9)">
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
                      >选择</el-button
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
                        <i
                          class="iconfont icon-V error"
                          style="color: #f56c6c"
                          v-if="item.stockLimit"
                        ></i>
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
                    noLimit: [2, 3, 6].includes(type),
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
        <div class="m-result" slot="result">
          <div class="r-icon">
            <i class="iconfont icon-chenggong"></i>
          </div>
          <div class="r-text">
            <span>添加订单成功</span>
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
              @click.native="rep(`/purchanse/${result.id}?type=${type}`)"
              >查看订单</el-button
            >
            <el-button
              type="primary"
              style="margin-left: 8px"
              @click.native="printer.fn.do(result.id)"
              >打印订单</el-button
            >
            <el-button style="margin-left: 8px" @click.native="rep('/purchanse/list')"
              >返回列表</el-button
            >
          </div>
        </div>
      </form-validate>
    </div>
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
            style="width: 80%"
            label="收件人"
            :field="popup.addressAdd.attr.form.consignee"
          >
            <el-input v-model="popup.addressAdd.attr.form.consignee.value"></el-input>
          </form-validate-field>
          <form-validate-field
            style="width: 80%"
            label="联系电话"
            :field="popup.addressAdd.attr.form.mobile"
          >
            <el-input v-model="popup.addressAdd.attr.form.mobile.value"></el-input>
          </form-validate-field>
          <form-validate-field
            style="width: 80%"
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
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmMemberUpdate" title="修改代理备注">
      <div class="popup-confirm_member-update">
        <div class="u-tab">
          <div
            class="t-item"
            :class="{ 't-item-active': popup.memberUpdate.attr.tab === 1 }"
            @click="popup.memberUpdate.attr.tab = 1"
          >
            <span>更新</span>
          </div>
          <div
            class="t-item"
            :class="{ 't-item-active': popup.memberUpdate.attr.tab === 2 }"
            @click="popup.memberUpdate.attr.tab = 2"
          >
            <span>修改记录</span>
          </div>
        </div>
        <div class="u-box u-box_field" v-if="popup.memberUpdate.attr.tab === 1">
          <div class="f-item">
            <div class="i-label">
              <span>代理备注：</span>
            </div>
            <div class="i-value">
              <el-input
                v-model="popup.memberUpdate.attr.form.data.value"
                type="textarea"
              ></el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.memberUpdate.attr.form.data.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="u-box u-box_history" v-if="popup.memberUpdate.attr.tab === 2">
          <div class="h-list">
            <el-table
              :data="popup.memberUpdate.attr.history.list"
              stripe
              style="width: 100%"
            >
              <el-table-column prop="date" label="序号">
                <template slot-scope="props">
                  <p>{{ props.row.id }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改前">
                <template slot-scope="props">
                  <p>{{ popup.memberUpdate.fn.getValue4JSON(props.row).old }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改后">
                <template slot-scope="props">
                  <p>{{ popup.memberUpdate.fn.getValue4JSON(props.row).new }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="操作人">
                <template slot-scope="props">
                  <p>{{ props.row.operatorName }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left" v-if="popup.memberUpdate.attr.tab === 2">
        共
        <em>{{ popup.memberUpdate.attr.history.total }}记录</em>
      </p>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="popup.memberUpdate.attr.history.total"
        slot="footer-right"
        v-if="popup.memberUpdate.attr.tab === 2"
      ></el-pagination>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from "@/components/form-validate";
import formValidateField from "@/components/form-validate/field";
import optionsSelector from "@/components/options-selector";
import axqAchieveQuery from "@/components/axq/achieve-query";
import axqGoodsTable from "@/components/axq/goods-table";
import axqGoodsSeriesTable from "@/components/axq/goods-series-table";
import switchSelector from "@/components/switch-selector";
import popupConfirm from "@/components/popup/type/confirm";
import axqPayment from "@/components/axq/payment";
import { model } from "@/model";
import { formToolkit } from "@/model/form-toolkit";
import Printer from "@/components/axq/printer";
import { Request } from "@/model/request";

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
    optionsSelector,
    axqAchieveQuery,
    axqGoodsTable,
    axqGoodsSeriesTable,
    switchSelector,
    popupConfirm,
    axqPayment,
  },
  data() {
    return {
      type: Number(this.$route.query.type),
      request: new Request(),
      distributor: new Member(),
      result: null,
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
            this.form.value = Purchanse.formUtil().generator("add", "default");
            this.form.value.type.value = Number(this.$route.query.type);
            this.form.value.achieveTime.value = this.$dayjs().format("YYYY-MM-DD");
            this.adaptor.attr.ready = true;
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
            if (n === 17) {
              return this.$_.get(this.distributor, "_raw.isNewDistributor") === 1;
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
              ok(data.map((i) => ({ value: i.id, label: `${i.nickname}/${i.id}` })));
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
          achieveTimeChangeHandler: (e) => {
            this.form.value.achieveTime.value = this.$dayjs(e).format("YYYY-MM-DD");
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
          addressDeleteHandler: (e) => {
            const { option, ok } = e;
            Member.sendApi("addressDelete", { params: { id: option.id }, data: {} }).then(
              (res) => {
                const { status, data } = res;
                if (status) {
                  this.$message({
                    message: "删除代理地址成功",
                    type: "success",
                  });
                  ok();
                } else {
                  this.$message({
                    message: "删除代理地址失败",
                    type: "warning",
                  });
                }
              }
            );
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
              _validateField: [],
              title: "步骤一",
              description: "填写订单",
            },
          ],
        },
        fn: {
          okHandler: (ev) => {
            this.addPurchanse(ev);
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
                  stockLimit: true,
                });
                this.addGoods.attr.index = this.addGoods.attr.select.length - 1;
                if ([1, 6].includes(this.type)) {
                  this.$refs.addGoodsTable.setVal(
                    data,
                    goodsItemsList.map((i) => ({
                      goodsItemsId: i.id,
                      value: {
                        _extra: {
                          lock: i.stock <= 0,
                          limit: i.stock,
                        },
                        quantity: "",
                      },
                    }))
                  );
                } else {
                  this.$refs.addGoodsTable.setVal(data, []);
                }
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
              i.stockLimit = false;
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
                  achieveError: false,
                  stockLimit: true,
                });
                this.addGift.attr.index = this.addGift.attr.select.length - 1;
                if ([1, 5, 6].includes(this.type)) {
                  this.$refs.addGiftTable.setVal(
                    data,
                    goodsItemsList.map((i) => ({
                      goodsItemsId: i.id,
                      value: {
                        _extra: {
                          lock: i.stock <= 0,
                          limit: i.stock,
                        },
                        quantity: "",
                      },
                    }))
                  );
                } else {
                  this.$refs.addGiftTable.setVal(data, []);
                }
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
              i.stockLimit = false;
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
            this.$refs.axqPayment.update();
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
        memberUpdate: {
          attr: {
            tab: 1,
            form: {
              params: {
                id: 0,
                type: 18,
              },
              data: {
                value: "",
                remark: "",
              },
            },
            history: {
              total: 0,
              list: [],
              params: {
                pageIndex: 1,
                pageSize: 10,
              },
            },
          },
          fn: {
            getUpdateHistory: () => {
              Member.sendApi("updateLogPage", {
                params: this.popup.memberUpdate.attr.history.params,
                data: {
                  query: {
                    memberId: this.popup.memberUpdate.attr.form.params.id,
                    type: 18,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.memberUpdate.attr.history.list = data;
                  this.popup.memberUpdate.attr.history.total = page.total;
                } else {
                  this.$message({
                    message: "获取会员信息更新失败",
                    type: "error",
                  });
                }
              });
            },
            getValue4JSON: (row) => {
              const newObj = JSON.parse(row.jsonNew);
              const oldObj = JSON.parse(row.jsonOld);
              return {
                new: this.$_.get(newObj, "axqRemark"),
                old: this.$_.get(oldObj, "axqRemark"),
              };
            },
            openHandler: (ok, params) => {
              const { distributorId } = params;
              this.popup.memberUpdate.attr.form.params.id = distributorId;
              this.popup.memberUpdate.fn.getUpdateHistory();
              ok();
            },
            closeHandler: (ok, error) => {
              Member.sendApi("updateSingleField", this.popup.memberUpdate.attr.form).then(
                (res) => {
                  const { status, data } = res;
                  if (status) {
                    ok();
                    this.$message({
                      message: "会员备注更新成功",
                      type: "success",
                    });
                    this.distributor._raw.axqRemark = this.popup.memberUpdate.attr.form.data.value;
                  } else {
                    error();
                    this.$message({
                      message: "会员备注更新失败",
                      type: "error",
                    });
                  }
                }
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
    changeType(item) {
      this.$confirm("是否切换订单类型？当前页面信息将丢失", "切换类型", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.rep(`/purchanse/add?type=${item.value}`);
          window.location.reload();
        })
        .catch(() => {});
    },
    reset() {
      this.$confirm("是否重置当前订单信息？当前页面信息将丢失", "重置提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.location.reload();
        })
        .catch(() => {});
    },
    addPurchanse(e) {
      if (
        ![5].includes(Number(this.$route.query.type)) &&
        !$_.get(this.distributor, "_raw.isNewDistributor") &&
        !$_.get(this.distributor, "_raw.isCertificate")
      ) {
        this.$message.warning("该代理还未实名认证，不可下单操作~");
        return;
      }
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
          "add",
          {
            params: { checkPayment: paymentCheck.checkPayment },
            data: Object.assign(
              { paymentParamsBo: paymentCheck.paymentParamsBo },
              { purchanse: form }
            ),
          },
          { showLoading: true }
        ).then((res) => {
          const { status, data, message } = res;
          if (status) {
            this.result = new Purchanse(data);
            callback();
          } else {
            let msg = "服务端错误~";
            try {
              const msgObj = JSON.parse(this.getServerExceptionMsg(message));
              if (msgObj.type === "STOCK_LIMIT") {
                msg = "库存不足";
                const buyLimitIds = msgObj.buyLimitIds.split(",");
                const giftLimitIds = msgObj.giftLimitIds.split(",");
                buyLimitIds.forEach((i) => {
                  const tar = this.$_.find(this.addGoods.attr.select, (x) => {
                    return (x.goods.id = Number(i));
                  });
                  if (tar) {
                    tar.stockLimit = true;
                  }
                });
                giftLimitIds.forEach((i) => {
                  const tar = this.$_.find(this.addGift.attr.select, (x) => {
                    return (x.goods.id = Number(i));
                  });
                  if (tar) {
                    tar.stockLimit = true;
                  }
                });
              }
            } catch (e) {
              msg = message;
            }
            this.$message({
              message: msg,
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
.purchanse-add {
  .a-type {
    display: flex;
    padding: 0 10px;
    width: 100%;
    background: white;
    .t-item {
      display: flex;
      align-items: center;
      height: 70px;
      padding: 0 10px;
      span {
        padding: 10px 0;
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
      &:not(:first-child) {
        margin-left: 20px;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .a-main {
    padding: 20px;
    margin-top: 20px;
    background: white;
    ._field {
      display: flex;
      align-items: center;
      .f-label {
        margin-left: 20px;
        span {
          white-space: nowrap;
        }
      }
      .f-value {
        display: flex;
        align-items: center;
        .options-selector {
          width: 300px;
        }
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
              padding: 20px 0;
              flex-wrap: wrap;
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
    .m-goods-items {
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
    .m-gift {
    }
    .m-result {
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
  }
  .popup-confirm {
    &_address-add {
      padding: 20px;
    }
    &_member-update {
      padding-top: 50px;
      .u-tab {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 20px;
        .t-item {
          position: relative;
          height: 30px;
          padding: 0 20px;
          .i-label {
            display: flex;
            align-items: center;
            height: 30px;
          }
          &-active {
            &::before {
              position: absolute;
              content: "";
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px;
              background: #1890ff;
            }
          }
          &:not(:first-child) {
            margin-left: 20px;
          }
        }
      }
      .u-box {
        padding: 20px;
        &_field {
          .f-item {
            .i-label {
              display: flex;
              align-items: center;
              height: 40px;
            }
            &:not(:first-child) {
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
