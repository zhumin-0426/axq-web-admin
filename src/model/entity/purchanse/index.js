/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-06 19:45:33
 * @LastEditTime: 2021-10-10 10:23:36
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/purchanse/index.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import Entity from '../../entity.class.js';
import form from '../../json/form/purchanse';
import options from '../../json/options/purchanse';

const _tableField = {

	sn: {
		type: 'string',
		default: ''
	},
	type: {
		type: 'int',
		default: 0
	},
	achievePre: {
		type: 'string',
		do: {
			parse: true
		},
		default: ''
	},
	achieveAllocateJson: {
		type: 'string',
		do: {
			parse: true
		},
		default: ''
	},
	achievePDistributorAllocateJson: {
		type: 'string',
		do: {
			parse: true
		},
		default: ''
	},
	achievePDistributorId: {
		type: 'int',
		default: 0
	},
	balancePre: {
		type: 'string',
		do: {
			parse: true
		},
		default: ''
	},
	goodsSeriesPrestorePre: {
		type: 'string',
		do: {
			parse: true
		},
		default: ''
	},
	recipient: {
		type: 'string',
		default: ''
	},
	integralAchieveGive: {
		type: 'int',
		default: 0
	},
	amount: {
		type: 'int',
		default: 0
	},
	amountActual: {
		type: 'int',
		default: 0
	},
	paymentBalanceAmount: {
		type: 'int',
		default: 0
	},
	paymentSixueBalanceAmount: {
		type: 'int',
		default: 0
	},
	paymentGoodsSeriesPrestoreAmount: {
		type: 'int',
		default: 0
	},
	status: {
		type: 'int',
		default: 0
	},
	sysExpress: {
		type: 'object',
		default: {}
	},
	member: {
		isEntity: true,
		type: 'Member',
		default: {}
	},
	paymentGoodsSeriesPrestoreJson: {
		type: 'string',
		do: {
			parse: true
		},
		default: ''
	},
	purchanseGoodsItemsList: {
		isEntity: true,
		type: 'PurchanseGoodsItems',
		default: []
	},
	purchanseGoodsSeriesList: {
		isEntity: true,
		type: 'PurchanseGoodsSeries',
		default: []
	},
	purchanseGiftList: {
		isEntity: true,
		type: 'PurchanseGift',
		default: []
	}
};

class PurchanseStandard extends Entity {
	static _requestConfig = {
		app: 'admin',
		domain: 'purchanse'
	}

	static _form = form

	static _options = options

	get integralNoMinus() {
		const {
			integralAchieveGive,
			purchanseGoodsItemsList
		} = this;
		return integralAchieveGive ? integralAchieveGive : purchanseGoodsItemsList.reduce((p, c) => {
			return p + (c.goodsItems.integralGiveDividend * c.quantity) / c.goodsItems.integralGiveDivisor
		}, 0)
	}

	get paymentStr() {
		const {
			paymentIsUseBalance,
			paymentBalanceAmount,
			paymentIsUseSixueBalance,
			paymentSixueBalanceAmount,
			paymentIsUseGoodsSeriesPrestore,
			paymentGoodsSeriesPrestoreAmount,
			paymentWeixinAmount,
			paymentAlipayAmount,
			paymentBankJson
		} = this._raw;
		const paymentBankArr = paymentBankJson ? JSON.parse(paymentBankJson) : [];
		let l = [];
		if (paymentIsUseBalance) {
			l.push(`余额支付：￥${paymentBalanceAmount}`)
		}
		if (paymentIsUseSixueBalance) {
			l.push(`思雪余额支付：￥${paymentSixueBalanceAmount}`)
		}
		if (paymentIsUseGoodsSeriesPrestore) {
			l.push(`组合支付：￥${paymentGoodsSeriesPrestoreAmount}`)
		}
		if (paymentIsUseGoodsSeriesPrestore) {
			l.push(`组合支付：￥${paymentGoodsSeriesPrestoreAmount}`)
		}
		if (paymentWeixinAmount) {
			l.push(`微信支付：￥${paymentWeixinAmount}`)
		}
		if (paymentAlipayAmount) {
			l.push(`微信支付：￥${paymentAlipayAmount}`)
		}
		if (paymentBankArr.length) {
			paymentBankArr.forEach(i => {
				l.push(`${i.name}：${i.amount}`);
			});
		}
		return l.join('/');
	}

	_getBeforeAchieveStr(isAdd35,noPriceShowIntegral) {
		const achievePDistributorAllocateJson = Array.from($_.get(this, "achievePDistributorAllocateJson", [])),
			achieveAllocateJson = Array.from($_.get(this, "achieveAllocateJson", []));
		let achieveStr = '';
		if (achievePDistributorAllocateJson.length || achieveAllocateJson.length) {
			if (isAdd35 || noPriceShowIntegral) {
				const len = achievePDistributorAllocateJson.length
				achieveStr += achievePDistributorAllocateJson.concat(achieveAllocateJson).reduce((str, i, index) => {
					return str + `\r\n${i.year}年${i.month}月：${i.before} ${ index < len ?`(${this.achievePDistributorId})` : '' }`
				}, '');
			} else {
				achieveStr += achieveAllocateJson.reduce((str, i) => {
					return str + `\r\n${i.year}年${i.month}月：${i.before}`
				}, '')
			}
			return achieveStr || 0;
		}
		return $_.get(this, "achievePre.integral", 0);
	}

	_getAfterAchieveStr(isAdd35,noPriceShowIntegral) {
		const achievePDistributorAllocateJson = Array.from($_.get(this, "achievePDistributorAllocateJson", [])),
			achieveAllocateJson = Array.from($_.get(this, "achieveAllocateJson", []));
		let achieveStr = '';
		if (achievePDistributorAllocateJson.length || achieveAllocateJson.length) {
			if (isAdd35 || noPriceShowIntegral) {
				const len = achievePDistributorAllocateJson.length
				achieveStr += achievePDistributorAllocateJson.concat(achieveAllocateJson).reduce((str, i, index) => {
					return str + `\r\n${i.year}年${i.month}月：${i.after} (${index ? '超出' : '首月'}${i.after - i.before}) ${ index < len ?`(${this.achievePDistributorId})` : '' }`
				}, '');
			} else {
				achieveStr += achieveAllocateJson.reduce((str, i, index) => {
					return str + `\r\n${i.year}年${i.month}月：${i.after} ${!this.achievePDistributorId?`(${index ? '超出' : '首月'}${i.after - i.before})`:''}`
				}, '')
			}
			return achieveStr || 0;
		}
		return $_.get(this, "achievePre.integral", 0) + $_.get(this, "integralAchieveGive", 0)
	}

	constructor(purchanseStandard) {
		super(purchanseStandard, {
			_tableField
		});
	}
}

export default PurchanseStandard;