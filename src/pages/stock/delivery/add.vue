<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-13 18:16:27
 * @LastEditTime: 2021-12-09 10:11:15
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/stock/delivery/add.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="stock-delivery-add">
    <form-validate
      ref="stockDeliveryAdd"
      type="step"
      :form="form.value"
      :step-config="form.stepConfig"
      @ok="form.fn.okHandler"
    >
      <template slot="step-0">
        <div class="s-form">
          <el-input
            placeholder="请输入线下单号"
            style="width:250px"
            v-model="form.value.offlineSn.value"
            size="mini"
          ></el-input>
        </div>
        <div class="a-seletor">
          <options-selector
            :mode="4"
            :config="{ req: options.fn.goodsQuery }"
            @change="options.fn.goodsChangeHandler"
          ></options-selector>
          <el-button
            size="mini"
            type="primary"
            style="marginLeft: 10px"
            @click.native="stockDeliveryAdd.fn.add"
          >添加</el-button>
        </div>
        <div class="a-toolbar">
          <div class="t-left"></div>
          <div class="t-right">
            <el-button-group>
              <el-button type="danger" size="small" @click.native="flush">清空</el-button>
              <el-button
                type="primary"
                size="small"
                v-submit="{
                    action: () => {
                      $refs.stockDeliveryAdd.next();
                    },
                  }"
              >添加</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="a-select">
          <div class="s-no-data" v-if="!select.attr.list.length">
            <span>暂无选择商品</span>
          </div>
          <div class="s-list" v-else>
            <div
              class="l-item"
              :class="{'l-item-active': key === select.attr.index}"
              :key="key"
              @click="select.fn.changeGoods(key)"
              v-for="(item, key) in select.attr.list"
            >
              <span>
                {{
                `${item.goods.name}/${item.quantity}`
                }}件
              </span>
              <i class="iconfont icon-shanchu1 close" @click="select.fn.delete(key)"></i>
            </div>
          </div>
        </div>
        <div class="a-table">
          <axq-goods-table
            ref="axqGoodsTableStockDelivery"
            :type="2"
            :cell-config="{
            defaultValue: (v) => {
              return {
              quantity: 0
            }
            },
            valueFilter: (v) => {return Number(v.quantity) > 0}
          }"
            :visible="[
                    select.attr.list.length
                      ? select.attr.list[select.attr.index]
                        ? select.attr.list[select.attr.index].goods.id
                        : -1
                      : -1,
                  ]"
            @change="goodsTable.fn.changeHandler"
          ></axq-goods-table>
        </div>
        <div class="a-total">
          <span>送货总计：{{select.attr.total}}/件</span>
        </div>
      </template>
      <div class="a-result" slot="result">
        <div class="r-icon">
          <i class="iconfont icon-chenggong"></i>
        </div>
        <div class="r-text">
          <span>添加送货单成功</span>
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
            @click.native="rep('/stock-delivery/list')"
          >查看送货单列表</el-button>
          <el-button style="margin-left: 8px" @click.native="rep('/stock-delivery/list')">返回列表</el-button>
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

