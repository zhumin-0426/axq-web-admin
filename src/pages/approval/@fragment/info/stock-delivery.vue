<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-13 16:33:00
 * @LastEditTime: 2021-10-27 08:44:30
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/info/stock-delivery.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="info-stock-delivery">
    <div class="b-block">
      <div class="b-title">
        <span>异常送货单信息：</span>
      </div>
      <div class="b-box">
        <axq-goods-table
          ref="axqGoodsTableStockDeliveryGoodsItemsList"
          :type="5"
          :cell-config="{
                defaultValue: (v) => {
                  return {
                    _extra: {
                      disable: true
                    },
                  quantity: 0,
                  quantityHasStockIn: 0
                }
                }
              }"
        ></axq-goods-table>
      </div>
    </div>
  </div>
</template>

<script>
import axqGoodsTable from '@/components/axq/goods-table';
import { model } from '@/model';

const {
  StockDelivery
} = model.collection;

export default {
  components: {
    axqGoodsTable
  },
  props: {
    approval: {
      type: Object,
      default () {
        return {
          approvalWorkflowList: [],
          workflowId: -1
        };
      }
    }
  },
  methods: {
    init () {
      this.$nextTick(() => {
        const { stockDeliveryGoodsItemsList } = new StockDelivery(this.$_.get(this.approval, 'approvalSubUnusualStockDelivery.stockDelivery'));
        this.$nextTick(() => {
          stockDeliveryGoodsItemsList.forEach(i => {
            const { goodsItems } = i;
            this.$refs.axqGoodsTableStockDeliveryGoodsItemsList.setVal(goodsItems.goodsId, { goodsItemsId: goodsItems.id, value: { quantity: i.quantity, quantityHasStockIn: i.quantityHasStockIn } });
          });
        });
      });
    }
  },
  created () {
    this.init();
  }
};
</script>

<style lang="less">
.info-stock-delivery {
}
</style>
