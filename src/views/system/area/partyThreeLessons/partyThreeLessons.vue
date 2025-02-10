<!-- 优秀优秀党组织 -->
<template>
	<div class="app-container">
		<!-- 上侧表单 -->
		<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="82px">
			<el-form-item label="党支部：" prop="partyBranch" label-width="82px">
				<treeSelect v-model="queryParams.areaId" :props="treeProps" :options="treeData" :value="queryParams.areaId"
					placeholder="请选择">
				</treeSelect>
			</el-form-item>
			<el-form-item label="会议类型：" prop="meetingType" label-width="82px">
				<el-select clearable v-model="queryParams.meetingType" placeholder="请选择">
					<el-option v-for="dict in dict.type.meeting_type" :key="dict.value" :label="dict.label"
						:value="dict.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="会议状态：" prop="meetingType" label-width="82px">
				<el-select clearable v-model="queryParams.status" placeholder="请选择">
					<el-option v-for="dict in dict.type.meeting_status" :key="dict.value" :label="dict.label"
						:value="dict.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button class="btn" plain @click="handleQuery">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button class="btn" plain @click="addMeet">添加</el-button>
			</el-form-item>
		</el-form>
		<!-- 表格 -->
		<el-table :loading="loading" :data="tableList" :header-cell-style="{ background: '#EBF7FF' }" stripe border>
      <el-table-column label="编号" type="index" width="50" />
			<!-- <el-table-column label="会议编号" align="center" prop="meetingId" width="90px" /> -->
			<el-table-column label="党支部" align="center" prop="partyName" />
			<el-table-column label="名称" align="center" prop="meetingName" />
			<el-table-column label="开始时间" align="center" prop="meetingStartTime" />
			<el-table-column label="结束时间" align="center" prop="meetingEndTime" />
			<el-table-column label="会议类型" align="center" prop="meetingType" />
			<el-table-column label="会议形式" align="center" prop="meetingForm" />
			<el-table-column label="会议状态" align="center" prop="status" />
		<!--<el-table-column label="签到" align="center" prop="sign" />
			<el-table-column label="签到二维码" align="center" width="230px">
				<template slot-scope="scope">
					<el-button plain size="small" @click="handleDetails(scope.row)">下载</el-button>
				</template>
					</el-table-column>-->
			<el-table-column label="操作" align="center" width="230px">
				<template slot-scope="scope">
					<el-button plain size="small" @click="handleDetails(scope.row)">详情</el-button>
					<el-button plain size="small" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="danger" plain size="small" @click="handleDelete(scope.row.meetingId)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
			@pagination="getList()" />
		<p>共查询/检索{{ total }}条信息</p>

	</div>
</template>

<script>
import { listVillage, getMeetList, getDeleteMeeting, getPartyTree } from "@/api/area/village";
export default {
	name: "threeClass",
	dicts: ["sys_normal_disable", "meeting_status", "meeting_type"],
	data() {
		return {
			listVillage: [],
			loading: true, // 遮罩层
			addForm: {}, //添加优秀党组织参数
			// 表格中静态数据
			tableList: [],
			// 查询参数
			queryParams: {
				pageNum: 1,
				pageSize: 10,

				areaId: "",
				meeting_type: "",
				meeting_status: ""
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
		//更改导航栏字体颜色
		let barListItem = document.getElementsByClassName('alignment')
		barListItem = Array.from(barListItem);
		barListItem.forEach(function (item) {
			item.style.color = 'rgb(90, 94, 102)'
		})
		//更改背景图
		let itemList = document.getElementsByClassName('main-box')
		itemList = Array.from(itemList);
		itemList.forEach(function (item) {
			item.style.background = 'white';
		})
		//更改小箭头
		let icon = document.getElementsByClassName('leftIcon')
		icon = Array.from(icon);
		icon.forEach(function (item) {
			item.style.background = 'white'
		})
		this.loading = true;
		this.getList();
		this.getTree();
	},
	methods: {
		handleDelete(id) {
			this.loading = true
			let param = {
				meetingId: id
			}
			getDeleteMeeting(param).then((res) => {
				if (res.code == 200) {
					this.$message.success("删除成功");
					this.getList()
				}
			});
		},
		// 获取页面数据
		getList() {
			getMeetList(this.queryParams).then((res) => {
				this.tableList = res.rows;
				this.total = res.total
				this.loading = false
			});
		},

		//点击详情跳转页面
		handleDetails(row) {
			var detail = JSON.stringify(row)
			this.$router.push({
				path: "/partyThreeLessonsDetail",
				query: {
					detail: detail,
					type: 0
				},
			});
		},
		handleEdit(row) {
			var detail = JSON.stringify(row)
			this.$router.push({
				path: "/partyThreeLessonsAdd",
				query: {
					detail: detail,
					type: 1
				},
			});
		},
		// 查询树
		getTree(value) {
			let param = {
				userId: localStorage.getItem("userId")
			}
			getPartyTree(param).then(res => {
				this.treeData = res.data
			})
		},

		//查询按钮
		handleQuery() {
			this.getList(this.queryParams);
		},
		addMeet() {
			this.$router.push({
				path: "/partyThreeLessonsAdd",
				query: {
					type: 0
				},
			});
		}

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
