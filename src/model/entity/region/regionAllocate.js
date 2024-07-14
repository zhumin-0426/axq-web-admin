/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-06-30 17:29:55
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/region/regionAllocate.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/region/regionAllocate';
import options from '../../json/options/region/regionAllocate';

const _tableField = {

  provinceName: {
    type: 'string',
    default: ''
  },
  cityName: {
    type: 'string',
    default: ''
  },
  districtName: {
    type: 'string',
    default: ''
  },
  name: {
    type: 'string',
    default: ''
  },
  remark: {
    type: 'string',
    default: ''
  },

};

class RegionAllocate extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'region'
  }

  static _form = form

  static _options = options

  constructor (regionAllocate) {
    super(regionAllocate, { _tableField });
  }
}

export default RegionAllocate;
