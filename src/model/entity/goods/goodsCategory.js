/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2022-02-12 10:19:04
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/goods/goodsCategory.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/goods/goodsCategory';
import options from '../../json/options/goods/goodsCategory';

const _tableField = {

  name: {
    type: 'string',
    default: ''
  }

};

class GoodsCategory extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'goods'
  }

  static _form = form

  static _options = options

  constructor (goodsCategory) {
    super(goodsCategory, { _tableField });
  }
}

export default GoodsCategory;
