<!-- 网格管理高级 -->
<template>
	<div class="app-container">
		<h1 class="title-font">网格管理查询/检索</h1>
		<el-form v-model="queryParams" :inline="true">
			<el-form-item label="网格：" prop="pAreaId" label-width="54px">
				<treeSelect v-model="queryParams.areaId" :props="treeProps" :options="treeData" :value="value"
					:accordion="true" @click.native="getTree" placeholder="请选择">
				</treeSelect>
			</el-form-item>
			<el-form-item label="关键字：" prop="key" label-width="68px">
				<el-input clearable v-model="queryParams.key" placeholder="名称/网格长/网格员" />
			</el-form-item>
			<el-form-item label="网格类型：" prop="areaType" label-width="82px">
				<el-select clearable v-model="queryParams.areaType" placeholder="请选择">
					<el-option v-for="dict in dict.type.grid_type" :key="dict.value" :label="dict.label"
						:value="dict.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="标注状态：" prop="isLabel" label-width="82px">
				<el-select clearable v-model="queryParams.isLabel" placeholder="请选择">
					<el-option v-for="dict in dict.type.is_label" :key="dict.value" :label="dict.label" :value="dict.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="党组织设立：" prop="isParty" label-width="96px">
				<el-select clearable v-model="queryParams.isParty" placeholder="请选择">
					<el-option v-for="dict in dict.type.is_party" :key="dict.value" :label="dict.label" :value="dict.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item style="position: absolute">
				<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
				<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
				<el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
					v-hasPermi="['system:area:export']">导出</el-button>
			</el-form-item>
		</el-form>

		<el-table v-loading="loading" :data="areaList" :header-cell-style="{ background: '#EBF7FF' }" stripe border
			@selection-change="handleSelectionChange">
			<!--      <el-table-column type="selection" width="55" align="center" />-->
			<el-table-column label="序号" align="center" width="60">
				<template slot-scope="scope">
					{{ scope.$index + 1 + (queryParams.pageNum - 1) * queryParams.pageSize }}
				</template>
			</el-table-column>
			<el-table-column label="网格编号" align="left" prop="areaNo" />
			<el-table-column label="名称" align="left" prop="areaName" width="164px" />
			<el-table-column label="所属上级" align="center" prop="pareaName" />
			<el-table-column label="网格类型" align="center" prop="areaType" />
			<el-table-column label="网格长" align="center" prop="arealeaderName" />
			<el-table-column label="网格员" align="center" prop="areaerName" />
			<el-table-column label="党组织是否设立" align="center" prop="isParty">
			</el-table-column>
			<el-table-column label="地图标注" align="center" prop="isTagging">
				<template slot-scope="scope">
					<a class="card-state unmarked icon-map-marker" @click.stop="
						openMap(
							scope.row.areaCenter,
							scope.row.isTagging,
							scope.row.areaName,
							scope.row.areaColor,
							scope.row.areaId
						)
						" v-if="scope.row.isLabel == '未标注'">未标注</a>
					<a class="card-state marked icon-map-marker" @click.stop="
						openMap(
							scope.row.areaCenter,
							scope.row.isTagging,
							scope.row.areaName,
							scope.row.areaColor,
							scope.row.areaId
						)
						" v-else>已标注</a>
				</template>
			</el-table-column>
			<el-table-column label="行政区类别" align="center" prop="areaLevel">
				<template slot-scope="scope">
					<dict-tag :options="dict.type.administrative_region" :value="scope.row.areaLevel" />
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="232px">
				<template slot-scope="scope">
					<el-button type="success" plain size="small" @click="handleDetails(scope.row)">详情</el-button>
					<el-button type="primary" plain size="small" @click="handleEdit(scope.row)">修改</el-button>
					<el-button type="danger" plain size="small" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<p>共查询/检索{{ this.total }}条信息</p>

		<!-- 编辑弹窗 -->
		<el-dialog :visible.sync="dialogEdit" title="编辑网格" width="70%" :close-on-click-modal="false"
			@close="dictEditVisible('editForm')">
			<template>
				<el-form ref="editForm" :model="editForm" label-width="106px" :rules="rules">
					<el-form-item label="网格：" prop="pAreaId" class="input-width" style="vertical-align: top; width: 50%">
						<Treeselect v-model="editForm.areaId" :props="treeProps" :options="areaTreeOptions"
							:normalizer="normalizer" :value="value" style="width: 96%" placeholder="请选择">
						</Treeselect>
					</el-form-item>
					<el-form-item label="行政区类别：" prop="areaLevel" class="input-width">
						<el-select v-model="editForm.areaLevel" placeholder="请选择">
							<el-option v-for="dict in dict.type.administrative_region" :key="dict.value" :label="dict.label"
								:value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="网格类型：" prop="areaType" class="input-width">
						<el-select v-model="editForm.areaType" placeholder="请选择">
							<el-option v-for="dict in dict.type.grid_type" :key="dict.value" :label="dict.label"
								:value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="网格编号：" prop="areaNo" class="input-width">
						<el-input v-model="editForm.areaNo" disabled />
					</el-form-item>
					<el-form-item label="网格名称：" prop="areaName" class="input-width">
						<el-input v-model="editForm.areaName" placeholder="请输入网格名称" />
					</el-form-item>
					<el-form-item label="网格简称：" prop="areaShortname" class="input-width">
						<el-input v-model="editForm.areaShortname" placeholder="请输入网格简称" />
					</el-form-item>
					<el-form-item label="面积：" prop="areaMeasure" class="input-width">
						<span class="square" v-if="editForm.areaMeasure !== '' && editForm.areaMeasure !== null">{{
							editForm.areaMeasure }}
							m&sup2;</span>
						<span class="square" v-else>暂无</span>
					</el-form-item>
					<el-form-item label="网格长：" prop="arealeaderCard" class="input-width">
						<el-select clearable filterable v-model="editForm.arealeaderCard" placeholder="请选择">
							<el-option v-for="item in memberOptions" :key="item.cardId" :label="item.label"
								:value="item.cardId">
								<span style="float: left; margin-right: 10px">{{ item.label }}</span>
								<span style="float: left; margin-right: 10px">{{ item.cardId }}</span>
								<span style="float: left; margin-right: 10px">{{ item.sex }}</span>
								<span style="float: left; margin-right: 10px">{{ item.phone }}</span>
								<span style="float: left">{{ item.birthData == 'null' ? "" : item.birthData }}</span>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="网格员：" prop="areaerCard" class="input-width">
						<el-select multiple filterable v-model="editForm.areaerCard" placeholder="请输入网格员">
							<el-option v-for="item in memberOptions" :key="item.value" :label="item.label"
								:value="item.value">
								<span style="float: left; margin-right: 10px">{{ item.label }}</span>
								<span style="float: left; margin-right: 10px">{{ item.cardId }}</span>
								<span style="float: left; margin-right: 10px">{{ item.sex }}</span>
								<span style="float: left; margin-right: 10px">{{ item.phone }}</span>
								<span style="float: left">{{ item.birthData == 'null' ? "" : item.birthData }}</span>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="网格颜色：" prop="areaColor" class="input-width" style="vertical-align: top">
						<el-color-picker v-model="editForm.areaColor"></el-color-picker>
					</el-form-item>
					<el-form-item label="地址：" prop="areaAddr" style="width: 100%; display: inline-block">
						<el-input v-model="editForm.areaAddr" placeholder="请输入地址" />
					</el-form-item>
					<el-form-item label="简介：" prop="areaIntroduction">
						<el-input v-model="editForm.areaIntroduction" type="textarea" placeholder="请输入内容" />
					</el-form-item>
					<el-form-item label="详细介绍：" prop="areaIntroduce">
						<editor v-model="editForm.areaIntroduce" :min-height="192" ref="myQuillEditor" />
					</el-form-item>
					<el-form-item label="风采：" prop="areaMien" class="input-width">
						<image-upload v-model="editForm.areaMien" :limit="1" />
					</el-form-item>
					<el-form-item label="缩略图：" class="input-width" style="vertical-align: top">
						<image-upload v-model="editForm.areaPicture" :limit="1" />
					</el-form-item>
				</el-form>
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="submitForm('editForm')">保存</el-button>
				<el-button type="default" @click="dictEditVisible('editForm')">取消</el-button>
			</div>
		</el-dialog>

		<!--标注弹窗-->
		<el-dialog :visible.sync="dialogAnnotate" title="绘制网格" width="70%" height="600px" class="map" ref="dialogData"
			:close-on-click-modal="false" @close="closeMap()">
			<gridMap :mapData="mapData" :dialogAnnotate="dialogAnnotate" @coordinates="coordinates"></gridMap>
		</el-dialog>

		<!-- 分页 -->
		<pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
			@pagination="getList()" />
	</div>
