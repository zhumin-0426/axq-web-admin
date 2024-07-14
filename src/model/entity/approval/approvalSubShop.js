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
import form from '../../json/form/approval/approvalSubShop';
import options from '../../json/options/approval/approvalSubShop';

const _tableField = {


};

class ApprovalSubShop extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'approval'
  }

  static _form = form

  static _options = options

  constructor (approvalSubShop) {
    super(approvalSubShop, { _tableField });
  }
}

export default ApprovalSubShop;
