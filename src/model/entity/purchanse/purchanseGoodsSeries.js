/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-01 11:32:19
 * @LastEditTime: 2021-08-13 12:34:56
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/purchanse/purchanseGoodsSeries.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/purchanse/purchanseGoodsSeries';

const _tableField = {

  purchanseId: {
    type: 'int',
    default: 0
  },
  goodsSeriesId: {
    type: 'string',
    default: ''
  },
  quantity: {
    type: 'int',
    default: 0
  },
  goodsSeries: {
    isEntity: true,
    type: 'GoodsSeries',
    default: {}
  },
};

class PurchanseGoodsSeries extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'purchanse'
  }

  static _form = form

  static _options = {}

  constructor (purchanseGoodsSeries) {
    super(purchanseGoodsSeries, { _tableField });
  }
}

export default PurchanseGoodsSeries;
