/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-06-02 14:06:21
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/coupon/couponItems.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/coupon/couponItems';

const _tableField = {

  amount: {
    type: 'int',
    default: 0
  },

};

class CouponItems extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'couponItems'
  }

  static _form = form;

  static _options = {}

  constructor (couponItems) {
    super(couponItems, { _tableField });
  }
}

export default CouponItems;
