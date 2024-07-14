/*
 * @Author: 码上talk|RC
 * @Date: 2021-01-20 14:09:33
 * @LastEditTime: 2021-08-10 15:11:14
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/axq/axqSelfEmployedLaborer.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/axq/axqSelfEmployedLaborer';
import options from '../../json/options/axq/axqSelfEmployedLaborer';

const _tableField = {

  name: {
    type: 'string',
    default: ''
  },
  manager: {
    type: 'string',
    default: ''
  },
  managerMobile: {
    type: 'string',
    default: ''
  },
  bankOpenAddress: {
    type: 'string',
    default: ''
  },
  bankNumber: {
    type: 'string',
    default: ''
  }

};

class AxqSelfEmployedLaborer extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'axq'
  }

  static _form = form

  static _options = options

  constructor (axqSelfEmployedLaborer) {
    super(axqSelfEmployedLaborer, { _tableField });
  }
}

export default AxqSelfEmployedLaborer;
