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

// const headers = {
//   'Authorization': authorizationVue(0)
// } // 请求头 header Authorization
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
 * @param {articlLists} //获取文章详情
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
 * @param {getTabChannels} //获取推广渠道
 * @param {addSeckill} //新增秒杀
 * @param {getSeckill} //获取秒杀详情
 * @param {getSeckills} //获取秒杀列表
 * @param {getCommentList} //获取评论列表
 * @param {dealComment} //审核评论
 * @param {deleteComment} //删除评论
 */
export function updateBargainIsOnline(data) {
	return request({
		url: '/mall/v1/mall/updateBargainIsOnline',
		method: 'POST',
		headers,
		data
	})
}
export function upRecommendGoods(data) {
	return request({
		url: '/admin/admin/upRecommendGoods',
		method: 'POST',
		headers,
		data
	})
}
export function getRecommendGoodsOne(data) {
	return request({
		url: '/admin/admin/getRecommendGoodsOne',
		method: 'POST',
		headers,
		data
	})
}
export function addRecommendGoods(data) {
	return request({
		url: '/admin/admin/addRecommendGoods',
		method: 'POST',
		headers,
		data
	})
}
export function delRecommendGoods(data) {
	return request({
		url: '/admin/admin/delRecommendGoods',
		method: 'POST',
		headers,
		data
	})
}
export function getRecommendGoodsList(data) {
	return request({
		url: '/admin/admin/getRecommendGoodsList',
		method: 'POST',
		headers,
		data
	})
}

export function getTabChannels(data) {
	return request({
		url: '/mall/v1/mall/getTabChannels',
		method: 'get',
		headers
	})
}
export function combinationsList(data) {
	return request({
		url: '/mall/v1/mall/getCombinations',
		method: 'post',
		headers,
		data
	})
}

export function combinationsLists(data) {
	return request({
		url: '/mall/v1/mall/getCombination',
		method: 'get',
		headers,
		params: data
	})
}

export function getBargain(data) {
	return request({
		url: '/mall/v1/mall/getBargain',
		method: 'get',
		headers,
		params: data
	})
}

export function bargainsList(data) {
	return request({
		url: '/mall/v1/mall/getBargains',
		method: 'post',
		headers,
		data
	})
}

export function checkDetail(data) {
	return request({
		url: '/api/article/huidian/getCheckDetail',
		method: 'get',
		headers,
		params: data
	})
}

export function teamList(data) {
	return request({
		url: '/mall/v1/mall/getTeam',
		method: 'post',
		headers,
		data
	})
}

export function getTypeList(data) {
	return request({
		url: '/api/article/type/getTypeList',
		method: 'post',
		headers,
		data
	})
}

export function articlList(data) {
	return request({
		url: '/api/article/huidian/getArticles',
		method: 'post',
		headers,
		data
	})
}

export function articlLists(data) {
	return request({
		url: '/api/article/huidian/getArticle',
		method: 'get',
		headers,
		params: data
	})
}

export function checkList(data) {
	return request({
		url: '/api/article/huidian/getCheckList',
		method: 'post',
		headers,
		data
	})
}

export function tabGoods(data) {
	return request({
		url: '/mall/v1/mall/getTabGoods',
		method: 'post',
		headers,
		data
	})
}
export function getNewTabGoods(data) {
	return request({
		url: '/mall/v1/mall/getNewTabGoods',
		method: 'post',
		headers,
		data
	})
}
//优惠券 模版一
export function yhqTep1(data) {
	return request({
		url: '/mall/v1/mall/couponList',
		method: 'post',
		headers,
		data
	})
}
//优惠券 模版5
export function yhqTep5(data) {
	return request({
		url: '/mall/v1/mall/newEndSearchData3',
		method: 'post',
		headers,
		data
	})
}
//优惠券 模版三 类型
export function yhqType(data) {
	return request({
		url: 'mall/v1/mall/getConfigType',
		method: 'post',
		headers,
		data
	})
}
//优惠券 模版 添加
export function tepaddConfig(data) {
	return request({
		url: '/mall/coupon/addConfig',
		method: 'post',
		headers,
		data
	})
}
//优惠券 模版 回显
export function updateCouponCollectionCenter(data) {
	return request({
		url: '/mall/coupon/updateCouponCollectionCenter',
		method: 'post',
		headers,
		data
	})
}
//优惠券 模版 编辑
export function updateCouponInfo(data) {
	return request({
		url: '/mall/coupon/updateCouponInfo',
		method: 'post',
		headers,
		data
	})
}

export function updateCombination(data) {
	return request({
		url: '/mall/v1/mall/updateCombination',
		method: 'post',
		headers,
		data
	})
}

export function addCombination(data) {
	return request({
		url: '/mall/v1/mall/addCombination',
		method: 'post',
		headers,
		data
	})
}

export function deleteArticl(data) {
	return request({
		url: '/api/article/huidian/deleteArticle',
		method: 'post',
		headers,
		data
	})
}

export function updateState(data) {
	return request({
		url: '/api/article/huidian/updateState',
		method: 'post',
		headers,
		data
	})
}

export function updateArticl(data) {
	return request({
		url: '/api/article/huidian/updateArticle',
		method: 'post',
		headers,
		data
	})
}

export function addArticl(data) {
	return request({
		url: '/api/article/huidian/addArticle',
		method: 'post',
		headers,
		data
	})
}

export function updateArticlType(data) {
	return request({
		url: '/api/article/type/modify',
		method: 'post',
		headers,
		data
	})
}

export function addArticlType(data) {
	return request({
		url: '/api/article/type/create',
		method: 'post',
		headers,
		data
	})
}

export function deleteArticlType(data) {
	return request({
		url: '/api/article/type/delete',
		method: 'post',
		headers,
		data
	})
}

export function checkArticl(data) {
	return request({
		url: '/api/article/huidian/updateCheckResult',
		method: 'post',
		headers,
		data
	})
}

export function updateBargain(data) {
	return request({
		url: '/mall/v1/mall/updateBargain',
		method: 'post',
		headers,
		data
	})
}

export function addBargain(data) {
	return request({
		url: '/mall/v1/mall/addBargain',
		method: 'post',
		headers,
		data
	})
}

