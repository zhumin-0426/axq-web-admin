/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-06-02 16:59:27
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/approval/approvalType.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/approval/approvalType';
import options from '../../json/options/approval/approvalType';

const _tableField = {

  name: {
    type: 'int',
    default: 0
  },
  status: {
    type: 'int',
    default: 0
  },

};

class ApprovalType extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'approval'
  }

  static _form = form;

  static _options = options

  constructor (approvalType) {
    super(approvalType, { _tableField });
  }
}

export default ApprovalType;
