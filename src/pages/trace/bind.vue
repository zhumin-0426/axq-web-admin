<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-24 10:39:00
 * @LastEditTime: 2021-10-25 15:31:46
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/trace/bind.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="trace-bind">
    <div class="b-type">
      <div class="t-item" :class="{'t-item-active': type === 1}" @click="type = 1">
        <span>绑定</span>
      </div>
      <div class="t-item" :class="{'t-item-active': type === 2}" @click="type = 2">
        <span>解绑</span>
      </div>
    </div>
    <div class="b-content b-content_bind" v-if="type == 1">
      <div class="b-type">
        <span>绑定方式：</span>
        <switch-selector
          tip="切换绑定方式，该操作会情况当前数据，是否继续？"
          :config="{value: 1, selectorList: [{label: '单绑', value: 1}, {label: '双绑', value: 2}]}"
          @change="switchSelector.fn.typeChangeHanlder"
        ></switch-selector>
      </div>
      <div class="c-toolbar">
        <div class="t-left">
          <axq-code-scanner
            :mode="4"
            :config="{bindNum: this.bind.attr.type, stepHook: bind.fn.stepHook}"
            @ok="bind.fn.scannerOkHandler"
          ></axq-code-scanner>
        </div>
        <div class="t-right">
          <el-button-group>
            <el-button type="danger" size="small" @click.native="bind.fn.flush()">清空</el-button>
            <el-button type="primary" size="small" @click.native="bind.fn.add">绑定</el-button>
          </el-button-group>
        </div>
      </div>
      <div class="c-table">
        <el-table :data="bSort" style="width: 100%" height="450">
          <el-table-column fixed prop="date" label="序号" width="150">
            <template slot-scope="props">
              <p>{{ props.$index + 1 }}</p>
            </template>
          </el-table-column>
          <el-table-column label="溯源码">
            <template slot-scope="props">
              <p>{{ props.row.qrCode }}</p>
            </template>
          </el-table-column>
          <el-table-column label="防伪码">
            <template slot-scope="props">
              <p :key="key" v-for="(item, key) in props.row.captchaList">{{item }}</p>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="props">
              <el-button
                type="text"
                size="small"
                @click.native="bind.fn.delete(props.row.qrCode)"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="b-content b-content_unbind" v-else>
      <div class="c-toolbar">
        <div class="t-left">
          <axq-code-scanner :mode="5" @ok="unbind.fn.scannerOkHandler"></axq-code-scanner>
        </div>
        <div class="t-right">
          <el-button-group>
            <el-button type="danger" size="small" @click.native="unbind.fn.flush()">清空</el-button>
            <el-button type="primary" size="small" @click.native="unbind.fn.add">解绑</el-button>
          </el-button-group>
        </div>
      </div>
      <div class="c-table">
        <el-table :data="unbind.attr.list" style="width: 100%" height="450">
          <el-table-column fixed prop="date" label="序号" width="150">
            <template slot-scope="props">
              <p>{{ props.$index + 1 }}</p>
            </template>
          </el-table-column>
          <el-table-column label="溯源码">
            <template slot-scope="props">
              <p>{{ props.row.traceCode.qrCode }}</p>
            </template>
          </el-table-column>
          <el-table-column label="防伪码">
            <template slot-scope="props">
              <p>{{ props.row.traceCaptcha.code }}</p>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="props">
              <el-button type="text" size="small" @click.native="unbind.fn.delete(props.$index)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import switchSelector from '@/components/switch-selector';
import axqCodeScanner from '@/components/axq/code-scanner';
import { model } from '@/model';

const {
  TraceCaptchaBind
} = model.collection;