export function updateBargainSort(data) {
	return request({
		url: '/mall/v1/mall/updateBargainSort',
		method: 'post',
		headers,
		data
	})
}

export function updateCombinationSort(data) {
	return request({
		url: '/mall/v1/mall/updateCombinationSort',
		method: 'post',
		headers,
		data
	})
}
export function updateDownCombination(data) {
	return request({
		url: '/mall/v1/mall/updateCombinationSort',
		method: 'post',
		headers,
		data
	})
}
export function getCombinationsCal(data) {
	return request({
		url: '/mall/v1/mall/getCombinationsCal',
		method: 'post',
		headers,
		data
	})
}
export function getSeckill(data) {
	return request({
		url: '/mall/v1/mall/getSeckill' + data,
		method: 'get',
		headers
	})
}
export function getSeckills(data) {
	return request({
		url: '/mall/v1/mall/getSeckills',
		method: 'post',
		headers,
		data
	})
}
export function updateSeckill(data) {
	return request({
		url: '/mall/v1/mall/updateSeckill',
		method: 'post',
		headers,
		data
	})
}
export function addSeckill(data) {
	return request({
		url: '/mall/v1/mall/addSeckill',
		method: 'post',
		headers,
		data
	})
}
export function updateSeckillIsOnline(data) {
	return request({
		url: '/mall/v1/mall/updateSeckillIsOnline',
		method: 'post',
		headers,
		data
	})
}
export function deleteSeckillIGood(data) {
	return request({
		url: '/mall/v1/mall/deleteSeckillIGood',
		method: 'post',
		headers,
		data
	})
}
export function addActivitie(data) {
	return request({
		url: '/mall/v1/mall/addActivitie',
		method: 'post',
		headers,
		data
	})
}
export function updateActivitie(data) {
	return request({
		url: '/mall/v1/mall/updateActivitie',
		method: 'post',
		headers,
		data
	})
}
export function getActivitie(data) {
	return request({
		url: '/mall/v1/mall/getActivitie' + data,
		method: 'get',
		headers
	})
}

export function addCpsActivitie(data) {
	return request({
		url: '/mall/v1/mall/addCpsActivitie',
		method: 'post',
		headers,
		data
	})
}
export function updateCpsActivitie(data) {
	return request({
		url: '/mall/v1/mall/updateCpsActivitie',
		method: 'post',
		headers,
		data
	})
}
export function getCpsActivitie(data) {
	return request({
		url: '/mall/v1/mall/getCpsActivitie' + data,
		method: 'get',
		headers
	})
}

export function getActivities(data) {
	return request({
		url: '/mall/v1/mall/getActivities',
		method: 'post',
		headers,
		data
	})
}
export function deleteCpsActivitieGood(data) {
	return request({
		url: '/mall/v1/mall/deleteCpsActivitieGood',
		method: 'post',
		headers,
		data
	})
}
export function deleteActivitieGood(data) {
	return request({
		url: '/mall/v1/mall/deleteActivitieGood',
		method: 'post',
		headers,
		data
	})
}
export function deleteActivities(data) {
	return request({
		url: '/mall/v1/mall/deleteActivities',
		method: 'post',
		headers,
		data
	})
}
export function addIntegralStore(data) {
	return request({
		url: '/mall/v1/mall/addIntegralStore',
		method: 'post',
		headers,
		data
	})
}
export function updateIntegralStore(data) {
	return request({
		url: '/mall/v1/mall/updateIntegralStore',
		method: 'post',
		headers,
		data
	})
}
export function getIntegralStore(data) {
	return request({
		url: '/mall/v1/mall/getIntegralStore' + data,
		method: 'get',
		headers
	})
}
export function getIntegralStores(data) {
	return request({
		url: '/mall/v1/mall/getIntegralStores',
		method: 'post',
		headers,
		data
	})
}
export function updateIntegralStoreIsOnline(data) {
	return request({
		url: '/mall/v1/mall/updateIntegralStoreIsOnline',
		method: 'post',
		headers,
		data
	})
}
export function addDistribution(data) {
	return request({
		url: '/mall/v1/mall/addDistribution',
		method: 'post',
		headers,
		data
	})
}
export function getDistributions(data) {
	return request({
		url: '/mall/v1/mall/getDistributions',
		method: 'post',
		headers,
		data
	})
}
export function updateDistribution(data) {
	return request({
		url: '/mall/v1/mall/updateDistribution',
		method: 'post',
		headers,
		data
	})
}
export function deleteDistribution(data) {
	return request({
		url: '/mall/v1/mall/deleteDistribution',
		method: 'post',
		headers,
		data
	})
}
export function getGoodsDistribution(data) {
	return request({
		url: '/mall/v1/mall/getGoodsDistribution',
		method: 'post',
		headers,
		data
	})
}

// 商城
export function getGoods(data) {
	return request({
		url: '/mall/v1/mall/getGoods',
		method: 'post',
		headers,
		data
	})
}
export function getGoodBaseData(data) {
	return request({
		url: 'mall/v1/mall/getGoodBaseData',
		method: 'get',
		headers,
		data
	})
}
export function updateGood(data) {
	return request({
		url: '/mall/v1/mall/updateGood',
		method: 'post',
		headers,
		data
	})
}
export function addGoodSku(data) {
	return request({
		url: '/mall/v1/mall/addGoodSku',
		method: 'post',
		headers,
		data
	})
}
export function updateGoodSku(data) {
	return request({
		url: '/mall/v1/mall/updateGoodSku',
		method: 'post',
		headers,
		data
	})
}

export function addGoods(data) {
	return request({
		url: 'mall/v1/mall/addGoods',
		method: 'post',
		headers,
		data
	})
}
export function getGood(data) {
	return request({
		url: '/mall/v1/mall/getGood' + data,
		method: 'get',
		headers
	})
}
export function updateIsOnline(data) {
	return request({
		url: '/mall/verification/mall/updateIsOnline',
		method: 'post',
		headers,
		data
	})
}
export function updateIsOnlineAll(data) {
	return request({
		url: '/mall/v1/mall/updateIsOnlineAll',
		method: 'post',
		headers,
		data
	})
}

