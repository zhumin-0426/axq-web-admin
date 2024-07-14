/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-06 14:54:07
 * @LastEditTime: 2021-08-10 14:58:07
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/trace/traceCode.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';

const _tableField = {

  code: {
    type: 'string',
    default: ''
  },

};

class TraceCode extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'trace'
  }

  static _form = {}

  static _options = {}

  constructor (traceCode) {
    super(traceCode, { _tableField });
  }
}

export default TraceCode;
