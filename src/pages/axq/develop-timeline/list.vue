<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-08-26 13:38:24
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/develop-timeline/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-develop-timeline-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="axqDevelopTimelineTable"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmAxqDevelopTimelineAdd.open({triggerClose: popup.axqDevelopTimelineAdd.fn.closeHandler,triggerHidden: popup.axqDevelopTimelineAdd.fn.hiddenHandler})"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="发展历程/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
        <template slot="action">
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmAxqDevelopTimelineAdd" title="发展历程添加">
      <div class="popup-confirm_axq-develop-timeline-add">
        <form-validate
          ref="axqDevelopTimelineAdd"
          :form="popup.axqDevelopTimelineAdd.attr.form"
          :validator="entitys.AxqDevelopTimeline.formUtil().validate"
        >
          <form-validate-field label="时间点" :field="popup.axqDevelopTimelineAdd.attr.form.keyTime">
            <time-picker
              type="date"
              @change="popup.axqDevelopTimelineAdd.attr.form.keyTime.value = $event"
            ></time-picker>
          </form-validate-field>
          <form-validate-field label="标题" :field="popup.axqDevelopTimelineAdd.attr.form.title">
            <el-input v-model="popup.axqDevelopTimelineAdd.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="封面">
            <img-video-uploader
              :max="1"
              @upload-success="popup.axqDevelopTimelineAdd.fn.thumbnailChangeHandler"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="内容">
            <text-editor @change="popup.axqDevelopTimelineAdd.fn.contentChangeHandler"></text-editor>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqDevelopTimelineUpdate" title="发展历程更新">
      <div class="popup-confirm_axq-develop-timeline-update">
        <form-validate
          ref="axqDevelopTimelineUpdate"
          :fill="popup.axqDevelopTimelineUpdate.fn.fill"
          :form="popup.axqDevelopTimelineUpdate.attr.form"
          :validator="entitys.AxqDevelopTimeline.formUtil().validate"
        >
          <form-validate-field label="时间点" :field="popup.axqDevelopTimelineAdd.attr.form.keyTime">
            <time-picker
              type="date"
              :data="popup.axqDevelopTimelineUpdate.attr.form.keyTime.value"
              @change="popup.axqDevelopTimelineUpdate.attr.form.keyTime.value = $event"
            ></time-picker>
          </form-validate-field>
          <form-validate-field label="标题" :field="popup.axqDevelopTimelineUpdate.attr.form.title">
            <el-input v-model="popup.axqDevelopTimelineUpdate.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="封面">
            <img-video-uploader
              :max="1"
              @upload-success="popup.axqDevelopTimelineUpdate.fn.thumbnailChangeHandler"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="内容">
            <text-editor @change="popup.axqDevelopTimelineUpdate.fn.contentChangeHandler"></text-editor>
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
import timePicker from '@/components/time-picker';

import { model } from '@/model';
const { AxqDevelopTimeline } = model.collection;
export default {
  components: {
    listPage,
    popupConfirm,
    formValidate,
    formValidateField,
    imgVideoUploader,
    textEditor,
    timePicker
  },
  data () {
    return {
      entitys: {
        AxqDevelopTimeline
      },
      page: {
        config: {
          entity: 'AxqDevelopTimeline',
          action: 'developTimelinePage',
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
                        this.popup.axqDevelopTimelineUpdate.attr.id = props.row.id;
                        this.$refs.popupConfirmAxqDevelopTimelineUpdate.open({ triggerClose: this.popup.axqDevelopTimelineUpdate.fn.closeHandler });
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
        },
        fn: {
          resetHandler: () => {
            this.page.form.query.keyword = '';
          }
        }
      },
      popup: {
        axqDevelopTimelineAdd: {
          attr: {
            form: AxqDevelopTimeline.formUtil().generator('add', 'default')
          },
          fn: {
            bannerChangeHandler: (e) => {
              this.popup.axqDevelopTimelineAdd.attr.form.banner.value = e[0].filename;
            },
            thumbnailChangeHandler: (e) => {
              this.popup.axqDevelopTimelineAdd.attr.form.thumbnail.value = e[0].filename;
            },
            contentChangeHandler: (e) => {
              this.popup.axqDevelopTimelineAdd.attr.form.content.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.axqDevelopTimelineAdd.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  AxqDevelopTimeline.sendApi('developTimelineAdd', { params: {}, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.axqDevelopTimelineTable.query();
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
              this.popup.axqDevelopTimelineAdd.attr.form = AxqDevelopTimeline.formUtil().generator('add', 'default');
            }
          }
        },
        axqDevelopTimelineUpdate: {
          attr: {
            id: '',
            form: AxqDevelopTimeline.formUtil().generator('update', 'default')
          },
          fn: {
            fill: (callback) => {
              AxqDevelopTimeline.sendApi('developTimelineInfo', { params: {}, data: { query: { id: this.popup.axqDevelopTimelineUpdate.attr.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  callback(AxqDevelopTimeline, data);
                } else {
                  this.$message({
                    message: '获取发展历程信息错误',
                    type: 'error'
                  });
                }
              });
            },
            bannerChangeHandler: (e) => {
              this.popup.axqDevelopTimelineUpdate.attr.form.banner.value = e[0].filename;
            },
            thumbnailChangeHandler: (e) => {
              this.popup.axqDevelopTimelineUpdate.attr.form.thumbnail.value = e[0].filename;
            },
            contentChangeHandler: (e) => {
              this.popup.axqDevelopTimelineUpdate.attr.form.content.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.axqDevelopTimelineUpdate.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  AxqDevelopTimeline.sendApi('developTimelineUpdate', { params: { id: this.popup.axqDevelopTimelineUpdate.attr.id }, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.axqDevelopTimelineTable.query();
                        this.$message({
                          message: '发展历程更新成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '发展历程更新失败',
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
.axq-develop-timeline-list {
  background: white;
  .popup-confirm {
    &_axq-develop-timeline-add,
    &_axq-develop-timeline-update {
      padding: 20px;
      .ql-container {
        height: 500px;
      }
    }
  }
}
</style>
