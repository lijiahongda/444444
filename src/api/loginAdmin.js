import request from '@/utils/request'
import {
  authorizationVue
} from '@/utils/authorization'

const headers = {
  'Authorization': authorizationVue(2)
} // 请求头 header Authorization

/**
 * 列表接口
 * */
export function adminUserLogin(data) {
  return request({
    url: '/admin/userLogin',
    method: 'post',
    headers,
    data
  })
}

