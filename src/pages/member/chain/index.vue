<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-20 23:24:44
 * @LastEditTime: 2022-06-05 08:33:30
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/member/chain/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="member-chain">
    <div class="c-toolbar">
      <div class="t-left">
        <div class="l-query">
          <div class="q-block">
            <div class="b-item">
              <el-radio-group v-model="mode">
                <el-radio :label="1">会员关系图</el-radio>
                <el-radio :label="2">业绩图</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item" v-if="mode === 1">
              <options-selector
                :mode="1"
                placeholder="会员类型"
                :config="{ options: entitys.Member._options.type }"
                @change="options.attr.query.type = $event"
              ></options-selector>
            </div>
            <div class="b-item">
              <options-selector
                :mode="4"
                placeholder="店主/ID"
                :config="{
                  req: options.fn.memberQuery,
                  value: options.attr.member.nickname,
                }"
                @change="options.fn.memberChangeHandler"
              ></options-selector>
            </div>
            <div class="b-item" v-if="mode === 2">
              <el-date-picker
                size="mini"
                v-model="options.attr.query.time"
                type="month"
                value-format="yyyy-MM"
                placeholder="请选择月份"
                @change="options.fn.timeQuery"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="l-btn">
          <el-button-group>
            <el-button size="small" type="danger" @click.native="reset">重置</el-button>
          </el-button-group>
        </div>
      </div>
      <div class="t-right"></div>
    </div>
    <div class="c-chart">
      <div class="c-tip">
        <div class="t-label">
          <span>会员类型：</span>
        </div>
        <div class="t-value">
          <div class="v-item" :key="key" v-for="(item, key) in tip.member">
            <span :style="{ background: item.color }"></span>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="c-box">
        <antv-node :data="node.data" :config="node.config"></antv-node>
      </div>
    </div>
  </div>
</template>

<script>
import { antvNode } from "@/libs/antv";
import optionsSelector from "@/components/options-selector";
import Member from "@/model/entity/member";

