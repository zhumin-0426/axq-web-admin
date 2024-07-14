/*
 * @Author: 码上talk|RC
 * @Date: 2021-01-20 14:09:33
 * @LastEditTime: 2021-08-10 15:18:17
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/axq/axqMaterial.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/axq/axqMaterial';

const _tableField = {
  title: {
    type: 'string',
    default: ''
  },
  url: {
    type: 'string',
    default: ''
  },
  psw: {
    type: 'string',
    default: ''
  }
};

class AxqMaterial extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'axq'
  }

  static _form = form

  static _options = {}

  constructor (axqMaterial) {
    super(axqMaterial, { _tableField });
  }
}

export default AxqMaterial;
