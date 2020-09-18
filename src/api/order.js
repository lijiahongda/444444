import request from '@/utils/requestKylins'
import {
  authorizationVue
} from '@/utils/authorization'
import store from '@/store'
var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).adminUserId : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')
// const tokenAuth = `Admin ${localstrage}.${localStorage.getItem('token')}`
const headers = {
  'Authorization': tokenAuth
} // 请求头 header Authorization

/**
 *视频分类
 * */
export function getVideoCategory(data) {
  return request({
    url: '/admin/admin/getVideoCategory',
    method: 'post',
    headers,
    data
  })
}

/**
 *添加视频带货
 * */
export function addVideoTakeGoods(data) {
  return request({
    url: '/admin/admin/addVideoTakeGoods',
    method: 'post',
    headers,
    data
  })
}
/**
 *修改视频带货
 * */
export function updVideoTakeGoods(data) {
  return request({
    url: '/admin/admin/updVideoTakeGoods',
    method: 'post',
    headers,
    data
  })
}
/**
 *获取单个视频
 * */
export function getVideoTakeGoods(data) {
  return request({
    url: '/admin/admin/getVideoTakeGoods',
    method: 'post',
    headers,
    data
  })
}

/**
 * 列表接口
 * */
export function getFlightOrderStatus(data) {
  return request({
    url: '/admin/flight/getFlightOrderStatus',
    method: 'get',
    headers,
    data
  })
}

export function getFlightOrderList(data) {
  return request({
    url: '/admin/flight/getFlightOrderList',
    method: 'post',
    headers,
    data
  })
}

export function getOrderPayInfo(data) {
  return request({
    url: '/admin/flight/getOrderPayInfo',
    method: 'post',
    headers,
    data
  })
}

export function getMallOrderInfo(data) {
  return request({
    url: '/mall/v1/mall/getMallOrderInfo',
    method: 'post',
    headers,
    data
  })
}
// 站外订单
export function getPddOrders(data) {
  return request({
    url: '/mall/v1/mall/getPddOrders',
    method: 'post',
    headers,
    data
  })
}

// 贷款订单
export function getPddLoanOrders(data) {
  return request({
    url: '/mall/v1/mall/getPddLoanOrders',
    method: 'post',
    headers,
    data
  })
}
// 站外订单选择类型
export function getOrherOrderSources(data) {
  return request({
    url: '/mall/v1/mall/getOrherOrderSources',
    method: 'post',
    headers,
    data
  })
}
export function updateReceiver(data) {
  return request({
    url: '/mall/v1/mall/updateReceiver',
    method: 'post',
    headers,
    data
  })
}
/**
 * 列表接口
 * */
export function getMallOrders(data) {
  return request({
    url: '/mall/v1/mall/getMallOrders',
    method: 'post',
    headers,
    data
  })
}

export function getOrderGoodsList(data) {
  return request({
    url: '/mall/v1/mall/getOrderGoodsList',
    method: 'post',
    headers,
    data
  })
}

export function getNoSendMallOrders(data) {
  return request({
    url: '/mall/v1/mall/getNoSendMallOrders',
    method: 'post',
    headers,
    data
  })
}
export function getIntegralOrders(data) {
  return request({
    url: '/mall/v1/mall/getIntegralOrders',
    method: 'post',
    headers,
    data
  })
}
export function addLogistice(data) {
  return request({
    url: '/mall/v1/mall/addLogistice',
    method: 'post',
    headers,
    data
  })
}
export function refundLogistice(data) {
  return request({
    url: 'admin/admin/refundOrder',
    method: 'post',
    headers,
    data
  })
}
export function getLogistices(data) {
  return request({
    url: '/mall/v1/mall/getLogistices',
    method: 'post',
    headers,
    data
  })
}
export function getRefundLogistices(data) {
  return request({
    url: '/mall/v1/mall/getRefundLogistices',
    method: 'post',
    headers,
    data
  })
}
export function confirmSend(data) {
  return request({
    url: '/mall/v1/mall/confirmSend',
    method: 'post',
    headers,
    data
  })
}
export function operateInfo(data) {
  return request({
    url: '/mall/order/operateInfo.json',
    method: 'post',
    headers,
    data
  })
}

export function updateOrderGoodsHotelCode(data) {
  return request({
    url: '/mall/v1/mall/updateOrderGoodsHotelCode',
    method: 'post',
    headers,
    data
  })
}

/**
 * 列表接口
 * */
export function getTrainOrders(data) {
  return request({
    url: '/mall/v1/mall/getTrainOrders',
    method: 'post',
    headers,
    data
  })
}

export function getTrainOrderInfo(data) {
  return request({
    url: '/mall/v1/mall/getTrainOrderInfo',
    method: 'post',
    headers,
    data
  })
}
export function checkTrainRefund(data) {
  return request({
    url: '/mall/v1/mall/checkRefund',
    method: 'post',
    headers,
    data
  })
}

