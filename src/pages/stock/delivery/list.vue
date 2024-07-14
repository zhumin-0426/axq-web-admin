<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-12-10 09:38:30
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/stock/delivery/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page stock-delevery-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="go('/stock-delivery/add')"
        @form-reset="page.fn.resetHandler"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item" style="width: 200px">
              <time-picker ref="timePicker" @change="options.fn.timeChangeHandler"></time-picker>
            </div>
            <div class="b-item">
              <options-selector
                :mode="1"
                ref="statusOptionsSelector"
                placeholder="送货单状态"
                :config="{options: entitys.StockDelivery._options.status}"
                @change="page.form.query.status = $event"
              ></options-selector>
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
    <popup-confirm ref="popupConfirmInfo" title="送货详情">
      <div class="info-preview popup-confirm_info">
        <grid :col="3" border title="基础信息">
          <grid-item label="线下编号：">
            <span>{{ $_.get(popup.info.attr.result, "_raw.offlineSn") }}</span>
          </grid-item>
          <grid-item label="送货时间：">
            <span>{{ $_.get(popup.info.attr.result, "createTime") }}</span>
          </grid-item>
          <grid-item label="送货总数：">
            <span>{{ addUpBy($_.get(popup.info.attr.result, "_raw"),'stockDeliveryGoodsItemsList',(v) => {return v.quantity}) }}</span>
          </grid-item>
          <grid-item label="制单人：">
            <span>{{ blankGet(popup.info.attr.result,"_raw.documentMaker.nickname") }}</span>
          </grid-item>
          <grid-item></grid-item>
          <grid-item></grid-item>
        </grid>
        <grid title="送货商品">
          <axq-goods-table
            slot="noGrid"
            ref="axqGoodsTableStockDeliveryInfo"
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
import optionsSelector from '@/components/options-selector';
import {
  model
} from '@/model';
const {
  StockDelivery,
  Approval
} = model.collection;

export default {
  components: {
    listPage,
    popupConfirm,
    axqGoodsTable,
    timePicker,
    grid,
    gridItem,
    optionsSelector
  },
  data () {
    return {
      entitys: {
        StockDelivery
      },
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
          entity: 'StockDelivery',
          action: 'deliveryPage',
          column: [{
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'sn',
            label: '送货单号'
          },
          {
            prop: '',
            label: '线下单号',
            VNodes: [
              ({
                h,
                props
              }) => {
                return h('p', this.blankGet(props.row.offlineSn));
              }
            ]
          },
          {
            prop: '',
            label: '送货数量',
            VNodes: [
              ({
                h,
                props
              }) => {
                return h('p', this.blankGet(props.row.quantity));
              }
            ]
          },
          {
            prop: '',
            label: '制单人',
            VNodes: [
              ({
                h,
                props
              }) => {
                return h('p', this.blankGet(props.row.documentMakerName));
              }
            ]
          },
          {
            prop: '',
            label: '备注',
            VNodes: [
              ({
                h,
                props
              }) => {
                return h('p', this.blankGet(props.row.remark));
              }
            ]
          },
          {
            prop: '',
            label: '状态',
            VNodes: [
              ({
                h,
                props
              }) => {
                return h('p', StockDelivery.filter('status', props.row.status));
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
            VNodes: (props) => {
              let btn = [
                ({
                  h,
                  props
                }) => {
                  return h('el-button', {
                    props: {
                      type: 'primary',
                      size: 'mini'
                    },
                    nativeOn: {
                      click: () => {
                        this.$refs.popupConfirmInfo.open({
                          triggerOpen: this.popup.info.fn.openHandler,
                          params: props
                        });
                      }
                    }
                  },
                    '查看');
                }
              ]
              if ([1, 2].includes(props.row.status)) {
                btn.push(
                  ({
                    h,
                    props
                  }) => {
                    return h('el-button', {
                      props: {
                        type: 'primary',
                        size: 'mini'
                      },
                      nativeOn: {
                        click: () => {
                          this.go(`/stock-in/add?deliveryId=${props.row.id}`);
                        }
                      }
                    }, '去入库');
                  }
                );
                btn.push(
                  ({
                    h,
                    props
                  }) => {
                    return h('el-button', {
                      props: {
                        type: 'danger',
                        size: 'mini'
                      },
                      nativeOn: {
                        click: () => {
                          Approval.sendApi('add', {
                            params: {},
                            data: {
                              typeId: 16,
                              approvalSubUnusualStockDelivery: {
                                stockDeliveryId: props.row.id,
                                stockDeliverySn: props.row.sn
                              }
                            }
                          }, {
                            parse4Entity: true,
                            errorTip: '提交异常送货单失败'
                          }).then(res => {
                            const {
                              status,
                              data
                            } = res;
                            if (status) {
                              this.$message.success('已提交审核');
                              this.$refs.listPage.query();
                            }
                          })
                        }
                      }
                    }, '提交异常');
                  }
                );
              }
              return btn;
            }
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
            result: new StockDelivery()
          },
          fn: {
            openHandler: (ok, props) => {
              ok();
              StockDelivery.sendApi('deliveryInfo', {
                params: {},
                data: {
                  query: {
                    id: props.row.id
                  }
                }
              }, {
                parse4Entity: true,
                errorTip: '获取送货信息失败'
              }).then(res => {
                const {
                  status,
                  data
                } = res;
                if (status) {
                  this.popup.info.attr.result = data;
                  this.$nextTick(() => {
                    this.$_.get(this.popup.info.attr.result, '_raw.stockDeliveryGoodsItemsList').forEach(
                      i => {
                        this.$refs.axqGoodsTableStockDeliveryInfo.setVal(i.goodsItems.goodsId, {
                          goodsItemsId: i.goodsItems.id,
                          value: {
                            quantity: i.quantity,
                            quantityHasStockIn: i.quantityHasStockIn
                          }
                        });
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
.stock-delevery-list {
  background: white;

  .popup-confirm {
    &_info {
      padding: 20px;
    }
  }
}
</style>