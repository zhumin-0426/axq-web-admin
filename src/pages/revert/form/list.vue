<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-04-20 09:35:37
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/revert/form/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page revert-form-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="go('/revert-form/add')"
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
                placeholder="状态"
                :config="{entity: 'RevertForm', type: 'status'}"
                @change="options.fn.statusChangeHandler"
              ></options-selector>
            </div>
            <div class="b-item">
              <options-selector
                :mode="4"
                ref="distributorOptionsSelector"
                placeholder="店主/ID/手机号"
                :config="{req: options.fn.distributorQuery}"
                @change="options.fn.distributorChangeHandler"
              ></options-selector>
            </div>
            <div class="b-item">
              <el-input size="small" placeholder="店主/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmRevertFormInfo" title="退换货单详情">
      <div class="popup-confirm_revert-form-info">
        <grid :col="2" title="调换信息" border>
          <grid-item label="店主/ID：">
            <span>{{ blankGet($_.get(popup.revertForm.attr.result, '_raw.distributor.nickname')) }}/{{ blankGet($_.get(popup.revertForm.attr.result, '_raw.distributor.id')) }}</span>
          </grid-item>
          <grid-item label="创建时间：">
            <span>{{ blankGet($_.get(popup.revertForm.attr.result, '_raw.createTime')) }}</span>
          </grid-item>
          <grid-item label="商品总数：">
            <span>{{ blankGet($_.get(popup.revertForm.attr.result, '_raw.quantity')) }}</span>
          </grid-item>
          <grid-item label="合格数量：">
            <span>{{ popup.revertForm.attr.result.quantityQualified}}</span>
          </grid-item>
          <grid-item></grid-item>
        </grid>
        <grid title="调换商品">
          <axq-goods-table
            slot="noGrid"
            ref="axqGoodsTableRevertFormGoodsItemsList"
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
        <grid title="分拣结果">
          <template slot="noGrid">
            <div class="t-tip">
              <div class="t-item">
                <span>合格</span>
                <span style="background: #1890ff;"></span>
              </div>
              <div class="t-item">
                <span>不合格</span>
                <span style="background: #f56c6c;"></span>
              </div>
            </div>
            <axq-goods-table
              ref="axqGoodsTableRevertFormSortList"
              :type="4"
              :cell-config="{
                qualifiedLock: true,
                unQualifiedLock: true,
                defaultValue: (v) => {
                  return {
                  qualified: '--',
                  unQualified: '--'
                }
                }
              }"
            ></axq-goods-table>
          </template>
        </grid>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import listPage from '@/components/list-page';
import popupConfirm from '@/components/popup/type/confirm';
import axqGoodsTable from '@/components/axq/goods-table';
import optionsSelector from '@/components/options-selector';
import timePicker from '@/components/time-picker';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';
import { model } from '@/model';

const {
  RevertForm,
  GoodsItems,
  Member
} = model.collection;

