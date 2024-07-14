<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-07 19:33:43
 * @LastEditTime: 2022-05-19 17:08:08
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/purchanse/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="purchanse-list">
    <div class="l-type">
      <div class="t-item" :class="{'t-item-active': page.form.query.type === item.value}" :key="key"
        v-for="(item, key) in entitys.Purchanse._options.type" @click="changeType(item)">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="l-list">
      <list-page ref="listPage" :config="page.config" :form="page.form"
        @add="go(`/purchanse/add?type=${page.form.query.type}`)" @form-reset="page.fn.resetHandler">
        <template slot="query">
          <div class="q-block">
            <div class="b-item" style="width: 200px;">
              <time-picker ref="timePicker" @change="options.fn.timeChangeHandler"></time-picker>
            </div>
            <div class="b-item">
              <options-selector :mode="1" ref="statusOptionsSelector" placeholder="订单状态"
                :config="{options: entitys.Purchanse._options.status}" @change="options.fn.statusChangeHandler">
              </options-selector>
            </div>
             <div class="b-item">
              <options-selector :mode="1" ref="checkStatusOptionsSelector" placeholder="复审状态"
                :config="{options: entitys.Purchanse._options.checkStatus}" @change="options.fn.checkStatusChangeHandler">
              </options-selector>
            </div>
            <div class="b-item" style="width: 150px;">
              <options-selector :mode="4" ref="distributorOptionsSelector" :placeholder="[1,2,3,6,7].includes(this.page.form.query.type)?'店主/ID/手机号':'店主/手机号'"
                :config="{req: options.fn.distributorQuery}" @change="options.fn.distributorChangeHandler">
              </options-selector>
            </div>
            <div class="b-item" style="width: 150px;">
              <options-selector :mode="4" ref="documentMakerOptionsSelector" placeholder="制单人"
                :config="{req: options.fn.customerServiceQuery}" @change="options.fn.customerServiceChangeHandler">
              </options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="订单/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
          <div class="q-block">
            <list-sort ref="listSort" :sort-list="[{label: '创建时间', value: 'createTime',  order: 'desc'}]"
              :order="page.form.order"></list-sort>
          </div>
        </template>
      </list-page>
    </div>
  </div>
</template>

