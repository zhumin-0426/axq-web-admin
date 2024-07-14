<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-05-23 10:02:23
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/member/transfer/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page member-transfer-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page ref="listPage" :config="page.config" :form="page.form" @add="go('/member-transfer/add')"
        @form-reset="page.fn.resetHandler">
        <template slot="query">
          <div class="q-block">
            <div class="b-item" style="width: 200px;">
              <time-picker ref="timePicker" @change="options.fn.timeChangeHandler"></time-picker>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <options-selector :mode="1" ref="statusOptionsSelector" placeholder="状态"
                :config="{entity: 'MemberTransfer', type: 'status'}" @change="options.fn.statusChangeHandler">
              </options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <options-selector :mode="4" ref="distributorOptionsSelector" placeholder="接收领导人/ID"
                :config="{req: options.fn.distributorQuery}" @change="options.fn.distributorChangeHandler">
              </options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <options-selector :mode="4" ref="operatorOptionsSelector" placeholder="操作人"
                :config="{ req: options.fn.operatorQuery }" @change="options.fn.operatorChangeHandler">
              </options-selector>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmInfo" title="挪动详情">
      <div class="popup-confirm_info">
        <grid>
          <grid-item label="挪动接收人/ID：">
            <span>{{ popup.info.attr.info.recipient.nickname }}/{{ popup.info.attr.info.recipient.id }}</span>
          </grid-item>
          <grid-item label="挪动人数：">
            <span>{{ popup.info.attr.info.memberTransferMemberList.length }}</span>
          </grid-item>
          <grid-item label="状态：">
            <span>{{ entitys.MemberTransfer.filter('status', popup.info.attr.info.status) }}</span>
          </grid-item>
          <grid-item label="类型：">
            <span>{{ entitys.MemberTransfer.filter('type', popup.info.attr.info.type) }}</span>
          </grid-item>
          <grid-item label="是否挪动下级店主：">
            <span>{{ popup.info.attr.info.isTransferSubDistributor === 1 ? '是': '否' }}</span>
          </grid-item>
          <grid-item label="挪动时间：">
            <span>{{ popup.info.attr.info.createTime }}</span>
          </grid-item>
          <grid-item label="操作人：">
            <span>{{ popup.info.attr.info.operator.nickname }}</span>
          </grid-item>
        </grid>
        <elastic-table :table-data="popup.info.attr.info.memberTransferMemberList" :column="popup.info.attr.column">
        </elastic-table>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
  import listPage from '@/components/list-page';
  import timePicker from '@/components/time-picker';
  import optionsSelector from '@/components/options-selector';
  import popupConfirm from '@/components/popup/type/confirm';
  import grid from '@/components/grid/';
  import gridItem from '@/components/grid/item';
  import elasticTable from '@/components/elastic-table';

  import {
    model
  } from '@/model';

  const {
    MemberTransfer,
    Member,
    AxqStaff
  } = model.collection;

  export default {
    components: {
      listPage,
      timePicker,
      optionsSelector,
      popupConfirm,
      grid,
      gridItem,
      elasticTable
    },
    data() {
      return {
        entitys: {
          MemberTransfer
        },
        options: {
          fn: {
            timeChangeHandler: (e) => {
              const [startTime, endTime] = e;
              this.page.form.query.startTime = startTime;
              this.page.form.query.endTime = endTime;
            },
            statusChangeHandler: (e) => {
              this.page.form.query.status = e;
            },
            distributorQuery: (e, ok) => {
              Member.sendApi('page', {
                params: {},
                data: {
                  query: {
                    type: 7,
                    keyword: e
                  }
                }
              }).then(res => {
                const {
                  data
                } = res;
                ok(data.map(i => ({
                  value: i.id,
                  label: i.nickname
                })));
              });
            },
            distributorChangeHandler: (e) => {
              this.page.form.query.recipientId = e;
            },
            operatorQuery: (e, ok) => {
              AxqStaff.sendApi("staffPage", {
                params: {},
                data: {
                  query: {
                    keyword: e,
                  },
                },
              }).then((res) => {
                const {
                  data
                } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: i.nickname,
                  }))
                );
              });
            },
            operatorChangeHandler: (e) => {
              this.page.form.query.operatorId = e;
            },
          }
        },
        page: {
          config: {
            entity: 'MemberTransfer',
            action: 'transferPage',
            column: [{
                prop: 'id',
                label: 'ID'
              },
              {
                prop: 'sn',
                label: '编号'
              },
              {
                prop: '',
                label: '接收团队领导人/ID',
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    const content = `${props.row._raw.recipientName}/${props.row._raw.recipientId}`
                    return h('p', content);
                  }
                ]
              },
              {
                prop: '',
                label: '挪动人数',
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h('p', {}, props.row._raw.transferCount);
                  }
                ]
              },
              {
                prop: '',
                label: '挪动类型',
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h('p', {}, MemberTransfer.filter('type',props.row._raw.type));
                  }
                ]
              },
              {
                prop: '',
                label: '是否挪动下级店主',
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h('p', {}, props.row._raw.isTransferSubDistributor === 1 ? '是' : '否');
                  }
                ]
              },
              {
                prop: '',
                label: '会员归属店铺',
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h('p', {}, props.row._raw.recipientShopName);
                  }
                ]
              },
              {
                prop: '',
                label: '操作人',
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h('p', {}, props.row._raw.operatorName);
                  }
                ]
              },
              {
                prop: '',
                label: '状态',
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h('p', {}, this.entitys.MemberTransfer.filter('status', props.row._raw.status));
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
                  ({
                    h,
                    props
                  }) => {
                    return h('el-button', {
                        props: {
                          type: 'primary',
                          size: 'mini'
                        },
                        nativeOn: {
                          click: () => {
                            this.$refs.popupConfirmInfo.open({
                              triggerOpen: this.popup.info.fn.openHandler,
                              params: props
                            });
                          }
                        }
                      },
                      '查看');
                  }
                ]
              }
            ],
            selectable: true
          },
          form: {
            query: {
              startTime: '',
              endTime: '',
              status: '',
              recipientId: '',
              operatorId:''
            },
            order: {}
          },
          fn: {
            resetHandler: () => {
              this.$refs.timePicker.reset();
              this.$refs.statusOptionsSelector.reset();
              this.$refs.operatorOptionsSelector.reset();
              this.page.form.query.keyword = '';
            }
          }
        },
        popup: {
          info: {
            attr: {
              info: new MemberTransfer(),
              column: [{
                  prop: '',
                  label: '会员名称/ID',
                  VNodes: [
                    ({
                      h,
                      props
                    }) => {
                      const content = `${props.row.member.nickname}/${props.row.member.id}`
                      return h('p', content);
                    }
                  ]
                },
                {
                  prop: '',
                  label: '会员类型',
                  VNodes: [
                    ({
                      h,
                      props
                    }) => {
                      return h('p', {}, Member.filter('type', props.row._raw.member.type));
                    }
                  ]
                },
                {
                  prop: 'createTime',
                  label: '下级人数',
                  VNodes: [
                    ({
                      h,
                      props
                    }) => {
                      return h('p', {}, props.row._raw.subMemberCount);
                    }
                  ]
                }
              ]

            },
            fn: {
              openHandler: (ok, params) => {
                MemberTransfer.sendApi('transferInfo', {
                  params: {},
                  data: {
                    query: {
                      id: params.row._raw.id
                    }
                  }
                }).then(res => {
                  const {
                    status,
                    data
                  } = res;
                  if (status) {
                    this.popup.info.attr.info = new MemberTransfer(data);
                    ok();
                  } else {
                    this.$message.error('获取挪动详情失败');
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
  .member-transfer-list {
    background: white;

    .popup-confirm {
      &_info {
        padding: 20px;
      }
    }
  }
</style>