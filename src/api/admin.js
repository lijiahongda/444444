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
 * 列表接口
 * */
// 一周内购买数量
export function getDdPurchases(data) {
  return request({
    url: '/admin/admin/getDdPurchases',
    method: 'post',
    headers,
    data
  })
}
// 编辑书籍接口
export function upDdRecommendBook(data) {
  return request({
    url: '/admin/admin/upDdRecommendBook',
    method: 'post',
    headers,
    data
  })
}
// 删除书籍接口
export function delDdRecommendBook(data) {
  return request({
    url: '/admin/admin/delDdRecommendBook',
    method: 'post',
    headers,
    data
  })
}
// 添加书籍接口
export function addDdRecommendBook(data) {
  return request({
    url: '/admin/admin/addDdRecommendBook',
    method: 'post',
    headers,
    data
  })
}
// 获取书籍名称
export function getProductList(data) {
  return request({
    url: '/admin/admin/getProductList',
    method: 'post',
    headers,
    data
  })
}
// 书籍列表
export function getDdRecommendBookList(data) {
  return request({
    url: '/admin/admin/getDdRecommendBookList',
    method: 'post',
    headers,
    data
  })
}
// 修改分类名称
export function upDdRecommendCategory(data) {
  return request({
    url: '/admin/admin/upDdRecommendCategory',
    method: 'post',
    headers,
    data
  })
}

