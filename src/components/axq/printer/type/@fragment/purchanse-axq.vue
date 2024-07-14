<!--
 * @Author: your name
 * @Date: 2021-07-21 15:30:58
 * @LastEditTime: 2022-05-05 17:55:43
 * @LastEditors: 码上talk|RC
 * @Description: In User Settings Edit
 * @FilePath: /web-admin/src/components/axq/printer/type/@fragment/purchanse-axq.vue
-->
<template>
  <div class="purchanse-axq">
    <h2 style="width: 200mm; text-align: center">
      <strong>傲雪棋订货单</strong>
    </h2>
    <table cellspacing="0" cellpadding="0" style="table-layout: fixed; width: 200mm">
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
          <td nowrap="nowrap" style="text-align: left; font-size: 3mm">
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
            审核日期:{{
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
        v-if="_getColList('buy').length"
        cellspacing="0"
        cellpadding="0"
        style="
          text-align: center;
          table-layout: fixed;
          width: 200mm;
          border-collapse: collapse;
          border: none;
        "
      >
        <tbody>
          <tr>
            <td
              rowspan="2"
              colspan="2"
              style="width: 24mm; font-size: 3mm; border: solid#000 1px"
            >
              名称
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              款号
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              颜色
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              杯型
            </td>
            <td
              :colspan="specSizeBra.length"
              style="font-size: 3mm; border: 1px solid #000; border-right: 3px solid"
            >
              文胸
            </td>
            <td
              :colspan="specSizeBriefs.length"
              style="font-size: 3mm; border: 1px solid #000"
            >
              内裤
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">小计</td>
            <td
              rowspan="2"
              style="width: 15mm; font-size: 3mm; border: solid#000 1px"
              v-if="!config.noPrice"
            >
              单价/￥
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">总数量</td>
            <template v-if="!config.noPrice">
              <td rowspan="2" style="width: 15mm; font-size: 3mm; border: solid#000 1px">
                金额/￥
              </td>
            </template>
            <td rowspan="2" style="width: 10mm; font-size: 3mm; border: solid#000 1px">
              积分
            </td>
          </tr>
          <tr>
            <td
              :key="`bra-key-${key}`"
              v-for="(item, key) in specSizeBra"
              style="font-size: 3mm; border: solid#000 1px"
              :style="key === specSizeBra.length - 1 ? 'border-right: 3px solid' : ''"
            >
              {{ item }}
            </td>
            <td
              :key="`briefs-key-${key}`"
              v-for="(item, key) in specSizeBriefs"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.s || item }}
            </td>
          </tr>
          <tr :key="key" v-for="(item, key) in _getColList('buy')">
            <td
              :rowspan="item.rowSize"
              colspan="2"
              style="height: 10mm; font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.goods.name }}
            </td>
            <td
              placeholder
              colspan="2"
              style="padding: 2mm 0; font-size: 3mm; border: solid#000 1px"
            >
              {{ item.goodsItems.name }}
            </td>
            <td placeholder colspan="2" style="font-size: 3mm; border: solid#000 1px">
              {{ item.specColorStr }}
            </td>
            <td placeholder colspan="2" style="font-size: 3mm; border: solid#000 1px">
              {{ item.specSizeSubStr }}
            </td>
            <td
              :key="`bra-key-${key1}`"
              v-for="(item1, key1) in specSizeBra"
              style="font-size: 3mm; border: solid#000 1px"
              :style="key1 === specSizeBra.length - 1 ? 'border-right: 3px solid' : ''"
            >
              {{
                _getSpecQuantity(item, [item.specColorStr, item1 + item.specSizeSubStr])
              }}
            </td>
            <td
              :key="`briefs-key-${key1}`"
              v-for="(item1, key1) in specSizeBriefs"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
            </td>
            <td placeholder style="font-size: 3mm; border: solid#000 1px">
              {{ _getSpecQuantity(item, [item.specColorStr]) }}
            </td>
            <td
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
              v-if="!config.noPrice"
            >
              {{ _hackAmountIntegral(item, 1) | amountFormat }}
            </td>
            <td
              :rowspan="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.rowQ }}
            </td>
            <template v-if="!config.noPrice">
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
                v-if="item.rowSize"
              >
                {{ item.rowA | amountFormat }}
              </td>
            </template>
            <td
              :rowspan="item.rowSize"
              v-if="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.rowI | amountFormat }}
            </td>
          </tr>
          <tr>
            <td
              :colspan="config.noPrice ? 25 : 26"
              style="
                text-align: left;
                padding-left: 5px;
                font-size: 3mm;
                border: solid#000 1px;
              "
            >
              合 计:
            </td>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("buy").reduce((p, c) => {
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
              <td style="font-size: 3mm; border: solid#000 1px">
                {{
                  _adjustAmount(
                    _getColList("buy").reduce((p, c) => {
                      return p.concat(
                        c.pgiList.map((i) => ({
                          gi: i.goodsItems,
                          q: i.quantity,
                          pgi: i,
                        }))
                      );
                    }, [])
                  ) | amountFormat
                }}
              </td>
            </template>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("buy").reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return (
                        p1 +
                        c1.quantity * (c1.integralGiveDividend / c1.integralGiveDivisor)
                      );
                    }, 0)
                  );
                }, 0) | amountFormat
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="_getColList('buy', 'socks').length"
        cellspacing="0"
        cellpadding="0"
        style="
          text-align: center;
          table-layout: fixed;
          width: 200mm;
          margin-top: 5mm;
          border-collapse: collapse;
          border: none;
        "
      >
        <tbody>
          <tr>
            <td
              rowspan="2"
              colspan="2"
              style="width: 24mm; font-size: 3mm; border: solid#000 1px"
            >
              名称
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              款号
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">颜色</td>
            <td
              :colspan="specSizeSocks.length"
              style="font-size: 3mm; border: solid#000 1px"
            >
              袜套尺寸
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">小计</td>
            <td
              rowspan="2"
              style="width: 15mm; font-size: 3mm; border: solid#000 1px"
              v-if="!config.noPrice"
            >
              单价/￥
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">总数量</td>
            <template v-if="!config.noPrice">
              <td rowspan="2" style="width: 15mm; font-size: 3mm; border: solid#000 1px">
                金额/￥
              </td>
            </template>
            <td rowspan="2" style="width: 10mm; font-size: 3mm; border: solid#000 1px">
              积分
            </td>
          </tr>
          <tr>
            <td
              :key="`briefs-key-${key}`"
              v-for="(item, key) in specSizeSocks"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.s || item }}
            </td>
          </tr>
          <tr :key="key" v-for="(item, key) in _getColList('buy', 'socks')">
            <td
              :rowspan="item.rowSize"
              colspan="2"
              style="height: 10mm; font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.goods.name }}
            </td>
            <td
              placeholder
              colspan="2"
              style="padding: 2mm 0; font-size: 3mm; border: solid#000 1px"
            >
              {{ item.goodsItems.name }}
            </td>
            <td placeholder style="font-size: 3mm; border: solid#000 1px">
              {{ item.specColorStr }}
            </td>
            <td
              :key="`socks-key-${key1}`"
              v-for="(item1, key1) in specSizeSocks"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
            </td>
            <td placeholder style="font-size: 3mm; border: solid#000 1px">
              {{ _getSpecQuantity(item, [item.specColorStr]) }}
            </td>
            <td
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
              v-if="!config.noPrice"
            >
              {{ _hackAmountIntegral(item, 1) | amountFormat }}
            </td>
            <td
              :rowspan="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.rowQ }}
            </td>
            <template v-if="!config.noPrice">
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
                v-if="item.rowSize"
              >
                {{ item.rowA | amountFormat }}
              </td>
            </template>
            <td
              :rowspan="item.rowSize"
              v-if="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.rowI | amountFormat }}
            </td>
          </tr>
          <tr>
            <td
              :colspan="specSizeSocks.length + (config.noPrice ? 6 : 7)"
              style="
                text-align: left;
                padding-left: 5px;
                font-size: 3mm;
                border: solid#000 1px;
              "
            >
              合 计:
            </td>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("buy", "socks").reduce((p, c) => {
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
              <td style="font-size: 3mm; border: solid#000 1px">
                {{
                  _adjustAmount(
                    _getColList("buy", "socks").reduce((p, c) => {
                      return p.concat(
                        c.pgiList.map((i) => ({
                          gi: i.goodsItems,
                          q: i.quantity,
                          pgi: i,
                        }))
                      );
                    }, [])
                  ) | amountFormat
                }}
              </td>
            </template>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("buy", "socks").reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return (
                        p1 +
                        c1.quantity * (c1.integralGiveDividend / c1.integralGiveDivisor)
                      );
                    }, 0)
                  );
                }, 0) | amountFormat
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="_getColList('buy', 'socks').length"
        cellspacing="0"
        cellpadding="0"
        style="
          text-align: center;
          table-layout: fixed;
          width: 200mm;
          margin-top: 5mm;
          border-collapse: collapse;
          border: none;
        "
      >
        <tbody>
          <tr>
            <td
              :colspan="config.noPrice ? 25 : 26"
              style="
                text-align: left;
                padding-left: 5px;
                font-size: 3mm;
                border: solid#000 1px;
              "
            >
              总计:
            </td>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("buy").reduce((p, c) => {
                  return p + c.pgiList.reduce((p1, c1) => p1 + c1.quantity, 0);
                }, 0) +
                _getColList("buy", "socks").reduce((p, c) => {
                  return p + c.pgiList.reduce((p1, c1) => p1 + c1.quantity, 0);
                }, 0)
              }}
            </td>
            <td
              style="width: 15mm; font-size: 3mm; border: solid#000 1px"
              v-if="!config.noPrice"
            >
              {{
                (_adjustAmount(
                  _getColList("buy").reduce((p, c) => {
                    return p.concat(
                      c.pgiList.map((i) => ({ gi: i.goodsItems, q: i.quantity, pgi: i }))
                    );
                  }, [])
                ) +
                  _adjustAmount(
                    _getColList("buy", "socks").reduce((p, c) => {
                      return p.concat(
                        c.pgiList.map((i) => ({
                          gi: i.goodsItems,
                          q: i.quantity,
                          pgi: i,
                        }))
                      );
                    }, [])
                  ))
                  | amountFormat
              }}
            </td>
            <td style="width: 10mm; font-size: 3mm; border: solid#000 1px">
              {{
                (_getColList("buy").reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return (
                        p1 +
                        c1.quantity * (c1.integralGiveDividend / c1.integralGiveDivisor)
                      );
                    }, 0)
                  );
                }, 0) +
                  _getColList("buy", "socks").reduce((p, c) => {
                    return (
                      p +
                      c.pgiList.reduce((p1, c1) => {
                        return (
                          p1 +
                          c1.quantity * (c1.integralGiveDividend / c1.integralGiveDivisor)
                        );
                      }, 0)
                    );
                  }, 0))
                  | amountFormat
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <template>
        <h2
          v-if="_getColList('gift').length || _getColList('gift', 'socks').length"
          style="width: 200mm; text-align: center"
        >
          赠送商品
        </h2>
        <table
          v-if="_getColList('gift').length"
          cellspacing="0"
          cellpadding="0"
          style="
            text-align: center;
            table-layout: fixed;
            width: 200mm;
            border-collapse: collapse;
            border: none;
          "
        >
          <tbody>
            <tr>
              <td
                rowspan="2"
                colspan="2"
                style="width: 24mm; font-size: 3mm; border: solid#000 1px"
              >
                名称
              </td>
              <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
                款号
              </td>
              <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
                颜色
              </td>
              <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
                杯型
              </td>
              <td
                :colspan="specSizeBra.length"
                style="font-size: 3mm; border: solid#000 1px; border-right: 3px solid"
              >
                文胸
              </td>
              <td
                :colspan="specSizeBriefs.length"
                style="font-size: 3mm; border: solid#000 1px"
              >
                内裤
              </td>
              <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">小计</td>
              <td
                rowspan="2"
                style="width: 15mm; font-size: 3mm; border: solid#000 1px"
                v-if="!config.noPrice"
              >
                单价/￥
              </td>
              <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">总数量</td>
              <td
                rowspan="2"
                style="width: 15mm; font-size: 3mm; border: solid#000 1px"
                v-if="!config.noPrice"
              >
                金额/￥
              </td>
              <td rowspan="2" style="width: 10mm; font-size: 3mm; border: solid#000 1px">
                积分
              </td>
            </tr>
            <tr>
              <td
                :key="`bra-key-${key}`"
                v-for="(item, key) in specSizeBra"
                style="font-size: 3mm; border: solid#000 1px"
                :style="key === specSizeBra.length - 1 ? 'border-right: 3px solid' : ''"
              >
                {{ item }}
              </td>
              <td
                :key="`briefs-key-${key}`"
                v-for="(item, key) in specSizeBriefs"
                style="font-size: 3mm; border: solid#000 1px"
              >
                {{ item.s || item }}
              </td>
            </tr>
            <tr :key="key" v-for="(item, key) in _getColList('gift')">
              <td
                :rowspan="item.rowSize"
                colspan="2"
                style="height: 10mm; font-size: 3mm; border: solid#000 1px"
                v-if="item.rowSize"
              >
                {{ item.goods.name }}
              </td>
              <td
                placeholder
                colspan="2"
                style="padding: 2mm 0; font-size: 3mm; border: solid#000 1px"
              >
                {{ item.goodsItems.name }}
              </td>
              <td placeholder colspan="2" style="font-size: 3mm; border: solid#000 1px">
                {{ item.specColorStr }}
              </td>
              <td placeholder colspan="2" style="font-size: 3mm; border: solid#000 1px">
                {{ item.specSizeSubStr }}
              </td>
              <td
                :key="`bra-key-${key1}`"
                v-for="(item1, key1) in specSizeBra"
                style="font-size: 3mm; border: solid#000 1px"
                :style="key1 === specSizeBra.length - 1 ? 'border-right: 3px solid' : ''"
              >
                {{
                  _getSpecQuantity(item, [item.specColorStr, item1 + item.specSizeSubStr])
                }}
              </td>
              <td
                :key="`briefs-key-${key1}`"
                v-for="(item1, key1) in specSizeBriefs"
                style="font-size: 3mm; border: solid#000 1px"
              >
                {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
              </td>
              <td placeholder style="font-size: 3mm; border: solid#000 1px">
                {{ _getSpecQuantity(item, [item.specColorStr]) }}
              </td>
              <td
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
                v-if="!config.noPrice"
              >
                0
              </td>
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
                v-if="item.rowSize"
              >
                {{ item.rowQ }}
              </td>
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
                v-if="!config.noPrice && item.rowSize"
              >
                0
              </td>
              <td
                :rowspan="item.rowSize"
                v-if="item.rowSize"
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
              >
                0
              </td>
            </tr>
            <tr>
              <td
                :colspan="config.noPrice ? 25 : 26"
                style="text-align: left; font-size: 3mm; border: solid#000 1px"
              >
                合计:
              </td>
              <td style="font-size: 3mm; border: solid#000 1px">
                {{
                  _getColList("gift").reduce((p, c) => {
                    return (
                      p +
                      c.pgiList.reduce((p1, c1) => {
                        return p1 + c1.quantity;
                      }, 0)
                    );
                  }, 0)
                }}
              </td>
              <td style="font-size: 3mm; border: solid#000 1px" v-if="!config.noPrice">
                0
              </td>
              <td style="font-size: 3mm; border: solid#000 1px">0</td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="_getColList('gift', 'socks').length"
          cellspacing="0"
          cellpadding="0"
          style="
            text-align: center;
            table-layout: fixed;
            width: 200mm;
            margin-top: 10mm;
            border-collapse: collapse;
            border: none;
          "
        >
          <tbody>
            <tr>
              <td
                rowspan="2"
                colspan="2"
                style="width: 24mm; font-size: 3mm; border: solid#000 1px"
              >
                名称
              </td>
              <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
                款号
              </td>
              <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">颜色</td>
              <td
                :colspan="specSizeSocks.length"
                style="font-size: 3mm; border: solid#000 1px"
              >
                袜套尺寸
              </td>
              <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">小计</td>
              <td
                rowspan="2"
                style="width: 15mm; font-size: 3mm; border: solid#000 1px"
                v-if="!config.noPrice"
              >
                单价/￥
              </td>
              <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">总数量</td>
              <td
                rowspan="2"
                style="width: 15mm; font-size: 3mm; border: solid#000 1px"
                v-if="!config.noPrice"
              >
                金额/￥
              </td>
              <td rowspan="2" style="width: 10mm; font-size: 3mm; border: solid#000 1px">
                积分
              </td>
            </tr>
            <tr>
              <td
                :key="`briefs-key-${key}`"
                v-for="(item, key) in specSizeSocks"
                style="font-size: 3mm; border: solid#000 1px"
              >
                {{ item.s || item }}
              </td>
            </tr>
            <tr :key="key" v-for="(item, key) in _getColList('gift', 'socks')">
              <td
                :rowspan="item.rowSize"
                colspan="2"
                style="height: 10mm; font-size: 3mm; border: solid#000 1px"
                v-if="item.rowSize"
              >
                {{ item.goods.name }}
              </td>
              <td
                placeholder
                colspan="2"
                style="padding: 2mm 0; font-size: 3mm; border: solid#000 1px"
              >
                {{ item.goodsItems.name }}
              </td>
              <td placeholder style="font-size: 3mm; border: solid#000 1px">
                {{ item.specColorStr }}
              </td>
              <td
                :key="`socks-key-${key1}`"
                v-for="(item1, key1) in specSizeSocks"
                style="font-size: 3mm; border: solid#000 1px"
              >
                {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
              </td>
              <td placeholder style="font-size: 3mm; border: solid#000 1px">
                {{ _getSpecQuantity(item, [item.specColorStr]) }}
              </td>
              <td
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
                v-if="!config.noPrice"
              >
                0
              </td>
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
                v-if="item.rowSize"
              >
                {{ item.rowQ }}
              </td>
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
                v-if="!config.noPrice && item.rowSize"
              >
                0
              </td>
              <td
                :rowspan="item.rowSize"
                v-if="item.rowSize"
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
              >
                0
              </td>
            </tr>
            <tr>
              <td
                :colspan="specSizeSocks.length + (!config.noPrice ? 7 : 8)"
                style="text-align: left; font-size: 3mm; border: solid#000 1px"
              >
                合 计:
              </td>
              <td style="font-size: 3mm; border: solid#000 1px">
                {{
                  _getColList("gift", "socks").reduce((p, c) => {
                    return (
                      p +
                      c.pgiList.reduce((p1, c1) => {
                        return p1 + c1.quantity;
                      }, 0)
                    );
                  }, 0)
                }}
              </td>
              <td style="font-size: 3mm; border: solid#000 1px" v-if="!config.noPrice">
                0
              </td>
              <td style="font-size: 3mm; border: solid#000 1px">0</td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="_getColList('gift', 'socks').length"
          cellspacing="0"
          cellpadding="0"
          style="
            text-align: center;
            table-layout: fixed;
            width: 200mm;
            margin-top: 5mm;
            border-collapse: collapse;
            border: none;
          "
        >
          <tbody>
            <tr>
              <td
                :colspan="config.noPrice ? 25 : 26"
                style="
                  text-align: left;
                  padding-left: 5px;
                  font-size: 3mm;
                  border: solid#000 1px;
                "
              >
                总计:
              </td>
              <td style="font-size: 3mm; border: solid#000 1px">
                {{
                  _getColList("gift").reduce((p, c) => {
                    return p + c.pgiList.reduce((p1, c1) => p1 + c1.quantity, 0);
                  }, 0) +
                  _getColList("gift", "socks").reduce((p, c) => {
                    return p + c.pgiList.reduce((p1, c1) => p1 + c1.quantity, 0);
                  }, 0)
                }}
              </td>
              <td
                style="width: 15mm; font-size: 3mm; border: solid#000 1px"
                v-if="!config.noPrice"
              >
                0
              </td>
              <td style="width: 10mm; font-size: 3mm; border: solid#000 1px">0</td>
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
        v-if="_getColList('buy').length"
        cellspacing="0"
        cellpadding="0"
        style="
          text-align: center;
          table-layout: fixed;
          width: 200mm;
          border-collapse: collapse;
          border: none;
        "
      >
        <tbody>
          <tr>
            <td
              rowspan="2"
              colspan="2"
              style="width: 24mm; font-size: 3mm; border: solid#000 1px"
            >
              名称
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              款号
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              颜色
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              杯型
            </td>
            <td
              :colspan="specSizeBra.length"
              style="font-size: 3mm; border: solid#000 1px; border-right: 3px solid"
            >
              文胸
            </td>
            <td
              :colspan="specSizeBriefs.length"
              style="font-size: 3mm; border: solid#000 1px"
            >
              内裤
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">小计</td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">总数量</td>
            <template v-if="!config.noPrice">
              <td rowspan="2" style="width: 15mm; font-size: 3mm; border: solid#000 1px">
                金额/￥
              </td>
            </template>
            <td rowspan="2" style="width: 10mm; font-size: 3mm; border: solid#000 1px">
              积分
            </td>
          </tr>
          <tr>
            <td
              :key="`bra-key-${key}`"
              v-for="(item, key) in specSizeBra"
              style="font-size: 3mm; border: solid#000 1px"
              :style="key === specSizeBra.length - 1 ? 'border-right: 3px solid' : ''"
            >
              {{ item }}
            </td>
            <td
              :key="`briefs-key-${key}`"
              v-for="(item, key) in specSizeBriefs"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.s || item }}
            </td>
          </tr>
          <tr :key="key" v-for="(item, key) in _getColList('stockOut')">
            <td
              :rowspan="item.rowSize"
              colspan="2"
              style="height: 10mm; font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.goods.name }}
            </td>
            <td
              placeholder
              colspan="2"
              style="padding: 2mm 0; font-size: 3mm; border: solid#000 1px"
            >
              {{ item.goodsItems.name }}
            </td>
            <td placeholder colspan="2" style="font-size: 3mm; border: solid#000 1px">
              {{ item.specColorStr }}
            </td>
            <td placeholder colspan="2">{{ item.specSizeSubStr }}</td>
            <td
              :key="`bra-key-${key1}`"
              v-for="(item1, key1) in specSizeBra"
              style="font-size: 3mm; border: solid#000 1px"
              :style="key1 === specSizeBra.length - 1 ? 'border-right: 3px solid' : ''"
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
              v-for="(item1, key1) in specSizeBriefs"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ _getSpecQuantity(item, [item.specColorStr, item1], "stockOut") }}
            </td>
            <td placeholder style="font-size: 3mm; border: solid#000 1px">
              {{ _getSpecQuantity(item, [item.specColorStr], "stockOut") }}
            </td>
            <td
              :rowspan="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.rowQ }}
            </td>
            <template v-if="!config.noPrice">
              <td rowspan="1" placeholder style="font-size: 3mm; border: solid#000 1px">
                {{ item.rowA | amountFormat }}
              </td>
            </template>
            <td
              :rowspan="item.rowSize"
              v-if="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.rowI | amountFormat }}
            </td>
          </tr>
          <tr>
            <td
              :colspan="config.noPrice ? 23 : 24"
              style="text-align: left; font-size: 3mm; border: solid#000 1px"
            >
              合 计:
            </td>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("stockOut").reduce((p, c) => {
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
              <td style="border: solid#000 1px"></td>
              <td style="font-size: 3mm; border: solid#000 1px">
                {{
                  _adjustAmount(
                    _getColList("stockOut").reduce((p, c) => {
                      return p.concat(
                        c.pgiList.map((i) => ({
                          gi: i.goodsItems,
                          q: i._raw.quantityHasStockOut,
                          pgi: i,
                        }))
                      );
                    }, [])
                  ) | amountFormat
                }}
              </td>
            </template>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("stockOut").reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return (
                        p1 +
                        c1._raw.quantityHasStockOut *
                          (c1.integralGiveDividend / c1.integralGiveDivisor)
                      );
                    }, 0)
                  );
                }, 0) | amountFormat
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="_getColList('buy', 'socks').length"
        cellspacing="0"
        cellpadding="0"
        style="
          text-align: center;
          table-layout: fixed;
          width: 200mm;
          margin-top: 5mm;
          border-collapse: collapse;
          border: none;
        "
      >
        <tbody>
          <tr>
            <td
              rowspan="2"
              colspan="2"
              style="width: 24mm; font-size: 3mm; border: solid#000 1px"
            >
              名称
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              款号
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">颜色</td>
            <td
              :colspan="specSizeSocks.length"
              style="font-size: 3mm; border: solid#000 1px"
            >
              袜套尺寸
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">小计</td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">总数量</td>
            <template v-if="!config.noPrice">
              <td rowspan="2" style="width: 15mm; font-size: 3mm; border: solid#000 1px">
                金额/￥
              </td>
            </template>
            <td rowspan="2" style="width: 10mm; font-size: 3mm; border: solid#000 1px">
              积分
            </td>
          </tr>
          <tr>
            <td
              :key="`briefs-key-${key}`"
              v-for="(item, key) in specSizeSocks"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.s || item }}
            </td>
          </tr>
          <tr :key="key" v-for="(item, key) in _getColList('stockOut', 'socks')">
            <td
              :rowspan="item.rowSize"
              colspan="2"
              style="height: 10mm; font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.goods.name }}
            </td>
            <td
              placeholder
              colspan="2"
              style="padding: 2mm 0; font-size: 3mm; border: solid#000 1px"
            >
              {{ item.goodsItems.name }}
            </td>
            <td placeholder style="font-size: 3mm; border: solid#000 1px">
              {{ item.specColorStr }}
            </td>
            <td
              :key="`socks-key-${key1}`"
              v-for="(item1, key1) in specSizeSocks"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
            </td>
            <td placeholder style="font-size: 3mm; border: solid#000 1px">
              {{ _getSpecQuantity(item, [item.specColorStr]) }}
            </td>
            <td
              :rowspan="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.rowQ }}
            </td>
            <template v-if="!config.noPrice">
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
                v-if="item.rowSize"
              >
                {{ item.rowA | amountFormat }}
              </td>
            </template>
            <td
              :rowspan="item.rowSize"
              v-if="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.rowI | amountFormat }}
            </td>
          </tr>
          <tr>
            <td
              :colspan="specSizeSocks.length + (config.noPrice ? 4 : 5)"
              style="text-align: left; font-size: 3mm; border: solid#000 1px"
            >
              合 计:
            </td>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("stockOut", "socks").reduce((p, c) => {
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
              <td style="border: solid#000 1px"></td>
              <td style="font-size: 3mm; border: solid#000 1px">
                {{
                  _adjustAmount(
                    _getColList("stockOut", "socks").reduce((p, c) => {
                      return p.concat(
                        c.pgiList.map((i) => ({
                          gi: i.goodsItems,
                          q: i.quantity,
                          pgi: i,
                        }))
                      );
                    }, [])
                  ) | amountFormat
                }}
              </td>
            </template>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("stockOut", "socks").reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return (
                        p1 +
                        c1.quantity * (c1.integralGiveDividend / c1.integralGiveDivisor)
                      );
                    }, 0)
                  );
                }, 0) | amountFormat
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="_getColList('stockOut', 'socks').length"
        cellspacing="0"
        cellpadding="0"
        style="
          text-align: center;
          table-layout: fixed;
          width: 200mm;
          margin-top: 5mm;
          border-collapse: collapse;
          border: none;
        "
      >
        <tbody>
          <tr>
            <td
              :colspan="config.noPrice ? 25 : 26"
              style="
                text-align: left;
                padding-left: 5px;
                font-size: 3mm;
                border: solid#000 1px;
              "
            >
              总计:
            </td>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("stockOut").reduce((p, c) => {
                  return p + c.pgiList.reduce((p1, c1) => p1 + c1.quantity, 0);
                }, 0) +
                _getColList("stockOut", "socks").reduce((p, c) => {
                  return p + c.pgiList.reduce((p1, c1) => p1 + c1.quantity, 0);
                }, 0)
              }}
            </td>
            <template v-if="!config.noPrice">
              <td style="width: 15mm; font-size: 3mm; border: solid#000 1px">
                {{
                  (_adjustAmount(
                    _getColList("stockOut").reduce((p, c) => {
                      return p.concat(
                        c.pgiList.map((i) => ({
                          gi: i.goodsItems,
                          q: i.quantity,
                          pgi: i,
                        }))
                      );
                    }, [])
                  ) +
                    _adjustAmount(
                      _getColList("stockOut", "socks").reduce((p, c) => {
                        return p.concat(
                          c.pgiList.map((i) => ({
                            gi: i.goodsItems,
                            q: i.quantity,
                            pgi: i,
                          }))
                        );
                      }, [])
                    ))
                    | amountFormat
                }}
              </td>
            </template>
            <td style="width: 10mm; font-size: 3mm; border: solid#000 1px">
              {{
                (_getColList("stockOut").reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return (
                        p1 +
                        c1.quantity * (c1.integralGiveDividend / c1.integralGiveDivisor)
                      );
                    }, 0)
                  );
                }, 0) +
                  _getColList("stockOut", "socks").reduce((p, c) => {
                    return (
                      p +
                      c.pgiList.reduce((p1, c1) => {
                        return (
                          p1 +
                          c1.quantity * (c1.integralGiveDividend / c1.integralGiveDivisor)
                        );
                      }, 0)
                    );
                  }, 0))
                  | amountFormat
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <h2 style="width: 200mm; text-align: center; margin-top: 10mm">
        <strong>未出库单</strong>
      </h2>
      <table
        v-if="_getColList('buy').length"
        cellspacing="0"
        cellpadding="0"
        style="
          text-align: center;
          table-layout: fixed;
          width: 200mm;
          border-collapse: collapse;
          border: none;
        "
      >
        <tbody>
          <tr>
            <td
              rowspan="2"
              colspan="2"
              style="width: 24mm; font-size: 3mm; border: solid#000 1px"
            >
              名称
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              款号
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              颜色
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              杯型
            </td>
            <td
              :colspan="specSizeBra.length"
              style="font-size: 3mm; border: solid#000 1px; border-right: 3px solid"
            >
              文胸
            </td>
            <td
              :colspan="specSizeBriefs.length"
              style="font-size: 3mm; border: solid#000 1px"
            >
              内裤
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">小计</td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">总数量</td>
            <template v-if="!config.noPrice">
              <td rowspan="2" style="width: 15mm; font-size: 3mm; border: solid#000 1px">
                金额/￥
              </td>
            </template>
            <td rowspan="2" style="width: 10mm; font-size: 3mm; border: solid#000 1px">
              积分
            </td>
          </tr>
          <tr>
            <td
              :key="`bra-key-${key}`"
              v-for="(item, key) in specSizeBra"
              style="font-size: 3mm; border: solid#000 1px"
              :style="key === specSizeBra.length - 1 ? 'border-right: 3px solid' : ''"
            >
              {{ item }}
            </td>
            <td
              :key="`briefs-key-${key}`"
              v-for="(item, key) in specSizeBriefs"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.s || item }}
            </td>
          </tr>
          <tr :key="key" v-for="(item, key) in _getColList('unStockOut')">
            <td
              :rowspan="item.rowSize"
              colspan="2"
              style="height: 10mm; font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.goods.name }}
            </td>
            <td
              placeholder
              colspan="2"
              style="padding: 2mm 0; font-size: 3mm; border: solid#000 1px"
            >
              {{ item.goodsItems.name }}
            </td>
            <td placeholder colspan="2" style="font-size: 3mm; border: solid#000 1px">
              {{ item.specColorStr }}
            </td>
            <td placeholder colspan="2" style="font-size: 3mm; border: solid#000 1px">
              {{ item.specSizeSubStr }}
            </td>
            <td
              :key="`bra-key-${key1}`"
              v-for="(item1, key1) in specSizeBra"
              style="font-size: 3mm; border: solid#000 1px"
              :style="key1 === specSizeBra.length - 1 ? 'border-right: 3px solid' : ''"
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
              v-for="(item1, key1) in specSizeBriefs"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ _getSpecQuantity(item, [item.specColorStr, item1], "unStockOut") }}
            </td>
            <td placeholder style="font-size: 3mm; border: solid#000 1px">
              {{ _getSpecQuantity(item, [item.specColorStr], "unStockOut") }}
            </td>
            <td
              :rowspan="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.rowQ }}
            </td>
            <template v-if="!config.noPrice">
              <td rowspan="1" placeholder style="font-size: 3mm; border: solid#000 1px">
                {{ item.rowA | amountFormat }}
              </td>
            </template>
            <td
              :rowspan="item.rowSize"
              v-if="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.rowI | amountFormat }}
            </td>
          </tr>
          <tr>
            <td
              :colspan="config.noPrice ? 23 : 24"
              style="text-align: left; font-size: 3mm; border: solid#000 1px"
            >
              合 计:
            </td>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("unStockOut").reduce((p, c) => {
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
              <td style="border: solid#000 1px"></td>
              <td style="font-size: 3mm; border: solid#000 1px">
                {{
                  _adjustAmount(
                    _getColList("unStockOut").reduce((p, c) => {
                      return p.concat(
                        c.pgiList.map((i) => ({
                          gi: i.goodsItems,
                          q: i._raw.quantity - i._raw.quantityHasStockOut,
                          pgi: i,
                        }))
                      );
                    }, [])
                  ) | amountFormat
                }}
              </td>
            </template>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("unStockOut").reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return (
                        p1 +
                        (c1._raw.quantity - c1._raw.quantityHasStockOut) *
                          (c1.integralGiveDividend / c1.integralGiveDivisor)
                      );
                    }, 0)
                  );
                }, 0) | amountFormat
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="_getColList('buy', 'socks').length"
        cellspacing="0"
        cellpadding="0"
        style="
          text-align: center;
          table-layout: fixed;
          width: 200mm;
          margin-top: 5mm;
          border-collapse: collapse;
          border: none;
        "
      >
        <tbody>
          <tr>
            <td
              rowspan="2"
              colspan="2"
              style="width: 24mm; font-size: 3mm; border: solid#000 1px"
            >
              名称
            </td>
            <td rowspan="2" colspan="2" style="font-size: 3mm; border: solid#000 1px">
              款号
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">颜色</td>
            <td
              :colspan="specSizeSocks.length"
              style="font-size: 3mm; border: solid#000 1px"
            >
              袜套尺寸
            </td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">小计</td>
            <td rowspan="2" style="font-size: 3mm; border: solid#000 1px">总数量</td>
            <template v-if="!config.noPrice">
              <td rowspan="2" style="width: 15mm; font-size: 3mm; border: solid#000 1px">
                金额/￥
              </td>
            </template>
            <td rowspan="2" style="width: 10mm; font-size: 3mm; border: solid#000 1px">
              积分
            </td>
          </tr>
          <tr>
            <td
              :key="`briefs-key-${key}`"
              v-for="(item, key) in specSizeSocks"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.s || item }}
            </td>
          </tr>
          <tr :key="key" v-for="(item, key) in _getColList('unStockOut', 'socks')">
            <td
              :rowspan="item.rowSize"
              colspan="2"
              style="height: 10mm; font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.goods.name }}
            </td>
            <td
              placeholder
              colspan="2"
              style="padding: 2mm 0; font-size: 3mm; border: solid#000 1px"
            >
              {{ item.goodsItems.name }}
            </td>
            <td placeholder style="font-size: 3mm; border: solid#000 1px">
              {{ item.specColorStr }}
            </td>
            <td
              :key="`socks-key-${key1}`"
              v-for="(item1, key1) in specSizeSocks"
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
            </td>
            <td placeholder style="font-size: 3mm; border: solid#000 1px">
              {{ _getSpecQuantity(item, [item.specColorStr]) }}
            </td>
            <td
              :rowspan="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
              v-if="item.rowSize"
            >
              {{ item.rowQ }}
            </td>
            <template v-if="!config.noPrice">
              <td
                :rowspan="item.rowSize"
                placeholder
                style="font-size: 3mm; border: solid#000 1px"
                v-if="item.rowSize"
              >
                {{ item.rowA | amountFormat }}
              </td>
            </template>
            <td
              :rowspan="item.rowSize"
              v-if="item.rowSize"
              placeholder
              style="font-size: 3mm; border: solid#000 1px"
            >
              {{ item.rowI | amountFormat }}
            </td>
          </tr>
          <tr>
            <td
              :colspan="specSizeSocks.length + (config.noPrice ? 2 : 3)"
              style="text-align: left; font-size: 3mm; border: solid#000 1px"
            >
              合 计:
            </td>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("unStockOut", "socks").reduce((p, c) => {
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
              <td style="border: solid#000 1px"></td>
              <td style="font-size: 3mm; border: solid#000 1px">
                {{
                  _adjustAmount(
                    _getColList("unStockOut", "socks").reduce((p, c) => {
                      return p.concat(
                        c.pgiList.map((i) => ({
                          gi: i.goodsItems,
                          q: i.quantity,
                          pgi: i,
                        }))
                      );
                    }, [])
                  ) | amountFormat
                }}
              </td>
            </template>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("unStockOut", "socks").reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return (
                        p1 +
                        c1.quantity * (c1.integralGiveDividend / c1.integralGiveDivisor)
                      );
                    }, 0)
                  );
                }, 0) | amountFormat
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="_getColList('unStockOut', 'socks').length"
        cellspacing="0"
        cellpadding="0"
        style="
          text-align: center;
          table-layout: fixed;
          width: 200mm;
          margin-top: 5mm;
          border-collapse: collapse;
          border: none;
        "
      >
        <tbody>
          <tr>
            <td
              :colspan="config.noPrice ? 25 : 26"
              style="
                text-align: left;
                padding-left: 5px;
                font-size: 3mm;
                border: solid#000 1px;
              "
            >
              总计:
            </td>
            <td style="font-size: 3mm; border: solid#000 1px">
              {{
                _getColList("unStockOut").reduce((p, c) => {
                  return p + c.pgiList.reduce((p1, c1) => p1 + c1.quantity, 0);
                }, 0) +
                _getColList("unStockOut", "socks").reduce((p, c) => {
                  return p + c.pgiList.reduce((p1, c1) => p1 + c1.quantity, 0);
                }, 0)
              }}
            </td>
            <template v-if="!config.noPrice">
              <td style="width: 15mm; font-size: 3mm; border: solid#000 1px">
                {{
                  (_adjustAmount(
                    _getColList("unStockOut").reduce((p, c) => {
                      return p.concat(
                        c.pgiList.map((i) => ({
                          gi: i.goodsItems,
                          q: i.quantity,
                          pgi: i,
                        }))
                      );
                    }, [])
                  ) +
                    _adjustAmount(
                      _getColList("unStockOut", "socks").reduce((p, c) => {
                        return p.concat(
                          c.pgiList.map((i) => ({
                            gi: i.goodsItems,
                            q: i.quantity,
                            pgi: i,
                          }))
                        );
                      }, [])
                    ))
                    | amountFormat
                }}
              </td>
            </template>
            <td style="width: 10mm; font-size: 3mm; border: solid#000 1px">
              {{
                (_getColList("unStockOut").reduce((p, c) => {
                  return (
                    p +
                    c.pgiList.reduce((p1, c1) => {
                      return (
                        p1 +
                        c1.quantity * (c1.integralGiveDividend / c1.integralGiveDivisor)
                      );
                    }, 0)
                  );
                }, 0) +
                  _getColList("unStockOut", "socks").reduce((p, c) => {
                    return (
                      p +
                      c.pgiList.reduce((p1, c1) => {
                        return (
                          p1 +
                          c1.quantity * (c1.integralGiveDividend / c1.integralGiveDivisor)
                        );
                      }, 0)
                    );
                  }, 0))
                  | amountFormat
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <table
      cellspacing="0"
      cellpadding="0"
      style="
        table-layout: fixed;
        min-width: 200mm;
        margin-top: 10mm;
        border-collapse: collapse;
        border: none;
      "
    >
      <tbody>
        <tr v-if="[1, 6, 7].includes($_.get(purchanse, '_raw.status')) && !forceStatus">
          <td
            style="
              text-align: left;
              width: 40mm;
              height: 10mm;
              font-size: 3mm;
              white-space: wrap;
              border: solid#000 1px;
            "
          >
            转存组合：{{
              transferObj.goodsSeriesNumBoList
                ? transferObj.goodsSeriesNumBoList
                    .map(
                      (i) =>
                        `${$_.get(i, "goodsSeries.name") || i.goodsSeriesName}:${
                          i.quantity
                        }`
                    )
                    .join("/")
                : "--"
            }}
          </td>
          <td
            nowrap="nowrap"
            style="
              text-align: left;
              width: 40mm;
              font-size: 3mm;
              white-space: wrap;
              border: solid#000 1px;
            "
          >
            转存余额：{{ transferObj.amount | amountFormat }}
          </td>
          <td
            nowrap="nowrap"
            scope="col"
            style="text-align: left; border: solid#000 1px"
          ></td>
          <td
            nowrap="nowrap"
            scope="col"
            style="text-align: left; border: solid#000 1px"
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
              <td
                style="
                  text-align: left;
                  height: 8mm;
                  font-size: 3mm;
                  border: solid#000 1px;
                "
              >
                订单金额：￥{{ $_.get(purchanse, "amount") | amountFormat }}
              </td>
              <td style="text-align: left; font-size: 3mm; border: solid#000 1px">
                实际应付金额：￥{{ amountActualShouldPay | amountFormat }}
              </td>
              <td
                colspan="2"
                style="text-align: left; font-size: 3mm; border: solid#000 1px"
              ></td>
            </tr>
            <tr>
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
                  $_.get(purchanse, "_raw.paymentBalanceAmount") | amountFormat
                }}
              </td>
              <td style="text-align: left; font-size: 3mm; border: solid#000 1px">
                组合支付：{{
                  $_.get(purchanse, "_raw.paymentGoodsSeriesPrestoreJson")
                    ? JSON.parse($_.get(purchanse, "_raw.paymentGoodsSeriesPrestoreJson"))
                        .map((i) => {
                          return `${i.goodsSeries.name}:${i.quantity}`;
                        })
                        .join("/")
                    : "--"
                }}
              </td>
              <td style="text-align: left; font-size: 3mm; border: solid#000 1px"></td>
            </tr>
          </template>
          <tr>
            <td
              nowrap="nowrap"
              scope="col"
              style="
                text-align: left;
                height: 8mm;
                font-size: 3mm;
                border: solid#000 1px;
                white-space: pre;
              "
            >
              不包含此订单的积分：{{ purchanse._getBeforeAchieveStr(config.isAdd35, config.noPriceShowIntegral) }}
            </td>
            <td
              nowrap="nowrap"
              scope="col"
              style="
                text-align: left;
                font-size: 3mm;
                border: solid#000 1px;
                white-space: pre;
              "
            >
              包含此订单的积分：{{ purchanse._getAfterAchieveStr(config.isAdd35, config.noPriceShowIntegral) }}
            </td>
            <td
              scope="col"
              style="text-align: left; font-size: 3mm; border: solid#000 1px"
            >
              <template v-if="!config.noPrice"
                >不包含此订单的货款余额：￥{{
                  $_.get(purchanse, "balancePre.balance") | amountFormat
                }}</template
              >
            </td>
            <td
              scope="col"
              style="text-align: left; font-size: 3mm; border: solid#000 1px"
            >
              <template v-if="!config.noPrice"
                >包含此订单的货款余额：￥{{ balanceAfter | amountFormat }}</template
              >
            </td>
          </tr>
          <tr>
            <td
              style="
                text-align: left;
                width: 40mm;
                height: 10mm;
                font-size: 3mm;
                word-wrap: break-word;
                word-break: normal;
                border: solid#000 1px;
              "
            >
              不包含此订单的预存组合件数：{{
                $_.get(purchanse, "_raw.goodsSeriesPrestorePre")
                  ? JSON.parse($_.get(purchanse, "_raw.goodsSeriesPrestorePre"))
                      .map((i) => `${i.name}:${i.quantity}`)
                      .join(",")
                  : "--"
              }}
            </td>
            <td
              style="
                text-align: left;
                width: 40mm;
                font-size: 3mm;
                word-wrap: break-word;
                word-break: normal;
                border: solid#000 1px;
              "
            >
              包含此订单的预存组合件数：{{ goodsSeriesPrestoreAfterStr }}
            </td>
            <td
              nowrap="nowrap"
              scope="col"
              style="text-align: left; font-size: 3mm; border: solid#000 1px"
            >
              业绩时间：{{
               $_.get(purchanse, "_raw") | getAchieveTime
              }}
            </td>
            <td
              nowrap="nowrap"
              scope="col"
              style="text-align: left; border: solid#000 1px"
            >
              {{ achievePDistributorNickname }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <table
      cellspacing="0"
      cellpadding="0"
      style="table-layout: fixed; min-width: 200mm; margin-top: 10mm"
    >
      <tbody>
        <tr>
          <td
            nowrap="nowrap"
            scope="col"
            style="text-align: left; height: 8mm; font-size: 3mm"
          >
            制单人：{{ $_.get(purchanse, "_raw.documentMaker.nickname") }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm">
            制单人电话：{{ $_.get(purchanse, "_raw.documentMaker.mobile") }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm">
            客服主管：陈明珍
          </td>
          <td nowrap="nowrap" style="text-align: left; height: 8mm; font-size: 3mm">
            客服电话：13336473003
          </td>
        </tr>
        <tr>
          <td
            nowrap="nowrap"
            scope="col"
            colspan="3"
            style="text-align: left; font-size: 3mm"
          >
            出货单位：{{ $_.get(purchanse, "_raw.axqSelfEmployedLaborer.name") }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left; font-size: 3mm">
            傲雪棋平台服务电话：400-8953068
          </td>
        </tr>
        <tr>
          <td
            nowrap="nowrap"
            scope="col"
            colspan="4"
            style="text-align: left; height: 8mm; font-size: 3mm"
          >
            如收到货后有质量问题，或数量差异，请在收到货24小时内提出，否则视为无异议正常收货
          </td>
        </tr>
        <tr>
          <td
            nowrap="nowrap"
            scope="col"
            colspan="4"
            style="text-align: left; height: 8mm; font-size: 3mm"
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
        text-align: center;
        border-top: 1px dashed red;
        border-bottom: 1px dashed red;
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
      specSizeBriefs: [
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
      specSizeSocks: [
        {
          v: ["28"],
          s: "28",
        },
        {
          v: ["29"],
          s: "29",
        },
        {
          v: ["30"],
          s: "30",
        },
        {
          v: ["31"],
          s: "31",
        },
        {
          v: ["32"],
          s: "32",
        },
        {
          v: ["33"],
          s: "33",
        },
        {
          v: ["34"],
          s: "34",
        },
        {
          v: ["35"],
          s: "35",
        },
        {
          v: ["36"],
          s: "36",
        },
        {
          v: ["37"],
          s: "37",
        },
        {
          v: ["38"],
          s: "38",
        },
        {
          v: ["39"],
          s: "39",
        },
        {
          v: ["40"],
          s: "40",
        },
        {
          v: ["41"],
          s: "41",
        },
        {
          v: ["42"],
          s: "42",
        },
        {
          v: ["43"],
          s: "43",
        },
        {
          v: ["44"],
          s: "44",
        },
        {
          v: ["45"],
          s: "45",
        },
        {
          v: ["46"],
          s: "46",
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
    amountActualShouldPay() {
      const am =
        $_.get(this.purchanse, "amount") -
        ($_.get(this.purchanse, "_raw.isNewDistributor") &&
        [1, 2].includes(
          $_.get(this.purchanse, "_raw.type") &&
            $_.get(this.purchanse, "integralAchieveGive") > 0
        )
          ? $_.get(this.purchanse, "paymentBalanceAmount") +
            $_.get(this.purchanse, "paymentGoodsSeriesPrestoreAmount") +
            35 * $_.get(this.purchanse, "integralAchieveGive")
          : $_.get(this.purchanse, "paymentBalanceAmount") +
            $_.get(this.purchanse, "paymentGoodsSeriesPrestoreAmount"));
      return am > 0 ? am : 0;
    },
    goodsSeriesPrestoreAfterStr() {
      return $_.get(this.purchanse, "_raw.goodsSeriesPrestorePre")
        ? JSON.parse($_.get(this.purchanse, "_raw.goodsSeriesPrestorePre"))
            .map((i) => {
              const tar = $_.find(
                JSON.parse($_.get(this.purchanse, "_raw.paymentGoodsSeriesPrestoreJson")),
                (x) => {
                  return x.goodsSeries.name === i.name;
                }
              );
              if (tar) {
                i._remain = i.quantity - tar.quantity;
                return i;
              }
              i._remain = i.quantity;
              return i;
            })
            .map((i) => {
              return `${i.name}:${i._remain}`;
            })
            .join(",")
        : "--";
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
        this.$_.get(this.purchanse, "_raw.amount") +
        ($_.get(this.purchanse, "_raw.isNewDistributor") &&
        [1, 2].includes(
          $_.get(this.purchanse, "_raw.type") &&
            $_.get(this.purchanse, "integralAchieveGive") > 0
        )
          ? 35 * $_.get(this.purchanse, "integralAchieveGive")
          : 0);
      return am > 0 ? am : 0;
    },
    transferObj() {
      const j = this.$_.get(this.purchanse, "_raw.transferBalanceGoodsSeriesJson");
      return j ? JSON.parse(j) : { goodsSeriesNumBoList: [], goodsItemsNumBoList: [] };
    },
    achievePDistributorNickname() {
      const nickname = this.$_.get(
        this.purchanse,
        "_raw.achievePDistributor.nickname",
        ""
      );
      return ((this.config.isAdd35 || this.config.noPriceShowIntegral) && nickname) ? `上级店主：${nickname}` : "";
    },
  },
  methods: {
    _hackAmountIntegral(o, type = 1) {
      if (type === 1) {
        return o.pgi.amountCostFinal || o.goodsItems.amountCostFinal;
      }
      if (type === 2) {
        return o.pgi.integralGiveDividend || o.goodsItems.integralGiveDividend;
      }
      if (type === 3) {
        return o.pgi.integralGiveDivisor || o.goodsItems.integralGiveDivisor;
      }
    },
    _adjustAmount(a) {
      let isAdd35PerIntegral = false;
      let l = [];
      let hack_l = [];
      a.forEach((i) => {
        if (i.gi.integralGiveDividend === 1 && i.gi.integralGiveDivisor === 3) {
          if (i.gi.amountCost > 25) {
            isAdd35PerIntegral = true;
          }
          hack_l.push(i);
          return;
        }
        const tar = this.$_.find(l, (x) => {
          return x.gi.id === i.gi.id;
        });
        if (tar) {
          tar.q = tar.q + i.q;
          return;
        }
        l.push({
          gi: i.gi,
          q: i.q,
          pgi: i.pgi,
        });
      });
      return (
        l.reduce(
          (p, c) =>
            p + this._hackAmountIntegral({ pgi: c.pgi, goodsItems: c.gi }, 1) * c.q,
          0
        ) +
        (hack_l.reduce((p, c) => p + c.q, 0) / 3) * (70 + (isAdd35PerIntegral ? 35 : 0))
      );
    },
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
    _getColList(type, subType = "") {
      let l = [];
      let allData = [];
      const { purchanseGoodsItemsList = [], purchanseGiftList } = this.purchanse;
      if (["buy", "stockOut", "unStockOut"].includes(type)) {
        allData = allData.concat(purchanseGoodsItemsList);
      } else if (["gift", "stockOut", "unStockOut"].includes(type)) {
        allData = allData.concat(purchanseGiftList);
      }
      allData
        .filter((x) => {
          const noRequireSocks =
            subType === "socks"
              ? ["10"].includes(x._raw.goodsItems.goods.categoryId)
              : !["10"].includes(x._raw.goodsItems.goods.categoryId);
          if (["buy", "gift"].includes(type)) {
            return noRequireSocks && true;
          } else if (type === "stockOut") {
            return noRequireSocks && x._raw.quantityHasStockOut > 0;
          } else if (type === "unStockOut") {
            return noRequireSocks && x._raw.quantity - x._raw.quantityHasStockOut > 0;
          }
        })
        .forEach((i) => {
          const specSizeSubStr =
            subType === "socks"
              ? 0
              : i.goodsItems.specSizeStr.indexOf("/") > -1
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
              this._hackAmountIntegral(x, 1) ===
                (i.amountCostFinal || i.goodsItems.amountCostFinal)
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
            pgi: i,
            pgiList: [i],
          });
        });
      l = this.$_.chain(l)
        .sortBy(["goods.id", "specColorStr", "specSizeSubStr"])
        .groupBy((x) => x.goods.id + this._hackAmountIntegral(x, 1))
        .flatMap((x) => Object.values(x))
        .value();
      l.forEach((i) => {
        const qKey = ["buy", "gift"].includes(type) ? "all" : type;
        const tar = this.$_.find(l, (x) => {
          return (
            x.rowSize &&
            x.goods.id === i.goods.id &&
            this._hackAmountIntegral(x, 1) === this._hackAmountIntegral(i, 1)
          );
        });
        if (tar) {
          tar.rowSize++;
          tar.rowQ = tar.rowQ + this._getSpecQuantity(i, [i.specColorStr], qKey);
          tar.rowA =
            tar.rowA +
            this._adjustAmount([
              {
                q: this._getSpecQuantity(i, [i.specColorStr], qKey),
                gi: i.goodsItems,
                pgi: i.pgi,
              },
            ]);
          tar.rowI =
            tar.rowI +
            this._getSpecQuantity(i, [i.specColorStr], qKey) *
              (this._hackAmountIntegral(i, 2) / this._hackAmountIntegral(i, 3));
          return;
        }
        i.rowSize = 1;
        i.rowQ = this._getSpecQuantity(i, [i.specColorStr], qKey);
        i.rowA = this._adjustAmount([
          {
            q: this._getSpecQuantity(i, [i.specColorStr], qKey),
            gi: i.goodsItems,
            pgi: i.pgi,
          },
        ]);
        i.rowI =
          this._getSpecQuantity(i, [i.specColorStr], qKey) *
          (this._hackAmountIntegral(i, 2) / this._hackAmountIntegral(i, 3));
      });
      return l;
    },
  },
};
</script>
