<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-09-27 14:55:40
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/dept/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-dept-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmAxqDeptAdd.open({triggerClose: popup.axqDeptAdd.fn.closeHandler,triggerHidden: popup.axqDeptAdd.fn.hiddenHandler})"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="部门/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmAxqDeptAdd" title="部门添加">
      <div class="popup-confirm_axq-dept-add">
        <div class="a-tab">
          <div
            class="t-item"
            :class="{'t-item-active': popup.axqDeptAdd.attr.tab === 1}"
            @click="popup.axqDeptAdd.attr.tab = 1"
          >
            <span>部门信息</span>
          </div>
          <div
            class="t-item"
            :class="{'t-item-active': popup.axqDeptAdd.attr.tab === 2}"
            @click="popup.axqDeptAdd.attr.tab = 2"
          >
            <span>部门权限</span>
          </div>
        </div>
        <div class="a-box a-box_base" v-if="popup.axqDeptAdd.attr.tab === 1">
          <form-validate ref="axqDeptAdd" :form="popup.axqDeptAdd.attr.form">
            <form-validate-field label="部门名称" :field="popup.axqDeptAdd.attr.form.name">
              <el-input v-model="popup.axqDeptAdd.attr.form.name.value"></el-input>
            </form-validate-field>
            <form-validate-field label="部门负责人" :field="popup.axqDeptAdd.attr.form.leaderId">
              <options-selector
                :mode="4"
                :config="{req: options.fn.axqStaffQuery}"
                @change="(e) => {options.fn.axqStaffChangeHandler(e, 1)}"
              ></options-selector>
            </form-validate-field>
            <form-validate-field label="部门描述" :field="popup.axqDeptAdd.attr.form.description">
              <el-input
                type="textarea"
                :rows="5"
                v-model="popup.axqDeptAdd.attr.form.description.value"
              ></el-input>
            </form-validate-field>
          </form-validate>
        </div>
        <div class="a-box a-box_access-rule" v-else>
          <axq-access-rule-tree @change="(e) => {options.fn.accessRuleChangeHandler(e, 1)}"></axq-access-rule-tree>
        </div>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqDeptUpdate" title="部门更新">
      <div class="popup-confirm_axq-dept-update">
        <div class="u-tab">
          <div
            class="t-item"
            :class="{'t-item-active': popup.axqDeptUpdate.attr.tab === 1}"
            @click="popup.axqDeptUpdate.attr.tab = 1"
          >
            <span>部门信息</span>
          </div>
          <div
            class="t-item"
            :class="{'t-item-active': popup.axqDeptUpdate.attr.tab === 2}"
            @click="popup.axqDeptUpdate.attr.tab = 2"
          >
            <span>部门权限</span>
          </div>
        </div>
        <div class="u-box u-box_base" v-if="popup.axqDeptUpdate.attr.tab === 1">
          <form-validate
            ref="axqDeptUpdate"
            :form="popup.axqDeptUpdate.attr.form"
            :fill="popup.axqDeptUpdate.fn.fill"
          >
            <form-validate-field label="部门名称" :field="popup.axqDeptUpdate.attr.form.name">
              <el-input v-model="popup.axqDeptUpdate.attr.form.name.value"></el-input>
            </form-validate-field>
            <form-validate-field label="部门负责人" :field="popup.axqDeptUpdate.attr.form.leaderId">
              <options-selector
                :mode="4"
                :config="{req: options.fn.axqStaffQuery}"
                @change="(e) => {options.fn.axqStaffChangeHandler(e, 2)}"
              ></options-selector>
            </form-validate-field>
            <form-validate-field label="部门描述" :field="popup.axqDeptUpdate.attr.form.description">
              <el-input
                type="textarea"
                :rows="5"
                v-model="popup.axqDeptUpdate.attr.form.description.value"
              ></el-input>
            </form-validate-field>
          </form-validate>
        </div>
        <div class="u-box u-box_access-rule" v-else>
          <axq-access-rule-tree
            :checkValue="($_.get(popup.axqDeptUpdate.attr.info, 'accessRuleIds') || '').split(',').map(i => Number(i))"
            @change="(e) => {options.fn.accessRuleChangeHandler(e, 2)}"
          ></axq-access-rule-tree>
        </div>
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
import axqAccessRuleTree from '@/components/axq/access-rule-tree';
import { formToolkit } from '@/model/form-toolkit';

