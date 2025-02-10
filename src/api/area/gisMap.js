import request from "@/utils/request";

//gis地图 —— 获取树形下拉框
export function treeList(query) {
  return request({
    url: "/system/area/treelist",
    method: "get",
    params: query,
  });
}

//gis地图 —— 概况（获取人口数据）
export function peopleList(query) {
  return request({
    url: "/system/people/peopleCount",
    method: "get",
    params: query,
  });
}

//gis地图 —— 概况（获取人口数据加权限）
export function peopleListLimit(query) {
  return request({
    url: "/system/people/peopleCountWithLimit",
    method: "get",
    params: query,
  });
}

//热力图数据（获取人口热力图数据）
export function getHeatMapList(query) {
  return request({
    url: "/system/area/selectHeatMap",
    method: "get",
    params: query,
  });
}

//gis地图 —— 概况（获取党员人数）
export function selectPartyMemberOfGIS(query) {
  return request({
    url: "/system/party/selectPartyMemberOfGIS",
    method: "get",
    params: query,
  });
}

// gis地图 —— 获取当前网格
export function getArea(areaId) {
  return request({
    url: "/system/area/" + areaId,
    method: "get",
  });
}

//gis地图 —— 获取下级网格
export function listArea(query) {
  return request({
    url: "/system/area/list",
    method: "get",
    params: query,
  });
}

//gis地图 —— 获取下级网格（无分页）
export function listAreaNoPage(query) {
  return request({
    url: "system/area/selectThisAndSonAreas",
    method: "get",
    params: query,
  });
}

//gis地图 —— 查询党组织
export function party(query) {
  return request({
    url: "/system/party/getPartiesWithGis",
    method: "get",
    params: query,
  });
}

//gis地图 —— 企业类型统计
export function countType(query) {
  return request({
    url: "/system/enterprise/countTypeWithLimit",
    method: "get",
    params: query,
  });
}

//gis地图 —— 查询企业 （分页）
export function enterprise(query) {
  return request({
    url: "/system/enterprise/list",
    method: "get",
    params: query,
  });
}

//gis地图 —— 查询企业 （无分页）
export function enterpriseNoPage(query) {
  return request({
    url: "/system/enterprise/listNoPageToGis",
    method: "get",
    params: query,
  });
}

//gis地图 —— 建筑类型统计
export function BuildType(query) {
  return request({
    url: "/system/buiding/countBuilding",
    method: "get",
    params: query,
  });
}

//gis地图 —— 根据建筑类型查询建筑用途
export function BuildPurpose(query) {
  return request({
    url: "/system/buildingType/getPurpose",
    method: "get",
    params: query,
  });
}

//gis地图 —— 查询建筑 （分页）
export function build(query) {
  return request({
    url: "/system/buiding/baBuildingListPage",
    method: "get",
    params: query,
  });
}

//gis地图 —— 查询建筑 （无分页）
export function buildNoPage(query) {
  return request({
    url: "/system/buiding/baBuildingList",
    method: "get",
    params: query,
  });
}

//gis地图 —— 部件类型统计
export function partsType(query) {
  return request({
    url: "/system/attachments/statisticNum",
    method: "get",
    params: { ...query, isTagging: 0 },
  });
}

//gis地图 —— 查询部件 （分页）
export function parts(query) {
  return request({
    url: "/system/attachments/withGisList",
    method: "get",
    params: query,
  });
}

//gis地图 —— 查询部件 （无分页）
export function partsNoPage(query) {
  return request({
    url: "/system/attachments/withGisListNoPage",
    method: "get",
    params: query,
  });
}

//gis地图 —— 事件类型统计
export function eventType(query) {
  return request({
    url: "/system/incident/statisticCount",
    method: "get",
    params: query,
  });
}

//gis地图 —— 查询事件 （分页）
export function event(query) {
  return request({
    url: "/system/incident/withGisList",
    method: "get",
    params: query,
  });
}

//gis地图 —— 查询事件 （无分页）
export function eventNoPage(query) {
  return request({
    url: "/system/incident/withGisNoPage",
    method: "get",
    params: query,
  });
}
