<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-03-18 10:59:32
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/type/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page approval-type-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :hidden-action="['add']"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmApprovalTypeAdd.open({ triggerClose: popup.approvalTypeAdd.fn.closeHandler,triggerHidden: popup.approvalTypeAdd.fn.hiddenHandler })"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="名称/序号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmApprovalTypeAdd" title="审核类型添加">
      <div class="popup-confirm_approval-type-add"></div>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmApprovalTypeUpdate"
      title="审核类型更新"
      :config="{width: 1100, height: 500}"
    >
      <div class="popup-confirm_approval-type-update">
        <form-validate
          ref="approvalTypeUpdate"
          :form="popup.approvalTypeUpdate.attr.form"
          :fill="popup.approvalTypeUpdate.fn.fill"
        >
          <form-validate-field label="审核类型名称" :field="popup.approvalTypeUpdate.attr.form.name">
            <el-input v-model="popup.approvalTypeUpdate.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="描述">
            <el-input v-model="popup.approvalTypeUpdate.attr.form.description.value"></el-input>
          </form-validate-field>
          <form-validate-field
            label="节点"
            :field="popup.approvalTypeUpdate.attr.form.approvalWorkflowList"
          >
            <div class="u-approval-workflow">
              <div class="w-table">
                <el-table
                  :data="popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value"
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
                        v-model="popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[props.$index].name.value"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="顺序">
                    <template slot-scope="props">
                      <el-input
                        v-model="popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[props.$index].step.value"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="审核人" width="300">
                    <template slot-scope="props">
                      <div class="t-checker">
                        <div class="c-list">
                          <el-tag
                            v-for="(item, key) in popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[props.$index].checkerList.value"
                            :key="key"
                            closable
                            @close="popup.approvalTypeUpdate.fn.deleteApprovalWorkflowCheckerList(props.$index, key)"
                          >{{ item.nickname }}</el-tag>
                        </div>
                        <div class="c-add">
                          <options-selector
                            :mode="4"
                            placeholder="职员/手机号"
                            :config="{req: popup.approvalTypeUpdate.fn.axqStaffQuery}"
                            @change="(e, _raw) => {popup.approvalTypeUpdate.fn.axqStaffChangeHandler(props.$index, e, _raw)}"
                          ></options-selector>
                          <el-button
                            type="primary"
                            size="mini"
                            style="marginLeft: 10px;"
                            @click.native="popup.approvalTypeUpdate.fn.addApprovalWorkflowChecker(props.$index)"
                          >添加</el-button>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="审核部门" width="300">
                    <template slot-scope="props">
                      <div class="t-axq-dept">
                        <div class="d-list">
                          <el-tag
                            v-for="(item, key) in popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[props.$index].axqDeptList.value"
                            :key="key"
                            closable
                            @close="popup.approvalTypeUpdate.fn.deleteApprovalWorkflowAxqDeptList(props.$index, key)"
                          >{{ item.name }}</el-tag>
                        </div>
                        <div class="d-add">
                          <options-selector
                            :mode="4"
                            placeholder="部门"
                            :config="{req: popup.approvalTypeUpdate.fn.axqDeptQuery}"
                            @change="(e, _raw) => {popup.approvalTypeUpdate.fn.axqDeptChangeHandler(props.$index, e, _raw)}"
                          ></options-selector>
                          <el-button
                            type="primary"
                            size="mini"
                            style="marginLeft: 10px;"
                            @click.native="popup.approvalTypeUpdate.fn.addApprovalWorkflowAxqDept(props.$index)"
                          >添加</el-button>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="props">
                      <el-button
                        type="text"
                        size="small"
                        @click.native="popup.approvalTypeUpdate.fn.deleteApprovalWorkflowList(props.$index)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="w-btn" @click="popup.approvalTypeUpdate.fn.addApprovalWorkflow">
                <span>添加</span>
              </div>
            </div>
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

