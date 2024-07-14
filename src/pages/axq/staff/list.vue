<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-04-02 10:24:19
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/staff/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-staff-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmAxqStaffAdd.open({triggerClose: popup.axqStaffAdd.fn.closeHandler,triggerHidden: popup.axqStaffAdd.fn.hiddenHandler})"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="员工/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmAxqStaffAdd" title="员工添加">
      <div class="popup-confirm_axq-staff-add">
        <form-validate ref="axqStaffAdd" :form="popup.axqStaffAdd.attr.form">
          <form-validate-field label="员工名称" :field="popup.axqStaffAdd.attr.form.nickname">
            <el-input v-model="popup.axqStaffAdd.attr.form.nickname.value"></el-input>
          </form-validate-field>
          <form-validate-field label="职位">
            <options-selector
              :mode="4"
              :config="{req: options.fn.axqJobQuery,value:$_.get(popup.axqStaffUpdate.attr.info,'axqJob.name')}"
              @change="(e,e1) => {options.fn.axqJobChangeHandler(e,e1,1)}"
            ></options-selector>
          </form-validate-field>
          <form-validate-field label="账号" :field="popup.axqStaffAdd.attr.form.username">
            <el-input v-model="popup.axqStaffAdd.attr.form.username.value"></el-input>
          </form-validate-field>
          <form-validate-field label="密码" :field="popup.axqStaffAdd.attr.form.passwd">
            <el-input v-model="popup.axqStaffAdd.attr.form.passwd.value"></el-input>
          </form-validate-field>
          <form-validate-field label="状态">
            <el-radio-group v-model="popup.axqStaffAdd.attr.form.status.value">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqStaffUpdate" title="员工更新">
      <div class="popup-confirm_axq-staff-update">
        <form-validate
          ref="axqStaffUpdate"
          :form="popup.axqStaffUpdate.attr.form"
          :fill="popup.axqStaffUpdate.fn.fill"
        >
          <form-validate-field label="员工名称" :field="popup.axqStaffUpdate.attr.form.nickname">
            <el-input v-model="popup.axqStaffUpdate.attr.form.nickname.value"></el-input>
          </form-validate-field>
          <form-validate-field label="职位">
            <options-selector
              :mode="4"
              :config="{req: options.fn.axqJobQuery,value:$_.get(popup.axqStaffUpdate.attr.form.axqJob,'value.name')
              }"
              @change="(e,e1) => {options.fn.axqJobChangeHandler(e,e1,2)}"
            ></options-selector>
          </form-validate-field>
          <form-validate-field label="关联财务" v-if="[6,7].includes(popup.axqStaffUpdate.attr.form.jobId.value)">
            <options-selector 
              :mode="4" 
              :config="{
                req:options.fn.financialServiceQuery,
                value:$_.get(popup.axqStaffUpdate.attr.form.accessExtraJson.value,'linkFinancialServiceNickName')
              }"
              @change="(e,e1) => {options.fn.financialServiceChangeHandler(e,e1)}">
            </options-selector>
          </form-validate-field>
          <form-validate-field label="账号" :field="popup.axqStaffUpdate.attr.form.username">
            <el-input v-model="popup.axqStaffUpdate.attr.form.username.value"></el-input>
          </form-validate-field>
          <form-validate-field label="密码" :field="popup.axqStaffUpdate.attr.form.passwd">
            <el-input placeholder="留空为不更新" v-model="popup.axqStaffUpdate.attr.form.passwd.value"></el-input>
          </form-validate-field>
          <form-validate-field label="状态">
            <el-radio-group v-model="popup.axqStaffUpdate.attr.form.status.value">
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
import optionsSelector from '@/components/options-selector';
import listPage from '@/components/list-page';
import popupConfirm from '@/components/popup/type/confirm';
import { formToolkit } from '@/model/form-toolkit';

import { model } from '@/model';
const { AxqJob, AxqStaff } = model.collection;

export default {
  components: {
    formValidate,
    formValidateField,
    optionsSelector,
    listPage,
    popupConfirm
  },
  data () {
    return {
      options: {
        fn: {
          axqJobQuery: (e, ok) => {
            AxqJob.sendApi('jobPage', { params: {}, data: { query: { keyword: e } } }).then(res => {
              const { data } = res;
              ok(data.map(i => ({ value:i.id, label: i.name,_raw:i})));
            });
          },
          axqJobChangeHandler: (e, e1,type) => {
            if (type === 1) {
              this.popup.axqStaffAdd.attr.form.jobId.value = e;
              this.popup.axqStaffAdd.attr.form.deptId.value = e1.deptId;
            } else {
              this.popup.axqStaffUpdate.attr.form.jobId.value = e;
              this.popup.axqStaffUpdate.attr.form.deptId.value = e1.deptId;
            }
          },
          financialServiceQuery:(e,ok)=>{
            AxqStaff.sendApi('staffPage', { params: {}, data: { query: { keyword: e } } }).then(res => {
              const { data } = res;
              ok(data.map(i => ({ value: i.id, label: i.nickname,_raw:i })));
            });
          },
          financialServiceChangeHandler: (e,e1) => {
            this.$_.set(this.popup.axqStaffUpdate.attr.form.accessExtraJson,'value.linkFinancialServiceId',e);
            this.$_.set(this.popup.axqStaffUpdate.attr.form.accessExtraJson,'value.linkFinancialServiceNickName',this.$_.get(e1,'nickname'));
          }
        }
      },
      page: {
        config: {
          entity: 'AxqStaff',
          action: 'staffPage',
          column: [
            {
              prop: 'id',
              label: '序号'
            },
            {
              prop: 'nickname',
              label: '员工名称'
            },
            {
              prop: 'axqJobName',
              label: '职位'
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
                          this.$refs.popupConfirmAxqStaffUpdate.open({ triggerOpen: this.popup.axqStaffUpdate.fn.openHandler, triggerClose: this.popup.axqStaffUpdate.fn.closeHandler, params: props });
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
        axqStaffAdd: {
          attr: {
            form: AxqStaff.formUtil().generator('add', 'default')
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.axqStaffAdd.attr.form);
              if (ok) {
                AxqStaff.sendApi('staffAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '员工添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '员工添加失败',
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
              this.popup.axqStaffAdd.attr.form = AxqStaff.formUtil().generator('add', 'default');
            }
          }
        },
        axqStaffUpdate: {
          attr: {
            form: AxqStaff.formUtil().generator('update', 'default'),
            info: {}
          },
          fn: {
            fill: (callback) => {
              callback(AxqStaff, this.popup.axqStaffUpdate.attr.info);
            },
            openHandler: (ok, params) => {
              AxqStaff.sendApi('staffInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.axqStaffUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取员工信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.axqStaffUpdate.attr.form);
              if (ok) {
                AxqStaff.sendApi('staffUpdate', { 
                  params: { 
                    id:this.popup.axqStaffUpdate.attr.info.id
                  }, 
                  data:form }).then(
                  (res) => {
                    const { status } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '员工更新成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '员工更新失败',
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
.axq-staff-list {
  background: white;
  .popup-confirm {
    &_axq-staff-add {
      padding: 20px;
    }
    &_axq-staff-update {
      padding: 20px;
    }
  }
}
</style>
