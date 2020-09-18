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

// 商品分析
export function getProductOrderSum(data) {
	return request({
		url: 'admin/admin/getProductOrderSum',
		method: 'post',
		headers,
		data
	})
}
// 供应商分析
export function getSupplierOrderSum(data) {
	return request({
		url: 'admin/admin/getSupplierOrderSum',
		method: 'post',
		headers,
		data
	})
}
// 供应商分析
export function getOrderStatistics(data) {
	return request({
		url: 'admin/admin/getOrderStatistics',
		method: 'post',
		headers,
		data
	})
}
// gmv构成
export function getGmvByMonthsStatistics(data) {
	return request({
		url: 'admin/admin/getGmvByMonthsStatistics',
		method: 'post',
		headers,
		data
	})
}
