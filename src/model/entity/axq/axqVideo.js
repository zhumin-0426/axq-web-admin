/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-08-10 15:11:21
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/axq/axqVideo.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/axq/axqVideo';

const _tableField = {

  title: {
    type: 'string',
    default: ''
  },
  url: {
    type: 'string',
    default: ''
  },
  thumbsUpCount: {
    type: 'int',
    default: 0
  }

};

class AxqVideo extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'axq'
  }

  static _form = form

  static _options = {}

  constructor (axqVideo) {
    super(axqVideo, { _tableField });
  }
}

export default AxqVideo;
