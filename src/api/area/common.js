import request from '@/utils/request'

// 查询常用树状列表
export function getTemplateTree() {
  return request({
    url: '/system/template/getTemplateTree',
    method: 'get'
  })
}

// 查询列表
export function getList(query) {
  return request({
    url: '/system/people/queryPeopleByType',
    method: 'get',
    params: query
  })
}

// 查询统计
export function countPeopleByType(query) {
  return request({
    url: '/system/people/countPeopleByType',
    method: 'get',
    params: query
  })
}


// 导出
export function exportPeopleByType(query) {
  return request({
    url: '/system/people/exportPeopleByType',
    method: 'post',
    params: query
  })
}