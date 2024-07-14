/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-22 10:33:11
 * @LastEditTime: 2022-05-04 18:57:45
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/shop/ShopDeposit.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/shop/shopDeposit';

const _tableField = {


};

class ShopDeposit extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'shop'
  }

  static _form = form

  static _options = {}

  constructor (shopDeposit) {
    super(shopDeposit, { _tableField });
  }
}

export default ShopDeposit;
