/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-01 11:32:19
 * @LastEditTime: 2021-05-30 10:47:42
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/model/entity/purchanse/purchanseGift.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/purchanse/purchanseGift';

const _tableField = {

  purchanseId: {
    type: 'int',
    default: 0
  },
  goodsItemsId: {
    type: 'string',
    default: ''
  },
  amountCost: {
    type: 'int',
    default: 0
  },
  amountCostAbove: {
    type: 'int',
    default: 0
  },
  integralGiveDividend: {
    type: 'int',
    default: 0
  },
  integralGiveDivisor: {
    type: 'int',
    default: 0
  },
  goodsItems: {
    isEntity: true,
    type: 'GoodsItems',
    default: {}
  },
  quantity: {
    type: 'int',
    default: 0
  }
};

class PurchanseGift extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'purchanse'
  }

  static _form = form

  static _options = {}

  get amountCostFinal () {
    return this.amountCost + this.amountCostAbove;
  }


  constructor (purchanseGift) {
    super(purchanseGift, { _tableField });
  }
}

export default PurchanseGift;