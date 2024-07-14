/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-05-08 14:15:12
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/model/entity/stock/stockIn.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/stock/stockIn';

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

class StockIn extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'stock'
  }

  static _form = form

  static _options = {
    type: [
      {
        value: 1,
        label: "手动入库"
      },
      {
        value: 3,
        label: "重新入库"
      }
    ]
  }

  constructor (stockIn) {
    super(stockIn, { _tableField });
  }
}

export default StockIn;
