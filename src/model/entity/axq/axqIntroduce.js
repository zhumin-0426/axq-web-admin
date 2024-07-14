/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-08-10 15:10:52
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/axq/axqIntroduce.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/axq/axqIntroduce';

const _tableField = {

  title: {
    type: 'string',
    default: ''
  }

};

class AxqIntroduce extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'axq'
  }

  static _form = form

  static _options = {}

  constructor (axqIntroduce) {
    super(axqIntroduce, { _tableField });
  }
}

export default AxqIntroduce;