export function getChannelCategoryList(data) {
	return request({
		url: '/mall/v1/mall/getChannelCategoryList',
		method: 'post',
		headers,
		data
	})
}

// 供应商
export function getSupplier(data) {
	return request({
		url: '/mall/v1/mall/getSupplier',
		method: 'post',
		headers,
		data
	})
}
export function deleteSupplier(data) {
	return request({
		url: '/mall/v1/mall/deleteSupplier',
		method: 'post',
		headers,
		data
	})
}
export function addSupplier(data) {
	return request({
		url: '/mall/v1/mall/addSupplier',
		method: 'post',
		headers,
		data
	})
}
export function updateSupplier(data) {
	return request({
		url: '/mall/v1/mall/updateSupplier',
		method: 'post',
		headers,
		data
	})
}
export function doUpdateSupplier(data) {
	return request({
		url: '/mall/v1/mall/doUpdateSupplier',
		method: 'post',
		headers,
		data
	})
}
export function getSupplierChannelList(data) {
	return request({
		url: '/mall/v1/mall/getSupplierChannelList',
		method: 'post',
		headers,
		data
	})
}
export function getSupplierByChannel(data) {
	return request({
		url: '/mall/v1/mall/getSupplierByChannel',
		method: 'post',
		headers,
		data
	})
}

export function upSupplierPwd(data) {
	return request({
		url: '/mall/v1/mall/upSupplierPwd',
		method: 'post',
		headers,
		data
	})
}

export function addQrCode(data) {
	return request({
		url: '/mall/v1/mall/addQrCode',
		method: 'post',
		headers,
		data
	})
}
export function upQrCode(data) {
	return request({
		url: '/mall/v1/mall/upQrCode',
		method: 'post',
		headers,
		data
	})
}
export function getQrCodes(data) {
	return request({
		url: '/mall/v1/mall/getQrCodes',
		method: 'post',
		headers,
		data
	})
}
export function getCategorys(data) {
	return request({
		url: '/mall/v1/mall/getCategorys',
		method: 'post',
		headers,
		data
	})
}
export function getCategory(data) {
	return request({
		url: '/mall/v1/mall/getCategory',
		method: 'post',
		headers,
		data
	})
}
export function addCategory(data) {
	return request({
		url: '/mall/v1/mall/addCategory',
		method: 'post',
		headers,
		data
	})
}
export function updateCategory(data) {
	return request({
		url: '/mall/v1/mall/updateCategory',
		method: 'post',
		headers,
		data
	})
}
export function deletItemeGoods(data) {
	return request({
		url: '/mall/v1/mall/deletItemeGoods',
		method: 'post',
		headers,
		data
	})
}
export function updateTemplate(data) {
	return request({
		url: '/mall/v1/mall/updateTemplate',
		method: 'post',
		headers,
		data
	})
}

export function getSpecialGoods(data) {
	return request({
		url: '/mall/v1/mall/getSpecialGoods',
		method: 'post',
		headers,
		data
	})
}
export function getSpecialGoodsDetail(data) {
	return request({
		url: '/mall/v1/mall/getSpecialGoodsDetail',
		method: 'post',
		headers,
		data
	})
}
export function addSpecialGoods(data) {
	return request({
		url: '/mall/v1/mall/addSpecialGoods',
		method: 'post',
		headers,
		data
	})
}
export function updateSpecial(data) {
	return request({
		url: '/mall/v1/mall/updateSpecial',
		method: 'post',
		headers,
		data
	})
}
export function deleteSpecialGoods(data) {
	return request({
		url: '/mall/v1/mall/deleteSpecialGoods',
		method: 'post',
		headers,
		data
	})
}

export function addKeywordCate(data) {
	return request({
		url: '/mall/v1/mall/addKeywordCate',
		method: 'post',
		headers,
		data
	})
}
export function getKeywordCates(data) {
	return request({
		url: '/mall/v1/mall/getKeywordCates',
		method: 'post',
		headers,
		data
	})
}
export function getKeywordCate(data) {
	return request({
		url: '/mall/v1/mall/getKeywordCate',
		method: 'post',
		headers,
		data
	})
}
export function updateKeywordCate(data) {
	return request({
		url: '/mall/v1/mall/updateKeywordCate',
		method: 'post',
		headers,
		data
	})
}
export function deleteKeywordCate(data) {
	return request({
		url: '/mall/v1/mall/deleteKeywordCate',
		method: 'post',
		headers,
		data
	})
}
export function addKeyword(data) {
	return request({
		url: '/mall/v1/mall/addKeyword',
		method: 'post',
		headers,
		data
	})
}
export function getKeywords(data) {
	return request({
		url: '/mall/v1/mall/getKeywords',
		method: 'post',
		headers,
		data
	})
}
export function getKeyword(data) {
	return request({
		url: '/mall/v1/mall/getKeyword',
		method: 'post',
		headers,
		data
	})
}
export function updateKeyword(data) {
	return request({
		url: '/mall/v1/mall/updateKeyword',
		method: 'post',
		headers,
		data
	})
}
export function deleteKeyword(data) {
	return request({
		url: '/mall/v1/mall/deleteKeyword',
		method: 'post',
		headers,
		data
	})
}

export function addMaterialCircle(data) {
	return request({
		url: '/admin/admin/addMaterialCircle',
		method: 'post',
		headers,
		data
	})
}

export function getMaterialCircles(data) {
	return request({
		url: '/admin/admin/getMaterialCircles',
		method: 'post',
		headers,
		data
	})
}

export function delMaterialCircle(data) {
	return request({
		url: '/admin/admin/delMaterialCircle',
		method: 'post',
		headers,
		data
	})
}
export function checkMaterialCircle(data) {
	return request({
		url: '/admin/admin/checkMaterialCircle',
		method: 'post',
		headers,
		data
	})
}

export function getMaterialCircle(data) {
	return request({
		url: '/admin/admin/getMaterialCircle',
		method: 'post',
		headers,
		data
	})
}

export function upMaterialCircle(data) {
	return request({
		url: '/admin/admin/upMaterialCircle',
		method: 'post',
		headers,
		data
	})
}