const { ApprovalType, ApprovalWorkflow, AxqStaff, AxqDept } = model.collection;
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
      page: {
        config: {
          entity: 'ApprovalType',
          action: 'typePage',
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
              prop: '',
              label: '描述',
              VNodes: [
                ({ h, props }) => {
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
                  return h('el-button', {
                    props: { type: 'primary', size: 'mini' },
                    nativeOn: {
                      click: () => {
                        this.$refs.popupConfirmApprovalTypeUpdate.open({ triggerOpen: this.popup.approvalTypeUpdate.fn.openHandler, triggerClose: this.popup.approvalTypeUpdate.fn.closeHandler, params: props });
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
        }
      },
      popup: {
        approvalTypeAdd: {
          attr: {
            form: ApprovalType.formUtil().generator('add', 'default')
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.approvalTypeAdd.attr.form);
              if (ok) {
                ApprovalType.sendApi('typeAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '审核类型添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '审核类型添加失败',
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
              this.popup.approvalTypeAdd.attr.form = ApprovalType.formUtil().generator('add', 'default');
            }
          }
        },
        approvalTypeUpdate: {
          attr: {
            form: ApprovalType.formUtil().generator('update', 'default'),
            info: {}
          },
          fn: {
            fill: (callback) => {
              callback(ApprovalType, this.popup.approvalTypeUpdate.attr.info);
            },
            axqStaffQuery: (e, ok) => {
              AxqStaff.sendApi('staffPage', { params: {}, data: { query: { keyword: e } } }).then(res => {
                const { data } = res;
                ok(data.map(i => ({ value: i.id, label: i.nickname, _raw: i })));
              });
            },
            axqStaffChangeHandler: (index, e, _raw) => {
              this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[index].tmpChecker.value = _raw;
            },
            axqDeptQuery: (e, ok) => {
              AxqDept.sendApi('deptPage', { params: {}, data: { query: { keyword: e } } }).then(res => {
                const { data } = res;
                ok(data.map(i => ({ value: i.id, label: i.name, _raw: i })));
              });
            },
            axqDeptChangeHandler: (index, e, _raw) => {
              this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[index].tmpAxqDept.value = _raw;
            },
            addApprovalWorkflow: () => {
              this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value.push(ApprovalWorkflow.formUtil().generator('add', 'default'));
            },
            addApprovalWorkflowChecker: (index) => {
              if (!this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[index].tmpChecker.value.id) {
                this.$message.warning('请选择审核人');
                return;
              }
              this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[index].checkerList.value.push(this.$_.cloneDeep(this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[index].tmpChecker.value));
            },
            addApprovalWorkflowAxqDept: (index) => {
              if (!this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[index].tmpAxqDept.value.id) {
                this.$message.warning('请选择部门');
                return;
              }
              this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[index].axqDeptList.value.push(this.$_.cloneDeep(this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[index].tmpAxqDept.value));
            },
            deleteApprovalWorkflowList: (index) => {
              this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value.splice(index, 1);
            },
            deleteApprovalWorkflowCheckerList: (index, index1) => {
              this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[index].checkerList.value.splice(index1, 1);
            },
            deleteApprovalWorkflowAxqDeptList: (index, index1) => {
              this.popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value[index].axqDeptList.value.splice(index1, 1);
            },
            openHandler: (ok, params) => {
              this.popup.approvalTypeUpdate.attr.form = ApprovalType.formUtil().generator('update', 'default');
              ApprovalType.sendApi('typeInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.approvalTypeUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取审核类型信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.approvalTypeUpdate.attr.form);
              if (ok) {
                ApprovalType.sendApi('typeUpdate', { params: { id: this.popup.approvalTypeUpdate.attr.info.id }, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '审核类型更新成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '审核类型更新失败',
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
  watch: {
    'popup.approvalTypeUpdate.attr.form.approvalWorkflowList.value': {
      handler: function (e) {
        e.forEach(i => {
          i.axqDeptIds.value = i.axqDeptList.value.map(i => i.id).join(',');
          i.checkerIds.value = i.checkerList.value.map(i => i.id).join(',');
        });
      },
      deep: true
    }
  }
};
</script>

<style lang="less">
.approval-type-list {
  background: white;
  .popup-confirm {
    &_approval-type-add {
      padding: 20px;
    }
    &_approval-type-update {
      padding: 20px;
      .u-approval-workflow {
        width: 100%;
        .w-table {
          .t-checker {
            .c-list {
            }
            .c-add {
              display: flex;
              align-items: center;
              margin-top: 10px;
            }
          }
          .t-axq-dept {
            .d-list {
            }
            .d-add {
              display: flex;
              align-items: center;
              margin-top: 10px;
            }
          }
        }
        .w-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          margin-top: 20px;
          border: 1px dashed #e9e9e9;
        }
      }
    }
  }
}
</style>
