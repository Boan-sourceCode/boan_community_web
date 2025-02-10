import request from '@/utils/request'
import requestForGuoWenJun from '@/utils/requestForGuoWenJun'

// guowenjun.top测试
export async function dsgetDetail() {
  return requestForGuoWenJun({
    url: '/ds/getDetail',
    method: 'get'
  })
}
// 大数据首页
export function selectIndexData(query) {
  return request({
    url: '/system/meeting/selectIndexData',
    method: 'get',
    params: query
  })
}
// 党建数字接口
//export function partyNumber(query) {
//return request({
//  url: '/system/party/selectPartyInfoOfIndex',
//  method: 'get',
//  params: query
//})
//}
// 党建数字接口
export function partyNumber(query) {
  return request({
    url: '/system/party/selectPartyAndMember',
    method: 'get',
    params: query
  })
}

//实有人口饼图接口
export function peopleType(query) {
  return request({
    url: '/system/people/selectPeopleType',
    method: 'get',
    params: query
  })
}

//事件趋势图
export function eventTrends(query) {
  return request({
    url: '/system/incident/selectIncidentTrend',
    method: 'get',
    params: query
  })
}

//智慧党建
//三会一课

//数据地图四合一接口
export function partyDataAll(query) {
  return request({
    url: '/system/meeting/selectPartyData',
    method: 'get',
    params: query
  })
}
export function meeting(query) {
  return request({
    url: '/system/meeting/selectMeetingType',
    method: 'get',
    params: query
  })
}

//党龄分布
export function partyAge(query) {
  return request({
    url: '/system/meeting/selectMeetingPartyAge',
    method: 'get',
    params: query
  })
}

//学历分布
export function education(query) {
  return request({
    url: '/system/meeting/selectMeetingEducation',
    method: 'get',
    params: query
  })
}

//学历分布
export function video(query) {
  return request({
    url: '/system/config/6',
    method: 'get',
    params: query
  })
}

//会议名称
export function meetingName(query) {
  return request({
    url: '/system/meeting/selectMeetingInformation',
    method: 'get',
    params: query
  })
}

//党费缴纳
export function partyFeePayment(query) {
  return request({
    url: '/system/meeting/selectMeetingPartyFeePayment',
    method: 'get',
    params: query
  })
}


//新实有建筑

export function newBuildNew(query) {
  return request({
    url: '/system/people/selectBuildingType',
    method: 'get',
    params: query
  })
}


//建筑类型

export function buildType(query) {
  return request({
    url: '/system/buiding/selectBuildingType',
    method: 'get',
    params: query
  })
}

//房屋性质
export function houseStatus(query) {
  return request({
    url: '/system/buiding/selectBuildingHouseStatus',
    method: 'get',
    params: query
  })
}

//房屋产权
export function houseProperty(id) {
  return request({
    url: '/system/buiding/selectBuildingHousePropertyRight/' + id,
    method: 'get',
  })
}

//中间统计楼房，院落，房屋的数量
export function buildingNum(query) {
  return request({
    url: '/system/people/selectBuildingNum',
    method: 'get',
    params: query
  })
}

//建筑名称
export function buildingInformation(query) {
  return request({
    url: '/system/buiding/selectBuildingInformation',
    method: 'get',
    params: query
  })
}

//建筑用途
export function buildingPurpose(query) {
  return request({
    url: '/system/buiding/selectBuildingPurpose',
    method: 'get',
    params: query
  })
}

//建筑隐患
export function hiddenDanger(query) {
  return request({
    url: '/system/buiding/selectBuildingHiddendanger',
    method: 'get',
    params: query
  })
}

//实有人口
//人口年龄
export function peopleAge(query) {
  return request({
    url: '/system/people/selectPeopleAge',
    method: 'get',
    params: query
  })
}

//人口学历分布
export function peopleEducation(query) {
  return request({
    url: '/system/people/selectPeopleEducation',
    method: 'get',
    params: query
  })
}

//民族人口数量
export function peopleNation(query) {
  return request({
    url: '/system/people/selectPeopleNation',
    method: 'get',
    params: query
  })
}

//中间统计人口
export function peopleStatistics(query) {
  return request({
    url: '/system/people/selectPeopleStatistics',
    method: 'get',
    params: query
  })
}

//人口卡片
export function peopleCard(query) {
  return request({
    url: '/system/people/selecePeopleCardOfBigData',
    method: 'get',
    params: query
  })
}

//服务群体
export function peopleServiceGroup(query) {
  return request({
    url: '/system/people/selectPeopleServiceGroup',
    method: 'get',
    params: query
  })
}

//人口比例
export function peopleProportion(query) {
  return request({
    url: '/system/people/selectPeopleProportion',
    method: 'get',
    params: query
  })
}

//婚姻状况
export function peopleMarry(query) {
  return request({
    url: '/system/people/selectMarryInfo',
    method: 'get',
    params: query
  })
}

//实有企业
//企业类型
export function enterpriseType(query) {
  return request({
    url: '/system/enterprise/selectEnterpriseType',
    method: 'get',
    params: query
  })
}

//企业人数
export function enterpriseNumber(query) {
  return request({
    url: '/system/enterprise/selectEnterpriseNumber',
    method: 'get',
    params: query
  })
}

//新增企业
export function addEnterprise(query) {
  return request({
    url: '/system/enterprise/selectAddEnterNum',
    method: 'get',
    params: query
  })
}

//企业组织类型
export function enterpriseOrganizationType(query) {
  return request({
    url: '/system/enterprise/selectEnterpriseOrganizationType',
    method: 'get',
    params: query
  })
}

//企业展示
export function enterpriseInformation(query) {
  return request({
    url: '/system/enterprise/selectEnterpriseInformation',
    method: 'get',
    params: query
  })
}

//企业规模
export function enterpriseScale(query) {
  return request({
    url: '/system/enterprise/selectEnterScale',
    method: 'get',
    params: query
  })
}

//事件管理
//事件类别
export function eventType(query) {
  return request({
    url: '/system/incident/selectIncidentCategory',
    method: 'get',
    params: query
  })
}

//事件数据
export function eventData(query) {
  return request({
    url: '/system/incident/selectIncidentData',
    method: 'get',
    params: query
  })
}

//网格事件
export function eventGrid(query) {
  return request({
    url: '/system/incident/statisticsLineChart',
    method: 'get',
    params: query
  })
}

//事件上报
export function eventReport(query) {
  return request({
    url: '/system/incident/selectIncidentReport',
    method: 'get',
    params: query
  })
}

//事件状态
export function eventStatus(query) {
  return request({
    url: '/system/incident/getIncidentStatus',
    method: 'get',
    params: query
  })
}

//事件状态饼图
export function incidentStatus(query) {
  return request({
    url: '/system/incident/getFinishOrAvg',
    method: 'get',
    params: query
  })
}

//事件规模
export function eventScale(query) {
  return request({
    url: '/system/incident/selectIncidentScale',
    method: 'get',
    params: query
  })
}
