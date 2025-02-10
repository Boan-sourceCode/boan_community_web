import request from '@/utils/request'

// 查询人口类型信息列表
export function listType(query) {
  return request({
    url: '/system/type/list',
    method: 'get',
    params: query
  })
}

// 查询人口类型信息详细
export function getType(typeId) {
  return request({
    url: '/system/type/' + typeId,
    method: 'get'
  })
}

// 新增人口类型信息
export function addType(data) {
  return request({
    url: '/system/type',
    method: 'post',
    data: data
  })
}

// 修改人口类型信息
export function updateType(data) {
  return request({
    url: '/system/type',
    method: 'put',
    data: data
  })
}

// 删除人口类型信息
export function delType(typeId) {
  return request({
    url: '/system/type/' + typeId,
    method: 'delete'
  })
}
