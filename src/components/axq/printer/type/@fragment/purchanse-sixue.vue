<!--
 * @Author: your name
 * @Date: 2021-07-21 15:30:58
 * @LastEditTime: 2022-04-28 14:32:00
 * @LastEditors: 码上talk|RC
 * @Description: In User Settings Edit
 * @FilePath: /web-admin/src/components/axq/printer/type/@fragment/purchanse-sixue.vue
-->
<template>
  <div class="purchanse-axq">
    <h2 style="width: 200mm; text-align: center">
      <strong>思雪订货单</strong>
    </h2>
    <table cellspacing="0" cellpadding="0" style="table-layout: fixed; min-width: 200mm">
      <tbody>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm">
            第（{{ $_.get(purchanse, "_raw.printTimes") + 1 }}）打印
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm">
            订单类型：{{ entitys.Purchanse.filter("type", purchanse.type)
            }}{{
              $_.get(purchanse, "_raw.deliveryType") && [2, 7].includes(purchanse.type)
                ? $_.get(purchanse, "_raw.deliveryType") === 1
                  ? "（齐码发货）"
                  : "(拆单发货)"
                : ""
            }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm">
            订单编号：{{ $_.get(purchanse, "_raw.sn") }}
            <span>{{ config.extraTitle }}</span>
          </td>
        </tr>
        <tr>
          <td nowrap="nowrap" title style="text-align: left; font-size: 3mm">
            客户名称:
            {{
              $_.get(purchanse, "_raw.member.nickname")
                ? `${$_.get(purchanse, "_raw.member.nickname")}/${$_.get(
                    purchanse,
                    "_raw.member.id"
                  )}`
                : $_.get(purchanse, "_raw.recipient")
            }}
          </td>
          <td nowrap="nowrap" style="text-align: left; font-size: 3mm">
            客户电话：{{
              $_.get(purchanse, "_raw.member.mobile") ||
              $_.get(purchanse, "_raw.recipientMobile")
            }}
          </td>
          <td nowrap="nowrap" style="text-align: left; font-size: 3mm">
            审核日期:
            {{
              $_.get(purchanse, "_raw.approvedTime")
                ? $_.get(purchanse, "_raw.approvedTime")
                : "--"
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <template v-if="finalStatus < 4">
      <table
        border
        cellspacing="0"
        cellpadding="0"
        style="text-align: center; table-layout: fixed; width: 200mm"
      >
        <tbody>
          <tr>
            <td rowspan="2" style="width: 24mm; font-size: 3mm">名称</td>
            <td rowspan="2" style="font-size: 3mm">颜色</td>
            <td rowspan="2" style="font-size: 3mm">杯型</td>
            <td :colspan="specSizeBra.length" style="font-size: 3mm;border-right: 3px solid;">文胸</td>
            <td :colspan="sepcSizeBriefs.length" style="font-size: 3mm">内裤</td>
            <td rowspan="2" style="font-size: 3mm">小计</td>
            <td rowspan="2" style="font-size: 3mm">总数量</td>
            <template v-if="!config.noPrice">
              <td rowspan="2" style="width: 15mm; font-size: 3mm">金额</td>
            </template>
          </tr>
          <tr>
            <td
              :key="`bra-key-${key}`"
              v-for="(item, key) in specSizeBra"
              style="font-size: 3mm"
              :style="key === (specSizeBra.length-1) ? 'border-right: 3px solid': '' "
            >
              {{ item }}
            </td>
            <td
              :key="`briefs-key-${key}`"
              v-for="(item, key) in sepcSizeBriefs"
              style="font-size: 3mm"
            >
              {{ item.s || item }}
            </td>
          </tr>
          <tr :key="key" v-for="(item, key) in buyColList">
            <td
              :rowspan="item.rowSize"
              style="height: 10mm; font-size: 3mm"
              v-if="item.rowSize"
            >
              {{ item.goods.name }}
            </td>
            <td placeholder style="font-size: 3mm">{{ item.specColorStr }}</td>
            <td placeholder style="font-size: 3mm">{{ item.specSizeSubStr }}</td>
            <td
              :key="`bra-key-${key1}`"
              v-for="(item1, key1) in specSizeBra"
              style="font-size: 3mm"
              :style="key1 === (specSizeBra.length-1) ? 'border-right: 3px solid': '' "
            >
              {{
                _getSpecQuantity(item, [item.specColorStr, item1 + item.specSizeSubStr])
              }}
            </td>
            <td
              :key="`briefs-key-${key1}`"
              v-for="(item1, key1) in sepcSizeBriefs"
              style="font-size: 3mm"
            >
              {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
            </td>
            <td placeholder style="font-size: 3mm">
              {{ _getSpecQuantity(item, [item.specColorStr]) }}
            </td>
            <td
              :rowspan="item.rowSize"
              placeholder
              style="font-size: 3mm"
              v-if="item.rowSize"
            >
              {{ item.rowQ }}
            </td>
            <template v-if="!config.noPrice">
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm"
                v-if="item.rowSize"
              >
                ￥{{ item.rowA | amountFormat }}
              </td>
            </template>
          </tr>
          <tr>
            <td colspan="20" style="text-align: left; font-size: 3mm">总 计:</td>
            <td style="font-size: 3mm">
              {{
                buyColList.reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return p1 + c1.quantity;
                    }, 0)
                  );
                }, 0)
              }}
            </td>
            <template v-if="!config.noPrice">
              <td style="font-size: 3mm">
                ￥{{
                  buyColList.reduce((p, c) => {
                    return (
                      p +
                      c.pgiList.reduce((p1, c1) => {
                        return p1 + c1.quantity * c1.goodsItems.amountCostFinal;
                      }, 0)
                    );
                  }, 0) | amountFormat
                }}
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <template v-if="giftColList.length">
        <h2 style="width: 200mm; text-align: center">赠送商品</h2>
        <table
          border
          cellspacing="0"
          cellpadding="0"
          style="text-align: center; table-layout: fixed; width: 200mm"
        >
          <tbody>
            <tr>
              <td rowspan="2" style="width: 24mm; font-size: 3mm">名称</td>
              <td rowspan="2" style="font-size: 3mm">颜色</td>
              <td rowspan="2" style="font-size: 3mm">杯型</td>
              <td :colspan="specSizeBra.length" style="font-size: 3mm;border-right: 3px solid">文胸</td>
              <td :colspan="sepcSizeBriefs.length" style="font-size: 3mm">内裤</td>
              <td rowspan="2" style="font-size: 3mm">小计</td>
              <td rowspan="2" style="font-size: 3mm">总数量</td>
            </tr>
            <tr>
              <td
                :key="`bra-key-${key}`"
                v-for="(item, key) in specSizeBra"
                style="font-size: 3mm"
                :style="key === (specSizeBra.length-1) ? 'border-right: 3px solid': '' "
              >
                {{ item }}
              </td>
              <td
                :key="`briefs-key-${key}`"
                v-for="(item, key) in sepcSizeBriefs"
                style="font-size: 3mm"
              >
                {{ item.s || item }}
              </td>
            </tr>
            <tr :key="key" v-for="(item, key) in giftColList">
              <td
                :rowspan="item.rowSize"
                style="height: 10mm; font-size: 3mm"
                v-if="item.rowSize"
              >
                {{ item.goods.name }}
              </td>
              <td placeholder style="font-size: 3mm">{{ item.specColorStr }}</td>
              <td placeholder style="font-size: 3mm">{{ item.specSizeSubStr }}</td>
              <td
                :key="`bra-key-${key1}`"
                v-for="(item1, key1) in specSizeBra"
                style="font-size: 3mm"
                :style="key1 === (specSizeBra.length-1) ? 'border-right: 3px solid': '' "
              >
                {{
                  _getSpecQuantity(item, [item.specColorStr, item1 + item.specSizeSubStr])
                }}
              </td>
              <td
                :key="`briefs-key-${key1}`"
                v-for="(item1, key1) in sepcSizeBriefs"
                style="font-size: 3mm"
              >
                {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
              </td>
              <td placeholder style="font-size: 3mm">
                {{ _getSpecQuantity(item, [item.specColorStr]) }}
              </td>
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm"
                v-if="item.rowSize"
              >
                {{ item.rowQ }}
              </td>
            </tr>
            <tr>
              <td colspan="20" style="text-align: left; font-size: 3mm">总 计:</td>
              <td style="font-size: 3mm">
                {{
                  giftColList.reduce((p, c) => {
                    return (
                      p +
                      c.pgiList.reduce((p1, c1) => {
                        return p1 + c1.quantity;
                      }, 0)
                    );
                  }, 0)
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </template>
    <template v-else>
      <h2 style="width: 200mm; text-align: center">
        <strong>已出库单</strong>
      </h2>
      <table
        border
        cellspacing="0"
        cellpadding="0"
        style="text-align: center; table-layout: fixed; width: 200mm"
      >
        <tbody>
          <tr>
            <td rowspan="2" style="width: 24mm; font-size: 3mm">名称</td>
            <td rowspan="2" style="font-size: 3mm">颜色</td>
            <td rowspan="2" style="font-size: 3mm">杯型</td>
            <td :colspan="specSizeBra.length" style="font-size: 3mm;border-right: 3px solid">文胸</td>
            <td :colspan="sepcSizeBriefs.length" style="font-size: 3mm">内裤</td>
            <td rowspan="2" style="font-size: 3mm">小计</td>
            <td rowspan="2" style="font-size: 3mm">总数量</td>
            <template v-if="!config.noPrice">
              <td rowspan="2" style="width: 15mm; font-size: 3mm">金额</td>
            </template>
          </tr>
          <tr>
            <td
              :key="`bra-key-${key}`"
              v-for="(item, key) in specSizeBra"
              style="font-size: 3mm"
              :style="key === (specSizeBra.length-1) ? 'border-right: 3px solid': '' "
            >
              {{ item }}
            </td>
            <td
              :key="`briefs-key-${key}`"
              v-for="(item, key) in sepcSizeBriefs"
              style="font-size: 3mm"
            >
              {{ item.s || item }}
            </td>
          </tr>
          <tr :key="key" v-for="(item, key) in stockOutColList">
            <td
              :rowspan="item.rowSize"
              style="height: 10mm; font-size: 3mm"
              v-if="item.rowSize"
            >
              {{ item.goods.name }}
            </td>
            <td placeholder style="font-size: 3mm">{{ item.specColorStr }}</td>
            <td placeholder style="font-size: 3mm">{{ item.specSizeSubStr }}</td>
            <td
              :key="`bra-key-${key1}`"
              v-for="(item1, key1) in specSizeBra"
              style="font-size: 3mm"
              :style="key1 === (specSizeBra.length-1) ? 'border-right: 3px solid': '' "
            >
              {{
                _getSpecQuantity(
                  item,
                  [item.specColorStr, item1 + item.specSizeSubStr],
                  "stockOut"
                )
              }}
            </td>
            <td
              :key="`briefs-key-${key1}`"
              v-for="(item1, key1) in sepcSizeBriefs"
              style="font-size: 3mm"
            >
              {{ _getSpecQuantity(item, [item.specColorStr, item1], "stockOut") }}
            </td>
            <td
              :rowspan="item.rowSize"
              placeholder
              style="font-size: 3mm"
              v-if="item.rowSize"
            >
              {{ item.rowQ }}
            </td>
            <td rowspan="1" placeholder style="font-size: 3mm">
              {{ _getSpecQuantity(item, [item.specColorStr], "stockOut") }}
            </td>
            <template v-if="!config.noPrice">
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm"
                v-if="item.rowSize"
              >
                ￥{{ item.rowA | amountFormat }}
              </td>
            </template>
          </tr>
          <tr>
            <td colspan="20" style="text-align: left; font-size: 3mm">总 计:</td>
            <td style="font-size: 3mm">
              {{
                stockOutColList.reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return p1 + c1._raw.quantityHasStockOut;
                    }, 0)
                  );
                }, 0)
              }}
            </td>
            <template v-if="!config.noPrice">
              <td title="300" style="font-size: 3mm">
                ￥{{
                  stockOutColList.reduce((p, c) => {
                    return (
                      p +
                      c.pgiList.reduce((p1, c1) => {
                        return (
                          p1 + c1._raw.quantityHasStockOut * c1.goodsItems.amountCostFinal
                        );
                      }, 0)
                    );
                  }, 0) | amountFormat
                }}
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <h2 style="width: 200mm; text-align: center">
        <strong>未出库单</strong>
      </h2>
      <table
        border
        cellspacing="0"
        cellpadding="0"
        style="text-align: center; table-layout: fixed; width: 200mm"
      >
        <tbody>
          <tr>
            <td rowspan="2" style="width: 24mm; font-size: 3mm">名称</td>
            <td rowspan="2" style="font-size: 3mm">颜色</td>
            <td rowspan="2" style="font-size: 3mm">杯型</td>
            <td :colspan="specSizeBra.length" style="font-size: 3mm;border-right: 3px solid">文胸</td>
            <td :colspan="sepcSizeBriefs.length" style="font-size: 3mm">内裤</td>
            <td rowspan="2" style="font-size: 3mm">小计</td>
            <td rowspan="2" style="font-size: 3mm">总数量</td>
            <template v-if="!config.noPrice">
              <td rowspan="2" style="width: 15mm; font-size: 3mm">金额</td>
            </template>
          </tr>
          <tr>
            <td
              :key="`bra-key-${key}`"
              v-for="(item, key) in specSizeBra"
              style="font-size: 3mm"
              :style="key === (specSizeBra.length-1) ? 'border-right: 3px solid': '' "
            >
              {{ item }}
            </td>
            <td
              :key="`briefs-key-${key}`"
              v-for="(item, key) in sepcSizeBriefs"
              style="font-size: 3mm"
            >
              {{ item.s || item }}
            </td>
          </tr>
          <tr :key="key" v-for="(item, key) in unStockOutColList">
            <td
              :rowspan="item.rowSize"
              style="height: 10mm; font-size: 3mm"
              v-if="item.rowSize"
            >
              {{ item.goods.name }}
            </td>
            <td placeholder style="font-size: 3mm">{{ item.specColorStr }}</td>
            <td placeholder style="font-size: 3mm">{{ item.specSizeSubStr }}</td>
            <td
              :key="`bra-key-${key1}`"
              v-for="(item1, key1) in specSizeBra"
              style="font-size: 3mm"
              :style="key1 === (specSizeBra.length-1) ? 'border-right: 3px solid': '' "
            >
              {{
                _getSpecQuantity(
                  item,
                  [item.specColorStr, item1 + item.specSizeSubStr],
                  "unStockOut"
                )
              }}
            </td>
            <td
              :key="`briefs-key-${key1}`"
              v-for="(item1, key1) in sepcSizeBriefs"
              style="font-size: 3mm"
            >
              {{ _getSpecQuantity(item, [item.specColorStr, item1], "unStockOut") }}
            </td>
            <td placeholder style="font-size: 3mm">
              {{ _getSpecQuantity(item, [item.specColorStr], "unStockOut") }}
            </td>
            <td
              :rowspan="item.rowSize"
              placeholder
              style="font-size: 3mm"
              v-if="item.rowSize"
            >
              {{ item.rowQ }}
            </td>
            <template v-if="!config.noPrice">
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm"
                v-if="item.rowSize"
              >
                ￥{{ item.rowA | amountFormat }}
              </td>
            </template>
          </tr>
          <tr>
            <td colspan="20" style="text-align: left; font-size: 3mm">总 计:</td>
            <td style="font-size: 3mm">
              {{
                unStockOutColList.reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return p1 + (c1._raw.quantity - c1._raw.quantityHasStockOut);
                    }, 0)
                  );
                }, 0)
              }}
            </td>
            <template v-if="!config.noPrice">
              <td title="300" style="font-size: 3mm">
                ￥{{
                  unStockOutColList.reduce((p, c) => {
                    return (
                      p +
                      c.pgiList.reduce((p1, c1) => {
                        return (
                          p1 +
                          (c1._raw.quantity - c1._raw.quantityHasStockOut) *
                            c1.goodsItems.amountCostFinal
                        );
                      }, 0)
                    );
                  }, 0) | amountFormat
                }}
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </template>
    <table
      border
      cellspacing="0"
      cellpadding="0"
      style="margin-top: 10mm; table-layout: fixed; width: 200mm"
      v-if="!config.noPrice"
    >
      <tbody>
        <tr v-if="[1, 6, 7].includes($_.get(purchanse, '_raw.status')) && !forceStatus">
          <td nowrap="nowrap" style="text-align: left; height: 8mm; font-size: 3mm">
            转存余额：{{ transferObj.amount | amountFormat }}
          </td>
          <td
            nowrap="nowrap"
            scope="col"
            style="text-align: left; height: 8mm; font-size: 3mm"
          ></td>
        </tr>
        <template v-else>
          <template v-if="!config.noPrice">
            <tr>
              <td
                colspan="4"
                style="text-align: left; font-size: 3mm; border: solid#000 1px"
              >
                单位：{{ getPaymentStrFilter(purchanse._raw).join("/") }}
              </td>
            </tr>
            <tr>
              <td style="text-align: left; height: 8mm; font-size: 3mm">
                订单金额：￥{{ $_.get(purchanse, "amount") | amountFormat }}
              </td>
              <td style="text-align: left; font-size: 3mm">
                实际应付金额：￥{{
                  ($_.get(purchanse, "amount") -
                    $_.get(purchanse, "paymentSixueBalanceAmount"))
                    | amountFormat
                }}
              </td>
              <td
                style="
                  text-align: left;
                  height: 8mm;
                  font-size: 3mm;
                  border: solid#000 1px;
                "
              >
                超出订单金额：￥{{
                  $_.get(purchanse, "_raw.amountActual") -
                    $_.get(purchanse, "_raw.amount") >
                  0
                    ? $_.get(purchanse, "_raw.amountActual") -
                      $_.get(purchanse, "_raw.amount")
                    : 0 | amountFormat
                }}
              </td>
              <td style="text-align: left; font-size: 3mm; border: solid#000 1px">
                余额支付：￥{{
                  $_.get(purchanse, "_raw.paymentSixueBalanceAmount") | amountFormat
                }}
              </td>
            </tr>
            <tr>
              <td style="text-align: left; font-size: 3mm; border: solid#000 1px">
                包含此订单的货款余额：￥{{ balanceAfter | amountFormat }}
              </td>
              <td style="text-align: left; font-size: 3mm; border: solid#000 1px">
                不包含此订单的货款余额：￥{{
                  $_.get(purchanse, "balancePre.sixueBalance") | amountFormat
                }}
              </td>
              <td
                colspan="2"
                style="text-align: left; font-size: 3mm; border: solid#000 1px"
              ></td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <table
      cellspacing="0"
      cellpadding="0"
      style="margin-top: 10mm; table-layout: fixed; width: 200mm"
    >
      <tbody>
        <tr>
          <td
            nowrap="nowrap"
            scope="col"
            style="text-align: left; height: 8mm; font-size: 3mm"
          >
            制单人：{{ $_.get(purchanse, "_raw.documentMaker.nickname") }}/{{
              $_.get(purchanse, "_raw.documentMaker.mobile")
            }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left">客服主管：陈明珍</td>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm">
            出货单位：{{ $_.get(purchanse, "_raw.axqSelfEmployedLaborer.name") }}
          </td>
        </tr>
        <tr>
          <td nowrap="nowrap" title style="text-align: left; height: 8mm; font-size: 3mm">
            电话：13336473003
          </td>
          <td
            nowrap="nowrap"
            scope="col"
            style="text-align: left; font-size: 3mm"
            colspan="2"
          >
            傲雪棋平台服务电话：400-8953068
          </td>
        </tr>
        <tr>
          <td
            nowrap="nowrap"
            scope="col"
            colspan="3"
            style="text-align: left; height: 8mm; font-size: 3mm"
          >
            如收到货后有质量问题，或数量差异，请在收到货24小时内提出，否则视为无异议正常收货。
          </td>
        </tr>
        <tr>
          <td
            nowrap="nowrap"
            scope="col"
            colspan="3"
            style="text-align: left; font-size: 3mm"
          >
            收件人：{{ $_.get(purchanse, "_raw.recipient") }}，{{
              $_.get(purchanse, "_raw.recipientMobile")
            }}，{{ $_.get(purchanse, "_raw.fullAddress") }}
          </td>
        </tr>
        <tr>
          <td
            nowrap="nowrap"
            scope="col"
            colspan="3"
            style="text-align: left; height: 8mm; font-size: 3mm"
          >
            快递方式：{{ $_.get(purchanse, "_raw.sysExpress.name", "未填写") }}
          </td>
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
      <p style="text-align: center; font-size: 3mm">
        · · · · · · · · · · · 订单防伪码沿此线剪开 · · · · · · · · · · ·
      </p>
      <div style="display: flex; justify-content: center">
        <vue-qrcode :value="$_.get(purchanse, '_raw.sn') || ''" :width="200" />
        <div style="margin-left: 50px" v-if="isShowWxEntry">
          <purchanse-wx-entry-code
            :purchanse-id="$_.get(purchanse, 'id')"
            :url="$_.get(purchanse, '_raw.wxEntryUrl')"
            width="200"
            height="200"
          ></purchanse-wx-entry-code>
          <p>微信扫一扫，订单详情我知道！</p>
        </div>
      </div>
      <p style="text-align: center; font-size: 3mm">
        · · · · · · · · · · · 订单防伪码沿此线剪开 · · · · · · · · · · ·
      </p>
      <p style="text-align: left; font-size: 3mm">
        备注：{{ $_.get(purchanse, "_raw.remark") }}
      </p>
    </div>
  </div>
</template>

<script>
import VueQrcode from "vue-qrcode";
import purchanseWxEntryCode from "@/components/axq/purchanse-wx-code";

import { model } from "@/model";

const { Purchanse } = model.collection;

export default {
  components: {
    VueQrcode,
    purchanseWxEntryCode,
  },
  props: ["config", "purchanse", "forceStatus", "isShowWxEntry"],
  data() {
    return {
      entitys: {
        Purchanse,
      },
      specSizeBra: ["70", "75", "80", "85", "90", "95", "100", "105"],
      sepcSizeBriefs: [
        {
          v: ["58/S"],
          s: "S",
        },
        {
          v: ["64/M"],
          s: "M",
        },
        {
          v: ["70/L"],
          s: "L",
        },
        {
          v: ["76/XL"],
          s: "XL",
        },
        {
          v: ["82/XXL", "82/2XL"],
          s: "2XL",
        },
        {
          v: ["90/XXXL", "90/3XL"],
          s: "3XL",
        },
        {
          v: ["98/XXXXL", "98/4L"],
          s: "4XL",
        },
        {
          v: ["106/XXXXXL", "106/5L"],
          s: "5XL",
        },
      ],
    };
  },
  computed: {
    finalStatus() {
      return this.forceStatus
        ? this.forceStatus
        : this.$_.get(this.purchanse, "_raw.status");
    },

    buyColList() {
      let l = [];
      const { purchanseGoodsItemsList = [] } = this.purchanse;
      purchanseGoodsItemsList.forEach((i) => {
        const specSizeSubStr =
          i.goodsItems.specSizeStr.indexOf("/") > -1
            ? ""
            : i.goodsItems.specSizeStr.slice(
                i.goodsItems.specSizeStr.length - 1,
                i.goodsItems.specSizeStr.length
              );
        const tar = $_.find(l, (x) => {
          return (
            x.goods.id === i.goodsItems._raw.goods.id &&
            x.specColorStr === i.goodsItems.specColorStr &&
            x.specSizeSubStr === specSizeSubStr &&
            x.goodsItems.amount + x.goodsItems.amountCost ===
              i.goodsItems.amount + i.goodsItems.amountCost
          );
        });
        if (tar) {
          tar.pgiList.push(i);
          return;
        }
        l.push({
          goods: i.goodsItems.goods,
          goodsItems: i.goodsItems,
          specColorStr: i.goodsItems.specColorStr,
          specSizeStr: i.goodsItems.specSizeStr,
          specSizeSubStr: specSizeSubStr,
          pgiList: [i],
        });
      });
      l = this.$_.sortBy(l, ['goods.id','specColorStr','specSizeSubStr']);
      l.forEach((i) => {
        const tar = this.$_.find(l, (x) => {
          return x.rowSize && x.goodsItems.id === i.goodsItems.id;
        });
        if (tar) {
          tar.rowSize++;
          tar.rowQ = tar.rowQ + this._getSpecQuantity(i, [i.specColorStr]);
          tar.rowA = tar.rowQ * i.goodsItems.amountCostFinal;
          return;
        }
        i.rowSize = 1;
        i.rowQ = this._getSpecQuantity(i, [i.specColorStr]);
        i.rowA = i.rowQ * i.goodsItems.amountCostFinal;
      });
      return l;
    },
    giftColList() {
      let l = [];
      const { purchanseGiftList = [] } = this.purchanse;
      purchanseGiftList.forEach((i) => {
        const specSizeSubStr =
          i.goodsItems.specSizeStr.indexOf("/") > -1
            ? ""
            : i.goodsItems.specSizeStr.slice(
                i.goodsItems.specSizeStr.length - 1,
                i.goodsItems.specSizeStr.length
              );
        const tar = $_.find(l, (x) => {
          return (
            x.goods.id === i.goodsItems._raw.goods.id &&
            x.specColorStr === i.goodsItems.specColorStr &&
            x.specSizeSubStr === specSizeSubStr &&
            x.goodsItems.amountCostFinal === i.goodsItems.amountCostFinal
          );
        });
        if (tar) {
          tar.pgiList.push(i);
          return;
        }
        l.push({
          goods: i.goodsItems.goods,
          goodsItems: i.goodsItems,
          specColorStr: i.goodsItems.specColorStr,
          specSizeStr: i.goodsItems.specSizeStr,
          specSizeSubStr: specSizeSubStr,
          pgiList: [i],
        });
      });
      l = this.$_.sortBy(l, (x) => {
        return x.goods.id;
      });
      l.forEach((i) => {
        const tar = this.$_.find(l, (x) => {
          return x.rowSize && x.goodsItems.id === i.goodsItems.id;
        });
        if (tar) {
          tar.rowSize++;
          tar.rowQ = tar.rowQ + this._getSpecQuantity(i, [i.specColorStr]);
          tar.rowA = tar.rowQ * i.goodsItems.amountCostFinal;
          return;
        }
        i.rowSize = 1;
        i.rowQ = this._getSpecQuantity(i, [i.specColorStr]);
        i.rowA = i.rowQ * i.goodsItems.amountCostFinal;
      });
      return l;
    },
    stockOutColList() {
      const { purchanseGoodsItemsList = [], purchanseGiftList = [] } = this.purchanse;
      let l = [];
      purchanseGoodsItemsList
        .concat(purchanseGiftList)
        .filter((i) => i._raw.quantityHasStockOut > 0)
        .forEach((i) => {
          const specSizeSubStr =
            i.goodsItems.specSizeStr.indexOf("/") > -1
              ? ""
              : i.goodsItems.specSizeStr.slice(
                  i.goodsItems.specSizeStr.length - 1,
                  i.goodsItems.specSizeStr.length
                );
          const tar = $_.find(l, (x) => {
            return (
              x.goods.id === i.goodsItems._raw.goods.id &&
              x.specColorStr === i.goodsItems.specColorStr &&
              x.specSizeSubStr === specSizeSubStr &&
              x.goodsItems.amount + x.goodsItems.amountCost ===
                i.goodsItems.amount + i.goodsItems.amountCost
            );
          });
          if (tar) {
            tar.pgiList.push(i);
            return;
          }
          l.push({
            goods: i.goodsItems.goods,
            goodsItems: i.goodsItems,
            specColorStr: i.goodsItems.specColorStr,
            specSizeStr: i.goodsItems.specSizeStr,
            specSizeSubStr: specSizeSubStr,
            pgiList: [i],
          });
        });
      l = this.$_.sortBy(l, (x) => {
        return x.goods.id;
      });
      l.forEach((i) => {
        const tar = this.$_.find(l, (x) => {
          return x.rowSize && x.goodsItems.id === i.goodsItems.id;
        });
        if (tar) {
          tar.rowSize++;
          tar.rowQ = tar.rowQ + this._getSpecQuantity(i, [i.specColorStr], "stockOut");
          tar.rowA = tar.rowQ * i.goodsItems.amountCostFinal;
          return;
        }
        i.rowSize = 1;
        i.rowQ = this._getSpecQuantity(i, [i.specColorStr], "stockOut");
        i.rowA = i.rowQ * i.goodsItems.amountCostFinal;
      });
      return l;
    },
    unStockOutColList() {
      const { purchanseGoodsItemsList = [], purchanseGiftList = [] } = this.purchanse;
      let l = [];
      purchanseGoodsItemsList
        .concat(purchanseGiftList)
        .filter((i) => i._raw.quantity - i._raw.quantityHasStockOut > 0)
        .forEach((i) => {
          const specSizeSubStr =
            i.goodsItems.specSizeStr.indexOf("/") > -1
              ? ""
              : i.goodsItems.specSizeStr.slice(
                  i.goodsItems.specSizeStr.length - 1,
                  i.goodsItems.specSizeStr.length
                );
          const tar = $_.find(l, (x) => {
            return (
              x.goods.id === i.goodsItems._raw.goods.id &&
              x.specColorStr === i.goodsItems.specColorStr &&
              x.specSizeSubStr === specSizeSubStr &&
              x.goodsItems.amount + x.goodsItems.amountCost ===
                i.goodsItems.amount + i.goodsItems.amountCost
            );
          });
          if (tar) {
            tar.pgiList.push(i);
            return;
          }
          l.push({
            goods: i.goodsItems.goods,
            goodsItems: i.goodsItems,
            specColorStr: i.goodsItems.specColorStr,
            specSizeStr: i.goodsItems.specSizeStr,
            specSizeSubStr: specSizeSubStr,
            pgiList: [i],
          });
        });
      l = this.$_.sortBy(l, (x) => {
        return x.goods.id;
      });
      l.forEach((i) => {
        const tar = this.$_.find(l, (x) => {
          return x.rowSize && x.goodsItems.id === i.goodsItems.id;
        });
        if (tar) {
          tar.rowSize++;
          tar.rowQ = tar.rowQ + this._getSpecQuantity(i, [i.specColorStr], "unStockOut");
          tar.rowA = tar.rowQ * i.goodsItems.amountCostFinal;
          return;
        }
        i.rowSize = 1;
        i.rowQ = this._getSpecQuantity(i, [i.specColorStr], "unStockOut");
        i.rowA = i.rowQ * i.goodsItems.amountCostFinal;
      });
      return l;
    },
    transferObj() {
      const j = this.$_.get(this.purchanse, "_raw.transferBalanceGoodsSeriesJson");
      return j ? JSON.parse(j) : { goodsSeriesNumBoList: [], goodsItemsNumBoList: [] };
    },
    balanceAfter() {
      if ($_.get(this.purchanse, "_raw.paymentStatus") === 1) {
        return this.$_.get(this.purchanse, "balancePre.sixueBalance");
      }
      const am =
        this.$_.get(this.purchanse, "balancePre.sixueBalance") +
        (this.$_.get(this.purchanse, "_raw.paymentWeixinAmount") +
          this.$_.get(this.purchanse, "_raw.paymentAlipayAmount") +
          this.$_.get(this.purchanse, "_raw.paymentCashAmount") +
          this.$_.get(this.purchanse, "_raw.paymentBankAmount")) -
        this.$_.get(this.purchanse, "_raw.amount");
      return am > 0 ? am : 0;
    },
  },
  methods: {
    _getSpecQuantity(e, s, addUpKey = "all") {
      const { pgiList } = e;
      let q = 0;
      for (let i = 0; i < pgiList.length; i++) {
        const { specJson } = pgiList[i].goodsItems;
        if (
          (specJson || []).filter((i) => {
            return s
              .reduce((p, c) => {
                return p.concat(c.v ? c.v : [c]);
              }, [])
              .includes(i.value);
          }).length === s.length
        ) {
          if (addUpKey === "all") {
            q = q + Number($_.get(pgiList[i], "_raw.quantity"));
          }
          if (addUpKey === "stockOut") {
            q = q + Number($_.get(pgiList[i], "_raw.quantityHasStockOut"));
          }
          if (addUpKey === "unStockOut") {
            q =
              q +
              Number(
                $_.get(pgiList[i], "_raw.quantity") -
                  $_.get(pgiList[i], "_raw.quantityHasStockOut")
              );
          }
        }
      }
      return q || "";
    },
  },
};
</script>
