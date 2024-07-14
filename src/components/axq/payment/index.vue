<!--
 * @Author: 码上talk|RC
 * @Date: 2021-06-04 13:08:48
 * @LastEditTime: 2022-06-25 15:37:51
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/payment/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="axq-payment">
    <div class="p-item">
      <div class="i-label">
        <span>支付方式：</span>
      </div>
      <div class="i-value">
        <el-radio-group v-model="type.active">
          <el-radio :label="item.id" :key="key" v-for="(item, key) in type.list">{{
            item.name
          }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <template v-if="type.active === 1">
      <template v-if="memberId">
        <div class="p-item p-item_prestore" v-if="!hiddenWay.includes('prestore')">
          <div class="i-label">
            <el-checkbox v-model="way.prestore.active">
              <span>预存组合：</span>
            </el-checkbox>
          </div>
          <div class="i-value">
            <el-table style="width: 450px" border :data="[goodsSeriesTableData.data]">
              <el-table-column
                :label="item"
                width="80px"
                :key="key"
                v-for="(item, key) in goodsSeriesTableData.column"
              >
                <template slot-scope="props">
                  <input
                    :key="$_.get(props.row, `${item}.id`)"
                    :ref="`refGoodsSeriesInput-${item}`"
                    type="number"
                    :placeholder="$_.get(props.row, `${item}.quantity`)"
                    :max="props.row[item]"
                    @input="
                      ($event) => {
                        _goodsSeriesChangeHandler(props.row, item, $event);
                      }
                    "
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="p-item" v-if="!hiddenWay.includes('balance')">
          <div class="i-label">
            <el-checkbox v-model="way.balance.active">
              <span>余款：</span>
            </el-checkbox>
          </div>
          <div class="i-value">
            <el-input
              type="number"
              :placeholder="`￥${$_.get(result, 'memberAccountBo.balance', 0)}`"
              :max="$_.get(result, 'memberAccountBo.balance')"
              v-model="way.balance.amount"
            />
          </div>
        </div>
        <div class="p-item" v-if="!hiddenWay.includes('sixueBalance')">
          <div class="i-label">
            <el-checkbox v-model="way.sixueBalance.active">
              <span>思雪余款：</span>
            </el-checkbox>
          </div>
          <div class="i-value">
            <el-input
              type="number"
              :placeholder="`￥${$_.get(result, 'memberAccountBo.sixueBalance', 0)}`"
              :max="$_.get(result, 'memberAccountBo.sixueBalance')"
              v-model="way.sixueBalance.amount"
            />
          </div>
        </div>
      </template>
      <div class="p-item p-item_weixin">
        <div class="i-label"></div>
        <div class="i-value">
          <div class="v-item" style="marginbottom: 10px">
            <el-checkbox v-model="way.weixin.active">
              <span>微信：</span>
            </el-checkbox>
            <el-input size="mini" v-model="way.weixin.amount"></el-input>
          </div>
          <div class="v-item" style="marginbottom: 10px; marginright: 10px">
            <el-checkbox v-model="way.alipay.active">
              <span>支付宝：</span>
            </el-checkbox>
            <el-input size="mini" v-model="way.alipay.amount"></el-input>
          </div>
          <div class="v-item" style="marginbottom: 10px">
            <el-checkbox v-model="way.cash.active">
              <span>刷卡：</span>
            </el-checkbox>
            <el-input size="mini" v-model="way.cash.amount"></el-input>
          </div>
        </div>
      </div>
      <div class="p-item p-item_bank">
        <div class="i-label">
          <el-checkbox v-model="way.bank.active">
            <span>收款账户：</span>
          </el-checkbox>
        </div>
        <div class="i-value">
          <div class="v-list">
            <div class="l-item" :key="key" v-for="(item, key) in way.bank.result">
              <span>{{ item.name }}</span>
              <span>￥{{ item.amount | amountFormat }}</span>
              <el-button
                size="mini"
                type="danger"
                style="marginleft: 10px"
                @click.native="_bankDelete(item)"
                >删除</el-button
              >
            </div>
          </div>
          <div class="v-add">
            <options-selector
              ref="sysBankOptionsSelector"
              :mode="2"
              :config="{ key: 'axqSelfEmployedLaborer' }"
              @change="options.fn.sysBankChangeHandler"
              style="width: 130px"
            ></options-selector>
            <el-input
              size="mini"
              style="width: 100px; marginleft: 10px"
              v-model="way.bank.amount"
            ></el-input>
            <el-button
              type="primary"
              size="mini"
              @click.native="_bankAdd"
              style="marginleft: 10px"
              >新增</el-button
            >
          </div>
        </div>
      </div>
      <div class="p-item">
        <div class="i-label">
          <span>超出金额：</span>
        </div>
        <div class="i-value">
          <span>
            ￥{{
              (result.amountPayed - result.amountNeed > 0
                ? result.amountPayed - result.amountNeed
                : 0) | amountFormat
            }}
          </span>
          <p style="marginleft: 20px; color: #fe011f">注：超出的金额将存入余款！</p>
        </div>
      </div>
    </template>
    <div class="p-item p-item">
      <div class="i-label">
        <span>上传支付凭证：</span>
      </div>
      <div class="i-value">
        <file-uploader
          :max="8"
          :value="paymentVoucherJson"
          @change="
            (e) => {
              paymentVoucherJson = e;
            }
          "
        >
        </file-uploader>
      </div>
    </div>
    <div class="p-item">
      <div class="i-label">
        <span>备注：</span>
      </div>
      <div class="i-value">
        <el-input type="textarea" :rows="5" v-model="remark"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import optionsSelector from "@/components/options-selector";
import fileUploader from "@/components/file-uploader";
import filePreviewer from "@/components/file-previewer";
import { model } from "@/model";

const { Purchanse, RevertForm } = model.collection;
export default {
  components: {
    optionsSelector,
    fileUploader,
    filePreviewer,
  },
  props: {
    mode: {
      type: Number,
      default() {
        return 1;
      },
    },
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    memberId: {
      type: Number,
      default() {
        return 0;
      },
    },
    isQueryFreeze: {
      type: Number,
      default() {
        return 0;
      },
    },
    isNewDistributor: {
      type: Number,
      default() {
        return 0;
      },
    },
    hiddenPaymentWay: {
      type: Function,
      default() {
        return () => {
          return [];
        };
      },
    },
    loadPaymentForm: {
      type: Function,
      default() {
        return () => {
          return {};
        };
      },
    },
  },
  data() {
    return {
      adaptor: {
        fn: {
          getPaymentForm: () => {
            let f = {
              memberId: this.memberId,
              paymentClearType: this.type.active,
              paymentWeixinAmount: this.way.weixin.active
                ? this.way.weixin.amount
                  ? this.way.weixin.amount
                  : 0
                : 0,
              paymentAlipayAmount: this.way.alipay.active
                ? this.way.alipay.amount
                  ? this.way.alipay.amount
                  : 0
                : 0,
              paymentCashAmount: this.way.cash.active
                ? this.way.cash.amount
                  ? this.way.cash.amount
                  : 0
                : 0,
              paymentIsUseBalance: this.way.balance.active ? 1 : 0,
              paymentBalanceAmount: this.way.balance.active
                ? Number(this.way.balance.amount)
                : 0,
              paymentIsUseSixueBalance: this.way.sixueBalance.active ? 1 : 0,
              paymentSixueBalanceAmount: this.way.sixueBalance.active
                ? Number(this.way.sixueBalance.amount)
                : 0,
              paymentParamsBankBoList: this.way.bank.active ? this.way.bank.result : [],
            };
            if (this.mode === 1) {
              const {
                purchanseType,
                purchanseId,
                paymentParamsGoodsItemsBoList,
                paymentParamsGoodsSeriesBoList,
              } = this.loadPaymentForm();
              f = Object.assign(f, {
                purchanseType,
                purchanseId,
              });
              if (purchanseType !== 3) {
                f = Object.assign(f, {
                  type: 1,
                  paymentParamsGoodsItemsBoList,
                });
                if (purchanseType !== 5) {
                  f = Object.assign(f, {
                    memberId: this.memberId,
                    paymentIsUseGoodsSeriesPrestore: this.way.prestore.active ? 1 : 0,
                    paymentParamsGoodsSeriesBoList:
                      this.way.prestore.active &&
                      this.way.prestore.paymentParamsGoodsSeriesBoList.length
                        ? this.way.prestore.paymentParamsGoodsSeriesBoList
                        : [],
                  });
                }
              } else {
                f = Object.assign(f, {
                  type: 2,
                  paymentParamsGoodsItemsBoList,
                  paymentParamsGoodsSeriesBoList,
                });
              }
            }
            if (this.mode === 2) {
              const { revertFormId, distributorId } = this.loadPaymentForm();
              f = Object.assign(f, {
                revertFormId,
                distributorId,
              });
            }
            return f;
          },
          getPaymentResult: () => {
            const errorTip = (e) => {
              e.status === false && this.$message.error(e.message);
            };
            if (this.mode === 1) {
              return Purchanse.sendApi(
                "payment",
                {
                  params: {
                    isQueryFreeze: this.isQueryFreeze,
                    isNewDistributor: this.isNewDistributor,
                  },
                  data: this.adaptor.fn.getPaymentForm(),
                },
                { errorTip }
              );
            }
            if (this.mode === 2) {
              return RevertForm.sendApi(
                "formPayment",
                {
                  params: { isQueryFreeze: this.isQueryFreeze },
                  data: this.adaptor.fn.getPaymentForm(),
                },
                { errorTip }
              );
            }
          },
        },
      },
      options: {
        fn: {
          sysBankChangeHandler: (e, _raw) => {
            if (e) {
              this.way.bank.type = e;
              this.way.bank.name = _raw.name;
              this.way.bank.active = true;
            } else {
              this.way.bank.active = false;
            }
          },
        },
      },
      hiddenWay: [],
      type: {
        active: 1,
        list: [
          {
            id: 1,
            name: "正常支付",
          },
          {
            id: 3,
            name: "欠账支付",
          },
        ],
      },
      way: {
        prestore: {
          active: false,
          paymentParamsGoodsSeriesBoList: [],
        },
        balance: {
          active: false,
          amount: "",
        },
        sixueBalance: {
          active: false,
          amount: "",
        },
        weixin: {
          active: false,
          amount: 0,
        },
        alipay: {
          active: false,
          amount: 0,
        },
        cash: {
          active: false,
          amount: 0,
        },
        bank: {
          active: false,
          type: 0,
          name: "",
          amount: 0,
          result: [],
        },
      },
      result: {
        amountNeed: 0,
        amountPayed: 0,
        integralAchieveGive: 0,
        memberAccountBo: {
          goodsSeriesList: [],
          balance: 0,
        },
      },
      paymentVoucherJson: "",
      remark: "",
      throttleHandler: this.$_.throttle(this._getResult, 1000),
    };
  },
  computed: {
    goodsSeriesTableData() {
      const column = [];
      const data = {};
      for (
        let i = 0;
        i < this.$_.get(this.result, "memberAccountBo.goodsSeriesList", []).length;
        i++
      ) {
        const g = this.result.memberAccountBo.goodsSeriesList[i];
        column.push(g.goodsSeries.name);
        data[g.goodsSeries.name] = g;
      }
      return {
        column,
        data,
      };
    },
  },
  watch: {
    type: {
      handler: function () {
        this.throttleHandler();
      },
      deep: true,
    },
    way: {
      handler: function () {
        this.throttleHandler();
      },
      deep: true,
    },
    remark: function (e) {
      this.$emit("remark-change", e);
    },
    paymentVoucherJson: function (e) {
      this.$emit("payment-voucher-change", e);
    },
    memberId: function (e) {
      this.way.prestore.paymentParamsGoodsSeriesBoList = [];
      this.throttleHandler();
    },
    "way.balance.amount": function (e) {
      if (e === "0") {
        this.way.balance.active = false;
      }
    },
    "way.sixueBalance.amount": function (e) {
      if (e === "0") {
        this.way.sixueBalance.active = false;
      }
    },
  },
  methods: {
    init() {
      this.hiddenWay = this.hiddenPaymentWay() || [];
    },
    _bankAdd() {
      if (!this.way.bank.active) {
        this.$message({
          message: "请勾选银行卡支付",
          type: "warning",
        });
        return;
      }
      if (!this.way.bank.type || !this.way.bank.amount) {
        this.$message({
          message: "请填写银行卡支付信息",
          type: "warning",
        });
        return;
      }
      this.way.bank.result.push({
        sysReceptBankId: this.way.bank.type,
        name: this.way.bank.name,
        amount: this.way.bank.amount,
      });
      this.$refs.sysBankOptionsSelector.reset();
      this.way.bank.amount = 0;
    },
    _bankDelete(item) {
      this.way.bank.result = this.way.bank.result.filter((i) => {
        if (i.sysReceptBankId === item.sysReceptBankId) {
          return false;
        }
        return true;
      });
    },
    _getResult() {
      this.adaptor.fn.getPaymentResult().then((res) => {
        if (res.status === false) {
          return;
        }
        const { amountNeed, amountPayed, integralAchieveGive, memberAccountBo } = res;
        this.result.amountNeed = amountNeed;
        this.result.amountPayed = amountPayed;
        this.result.integralAchieveGive = integralAchieveGive;
        this.result.memberAccountBo = memberAccountBo;
        this.$emit("change", {
          amountNeed,
          amountPayed,
          integralAchieveGive,
        });
      });
    },
    _goodsSeriesChangeHandler(row, item, e) {
      const tar = this.$_.find(this.way.prestore.paymentParamsGoodsSeriesBoList, (x) => {
        return x.goodsSeriesId === row[item].goodsSeriesId;
      });
      if (tar) {
        tar.quantity = Number(e.target.value);
        return;
      }
      this.way.prestore.paymentParamsGoodsSeriesBoList.push({
        goodsSeriesId: row[item].goodsSeriesId,
        quantity: Number(e.target.value),
      });
    },
    update() {
      this._getResult();
    },
    loadData(e) {
      const { remark, paymentVoucherJson } = e;
      this.remark = remark;
      this.paymentVoucherJson = paymentVoucherJson;
    },
    check() {
      let ok = true;
      if (this.type.active === 1 && !this.config.noCheck) {
        if (this.result.amountNeed > this.result.amountPayed) {
          this.$message({
            message: "确认支付信息",
            type: "error",
          });
          ok = false;
        }
      }
      return {
        ok,
        checkPayment: this.config.noCheck ? 0 : 1,
        paymentParamsBo: this.adaptor.fn.getPaymentForm(),
      };
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less">
.axq-payment {
  .p-item {
    display: flex;
    align-items: center;
    .i-label {
      margin-left: 0px;
    }
    .i-value {
      display: flex;
      align-items: center;
    }
    &_prestore {
      .i-value {
        td {
          height: 40px;
          padding: 0;
          .cell {
            height: 100%;
            input {
              width: 100%;
              height: 100%;
              padding: 0;
              margin: 0;
              border: 0;
              outline: none;
              background: none;
            }
          }
        }
      }
    }
    &_weixin {
      .i-value {
        display: flex;
        flex-wrap: wrap;
        .v-item {
          display: flex;
          align-items: center;
          width: 200px;
          &:nth-child(2n - 1) {
            margin-right: 20px;
          }
        }
      }
    }
    &_bank {
      .i-value {
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
}
</style>
