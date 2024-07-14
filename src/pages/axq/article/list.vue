<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-09-25 17:05:00
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/article/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-article-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmAxqArticleAdd.open({triggerClose: popup.axqArticleAdd.fn.closeHandler,triggerHidden: popup.axqArticleAdd.fn.hiddenHandler})"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="报道/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
        <template slot="action">
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmAxqArticleAdd" title="报道添加">
      <div class="popup-confirm_axq-article-add">
        <form-validate
          ref="axqArticleAdd"
          :form="popup.axqArticleAdd.attr.form"
          :validator="entitys.AxqArticle.formUtil().validate"
        >
          <form-validate-field label="标题" :field="popup.axqArticleAdd.attr.form.title">
            <el-input v-model="popup.axqArticleAdd.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="长图">
            <img-video-uploader
              :max="1"
              @upload-success="popup.axqArticleAdd.fn.bannerChangeHandler"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="封面">
            <img-video-uploader
              :max="1"
              @upload-success="popup.axqArticleAdd.fn.thumbnailChangeHandler"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="内容">
            <text-editor @change="popup.axqArticleAdd.fn.contentChangeHandler"></text-editor>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqArticleUpdate" title="报道更新">
      <div class="popup-confirm_axq-article-update">
        <form-validate
          ref="axqArticleUpdate"
          :fill="popup.axqArticleUpdate.fn.fill"
          :form="popup.axqArticleUpdate.attr.form"
          :validator="entitys.AxqArticle.formUtil().validate"
        >
          <form-validate-field label="标题" :field="popup.axqArticleUpdate.attr.form.title">
            <el-input v-model="popup.axqArticleUpdate.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="长图">
            <img-video-uploader
              :max="1"
              @upload-success="popup.axqArticleUpdate.fn.bannerChangeHandler"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="封面">
            <img-video-uploader
              :max="1"
              @upload-success="popup.axqArticleUpdate.fn.thumbnailChangeHandler"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="内容">
            <text-editor @change="popup.axqArticleUpdate.fn.contentChangeHandler"></text-editor>
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
const { AxqArticle } = model.collection;
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
        AxqArticle
      },
      page: {
        config: {
          entity: 'AxqArticle',
          action: 'articlePage',
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
                        this.popup.axqArticleUpdate.attr.id = props.row.id;
                        this.$refs.popupConfirmAxqArticleUpdate.open({ triggerClose: this.popup.axqArticleUpdate.fn.closeHandler });
                      }
                    }
                  }, '编辑');
                },
                ({ h, props }) => {
                  return h('el-button', {
                    props: { type: 'danger', size: 'mini' },
                    nativeOn: {
                      click: () => {
                        this.delete(props.row)
                      }
                    }
                  }, '删除');
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
        axqArticleAdd: {
          attr: {
            form: AxqArticle.formUtil().generator('add', 'default')
          },
          fn: {
            bannerChangeHandler: (e) => {
              this.popup.axqArticleAdd.attr.form.banner.value = e[0].filename;
            },
            thumbnailChangeHandler: (e) => {
              this.popup.axqArticleAdd.attr.form.thumbnail.value = e[0].filename;
            },
            contentChangeHandler: (e) => {
              this.popup.axqArticleAdd.attr.form.content.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.axqArticleAdd.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  AxqArticle.sendApi('articleAdd', { params: {}, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.axqArticleTable.query();
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
              this.popup.axqArticleAdd.attr.form = AxqArticle.formUtil().generator('add', 'default');
            }
          }
        },
        axqArticleUpdate: {
          attr: {
            id: '',
            form: AxqArticle.formUtil().generator('update', 'default')
          },
          fn: {
            fill: (callback) => {
              AxqArticle.sendApi('articleInfo', { params: {}, data: { query: { id: this.popup.axqArticleUpdate.attr.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  callback(AxqArticle, data);
                } else {
                  this.$message({
                    message: '获取公司报道信息错误',
                    type: 'error'
                  });
                }
              });
            },
            bannerChangeHandler: (e) => {
              this.popup.axqArticleUpdate.attr.form.banner.value = e[0].filename;
            },
            thumbnailChangeHandler: (e) => {
              this.popup.axqArticleUpdate.attr.form.thumbnail.value = e[0].filename;
            },
            contentChangeHandler: (e) => {
              this.popup.axqArticleUpdate.attr.form.content.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.axqArticleUpdate.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  AxqArticle.sendApi('articleUpdate', { params: { id: this.popup.axqArticleUpdate.attr.id }, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.axqArticleTable.query();
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
  },
  methods: {
    delete (row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        AxqArticle.sendApi('articleDelete', { params: { id: row.id }, data: {} }, { errorTip: '删除失败' }).then(res => {
          const { status, data } = res;
          if (status) {
            this.$message.success('删除成功');
            this.$refs.listPage.query();
          }
        });
      }).catch(() => {
      });
    }
  }
};
</script>

<style lang="less">
.axq-article-list {
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
