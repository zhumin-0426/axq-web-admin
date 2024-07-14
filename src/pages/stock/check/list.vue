<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-08-27 11:02:24
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/stock/check/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page stock-check-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        :config="page.config"
        :form="page.form"
        @add="go('/stock-check/add')"
        @form-reset="page.fn.resetHandler"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item" style="width: 200px;">
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
    <popup-confirm ref="popupConfirmInfo" title="盘点详情">
      <div class="popup-confirm_info">
        <grid :col="3" title="盘点信息" border>
          <grid-item label="盘点编号：">
            <span>{{ $_.get(popup.info.attr.result, "sn") }}</span>
          </grid-item>
          <grid-item label="盘点时间：">
            <span>{{ $_.get(popup.info.attr.result, "createTime") }}</span>
          </grid-item>
          <grid-item label="状态：">
            <span>盘点错误</span>
          </grid-item>
          <grid-item label="制单人：">
            <span>{{ blankGet(popup.info.attr.result,"_raw.documentMaker.nickname") }}</span>
          </grid-item>
          <grid-item></grid-item>
          <grid-item></grid-item>
        </grid>
        <grid title="盘点商品">
          <axq-goods-table
            slot="noGrid"
            ref="axqGoodsTableStockCheckInfo"
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
const { StockCheck, GoodsItems } = model.collection;
export default {
  components: {
    listPage,
    popupConfirm,
    axqGoodsTable,
    timePicker,
    grid,
    gridItem
  },
  data () {
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
          entity: 'StockCheck',
          action: 'stockCheckPage',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: '',
              label: '结果',
              VNodes: [
                ({ h, props }) => {
                  return h('p', '盘点错误');
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
            result: new StockCheck()
          },
          fn: {
            openHandler: (ok, props) => {
              ok();
              StockCheck.sendApi('stockCheckInfo', { params: {}, data: { query: { id: props.row.id } } }, { parse4Entity: true, errorTip: '获取盘点信息失败' }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.info.attr.result = data;
                  this.$nextTick(() => {
                    this.$_.get(this.popup.info.attr.result, '_raw.stockCheckGoodsItemsList').forEach(i => {
                      this.$refs.axqGoodsTableStockCheckInfo.setVal(i.goodsItems.goodsId, { goodsItemsId: i.goodsItems.id, value: { quantity: i.stockReal } });
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
.stock-check-list {
  background: white;
  .popup-confirm {
    &_info {
      padding: 20px;
    }
  }
}
</style>
