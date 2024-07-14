/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-22 10:33:11
 * @LastEditTime: 2021-06-09 10:25:22
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/approval/approvalSubDistributorBalanceChange.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/approval/approvalSubDistributorBalanceChange';

const _tableField = {


};

class ApprovalSubDistributorBalanceChange extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'approval'
  }

  static _form = form

  static _options = {}

  constructor (approvalSubDistributorBalanceChange) {
    super(approvalSubDistributorBalanceChange, { _tableField });
  }
}

export default ApprovalSubDistributorBalanceChange;
