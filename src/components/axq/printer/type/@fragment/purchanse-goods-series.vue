<!--
 * @Author: your name
 * @Date: 2021-07-21 15:30:58
 * @LastEditTime: 2022-04-20 11:43:26
 * @LastEditors: 码上talk|RC
 * @Description: In User Settings Edit
 * @FilePath: /web-admin/src/components/axq/printer/type/@fragment/purchanse-goods-series.vue
-->
<template>
  <div class="purchanse-axq">
    <h2 style="width: 200mm; text-align: center">
      <strong>预存组合订单</strong>
    </h2>
    <table cellspacing="0" cellpadding="0" style="table-layout: fixed; min-width: 200mm">
      <tbody>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left">
            第（{{ $_.get(purchanse, "_raw.printTimes") + 1 }}）打印
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left">
            订单类型：{{ entitys.Purchanse.filter("type", purchanse.type) }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left">
            订单编号：{{ $_.get(purchanse, "_raw.sn") }}
            <span>{{ config.extraTitle }}</span>
          </td>
        </tr>
        <tr>
          <td nowrap="nowrap" title style="text-align: left">
            客户名称:
            {{
              $_.get(purchanse, "_raw.member.nickname")
              ? `${$_.get(purchanse, "_raw.member.nickname")}/${$_.get(purchanse,"_raw.member.id")}` 
              : $_.get(purchanse, "_raw.recipient")
            }}
          </td>
          <td nowrap="nowrap" style="text-align: left">
            客户电话：{{
              $_.get(purchanse, "_raw.member.mobile") ||
              $_.get(purchanse, "_raw.recipientMobile")
            }}
          </td>
          <td nowrap="nowrap" style="text-align: left">
            审核日期: {{ $_.get(purchanse, "_raw.approvedTime") }}
          </td>
        </tr>
      </tbody>
    </table>
    <table
      border
      cellspacing="0"
      cellpadding="0"
      style="text-align: center; table-layout: fixed; width: 200mm"
    >
      <tbody>
        <tr>
          <td>组合名称</td>
          <td>数量</td>
          <td>单价</td>
          <td>金额</td>
          <td>积分</td>
        </tr>
        <tr
          :key="key"
          v-for="(item, key) in $_.get(purchanse, 'purchanseGoodsSeriesList')"
        >
          <td>{{ item.goodsSeries.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.goodsSeries.amount | amountFormat }}</td>
          <td>{{ (item.goodsSeries.amount * item.quantity) | amountFormat }}</td>
          <td>{{ item.quantity | amountFormat }}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: left">总 计:</td>
          <td>
            ￥{{
              $_.get(purchanse, "purchanseGoodsSeriesList").reduce((p, c) => {
                return p + c.goodsSeries.amount * c.quantity;
              }, 0) | amountFormat
            }}
          </td>
          <td>
            ￥{{
              $_.get(purchanse, "purchanseGoodsSeriesList").reduce((p, c) => {
                return p + c.quantity;
              }, 0) | amountFormat
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <table
      border
      cellspacing="0"
      cellpadding="0"
      style="margin-top: 10mm; table-layout: fixed; width: 200mm"
    >
      <tbody>
        <tr>
          <td colspan="4" style="text-align: left; font-size: 3mm; border: solid#000 1px">
            单位：{{ getPaymentStrFilter(purchanse._raw).join("/") }}
          </td>
        </tr>
        <tr>
          <td style="text-align: left; height: 8mm; font-size: 3mm">
            订单金额：￥{{ $_.get(purchanse, "amount") | amountFormat }}
          </td>
          <td style="text-align: left; font-size: 3mm">
            实际应付金额：￥{{ amountActualShouldPay | amountFormat }}
          </td>
          <td style="text-align: left; height: 8mm; font-size: 3mm">
            超出订单金额：￥{{
              $_.get(purchanse, "_raw.amountActual") - $_.get(purchanse, "_raw.amount") >
              0
                ? $_.get(purchanse, "_raw.amountActual") -
                  $_.get(purchanse, "_raw.amount")
                : 0 | amountFormat
            }}
          </td>
          <td style="text-align: left; font-size: 3mm">
            余额支付：￥{{
              $_.get(purchanse, "_raw.paymentBalanceAmount") | amountFormat
            }}
          </td>
        </tr>
        <tr>
          <td
            nowrap="nowrap"
            scope="col"
            style="white-space: wrap;text-align: left; height: 8mm; font-size: 3mm; white-space: pre;"
          >
            不包含此订单的积分：{{purchanse._getBeforeAchieveStr(config.isAdd35,config.noPriceShowIntegral)}}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm; white-space: pre;">
            包含此订单的积分：{{purchanse._getAfterAchieveStr(config.isAdd35,config.noPriceShowIntegral)}}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm">
            不包含此订单余额：￥{{
              $_.get(purchanse, "balancePre.balance") | amountFormat
            }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm">
            包含此订单余额：￥{{ balanceAfter | amountFormat }}
          </td>
        </tr>
        <tr>
          <td
            style="
              text-align: left;
              width: 40mm;
              height: 10mm;
              font-size: 3mm;
              white-space: wrap;
            "
          >
            不包含此订单的预存组合件数：{{
              JSON.parse($_.get(purchanse, "_raw.goodsSeriesPrestorePre"))
                .map((i) => `${i.name}:${i.quantity}`)
                .join(",")
            }}
          </td>
          <td style="text-align: left; width: 40mm; font-size: 3mm; white-space: wrap">
            包含此订单的预存组合件数：{{ goodsSeriesPrestoreAfterStr }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm">
            业绩时间：{{ $_.get(purchanse, "_raw") | getAchieveTime }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left"> {{ achievePDistributorNickname  }}</td>
        </tr>
      </tbody>
    </table>
    <table
      cellspacing="0"
      cellpadding="0"
      style="margin-top: 10mm; table-layout: fixed; width: 200mm"
    >
      <tbody>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left; height: 8mm">
            制单人：{{ $_.get(purchanse, "_raw.documentMaker.nickname") }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left">客服主管：陈明珍</td>
          <td nowrap="nowrap" scope="col" style="text-align: left">
            客服电话：13336473003
          </td>
        </tr>
        <tr>
          <td nowrap="nowrap" title style="text-align: left; height: 8mm">
            傲雪棋平台服务电话：400-8953068
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left" colspan="2"></td>
        </tr>
      </tbody>
    </table>
    <div
      style="
        width: 200mm;
        text-align: center;
        border-top: 1px dashed red;
        border-bottom: 1px dashed red;
        margin-bottom: 10mm;
      "
    >
      <p style="text-align: center">
        · · · · · · · · · · · 订单防伪码沿此线剪开 · · · · · · · · · · ·
      </p>
      <vue-qrcode :value="$_.get(purchanse, '_raw.sn') || ''" :width="200" />
      <p style="text-align: center">
        · · · · · · · · · · · 订单防伪码沿此线剪开 · · · · · · · · · · ·
      </p>
      <p style="text-align: left">备注：{{ $_.get(purchanse, "_raw.remark") }}</p>
    </div>
  </div>
</template>

<script>
import VueQrcode from "vue-qrcode";

import { model } from "@/model";

const { Purchanse } = model.collection;

export default {
  components: {
    VueQrcode,
  },
  props: ["config", "purchanse"],
  data() {
    return {
      entitys: {
        Purchanse,
      },
    };
  },
  computed: {
    amountActualShouldPay() {
      const am =
        $_.get(this.purchanse, "amount") - $_.get(this.purchanse, "paymentBalanceAmount");
      return am > 0 ? am : 0;
    },
    goodsSeriesPrestoreAfterStr() {
      let l = JSON.parse($_.get(this.purchanse, "_raw.goodsSeriesPrestorePre"));
      this.$_.get(this.purchanse, "purchanseGoodsSeriesList").forEach((i) => {
        const tar = this.$_.find(l, (x) => {
          return x.name === i.goodsSeries.name;
        });
        if (tar) {
          tar.quantity = tar.quantity + i.quantity;
          return;
        }
        l.push({
          name: i.goodsSeries.name,
          quantity: i.quantity,
          quantityFreeze: 0,
        });
      });
      return l
        .map((i) => {
          i._remain = i.quantity + i.quantityFreeze;
          return i;
        })
        .map((i) => {
          return `${i.name}:${i._remain}`;
        })
        .join(",");
    },
    balanceAfter() {
      if ($_.get(this.purchanse, "_raw.paymentStatus") === 1) {
        return this.$_.get(this.purchanse, "balancePre.balance");
      }
      const am =
        this.$_.get(this.purchanse, "balancePre.balance") +
        (this.$_.get(this.purchanse, "_raw.paymentGoodsSeriesPrestoreAmount") +
          this.$_.get(this.purchanse, "_raw.paymentWeixinAmount") +
          this.$_.get(this.purchanse, "_raw.paymentAlipayAmount") +
          this.$_.get(this.purchanse, "_raw.paymentCashAmount") +
          this.$_.get(this.purchanse, "_raw.paymentBankAmount")) -
        this.$_.get(this.purchanse, "_raw.amount");
      return am > 0 ? am : 0;
    },
    achievePDistributorNickname(){
      const nickname = this.$_.get(this.purchanse, "_raw.achievePDistributor.nickname", '');
      return ((this.config.isAdd35 || this.config.noPriceShowIntegral) && nickname) ? `上级店主：${nickname}` : ''
    }
  },
  methods: {},
};
</script>