export function getActivitiesCoupons(data) {
	return request({
		url: '/mall/v1/mall/getActivitiesCoupons',
		method: 'post',
		headers,
		data
	})
}

export function getActivitiesCoupon(data) {
	return request({
		url: '/mall/v1/mall/getActivitiesCoupon' + data,
		method: 'get',
		headers
	})
}

export function getCoupons(data) {
	return request({
		url: '/mall/v1/mall/getCoupons',
		method: 'post',
		headers,
		data
	})
}

export function updateActivitiesCoupon(data) {
	return request({
		url: '/mall/v1/mall/updateActivitiesCoupon',
		method: 'post',
		headers,
		data
	})
}

export function addActivitiesCoupon(data) {
	return request({
		url: '/mall/v1/mall/addActivitiesCoupon',
		method: 'post',
		headers,
		data
	})
}

export function deleteCoupons(data) {
	return request({
		url: '/mall/v1/mall/deleteCoupons',
		method: 'post',
		headers,
		data
	})
}

export function addActivityAll(data) {
	return request({
		url: '/mall/v1/mall/addActivityAll',
		method: 'post',
		headers,
		data
	})
}

export function getActivityAlls(data) {
	return request({
		url: '/mall/v1/mall/getActivityAlls',
		method: 'post',
		headers,
		data
	})
}

export function ActiveupdateIsOnline(data) {
	return request({
		url: '/mall/v1/mall/updateActivityIsOnline',
		method: 'post',
		headers,
		data
	})
}

export function updateIsCheck(data) {
	return request({
		url: '/mall/v1/mall/updateIsCheck',
		method: 'post',
		headers,
		data
	})
}
export function updateIsCheckAll(data) {
	return request({
		url: '/mall/v1/mall/updateIsCheckAll',
		method: 'post',
		headers,
		data
	})
}
export function getSeckillTime(data) {
	return request({
		url: '/mall/v1/mall/getSeckillTime',
		method: 'post',
		data: data,
		headers
	})
}

export function getSeckillsLater(data) {
	return request({
		url: '/mall/v1/mall/getSeckillsLater',
		method: 'post',
		data: data,
		headers
	})
}

export function getActivityAllList(data) {
	return request({
		url: '/mall/v1/mall/getActivityAllList',
		method: 'post',
		data: data,
		headers
	})
}

export function upBaseInfo(data) {
	return request({
		url: '/mall/v1/mall/upBaseInfo',
		method: 'post',
		data: data,
		headers
	})
}

export function deleteTemelate(data) {
	return request({
		url: '/mall/v1/mall/deleteTemelate',
		method: 'post',
		data: data,
		headers
	})
}

export function updateTem1(data) {
	return request({
		url: '/mall/v1/mall/updateTem1',
		method: 'post',
		data: data,
		headers
	})
}
export function updateTem2(data) {
	return request({
		url: '/mall/v1/mall/updateTem2',
		method: 'post',
		data: data,
		headers
	})
}

export function updateTem3(data) {
	return request({
		url: '/mall/v1/mall/updateTem3',
		method: 'post',
		data: data,
		headers
	})
}

export function updateTem4(data) {
	return request({
		url: '/mall/v1/mall/updateTem4',
		method: 'post',
		data: data,
		headers
	})
}

export function getChannelList(data) {
	return request({
		url: '/mall/v1/mall/getChannelList',
		method: 'post',
		data: data,
		headers
	})
}

export function getCommentList(data) {
	return request({
		url: '/mall/v1/mall/getCommentList',
		method: 'post',
		headers,
		data
	})
}

export function dealComment(data) {
	return request({
		url: '/mall/v1/mall/dealComment',
		method: 'post',
		headers,
		data
	})
}

export function deleteComment(data) {
	return request({
		url: '/mall/v1/mall/deleteComment',
		method: 'post',
		headers,
		data
	})
}

export function getTemplete1Info(data) {
	return request({
		url: '/mall/v1/mall/getTemplete1Info',
		method: 'post',
		headers,
		data
	})
}

export function getTemplete3Info(data) {
	return request({
		url: '/mall/v1/mall/getTemplete3Info',
		method: 'post',
		headers,
		data
	})
}

export function getTemplete4Info(data) {
	return request({
		url: '/mall/v1/mall/getTemplete4Info',
		method: 'post',
		headers,
		data
	})
}

export function addTem5(data) {
	return request({
		url: '/mall/v1/mall/addTem5',
		method: 'post',
		headers,
		data
	})
}

export function upTem5(data) {
	return request({
		url: '/mall/v1/mall/upTem5',
		method: 'post',
		headers,
		data
	})
}

export function getTemplete5Info(data) {
	return request({
		url: '/mall/v1/mall/getTemplete5Info',
		method: 'post',
		headers,
		data
	})
}

export function addTem1(data) {
	return request({
		url: '/mall/v1/mall/addTem1',
		method: 'post',
		headers,
		data
	})
}

export function addTem2(data) {
	return request({
		url: '/mall/v1/mall/addTem2',
		method: 'post',
		headers,
		data
	})
}

export function addTem3(data) {
	return request({
		url: '/mall/v1/mall/addTem3',
		method: 'post',
		headers,
		data
	})
}
export function addTem8(data) {
	return request({
		url: '/mall/v1/mall/addTem8',
		method: 'post',
		headers,
		data
	})
}

export function addTem4(data) {
	return request({
		url: '/mall/v1/mall/addTem4',
		method: 'post',
		headers,
		data
	})
}

export function addTem6(data) {
	return request({
		url: '/mall/v1/mall/addTem6',
		method: 'post',
		headers,
		data
	})
}

export function getTemplete6Info(data) {
	return request({
		url: '/mall/v1/mall/getTemplete6Info',
		method: 'post',
		headers,
		data
	})
}
export function getTemplete8Info(data) {
	return request({
		url: '/mall/v1/mall/getTemplete8Info',
		method: 'post',
		headers,
		data
	})
}
export function updateTem8(data) {
	return request({
		url: '/mall/v1/mall/updateTem8',
		method: 'post',
		headers,
		data
	})
}

export function updateTem6(data) {
	return request({
		url: '/mall/v1/mall/updateTem6',
		method: 'post',
		headers,
		data
	})
}

