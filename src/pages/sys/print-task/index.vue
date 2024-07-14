<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-27 13:46:06
 * @LastEditTime: 2021-10-12 09:34:13
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/sys/print-task/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="sys-print-task">
    <div class="t-print">
      <div class="p-client">
        <p v-if="isListening">本次服务共打印文件（{{ printTimes }}）次</p>
        <img src="/image/print_client.png" alt />
      </div>
      <div class="p-link">
        <div class="l-line"></div>
        <div class="l-btn" :class="{'l-btn--error': !ws.ready}">
          <template v-if="ws.ready">
            <i class="iconfont icon-icon-link"></i>
            <p>与远程打印服务连接正常，{{ isListening ? '等待打印文件传入' : '等待开启打印' }}~</p>
            <el-button
              :type="isListening ? 'danger' : 'primary'"
              @click.native="isListening ? stopListen() : startListen()"
            >{{ isListening ? '关闭打印' : '开启打印' }}</el-button>
          </template>
          <template v-else>
            <i class="iconfont icon-duankai"></i>
            <p>与远程打印服务连接异常，请联系技术部~</p>
          </template>
        </div>
        <div class="l-line"></div>
      </div>
      <div class="p-server">
        <img src="/image/print_server.png" alt />
      </div>
    </div>
    <div class="t-tip">
      <div class="t-main">
        <div class="m-title">
          <h2>使用云打印服务注意事项：</h2>
        </div>
        <div class="m-content">
          <p>1、打印服务为长期运行服务，请勿关闭，切换页面。</p>
          <p>2、请合理安排运行打印电脑，提供稳定供电。</p>
          <p>2、如有其他问题，请联系"技术部"。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { SocketIo } from '@/libs/js/socket';
import Printer from '@/components/axq/printer';

const ROOM_PRINT = 'room_admin_axq-print';
const EVENT_PRINT_TASK = 'deal-axq-print-task';
const EVENT_PRINT_DONE = 'axq-print-task-done';
export default {
  data () {
    return {
      socketIo: new SocketIo(),
      isListening: false,
      printTimes: 0
    };
  },
  computed: {
    ...mapState('sys', ['ws'])
  },
  watch: {
    'ws.ready': function (e) {
      if (!e && this.isListening) {
        this.isListening = false;
      }
    }
  },
  created () {
    this._onEvent();
  },
  methods: {
    _onEvent () {
      this.socketIo.listen('joined', () => {
        this.printTimes = 0;
        this.isListening = true;
      });
      this.socketIo.listen(EVENT_PRINT_TASK, msg => {
        const { type, purchanseId } = msg;
        this.printTimes++;
        this.$log4js.log('axq-print-task is starting');
        new Printer(1).run(
          {
            autoPrint: true,
            width: '200mm',
            height: '100%',
            preview: false
          },
          { purchanseId },
          () => {
            this.socketIo.emit(EVENT_PRINT_DONE, purchanseId);
          }
        );
      });
      this.socketIo.listen('leaved', () => {
        this.isListening = false;
        this.$log4js.log('axq-print-task is off');
      });
    },
    startListen () {
      this.socketIo.emit('join', ROOM_PRINT);
    },
    stopListen () {
      this.socketIo.emit('leave', ROOM_PRINT);
    }
  }
};
</script>

<style lang="less">
.sys-print-task {
  background: white;
  .t-print {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    .p-client {
      position: relative;
      p {
        position: absolute;
        top: 0;
        white-space: nowrap;
      }
      img {
        width: 200px;
      }
    }
    .p-link {
      display: flex;
      align-items: center;
      .l-line {
        width: 150px;
        border-bottom: 1px dashed rgb(103, 194, 58);
      }
      .l-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20px;
        .iconfont {
          font-size: 50px;
          color: rgb(103, 194, 58);
        }
        p {
          color: rgb(103, 194, 58);
        }
        &--error {
          .iconfont {
            color: #f56c6c;
          }
          p {
            color: #f56c6c;
          }
        }
      }
    }
    .p-server {
      width: 200px;
      img {
        width: 100%;
      }
    }
  }
  .t-tip {
    padding: 50px;
    .t-main {
      padding: 20px 40px;
      background: #fafafa;
    }
  }
}
</style>
