<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-03-18 11:24:27
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/sys/express/list.vue
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
        @add="$refs.popupConfirmSysExpressAdd.open({triggerClose: popup.sysExpressAdd.fn.closeHandler,triggerHidden: popup.sysExpressAdd.fn.hiddenHandler})"
        @form-reset="page.fn.resetHandler"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <options-selector
                :mode="1"
                ref="statusOptionsSelector"
                placeholder="状态"
                :config="{entity: 'SysExpress', type: 'status'}"
                @change="options.fn.statusChangeHandler"
              ></options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="物流/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmSysExpressAdd" title="物流添加">
      <div class="popup-confirm_sys-express-add">
        <form-validate ref="sysExpressAdd" :form="popup.sysExpressAdd.attr.form">
          <form-validate-field label="物流名称" :field="popup.sysExpressAdd.attr.form.name">
            <el-input v-model="popup.sysExpressAdd.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="关键字" :field="popup.sysExpressAdd.attr.form.uniKey">
            <el-input v-model="popup.sysExpressAdd.attr.form.uniKey.value"></el-input>
          </form-validate-field>
          <form-validate-field label="备注" :field="popup.sysExpressAdd.attr.form.remark">
            <el-input
              type="textarea"
              :rows="5"
              v-model="popup.sysExpressAdd.attr.form.remark.value"
            ></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmSysExpressUpdate" title="物流添加">
      <div class="popup-confirm_sys-express-add">
        <form-validate
          ref="sysExpressUpdate"
          :form="popup.sysExpressUpdate.attr.form"
          :fill="popup.sysExpressUpdate.fn.fill"
        >
          <form-validate-field label="物流名称" :field="popup.sysExpressUpdate.attr.form.name">
            <el-input v-model="popup.sysExpressUpdate.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="关键字" :field="popup.sysExpressUpdate.attr.form.uniKey">
            <el-input v-model="popup.sysExpressUpdate.attr.form.uniKey.value"></el-input>
          </form-validate-field>
          <form-validate-field label="状态" :field="popup.sysExpressUpdate.attr.form.status">
            <el-radio-group v-model="popup.sysExpressUpdate.attr.form.status.value">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="备注" :field="popup.sysExpressUpdate.attr.form.remark">
            <el-input
              type="textarea"
              :rows="5"
              v-model="popup.sysExpressUpdate.attr.form.remark.value"
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
const { SysExpress } = model.collection;

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
          entity: 'SysExpress',
          action: 'expressPage',
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
                          this.$refs.popupConfirmSysExpressUpdate.open({ triggerOpen: this.popup.sysExpressUpdate.fn.openHandler, triggerClose: this.popup.sysExpressUpdate.fn.closeHandler, params: props });
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
        sysExpressAdd: {
          attr: {
            form: SysExpress.formUtil().generator('add', 'default')
          },
          fn: {
            sysBankChangeHandler: (e) => {
              this.popup.sysExpressAdd.attr.form.bankId.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.sysExpressAdd.attr.form);
              if (ok) {
                SysExpress.sendApi('expressAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '物流添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '物流添加失败',
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
              this.popup.sysExpressAdd.attr.form = SysExpress.formUtil().generator('add', 'default');
            }
          }
        },
        sysExpressUpdate: {
          attr: {
            form: SysExpress.formUtil().generator('update', 'default'),
            info: {}
          },
          fn: {
            sysBankChangeHandler: (e) => {
              this.popup.sysExpressUpdate.attr.form.bankId.value = e;
            },
            fill: (callback) => {
              callback(SysExpress, this.popup.sysExpressUpdate.attr.info);
            },
            openHandler: (ok, params) => {
              SysExpress.sendApi('expressInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.sysExpressUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取物流信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.sysExpressUpdate.attr.form);
              if (ok) {
                SysExpress.sendApi('expressUpdate', { params: { id: this.popup.sysExpressUpdate.attr.info.id }, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '物流添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '物流添加失败',
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
    &_sys-express-add {
      padding: 20px;
    }
    &_sys-express-update {
      padding: 20px;
    }
  }
}
</style>
