/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-22 10:33:11
 * @LastEditTime: 2021-06-06 19:24:39
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/approval/approvalSubShop.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/approval/approvalSubRefund';

const _tableField = {


};

class ApprovalSubRefund extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'approval'
  }

  static _form = form

  constructor (approvalSubRefund) {
    super(approvalSubRefund, { _tableField });
  }
}

export default ApprovalSubRefund;
