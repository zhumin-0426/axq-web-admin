<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-06-01 16:54:15
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/stock/out/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page stock-out-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="go('/stock-out/add')"
        @form-reset="page.fn.resetHandler"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item" style="width: 200px">
              <time-picker ref="timePicker" @change="options.fn.timeChangeHandler"></time-picker>
            </div>
            <div class="b-item">
              <options-selector
                :mode="2"
                ref="sysExpressOptionsSelector"
                :config="{ key: 'sysExpress' }"
                @change="options.fn.sysExpressChangeHandler"
              ></options-selector>
            </div>
            <div class="b-item" style="width: 150px">
              <options-selector
                :mode="4"
                ref="distributorOptionsSelector"
                placeholder="店主/ID/手机号"
                :config="{ req: options.fn.distributorQuery }"
                @change="options.fn.distributorChangeHandler"
              ></options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input input size="small" placeholder="编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <list-sort
                :sort-list="[
                  { label: '审核时间', value: 'approvedTime', order: 'desc' },
                ]"
                :order="page.form.order"
              ></list-sort>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmInfo" title="出库详情">
      <div class="popup-confirm_info">
        <grid :col="3" title="出库信息" border>
          <grid-item label="出库编号：">
            <span>{{ $_.get(popup.info.attr.result, "sn") }}</span>
          </grid-item>
          <grid-item label="出库时间：">
            <span>{{ $_.get(popup.info.attr.result, "createTime") }}</span>
          </grid-item>
          <grid-item label="出库总数：">
            <span>
              {{
              $_.get(popup.info.attr.result, "_raw.stockOutQuantity")
              }}
            </span>
          </grid-item>
          <grid-item label="订单编号：">
            <span>
              {{
              blankGet(popup.info.attr.result, "_raw.purchanse.sn")
              }}
            </span>
          </grid-item>
          <grid-item label="客户名称：">
            <span>
              {{
              blankGet(popup.info.attr.result, "_raw.purchanse.recipient") + '/'+ blankGet(popup.info.attr.result, "_raw.purchanse.id")
              }}
              
            </span>
          </grid-item>
          <grid-item label="制单人：">
            <span>
              {{
              blankGet(
              popup.info.attr.result,
              "_raw.documentMaker.nickname"
              )
              }}
            </span>
          </grid-item>
        </grid>
        <grid title="出库商品">
          <axq-goods-table
            slot="noGrid"
            ref="axqGoodsTableStockOutInfo"
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
    <popup-confirm ref="popupConfirmUpdateLogisticsForm" title="更新物流信息">
      <div class="info-preview popup-confirm_update-logistics-form">
        <div class="f-item">
          <div class="i-label">
            <span>物流类型：</span>
          </div>
          <div class="i-value">
            <options-selector
              :mode="2"
              :config="{ key: 'sysExpress' }"
              @change="popup.updateLogisticsForm.fn.sysExpressChangeHandler"
            ></options-selector>
          </div>
        </div>
        <div class="f-item">
          <div class="i-label">
            <span>物流编号：</span>
          </div>
          <div class="i-value">
            <el-input v-model="popup.updateLogisticsForm.attr.form.logisticsFormSn"></el-input>
          </div>
        </div>
      </div>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmRemark"
      title="添加备注"
      :fill="popup.remark.fn.fill"
      :config="{ width: 700, height: 400 }"
    >
      <div class="info-preview popup-confirm_update-logistics-form">
        <div class="f-item">
          <div class="i-label">
            <span>备注：</span>
          </div>
          <div class="i-value">
            <el-input
              type="textarea"
              style="margintop: 20px"
              clearable
              v-model="popup.remark.attr.from.remark"
            ></el-input>
          </div>
        </div>
      </div>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmLogisticInfo"
      title="查看物流信息"
      :fill="popup.remark.fn.fill"
      :config="{ width: 700, height: 400 }"
    >
      <div class="popup-confirm_logistic-info">
        <grid :col="3" title="寄件信息" border>
          <grid-item label="物流单号：">
            <span>{{ $_.get(popup.logisticInfo.attr.result, "_raw.sn") }}</span>
          </grid-item>
          <grid-item label="物流类型：">
            <span>德邦</span>
          </grid-item>
          <grid-item label="收件人：">
            <span>{{ $_.get(popup.logisticInfo.attr.result, "_raw.recipient") }}</span>
          </grid-item>
          <grid-item label="收件电话：">
            <span>{{ $_.get(popup.logisticInfo.attr.result, "_raw.recipientMobile") }}</span>
          </grid-item>
          <grid-item label="收件地址：">
            <span>{{ $_.get(popup.logisticInfo.attr.result, "_raw.recipientAddress") }}</span>
          </grid-item>
          <grid-item label="物流创建时间：">
            <span>{{ $_.get(popup.logisticInfo.attr.result, "_raw.createTime") }}</span>
          </grid-item>
        </grid>
        <grid title="物流动态">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in $_.get(popup.logisticInfo.attr.result, '_raw.logisticsFormMailList[0].logisticsFormTrackList', [])"
              :key="index"
              :timestamp="item.createTime"
            >
              <p>【{{item.status | dopStatusFilter}}】{{item.site}}</p>
              <p>{{item.description}}</p>
            </el-timeline-item>
          </el-timeline>
        </grid>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import listPage from '@/components/list-page';
