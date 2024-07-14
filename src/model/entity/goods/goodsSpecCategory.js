/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-05-24 09:34:23
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/model/entity/goods/goodsSpecCategory.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/goods/goodsSpecCategory';

const _tableField = {

  name: {
    type: 'string',
    default: ''
  },

};

class GoodsSpecCategory extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'goods'
  }

  static _form = form

  static _options = {}

  constructor (goodsSpecCategory) {
    super(goodsSpecCategory, { _tableField });
  }
}

export default GoodsSpecCategory;
