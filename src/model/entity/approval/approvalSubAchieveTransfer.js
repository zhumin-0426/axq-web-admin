/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-22 10:33:11
 * @LastEditTime: 2021-08-10 15:10:01
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/approval/approvalSubAchieveTransfer.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/approval/approvalSubAchieveTransfer';

const _tableField = {

};

class ApprovalSubAchieveTransfer extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'approval'
  }

  static _form = form

  static _options = {}

  constructor (approvalSubAchieveTransfer) {
    super(approvalSubAchieveTransfer, { _tableField });
  }
}

export default ApprovalSubAchieveTransfer;
