import request from '@/utils/request'

// 查询生成网格-小区关系表列表
export function listCommunity(query) {
  return request({
    url: '/system/community/list',
    method: 'get',
    params: query
  })
}

// 查询生成网格-小区关系表详细
export function getCommunity(id) {
  return request({
    url: '/system/community/' + id,
    method: 'get'
  })
}

// 新增生成网格-小区关系表
export function addCommunity(data) {
  return request({
    url: '/system/community',
    method: 'post',
    data: data
  })
}

// 修改生成网格-小区关系表
export function updateCommunity(data) {
  return request({
    url: '/system/community',
    method: 'put',
    data: data
  })
}

// 删除生成网格-小区关系表
export function delCommunity(id) {
  return request({
    url: '/system/community/' + id,
    method: 'delete'
  })
}
