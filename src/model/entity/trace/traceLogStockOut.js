/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-06 16:44:26
 * @LastEditTime: 2021-06-12 08:50:37
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/trace/traceLogStockOut.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/trace/traceLogStockOut';

const _tableField = {

  codeBindid: {
    type: 'int',
    default: 0
  },
  stockOutId: {
    type: 'int',
    default: 0
  },

};

class TraceLogStockOut extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'trace'
  }

  static _form = form

  static _options = {}

  constructor (traceLogStockOut) {
    super(traceLogStockOut, { _tableField });
  }
}

export default TraceLogStockOut;
