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

// 商品列表
export function getGoodsList(data) {
	return request({
		url: 'admin/admin/getGoodsList',
		method: 'post',
		headers,
		data
	})
}

// 商品详情
export function goodsInfo(data) {
	return request({
		url: 'admin/admin/goodsInfo',
		method: 'post',
		headers,
		data
	})
}

// 商品数据统计
export function getGoodsCountData(data) {
	return request({
		url: 'admin/admin/getGoodsCountData',
		method: 'post',
		headers,
		data
	})
}

// 动消数
export function getGoodsDong(data) {
	return request({
		url: 'admin/admin/getGoodsDong',
		method: 'post',
		headers,
		data
	})
}