/*
 * @Author: 码上talk|RC
 * @Date: 2021-06-02 10:07:23
 * @LastEditTime: 2021-10-03 14:36:51
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/store/sys/state.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

export default {
  layoutAuthLoading: false,
  menu: [],
  isDaynamicRoutesReady: false,
  accessRuleIds: [],
  historyBar: [],
  ws: {
    ready: false,
    axqPrintStatus: {
      waitPrintPurchanseList: [],
      onlineAxqPrinterSize: 0,
      printQueueSize: 0
    },
    update: {
      isWillUpdate: false,
      info: {
        version: '',
        updateStartTime: '',
        updateEndTime: '',
        contentFixed: '',
        contentNew: ''
      }
    }
  }
};