<script>
  import listPage from '@/components/list-page';
  import listSort from '@/components/list-sort';
  import optionsSelector from '@/components/options-selector';
  import {
    model
  } from '@/model';
  import Printer from '@/components/axq/printer';
  import timePicker from '@/components/time-picker';
  import {
    mapState
  } from 'vuex';

  const {
    Purchanse,
    Member,
    AxqStaff
  } = model.collection;
  export default {
    components: {
      listPage,
      listSort,
      optionsSelector,
      timePicker
    },
    data() {
      return {
        entitys: {
          Purchanse
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
            checkStatusChangeHandler: (e) => {
              this.page.form.query.checkStatus = e
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
                console.log("data",data)
                ok(data.map(i => ({
                  value: i.id,
                  label: `${i.nickname}/${i.id}`
                })));
              });
            },
            distributorChangeHandler: (e) => {
              this.page.form.query.memberId = e;
            },
            customerServiceQuery: (e, ok) => {
              AxqStaff.sendApi('staffPage', {
                params: {},
                data: {
                  query: {
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
            customerServiceChangeHandler: (e) => {
              this.page.form.query.documentMakerId = e;
            }
          }
        },
        page: {
          config: {
            entity: 'Purchanse',
            action: 'page',
            column: [{
                fixed: true,
                prop: 'id',
                label: 'ID',
                width: '80'
              },
              {
                prop: 'sn',
                label: '编号',
                VNodes: (props) => {
                  const waitPrintPurchanseList = this.$_.get(this.ws, 'axqPrintStatus.waitPrintPurchanseList', []);
                  const btns = [
                    ({
                      h,
                      props
                    }) => {
                      return h(
                        'p',
                        `${this.blankGet(props.row.sn)}`
                      );
                    }
                  ];
                  if (props.row._raw.isNewDistributor) {
                    btns.push(
                      ({
                        h,
                        props
                      }) => {
                        return h(
                          'el-tag', {
                            props: {
                              size: 'mini'
                            }
                          }, '新店主订单');
                      }
                    );
                  }
                  if (props.row._raw.genType === 2) {
                    btns.push(
                      ({
                        h,
                        props
                      }) => {
                        return h(
                          'el-tag', {
                            props: {
                              size: 'mini'
                            }
                          }, '店主创建');
                      }
                    );
                  }
                  if (props.row._raw.checkStatus === 1) {
                    btns.push(
                      ({
                        h,
                        props
                      }) => {
                        return h(
                          'el-tag', {
                            props: {
                              size: 'mini'
                            }
                          }, '客服复审通过');
                      }
                    );
                  }
                  if (props.row._raw.checkStatus > 1) {
                    btns.push(
                      ({
                        h,
                        props
                      }) => {
                        return h(
                          'el-tag', {
                            props: {
                              size: 'mini'
                            }
                          }, '客服复审通过');
                      }
                    );
                    btns.push(
                      ({
                        h,
                        props
                      }) => {
                        return h(
                          'el-tag', {
                            props: {
                              size: 'mini'
                            }
                          }, '财务复审通过');
                      }
                    );
                  }
                  if (waitPrintPurchanseList.includes(props.row.id)) {
                    btns.push(
                      ({
                        h,
                        props
                      }) => {
                        return h(
                          'el-tag', {
                            props: {
                              size: 'mini',
                              type: 'warning'
                            }
                          }, '等待仓库打印');
                      }
                    );
                  }
                  return btns;
                }
              },
              {
                prop: 'amount',
                label: '售价/￥'
              },
              {
                columns: () => {
                  if (this.page.form.query.type !== 5) {
                    return [{
                        prop: 'nickname',
                        label: '店主/ID',
                        VNodes: [
                          ({
                            h,
                            props
                          }) => {
                            return h('p',
                            `${this.blankGet(props.row._raw.distributorName)}/${this.blankGet(props.row._raw.memberId)}`);
                          }
                        ]
                      }
                    ];
                  } else {
                    return [{
                        prop: 'amountActual',
                        label: '实收金额/￥'
                      },
                      {
                        prop: 'recipient',
                        label: '收件人'
                      }
                    ];
                  }
                }
              },
              {
                columns: () => {
                  if (this.page.form.query.type !== 3) {
                    return [{
                      prop: 'fullAddress',
                      label: '收货地址',
                      VNodes: [
                        ({
                          h,
                          props
                        }) => {
                          return h('p', this.blankGet(props.row._raw.fullAddress));
                        }
                      ]
                    }];
                  }
                }
              },
              {
                prop: 'status',
                label: '状态',
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h('p', {}, this.entitys.Purchanse.filter('status', props.row.status));
                  }
                ]
              },
              {
                columns: () => {
                  if (this.page.form.query.type !== 5) {
                    return [{
                      prop: 'integralAchieveGive',
                      label: '赠送业绩'
                    }];
                  }
                }
              },
              {
                columns: () => {
                  if (this.page.form.query.type !== 5) {
                    return [{
                      prop: '',
                      label: '赠送商品数量',
                      VNodes: [
                        ({
                          h,
                          props
                        }) => {
                          return h('p', {}, this.blankGet(props.row._raw.giftQuantity));
                        }
                      ]
                    }];
                  }
                }
              },
              {
                prop: '',
                label: '支付方式',
                width: 150,
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h('div', {}, this.getPaymentStrFilter(props.row._raw).map(i => {
                      return h('p', {}, i)
                    }));
                  }
                ]
              },
              {
                prop: '',
                label: '制单人',
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h('p', {}, this.blankGet(props.row._raw.documentMakerName));
                  }
                ]
              },
              {
                prop: '',
                label: '备注',
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h('p', {}, this.blankGet(props.row._raw.remark));
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
                  const btn = [
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
                              this.go(`/purchanse/${props.row.id}?type=${this.page.form.query.type}`);
                            }
                          }
                        },
                        '查看');
                    },
                    ({
                      h,
                      props
                    }) => {
                      return h('el-button', {
                          props: {
                            size: 'mini'
                          },
                          nativeOn: {
                            click: () => {
                              this.printer.fn.do(props);
                            }
                          }
                        },
                        '打印');
                    }
                  ];
                  if ([0, 2].includes(props.row._raw.status)) {
                    btn.push(({
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
                            this.go(
                            `/purchanse/update/${props.row.id}?type=${this.page.form.query.type}`);
                          }
                        }
                      }, '编辑');
                    });
                  }
                  if ([8, 9].includes(props.row._raw.status)) {
                    btn.push(({
                      h,
                      props
                    }) => {
                      return h('el-button', {
                        props: {
                          type: 'danger',
                          size: 'mini'
                        },
                        nativeOn: {
                          click: () => {
                            this.updateStatus(props.row, 10);
                          }
                        }
                      }, '删除');
                    });
                  }
                  if (props.row._raw.status === 9) {
                    btn.push(({
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
                            this.updateStatus(props.row, 0);
                          }
                        }
                      }, '恢复');
                    });
                  }
                  if ([1, 2, 5, 6, 7].includes(this.page.form.query.type) && props.row._raw.checkStatus === 0) {
                    btn.push(({
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
                            this.updateSingleField(props.row, 1);
                          }
                        }
                      }, '复审通过');
                    });
                  }
                  return btn;
                }
              }
            ],
            selectable: true,
            formQueryPreHook: () => {
              let f = {};
              f.documentMakerId = this.isAdmin ? '' : (this.$_.get(this.axqStaffInfo,
                'accessExtraJson.allowedGetAllDistributor') === 1 ? '' : this.axqStaffInfo.id)
              return f;
            }
          },
          form: {
            query: {
              type: Number(this.$route.query.type) || 1,
              status: '',
              memberId: '',
              documentMakerId: '',
              keyword: '',
              startTime: '',
              endTime: '',
              checkStatus:''
            },
            order: {
              createTime: 'desc'
            }
          },
          fn: {
            resetHandler: () => {
              this.$refs.timePicker.reset();
              this.$refs.statusOptionsSelector.reset();
              this.$refs.checkStatusOptionsSelector.reset();
              this.$refs.distributorOptionsSelector.reset();
              this.$refs.documentMakerOptionsSelector.reset();
            }
          }
        },
        printer: {
          fn: {
            do: (props) => {
              new Printer(1).run({}, {
                purchanseId: props.row._raw.id
              });
            }
          }
        }
      };
    },
    computed: {
      ...mapState('sys', ['ws'])
    },
    methods: {
      changeType(item) {
        this.rep(`/purchanse/list?type=${item.value}`);
        this.page.form.query.type = item.value;
      },
      updateStatus(row, status) {
        const {
          id,
          sn
        } = row._raw;
        const status2msg = {
          0: {
            title: '恢复订单',
            text: `是否恢复订单${sn}？`
          },
          10: {
            title: '删除订单',
            text: `是否删除订单${sn}？`
          }
        };
        this.$confirm(status2msg[status].text, status2msg[status].title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Purchanse.sendApi('updateStatus', {
            params: {
              id,
              status
            },
            data: {}
          }).then(res => {
            const {
              status
            } = res;
            if (status) {
              this.$refs.listPage.query();
              this.$message.success('更新成功');
            } else {
              this.$message.error('更新失败');
            }
          });
        }).catch(() => {});
      },
      updateSingleField(row, status) {
        const {
          id,
          sn
        } = row._raw;
        const status2msg = {
          1: {
            title: '复审通过',
            text: `是否确认订单${sn}复审通过？`
          },
          2: {
            title: '复审不通过',
            text: `是否确认订单${sn}复审未通过？`
          }
        };
        this.$confirm(status2msg[status].text, status2msg[status].title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Purchanse.sendApi('updateSingleField', {
            params: {
              id,
              type: 1
            },
            data: {
              value: status
            }
          }).then(res => {
            const {
              status
            } = res;
            if (status) {
              this.$refs.listPage.query();
              this.$message.success('更新成功');
            } else {
              this.$message.error('更新失败');
            }
          });
        }).catch(() => {});
      }
    }
  };
</script>

<style lang="less">
  .purchanse-list {
    .l-type {
      display: flex;
      padding: 0 10px;
      width: 100%;
      background: white;

      .t-item {
        display: flex;
        align-items: center;
        height: 70px;
        padding: 0 10px;

        span {
          padding: 10px 0;
        }

        &-active {
          position: relative;

          &:after {
            position: absolute;
            content: "";
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: #1890ff;
          }
        }

        &:not(:first-child) {
          margin-left: 20px;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }

    .l-list {
      padding: 20px;
      margin-top: 20px;
      background: white;
    }
  }
</style>