<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-08-31 18:15:40
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/feedback/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-feedback-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        :load-excel-config="page.excel.fn.loadConfig"
        @add="$refs.popupConfirmAxqJobAdd.open({triggerClose: popup.axqJobAdd.fn.closeHandler})"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <time-picker type="date" @change="page.form.query.creatTime = $event"></time-picker>
            </div>
            <div class="b-item">
              <options-selector
                :mode="1"
                placeholder="反馈类型"
                :config="{entity: 'AxqFeedback', type: 'type'}"
                @change="page.form.query.type = $event.value"
              ></options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="关键字/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
        <template slot="excel-config_1">
          <div class="e-item">
            <div class="i-label">
              <span>时间范围</span>
            </div>
            <div class="i-value">
              <time-picker type="daterange" @change="page.excel.fn.timeChangeHandler"></time-picker>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmAxqFeedbackInfo" title="反馈详情">
      <div class="popup-comfirm_axq-feedback-info">
        <grid :col="2" title="反馈信息" border>
          <grid-item label="身份：">
            <span>{{$_.get(popup.axqFeedbackInfo.attr.info, 'type') === 1 ? '会员' : '店主'}}</span>
          </grid-item>
          <grid-item label="提交时间：">
            <span>{{$_.get(popup.axqFeedbackInfo.attr.info, 'createTime')}}</span>
          </grid-item>
        </grid>
        <grid title="反馈内容">
          <el-input
            slot="noGrid"
            type="textarea"
            :rows="7"
            :value="$_.get(popup.axqFeedbackInfo.attr.info, 'content')"
            disabled
          ></el-input>
        </grid>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import optionsSelector from '@/components/options-selector';
import timePicker from '@/components/time-picker';
import listPage from '@/components/list-page';
import popupConfirm from '@/components/popup/type/confirm';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';

import { model } from '@/model';
const { AxqFeedback } = model.collection;

export default {
  components: {
    listPage,
    optionsSelector,
    timePicker,
    popupConfirm,
    grid,
    gridItem
  },
  data () {
    return {
      page: {
        config: {
          entity: 'AxqFeedback',
          action: 'feedbackPage',
          column: [
            {
              prop: 'id',
              label: '序号'
            },
            {
              prop: '',
              label: '提交身份',
              VNodes: [
                ({ h, props }) => {
                  return h('p', props.row._raw.type === 1 ? '会员' : '店主');
                }
              ]
            },
            {
              label: '内容',
              VNodes: [
                ({ h, props }) => {
                  return h('p', { style: { height: '36px', lineHeight: '18px', overflow: 'hidden', textOverflow: 'ellipsis' } }, props.row._raw.content);
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
              VNodes: [
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmAxqFeedbackInfo.open({ triggerOpen: this.popup.axqFeedbackInfo.fn.openHandler, params: props });
                        }
                      }
                    },
                    '详情');
                }
              ]
            }
          ]
        },
        form: {
          query: {
            type: '',
            keyword: '',
            createTime: ''
          },
          order: {}
        },
        excel: {
          attr: {
            config: {
              params: {
                startTime: '',
                endTime: ''
              },
              data: {}
            }
          },
          fn: {
            timeChangeHandler: (e) => {
              const [st, et] = e;
              this.page.excel.attr.config.params.startTime = st;
              this.page.excel.attr.config.params.endTime = et;
            },
            loadConfig: () => {
              return this.page.excel.attr.config;
            }
          }
        },
      },
      popup: {
        axqFeedbackInfo: {
          attr: {
            info: {}
          },
          fn: {
            openHandler: (ok, params) => {
              AxqFeedback.sendApi('feedbackInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.axqFeedbackInfo.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取反馈信息失败',
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
.axq-feedback-list {
  background: white;
  .popup-comfirm {
    &_axq-feedback-info {
      padding: 20px;
      .el-textarea {
        textarea {
          color: #606266;
        }
      }
    }
  }
}
</style>