export function getMemberIdentifys(data) {
	return request({
		url: 'member/getMemberIdentifys',
		method: 'post',
		headers,
		data
	})
}
export function getMemberIdentify(data) {
	return request({
		url: 'member/getMemberIdentify',
		method: 'post',
		headers,
		data
	})
}

export function upMemberIdentify(data) {
	return request({
		url: 'member/upMemberIdentify',
		method: 'post',
		headers,
		data
	})
}

export function getBrandList(data) {
	return request({
		url: 'mall/v1/mall/getBrandList',
		method: 'post',
		headers,
		data
	})
}

export function noPassCenterGoods(data) {
	return request({
		url: 'mall/v1/mall/noPassCenterGoods',
		method: 'post',
		headers,
		data
	})
}

// 商城end
export function addComment(data) {
	return request({
		url: 'mall/v1/mall/addComment',
		method: 'post',
		headers,
		data
	})
}

// 直播活动列表
export function getLiveEventsList(data) {
	return request({
		url: '/mall/v1/mall/getLiveEventsList',
		method: 'post',
		headers,
		data
	})
}
// 新增直播活动
export function addLiveEvents(data) {
	return request({
		url: '/mall/v1/mall/addLiveEvents',
		method: 'post',
		headers,
		data
	})
}
// 直播活动详情
export function getLiveEvents(data) {
	return request({
		url: '/mall/v1/mall/getLiveEvents',
		method: 'post',
		headers,
		data
	})
}
// 直播活动编辑
export function updateLiveEvents(data) {
	return request({
		url: '/mall/v1/mall/updateLiveEvents',
		method: 'post',
		headers,
		data
	})
}
// 直播活动上下架
export function updateLiveEventsIsOnline(data) {
	return request({
		url: '/mall/v1/mall/updateLiveEventsIsOnline',
		method: 'post',
		headers,
		data
	})
}
// 直播活动商品删除
export function deleteLiveEventsGood(data) {
	return request({
		url: '/mall/v1/mall/deleteLiveEventsGood',
		method: 'post',
		headers,
		data
	})
}
// 修改商品价格
export function updateLiveEventsGoodsPrice(data) {
	return request({
		url: '/mall/v1/mall/updateLiveEventsGoodsPrice',
		method: 'post',
		headers,
		data
	})
}
// 直播获取互联商品
export function getLiveEventsGoods(data) {
	return request({
		url: '/mall/v1/mall/getLiveEventsGoods',
		method: 'post',
		headers,
		data
	})
}
// 直播活动列表删除
export function deleteLiveEvents(data) {
	return request({
		url: '/mall/v1/mall/deleteLiveEvents',
		method: 'post',
		headers,
		data
	})
}
export function upProductShareContent(data) {
	return request({
		url: '/mall/v1/mall/upProductShareContent',
		method: 'post',
		headers,
		data
	})
}
export function getProductShareContent(data) {
	return request({
		url: '/mall/v1/mall/getProductShareContent',
		method: 'post',
		headers,
		data
	})
}
export function getLiveWinnerList(data) {
	return request({
		url: '/mall/v1/mall/getLiveWinnerList',
		method: 'post',
		headers,
		data
	})
}
export function updLiveWinnerPrizeName(data) {
	return request({
		url: '/mall/v1/mall/updLiveWinnerPrizeName',
		method: 'post',
		headers,
		data
	})
}

/** ----------icon管理------------*/
// 列表
export function getAPPBottomIcons(data) {
	return request({
		url: '/mall/v1/mall/getAPPBottomIcons',
		method: 'post',
		headers,
		data
	})
}
// 新增
export function addAPPBottomIcon(data) {
	return request({
		url: '/mall/v1/mall/addAPPBottomIcon',
		method: 'post',
		headers,
		data
	})
}
// 编辑
export function upAPPBottomIcon(data) {
	return request({
		url: '/mall/v1/mall/upAPPBottomIcon',
		method: 'post',
		headers,
		data
	})
}
// 详情
export function getAPPBottomIconInfo(data) {
	return request({
		url: '/mall/v1/mall/getAPPBottomIconInfo',
		method: 'post',
		headers,
		data
	})
}

/** ***************直播爆品******************/
// 列表
export function getLiveSellWellList(data) {
	return request({
		url: '/mall/v1/mall/getLiveSellWellList',
		method: 'post',
		headers,
		data
	})
}
// 详情
export function getLiveSellWell(data) {
	return request({
		url: '/mall/v1/mall/getLiveSellWell',
		method: 'post',
		headers,
		data
	})
}
// 新增
export function addLiveSellWell(data) {
	return request({
		url: '/mall/v1/mall/addLiveSellWell',
		method: 'post',
		headers,
		data
	})
}
// 编辑
export function updateLiveSellWell(data) {
	return request({
		url: '/mall/v1/mall/updateLiveSellWell',
		method: 'post',
		headers,
		data
	})
}
// 查看预约人
export function getLiveSellWellGoodsExt(data) {
	return request({
		url: '/mall/v1/mall/getLiveSellWellGoodsExt',
		method: 'post',
		headers,
		data
	})
}
// 查看预约人
export function getTabAllGoods(data) {
	return request({
		url: '/mall/v1/mall/getTabAllGoods',
		method: 'post',
		headers,
		data
	})
}
// 直播banner列表
export function getLiveBannerList(data) {
	return request({
		url: '/mall/v1/mall/getLiveBannerList',
		method: 'post',
		headers,
		data
	})
}
export function addLiveBanner(data) {
	return request({
		url: '/mall/v1/mall/addLiveBanner',
		method: 'post',
		headers,
		data
	})
}
export function updLiveBanner(data) {
	return request({
		url: '/mall/v1/mall/updLiveBanner',
		method: 'post',
		headers,
		data
	})
}
export function delLiveBanner(data) {
	return request({
		url: '/mall/v1/mall/delLiveBanner',
		method: 'post',
		headers,
		data
	})
}
export function getLiveBannerInfo(data) {
	return request({
		url: '/mall/v1/mall/getLiveBannerInfo',
		method: 'post',
		headers,
		data
	})
}
/** ***************主题******************/
// 列表
export function getTopConfigurationList(data) {
	return request({
		url: '/mall/v1/mall/getTopConfigurationList',
		method: 'post',
		headers,
		data
	})
}
// 详情
export function getTopConfigurationInfo(data) {
	return request({
		url: '/mall/v1/mall/getTopConfigurationInfo',
		method: 'post',
		headers,
		data
	})
}
// 新增
export function addTopConfiguration(data) {
	return request({
		url: '/mall/v1/mall/addTopConfiguration',
		method: 'post',
		headers,
		data
	})
}
// 编辑
export function updTopConfiguration(data) {
	return request({
		url: '/mall/v1/mall/updTopConfiguration',
		method: 'post',
		headers,
		data
	})
}