export default {
  components: {
    listPage,
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
        RevertForm
      },
      options: {
        fn: {
          statusChangeHandler: (e) => {
            this.page.form.query.status = e;
          },
          timeChangeHandler: (e) => {
            const [startTime, endTime] = e;
            this.page.form.query.startTime = startTime;
            this.page.form.query.endTime = endTime;
          },
          distributorQuery: (e, ok) => {
            Member.sendApi('page', { params: {}, data: { query: { type: 7, keyword: e } } }).then(res => {
              const { data } = res;
              ok(data.map(i => ({ value: i.id, label: `${i.nickname}/${i.id}` })));
            });
          },
          distributorChangeHandler: (e) => {
            this.page.form.query.distributorId = e;
          }
        }
      },
      page: {
        config: {
          entity: 'RevertForm',
          action: 'formPage',
          selectable: false,
          column: [
            {
              prop: 'id',
              label: '序号'
            },
            {
              prop: 'sn',
              label: '调换货编号'
            },
            {
              label: '店主/ID',
              VNodes: [
                ({ h, props }) => {
                  const content = `${this.blankGet(this.$_.get(props.row, '_raw.distributorName'))}/${this.blankGet(this.$_.get(props.row, '_raw.distributorId'))}`
                  return h('p', content);
                }
              ]
            },
            {
              prop: '',
              label: '商品数量',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(this.$_.get(props.row, '_raw.quantity')));
                }
              ]
            },
            {
              prop: '',
              label: '状态',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(this.entitys.RevertForm.filter('status', this.$_.get(props.row._raw, 'status'))));
                }
              ]
            },
            {
              prop: '',
              label: '客服备注',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(this.$_.get(props.row._raw,'remark')));
                }
              ]
            },
            {
              prop: '',
              label: '提交人',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(this.$_.get(props.row, '_raw.operatorName')));
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
              width: '160',
              VNodes: (props) => {
                const btns = [
                  ({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmRevertFormInfo.open({ triggerOpen: this.popup.revertForm.fn.openHandler, params: props });
                        }
                      }
                    }, '查看');
                  }
                ];
                if (props.row.status === 0) {
                  btns.push(({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.go(`/revert-form/sort/${props.row.id}?type=1`);
                        }
                      }
                    }, '分拣');
                  });
                }
                if (props.row.status === 1 || props.row.status === 4) {
                  btns.push(({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.go(`/revert-form/sort/${props.row.id}?type=2`);
                        }
                      }
                    }, '重新分拣');
                  });
                }
                if (props.row.status === 4) {
                  btns.push(({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'danger', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$confirm('此操作将永久删除改调换货单, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                            RevertForm.sendApi('formDelete', { params: { id: props.row._raw.id }, data: {} }, { errorTip: '删除轮播图失败' }).then(res => {
                              const { status } = res;
                              if (status) {
                                this.$refs.listPage.query();
                                this.$message.success('删除成功');
                              }
                            });
                          }).catch(() => {
                          });
                        }
                      }
                    }, '删除');
                  });
                }
                return btns;
              }
            }
          ]
        },
        form: {
          query: {
            status: '',
            keyword: '',
            distributorId: '',
            startTime: '',
            endTime: ''
          },
          order: {}
        },
        fn: {
          resetHandler: () => {
            this.$refs.timePicker.reset();
            this.$refs.statusOptionsSelector.reset();
            this.$refs.distributorOptionsSelector.reset();
          }
        }
      },
      popup: {
        revertForm: {
          attr: {
            result: new RevertForm()
          },
          fn: {
            openHandler: (ok, props) => {
              ok();
              RevertForm.sendApi('formInfo', { params: {}, data: { query: { id: props.row.id } } }, { parse4Entity: true }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.revertForm.attr.result = data;
                  const { revertFormGoodsItemsList, uniSortByGoodsItemsId } = data;
                  this.$nextTick(() => {
                    revertFormGoodsItemsList.forEach(i => {
                      const { goodsItems } = i;
                      this.$refs.axqGoodsTableRevertFormGoodsItemsList.setVal(goodsItems.goodsId, { goodsItemsId: goodsItems.id, value: { quantity: i.quantity } });
                    });
                    uniSortByGoodsItemsId.forEach(i => {
                      const { goodsItems, qualified, unQualified } = i;
                      this.$refs.axqGoodsTableRevertFormSortList.setVal(goodsItems.goodsId, { goodsItemsId: goodsItems.id, value: { qualified, unQualified } });
                    });
                  });
                } else {
                  this.$message({
                    message: '获取调换货单信息失败',
                    type: 'error'
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
.revert-form-list {
  background: white;
  .popup-confirm {
    &_revert-form-info {
      padding: 20px;
      .t-tip {
        display: flex;
        align-items: center;
        height: 40px;
        .t-item {
          span {
            &:nth-child(2) {
              display: inline-block;
              width: 10px;
              height: 10px;
              margin-left: 10px;
            }
          }
          &:not(:first-child) {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
