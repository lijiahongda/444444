import request from '@/utils/requestKylins'
import {
  authorizationVue
} from '@/utils/authorization'
import store from '@/store'
var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).adminUserId : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')
const headers = {
  'Authorization': tokenAuth
}
// 统计供应商维度信息
// export function supplier() {
//   return request({
//     url: '/line/order/supplierCount.json',
//     method: 'get',
//     params: ''
//   })
// }
/**
 *
 * @param {advertList}  // 广告列表
 * @param {getCategory}  // 获取业务模块 + 广告类型
 * @param {detailPersonal} //获取广告详情
 * @param {deleteAdvert} //删除广告
 * @param {createdAdvert} //创建广告
 * @param {updatedAdvert} //修改广告
 */
export function advertList(data) {
  return request({
    url: '/mall/manage/list',
    method: 'post',
	  headers,
    data
  })
}

export function categoryList(data) {
  return request({
    url: '/mall/manage/getCategory',
    method: 'post',
	  headers,
    data
  })
}

export function detailPersonal(data) {
  return request({
    url: '/mall/manage/detail',
    method: 'post',
	  headers,
    data
  })
}

export function deleteAdvert(data) {
  return request({
    url: '/mall/manage/delete',
    method: 'post',
	  headers,
    data
  })
}

export function createdAdvert(data) {
  return request({
    url: '/mall/manage/save',
    method: 'post',
	  headers,
    data
  })
}

export function updatedAdvert(data) {
  return request({
    url: '/mall/manage/edit',
    method: 'post',
	  headers,
    data
  })
}
