/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-17 20:46:50
 * @LastEditTime: 2021-06-06 19:12:25
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/approval/approvalSubRegionAllocateAgent.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/approval/approvalSubRegionAllocateAgent';
import options from '../../json/options/approval/approvalSubRegionAllocateAgent';

const _tableField = {


};

class ApprovalSubRegionAllocateAgent extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'approval'
  }

  static _form = form

  static _options = options

  constructor (approvalSubRegionAllocateAgent) {
    super(approvalSubRegionAllocateAgent, { _tableField });
  }
}

export default ApprovalSubRegionAllocateAgent;