export default {
  components: {
    switchSelector,
    axqCodeScanner
  },
  data () {
    return {
      type: 1,
      switchSelector: {
        fn: {
          typeChangeHanlder: (e) => {
            const { value, ok } = e;
            this.bind.attr.type = value;
            this.bind.attr.list = [];
            ok();
          }
        }
      },
      bind: {
        attr: {
          type: 1,
          list: []
        },
        fn: {
          stepHook: (e) => {
            const { id } = e;
            if (this.bind.attr.type === 1) {
              const tar = this.$_.find(this.bind.attr.list, x => { return x.qrCodeId === id });
              if (tar) {
                this.$message.warning('溯源码已重复');
                return false;
              }
              return true;
            }
            return true;
          },
          scannerOkHandler: (e) => {
            const qrTar = this.$_.find(this.bind.attr.list, x => { return x.qrCodeId === e.qrCodeId });
            if (qrTar && qrTar.captchaId === e.captchaId) {
              this.$message({
                message: '重复绑定~',
                type: 'warning'
              });
              return;
            }
            if (this.bind.attr.list.map(i => i.captchaId).includes(e.captchaId)) {
              this.$message({
                message: '防伪码码已录入',
                type: 'warning'
              });
              return;
            }
            this.bind.attr.list.push(e);
          },
          add: () => {
            if (!this.bind.attr.list.length) {
              this.$message({
                message: '请添加绑定信息',
                type: 'warning'
              });
              return;
            }
            TraceCaptchaBind.sendApi('captchaBindAdd', { params: {}, data: this.bind.attr.list.map(i => ({ codeId: i.qrCodeId, captchaId: i.captchaId })) }).then(res => {
              const { status } = res;
              if (status) {
                this.$message({
                  message: '防伪码绑定成功',
                  type: 'success'
                });
                this.bind.attr.list = [];
              } else {
                this.$message({
                  message: '防伪码绑定失败',
                  type: 'error'
                });
              }
            });
          },
          delete: (qrCode) => {
            this.bind.attr.list = this.bind.attr.list.filter(i => { return qrCode !== i.qrCode });
          },
          flush: () => {
            this.$confirm('是否清除当前扫码信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.bind.attr.list = [];
            }).catch(() => {
            });
          }
        }
      },
      unbind: {
        attr: {
          list: []
        },
        fn: {
          scannerOkHandler: (e) => {
            if (this.unbind.attr.list.map(i => i.id).includes(e.id)) {
              this.$message.warning('请勿重复添加');
              return;
            }
            this.unbind.attr.list = this.unbind.attr.list.concat(e);
          },
          add: () => {
            if (!this.unbind.attr.list.length) {
              this.$message({
                message: '请扫码录入解绑信息',
                type: 'warning'
              });
              return;
            }
            TraceCaptchaBind.sendApi('captchaBindDelete', { params: { captchaBindIds: this.unbind.attr.list.map(i => i.id).join(',') }, data: {} }).then(res => {
              const { status } = res;
              if (status) {
                this.$message({
                  message: '防伪码解绑成功',
                  type: 'success'
                });
                this.unbind.attr.list = [];
              } else {
                this.$message({
                  message: '防伪码解绑失败',
                  type: 'error'
                });
              }
            });
          },
          delete: (index) => {
            this.unbind.attr.list.splice(index, 1);
          },
          flush: () => {
            this.$confirm('是否清除当前扫码信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.unbind.attr.list = [];
            }).catch(() => {
            });
          }
        }
      }
    };
  },
  computed: {
    bSort () {
      let l = [];
      this.bind.attr.list.forEach(i => {
        const tar = this.$_.find(l, x => { return x.qrCode === i.qrCode });
        if (tar) {
          tar.captchaList.push(i._enterStr);
          return;
        }
        l.push({
          qrCode: i.qrCode,
          captchaList: [i._enterStr]
        });
      });
      return l;
    }
  }
};
</script>

<style lang="less">
.trace-bind {
  .b-type {
    display: flex;
    padding: 0 10px;
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
  .b-content {
    padding: 20px;
    margin-top: 20px;
    background: white;
    &_bind {
      .b-type {
        display: flex;
        align-items: center;
      }
    }
    .c-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100px;
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>
