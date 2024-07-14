<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-13 16:33:00
 * @LastEditTime: 2021-10-26 11:46:17
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/info/revert-form.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="info-revert-form">
    <div class="b-block">
      <div class="b-title">
        <span>调换货商品：</span>
      </div>
      <div class="b-box">
        <axq-goods-table
          ref="axqGoodsTableRevertFormGoodsItemsList"
          :type="1"
          :cell-config="{
                defaultValue: (v) => {
                  return {
                    _extra: {
                      limit: 99999
                    },
                  quantity: '--'
                }
                }
              }"
        ></axq-goods-table>
      </div>
    </div>
    <div class="b-block">
      <div class="b-title">
        <span>分拣结果：</span>
      </div>
      <div class="b-box">
        <axq-goods-table
          ref="axqGoodsTableRevertFormSortList"
          :type="4"
          :cell-config="{
                defaultValue: (v) => {
                  return {
                  qualified: '--',
                  unQualified: '--'
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
  RevertForm
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
        const { revertFormGoodsItemsList, uniSortByGoodsItemsId } = new RevertForm(this.$_.get(this.approval, 'approvalSubRevertForm.revertForm'));
        this.$nextTick(() => {
          revertFormGoodsItemsList.forEach(i => {
            const { goodsItems } = i;
            this.$refs.axqGoodsTableRevertFormGoodsItemsList.setVal(goodsItems.goodsId, { goodsItemsId: goodsItems.id, value: { quantity: i.quantity } });
          });
          uniSortByGoodsItemsId.forEach(i => {
            const { goodsItems, qualified, unQualified } = i;
            this.$refs.axqGoodsTableRevertFormSortList.setVal(goodsItems.goodsId, { goodsItemsId: goodsItems.id, value: { qualified, unQualified } });
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
.info-revert-form {
}
</style>