// 预约送礼
// 列表
export function getApActivityList(data) {
	return request({
		url: '/mall/v1/mall/getApActivityList',
		method: 'post',
		headers,
		data
	})
}
// 新增
export function addApActivity(data) {
	return request({
		url: '/mall/v1/mall/addApActivity',
		method: 'post',
		headers,
		data
	})
}
// 详情
export function getApActivity(data) {
	return request({
		url: '/mall/v1/mall/getApActivity',
		method: 'post',
		headers,
		data
	})
}
// 编辑
export function updateApActivity(data) {
	return request({
		url: '/mall/v1/mall/updateApActivity',
		method: 'post',
		headers,
		data
	})
}
// 删除商品
export function deleteApActivity(data) {
	return request({
		url: '/mall/v1/mall/deleteApActivity',
		method: 'post',
		headers,
		data
	})
}

// 综合活动管理删除商品
export function delTemExtInfo(data) {
	return request({
		url: '/mall/v1/mall/delTemExtInfo',
		method: 'post',
		headers,
		data
	})
}
// 商品分类
export function getFirstCategorys(data) {
	return request({
		url: '/mall/v1/mall/getFirstCategorys',
		method: 'post',
		headers,
		data
	})
}

// 优惠卷分享添加
export function addshareCoupon(data) {
	return request({
		url: '/mall/v1/mall/addCouponShare',
		method: 'post',
		headers,
		data
	})
}
// 优惠卷编辑
export function upshareCoupon(data) {
	return request({
		url: '/mall/v1/mall/updateCouponShare',
		method: 'post',
		headers,
		data
	})
}
// 优惠卷删除
export function deleteCouponShares(data) {
	return request({
		url: '/mall/v1/mall/deleteCouponShares',
		method: 'post',
		headers,
		data
	})
}
// 火球单个优惠卷
export function getCouponShares(data) {
	return request({
		url: '/mall/v1/mall/getCouponShare',
		method: 'post',
		headers,
		data
	})
}

// 获取优惠卷列表
export function getshareList(data) {
	return request({
		url: '/mall/v1/mall/getCouponShares',
		method: 'post',
		headers,
		data
	})
}
// 优惠卷列表 活动是否开启
export function updateCouponShareIsOnline(data) {
	return request({
		url: '/mall/v1/mall/updateCouponShareIsOnline',
		method: 'post',
		headers,
		data
	})
}

// 活动所有背景图接口
export function getTemBgsByActAllId(data) {
	return request({
		url: '/mall/v1/mall/getTemBgsByActAllId',
		method: 'post',
		headers,
		data
	})
}
export function addTemBg(data) {
	return request({
		url: '/mall/v1/mall/addTemBg',
		method: 'post',
		headers,
		data
	})
}
export function delTemBg(data) {
	return request({
		url: '/mall/v1/mall/delTemBg',
		method: 'post',
		headers,
		data
	})
}

export function recoveryTemBg(data) {
	return request({
		url: '/mall/v1/mall/recoveryTemBg',
		method: 'post',
		headers,
		data
	})
}

export function upTemBg(data) {
	return request({
		url: '/mall/v1/mall/upTemBg',
		method: 'post',
		headers,
		data
	})
}
export function getTemBg(data) {
	return request({
		url: '/mall/v1/mall/getTemBg',
		method: 'post',
		headers,
		data
	})
}

/**
 * 活动标签管理
 * */
export function getActivitiesTagList(data) {
	return request({
		url: '/mall/v1/mall/getActivitiesTagList',
		method: 'post',
		headers,
		data
	})
}
export function getActivitiesTag(data) {
	return request({
		url: '/mall/v1/mall/getActivitiesTag',
		method: 'post',
		headers,
		data
	})
}
export function addActivitiesTag(data) {
	return request({
		url: '/mall/v1/mall/addActivitiesTag',
		method: 'post',
		headers,
		data
	})
}
export function delActivitiesTag(data) {
	return request({
		url: '/mall/v1/mall/delActivitiesTag',
		method: 'post',
		headers,
		data
	})
}
export function upActivitiesTag(data) {
	return request({
		url: '/mall/v1/mall/upActivitiesTag',
		method: 'post',
		headers,
		data
	})
}
export function getActivitiesTags(data) {
	return request({
		url: '/mall/v1/mall/getActivitiesTags',
		method: 'post',
		headers,
		data
	})
}

/** 一分钱活动*/
export function getLotteryDraws(data) {
	return request({
		url: '/admin/admin/getLotteryDraws',
		method: 'post',
		headers,
		data
	})
}
export function getLotteryDraw(data) {
	return request({
		url: '/admin/admin/getLotteryDraw',
		method: 'post',
		headers,
		data
	})
}
export function addLotteryDraw(data) {
	return request({
		url: '/admin/admin/addLotteryDraw',
		method: 'post',
		headers,
		data
	})
}
export function upLotteryDraw(data) {
	return request({
		url: '/admin/admin/upLotteryDraw',
		method: 'post',
		headers,
		data
	})
}

