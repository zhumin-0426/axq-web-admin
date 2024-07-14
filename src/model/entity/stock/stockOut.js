/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-06-26 14:16:13
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/stock/stockOut.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/stock/stockOut';
import options from '../../json/options/stock/stockOut';

const _tableField = {

  sn: {
    type: 'string',
    default: ''
  },
  documentMakerId: {
    type: 'int',
    default: ''
  },

};

class StockOut extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'stock'
  }

  static _form = form

  static _options = options

  constructor (stockOut) {
    super(stockOut, { _tableField });
  }
}

export default StockOut;
