/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2022-05-17 13:46:05
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/axq/axqContract.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import options from '../../json/options/axq/axqContract';

const _tableField = {

};

class AxqContract extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'axq'
  }

  static _form = {}

  static _options = options

  constructor (axqContract) {
    super(axqContract, { _tableField });
  }
}

export default AxqContract;
