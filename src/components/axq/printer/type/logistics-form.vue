<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-14 15:37:49
 * @LastEditTime: 2021-10-29 09:32:10
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/printer/type/logistics-form.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="logistics-form">
    <logistics-form-mail
      :key="key"
      :type="stockOut.type"
      :logistics-form="$_.get(stockOut, 'logisticsForm', {})"
      :logistics-form-mail="item"
      :revert-form="$_.get(stockOut, 'revertForm', {})"
      :purchanse="$_.get(stockOut, 'purchanse', {})"
      v-for="(item, key) in $_.get(stockOut, 'logisticsForm.logisticsFormMailList') || []"
    ></logistics-form-mail>
  </div>
</template>

<script>
import logisticsFormMail from './@fragment/logistics-form-mail';

import { model } from '@/model';

const { StockOut } = model.collection;

export default {
  components: {
    logisticsFormMail
  },
  props: ['id', 'autoPrint'],
  data () {
    return {
      stockOut: {}
    };
  },
  methods: {
    getStockOut () {
      StockOut.sendApi('stockOutInfo', {
        params: {},
        data: { query: { id: this.id || -1 } }
      }).then((res) => {
        const { status, data } = res;
        if (status) {
          this.stockOut = data;
          if (this.autoPrint) {
            setTimeout(() => {
              this.$emit('ok');
            }, 2000);
            return;
          }
          if (!this.$_.get(this.stockOut, 'logisticsForm.logisticsFormMailList.length')) {
            this.$message.error('德班物流单同步失败，请联系‘技术部’');
            return;
          }
          const h = this.$createElement;
          this.$msgbox({
            title: '消息',
            message: h('div', null, [
              h('p', { style: 'color: teal' }, '是否打印当前出库单物流信息？')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '打印机加载中...';
                setTimeout(() => {
                  done();
                  setTimeout(() => {
                    this.$emit('ok');
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, 1000);
              } else {
                done();
              }
            }
          });
        } else {
          this.$message({
            message: '获取出库单信息失败',
            type: 'error'
          });
        }
      });
    }
  },
  created () {
    this.getStockOut();
  }
};
</script>

<style lang="less">
.logistics-form {
  &_dop {
  }
}
</style>
