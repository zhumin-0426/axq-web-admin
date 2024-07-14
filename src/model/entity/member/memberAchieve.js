/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-08-17 20:16:12
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/member/memberAchieve.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';

const _tableField = {

};

class MemberAchieve extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'member'
  }

  static _form = {}

  static _options = {}

  constructor (memberAchieve) {
    super(memberAchieve, { _tableField });
  }
}

export default MemberAchieve;
