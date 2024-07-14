<!--
 * @Author: 码上talk|RC
 * @Date: 2021-09-13 08:38:50
 * @LastEditTime: 2022-02-12 13:34:50
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/pages/stock/query/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="stock-query">
    <div class="q-toolbar">
      <span>选择商品：</span>
      <options-selector
        :mode="4"
        :config="{ req: options.fn.goodsQuery }"
        @change="options.fn.goodsChangeHandler"
      ></options-selector>
    </div>
    <div class="q-main">
      <axq-goods-table
        ref="axqGoodsTableStockQuery"
        :type="1"
        size="mini"
        :cell-config="{
          activeStyle: {
            background: 'white',
            color: '#515a6e'
          },
          defaultValue: (v) => {
            return {
              _extra: {
                stock: v.stock,
                stockFreeze: v.stockFreeze
              },
              quantity: v.stock + v.stockFreeze
          }
          }
        }"
        :config="{
            xAxisHook: [
            (v) => {
              return v._extra.stock + v._extra.stockFreeze > 0 ? v._extra.stock + v._extra.stockFreeze : 0;
            },
            (v) => {
              return v._extra.stock + v._extra.stockFreeze > 0 ? 0 : v._extra.stock + v._extra.stockFreeze;
            },
            ],
            xAxiRender: (n, l) => {
                return `<p>${n}(<span style='color:#1890ff'>${l[0]}/</span><span style='color:rgb(245, 108, 108)'>${l[1]}</span>)</p>`;
            },
            yAxis: [
            {
              totalHook: [(v) => {
                return v._extra.stock + v._extra.stockFreeze > 0 ? v._extra.stock + v._extra.stockFreeze : 0;
              }],
              totalRender: (l) => {
                return `<span style='color:#1890ff'>可用库存：${l[0]}/件</span>`
              },
              itemHook: [(v) => {
                return v._extra.stock + v._extra.stockFreeze > 0 ? v._extra.stock + v._extra.stockFreeze : 0;
              }],
              itemRender: (l) => {
                return `<span>${l[0]}</span>`
              }
            },
            {
              totalHook: [(v) => {
                return v._extra.stock + v._extra.stockFreeze > 0 ? 0 : v._extra.stock + v._extra.stockFreeze;
              }],
              totalRender: (l) => {
                return `<span style='color:rgb(245, 108, 108)'>预售库存：${l[0]}/件</span>`
              },
              itemHook: [(v) => {
                return v._extra.stock + v._extra.stockFreeze > 0 ? 0 : v._extra.stock + v._extra.stockFreeze;
              }],
              itemRender: (l) => {
                return `<span>${l[0]}</span>`
              }
            }
            ]
        }"
      ></axq-goods-table>
    </div>
  </div>
</template>

<script>
import optionsSelector from '@/components/options-selector';
import axqGoodsTable from '@/components/axq/goods-table';
import { model } from '@/model';

const {
  Goods
} = model.collection;

export default {
  components: {
    optionsSelector,
    axqGoodsTable
  },
  data () {
    return {
      options: {
        fn: {
          goodsQuery: (e, ok) => {
            Goods.sendApi('page', { params: {}, data: { query: { keyword: e } } }).then(res => {
              const { data } = res;
              ok(data.map(i => ({ value: i.id, label: i.name })));
            });
          },
          goodsChangeHandler: (e) => {
            if (!e) {
              return;
            }
            this.$refs.axqGoodsTableStockQuery.clear();
            Goods.sendApi('info', { params: {}, data: { query: { id: e, isQueryPreSale: 1 } } }, { parse4Entity: true, showLoading: true, errorTip: '获取商品信息详情错误' }).then(res => {
              const { status, data } = res;
              if (status) {
                this.$refs.axqGoodsTableStockQuery.setVal(data, []);
              }
            });
          },
        },
      }
    }
  }
}
</script>

<style lang="less">
.stock-query {
  background: white;
  .q-toolbar {
    display: flex;
    align-items: center;
    height: 50px;
    padding-left: 20px;
  }
}
</style>