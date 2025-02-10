import request from '@/utils/request'

// 查询人口卡片模板控件列表
export function listCard(query) {
  return request({
    url: '/system/card/list',
    method: 'get',
    params: query
  })
}

// 查询人口卡片模板控件详细
export function getCard(controlId) {
  return request({
    url: '/system/card/' + controlId,
    method: 'get'
  })
}

// 新增人口卡片模板控件
export function addCard(data) {
  return request({
    url: '/system/card',
    method: 'post',
    data: data
  })
}

// 修改人口卡片模板控件
export function updateCard(data) {
  return request({
    url: '/system/card',
    method: 'put',
    data: data
  })
}

// 删除人口卡片模板控件
export function delCard(controlId) {
  return request({
    url: '/system/card/' + controlId,
    method: 'delete'
  })
}
