<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-03-18 11:25:15
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/sys/bank/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page sys-express-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmSysBankAdd.open({triggerClose: popup.sysBankAdd.fn.closeHandler,triggerHidden: popup.sysBankAdd.fn.hiddenHandler})"
        @form-reset="page.fn.resetHandler"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <options-selector
                :mode="1"
                ref="statusOptionsSelector"
                placeholder="状态"
                :config="{entity: 'SysBank', type: 'status'}"
                @change="options.fn.statusChangeHandler"
              ></options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="银行/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmSysBankAdd" title="银行添加">
      <div class="popup-confirm_sys-bank-add">
        <form-validate ref="sysBankAdd" :form="popup.sysBankAdd.attr.form">
          <form-validate-field label="银行名称" :field="popup.sysBankAdd.attr.form.name">
            <el-input v-model="popup.sysBankAdd.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="备注" :field="popup.sysBankAdd.attr.form.remark">
            <el-input type="textarea" :rows="5" v-model="popup.sysBankAdd.attr.form.remark.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmSysBankUpdate" title="银行添加">
      <div class="popup-confirm_sys-bank-add">
        <form-validate
          ref="sysBankUpdate"
          :form="popup.sysBankUpdate.attr.form"
          :fill="popup.sysBankUpdate.fn.fill"
        >
          <form-validate-field label="银行名称" :field="popup.sysBankUpdate.attr.form.name">
            <el-input v-model="popup.sysBankUpdate.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="状态" :field="popup.sysBankUpdate.attr.form.status">
            <el-radio-group v-model="popup.sysBankUpdate.attr.form.status.value">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="备注" :field="popup.sysBankUpdate.attr.form.remark">
            <el-input
              type="textarea"
              :rows="5"
              v-model="popup.sysBankUpdate.attr.form.remark.value"
            ></el-input>
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
const { SysBank } = model.collection;

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
          entity: 'SysBank',
          action: 'bankPage',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: 'name',
              label: '名称'
            },
            {
              prop: 'uniKey',
              label: '关键字'
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
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmSysBankUpdate.open({ triggerOpen: this.popup.sysBankUpdate.fn.openHandler, triggerClose: this.popup.sysBankUpdate.fn.closeHandler, params: props });
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
        sysBankAdd: {
          attr: {
            form: SysBank.formUtil().generator('add', 'default')
          },
          fn: {
            sysBankChangeHandler: (e) => {
              this.popup.sysBankAdd.attr.form.bankId.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.sysBankAdd.attr.form);
              if (ok) {
                SysBank.sendApi('bankAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '银行添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '银行添加失败',
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
              this.popup.sysBankAdd.attr.form = SysBank.formUtil().generator('add', 'default');
            }
          }
        },
        sysBankUpdate: {
          attr: {
            form: SysBank.formUtil().generator('update', 'default'),
            info: {}
          },
          fn: {
            sysBankChangeHandler: (e) => {
              this.popup.sysBankUpdate.attr.form.bankId.value = e;
            },
            fill: (callback) => {
              callback(SysBank, this.popup.sysBankUpdate.attr.info);
            },
            openHandler: (ok, params) => {
              SysBank.sendApi('bankInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.sysBankUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取银行信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.sysBankUpdate.attr.form);
              if (ok) {
                SysBank.sendApi('bankUpdate', { params: { id: this.popup.sysBankUpdate.attr.info.id }, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '银行添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '银行添加失败',
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
.sys-express-list {
  background: white;
  .popup-confirm {
    &_sys-bank-add {
      padding: 20px;
    }
    &_sys-bank-update {
      padding: 20px;
    }
  }
}
</style>
