import request from '@/utils/request'

// 查询实有房屋信息列表
export function listHouse(query) {
    return request({
        url: '/system/house/list',
        method: 'get',
        params: query
    })
}

// 查询实有房屋信息详细
export function getHouse(id) {
    return request({
        url: '/system/house/' + id,
        method: 'get'
    })
}

// 新增实有房屋信息
export function addHouse(data) {
    return request({
        url: '/system/house',
        method: 'post',
        data: data
    })
}

// 修改实有房屋信息
export function updateHouse(data) {
    return request({
        url: '/system/house',
        method: 'put',
        data: data
    })
}

// 删除实有房屋信息
export function delHouse(id) {
    return request({
        url: '/system/house/' + id,
        method: 'delete'
    })
}

// 查询全部卡片
export function getAllBuilding(query) {
    return request({
        url: '/front/building/selectAllBuilding/',
        method: 'get',
        params: query
    })
}
// 实有建筑 - 根据条件查询卡片
export function getSelectBuilding(query) {
    return request({
        url: '/front/building/selectBaBuilding',
        method: 'get',
        params: query
    })
}
//获取树状下拉框数据（半棵树）
export function halfTreeList(query) {
    return request({
        url: '/system/area/treeHalfList',
        method: 'get',
        params: query
    })
}
// 半棵树区域所有下级网格
export function childrenList(query) {
    return request({
        url: '/system/area/list',
        method: 'get',
        params: query
    })
}

//半棵树区域所有下级网格（无分页）
export function childrenListNoPage(query) {
    return request({
        url: '/system/area/listNoPage',
        method: 'get',
        params: query
    })
}

export function getAreaTree(query) {
    return request({
        url: '/system/area/selectSonAreas',
        method: 'get',
        params: query
    })
}
// 楼房详情页 - 左侧卡片信息
export function getBuildingInfoLeft(query) {
    return request({
        url: '/front/building/getBuildingInfo',
        method: 'get',
        params: query
    })
}
// 楼房详情页 - 返回楼房的单元以及层数
export function getUnitAndStory(query) {
    return request({
        url: '/front/building/getUnitAndStory',
        method: 'get',
        params: query
    })
}
// 楼房详情页 - 获取某个单元下/某个楼层下所有的房屋信息
export function getUnitAndFloorHoseInfo(query) {
    return request({
        url: '/front/house/getHouseByBuildingId',
        method: 'get',
        params: query
    })
}
// 楼房详情页 - 点击【编辑单元】，返回某栋楼的所有单元信息
export function getBuildingUnitInfo(query) {
    return request({
        url: '/front/building/getUnitInfo',
        method: 'get',
        params: query
    })
}
// 添加楼房 - 返回网格信息以及网格下的小区
export function getReturnGridInfo(query) {
    return request({
        url: '/front/building/returnGridInfo',
        method: 'get',
        params: query
    })
}
// 添加楼房 - 添加楼房第一步保存以及返回默认楼房信息
export function saveBuildReturnData(data) {
    return request({
        url: '/front/building/returnData',
        method: 'post',
        data: data
    })
}
// 添加楼房 - 第二步点击下一步后，返回层数以及默认户数，并批量添加数据
export function addBuildStepTwo(data) {
    return request({
        url: '/front/building/addBuilding',
        method: 'post',
        data: data
    })
}
// 添加楼房 - 第三步生成门牌号接口
export function createHouseNumber(data) {
    return request({
        url: '/front/house/createHouseNumber',
        method: 'post',
        data: data
    })
}
// 添加楼房 - 第三步点击下一步直接返回默认门牌号
export function createDefaultHouseNumber(query) {
    return request({
        url: '/front/house/createDefaultHouseNumber',
        method: 'get',
        params: query
    })
}
// 添加楼房 - 第三步切换单元楼
export function createUpdateHouseNumber(query) {
    return request({
        url: '/front/house/createUpdateHouseNumber',
        method: 'get',
        params: query
    })
}
// 添加楼房 - 第三步修改每层的默认户数
export function updateFloorNumber(query) {
    return request({
        url: '/front/house/updateUnitPerfloorHousenumber',
        method: 'get',
        params: query
    })
}
// 添加楼房 - 第四步修改指定层数门牌号
export function updateHouseNumber(data) {
    return request({
        url: '/front/house/updateHouseNumber',
        method: 'post',
        data: data
    })
}
// 添加楼房 - 第五步生成房屋信息
export function createHouseTable(query) {
    return request({
        url: '/front/house/createHouseTable',
        method: 'get',
        params: query
    })
}
// 添加楼房 - 第五步修改楼房地址
export function stepFiveUpdateAddress(data) {
    return request({
        url: '/front/house/updateAddress',
        method: 'post',
        data: data
    })
}
// 添加楼房 - 第五步确认
export function batchInsertHouse(query) {
    return request({
        url: 'front/house/batchInsertHouse',
        method: 'get',
        params: query
    })
}
// 房屋详情页 - 左边侧边栏卡片详细信息
export function getHouseInfoById(query) {
    return request({
        url: '/front/house/getHouseInfoById',
        method: 'get',
        params: query
    })
}
// 房屋详情页 - 根据房屋ID获取房屋下所有人口信息
export function getPeopleById(query) {
    return request({
        url: '/system/people/getPeopleById',
        method: 'get',
        params: query
    })
}
// 房屋详情页 - 编辑人员卡片信息
export function editPeopleInfo(query) {
    return request({
        url: '/system/people/returnDefaultPeopleInfo',
        method: 'get',
        params: query
    })
}
// 房屋详情页 - 编辑人员接口
export function updatePeopleInfo(query) {
    return request({
        url: '/system/people/updatePeopleInfo',
        method: 'get',
        params: query
    })
}
// 楼房 - 高级页面检索
export function getBuildingHeightInfo(query) {
    return request({
        url: '/front/building/advanceSelect',
        method: 'get',
        params: query
    })
}

