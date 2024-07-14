/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2022-05-18 15:55:42
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/member/memberTransfer.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import options from '../../json/options/member/memberTransfer';

const _tableField = {
  status: {
    type:'int',
    default:1
  },
  type: {
    type:'int',
    default:1
  },
  isTransferSubDistributor: {
    type:'int',
    default: 0
  },
  recipient: {
    isEntity: true,
    type: 'Member',
    default: {}
  },
  operator: {
    type: 'Object',
    default: {}
  },
  memberTransferMemberList: {
    isEntity: true,
    type: 'MemberTransferMember',
    default: []
  }
};

class MemberTransfer extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'member'
  }

  static _form = {}

  static _options = options

  constructor (memberTransfer) {
    super(memberTransfer, { _tableField });
  }
}

export default MemberTransfer;
