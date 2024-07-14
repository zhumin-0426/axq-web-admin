/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2022-05-25 10:02:57
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/member/index.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import options from '../../json/options/member';
import excel from '../../json/excel/member';

const _tableField = {

  isNewDistributor: {
    type: 'int',
    default: 0
  },

  distributorPId: {
    type: 'int',
    default: 0
  },
  type: {
    type: 'int',
    default: 0
  },
  levelId: {
    type: 'int',
    default: 0
  },
  nickname: {
    type: 'string',
    default: ''
  },
  mobile: {
    type: 'string',
    default: ''
  },
  fullAddress: {
    type: 'string',
    default: ''
  },
  inviteCode: {
    type: 'string',
    default: ''
  },
  inviteCodeWxEntry: {
    type: 'string',
    default: ''
  },
  submemberCount: {
    type: 'int',
    default: 0
  },
  birthday: {
    type: 'string',
    default: ''
  },
  memberAccount: {
    type: 'Object',
    default: {}
  },
  memberStatistics: {
    type: 'Object',
    default: {}
  }
};

class Member extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'member'
  }

  static _form = {}

  static _options = options

  static _excel = excel

  get typeStr () {
    return $_.get($_.find(options['type'], x => { return x.value === this.type }), 'label');
  }

  constructor (member) {
    super(member, { _tableField });
  }
}

export default Member;
