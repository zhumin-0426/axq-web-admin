<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-17 17:36:35
 * @LastEditTime: 2021-11-08 10:17:02
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/printer/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->

<template>
  <div class="print-tool">
    <purchanse
      :id="params.purchanseId"
      :force-status="params.forceStatus"
      :auto-print="autoPrint"
      @ok="$emit('ok')"
      v-if="type === 1"
    ></purchanse>
    <logistics-form
      :id="params.stockOutId"
      :auto-print="autoPrint"
      v-if="type === 2"
      @ok="$emit('ok')"
    ></logistics-form>
    <achieve-transfer
      :id="params.approvalId"
      :auto-print="autoPrint"
      v-if="type === 3"
      @ok="$emit('ok')"
    ></achieve-transfer>
    <revert-form
      :id="params.revertFormId"
      :auto-print="autoPrint"
      v-if="type === 4"
      @ok="$emit('ok')"
    ></revert-form>
  </div>
</template>

<script>
import purchanse from './type/purchanse';
import logisticsForm from './type/logistics-form';
import achieveTransfer from './type/achieve-transfer';
import revertForm from './type/revert-form';

export default {
  components: {
    purchanse,
    logisticsForm,
    achieveTransfer,
    revertForm
  },
  props: ['type', 'params', 'autoPrint']
};
</script>

<style lang="less">
@page {
  size: auto A4 landscape;
  margin: 3mm;
}
</style>
