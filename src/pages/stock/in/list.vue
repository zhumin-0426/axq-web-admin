<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-10-28 16:19:22
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/stock/in/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page stock-in-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page :config="page.config" :form="page.form" @add="go('/stock-in/add')" @form-reset="page.fn.resetHandler">
        <template slot="query">
          <div class="q-block">
            <div class="b-item" style="width: 200px">
              <time-picker ref="timePicker" @change="options.fn.timeChangeHandler"></time-picker>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input input size="small" placeholder="编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmInfo" title="入库详情">
      <div class="info-preview popup-confirm_info">
        <grid :col="3" border title="基础信息">
          <grid-item label="入库编号：">
            <span>{{ $_.get(popup.info.attr.result, "sn") }}</span>
          </grid-item>
          <grid-item label="入库时间：">
            <span>{{ $_.get(popup.info.attr.result, "createTime") }}</span>
          </grid-item>
          <grid-item label="入库总数：">
            <span>{{ $_.get(popup.info.attr.result, "_raw.stockInQuantity") }}</span>
          </grid-item>
          <grid-item label="入库类型：">
            <span>{{  $_.get(popup.info.attr.result, "_raw.type") === 3 ? '重新入库' : popup.info.attr.deliveryId ? '送货单入库' : '自定义入库'  }}</span>
          </grid-item>
          <grid-item label="制单人：">
            <span>{{ blankGet(popup.info.attr.result, "_raw.documentMaker.nickname") }}</span>
          </grid-item>
          <grid-item></grid-item>
        </grid>
        <grid title="入库商品">
          <axq-goods-table slot="noGrid" ref="axqGoodsTableStockInInfo" :type="1" :cell-config="{
            defaultValue: (v) => {
              return {
                _extra: {
                  limit: 99999
                },
                quantity: '--'
              }
            }
          }"></axq-goods-table>
        </grid>
      </div>
    </popup-confirm>
  </div>
</template>

<script>

import listPage from '@/components/list-page';
import popupConfirm from '@/components/popup/type/confirm';
import axqGoodsTable from '@/components/axq/goods-table';
import timePicker from '@/components/time-picker';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';
import { model } from '@/model';
const { StockIn, GoodsItems } = model.collection;

export default {
  components: {
    listPage,
    popupConfirm,
    axqGoodsTable,
    timePicker,
    grid,
    gridItem
  },
  data() {
    return {
      options: {
        fn: {
          timeChangeHandler: (e) => {
            const [startTime, endTime] = e;
            this.page.form.query.startTime = startTime;
            this.page.form.query.endTime = endTime;
          }
        }
      },
      page: {
        config: {
          entity: 'StockIn',
          action: 'stockInPage',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: '',
              label: '入库类型',
              VNodes: [
                ({ h, props }) => {
                  return h('p', props.row.type === 3 ? '重新入库' : props.row.deliveryId ? '送货单入库' : '自定义入库');
                }
              ]
            },
            {
              prop: '',
              label: '送货单号',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(props.row.offlineSn));
                }
              ]
            },
            {
              prop: '',
              label: '入库数量',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(props.row.stockInQuantity));
                }
              ]
            },
            {
              prop: 'amount',
              label: '商品总价',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(props.row.stockInAmount));
                }
              ]
            },
            {
              prop: '',
              label: '制单人',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(props.row.documentMakerName));
                }
              ]
            },
            {
              prop: '',
              label: '备注',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(props.row.remark));
                }
              ]
            },
            {
              prop: 'createTime',
              label: '创建时间'
            },
            {
              fixed: 'right',
              prop: 'action',
              label: '操作',
              VNodes: [
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmInfo.open({ triggerOpen: this.popup.info.fn.openHandler, params: props });
                        }
                      }
                    },
                    '查看');
                }
              ]
            }
          ],
          isRaw: true
        },
        form: {
          query: {
            status: '',
            keyword: '',
            startTime: '',
            endTime: ''
          },
          order: {}
        },
        fn: {
          resetHandler: () => {
            this.$refs.timePicker.reset();
          }
        }
      },
      popup: {
        info: {
          attr: {
            result: new StockIn(),
            deliveryId: null
          },
          fn: {
            openHandler: (ok, props) => {
              ok();
              this.popup.info.attr.deliveryId = props.row.id.deliveryId;
              StockIn.sendApi('stockInInfo', { params: {}, data: { query: { id: props.row.id } } }, { parse4Entity: true, errorTip: '获取入库信息失败' }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.info.attr.result = data;
                  this.$nextTick(() => {
                    this.$_.get(this.popup.info.attr.result, '_raw.stockInGoodsItemsList').forEach(i => {
                      this.$refs.axqGoodsTableStockInInfo.setVal(i.goodsItems.goodsId, { goodsItemsId: i.goodsItems.id, value: { quantity: i.quantity } });
                    });
                  });
                }
              });
            }
          }
        }
      }
    };
  }
};
</script>

<style lang="less">
.stock-in-list {
  background: white;

  .popup-confirm {
    &_info {
      padding: 20px;
    }
  }
}
</style>
