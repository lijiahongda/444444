import request from '@/utils/requestKylins'
import { authorizationVue } from '@/utils/authorization'
const headers = { 'Authorization': authorizationVue(0) } // 请求头 header Authorization
// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   const headers = { 'Authorization': authorizationVue(0) }
//   return request({
//     url: '/admin/login',
//     method: 'post',
//     headers,
//     data
//   })
// }
//
export function loginByUsername(data) {
  return request({
    url: '/admin/userLogin',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}


export function setSubSystemLogin(data) {
  return request({
    url: '/admin/setSubSystemLogin',
    method: 'post',
    data
  })
}
