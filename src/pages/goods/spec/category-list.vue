<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-03-12 17:42:15
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/goods/spec/category-list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page goods-spec-category-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$_.get(axqStaffInfo, 'accessExtraJson.allowedModifyGoodsModule') !== 1 ? null :  $refs.popupConfirmGoodsSpecCategoryAdd.open({ triggerClose: popup.goodsSpecCategoryAdd.fn.closeHandler,triggerHidden: popup.goodsSpecCategoryAdd.fn.hiddenHandler })"
        @form-reset="page.fn.resetHandler"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <options-selector
                :mode="1"
                ref="statusOptionsSelector"
                placeholder="状态"
                :config="{entity: 'GoodsCategory', type: 'status'}"
                @change="options.fn.statusChangeHandler"
              ></options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="分类/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmGoodsSpecCategoryAdd" title="属性分类添加">
      <div class="popup-confirm_goods-spec-category-add">
        <form-validate ref="goodsSpecCategoryAdd" :form="popup.goodsSpecCategoryAdd.attr.form">
          <form-validate-field label="属性分类名称" :field="popup.goodsSpecCategoryAdd.attr.form.name">
            <el-input v-model="popup.goodsSpecCategoryAdd.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="描述">
            <el-input v-model="popup.goodsSpecCategoryAdd.attr.form.description.value"></el-input>
          </form-validate-field>
          <form-validate-field
            label="节点"
            :field="popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList"
          >
            <div class="u-goods-spec-key">
              <div class="k-table">
                <el-table
                  :data="popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value"
                  style="width: 100%"
                >
                  <el-table-column label="序号" width="50">
                    <template slot-scope="props">
                      <p>{{ props.$index + 1 }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="名称">
                    <template slot-scope="props">
                      <el-input
                        v-model="popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value[props.$index].name.value"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性" width="300">
                    <template slot-scope="props">
                      <div class="t-goods-spec-category-value">
                        <div class="v-list">
                          <el-tag
                            v-for="(item, key) in popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value[props.$index].goodsSpecValueList.value"
                            :key="key"
                            closable
                            @close="popup.goodsSpecCategoryAdd.fn.deleteGoodsSpecValue(props.$index, key)"
                          >{{ item.name.value }}</el-tag>
                        </div>
                        <div class="v-add" style="display: flex;marginTop:10px;">
                          <el-input
                            :ref="`saveTagInput-${props.$index}`"
                            placeholder="商品规格值"
                            size="small"
                            with="100px"
                            @keyup.enter.native="popup.goodsSpecCategoryAdd.fn.handleInputConfirm(props.$index)"
                            @blur="popup.goodsSpecCategoryAdd.fn.handleInputConfirm(props.$index)"
                            v-model="popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value[props.$index].tmpInputValue.value"
                            v-if="popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value[props.$index].tmpInputVisible.value"
                          ></el-input>
                          <el-button
                            v-else
                            size="small"
                            @click.native="popup.goodsSpecCategoryAdd.fn.showInput(props.$index)"
                          >+添加</el-button>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="props">
                      <el-button
                        type="text"
                        size="small"
                        @click.native="popup.goodsSpecCategoryAdd.fn.deleteGoodsSpecKey(props.$index)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="k-btn" @click="popup.goodsSpecCategoryAdd.fn.addGoodsSpecKey">
                <span>添加</span>
              </div>
            </div>
            <span class="notice-title">注：添加商品规格时优先填写尺码，再到颜色！</span>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmGoodsSpecCategoryUpdate" title="属性分类更新">
      <div class="popup-confirm_goods-spec-category-update">
        <form-validate
          ref="goodsSpecCategoryUpdate"
          :form="popup.goodsSpecCategoryUpdate.attr.form"
          :fill="popup.goodsSpecCategoryUpdate.fn.fill"
        >
          <form-validate-field label="属性分类名称" :field="popup.goodsSpecCategoryUpdate.attr.form.name">
            <el-input v-model="popup.goodsSpecCategoryUpdate.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="描述">
            <el-input v-model="popup.goodsSpecCategoryUpdate.attr.form.description.value"></el-input>
          </form-validate-field>
          <form-validate-field
            label="节点"
            :field="popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList"
          >
            <div class="u-goods-spec-key">
              <div class="k-table">
                <el-table
                  :data="popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value"
                  style="width: 100%"
                >
                  <el-table-column label="序号" width="50">
                    <template slot-scope="props">
                      <p>{{ props.$index + 1 }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="名称">
                    <template slot-scope="props">
                      <el-input
                        v-model="popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value[props.$index].name.value"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="属性" width="300">
                    <template slot-scope="props">
                      <div class="t-goods-spec-category-value">
                        <div class="v-list">
                          <el-tag
                            v-for="(item, key) in popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value[props.$index].goodsSpecValueList.value"
                            :key="key"
                            closable
                            @close="popup.goodsSpecCategoryUpdate.fn.deleteGoodsSpecValue(props.$index, key)"
                          >{{ item.name.value }}</el-tag>
                        </div>
                        <div class="v-add" style="display: flex;marginTop:10px;">
                          <el-input
                            :ref="`saveTagInput-${props.$index}`"
                            placeholder="商品规格值"
                            size="small"
                            with="100px"
                            @keyup.enter.native="popup.goodsSpecCategoryUpdate.fn.handleInputConfirm(props.$index)"
                            @blur="popup.goodsSpecCategoryUpdate.fn.handleInputConfirm(props.$index)"
                            v-model="popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value[props.$index].tmpInputValue.value"
                            v-if="popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value[props.$index].tmpInputVisible.value"
                          ></el-input>
                          <el-button
                            v-else
                            size="small"
                            @click.native="popup.goodsSpecCategoryUpdate.fn.showInput(props.$index)"
                          >+添加</el-button>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="props">
                      <el-button
                        type="text"
                        size="small"
                        @click.native="popup.goodsSpecCategoryUpdate.fn.deleteGoodsSpecKey(props.$index)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="k-btn" @click="popup.goodsSpecCategoryUpdate.fn.addGoodsSpecKey">
                <span>添加</span>
              </div>
            </div>
            <span class="notice-title">注：添加商品规格时优先填写尺码，再到颜色！</span>
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

const { GoodsSpecCategory, GoodsSpecKey, GoodsSpecValue } = model.collection;

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
          entity: 'GoodsSpecCategory',
          action: 'specCategoryPage',
          column: [
            {
              prop: 'id',
              label: '序号'
            },
            {
              prop: 'name',
              label: '名称'
            },
            {
              prop: 'name',
              label: '商品数量',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet($_.get(props.row._raw, 'goodsCount[0]')));
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
              width: '100',
              VNodes: [
                ({ h, props }) => {
                  return h('el-button', {
                    props: { type: 'primary', size: 'mini', disabled: this.$_.get(this.axqStaffInfo, 'accessExtraJson.allowedModifyGoodsModule') !== 1 },
                    nativeOn: {
                      click: () => {
                        this.$refs.popupConfirmGoodsSpecCategoryUpdate.open({ triggerOpen: this.popup.goodsSpecCategoryUpdate.fn.openHandler, triggerClose: this.popup.goodsSpecCategoryUpdate.fn.closeHandler, params: props });
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
        goodsSpecCategoryAdd: {
          attr: {
            form: GoodsSpecCategory.formUtil().generator('add', 'default')
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.goodsSpecCategoryAdd.attr.form);
              if (ok) {
                GoodsSpecCategory.sendApi('specCategoryAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.popup.goodsSpecCategoryAdd.attr.info = data;
                      this.$refs.listPage.query();
                      this.$message({
                        message: '属性分类添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '属性分类添加失败',
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
            showInput: (index) => {
              this.popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value[index].tmpInputVisible.value = true;
              this.$nextTick(_ => {
                this.$refs[`saveTagInput-${index}`].$refs.input.focus();
              });
            },
            addGoodsSpecKey: () => {
              this.popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value.push(GoodsSpecKey.formUtil().generator('add', 'default'));
            },
            deleteGoodsSpecKey: (index) => {
              this.popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value.splice(index, 1);
            },
            handleInputConfirm: (index) => {
              const inputValue = this.popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value[index].tmpInputValue.value;
              if (inputValue) {
                const f = GoodsSpecValue.formUtil().generator('add', 'default');
                f.name.value = inputValue;
                this.popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value[index].goodsSpecValueList.value.push(f);
              }
              this.popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value[index].tmpInputVisible.value = false;
              this.popup.goodsSpecCategoryAdd.attr.form.goodsSpecKeyList.value[index].tmpInputValue.value = '';
            },
            hiddenHandler:()=>{
              this.popup.goodsSpecCategoryAdd.attr.form = GoodsSpecCategory.formUtil().generator('add', 'default');
            }
          }
        },
        goodsSpecCategoryUpdate: {
          attr: {
            form: GoodsSpecCategory.formUtil().generator('update', 'default'),
            info: {}
          },
          fn: {
            fill: (callback) => {
              callback(GoodsSpecCategory, this.popup.goodsSpecCategoryUpdate.attr.info);
            },
            addGoodsSpecKey: () => {
              this.popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value.push(GoodsSpecKey.formUtil().generator('add', 'default'));
            },
            deleteGoodsSpecKey: (index) => {
              this.popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value.splice(index, 1);
            },
            showInput: (index) => {
              this.popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value[index].tmpInputVisible.value = true;
              this.$nextTick(_ => {
                this.$refs[`saveTagInput-${index}`].$refs.input.focus();
              });
            },
            handleInputConfirm: (index) => {
              const inputValue = this.popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value[index].tmpInputValue.value;
              if (inputValue) {
                const f = GoodsSpecValue.formUtil().generator('add', 'default');
                f.name.value = inputValue;
                this.popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value[index].goodsSpecValueList.value.push(f);
              }
              this.popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value[index].tmpInputVisible.value = false;
              this.popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value[index].tmpInputValue.value = '';
            },
            deleteGoodsSpecValue: (index, index1) => {
              this.popup.goodsSpecCategoryUpdate.attr.form.goodsSpecKeyList.value[index].goodsSpecValueList.value.splice(index1, 1);
            },
            openHandler: (ok, params) => {
              this.popup.goodsSpecCategoryUpdate.attr.form = GoodsSpecCategory.formUtil().generator('update', 'default');
              GoodsSpecCategory.sendApi('specCategoryInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.goodsSpecCategoryUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取属性分类信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.goodsSpecCategoryUpdate.attr.form);
              if (ok) {
                GoodsSpecCategory.sendApi('specCategoryUpdate', { params: { id: this.popup.goodsSpecCategoryUpdate.attr.info.id }, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '属性分类更新成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '属性分类更新失败',
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
  },
  methods: {
    add () { }
  }
};
</script>

<style lang="less">
.goods-spec-category-list {
  background: white;
  .popup-confirm {
    &_goods-spec-category-update,
    &_goods-spec-category-add {
      padding: 20px;
      .notice-title {
        color: #fb4646;
      }
      .u-goods-spec-key {
        .k-table {
        }
        .k-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          margin-top: 20px;
          margin-bottom: 20px;
          border: 1px dashed #e9e9e9;
        }
      }
    }
  }
}
</style>
