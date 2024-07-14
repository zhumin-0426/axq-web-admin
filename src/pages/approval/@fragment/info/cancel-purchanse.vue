<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-13 16:33:00
 * @LastEditTime: 2022-04-20 09:21:47
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/info/cancel-purchanse.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="info-cancel-purchanse">
    <div class="b-block">
      <div class="b-title">
        <span>未出库商品：</span>
      </div>
      <div class="b-box">
        <axq-goods-table ref="noStockOutTable" :type="1" :cell-config="{
            defaultValue: (v) => {
              return {
              quantity: 0
            }
            }
          }"></axq-goods-table>
      </div>
    </div>
    <div class="b-block">
      <div class="b-title">
        <span>已出库商品：</span>
      </div>
      <div class="b-box">
        <axq-goods-table
          ref="hasStockOutTable"
          :type="1"
          :cell-config="{
            defaultValue: (v) => {
              return {
              quantity: 0
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
  Purchanse,
  GoodsItems
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
      const hasStockOutList = [];
      const noStockOutList = [];
      this.$_.get(this.approval, 'approvalSubCancelPurchanse.purchanse.purchanseGoodsItemsList').concat(this.$_.get(this.approval, 'approvalSubCancelPurchanse.purchanse.purchanseGiftList')).forEach(i => {
        const k = this.$_.find(hasStockOutList, j => j.goodsItems.id === i.goodsItems.id);
        if (k) {
          k.quantity = k.quantity + i.quantityHasStockOut;
        } else {
          hasStockOutList.push({
            goodsItems: i.goodsItems,
            quantity: i.quantityHasStockOut
          });
        }
        if (i.quantityHasStockOut < i.quantity) {
          const w = this.$_.find(noStockOutList, j => j.goodsItems.id === i.goodsItems.id);
          const e = i.quantity - i.quantityHasStockOut;
          if (w) {
            w.quantity = w.quantity + e;
          } else {
            noStockOutList.push({
              goodsItems: i.goodsItems,
              quantity: e
            });
          }
        }
      });
      this.$nextTick(() => {
        hasStockOutList.forEach(i => {
          const { goodsItems, quantity } = i;
          this.$refs.hasStockOutTable.setVal(goodsItems.goodsId, { goodsItemsId: goodsItems.id, value: { quantity: quantity } });
        });
        noStockOutList.forEach(i => {
          const { goodsItems, quantity } = i;
          this.$refs.noStockOutTable.setVal(goodsItems.goodsId, { goodsItemsId: goodsItems.id, value: { quantity: quantity } });
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
.info-cancel-purchanse {
}
</style>
