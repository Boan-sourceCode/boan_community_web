import request from '@/utils/request'

// 查询企业-房屋-网格关系列表
export function listGrid(query) {
  return request({
    url: '/system/grid/list',
    method: 'get',
    params: query
  })
}

// 查询企业-房屋-网格关系详细
export function getGrid(id) {
  return request({
    url: '/system/grid/' + id,
    method: 'get'
  })
}

// 新增企业-房屋-网格关系
export function addGrid(data) {
  return request({
    url: '/system/grid',
    method: 'post',
    data: data
  })
}

// 修改企业-房屋-网格关系
export function updateGrid(data) {
  return request({
    url: '/system/grid',
    method: 'put',
    data: data
  })
}

// 删除企业-房屋-网格关系
export function delGrid(id) {
  return request({
    url: '/system/grid/' + id,
    method: 'delete'
  })
}
