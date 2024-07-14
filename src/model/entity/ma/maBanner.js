/*
 * @Author: 码上talk|RC
 * @Date: 2021-01-20 14:09:33
 * @LastEditTime: 2021-08-28 08:58:06
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/ma/maBanner.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/ma/maBanner';
import options from '../../json/options/ma/maBanner';

const _tableField = {
  type: {
    type: 'string',
    default: ''
  },
  imgUrl: {
    type: 'string',
    default: ''
  },
  title: {
    type: 'string',
    default: ''
  },
  discription: {
    type: 'string',
    default: ''
  },
  expireTime: {
    type: 'string',
    default: ''
  }
};

class MaBanner extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'ma'
  }

  static _form = form

  static _options = options

  constructor (maBanner) {
    super(maBanner, { _tableField });
  }
}

export default MaBanner;
