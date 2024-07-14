<!--
 * @Author: 码上talk|RC
 * @Date: 2021-08-22 17:42:25
 * @LastEditTime: 2022-01-04 09:38:39
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/components/axq/goods-table/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="axq-goods-table" :class="`axq-goods-table--${size}`">
    <div class="t-list" v-if="specXYList.length">
      <template v-for="(item) in specXYList">
        <div
          class="l-item"
          :key="`goods-${item.g.id}`"
          v-show="!visible.length || visible.includes(item.g.id)"
        >
          <div class="i-fixed">
            <table cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td class="title">
                  <span>{{ item.g.name}}</span>
                </td>
              </tr>
              <template v-for="(item1, key1) in item.y">
                <tr :key="key1">
                  <td
                    class="spec-y"
                    v-html="config.xAxiRender(item1.name, _statQuery(item.g, cellValueDict, config.xAxisHook, {key: item1.name}))"
                    v-if="config.xAxiRender"
                  ></td>
                  <td class="spec-y" v-else>
                    <span>{{item1.name}}</span>
                  </td>
                </tr>
              </template>
              <tr :key="`y-axis-${key1}`" v-for="(item1, key1) in config.yAxis">
                <td
                  class="title"
                  v-html="item1.totalRender(_statQuery(item.g, cellValueDict, item1.totalHook, {isAll: true}))"
                ></td>
              </tr>
            </table>
          </div>
          <div class="i-scroll">
            <div class="s-wrap">
              <table
                :class="`w-spec-x-${type}`"
                class="w-spec-x"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>
                  <td :key="key1" v-for="(item1, key1) in item.x">
                    <span>{{ item1.name }}</span>
                  </td>
                </tr>
              </table>
              <table
                class="w-content"
                :class="`w-content-${type}`"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <template v-for="(item1, key1) in item.y">
                  <tr :key="key1">
                    <td :key="key2" v-for="(item2, key2) in item.x">
                      <template v-if="_validCell(item.g, [item1.id, item2.id])">
                        <type-text
                          :ref="_genRefKey(item.g, [item1.id, item2.id])"
                          :cell-config="cellConfig"
                          @change="_changeHandler(item.g, $event)"
                          v-if="type === 1"
                        ></type-text>
                        <type-input
                          :ref="_genRefKey(item.g, [item1.id, item2.id])"
                          :cell-config="cellConfig"
                          @change="_changeHandler(item.g, $event)"
                          v-else-if="type === 2"
                        ></type-input>
                        <type-stock-check
                          :ref="_genRefKey(item.g, [item1.id, item2.id])"
                          :cell-config="cellConfig"
                          @change="_changeHandler(item.g, $event)"
                          v-else-if="type === 3"
                        ></type-stock-check>
                        <type-revert-form-sort
                          :ref="_genRefKey(item.g, [item1.id, item2.id])"
                          :cell-config="cellConfig"
                          @change="_changeHandler(item.g, $event)"
                          v-else-if="type === 4"
                        ></type-revert-form-sort>
                        <type-stock-delivery
                          :ref="_genRefKey(item.g, [item1.id, item2.id])"
                          :cell-config="cellConfig"
                          @change="_changeHandler(item.g, $event)"
                          v-else-if="type === 5"
                        ></type-stock-delivery>
                      </template>
                      <span v-else>--</span>
                    </td>
                  </tr>
                </template>
              </table>
              <table
                :class="`w-spec-x-${type}`"
                :key="key1"
                class="w-spec-x"
                cellspacing="0"
                cellpadding="0"
                border="0"
                v-for="(item1, key1) in config.yAxis"
              >
                <tr>
                  <td
                    :key="key2"
                    v-for="(item2, key2) in item.x"
                    v-html="item1.itemRender(_statQuery(item.g, cellValueDict, item1.itemHook, {key: item2.name}))"
                  ></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="t-no-data" v-else>
      <img src="/image/no-data.png" alt />
      <p>暂无数据</p>
    </div>
  </div>
</template>


<script>
import typeText from './type/text';
import typeInput from './type/input';
import typeStockCheck from './type/stock-check';
import typeRevertFormSort from './type/revert-form-sort';
import typeStockDelivery from './type/stock-delivery';

