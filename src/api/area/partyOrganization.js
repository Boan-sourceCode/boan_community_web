import request from '@/utils/request'
//党组织列表-党组织信息
export function selectPartyInfo(query) {
  return request({
    url: '/system/party/selectPartyInfo',
    method: 'get',
    params: query
  })
}

//党组织列表-党组织的党员信息（分页）/党员选择器
export function selectPartyMember(query) {
  return request({
    url: '/system/member/selectByPartyBranch',
    method: 'get',
    params: query
  })
}

//保存所选的党员信息
export function submitPartyMember(query) {
  return request({
    url: '/system/member/returnSelectMember',
    method: 'get',
    params: query
  })
}

//党组织列表-党组织的党员信息（不分页）
export function selectPartyMemberNoPage(data) {
  return request({
    url: '/system/member/selectByPartyBranchNoPage',
    method: 'post',
    data: data
  })
}

//党组织列表-下级党组织信息
export function selectChildParty(query) {
  return request({
    url: '/system/party/selectChildParty',
    method: 'get',
    params: query
  })
}

//党组织-根据id查询党组织
export function selectParty(id) {
  return request({
    url: '/system/party/selectPartyInfoById/' + id,
    method: 'get',
  })
}
//党组织-删除党组织
export function deleteParty(query) {
  return request({
    url: '/system/party/deleteById',
    method: 'delete',
    params: query
  })
}

//党组织-编辑党组织保存
export function partyEdit(data) {
  return request({
    url: '/system/party/edit',
    method: 'put',
    data: data
  })
}

//党组织-查询优秀党组织
export function honorList(query) {
  return request({
    url: '/system/honor/list',
    method: 'get',
    params: query
  })
}

//党组织-添加优秀党组织
export function partyInfo(query) {
  return request({
    url: '/system/party/getPartyInfo',
    method: 'get',
    params: query
  })
}

//党组织-添加优秀党组织保存
export function honorParty(data) {
  return request({
    url: '/system/honor/addHonorParty',
    method: 'post',
    data: data
  })
}

//党组织-查询党内职务
export function dutyList(query) {
  return request({
    url: '/system/duty/list',
    method: 'get',
    params: query
  })
}

//党组织-添加党内职务
export function dutyAdd(data) {
  return request({
    url: '/system/duty/add',
    method: 'post',
    data: data
  })
}

//党组织-编辑党内职务保存
export function dutyEdit(data) {
  return request({
    url: '/system/duty/edit',
    method: 'put',
    data: data
  })
}

// 删除党内职务
export function dutyDel(id) {
  return request({
    url: '/system/duty/del/' + id,
    method: 'delete'
  })
}


// 党组织-地图标注
export function updateParty (data) {
  return request ({
    url: '/system/party/updateParty',
    method: 'put',
    data: data
  })
}

//党组织-添加党组织（保存）
export function addParty(data) {
  return request({
    url: '/system/party/addParty',
    method: 'post',
    data: data
  })
}
