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

/**
 *
 * @param {combinationsList}  // 汇店管理 => 拼团列表
 * @param {combinationsLists} //获取拼团详情
 * @param {updateCombination} //拼团活动编辑
 * @param {addCombination} //添加拼团
 * @param {bargainsList} //砍价列表
 * @param {teamList} //活动记录
 * @param {getTypeList} //文章类型
 * @param {articlList} //文章列表
 * @param {articlLists} //获取文章详情deleteTemelate
 * @param {checkList} //文章审核
 * @param {getGoods} //选择商品列表
 * @param {checkDetail} //查看文章内容
 * @param {getBargain} //查看砍价详情
 * @param {deleteArticl} //删除文章
 * @param {updateArticl} //文章上下架
 * @param {addArticlType} //添加文章类型
 * @param {updateArticlType} //修改文章类型
 * @param {deleteArticlType} //删除文章类型
 * @param {checkArticl} //文章审核
 * @param {updateBargain} //修改砍价
 * @param {addBargain} //添加砍价
 * @param {updateBargainSort} //砍价列表顺序
 * @param {updateCombinationSort} //拼团列表顺序
 * @param {getCombinationsCal} //拼团统计
 */

// 获取cps活动
export function getCpsTaoGold(data) {
	return request({
		url: '/mall/v1/mall/getCpsTaoGold',
		method: 'post',
		headers,
		data
	})
}

// 获取cps配置
export function getCpsTaoGoldConfig(data) {
	return request({
		url: '/mall/v1/mall/getCpsTaoGoldConfig',
		method: 'post',
		headers,
		data
	})
}

// 获取cps配置
export function getAlreadyCpsTaoProduct(data) {
	return request({
		url: '/mall/v1/mall/getAlreadyCpsTaoProduct',
		method: 'post',
		headers,
		data
	})
}

// 获取cps配置
export function setCpsTaoGold(data) {
	return request({
		url: '/mall/v1/mall/setCpsTaoGold',
		method: 'post',
		headers,
		data
	})
}


// 获取cps配置
export function getChannelType(data) {
	return request({
		url: '/mall/v1/mall/getChannelType',
		method: 'post',
		headers,
		data
	})
}

// 获取cps配置
export function getYuanType(data) {
	return request({
		url: '/mall/v1/mall/getYuanType',
		method: 'post',
		headers,
		data
	})
}

// 获取cps配置
export function getCampaignType(data) {
	return request({
		url: '/mall/v1/mall/getCampaignType',
		method: 'post',
		headers,
		data
	})
}

// 获取cps配置
export function setCpsTaoGoldConfig(data) {
	return request({
		url: '/mall/v1/mall/setCpsTaoGoldConfig',
		method: 'post',
		headers,
		data
	})
}

export function getCpsTaoProduct(data) {
	return request({
		url: 'mall/v1/mall/getCpsTaoProduct',
		method: 'post',
		headers,
		data
	})
}

//选品
export function getCpsTapProductType(data) {
	return request({
		url: 'mall/v1/mall/getCpsTapProductType',
		method: 'post',
		headers,
		data
	})
}

export function setCpsTaoGoldProduct(data) {
	return request({
	  url: 'mall/v1/mall/setCpsTaoGoldProduct',
	  method: 'post',
	  headers,
	  data
	})
}

export function delAlreadyCpsTaoProduct(data) {
	return request({
	  url: 'mall/v1/mall/delAlreadyCpsTaoProduct',
	  method: 'post',
	  headers,
	  data
	})
}
