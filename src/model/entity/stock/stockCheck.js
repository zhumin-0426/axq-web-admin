/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-08-24 19:14:05
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/stock/stockCheck.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/stock/stockCheck';

const _tableField = {

  sn: {
    type: 'string',
    default: ''
  },
  documentMakerId: {
    type: 'int',
    default: ''
  }

};

class StockCheck extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'stock'
  }

  static _form = form

  static _options = {}

  constructor (stockCheck) {
    super(stockCheck, { _tableField });
  }
}

export default StockCheck;
