<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 16:24:16
 * @LastEditTime: 2022-06-10 15:42:59
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/stock/out/add.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="stock-out-add">
    <div class="a-purchanse">
      <div class="p-info-item">
        <div class="i-label">
          <span>订单编号：</span>
        </div>
        <div class="i-value">
          <options-selector :mode="4" placeholder="订单编号"
            :config="{ req: options.fn.purchanseQuery, value: $_.get(purchanse.attr.info, 'sn', '') }"
            @change="options.fn.purchanseChangeHandler"></options-selector>
        </div>
      </div>
      <div class="p-info-item">
        <div class="i-label">
          <span>订单类型：</span>
        </div>
        <div class="i-value">
          <span>{{ entitys.Purchanse.filter("type", $_.get(purchanse.attr.info, 'type')) }}</span>
        </div>
      </div>
      <div class="p-info-item">
        <div class="i-label">
          <span>店主：</span>
        </div>
        <div class="i-value">
          <span>{{ $_.get(purchanse.attr.info, "member.nickname") }}/{{ $_.get(purchanse.attr.info, "member.id") }}</span>
        </div>
      </div>
    </div>
    <form-validate ref="stockOutAdd" type="step" :form="form.value" :step-config="form.stepConfig"
      @ok="form.fn.okHandler">
      <template slot="step-0">
        <div class="a-scanner">
          <axq-code-scanner ref="axqCodeScanner" :mode="3" required-status="STOCK_IN"
            :config="{ errorTipHook: scanner.fn.errorTipHook }" @ok="scanner.fn.okHandler"></axq-code-scanner>
        </div>
        <div class="a-toolbar">
          <div class="t-left">
            <span>扫码合计：{{ totalDo }}/{{ total }}</span>
          </div>
          <div class="t-right">
            <el-button-group>
              <el-button type="danger" size="small" @click.native="flush">清空</el-button>
              <el-button type="warning" size="small" @click.native="autoCheck"
                v-if="[6, 7].includes($_.get(purchanse.attr.info, 'type'))">一键出库</el-button>
              <el-button size="small" @click.native="
                $refs.popupConfirmRemoveTraceCode.open({
                  triggerClose: popup.removeTraceCode.fn.closeHandler,
                })
              ">移除溯源（{{ traceLog.json.length }}/件）</el-button>
              <el-button type="primary" size="small" @click.native="
                $refs.popupConfirmCheck.open({
                  triggerClose: popup.check.fn.closeHandler,
                })
              ">核对</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="a-table">
          <axq-goods-table ref="axqGoodsTableStockOut" :type="2" :cell-config="{
            defaultValue: (v) => {
              return {
                _extra: {
                  limit: 0,
                  disable: true
                },
                quantity: ''
              }
            }
          }"
          :config="{
            xAxisHook: ['axqGoodsTableStockOut'],
            xAxiRender: (n, l) => {
              return l[0] ? `<span>${n}（${l[0].quantity}/${l[0].total}）</span>` : '';
            },
          }" @change="goodsTable.fn.changeHandler"></axq-goods-table>
        </div>
      </template>
      <div class="a-result" slot="result">
        <div class="r-icon">
          <i class="iconfont icon-chenggong"></i>
        </div>
        <div class="r-text">
          <span>添加出库成功</span>
        </div>
        <div class="r-description">
          <p>
            提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用
            Message 全局提示反馈即可。灰色区域可以显示一些补充的信息。
          </p>
        </div>
        <div class="r-link">
          <el-button type="primary" style="margin-left: 8px" @click.native="rep('/stock-out/list')">查看出库</el-button>
          <el-button style="margin-left: 8px" @click.native="rep('/stock-out/list')">返回列表</el-button>
        </div>
      </div>
    </form-validate>
    <popup-confirm ref="popupConfirmRemoveTraceCode" title="移除溯源码" :config="{ width: 600, height: 300 }">
      <div class="popup-confirm_trace-code">
        <div class="tc-scanner">
          <axq-code-scanner :mode="7" required-status="STOCK_IN" :config="{ errorTipHook: scanner.fn.errorTipHook }"
            @ok="popup.removeTraceCode.fn.scannerOkHandler"></axq-code-scanner>
          <span>已扫描（{{ traceLog.jsonMinusTry.length }}）件</span>
        </div>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmCheck" title="出库核对"
      :confirm-text="$_.get(purchanse.attr.info, 'sysExpressId') === 1 ? '确认并打印快递单号' : '确认出库'"
      :config="{ width: 700, height: 500 }">
      <div class="popup-confirm_check">
        <div class="c-info">
          <p>订单商品数量： {{ total }}/件</p>
        </div>
        <div class="c-table">
          <div class="t-item">
            <div class="i-title">
              <div class="t-left">
                <span>已录入商品数量：{{ totalDo }}/件</span>
              </div>
            </div>
            <div class="i-box">
              <el-table :stripe="true" :data="popup.check.attr.done" style="width: 100%">
                <el-table-column label="商品名称">
                  <template slot-scope="props">
                    <p>{{ props.row.goodsItems.name }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="规格">
                  <template slot-scope="props">
                    <p>{{ props.row.goodsItems.specJson2str() }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="props">
                    <p>{{ props.row.quantity }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="t-item">
            <div class="i-title">
              <div class="t-left">
                <span>未录入商品数量：{{ total - totalDo }}/件</span>
              </div>
            </div>
            <div class="i-box">
              <el-table :stripe="true" :data="popup.check.attr.undo" style="width: 100%">
                <el-table-column label="商品名称">
                  <template slot-scope="props">
                    <p>{{ props.row.goodsItems.name }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="规格">
                  <template slot-scope="props">
                    <p>{{ props.row.goodsItems.specJson2str() }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="props">
                    <p>{{ props.row.quantity }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="popup-confirm_check-footer-left" slot="footer-left" v-if="total - totalDo > 0">
        <el-checkbox v-model="popup.check.attr.isPurchanseUnnormal">异常订单</el-checkbox>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from '@/components/form-validate';
import axqCodeScanner from '@/components/axq/code-scanner';
import axqGoodsTable from '@/components/axq/goods-table';
import optionsSelector from '@/components/options-selector';
import popupConfirm from '@/components/popup/type/confirm';

import TraceLog from '@/utils/traceLog';
import { model } from '@/model';
import { formToolkit } from '@/model/form-toolkit';
import Printer from '@/components/axq/printer';

const {
  StockOut,
  StockOutGoodsItems,
  GoodsItems,
  Purchanse
} = model.collection;

export default {
  components: {
    formValidate,
    axqCodeScanner,
    axqGoodsTable,
    optionsSelector,
    popupConfirm
  },
  data() {
    return {
      traceLog: new TraceLog().setType(2),
      total: 0,
      totalDo: 0,
      form: {
        value: StockOut.formUtil().generator('add', 'default'),
        stepConfig: {
          noProgress: true,
          noValidate: true,
          list: [
            {
              _validateField: [''],
              title: '步骤一',
              description: '扫码出库'
            }
          ]
        },
        fn: {
          okHandler: (ev) => {
            this.addStockOut(ev);
          }
        }
      },
      entitys: {
        Purchanse,
        GoodsItems
      },
      options: {
        fn: {
          purchanseQuery: (e, ok) => {
            Purchanse.sendApi('page', { params: {}, data: { query: { keyword: e, status: '3,4' } } }).then(res => {
              const { data } = res;
              ok(data.map(i => ({ value: i.id, label: i.sn })));
            });
          },
          purchanseChangeHandler: (e) => {
            this.purchanse.attr.id = Number(e);
            this.purchanse.fn.getPurchanseInfo();
          }
        }
      },
      purchanse: {
        attr: {
          type: 1,
          id: Number(this.$route.query.purchanseId),
          info: null
        },
        fn: {
          getPurchanseInfo: () => {
            this.form.value = StockOut.formUtil().generator('add', 'default');
            this.$refs.axqGoodsTableStockOut.clear();
            this.traceLog.clear();
            Purchanse.sendApi('info', { params: {}, data: { dataType: 2, query: { id: this.purchanse.attr.id } } }, { errorTip: '获取订单信息错误' }).then(res => {
              const { status, data } = res;
              if (status) {
                const { id, type, purchanseGoodsItemsList, purchanseGiftList } = data;
                let l = [];
                this.purchanse.attr.info = data;
                this.form.value.purchanseId.value = id;
                this.form.value.purchanseType.value = type;
                purchanseGoodsItemsList && purchanseGoodsItemsList.forEach(i => {
                  l.push({
                    goodsItems: i.goodsItems,
                    quantity: i.quantity,
                    quantityHasStockOut: i.quantityHasStockOut
                  });
                });
                purchanseGiftList && purchanseGiftList.forEach(i => {
                  const tar = this.$_.find(l, x => { return x.goodsItems.id == i.goodsItems.id });
                  if (tar) {
                    tar.quantity = tar.quantity + i.quantity;
                    tar.quantityHasStockOut = tar.quantityHasStockOut + i.quantityHasStockOut;
                    return;
                  }
                  l.push({
                    goodsItems: i.goodsItems,
                    quantity: i.quantity,
                    quantityHasStockOut: i.quantityHasStockOut
                  });
                });
                l.forEach(i => {
                  this.$refs.axqGoodsTableStockOut.setVal(i.goodsItems.goodsId, { goodsItemsId: i.goodsItems.id, value: { quantity: '', _extra: { disable: false, limit: i.quantity - i.quantityHasStockOut } } });
                });
              }
            });
          }
        }
      },
      scanner: {
        fn: {
          okHandler: (e) => {
            this.traceLog.add(e, {}, {
              preHook: (goodsItems) => {
                const stockOutGoodsItemsList = this.form.value.stockOutGoodsItemsList.value;
                const tar = this.$_.find(stockOutGoodsItemsList, x => { return x.goodsItemsId.value === goodsItems.id });
                if (!tar) {
                  return {
                    status: false,
                    msg: '商品不在出库列表'
                  }
                } else if (tar.quantity.value >= tar.need.value) {
                  return {
                    status: false,
                    msg: '该商品出库已完成'
                  }
                }
                return {
                  status: true
                };
              }
            }).then(res => {
              const { goodsItems } = res;
              this.$refs.axqGoodsTableStockOut.updateVal(goodsItems.goodsId, goodsItems.id, (value) => {
                value.quantity = Number(value.quantity) + 1;
                this.$message.success('扫码出库成功');
              });
            }).catch(e => {
              this.$refs.axqCodeScanner.blur();
              if (e && e.indexOf('TypeError') > -1) {
                e = '数据错误~';
              }
              this.$alert(e, {
                type: 'warning',
                confirmButtonText: '确定',
                callback: action => { }
              });
            });
          },
          errorTipHook: (e) => {
            this.$alert(e, {
              type: 'warning',
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        }
      },
      goodsTable: {
        fn: {
          changeHandler: (e) => {
            const { current, sort, all } = e;
            this.form.value.stockOutGoodsItemsList.value = all.map(i => {
              const f = StockOutGoodsItems.formUtil().generator('add', 'default');
              f.goodsItems.value = i.goodsItems;
              f.need.value = i.value._extra.limit;
              f.goodsItemsId.value = i.goodsItemsId;
              f.quantity.value = i.value.quantity;
              return f;
            });
          }
        }
      },
      popup: {
        removeTraceCode: {
          fn: {
            scannerOkHandler: (e) => {
              this.traceLog.minusTry(e).catch(e => {
                this.$message.warning(e);
              })
            },
            closeHandler: (ok, error) => {
              if (!this.traceLog.jsonMinusTry.length) {
                this.$message.warning('未扫描溯源码');
                error();
                return;
              }
              this.$confirm('是否删除当前扫码溯源信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.traceLog.minusConfirm().then(minus => {
                  minus.forEach(i => {
                    const { goodsItemsId, status } = i;
                    this.$refs.axqGoodsTableStockOut.updateVal(null, goodsItemsId, (value) => {
                      value.quantity = Number(value.quantity) - 1;
                    });
                  })
                });
                ok();
              }).catch(() => {
                error();
              });
            }
          }
        },
        check: {
          attr: {
            isPurchanseUnnormal: false,
            done: [],
            undo: []
          },
          fn: {
            closeHandler: (ok, error) => {
              if (this.total - this.totalDo) {
                this.$confirm('当前订单商品尚未扫码出库完成，是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  ok();
                  this.$refs.stockOutAdd.next();
                }).catch(() => {
                  error();
                });
                return;
              }
              this.$refs.stockOutAdd.next();
              ok();
            }
          }
        }
      }
    };
  },
  watch: {
    'traceLog.json': {
      handler: function (e) {
        this.form.value.traceJson.value = e;
      },
      deep: true
    },
    'form.value.stockOutGoodsItemsList.value': {
      handler: function (e) {
        this.total = 0;
        this.totalDo = 0;
        this.popup.check.attr.undo = [];
        this.popup.check.attr.done = [];
        e.forEach(i => {
          this.total = this.total + i.need.value;
          this.totalDo = this.totalDo + Number(i.quantity.value);
          if (Number(i.quantity.value)) {
            this.popup.check.attr.done.push({
              goodsItems: i.goodsItems.value,
              quantity: Number(i.quantity.value)
            });
          }
          if (i.need.value - Number(i.quantity.value)) {
            this.popup.check.attr.undo.push({
              goodsItems: i.goodsItems.value,
              quantity: i.need.value - Number(i.quantity.value)
            });
          }
        });
      },
      deep: true
    }
  },
  methods: {
    init() {
      if (this.purchanse.attr.id) {
        this.$nextTick(() => {
          this.purchanse.fn.getPurchanseInfo();
        });
      }
    },
    autoCheck() {
      this.$confirm('一键出库该订单商品，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { purchanseGoodsItemsList, purchanseGiftList } = this.purchanse.attr.info;
        let l = [];
        purchanseGoodsItemsList && purchanseGoodsItemsList.forEach(i => {
          l.push({
            goodsItems: i.goodsItems,
            quantity: i.quantity,
            quantityHasStockOut: i.quantityHasStockOut
          });
        });
        purchanseGiftList && purchanseGiftList.forEach(i => {
          const tar = this.$_.find(l, x => { return x.goodsItems.id == i.goodsItems.id });
          if (tar) {
            tar.quantity = tar.quantity + i.quantity;
            tar.quantityHasStockOut = tar.quantityHasStockOut + i.quantityHasStockOut;
            return;
          }
          l.push({
            goodsItems: i.goodsItems,
            quantity: i.quantity,
            quantityHasStockOut: i.quantityHasStockOut
          });
        });
        l.forEach(i => {
          this.$refs.axqGoodsTableStockOut.updateVal(i.goodsItems.goodsId, i.goodsItems.id, (value) => {
            value.quantity = i.quantity - i.quantityHasStockOut;
          });
        });
        this.$message.success('扫码出库成功');
      }).catch(() => {
      });
    },
    flush() {
      this.$confirm('是否清空当前扫码出库结果?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.purchanse.fn.getPurchanseInfo();
      }).catch(() => {
      });
    },
    addStockOut(e) {
      const { rawForm, callback } = e;
      rawForm.stockOutGoodsItemsList.value = rawForm.stockOutGoodsItemsList.value.filter(i => { return Number(i.quantity.value) > 0 })
      const validate = formToolkit.validate(rawForm);
      if (!validate.form.stockOutGoodsItemsList.length) {
        this.$message({
          message: '请录入出库信息',
          type: 'error'
        });
        return;
      }
      if (validate.form.stockOutGoodsItemsList.some(x => x.quantity < 0 || String(x.quantity).indexOf('.') > -1)) {
        this.$message.warning('输入参数不合法，请校验出库数量');
        reutrn;
      }
      if (validate.ok) {
        StockOut.sendApi('stockOutAdd', { params: { isPurchanseUnnormal: this.popup.check.attr.isPurchanseUnnormal ? 1 : 0 }, data: validate.form }, { showLoading: true }).then(res => {
          const { status, data } = res;
          if (status) {
            const { sysExpressId } = data;
            callback();
            if (sysExpressId === 1) {
              new Printer(2).run(
                {
                  autoPrint: true,
                  width: '76mm',
                  height: '100%',
                  preview: false
                },
                { stockOutId: data.id }
              );
            }
          } else {
            this.$message({
              message: '出库添加失败',
              type: 'error'
            });
          }
        });
      } else {
        this.$message({
          message: '请校验输入信息',
          type: 'warning'
        });
      }
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less">
.stock-out-add {
  padding: 20px;
  background: white;

  .a-purchanse {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebeef5;

    .p-info-item {
      display: flex;
      align-items: center;

      .i-value {
        .options-selector {
          width: 300px;
        }
      }

      &:not(:first-child) {
        margin-top: 20px;
      }
    }
  }

  .a-scanner {
    display: flex;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid #ebeef5;
  }

  .a-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
  }

  .a-result {
    display: flex;
    flex-direction: column;
    align-items: center;

    .r-icon {
      i {
        font-size: 100px;
        color: #19be6b;
      }
    }

    .r-text {
      font-size: 18px;
      color: #000;
    }

    .r-description {
      padding: 20px 0;
    }
  }

  .popup-confirm {
    &_trace-code {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .tc-scanner {
        display: flex;
        align-items: center;

        span {
          padding-left: 20px;
          white-space: nowrap;
        }
      }
    }

    &_check {
      padding: 20px;

      .c-info {
        height: 70px;
      }

      .c-table {
        .t-item {
          &:not(:first-child) {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
