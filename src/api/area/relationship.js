import request from '@/utils/request'

// 查询网格-房屋内人员关系列表
export function listRelationship(query) {
  return request({
    url: '/system/relationship/list',
    method: 'get',
    params: query
  })
}

// 查询网格-房屋内人员关系详细
export function getRelationship(shipId) {
  return request({
    url: '/system/relationship/' + shipId,
    method: 'get'
  })
}

// 新增网格-房屋内人员关系
export function addRelationship(data) {
  return request({
    url: '/system/relationship',
    method: 'post',
    data: data
  })
}

// 修改网格-房屋内人员关系
export function updateRelationship(data) {
  return request({
    url: '/system/relationship',
    method: 'put',
    data: data
  })
}

// 删除网格-房屋内人员关系
export function delRelationship(shipId) {
  return request({
    url: '/system/relationship/' + shipId,
    method: 'delete'
  })
}
