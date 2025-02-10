import request from '@/utils/request'

// 查询楼房/院落信息列表
export function listBuiding(query) {
  return request({
    url: '/system/buiding/list',
    method: 'get',
    params: query
  })
}

// 查询楼房/院落信息详细
export function getBuiding(id) {
  return request({
    url: '/system/buiding/' + id,
    method: 'get'
  })
}

// 新增楼房/院落信息
export function addBuiding(data) {
  return request({
    url: '/system/buiding',
    method: 'post',
    data: data
  })
}

// 修改楼房/院落信息
export function updateBuiding(data) {
  return request({
    url: '/system/buiding',
    method: 'put',
    data: data
  })
}

// 删除楼房/院落信息
export function delBuiding(id) {
  return request({
    url: '/system/buiding/' + id,
    method: 'delete'
  })
}
