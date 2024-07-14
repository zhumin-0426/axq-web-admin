/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-08-26 14:39:10
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/revert/revertFormGoodsItems.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/revert/revertFormGoodsItems';

const _tableField = {
  goodsItemsId: {
    type: 'int',
    default: 0
  },
  quantity: {
    type: 'int',
    default: 0
  },
  goodsItems: {
    isEntity: true,
    type: 'GoodsItems',
    default: {}
  }
};

class RevertFormGoodsItems extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'revert'
  }

  static _form = form

  static _options = {}

  constructor (revertFormGoodsItems) {
    super(revertFormGoodsItems, { _tableField });
  }
}

export default RevertFormGoodsItems;
