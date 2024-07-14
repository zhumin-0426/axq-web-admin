<!--
 * @Author: 码上talk|RC
 * @Date: 2021-06-14 11:48:57
 * @LastEditTime: 2021-08-12 16:38:18
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/_test.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="_test">
    <el-button type="primary" @click.native="test">打印</el-button>
    <purchanse :id="59"></purchanse>
  </div>
</template>

<script>
import Printer from '@/components/axq/printer';
import purchanse from '@/components/axq/printer/type/purchanse';
import logisticsForm from '@/components/axq/printer/type/logistics-form';

export default {
  components: {
    purchanse,
    logisticsForm
  },
  data () {
    return {};
  },
  created () { },
  methods: {
    test () {
      new Printer(1).run(
        {
          autoPrint: true,
          width: '200mm',
          height: '100%',
          preview: true
        },
        { purchanseId: 59 }
      );
    }
  }
};
</script>
