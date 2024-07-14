<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 16:24:16
 * @LastEditTime: 2022-04-21 14:58:10
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/revert/form/sort.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="revert-form-update">
    <div class="u-distributor">
      <div class="d-info-item">
        <div class="i-label">
          <span>店主/ID：</span>
        </div>
        <div class="i-value">
          <span>{{ blankGet($_.get(info, 'distributor.nickname')) }}/{{ blankGet($_.get(info, 'distributor.id')) }}</span>
        </div>
      </div>
      <div class="d-info-item">
        <div class="i-label">
          <span>店主业绩：</span>
        </div>
        <div class="i-value">
          <span>/</span>
        </div>
      </div>
    </div>
    <form-validate ref="revertFormAdd" type="step" :form="form.value" :fill="form.fn.fill"
      :step-config="form.stepConfig" @ok="form.fn.okHandler">
      <template slot="step-0">
        <div class="u-scanner">
          <div class="s-item" style="width:100px;">
            <el-select size="mini" style="marginRight: 10px;" v-model="options.attr.inputType" placeholder="请选择">
              <el-option v-for="item in options.attr.inputTypeList" :key="item.value" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
          <template v-if="options.attr.inputType == 1">
            <div class="s-item">
              <el-radio-group v-model="inputStatus">
                <el-radio :label="1">合格</el-radio>
                <el-radio :label="2">不合格</el-radio>
              </el-radio-group>
            </div>
            <div class="s-item">
              <axq-code-scanner :mode="3" required-status="ALL" @ok="scanner.fn.okHandler"
                v-if="options.attr.inputType === 1"></axq-code-scanner>
            </div>
          </template>
          <div class="s-item" v-else>
            <options-selector :mode="4" :config="{ req: options.fn.goodsQuery }"
              @change="options.fn.goodsChangeHandler"></options-selector>
            <el-button type="primary" size="mini" style="marginLeft: 10px" @click.native="options.fn.addGoods">选择
            </el-button>
          </div>
        </div>
        <div class="u-toolbar">
          <div class="t-left">
            <div class="l-count">
              <span>合计：{{ total }} / 溯源件数（{{traceLog.json.length}}/件）</span>
            </div>
            <div class="l-tip">
              <div class="t-item">
                <span>合格</span>
                <span style="background: #1890ff;"></span>
              </div>
              <div class="t-item">
                <span>不合格</span>
                <span style="background: #f56c6c;"></span>
              </div>
              <div class="t-item">
                <p>注意：分拣只支持在已有的调换单商品中分类，不支持新增商品！</p>
              </div>
            </div>
          </div>
          <div class="t-right">
            <el-button-group>
              <el-button type="danger" size="small" @click.native="flush">重置</el-button>
              <el-button type="primary" size="small" @click.native="
                  $refs.popupConfirmCheck.open({
                    triggerClose: popup.check.fn.closeHandler,
                  })
                ">核对</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="u-table">
          <axq-goods-table ref="axqGoodsTableRevertForm" :type="4" :cell-config="{
              qualifiedLock: inputStatus === 2,
              unQualifiedLock: inputStatus === 1,
              defaultValue: {
                _extra:{
                  disable: true
                },
                qualified: 0,
                unQualified: 0
              },
            valueFilter: (v) => {return Number(v.qualified) > 0 || Number(v.unQualified) > 0}
          }" @change="goodsTable.fn.changeHandler"></axq-goods-table>
        </div>
      </template>
      <div class="u-result" slot="result">
        <div class="r-icon">
          <i class="iconfont icon-chenggong"></i>
        </div>
        <div class="r-text">
          <span>分拣退换货单成功</span>
        </div>
        <div class="r-description">
          <p>
            提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用
            Message 全局提示反馈即可。灰色区域可以显示一些补充的信息。
          </p>
        </div>
        <div class="r-link">
          <el-button type="primary" style="margin-left: 8px" @click.native="rep('/revert-form/list')">查看调换货单</el-button>
          <el-button style="margin-left: 8px" @click.native="rep('/revert-form/list')">返回列表</el-button>
        </div>
      </div>
    </form-validate>
    <popup-confirm ref="popupConfirmCheck" title="分拣核对" confirm-text="提交袋子费" :config="{ width: 700, height: 500 }">
      <div class="popup-confirm_check">
        <div class="c-info">
          <p>订单商品数量： {{ total }}/件</p>
        </div>
        <div class="c-table">
          <div class="t-item">
            <div class="i-title">
              <div class="t-left">
                <span>合格商品数量：{{ popup.check.attr.quantityQualified }}/件</span>
              </div>
            </div>
            <div class="i-box">
              <el-table :border="true" :stripe="true" :data="popup.check.attr.qualified" style="width: 100%">
                <el-table-column label="商品名称">
                  <template slot-scope="props">
                    <p>{{ props.row.goodsItems.value.name }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="规格"></el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="props">
                    <p>{{ props.row.quantity.value }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="t-item">
            <div class="i-title">
              <div class="t-left">
                <span>不合格商品数量：{{ popup.check.attr.quantityUnqualified }}/件</span>
              </div>
            </div>
            <div class="i-box">
              <el-table :border="true" :stripe="true" :data="popup.check.attr.unqualified" style="width: 100%">
                <el-table-column label="商品名称">
                  <template slot-scope="props">
                    <p>{{ props.row.goodsItems.value.name }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="规格"></el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="props">
                    <p>{{ props.row.quantity.value }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="popup-confirm_check-footer-left" slot="footer-left">
        <el-checkbox v-model="popup.check.attr.isSubmitApproval">提交袋子费审核</el-checkbox>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
  import formValidate from '@/components/form-validate';
  import axqCodeScanner from '@/components/axq/code-scanner';
  import axqGoodsTable from '@/components/axq/goods-table';
  import popupConfirm from '@/components/popup/type/confirm';
  import optionsSelector from '@/components/options-selector';
  import {
    formToolkit
  } from '@/model/form-toolkit';
  import {
    model
  } from '@/model';
  import TraceLog from '@/utils/traceLog';

  const {
    Goods,
    RevertForm,
    RevertFormSort,
    RevertFormGoodsItems
  } = model.collection;

  export default {
    components: {
      formValidate,
      axqCodeScanner,
      axqGoodsTable,
      popupConfirm,
      optionsSelector
    },
    data() {
      return {
        traceLog: new TraceLog().setType(5),
        params: this.$route.params,
        info: null,
        inputStatus: 1,
        total: 0,
        form: {
          value: RevertForm.formUtil().generator('other', 'sort'),
          stepConfig: {
            noProgress: true,
            noValidate: true,
            list: [{
              _validateField: [''],
              title: '步骤一',
              description: '扫码分拣'
            }]
          },
          fn: {
            fill: (callback) => {
              RevertForm.sendApi('formInfo', {
                params: {},
                data: {
                  query: {
                    id: Number(this.params.id)
                  }
                }
              }, {
                parse4Entity: true
              }).then(res => {
                const {
                  status,
                  data
                } = res;
                if (status) {
                  callback(RevertForm, data._raw);
                  this.info = data;
                  this.form.fn.setDefaultValue(data);
                } else {
                  this.$message({
                    message: '获取调换货订单信息错误',
                    type: 'error'
                  });
                }
              });
            },
            setDefaultValue: (data) => {
              const {
                traceJson,
                list2UnQualified
              } = data;
              traceJson.forEach(i => {
                i.status = 2
              });
              this.traceLog.init(traceJson);
              list2UnQualified.forEach(i => {
                const {
                  goodsItems,
                  qualified,
                  unQualified
                } = i;
                this.$refs.axqGoodsTableRevertForm.setVal(goodsItems.goodsId, {
                  goodsItemsId: goodsItems.id,
                  value: {
                    _extra: {
                      disable: false
                    },
                    qualified,
                    unQualified
                  }
                })
              });
            },
            okHandler: (ev) => {
              this.addRevertForm(ev);
            }
          }
        },
        options: {
          attr: {
            inputType: 1,
            inputTypeList: [{
                value: 1,
                label: '扫码分拣'
              },
              {
                value: 2,
                label: '手动分拣'
              }
            ],
            tmp: null
          },
          fn: {
            goodsQuery: (e, ok) => {
              Goods.sendApi('page', {
                params: {},
                data: {
                  query: {
                    keyword: e,
                    type: this.form.value.ptType.value
                  }
                }
              }).then(res => {
                const {
                  data
                } = res;
                ok(data.map(i => ({
                  value: i.id,
                  label: i.name
                })));
              });
            },
            goodsChangeHandler: (e) => {
              this.options.attr.tmp = e;
            },
            addGoods: () => {
              if (!this.options.attr.tmp) {
                this.$message.warning('请选择商品');
                return;
              }
              if (this.form.value.revertFormSortList.value.map(i => i.goodsItems.goodsId).includes(this.options.attr
                  .tmp)) {
                this.$message.warning('请勿重复添加商品');
                return;
              }
              this.$refs.axqGoodsTableRevertForm.setVal(this.options.attr.tmp, []);
            }
          }
        },
        scanner: {
          fn: {
            okHandler: (e) => {
              this.traceLog.update(e, {
                status: this.inputStatus
              }).then(res => {
                const {
                  goodsItems,
                  vNew,
                  vOld
                } = res;
                if (vOld && vNew.status === vOld.status) {
                  this.$message.warning('该溯源码已分拣~');
                  return;
                }
                this.$refs.axqGoodsTableRevertForm.setVal(goodsItems.goodsId, [], {
                  callback: () => {
                    this.$refs.axqGoodsTableRevertForm.updateVal(goodsItems.goodsId, goodsItems.id, (
                      value) => {
                        if (this.inputStatus === 1) {
                          value.qualified = Number(value.qualified) + 1;
                        } else {
                          value.unQualified = Number(value.unQualified) + 1;
                        }
                        this.$message.success('扫码分拣成功');
                      });
                  }
                });
              }).catch(e => {
                this.$message.warning(e);
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
              this.form.value.revertFormGoodsItemsList.value = all.map(i => {
                const f = RevertFormGoodsItems.formUtil().generator('add', 'default');
                f.goodsItems.value = i.goodsItems;
                f.goodsItemsId.value = i.goodsItemsId;
                f.quantity.value = Number(i.value.qualified) + Number(i.value.unQualified);
                return f;
              });
              this.form.value.revertFormSortList.value = all.filter(i => {
                return Number(i.value.qualified) > 0
              }).map(i => {
                const f = RevertFormSort.formUtil().generator('add', 'default');
                f.goodsItems.value = i.goodsItems;
                f.goodsItemsId.value = i.goodsItemsId;
                f.quantity.value = i.value.qualified;
                f.status.value = 1;
                return f;
              }).concat(all.filter(i => {
                return Number(i.value.unQualified) > 0
              }).map(i => {
                const f = RevertFormSort.formUtil().generator('add', 'default');
                f.goodsItems.value = i.goodsItems;
                f.goodsItemsId.value = i.goodsItemsId;
                f.quantity.value = i.value.unQualified;
                f.status.value = 2;
                return f;
              }));
            }
          }
        },
        popup: {
          check: {
            attr: {
              isSubmitApproval: true,
              quantityQualified: 0,
              quantityUnqualified: 0,
              qualified: [],
              unqualified: []
            },
            fn: {
              closeHandler: (ok) => {
                this.$refs.revertFormAdd.next();
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
      'form.value.revertFormSortList.value': {
        handler: function (e) {
          this.total = 0;
          this.popup.check.attr.quantityQualified = 0;
          this.popup.check.attr.quantityUnqualified = 0;
          this.popup.check.attr.qualified = [];
          this.popup.check.attr.unqualified = [];
          e.forEach(i => {
            this.total = this.total + Number(i.quantity.value);
            if (i.status.value === 1) {
              this.popup.check.attr.quantityQualified = this.popup.check.attr.quantityQualified + Number(i
                .quantity.value);
              this.popup.check.attr.qualified.push(i);
            } else {
              this.popup.check.attr.quantityUnqualified = this.popup.check.attr.quantityUnqualified + Number(i
                .quantity.value);
              this.popup.check.attr.unqualified.push(i);
            }
          });
        },
        deep: true
      }
    },
    methods: {
      flush() {
        this.$confirm('是否清空当前扫码分拣结果?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.axqGoodsTableRevertForm.clear();
          this.traceLog.clear();
          this.form.fn.setDefaultValue(this.info);
        }).catch(() => {});
      },
      addRevertForm(e) {
        const {
          rawForm,
          callback
        } = e;
        const validate = formToolkit.validate(rawForm);
        if (validate.ok) {
          RevertForm.sendApi('formUpdate', {
            params: {
              isSubmitApproval: this.popup.check.attr.isSubmitApproval,
              type: 1,
              id: Number(this.params.id)
            },
            data: {
              revertForm: validate.form
            }
          }, {
            showLoading: true
          }).then(res => {
            const {
              status
            } = res;
            if (status) {
              callback();
            } else {
              this.$message({
                message: '调换货单更新成功',
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
  .revert-form-update {
    padding: 20px;
    background: white;

    .u-distributor {
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;
      border-bottom: 1px solid #ebeef5;

      .d-info-item {
        display: flex;
        align-items: center;

        &:not(:first-child) {
          margin-top: 20px;
        }
      }
    }

    .u-scanner {
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

    .u-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100px;

      .t-left {
        display: flex;

        .l-tip {
          display: flex;
          align-items: center;
          padding-left: 20px;

          .t-item {
            display: flex;
            align-items: center;

            span {
              &:nth-child(2) {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-left: 10px;
              }
            }

            p {
              margin: 0;
              color: #f56c6c;
            }

            &:not(:first-child) {
              margin-left: 10px;
            }
          }
        }
      }
    }

    .u-result {
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
          height: 50px;
          font-size: 14px;
          font-weight: bold;
        }

        .c-table {
          .t-item {
            .i-title {
              .t-left {
                font-size: 14px;
                font-weight: bold;
              }
            }

            &:not(:first-child) {
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
</style>