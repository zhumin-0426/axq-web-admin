<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:28
 * @LastEditTime: 2021-10-23 14:20:36
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/App.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div id="app">
    <div class="a-notity" v-if="ws.update.isWillUpdate">
      <i class="iconfont icon-tongzhi"></i>
      <h3>{{`ERP将于${ws.update.info.updateStartTime}- ${ws.update.info.updateEndTime}进行系统升级，届时系统将无法使用，请合理安排工作内容，给同事们带来的工作不便，敬请谅解！`}}</h3>
      <el-dialog class="n-dialog-update" :visible="isShowDialogUpdate" width="40%">
        <div class="u-bg">
          <img src="/image/update_bg.png" alt />
        </div>
        <div class="u-version">
          <div class="v-title">
            <h2>更新通知</h2>
            <img src="/image/update_arrow.png" alt />
          </div>
          <div class="v-t">
            <span>V{{ws.update.info.version}}更新内容：</span>
          </div>
        </div>
        <div class="u-text">
          <div class="t-item" v-if="ws.update.info.contentNew">
            <div class="i-title">
              <span>更新内容：</span>
            </div>
            <div class="i-main" v-html="ws.update.info.contentNew"></div>
          </div>
          <div class="t-item" v-if="ws.update.info.contentFixed">
            <div class="i-title">
              <span>修复内容：</span>
            </div>
            <div class="i-main" v-html="ws.update.info.contentFixed"></div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="reloadPage">刷新页面</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="a-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  data () {
    return {
      timerUpdate: null,
      isShowDialogUpdate: false,
    }
  },
  computed: {
    ...mapState('sys', ['ws'])
  },
  watch: {
    'ws.update.isWillUpdate': function (e) {
      if (!e) {
        this.timerUpdate && clearInterval(this.timerUpdate);
        this.isShowDialogUpdate = false;
        return;
      } else {
        this.keepDialogUpdate();
        this.getUpdateVersion();
      }
    }
  },
  created () {
    this.appInit();
  },
  methods: {
    ...mapActions(['appInit']),
    ...mapActions('sys', ['getUpdateVersion']),
    keepDialogUpdate () {
      this.timerUpdate = setInterval(() => {
        if (this.$dayjs().diff(this.$dayjs(this.ws.update.info.updateStartTime)) > 0) {
          this.isShowDialogUpdate = true;
        }
      }, 3000);
    }
  }
};
</script>

<style lang="less">
#app {
  position: absolute;
  top: 0px;
  bottom: 0;
  width: 100%;
  min-width: 1200px;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  line-height: 1.5;
  font-size: 14px;
  background: #f7f7f7;
  color: #515a6e;
  .a-notity {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background: #f56c6c;
    i {
      font-size: 30px;
      color: white;
    }
    h3 {
      padding: 0 20px;
      color: white;
    }
    a {
      font-size: 18px;
      color: white;
    }
    .n-dialog-update {
      .el-dialog__header {
        display: none;
      }
      .el-dialog__body {
        padding: 0;
        .u-bg {
          width: 100%;
          img {
            width: 100%;
          }
        }
        .u-version {
          padding: 0 40px;
          .v-title {
            display: flex;
            align-items: center;
            h2 {
              font-size: 20px;
            }
            img {
              height: 20px;
              padding-left: 20px;
            }
          }
          .v-t {
            display: flex;
            align-items: center;
            height: 40px;
            span {
              color: #999999;
            }
          }
        }
        .u-text {
          padding: 0 40px;
          .t-item {
            .i-title {
              height: 50px;
              span {
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }
  .a-main {
    flex: 1;
    overflow-y: hidden;
  }
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;

  &:hover {
    background: #409eff;
  }
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
