/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-05-12 16:03:37
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/model/entity/shop/index.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import options from '../../json/options/shop';
import excel from '../../json/excel/shop';

const _tableField = {

  sn: {
    type: 'string',
    default: ''
  },
  type: {
    type: 'int',
    default: 0
  },
  name: {
    type: 'string',
    default: ''
  },

};

class Shop extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'shop'
  }

  static _form = {}

  static _options = options

  static _excel = excel

  constructor (shop) {
    super(shop, { _tableField });
  }
}

export default Shop;
