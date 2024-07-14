<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-20 16:37:30
 * @LastEditTime: 2021-12-09 08:53:48
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/ma/live/@fragment/room-list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="live-room_list">
    <list-page ref="listPage" :config="page.config" :form="page.form" :hidden-action="['add']">
      <template slot="query">
        <div class="q-block">
          <div class="b-item">
            <options-selector
              :mode="1"
              placeholder="直播状态"
              :config="{entity: 'LiveRoom', type: 'status'}"
              @change="page.form.query.status = $event"
            ></options-selector>
          </div>
        </div>
        <div class="q-block">
          <div class="b-item">
            <el-input size="small" placeholder="主播/房间号" v-model="page.form.query.keyword"></el-input>
          </div>
        </div>
      </template>
    </list-page>
    <popup-confirm ref="popupConfirmPreview" title="直播预览">
      <div class="popup-confirm_preview">
        <div class="p-video">
          <video-player type="flv" :src="`${livePlayUrl}${popup.preview.attr.result.id}.flv`"></video-player>
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
import { appConfig } from '@/config/app';

const { LiveRoom } = model.collection;

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
      livePlayUrl: appConfig.livePlayUrl,
      page: {
        config: {
          entity: 'LiveRoom',
          action: 'roomPage',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: 'id',
              label: '直播间号',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, `TGP#${props.row.id}`);
                }
              ]
            },
            {
              prop: 'title',
              label: '标题'
            },
            {
              label: '公告',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, props.row.description);
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
              prop: 'status',
              label: '最新上线时间',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, '2021-07-21 12:43');
                }
              ]
            },
            {
              prop: 'onlineSize',
              label: '在线人数'
            },
            {
              label: '状态',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, LiveRoom.filter('status', props.row.status));
                }
              ]
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
              prop: 'createTime',
              label: '创建时间'
            },
            {
              fixed: 'right',
              prop: 'action',
              label: '操作',
              width: '160',
              VNodes: (props) => {
                let btn = [
                  ({ h, props }) => {
                    return h('el-button',
                      {
                        props: { type: 'primary', size: 'mini' },
                        nativeOn: {
                          click: () => {

                          }
                        }
                      },
                      '查看详情');
                  }
                ];
                if (props.row.status === 1) {
                  btn.push(
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
                    }
                  );
                  btn.push(
                    ({ h, props }) => {
                      return h('el-button',
                        {
                          props: { type: 'danger', size: 'mini' },
                          nativeOn: {
                            click: () => {
                              this.$confirm('此操作将拉黑主播房间, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                              }).then(() => {
                                LiveRoom.sendApi('roomUpdate', { params: { id: props.row.id }, data: { status: 3 } }, { errorTip: '禁播失败' }).then(res => {
                                  const { status, data } = res;
                                  if (status) {
                                    this.$message.success('禁播成功');
                                    this.$refs.listPage.query();
                                  }
                                });
                              }).catch(() => {
                              });
                            }
                          }
                        },
                        '禁播');
                    }
                  );
                }
                return btn;
              },
            }
          ],
          selectable: true
        },
        form: {
          query: {
            status: '',
            districtId: '',
            type: '',
            keyword: '',
            status: ''
          },
          order: {}
        }
      },
      popup: {
        preview: {
          attr: {
            result: new LiveRoom()
          },
          fn: {
            openHandler: (ok, props) => {
              LiveRoom.sendApi('roomInfo', { params: {}, data: { query: { id: props.row.id } } }, { parse4Entity: true, errorTip: '获取直播间信息失败' }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.preview.attr.result = data;
                  ok();
                }
              });
            }
          }
        }
      },
      switchSelector: {
        fn: {
          updateIsRecommended: (row, e) => {
            const { id } = row._raw;
            const { value, ok, error } = e;
            LiveRoom.sendApi('roomUpdate', { params: { id }, data: { isRecommended: value ? 1 : 0, remark: '' } }).then(res => {
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
      }
    };
  }
};
</script>

<style lang="less">
.live-room_list {
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
