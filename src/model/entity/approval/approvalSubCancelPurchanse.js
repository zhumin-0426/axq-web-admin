/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-08-10 15:10:05
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/approval/approvalSubCancelPurchanse.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import options from '../../json/options/approval/approvalSubCancelPurchanse';

const _tableField = {

};

class ApprovalSubCancelPurchanse extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'approval'
  }

  static _form = {};

  static _options = options

  constructor (approvalSubCancelPurchanse) {
    super(approvalSubCancelPurchanse, { _tableField });
  }
}

export default ApprovalSubCancelPurchanse;
