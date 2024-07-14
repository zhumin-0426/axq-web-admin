/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-06-03 21:00:17
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/goods/goodsSpecValue.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/goods/goodsSpecValue';

const _tableField = {

  name: {
    type: 'string',
    default: ''
  },

};

class GoodsSpecValue extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'goods'
  }

  static _form = form

  static _options = {}

  constructor (goodsSpecValue) {
    super(goodsSpecValue, { _tableField });
  }
}

export default GoodsSpecValue;
