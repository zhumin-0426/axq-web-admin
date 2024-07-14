<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-09-27 14:56:14
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/job/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-job-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmAxqJobAdd.open({triggerClose: popup.axqJobAdd.fn.closeHandler,triggerHidden: popup.axqJobAdd.fn.hiddenHandler})"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="职位/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmAxqJobAdd" title="职位添加">
      <div class="popup-confirm_axq-job-add">
        <div class="a-tab">
          <div
            class="t-item"
            :class="{'t-item-active': popup.axqJobAdd.attr.tab === 1}"
            @click="popup.axqJobAdd.attr.tab = 1"
          >
            <span>职位信息</span>
          </div>
          <div
            class="t-item"
            :class="{'t-item-active': popup.axqJobAdd.attr.tab === 2}"
            @click="popup.axqJobAdd.attr.tab = 2"
          >
            <span>职位权限</span>
          </div>
        </div>
        <div class="a-box a-box_base" v-if="popup.axqJobAdd.attr.tab === 1">
          <form-validate ref="axqJobAdd" :form="popup.axqJobAdd.attr.form">
            <form-validate-field label="职位名称" :field="popup.axqJobAdd.attr.form.name">
              <el-input v-model="popup.axqJobAdd.attr.form.name.value"></el-input>
            </form-validate-field>
            <form-validate-field label="所属部门" :field="popup.axqJobAdd.attr.form.deptId">
              <options-selector
                :mode="4"
                :config="{req: options.fn.axqDeptQuery}"
                @change="(e) => {options.fn.axqDeptChangeHandler(e, 1)}"
              ></options-selector>
            </form-validate-field>
            <form-validate-field label="职位描述" :field="popup.axqJobAdd.attr.form.description">
              <el-input
                type="textarea"
                :rows="5"
                v-model="popup.axqJobAdd.attr.form.description.value"
              ></el-input>
            </form-validate-field>
          </form-validate>
        </div>
        <div class="a-box a-box_access-rule" v-else>
          <axq-access-rule-tree @ignore-change="(e) => {options.fn.accessRuleChangeHandler(e, 1)}"></axq-access-rule-tree>
        </div>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqJobUpdate" title="职位更新">
      <div class="popup-confirm_axq-job-update">
        <div class="u-tab">
          <div
            class="t-item"
            :class="{'t-item-active': popup.axqJobUpdate.attr.tab === 1}"
            @click="popup.axqJobUpdate.attr.tab = 1"
          >
            <span>职位信息</span>
          </div>
          <div
            class="t-item"
            :class="{'t-item-active': popup.axqJobUpdate.attr.tab === 2}"
            @click="popup.axqJobUpdate.attr.tab = 2"
          >
            <span>职位权限</span>
          </div>
        </div>
        <div class="u-box u-box_base" v-if="popup.axqJobUpdate.attr.tab === 1">
          <form-validate
            ref="axqJobUpdate"
            :form="popup.axqJobUpdate.attr.form"
            :fill="popup.axqJobUpdate.fn.fill"
          >
            <form-validate-field label="职位名称" :field="popup.axqJobUpdate.attr.form.name">
              <el-input v-model="popup.axqJobUpdate.attr.form.name.value"></el-input>
            </form-validate-field>
            <form-validate-field label="所属部门" :field="popup.axqJobAdd.attr.form.deptId">
              <options-selector
                :mode="4"
                :config="{req: options.fn.axqDeptQuery}"
                @change="(e) => {options.fn.axqDeptChangeHandler(e, 1)}"
              ></options-selector>
            </form-validate-field>
            <form-validate-field label="职位描述" :field="popup.axqJobUpdate.attr.form.description">
              <el-input
                type="textarea"
                :rows="5"
                v-model="popup.axqJobUpdate.attr.form.description.value"
              ></el-input>
            </form-validate-field>
          </form-validate>
        </div>
        <div class="u-box u-box_access-rule" v-else>
          <axq-access-rule-tree
            :ignoreValue="$_.get(popup.axqJobUpdate.attr.info, 'ignoreAccessRuleIds').split(',').map(i => Number(i))"
            @ignore-change="(e) => {options.fn.accessRuleChangeHandler, 2}"
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
const { AxqDept, AxqJob } = model.collection;

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
          axqDeptQuery: (e, ok) => {
            AxqDept.sendApi('deptPage', { params: {}, data: { query: { keyword: e } } }).then(res => {
              const { data } = res;
              ok(data.map(i => ({ value: i.id, label: i.name })));
            });
          },
          axqDeptChangeHandler: (e, type) => {
            if (type === 1) {
              this.popup.axqJobAdd.attr.form.deptId.value = e;
            } else {
              this.popup.axqJobUpdate.attr.form.deptId.value = e;
            }
          },
          accessRuleChangeHandler: (e, type) => {
            const { checkIds } = e;
            if (type === 1) {
              this.popup.axqJobAdd.attr.form.ignoreAccessRuleIds.value = checkIds.join(',');
            } else {
              this.popup.axqJobUpdate.attr.form.ignoreAccessRuleIds.value = checkIds.join(',');
            }
          }
        }
      },
      page: {
        config: {
          entity: 'AxqJob',
          action: 'jobPage',
          column: [
            {
              prop: 'id',
              label: '序号'
            },
            {
              prop: 'name',
              label: '职位名称'
            },
            {
              label: '职位人数',
              VNodes: [
                ({ h }) => {
                  return h('p', '0');
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
                          this.$refs.popupConfirmAxqJobUpdate.open({ triggerOpen: this.popup.axqJobUpdate.fn.openHandler, triggerClose: this.popup.axqJobUpdate.fn.closeHandler, params: props });
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
        axqJobAdd: {
          attr: {
            tab: 1,
            form: AxqJob.formUtil().generator('add', 'default')
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.axqJobAdd.attr.form);
              if (ok) {
                AxqJob.sendApi('jobAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '职位添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '职位添加失败',
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
              this.popup.axqJobAdd.attr.form = AxqJob.formUtil().generator('add', 'default');
            }
          }
        },
        axqJobUpdate: {
          attr: {
            tab: 1,
            form: AxqJob.formUtil().generator('update', 'default'),
            info: {}
          },
          fn: {
            fill: (callback) => {
              callback(AxqJob, this.popup.axqJobUpdate.attr.info);
            },
            openHandler: (ok, params) => {
              this.popup.axqJobUpdate.attr.tab = 1;
              AxqJob.sendApi('jobInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.axqJobUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取职位信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.axqJobUpdate.attr.form);
              if (ok) {
                AxqJob.sendApi('jobUpdate', { params: { id: this.popup.axqJobUpdate.attr.info.id }, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '职位添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '职位添加失败',
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
.axq-job-list {
  background: white;
  .popup-confirm {
    &_axq-job-add {
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
    &_axq-job-update {
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
