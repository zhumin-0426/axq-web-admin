<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-07 19:33:43
 * @LastEditTime: 2022-03-17 08:44:05
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/trace/batch-list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="trace-list">
    <div class="l-type">
      <div
        class="t-item"
        :class="{ 't-item-active': type === item.id }"
        :key="key"
        v-for="(item, key) in typeList"
        @click="changeType(item)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="adaptor.fn.add"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <el-input
                size="small"
                placeholder="编号"
                v-model="page.form.query.keyword"
              ></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm
      ref="popupConfirmTraceCodeBatchAdd"
      title="添加溯源码批次"
      :config="{ width: 700, height: 400, loadingText: '生成时间可能过长，请耐心等待~' }"
    >
      <div class="popup-confirm_trace-code-batch-add">
        <form-validate
          ref="traceCodeBatchAdd"
          :form="popup.traceCodeBatchAdd.attr.form"
          :validator="entity.TraceCodeBatch.formUtil().validate"
        >
          <form-validate-field
            label="数量"
            :field="popup.traceCodeBatchAdd.attr.form.generateCount"
          >
            <el-input
              type="number"
              v-model="popup.traceCodeBatchAdd.attr.form.generateCount.value"
              :max="maxCodeGenSize"
            ></el-input>
            <span>最大生成数量：1/万</span>
          </form-validate-field>
          <form-validate-field
            label="宽"
            :field="popup.traceCodeBatchAdd.attr.form.width"
          >
            <el-input
              type="number"
              v-model="popup.traceCodeBatchAdd.attr.form.width.value"
            ></el-input>
          </form-validate-field>
          <form-validate-field
            label="高"
            :field="popup.traceCodeBatchAdd.attr.form.height"
          >
            <el-input
              type="number"
              v-model="popup.traceCodeBatchAdd.attr.form.height.value"
            ></el-input>
          </form-validate-field>
          <form-validate-field
            label="备注"
            :field="popup.traceCodeBatchAdd.attr.form.remark"
          >
            <el-input
              type="textarea"
              v-model="popup.traceCodeBatchAdd.attr.form.remark.value"
            ></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmTraceCaptchaBatchAdd"
      title="添加防伪码批次"
      :config="{ width: 700, height: 400, loadingText: '生成时间可能过长，请耐心等待~' }"
    >
      <div class="popup-confirm_trace-captcha-batch-add">
        <form-validate
          ref="traceCaptchaBatchAdd"
          :form="popup.traceCaptchaBatchAdd.attr.form"
          :validator="entity.TraceCaptchaBatch.formUtil().validate"
        >
          <form-validate-field
            label="数量"
            :field="popup.traceCaptchaBatchAdd.attr.form.generateCount"
          >
            <el-input
              type="number"
              v-model="popup.traceCaptchaBatchAdd.attr.form.generateCount.value"
              :max="maxCapchaGenSize"
            ></el-input>
            <span>最大生成数量：10/万</span>
          </form-validate-field>
          <form-validate-field
            label="备注"
            :field="popup.traceCaptchaBatchAdd.attr.form.remark"
          >
            <el-input
              type="textarea"
              v-model="popup.traceCaptchaBatchAdd.attr.form.remark.value"
            ></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from "@/components/form-validate";
import formValidateField from "@/components/form-validate/field";
import popupConfirm from "@/components/popup/type/confirm";
import listPage from "@/components/list-page";
import optionsSelector from "@/components/options-selector";
import switchSelector from "@/components/switch-selector";
import loading from "@/components/loading";
import { Request } from "@/model/request";
import downloader from "@/utils/downloader";
import { model } from "@/model";