export function getRechargeList(data) {
  return request({
    url: '/admin/admin/getRechargeList',
    method: 'post',
    headers,
    data
  })
}
export function checkFlightRefund(data) {
  return request({
    url: '/admin/flight/checkRefund',
    method: 'post',
    headers,
    data
  })
}
export function getVideoRechargeList(data) {
  return request({
    url: '/admin/admin/getVideoRechargeList',
    method: 'post',
    headers,
    data
  })
}
export function getCarRechargeList(data) {
  return request({
    url: '/admin/admin/getCarRechargeList',
    method: 'post',
    headers,
    data
  })
}

export function getCurrentMonthRecharge(data) {
  return request({
    url: '/admin/admin/getCurrentMonthRecharge',
    method: 'post',
    headers,
    data
  })
}

export function getRechargeDetail(data) {
  return request({
    url: '/admin/admin/getRechargeDetail',
    method: 'post',
    headers,
    data
  })
}

export function getVideoMonthRecharge(data) {
  return request({
    url: '/admin/admin/getVideoMonthRecharge',
    method: 'post',
    headers,
    data
  })
}

export function getVideoRechargeDetail(data) {
  return request({
    url: '/admin/admin/getVideoRechargeDetail',
    method: 'post',
    headers,
    data
  })
}

export function getCarMonthRecharge(data) {
  return request({
    url: '/admin/admin/getCarMonthRecharge',
    method: 'post',
    headers,
    data
  })
}

export function getCarRechargeDetail(data) {
  return request({
    url: '/admin/admin/getCarRechargeDetail',
    method: 'post',
    headers,
    data
  })
}

export function getTrainMonthRecharge(data) {
  return request({
    url: '/admin/admin/getTrainMonthRecharge',
    method: 'post',
    headers,
    data
  })
}

export function getTrainRechargeDetail(data) {
  return request({
    url: '/admin/admin/getTrainRechargeDetail',
    method: 'post',
    headers,
    data
  })
}

// 数据统计
export function getDataCount(data) {
  return request({
    url: '/mall/v1/mall/getDataCount',
    method: 'post',
    headers,
    data
  })
}

// 视频带货
export function getTabGoods(data) {
  return request({
    url: '/mall/v1/mall/getTabGoods',
    method: 'post',
    headers,
    data
  })
}

// 删除
export function delVideoTakeGoods(data) {
  return request({
    url: '/admin/admin/delVideoTakeGoods',
    method: 'post',
    headers,
    data
  })
}

export function upSendRemark(data) {
  return request({
    url: '/admin/admin/upSendRemark',
    method: 'post',
    headers,
    data
  })
}

// 广告列表
export function advertList(data) {
  return request({
    url: '/mall/v1/mall/getAdList',
    method: 'post',
    headers,
    data
  })
}
export function detailPersonal(data) {
  return request({
    url: '/mall/v1/mall/getAdDetail',
    method: 'post',
    headers,
    data
  })
}
export function deleteAdvert(data) {
  return request({
    url: '/mall/v1/mall/delAd',
    method: 'post',
    headers,
    data
  })
}
export function categoryList(data) {
  return request({
    url: '/mall/v1/mall/getCategory',
    method: 'post',
    headers,
    data
  })
}
export function save(data) {
  return request({
    url: '/mall/v1/mall/save',
    method: 'post',
    headers,
    data
  })
}
export function upAd(data) {
  return request({
    url: '/mall/v1/mall/upAd',
    method: 'post',
    headers,
    data
  })
}

// 抽奖列表
export function getLotteryList(data) {
  return request({
    url: '/mall/v1/mall/getLotteryList',
    method: 'post',
    headers,
    data
  })
}

// 领券优惠券列表
export function configList(data) {
  return request({
    url: '/mall/coupon/configList',
    method: 'post',
    headers,
    data
  })
}

// 领券优惠券秒杀列表
export function couponpurchaseList(data) {
  return request({
    url: '/mall/coupon/couponpurchaseList',
    method: 'post',
    headers,
    data
  })
}

export function couponpurchaseInfo(data) {
  return request({
    url: '/mall/coupon/couponpurchaseInfo',
    method: 'post',
    headers,
    data
  })
}


export function upCouponpurchaseInfo(data) {
  return request({
    url: '/mall/coupon/upCouponpurchaseInfo',
    method: 'post',
    headers,
    data
  })
}

export function addCouponpurchaseInfo(data) {
  return request({
    url: '/mall/coupon/addCouponpurchaseInfo',
    method: 'post',
    headers,
    data
  })
}


export function delCouponpurchaseInfo(data) {
  return request({
    url: '/mall/coupon/delCouponpurchaseInfo',
    method: 'post',
    headers,
    data
  })
}






