// import request from '@/utils/request'
import request from '@/utils/requestKylins'
import {
  authorizationVue
} from '@/utils/authorization'

const headers = {
  'Authorization': authorizationVue(2)
} // 请求头 header Authorization
/**
 *
 * @param {getTypeList}  // 文章管理 => 消息类型select
 * @param {getLlist} //文章列表
 * @param {detailOption} //获取文章详情
 * @param {deleteArticl} //删除文件管理
 * @param {updateArticl} //更新文件
 * @param {createdArticl} //创建文件
 */
export function getTypeList(data) {
  return request({
    url: '/mall/university/record/getTypeList',
    method: 'get',
    params: '',
    headers
  })
}

export function getLlist(data) {
  return request({
    url: '/mall/university/record/list/' + data,
    method: 'get',
    params: '',
    headers
  })
}

export function detailOption(data) {
  return request({
    url: '/mall/university/record/detail/' + data,
    method: 'get',
    params: '',
    headers
  })
}

export function deleteArticl(data) {
  return request({
    url: '/mall/university/record/delete/',
    method: 'post',
    headers,
    data
  })
}

export function updateArticl(data) {
  return request({
    url: '/mall/university/record/modify/',
    method: 'post',
    headers,
    data
  })
}

export function createdArticl(data) {
  return request({
    url: '/mall/university/record/create/',
    method: 'post',
    headers,
    data
  })
}
export function columnManagement(data) {
  return request({
    url: '/mall/university/type/list/' + data,
    method: 'get',
    headers
  })
}
export function AddColum(data) {
  return request({
    url: '/mall/university/type/create/',
    method: 'post',
    headers,
    data
  })
}
export function modifyColumn(data) {
  return request({
    url: '/mall/university/type/modify',
    method: 'post',
    headers,
    data
  })
}
export function firstCreate(data) {
  return request({
    url: '/mall/university/type/firstCreate',
    method: 'post',
    headers,
    data
  })
}
export function DeleteColumn(data) {
  return request({
    url: '/mall/university/type/delete',
    method: 'post',
    headers,
    data
  })
}
export function DetailsColumn(data) {
  return request({
    url: '/mall/university/type/detail/' + data,
    method: 'get',
    headers
  })
}

export function modifyDisplayOrder(data) {
  return request({
    url: '/mall/university/type/modifyDisplayOrder',
    method: 'post',
    headers,
    data
  })
}
export function modifyIndexShow(data) {
  return request({
    url: '/mall/university/type/modifyIndexShow/',
    method: 'post',
    headers,
    data
  })
}
export function setTypeBannerAid(data) {
  return request({
    url: '/mall/university/record/setTypeBannerAid/',
    method: 'post',
    headers,
    data
  })
}
export function getLevelList(data) {
  return request({
    url: '/mall/university/type/getLevelList/' + data,
    method: 'get',
    headers
  })
}

export function setArticleIsOnline(data) {
  return request({
    url: '/mall/university/record/setArticleIsOnline/',
    method: 'post',
    headers,
    data
  })
}

export function setArticleLikeNum(data) {
  return request({
    url: '/mall/university/record/setArticleLikeNum/',
    method: 'post',
    headers,
    data
  })
}

export function setArticleDownNum(data) {
  return request({
    url: '/mall/university/record/setArticleDownNum/',
    method: 'post',
    headers,
    data
  })
}