// 楼房 - 高级页面检索（加用户权限）
export function getBuildingHeightInfoLimit(query) {
    return request({
        url: '/front/building/advanceSelectWithLimit',
        method: 'get',
        params: query
    })
}
// 楼房 - 高级页面 - 点击编辑返回默认信息
export function returnDefaultBuild(query) {
    return request({
        url: '/front/building/returnDefaultBuilding',
        method: 'get',
        params: query
    })
}
// 楼房 - 高级页面 - 查询所属小区
export function queryBuildingArea(query) {
    return request({
        url: '/front/building/advanceSelectBefore',
        method: 'get',
        params: query
    })
}
// 楼房 - 高级页面 - 编辑保存接口
export function updateBuliding(data) {
    return request({
        url: '/front/building/updateBuilding',
        method: 'post',
        data: data
    })
}
// 楼房 - 高级页面 - 删除对应表格数据接口
export function deleteBuilding(data) {
    return request({
        url: '/front/building/deleteBuilding',
        method: 'post',
        data: data
    })
}
// 楼房 - 高级页面 - 导出
export function advanceExport(query) {
    return request({
        url: '/front/building/advanceExport',
        method: 'get',
        params: query
    })
}
// 楼房 - 高级 - 移动
export function moveOtherAreaPort(data) {
    return request({
        url: '/front/building/moveToOtherArea',
        method: 'post',
        data: data
    })
}
// 楼房 - 高级 - 批量修改前返回选中的数据
export function retrunUpdateInfo(data) {
    return request({
        url: '/front/building/returnUpdateInfo',
        method: 'post',
        data: data
    })
}
// 楼房 - 高级 - 批量修改标准地址/批量设置楼房、院落属性
export function batchUpdateAddress(data) {
    return request({
        url: '/front/building/batchUpdateAddress',
        method: 'post',
        data: data
    })
}
// 添加院落 - 第二步生成院落地址
export function createCourtyardTable(data) {
    return request({
        url: '/front/building/createCourtyardTable',
        method: 'post',
        data: data
    })
}
// 添加院落 - 第三步更新院落地址
export function updateHouseAddress(data) {
    return request({
        url: '/front/building/updateAddress',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 删除卡片楼栋信息
export function deleteCardInfo(query) {
    return request({
        url: '/front/building/deleteCardBuilding',
        method: 'get',
        params: query
    })
}
// 实有建筑 - 楼房详情页 - 编辑单元格 - 删除单元格
export function deleteCommunity(query) {
    return request({
        url: '/front/building/deleteUnit',
        method: 'get',
        params: query
    })
}

//查询楼长
export function getBuildingMaster(query) {
    return request({
        url: '/system/buiding/selectBuildingMaster',
        method: 'get',
        params: query
    })
}

// 房屋高级页面初始化返回信息
export function houseAdvanceSelectBefore(data) {
    return request({
        url: '/front/building/houseAdvanceSelectBefore',
        method: 'post',
        data: data
    })
}
// 房屋高级页面初始化返回信息
export function houseAdvanceSelect(query) {
    return request({
        url: '/front/building/houseAdvanceSelect',
        method: 'get',
        params: query
    })
}

// 房屋高级页面初始化返回信息（加用户权限）
export function houseAdvanceSelectLimit(query) {
    return request({
        url: '/front/building/houseAdvanceSelectWithLimit',
        method: 'get',
        params: query
    })
}

// 楼房详情页 - 编辑单元修改单元信息
export function updateUnitInfo(data) {
    return request({
        url: '/front/building/updateUnitInfo',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋高级页面 - 编辑页面初始化获取信息
export function houseReturnUnpdateInfo(id) {
    return request({
        url: '/system/house/' + id,
        method: 'get',
    })
}
// 实有建筑 - 房屋高级页面 - 编辑保存
export function houseSaveEdit(data) {
    return request({
        url: '/system/house/edit',
        method: 'put',
        data: data
    })
}
// 实有建筑 - 房屋高级页面 - 删除
export function houseHeightDelete(data) {
    return request({
        url: '/front/house/deleteHouse',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋高级页面 - 批量修改房层属性返回选中表格信息
export function batchUpdateHouseBefore(data) {
    return request({
        url: '/front/house/batchUpdateHouse',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋高级页面 - 批量修改房层属性保存接口
export function batchUpdateHouseInfo(data) {
    return request({
        url: '/front/house/batchUpdateHouseInfo',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋高级页面 - 批量导出接口
export function houseExport(data) {
    return request({
        url: '/front/house/houseExport',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 楼房高级页面 - 根据查询条件导出
export function buildingExport(data) {
    return request({
        url: '/system/buiding/export',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋高级页面 - 高级检索获取单元和楼层
export function getUnitAndStoreyById(query) {
    return request({
        url: '/front/building/getUnitAndStoreyById',
        method: 'get',
        params: query
    })
}
// 实有建筑 - 楼房详情页 - 添加新单元
export function buildingInfoAddUnit(data) {
    return request({
        url: '/front/building/addUnitOfEdit',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋编辑初始化获取房屋信息
export function editHouseBefore(data) {
    return request({
        url: '/front/house/editHouseBefore',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋卡片编辑保存
export function houseCardUpdate(data) {
    return request({
        url: '/front/building/updateHouse',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋卡片添加保存
export function houseAddCardUpdate(data) {
    return request({
        url: '/front/building/addHouse',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋详情页 - 添加人员时根据身份证号码查询有无该人员信息
export function judgeCertificateId(query) {
    return request({
        url: '/front/house/judgeCertificateId',
        method: 'get',
        params: query
    })
}

// 实有建筑 - 房屋详情页 - 添加人员保存信息接口
export function insertHaveNotPeople(data) {
    return request({
        url: '/front/house/insertHaveNotPeople',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋详情页 - 添加人员修改接口
export function insertHavePeople(data) {
    return request({
        url: '/front/house/insertHavePeople',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 房屋详情页 - 删除人员卡片接口
export function deleteBaHousepeopleRelationshipByShipId(query) {
    return request({
        url: '/system/relationship/deleteBaHousepeopleRelationshipByShipId',
        method: 'get',
        params: query
    })
}
// 实有建筑 - 楼房详情页GIS标注
export function updateGIS(data) {
    return request({
        url: '/front/building/updateGIS',
        method: 'post',
        data: data
    })
}
// 实有建筑 - 主页获取网格下房屋信息接口
export function selectAccount(query) {
    return request({
        url: '/front/building/selectAccount',
        method: 'get',
        params: query
    })
}

// 实有建筑 - 主页获取网格下建筑类型和建筑用途
export function buildArchTypeAndPur(query) {
    return request({
        url: '/front/building/getArchTypeAndPur',
        method: 'get',
        params: query
    })
}

// 实有建筑 -楼房详情页 - 实有人口数据
export function getCount(data) {
    return request({
        url: '/front/building/getCount',
        method: 'post',
        data: data
    })
}

// 实有建筑-编辑楼房-选择建筑类型调用接口
export function getArchiPurposeByType(query) {
    return request({
        url: '/front/building/getArchiPurposeByType',
        method: 'get',
        params: query
    })
}

// 实有建筑 -楼房详情页 - 编辑单元修改
export function updateCardData(data) {
    return request({
        url: '/front/building/updateUnitInfo',
        method: 'post',
        data: data
    })
}


// 实有建筑 -楼房详情页 - 门牌号修改
export function returnNumberList(data) {
    return request({
        url: '/front/building/returnNumberList ',
        method: 'post',
        data: data
    })
}

// 房屋详情页 - 根据房屋ID获取房屋下所有企业信息
export function getEnterpriseById(query) {
    return request({
        url: '/system/enterprise/selectInfoByHouseId',
        method: 'get',
        params: query
    })
}

// 实有建筑 - 房屋详情页 - 添加企业时根据企业名称查询有无该企业信息
export function judgeEnterprise(query) {
    return request({
        url: '/front/house/judgeEnterprise',
        method: 'get',
        params: query
    })
}

// 实有建筑 - 房屋详情页 - 添加企业保存信息接口
export function enterRelationship(data) {
    return request({
        url: '/system/enterRelationship',
        method: 'post',
        data: data
    })
}
// 新增企业信息
export function addEnterprise(data) {
    return request({
        url: '/system/enterprise/add',
        method: 'post',
        data: data
    })
}