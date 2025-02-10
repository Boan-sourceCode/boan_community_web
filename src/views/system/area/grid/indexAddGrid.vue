<!--添加网格-->
<template>
	<div class="app-container">
		<h1 class="title-font">添加网格</h1>
		<el-form ref="addForm" :model="addForm" label-width="106px" :rules="rules" class="form-box">
			<el-form-item label="网格类型：" prop="areaType" class="input-width">
				<el-select clearable v-model="addForm.areaType" placeholder="请选择" @change="getLeveAdd()">
					<el-option v-for="dict in dict.type.grid_type" :key="dict.value" :label="dict.label"
						:value="dict.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="上级网格：" v-if="addForm.areaType === '专属网格'" prop="pAreaId" class="input-width"
				style="vertical-align: top">
				<Treeselect v-model="addForm.pAreaId" :props="deptProps" :options="deptOptions" :value="value"
					placeholder="请选择" @input="getLeveAdd">
				</Treeselect>
			</el-form-item>
			<el-form-item label="上级网格：" v-else class="input-width" style="vertical-align: top">
				<Treeselect v-model="addForm.pAreaId" :props="deptProps" :options="deptOptions" :value="value"
					placeholder="请选择" @input="getLeveAdd">
				</Treeselect>
			</el-form-item>
			<el-form-item label="网格级别：" prop="areaLevel" class="input-width">
				<el-select clearable v-model="addForm.areaLevel" placeholder="请选择">
					<el-option v-for="item in leveOptionsAdd" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="网格编号：" prop="areaNo" class="input-width">
				<el-input clearable v-model="addForm.areaNo" placeholder="请输入网格编号" />
				<!--        <p class="font">系统自动生成</p>-->
			</el-form-item>
			<el-form-item label="网格名称：" prop="areaName" class="input-width">
				<el-input clearable v-model="addForm.areaName" placeholder="请输入网格名称" />
			</el-form-item>
			<el-form-item label="网格简称：" prop="areaShortname" class="input-width">
				<el-input clearable v-model="addForm.areaShortname" placeholder="请输入网格简称" />
			</el-form-item>
			<!--      <el-form-item label="面积：" prop="areaMeasure" class="input-width">-->
			<!--        <el-input clearable v-model="addForm.areaMeasure" placeholder="请输入面积" />-->
			<!--        <span class="square">m&sup2;</span>-->
			<!--      </el-form-item>-->
			<el-form-item label="网格长：" prop="arealeaderName" class="input-width">
				<el-select clearable filterable v-model="addForm.arealeaderCard" placeholder="请选择">
					<el-option v-for="item in memberOptions" :key="item.cardId" :label="item.label" :value="item.cardId">
						<span style="float: left; margin-right: 10px">{{
							item.label
						}}</span>
						<span style="float: left; margin-right: 10px">{{
							item.cardId
						}}</span>
						<span style="float: left; margin-right: 10px">{{ item.sex }}</span>
						<span style="float: left; margin-right: 10px">{{
							item.phone
						}}</span>
						<span style="float: left">{{ item.birthData == 'null' ? "" : item.birthData }}</span>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="网格员：" prop="areaerName" class="input-width">
				<el-select clearable multiple filterable v-model="addForm.areaerCard" placeholder="请输入网格员">
					<el-option v-for="item in memberOptions" :key="item.value" :label="item.label" :value="item.value">
						<span style="float: left; margin-right: 10px">{{
							item.label
						}}</span>
						<span style="float: left; margin-right: 10px">{{
							item.cardId
						}}</span>
						<span style="float: left; margin-right: 10px">{{ item.sex }}</span>
						<span style="float: left; margin-right: 10px">{{
							item.phone
						}}</span>
						<span style="float: left">{{ item.birthData == 'null' ? "" : item.birthData }}</span>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="地址：" prop="areaAddr" style="width: 50%; display: inline-block">
				<el-input clearable v-model="addForm.areaAddr" placeholder="请输入地址" />
			</el-form-item>
			<el-form-item label="网格颜色：" prop="areaColor" class="input-width" style="vertical-align: top">
				<el-color-picker v-model="addForm.areaColor"></el-color-picker>
			</el-form-item>
			<el-form-item style="text-align: center; margin: 0">
				<el-button type="primary" plain size="mini" @click="saveAndAdd('addForm')">保存并继续添加</el-button>
			</el-form-item>
		</el-form>

		<el-row>
			<el-card :body-style="{ magrin: '30px' }" v-for="(item, index) in newAreaLists" :key="index">
				<!-- 卡片内容 -->
				<div style="display: inline-block; vertical-align: top; width: 30%">
					<!-- icon -->
					<p class="card-font-title">
						网格名称：<span>{{ item.areaName }}</span>
					</p>
					<p class="card-font" v-if="
						item.baGridArea === '' ||
						item.baGridArea === null ||
						item.baGridArea === undefined
					">
						所属上级：顶级网格
					</p>
					<p class="card-font" v-else>
						所属上级：{{ item.baGridArea.areaName }}
					</p>
					<p class="card-font">网格类型：{{ item.areaType }}</p>
					<p class="card-font" v-if="
						item.areaMeasure === '' ||
						item.areaMeasure === null ||
						item.areaMeasure === undefined
					">
						面积：暂无
					</p>
					<p class="card-font" v-else>
						面积：{{ item.areaMeasure }}<span class="square">m&sup2;</span>
					</p>
					<p class="card-font" style="margin-top: 0" v-if="
						item.arealeaderName === '' ||
						item.arealeaderName === null ||
						item.arealeaderName === undefined
					">
						网格长：暂无
					</p>
					<p class="card-font" style="margin-top: 0" v-else>
						网格长：{{ item.arealeaderName }}
					</p>
				</div>
				<div style="margin-left: 30px; display: inline-block">
					<p class="card-font-title">网格简称：{{ item.areaShortname }}</p>
					<p class="card-font">
						行政区类别：
						<dict-tag :options="dict.type.administrative_region" :value="item.areaLevel"
							style="display: inline-block" />
					</p>
					<p class="card-font">网格编号：{{ item.areaNo }}</p>
					<p class="card-font" style="display: inline-block; vertical-align: top">
						网格颜色：
					</p>
					<el-color-picker v-model="item.areaColor"></el-color-picker>
				</div>
				<div>
					<p class="card-font" v-if="
						item.areaerName === '' ||
						item.areaerName === null ||
						item.areaerName === undefined
					">
						网格员：暂无
					</p>
					<p class="card-font" v-else>网格员：{{ item.areaerName }}</p>
					<p class="card-font" v-if="
						item.areaAddr === '' ||
						item.areaAddr === null ||
						item.areaAddr === undefined
					">
						标准地址：暂无
					</p>
					<p class="card-font" v-else>标准地址：{{ item.areaAddr }}</p>
					<div class="card-btn">
						<el-button type="primary" plain size="mini" @click="handleEdit(item, index)">编辑</el-button>
						<!-- 删除按钮 -->
						<el-button type="danger" plain size="mini" @click="handleDelete(item, index)">删除</el-button>
					</div>
				</div>
			</el-card>
		</el-row>

		<!-- 编辑弹窗 -->
		<el-dialog :visible.sync="dialogEdit" title="编辑网格" width="70%" :close-on-click-modal="false"
			@close="dictEditVisible('editForm')">
			<template>
				<el-form ref="editForm" :model="editForm" label-width="106px" :rules="rules">
					<el-form-item label="网格类型：" prop="areaType" class="input-width">
						<el-select clearable v-model="editForm.areaType" placeholder="请选择" @change="getLeveEdit()">
							<el-option v-for="dict in dict.type.grid_type" :key="dict.value" :label="dict.label"
								:value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上级网格：" prop="pAreaId" class="input-width" style="vertical-align: top; width: 50%">
						<Treeselect v-model="editForm.pAreaId" :props="treeProps" :options="areaTreeOptions"
							:normalizer="normalizer" :value="value" style="width: 96%" placeholder="请选择"
							@input="getLeveEdit">
						</Treeselect>
					</el-form-item>
					<el-form-item label="网格级别：" prop="areaLevel" class="input-width">
						<el-select clearable v-model="editForm.areaLevel" placeholder="请选择">
							<el-option v-for="item in leveOptionsEdit" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="网格编号：" prop="areaNo" class="input-width">
						<el-input clearable v-model="editForm.areaNo" placeholder="请输入网格编号" />
					</el-form-item>
					<el-form-item label="网格名称：" prop="areaName" class="input-width">
						<el-input clearable v-model="editForm.areaName" placeholder="请输入网格名称" />
					</el-form-item>
					<el-form-item label="网格简称：" prop="areaShortname" class="input-width">
						<el-input clearable v-model="editForm.areaShortname" placeholder="请输入网格简称" />
					</el-form-item>
					<el-form-item label="网格长：" prop="arealeaderId" class="input-width">
						<el-select clearable filterable v-model="editForm.arealeaderId" placeholder="请选择">
							<el-option v-for="item in memberOptions" :key="item.value" :label="item.label"
								:value="item.value">
								<span style="float: left;margin-right: 10px">{{ item.label }}</span>
								<span style="float: left;margin-right: 10px">{{ item.cardId }}</span>
								<span style="float: left;margin-right: 10px">{{ item.sex === '1' ? '男' : item.sex === '2' ?
									'女' : '未知' }}</span>
								<span style="float: left;margin-right: 10px">{{ item.phone }}</span>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="网格员：" prop="areaerCard" class="input-width">
						<el-select clearable multiple filterable v-model="editForm.areaerIds" placeholder="请输入网格员">
							<el-option v-for="item in memberOptions" :key="item.value" :label="item.label"
								:value="item.value">
								<span style="float: left;margin-right: 10px">{{ item.label }}</span>
								<span style="float: left;margin-right: 10px">{{ item.cardId }}</span>
								<span style="float: left;margin-right: 10px">{{ item.sex === '1' ? '男' : item.sex === '2' ?
									'女' : '未知' }}</span>
								<span style="float: left;margin-right: 10px">{{ item.phone }}</span>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="网格长：" prop="arealeaderCard" class="input-width">
						<el-select clearable filterable v-model="editForm.arealeaderCard" placeholder="请选择">
							<el-option v-for="item in memberOptions" :key="item.cardId" :label="item.label"
								:value="item.cardId">
								<span style="float: left; margin-right: 10px">{{
									item.label
								}}</span>
								<span style="float: left; margin-right: 10px">{{
									item.cardId
								}}</span>
								<span style="float: left; margin-right: 10px">{{ item.sex }}</span>
								<span style="float: left; margin-right: 10px">{{
									item.phone
								}}</span>
								<span style="float: left">{{ item.birthData == 'null' ? "" : item.birthData }}</span>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="网格员：" prop="areaerCard" class="input-width">
						<el-select clearable multiple filterable v-model="editForm.areaerCard" placeholder="请输入网格员">
							<el-option v-for="item in memberOptions" :key="item.value" :label="item.label"
								:value="item.value">
								<span style="float: left; margin-right: 10px">{{
									item.label
								}}</span>
								<span style="float: left; margin-right: 10px">{{
									item.cardId
								}}</span>
								<span style="float: left; margin-right: 10px">{{ item.sex }}</span>
								<span style="float: left; margin-right: 10px">{{
									item.phone
								}}</span>
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
						<el-input v-model="editForm.areaIntroduction" type="textarea" maxlength="50" show-word-limit
							placeholder="请输入内容" />
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
	</div>