// 分类列表
export function getDdRecommendCategoryList(data) {
  return request({
    url: '/admin/admin/getDdRecommendCategoryList',
    method: 'post',
    headers,
    data
  })
}
// 添加分类
export function addDdRecommendCategory(data) {
  return request({
    url: '/admin/admin/addDdRecommendCategory',
    method: 'post',
    headers,
    data
  })
}
// 删除分类
export function delDdRecommendCategory(data) {
  return request({
    url: '/admin/admin/delDdRecommendCategory',
    method: 'post',
    headers,
    data
  })
}
// 书籍分类接口
// export function getDdRecommendCategoryList(data) {
//   return request({
//     url: '/admin/admin/getDdRecommendCategoryList',
//     method: 'post',
//     headers,
//     data
//   })
// }
export function getDdCategoryList(data) {
  return request({
    url: '/admin/getDdCategoryList',
    method: 'post',
    headers,
    data
  })
}
export function getAdminUsers(data) {
  return request({
    url: '/admin/admin/getAdminUsers',
    method: 'post',
    headers,
    data
  })
}
export function addAdminUser(data) {
  return request({
    url: '/admin/admin/addAdminUser',
    method: 'post',
    headers,
    data
  })
}
export function upAdminUser(data) {
  return request({
    url: '/admin/admin/upAdminUser',
    method: 'post',
    headers,
    data
  })
}
export function delAdminUser(data) {
  return request({
    url: '/admin/admin/delAdminUser',
    method: 'post',
    headers,
    data
  })
}
export function getAdminUser(data) {
  return request({
    url: '/admin/admin/getAdminUser',
    method: 'post',
    headers,
    data
  })
}
export function getPowers(data) {
  return request({
    url: '/admin/admin/getPowers',
    method: 'post',
    headers,
    data
  })
}
export function getPower(data) {
  return request({
    url: '/admin/admin/getPower',
    method: 'post',
    headers,
    data
  })
}
export function addPower(data) {
  return request({
    url: '/admin/admin/addPower',
    method: 'post',
    headers,
    data
  })
}
export function upPower(data) {
  return request({
    url: '/admin/admin/upPower',
    method: 'post',
    headers,
    data
  })
}
export function delPower(data) {
  return request({
    url: '/admin/admin/delPower',
    method: 'post',
    headers,
    data
  })
}
export function getTreePowers(data) {
  return request({
    url: '/admin/admin/getTreePowers',
    method: 'post',
    headers,
    data
  })
}
export function getRoles(data) {
  return request({
    url: '/admin/admin/getRoles',
    method: 'post',
    headers,
    data
  })
}
export function getRole(data) {
  return request({
    url: '/admin/admin/getRole',
    method: 'post',
    headers,
    data
  })
}
export function addRole(data) {
  return request({
    url: '/admin/admin/addRole',
    method: 'post',
    headers,
    data
  })
}
export function upRole(data) {
  return request({
    url: '/admin/admin/upRole',
    method: 'post',
    headers,
    data
  })
}
export function delRole(data) {
  return request({
    url: '/admin/admin/delRole',
    method: 'post',
    headers,
    data
  })
}
export function getUserPowers(data, header) {
  return request({
    url: '/admin/admin/getUserPowers',
    method: 'post',
    headers: header,
    data
  })
}
export function getDepartments(data) {
  return request({
    url: '/admin/admin/getDepartments',
    method: 'post',
    headers,
    data
  })
}
export function getDepartment(data) {
  return request({
    url: '/admin/admin/getDepartment',
    method: 'post',
    headers,
    data
  })
}
export function addDepartment(data) {
  return request({
    url: '/admin/admin/addDepartment',
    method: 'post',
    headers,
    data
  })
}
export function upDepartment(data) {
  return request({
    url: '/admin/admin/upDepartment',
    method: 'post',
    headers,
    data
  })
}
export function departmentId(data) {
  return request({
    url: '/admin/admin/departmentId',
    method: 'post',
    headers,
    data
  })
}
export function delDepartment(data) {
  return request({
    url: '/admin/admin/delDepartment',
    method: 'post',
    headers,
    data
  })
}
export function getPositions(data) {
  return request({
    url: '/admin/admin/getPositions',
    method: 'post',
    headers,
    data
  })
}
export function getPosition(data) {
  return request({
    url: '/admin/admin/getPosition',
    method: 'post',
    headers,
    data
  })
}
export function addPosition(data) {
  return request({
    url: '/admin/admin/addPosition',
    method: 'post',
    headers,
    data
  })
}
export function upPosition(data) {
  return request({
    url: '/admin/admin/upPosition',
    method: 'post',
    headers,
    data
  })
}
export function delPosition(data) {
  return request({
    url: '/admin/admin/delPosition',
    method: 'post',
    headers,
    data
  })
}
export function getDepartmentsMenu(data) {
  return request({
    url: '/admin/admin/getDepartmentsMenu',
    method: 'post',
    headers,
    data
  })
}
export function getPositionsMenu(data) {
  return request({
    url: '/admin/admin/getPositionsMenu',
    method: 'post',
    headers,
    data
  })
}
export function getLevelPowers(data) {
  return request({
    url: '/admin/admin/getLevelPowers',
    method: 'post',
    headers,
    data
  })
}
export function getPushs(data) {
  return request({
    url: '/admin/admin/getPushs',
    method: 'post',
    headers,
    data
  })
}
export function getPush(data) {
  return request({
    url: '/admin/admin/getPush',
    method: 'post',
    headers,
    data
  })
}
export function addPush(data) {
  return request({
    url: '/admin/admin/addPush',
    method: 'post',
    headers,
    data
  })
}
export function upPush(data) {
  return request({
    url: '/admin/admin/upPush',
    method: 'post',
    headers,
    data
  })
}
export function delPush(data) {
  return request({
    url: '/admin/admin/delPush',
    method: 'post',
    headers,
    data
  })
}
export function pushMessage(data) {
  return request({
    url: '/admin/admin/pushMessage',
    method: 'post',
    headers,
    data
  })
}
export function pushMessageType(data) {
  return request({
    url: '/admin/admin/pushMessageType',
    method: 'post',
    headers,
    data
  })
}

export function getMembers(data) {
  return request({
    url: '/member/info/list.json',
    method: 'post',
    headers,
    data
  })
}

export function addPushGroupUser(data) {
  return request({
    url: '/admin/admin/addPushGroupUser',
    method: 'post',
    headers,
    data
  })
}

export function getPushGroupUsers(data) {
  return request({
    url: '/admin/admin/getPushGroupUsers',
    method: 'post',
    headers,
    data
  })
}

export function getPushGroupUser(data) {
  return request({
    url: '/admin/admin/getPushGroupUser',
    method: 'post',
    headers,
    data
  })
}

export function upPushGroupUser(data) {
  return request({
    url: '/admin/admin/upPushGroupUser',
    method: 'post',
    headers,
    data
  })
}

