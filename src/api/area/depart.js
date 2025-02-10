import request from '@/utils/request'

//部件管理-查询部件列表
export function attachments(query) {
    return request({
      url: '/system/attachments/list',
      method: 'get',
      params: query
    })
  }

//部件管理-查询部件列表
export function attachmentsLimit(query) {
  return request({
    url: '/system/attachments/listWithLimit',
    method: 'get',
    params: query
  })
}

//查询部件-详情
export function attachmentsList(id) {
    return request({
      url: '/system/attachments/'+id,
      method: 'get',
    })
  }
//部件管理-新增部件
export function attachmentsAdd(data) {
    return request({
      url: '/system/attachments',
      method: 'post',
      data: data
    })
  }
// 修改部件
// /system/attachments
export function attachmentsPut(data) {
  return request({
    url: '/system/attachments',
    method: 'put',
    data: data
  })
}


// 删除部件
export function attachmentsDel(areaId) {
    return request({
      url: '/system/attachments/' + areaId,
      method: 'delete'
    })
  }