import { model } from '@/model';
const { AxqDept, AxqStaff } = model.collection;

export default {
  components: {
    formValidate,
    formValidateField,
    optionsSelector,
    listPage,
    popupConfirm,
    axqAccessRuleTree
  },
  data () {
    return {
      options: {
        fn: {
          axqStaffQuery: (e, ok) => {
            AxqStaff.sendApi('staffPage', { params: {}, data: { query: { keyword: e } } }).then(res => {
              const { data } = res;
              ok(data.map(i => ({ value: i.id, label: i.nickname })));
            });
          },
          axqStaffChangeHandler: (e, type) => {
            if (type === 1) {
              this.popup.axqDeptAdd.attr.form.leaderId.value = e;
            } else {
              this.popup.axqDeptUpdate.attr.form.leaderId.value = e;
            }
          },
          accessRuleChangeHandler: (e, type) => {
            const { checkIds } = e;
            if (type === 1) {
              this.popup.axqDeptAdd.attr.form.accessRuleIds.value = checkIds.join(',');
            } else {
              this.popup.axqDeptUpdate.attr.form.accessRuleIds.value = checkIds.join(',');
            }
          }
        }
      },
      page: {
        config: {
          entity: 'AxqDept',
          action: 'deptPage',
          column: [
            {
              prop: 'id',
              label: '序号'
            },
            {
              prop: 'name',
              label: '部门名称'
            },
            {
              label: '部门人数',
              VNodes: [
                ({ h }) => {
                  return h('p', '/');
                }
              ]
            },
            {
              label: '部门负责人',
              VNodes: [
                ({ h }) => {
                  return h('p', '/');
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
              VNodes: [
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmAxqDeptUpdate.open({ triggerOpen: this.popup.axqDeptUpdate.fn.openHandler, triggerClose: this.popup.axqDeptUpdate.fn.closeHandler, params: props });
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
            keyword: ''
          },
          order: {}
        }
      },
      popup: {
        axqDeptAdd: {
          attr: {
            tab: 1,
            form: AxqDept.formUtil().generator('add', 'default')
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.axqDeptAdd.attr.form);
              if (ok) {
                AxqDept.sendApi('deptAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '部门添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '部门添加失败',
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
              this.popup.axqDeptAdd.attr.form = AxqDept.formUtil().generator('add', 'default');
            }
          }
        },
        axqDeptUpdate: {
          attr: {
            tab: 1,
            form: AxqDept.formUtil().generator('update', 'default'),
            info: {}
          },
          fn: {
            fill: (callback) => {
              callback(AxqDept, this.popup.axqDeptUpdate.attr.info);
            },
            openHandler: (ok, params) => {
              this.popup.axqDeptUpdate.attr.tab = 1;
              AxqDept.sendApi('deptInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.axqDeptUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取部门信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.axqDeptUpdate.attr.form);
              if (ok) {
                AxqDept.sendApi('deptUpdate', { params: { id: this.popup.axqDeptUpdate.attr.info.id }, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '部门添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '部门添加失败',
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
.axq-dept-list {
  background: white;
  .popup-confirm {
    &_axq-dept-add {
      .a-tab {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 0 20px;
        display: flex;
        .t-item {
          display: flex;
          align-items: center;
          height: 50px;
          &-active {
            position: relative;
            &:after {
              position: absolute;
              bottom: 0;
              left: 0;
              content: "";
              width: 100%;
              height: 3px;
              background: #1890ff;
            }
          }
          &:not(:first-child) {
            margin-left: 20px;
          }
        }
      }
      .a-box {
        padding: 70px 20px 20px 20px;
      }
    }
    &_axq-dept-update {
      .u-tab {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 0 20px;
        display: flex;
        .t-item {
          display: flex;
          align-items: center;
          height: 50px;
          &-active {
            position: relative;
            &:after {
              position: absolute;
              bottom: 0;
              left: 0;
              content: "";
              width: 100%;
              height: 3px;
              background: #1890ff;
            }
          }
          &:not(:first-child) {
            margin-left: 20px;
          }
        }
      }
      .u-box {
        padding: 70px 20px 20px 20px;
      }
    }
  }
}
</style>
