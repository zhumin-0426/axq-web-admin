/*
 * @Author: 码上talk|RC
 * @Date: 2021-01-20 14:09:14
 * @LastEditTime: 2022-04-02 08:50:01
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/axq/axqStaff.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/axq/axqStaff';

const _tableField = {
  deptId: {
    type: 'int',
    default: 0
  },
  jobId: {
    type: 'int',
    default: 0
  },
  username: {
    type: 'string',
    default: ''
  },
  passwd: {
    type: 'string',
    default: ''
  },
  nickname: {
    type: 'string',
    default: ''
  },
  axqJobName: {
    type: 'string',
    default: ''
  },
  accessExtraJson: {
    type: 'object',
    default: {}
  }
};

class AxqStaff extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'axq'
  }

  static _form = form

  static _options = {}

  constructor (axqStaff) {
    super(axqStaff, { _tableField });
  }
}

export default AxqStaff;