// 领券优惠券列表删除
export function deleteCouponCollectionCenter(data) {
  return request({
    url: '/mall/coupon/deleteCouponCollectionCenter',
    method: 'post',
    headers,
    data
  })
}

// 抽奖优惠券列表
export function selectCoupons(data) {
  return request({
    url: '/admin/admin/selectCoupons',
    method: 'post',
    headers,
    data
  })
}

// 抽奖活动列表
export function selectActivities(data) {
  return request({
    url: '/mall/v1/mall/selectActivities',
    method: 'post',
    headers,
    data
  })
}

// 抽奖添加
export function addLottery(data) {
  return request({
    url: '/mall/v1/mall/addLottery',
    method: 'post',
    headers,
    data
  })
}

// 抽奖详情
export function getLottery(data) {
  return request({
    url: '/mall/v1/mall/getLottery',
    method: 'post',
    headers,
    data
  })
}

// 抽奖编辑
export function updateLottery(data) {
  return request({
    url: '/mall/v1/mall/updateLottery',
    method: 'post',
    headers,
    data
  })
}

// 删除奖品
export function deleteLotteryConfig(data) {
  return request({
    url: '/mall/v1/mall/deleteLotteryConfig',
    method: 'post',
    headers,
    data
  })
}

// 创客订单列表
export function orderWorkList(data) {
  return request({
    url: '/mall/order/orderWorkList.json',
    method: 'post',
    headers,
    data
  })
}
/* 悦旅大学二维码列表 */
export function getOrCodeImages(data) {
  return request({
    url: '/admin/admin/getOrCodeImages',
    method: 'post',
    headers,
    data
  })
}
/* 悦旅大学二维码详情 */
export function getOrCodeImage(data) {
  return request({
    url: '/admin/admin/getOrCodeImage',
    method: 'post',
    headers,
    data
  })
}
/* 悦旅大学二维码更新 */
export function upOrCodeImage(data) {
  return request({
    url: '/admin/admin/upOrCodeImage',
    method: 'post',
    headers,
    data
  })
}

// 优惠券标签列表
export function getCouponTags(data) {
  return request({
    url: '/admin/admin/getCouponTags',
    method: 'post',
    headers,
    data
  })
}
export function getCouponTag(data) {
  return request({
    url: '/admin/admin/getCouponTag',
    method: 'post',
    headers,
    data
  })
}
export function addCouponTag(data) {
  return request({
    url: '/admin/admin/addCouponTag',
    method: 'post',
    headers,
    data
  })
}
export function upCouponTag(data) {
  return request({
    url: '/admin/admin/upCouponTag',
    method: 'post',
    headers,
    data
  })
}
export function delCouponTagProctor(data) {
  return request({
    url: '/admin/admin/delCouponTagProctor',
    method: 'post',
    headers,
    data
  })
}

// 发起退款，回去退货信息
export function getRefundAddress(data) {
  return request({
    url: '/admin/admin/getRefundAddress',
    method: 'post',
    headers,
    data
  })
}
// 数据中心商城订单统计
export function getMallOrderStatistics(data) {
  return request({
    url: '/admin/admin/getMallOrderStatistics',
    method: 'post',
    headers,
    data
  })
}
// 搜索
export function getMallOrderStatisticsType(data) {
  return request({
    url: '/admin/admin/getMallOrderStatisticsType',
    method: 'post',
    headers,
    data
  })
}
// 用户订单统计
export function getMallOrderStatisticsByMid(data) {
  return request({
    url: '/admin/admin/getMallOrderStatisticsByMid',
    method: 'post',
    headers,
    data
  })
}
// 商城订单统计供应商
export function getSupplierMenuLists(data) {
  return request({
    url: '/admin/admin/getSupplierMenuLists',
    method: 'post',
    headers,
    data
  })
}
// 商城订单统计详情页面  单个商品统计
export function getMallOrderStatisticsByProductId(data) {
  return request({
    url: '/admin/admin/getMallOrderStatisticsByProductId',
    method: 'post',
    headers,
    data
  })
}
// 关键词 活动列表
export function getActivitieList(data) {
  return request({
    url: '/admin/admin/getActivitiesListBySearch',
    method: 'post',
    headers,
    data
  })
}

