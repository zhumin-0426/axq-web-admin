/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-05-13 11:56:27
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin_v2/src/model/entity/member/memberAddress.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/member/memberAddress';

const _tableField = {

  provinceId: {
    type: 'string',
    default: ''
  },
  cityId: {
    type: 'string',
    default: ''
  },
  districtId: {
    type: 'int',
    default: 0
  }
};

class MemberAddress extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'member'
  }

  static _form = form

  static _options = {}

  constructor (memberAddress) {
    super(memberAddress, { _tableField });
  }
}

export default MemberAddress;
