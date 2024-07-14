<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-03-18 11:06:15
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/video/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-video-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="axqVideoTable"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmAxqVideoAdd.open({triggerClose: popup.axqVideoAdd.fn.closeHandler,triggerHidden: popup.axqVideoAdd.fn.hiddenHandler})"
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
    <popup-confirm ref="popupConfirmAxqVideoAdd" title="公司视频添加">
      <div class="popup-confirm_axq-video-add">
        <form-validate
          ref="axqVideoAdd"
          :form="popup.axqVideoAdd.attr.form"
          :validator="entitys.AxqVideo.formUtil().validate"
        >
          <form-validate-field label="标题" :field="popup.axqVideoAdd.attr.form.title">
            <el-input v-model="popup.axqVideoAdd.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="描述" :field="popup.axqVideoAdd.attr.form.description">
            <el-input
              type="textarea"
              :rows="5"
              v-model="popup.axqVideoAdd.attr.form.description.value"
            ></el-input>
          </form-validate-field>
          <form-validate-field label="点赞数" :field="popup.axqVideoAdd.attr.form.thumbsUpCount">
            <el-input type="number" v-model="popup.axqVideoAdd.attr.form.thumbsUpCount.value"></el-input>
          </form-validate-field>
          <form-validate-field label="视频封面" :field="popup.axqVideoAdd.attr.form.thumbnail">
            <img-video-uploader
              :max="1"
              @upload-success="popup.axqVideoAdd.fn.thumbnailChangeHandler"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="上传视频" :field="popup.axqVideoAdd.attr.form.downloadUrls">
            <file-uploader :max="2" @change="popup.axqVideoAdd.fn.downloadUrlsChangeHandler"></file-uploader>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqVideoUpdate" title="公司视频更新">
      <div class="popup-confirm_axq-video-update">
        <form-validate
          ref="axqVideoUpdate"
          :form="popup.axqVideoUpdate.attr.form"
          :fill="popup.axqVideoUpdate.fn.fill"
          :validator="entitys.AxqVideo.formUtil().validate"
        >
          <form-validate-field label="标题" :field="popup.axqVideoUpdate.attr.form.title">
            <el-input v-model="popup.axqVideoUpdate.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="描述" :field="popup.axqVideoUpdate.attr.form.description">
            <el-input
              type="textarea"
              :rows="5"
              v-model="popup.axqVideoUpdate.attr.form.description.value"
            ></el-input>
          </form-validate-field>
          <form-validate-field label="点赞数" :field="popup.axqVideoUpdate.attr.form.thumbsUpCount">
            <el-input type="number" v-model="popup.axqVideoUpdate.attr.form.thumbsUpCount.value"></el-input>
          </form-validate-field>
          <form-validate-field label="视频封面" :field="popup.axqVideoUpdate.attr.form.thumbnail">
            <img-video-uploader
              :max="1"
              @upload-success="popup.axqVideoUpdate.fn.thumbnailChangeHandler"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="上传视频" :field="popup.axqVideoUpdate.attr.form.url">
            <file-uploader :max="1" @change="popup.axqVideoUpdate.fn.urlChangeHandler"></file-uploader>
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
import imgVideoPreviewer from '@/components/img-video-previewer';
import fileUploader from '@/components/file-uploader';
import downloder from '@/utils/downloader';

import { model } from '@/model';
const { AxqVideo, Oss } = model.collection;
export default {
  components: {
    listPage,
    popupConfirm,
    formValidate,
    formValidateField,
    imgVideoUploader,
    fileUploader
  },
  data () {
    return {
      entitys: {
        AxqVideo,
        Oss
      },
      page: {
        config: {
          entity: 'AxqVideo',
          action: 'videoPage',
          selectable: true,
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: '',
              label: '封面',
              VNodes: [
                ({ h, props }) => {
                  return h('div', {
                    style: {
                      width: '100px',
                      height: '100px'
                    }
                  }, [
                    h(imgVideoPreviewer, { props: { src: props.row._raw.thumbnail } })
                  ]);
                }
              ]
            },
            {
              prop: 'title',
              label: '标题'
            },
            {
              prop: 'thumbsUpCount',
              label: '点赞数'
            },
            {
              prop: 'createTime',
              label: '创建时间'
            },
            {
              fixed: 'right',
              prop: 'action',
              label: '操作',
              width: '160',
              VNodes: [
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          props.row._raw.downloadUrls.toParse().forEach(i => {
                            downloder.do(new Oss(i.oss).fullUrl());
                          });
                        }
                      }
                    },
                    '下载');
                },
                ({ h, props }) => {
                  return h('el-button', {
                    props: { type: 'primary', size: 'mini' },
                    nativeOn: {
                      click: () => {
                        this.popup.axqVideoUpdate.attr.id = props.row.id;
                        this.$refs.popupConfirmAxqVideoUpdate.open({ triggerClose: this.popup.axqVideoUpdate.fn.closeHandler });
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
        axqVideoAdd: {
          attr: {
            form: AxqVideo.formUtil().generator('add', 'default')
          },
          fn: {
            thumbnailChangeHandler: (e) => {
              this.popup.axqVideoAdd.attr.form.thumbnail.value = e[0].filename;
            },
            downloadUrlsChangeHandler: (e) => {
              this.popup.axqVideoAdd.attr.form.downloadUrls.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.axqVideoAdd.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  AxqVideo.sendApi('videoAdd', { params: {}, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.axqVideoTable.query();
                        this.$message({
                          message: '公司视频添加成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '公司视频添加失败',
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
              this.popup.axqVideoAdd.attr.form= AxqVideo.formUtil().generator('add', 'default');
            }
          }
        },
        axqVideoUpdate: {
          attr: {
            id: '',
            form: AxqVideo.formUtil().generator('update', 'default')
          },
          fn: {
            fill: (callback) => {
              AxqVideo.sendApi('videoInfo', { params: {}, data: { query: { id: this.popup.axqVideoUpdate.attr.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  callback(AxqVideo, data);
                } else {
                  this.$message({
                    message: '获取公司视频信息错误',
                    type: 'error'
                  });
                }
              });
            },
            thumbnailChangeHandler: (e) => {
              this.popup.axqVideoUpdate.attr.form.thumbnail.value = e[0].filename;
            },
            urlChangeHandler: (e) => {
              this.popup.axqVideoUpdate.attr.form.url.value = new Oss(e.toParse()[0].oss).fullUrl();;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.axqVideoUpdate.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  AxqVideo.sendApi('videoUpdate', { params: { id: this.popup.axqVideoUpdate.attr.id }, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.axqVideoTable.query();
                        this.$message({
                          message: '公司视频更新成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '公司视频更新失败',
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
.axq-video-list {
  background: white;
  .popup-confirm {
    &_axq-video-add {
      padding: 20px;
    }
    &_axq-video-update {
      padding: 20px;
    }
  }
}
</style>