// 关键词产品删除
export function delKeywordSearchProduct(data) {
  return request({
    url: '/mall/v1/mall/delKeywordSearchProduct',
    method: 'post',
    headers,
    data
  })
}
// 时间维度商城订单统计
export function getMallOrderStatisticsByHours(data) {
  return request({
    url: '/admin/admin/getMallOrderStatisticsByHours',
    method: 'post',
    headers,
    data
  })
}
// 类目维度商城订单统计
export function getMallOrderStatisticsByCategory(data) {
  return request({
    url: '/admin/admin/getMallOrderStatisticsByCategory',
    method: 'post',
    headers,
    data
  })
}
// 类目维度商城订单统计详情  getMallOrderStatisticsByCategoryOrderGoods
export function getMallOrderStatisticsByCategoryOrderGoods(data) {
  return request({
    url: '/admin/admin/getMallOrderStatisticsByCategoryOrderGoods',
    method: 'post',
    headers,
    data
  })
}
// 时间维度商城订单统计 小时订单详情
export function getMallOrderStatisticsByHoursDetail(data) {
  return request({
    url: '/admin/admin/getMallOrderStatisticsByHoursDetail',
    method: 'post',
    headers,
    data
  })
}
// 获取供应商
export function getSuppliserList(data) {
  return request({
    url: '/admin/admin/getSuppliserList',
    method: 'post',
    headers,
    data
  })
}
// 处理退款完成
export function changeCarRechargeRefundFinish(data) {
  return request({
    url: '/admin/admin/changeCarRechargeRefundFinish',
    method: 'post',
    headers,
    data
  })
}
// 必买图片管理 列表
export function getMustBuyImages(data) {
  return request({
    url: '/admin/admin/getMustBuyImages',
    method: 'post',
    headers,
    data
  })
}
// 必买图片管理 详情
export function getMustBuyImageInfo(data) {
  return request({
    url: '/admin/admin/getMustBuyImageInfo',
    method: 'post',
    headers,
    data
  })
}
// 必买图片管理  添加
export function addMustBuyImage(data) {
  return request({
    url: '/admin/admin/addMustBuyImage',
    method: 'post',
    headers,
    data
  })
}
// 必买图片管理  更新
export function upMustBuyImage(data) {
  return request({
    url: '/admin/admin/upMustBuyImage',
    method: 'post',
    headers,
    data
  })
}
// 必买图片管理  删除
export function delMustBuyImage(data) {
  return request({
    url: '/admin/admin/delMustBuyImage ',
    method: 'post',
    headers,
    data
  })
}


export function getBalanceChargeOrderList(data) {
  return request({
    url: '/admin/admin/getBalanceChargeOrderList',
    method: 'post',
    headers,
    data
  })
}

export function getGropOrderGoods(data) {
  return request({
    url: '/mall/order/getGropOrderGoods.json',
    method: 'post',
    headers,
    data
  })
}

// 新闻版块
// 列表
export function newsList(data) {
  return request({
    url: '/admin/admin/newsList.json',
    method: 'post',
    headers,
    data
  })
}
// /admin/news.json详情
export function news(data) {
  return request({
    url: '/admin/admin/news.json',
    method: 'post',
    headers,
    data
  })
}
// /admin/addNews.json添加
export function addNews(data) {
  return request({
    url: '/admin/admin/addNews.json',
    method: 'post',
    headers,
    data
  })
}
// /admin/upNews.json编辑
export function upNews(data) {
  return request({
    url: '/admin/admin/upNews.json',
    method: 'post',
    headers,
    data
  })
}
// 删除新闻
export function delNews(data) {
  return request({
    url: '/admin/admin/delNews.json',
    method: 'post',
    headers,
    data
  })
}

// 自营交易概览
export function getProprietaryTradingOverview(data) {
  return request({
    url: '/admin/admin/getProprietaryTradingOverview',
    method: 'post',
    headers,
    data
  })
}
// 关键指标
export function getKeyIndicators(data) {
  return request({
    url: '/admin/admin/getKeyIndicators',
    method: 'post',
    headers,
    data
  })
}
// 订单日曲线
export function getOrderCountOverviewByDay(data) {
  return request({
    url: '/admin/admin/getOrderCountOverviewByDay',
    method: 'post',
    headers,
    data
  })
}
//平台用户
export function getMemberCountData(data) {
  return request({
    url: '/admin/admin/getMemberCountData',
    method: 'post',
    headers,
    data
  })
}

//商品销量排行榜
export function getOrderGoodsOverview(data) {
  return request({
    url: '/admin/admin/getOrderGoodsOverview',
    method: 'post',
    headers,
    data
  })
}
//供应商热销排行
export function getOrderGoodsOverviewBySpl(data) {
  return request({
    url: '/admin/admin/getOrderGoodsOverviewBySpl',
    method: 'post',
    headers,
    data
  })
}
//品类排行
export function getOrderGoodsOverviewByCategroy(data) {
  return request({
    url: '/admin/admin/getOrderGoodsOverviewByCategroy',
    method: 'post',
    headers,
    data
  })
}
// 商品概览 
export function getOrderGoodsOverviewByPin(data) {
  return request({
    url: '/admin/admin/getOrderGoodsOverviewByPin',
    method: 'post',
    headers,
    data
  })
}