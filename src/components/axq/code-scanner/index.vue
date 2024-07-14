<!--
 * @Author: 码上talk|RC
 * @Date: 2021-08-12 13:32:34
 * @LastEditTime: 2022-06-10 15:51:00
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/components/axq/code-scanner/index.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="code-scanner">
    <div class="s-item" v-if="[1, 2].includes(mode)">
      <div class="i-label">
        <span>条形码</span>
      </div>
      <div class="i-input">
        <input
          ref="barCode"
          placeholder="条形码"
          type="password"
          autocomplete="off"
          v-model="barCode.attr.code"
          @keyup="barCode.fn.keyupHandler"
        />
        <div class="text">
          <span>{{ barCode.attr.code }}</span>
        </div>
      </div>
    </div>
    <div class="s-item" v-if="[1, 5, 7].includes(mode)">
      <div class="i-label">
        <span>溯源码/防伪码</span>
      </div>
      <div class="i-input">
        <input
          ref="qrCodeCaptcha"
          clearable
          placeholder="溯源码/防伪码"
          v-model="qrCodeCaptcha.attr.code"
          type="password"
          autocomplete="off"
          @keyup="qrCodeCaptcha.fn.keyupHandler"
        />
        <div class="text">
          <span>{{ qrCodeCaptcha.attr.code }}</span>
        </div>
      </div>
    </div>
    <div class="s-item" v-if="[4, 6].includes(mode)">
      <div class="i-label">
        <span>溯源码</span>
      </div>
      <div class="i-input">
        <input
          ref="qrCode"
          clearable
          placeholder="溯源码"
          v-model="qrCode.attr.code"
          type="password"
          autocomplete="off"
          @keyup="qrCode.fn.keyupHandler"
        />
        <div class="text">
          <span>{{ qrCode.attr.code }}</span>
        </div>
      </div>
    </div>
    <div class="s-item" v-if="[4].includes(mode)">
      <div class="i-label">
        <span>防伪码</span>
      </div>
      <div class="i-input">
        <input
          ref="captcha"
          clearable
          placeholder="防伪码"
          v-model="captcha.attr.code"
          type="password"
          autocomplete="off"
          @keyup="captcha.fn.keyupHandler"
        />
        <div class="text">
          <span>{{ captcha.attr.code }}</span>
        </div>
      </div>
    </div>
    <div class="s-item" v-if="[3].includes(mode)">
      <div class="i-label">
        <span>聚合扫码</span>
      </div>
      <div class="i-input">
        <input
          ref="union"
          clearable
          placeholder="条形码/溯源码/防伪码"
          v-model="union.attr.code"
          type="password"
          autocomplete="off"
          @keyup="union.fn.keyupHandler"
        />
        <div class="text">
          <span>{{ union.attr.code }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * mode value
 * 1 -> stock_in bind
 * 2 -> stock_in bar_code
 * 3 -> stock_out / revert_form
 * 4 -> trace_code && trace_captcha's bind
 * 5 -> trace_code && trace_captcha's unbind
 * 6 -> flush
 * 7 -> remove trace_code
 */
import { model } from '@/model';
import { Request } from '@/model/request';

const { GoodsItems } = model.collection;

export default {
  props: {
    mode: {
      type: Number,
      default () {
        return 1;
      }
    },
    requiredStatus: {
      type: String,
      default () {
        return '';
      }
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      request: new Request(),
      barCode: {
        attr: {
          code: '',
          goodsItems: new GoodsItems()
        },
        fn: {
          keyupHandler: async (e) => {
            const enterStr = this.getEnterStr(e, this.barCode.attr.code);
            if (enterStr) {
              if (this.mode === 2) {
                this.barCode.attr.code = '';
              }
              const goodsItems = await this.getGoodsItems(enterStr);
              this.barCode.attr.goodsItems = this.$_.cloneDeep(goodsItems);
              if (goodsItems) {
                this.$emit('ok-goods-items', { barCode: enterStr, goodsItems });
                if (this.mode === 1) {
                  this.$refs.qrCodeCaptcha.focus();
                } else if (this.mode === 2) {
                  this.$emit('ok', { barCode: enterStr, goodsItems, _enterStr: enterStr });
                }
              }
            }
          }
        }
      },
      qrCodeCaptcha: {
        attr: {
          code: ''
        },
        fn: {
          keyupHandler: async (e) => {
            const enterStr = this.getEnterStr(e, this.qrCodeCaptcha.attr.code);
            if (enterStr) {
              let qrCode = '';
              let captcha = '';
              let resultCaptchaBindList = [];
              this.qrCodeCaptcha.attr.code = '';
              if (!this.isTraceCode(enterStr).b && !this.isTraceCaptcha(enterStr).b && !this.isTraceCodeV1(enterStr)) {
                const msg = '请输入正确溯源码/防伪码';
                this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message({
                  message: msg ,
                  type: 'warning'
                });
                return;
              }
              if (this.isTraceCodeV1(enterStr)) {
                const pdInfo = await this.getProductPathBySysCode(enterStr);
                if (!pdInfo) {
                  return;
                }
                const { sysCode, type } = pdInfo;
                if (this.requiredStatus) {
                  const { status, text } = this.checkStatus(type, this.requiredStatus);
                  if (!status) {
                    this.config.errorTipHook ? this.config.errorTipHook(text) : this.$message.warning(text);
                    return;
                  }
                }
                this.$emit('ok', { isV1: true, sysCode, goodsItems: this.barCode.attr.goodsItems, _enterStr: enterStr });
                return;
              }
              if (this.isTraceCode(enterStr).b) {
                qrCode = this.isTraceCode(enterStr).t;
              }
              if (this.isTraceCaptcha(enterStr).b) {
                captcha = this.isTraceCaptcha(enterStr).t;
                resultCaptchaBindList = await this.getTraceCaptchaBindList('', captcha);
                if (!resultCaptchaBindList.length) {
                  return;
                }
                qrCode = this.$_.get(resultCaptchaBindList, '[0].traceCode.qrCode');
              }
              if ([1, 7].includes(this.mode)) {
                const resultCodeInfo = await this.getTraceCodeInfo(qrCode);
                if (this.requiredStatus && this.requiredStatus === 'NONE') {
                  if (!resultCodeInfo) {
                    return;
                  }
                  if (resultCodeInfo.status !== 1) {
                    const msg = '溯源码已使用';
                    this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message.warning(msg);
                    return;
                  }
                }
                if (this.requiredStatus && this.requiredStatus !== 'NONE') {
                  const resultCodeBindInfo = await this.getTraceCodeBindInfo(qrCode);
                  if (!resultCodeBindInfo) {
                    return;
                  }
                  const { status, text } = this.checkStatus(resultCodeBindInfo.status, this.requiredStatus);
                  if (!status) {
                    this.config.errorTipHook ? this.config.errorTipHook(text) : this.$message.warning(text);
                    return;
                  }
                }
                this.$emit('ok', { qrCode, qrCodeId: resultCodeInfo.id, captcha, goodsItems: this.barCode.attr.goodsItems, _enterStr: enterStr });
              } else if (this.mode === 5) {
                if (!resultCaptchaBindList.length) {
                  resultCaptchaBindList = await this.getTraceCaptchaBindList(qrCode);
                  if (!resultCaptchaBindList.length) {
                    return;
                  }
                }
                this.$emit('ok', resultCaptchaBindList);
              }
            }
          }
        }
      },
      qrCode: {
        attr: {
          code: '',
          id: ''
        },
        fn: {
          keyupHandler: async (e) => {
            const enterStr = this.getEnterStr(e, this.qrCode.attr.code);
            if (enterStr) {
              if (!this.isTraceCode(enterStr).b) {
                const msg = '请输入正确溯源码';
                this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message({
                  message: msg,
                  type: 'warning'
                });
                return;
              }
              if (this.mode !== 4) {
                this.qrCode.attr.code = '';
              }
              const resultCodeInfo = await this.getTraceCodeInfo(this.isTraceCode(enterStr).t);
              if (resultCodeInfo) {
                if (this.mode === 4) {
                  if (this.config.stepHook && !this.config.stepHook(resultCodeInfo)) {
                    this.qrCode.attr.code = '';
                  } else {
                    this.qrCode.attr.id = resultCodeInfo.id;
                    this.$refs.captcha.focus();
                  }
                } else if (this.mode === 6) {
                  if (resultCodeInfo.status == 1) {
                    this.$message({
                      message: '溯源码未录入溯源信息',
                      type: 'warning'
                    });
                    return;
                  }
                  this.$emit('ok', { qrCodeId: resultCodeInfo.id, qrCode: this.isTraceCode(enterStr).t, _enterStr: enterStr })
                }
              }
            }
          }
        }
      },
      captcha: {
        attr: {
          enterNum: 0,
          code: ''
        },
        fn: {
          keyupHandler: async (e) => {
            const enterStr = this.getEnterStr(e, this.captcha.attr.code);
            if (enterStr) {
              if (!this.isTraceCaptcha(enterStr).b) {
                const msg = '请输入正确防伪码';
                this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message({
                  message: msg,
                  type: 'warning'
                });
                return;
              }
              const resultCaptchaInfo = await this.getTraceCaptchaInfo(this.isTraceCaptcha(enterStr).t);
              if (resultCaptchaInfo) {
                if (this.mode === 4) {
                  if (!this.qrCode.attr.code) {
                    this.$message.warning('请先输入溯源码');
                    this.captcha.attr.code = '';
                    return;
                  }
                  if (resultCaptchaInfo.status !== 1) {
                    this.$message({
                      message: '防伪码已使用',
                      type: 'warning'
                    });
                    this.captcha.attr.code = '';
                  } else {
                    this.captcha.attr.enterNum = this.captcha.attr.enterNum + 1;
                    this.$emit('ok', { qrCodeId: this.qrCode.attr.id, qrCode: this.qrCode.attr.code, captchaId: resultCaptchaInfo.id, captcha: this.isTraceCaptcha(enterStr).t, _enterStr: enterStr });
                    if (this.$_.get(this.config, 'bindNum') > 1 && this.captcha.attr.enterNum < this.$_.get(this.config, 'bindNum')) {
                      this.captcha.attr.code = '';
                      return;
                    }
                    this.captcha.attr.enterNum = 0;
                    this.qrCode.attr.id = '';
                    this.qrCode.attr.code = '';
                    this.captcha.attr.code = '';
                    this.$refs.qrCode.focus();
                  }
                }
              }
            }
          }
        }
      },
      union: {
        attr: {
          code: ''
        },
        fn: {
          keyupHandler: async (e) => {
            const enterStr = this.getEnterStr(e, this.union.attr.code);
            if (enterStr) {
              let barCode = '';
              let qrCodeId = '';
              let qrCode = '';
              let codeBindId = '';
              let captcha = '';
              this.union.attr.code = '';
              if (this.isTraceCode(enterStr).b || this.isTraceCaptcha(enterStr).b || this.isTraceCodeV1(enterStr)) {
                if (this.isTraceCodeV1(enterStr)) {
                  const pdInfo = await this.getProductPathBySysCode(enterStr);
                  if (!pdInfo) {
                    return;
                  }
                  const { sysCode, productId, type } = pdInfo;
                  if (this.requiredStatus) {
                    const { status, text } = this.checkStatus(type, this.requiredStatus);
                    if (!status) {
                      this.config.errorTipHook ? this.config.errorTipHook(text) : this.$message.warning(text);
                      return;
                    }
                  }
                  const goodsItems = await this.getGoodsItems('', '', productId);
                  this.$emit('ok', { isV1: true, sysCode, goodsItems, _enterStr: enterStr });
                  return;
                }
                if (this.isTraceCaptcha(enterStr).b) {
                  captcha = this.isTraceCaptcha(enterStr).t;
                  const resultCaptchaBindList = await this.getTraceCaptchaBindList('', captcha);
                  if (!resultCaptchaBindList.length) {
                    return;
                  }
                  qrCode = this.$_.get(resultCaptchaBindList, '[0].traceCode.qrCode');
                }
                if (this.isTraceCode(enterStr).b) {
                  qrCode = this.isTraceCode(enterStr).t;
                }
                const resultCodeBindInfo = await this.getTraceCodeBindInfo(qrCode);
                if (!resultCodeBindInfo) {
                  return;
                }
                if (this.requiredStatus) {
                  const { status, text } = this.checkStatus(resultCodeBindInfo.status, this.requiredStatus);
                  if (!status) {
                    this.config.errorTipHook ? this.config.errorTipHook(text) : this.$message.warning(text);
                    return;
                  }
                }
                codeBindId = resultCodeBindInfo.id;
                qrCodeId = resultCodeBindInfo.traceCode.id;
              } else {
                barCode = enterStr;
              }
              const goodsItems = await this.getGoodsItems(barCode, qrCode);
              this.$emit('ok', { barCode, qrCodeId, qrCode, codeBindId, captcha, goodsItems, _enterStr: enterStr });
            }
          }
        }
      }
    }
  },
  methods: {
    checkStatus (v, rq) {
      const v2s = [
        {
          value: [1, 100],
          key: 'STOCK_IN',
          text: '已入库'
        },
        {
          value: [2, 200],
          key: 'STOCK_OUT',
          text: '已出库'
        },
        {
          value: [3, 300],
          key: 'SHOP_STOCK_IN',
          text: '店铺已入库'
        },
        {
          value: [4, 400],
          key: 'SHOP_STOCK_OUT',
          text: '店铺已出库'
        }
      ]
      const tar = this.$_.find(v2s, x => { return x.value.includes(v) });
      if (rq === 'NONE') {
        if (tar) {
          return {
            status: false,
            text: `溯源码已录入信息，溯源码处于--${tar.text}`
          }
        }
      } else {
        if (!tar) {
          return {
            status: false,
            text: '溯源信息未录入~'
          }
        }
        if (tar.key !== rq && rq !== 'ALL') {
          return {
            status: false,
            text: `溯源码流程错误，溯源码处于--${tar.text}`
          }
        }
      }
      return {
        status: true,
        text: 'ok'
      }
    },
    getEnterStr (e, s) {
      const { key } = e;
      if (key === 'Enter') {
        if (!s) {
          const msg = '请校验输入信息';
          this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message.warning(msg);
          return '';
        }
        return s;
      }
    },
    getTraceCodeInfo (qrCode) {
      return new Promise((resolve) => {
        this.request.do('open', 'trace', 'codeInfo', { params: {}, data: { query: { qrCode } } }).then(res => {
          const { data } = res;
          if (!data) {
            const msg = '溯源码不存在';
            this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message.warning(msg);
            resolve();
          } else {
            resolve(data);
          }
        });
      });
    },
    getTraceCodeBindInfo (qrCode) {
      return new Promise((resolve) => {
        this.request.do('open', 'trace', 'codeBindInfo', { params: {}, data: { query: { qrCode } } }).then(res => {
          const { data } = res;
          if (!data) {
            const msg = '溯源码未绑定';
            this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message.warning(msg);
            resolve();
          } else {
            resolve(data);
          }
        });
      });
    },
    getTraceCaptchaInfo (captcha) {
      return new Promise((resolve) => {
        this.request.do('open', 'trace', 'captchaInfo', { params: {}, data: { query: { code: captcha } } }).then(res => {
          const { data } = res;
          if (!data) {
            const msg = '防伪码不存在';
            this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message.warning(msg);
            resolve();
          } else {
            resolve(data);
          }
        });
      });
    },
    getTraceCaptchaBindList (qrCode, captcha) {
      return new Promise((resolve) => {
        this.request.do('open', 'trace', 'captchaBindList', { params: {}, data: { query: { qrCode, captcha } } }).then(res => {
          const { status, data } = res;
          if (!data.length) {
            const msg = '防伪码未绑定';
            this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message.warning(msg);
            resolve();
          } else {
            resolve(data);
          }
        });
      });
    },
    getProductPathBySysCode (str) {
      const sysCode = str.split('?code=')[1];
      return new Promise((resolve) => {
        this.request.do('apiV1', 'trace', 'getProductPathBySysCode', { params: { sysCode }, data: {} }).then(res => {
          const { status, data } = res;
          if (!status) {
            const msg = '溯源码不存在';
            this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message({
              message: msg,
              type: 'warning'
            });
            resolve();
          } else if (!data) {
            const msg = '溯源码信息为空';
            this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message({
              message: msg,
              type: 'warning'
            });
            resolve();
          } else {
            resolve({
              sysCode,
              productId: data.productId,
              type: data.type
            })
          }
        })
      })
    },
    getGoodsItems (barCode, qrCode, id) {
      return new Promise((resolve) => {
        GoodsItems.sendApi('goodsItemsInfo', { params: {}, data: { query: { barCode, qrCode, id } } }, { parse4Entity: true, errorTip: '获取商品规格失败' }).then(res => {
          const { data } = res;
          if (!data.id) {
            const msg = '商品规格不存在';
            this.config.errorTipHook ? this.config.errorTipHook(msg) : this.$message({
              message: msg,
              type: 'warning'
            });
            resolve();
          } else {
            resolve(data);
          }
        });
      })
    },
    blur () {
      const l = ['barCode', 'qrCodeCaptcha', 'qrCode', 'captcha', 'union'];
      l.forEach(i => {
        this.$refs[i] && this.$refs[i].blur();
      })
    }
  }
}
</script>

<style lang="less">
@keyframes indicator {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0;
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
.code-scanner {
  display: flex;
  .s-item {
    display: flex;
    align-items: center;
    .i-label {
      padding-right: 20px;
      span {
        white-space: nowrap;
      }
    }
    .i-input {
      position: relative;
      input {
        height: 30px;
        outline-color: #1890ff;
        &:focus + .text:after {
          animation: indicator 1.2s infinite;
        }
      }
      .text {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        pointer-events: none;
        overflow-x: hidden;
        span {
          position: absolute;
          top: 50%;
          left: 2px;
          transform: translateY(-50%);
          height: 80%;
          line-height: 30px;
          background: white;
        }
        &::after {
          content: "";
          display: inline-block;
          height: 18px;
          position: relative;
          border-right: solid 1px #666;
          top: 4px;
          left: 0px;
          opacity: 0;
        }
      }
    }
    &:not(:first-child) {
      margin-left: 30px;
    }
  }
}
</style>