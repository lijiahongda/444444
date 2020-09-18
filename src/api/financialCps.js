// import request from '@/utils/requestKylins' //application/json
import request from '@/utils/requestNewCps' //application/x-www-form-urlencoded
import {
	authorizationVue
} from '@/utils/authorization'
import store from '@/store'
var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).adminUserId : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')
const headers = {
	'Authorization': tokenAuth
} // 请求头 header Authorization

//	请求银行列表，请求头使用	application/x-www-form-urlencoded
export function getBackCardList(data) {
	return request({
		url: '/plane/card/getCardSpeciesList',
		method: 'post',
		headers,
		data
	})
}
//信用卡-订单统计-数据统计
export function CreditCardStatistics(data) {
	return request({
		url: '/plane/card/orderStatisticsMonth',
		method: 'post',
		headers,
		data
	})
}

//订单列表
export function getOrderList(data) {
	return request({
		url: '/plane/card/orderList',
		method: 'post',
		headers,
		data
	})
}
//get结算点类型
export function getPointype(data) {
	return request({
		url: '/plane/card/getPointype',
		method: 'post',
		headers,
		data
	})
}
//信用卡列表
export function CreditCardList(data) {
	return request({
		url: '/plane/card/cardList',
		method: 'post',
		headers,
		data
	})
}

//订单统计柱状图
export function OrderStatisticalZhu(data) {
	return request({
		url: '/plane/card/orderStatisticsBarChart',
		method: 'post',
		headers,
		data
	})
}
//订单统计散点图
export function OrderStatisticalSan(data) {
	return request({
		url: '/plane/card/orderStatisticsScatterPlot',
		method: 'post',
		headers,
		data
	})
}
//订单统计漏斗图
export function OrderStatisticalLou(data) {
	return request({
		url: '/plane/card/orderStatisticsFunnel',
		method: 'post',
		headers,
		data
	})
}
//信用卡返佣列表
export function CreditCardRebateList(data) {
	return request({
		url: '/plane/card/getCardAmoutList',
		method: 'post',
		headers,
		data
	})
}
export function editorBackCard1(data) {
	return request({
		url: '/plane/card/getMethodType',
		method: 'post',
		headers,
		data
	})
}
//编辑卡种
export function editorBackCard(data) {
	return request({
		url: '/plane/card/updateCardSpecies',
		method: 'post',
		headers,
		data
	})
}
//添加卡种
export function addBackCard(data) {
	return request({
		url: '/plane/card/addCardSpecies',
		method: 'post',
		headers,
		data
	})
}
//判断是否银行卡存在
export function BackCard(data) {
	return request({
		url: '/plane/card/getCardSpeciesOne',
		method: 'post',
		headers,
		data
	})
}
//添加返佣信息
export function addCommissionInformation(data) {
	return request({
		url: '/plane/card/addCardAmout',
		method: 'post',
		headers,
		data
	})
}

//信用卡点击量添加
export function addCreditCardClick(data) {
	return request({
		url: '/plane/card/addCardHits',
		method: 'post',
		headers,
		data
	})
}

//机票数据统计
//机票数据统计list
export function getTicketInformation(data) {
	return request({
		url: '/plane/v1/orderList',
		method: 'post',
		headers,
		data
	})
}
//柱状图
export function getHistogramData(data) {
	return request({
		url: '/plane/v1/orderStatisticsBarChart',
		method: 'post',
		headers,
		data
	})
}
//折线图
export function getLineChart(data) {
	return request({
		url: '/plane/v1/orderStatisticsScatterPlot',
		method: 'post',
		headers,
		data
	})
}
//漏斗图
export function getFunnelFigure(data) {
	return request({
		url: '/plane/v1/orderStatisticsFunnel',
		method: 'post',
		headers,
		data
	})
}

//机票订单明细列表
export function getTicketOrderList(data) {
	return request({
		url: '/plane/v1/liveOrderList',
		method: 'post',
		headers,
		data
	})
}
//机票订单表详情
export function getTicketOrderDetails(data) {
	return request({
		url: '/plane/v1/liveOrderInfo',
		method: 'post',
		headers,
		data
	})
}
//机票乘机人信息
export function getPassengerInformationList(data) {
	return request({
		url: '/plane/v1/liveTicketList',
		method: 'post',
		headers,
		data
	})
}
//客服信息
export function getNformationSubmission(data) {
	return request({
		url: '/plane/v1/liveCustomerList',
		method: 'post',
		headers,
		data
	})
}
//添加客服记录
export function setrecordService(data) {
	return request({
		url: '/plane/v1/addLiveCustomer',
		method: 'post',
		headers,
		data
	})
}
//退款列表
export function getRefundList(data) {
	return request({
		url: '/plane/v1/liveRefundOrderList',
		method: 'post',
		headers,
		data
	})
}
//退款订单详情中的信息
export function setRefundData(data) {
	return request({
		url: '/plane/v1/liveRefundOrderList',
		method: 'post',
		headers,
		data
	})
}
//订单详情中的信息
export function getRefundData(data) {
	return request({
		url: '/plane/v1/liveRefundOrderInfo',
		method: 'post',
		headers,
		data
	})
}
//确认退款
export function TicketConfirmation(data) {
	return request({
		url: '/plane/v1/updateRefundOrderStatus',
		method: 'post',
		headers,
		data
	})
}
//订单列表详情页确认退款
export function orderlistTicketConfirmation(data) {
	return request({
		url: '/plane/v1/updateOrderStatus',
		method: 'post',
		headers,
		data
	})
}

//火车票
//get火车票列表
export function getTrainTicketsList(data) {
	return request({
		url: '/plane/v1/trainOrderList',
		method: 'get',
		headers,
		params: data
	})
}
//get火车票列表详情
export function getTrainTicketsListDetail(data) {
	return request({
		url: '/plane/v1/trainOrderDetail',
		method: 'get',
		headers,
		params: data
	})
}
//火车票退款
export function getTrainTicketsListRefund(data) {
	return request({
		url: '/plane/v1/trainRefundMoney',
		method: 'post',
		headers,
		params: data
	})
}
//火车票详情get客服表
export function getInformationService(data) {
	return request({
		url: '/plane/v1/trainCustomerList',
		method: 'get',
		headers,
		params: data
	})
}
//火车票详情set客服
export function SetInformationService(data) {
	return request({
		url: '/plane/v1/trainAddCustomer',
		method: 'post',
		headers,
		params: data
	})
}
