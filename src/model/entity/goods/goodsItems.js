/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-01 11:32:19
 * @LastEditTime: 2022-03-25 10:37:45
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/goods/goodsItems.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/goods/goodsItems';

const _tableField = {

  goodsId: {
    type: 'int',
    default: 0
  },
  name: {
    type: 'string',
    default: ''
  },
  specJson: {
    type: 'string',
    do: {
      parse: true
    },
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
  integralShopGive: {
    type: 'int',
    default: 0
  },
  integralExchangeRequire: {
    type: 'int',
    default: 0
  },
  integralExchangeGive: {
    type: 'int',
    default: 0
  },
  stock: {
    type: 'int',
    default: 0
  },
  barCode: {
    type: 'string',
    default: ''
  },
  stockFreeze: {
    type: 'int',
    default: 0
  },
  goods: {
    isEntity: true,
    type: 'Goods',
    default: {}
  },
};

class GoodsItems extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'goods'
  }

  static _form = form

  static _options = {}

  get specColorStr () {
    return $_.get(this.specJson, '[1].value');
  }

  get specSizeStr () {
    return $_.get(this.specJson, '[0].value');
  }

  get amountCostFinal () {
    return this.amountCost + this.amountCostAbove;
  }

  constructor (goodsItems) {
    super(goodsItems, { _tableField });
  }

  specJson2str () {
    return this.specJson.map(i => i.value).join('x');
  }
}

export default GoodsItems;
