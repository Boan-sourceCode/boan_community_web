import request from '@/utils/request'

// 查询企业信息列表
export function listEnterprise(query) {
  return request({
    url: '/system/enterprise/list',
    method: 'get',
    params: query
  })
}

// 查询企业信息列表（加用户权限）
export function listEnterpriseLimit(query) {
  return request({
    url: '/system/enterprise/listWithLimit',
    method: 'get',
    params: query
  })
}

// 查询企业信息详情
export function getEnterprise(id) {
  return request({
    url: '/system/enterprise/' + id,
    method: 'get'
  })
}

// 新增企业信息
export function addEnterprise(data) {
  return request({
    url: '/system/enterprise/add',
    method: 'post',
    data: data
  })
}
// 修改企业信息
export function updateEnterprise(data) {
  return request({
    url: '/system/enterprise/edit',
    method: 'put',
    data: data
  })
}

// 删除企业信息
export function delEnterprise(id) {
  return request({
    url: '/system/enterprise/' + id,
    method: 'delete'
  })
}

// 查询房屋选择器列表
export function getHouseList(query) {
  return request({
    url: '/system/house/houseInfo',
    method: 'get',
    params: query
  })
}

// 查询房屋选择器列表
export function getUnitList(query) {
  return request({
    url: '/system/buiding/baBuildingUnit',
    method: 'get',
    params: query
  })
}



