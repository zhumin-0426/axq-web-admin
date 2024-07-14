<!--
 * @Author: your name
 * @Date: 2021-07-22 10:16:53
 * @LastEditTime: 2022-05-05 17:57:50
 * @LastEditors: 码上talk|RC
 * @Description: In User Settings Edit
 * @FilePath: /web-admin/src/components/axq/printer/type/revert-form.vue
-->
<template>
  <div class="revertForm-one">
    <h2 style="width: 1100px; text-align: center">
      <strong>傲雪棋调换货单</strong>
    </h2>
    <table cellspacing="0" cellpadding="0"
      style="font-size: 15px; margin-top: 20px; table-layout: fixed; min-width: 1100px">
      <tbody>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left">打印</td>
          <td nowrap="nowrap" scope="col" style="text-align: left">订单类型：新订单</td>
          <td nowrap="nowrap" scope="col" style="text-align: left">
            订单编号：{{ $_.get(revertForm, "_raw.sn") }}
          </td>
        </tr>
        <tr>
          <td nowrap="nowrap" height="18" title style="text-align: left">
            客户名称:
            {{
              $_.get(revertForm, "_raw.distributor.nickname")
                ? `${$_.get(revertForm, "_raw.distributor.nickname")}/${$_.get(
                    revertForm,
                    "_raw.distributor.id"
                  )}`
                : $_.get(revertForm, "_raw.recipient")
            }}
          </td>
          <td nowrap="nowrap" style="text-align: left">
            客户电话：{{
              $_.get(revertForm, "_raw.distributor.mobile") ||
              $_.get(revertForm, "_raw.recipientMobile")
            }}
          </td>
          <td nowrap="nowrap" style="text-align: left">
            审核日期: {{ $_.get(revertForm, "_raw.financialServiceApprovedTime") }}
          </td>
        </tr>
      </tbody>
    </table>
    <h2 style="width: 1100px; text-align: center">合格商品</h2>
    <table border cellspacing="0" cellpadding="0"
      style="margin-bottom:20px;min-width: 1100px;text-align: center; table-layout: fixed;">
      <tbody>
        <tr>
          <td rowspan="2" style="width: 24mm; font-size: 3mm; border: solid#000 1px">名称</td>
          <td rowspan="2">款号</td>
          <td rowspan="2">颜色</td>
          <td rowspan="2">杯型</td>
          <td :colspan="specSizeBra.length" style="width: 20px">文胸</td>
          <td :colspan="sepcSizeBriefs.length" style="width: 35px">内裤</td>
          <td rowspan="2">小计</td>
          <td rowspan="2">单价</td>
          <td rowspan="2">总数量</td>
          <td rowspan="2">金额</td>
          <td rowspan="2">积分</td>
        </tr>
        <tr>
          <td :key="`bra-key-${key}`" v-for="(item, key) in specSizeBra">{{ item }}</td>
          <td :key="`briefs-key-${key}`" v-for="(item, key) in sepcSizeBriefs">
            {{ item.s || item }}
          </td>
        </tr>
        <tr :key="key" v-for="(item, key) in _getColList(1)">
          <td :rowspan="item.rowSize" style="width: 120px; height: 40px" v-if="item.rowSize">
            {{ item.goods.name }}
          </td>
          <td placeholder style="padding:2mm 0;">{{ item.goodsItems.name }}</td>
          <td placeholder>{{ item.specColorStr }}</td>
          <td placeholder>{{ item.specSizeSubStr }}</td>
          <td :key="`bra-key-${key1}`" v-for="(item1, key1) in specSizeBra">
            {{ _getSpecQuantity(item, [item.specColorStr, item1 + item.specSizeSubStr]) }}
          </td>
          <td :key="`briefs-key-${key1}`" v-for="(item1, key1) in sepcSizeBriefs">
            {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
          </td>
          <td placeholder>{{ _getSpecQuantity(item, [item.specColorStr]) }}</td>
          <td placeholder>{{ item.goodsItems.amountCostFinal | amountFormat }}</td>
          <td rowspan="1" placeholder>
            {{ _getSpecQuantity(item, [item.specColorStr]) }}
          </td>
          <td :rowspan="item.rowSize" v-if="item.rowSize" placeholder>
            {{ item.rowA | amountFormat }}
          </td>
          <td :rowspan="item.rowSize" v-if="item.rowSize" placeholder>
            {{ item.rowI | amountFormat }}
          </td>
        </tr>
        <tr>
          <td colspan="21" style="text-align: left; padding-left: 5px">合 计:</td>
          <td>
            {{
              _getColList(1).reduce((p, c) => {
                return (
                  p +
                  c.rgiList.reduce((p1, c1) => {
                    return p1 + c1.quantity;
                  }, 0)
                );
              }, 0)
            }}
          </td>
          <td title="300">
            ￥{{
              _adjustAmount(
                _getColList(1).reduce((p, c) => {
                  return p.concat(
                    c.rgiList.map((i) => ({ gi: i.goodsItems, q: i.quantity }))
                  );
                }, [])
              ) | amountFormat
            }}
          </td>
          <td>
            {{
              _getColList(1).reduce((p, c) => {
                return (
                  p +
                  c.rgiList.reduce((p1, c1) => {
                    return (
                      p1 +
                      c1.quantity *
                        (c1.goodsItems._raw.integralGiveDividend /
                          c1.goodsItems._raw.integralGiveDivisor)
                    );
                  }, 0)
                );
              }, 0) | amountFormat
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <table border cellspacing="0" cellpadding="0"
      style="margin-bottom:20px;text-align: center; table-layout: fixed; min-width: 1100px">
      <tbody>
        <tr>
          <td rowspan="2" colspan="2">名称</td>
          <td rowspan="2" colspan="2">款号</td>
          <td rowspan="2">颜色</td>
          <td :colspan="specSizeSocks.length">袜套尺寸</td>
          <td rowspan="2">小计</td>
          <td rowspan="2">单价</td>
          <td rowspan="2">总数量</td>
          <td rowspan="2">金额</td>
          <td rowspan="2">积分</td>
        </tr>
        <tr>
          <td :key="`briefs-key-${key}`" v-for="(item, key) in specSizeSocks">
            {{ item.s || item }}
          </td>
        </tr>
        <tr :key="key" v-for="(item, key) in _getColList(1, 'socks')">
          <td :rowspan="item.rowSize" colspan="2" v-if="item.rowSize">
            {{ item.goods.name }}
          </td>
          <td placeholder colspan="2" style="padding:2mm 0;">
            {{ item.goodsItems.name }}
          </td>
          <td placeholder>
            {{ item.specColorStr }}
          </td>
          <td :key="`socks-key-${key1}`" v-for="(item1, key1) in specSizeSocks">
            {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
          </td>
          <td placeholder>
            {{ _getSpecQuantity(item, [item.specColorStr]) }}
          </td>
          <td placeholder>
            {{ item.goodsItems.amountCostFinal | amountFormat }}
          </td>
          <td :rowspan="item.rowSize" v-if="item.rowSize" placeholder>
            {{ item.rowQ }}
          </td>
          <td :rowspan="item.rowSize" v-if="item.rowSize" placeholder>
            {{ item.rowA | amountFormat }}
          </td>
          <td :rowspan="item.rowSize" v-if="item.rowSize" placeholder>
            {{ item.rowI | amountFormat }}
          </td>
        </tr>
        <tr>
          <td :colspan="specSizeSocks.length + 7" style="padding-left: 5px; text-align: left;">合 计:</td>
          <td>
            {{
              _getColList(1,'socks').reduce((p, c) => {
                return (
                  p +
                  c.rgiList.reduce((p1, c1) => {
                    return p1 + c1.quantity;
                  }, 0)
                );
              }, 0)
            }}
          </td>
          <td>
            ￥{{
              _adjustAmount(
                _getColList(1,'socks').reduce((p, c) => {
                  return p.concat(c.rgiList.map((i) => ({ gi: i.goodsItems, q: i.quantity })));
                }, [])
              ) | amountFormat
            }}
          </td>
          <td>
            {{
                _getColList(1, 'socks').reduce((p, c) => {
                  return (
                    p +
                    c.rgiList.reduce((p1, c1) => {
                      return (p1 + c1.quantity * (c1.goodsItems.integralGiveDividend / c1.goodsItems.integralGiveDivisor));
                    }, 0)
                  );
                }, 0) | amountFormat
              }}
          </td>
        </tr>
      </tbody>
    </table>
    <table v-if="_getColList(1,'socks').length" border cellspacing="0" cellpadding="0"
      style="text-align: center; table-layout: fixed; min-width: 1100px">
      <tbody>
        <tr>
          <td :colspan="specSizeSocks.length + 7" style="padding-left: 5px; text-align: left;">总 计:</td>
          <td style="width:25px;">
            {{
              _getColList(1).reduce((p, c) => {
              return ( p +c.rgiList.reduce((p1, c1) => p1 + c1.quantity, 0)
              )}, 0) +
              _getColList(1,'socks').reduce((p, c) => {
                return (p + c.rgiList.reduce((p1, c1) =>  p1 + c1.quantity, 0)
              )}, 0)
            }}
          </td>
          <td style="width:50px;">
            ￥{{
              _adjustAmount(_getColList(1).reduce((p, c) => {
                  return p.concat(c.rgiList.map((i) => ({ gi: i.goodsItems, q: i.quantity })));
                }, [])
              ) +
              _adjustAmount(_getColList(1,'socks').reduce((p, c) => {
                  return p.concat(c.rgiList.map((i) => ({ gi: i.goodsItems, q: i.quantity })));
                }, [])
              ) | amountFormat
            }}
          </td>
          <td style="width:25px;">
            {{
                _getColList(1).reduce((p, c) => {
                  return (p +c.rgiList.reduce((p1, c1) => {
                      return (p1 + c1.quantity * (c1.goodsItems.integralGiveDividend / c1.goodsItems.integralGiveDivisor));
                  }, 0));}, 0) +
                _getColList(1, 'socks').reduce((p, c) => {
                  return (
                    p +
                    c.rgiList.reduce((p1, c1) => {
                      return (p1 + c1.quantity * (c1.goodsItems.integralGiveDividend / c1.goodsItems.integralGiveDivisor));
                    }, 0)
                  );
                }, 0) | amountFormat
              }}
          </td>
        </tr>
      </tbody>
    </table>
    <h2 style="width: 1100px; text-align: center">不合格商品</h2>
    <table border cellspacing="0" cellpadding="0"
      style="margin-bottom:20px;text-align: center; table-layout: fixed; min-width: 1100px">
      <tbody>
        <tr>
          <td rowspan="2">名称</td>
          <td rowspan="2">款号</td>
          <td rowspan="2">颜色</td>
          <td rowspan="2">杯型</td>
          <td :colspan="specSizeBra.length" style="width: 20px">文胸</td>
          <td :colspan="sepcSizeBriefs.length" style="width: 35px">内裤</td>
          <td rowspan="2">小计</td>
          <td rowspan="2">总数量</td>
        </tr>
        <tr>
          <td :key="`bra-key-${key}`" v-for="(item, key) in specSizeBra">{{ item }}</td>
          <td :key="`briefs-key-${key}`" v-for="(item, key) in sepcSizeBriefs">
            {{ item.s || item }}
          </td>
        </tr>
        <tr :key="key" v-for="(item, key) in _getColList(2)">
          <td :rowspan="item.rowSize" style="width: 120px; height: 40px" v-if="item.rowSize">
            {{ item.goods.name }}
          </td>
          <td placeholder style="padding:2mm 0;">{{ item.goodsItems.name }}</td>
          <td placeholder>{{ item.specColorStr }}</td>
          <td placeholder>{{ item.specSizeSubStr }}</td>
          <td :key="`bra-key-${key1}`" v-for="(item1, key1) in specSizeBra">
            {{ _getSpecQuantity(item, [item.specColorStr, item1 + item.specSizeSubStr]) }}
          </td>
          <td :key="`briefs-key-${key1}`" v-for="(item1, key1) in sepcSizeBriefs">
            {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
          </td>
          <td placeholder>{{ _getSpecQuantity(item, [item.specColorStr]) }}</td>
          <td rowspan="1" placeholder>
            {{ _getSpecQuantity(item, [item.specColorStr]) }}
          </td>
        </tr>
        <tr>
          <td colspan="20" style="text-align: left; padding-left: 5px">合 计:</td>
          <td>
            {{
              _getColList(2).reduce((p, c) => {
                return (
                  p +
                  c.rgiList.reduce((p1, c1) => {
                    return p1 + c1.quantity;
                  }, 0)
                );
              }, 0)
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <table border cellspacing="0" cellpadding="0"
      style="margin-bottom:20px;text-align: center; table-layout: fixed; min-width: 1100px">
      <tbody>
        <tr>
          <td rowspan="2" colspan="2">名称</td>
          <td rowspan="2" colspan="2">款号</td>
          <td rowspan="2">颜色</td>
          <td :colspan="specSizeSocks.length">袜套尺寸</td>
          <td rowspan="2">小计</td>
          <td rowspan="2">总数量</td>
        </tr>
        <tr>
          <td :key="`briefs-key-${key}`" v-for="(item, key) in specSizeSocks">
            {{ item.s || item }}
          </td>
        </tr>
        <tr :key="key" v-for="(item, key) in _getColList(2, 'socks')">
          <td :rowspan="item.rowSize" colspan="2" v-if="item.rowSize">
            {{ item.goods.name }}
          </td>
          <td placeholder colspan="2" style="padding:2mm 0;">
            {{ item.goodsItems.name }}
          </td>
          <td placeholder>
            {{ item.specColorStr }}
          </td>
          <td :key="`socks-key-${key1}`" v-for="(item1, key1) in specSizeSocks">
            {{ _getSpecQuantity(item, [item.specColorStr, item1]) }}
          </td>
          <td placeholder>
            {{ _getSpecQuantity(item, [item.specColorStr]) }}
          </td>
          <td :rowspan="item.rowSize" v-if="item.rowSize" placeholder>
            {{ item.rowQ }}
          </td>
        </tr>
        <tr>
          <td :colspan="specSizeSocks.length + 6" style="padding-left: 5px; text-align: left;">合 计:</td>
          <td>
            {{
              _getColList(2,'socks').reduce((p, c) => {
                return (
                  p +
                  c.rgiList.reduce((p1, c1) => {
                    return p1 + c1.quantity;
                  }, 0)
                );
              }, 0)
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <table v-if="_getColList(2,'socks').length" border cellspacing="0" cellpadding="0"
      style="text-align: center; table-layout: fixed; min-width: 1100px">
       <tbody>
         <tr>
           <td :colspan="specSizeSocks.length + 7" style="padding-left: 5px; text-align: left;">总 计:</td>
           <td style="width:25px;">
             {{
              _getColList(2).reduce((p, c) => {
              return ( p +c.rgiList.reduce((p1, c1) => p1 + c1.quantity, 0)
              )}, 0) +
              _getColList(2,'socks').reduce((p, c) => {
                return (p + c.rgiList.reduce((p1, c1) =>  p1 + c1.quantity, 0)
              )}, 0)
            }}
           </td>
         </tr>
       </tbody>
    </table>
    <table border cellspacing="0" cellpadding="0"
      style="font-size: 15px; margin-top: 20px; table-layout: fixed; min-width: 1100px">
      <tbody>
        <tr>
          <td colspan="4" height="30" style="text-align: left">
            单位：{{ getPaymentStrFilter(revertForm._raw).join("/") }}
          </td>
        </tr>
        <tr>
          <td height="30" style="text-align: left">
            袋子费：￥{{ $_.get(revertForm, "_raw.amountPackage") | amountFormat }}
          </td>
          <td style="text-align: left; width: 350px; word-wrap: break-word;word-break: normal;">
            转存组合：{{
               transferObj.goodsSeriesNumBoList ?
              transferObj.goodsSeriesNumBoList
                .map((i) => `${i.goodsSeriesName}:${i.quantity}`)
                .join("/") : '--'
            }}
          </td>
          <td style="text-align: left" v-if="$_.get(revertForm, '_raw.ptType') === 1">
            转存余额：￥{{ transferObj.amount | amountFormat }}
          </td>
          <td style="text-align: left" v-if="$_.get(revertForm, '_raw.ptType') === 1">
            转存余额：￥{{ transferObj.amount | amountFormat }}
          </td>
          <td style="text-align: left" v-else>
            转存思雪余额：￥{{ transferObj.amount | amountFormat }}
          </td>
        </tr>
      </tbody>
    </table>
    <table cellspacing="0" cellpadding="0"
      style="font-size: 15px; margin-top: 20px; table-layout: fixed; min-width: 1100px">
      <tbody>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left; height: 40px">
            制单人：{{ $_.get(revertForm, "_raw.customerService.nickname") }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left">客服主管：陈明珍</td>
          <td nowrap="nowrap" scope="col" style="text-align: left">出货单位：傲雪棋</td>
        </tr>
        <tr>
          <td nowrap="nowrap" height="18" title style="text-align: left; height: 40px">
            客服电话：13336473003
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left" colspan="2">
            傲雪棋平台服务电话：400-8953068
          </td>
        </tr>
        <tr>
          <td nowrap="nowrap" scope="col" colspan="3" style="text-align: left; height: 40px">
            如收到货后有质量问题，请在收货后当天提出，否则视为无异议正常收货。
          </td>
        </tr>
        <tr>
          <td nowrap="nowrap" scope="col" colspan="3" style="text-align: left">
            收件人：{{ $_.get(revertForm, "_raw.recipient") }}，{{
              $_.get(revertForm, "_raw.recipientMobile")
            }}，{{ $_.get(revertForm, "_raw.fullAddress") }}
          </td>
        </tr>
        <tr>
          <td nowrap="nowrap" scope="col" colspan="3" style="text-align: left; height: 40px">
            快递方式：{{ $_.get(revertForm, "_raw.sysExpress.name", "未填写") }}
          </td>
        </tr>
      </tbody>
    </table>
    <div style="
        width: 1100px;
        text-align: center;
        border-top: 1px dashed red;
        border-bottom: 1px dashed red;
        margin-bottom: 20px;
        padding: 10px 0px;
      ">
      <p style="text-align: center">
        · · · · · · · · · · · 订单防伪码沿此线剪开 · · · · · · · · · · ·
      </p>
      <vue-qrcode :value="$_.get(revertForm, '_raw.sn') || ''" :width="200" />
      <p style="text-align: center">
        · · · · · · · · · · · 订单防伪码沿此线剪开 · · · · · · · · · · ·
      </p>
      <p style="text-align: left">备注：{{ $_.get(revertForm, "_raw.remark") }}</p>
    </div>
  </div>
</template>

<script>
  import VueQrcode from "vue-qrcode";
  import {
    model
  } from "@/model";

  const {
    RevertForm
  } = model.collection;

  export default {
    components: {
      VueQrcode,
    },
    props: ["id", "autoPrint"],
    data() {
      return {
        revertForm: new RevertForm(),
        specSizeBra: ["70", "75", "80", "85", "90", "95", "100", "105"],
        sepcSizeBriefs: [{
            v: ["58/S"],
            s: "58/S",
          },
          {
            v: ["64/M"],
            s: "64/M",
          },
          {
            v: ["70/L"],
            s: "70/L",
          },
          {
            v: ["76/XL"],
            s: "76/XL",
          },
          {
            v: ["82/XXL", "82/2XL"],
            s: "82/2XL",
          },
          {
            v: ["90/XXXL", "90/3XL"],
            s: "90/3XL",
          },
          {
            v: ["98/XXXXL", "98/4XL"],
            s: "98/4XL",
          },
        ],
        specSizeSocks: [{
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
        ]
      };
    },
    computed: {
      transferObj() {
        const j = this.$_.get(this.revertForm, "_raw.transferBalanceGoodsSeriesJson");
        return j ? JSON.parse(j) : {
          goodsSeriesNumBoList: [],
          goodsItemsNumBoList: []
        };
      },
    },
    methods: {
      _getColList(type, subType = "") {
        const {
          revertFormSortList = []
        } = this.revertForm;
        let l = [];
        revertFormSortList
          .filter((i) => {
            const noRequireSocks = (subType === 'socks' ?
              ["10"].includes(i.goodsItems._raw.goods.categoryId) :
              !["10"].includes(i.goodsItems._raw.goods.categoryId));
            return i.status === type && noRequireSocks
          })
          .forEach((i) => {
            const specSizeSubStr = subType === 'socks' ? 0 :
              i.goodsItems.specSizeStr.indexOf("/") > -1 ? "" :
              i.goodsItems.specSizeStr.slice(i.goodsItems.specSizeStr.length - 1, i.goodsItems.specSizeStr.length);
            const tar = $_.find(l, (x) => {
              return (
                x.goods.id === i.goodsItems._raw.goods.id &&
                x.specColorStr === i.goodsItems.specColorStr &&
                x.specSizeSubStr === specSizeSubStr &&
                x.goodsItems.amountCostFinal === i.goodsItems.amountCostFinal
              );
            });
            if (tar) {
              tar.rgiList.push(i);
              return;
            }
            l.push({
              goods: i.goodsItems._raw.goods,
              goodsItems: i.goodsItems,
              specColorStr: i.goodsItems.specColorStr,
              specSizeStr: i.goodsItems.specSizeStr,
              specSizeSubStr: specSizeSubStr,
              rgiList: [i],
            });
          });
        l = this.$_.chain(l)
        .sortBy(['goods.id','specColorStr','specSizeSubStr'])
        .groupBy(x => x.goods.id +
        x.goodsItems.amountCostFinal)
        .flatMap(x => Object.values(x))
        .value();
        l.forEach((i) => {
          const tar = this.$_.find(l, (x) => {
            return (
              x.rowSize &&
              x.goods.id === i.goods.id
            );
          });
          if (tar) {
            tar.rowSize++;
            tar.rowQ = tar.rowQ + this._getSpecQuantity(i, [i.specColorStr]);
            tar.rowA =
              tar.rowA +
              this._adjustAmount([{
                q: this._getSpecQuantity(i, [i.specColorStr]),
                gi: i.goodsItems
              }, ]);
            tar.rowI =
              tar.rowI +
              this._getSpecQuantity(i, [i.specColorStr]) *
              (i.goodsItems.integralGiveDividend / i.goodsItems.integralGiveDivisor);
            return;
          }
          i.rowSize = 1;
          i.rowQ = this._getSpecQuantity(i, [i.specColorStr]);
          i.rowA = this._adjustAmount([{
            q: this._getSpecQuantity(i, [i.specColorStr]),
            gi: i.goodsItems
          }, ]);
          i.rowI =
            this._getSpecQuantity(i, [i.specColorStr]) *
            (i.goodsItems.integralGiveDividend / i.goodsItems.integralGiveDivisor);
        });
        return l;
      },
      _adjustAmount(a) {
        let l = [];
        let hack_l = [];
        a.forEach((i) => {
          if (i.gi.integralGiveDividend === 1 && i.gi.integralGiveDivisor === 3) {
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
          });
        });
        return (
          l.reduce((p, c) => p + c.gi.amountCostFinal * c.q, 0) +
          (hack_l.reduce((p, c) => p + c.q, 0) / 3) * 70
        );
      },
      _getSpecQuantity(e, s) {
        const {
          rgiList
        } = e;
        let q = 0;
        for (let i = 0; i < rgiList.length; i++) {
          const {
            specJson
          } = rgiList[i].goodsItems;
          if (
            (specJson || []).filter((i) => {
              return s
                .reduce((p, c) => {
                  return p.concat(c.v ? c.v : [c]);
                }, [])
                .includes(i.value);
            }).length === s.length
          ) {
            q = q + Number($_.get(rgiList[i], "_raw.quantity"));
          }
        }
        return q || "";
      },
      getRevertForm() {
        RevertForm.sendApi("formInfo", {
          params: {},
          data: {
            query: {
              id: this.id || -1
            }
          },
        }).then((res) => {
          const {
            status,
            data
          } = res;
          if (status) {
            this.revertForm = new RevertForm(data);
            if (this.autoPrint) {
              setTimeout(() => {
                this.$emit("ok");
              }, 2000);
              return;
            }
            const h = this.$createElement;
            this.$msgbox({
              title: "消息",
              message: h("div", null, [
                h("p", {
                  style: "color: teal"
                }, "是否打印当前调换货单？"),
              ]),
              showCancelButton: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              beforeClose: (action, instance, done) => {
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = "打印机加载中...";
                  setTimeout(() => {
                    done();
                    setTimeout(() => {
                      this.$emit("ok");
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 1000);
                } else {
                  done();
                }
              },
            });
          } else {
            this.$message({
              message: "获取调换货单信息失败",
              type: "error",
            });
          }
        });
      }
    },
    created() {
      this.getRevertForm();
    }
  };
</script>