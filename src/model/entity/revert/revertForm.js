/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-08-27 10:58:27
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/revert/revertForm.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

import Entity from '../../entity.class.js';
import form from '../../json/form/revert/revertForm';
import options from '../../json/options/revert/revertForm';

const _tableField = {

  sn: {
    type: 'string',
    default: ''
  },
  status: {
    type: 'int',
    default: 0
  },
  traceJson: {
    type: 'string',
    do: {
      parse: true
    },
    default: ''
  },
  distributor: {
    isEntity: true,
    type: 'Member',
    default: {}
  },
  revertFormGoodsItemsList: {
    isEntity: true,
    type: 'RevertFormGoodsItems',
    default: []
  },
  revertFormSortList: {
    isEntity: true,
    type: 'RevertFormSort',
    default: []
  }
};

class RevertForm extends Entity {
  static _requestConfig = {
    app: 'admin',
    domain: 'revert'
  }

  static _form = form

  static _options = options

  get quantityQualified () {
    return (this.revertFormSortList || []).filter(i => { return i.status === 1 }).reduce((p, c) => { return p + c.quantity }, 0);
  }

  get uniSortByGoodsItemsId () {
    let l = [];
    this.revertFormSortList.forEach(i => {
      const { goodsItemsId, goodsItems, status, quantity } = i;
      const tar = $_.find(l, x => { return x.goodsItems.id === goodsItemsId });
      if (!tar) {
        l.push({
          goodsItems: goodsItems,
          qualified: status === 1 ? quantity : 0,
          unQualified: status === 2 ? quantity : 0
        });
        return;
      }
      tar.qualified = status === 1 ? (tar.qualified + quantity) : tar.qualified;
      tar.unQualified = status === 2 ? (tar.unQualified + quantity) : tar.unQualified
    });
    return l;
  }

  get list2UnQualified () {
    let l = []
    this.revertFormGoodsItemsList.forEach(i => {
      const { goodsItemsId, goodsItems, quantity } = i;
      const tar = $_.find(l, x => { return x.goodsItems.id === goodsItemsId });
      if (!tar) {
        l.push({
          goodsItems: goodsItems,
          qualified: 0,
          unQualified: quantity
        });
        return;
      }
      tar.unQualified = tar.unQualified + quantity;
    });
    return l;
  }

  constructor (revertForm) {
    super(revertForm, { _tableField });
  }

}

export default RevertForm;
