<!--
 * @Author: 码上talk|RC
 * @Date: 2021-08-31 16:39:53
 * @LastEditTime: 2021-10-29 09:32:40
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/components/axq/printer/type/@fragment/logistics-form-mail.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="logstic-form-mail" style="width: 70mm">
    <div style="border-bottom: 1px solid #000; height: 10mm; padding: 0 1mm">
      <div style="float: left; width: 30mm; height: 10mm"></div>
      <div style="float: left; width: 20mm">
        <div style="height: 5mm"></div>
        <div style="height: 5mm; text-align: center">
          <span>到付</span>
        </div>
      </div>
      <div
        style="
          float: left;
          width: 16mm;
          height: 10mm;
          text-align: center;
          white-space: wrap;
          overflow: hidden;
        "
      >
        <span style="line-height: 3mm">大件快递3.60</span>
      </div>
    </div>
    <div style="border-bottom: 1px solid #000; height: 12mm; padding: 0 1mm">
      <p style="text-align: center; font-size: 7mm; font-weight: 500">
        {{ $_.get(logisticsForm, "arrivedOrgSimpleName") || "##-##-##-M" }}
      </p>
    </div>
    <div style="border-bottom: 1px solid #000; height: 8mm; padding: 0 1mm">
      <span style="float: left">
        <span style="line-height: 8mm; font-size: 5mm"
          >【{{ $_.get(purchanse, "cityName") }}】</span
        >
      </span>
      <span style="float: right">
        <span style="line-height: 8mm; font-size: 5mm">1</span>
      </span>
    </div>
    <div style="border-bottom: 1px solid #000; height: 18mm; padding: 0 1mm">
      <div style="float: left; width: 5mm; height: 18mm">
        <img src="/image/revice.png" style="margin-top: 5mm; width: 100%" alt />
      </div>
      <div style="float: left; height: 18mm; margin-left: 2mm">
        <p style="margin: 0; height: 5mm; font-size: 3mm">
          {{ $_.get(logisticsForm, "recipient") }}
        </p>
        <p style="margin: 0; height: 5mm; font-size: 3mm">
          {{ $_.get(logisticsForm, "recipientMobile") }}
        </p>
        <p style="margin: 0; height: 8mm; font-size: 2.5mm">
          {{ $_.get(logisticsForm, "recipientAddress") }}
        </p>
      </div>
    </div>
    <div style="border-bottom: 1px solid #000; height: 10mm; padding: 0 1mm">
      <div
        style="float: left; width: 5mm; height: 10mm; line-height: 10mm; font-weight: 600"
      >
        <span style="font-size: 4mm">寄</span>
      </div>
      <div style="float: left; width: 60mm; height: 10mm; margin-left: 2mm">
        <p style="margin: 0; font-size: 3mm">雪琪 13336473003</p>
        <p style="margin: 0; font-size: 3mm">广东省 佛山市 南海区 盐步冯边大道2号2楼</p>
      </div>
    </div>
    <div style="border-bottom: 1px solid #000; padding: 0 1mm">
      <div style="height: 20mm; text-align: center; line-height: 20mm">
        <barcode
          :value="$_.get(logisticsFormMail, 'sn')"
          element-tag="img"
          width="1"
          height="25"
          font-size="25"
          font-options="bold"
          >Show this if the rendering fails.</barcode
        >
      </div>
      <div style="height: 3mm">
        <span style="float: right">已验视</span>
      </div>
    </div>
    <div style="border-bottom: 1px solid #000; height: 6mm; padding: 0 1mm"></div>
    <div style="height: 30mm; padding: 0 1mm">
      <p style="margin: 0">品名：内衣</p>
      <p style="margin: 0" v-if="type === 1">
        傲雪棋订单号：{{ $_.get(purchanse, "sn") }}
      </p>
      <p style="margin: 0" v-else>调换货单：{{ $_.get(revertForm, "sn") }}</p>
    </div>
  </div>
</template>

<script>
import VueBarcode from "vue-barcode";
export default {
  components: {
    barcode: VueBarcode,
  },
  props: ["type", "logisticsForm", "purchanse", "revertForm", "logisticsFormMail"],
};
</script>
