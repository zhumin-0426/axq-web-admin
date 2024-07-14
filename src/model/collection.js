/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:29
 * @LastEditTime: 2022-05-07 13:57:14
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/collection.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import DatavBo from './bo/datavBo';
import Goods from './entity/goods';
import GoodsItems from './entity/goods/goodsItems';
import GoodsCategory from './entity/goods/goodsCategory';
import GoodsSpecCategory from './entity/goods/goodsSpecCategory';
import GoodsSpecKey from './entity/goods/goodsSpecKey';
import GoodsSpecValue from './entity/goods/goodsSpecValue';
import GoodsSeries from './entity/goods/goodsSeries';
import StockIn from './entity/stock/stockIn';
import StockInGoodsItems from './entity/stock/stockInGoodsItems';
import StockDelivery from './entity/stock/stockDelivery';
import StockDeliveryGoodsItems from './entity/stock/stockDeliveryGoodsItems';
import StockOut from './entity/stock/stockOut';
import StockOutGoodsItems from './entity/stock/stockOutGoodsItems';
import StockCheck from './entity/stock/stockCheck';
import StockCheckGoodsItems from './entity/stock/stockCheckGoodsItems';
import TraceCode from './entity/trace/traceCode';
import TraceCodeBind from './entity/trace/traceCodeBind';
import TraceCodeBatch from './entity/trace/traceCodeBatch';
import TraceCaptchaBind from './entity/trace/traceCaptchaBind';
import TraceCaptchaBatch from './entity/trace/traceCaptchaBatch';
import TraceLogStockOut from './entity/trace/traceLogStockOut';
import Oss from './entity/oss';
import AxqDept from './entity/axq/axqDept';
import AxqJob from './entity/axq/axqJob';
import AxqStaff from './entity/axq/axqStaff';
import AxqAccessRule from './entity/axq/axqAccessRule';
import AxqVideo from './entity/axq/axqVideo';
import AxqNotice from './entity/axq/axqNotice';
import AxqArticle from './entity/axq/axqArticle';
import AxqIntroduce from './entity/axq/axqIntroduce';
import AxqFeedback from './entity/axq/axqFeedback';
import AxqDevelopTimeline from './entity/axq/axqDevelopTimeline';
import AxqSelfEmployedLaborer from './entity/axq/axqSelfEmployedLaborer';
import AxqMaterial from './entity/axq/axqMaterial';
import AxqContract from './entity/axq/axqContract';
import Member from './entity/member';
import MemberAddress from './entity/member/memberAddress';
import MemberTransfer from './entity/member/memberTransfer';
import MemberTransferMember from './entity/member/memberTransferMember';
import MemberAchieve from './entity/member/memberAchieve';
import MemberAchieveUpdateLog from './entity/member/memberAchieveUpdateLog';
import Shop from './entity/shop';
import ShopDeposit from './entity/shop/shopDeposit';
import Purchanse from './entity/purchanse';
import PurchanseGoodsItems from './entity/purchanse/purchanseGoodsItems';
import PurchanseGoodsSeries from './entity/purchanse/purchanseGoodsSeries';
import PurchanseGift from './entity/purchanse/purchanseGift';
import Approval from './entity/approval';
import ApprovalType from './entity/approval/approvalType';
import ApprovalWorkflow from './entity/approval/approvalWorkflow';
import ApprovalSubRegionAllocateAgent from './entity/approval/approvalSubRegionAllocateAgent';
import ApprovalSubShop from './entity/approval/approvalSubShop';
import ApprovalSubShopChange from './entity/approval/approvalSubShopChange';
import ApprovalSubDistributorBalanceChange from './entity/approval/approvalSubDistributorBalanceChange';
import ApprovalSubCancelPurchanse from './entity/approval/approvalSubCancelPurchanse';
import ApprovalSubShopCcbPay from './entity/approval/approvalSubShopCcbPay';
import ApprovalSubAchieveTransfer from './entity/approval/approvalSubAchieveTransfer';
import ApprovalSubRefund from './entity/approval/approvalSubRefund';
import RegionAllocate from './entity/region/regionAllocate';
import RegionAllocateAgent from './entity/region/regionAllocateAgent';
import RevertForm from './entity/revert/revertForm';
import RevertFormGoodsItems from './entity/revert/revertFormGoodsItems';
import RevertFormSort from './entity/revert/revertFormSort';
import Coupon from './entity/coupon';
import CouponItems from './entity/coupon/couponItems';
import ActivityType from './entity/activity/type';
import SysBank from './entity/sys/sysBank';
import SysExpress from './entity/sys/sysExpress';
import CashRegister from './entity/cashRegister';
import CashRegisterExtScreenMaterial from './entity/cashRegister/cashRegisterExtScreenMaterial';
import MaBanner from './entity/ma/maBanner';
import LogisticsForm from './entity/logistic/logisticsForm';
import LiveRoom from './entity/live/liveRoom';
import LiveRecord from './entity/live/liveRecord';

export default {
  DatavBo,
  Goods,
  GoodsItems,
  GoodsCategory,
  GoodsSpecCategory,
  GoodsSpecKey,
  GoodsSpecValue,
  GoodsSeries,
  StockIn,
  StockInGoodsItems,
  StockDelivery,
  StockDeliveryGoodsItems,
  StockOut,
  StockOutGoodsItems,
  StockCheck,
  StockCheckGoodsItems,
  TraceCode,
  TraceCodeBind,
  TraceCodeBatch,
  TraceCaptchaBind,
  TraceCaptchaBatch,
  TraceLogStockOut,
  Oss,
  AxqDept,
  AxqJob,
  AxqStaff,
  AxqAccessRule,
  AxqVideo,
  AxqNotice,
  AxqArticle,
  AxqIntroduce,
  AxqFeedback,
  AxqDevelopTimeline,
  AxqSelfEmployedLaborer,
  AxqMaterial,
  AxqContract,
  Member,
  MemberAddress,
  MemberTransfer,
  MemberTransferMember,
  MemberAchieve,
  MemberAchieveUpdateLog,
  Shop,
  ShopDeposit,
  Purchanse,
  PurchanseGoodsItems,
  PurchanseGoodsSeries,
  PurchanseGift,
  Approval,
  ApprovalType,
  ApprovalWorkflow,
  ApprovalSubRegionAllocateAgent,
  ApprovalSubShop,
  ApprovalSubShopChange,
  ApprovalSubDistributorBalanceChange,
  ApprovalSubCancelPurchanse,
  ApprovalSubShopCcbPay,
  ApprovalSubAchieveTransfer,
  ApprovalSubRefund,
  RegionAllocate,
  RegionAllocateAgent,
  RevertForm,
  RevertFormGoodsItems,
  RevertFormSort,
  Coupon,
  CouponItems,
  ActivityType,
  SysBank,
  SysExpress,
  CashRegister,
  CashRegisterExtScreenMaterial,
  MaBanner,
  LogisticsForm,
  LiveRoom,
  LiveRecord
};
