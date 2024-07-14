<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-04-22 13:48:02
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/self-employed-laborer/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page axq-self-employed-laborer-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page ref="listPage" :config="page.config" :form="page.form"
        @add="$refs.popupConfirmAxqSelfEmployedLaborerAdd.open({triggerClose: popup.axqSelfEmployedLaborerAdd.fn.closeHandler,triggerHidden: popup.axqSelfEmployedLaborerAdd.fn.hiddenHandler})"
        @form-reset="page.fn.resetHandler">
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <options-selector :mode="1" ref="statusOptionsSelector" placeholder="状态"
                :config="{entity: 'AxqSelfEmployedLaborer', type: 'status'}" @change="options.fn.statusChangeHandler">
              </options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="个体户/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmAxqSelfEmployedLaborerAdd" title="个体户添加">
      <div class="popup-confirm_axq-self-employed-laborer-add">
        <form-validate ref="axqSelfEmployedLaborerAdd" :form="popup.axqSelfEmployedLaborerAdd.attr.form">
          <form-validate-field label="个体户名称" :field="popup.axqSelfEmployedLaborerAdd.attr.form.name">
            <el-input v-model="popup.axqSelfEmployedLaborerAdd.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="经营者" :field="popup.axqSelfEmployedLaborerAdd.attr.form.manager">
            <el-input v-model="popup.axqSelfEmployedLaborerAdd.attr.form.manager.value"></el-input>
          </form-validate-field>
          <form-validate-field label="经营者手机号" :field="popup.axqSelfEmployedLaborerAdd.attr.form.managerMobile">
            <el-input v-model="popup.axqSelfEmployedLaborerAdd.attr.form.managerMobile.value"></el-input>
          </form-validate-field>
          <form-validate-field label="银行类型" :field="popup.axqSelfEmployedLaborerAdd.attr.form.bankId">
            <options-selector :mode="2" :config="{ key: 'sysBank'}"
              @change="popup.axqSelfEmployedLaborerAdd.fn.sysBankChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field label="开户行" :field="popup.axqSelfEmployedLaborerAdd.attr.form.bankOpenAddress">
            <el-input v-model="popup.axqSelfEmployedLaborerAdd.attr.form.bankOpenAddress.value"></el-input>
          </form-validate-field>
          <form-validate-field label="卡号" :field="popup.axqSelfEmployedLaborerAdd.attr.form.bankNumber">
            <el-input v-model="popup.axqSelfEmployedLaborerAdd.attr.form.bankNumber.value"></el-input>
          </form-validate-field>
          <form-validate-field label="备注" :field="popup.axqSelfEmployedLaborerAdd.attr.form.remark">
            <el-input type="textarea" :rows="5" v-model="popup.axqSelfEmployedLaborerAdd.attr.form.remark.value">
            </el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqSelfEmployedLaborerUpdate" title="个体户更新">
      <div class="popup-confirm_axq-self-employed-laborer-add">
        <form-validate ref="axqSelfEmployedLaborerUpdate" :form="popup.axqSelfEmployedLaborerUpdate.attr.form"
          :fill="popup.axqSelfEmployedLaborerUpdate.fn.fill">
          <form-validate-field label="个体户名称" :field="popup.axqSelfEmployedLaborerUpdate.attr.form.name">
            <el-input v-model="popup.axqSelfEmployedLaborerUpdate.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="经营者" :field="popup.axqSelfEmployedLaborerUpdate.attr.form.manager">
            <el-input v-model="popup.axqSelfEmployedLaborerUpdate.attr.form.manager.value"></el-input>
          </form-validate-field>
          <form-validate-field label="经营者手机号" :field="popup.axqSelfEmployedLaborerUpdate.attr.form.managerMobile">
            <el-input v-model="popup.axqSelfEmployedLaborerUpdate.attr.form.managerMobile.value"></el-input>
          </form-validate-field>
          <form-validate-field label="银行类型" :field="popup.axqSelfEmployedLaborerUpdate.attr.form.bankId">
            <options-selector :mode="2" :config="{ key: 'sysBank'}"
              @change="popup.axqSelfEmployedLaborerUpdate.fn.sysBankChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field label="开户行" :field="popup.axqSelfEmployedLaborerUpdate.attr.form.bankOpenAddress">
            <el-input v-model="popup.axqSelfEmployedLaborerUpdate.attr.form.bankOpenAddress.value"></el-input>
          </form-validate-field>
          <form-validate-field label="卡号" :field="popup.axqSelfEmployedLaborerUpdate.attr.form.bankNumber">
            <el-input v-model="popup.axqSelfEmployedLaborerUpdate.attr.form.bankNumber.value"></el-input>
          </form-validate-field>
          <form-validate-field label="状态" :field="popup.axqSelfEmployedLaborerUpdate.attr.form.status">
            <el-radio-group v-model="popup.axqSelfEmployedLaborerUpdate.attr.form.status.value">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="备注" :field="popup.axqSelfEmployedLaborerUpdate.attr.form.remark">
            <el-input type="textarea" :rows="5" v-model="popup.axqSelfEmployedLaborerUpdate.attr.form.remark.value">
            </el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmAxqSelfEmployedBindDistributor" title="绑定店主">
      <div class="popup-confirm_axq-self-employed-bind-distributor">
        <div class="popup-confirm_axq-self-employed-bind-distributor_bar">
          <div class="popup-confirm_axq-self-employed-bind-distributor_bar-left">
            <span>添加店主：</span>
            <options-selector :mode="4" placeholder="请输入店主/手机号" :config="{ req: options.fn.distributorQuery }"
              @change="options.fn.distributorChangeHandler"></options-selector>
            <el-button 
              type="primary"
              size="mini" 
              style="margin-left:10px;"
              @click="popup.axqSelfEmployedBindDistributor.fn.update(1)">添加</el-button>
          </div>
        </div>
        <list-page 
          ref="bindDistributorListPage" 
          :config="popup.axqSelfEmployedBindDistributor.attr.page.config"
          :form="popup.axqSelfEmployedBindDistributor.attr.page.form"
          :hiddenToolbar="true"
          @add="popup.axqSelfEmployedBindDistributor.fn.add">
        </list-page>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
  import formValidate from '@/components/form-validate';
  import formValidateField from '@/components/form-validate/field';
  import listPage from '@/components/list-page';
  import optionsSelector from '@/components/options-selector';
  import popupConfirm from '@/components/popup/type/confirm';
  import {
    formToolkit
  } from '@/model/form-toolkit';

  import {
    model
  } from '@/model';
  const {
    AxqSelfEmployedLaborer,
    Member
  } = model.collection;

  export default {
    components: {
      formValidate,
      formValidateField,
      listPage,
      optionsSelector,
      popupConfirm
    },
    data() {
      return {
        options: {
          attr: {
            memberId:0
          },
          fn: {
            statusChangeHandler: (e) => {
              this.page.form.query.status = e;
            },
            distributorQuery: (e, ok) => {
              Member.sendApi("page", {
                params: {},
                data: {
                  query: {
                    type: 7,
                    status: 1,
                    keyword: e
                  },
                },
              }).then((res) => {
                const {
                  data
                } = res;
                ok(data.map((i) => ({
                  value: i.id,
                  label: `${i.nickname}/${i.mobile}`
                })));
              });
            },
            distributorChangeHandler: (e) => {
              if (!e) {
                this.options.attr.memberId = 0;
                return;
              }
              this.options.attr.memberId = e;
            }
          }
        },
        page: {
          config: {
            entity: 'AxqSelfEmployedLaborer',
            action: 'selfEmployedLaborerPage',
            column: [{
                prop: 'id',
                label: 'ID'
              },
              {
                prop: 'name',
                label: '名称'
              },
              {
                prop: 'manager',
                label: '经营者'
              },
              {
                prop: 'managerMobile',
                label: '经营者电话'
              },
              {
                prop: 'bankOpenAddress',
                label: '开户行'
              },
              {
                prop: 'bankNumber',
                label: '卡号'
              },
              {
                prop: 'createTime',
                label: '创建时间'
              },
              {
                fixed: 'right',
                prop: 'action',
                label: '操作',
                width: 200,
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
                            this.$refs.popupConfirmAxqSelfEmployedLaborerUpdate.open({
                              triggerOpen: this.popup.axqSelfEmployedLaborerUpdate.fn.openHandler,
                              triggerClose: this.popup.axqSelfEmployedLaborerUpdate.fn.closeHandler,
                              params: props
                            });
                          }
                        }
                      },
                      '编辑');
                  },
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
                            this.$refs.popupConfirmAxqSelfEmployedBindDistributor.open({
                              triggerOpen: this.popup.axqSelfEmployedBindDistributor.fn.openHandler,
                              triggerClose: this.popup.axqSelfEmployedBindDistributor.fn.closeHandler,
                              params: props
                            });
                          }
                        }
                      },
                      '绑定店主');
                  },
                ]
              }
            ]
          },
          form: {
            query: {
              status: '',
              keyword: ''
            },
            order: {}
          },
          fn: {
            resetHandler: () => {
              this.$refs.statusOptionsSelector.reset();
            }
          }
        },
        popup: {
          axqSelfEmployedLaborerAdd: {
            attr: {
              form: AxqSelfEmployedLaborer.formUtil().generator('add', 'default')
            },
            fn: {
              sysBankChangeHandler: (e) => {
                this.popup.axqSelfEmployedLaborerAdd.attr.form.bankId.value = e;
              },
              closeHandler: (okCallback, errorCallback) => {
                const {
                  ok,
                  form
                } = formToolkit.validate(this.popup.axqSelfEmployedLaborerAdd.attr.form);
                if (ok) {
                  AxqSelfEmployedLaborer.sendApi('selfEmployedLaborerAdd', {
                    params: {},
                    data: form
                  }).then(
                    (res) => {
                      const {
                        status,
                        data
                      } = res;
                      if (status) {
                        okCallback();
                        this.$refs.listPage.query();
                        this.$message({
                          message: '个体户添加成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '个体户添加失败',
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
              },
              hiddenHandler:()=>{
                this.popup.axqSelfEmployedLaborerAdd.attr.form = AxqSelfEmployedLaborer.formUtil().generator('add', 'default');
              }
            }
          },
          axqSelfEmployedLaborerUpdate: {
            attr: {
              form: AxqSelfEmployedLaborer.formUtil().generator('update', 'default'),
              info: {}
            },
            fn: {
              sysBankChangeHandler: (e) => {
                this.popup.axqSelfEmployedLaborerUpdate.attr.form.bankId.value = e;
              },
              fill: (callback) => {
                callback(AxqSelfEmployedLaborer, this.popup.axqSelfEmployedLaborerUpdate.attr.info);
              },
              openHandler: (ok, params) => {
                AxqSelfEmployedLaborer.sendApi('selfEmployedLaborerInfo', {
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
                    this.popup.axqSelfEmployedLaborerUpdate.attr.info = data;
                    ok();
                  } else {
                    this.$message({
                      message: '获取个体工商户信息失败',
                      type: 'warning'
                    });
                  }
                });
              },
              closeHandler: (okCallback, errorCallback) => {
                const {
                  ok,
                  form
                } = formToolkit.validate(this.popup.axqSelfEmployedLaborerUpdate.attr.form);
                if (ok) {
                  AxqSelfEmployedLaborer.sendApi('selfEmployedLaborerUpdate', {
                    params: {
                      id: this.popup.axqSelfEmployedLaborerUpdate.attr.info.id
                    },
                    data: form
                  }).then(
                    (res) => {
                      const {
                        status,
                        data
                      } = res;
                      if (status) {
                        okCallback();
                        this.$refs.listPage.query();
                        this.$message({
                          message: '个体户添加成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '个体户添加失败',
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
              }
            }
          },
          axqSelfEmployedBindDistributor: {
            attr: {
              axqSelfEmployedLaborerId: 0,
              page: {
                config: {
                  entity: 'Member',
                  action: 'page',
                  column: [{
                      prop: 'nickname',
                      label: '代理姓名'
                    },
                    {
                      prop: 'mobile',
                      label: '代理电话'
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
                                type: 'danger',
                                size: 'mini'
                              },
                              nativeOn: {
                                click: () => {
                                  this.$confirm('是否把当前店主解绑?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                  }).then(() => {
                                    this.options.attr.memberId = props.row.id;
                                    this.popup.axqSelfEmployedBindDistributor.attr.axqSelfEmployedLaborerId = 0;
                                    this.popup.axqSelfEmployedBindDistributor.fn.update(2);
                                  }).catch(() => {});
                                }
                              }
                            },
                            '删除');
                        }
                      ]
                    }
                  ]
                },
                form: {
                  query: {
                    axqSelfEmployedLaborerId: 0,
                    type: 7
                  },
                  order: {}
                }
              }
            },
            fn: {
              openHandler: (ok, params) => {
                this.popup.axqSelfEmployedBindDistributor.attr.page.form.query.axqSelfEmployedLaborerId = params.row._raw.id;
                this.popup.axqSelfEmployedBindDistributor.attr.axqSelfEmployedLaborerId = params.row._raw.id;
                ok();
              },
              closeHandler: (okCallback) => {
                okCallback();
              },
              update: (type) => {
                Member.sendApi("updateSingleField", {
                  params: {
                    id:this.options.attr.memberId,
                    type:6
                  },
                  data: {
                    value: this.popup.axqSelfEmployedBindDistributor.attr.axqSelfEmployedLaborerId
                  },
                }).then((res) => {
                 if (res.status) {
                   this.$message({
                    message: type === 1 ? "绑定店主成功" : '解绑店主成功',
                    type: "success"
                   });
                   this.$refs.bindDistributorListPage.getPage();
                 } else {
                   this.$message({
                    message: type === 1 ? "绑定店主失败" : '解绑店主失败',
                    type: "error"
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
  .axq-self-employed-laborer-list {
    background: white;

    .popup-confirm {
      &_axq-self-employed-laborer-add {
        padding: 20px;
      }

      &_axq-self-employed-laborer-update {
        padding: 20px;
      }

      &_axq-self-employed-bind-distributor {
        padding: 20px;
        &_bar {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          &-left {
            display: flex;
            align-items: center;
          }
          &-right {
          }
        }
      }
    }
  }
</style>