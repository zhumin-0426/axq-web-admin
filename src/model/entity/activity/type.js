/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-08-10 15:09:51
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/activity/type.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/activity/activityType';
import options from '../../json/options/activity/activityType';

const _tableField = {
  title: {
    type: 'string',
    default: ''
  },
  description: {
    type: 'string',
    default: ''
  }
};

class ActivityType extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'activity'
  }

  static _form = form;

  static _options = options

  constructor (activityType) {
    super(activityType, { _tableField });
  }
}

export default ActivityType;