</template>

<script>
import {
	treeList,
	listArea,
	getArea,
	delArea,
	updateArea,
} from "@/api/area/area";
import { listUser } from "@/api/system/user";
import { getPartAreaTree } from "@/api/area/areaTree";
import gridMap from "@/components/gridMap/index";
export default {
	name: "Area",
	dicts: [
		"sys_normal_disable",
		"grid_type",
		"administrative_region",
		"is_party",
		"is_label",
	],
	components: {
		gridMap,
	},
	data() {
		return {
			loading: true, // 遮罩层
			dialogAnnotate: false, //地图弹窗
			center: [12529117.002647482, 4561158.359249212], //地图中心点
			searchForm: {}, //搜索
			areaList: [], // 表格数据
			ids: [], // 选中数组
			single: true, // 非单个禁用
			multiple: true, // 非多个禁用
			showSearch: true, // 显示搜索条件
			memberOptions: [], // 网格长和网格员选项
			treeData: [], //下拉框数据
			treeProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			value: "", //选中的数据
			queryParams: {
				// 查询参数
				pageNum: 1,
				pageSize: 10,
				areaId: "",
			},
			total: 0, // 总页数
			dialogEdit: false, //编辑弹窗
			editForm: {
				//编辑表单参数
				// pAreaId:'',   //上级网格
				areaLevel: "", //行政区类别
				areaType: "", //网格类型
				areaName: "", //网格名称
				areaShortname: "", //网格简称
				areaMeasure: "", //面积
				areaColor: "#1f79f3", //网格颜色
				areaAddr: "", //地址
				arealeaderCard: "", //网格长
				areaerCard: "", //网格员
				areaIntroduce: ""//详细介绍
			},
			areaTreeOptions: [],
			mapData: {
				gridCenter: "", //给地图传参（中心点）
				gridTagging: "", //给地图传参（覆盖物）
				areaName: "", //给地图传参（网格名称）
				areaColor: "", //给地图传参（网格颜色）
				areaId: "", //给地图传参（网格id）
			},
			// 表单校验
			rules: {
				areaLevel: [{
					required: true,
					trigger: "change",
					message: "请选择行政区类别"
				},],
				areaType: [{
					required: true,
					trigger: "change",
					message: "请选择网格类型"
				},],
				areaName: [{
					required: true,
					trigger: "blur",
					message: "请输入网格名称"
				},],
				areaShortname: [{
					required: true,
					trigger: "blur",
					message: "请输入网格简称"
				},],
			},
		};
	},
	mounted() {
		this.getList();
		this.getTree();
		this.getUserList();
		this.getTreeselect();
	},
	methods: {
		// 查询树
		getTree(value) {
			var query = {
				userId: localStorage.getItem("userId"),
				flag: 0
			}
			treeList(query).then((res) => {
				this.treeData = res.data;
			});
		},

		// 查询网格长或网格员
		getUserList() {
			listUser().then((res) => {
				let options = res.rows;
				this.memberOptions = options.map((item) => {
					return {
						value: `${item.userId}`,
						label: `${item.nickName}`,
						cardId: `${item.cardId}`,
						sex: `${item.sex}`,
						phone: `${item.phonenumber}`,
						birthData: `${item.birthData}`,
					};
				});
			});
		},

		//转换网格-网格管理数据结构
		normalizer(node) {
			if (node.children && !node.children.length) {
				delete node.children;
			}
			return {
				id: node.areaId,
				label: node.areaName,
				children: node.children,
			};
		},

		// 查询网格-网格管理下拉树结构
		getTreeselect() {
			getPartAreaTree({
				flag: 0,
				userId: localStorage.getItem("userId"),
			}).then((response) => {
				this.areaTreeOptions = [];
				const data = {
					areaId: 0,
					areaName: "顶级节点",
					children: []
				};
				data.children = this.handleTree(response.data, "areaId", "pAreaId");
				this.areaTreeOptions.push(data);
			});
		},

		//获取页面数据
		getList() {
			this.loading = true;
			listArea(this.queryParams).then((res) => {
				this.areaList = res.rows;
				this.total = res.total;
				this.loading = false
			});
		},

		// 标注弹窗打开
		openMap(center, isTagging, areaName, areaColor, areaId) {
			this.mapData.gridCenter = center;
			this.mapData.gridTagging = isTagging;
			this.mapData.areaName = areaName;
			this.mapData.areaColor = areaColor;
			this.mapData.areaId = areaId;
			this.dialogAnnotate = true;
			this.$refs.dialogData.mapData = this.mapData;
		},

		//接收地图标注的传值
		coordinates(value, id) {
			var param = {
				areaId: id,
				areaCenter: value.areaCenter,
				isTagging: value.areaLabel
			}
			updateArea(param).then((res) => {
				if (res.code == 200) {
					this.$modal.msgSuccess("保存成功");
					this.dialogAnnotate = false;
					this.getList();
				}
			});
		},

		//关闭标注弹窗
		closeMap() {
			this.dialogAnnotate = false;
		},

		//点击详情跳转页面
		handleDetails(row) {
			const src = `/grid/indexDetailsGrid`;
			let areaID = row.areaId;
			this.$router.push({
				path: src,
				query: {
					ID: areaID
				},
			});
		},

		// 编辑弹窗打开
		handleEdit(row) {
			this.dialogEdit = true;
			this.getTreeselect();
			getArea(row.areaId).then((res) => {
				if (res.code === 200) {
					this.editForm = res.data;
					if (
						this.editForm.areaerCard != null
					) {
						let cdraId = this.editForm.areaerCard.split(",");
						this.editForm.areaerCard = cdraId;
					}
				}
			});
		},

		//编辑的提交按钮
		submitForm(editForm) {
			this.$refs[editForm].validate((valid) => {
				if (valid) {
					if (this.editForm.areaId != null) {
						if (
							this.editForm.areaerCard != 0
						) {
							this.editForm.areaerCard = this.editForm.areaerCard.toString();
						} else {
							this.editForm.areaerCard = "";
						}
						updateArea(this.editForm)
							.then((res) => {
								if (res.code == 200) {
									this.$message.success("修改成功");
									this.getList();
									this.dialogEdit = false;
								} else {
									this.editForm.areaerCard = this.editForm.areaerCard.split(",");
								}
							})
							.catch(() => { });
					}
				}
			});
		},

		//编辑弹窗关闭
		dictEditVisible(editForm) {
			this.$refs[editForm].resetFields();
			this.dialogEdit = false;
		},

		//删除按钮操作
		handleDelete(row) {
			const areaId = row.areaId;
			this.$confirm('是否删除网格："' + row.areaName + '"？', "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(function () {
					return delArea(areaId);
				})
				.then((data) => {
					// this.queryParams.pageNum = 1
					this.getList();
					this.$message.success("删除成功");
				})
				.catch(() => { });
		},

		/** 搜索按钮操作 */
		handleQuery() {
			console.log(this.queryParams);
			this.queryParams.pageNum = 1;
			this.getList(this.queryParams);
		},

		// 多选框选中数据
		handleSelectionChange(selection) {
			this.ids = selection.gridMap((item) => item.areaId);
			this.single = selection.length !== 1;
			this.multiple = !selection.length;
		},

		/** 导出按钮操作 */
		handleExport() {
			this.download(
				"system/area/export", {
				...this.queryParams,
			},
				`网格信息-${new Date().getTime()}.xlsx`
			);
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

/* 已标注字体颜色 */

.marked {
	color: #3bc2b4;
}

/* 未标注字体颜色 */

.unmarked {
	color: #999;
}

/* 编辑输入框样式 */

.input-width {
	width: 25%;
	display: inline-block;
}

.input-width div {
	width: 90%;
}

.introduce {
	width: 96%;
}

/*面积平方样式*/

.square {
	margin-left: 4px;
}
</style>