import request from '@/utils/requestKylins'
import {
  authorizationVue
} from '@/utils/authorization'
import store from '@/store'
var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).adminUserId : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')
const headers = {
  'Authorization': tokenAuth
} // 请求头 header Authorization

// 统计供应商维度信息
export function supplier() {
  return request({
    url: '/line/order/supplierCount.json',
    method: 'get',
    headers,
    params: ''
  })
}

// 统计时间维度信息
export function supplierTime(id) {
  return request({
    url: '/line/order/supplierDateCount.json',
    method: 'get',
    headers,
    params: id
  })
}
// 用户统计
export function analysisList(data) {
  return request({
    url: '/member/info/analysis/list.json',
    method: 'post',
    headers,
    data
  })
}

// 酒店数据统计
export function statistics(data) {
  return request({
    url: '/hotel/order/statistics.json',
    method: 'post',
    headers,
    data
  })
}
// 酒店维度统计-城市维度
export function hotelCityStatistics(data) {
  return request({
    url: '/hotel/order/hotelCityStatistics.json',
    method: 'post',
    headers,
    data
  })
}

// 酒店维度统计-酒店维度
export function hotelStatistics(data) {
  return request({
    url: '/hotel/order/hotelStatistics.json',
    method: 'post',
    headers,
    data
  })
}

// 酒店维度统计-渠道维度
export function hotelSourceStatistic(data) {
  return request({
    url: '/hotel/order/hotelSourceStatistic.json',
    method: 'post',
    headers,
    data
  })
}

// 奖金明细
export function bonusList(data) {
  return request({
    url: '/member/info/bonus/list.json',
    method: 'post',
    headers,
    data
  })
}

// 奖金明细
export function cashList(data) {
  return request({
    url: '/member/info/cash/list.json',
    method: 'post',
    headers,
    data
  })
}

// 体现明细
export function newCashList(data) {
  return request({
    url: '/member/info/cash/newList.json',
    method: 'post',
    headers,
    data
  })
}

// 下载体现
export function downNewCashList(data) {
  return request({
    url: '/member/info/cash/downNewCashList.json',
    method: 'post',
    headers,
    data
  })
}

export function passCash(data) {
  return request({
    url: '/member/info/cash/passCash',
    method: 'post',
    headers,
    data
  })
}

export function noPassCash(data) {
  return request({
    url: '/member/info/cash/noPassCash',
    method: 'post',
    headers,
    data
  })
}

export function upStatusToWithdrawal(data) {
  return request({
    url: '/member/info/cash/upStatusToWithdrawal',
    method: 'post',
    headers,
    data
  })
}

export function passCashAll(data) {
  return request({
    url: '/member/info/cash/passCashAll',
    method: 'post',
    headers,
    data
  })
}

export function noPassCashAll(data) {
  return request({
    url: '/member/info/cash/noPassCashAll',
    method: 'post',
    headers,
    data
  })
}

export function exportRefundOrderGoodsList(data) {
  return request({
    url: '/admin/exportRefundOrderGoodsList',
    method: 'get',
    headers,
    params: data
  })
}
// 交易分析接口
export function getOrderTransactionAnalysisType(data) {
  return request({
    url: '/admin/admin/getOrderTransactionAnalysisType',
    method: 'post',
    headers,
    data
  })
}
// 大渠道分析    iosandroid小程序h5
export function getOrderTransactionAnalysisBySource(data) {
  return request({
    url: '/admin/admin/getOrderTransactionAnalysisBySource',
    method: 'post',
    headers,
    data
  })
}
// 流量分析      外部分享内部链接社
export function getOrderTransactionAnalysisByShareFrom(data) {
  return request({
    url: '/admin/admin/getOrderTransactionAnalysisByShareFrom',
    method: 'post',
    headers,
    data
  })
}
// 位置分析   Banner2搜索框3胶囊位
export function getOrderTransactionAnalysisByPositionFrom(data) {
  return request({
    url: '/admin/admin/getOrderTransactionAnalysisByPositionFrom',
    method: 'post',
    headers,
    data
  })
}

export function getOrderTransactionAnalysisByOrderGoods(data) {
  return request({
    url: '/admin/admin/getOrderTransactionAnalysisByOrderGoods',
    method: 'post',
    headers,
    data
  })
}