export default {
  components: {
    antvNode,
    optionsSelector,
  },
  data() {
    return {
      mode: 1,
      entitys: {
        Member,
      },
      tip: {
        member: [
          {
            name: "市场股东",
            color: "#6BFFD7",
          },
          {
            name: "店主",
            color: "#1890ff",
          },
          {
            name: "至尊会员",
            color: "#F46649",
          },
        ],
        distributor: [],
      },
      renderedIds: [],
      node: {
        config: {
          register: [
            {
              name: "member-card",
              cfg: (G6, chart) => {
                const _this = this;
                chart.on("node:click", function (evt) {
                  const item = evt.item;
                  const model = item.getModel();
                  if (model.children.length) {
                    return;
                  }
                  _this.loadMemberChain(model._raw).then((res) => {
                    const { children } = res;
                    model.children = children;
                    chart.refreshLayout();
                  });
                });
                return {
                  draw: function drawShape(cfg, group) {
                    const r = 0;
                    const color = cfg.color;
                    const w = cfg.size[0];
                    const h = cfg.size[1];
                    const shape = group.addShape("rect", {
                      attrs: {
                        x: -w / 2,
                        y: -h / 2,
                        width: w,
                        height: h,
                        stroke: color,
                        radius: r,
                        fill: "#fff",
                      },
                      name: "main-box",
                      draggable: true,
                    });

                    group.addShape("rect", {
                      attrs: {
                        x: -w / 2,
                        y: -h / 2,
                        width: w,
                        height: h / 2,
                        fill: color,
                        radius: [r, r, 0, 0],
                      },
                      name: "title-box",
                      draggable: true,
                    });

                    group.addShape("text", {
                      attrs: {
                        textBaseline: "top",
                        textAlign: "center",
                        y: -h / 2 + 8,
                        lineHeight: 20,
                        text: `${$_.get(cfg, "name", "/")}`,
                        fill: "#fff",
                      },
                      name: "title",
                    });
                    cfg.children &&
                      group.addShape("marker", {
                        attrs: {
                          x: w / 2,
                          y: 0,
                          r: 6,
                          cursor: "pointer",
                          symbol: G6.Marker.collapse,
                          stroke: "#666",
                          lineWidth: 1,
                          fill: "#fff",
                        },
                        name: "collapse-icon",
                      });
                    group.addShape("text", {
                      attrs: {
                        textBaseline: "top",
                        x: -w / 2 + 10,
                        y: -h / 2 + 30,
                        lineHeight: 10,
                        text: `${$_.get(cfg, "content", "/")}`,
                        fill: "rgba(0,0,0, 1)",
                        fontSize: 8,
                      },
                      name: "mobile",
                    });
                    return shape;
                  },
                  setState(name, value, item) {
                    if (name === "collapsed") {
                      const marker = item
                        .get("group")
                        .find((ele) => ele.get("name") === "collapse-icon");
                      const icon = value ? G6.Marker.expand : G6.Marker.collapse;
                      marker.attr("symbol", icon);
                    }
                  },
                };
              },
            },
          ],
          chart: {
            modes: {
              default: [
                {
                  type: "collapse-expand",
                  onChange: function onChange(item, collapsed) {
                    const data = item.getModel();
                    data.collapsed = collapsed;
                    return true;
                  },
                },
                "drag-canvas",
                "zoom-canvas",
              ],
            },
            defaultNode: {
              type: "member-card",
              size: [100, 50],
            },
            defaultEdge: {
              type: "cubic-vertical",
            },
            layout: {
              type: "compactBox",
              direction: "TB",
              getId: function getId(d) {
                return d.id;
              },
              getHeight: function getHeight() {
                return 16;
              },
              getWidth: function getWidth() {
                return 16;
              },
              getVGap: function getVGap() {
                return 100;
              },
              getHGap: function getHGap() {
                return 100;
              },
            },
          },
        },
        data: {
          id: "加载中",
          mobile: "加载中",
        },
      },
      options: {
        attr: {
          query: {
            type: "",
            time: "",
          },
          member: {
            id: 1,
            type: 7,
            nickname: "傲雪棋",
            mobile: "16607574271",
          },
        },
        fn: {
          memberQuery: (e, ok) => {
            let time = this.options.attr.query.time;
            let q = { keyword: e };
            if (this.mode === 2) {
              q = Object.assign(q, {
                type: 7,
                isQueryAchieve: 1,
                year: time ? this.getYear(time) : this.getYear(),
                month: time ? this.getMonth(time) : this.getMonth(),
              });
            }
            Member.sendApi("page", { params: {}, data: { query: q } }).then((res) => {
              const { data } = res;
              ok(
                data.map((i) => ({
                  value: i.id,
                  label: `${i.nickname}/${i.id}`,
                  _raw: i,
                }))
              );
            });
          },
          memberChangeHandler: (e, _raw) => {
            this.options.attr.member = _raw;
          },
        },
      },
    };
  },
  watch: {
    mode: function () {
      this.reRender();
    },
    "options.attr": {
      handler: function () {
        this.reRender();
      },
      deep: true,
    },
  },
  methods: {
    _member2cardCfg(m, type = 1) {
      let time = this.options.attr.query.time;
      if (type === 1) {
        const t2index = {
          7: 1,
          8: 2,
          9: 0,
        };
        return this.mode === 1
          ? {
              _raw: m,
              id: m.id + "",
              name: m.nickname,
              content: `ID：${m.id}`,
              color: this.tip.member[t2index[m.type]].color,
              children: [],
            }
          : {
              _raw: m,
              id: m.id + "",
              name: m.nickname + m.id,
              content: `${time ? this.getMonth(time) : this.getMonth()}月业绩：${
                m.integral || 0
              }`,
              color: "#1890ff",
              children: [],
            };
      }
    },
    reset() {
      this.$confirm("清空当前检索信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.options.attr.member = {
            id: 1,
            type: 7,
            nickname: "傲雪棋",
            mobile: "16607574271",
          };
          this.reRender();
        })
        .catch(() => {});
    },
    reRender() {
      this.renderedIds = [];
      if (this.options.attr.member) {
        this.node.data = this._member2cardCfg(this.options.attr.member);
        this.renderedIds = [this.options.attr.member.id];
      }
      this.loadMemberChain(this.options.attr.member).then((res) => {
        const { parent, children } = res;
        this.node.data = parent;
        this.node.data.children = children;
      });
    },
    loadMemberChain(m) {
      let time = this.options.attr.query.time;
      return new Promise((resolve, reject) => {
        let q = { pId: m.id, type: this.options.attr.query.type };
        if (this.mode === 2) {
          q = {
            type: 7,
            isQueryAchieve: 1,
            distributorPId: m.id,
            year: time ? this.getYear(time) : this.getYear(),
            month: time ? this.getMonth(time) : this.getMonth(),
          };
        }
        Member.sendApi("page", { params: { pageSize: 1000 }, data: { query: q } }).then(
          (res) => {
            const { status, data } = res;
            if (status) {
              let uniData = [];
              uniData = data.filter((i) => {
                return !this.renderedIds.includes(i.id);
              });
              uniData.forEach((i) => {
                this.renderedIds.push(i.id);
              });
              if (!uniData.length) {
                this.$message({
                  message: `该会员下面暂无${this.mode === 1 ? "会员" : "代理"}~`,
                  type: "warning",
                });
                return;
              }
              if (this.mode === 2 && m.id !== 1) {
                Member.sendApi("page", {
                  params: {},
                  data: {
                    query: {
                      keyword: m.id,
                      type: 7,
                      isQueryAchieve: 1,
                      year: time ? this.getYear(time) : this.getYear(),
                      month: time ? this.getMonth(time) : this.getMonth(),
                    },
                  },
                }).then((res) => {
                  const { data } = res;
                  resolve({
                    parent: this._member2cardCfg(data[0]),
                    children: uniData.map((i) => this._member2cardCfg(i)),
                  });
                });
                return;
              }
              resolve({
                parent: this._member2cardCfg(m),
                children: uniData.map((i) => this._member2cardCfg(i)),
              });
            } else {
              this.$message({
                message: "会员关系查询失败",
                type: "warning",
              });
            }
          }
        );
      });
    },
  },
  created() {
    this.reRender();
  },
};
</script>

<style lang="less">
.member-chain {
  padding: 20px;
  background: white;
  .c-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    border-bottom: 1px solid #ebeef5;
    .t-left {
      display: flex;
      align-items: center;
      .l-query {
        display: flex;
        .q-block {
          display: flex;
          align-items: center;
          .b-item {
            &:not(:first-child) {
              margin-left: 10px;
            }
          }
          &:not(:first-child) {
            padding-left: 10px;
            margin-left: 10px;
            border-left: 1px solid #ebeef5;
          }
        }
      }
      .l-btn {
        margin-left: 20px;
      }
    }
  }
  .c-chart {
    position: relative;
    .c-tip {
      position: absolute;
      top: 20px;
      left: 20px;
      display: flex;
      z-index: 10;
      .t-value {
        display: flex;

        .v-item {
          display: flex;
          align-items: center;
          span {
            &:first-child {
              width: 10px;
              height: 10px;
            }
            &:last-child {
              margin-left: 10px;
            }
          }
          &:not(:first-child) {
            margin-left: 10px;
          }
        }
      }
    }
    .c-box {
      height: 600px;
    }
  }
}
</style>