import { model } from '@/model';
const { Goods } = model.collection;

export default {
  components: {
    typeText,
    typeInput,
    typeStockCheck,
    typeRevertFormSort,
    typeStockDelivery
  },
  props: {
    size: {
      type: String,
      default () {
        return 'default';
      }
    },
    type: {
      type: Number,
      default () {
        return 1;
      }
    },
    visible: {
      type: Array,
      default () {
        return [];
      }
    },
    changeHook: {
      type: Function,
      default () {
        return null;
      }
    },
    statHook: {
      type: Function
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    },
    cellConfig: {
      type: Object,
      default () {
        return {
          valueFilter: null,
          defaultValue: {
            quantity: 0
          }
        };
      }
    }
  },
  data () {
    return {
      isForceLock: false,
      isRenderLock: false,
      renderQueue: [],
      renderingGoodsIds: [],
      renderedGoods: [],
      cellValueDict: {},
      changeEmit: $_.debounce((g, giv) => {
        if (!g || !giv) {
          g = null;
          giv = {}
          if (this.renderedGoods.length) {
            g = this.renderedGoods[0];
            giv = this.cellValueDict[g.id].giv[0];
          }
        }
        const { goodsItems, value } = giv;
        let all = [];
        for (let i in this.cellValueDict) {
          for (let j = 0; j < this.cellValueDict[i].giv.length; j++) {
            const a = {
              goodsId: Number(i),
              goodsItemsId: this.cellValueDict[i].giv[j].goodsItems.id,
              goodsItems: this.cellValueDict[i].giv[j].goodsItems,
              value: this.cellValueDict[i].giv[j].value
            }
            if (this.cellConfig.valueFilter) {
              if (this.cellConfig.valueFilter(this.cellValueDict[i].giv[j].value)) {
                all.push(a);
              }
              continue;
            }
            all.push(a);
          }
        }
        this.changeHook && this.changeHook({ goods: g, goodsItems, value }, all);
        this.$emit('change', { current: { goods: g, goodsItems, value }, sort: Object.values(this.cellValueDict), all });
      }, 500)
    };
  },
  computed: {
    specXYList () {
      const l = [];
      this.renderedGoods.forEach(i => {
        const { goodsSpecKeyList } = i._raw.goodsSpecCategory;
        const { goodsItemsList = [] } = i;
        const al = goodsItemsList.reduce((p, c) => { return p.concat(c.specJson.map(i => i.value_id)) }, [])
        if (goodsSpecKeyList.length !== 2) {
          throw 'goods\'s spec format is error';
        }
        const d = {
          g: i,
          x: goodsSpecKeyList[0].goodsSpecValueList.map(i => { return { id: i.id, name: i.name }; }).filter(i => { return al.includes(i.id) }),
          y: goodsSpecKeyList[1].goodsSpecValueList.map(i => { return { id: i.id, name: i.name }; }).filter(i => { return al.includes(i.id) })
        };
        l.push(d);
      });
      return l;
    }
  },
  methods: {
    _statQuery (g, cellValueDict, hook, config = {}, t) {
      let l = [];
      if (cellValueDict[g.id]) {
        hook.forEach(hk => {
          if(typeof hk === "function"){
            l.push(
              cellValueDict[g.id].giv.filter(i => {
                return config.isAll ? true : i.goodsItems.specJson.map(i => i.value).includes(config.key)
              }).reduce((p, c) => {
                return p + Number(hk(c.value));
              }, 0)
            )
          };
          if(hk === 'axqGoodsTableStockOut'){
            l.push(
              cellValueDict[g.id].giv.filter(i => {
                return i.goodsItems.specJson.map(i => i.value).includes(config.key)
              }).reduce((obj, c) => {
                obj.quantity += Number(c.value.quantity)
                obj.total += Number(c.value._extra.limit)
                return obj;
              }, {quantity: 0,total: 0})
            )
          };
          if(hk === 'axqGoodsTableRevertForm'){
            l.push(
              cellValueDict[g.id].giv.filter(i => {
                return i.goodsItems.specJson.map(i => i.value).includes(config.key)
              }).reduce((obj, c) => {
                obj.qualified += Number(c.value.qualified)
                obj.unQualified += Number(c.value.unQualified)
                return obj;
              }, {qualified: 0,unQualified: 0})
            )
          }
        })
      }
      return l;
    },
    _genRefKey (g, a) {
      return `value-${g.id}-${this.$_.sortBy(a).join('-')}`;
    },
    _validCell (g, a) {
      return !!this.$_.find(g.goodsItemsList, x => { return this.$_.differenceWith(x.specJson.map(i => i.value_id), a).length === 0 });
    },
    _setCellValue (goodsItemsId, v, goods = null) {
      if (!goods) {
        // Get target goods
      }
      const { goodsItemsList } = goods;
      const tar = this.$_.find(goodsItemsList, x => { return x.id === goodsItemsId });
      if (tar) {
        const cellVueIns = this.$refs[this._genRefKey(goods, tar.specJson.map(i => i.value_id))][0];
        const giv = {
          goodsItems: tar,
          value: cellVueIns.value
        }
        let t = this.$_.find(this.cellValueDict[goods.id].giv, x => { return x.goodsItems.id === tar.id });
        if (!t) {
          this.cellValueDict[goods.id].giv.push(giv);
        } else {
          t = giv;
        }
        cellVueIns.setValue(tar, v);
      }
    },
    _changeHandler (g, giv) {
      this.changeEmit(g, giv);
    },
    _renderTable (goods) {
      return new Promise((resolve) => {
        const { id, goodsItemsList } = goods;
        this.renderedGoods.push(goods);
        this.$nextTick(() => {
          this.renderingGoodsIds = this.renderingGoodsIds.filter(i => { return i != id });
          this.$set(this.cellValueDict, id, {
            goods,
            giv: []
          });
          if (this.cellConfig.defaultValue) {
            goodsItemsList.forEach(i => {
              this._setCellValue(i.id, typeof this.cellConfig.defaultValue === 'function' ? this.cellConfig.defaultValue(i) : this.cellConfig.defaultValue, goods);
            });
          }
          resolve(goods);
        });
      });
    },
    _loadGoods (_goodsId, _goods) {
      this.renderingGoodsIds.push(_goodsId);
      if (_goods) {
        return new Promise((resolve) => {
          this._renderTable(_goods).then((goods) => {
            resolve(goods);
          })
        });
      }
      return new Promise((resolve) => {
        Goods.sendApi('info', { params: {}, data: { dataType: 4, query: { id: _goodsId } } }, { parse4Entity: true, errorTip: '获取商品详情失败~' }).then(res => {
          const { status, data } = res;
          if (status) {
            this._renderTable(data).then((goods) => {
              resolve(goods);
            })
          }
        });
      });
    },
    _getTarCell (goodsId, goodsItemsId) {
      if (!goodsId) {
        let tar = null;
        for (let i in this.cellValueDict) {
          tar = this.$_.find(this.cellValueDict[i].giv, x => { return x.goodsItems.id === goodsItemsId });
          if (tar) {
            break;
          }
        }
        if (!tar) {
          throw 'goodsItems not be found';
        } else {
          goodsId = tar.goodsItems.goodsId;
        }
      }
      if (this.$_.get(this.cellValueDict, `${goodsId}.giv`)) {
        return this.$_.find(this.cellValueDict[goodsId].giv, x => { return x.goodsItems.id === goodsItemsId });
      }
    },
    _loopTask () {
      if (!this.isForceLock && !this.isRenderLock && this.renderQueue.length) {
        const { _goodsId, _v, _goods, _callback } = this.renderQueue[0];
        if (!this.renderedGoods.map(i => i.id).includes(_goodsId) && !this.renderingGoodsIds.includes(_goodsId)) {
          this.renderQueue.shift();
          this._loadGoods(_goodsId, _goods).then((goods) => {
            _v.forEach(i => {
              const { goodsItemsId, value } = i;
              this._setCellValue(goodsItemsId, value, goods);
            });
            _callback && _callback(true);
          });
        } else {
          const tar = this.$_.find(this.renderQueue, x => { return this.renderedGoods.map(i => i.id).includes(x._goodsId) });
          if (tar) {
            const goods = this.$_.find(this.renderedGoods, x => { return x.id === tar._goodsId });
            this.renderQueue.splice(this.renderQueue.map(i => i._goodsId).indexOf(tar._goodsId), 1);
            tar._v.forEach(i => {
              const { goodsItemsId, value } = i;
              this._setCellValue(goodsItemsId, value, goods);
            });
            tar._callback && tar._callback(false);
          }
        }
      }
      requestAnimationFrame(this._loopTask);
    },
    //  --- If the method of setVal didn't work while calling so fast, `forceLock` maybe work~. But you have to call `unLock` finally! ---
    forceLock () {
      this.isForceLock = true;
    },
    unLock () {
      this.isForceLock = false;
    },
    // -----------------------------------------------------------------------------------------------------------------------------------
    setVal (g, v = [], config = {}) {
      this.isRenderLock = true;
      const fv = Array.isArray(v) ? v : [v];
      let goodsId = g;
      let _goods = null;
      if (g instanceof Goods) {
        goodsId = g.id;
        _goods = g;
      }
      const tar = this.$_.find(this.renderQueue, x => { return x._goodsId === goodsId });
      if (tar && !config.callback) {
        tar._v = tar._v.concat(fv);
      } else {
        this.renderQueue.push({
          _goodsId: goodsId,
          _v: fv,
          _goods,
          _callback: config.callback
        });
      }
      this.isRenderLock = false;
    },
    getVal (goodsId, goodsItemsId) {
      const tar = this._getTarCell(goodsId, goodsItemsId);
      if (tar) {
        return tar.value;
      }
    },
    updateVal (goodsId, goodsItemsId, callback) {
      const tar = this._getTarCell(goodsId, goodsItemsId);
      if (tar) {
        callback(tar.value);
      }
    },
    clear (ids = []) {
      const fIds = ids.length ? ids : this.renderedGoods.map(i => i.id);
      fIds.forEach(i => {
        this.renderedGoods.splice(this.renderedGoods.findIndex(x => { return x.id === i }), 1);
        delete this.cellValueDict[i];
      });
      this.changeEmit();
    }
  },
  created () {
    this._loopTask();
  }
};
</script>


