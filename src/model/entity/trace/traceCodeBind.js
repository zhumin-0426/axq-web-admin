/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-06 16:44:26
 * @LastEditTime: 2021-05-08 14:15:41
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/model/entity/trace/traceCodeBind.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/trace/traceCodeBind';

const _tableField = {

  codeId: {
    type: 'int',
    default: 0
  },
  goodsItemsId: {
    type: 'int',
    default: 0
  },

};

class TraceCodeBind extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'trace'
  }

  static _form = form

  static _options = {}

  constructor (traceCodeBind) {
    super(traceCodeBind, { _tableField });
  }
}

export default TraceCodeBind;
