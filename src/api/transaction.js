import request from '@/utils/requestKylins'

export function fetchList(query) {
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query
  })
}
