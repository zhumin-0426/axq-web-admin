<!--
 * @Author: 码上talk|RC
 * @Date: 2021-12-03 15:07:49
 * @LastEditTime: 2022-02-12 14:28:54
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/pages/datav/stock/@fragment/goods-table.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="goods-table">
    <table class="t-table">
      <thead>
        <tr>
          <template v-if="type === 1">
            <th>
              <div class="t-stock">可用数量</div>
            </th>
            <th>
              <div class="t-owe-stock">预售数量</div>
            </th>
          </template>
          <th v-else>
            <div class="t-stock">{{ label }}</div>
          </th>
          <th class="t-label">
            <div class="l-specification">
              <em class="s-size">尺码</em>
              <em class="s-color">颜色</em>
            </div>
          </th>
          <th v-for="(item,i) in sizeXList" :key="i">
            <div class="t-value">{{ item.value }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item1,index1) in colorYList" :key="index1">
          <template v-if="type === 1">
            <td class="t-stock">{{ getRowStock(item1.value_id) }}</td>
            <td class="t-owe-stock">{{ getRowSweStock(item1.value_id) }}</td>
          </template>
          <td v-else class="t-stock">{{ getRowTotal(item1.value_id) }}</td>
          <td class="t-color">{{ item1.value }}</td>
          <td v-for="(item2,index2) in sizeXList" :key="index2"
            :class="getGoodsItemQuantity(item2,item1,type) < 1 ? 'red': 'green' ">
            {{ getGoodsItemQuantity(item2,item1,type)}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      type: Number,
      goodsInfo: Object
    },
    data() {
      return {}
    },
    computed: {
      label() {
        if (this.type === 2) return '进仓数量';
        if (this.type === 3) return '出仓数量';
        if (this.type === 4) return '商品数量';
        return ''
      },
      colorYList() {
        let arr = []
        this.$_.get(this, 'goodsInfo.goodsItemsList', []).map(i => {
          const item = JSON.parse(i.specJson).find(v => v.key === '颜色')
          arr.push(item)
        })
        return this.$_.uniqBy(arr, 'value_id')
      },
      sizeXList() {
        let arr = []
        this.$_.get(this, 'goodsInfo.goodsItemsList', []).map(i => {
          const item = JSON.parse(i.specJson).find(v => v.key === '尺码')
          arr.push(item)
        })
        return this.$_.uniqBy(arr, 'value_id')
      }
    },
    methods: {
      getGoodsItemQuantity(x, y, type) {
        let quantity = 0
        this.$_.get(this, 'goodsInfo.goodsItemsList', []).find(i => {
          if (JSON.parse(i.specJson).find(c => c.key === '颜色').value_id === this.$_.get(y, 'value_id') &&
            JSON.parse(i.specJson).find(s => s.key === '尺码').value_id === this.$_.get(x, 'value_id')) {
            if (type === 1) {
              quantity = i.stock + i.stockFreeze > 0 ? i.stock + i.stockFreeze :
              -Math.abs(i.stockFreeze + i.stock)
            } else {
              quantity = i.quantity
            }
          }
        })
        return quantity
      },
      getRowStock(id) {
        return this.$_.get(this, 'goodsInfo.goodsItemsList', []).filter(e => JSON.parse(e.specJson).find(c => c.key ===
          '颜色').value_id === id && (e.stock + e.stockFreeze) >0).reduce((v, c) => v += (c.stock +
          c.stockFreeze), 0)
      },
      getRowSweStock(id) {
        return this.$_.get(this, 'goodsInfo.goodsItemsList', []).filter(e => JSON.parse(e.specJson).find(c => c.key ===
          '颜色').value_id === id ).reduce((v, c)=> v += (c.stock > 0 ? 0 : (c.stock +
            c.stockFreeze) > 0 ? 0 :
            -Math.abs(c.stockFreeze + c.stock)), 0)
      },
      getRowTotal(id) {
        return this.$_.get(this, 'goodsInfo.goodsItemsList', []).filter(e => JSON.parse(e.specJson).find(c => c.key ===
          '颜色').value_id === id).reduce((v, c) => v += c.quantity, 0)
      }
    }
  }
</script>
<style lang="less" scoped>
  .goods-table {
    padding: 10px;
    width: 1500px;
    overflow-x: scroll;

    .t-table {
      border: 1px solid #cbcbcb;
      border-collapse: collapse;
      border-spacing: 0;
      empty-cells: show;

      thead {
        tr {
          th {
            padding-left: 10px;
            width: 80px;
            height: 39px;
            text-align: left;
            line-height: 39px;
            background: #f8f8f9;
            border-right: 1px solid #cbcbcb;

            .t-stock {
              padding-left: 0;
              width: 100px;
              text-align: center;
              color: #29B86A;
            }

            .t-owe-stock {
              padding-left: 0;
              width: 100px;
              text-align: center;
              color: #FF2E2E;
            }

            .t-value {
              width: 70px;
            }
          }

          .t-label {
            padding-left: 0;

            .l-specification {
              width: 0;
              height: 0;
              border-top: 39px solid #f8f8f9;
              border-left: 90px solid #eeeeee;
              position: relative;

              .s-size {
                display: block;
                position: absolute;
                top: -45px;
                left: -40px;
                width: 45px;
                font-style: normal;
              }

              .s-color {
                display: block;
                position: absolute;
                top: -30px;
                left: -80px;
                width: 45x;
                font-style: normal;
              }
            }


          }

        }
      }

      tbody {
        tr {
          height: 40px;

          td {
            width: 80px;
            padding-left: 10px;
            border-top: 1px solid #cbcbcb;
            border-right: 1px solid #cbcbcb;
          }

          .t-stock {
            width: 100px;
            padding-left: 0;
            text-align: center;
            background: #f8f8f9;
            color: #29B86A;
          }

          .t-owe-stock {
            width: 100px;
            padding-left: 0;
            text-align: center;
            background: #f8f8f9;
            color: #FF2E2E;
          }

          .quantity {
            color: #7F4DCD;
          }

          .t-color {
            width: 100px;
            color: #515a6e;
            font-weight: bold;
          }

          .green {
            color: #29B86A;
          }

          .red {
            color: #FF2E2E;
          }
        }
      }
    }


  }
</style>