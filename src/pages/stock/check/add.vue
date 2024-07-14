<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-13 18:16:27
 * @LastEditTime: 2021-12-09 10:08:15
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/stock/check/add.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="stock-check-add">
    <form-validate
      ref="stockCheckAdd"
      type="step"
      :form="form.value"
      :step-config="form.stepConfig"
      @ok="form.fn.okHandler"
    >
      <template slot="step-0">
        <div class="a-seletor">
          <div class="s-item">
            <div class="s-item" style="width: 100px">
              <el-select
                size="mini"
                style="marginright: 10px"
                v-model="options.attr.inputType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options.attr.inputTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="s-item" v-if="options.attr.inputType == 1">
            <axq-code-scanner
              :mode="3"
              @ok="scanner.fn.okHandler"
              v-if="options.attr.inputType === 1"
            ></axq-code-scanner>
          </div>
          <div class="s-item" v-else>
            <options-selector
              :mode="4"
              :config="{ req: options.fn.goodsQuery }"
              @change="options.fn.goodsChangeHandler"
            ></options-selector>
            <el-button
              size="mini"
              type="primary"
              style="marginLeft: 10px"
              @click.native="stockCheckAdd.fn.add"
            >添加</el-button>
          </div>
        </div>
        <div class="a-toolbar">
          <div class="t-left">
            <div class="l-tip">
              <div class="t-item">
                <div class="i-dot" style="background: #515a6e"></div>
                <div class="i-text">系统库存</div>
              </div>
              <div class="t-item">
                <div class="i-dot" style="background: #6d01ff"></div>
                <div class="i-text">冻结库存</div>
              </div>
            </div>
          </div>
          <div class="t-right">
            <el-button-group>
              <el-button type="danger" size="small" @click.native="flush">清空</el-button>
              <el-button size="small" v-if="step === 1" @click.native="doNextStep(2, true)">开始盘点</el-button>
              <el-button size="small" v-if="step === 2" @click.native="doNextStep(3)">核对</el-button>
              <template v-if="step === 3">
                <el-button size="small" @click.native="doNextStep(2)">复盘</el-button>
                <el-button
                  type="primary"
                  size="small"
                  v-submit="{
                    action: () => {
                      $refs.stockCheckAdd.next();
                    },
                  }"
                >提交盘点</el-button>
              </template>
            </el-button-group>
          </div>
        </div>
        <div class="a-table">
          <axq-goods-table
            ref="axqGoodsTableStockCheck"
            :type="3"
            :cell-config="{
            step,
            defaultValue: (v) => {
              return {
              stockSys: v.stock,
              stockFreeze: v.stockFreeze,
              stockReal: 0
            }
            }
          }"
            @change="goodsTable.fn.changeHandler"
          ></axq-goods-table>
        </div>
      </template>
      <div class="a-result" slot="result">
        <div class="r-icon">
          <i class="iconfont icon-chenggong"></i>
        </div>
        <div class="r-text">
          <span>添加盘点成功</span>
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
            @click.native="rep('/stock-check/list')"
          >查看盘点</el-button>
          <el-button style="margin-left: 8px" @click.native="rep('/stock-check/list')">返回列表</el-button>
        </div>
      </div>
    </form-validate>
  </div>
</template>

<script>
import formValidate from '@/components/form-validate';
import optionsSelector from '@/components/options-selector';
import axqGoodsTable from '@/components/axq/goods-table';
import axqCodeScanner from '@/components/axq/code-scanner';

import { model } from '@/model';
const { StockCheck, StockCheckGoodsItems, Goods } =
  model.collection;