import {
  model
} from '@/model';
const {
  StockDelivery,
  StockDeliveryGoodsItems,
  Goods
} =
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
        value: StockDelivery.formUtil().generator('add', 'default'),
        stepConfig: {
          noProgress: true,
          list: [{
            title: '步骤一',
            description: '添加送货单'
          }]
        },
        fn: {
          okHandler: (ev) => {
            this.addStockDelivery(ev);
          }
        }
      },
      options: {
        attr: {
          tmp: null
        },
        fn: {
          goodsQuery: (e, ok) => {
            Goods.sendApi('page', {
              params: {},
              data: {
                query: {
                  keyword: e
                }
              }
            }).then((res) => {
              const {
                data
              } = res;
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
      select: {
        attr: {
          index: -1,
          list: [],
          total: 0
        },
        fn: {
          changeGoods: (i) => {
            this.select.attr.index = i;
          },
          delete: (index) => {
            this.$refs.axqGoodsTableStockDelivery.clear([this.select.attr.list[index].goods.id]);
            this.select.attr.index = this.select.attr.list.length - 2;
            this.select.attr.list.splice(index, 1);
          },
        }
      },
      stockDeliveryAdd: {
        fn: {
          add: () => {
            if (!this.options.attr.tmp) {
              this.$message({
                message: '请选择商品',
                type: 'warning'
              });
              return;
            }
            if (this.$_.find(this.select.attr.list, x => {
              return x.goods.id === this.options.attr.tmp
            })) {
              this.$message({
                message: '商品已加入送货列表~',
                type: 'warning'
              });
              return;
            }
            Goods.sendApi('info', {
              params: {},
              data: {
                query: {
                  id: this.options.attr.tmp
                }
              }
            }, {
              parse4Entity: true,
              errorTip: '获取商品详情错误'
            }).then((res) => {
              const {
                status,
                data
              } = res;
              if (status) {
                this.select.attr.list.push({
                  goods: data,
                  quantity: 0
                });
                this.select.attr.index = this.select.attr.list.length - 1;
                this.$refs.axqGoodsTableStockDelivery.setVal(data, []);
              }
            });
          }
        }
      },
      goodsTable: {
        fn: {
          changeHandler: (e) => {
            const {
              current,
              sort,
              all
            } = e;
            this.select.attr.list.forEach(i => {
              i.quantity = 0;
            });
            this.form.value.stockDeliveryGoodsItemsList.value = [];
            this.select.attr.total = 0;
            for (const i in all) {
              const quantity = Number(all[i].value.quantity);
              if (quantity) {
                const f = StockDeliveryGoodsItems.formUtil().generator('add', 'default');
                f.goodsItems.value = all[i].goodsItems;
                f.goodsItemsId.value = all[i].goodsItemsId;
                f.quantity.value = quantity;
                this.form.value.stockDeliveryGoodsItemsList.value.push(f);
              }
              for (const j in this.select.attr.list) {
                if (this.select.attr.list[j].goods.id === all[i].goodsId) {
                  this.select.attr.list[j].quantity = this.select.attr.list[j].quantity + quantity;
                  this.select.attr.total = this.select.attr.total + quantity;
                  break;
                }
              }
            }
          }
        }
      },
    };
  },
  methods: {
    flush () {
      this.$confirm('是否清空当前结果?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.form.value = StockDelivery.formUtil().generator('add', 'default');
          this.$refs.axqGoodsTableStockDelivery.clear();
          this.step = 1;
        })
        .catch(() => { });
    },
    addStockDelivery (ev) {
      const {
        form,
        callback
      } = ev;
      if (form.stockDeliveryGoodsItemsList.some(x => x.quantity < 0 || String(x.quantity).indexOf('.') > -1)) {
        this.$message.warning('输入参数不合法，请校验送货数量');
        reutrn;
      }
      StockDelivery.sendApi('deliveryAdd', {
        params: {},
        data: form
      }, {
        showLoading: true,
        errorTip: '送货单添加失败'
      }).then(
        (res) => {
          const {
            status
          } = res;
          if (status) {
            callback();
          }
        }
      );
    }
  }
};
</script>

<style lang="less">
.stock-delivery-add {
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

  .a-select {
    .s-list {
      display: flex;
      padding: 20px 0;
      flex-wrap: wrap;

      .l-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        padding: 0 20px;
        margin-right: 20px;
        margin-bottom: 10px;
        background: #ffffff;
        border: 1px solid #c5c8ce;
        border-radius: 5px;

        .close {
          position: absolute;
          top: -15px;
          right: -15px;
          font-size: 30px;
          color: #fe011f;
        }

        &-active {
          border: 1px solid #2d8cf0;

          span {
            color: #2d8cf0;
          }
        }

        &:hover {
          cursor: pointer;
        }
      }
    }

    .s-no-data {
      display: flex;
      align-items: center;
      justify-content: center;
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
}
</style>