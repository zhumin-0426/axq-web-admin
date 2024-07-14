/*
 * @Author: 码上talk|RC
 * @Date: 2020-10-24 15:02:14
 * @LastEditTime: 2021-08-10 15:10:35
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/axq/axqAccessRule.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/axq/axqAccessRule';

const _tableField = {
  name: {
    type: 'string',
    default: ''
  }
};

class AxqAccessRule extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'axq'
  }

  static _form = form

  static _options = {}

  constructor (axqAccessRule) {
    super(axqAccessRule, { _tableField });
  }
}

export default AxqAccessRule;
