import request from '@/utils/request'


//网格管理-获取页面数据
export function listVillage(query) {
  return request({
    url: '/system/community/list',
    method: 'get',
    params: query
  })
}

//网格管理-获取页面数据（加用户权限）
export function listVillageLimit(query) {
  return request({
    url: '/system/community/listWithLimit',
    method: 'get',
    params: query
  })
}

// 添加社会单位
export function addshcom(data) {
  return request({
    url: '/system/socialUnit/save',
    method: 'post',
    data: data
  })
}
// 修改社会单位
export function updateshcom(data) {
  return request({
    url: '/system/socialUnit',
    method: 'put',
    data: data
  })
}
// 删除社会单位
export function delshcom(id) {
  return request({
    url: '/system/socialUnit/deleteById?id=' + id,
    method: 'delete',
  })
}


// 查询物业公司
//export function getProperty(query) {
//return request({
//  url: '/system/enterprise/list',
//  method: 'get',
//  params: query
//})
//}
// 查询物业公司
export function getProperty(query) {
  return request({
    url: '/system/enterprise/listNoPage',
    method: 'get',
    params: query
  })
}

// 新增小区
export function addVillage(data) {
  return request({
    url: '/system/community/add',
    method: 'post',
    data: data
  })
}

// 查询小区信息
export function getVillage(id) {
  return request({
    url: '/system/community/' + id,
    method: 'get'
  })
}

// 修改小区
export function updateVillage(data) {
  return request({
    url: '/system/community/edit',
    method: 'put',
    data: data
  })
}

// 删除小区
export function delVillage(id) {
  return request({
    url: '/system/community/' + id,
    method: 'delete'
  })
}

// 查询三会一课
export function getMeetList(query) {
  return request({
    url: '/system/meeting/list',
    method: 'get',
    params: query
  })
}
// 查询三会一课-参会人员
export function getMeetInfoList(query) {
  return request({
    url: '/system/communist/getInfo',
    method: 'get',
    params: query
  })
}
// 查询三会一课-会议记录
export function getMeetCommonList(query) {
  return request({
    url: '/system/minutes/list',
    method: 'get',
    params: query
  })
}
// 查询三会一课-添加会议
export function getAddMeeting(query) {
  return request({
    url: '/system/meeting',
    method: 'post',
    data: query
  })
}
// 查询三会一课-编辑会议
export function getEditMeeting(query) {
  return request({
    url: '/system/meeting',
    method: 'put',
    data: query
  })
}
// 查询三会一课-添加会议记录
export function getAddMeetingRecord(query) {
  return request({
    url: '/system/minutes',
    method: 'post',
    data: query
  })
}
// 查询三会一课-添加会议记录
export function getDeleteMeeting(param) {
  return request({
    url: '/system/meeting/deleteById',
    method: 'get',
    params: param
  })
}
// 数据看板-查询三会一课
export function selectMeetingByTime(param) {
  return request({
    url: '/system/meeting/selectMeetingByTime',
    method: 'get',
    params: param
  })
}
// 数据看板-统计党数据
export function selectPartyInfoOfIndex(param) {
  return request({
    url: '/system/party/selectPartyInfoOfIndex',
    method: 'get',
    params: param
  })
}
// 数据看板-党龄分布
export function selectPartyAgeOfIndex(param) {
  return request({
    url: '/system/party/selectPartyAgeOfIndex',
    method: 'get',
    params: param
  })
}
// 数据看板-学历分布
export function selectPartyEducation(param) {
  return request({
    url: '/system/party/selectPartyEducation',
    method: 'get',
    params: param
  })
}
// 数据看板-三会一课
//export function selectMeetingByTime(param) {
//return request({
//  url: '/system/meeting/selectMeetingByTime',
//  method: 'get',
//  params: param
//})
//}

// 三会一课-获取用户的党组织权限
export function getPartyTree(param) {
  return request({
    url: '/system/party/getPartyTree',
    method: 'get',
    params: param
  })
}

