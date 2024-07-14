/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-06 14:54:07
 * @LastEditTime: 2021-05-15 10:10:06
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/model/entity/trace/traceCodeBatch.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/trace/traceCodeBatch';

const _tableField = {

  sn: {
    type: 'string',
    default: ''
  },

};

class TraceCodeBatch extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'trace'
  }

  static _form = form

  static _options = {}

  constructor (traceCodeBatch) {
    super(traceCodeBatch, { _tableField });
  }
}

export default TraceCodeBatch;
