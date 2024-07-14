<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-08-18 08:48:42
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/access-rule/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-access-rule-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmAxqAccessRuleAdd.open({triggerClose: popup.axqAccessRuleAdd.fn.closeHandler,triggerHidden: popup.axqAccessRuleAdd.fn.hiddenHandler})"
      >
        <template slot="query">
          <div class="q-block">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>权限列表</el-breadcrumb-item>
              <el-breadcrumb-item :key="key" v-for="(item, key) in level">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="权限/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmAxqAccessRuleAdd" title="权限添加">
      <div class="popup-confirm_axq-access-rule-add">
        <form-validate ref="axqAccessRuleAdd" :form="popup.axqAccessRuleAdd.attr.form">
          <form-validate-field label="名称" :field="popup.axqAccessRuleAdd.attr.form.name">
            <el-input v-model="popup.axqAccessRuleAdd.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="正则" :field="popup.axqAccessRuleAdd.attr.form.reg">
            <el-input v-model="popup.axqAccessRuleAdd.attr.form.reg.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqAccessRuleUpdate" title="权限更新">
      <div class="popup-confirm_axq-access-rule-update">
        <form-validate
          ref="axqAccessRuleUpdate"
          :form="popup.axqAccessRuleUpdate.attr.form"
          :fill="popup.axqAccessRuleUpdate.fn.fill"
        >
          <form-validate-field label="名称" :field="popup.axqAccessRuleUpdate.attr.form.name">
            <el-input v-model="popup.axqAccessRuleUpdate.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="正则" :field="popup.axqAccessRuleUpdate.attr.form.reg">
            <el-input v-model="popup.axqAccessRuleUpdate.attr.form.reg.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';
import optionsSelector from '@/components/options-selector';
import listPage from '@/components/list-page';
import popupConfirm from '@/components/popup/type/confirm';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';
import { formToolkit } from '@/model/form-toolkit';

import { model } from '@/model';
const { AxqAccessRule } = model.collection;

export default {
  components: {
    formValidate,
    formValidateField,
    optionsSelector,
    listPage,
    popupConfirm,
    grid,
    gridItem
  },
  data () {
    return {
      level: [],
      options: {
        fn: {
          jobChangeHandler: (e, type) => {
            if (type === 1) {
              this.popup.axqAccessRuleAdd.attr.form.jobId.value = e;
            } else {
              this.popup.axqAccessRuleUpdate.attr.form.jobId.value = e;
            }
          }
        }
      },
      page: {
        config: {
          entity: 'AxqAccessRule',
          action: 'accessRulePage',
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
              prop: 'createTime',
              label: '创建时间'
            },
            {
              fixed: 'right',
              prop: 'action',
              label: '操作',
              width: '200',
              VNodes: [
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.level.push(props.row);
                          this.page.form.query.pId = props.row.id;
                        }
                      }
                    }, '查看下一级');
                },
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmAxqAccessRuleUpdate.open({ triggerOpen: this.popup.axqAccessRuleUpdate.fn.openHandler, triggerClose: this.popup.axqAccessRuleUpdate.fn.closeHandler, params: props });
                        }
                      }
                    },
                    '编辑');
                }
              ]
            }
          ]
        },
        form: {
          query: {
            pId: 0,
            keyword: ''
          },
          order: {}
        }
      },
      popup: {
        axqAccessRuleAdd: {
          attr: {
            form: AxqAccessRule.formUtil().generator('add', 'default')
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.axqAccessRuleAdd.attr.form);
              if (ok) {
                AxqAccessRule.sendApi('accessRuleAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '权限添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '权限添加失败',
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
              this.popup.axqAccessRuleAdd.attr.form = AxqAccessRule.formUtil().generator('add', 'default');
            }
          }
        },
        axqAccessRuleUpdate: {
          attr: {
            form: AxqAccessRule.formUtil().generator('update', 'default'),
            info: {}
          },
          fn: {
            fill: (callback) => {
              callback(AxqAccessRule, this.popup.axqAccessRuleUpdate.attr.info);
            },
            openHandler: (ok, params) => {
              AxqAccessRule.sendApi('accessRuleInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.axqAccessRuleUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取权限信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.axqAccessRuleUpdate.attr.form);
              if (ok) {
                AxqAccessRule.sendApi('accessRuleUpdate', { params: { id: this.popup.axqAccessRuleUpdate.attr.info.id }, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '权限添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '权限添加失败',
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
.axq-access-rule-list {
  background: white;
  .popup-confirm {
    &_axq-access-rule-add {
      padding: 20px;
    }
    &_axq-access-rule-update {
      padding: 20px;
    }
  }
}
</style>
