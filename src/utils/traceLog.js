/*
 * @Author: 码上talk|RC
 * @Date: 2021-08-25 11:30:20
 * @LastEditTime: 2021-09-19 19:50:29
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/utils/traceLog.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */


const jsonFormat = {
  goodsItemsId: '',
  isV1: 0,
  traceCode: '',
  codeId: '',
  codeBindId: ''
}

class TraceLog {
  type = 1;
  json = []
  jsonMinusTry = []

  _checkISExist (e) {
    const { isV1, sysCode, qrCodeId, codeBindId } = e;
    if (isV1) {
      if (!this.json.map(i => i.traceCode).includes(sysCode)) {
        return false;
      }
    } else {
      if (this.type === 1) {
        if (!this.json.map(i => i.codeId).includes(qrCodeId)) {
          return false;
        }
      } else if ([2, 3, 4, 5, 6, 7, 8].includes(this.type)) {
        if ((codeBindId && !this.json.map(i => i.codeBindId).includes(codeBindId)) && (qrCodeId && !this.json.map(i => i.codeId).includes(qrCodeId))) {
          return false;
        }
      }
    }
    return true;
  }

  setType (t) {
    /**
     * type
     * 1->入库；2->出库；3->店铺入库；4->店铺出库；
     * 5->调换货(合格商品规格清除之前溯源，添加入库溯源信息)；
     * 6->店主调换货（入库类型清除之前店铺入库溯源信息，添加入库店铺库存/溯源）；
     * 7->退货（清除店铺出库信息，入库存）
     * 以上都需要考虑（trace_log_* && trace_code_bind -> status）信息更新
     * 
     */
    this.type = t;
    return this;
  }

  init (j) {
    this.json = j;
  }

  add (e, _extra, config) {
    const { isV1, sysCode, qrCodeId, codeBindId, status, barCode, qrCode, captcha, goodsItems } = e;
    const errorMsg = '溯源码重复';
    let df = $_.cloneDeep(jsonFormat);
    if (_extra) {
      df = Object.assign(df, _extra);
    }
    return new Promise((resolve, reject) => {
      if (config && config.preHook) {
        const { status, msg } = config.preHook(goodsItems,);
        if (!status) {
          reject(msg);
          return;
        }
      }
      if (isV1) {
        if (this.json.map(i => i.traceCode).includes(sysCode)) {
          return;
        }
        this.json.push(Object.assign(df, { isV1, goodsItemsId: goodsItems.id, traceCode: sysCode }));
      } else {
        if (qrCodeId && this.type === 1) {
          if (qrCodeId && this.json.map(i => i.codeId).includes(qrCodeId)) {
            reject(errorMsg);
            return;
          }
          this.json.push(Object.assign(df, { codeId: qrCodeId, goodsItemsId: goodsItems.id }));
        }
        else if (codeBindId && [2, 3, 4, 5, 6, 7].includes(this.type)) {
          if (this.json.map(i => i.codeBindId).includes(codeBindId)) {
            reject(errorMsg);
            return;
          }
          this.json.push(Object.assign(df, { codeBindId, codeId: qrCodeId, goodsItemsId: goodsItems.id }));
        } else if ([8].includes(this.type)) {
          if (codeBindId && this.json.map(i => i.codeBindId).includes(codeBindId)) {
            reject(errorMsg);
            return;
          }
          this.json.push(Object.assign(df, { codeBindId, goodsItemsId: goodsItems.id }));
        }
      }
      resolve({ goodsItems, json: this.json });
    })
  }

  update (e, val) {
    const { isV1, sysCode, codeBindId, goodsItems } = e;
    const errorMsg = '溯源码未录入';
    return new Promise((resolve, reject) => {
      let tar = null;
      let vOld = null;
      if (!this._checkISExist(e)) {
        reject(errorMsg);
        return;
      }
      if (isV1) {
        tar = this.json.find(x => { return x.traceCode === sysCode });
      } else {
        if (this.type === 1) {
        }
        else if (codeBindId && [2, 3, 4, 5, 6, 7, 8].includes(this.type)) {
          tar = this.json.find(x => { return x.codeBindId === codeBindId });
        }
      }
      if (tar) {
        vOld = $_.cloneDeep(tar);
        Object.assign(tar, val);
      }
      resolve({ goodsItems, json: this.json, vNew: tar, vOld });
    })
  }

  minusTry (e) {
    const { isV1, sysCode, qrCodeId, goodsItems } = e;
    const errorMsg = '溯源码未录入';
    return new Promise((resolve, reject) => {
      if (!this._checkISExist(e)) {
        reject(errorMsg);
        return;
      }
      this.jsonMinusTry.push({ isV1, traceCode: sysCode, codeId: qrCodeId, goodsItems });
    })
  }

  minusConfirm (e) {
    return new Promise((resolve) => {
      let minus = [];
      this.json = this.json.filter(x => {
        let b = true;
        if (x.isV1) {
          b = !this.jsonMinusTry.map(i => i.traceCode).includes(x.traceCode);
        } else {
          b = !this.jsonMinusTry.map(i => i.codeId).includes(x.codeId);
        }
        if (!b) {
          minus.push(x);
        }
        return b;
      });
      this.jsonMinusTry = [];
      resolve(minus);
    });
  }

  clear () {
    this.json = [];
    this.jsonMinusTry = [];
  }
}

export default TraceLog