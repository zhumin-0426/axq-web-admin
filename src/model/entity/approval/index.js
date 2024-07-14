/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2022-06-18 15:36:42
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/approval/index.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/approval';
import options from '../../json/options/approval';
import refoundOptions from '../../json/options/approval/approvalSubRefound';
import excel from '../../json/excel/approval';

const _tableField = {

  typeId: {
    type: 'int',
    default: 0
  },
  name: {
    type: 'string',
    default: ''
  },
  workflow: {
    type: 'object',
    default: {}
  }
};

class Approval extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'approval'
  }

  static _form = form;

  static _options = options

  static _refoundOptions = refoundOptions

  static _excel = excel

  constructor (approval) {
    super(approval, { _tableField });
  }
}

export default Approval;
