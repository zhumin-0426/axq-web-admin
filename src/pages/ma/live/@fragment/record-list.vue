<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-20 16:37:30
 * @LastEditTime: 2021-11-30 13:59:18
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/ma/live/@fragment/record-list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="live-record_list">
    <list-page ref="listPage" :config="page.config" :form="page.form" :hidden-action="['add']">
      <template slot="query">
        <div class="q-block">
          <div class="b-item">
            <el-input size="small" placeholder="主播/标题" v-model="page.form.query.keyword"></el-input>
          </div>
        </div>
      </template>
    </list-page>
    <popup-confirm ref="popupConfirmPreview" title="录播预览">
      <div class="popup-confirm_preview">
        <div class="p-video">
          <video-player type="mp4" :src="popup.preview.attr.result.url"></video-player>
        </div>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import listPage from '@/components/list-page';
import optionsSelector from '@/components/options-selector';
import switchSelector from '@/components/switch-selector';
import popupConfirm from '@/components/popup/type/confirm';
import videoPlayer from '@/components/img-video-previewer/player';
import { model } from '@/model';

const { LiveRecord } = model.collection;

export default {
  components: {
    listPage,
    optionsSelector,
    switchSelector,
    popupConfirm,
    videoPlayer
  },
  data () {
    return {
      page: {
        config: {
          entity: 'LiveRecord',
          action: 'recordPage',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              label: '标题',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, props.row._raw.title);
                }
              ]
            },
            {
              label: '主播/ID',
              VNodes: [
                ({ h, props }) => {

                  return h('p', {}, `${props.row._raw.nickname}/${props.row._raw.memberId}`);
                }
              ]
            },
            {
              prop: 'createTime',
              label: '创建时间'
            },
            {
              prop: '',
              label: '是否推荐',
              width: 110,
              VNodes: [
                ({ h, props }) => {
                  return h(switchSelector, {
                    props: {
                      mode: 2,
                      tip: '更改直播间推荐状态，是否继续？',
                      config: { value: !!props.row._raw.isRecommended }
                    },
                    on: {
                      change: (e) => {
                        this.switchSelector.fn.updateIsRecommended(props.row, e);
                      }
                    }
                  });
                }
              ]
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
                          this.$refs.popupConfirmPreview.open({ triggerOpen: this.popup.preview.fn.openHandler, params: props });
                        }
                      }
                    },
                    '预览');
                },
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'danger', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$confirm('此操作永久删除该视频, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                          }).catch(() => {
                          });
                        }
                      }
                    },
                    '删除');
                }
              ]
            }
          ],
          selectable: true
        },
        form: {
          query: {
            status: '',
            districtId: '',
            type: '',
            keyword: ''
          },
          order: {}
        }
      },
      switchSelector: {
        fn: {
          updateIsRecommended: (row, e) => {
            const { id } = row._raw;
            const { value, ok, error } = e;
            LiveRecord.sendApi('recordUpdate', { params: { id }, data: { isRecommended: value ? 1 : 0, remark: '' } }).then(res => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: '更新推荐状态成功',
                  type: 'success'
                });
                this.$refs.listPage.query();
              } else {
                error();
                this.$message({
                  message: '更新推荐状态失败',
                  type: 'error'
                });
              }
            });
          }
        }
      },
      popup: {
        preview: {
          attr: {
            result: new LiveRecord()
          },
          fn: {
            openHandler: (ok, props) => {
              this.popup.preview.attr.result = props.row;
              ok();
            }
          }
        }
      }
    };
  }
};
</script>

<style lang="less">
.live-record_list {
  .popup-confirm {
    &_preview {
      padding: 20px;
      .p-video {
        width: 320px;
        height: 180px;
        margin: 0 auto;
      }
    }
  }
}
</style>
