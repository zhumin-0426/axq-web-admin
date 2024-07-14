/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-12-09 10:23:13
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/stock/stockDelivery.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/stock/stockDelivery';
import options from '../../json/options/stock/stockDelivery';

const _tableField = {

  sn: {
    type: 'string',
    default: ''
  },
  status: {
    type: 'int',
    deafult: 0
  },
  documentMakerId: {
    type: 'int',
    default: ''
  },
  stockDeliveryGoodsItemsList: {
    isEntity: true,
    type: 'StockDeliveryGoodsItems',
    default: []
  },
};

class StockDelivery extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'stock'
  }

  static _form = form

  static _options = options

  constructor (stockDelivery) {
    super(stockDelivery, { _tableField });
  }
}

export default StockDelivery;
