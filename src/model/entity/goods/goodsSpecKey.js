/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-06-03 20:59:46
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/goods/goodsSpeckey.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/goods/goodsSpecKey';

const _tableField = {

  name: {
    type: 'string',
    default: ''
  },

};

class GoodsSpecKey extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'goods'
  }

  static _form = form

  static _options = {}

  constructor (goodsSpecKey) {
    super(goodsSpecKey, { _tableField });
  }
}

export default GoodsSpecKey;