export function getShortMessages(data) {
  return request({
    url: '/admin/admin/getShortMessages',
    method: 'post',
    headers,
    data
  })
}

export function getShortMessage(data) {
  return request({
    url: '/admin/admin/getShortMessage',
    method: 'post',
    headers,
    data
  })
}

export function upShortMessage(data) {
  return request({
    url: '/admin/admin/upShortMessage',
    method: 'post',
    headers,
    data
  })
}

export function addShortMessage(data) {
  return request({
    url: '/admin/admin/addShortMessage',
    method: 'post',
    headers,
    data
  })
}

export function pushShortMessageType(data) {
  return request({
    url: '/admin/admin/pushShortMessageType',
    method: 'post',
    headers,
    data
  })
}

export function getShortUrl(data) {
  return request({
    url: '/admin/admin/getShortUrl',
    method: 'post',
    headers,
    data
  })
}

// 商品售后列表
export function getServiceList(data) {
  return request({
    url: '/admin/admin/getRefundOrders',
    method: 'post',
    headers,
    data
  })
}
export function getNewRefundOrders(data) {
  return request({
    url: '/admin/admin/getNewRefundOrders',
    method: 'post',
    headers,
    data
  })
}
// 获取符合生成审核结算单的列表
export function getEligibilityRefundOrders(data) {
  return request({
    url: '/admin/admin/getEligibilityRefundOrders',
    method: 'post',
    headers,
    data
  })
}
// 生成审核退款单
export function createRefundSettlement(data) {
  return request({
    url: '/admin/admin/createRefundSettlement',
    method: 'post',
    headers,
    data
  })
}
// 退款结算列表
export function getRefundSettlementList(data) {
  return request({
    url: '/admin/admin/getRefundSettlementList',
    method: 'post',
    headers,
    data
  })
}
// 退款结算详情
export function getRefundSettlement(data) {
  return request({
    url: '/admin/admin/getRefundSettlement',
    method: 'post',
    headers,
    data
  })
}
// 获取客服角色
export function getAdminUserRole(data) {
  return request({
    url: '/admin/admin/getAdminUserRole',
    method: 'post',
    headers,
    data
  })
}
// 质检售后 和 客服售后 订单详情中的  审核接口
export function checkNewRefund(data) {
  return request({
    url: '/admin/admin/checkNewRefund',
    method: 'post',
    headers,
    data
  })
}
// 审核一条退款结算单子单
export function checkfundSettlement(data) {
  return request({
    url: '/admin/admin/checkfundSettlement',
    method: 'post',
    headers,
    data
  })
}
// 审核多条退款结算单子单
export function checkfundSettlementMore(data) {
  return request({
    url: '/admin/admin/checkfundSettlementMore',
    method: 'post',
    headers,
    data
  })
}
// 退款结算单操作日志列表
export function getRefundSetOpLogList(data) {
  return request({
    url: '/admin/admin/getRefundSetOpLogList',
    method: 'post',
    headers,
    data
  })
}
// 客服售后
export function getFiveHundredBelowRefundOrders(data) {
  return request({
    url: '/admin/admin/getFiveHundredBelowRefundOrders',
    method: 'post',
    headers,
    data
  })
}
// 质检售后
export function getMoreFiveHundredRefundOrders(data) {
  return request({
    url: '/admin/admin/getMoreFiveHundredRefundOrders',
    method: 'post',
    headers,
    data
  })
}

export function getRefundOrderInfo(data) {
  return request({
    url: '/admin/admin/getRefundOrderInfo',
    method: 'post',
    headers,
    data
  })
}
export function getNewRefundOrderInfo(data) {
  return request({
    url: '/admin/admin/getNewRefundOrderInfo',
    method: 'post',
    headers,
    data
  })
}

// 售后审核
export function checkRefund(data) {
  return request({
    url: '/admin/admin/checkRefund',
    method: 'post',
    headers,
    data
  })
}
// 审核 上传物流单号 同意退款  拒绝退款
export function upRefundOrderGoods(data) {
  return request({
    url: '/admin/admin/upRefundOrderGoods',
    method: 'post',
    headers,
    data
  })
}

