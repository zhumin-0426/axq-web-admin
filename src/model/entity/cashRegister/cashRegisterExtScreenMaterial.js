/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-08-10 14:57:51
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/cashRegister/cashRegisterExtScreenMaterial.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';

const _tableField = {


};

class CashRegisterExtScreenMaterial extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'cashRegister'
  }

  static _form = {};

  static _options = {}

  constructor (cashRegisterExtScreenMaterial) {
    super(cashRegisterExtScreenMaterial, { _tableField });
  }
}

export default CashRegisterExtScreenMaterial;
