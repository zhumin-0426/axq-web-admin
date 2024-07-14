/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-06-11 13:51:21
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/sys/sysBank.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/sys/sysBank';
import options from '../../json/options/sys/sysBank';

const _tableField = {

  name: {
    type: 'string',
    default: ''
  },

};

class SysBank extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'sys'
  }

  static _form = form

  static _options = options

  constructor (sysbank) {
    super(sysbank, { _tableField });
  }
}

export default SysBank;