const { TraceCodeBatch, TraceCaptchaBatch } = model.collection;
export default {
  components: {
    formValidate,
    formValidateField,
    popupConfirm,
    listPage,
    optionsSelector,
    switchSelector,
  },
  data() {
    return {
      maxCodeGenSize: 10000,
      maxCapchaGenSize: 100000,
      request: new Request(),
      type: Number(this.$route.query.type) || 1,
      fileType: 1,
      typeList: [
        {
          id: 1,
          name: "溯源码",
        },
        {
          id: 2,
          name: "防伪码",
        },
      ],
      entity: {
        TraceCodeBatch,
        TraceCaptchaBatch,
      },
      adaptor: {
        fn: {
          getReq: (params, data) => {
            if (this.type === 1) {
              return TraceCodeBatch.sendApi("codeBatchPage", { params, data });
            }
            if (this.type === 2) {
              return TraceCaptchaBatch.sendApi("captchaBatchPage", { params, data });
            }
          },
          add: () => {
            if (this.type === 1) {
              this.$refs.popupConfirmTraceCodeBatchAdd.open({
                triggerClose: this.popup.traceCodeBatchAdd.fn.closeHandler,
                triggerHidden: this.popup.traceCodeBatchAdd.fn.hiddenHandler,
              });
            }
            if (this.type === 2) {
              this.$refs.popupConfirmTraceCaptchaBatchAdd.open({
                triggerClose: this.popup.traceCaptchaBatchAdd.fn.closeHandler,
                triggerHidden: this.popup.traceCaptchaBatchAdd.fn.hiddenHandler,
              });
            }
          },
        },
      },
      options: {
        fn: {},
      },
      page: {
        config: {
          req: ({ params, data }) => {
            return this.adaptor.fn.getReq(params, data);
          },
          column: [
            {
              prop: "id",
              label: "ID",
            },
            {
              prop: "generateCount",
              label: "数量",
            },
            {
              prop: "",
              label: "宽",
              VNodes: [
                ({ h, props }) => {
                  return h("p", `${this.type === 1 ? props.row.width : "--"}`);
                },
              ],
            },
            {
              prop: "",
              label: "高",
              VNodes: [
                ({ h, props }) => {
                  return h("p", `${this.type === 1 ? props.row.width : "--"}`);
                },
              ],
            },
            {
              prop: "",
              label: "备注",
              VNodes: [
                ({ h, props }) => {
                  return h("p", `${this.type === 1 ? props.row.remark : "--"}`);
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
              width: "100",
              VNodes: [
                ({ h, props }) => {
                  return h(
                    "el-button",
                    {
                      props: { type: "primary", size: "mini" },
                      nativeOn: {
                        click: () => {
                          this.$msgbox({
                            title: "下载文件",
                            message: h("div", [
                              h(
                                "div",
                                {
                                  style: {
                                    paddingBottom: "10px",
                                  },
                                },
                                [h("p", null, `选择需要下载的文件类型`)]
                              ),
                              h(switchSelector, {
                                props: {
                                  config: {
                                    noConfirm: true,
                                    selectorList: [
                                      {
                                        value: 1,
                                        label: "txt+图片",
                                      },
                                      {
                                        value: 2,
                                        label: "txt",
                                      },
                                    ],
                                    value: 1,
                                  },
                                },
                                on: {
                                  change: ($event) => {
                                    this.fileType = $event.value;
                                  },
                                },
                              }),
                            ]),
                            showCancelButton: true,
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            beforeClose: (action, instance, done) => {
                              if (action === "confirm") {
                                const t2url = {
                                  1: "traceCodeDownloadUrl",
                                  2: "traceCaptchaTxt",
                                };
                                const ld = loading();
                                this.request
                                  .do("py", "file", t2url[this.type], {
                                    params: {
                                      batch_id: props.row.id,
                                      type: this.fileType,
                                    },
                                    data: {},
                                  })
                                  .then((res) => {
                                    const { success, data } = res;
                                    ld.close();
                                    if (success) {
                                      const { oss_url, txt_url } = data;
                                      if (oss_url) {
                                        downloader.do(oss_url);
                                      }
                                      if (txt_url) {
                                        downloader.do(txt_url);
                                      }
                                    } else {
                                      this.$message({
                                        message: "文件下载失败",
                                        type: "error",
                                      });
                                    }
                                  });
                                done();
                              } else {
                                done();
                              }
                            },
                          });
                        },
                      },
                    },
                    "下载"
                  );
                },
              ],
            },
          ],
          selectable: true,
        },
        form: {
          query: {
            keyword: "",
          },
          order: {},
        },
      },
      popup: {
        traceCodeBatchAdd: {
          attr: {
            form: TraceCodeBatch.formUtil().generator("add", "default"),
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
              if (
                this.popup.traceCodeBatchAdd.attr.form.generateCount.value >
                this.maxCodeGenSize
              ) {
                errorCallback();
                this.$message.warning(`生成数量不能大于： ${this.maxCodeGenSize}`);
                return;
              }
              this.$refs.traceCodeBatchAdd.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  TraceCodeBatch.sendApi("codeBatchAdd", { params: {}, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.listPage.query();
                        this.$message({
                          message: "溯源批次添加成功",
                          type: "success",
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: "溯源批次失败",
                          type: "warning",
                        });
                      }
                    }
                  );
                } else {
                  errorCallback();
                  this.$message({
                    message: "请确认信息",
                    type: "warning",
                  });
                }
              });
            },
            hiddenHandler: () => {
              this.popup.traceCodeBatchAdd.attr.form = TraceCodeBatch.formUtil().generator(
                "add",
                "default"
              );
            },
          },
        },
        traceCaptchaBatchAdd: {
          attr: {
            form: TraceCaptchaBatch.formUtil().generator("add", "default"),
          },
          fn: {
            closeHandler: (okCallback, errorCallback) => {
              if (
                this.popup.traceCaptchaBatchAdd.attr.form.generateCount.value >
                this.maxCapchaGenSize
              ) {
                errorCallback();
                this.$message.warning(`生成数量不能大于： ${this.maxCapchaGenSize}`);
                return;
              }
              this.$refs.traceCaptchaBatchAdd.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  TraceCaptchaBatch.sendApi("captchaBatchAdd", {
                    params: {},
                    data: form,
                  }).then((res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: "防伪批次添加成功",
                        type: "success",
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: "防伪批次失败",
                        type: "warning",
                      });
                    }
                  });
                } else {
                  errorCallback();
                  this.$message({
                    message: "请确认信息",
                    type: "warning",
                  });
                }
              });
            },
            hiddenHandler: () => {
              this.popup.traceCaptchaBatchAdd.attr.form = TraceCaptchaBatch.formUtil().generator(
                "add",
                "default"
              );
            },
          },
        },
      },
    };
  },
  methods: {
    changeType(item) {
      this.rep(`/trace-batch/list?type=${item.id}`);
      this.type = item.id;
      this.$refs.listPage.query();
    },
  },
};
</script>

<style lang="less">
.trace-list {
  .l-type {
    display: flex;
    padding: 0 10px;
    width: 100%;
    background: white;

    .t-item {
      display: flex;
      align-items: flex-end;
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

  .popup-confirm {
    &_trace-code-batch-add {
      padding: 20px;
    }

    &_trace-captcha-batch-add {
      padding: 20px;
    }
  }
}
</style>
