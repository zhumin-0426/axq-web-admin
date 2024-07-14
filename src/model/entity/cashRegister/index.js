/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-07-20 17:14:02
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/cashRegister/index.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import options from '../../json/options/cashRegister';

const _tableField = {


};

class CashRegister extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'cashRegister'
  }

  static _form = {};

  static _options = options

  constructor (cashRegister) {
    super(cashRegister, { _tableField });
  }
}

export default CashRegister;
