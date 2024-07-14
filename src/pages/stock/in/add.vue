<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-06 13:45:12
 * @LastEditTime: 2021-12-09 10:00:09
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/stock/in/add.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="stock-in-add">
    <div class="a-type">
      <div class="t-left">
        <div
          class="offlineSn"
          v-if="$route.query.deliveryId"
        >送货单号：{{this.blankGet(stockDelivery,'_raw.offlineSn')}}</div>
        <options-selector style="margin-bottom: 10px;" :mode="1" placeholder="调换货入库" :config="{ entity: 'StockIn', type: 'type', value: type }"
          @change="type = $event"></options-selector>
        <div v-show="type === 3" style="margin-bottom: 15px; color: #FE011F;">重新入库只更新溯源信息，不会添加库存！用于调换货商品更换溯源码后重新录入信息。</div>
        <el-radio-group v-model="mode" style="margin-bottom: 18px;">
          <el-radio :label="1">溯源码</el-radio>
          <el-radio :label="2">条形码</el-radio>
        </el-radio-group>
      </div>
    </div>
    <form-validate
      ref="stockInAdd"
      type="step"
      :form="form.value"
      :step-config="form.stepConfig"
      @ok="form.fn.okHandler"
    >
      <template slot="step-0">
        <div class="a-scanner">
          <axq-code-scanner
            ref="axqCodeScanner"
            :mode="mode"
            required-status="NONE"
            @ok-goods-items="scanner.fn.okGoodsItemsHandler"
            @ok="scanner.fn.okHandler"
          ></axq-code-scanner>
        </div>
        <div class="a-table">
          <div class="t-toolbar">
            <div class="t-left">
              <p>扫描结果 合计： {{ total }}件</p>
            </div>
            <div class="t-right">
              <el-button-group>
                <el-button type="danger" size="small" @click.native="flush">清空</el-button>
                <el-button
                  size="small"
                  @click.native="
                    $refs.popupConfirmRemoveTraceCode.open({
                      triggerClose: popup.removeTraceCode.fn.closeHandler,
                    })
                  "
                  v-if="mode === 1"
                >移除溯源（{{traceLog.json.length}}/件）</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click.native="
                  $refs.popupConfirmCheck.open({
                    triggerClose: popup.check.fn.closeHandler,
                  })
                "
                  v-if="$route.query.deliveryId"
                >核对</el-button>
                <el-button
                  type="primary"
                  size="small"
                  v-submit="{action: () => {$refs.stockInAdd.next()}}"
                  v-else
                >保存</el-button>
              </el-button-group>
            </div>
          </div>
          <div class="t-box">
            <axq-goods-table
              ref="axqGoodsTableStockIn"
              :type="2"
              :cell-config="{
                defaultValue: (v) => {
                  return {
                    _extra: {
                      disable: !!$route.query.deliveryId,
                      limit: 99999
                    },
                  quantity: 0
                }
                },
                valueFilter: (v) => {return Number(v.quantity) > 0}
              }"
              @change="goodsTable.fn.changeHandler"
            ></axq-goods-table>
          </div>
        </div>
      </template>
      <div class="a-result" slot="result">
        <div class="r-icon">
          <i class="iconfont icon-chenggong"></i>
        </div>
        <div class="r-text">
          <span>添加入库成功</span>
        </div>
        <div class="r-description">
          <p>
            提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用
            Message 全局提示反馈即可。灰色区域可以显示一些补充的信息。
          </p>
        </div>
        <div class="r-link">
          <el-button
            type="primary"
            style="margin-left: 8px"
            @click.native="rep('/stock-in/list')"
          >查看入库</el-button>
          <el-button style="margin-left: 8px" @click.native="rep('/stock-in/list')">返回列表</el-button>
        </div>
      </div>
    </form-validate>
    <popup-confirm
      ref="popupConfirmRemoveTraceCode"
      title="移除溯源码"
      :config="{ width: 600, height: 300 }"
    >
      <div class="popup-confirm_trace-code">
        <div class="tc-scanner">
          <axq-code-scanner
            :mode="7"
            required-status="NONE"
            @ok="popup.removeTraceCode.fn.scannerOkHandler"
          ></axq-code-scanner>
          <span>已扫描（{{traceLog.jsonMinusTry.length}}）件</span>
        </div>
      </div>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmCheck"
      title="入库库核对"
      confirm-text="确认入库"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_check">
        <div class="c-remark">
          <span>备注：</span>
          <el-input type="textarea" placeholder="入库备注" v-model="form.value.remark.value"></el-input>
        </div>
        <div class="c-info">
          <p>送货商品数量： {{ $_.get(stockDelivery, 'stockDeliveryGoodsItemsList', []).reduce((p, c) => {return p + (c.quantity - c.quantityHasStockIn)}, 0) }}/件</p>
        </div>
        <div class="c-table">
          <div class="t-item">
            <div class="i-title">
              <div class="t-left">
                <span>已入库商品数量：{{ popup.check.attr.ok.reduce((p, c) => {return p + c.l}, 0) }}/件</span>
              </div>
            </div>
            <div class="i-box">
              <el-table :stripe="true" :data="popup.check.attr.ok" style="width: 100%">
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
                <el-table-column label="应入库">
                  <template slot-scope="props">
                    <p>{{ props.row.r }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="实际入库">
                  <template slot-scope="props">
                    <p>{{ props.row.l }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="t-item">
            <div class="i-title">
              <div class="t-left">
                <span>异常商品数量：{{ popup.check.attr.error.reduce((p, c) => {return p + c.l}, 0) }}/件</span>
              </div>
            </div>
            <div class="i-box">
              <el-table :stripe="true" :data="popup.check.attr.error" style="width: 100%">
                <el-table-column label="商品名称">
                  <template slot-scope="props">
                    <p>{{ props.row.goodsItems.name }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="应入库">
                  <template slot-scope="props">
                    <p>{{ props.row.r }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="实际入库">
                  <template slot-scope="props">
                    <p>{{ props.row.l }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="popup-confirm_check-footer-left" slot="footer-left" v-if="showUnusaulBtn">
        <el-checkbox v-model="popup.check.attr.isDeliveryUnusual">异常送货单</el-checkbox>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from '@/components/form-validate';
import popupConfirm from '@/components/popup/type/confirm';
import axqCodeScanner from '@/components/axq/code-scanner';
import axqGoodsTable from '@/components/axq/goods-table';
import optionsSelector from '@/components/options-selector';
import { formToolkit } from '@/model/form-toolkit';

import TraceLog from '@/utils/traceLog';
import { model } from '@/model';
const { StockIn, StockInGoodsItems, StockDelivery } = model.collection;

export default {
  components: {
    formValidate,
    popupConfirm,
    axqCodeScanner,
    axqGoodsTable,
    optionsSelector
  },
  data () {
    return {
      traceLog: new TraceLog().setType(1),
      stockDelivery: new StockDelivery(),
      mode: 1,
      type: 1,
      form: {
        value: StockIn.formUtil().generator('add', 'default'),
        stepConfig: {
          noProgress: true,
          noValidate: true,
          list: [
            {
              _validateField: [''],
              title: '步骤一',
              description: '扫码入库'
            }
          ]
        },
        fn: {
          okHandler: (ev) => {
            this.addStockIn(ev);
          }
        }
      },
      scanner: {
        fn: {
          okGoodsItemsHandler: (e) => {
            const { goodsItems } = e;
            if (this.mode === 1) {
              const f1 = StockInGoodsItems.formUtil().generator('add', 'default');
              f1.goodsItems.value = goodsItems;
              f1.goodsItemsId.value = goodsItems.id;
              f1.quantity.value = 0;
              this.form.value.stockInGoodsItemsList.value.push(f1);
            }
          },
          okHandler: (e) => {
            const { goodsItems } = e;
            if (this.$route.query.deliveryId) {
              const tar = this.$refs.axqGoodsTableStockIn.getVal(goodsItems.goodsId, goodsItems.id);
              if ((tar && tar._extra.disable) || !tar) {
                this.$message.warning("该规格商品未在送货单列表中~");
                return;
              }
            }
            this.traceLog.add(e, {}).then(res => {
              this.$refs.axqGoodsTableStockIn.setVal(goodsItems.goodsId, [], {
                callback: () => {
                  this.$refs.axqGoodsTableStockIn.updateVal(goodsItems.goodsId, goodsItems.id, (value) => {
                    value._extra.disable = false;
                    value.quantity = Number(value.quantity) + 1;
                    this.$message.success('扫码入库成功');
                  });
                }
              });
            }).catch(e => {
              this.$refs.axqCodeScanner.blur();
              if (e && (e + '').indexOf('TypeError') > -1) {
                e = '数据错误~';
              }
              this.$alert(e, {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            });
          }
        }
      },
      goodsTable: {
        fn: {
          changeHandler: (e) => {
            const { current, sort, all } = e;
            this.form.value.stockInGoodsItemsList.value = all.map(i => {
              const f = StockInGoodsItems.formUtil().generator('add', 'default');
              f.goodsItems.value = i.goodsItems;
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
                    this.$refs.axqGoodsTableStockIn.updateVal(null, goodsItemsId, (value) => {
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
            isDeliveryUnusual: false,
            ok: [],
            error: []
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
                  this.$refs.stockInAdd.next();
                }).catch(() => {
                  error();
                });
                return;
              }
              this.$refs.stockInAdd.next();
              ok();
            }
          }
        }
      }
    };
  },
  computed: {
    showUnusaulBtn () {
      const { stockDeliveryGoodsItemsList } = this.stockDelivery;
      return this.popup.check.attr.error.length > 0 || stockDeliveryGoodsItemsList.some(x => { return x.quantityHasStockIn > x.quantity });
    },
    total () {
      return this.form.value.stockInGoodsItemsList.value.reduce((p, c) => { return p + Number(c.quantity.value) }, 0);
    }
  },
  watch: {
    'traceLog.json': {
      handler: function (e) {
        this.form.value.traceJson.value = e;
      },
      deep: true
    },
    'form.value.stockInGoodsItemsList.value': {
      handler: function (e) {
        let ok = [];
        let error = [];
        if (this.$route.query.deliveryId) {
          const { stockDeliveryGoodsItemsList } = this.stockDelivery;
          stockDeliveryGoodsItemsList.filter(x => { return x.quantity > x.quantityHasStockIn }).forEach(i => {
            const { goodsItemsId, goodsItems, quantity, quantityHasStockIn } = i;
            const tar = this.$_.find(e, x => { return x.goodsItemsId.value === goodsItemsId });
            const r = quantity - quantityHasStockIn;
            if (tar && Number(tar.quantity.value) === r) {
              ok.push({
                goodsItems,
                r,
                l: Number(tar.quantity.value)
              });
            } else {
              error.push({
                goodsItems,
                r,
                l: tar ? Number(tar.quantity.value) : 0
              });
            }
          });
          e.filter(x => { return !stockDeliveryGoodsItemsList.map(i => i.goodsItemsId).includes(x.goodsItemsId.value) }).forEach(i => {
            error.push({
              goodsItems: i.goodsItems.value,
              r: 0,
              l: i.quantity.value
            })
          });
        }
        this.popup.check.attr.ok = ok;
        this.popup.check.attr.error = error;
        if (error.length > 0) {
          this.popup.check.attr.isDeliveryUnusual = true;
        } else {
          this.popup.check.attr.isDeliveryUnusual = false;
        }
      },
      deep: true
    }
  },
  created () {
    this.$route.query.deliveryId && this.initDeliveryData()
  },
  methods: {
    initDeliveryData () {
      const id = Number(this.$route.query.deliveryId);
      this.form.value.deliveryId.value = id;
      StockDelivery.sendApi('deliveryInfo', { params: {}, data: { query: { id } } }, { parse4Entity: true, errorTip: '获取送货单信息失败~' }).then(res => {
        const { status, data } = res;
        if (status) {
          this.stockDelivery = data;
          const { stockDeliveryGoodsItemsList } = data;
          stockDeliveryGoodsItemsList.forEach(i => {
            const { goodsItemsId, goodsItems, quantity, quantityHasStockIn } = i;
            if (quantity > quantityHasStockIn) {
              this.$refs.axqGoodsTableStockIn.setVal(goodsItems.goodsId, { goodsItemsId, value: { _extra: { disable: false, limit: quantity - quantityHasStockIn }, quantity: '' } });
            }
          });
        }
      })
    },
    flush () {
      this.$confirm('是否清空当前扫码结果?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.axqGoodsTableStockIn.clear([]);
        this.traceLog.clear();
      }).catch(() => {
      });
    },
    addStockIn (e) {
      const { rawForm, callback } = e;
      const validate = formToolkit.validate(rawForm);
      if (validate.ok) {
        if (validate.form.stockInGoodsItemsList.some(x => x.quantity < 0 || String(x.quantity).indexOf('.') > -1)) {
          this.$message.warning('输入参数不合法，请校验入库数量');
          reutrn;
        }
        validate.form.type = this.type;
        StockIn.sendApi('stockInAdd', { params: { isDeliveryUnusual: this.popup.check.attr.isDeliveryUnusual }, data: validate.form }, { showLoading: true }).then(res => {
          const { status } = res;
          if (status) {
            callback();
          } else {
            this.$message({
              message: '入库添加失败',
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
  }
};
</script>

<style lang="less">
.stock-in-add {
  padding: 20px;
  background: white;
  .a-type {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebeef5;
    .offlineSn {
      margin-bottom: 20px;
    }
  }
  .a-scanner {
    display: flex;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid #ebeef5;
  }
  .a-table {
    .t-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100px;
    }
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
      .c-remark {
        display: flex;
        align-items: center;
        span {
          white-space: nowrap;
        }
      }
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
