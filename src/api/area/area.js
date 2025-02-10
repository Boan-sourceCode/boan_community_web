import request from "@/utils/request";
// 查询全部树
export function treeListAll(query) {
  return request({
    url: "/system/area/treelist",
    method: "get",
    params: query,
  });
}
//网格管理-获取树状下拉框数据
export function treeList(query) {
  return request({
    url: "/system/area/getPartAreaTree",
    method: "get",
    params: query,
  });
}
//获取网格下的党组织信息
export function getByAreaId(query) {
  return request({
    url: "/system/party/selectPartyByAreaId",
    method: "get",
    params: query,
  });
}
export function getNoPIdList(query) {
  return request({
    url: "/system/area/getNoPIdList",
    method: "get",
    params: query,
  });
}

export function areaTree(query) {
  return request({
    url: "/system/area/getPartAreaTree",
    method: "get",
    params: query,
  });
}
//网格管理-获取树状下拉框数据（半棵树）
export function treeHalfList(query) {
  return request({
    url: "/system/area/treeHalfList",
    method: "get",
    params: query,
  });
}

//网格管理-获取页面数据
export function listArea(query) {
  return request({
    url: "/system/area/selectPageOneSonAreas",
    method: "get",
    params: query,
  });
}
//下载便民码的时候请求的数据
export function listOfBianMin(query) {
  return request({
    url: "/system/area/listOfBianMin",
    method: "get",
    params: {
      areaId: query
    },
  });
}
//网格管理-获取页面数据
export function listNoPage(query) {
  return request({
    url: "/system/area/listNoPage",
    method: "get",
    params: query,
  });
}
//网格管理-根据用户权限获取页面数据
export function listAreaLimit(query) {
  return request({
    url: "/system/area/getPartAreaTreeInfo",
    method: "get",
    params: query,
  });
}

// 查询网格-网格管理详细
export function getArea(areaId) {
  return request({
    url: "/system/area/" + areaId,
    method: "get",
  });
}

// 新增网格-网格管理
export function addArea(data) {
  return request({
    url: "/system/area",
    method: "post",
    data: data,
  });
}

// 删除网格-网格管理
export function delArea(areaId) {
  return request({
    url: "/system/area/areaId/" + areaId,
    method: "delete",
  });
}

export function updateArea(data) {
  return request({
    url: "/system/area/updateArea",
    method: "put",
    data: data,
  });
}

//添加网格-根据网格类型和上级网格获取网格级别
export function levelList(query) {
  return request({
    url: "/system/area/getAreaLevel",
    method: "get",
    params: query,
  });
}

//根据用户的部门返回可选的网格长
export function listUser(query) {
  return request({
    url: "/system/user/getAreaLeaderByDept",
    method: "get",
    params: query,
  });
}
//获取网格下的人口类型数量
export function getPeopleCount(query) {
  return request({
    url: "/system/people/getPeopleCount",
    method: "get",
    params: query,
  });
}
//查询建筑类型和建筑用途
export function getArchTypeAndPur(query) {
  return request({
    url: "/system/buiding/getPurposeOfArea",
    method: "get",
    params: query,
  });
}
//建筑数量
export function countRealBuilding(query) {
  return request({
    url: "/system/buiding/countRealBuilding",
    method: "get",
    params: query,
  });
}
//查询所有部件类型的数量
export function statisticNum(query) {
  return request({
    url: "/system/attachments/statisticNum",
    method: "get",
    params: query,
  });
}
//统计网格下的企业信息
export function selectEnterpriseInformation(query) {
  return request({
    url: "/system/enterprise/selectEnterpriseInformation",
    method: "get",
    params: query,
  });
}
//统计查询网格下的事件信息
export function selectIncidentReport(query) {
  return request({
    url: "/system/incident/selectIncidentReport",
    method: "get",
    params: query,
  });
}

//修改网格颜色
export function updateAreaWai(data) {
  return request({
    url: "/system/area/updateArea",
    method: "put",
    data: data,
  });
}
