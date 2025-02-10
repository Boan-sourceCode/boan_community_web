<template>
	<div>
		<el-tabs v-model="active" type="card" class="tabs">
			<el-tab-pane name="实有楼房">
				<span slot="label"><i class="icon-city alignment"></i>实有楼房</span>
				<el-form v-model="buildingParams" size="small" :inline="true" label-width="82px">
					<el-form-item label="网格：" prop="areaId">
						<treeSelect v-model="buildingParams.areaId" :props="treeProps" :options="treeData" :value="value" :accordion="true" @getValue="getBuildingList($event)" placeholder="请选择">
						</treeSelect>
					</el-form-item>
					<el-form-item label="类型：" prop="houseType">
						<el-select clearable v-model="buildingParams.houseType" placeholder="请选择">
							<el-option v-for="dict in dict.type.building" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属小区：" prop="communityId">
						<el-select clearable v-model="buildingParams.communityId" placeholder="请选择" @change="getMaster">
							<el-option v-for="item in buildingAreaList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="建筑类型：" prop="architectureType">
						<el-select clearable v-model="buildingParams.architectureType" placeholder="请选择">
							<el-option v-for="dict in dict.type.building_type" :key="dict.value" :label="dict.label" :value="dict.value" @click.native="Buildingpulldown">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="建筑用途：" prop="architecturePurpose">
						<el-select clearable v-model="buildingParams.architecturePurpose" placeholder="请选择">
							<el-option v-for="dict in dingpulldown" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="房屋产权：" prop="housePropertyRight">
						<el-select clearable v-model="buildingParams.housePropertyRight" placeholder="请选择">
							<el-option v-for="dict in dict.type.house_property_right" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="楼隐患类型：" prop="hiddenDangerType" label-width="96px">
						<el-select clearable v-model="buildingParams.hiddenDangerType" placeholder="请选择">
							<el-option v-for="dict in dict.type.building_danger_type" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="楼隐患级别：" prop="hiddenDangerLevel" label-width="96px">
						<el-select clearable v-model="buildingParams.hiddenDangerLevel" placeholder="请选择">
							<el-option v-for="dict in dict.type.focous_degree" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="楼长：" prop="buildingMasterCard">
						<el-select clearable filterable v-model="buildingParams.buildingMasterCard" placeholder="请选择">
							<el-option v-for="item in masterList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<div>
						<el-form-item label="关键字：" prop="key">
							<el-input clearable v-model="buildingParams.key" placeholder="名称" />
						</el-form-item>
						<el-form-item>
							<el-button plain @click="handleBuildingQuery">查询</el-button>
						</el-form-item>
						<el-form-item style="float: right">
							<el-button v-hasPermi="['system:build:export']" @click="handleBuildingExport">批量导出</el-button>
						</el-form-item>
					</div>
				</el-form>
				<el-table :loading="loading" :data="buildingList" :header-cell-style="{background:'#EBF7FF'}" stripe border>
					<el-table-column type="selection" width="55" align="center" />
					<el-table-column label="序号" align="center" prop="id">
						<template slot-scope="scope">
							{{ (scope.$index+1)+(buildingParams.currentPage-1)*buildingParams.pageSize}}
						</template>
					</el-table-column>
					<el-table-column label="模板" prop="buildingTemplate" :show-overflow-tooltip="true" width="80" align="center">
						<template slot-scope="scope">
							<p v-if="scope.row.buildingTemplate === '' || scope.row.buildingTemplate === null">/</p>
							<p v-else>{{scope.row.buildingTemplate}}</p>
						</template>
					</el-table-column>
					<el-table-column label="类型" align="center" prop="houType">
						<template slot-scope="scope">
							<p v-if="scope.row.houseType === '' || scope.row.houseType === null">/</p>
							<p v-else>{{scope.row.houseType}}</p>
						</template>
					</el-table-column>
					<el-table-column label="名称" align="center" prop="buildingName" width="128">
						<template slot-scope="scope">
							<p v-if="scope.row.buildingName === '' || scope.row.buildingName === null">/</p>
							<p v-else>{{scope.row.buildingName}}</p>
						</template>
					</el-table-column>
					<el-table-column label="所属网格" align="center" prop="area_name" width="162">
						<template slot-scope="scope">
							<p v-if="scope.row.areaName === '' || scope.row.areaName === null">/</p>
							<p v-else>{{scope.row.areaName}}</p>
						</template>
					</el-table-column>
					<el-table-column label="所属小区" align="center" prop="communityName">
						<template slot-scope="scope">
							<p v-if="scope.row.communityName === '' || scope.row.communityName === null">/</p>
							<p v-else>{{scope.row.communityName}}</p>
						</template>
					</el-table-column>
					<el-table-column label="楼长" align="center" prop="buildingMaster">
						<template slot-scope="scope">
							<p v-if="scope.row.buildingMaster === '' || scope.row.buildingMaster === null">/</p>
							<p v-else>{{scope.row.buildingMaster}}</p>
						</template>
					</el-table-column>
					<el-table-column label="建筑类型" align="center" prop="architectureType">
						<template slot-scope="scope">
							<p v-if="scope.row.architectureType === '' || scope.row.architectureType === null">/</p>
							<p v-else>{{scope.row.architectureType}}</p>
						</template>
					</el-table-column>
					<el-table-column label="建筑用途" align="center" prop="architecturePurpose">
						<template slot-scope="scope">
							<p v-if="scope.row.architecturePurpose === '' || scope.row.architecturePurpose === null">/</p>
							<p v-else>{{scope.row.architecturePurpose}}</p>
						</template>
					</el-table-column>
					<el-table-column label="房屋产权" align="center" prop="housePropertyRight">
						<template slot-scope="scope">
							<p v-if="scope.row.housePropertyRight === '' || scope.row.housePropertyRight === null">/</p>
							<p v-else>{{scope.row.housePropertyRight}}</p>
						</template>
					</el-table-column>
					<el-table-column label="楼隐患类型" align="center" prop="hiddenDangerType">
						<template slot-scope="scope">
							<p v-if="scope.row.hiddenDangerType === '' || scope.row.hiddenDangerType === null">/</p>
							<p v-else>{{scope.row.hiddenDangerType}}</p>
						</template>
					</el-table-column>
					<el-table-column label="楼隐患级别" align="center" prop="hiddenDangerLevel">
						<template slot-scope="scope">
							<p v-if="scope.row.hiddenDangerLevel === '' || scope.row.hiddenDangerLevel === null">/</p>
							<p v-else>{{scope.row.hiddenDangerLevel}}</p>
						</template>
					</el-table-column>
					<el-table-column label="标准地址" align="center" prop="buildingAddress" width="462">
						<template slot-scope="scope">
							<p v-if="scope.row.buildingAddress === '' || scope.row.buildingAddress === null">/</p>
							<p v-else>{{scope.row.buildingAddress}}</p>
						</template>
					</el-table-column>
				</el-table>
				<p>共查询/检索{{ this.buildingParams.total }}条信息</p>

				<!-- 分页 -->
				<pagination :total="buildingParams.total" :page.sync="buildingParams.currentPage" :limit.sync="buildingParams.pageSize" @pagination="getBuildingList()" />
			</el-tab-pane>
			<el-tab-pane name="实有房屋">
				<span slot="label"><i class="icon-house alignment"></i>实有房屋</span>
				<el-form v-model="courtyardParams" size="small" :inline="true" label-width="82px">
					<el-form-item label="所属网格：" prop="areaId">
						<treeSelect v-model="courtyardParams.areaId" :props="treeProps" :options="treeData" :value="value" :accordion="true" @getValue="getCourtyardList($event)" placeholder="请选择">
						</treeSelect>
					</el-form-item>
					<el-form-item label="所属小区：" prop="communityName">
						<el-select clearable v-model="courtyardParams.communityId" placeholder="请选择" @change="getCourtyardBuilding">
							<el-option v-for="item in courtyardAreaList" :key="item.value" :label="item.label" :value=item.value>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属建筑：" prop="buidingId">
						<el-select clearable v-model="courtyardParams.buidingId" placeholder="请选择" @change="getCourtyardUnit">
							<el-option v-for="item in courtyardOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属单元：" prop="unitNumber">
						<el-select clearable v-model="courtyardParams.unitId" placeholder="请选择">
							<el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="楼层：" prop="storey">
						<el-select clearable v-model="courtyardParams.storey" placeholder="请选择">
							<el-option v-for="item in floorOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="房屋产权：" prop="housePropertyRight">
						<el-select clearable v-model="courtyardParams.housePropertyRight" placeholder="请选择">
							<el-option v-for="dict in dict.type.house_property_right" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="房屋房型：" prop="houseType">
						<el-select clearable v-model="courtyardParams.houseType" placeholder="请选择">
							<el-option v-for="dict in dict.type.house_housetype" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="房屋性质：" prop="houseProperty">
						<el-select clearable v-model="courtyardParams.houseProperty" placeholder="请选择">
							<el-option v-for="dict in dict.type.house_property" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="房屋用途：" prop="housePurpose">
						<el-select clearable v-model="courtyardParams.housePurpose" placeholder="请选择">
							<el-option v-for="dict in dict.type.courtyard_house_purpose" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="房屋隐患类型：" prop="hiddenDangerType" label-width="110px">
						<el-select clearable v-model="courtyardParams.hiddenDangerType" placeholder="请选择">
							<el-option v-for="dict in dict.type.building_danger_type" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="房屋隐患级别：" prop="hiddenDangerLevel" label-width="110px">
						<el-select clearable v-model="courtyardParams.hiddenDangerLevel" placeholder="请选择">
							<el-option v-for="dict in dict.type.focous_degree" :key="dict.value" :label="dict.label" :value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<div>
						<el-form-item label="关键字：" prop="keyWord">
							<el-input clearable v-model="courtyardParams.keyWord" placeholder="门牌号" />
						</el-form-item>
						<el-form-item>
							<el-button plain @click="handleCourtyardQuery">查询</el-button>
						</el-form-item>
						<el-form-item style="float: right">
							<el-button @click="handleCourtyardExport">批量导出</el-button>
						</el-form-item>
					</div>
				</el-form>
				<el-table :loading="loading" :data="courtyardList" :header-cell-style="{background:'#EBF7FF'}" stripe border>
					<!--              <el-table-column type="selection" width="55" align="center" />-->
					<!--              <el-table-column label="编号" align="center" prop="id" width="58"/>-->
					<!--              <el-table-column label="类型" align="center" prop="roleName" />-->
					<el-table-column label="序号" align="center" prop="id">
						<template slot-scope="scope">
							{{ (scope.$index+1)+(courtyardParams.currentPage-1)*courtyardParams.pageSize}}
						</template>
					</el-table-column>
					<el-table-column label="门牌号" align="center" prop="houseNumber">
						<template slot-scope="scope">
							<p v-if="scope.row.houseNumber === '' || scope.row.houseNumber === null">/</p>
							<p v-else>{{scope.row.houseNumber}}</p>
						</template>
					</el-table-column>
					<el-table-column label="所属网格" align="center" prop="areaName" width="162">
						<template slot-scope="scope">
							<p v-if="scope.row.areaName === '' || scope.row.areaName === null">/</p>
							<p v-else>{{scope.row.areaName}}</p>
						</template>
					</el-table-column>
					<el-table-column label="所属建筑" align="center" prop="communityName" width="114">
						<template slot-scope="scope">
							<p>{{scope.row.communityName}}{{scope.row.buidingNumber}}</p>
						</template>
					</el-table-column>
					<el-table-column label="所属单元" align="center" prop="unitNumber">
						<template slot-scope="scope">
							<p v-if="scope.row.unitNumber === '' || scope.row.unitNumber === null">/</p>
							<p v-else>{{scope.row.unitNumber}}</p>
						</template>
					</el-table-column>
					<el-table-column label="楼层" align="center" prop="storey" width="58">
						<template slot-scope="scope">
							<p v-if="scope.row.storey === '' || scope.row.storey === null">/</p>
							<p v-else>{{scope.row.storey}}</p>
						</template>
					</el-table-column>
					<el-table-column label="房屋产权" align="center" prop="housePropertyRight">
						<template slot-scope="scope">
							<p v-if="scope.row.housePropertyRight === '' || scope.row.housePropertyRight === null">/</p>
							<p v-else>{{scope.row.housePropertyRight}}</p>
						</template>
					</el-table-column>
					<el-table-column label="建筑面积（m²）" align="center" prop="houseMeasure">
						<template slot-scope="scope">
							<p v-if="scope.row.houseMeasure === '' || scope.row.houseMeasure === null">/</p>
							<p v-else>{{scope.row.houseMeasure}}</p>
						</template>
					</el-table-column>
					<el-table-column label="房屋房型" align="center" prop="houseType">
						<template slot-scope="scope">
							<p v-if="scope.row.houseType === '' || scope.row.houseType === null">/</p>
							<p v-else>{{scope.row.houseType}}</p>
						</template>
					</el-table-column>
					<el-table-column label="房屋性质" align="center" prop="houseProperty">
						<template slot-scope="scope">
							<p v-if="scope.row.houseProperty === '' || scope.row.houseProperty === null">/</p>
							<p v-else>{{scope.row.houseProperty}}</p>
						</template>
					</el-table-column>
					<el-table-column label="房屋用途" align="center" prop="housePurpose">
						<template slot-scope="scope">
							<p v-if="scope.row.housePurpose === '' || scope.row.housePurpose === null">/</p>
							<p v-else>{{scope.row.housePurpose}}</p>
						</template>
					</el-table-column>
					<el-table-column label="房屋隐患类型" align="center" prop="hiddenDangerType">
						<template slot-scope="scope">
							<p v-if="scope.row.hiddenDangerType === '' || scope.row.hiddenDangerType === null">/</p>
							<p v-else>{{scope.row.hiddenDangerType}}</p>
						</template>
					</el-table-column>
					<el-table-column label="房屋隐患级别" align="center" prop="hiddenDangerLevel">
						<template slot-scope="scope">
							<p v-if="scope.row.hiddenDangerLevel === '' || scope.row.hiddenDangerLevel === null">/</p>
							<p v-else>{{scope.row.hiddenDangerLevel}}</p>
						</template>
					</el-table-column>
					<el-table-column label="是否为落户房屋" align="center" prop="registeredStatus">
						<template slot-scope="scope">
							<p v-if="scope.row.registeredStatus === 0">是</p>
							<p v-if="scope.row.registeredStatus === 1">否</p>
						</template>
					</el-table-column>
					<el-table-column label="标准地址" align="center" prop="houseAddress" width="352">
						<template slot-scope="scope">
							<p v-if="scope.row.houseAddress === '' || scope.row.houseAddress === null">/</p>
							<p v-else>{{scope.row.houseAddress}}</p>
						</template>
					</el-table-column>
				</el-table>
				<p>共查询/检索{{ this.courtyardParams.total }}条信息</p>

				<!-- 分页 -->
				<pagination :total="courtyardParams.total" :page.sync="courtyardParams.currentPage" :limit.sync="courtyardParams.pageSize" @pagination="getCourtyardList()" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import { areaTree } from "@/api/area/area";
	import { getBuildingHeightInfoLimit, getBuildingMaster, houseAdvanceSelectLimit, getUnitAndStory,getArchiPurposeByType } from '@/api/area/house'
	import { buildingList, estateList } from "@/api/area/population";
	export default {
		name: "queryBuild",
		dicts: [
			'building',
			'building_type',
			'building_purpose',
			'house_property_right',
			'building_danger_type',
			'focous_degree',
			'house_housetype',
			'house_property',
			'courtyard_house_purpose',
		],
		data() {
			return {
				loading: true, // 遮罩层
				treeData: [], //下拉框数据
				treeProps: {
					label: "label",
					value: "id",
					children: "children",
				},
				value: '', //选中的数据
				//实有建筑
				active: '实有楼房', //实有建筑默认选项
				//实有楼房
				buildingList: [], //楼房表格数据
				buildingAreaList: [], //小区下拉框数据
				masterList: [], //楼长数据
				buildingParams: {
					userId: localStorage.getItem("userId"), //用户ID
					currentPage: 1, //当前页数
					pageSize: 10, //每页条数
					total: 0, // 总页数
				},

				//实有房屋
				courtyardList: [], //房屋表格数据
				courtyardAreaList: [], //小区下拉框数据
				courtyardOptions: [], //建筑下拉框数据
				unitOptions: [], //单元下拉框数据
				floorOptions: [], //楼层下拉框数据
				courtyardParams: {
					userId: localStorage.getItem("userId"), //用户ID
					currentPage: 1, //当前页数
					pageSize: 10, //每页条数
					total: 0, // 总页数
				},
        dingpulldown: [],// 实有建筑-编辑楼房-选择建筑类型建筑用途列表数据
			};
		},
		mounted() {
			this.getTree(); //树状下拉框
			this.getBuildingList(); //实有楼房数据
			this.getCourtyardList(); //实有房屋数据
		},
		methods: {
			// 查询树
			getTree() {
				let param = {
					userId: localStorage.getItem("userId"),
					flag: 0
				}
				// treeList().then(res => {
				areaTree(param).then(res => {
					this.treeData = res.data
				})
			},
			//实有建筑
			//实有楼房
			// 获取表格信息
			getBuildingList() {
				this.loading = true
				getBuildingHeightInfoLimit(this.buildingParams).then((res) => {
					if(res.code === 200) {
						this.buildingList = res.data.list
						this.buildingParams.total = res.data.total
						this.loading = false
						let param = {
							areaId: this.buildingParams.areaId
						}
						this.getBuildingEstate(param)
						this.getMaster(param)
					}
				})
			},
			// 查询小区（楼房）
			getBuildingEstate(value) {
				estateList(value).then(res => {
					let options = res.rows;
					this.buildingAreaList = options.map(item => {
						return {
							value: `${item.id}`,
							label: `${item.communityName}`
						};
					})
				})
			},
			// 查询楼长
			getMaster() {
				let param = {
					areaId: this.buildingParams.areaId,
					communityId: this.buildingParams.communityName
				}
				if(param.communityId === '') {
					param.communityId = null
				}
				getBuildingMaster(param).then(res => {
					let options = res.data;
					this.masterList = options.map(item => {
						return {
							value: `${item.buildingMasterCard}`,
							label: `${item.buildingMaster}`
						};
					})
				})
			},
			//查询
			handleBuildingQuery() {
				this.getBuildingList(this.buildingParams);
			},
			//批量导出
			handleBuildingExport() {
				this.download('/system/buiding/export', {
					...this.buildingParams
				}, `楼房信息-${new Date().getTime()}.xlsx`)
			},

			//实有房屋
			getCourtyardList() {
				this.loading = true
				houseAdvanceSelectLimit(this.courtyardParams).then((res) => {
					if(res.code === 200) {
						this.courtyardList = res.data.list
						this.courtyardParams.total = res.data.total
						this.loading = false
						let param = {
							areaId: this.courtyardParams.areaId
						}
						this.getCourtyardEstate(param)
					}
				})
			},
			// 查询小区（房屋）
			getCourtyardEstate(value) {
				estateList(value).then(res => {
					let options = res.rows;
					this.courtyardAreaList = options.map(item => {
						return {
							value: `${item.id}`,
							label: `${item.communityName}`
						};
					})
					this.getCourtyardBuilding()
				})
			},
			// 查询建筑
			getCourtyardBuilding() {
				let param = {
					areaId: this.courtyardParams.areaId,
					communityId: this.courtyardParams.communityId,
					houseType: null,
				}
				buildingList(param).then(res => {
					let options = res.data;
					this.courtyardOptions = options.map(item => {
						return {
							value: `${item.id}`,
							label: `${item.community_name}${item.buiding_number}`
						};
					})
				})
			},
			// 查询单元
			getCourtyardUnit() {
				let param = {
					areaId: this.courtyardParams.areaId,
					id: this.courtyardParams.buidingId,
				}
				getUnitAndStory(param).then(res => {
					let options = res.data;
					this.unitOptions = options.map(item => {
						return {
							value: `${item.id}`,
							label: `${item.unitNumber}`
						};
					})
					options.map(item => {
						let floorList = item.floorList
						this.floorOptions = floorList.map((item) => {
							return {
								value: `${item.id}`,
								label: `${item.floor}`
							};
						})
					})
				})
			},
			//查询
			handleCourtyardQuery() {
				this.getCourtyardList(this.courtyardParams);
			},
			//批量导出
			handleCourtyardExport() {
				this.download('/front/building/houseExport', {
					...this.courtyardParams
				}, `房屋信息-${new Date().getTime()}.xlsx`)
			},
      // 实有建筑-编辑楼房-选择建筑类型调用接口渲染建筑用途
      Buildingpulldown() {
        let params = {
          architectureType: this.buildingParams.architectureType, // 建筑类型
        }
        console.log(params)
        getArchiPurposeByType(params).then((res) => {
          if (res.code === 200) {
            this.dingpulldown = res.data
            console.log(this.dingpulldown)
          }
        })
      }
		},
	}
</script>

<style scoped>
	/*实有建筑选项卡样式*/

	/deep/ .tabs .el-tabs__nav-scroll {
		margin: 0;
	}
	/*icon样式*/

	.alignment {
		font-size: 26px;
		margin-right: 4px;
		position: relative;
		top: 6px;
		left: 0;
	}
	/*分页样式*/

	.pagination-container {
		margin-bottom: 30px;
	}
</style>
