<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-06-18 18:01:45
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/shop/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page shop-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page ref="listPage" :config="page.config" :form="page.form" :hidden-action="['add']"
        @form-reset="page.fn.resetHandler">
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <options-selector :mode="3" :config="{ key: 'sysRegion', checkStrictly: true }"
                @change="options.fn.regionChangeHandler"></options-selector>
            </div>
            <div class="b-item">
              <options-selector :mode="1" placeholder="店铺状态" ref="shopStatusOptionsSelector"
                :config="{ entity: 'Shop', type: 'status' }" @change="options.fn.statusChangeHandler">
              </options-selector>
            </div>
            <div class="b-item">
              <options-selector :mode="1" placeholder="审核状态" ref="approvalStatusOptionsSelector"
                :config="{ entity: 'Shop', type: 'approvalWorkflow' }" @change="options.fn.workflowIdChangeHandler">
              </options-selector>
            </div>
            <div class="b-item" style="width: 150px">
              <options-selector :mode="4" placeholder="店主/ID" ref="memberOptionsSelector"
                :config="{ req: options.fn.memberQuery }" @change="options.fn.memberChangeHandler"></options-selector>
            </div>
            <div class="b-item">
              <el-input size="small" placeholder="店铺/编码" v-model="page.form.query.keyword"></el-input>
            </div>
            <div class="b-item" style="width: 300px">
              <div class="b-item-time">
                <span>线上合同签署：</span>
                <time-picker style="width: 200px" ref="onlineTimePicker" @change="options.fn.onlineTimeChangeHandler">
                </time-picker>
              </div>
              <div class="b-item-time">
                <span>线下合同签署：</span>
                <time-picker style="width: 200px" ref="offlineTimePicker" @change="options.fn.offlineTimeChangeHandler">
                </time-picker>
              </div>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmShopChange" title="店铺关闭" :config="{ width: 800, height: 500 }">
      <div class="popup-confirm_shop-change">
        <form-validate-field label="会员归属店铺：" 
          v-if="popup.approvalSubShopChange.attr.shopList.length > 1"
          :field="popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.receiveShopId">
          <options-selector :mode="4" :config="{ req: popup.approvalSubShopChange.fn.transferShopMemberQuery }"
            @change="popup.approvalSubShopChange.fn.transferShopMemberChangeHandler"></options-selector>
        </form-validate-field>
        <form-validate-field label="备注：">
          <el-input type="textarea"
            v-model="popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.remark.value">
          </el-input>
        </form-validate-field>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
  import listPage from "@/components/list-page";
  import listSort from "@/components/list-sort";
  import optionsSelector from "@/components/options-selector";
  import switchSelector from "@/components/switch-selector";
  import popupConfirm from '@/components/popup/type/confirm';
  import formValidate from '@/components/form-validate';
  import formValidateField from '@/components/form-validate/field';
  import timePicker from '@/components/time-picker';

  import {
    model
  } from "@/model";

  import {
    formToolkit
  } from '@/model/form-toolkit';

  const {
    Shop,
    Member,
    Approval,
    ApprovalSubShopChange
  } = model.collection;
  export default {
    components: {
      listPage,
      listSort,
      optionsSelector,
      switchSelector,
      popupConfirm,
      formValidate,
      formValidateField,
      timePicker
    },
    data() {
      return {
        entitys: {
          Shop,
          ApprovalSubShopChange
        },
        options: {
          fn: {
            regionChangeHandler: (e) => {
              const [provinceId, cityId, districtId] = e.map((i) => i.id);
              this.page.form.query.provinceId = provinceId;
              this.page.form.query.cityId = cityId;
              this.page.form.query.districtId = districtId;
            },
            statusChangeHandler: (e) => {
              this.page.form.query.status = e;
            },
            workflowIdChangeHandler: (e) => {
              this.page.form.query.workflowId = e;
            },
            typeChangeHandler: (e) => {
              this.page.form.query.type = e;
            },
            memberQuery: (e, ok) => {
              Member.sendApi("page", {
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
                    label: `${i.nickname}/${i.id}`,
                  }))
                );
              });
            },
            memberChangeHandler: (e) => {
              this.page.form.query.memberId = e;
            },
            onlineTimeChangeHandler: (e) => {
              const [startTime='', endTime=''] = e;
              this.page.form.query.onlineStartTime = e.length ? this.$dayjs(startTime).format('YYYY-MM-DD HH:mm') : '';
              this.page.form.query.onlineEndTime = e.length ? this.$dayjs(endTime).add(1,'d').format('YYYY-MM-DD HH:mm') : '';
            },
            offlineTimeChangeHandler: (e) => {
              const [startTime='', endTime=''] = e;
              this.page.form.query.offlineStartTime = e.length ? this.$dayjs(startTime).format('YYYY-MM-DD HH:mm'):'';
              this.page.form.query.offlineEndTime = e.length ? this.$dayjs(endTime).add(1,'d').format('YYYY-MM-DD HH:mm'): '';
            }
          },
        },
        page: {
          config: {
            entity: "Shop",
            action: "page",
            column: [{
                prop: "id",
                label: "ID",
              },
              {
                prop: "sn",
                label: "编号",
              },
              {
                prop: "name",
                label: "名称",
              },
              {
                prop: "",
                label: "店主/ID",
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    const content = `${props.row._raw.holderName}/${props.row._raw.holderId}`
                    return h(
                      "p", content);
                  },
                ],
              },
              {
                prop: "",
                label: "地址",
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h(
                      "p", {},
                      this.blankGet(this.$_.get(props.row._raw, "fullAddress"))
                    );
                  },
                ],
              },
              {
                prop: "",
                label: "线上合同签署时间",
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h(
                      "p", {},
                      `${this.$_.get(props.row,'_raw.onlineSignTime') ? this.$dayjs(this.$_.get(props.row,'_raw.onlineSignTime')).format('YYYY-MM-DD') :''}`
                    );
                  },
                ],
              },
              {
                prop: "",
                label: "线下合同签署时间",
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h(
                      "p", {},
                      `${this.$_.get(props.row,'_raw.offlineSignTime') ? this.$dayjs(this.$_.get(props.row,'_raw.offlineSignTime')).format('YYYY-MM-DD') :''}`
                    );
                  },
                ],
              },
              {
                prop: "status",
                label: "状态",
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h(switchSelector, {
                      props: {
                        mode: 2,
                        tip: "更改店铺状态，是否继续？",
                        config: {
                          value: props.row._raw.status === 1 ? true : false,
                        },
                      },
                      on: {
                        change: (e) => {
                          this.switchSelector.fn.updateStatus(props.row, e);
                        },
                      },
                    });
                  },
                ],
              },
              {
                prop: "",
                label: "备注",
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h("p", {}, this.blankGet(props.row._raw, "remark"));
                  },
                ],
              },
              {
                prop: "createTime",
                label: "创建时间",
              },
              {
                fixed: "right",
                prop: "action",
                label: "操作",
                width: 160,
                VNodes: [
                  ({
                    h,
                    props
                  }) => {
                    return h(
                      "el-button", {
                        props: {
                          type: "primary",
                          size: "mini",
                        },
                        nativeOn: {
                          click: () => {
                            this.go(`/shop/${props.row.id}`);
                          },
                        },
                      },
                      "查看"
                    );
                  },
                  ({
                    h,
                    props
                  }) => {
                    return h(
                      "el-button", {
                        props: {
                          type: "danger",
                          size: "mini",
                          disabled: props.row._raw.approvalStatus && props.row._raw.approvalStatus === 1,
                        },
                        nativeOn: {
                          click: () => {
                            this.$refs.popupConfirmShopChange.open({
                              triggerOpen: this.popup.approvalSubShopChange.fn.openHandler,
                              triggerClose: this.popup.approvalSubShopChange.fn.closeHandler,
                              params: props.row
                            })
                          },
                        }
                      },
                      "关闭"
                    );
                  },
                ],
              },
            ],
            selectable: true,
            allowExportExcel: true
          },
          form: {
            query: {
              provinceId: "",
              cityId: "",
              districtId: "",
              status: "",
              workflowId: "",
              memberId: "",
              type: "",
              keyword: "",
              onlineStartTime: '',
              onlineEndTime: '',
              offlineStartTime: '',
              offlineEndTime: ''
            },
            order: {},
          },
          fn: {
            resetHandler: () => {
              this.$refs.shopStatusOptionsSelector.reset();
              this.$refs.approvalStatusOptionsSelector.reset();
              this.$refs.memberOptionsSelector.reset();
              this.$refs.shopTypeOptionsSelector.reset();
              this.page.form.query.keyword = "";
            }
          },
        },
        popup: {
          approvalSubShopChange: {
            attr: {
              row: {},
              shopList: [],
              form: (() => {
                const f1 = Approval.formUtil().generator('add', 'approvalSubShopChange');
                const f2 = ApprovalSubShopChange.formUtil().generator('add', 'default');
                f1.approvalSubShopChange.value = f2;
                return f1;
              })()
            },
            fn: {
              transferShopMemberQuery: (e, ok) => {
                Shop.sendApi("page", {
                  params: {},
                  data: {
                    query: {
                      memberId: this.popup.approvalSubShopChange.attr.row.holderId,
                      keyword: e
                    },
                  },
                }).then((res) => {
                  const {
                    data
                  } = res;
                  ok(
                    data.map((i) => ({
                      value: i.id,
                      label: i.name,
                    })).filter(v => v.value !== this.popup.approvalSubShopChange.attr.row.id)
                  );
                });
              },
              transferShopMemberChangeHandler: (e) => {
                this.popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.receiveShopId.value = e;
              },
              openHandler: (ok, params) => {
                this.popup.approvalSubShopChange.attr.row = params._raw;
                this.popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.receiveShopId.value = 0;
                this.popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.type.value = 2;
                this.popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.shopId.value = Number(params.id);
                this.popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.transferId.value = params._raw.holderId;
                this.popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.shopDepositId.value = this.$_.get(params, '_raw.depositId');
                Shop.sendApi("page", {
                  params: {},
                  data: {
                    query: {
                      memberId: params._raw.holderId
                    },
                  },
                }).then((res) => {
                  const {
                    data
                  } = res;
                  this.popup.approvalSubShopChange.attr.shopList = data;
                });
                ok();
              },
              closeHandler: (okCallback, errorCallback) => {
                const {
                  ok,
                  form
                } = formToolkit.validate(this.popup.approvalSubShopChange.attr.form);
                if (this.popup.approvalSubShopChange.attr.shopList.length > 1  &&
                  !form.approvalSubShopChange.receiveShopId) {
                  errorCallback();
                  this.$message.warning('请选择会员归属店铺');
                  return;
                }
                Approval.sendApi('add', {
                  params: {},
                  data: form
                }).then(res => {
                  const {
                    status
                  } = res;
                  if (status) {
                    okCallback();
                    this.$message({
                      message: '店铺关闭提交审核成功',
                      type: 'success'
                    });
                    this._boot();
                  } else {
                    errorCallback();
                    this.$message({
                      message: '店铺关闭提交审核失败',
                      type: 'error'
                    });
                  }
                });

              }
            }
          }
        },
        switchSelector: {
          fn: {
            updateStatus: (row, e) => {
              const {
                id
              } = row._raw;
              const {
                value,
                ok,
                error
              } = e;
              Shop.sendApi("updateSingleField", {
                params: {
                  id,
                  type: 4,
                },
                data: {
                  value: value ? 1 : 2,
                  remark: "",
                },
              }).then((res) => {
                const {
                  status,
                  data
                } = res;
                if (status) {
                  ok();
                  this.$message({
                    message: "更新店铺状态成功",
                    type: "success",
                  });
                  this.$refs.listPage.query();
                } else {
                  error();
                  this.$message({
                    message: "更新店铺状态失败",
                    type: "error",
                  });
                }
              });
            },
          },
        }
      };
    },
    created(){
      this.page.config.allowExportExcel = !!this.$_.get(this.axqStaffInfo, 'accessExtraJson.isEnableExcel');
    }
  };
</script>

<style lang="less">
  .shop-list {
    background: white;

    .b-item-time {
      display: flex;
      align-items: center;

      &:nth-child(2) {
        margin-top: 5px;
      }
    }

    .popup-confirm_shop-change {
      padding: 30px;
    }
  }
</style>