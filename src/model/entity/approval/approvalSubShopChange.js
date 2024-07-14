/*
 * @Author: 码上talk|RC
 * @Date: 2022-05-03 15:56:31
 * @LastEditTime: 2022-06-18 15:17:07
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/approval/approvalSubShopChange.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/approval/approvalSubShopChange';
import options from '../../json/options/approval/approvalSubShopChange';

const _tableField = {
  shopOldJson: {
    type: 'string',
    do: {
      parse: true
    },
    default: ''
  },
  shop: {
    isEntity: true,
    type: 'Shop',
    default: {}
  }
};

class ApprovalSubShopChange extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'approval'
  }

  static _form = form

  static _options = options

  constructor (approvalSubShopChange) {
    super(approvalSubShopChange, { _tableField });
  }
}

export default ApprovalSubShopChange;