export function getLotteryDrawProducts(data) {
	return request({
		url: '/admin/admin/getLotteryDrawProducts',
		method: 'post',
		headers,
		data
	})
}
export function getLotteryDrawProduct(data) {
	return request({
		url: '/admin/admin/getLotteryDrawProduct',
		method: 'post',
		headers,
		data
	})
}
export function addLotteryDrawProduct(data) {
	return request({
		url: '/admin/admin/addLotteryDrawProduct',
		method: 'post',
		headers,
		data
	})
}
export function upLotteryDrawProduct(data) {
	return request({
		url: '/admin/admin/upLotteryDrawProduct',
		method: 'post',
		headers,
		data
	})
}
export function delLotteryDrawProduct(data) {
	return request({
		url: '/admin/admin/delLotteryDrawProduct',
		method: 'post',
		headers,
		data
	})
}
export function upLotteryDrawProductOnline(data) {
	return request({
		url: '/admin/admin/upLotteryDrawProductOnline',
		method: 'post',
		headers,
		data
	})
}

export function getLotteryDrawPrizes(data) {
	return request({
		url: '/admin/admin/getLotteryDrawPrizes',
		method: 'post',
		headers,
		data
	})
}

export function upIsPrize(data) {
	return request({
		url: '/admin/admin/upIsPrize',
		method: 'post',
		headers,
		data
	})
}

