/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-01 11:32:19
 * @LastEditTime: 2021-05-06 16:37:21
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/model/entity/stock/stockInGoodsItems.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/stock/stockInGoodsItems';

const _tableField = {

  stockInId: {
    type: 'int',
    default: 0
  },
  goodItemsId: {
    type: 'int',
    default: 0
  },
  quantity: {
    type: 'int',
    default: 0
  },
  remark: {
    type: 'string',
    default: ''
  }
};

class StockInGoodsItems extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'stock'
  }

  static _form = form

  static _options = {}

  constructor (stockInGoodsItems) {
    super(stockInGoodsItems, { _tableField });
  }
}

export default StockInGoodsItems;
