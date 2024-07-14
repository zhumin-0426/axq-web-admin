/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-11-30 17:19:45
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/Bo/datavBo.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../entity.class.js';

const _tableField = {
  stockQuantity: {
    type: 'int',
    default: 0
  },
  stockQuantity: {
    type: 'int',
    default: 0
  },
  categoryDataList:{
    type: 'array',
    default: []
  }
};

class DatavBo extends Entity {
  static _requestConfig = {
    app: 'datav',
    domain: 'datav'
  }

  static _form = {};

  static _options = {}

  constructor (datavBo) {
    super(datavBo, { _tableField });
  }
}

export default DatavBo;

