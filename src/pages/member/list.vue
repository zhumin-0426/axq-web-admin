<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-06-22 11:12:33
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/member/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page member-list">
    <div class="l-content">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        :load-excel-config="page.excel.fn.loadConfig"
        :excel-filter="
          (json) => {
            return json.filter((x) =>
              x.value === 3
                ? $_.get(this.axqStaffInfo, 'accessExtraJson.allowedExportASEL')
                : true
            );
          }
        "
        :hidden-action="['add']"
        @form-reset="page.fn.resetHandler"
      >
        <template slot="query">
          <div class="q-block">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>会员列表</el-breadcrumb-item>
              <el-breadcrumb-item :key="key" v-for="(item, key) in level">{{
                item.nickname
              }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="q-block">
            <div class="b-item">
              <options-selector
                :mode="1"
                placeholder="状态"
                :config="{ entity: 'Member', type: 'status' }"
                @change="options.fn.statusChangeHandler"
              ></options-selector>
            </div>
            <div class="b-item">
              <options-selector
                :mode="1"
                placeholder="会员类型"
                :config="{ entity: 'Member', type: 'type', value: 7 }"
                @change="options.fn.typeChangeHandler"
              ></options-selector>
            </div>
            <template v-if="page.form.query.type === 7">
              <div class="b-item">
                <time-picker
                  type="month"
                  @change="
                    page.form.query.year = getYear($event);
                    page.form.query.month = getMonth($event);
                  "
                ></time-picker>
              </div>
              <div class="b-item-input">
                <span> 业绩范围值 </span>
                <el-input
                  type="number"
                  size="small"
                  placeholder="0"
                  v-model.number="page.form.query.minAchieveIntegral"
                ></el-input>
                &nbsp;-&nbsp;
                <el-input
                  type="number"
                  size="small"
                  placeholder="0"
                  v-model.number="page.form.query.maxAchieveIntegral"
                ></el-input>
              </div>
              <div class="b-item">
                <list-sort
                  ref="listSort"
                  :sort-list="options.fn.loadSortConfig"
                  :order="page.form.order"
                ></list-sort>
              </div>
            </template>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="会员/ID/手机号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
        <template slot="excel-config_1">
          <div class="e-item">
            <div class="i-label">
              <span>类型</span>
            </div>
            <div class="i-value">
              <el-radio-group v-model="page.excel.attr.config.params.type">
                <el-radio :label="1">仅代理</el-radio>
                <el-radio :label="2">代理或存在业绩</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="e-item">
            <div class="i-label">
              <span>日期</span>
            </div>
            <div class="i-value">
              <el-date-picker
                v-model="page.excel.attr.time"
                type="month"
                placeholder="选择业绩月"
                @change="page.excel.fn.timeChangeHandler"
              ></el-date-picker>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmInviteCode" title="会员邀请码">
      <div class="popup-confirm_invite-code">
        <axq-invite-code-wx-entry
          :member-id="popup.inviteCode.attr.memberId"
          :url="popup.inviteCode.attr.inviteCodeWxEntry"
        ></axq-invite-code-wx-entry>
        <p>会员邀请码： {{ popup.inviteCode.attr.inviteCode }}</p>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import listPage from "@/components/list-page";
import optionsSelector from "@/components/options-selector";
import popupConfirm from "@/components/popup/type/confirm";
import switchSelector from "@/components/switch-selector";
import axqInviteCodeWxEntry from "@/components/axq/invite-code-wx-entry";
import timePicker from "@/components/time-picker";
import listSort from "@/components/list-sort";
import { model } from "@/model";

const { Member } = model.collection;
export default {
  components: {
    listPage,
    optionsSelector,
    switchSelector,
    popupConfirm,
    axqInviteCodeWxEntry,
    timePicker,
    listSort,
  },
  data() {
    return {
      level: [],
      entitys: {
        Member,
      },
      options: {
        fn: {
          statusChangeHandler: (e) => {
            this.page.form.query.status = e;
          },
          typeChangeHandler: (e) => {
            this.page.form.query.isQueryAchieve = 0;
            if (e === 7) {
              this.page.form.query.isQueryAchieve = 1;
            }
            this.page.form.query.type = e;
          },
          loadSortConfig: () => {
            const s = [
              {
                label: "业绩",
                value: "achieve",
                order: "desc",
              },
            ];
            return s;
          },
        },
      },
      page: {
        config: {
          entity: "Member",
          action: "page",
          column: [
            {
              fixed: true,
              prop: "id",
              label: "ID",
              width: "100",
            },
            {
              prop: "nickname",
              label: "姓名/ID",
              VNodes:[
                ({h,props}) => {
                  const content = `${props.row.nickname}/${props.row.id}`
                  return h('p',content)
                }
              ]
            },
            {
              prop: "",
              label: "性别",
              VNodes: [
                ({ h, props }) => {
                  return h("p", {}, "男");
                },
              ],
            },
            {
              prop: "",
              label: "会员类型",
              VNodes: [
                ({ h, props }) => {
                  return h(
                    "p",
                    {},
                    this.entitys.Member.filter("type", props.row._raw.type)
                  );
                },
              ],
            },
            {
              prop: "",
              label: "上级推荐人/ID",
              VNodes: [
                ({ h, props }) => {
                  return h(
                    "p",
                    {},
                    `${this.blankGet(
                      $_.get(props.row._raw, "parentNickname")
                    )}/${this.blankGet($_.get(props.row._raw, "pId"))}`
                  );
                },
              ],
            },
            {
              prop: "",
              label: "上级店主",
              VNodes: [
                ({ h, props }) => {
                  return h(
                    "p",
                    {},
                    `${this.blankGet(
                      $_.get(props.row._raw, "distributorNickname")
                    )}/${this.blankGet($_.get(props.row._raw, "distributorPId"))}`
                  );
                },
              ],
            },
            {
              prop: "",
              label: "下级人数",
              VNodes: [
                ({ h, props }) => {
                  return h("p", {}, props.row._raw.submemberCount);
                },
              ],
            },
            {
              columns: () => {
                if (this.page.form.query.type === 7) {
                  return [
                    {
                      prop: "",
                      label: "业绩时间",
                      VNodes: [
                        ({ h, props }) => {
                          return h(
                            "p",
                            `${this.blankGet(props.row._raw.achieveYear)}-${this.blankGet(
                              props.row._raw.achieveMonth
                            )}`
                          );
                        },
                      ],
                    },
                    {
                      prop: "",
                      label: "业绩",
                      VNodes: [
                        ({ h, props }) => {
                          return h("p", `${$_.get(props.row, "_raw.integral", 0)}`);
                        },
                      ],
                    },
                  ];
                }
              },
            },
            {
              prop: "status",
              label: "状态",
              VNodes: [
                ({ h, props }) => {
                  return h(switchSelector, {
                    props: {
                      mode: 2,
                      tip: "更改会员状态，是否继续？",
                      config: { value: props.row._raw.status === 1 },
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
              prop: "createTime",
              label: "创建时间",
            },
            {
              fixed: "right",
              prop: "action",
              label: "操作",
              width: "250",
              VNodes: [
                ({ h, props }) => {
                  return h(
                    "el-button",
                    {
                      props: { type: "primary", size: "mini" },
                      nativeOn: {
                        click: () => {
                          this.level.push(props.row);
                          this.page.form.query.keyword = "";
                          this.page.form.query.pId = props.row.id;
                        },
                      },
                    },
                    "下级会员"
                  );
                },
                ({ h, props }) => {
                  return h(
                    "el-button",
                    {
                      props: { type: "primary", size: "mini" },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmInviteCode.open({
                            triggerOpen: this.popup.inviteCode.fn.openHandler,
                            params: props,
                          });
                        },
                      },
                    },
                    "邀请码"
                  );
                },
                ({ h, props }) => {
                  return h(
                    "el-button",
                    {
                      props: { type: "primary", size: "mini" },
                      nativeOn: {
                        click: () => {
                          this.go(`/member/${props.row.id}`);
                        },
                      },
                    },
                    "查看"
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
            isQueryAchieve: 1,
            year: this.getYear(),
            month: this.getMonth(),
            pId: "",
            type: 7,
            status: "",
            keyword: "",
            minAchieveIntegral: 0,
            maxAchieveIntegral: null,
          },
          order: {
            achieve: "desc",
          },
        },
        excel: {
          attr: {
            time: this.$dayjs(),
            config: {
              params: {
                year: this.$dayjs().year(),
                month: this.$dayjs().month() + 1,
                type: 1,
              },
              data: {},
            },
          },
          fn: {
            loadConfig: () => {
              return this.page.excel.attr.config;
            },
            timeChangeHandler: (e) => {
              this.page.excel.attr.config.params.year = this.$dayjs(e).year();
              this.page.excel.attr.config.params.month = this.$dayjs(e).month() + 1;
            },
          },
        },
        fn: {
          resetHandler: () => {
            this.level = [];
          },
        },
      },
      popup: {
        inviteCode: {
          attr: {
            memberId: "",
            inviteCode: "",
            inviteCodeWxEntry: "",
          },
          fn: {
            openHandler: (ok, props) => {
              const { id, inviteCode, inviteCodeWxEntry } = props.row._raw;
              this.popup.inviteCode.attr.memberId = id;
              this.popup.inviteCode.attr.inviteCode = inviteCode;
              this.popup.inviteCode.attr.inviteCodeWxEntry = inviteCodeWxEntry;
              ok();
            },
          },
        },
      },
      switchSelector: {
        fn: {
          updateStatus: (row, e) => {
            const { id } = row._raw;
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: { id, type: 10 },
              data: { value: value ? 1 : 2, remark: "" },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "更新会员状态成功",
                  type: "success",
                });
                this.$refs.listPage.query();
              } else {
                error();
                this.$message({
                  message: "更新会员状态失败",
                  type: "error",
                });
              }
            });
          },
        },
      },
    };
  },
  created(){
    this.page.config.allowExportExcel = !!this.$_.get(this.axqStaffInfo, 'accessExtraJson.isEnableExcel');
  }
};
</script>

<style lang="less">
.member-list {
  .l-content {
    .q-block {
      .b-item-input {
        display: flex;
        align-items: center;

        > span {
          margin: 10px;
          white-space: nowrap;
        }

        input {
          width: 100px;
          text-align: center;
        }
      }
    }
  }

  .popup-confirm {
    &_invite-code {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 400px;
        height: 400px;
      }

      p {
        padding-top: 20px;
      }
    }
  }
}
</style>
