import request from "@/utils/request";

//实有人口-获取树状下拉框数据（半棵树）
export function treeHalfList(query) {
  return request({
    url: "/system/area/treeHalfList",
    method: "get",
    params: query,
  });
}

//实有人口-获取树状下拉框数据
export function treeList(query) {
  return request({
    url: "/system/area/treelist",
    method: "get",
    params: query,
  });
}

//实有人口-获取饼图数据
export function pieList(query) {
  return request({
    url: "/system/people/peopleExtendTypeCount",
    method: "get",
    params: query,
  });
}
// 年龄信息-饼图2
export function pieageList(query) {
  return request({
    url: "/system/people/getAgeInfoByPeople",
    method: "get",
    params: query,
  });
}

//实有人口-获取人员类型数据
export function peopleTypeList(query) {
  return request({
    url: "/system/people/peopleTypeCount",
    method: "get",
    params: query,
  });
}

//实有人口-获取小区下拉框数据
export function estateList(query) {
  return request({
    url: "/system/community/list",
    method: "get",
    params: query,
  });
}

//实有人口-获取楼房下拉框数据
export function buildingList(query) {
  return request({
    url: "/system/buiding/buildingsByCId",
    method: "get",
    params: query,
  });
}

//实有人口-区域所有下级网格
export function childrenList(query) {
  return request({
    url: "/system/area/selectSonAreas",
    method: "get",
    params: query,
  });
}

//实有人口-区域所有下级网格（无分页）
export function childrenListNoPage(query) {
  return request({
    url: "/system/area/listNoPage",
    method: "get",
    params: query,
  });
}

// 查询实有人口所有人员信息
export function getPeopleList(query) {
  return request({
    url: "/system/people/peopleList",
    method: "get",
    params: query,
  });
}

// 查询实有人口所有人员信息（加用户权限）
export function getPeopleListLimit(data) {
  return request({
    url: "/system/people/peopleListWithLimit",
    method: "post",
    data: data,
  });
}
// 数据查询页面的查询人口信息
export function comprehensiveQueryPeople(data) {
  return request({
    url: "/system/people/comprehensiveQueryPeople",
    method: "post",
    data: data,
  });
}
// 下载接口配置
export function exportFailFile(params) {
  return request({
    url: "/system/people/exportFailFile",
    method: "get",
    responseType: "arraybuffer", // 配置响应头，不配置的话会造成，文件下载下来了，但是“无法打开”
    params: params,
  });
}
// export function exportFailFile(params) {
//   return request({
//     url: "/system/people/exportFailFile",
//     method: "get",
//     params,
//     responseType: "blob",
//   });
// }

// 获取房屋信息
export function getHouseList(query) {
  return request({
    url: "/system/people/peopleHouseList",
    method: "get",
    params: query,
  });
}

// 删除人口
export function delPeople(controlId) {
  return request({
    url: "/system/people/" + controlId,
    method: "delete",
  });
}

// 根据id查询人员详细信息
export function getPeople(id) {
  return request({
    url: "/system/people/" + id,
    method: "get",
  });
}

// 获取人口类型状态
export function getPeopleStatus(query) {
  return request({
    url: "/system/house/typeName",
    method: "get",
    params: query,
  });
}

// 修改人口卡片模板控件
export function updatePeople(data) {
  return request({
    url: "/system/people/edit",
    method: "put",
    data: data,
  });
}

// 获取人员关系
export function getPeopleRelationship(query) {
  return request({
    url: "/system/relationship/graph",
    method: "get",
    params: query,
  });
}

//实有人口-添加卡片卡片类型
export function allInfo(query) {
  return request({
    url: "/system/template/allInfo",
    method: "get",
    params: query,
  });
}

//实有人口-添加卡片选择卡片类型调用类型接口
export function getCardByTemplateId(data) {
  return request({
    url: "/system/card/getCardByTemplateId",
    method: "post",
    data: data,
  });
}

//实有人口-添加卡片保存卡片
export function saveCardData(data) {
  return request({
    url: "/system/data/saveCardData",
    method: "post",
    data: data,
  });
}

//实有人口-查找人员卡片
export function selectCardData(data) {
  return request({
    url: "/system/data/selectCardData",
    method: "post",
    data: data,
  });
}

//实有人口-删除卡片
export function deleteCardByDataId(query) {
  return request({
    url: "/system/data/deleteCardByDataId",
    method: "get",
    params: query,
  });
}

//实有人口-编辑人员卡片
export function returnCardDataById(data) {
  return request({
    url: "/system/data/returnCardDataById",
    method: "post",
    data: data,
  });
}

//实有人口-编辑人员卡片保存
export function updateCardData(data) {
  return request({
    url: "/system/data/updateCardData",
    method: "post",
    data: data,
  });
}

//实有人口-人口卡片模板级联树
export function cardTree(query) {
  return request({
    url: "/system/template/getPeopleCardTree",
    method: "get",
    params: query,
  });
}

//实有人口-人口卡片模板已选数据获取内容
export function cardList(query) {
  return request({
    url: "/system/card/getSelectPeopleCard",
    method: "get",
    params: query,
  });
}
