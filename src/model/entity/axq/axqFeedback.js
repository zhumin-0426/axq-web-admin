/*
 * @Author: 码上talk|RC
 * @Date: 2021-01-20 14:09:33
 * @LastEditTime: 2021-08-31 18:05:26
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/axq/axqFeedback.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import options from '../../json/options/axq/axqFeedback';
import excel from '../../json/excel/axqFeedback';

const _tableField = {
  content: {
    type: 'string',
    default: ''
  }
};

class AxqFeedback extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'axq'
  }

  static _form = {}

  static _options = options

  static _excel = excel

  constructor (axqFeedback) {
    super(axqFeedback, { _tableField });
  }
}

export default AxqFeedback;
