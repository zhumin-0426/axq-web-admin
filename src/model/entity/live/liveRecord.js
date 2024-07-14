/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-11-11 09:50:16
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/live/liveRecord.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import _ from 'lodash'
import Entity from '../../entity.class.js';

const _tableField = {
  url: {
    type: 'string',
    default: ''
  }
};
class LiveRecord extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'live'
  }

  static _form = {}

  static _options = {}

  constructor (liveRecord) {
    super(liveRecord, { _tableField });
  }

}

export default LiveRecord;
