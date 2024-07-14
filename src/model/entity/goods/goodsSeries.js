/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-06-02 15:56:49
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/goods/goodsSeries.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/goods/goodsSeries';
import options from '../../json/options/goods/goodsSeries';

const _tableField = {

  name: {
    type: 'string',
    default: ''
  },
  amount: {
    type: 'int',
    default: 0
  },

};

class GoodsSeries extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'goods'
  }

  static _form = form

  static _options = options

  constructor (goodsSeries) {
    super(goodsSeries, { _tableField });
  }
}

export default GoodsSeries;
