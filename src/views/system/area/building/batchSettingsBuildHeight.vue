<template>
	<div class="app-container">
		<p class="title">批量设置楼房/院落属性</p>
		<el-table :data="tableData" style="width: 100%" border :header-cell-style="{background:'#EBF7FF'}">
			<el-table-column prop="id" label="编号" width="80" align="center">
			</el-table-column>
			<el-table-column prop="houseType" label="类型" width="80" align="center">
			</el-table-column>
			<el-table-column prop="buildingName" label="名称" width="120" align="center">
			</el-table-column>
			<el-table-column prop="areaName" label="所属网格" width="110" align="center">
			</el-table-column>
			<el-table-column prop="communityName" label="所属小区" width="100" align="center">
			</el-table-column>
			<el-table-column prop="buildingMaster" label="楼长" width="110" align="center">
				<template slot-scope="scope">
					<!--<el-select filterable v-if="scope.row.houseType === '楼房'" v-model="scope.row.buildingMaster" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							<span style="float: left;margin-right: 10px">{{ item.label }}</span>
							<span style="float: left;margin-right: 10px">{{ item.certificateId }}</span>
							<span style="float: left;margin-right: 10px">{{item.sex === '1' ? '男' : item.sex === '2' ? '女' : '未知'}}</span>
							<span style="float: left;margin-right: 10px">{{item.phoneNumber}}</span>
							<span style="float: left;">{{item.birthday}}</span>
						</el-option>
					</el-select>
					<p v-if="scope.row.houseType === '院落'">无</p>-->
					<el-input v-model="scope.row.buildingMaster" placeholder="请输入内容"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="楼房/院落面积（㎡）" width="180" align="center">
				<template slot-scope="scope">
					<el-input v-model="scope.row.buildingMeasure" placeholder="请输入内容"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="architectureType" label="建筑类型" width="135" align="center">
				<template slot-scope="scope">
					<el-select v-model="scope.row.architectureType" placeholder="请选择">
						<el-option v-for="dict in dict.type.building_type" :key="dict.value" :label="dict.label" :value="dict.value">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column prop="architecturePurpose" label="建筑用途" width="110" align="center">
				<template slot-scope="scope">
					<el-select v-model="scope.row.architecturePurpose" placeholder="请选择">
						<el-option v-for="dict in dict.type.building_purpose" :key="dict.value" :label="dict.label" :value="dict.value">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column prop="housePropertyRight" label="房屋产权" width="150" align="center">
				<template slot-scope="scope">
					<el-select v-model="scope.row.housePropertyRight" placeholder="请选择">
						<el-option v-for="dict in dict.type.house_property_right" :key="dict.value" :label="dict.label" :value="dict.value">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column prop="hiddenDangerType" label="楼隐患类型" width="155" align="center">
				<template slot-scope="scope">
					<el-select v-model="scope.row.hiddenDangerType" placeholder="请选择">
						<el-option v-for="dict in dict.type.building_danger_type" :key="dict.value" :label="dict.label" :value="dict.value">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column prop="hiddenDangerLevel" label="楼隐患级别" width="110" align="center">
				<template slot-scope="scope">
					<el-select v-model="scope.row.hiddenDangerLevel" placeholder="请选择">
						<el-option v-for="dict in dict.type.focous_degree" :key="dict.value" :label="dict.label" :value="dict.value">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column prop="buildingAddress" label="地址" align="center">
			</el-table-column>
		</el-table>
		<footer>
			<el-button type="primary" @click="save">确定</el-button>
		</footer>
	</div>
</template>

<script>
	import { retrunUpdateInfo, batchUpdateAddress } from '@/api/area/house'
	export default {
		dicts: ['building_type', 'building_purpose', 'house_property_right', 'building_danger_type', 'focous_degree', 'building'],
		name: "batchSettingsBuildHeight",
		data() {
			return {
				loading: false,
				tableData: [],
				options: [],
				value: '',
				queryParams: {}
			}
		},
		created() {
			this.getInfo()
		},
		methods: {
			save() {
				let params = []
				this.tableData.map((item) => {
					var arr=[]
					var buildingMaster=arr.push(item.buildingMaster)
					params.push({
						id: item.id,
						buildingAddress: item.buildingAddress,
						buildingMaster: item.buildingMaster,
						buildingMeasure: item.buildingMeasure,
						architectureType: item.architectureType,
						architecturePurpose: item.architecturePurpose,
						housePropertyRight: item.housePropertyRight,
						hiddenDangerType: item.hiddenDangerType,
						hiddenDangerLevel: item.hiddenDangerLevel
					})
				})
				console.log(params)
				batchUpdateAddress(params).then((res) => {
					if(res.code === 200) {
						this.$router.push({
							path: '/buildingHeight'
						})
						this.$message.success(res.msg)
					}
				})
			},
			getInfo() {
				let idList = localStorage.getItem('checkedIdList')
				this.loading = true
				retrunUpdateInfo(idList).then((res) => {
					if(res.code === 200) {
						console.log(res);
						this.loading = false
						this.tableData = res.data
						this.queryParams = res.data[0]
						res.data.forEach((item) => {
							let leader = item.baPeoples
							console.log(leader)
							this.options = leader.map(item => {
								return {
									value: `${item.id}`,
									label: `${item.name}`,
									certificateId: `${item.certificateId}`,
									sex: `${item.sex}`,
									phoneNumber: `${item.phoneNumber}`,
									birthday: `${item.birthday}`
								};
							})
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		p {
			font-family: Microsoft YaHei;
		}
		.title {
			font-size: 24px;
			font-weight: bold;
			color: #000000;
			text-align: center;
		}
		 ::v-deep .el-table {
			 ::v-deep .el-table__header-wrapper {}
		}
		footer {
			width: 100%;
			display: flex;
			justify-content: center;
			margin-top: 40px;
		}
	}
</style>