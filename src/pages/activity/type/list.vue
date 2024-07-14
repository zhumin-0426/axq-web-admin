<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-03-17 09:24:57
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/activity/type/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page activity-type-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmActivityTypeAdd.open({triggerClose: popup.activityTypeAdd.fn.closeHandler,triggerHidden: popup.activityTypeAdd.fn.hiddenHandler})"
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
              <el-input size="small" placeholder="活动类型/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmActivityTypeAdd" title="活动类型类型添加">
      <div class="popup-confirm_activity-type-add">
        <form-validate ref="activityTypeAdd" :form="popup.activityTypeAdd.attr.form">
          <form-validate-field label="活动类型名称" :field="popup.activityTypeAdd.attr.form.title">
            <el-input v-model="popup.activityTypeAdd.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="是否免费" :field="popup.activityTypeAdd.attr.form.isFree">
            <el-radio-group v-model="popup.activityTypeAdd.attr.form.isFree.value">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="描述">
            <el-input v-model="popup.activityTypeAdd.attr.form.description.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmActivityTypeUpdate" title="活动类型类型更新">
      <div class="popup-confirm_activity-type-update">
        <form-validate ref="activityTypeUpdate" :form="popup.activityTypeUpdate.attr.form">
          <form-validate-field label="活动类型名称" :field="popup.activityTypeUpdate.attr.form.title">
            <el-input v-model="popup.activityTypeUpdate.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="是否免费" :field="popup.activityTypeUpdate.attr.form.isFree">
            <el-radio-group v-model="popup.activityTypeUpdate.attr.form.isFree.value">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="描述">
            <el-input v-model="popup.activityTypeUpdate.attr.form.description.value"></el-input>
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
const { ActivityType } = model.collection;

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
          entity: 'ActivityType',
          action: 'typePage',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: 'title',
              label: '活动类型名称'
            },
            {
              prop: '',
              label: '参与店铺数量'
            },
            {
              prop: 'description',
              label: '描述'
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
              VNodes: [
                ({ h }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                        }
                      }
                    },
                    '查看');
                },
                ({ h, props }) => {
                  return h('el-button', {
                    props: { type: 'primary', size: 'mini' },
                    nativeOn: {
                      click: () => {
                        this.$refs.popupConfirmActivityTypeUpdate.open({ triggerOpen: this.popup.activityTypeUpdate.fn.openHandler, triggerClose: this.popup.activityTypeUpdate.fn.closeHandler, params: props });
                      }
                    }
                  }, '编辑');
                }
              ]
            }
          ]
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
        activityTypeAdd: {
          attr: {
            form: ActivityType.formUtil().generator('add', 'default')
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.activityTypeAdd.attr.form);
              if (ok) {
                ActivityType.sendApi('typeAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '活动类型添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '活动类型添加失败',
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
            hiddenHandler: ()=>{
              this.popup.activityTypeAdd.attr.form = ActivityType.formUtil().generator('add', 'default');
            }
          }
        },
        activityTypeUpdate: {
          attr: {
            form: ActivityType.formUtil().generator('update', 'default'),
            info: {}
          },
          fn: {
            fill: (callback) => {
              callback(ActivityType, this.popup.activityTypeUpdate.attr.info);
            },
            openHandler: (ok, params) => {
              ActivityType.sendApi('typeInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.activityTypeUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取活动类型信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.activityTypeUpdate.attr.form);
              if (ok) {
                ActivityType.sendApi('typeUpdate', { params: { id: this.popup.activityTypeUpdate.attr.info.id }, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '活动类型更新成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '活动类型更新失败',
                        type: 'warning'
                      });
                    }
                  }
                );
              } else {
                errorCallback;
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
.activity-type-list {
  background: white;
  .popup-confirm {
    &_activity-type-add {
      padding: 20px;
    }
    &_activity-type-update {
      padding: 20px;
    }
  }
}
</style>
