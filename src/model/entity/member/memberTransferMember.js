/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-08-10 15:12:13
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/member/memberTransferMember.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';

const _tableField = {

  member: {
    isEntity: true,
    type: 'Member',
    default: {}
  }
};

class memberTransferMember extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'member'
  }

  static _form = {}

  static _options = {}

  constructor (memberTransferMember) {
    super(memberTransferMember, { _tableField });
  }
}

export default memberTransferMember;