export function delLotteryDraw(data) {
	return request({
		url: '/admin/admin/delLotteryDraw',
		method: 'post',
		headers,
		data
	})
}
export function getSkuTabGoods(data) {
	return request({
		url: '/mall/v1/mall/getSkuTabGoods',
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


/** *****************************************推荐活动*************************************************************************************/
export function getRecommendActivities(data) {
	return request({
		url: '/admin/admin/getRecommendActivities',
		method: 'post',
		headers,
		data
	})
}
export function addRecommendActivityInfo(data) {
	return request({
		url: '/admin/admin/addRecommendActivityInfo',
		method: 'post',
		headers,
		data
	})
}
export function upRecommendActivityInfo(data) {
	return request({
		url: '/admin/admin/upRecommendActivityInfo',
		method: 'post',
		headers,
		data
	})
}
/** *****************************************用户链路*************************************************************************************/
export function getMemberLinkCouponList(data) {
	return request({
		url: '/admin/admin/getMemberLinkCouponList',
		method: 'post',
		headers,
		data
	})
}
export function getMemberLinkCoupon(data) {
	return request({
		url: '/admin/admin/getMemberLinkCoupon',
		method: 'post',
		headers,
		data
	})
}
export function addMemberLinkCoupon(data) {
	return request({
		url: '/admin/admin/addMemberLinkCoupon',
		method: 'post',
		headers,
		data
	})
}
export function upMemberLinkCoupon(data) {
	return request({
		url: '/admin/admin/upMemberLinkCoupon',
		method: 'post',
		headers,
		data
	})
}
/** *****************************************机器人消息管理*************************************************************************************/
export function getCommunitySendInfos(data) {
	return request({
		url: '/admin/admin/getCommunitySendInfos',
		method: 'post',
		headers,
		data
	})
}
export function getCommunitySendInfo(data) {
	return request({
		url: '/admin/admin/getCommunitySendInfo',
		method: 'post',
		headers,
		data
	})
}
export function addCommunitySendInfo(data) {
	return request({
		url: '/admin/admin/addCommunitySendInfo',
		method: 'post',
		headers,
		data
	})
}
export function upCommunitySendInfo(data) {
	return request({
		url: '/admin/admin/upCommunitySendInfo',
		method: 'post',
		headers,
		data
	})
}
export function delCommunitySendInfo(data) {
	return request({
		url: '/admin/admin/delCommunitySendInfo',
		method: 'post',
		headers,
		data
	})
}
/** *****************************************社群攻略管理*************************************************************************************/
export function addStrategyCategory(data) {
	return request({
		url: '/admin/admin/addStrategyCategory',
		method: 'post',
		headers,
		data
	})
}
export function getStrategyCategoryList(data) {
	return request({
		url: '/admin/admin/getStrategyCategoryList',
		method: 'post',
		headers,
		data
	})
}
export function addStrategyArticle(data) {
	return request({
		url: '/admin/admin/addStrategyArticle',
		method: 'post',
		headers,
		data
	})
}
export function getStrategyArticleList(data) {
	return request({
		url: '/admin/admin/getStrategyArticleList',
		method: 'post',
		headers,
		data
	})
}
export function getStrategyArticle(data) {
	return request({
		url: '/admin/admin/getStrategyArticle',
		method: 'post',
		headers,
		data
	})
}
export function updateStrategyArticle(data) {
	return request({
		url: '/admin/admin/updateStrategyArticle',
		method: 'post',
		headers,
		data
	})
}
/** *****************************************充值配置项接口*************************************************************************************/
export function getBalanceList(data) {
	return request({
		url: '/admin/admin/getBalanceList',
		method: 'post',
		headers,
		data
	})
}
export function addBalance(data) {
	return request({
		url: '/admin/admin/addBalance',
		method: 'post',
		headers,
		data
	})
}
export function getBalanceInfo(data) {
	return request({
		url: '/admin/admin/getBalanceInfo',
		method: 'post',
		headers,
		data
	})
}
export function upBalance(data) {
	return request({
		url: '/admin/admin/upBalance',
		method: 'post',
		headers,
		data
	})
}
export function delBalance(data) {
	return request({
		url: '/admin/admin/delBalance',
		method: 'post',
		headers,
		data
	})
}
/** *****************************************微信群审核接口*************************************************************************************/
export function getCommunityInvitationGroupList(data) {
	return request({
		url: '/admin/admin/getCommunityInvitationGroupList',
		method: 'post',
		headers,
		data
	})
}
export function getCommunityInvitationGroupInfo(data) {
	return request({
		url: '/admin/admin/getCommunityInvitationGroupInfo',
		method: 'post',
		headers,
		data
	})
}
export function checkCommunityInvitationGroup(data) {
	return request({
		url: '/admin/admin/checkCommunityInvitationGroup',
		method: 'post',
		headers,
		data
	})
}
/** *****************************************直播配品*************************************************************************************/
export function getExclusiveLiveList(data) {
	return request({
		url: '/mall/v1/mall/getLiveNewEventsList',
		method: 'post',
		headers,
		data
	})
}

export function getLiveDetail(data) {
	return request({
		url: '/mall/v1/mall/getLiveNewEvents',
		method: 'post',
		headers,
		data
	})
}
export function getSkuTabGoodsLive(data) {
	return request({
		url: '/mall/v1/mall/getSkuTabGoods',
		method: 'post',
		headers,
		data
	})
}

// 直播活动上下架
export function updateLiveNewEventsIsOnline(data) {
	return request({
		url: '/mall/v1/mall/updateLiveNewEventsIsOnline',
		method: 'post',
		headers,
		data
	})
}
/*添加*/
export function modifyLive(data) {
	return request({
		url: '/mall/v1/mall/addLiveNewEvents',
		method: 'post',
		headers,
		data
	})
}
/*更新 */
export function updateLive(data) {
	return request({
		url: '/mall/v1/mall/updateLiveNewEvents',
		method: 'post',
		headers,
		data
	})
}

export function deleteLiveGoods(data) {
	return request({
		url: '/mall/v1/mall/deleteLiveNewEventsGood',
		method: 'post',
		headers,
		data
	})
}
/** *****************************************回放管理接口*************************************************************************************/
export function playbackList(data) {
	return request({
		url: '/mall/v1/mall/video/list',
		method: 'get',
		headers,
		params: data
	})
}
export function playbackDesc(data) {
	return request({
		url: '/mall/v1/mall/video/desc',
		method: 'post',
		headers,
		data
	})
}
export function playbackEdit(data) {
	return request({
		url: '/mall/v1/mall/video/edit',
		method: 'post',
		headers,
		data
	})
}
export function playbackDel(data) {
	return request({
		url: '/mall/v1/mall/video/del',
		method: 'post',
		headers,
		data
	})
}
/** *****************************************版本控制*************************************************************************************/
export function getversionList(data) {
	return request({
		url: '/mall/v1/mall/versionList',
		method: 'post',
		headers,
		params: data
	})
}
export function addversion(data) {
	return request({
		url: '/mall/v1/mall/addVersion',
		method: 'post',
		headers,
		data
	})
}
export function updateversion(data) {
	return request({
		url: '/mall/v1/mall/editVersion',
		method: 'post',
		headers,
		data
	})
}
export function getversionetail(data) {
	return request({
		url: '/mall/v1/mall/versionInfo',
		method: 'post',
		headers,
		data
	})
}


export function getOfficialMembers(data) {
	return request({
		url: '/admin/admin/getOfficialMembers',
		method: 'post',
		headers,
		data
	})
}

export function delOfficialMember(data) {
	return request({
		url: '/admin/admin/delOfficialMember',
		method: 'post',
		headers,
		data
	})
}

export function getOfficialMember(data) {
	return request({
		url: '/admin/admin/getOfficialMember',
		method: 'post',
		headers,
		data
	})
}

export function upOfficialMember(data) {
	return request({
		url: '/admin/admin/upOfficialMember',
		method: 'post',
		headers,
		data
	})
}

export function addOfficialMember(data) {
	return request({
		url: '/admin/admin/addOfficialMember',
		method: 'post',
		headers,
		data
	})
}


// Appicon  编辑 跳转类型
export function getJumpTypes(data) {
	return request({
		url: '/mall/v1/mall/getJumpTypes',
		method: 'post',
		headers,
		data
	})
}

// Appicon  删除
export function delAPPBottomIcon(data) {
	return request({
		url: '/mall/v1/mall/delAPPBottomIcon ',
		method: 'post',
		headers,
		data
	})
}


export function getCouponBounceds(data) {
	return request({
		url: '/admin/admin/getCouponBounceds',
		method: 'POST',
		headers,
		data
	})
}

export function getCouponBounced(data) {
	return request({
		url: '/admin/admin/getCouponBounced',
		method: 'POST',
		headers,
		data
	})
}

export function upCouponBouncedIsShow(data) {
	return request({
		url: '/admin/admin/upCouponBouncedIsShow',
		method: 'POST',
		headers,
		data
	})
}

export function addCouponBounced(data) {
	return request({
		url: '/admin/admin/addCouponBounced',
		method: 'POST',
		headers,
		data
	})
}


export function upCouponBounced(data) {
	return request({
		url: '/admin/admin/upCouponBounced',
		method: 'POST',
		headers,
		data
	})
}



export function getProductAgainBuys(data) {
	return request({
		url: '/admin/admin/getProductAgainBuys',
		method: 'POST',
		headers,
		data
	})
}

export function getProductAgainBuy(data) {
	return request({
		url: '/admin/admin/getProductAgainBuy',
		method: 'POST',
		headers,
		data
	})
}


export function addProductAgainBuy(data) {
	return request({
		url: '/admin/admin/addProductAgainBuy',
		method: 'POST',
		headers,
		data
	})
}


export function upProductAgainBuy(data) {
	return request({
		url: '/admin/admin/upProductAgainBuy',
		method: 'POST',
		headers,
		data
	})
}

export function getCpsOrderSum(data) {
	return request({
		url: '/mall/v1/mall/getCpsOrderSum',
		method: 'POST',
		headers,
		data
	})
}

export function getCpsTapProductType(data) {
	return request({
		url: '/mall/v1/mall/getCpsTapProductType',
		method: 'POST',
		headers,
		data
	})
}


export function getCpsJdProduct(data) {
	return request({
		url: '/mall/v1/mall/getCpsJdProduct',
		method: 'POST',
		headers,
		data
	})
}


export function getCpsJdProductType(data) {
	return request({
		url: '/mall/v1/mall/getCpsJdProductType',
		method: 'POST',
		headers,
		data
	})
}

// 拼多多
export function getCpsPddProduct(data) {
	return request({
		url: '/mall/v1/mall/getCpsPddProduct',
		method: 'POST',
		headers,
		data
	})
}
export function getCpsPddProductType(data) {
	return request({
		url: '/mall/v1/mall/getCpsPddProductType',
		method: 'POST',
		headers,
		data
	})
}
// 唯品会商品列表
export function getCpsWphProduct(data) {
	return request({
		url: '/mall/v1/mall/getCpsWphProduct',
		method: 'POST',
		headers,
		data
	})
}

export function deletItemeCpsGoods(data) {
	return request({
		url: '/mall/v1/mall/deletItemeCpsGoods',
		method: 'POST',
		headers,
		data
	})
}
