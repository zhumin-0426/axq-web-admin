<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-08-18 08:50:01
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/material/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-material-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="axqMaterialTable"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmAxqMaterialAdd.open({triggerClose: popup.AxqMaterialAdd.fn.closeHandler,triggerHidden: popup.AxqMaterialAdd.fn.hiddenHandler})"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="标题" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
        <template slot="action">
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmAxqMaterialAdd" title="报道添加">
      <div class="popup-confirm_axq-article-add">
        <form-validate
          ref="AxqMaterialAdd"
          :form="popup.AxqMaterialAdd.attr.form"
          :validator="entitys.AxqMaterial.formUtil().validate"
        >
          <form-validate-field label="标题" :field="popup.AxqMaterialAdd.attr.form.title">
            <el-input v-model="popup.AxqMaterialAdd.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="链接">
            <el-input v-model="popup.AxqMaterialAdd.attr.form.url.value"></el-input>
          </form-validate-field>
          <form-validate-field label="密码">
            <el-input v-model="popup.AxqMaterialAdd.attr.form.psw.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqMaterialUpdate" title="报道更新">
      <div class="popup-confirm_axq-article-update">
        <form-validate
          ref="AxqMaterialUpdate"
          :fill="popup.AxqMaterialUpdate.fn.fill"
          :form="popup.AxqMaterialUpdate.attr.form"
          :validator="entitys.AxqMaterial.formUtil().validate"
        >
          <form-validate-field label="标题" :field="popup.AxqMaterialUpdate.attr.form.title">
            <el-input v-model="popup.AxqMaterialUpdate.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="链接">
            <el-input v-model="popup.AxqMaterialUpdate.attr.form.url.value"></el-input>
          </form-validate-field>
          <form-validate-field label="密码">
            <el-input v-model="popup.AxqMaterialUpdate.attr.form.psw.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>

import listPage from '@/components/list-page';
import popupConfirm from '@/components/popup/type/confirm';
import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';

import { model } from '@/model';
const { AxqMaterial } = model.collection;
export default {
  components: {
    listPage,
    popupConfirm,
    formValidate,
    formValidateField
  },
  data () {
    return {
      entitys: {
        AxqMaterial
      },
      page: {
        config: {
          entity: 'AxqMaterial',
          action: 'materialPage',
          selectable: true,
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: 'title',
              label: '标题'
            },
            {
              prop: 'url',
              label: '链接'
            },
            {
              prop: 'psw',
              label: '密码'
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
                        this.popup.AxqMaterialUpdate.attr.id = props.row.id;
                        this.$refs.popupConfirmAxqMaterialUpdate.open({ triggerClose: this.popup.AxqMaterialUpdate.fn.closeHandler });
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
            keyword: ''
          },
          order: {}
        }
      },
      popup: {
        AxqMaterialAdd: {
          attr: {
            form: AxqMaterial.formUtil().generator('add', 'default')
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.AxqMaterialAdd.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  AxqMaterial.sendApi('materialAdd', { params: {}, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.axqMaterialTable.query();
                        this.$message({
                          message: '公司素材添加成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '公司素材添加失败',
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
              });
            },
            hiddenHandler:()=>{
              this.popup.AxqMaterialAdd.attr.form= AxqMaterial.formUtil().generator('add', 'default');
            }
          }
        },
        AxqMaterialUpdate: {
          attr: {
            id: '',
            form: AxqMaterial.formUtil().generator('update', 'default')
          },
          fn: {
            fill: (callback) => {
              AxqMaterial.sendApi('materialInfo', { params: {}, data: { query: { id: this.popup.AxqMaterialUpdate.attr.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  callback(AxqMaterial, data);
                } else {
                  this.$message({
                    message: '获取公司素材信息错误',
                    type: 'error'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.AxqMaterialUpdate.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  AxqMaterial.sendApi('materialUpdate', { params: { id: this.popup.AxqMaterialUpdate.attr.id }, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.axqMaterialTable.query();
                        this.$message({
                          message: '公司素材更新成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '公司素材更新失败',
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
              });
            }
          }
        }
      }
    };
  }
};
</script>

<style lang="less">
.axq-material-list {
  background: white;
  .popup-confirm {
    &_axq-article-add,
    &_axq-article-update {
      padding: 20px;
      .ql-container {
        height: 500px;
      }
    }
  }
}
</style>
