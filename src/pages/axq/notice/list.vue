<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-03-18 11:28:23
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/notice/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-notice-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="axqNoticeTable"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmAxqNoticeAdd.open({triggerClose: popup.axqNoticeAdd.fn.closeHandler,triggerHidden: popup.axqNoticeAdd.fn.hiddenHandler})"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="标题/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
        <template slot="action">
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmAxqNoticeAdd" title="公司通告添加">
      <div class="popup-confirm_axq-notice-add">
        <form-validate
          ref="axqNoticeAdd"
          :form="popup.axqNoticeAdd.attr.form"
          :validator="entitys.AxqNotice.formUtil().validate"
        >
          <form-validate-field label="标题" :field="popup.axqNoticeAdd.attr.form.title">
            <el-input v-model="popup.axqNoticeAdd.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="封面">
            <img-video-uploader
              :max="1"
              @upload-success="popup.axqNoticeAdd.fn.thumbnailChangeHandler"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="内容">
            <text-editor @change="popup.axqNoticeAdd.fn.contentChangeHandler"></text-editor>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqNoticeUpdate" title="公司公告更新">
      <div class="popup-confirm_axq-notice-update">
        <form-validate
          ref="axqNoticeUpdate"
          :form="popup.axqNoticeUpdate.attr.form"
          :fill="popup.axqNoticeUpdate.fn.fill"
          :validator="entitys.AxqNotice.formUtil().validate"
        >
          <form-validate-field label="标题" :field="popup.axqNoticeUpdate.attr.form.title">
            <el-input v-model="popup.axqNoticeUpdate.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="封面">
            <img-video-uploader
              :max="1"
              @upload-success="popup.axqNoticeUpdate.fn.thumbnailChangeHandler"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="内容">
            <text-editor @change="popup.axqNoticeUpdate.fn.contentChangeHandler"></text-editor>
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
import imgVideoUploader from '@/components/img-video-uploader';
import textEditor from '@/components/text-editor';

import { model } from '@/model';
const { AxqNotice } = model.collection;
export default {
  components: {
    listPage,
    popupConfirm,
    formValidate,
    formValidateField,
    imgVideoUploader,
    textEditor
  },
  data () {
    return {
      entitys: {
        AxqNotice
      },
      page: {
        config: {
          entity: 'AxqNotice',
          action: 'noticePage',
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
                        this.popup.axqNoticeUpdate.attr.id = props.row.id;
                        this.$refs.popupConfirmAxqNoticeUpdate.open({ triggerClose: this.popup.axqNoticeUpdate.fn.closeHandler });
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
        axqNoticeAdd: {
          attr: {
            form: AxqNotice.formUtil().generator('add', 'default')
          },
          fn: {
            thumbnailChangeHandler: (e) => {
              this.popup.axqNoticeAdd.attr.form.thumbnail.value = e[0].filename;
            },
            contentChangeHandler: (e) => {
              this.popup.axqNoticeAdd.attr.form.content.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.axqNoticeAdd.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  AxqNotice.sendApi('noticeAdd', { params: {}, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.axqNoticeTable.query();
                        this.$message({
                          message: '公司通告添加成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '公司通告添加失败',
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
              this.popup.axqNoticeAdd.attr.form = AxqNotice.formUtil().generator('add', 'default');
            }
          }
        },
        axqNoticeUpdate: {
          attr: {
            id: '',
            form: AxqNotice.formUtil().generator('update', 'default')
          },
          fn: {
            fill: (callback) => {
              AxqNotice.sendApi('noticeInfo', { params: {}, data: { query: { id: this.popup.axqNoticeUpdate.attr.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  callback(AxqNotice, data);
                } else {
                  this.$message({
                    message: '获取公司公告信息错误',
                    type: 'error'
                  });
                }
              });
            },
            thumbnailChangeHandler: (e) => {
              this.popup.axqNoticeUpdate.attr.form.thumbnail.value = e[0].filename;
            },
            contentChangeHandler: (e) => {
              this.popup.axqNoticeUpdate.attr.form.content.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.axqNoticeUpdate.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  AxqNotice.sendApi('noticeUpdate', { params: { id: this.popup.axqNoticeUpdate.attr.id }, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.axqNoticeTable.query();
                        this.$message({
                          message: '公司通告更新成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '公司通告更新失败',
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
.axq-notice-list {
  background: white;
  .popup-confirm {
    &_axq-notice-update,
    &_axq-notice-add {
      padding: 20px;
      .ql-container {
        height: 500px;
      }
    }
  }
}
</style>
