import request from '@/utils/requestKylins'
export function userSearch(name) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}
// 平台用户详情
export function userInfo(data) {
  return request({
    url: '/member/info/detail.json',
    method: 'post',
    data
  })
}

export function delCheckInfo(data) {
  return request({
    url: '/member/info/delCheckInfo',
    method: 'post',
    data
  })
}

export function commission(data) {
  return request({
    url: '/member/info/commission.json',
    method: 'post',
    data
  })
}
export function relations(data) {
  return request({
    url: '/member/info/relations.json',
    method: 'post',
    data
  })
}

export function newCommission(data) {
  return request({
    url: '/member/info/newCommission.json',
    method: 'post',
    data
  })
}