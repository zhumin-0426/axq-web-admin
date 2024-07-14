/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-01 11:32:19
 * @LastEditTime: 2021-05-11 16:37:34
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/model/entity/stock/stockOutGoodsItems.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/stock/stockOutGoodsItems';

const _tableField = {

  stockOutId: {
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

class StockOutGoodsItems extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'stock'
  }

  static _form = form

  static _options = {}

  constructor (stockOutGoodsItems) {
    super(stockOutGoodsItems, { _tableField });
  }
}

export default StockOutGoodsItems;
