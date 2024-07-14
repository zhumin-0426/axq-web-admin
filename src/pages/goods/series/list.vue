<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-03-12 17:43:18
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/goods/series/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page goods-series-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$_.get(axqStaffInfo, 'accessExtraJson.allowedModifyGoodsModule') !== 1 ? null : $refs.popupConfirmGoodsSeriesAdd.open({triggerClose: popup.goodsSeriesAdd.fn.closeHandler,triggerHidden: popup.goodsSeriesAdd.fn.hiddenHandler})"
        @form-reset="page.fn.resetHandler"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <options-selector
                :mode="1"
                ref="statusOptionsSelector"
                placeholder="状态"
                :config="{entity: 'GoodsSeries', type: 'status'}"
                @change="options.fn.statusChangeHandler"
              ></options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="商品组合/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmGoodsSeriesAdd" title="商品组合添加">
      <div class="popup-confirm_goods-series-add">
        <form-validate ref="goodsSeriesAdd" :form="popup.goodsSeriesAdd.attr.form">
          <form-validate-field label="商品组合名称" :field="popup.goodsSeriesAdd.attr.form.name">
            <el-input v-model="popup.goodsSeriesAdd.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="成本价" :field="popup.goodsSeriesAdd.attr.form.amount">
            <el-input type="number" v-model="popup.goodsSeriesAdd.attr.form.amount.value"></el-input>
          </form-validate-field>
          <form-validate-field label="状态">
            <el-radio-group v-model="popup.goodsSeriesAdd.attr.form.status.value">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmGoodsSeriesUpdate" title="商品组合更新">
      <div class="popup-confirm_goods-series-update">
        <form-validate
          ref="goodsSeriesUpdate"
          :form="popup.goodsSeriesUpdate.attr.form"
          :fill="popup.goodsSeriesUpdate.fn.fill"
        >
          <form-validate-field label="父类"></form-validate-field>
          <form-validate-field label="商品组合名称" :field="popup.goodsSeriesUpdate.attr.form.name">
            <el-input v-model="popup.goodsSeriesUpdate.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="成本价" :field="popup.goodsSeriesUpdate.attr.form.amount">
            <el-input type="number" v-model="popup.goodsSeriesUpdate.attr.form.amount.value"></el-input>
          </form-validate-field>
          <form-validate-field label="状态">
            <el-radio-group v-model="popup.goodsSeriesUpdate.attr.form.status.value">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>

import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';
import listPage from '@/components/list-page';
import optionsSelector from '@/components/options-selector';
import popupConfirm from '@/components/popup/type/confirm';
import { formToolkit } from '@/model/form-toolkit';

import { model } from '@/model';
const { GoodsSeries } = model.collection;

export default {
  components: {
    formValidate,
    formValidateField,
    listPage,
    optionsSelector,
    popupConfirm
  },
  data () {
    return {
      options: {
        fn: {
          statusChangeHandler: (e) => {
            this.page.form.query.status = e;
          }
        }
      },
      page: {
        config: {
          entity: 'GoodsSeries',
          action: 'seriesPage',
          column: [
            {
              prop: 'id',
              label: 'ID',
            },
            {
              prop: 'name',
              label: '名称'
            },
            {
              prop: 'amount',
              label: '成本价/￥'
            },
            {
              prop: 'createTime',
              label: '创建时间'
            },
            {
              fixed: 'right',
              prop: 'action',
              label: '操作',
              width: '100',
              VNodes: [
                ({ h, props }) => {
                  return h('el-button', {
                    props: { type: 'primary', size: 'mini', disabled: this.$_.get(this.axqStaffInfo, 'accessExtraJson.allowedModifyGoodsModule') !== 1 },
                    nativeOn: {
                      click: () => {
                        this.$refs.popupConfirmGoodsSeriesUpdate.open({ triggerOpen: this.popup.goodsSeriesUpdate.fn.openHandler, triggerClose: this.popup.goodsSeriesUpdate.fn.closeHandler, params: props });
                      }
                    }
                  }, '编辑');
                }
              ]
            }
          ],
          selectable: true
        },
        form: {
          query: {
            status: '',
            keyword: ''
          },
          order: {}
        },
        fn: {
          resetHandler: () => {
            this.$refs.statusOptionsSelector.reset();
          }
        }
      },
      popup: {
        goodsSeriesAdd: {
          attr: {
            form: GoodsSeries.formUtil().generator('add', 'default')
          },
          fn: {
            closeHandler: (okCallback,errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.goodsSeriesAdd.attr.form);
              if (ok) {
                GoodsSeries.sendApi('seriesAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '商品组合添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '商品组合添加失败',
                        type: 'warning'
                      });
                    }
                  }
                );
              } else {
                errorCallback();
                this.$message({
                  message: '请确认信息',
                  type: 'warning'
                });
              }
            },
            hiddenHandler:()=>{
              this.popup.goodsSeriesAdd.attr.form = GoodsSeries.formUtil().generator('add', 'default');
            }
          }
        },
        goodsSeriesUpdate: {
          attr: {
            form: GoodsSeries.formUtil().generator('update', 'default'),
            info: {}
          },
          fn: {
            fill: (callback) => {
              callback(GoodsSeries, this.popup.goodsSeriesUpdate.attr.info);
            },
            openHandler: (ok, params) => {
              GoodsSeries.sendApi('seriesInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.goodsSeriesUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取商品组合信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.goodsSeriesUpdate.attr.form);
              if (ok) {
                GoodsSeries.sendApi('seriesUpdate', { params: { id: this.popup.goodsSeriesUpdate.attr.info.id }, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '商品组合更新成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '商品组合更新失败',
                        type: 'warning'
                      });
                    }
                  }
                );
              } else {
                errorCallback();
                this.$message({
                  message: '请确认信息',
                  type: 'warning'
                });
              }
            }
          }
        }
      }
    };
  }
};
</script>

<style lang="less">
.goods-series-list {
  background: white;
  .popup-confirm {
    &_goods-series-add {
      padding: 20px;
    }
    &_goods-series-update {
      padding: 20px;
    }
  }
}
</style>
