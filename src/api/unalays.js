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

// 转化率
export function getMemberConversionRate(data) {
	return request({
		url: '/admin/admin/getMemberConversionRate',
		method: 'post',
		headers,
		data
	})
}

// Gmv贡献度
export function getGmvContribution(data) {
	return request({
		url: '/admin/admin/getGmvContribution',
		method: 'post',
		headers,
		data
	})
}

// 活跃度
export function getMemberCountData(data) {
	return request({
		url: '/admin/admin/getActiveUserData',
		method: 'post',
		headers,
		data
	})
}

// 用户多维统计
export function getMemberData(data) {
	return request({
		url: '/admin/admin/getMemberData',
		method: 'post',
		headers,
		data
	})
}

//  供应商占比
export function getSupplierTransactionProportion(data) {
	return request({
		url: '/admin/admin/getSupplierTransactionProportion',
		method: 'post',
		headers,
		data
	})
}

// 类目占比
export function getOrderGoodsOverviewByCategroy(data) {
	return request({
		url: '/admin/admin/getOrderGoodsOverviewByCategroy',
		method: 'post',
		headers,
		data
	})
}

// 渠道占比
export function getOrderGoodsByByPositionFrom(data) {
	return request({
		url: '/admin/admin/getOrderGoodsByByPositionFrom',
		method: 'post',
		headers,
		data
	})
}
// 订单渠道
export function getOrderSources(data) {
	return request({
		url: '/admin/admin/getOrderSources',
		method: 'post',
		headers,
		data
	})
}
// 商品渠道
export function getOrderTypes(data) {
	return request({
		url: '/admin/admin/getOrderTypes',
		method: 'post',
		headers,
		data
	})
}

// 访问  下单  支付 退款转换率
export function getOrderConversionstatistics(data) {
	return request({
		url: '/admin/admin/getOrderConversionstatistics',
		method: 'post',
		headers,
		data
	})
}

// 交易走势 gmv 和订单数
export function getTheOrderTrendByHour(data) {
	return request({
		url: '/admin/admin/getTheOrderTrendByHour',
		method: 'post',
		headers,
		data
	})
}

// 旭日图
export function getGmvStatistics(data) {
	return request({
		url: '/admin/admin/getGmvStatistics',
		method: 'post',
		headers,
		data
	})
}

// 订单分析构成
export function getOrderStatistics(data) {
	return request({
		url: 'admin/admin/getOrderStatistics',
		method: 'post',
		headers,
		data
	})
}

// 满三单
export function getStatisticalUserMonthData(data) {
	return request({
		url: 'admin/admin/getStatisticalUserMonthData',
		method: 'post',
		headers,
		data
	})
}

// 满三单
export function getStatisticalUserDayData(data) {
	return request({
		url: 'admin/admin/getStatisticalUserDayData',
		method: 'post',
		headers,
		data
	})
}