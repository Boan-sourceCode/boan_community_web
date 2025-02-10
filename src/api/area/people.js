import request from '@/utils/request'

// 查询人员基础信息列表
export function listPeople(query) {
  return request({
    url: '/system/people/list',
    method: 'get',
    params: query
  })
}

// 查询人员基础信息详细
export function getPeople(id) {
  return request({
    url: '/system/people/' + id,
    method: 'get'
  })
}

// 新增人员基础信息
export function addPeople(data) {
  return request({
    url: '/system/people',
    method: 'post',
    data: data
  })
}

// 修改人员基础信息
export function updatePeople(data) {
  return request({
    url: '/system/people',
    method: 'put',
    data: data
  })
}

// 删除人员基础信息
export function delPeople(id) {
  return request({
    url: '/system/people/' + id,
    method: 'delete'
  })
}