</template>
<script>
import {
	treeHalfList,
	listUser,
	getArea,
	addArea,
	areaTree,
	delArea,
	updateArea,
	levelList,
} from "@/api/area/area";
// import {listUser,} from "@/api/system/user";
import { listAreaTree } from "@/api/area/areaTree";
export default {
	name: "indexAddGrid",
	dicts: ["administrative_region", "grid_type"],
	data() {
		return {
			treeFlag: 0,
			addForm: {
				//新增表单参数
				pAreaId: null, //上级网格
				areaLevel: "", //行政区类别
				areaType: "", //网格类型
				areaName: "", //网格名称
				areaShortname: "", //网格简称
				areaMeasure: "", //面积
				areaColor: "#1f79f3", //网格颜色
				areaAddr: "", //地址
				arealeaderCard: "", //网格长
				areaerCard: "", //网格员
			},
			newAreaLists: [], //保存新添加的网格
			// 网格树选项
			deptOptions: [],
			deptProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			areaTreeOptions: [],
			treeProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			value: "", //选中的数据
			memberOptions: [], // 网格长和网格员选项
			editForm: {
				//编辑表单
				pAreaId: null, //上级网格
				areaLevel: "", //行政区类别
				areaType: "", //网格类型
				areaName: "", //网格名称
				areaShortname: "", //网格简称
				areaMeasure: "", //面积
				areaColor: "#1f79f3", //网格颜色
				areaAddr: "", //地址
				arealeaderCard: "", //网格长
				areaerCard: "", //网格员
			},
			dialogEdit: false, //编辑弹窗
			index: "", //编辑弹窗获取下标
			leveOptionsAdd: [], //网格级别
			leveOptionsEdit: [], //网格级别
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
				pAreaId: [{
					required: true,
					trigger: "input",
					message: "请选择上级网格"
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
		this.getTree();
		this.getUserList();
	},
	methods: {
		// 查询树
		getTree() {
			let param = {
				userId: localStorage.getItem("userId"),
				flag: this.treeFlag
			}
			areaTree(param).then((res) => {
				console.log(res);
				this.deptOptions = res.data;
			});
		},

		// 查询网格长或网格员
		getUserList() {
			this.loading = true;
			let param = {
				deptId: localStorage.getItem("deptId"),
			};
			listUser(param).then((res) => {
				let options = res.data;
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
			console.log(node);
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
			listAreaTree().then((response) => {
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

		//添加获取网格级别
		getLeveAdd() {
			let param = {
				areaType: this.addForm.areaType,
				pAreaId: this.addForm.pAreaId,
			};
			levelList(param).then((res) => {
				let options = res.data;
				this.leveOptionsAdd = options.map((item) => {
					return {
						value: `${item.level}`,
						label: `${item.levelName}`
					};
				});
			});
			if (this.addForm.areaType == "专属网络") {
				this.treeFlag = 0
			} else {
				this.treeFlag = 1
			}
			this.getTree()
		},

		//编辑获取网格级别
		getLeveEdit() {
			let param = {
				areaType: this.editForm.areaType,
				pAreaId: this.editForm.pAreaId,
			};
			levelList(param).then((res) => {
				let options = res.data;
				this.leveOptionsEdit = options.map((item) => {
					return {
						value: `${item.level}`,
						label: `${item.levelName}`
					};
				});
			});
		},

		//保存并继续添加
		saveAndAdd(addForm) {
			if (this.addForm.areaType === "专属网格") {
				//为专属网格并上级网格为空时提示
				if (
					this.addForm.pAreaId === "" ||
					this.addForm.pAreaId === null ||
					this.addForm.pAreaId === undefined
				) {
					this.$message.error("请选择上级网格");
				} else {
					//为专属网格并上级网格不为空时走接口
					this.$refs[addForm].validate((valid) => {
						if (valid) {
							if (
								this.addForm.areaerCard.length != 0
							) {
								this.addForm.areaerCard = this.addForm.areaerCard.toString();
							} else {
								this.addForm.areaerCard = "";
							}
							addArea(this.addForm).then((res) => {
								if (res.code == 200) {
									this.$message.success("添加成功");
									this.newAreaLists.push(res.data);
									this.addForm = {};
									this.addForm.pAreaId = null;
									this.addForm.areaColor = "#1f79f3";
									this.addForm.areaType = "";
									this.$refs[addForm].resetFields();
									console.log(this.addForm);
									this.getTree();
								} else {
									this.editForm.areaerCard = this.editForm.areaerCard.split(",");
								}
							});
						}
					});
				}
			} else {
				console.log(this.addForm.areaerCard)
				//不为专属网格时
				this.$refs[addForm].validate((valid) => {
					if (valid) {
						if (this.addForm.pAreaId === "" || this.addForm.pAreaId === null || this.addForm.pAreaId === undefined) {
							this.addForm.pAreaId = 0;
						}
						if (this.addForm.areaerCard) {
							this.addForm.areaerCard = this.addForm.areaerCard.toString();
						} else {
							this.addForm.areaerCard = "";
						}
						addArea(this.addForm).then((res) => {
							if (res.code == 200) {
								this.$message.success("添加成功");
								this.newAreaLists.push(res.data);
								this.addForm = {};
								this.addForm.pAreaId = null;
								this.addForm.areaColor = "#1f79f3";
								this.addForm.areaType = "";
								this.$refs[addForm].resetFields();
								this.getTree();
							} else {
								this.editForm.areaerCard = this.editForm.areaerCard.split(",");
							}
						});
					}
				});
			}
		},

		// 编辑弹窗打开
		handleEdit(row, index) {
			this.dialogEdit = true;
			this.getTreeselect();
			getArea(row.areaId).then((res) => {
				if (res.code === 200) {
					this.editForm = res.data;
					if (
						this.editForm.areaerCard !== null &&
						this.editForm.areaerCard !== ""
					) {
						let cdraId = this.editForm.areaerCard.split(",");
						this.editForm.areaerCard = cdraId;
					}
				}
			});
			this.index = index;
		},

		//编辑的提交按钮
		submitForm(editForm) {
			this.$refs[editForm].validate((valid) => {
				if (valid) {
					if (this.editForm.areaId != null) {
						if (
							this.editForm.areaerCard !== undefined &&
							this.editForm.areaerCard !== null &&
							this.editForm.areaerCard !== "" &&
							this.editForm.areaerCard.length !== 0
						) {
							this.editForm.areaerCard = this.editForm.areaerCard.toString();
						} else {
							this.editForm.areaerCard = "";
						}
						updateArea(this.editForm)
							.then((res) => {
								if (res.code == 200) {
									this.dialogEdit = false;
									this.newAreaLists.splice(this.index, 1, res.data);
									this.$message.success("修改成功");
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
		handleDelete(row, index) {
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
					this.newAreaLists.splice(index, 1);
					this.getTree();
					this.$message.success("删除成功");
				})
				.catch(() => { });
		},
	},
};
</script>
<style scoped>
/* p标签公共样式 */

.font {
	margin: 0;
	padding: 0;
}

/* 标题样式 */

.title-font {
	text-align: center;
	font-weight: bold;
}

/* 边框 */

.form-box {
	border-radius: 10px;
	border: 1px solid #ccc;
	background: #ddd;
	padding: 20px;
	margin: 30px;
}

/* 编辑输入框样式 */

.input-width {
	width: 25%;
	display: inline-block;
}

.input-width div {
	width: 90%;
}

/* 卡片样式 */

.el-card {
	border-radius: 10px;
	width: 48%;
	margin: 0 1%;
	display: inline-block;
}

/* 卡片标题样式 */

.card-font-title {
	margin: 8px 0;
	font-size: 14px;
	font-weight: bold;
}

.card-font-title span {
	color: #1f79f3;
}

/* 卡片内容字体样式 */

.card-font {
	margin: 8px 0;
	font-size: 12px;
}

/* 卡片操作按钮样式 */

.card-btn {
	text-align: right;
}

/* 卡片标注状态字体样式 */

.card-state {
	float: right;
	font-weight: bold;
	margin: 6px;
	font-size: 12px;
}

/* 网格和网格数量的字体样式 */

.title {
	margin: 0 0 0 5px;
	padding: 0;
	font-size: 14px;
	font-weight: bold;
}

/*面积平方样式*/

.square {
	margin-left: 4px;
}</style>