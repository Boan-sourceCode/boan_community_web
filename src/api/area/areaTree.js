import request from '@/utils/request'

// 查询网格-网格管理列表
export function listAreaTree(query) {
  return request({
    url: '/system/areaTree/list',
    method: 'get',
    params: query
  })
}

// 查询网格-网格管理列表
export function getPartAreaTree(query) {
  return request({
    url: '/system/area/getPartAreaTree',
    method: 'get',
    params: query
  })
}

// 查询网格-网格管理详细
export function getAreaTree(areaId) {
  return request({
    url: '/system/areaTree/' + areaId,
    method: 'get'
  })
}

// 新增网格-网格管理
export function addAreaTree(data) {
  return request({
    url: '/system/areaTree',
    method: 'post',
    data: data
  })
}

// 修改网格-网格管理
export function updateAreaTree(data) {
  return request({
    url: '/system/areaTree',
    method: 'put',
    data: data
  })
}

// 删除网格-网格管理
export function delAreaTree(areaId) {
  return request({
    url: '/system/areaTree/' + areaId,
    method: 'delete'
  })
}
