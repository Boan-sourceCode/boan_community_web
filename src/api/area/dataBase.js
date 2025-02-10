
import request from '@/utils/request'

// 获取用户的党组织权限树
export function getTree(query) {
    return request({
      url: '/system/party/getPartyTree',
      method: 'get',
      params: query
    })
  }
// 查询党组织树
export function getTreeList(query) {
    return request({
      url: '/system/party/treelist',
      method: 'get',
      params: query
    })
  }
// 查询党组织信息
export function getPartyInfo(query) {
    return request({
      url: '/system/party/selectPartyInfo',
      method: 'get',
      params: query
    })
  }
// 查询一个党组织下的所有下级党组织
export function getChildParty(query) {
    return request({
      url: '/system/party/selectChildParty',
      method: 'get',
      params: query
    })
  }

// 查询三会一课
export function getMeetingByParty(query) {
    return request({
      url: '/system/meeting/selectMeetingByParty',
      method: 'get',
      params: query
    })
  }

// 党员选择器
export function getByPartyBranch(query) {
    return request({
      url: '/system/member/selectByPartyBranch',
      method: 'get',
      params: query
    })
  }


// 返回所选的党员信息
export function getMember(query) {
    return request({
      url: '/system/member/returnSelectMember',
      method: 'get',
      params: query
    })
  }



  // 首页返回指定党组织的党员信息
  export function getPartyBranch(data) {
    return request({
      url: '/system/member/selectByPartyBranch',
      method: 'post',
      data: data
    })
  }

