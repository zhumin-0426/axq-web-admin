/*
 * @Author: 码上talk|RC
 * @Date: 2021-09-19 09:16:51
 * @LastEditTime: 2021-09-19 09:16:52
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/region/regionAllocateAgentAgent.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/region/regionAllocateAgent';

const _tableField = {


};

class RegionAllocateAgent extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'region'
  }

  static _form = form

  static _options = {}

  constructor (regionAllocateAgent) {
    super(regionAllocateAgent, { _tableField });
  }
}

export default RegionAllocateAgent;
