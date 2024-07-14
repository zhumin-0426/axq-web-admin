/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2022-03-03 08:17:39
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/goods/index.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/goods';
import options from '../../json/options/goods';

const _tableField = {

  type: {
    type: 'int',
    default: 1
  },
  name: {
    type: 'string',
    default: ''
  },
  thumbnail: {
    type: 'string',
    default: ''
  },
  amount: {
    type: 'int',
    default: 0
  },
  amountCost: {
    type: 'int',
    default: 0
  },
  detailMobileText: {
    type: 'string',
    default: ''
  },
  goodsItemsList: {
    isEntity: true,
    type: 'GoodsItems',
    default: []
  }
};

class Goods extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'goods'
  }

  static _form = form

  static _options = options

  constructor (goods) {
    super(goods, { _tableField });
  }
}

export default Goods;