import listSort from '@/components/list-sort';
import popupConfirm from '@/components/popup/type/confirm';
import axqGoodsTable from '@/components/axq/goods-table';
import optionsSelector from '@/components/options-selector';
import timePicker from '@/components/time-picker';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';
import Printer from '@/components/axq/printer';

import { model } from '@/model';

const { StockOut, Purchanse, LogisticsForm, SysExpress, Member } =
  model.collection;
export default {
  components: {
    listPage,
    listSort,
    popupConfirm,
    axqGoodsTable,
    optionsSelector,
    timePicker,
    grid,
    gridItem
  },
  data () {
    return {
      entitys: {
        StockOut,
        Purchanse,
        SysExpress
      },
      options: {
        fn: {
          sysExpressChangeHandler: (e) => {
            this.page.form.query.sysExpressId = e;
          },
          timeChangeHandler: (e) => {
            const [startTime, endTime] = e;
            this.page.form.query.startTime = startTime;
            this.page.form.query.endTime = endTime;
          },
          distributorChangeHandler: (e) => {
            this.page.form.query.memberId = e;
          },
          distributorQuery: (e, ok) => {
            Member.sendApi('page', {
              params: {},
              data: { query: { type: 7, keyword: e } }
            }).then((res) => {
              const { data } = res;
              ok(data.map((i) => ({ value: i.id, label: `${i.nickname}/${i.id}`})));
            });
          }
        }
      },
      page: {
        config: {
          entity: 'StockOut',
          action: 'stockOutPage',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: '',
              label: '出库类型',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'p',
                    this.blankGet(
                      this.entitys.StockOut.filter('type', props.row.type)
                    )
                  );
                }
              ]
            },
            {
              prop: '',
              label: '订单类型',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'p',
                    this.blankGet(
                      this.entitys.Purchanse.filter(
                        'type',
                        props.row.purchanseType
                      )
                    )
                  );
                }
              ]
            },
            {
              prop: '',
              label: '订单编号',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'p',
                    this.$_.get(props.row, 'purchanseSn') || this.$_.get(props.row, 'revertFormSn')
                  );
                }
              ]
            },
            {
              prop: '',
              label: '订单总数',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'p',
                    this.blankGet(
                      this.$_.get(props.row, 'stockOutTotalQuantity')
                    )
                  );
                }
              ]
            },
            {
              prop: '',
              label: '订单制单人',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'p',
                    this.blankGet(
                      this.$_.get(props.row, 'purchanseDocumentMakerName') || this.$_.get(props.row, 'revertFormOperator')
                    )
                  );
                }
              ]
            },
            {
              prop: '',
              label: '出库数量',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(props.row.stockOutQuantity));
                }
              ]
            },
            {
              prop: '',
              label: '代理/ID',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'p',
                    this.$_.get(props.row, 'purchanseDistributorName') ? this.$_.get(props.row, 'purchanseDistributorName') + '/' + this.$_.get(props.row, 'purchanseDistributorId') : this.$_.get(props.row, 'revertFormDistributorName') + '/' + this.$_.get(props.row, 'revertFormDistributorId')
                  );
                }
              ]
            },
            {
              prop: 'amount',
              label: '商品总价',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'p',
                    this.blankGet(this.$_.get(props.row, 'stockOutAmount'))
                  );
                }
              ]
            },
            {
              prop: '',
              label: '出库人',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'p',
                    this.blankGet(this.$_.get(props.row, 'documentMakerName'))
                  );
                }
              ]
            },
            {
              prop: '',
              label: '收件人信息',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'p',
                    this.$_.get(props.row, 'type') === 1
                      ? this.$_.get(props.row, 'purchanseRecipient') + '/' + this.$_.get(props.row, 'purchanseRecipientMobile') + '/' + this.$_.get(props.row, 'purchanseFullAddress')
                      : this.$_.get(props.row, 'revertFormRecipient') + '/' + this.$_.get(props.row, 'revertFormRecipientMobile') + '/' + this.$_.get(props.row, 'revertFormAddress')
                  );
                }
              ]
            },
            {
              prop: '',
              label: '物流信息',
              width: 200,
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'div',
                    {
                      class: ['l-express']
                    },
                    [
                      h(
                        'p',
                        {},
                        `快递类型：${this.entitys.SysExpress.filter('name', this.blankGet(this.$_.get(props.row, 'sysExpressId')))}`
                      ),
                      h(
                        'span',
                        `快递单号：${this.$_.get(props.row, 'mailNo') || this.$_.get(props.row, 'logisticsFormSn')}`
                      )
                    ]
                  );
                }
              ]
            },
            {
              props: '',
              label: '备注',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'div',
                    {
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }
                    },
                    [
                      h(
                        'span',
                        this.blankGet(this.$_.get(props.row, 'remark'))
                      ),
                      h('i', {
                        class: ['iconfont icon-bianji'],
                        style: { fontSize: '18px' },
                        on: {
                          click: () => {
                            this.$refs.popupConfirmRemark.open({
                              triggerOpen: this.popup.remark.fn.openHandler,
                              triggerClose: this.popup.remark.fn.closeHandler,
                              params: props
                            });
                          }
                        }
                      })
                    ]
                  );
                }
              ]
            },
            {
              prop: '',
              label: '客服备注',
              VNodes: [
                ({ h, props }) => {
                  return h(
                    'p',this.blankGet(props.row, 'customerRemark')
                  );
                }
              ]
            },
            {
              prop: 'createTime',
              label: '出库时间'
            },
            {
              fixed: 'right',
              prop: 'action',
              label: '操作',
              width: '160',
              VNodes: (props) => {
                const btn = [
                  ({ h, props }) => {
                    return h(
                      'el-button',
                      {
                        props: { type: 'primary', size: 'mini' },
                        nativeOn: {
                          click: () => {
                            this.$refs.popupConfirmInfo.open({
                              triggerOpen: this.popup.info.fn.openHandler,
                              params: props
                            });
                          }
                        }
                      },
                      '查看'
                    );
                  }
                ];
                if (
                  this.blankGet(this.$_.get(props.row, 'sysExpressId')) === 1
                ) {
                  btn.push(({ h, props }) => {
                    return h(
                      'el-button',
                      {
                        props: { type: 'default', size: 'mini' },
                        nativeOn: {
                          click: () => {
                            this.printer.fn.do(props);
                          }
                        }
                      },
                      '打印快递'
                    );
                  });
                  btn.push(({ h, props }) => {
                    return h(
                      'el-button',
                      {
                        props: { type: 'primary', size: 'mini' },
                        nativeOn: {
                          click: () => {
                            this.$refs.popupConfirmLogisticInfo.open({
                              triggerOpen: this.popup.logisticInfo.fn.openHandler,
                              params: props
                            });
                          }
                        }
                      },
                      '查看物流信息'
                    );
                  });
                } else {
                  btn.push(
                    ({ h, props }) => {
                      return h(
                        'el-button',
                        {
                          props: { type: 'primary', size: 'mini' },
                          nativeOn: {
                            click: () => {
                              this.$refs.popupConfirmUpdateLogisticsForm.open({
                                triggerOpen:
                                  this.popup.updateLogisticsForm.fn.openHandler,
                                triggerClose:
                                  this.popup.updateLogisticsForm.fn.closeHandler,
                                params: props
                              });
                            }
                          }
                        },
                        '编辑物流'
                      );
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
            sysExpressId: '',
            keyword: '',
            startTime: '',
            endTime: '',
            memberId: ''
          },
          order: {
            approvedTime: 'desc'
          }
        },
        fn: {
          resetHandler: () => {
            this.$refs.timePicker.reset();
            this.$refs.sysExpressOptionsSelector.reset();
            this.$refs.distributorOptionsSelector.reset();
          }
        }
      },
      popup: {
        info: {
          attr: {
            result: new StockOut()
          },
          fn: {
            openHandler: (ok, props) => {
              ok();
              StockOut.sendApi('stockOutInfo', {
                params: {},
                data: { query: { id: props.row.id } }
              }, { parse4Entity: true, errorTip: '获取出库信息失败' }).then((res) => {
                const { status, data } = res;
                if (status) {
                  this.popup.info.attr.result = data;
                  this.$nextTick(() => {
                    this.$_.get(
                      this.popup.info.attr.result,
                      '_raw.stockOutGoodsItemsList'
                    ).forEach((i) => {
                      this.$refs.axqGoodsTableStockOutInfo.setVal(i.goodsItems.goodsId, { goodsItemsId: i.goodsItems.id, value: { quantity: i.quantity } });
                    });
                  });
                }
              });
            }
          }
        },
        updateLogisticsForm: {
          attr: {
            info: {},
            form: {
              sysExpressId: '',
              logisticsFormSn: ''
            }
          },
          fn: {
            sysExpressChangeHandler: (e) => {
              this.popup.updateLogisticsForm.attr.form.sysExpressId = e;
            },
            openHandler: (ok, props) => {
              this.popup.updateLogisticsForm.attr.info = props.row;
              this.popup.updateLogisticsForm.attr.form.logisticsFormSn =
                props.row.logisticsFormSn;
              ok();
            },
            closeHandler: (ok, error) => {
              if (
                !this.popup.updateLogisticsForm.attr.form.sysExpressId ||
                !this.popup.updateLogisticsForm.attr.form.logisticsFormSn
              ) {
                error();
                this.$message.warning('请校验输入信息');
                return;
              }
              StockOut.sendApi('outLogisticsFormUpdate', {
                params: { id: this.popup.updateLogisticsForm.attr.info.id },
                data: this.popup.updateLogisticsForm.attr.form
              }).then((res) => {
                const { status } = res;
                if (status) {
                  ok();
                  this.$message({
                    message: '物流信息更新成功',
                    type: 'success'
                  });
                  this.$refs.listPage.query();
                } else {
                  error();
                  this.$message({
                    message: '物流信息更新失败',
                    type: 'error'
                  });
                }
              });
            }
          }
        },
        remark: {
          attr: {
            from: {
              id: 0,
              remark: ''
            }
          },
          fn: {
            fill: (callback) => {
              callback(StockOut, this.popup.remark.attr.from);
            },
            openHandler: (ok, props) => {
              this.popup.remark.attr.from.id = props.row.id;
              ok();
            },
            closeHandler: (ok, error) => {
              StockOut.sendApi('remarkUpdate', {
                params: { id: this.popup.remark.attr.from.id },
                data: { remark: this.popup.remark.attr.from.remark }
              }).then((res) => {
                const { status } = res;
                if (status) {
                  ok();
                  this.$message({
                    message: '备注更新成功',
                    type: 'success'
                  });
                  this.$refs.listPage.query();
                } else {
                  error();
                  this.$message({
                    message: '备注更新失败',
                    type: 'error'
                  });
                }
              });
              ok();
            }
          }
        },
        logisticInfo: {
          attr: {
            result: {}
          },
          fn: {
            openHandler: (ok, props) => {
              ok();
              LogisticsForm.sendApi('formInfo', {
                params: {},
                data: { query: { stockOutId: props.row.id } }
              }, { parse4Entity: true, errorTip: '获取物流信息失败' }).then((res) => {
                const { status, data } = res;
                if (status) {
                  this.popup.logisticInfo.attr.result = data;
                }
              });
            }
          }
        },
      },
      confirm: {
        fn: {
          back: () => {
            this.$confirm('申请物流单退单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '退单成功!'
                });
              })
              .catch(() => { });
          }
        }
      },
      printer: {
        fn: {
          do: (props) => {
            new Printer(2).run({}, { stockOutId: props.row.id });
          }
        }
      }
    };
  }
};
</script>

<style lang="less">
.stock-out-list {
  background: white;
  .l-list {
    .l-express {
      div {
        span {
          &:nth-child(2) {
            cursor: pointer;
          }
        }
      }
    }
  }
  .popup-confirm {
    &_info {
      padding: 20px;
    }
    &_update-logistics-form {
      padding: 20px;
      .f-item {
        .i-label {
          width: 100px;
        }
        .i-value {
          flex: 1;
        }
        &:not(:first-child) {
          margin-top: 20px;
        }
      }
    }
    &_logistic-info {
      padding: 20px;
    }
  }
}
</style>