export function addRefundRemark(data) {
  return request({
    url: '/admin/admin/addRefundRemark',
    method: 'post',
    headers,
    data
  })
}
export function getRefundOperationLogList(data) {
  return request({
    url: '/admin/admin/getRefundOperationLogList',
    method: 'post',
    headers,
    data
  })
}
// 退款列表筛选信息
export function getRefundAboutInfo(data) {
  return request({
    url: '/admin/admin/getRefundAboutInfo',
    method: 'post',
    headers,
    data
  })
}

export function getRefundServiceTypes(data) {
  return request({
    url: '/admin/admin/getRefundServiceTypes',
    method: 'post',
    headers,
    data
  })
}

export function addRefundServiceType(data) {
  return request({
    url: '/admin/admin/addRefundServiceType',
    method: 'post',
    headers,
    data
  })
}

export function upRefundServiceType(data) {
  return request({
    url: '/admin/admin/upRefundServiceType',
    method: 'post',
    headers,
    data
  })
}

export function getRefundServiceType(data) {
  return request({
    url: '/admin/admin/getRefundServiceType',
    method: 'post',
    headers,
    data
  })
}

export function getPartTimeJobs(data) {
  return request({
    url: '/admin/admin/getPartTimeJobs',
    method: 'post',
    headers,
    data
  })
}

export function checkPartTimeJob(data) {
  return request({
    url: '/admin/admin/checkPartTimeJob',
    method: 'post',
    headers,
    data
  })
}
export function memberDetail(data) {
  return request({
    url: '/member/memberDetail',
    method: 'post',
    headers,
    data
  })
}

// 视频带货
export function getVideoTakeGoodsList(data) {
  return request({
    url: '/admin/admin/getVideoTakeGoodsList',
    method: 'post',
    headers,
    data
  })
}
export function addVideoTakeGoods(data) {
  return request({
    url: '/admin/admin/addVideoTakeGoods',
    method: 'post',
    headers,
    data
  })
}
export function delVideoTakeGoods(data) {
  return request({
    url: '/admin/admin/delVideoTakeGoods',
    method: 'post',
    headers,
    data
  })
}
// 视频带货
export function getVideoTakeGoodsData(data) {
  return request({
    url: '/admin/admin/getVideoTakeGoodsData',
    method: 'post',
    headers,
    data
  })
}

export function getOrderGoodsBonus(data) {
  return request({
    url: '/admin/admin/getOrderGoodsBonus',
    method: 'post',
    headers,
    data
  })
}

export function getrefund(data) {
  return request({
    url: 'dmin/admin/refundOrder',
    method: 'post',
    headers,
    data
  })
}

export function getDdProductList(data) {
  return request({
    url: '/admin/admin/getDdProductList',
    method: 'post',
    headers,
    data
  })
}

// 发送机制列表
export function selectCouponMechanism(params) {
  return request({
    url: '/admin/admin/couponZtList',
    method: 'get',
    headers,
    params
  })
}

// 添加发送机制
export function couponMechanismAdd(data) {
  return request({
    url: '/admin/admin/couponZtAdd',
    method: 'post',
    headers,
    data
  })
}

// 更改发送机制
export function couponMechanismUpdate(data) {
  return request({
    url: '/admin/admin/couponZtUp',
    method: 'post',
    headers,
    data
  })
}

// 发送机制详情
export function couponMechanismDetail(params) {
  return request({
    url: '/admin/admin/couponZtDetail',
    method: 'get',
    headers,
    params
  })
}

// 发送机制删除
export function couponMechanismDelete(data) {
  return request({
    url: '/admin/admin/couponZtDel',
    method: 'post',
    headers,
    data
  })
}

// 发送机制的发送时机列表
export function opportunityList(data) {
  return request({
    url: '/admin/couponZt//opportunityList',
    method: 'get',
    headers
  })
}

export function selectCoupon(data) {
  return request({
    url: '/admin/admin/selectCoupon',
    method: 'post',
    headers,
    data
  })
}

export function switchCoupon(data) {
  return request({
    url: '/admin/admin/switchCoupon',
    method: 'post',
    headers,
    data
  })
}

export function sendCoupon(data) {
  return request({
    url: '/admin/admin/sendCoupon',
    method: 'post',
    headers,
    data
  })
}

