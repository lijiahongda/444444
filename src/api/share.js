import request from '@/utils/requestKylins'
import {
  authorizationVue
} from '@/utils/authorization'
import store from "@/store"
var localstrage = JSON.parse(localStorage.getItem('userInfo'))?localstrage =JSON.parse(localStorage.getItem('userInfo')).adminUserId :localstrage='';
const tokenAuth = 'Admin ' +localstrage +'.'+localStorage.getItem('token')
const headers = {
  'Authorization': tokenAuth
} // 请求头 header Authorization

// h5分享列表
export function getShareList(data) {
  return request({
    url: '/mall/h5/h5DataList',
    method: 'post',
    data,
    headers
  })
}

// 添加h5分享
export function addShare(data) {
  return request({
    url: '/mall/h5/addH5Data',
    method: 'post',
    data,
    headers
  })
}

// 编辑h5分享
export function editShare(data) {
  return request({
    url: '/mall/h5/updateH5Data',
    method: 'post',
    data,
    headers
  })
}