export default {
  components: {
    formValidate,
    optionsSelector,
    axqGoodsTable,
    axqCodeScanner
  },
  data () {
    return {
      step: 1,
      form: {
        value: StockCheck.formUtil().generator('add', 'default'),
        stepConfig: {
          noProgress: true,
          list: [
            {
              _validateField: [''],
              title: '步骤一',
              description: '盘点库存'
            }
          ]
        },
        fn: {
          okHandler: (ev) => {
            this.addStockCheck(ev);
          }
        }
      },
      options: {
        attr: {
          inputType: 1,
          inputTypeList: [
            {
              value: 1,
              label: '扫码盘点'
            },
            {
              value: 2,
              label: '手动盘点'
            }
          ],
          tmp: null
        },
        fn: {
          goodsQuery: (e, ok) => {
            Goods.sendApi('page', {
              params: {},
              data: { query: { keyword: e } }
            }).then((res) => {
              const { data } = res;
              ok(
                data.map((i) => ({
                  value: i.id,
                  label: i.name,
                  _raw: new Goods(i)
                }))
              );
            });
          },
          goodsChangeHandler: (e) => {
            this.options.attr.tmp = e;
          }
        }
      },
      stockCheckAdd: {
        fn: {
          add: () => {
            if (!this.options.attr.tmp) {
              this.$message({
                message: '请选择商品',
                type: 'warning'
              });
              return;
            }
            if (
              this.form.value.stockCheckGoodsItemsList.value
                .map(i => i.goodsItems.value.goodsId)
                .includes(this.options.attr.tmp)
            ) {
              this.$message({
                message: '商品已加入盘点~',
                type: 'warning'
              });
              return;
            }
            Goods.sendApi('info', {
              params: {},
              data: { query: { id: this.options.attr.tmp } }
            }, { parse4Entity: true, errorTip: '获取商品详情错误' }).then((res) => {
              const { status, data } = res;
              if (status) {
                this.$refs.axqGoodsTableStockCheck.setVal(data, []);
              }
            });
          }
        }
      },
      scanner: {
        fn: {
          okHandler: (e) => {
            const { goodsItems } = e;
            const gi = this.$_.find(
              this.form.value.stockCheckGoodsItemsList.value,
              (i) => {
                return i.goodsItems.value.goodsId === goodsItems.goodsId;
              }
            );
            if (gi) {
              if (this.step === 1) {
                this.$message.warning(
                  '商品已加入盘点，如需立即盘点，点击开始盘点按钮'
                );
                return;
              }
              this.$refs.axqGoodsTableStockCheck.setVal(goodsItems.goodsId, [], {
                callback: () => {
                  this.$refs.axqGoodsTableStockCheck.updateVal(goodsItems.goodsId, goodsItems.id, (value) => {
                    value.stockReal = Number(value.stockReal) + 1;
                  });
                }
              });
            } else {
              Goods.sendApi('info', {
                params: {},
                data: { query: { id: goodsItems.goodsId } }
              }, { errorTip: '获取商品信息错误', parse4Entity: true }).then((res) => {
                const { status, data } = res;
                if (status) {
                  this.$refs.axqGoodsTableStockCheck.setVal(data, []);
                }
              });
            }
          }
        }
      },
      goodsTable: {
        fn: {
          changeHandler: (e) => {
            const { current, sort, all } = e;
            this.form.value.stockCheckGoodsItemsList.value = all.map(i => {
              const f = StockCheckGoodsItems.formUtil().generator('add', 'default');
              f.goodsItems.value = i.goodsItems;
              f.goodsItemsId.value = i.goodsItemsId;
              f.stockSys.value = i.value.stockSys;
              f.stockReal.value = i.value.stockReal;
              return f;
            });
          }
        }
      },
    };
  },
  methods: {
    doNextStep (n, showTip = false) {
      if (n === 2 && showTip) {
        if (!this.form.value.stockCheckGoodsItemsList.value.length) {
          this.$message({
            message: '请添加盘点商品',
            type: 'error'
          });
          return;
        }
        this.$confirm(
          '点击盘点后，系统将冻结库存，不能入库，出库，下单。',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.lockGoods(1).then(() => {
              this.step = n;
            });
          })
          .catch((e) => {
          });
        return;
      }
      this.step = n;
    },
    flush () {
      this.$confirm('是否清空当前盘点结果,同时释放盘点锁定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.lockGoods(0).then(() => {
            this.form.value = StockCheck.formUtil().generator('add', 'default');
            this.$refs.axqGoodsTableStockCheck.clear();
            this.step = 1;
          });
        })
        .catch(() => { });
    },
    lockGoods (value) {
      return new Promise((resolve) => {
        Goods.sendApi('updateSingleField', { params: { type: 3, id: this.getUniArr(this.form.value.stockCheckGoodsItemsList.value.map(i => i.goodsItems.value.goodsId)).join(',') }, data: { value } }).then(res => {
          const { status, data } = res;
          if (status) {
            resolve();
          } else {
            this.$message.error('更新商品锁定状态失败~');
          }
        });
      })
    },
    addStockCheck (ev) {
      const { form, callback } = ev;
      if (form.stockCheckGoodsItemsList.some(x => x.stockReal < 0 || String(x.stockReal).indexOf('.') > -1)) {
        this.$message.warning('输入参数不合法，请校验盘点数量');
        reutrn;
      }
      StockCheck.sendApi('stockCheckAdd', { params: {}, data: form }, { showLoading: true }, { errorTip: '盘点添加失败' }).then(
        (res) => {
          const { status } = res;
          if (status) {
            callback();
            this.lockGoods(0);
          }
        }
      );
    }
  }
};
</script>

<style lang="less">
.stock-check-add {
  padding: 20px;
  background: white;
  .a-seletor {
    display: flex;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid #ebeef5;
    .s-item {
      display: flex;
      align-items: center;
      &:not(:first-child) {
        padding-left: 10px;
        margin-left: 10px;
        border-left: 1px solid #ebeef5;
      }
    }
  }
  .a-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    .t-left {
      .l-tip {
        display: flex;
        .t-item {
          display: flex;
          align-items: center;
          .i-dot {
            width: 10px;
            height: 10px;
          }
          .i-text {
            margin-left: 10px;
          }
          &:not(:first-child) {
            margin-left: 10px;
          }
        }
      }
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
}
</style>
