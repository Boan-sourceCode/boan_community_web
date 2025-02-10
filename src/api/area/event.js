
import request from '@/utils/request'

// 事件督办-上报事件-登记信息
export function getInfoById(query) {
    return request({
      url: '/system/user/getInfoById',
      method: 'get',
      params: query
    })
  }

  // 事件督办-上报事件-主要当事人信息
export function getPeopleByName(query) {
    return request({
      url: '/system/people/getPeopleByName',
      method: 'get',
      params: query
    })
  }

   // 事件督办-上报事件-部门信息
  export function treeselect(query) {
    return request({
      url: '/system/dept/treeselect',
      method: 'get',
      params: query
    })
  }

  // 事件督办-上报事件-事件派遣
  export function dispatchInfo(query) {
    return request({
      url: '/system/user/dispatchInfo',
      method: 'get',
      params: query
    })
  }

  // 事件督办-我的事件表格信息
  export function myReportIncident(data) {
    return request({
      url: '/system/incident/myReportIncident',
      method: 'post',
      data: data
    })
  }

  // 事件督办-首页表格信息
  export function getIncidentOfIndex(query) {
    return request({
      url: '/system/incident/returnIncidentList',
      method: 'get',
      params: query
    })
  }

// 事件督办-统计数据
export function statistics(query) {
  return request({
    url: '/system/incident/getIncidentOfIndex',
    method: 'get',
    params: query
  })
}


  // 事件督办-高级查询表格信息
  export function advanceSelect(query) {
    return request({
      url: '/system/incident/advanceSelect',
      method: 'get',
      params: query
    })
  }

  // 事件督办-我的事件-未处理事件详情
  export function getNoDisposeInfo(data) {
    return request({
      url: '/system/incident/getNoDisposeInfo',
      method: 'post',
      data: data
    })
  }

// 事件督办-上报事件柱状图
export function Columnarone(query) {
  return request({
    url: '/system/incident/statisticsReportOrFinish',
    method: 'get',
    params: query
  })
}

// 事件督办-折线图
export function statisticsLine(query) {
  return request({
    url: '/system/incident/statisticsLineChart',
    method: 'get',
    params: query
  })
}

