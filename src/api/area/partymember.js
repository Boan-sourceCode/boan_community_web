import request from '@/utils/request'
//查询党员卡片列表
export function partyList(query) {
    return request({
        url: '/system/member/selectMemberInfo',
        method: 'get',
        params: query,
    })
}

//查询党组织树（加权限）
export function partyTreeLimit(query) {
    return request({
        url: '/system/party/getPartyTree',
        method: 'get',
        params: query,
    })
}

//查询党组织树（不加权限）
export function partyTree(query) {
    return request({
        url: '/system/party/treelist',
        method: 'get',
        params: query,
    })
}

//添加党员荣誉
export function memberHonor(data) {
    return request({
        url: '/system/memberHonor/add',
        method: 'post',
        data: data
    })
}

//党员卡片编辑
export function partyEdit(query) {
    return request({
        url: '/system/member/returnEditInfo',
        method: 'get',
        params: query,
    })
}

//党员职务
export function partyPost(query) {
    return request({
        url: '/system/duty/listNoPage',
        method: 'get',
        params: query,
    })
}

//新增党员保存
export function addpartySubmit(data) {
    return request({
        url: '/system/member/add',
        method: 'post',
        data: data
    })
}

//编辑保存
export function partySubmit(data) {
    return request({
        url: '/system/member/updateInfo',
        method: 'put',
        data: data
    })
}
//删除党员
export function deleteEdit(query) {
    return request({
        url: '/system/member/deleteInfo',
        method: 'delete',
        params: query,
    })
}



//查询优秀党员
export function partyMember(query) {
    return request({
        url: '/system/memberHonor/list',
        method: 'get',
        params: query,
    })
}

//查询历史党员
export function historyParty(query) {
    return request({
        url: '/system/member/getHistoryParty',
        method: 'get',
        params: query,
    })
}

//查询流动党员
export function flowParty(query) {
    return request({
        url: '/system/flow/list',
        method: 'get',
        params: query,
    })
}

//党员详情
export function memberDetails(query) {
    return request({
        url: '/system/member/returnEditInfo',
        method: 'get',
        params: query,
    })
}

//党员拓扑图
export function memberGraph(query) {
    return request({
        url: '/system/member/graph',
        method: 'get',
        params: query,
    })
}