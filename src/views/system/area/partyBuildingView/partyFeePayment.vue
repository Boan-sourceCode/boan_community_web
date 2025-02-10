<!-- 优秀优秀党组织 -->
<template>
	<div class="app-container">
		<h1 class="title-font">党费缴纳自定义查询</h1>
		<!-- 上侧表单 -->
		<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="82px">
			<el-form-item label="党支部：" prop="partyBranch" label-width="82px">
				<el-select clearable v-model="queryParams.partyBranch" placeholder="请选择">
					<el-option v-for="dict in dict.type.partyBranch_type" :key="dict.value" :label="dict.label" :value="dict.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="时间段：" prop="year" label-width="82px">
				<el-input clearable v-model="queryParams.keyword" placeholder="起始时间~截止时间" />
			</el-form-item>
			<el-form-item label="关键词：" prop="keyword" label-width="82px">
				<el-input clearable v-model="queryParams.keyword" placeholder="姓名/身份证/联系方式" />
			</el-form-item>
			<el-form-item>
				<el-button class="btn" plain @click="handleQuery">查询</el-button>
			</el-form-item>
			<el-form-item style="float: right">
				<el-button class="btn" @click="handleAddOne()">导出</el-button>
			</el-form-item>
		</el-form>
		<!-- 表格 -->
		<el-table :loading="loading" :data="tableList" :header-cell-style="{ background: '#EBF7FF' }" stripe border>
			<el-table-column label="时间段" align="center" prop="Period" />
			<el-table-column label="党部名称" align="center" prop="partyBranch" />
			<el-table-column label="姓名" align="center" prop="name" />
			<el-table-column label="身份证号" align="center" prop="partyID" />
			<el-table-column label="累计缴费" align="center" prop="accumulatedPayments" />
		</el-table>
		<p>共查询/检索{{ this.queryParams.total }}条信息</p>
		<!-- 分页 -->
		<pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList()" />
	</div>
</template>

<script>
	import { listVillage, getProperty } from "@/api/area/village";
	import { treeList } from "@/api/area/area";
	export default {
		name: "village",
		dicts: ["sys_normal_disable"],
		data() {
			return {
				listVillage: [],
				loading: true, // 遮罩层
				villageList: [], // 优秀党组织表格数据
				addForm: {}, //添加优秀党组织参数
				// 表格中静态数据
				tableList: [{
						Period: "2022-07-01 至 2022-07-15",
						partyBranch: "时绣苑社区第一网格党支部",
						name: "王素琴",
						partyID: "13245648489404",
						accumulatedPayments: "1000",
					},
					{
						Period: "2022-07-01 至 2022-07-15",
						partyBranch: "时绣苑社区第一网格党支部",
						name: "王素琴",
						partyID: "13245648489404",
						accumulatedPayments: "1000",
					},
					{
						Period: "2022-07-01 至 2022-07-15",
						partyBranch: "时绣苑社区第一网格党支部",
						name: "王素琴",
						partyID: "13245648489404",
						accumulatedPayments: "1000",
					},
					{
						Period: "2022-07-01 至 2022-07-15",
						partyBranch: "时绣苑社区第一网格党支部",
						name: "王素琴",
						partyID: "13245648489404",
						accumulatedPayments: "1000",
					},
				],
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
				},
				total: 0, // 总条数
				treeData: [], //下拉框数据
				treeProps: {
					label: "label",
					value: "id",
					children: "children",
				},
				propertyOptions: [], //物业数据
				// 表单校验
				rules: {},
			};
		},
		created() {
			this.getList();
			this.getTree();
			this.getProperty();
			this.bg()
		},
		methods: {
			bg() {
				//更改导航栏背景色
				let barList = document.getElementsByClassName('navbar')
				barList = Array.from(barList);
				barList.forEach(function(item) {
					item.style.background = '#fff'
				})
				//更改导航栏字体颜色
				let barListItem = document.getElementsByClassName('alignment')
				barListItem = Array.from(barListItem);
				barListItem.forEach(function(item) {
					item.style.color = '#5a5e66'
				})
				//更改背景图
				let itemList = document.getElementsByClassName('main-box')
				itemList = Array.from(itemList);
				itemList.forEach(function(item) {
					item.style.background = '#fff'
				})
				//更改小箭头
				let icon = document.getElementsByClassName('leftIcon')
				icon = Array.from(icon);
				icon.forEach(function(item) {
					item.style.background = '#fff'
				})
			},
			// 获取页面数据
			getList() {
				this.loading = true;
				listVillage(this.queryParams).then((res) => {
					this.villageList = res.rows;
					this.total = res.total;
					this.loading = false;
				});
			},

			// 查询树
			getTree(value) {
				treeList().then((res) => {
					this.treeData = res.data;
					this.areaTitle = res.data[0].label;
					this.areaID = res.data[0].id;
					this.stringPosition = res.data[0].label;
				});
			},
			// 查询物业
			getProperty() {
				getProperty().then((res) => {
					let options = res.rows;
					this.propertyOptions = options.map((item) => {
						return {
							value: `${item.id}`,
							label: `${item.enterName}`
						};
					});
				});
			},

			//查询按钮
			handleQuery() {
				this.getList(this.queryParams);
			},
		},
	};
</script>

<style scoped>
	/* 标题样式 */
	
	.title-font {
		text-align: center;
		font-weight: bold;
	}
	
	.inputWidth {
		width: 217px;
		min-width: 217px;
	}
	/* 按钮样式 */
	
	.btn {
		width: 90px;
		height: 34px;
		background-color: #fff;
		border-radius: 5px;
		margin-right: 19px;
		padding: 0;
		color: #1f79f3;
		font-size: 14px;
		font-family: Microsoft YaHei;
	}
</style>