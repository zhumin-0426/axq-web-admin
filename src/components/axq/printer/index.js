/*
 * @Author: 码上talk|RC
 * @Date: 2021-04-17 17:06:58
 * @LastEditTime: 2021-09-28 07:57:27
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/printer/index.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
/* eslint-disable */
import Vue from 'vue'
import printer from './index.vue'
import printjs from './js/print'
import LodopFuncs from '@/libs/js/LodopFuncs';

const { getLodop } = LodopFuncs;

class Printer {
  constructor (type) {
    this.type = type
  }
  run (config = { autoPrint: false, width: 100, height: 150 }, params = {}, callback) {
    const _this = this;
    const tmpVM = new Vue({
      render (h) {
        return h(printer, {
          props: {
            type: _this.type,
            autoPrint: config.autoPrint,
            params
          },
          on: {
            'ok': () => {
              if (config.autoPrint) {
                try {
                  const LODOP = getLodop();
                  if (!LODOP) {
                    this.$confirm('自动功能需要安装lodop套件，请安装成功后刷新页面重试', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                    }).catch(() => {
                    });
                    return;
                  }
                  LODOP.SET_LICENSES("", "4A00707252F4DCF502BF75E5E7C769516A7", "", "")
                  LODOP.SET_PRINT_MODE('CATCH_PRINT_STATUS', true);
                  LODOP.PRINT_INIT();
                  LODOP.ADD_PRINT_HTM(0, 0, config.width, config.height, '<body>' + tmpVM.$el.outerHTML + '</body>');
                  LODOP.On_Return = (TaskID, Value) => {
                    if (TaskID && Value) {
                      callback && callback();
                    }
                  };
                  if (config.preview) {
                    LODOP.PREVIEW();
                  } else {
                    LODOP.PRINT();
                  }
                } catch (e) {
                  this.$log4js.log(e);
                }
                return;
              }
              printjs(tmpVM.$el);
            }
          }
        })
      }
    }).$mount();
  }
}
export default Printer