<style lang="less">
.axq-goods-table {
  width: 100%;
  .t-list {
    .l-item {
      position: relative;
      width: 100%;
      border: 1px solid #e8eaec;
      overflow: hidden;
      table {
        tr {
          display: flex;
          border-bottom: 1px solid #e8eaec;
          td {
            height: 40px;
          }
          .title {
            font-weight: 600;
            font-size: 14px;
          }
          .spec-y {
            background-color: #f8f8f9;
            font-weight: 600;
            font-size: 14px;
            color: #515a6e;
          }
        }
      }
      .i-fixed {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        background: white;
        box-shadow: 2px 0 6px -2px rgba(121, 119, 119, 0.25);
        z-index: 10;
        table {
          width: 100%;
          tr {
            td {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 40px;
            }
          }
        }
      }
      .i-scroll {
        width: 100%;
        overflow-x: scroll;
        .s-wrap {
          padding-left: 150px;
          .w-spec-x {
            background-color: #f8f8f9;
            tr {
              td {
                width: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                  font-weight: 600;
                  font-size: 14px;
                  color: #515a6e;
                }
              }
            }
          }
          .w-content {
            tr {
              td {
                width: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
            &--mini {
              tr {
                td {
                  width: 40px;
                }
              }
            }
          }
        }
      }
      &:not(:first-child) {
        margin-top: 20px;
      }
    }
  }
  .t-no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 300px;
    img {
      width: 200px;
    }
  }
  &--mini {
    .t-list {
      .l-item {
        .i-scroll {
          .s-wrap {
            .w-spec-x {
              tr {
                td {
                  width: 45px;
                  span {
                    transform: scale(0.8);
                  }
                }
              }
            }
            .w-content {
              tr {
                td {
                  width: 45px;
                  span {
                    transform: scale(0.8);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>