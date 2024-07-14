/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-06-02 14:02:08
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/coupon/index.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/coupon';
import options from '../../json/options/coupon';

const _tableField = {

  title: {
    type: 'string',
    default: ''
  },
  description: {
    type: 'string',
    default: ''
  },
  quantity: {
    type: 'int',
    default: 0
  },

};

class Coupon extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'coupon'
  }

  static _form = form;

  static _options = options

  constructor (coupon) {
    super(coupon, { _tableField });
  }
}

export default Coupon;
