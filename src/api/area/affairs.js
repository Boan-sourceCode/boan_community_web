import request from "@/utils/request";
// 左侧展示的资源栏目
export function getResChanTree(query) {
  return request({
    url: "/system/resChannel/getResChanTree",
    method: "get",
    params: query,
  });
}
//查询资源名称
export function list(query) {
  return request({
    url: "/system/resource/list",
    method: "get",
    params: query,
  });
}
//新增资源
export function resource(query) {
  return request({
    url: "/system/resource",
    method: "post",
    data: query,
  });
}
//删除资源
export function delZY(query) {
  return request({
    url: "/system/resource/del",
    method: "get",
    params: query,
  });
}
//新建栏目
export function resChannel(query) {
  return request({
    url: "/system/resChannel/add",
    method: "post",
    data: query,
  });
}
//展示该栏目的模板内容
export function getChannel(query) {
  return request({
    url: "/system/module/listNoPage",
    method: "get",
    params: query,
  });
}
//根据不同的组件组成不同的模型
export function model(query) {
  return request({
    url: "/system/model",
    method: "post",
    data: query,
  });
}
//左侧的栏目展示(内容管理)
export function getChannelTree(query) {
  return request({
    url: "/system/channel/getChannelTree",
    method: "get",
    params: query,
  });
}
//左侧的栏目展示(内容管理)
export function getInfo(query) {
  return request({
    url: "/system/channel/getInfo",
    method: "get",
    params: query,
  });
}
//新增栏目
export function channel(query) {
  return request({
    url: "/system/channel",
    method: "post",
    data: query,
  });
}

//查询资源名称
export function checklist(query) {
  return request({
    url: "/system/resource/list",
    method: "get",
    params: query,
  });
}

//发布下线
export function release_content(query) {
  return request({
    url: "/system/content/updateContentStatus",
    method: "post",
    data: query,
  });
}
//删除内容
export function LM_del(query) {
  return request({
    url: "/system/content/del",
    method: "delete",
    params: query,
  });
}

//模型列表
export function Templatelist(query) {
  return request({
    url: "/system/model/list",
    method: "get",
    params: query,
  });
}
//查看资源信息
export function ZY_getInfo(query) {
  return request({
    url: "/system/resource/getInfo",
    method: "get",
    params: query,
  });
}
//编辑模板详情
export function Model_XX(query) {
  return request({
    url: "/system/model",
    method: "put",
    data: query,
  });
}
//删除模板
export function Model_del(query) {
  return request({
    url: "/system/model/del/" + query,
    method: "delete",
  });
}
//获取模板信息
export function Model_getInfo(query) {
  return request({
    url: "/system/model/getInfo",
    method: "get",
    params: query,
  });
}

//展示该栏目的模板内容
export function LM_list(query) {
  return request({
    url: "/system/content/list",
    method: "get",
    params: query,
  });
}
//是否默认展示该栏目的模板内容
export function LM_open_show(query) {
  return request({
    url: "/system/content/updateContentStatus",
    method: "post",
    data: query,
  });
}
//展示栏目对应的模板
export function LM_getChannel(query) {
  return request({
    url: "/system/model/getChannel",
    method: "get",
    params: query,
  });
}
//查看栏目下内容
export function LM_getInfo(query) {
  return request({
    url: "/system/content/getInfo",
    method: "get",
    params: query,
  });
}

//保存内容
export function LM_content1(query) {
  return request({
    url: "/system/content/addContent",
    method: "post",
    data: query,
  });
}
//编辑内容
export function LM_content2(query) {
  return request({
    url: "/system/content/updateContent",
    method: "post",
    data: query,
  });
}

//栏目类型
export function channel_type(query) {
  return request({
    url: "system/dict/data/type/channel_type",
    method: "get",
    params: query,
  });
}
//栏目类型
export function deleteChannel(query) {
  return request({
    url: "system/channel/deleteChannel/" + query,
    method: "delete",
  });
}
//更新保存栏目
export function updateChannel(query) {
  return request({
    url: "/system/channel/updateChannel",
    method: "put",
    data: query,
  });
}