export function couponNewlyIncreased(data) {
  return request({
    url: '/admin/admin/newAddCoupon',
    method: 'post',
    headers,
    data
  })
}

export function newUpdateCoupon(data) {
  return request({
    url: '/admin/admin/newUpdateCoupon',
    method: 'post',
    headers,
    data
  })
}

export function couponDetail(data) {
  return request({
    url: '/admin/admin/couponDetail' + data,
    method: 'get',
    headers
  })
}

export function pushMessageOneSwitch(data) {
  return request({
    url: '/admin/admin/pushMessageOneSwitch',
    method: 'post',
    headers,
    data
  })
}

export function pushMessageAllSwitch(data) {
  return request({
    url: '/admin/admin/pushMessageAllSwitch',
    method: 'post',
    headers,
    data
  })
}
// 优惠券渠道
export function couponChannelType(data) {
  return request({
    url: '/admin/admin/couponChannelType',
    method: 'post',
    headers,
    data
  })
}

export function getPayConfigList(data) {
  return request({
    url: '/admin/admin/getPayConfigList',
    method: 'post',
    headers,
    data
  })
}
// 支付配置
export function upPayConfigState(data) {
  return request({
    url: '/admin/admin/upPayConfigState',
    method: 'post',
    headers,
    data
  })
}
export function getWxPayConfigList(data) {
  return request({
    url: '/admin/admin/getWxPayConfigList',
    method: 'post',
    headers,
    data
  })
}
// 支付配置
export function upWxPayConfigState(data) {
  return request({
    url: '/admin/admin/upWxPayConfigState',
    method: 'post',
    headers,
    data
  })
}

// 操作日志
export function getAdminLogList(data) {
  return request({
    url: '/admin/admin/getAdminLogList',
    method: 'post',
    headers,
    data
  })
}
// 操作日志
export function getAdminLogType(data) {
  return request({
    url: '/admin/admin/getAdminLogType',
    method: 'post',
    headers,
    data
  })
}
// 禁用账号
export function upAdminUserStatus(data) {
  return request({
    url: '/admin/admin/upAdminUserStatus',
    method: 'post',
    headers,
    data
  })
}
// 修改密码
export function upAdminUserPwd(data) {
  return request({
    url: '/admin/admin/upAdminUserPwd',
    method: 'post',
    headers,
    data
  })
}
// 操作按钮
export function getAdminLogButtonType(data) {
  return request({
    url: '/admin/admin/getAdminLogButtonType',
    method: 'post',
    headers,
    data
  })
}
// 退款结算单子订单列表
export function getRefundSettlementOrderList(data) {
  return request({
    url: '/admin/admin/getRefundSettlementOrderList',
    method: 'post',
    headers,
    data
  })
}
// 退款完成凭证
export function changeRefundFinish(data) {
  return request({
    url: '/admin/admin/changeRefundFinish',
    method: 'post',
    headers,
    data
  })
}
// 订单管理供应商通过审核
export function replaceSplCheckRefund(data) {
  return request({
    url: '/admin/admin/replaceSplCheckRefund',
    method: 'post',
    headers,
    data
  })
}

export function getCompanyIntegral(data) {
  return request({
    url: '/admin/admin/getCompanyIntegral',
    method: 'post',
    headers,
    data
  })
}
//客服专员
export function getRoleAdminUsers(data) {
  return request({
    url: '/admin/admin/getRoleAdminUsers',
    method: 'post',
    headers,
    data
  })
}
//
export function setRefundOrderPrincipalPeople(data) {
  return request({
    url: '/admin/admin/setRefundOrderPrincipalPeople',
    method: 'post',
    headers,
    data
  })
}

//
export function getRefundOrderCount(data) {
  return request({
    url: '/admin/admin/getRefundOrderCount',
    method: 'post',
    headers,
    data
  })
}

export function getRoleAdminIsTrue(data) {
  return request({
    url: '/admin/admin/getRoleAdminIsTrue',
    method: 'post',
    headers,
    data
  })
}

export function updRefundOrderPrincipalPeople(data) {
  return request({
    url: '/admin/admin/updRefundOrderPrincipalPeople',
    method: 'post',
    headers,
    data
  })
}
