/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-01 11:32:19
 * @LastEditTime: 2021-10-26 09:31:06
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/stock/stockDeliveryGoodsItems.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/stock/stockDeliveryGoodsItems';

const _tableField = {

  stockDeliveryId: {
    type: 'int',
    default: 0
  },
  goodsItemsId: {
    type: 'int',
    default: 0
  },
  quantity: {
    type: 'int',
    default: 0
  },
  quantityHasStockIn: {
    type: 'int',
    default: 0
  },
  goodsItems: {
    isEntity: true,
    type: 'GoodsItems',
    default: {}
  },
};

class StockDeliveryGoodsItems extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'stock'
  }

  static _form = form

  static _options = {}

  constructor (stockDeliveryGoodsItems) {
    super(stockDeliveryGoodsItems, { _tableField });
  }
}

export default StockDeliveryGoodsItems;
