<!--实有建筑-->
<template>
	<div class="app-container">
		<!--左侧区域-->
		<div class="box buildingLeft">
			<div class="top">
				<p class="icon-g-icon"></p>
				<p>{{ this.areaTitle }}</p>
			</div>
			<div class="address">
				<p>当前位置：{{ this.stringPosition }}</p>
			</div>
			<div class="grid">
				<el-form :model="queryParams" ref="form" size="small" :inline="true" v-show="showSearch" label-width="68px">
					<el-form-item prop="grid" v-model="stringPosition">
						<p class="title" style="display: inline-block; font-weight: 400">
							网格：
						</p>
						<treeSelect v-model="value" :props="treeProps" :options="treeData" :accordion="true"
							@getValue="getList($event)" placeholder="请选择">
						</treeSelect>
					</el-form-item>
				</el-form>
			</div>
			<div class="house">
				<div slot="header" @click="getEcts"><span>建筑类型</span></div>
				<ul>
					<li>
						<span>住宅建筑 {{ getAccount.residence }}</span>
					</li>
					<li>
						<span style="color: #5c6bc0">办公建筑 {{ getAccount.office }}</span>
					</li>
					<li>
						<span style="color: #ff933e">综合建筑 {{ getAccount.comprehensive }}</span>
					</li>
					<li>
						<span style="color: #62cec3">交通建筑 {{ getAccount.traffic }}</span>
					</li>
				</ul>
			<!--            <div class="el-table el-table&#45;&#45;enable-row-hover el-table&#45;&#45;medium">
                      <div ref="houseStats" style="height: 420px" />
					                    </div>-->
			</div>
			<div class="courtyard">
				<div slot="header"><span>建筑用途</span></div>
				<ul>
					<li>
						<span>城镇住宅 {{ getAccount.urbanResidence }}</span>
					</li>
					<li>
						<span style="color: #5c6bc0">公寓 {{ getAccount.apartment }}</span>
					</li>
					<li>
						<span style="color: #ff933e">农村住宅 {{ getAccount.countryHouse }}</span>
					</li>
					<li>
						<span style="color: #62cec3">机关 {{ getAccount.institution }}</span>
					</li>
				</ul>
			</div>
			<div class="el-table el-table--enable-row-hover el-table--medium">
				<div ref="commandstats" style="height: 420px" />
			</div>
		</div>
		<!--中间区域-->
		<div class="box buildingCenter">
			<nav>
				<ul>
					<li v-for="(data, index) in childrenList" :key="index" :class="index === active ? 'isActive' : ''"
						@click="getRegionList(data, index)">
						<span>{{ data.areaName }}</span>
					</li>
				</ul>
			</nav>
		</div>
		<!--右侧区域-->
		<div class="box buildingRight">
			<div class="first">
				<el-form :model="queryParams" ref="form" size="small" :inline="true" v-show="showSearch">
					<el-form-item label="建筑类型：">
						<el-select clearable v-model="pageParams.architectureType" placeholder="请选择">
							<el-option v-for="dict in dict.type.building_type" :key="dict.value" :label="dict.label"
								:value="dict.value" @click.native="Buildingpulldown(dict)">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="建筑用途：">
						<el-select clearable v-model="pageParams.architecturePurpose" placeholder="请选择">
							<el-option v-for="item in dingpulldown" :key="item.value" :label="item.lable"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="关键字：">
						<el-input v-model="pageParams.buildingAddress" placeholder="输入楼房/院落名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button plain @click="querySubmit">查询</el-button>
					</el-form-item>
					<el-form-item style="float: right">
						<el-button plain v-hasPermi="['system:building:add']" v-if="addShow === true"
							@click="addBuildingShow">添加建筑</el-button>
						<el-button plain v-hasPermi="['system:building:senior']" @click="switchPage">高级</el-button>
					</el-form-item>
				</el-form>
				<div class="border" style="width: 100%; height: 2px; background-color: #cccccc"></div>
				<div class="first-quantity">
					<p>
						<span>全部： {{ cardInfo.total }}</span>
						<span>楼房: {{ cardInfo.unitSize }}</span>
						<!-- <span>非单元楼: {{ cardInfo.noUnitSize }}</span> -->
						<span>院落: {{ cardInfo.courtyardSize }}</span>
						<span>基础建筑: {{ cardInfo.basicSize }}</span>
					</p>
				</div>

				<div class="card-wrap" style="cursor: pointer">
					<el-card :body-style="{ padding: '0px', position: 'relative' }" v-for="(card, index) in cardList"
						:key="index">
						<div class="first-card" style="padding: 14px" @click="goBuildingInfo(card, card.id)">
							<el-tooltip class="item" effect="dark" placement="top">
								<div slot="content">{{ card.buildingName }}</div>
								<p>{{ card.buildingName }}</p>
							</el-tooltip>
							<div class="first-card-msg">
								<p>楼长：{{ card.buildingMaster }}</p>
								<p>所属小区：{{ card.communityName }}</p>
								<p>建筑类型：{{ card.architectureType }}</p>
								<p>建筑用途：{{ card.architecturePurpose }}</p>
								<p>楼房编号：{{ card.id }}</p>
							</div>
							<div class="state-img">
								<p class="icon-city" v-if="card.houseType === '楼房'"></p>
								<p class="icon-city" v-if="card.houseType === '单元'"></p>
								<p class="icon-superhigh-b" v-if="card.houseType === '非单元'"></p>
								<p class="icon-courtyard" v-if="card.houseType === '院落'"></p>
								<p class="icon-information" v-if="card.houseType === null"></p>
							</div>
							<!-- 已标注和未标注的状态 -->
							<a class="card-state unmarked icon-map-marker" v-hasPermi="['system:building:tag']"
								@click.stop="openMap(card.gis, card.id)" v-if="card.GIS === '未标注'">未标注</a>
							<a class="card-state marked icon-map-marker" v-hasPermi="['system:building:tag']"
								@click.stop="openMap(card.gis, card.id)" v-if="card.GIS === '已标注'">已标注</a>
						</div>
						<div class="bottom clearfix">
							<el-popover placement="bottom" width="160" style="float: right">
								<div style="text-align: center; margin: 0">
									<!-- 编辑按钮 -->
									<el-button type="primary" v-hasPermi="['system:building:edit']" plain size="mini"
										style="border-radius: 6px" @click="handleEdit(card, index)">编辑</el-button>
									<!-- 删除按钮 -->
									<el-button type="danger" v-hasPermi="['system:building:del']" plain size="mini"
										style="border-radius: 6px" @click="handleDelete(card, index)">删除</el-button>
								</div>
								<el-button class="card-btn" v-hasPermi="['system:operationBuild:operation']"
									slot="reference">操作</el-button>
							</el-popover>
						</div>
					</el-card>
					<div slot="empty" v-if="this.cardList.length === 0" style="
					              width: 100%;
					              display: flex;
					              align-items: center;
					              text-align: center;
					            ">
						<div style="width: 100%">
							<img src="../../../assets/images/nothing.png" width="30%" />
						</div>
					</div>
				</div>
				<!-- 分页 -->
				<pagination v-if="total !== 0" :total="total" :page.sync="pageParams.currentPage"
					:limit.sync="pageParams.pageSize" :page-sizes="[9, 12, 20, 50]" @pagination="getSelectBuildCard()" />
			</div>
		</div>
		<!-- 添加建筑弹窗 -->
		<el-dialog :visible.sync="dialogEdit" title="添加建筑" width="25%" :close-on-click-modal="false"
			class="addBuild_or_addHouse">
			<div class="dialog-card-wrap">
				<el-card shadow="hover" @click.native="detailed">
					<div class="state-img">
						<p class="icon-menu-event"></p>
						<p class="title">
							<span>楼房院落</span>
						</p>
					</div>
				</el-card>
				<el-card shadow="hover" @click.native="addBasicsBuild">
					<div class="state-img">
						<p class="icon-information"></p>
						<p class="title">
							<span>公共建筑</span>
						</p>
					</div>
				</el-card>
			</div>
			<div class="remarks">
				<p>注：</p>
				<p>
					楼房院落：适用于建设详细楼号、单元、楼层、房间号，每个房间人数
				</p>
				<p>
					公共建筑：适用于公共建筑，如停车场，公园、政府建筑，无楼号，无楼层，无单元、无房间等信息
				</p>
			</div>
		</el-dialog>

		<el-dialog :visible.sync="dialogDetailedEdit" title="添加建筑" width="40%" :close-on-click-modal="false"
			class="addBuild_or_addHouse">
			<div class="dialog-card-wrap">
				<el-card shadow="hover" @click.native="addBuilding">
					<div class="state-img">
						<p class="icon-city"></p>
						<p class="title">
							<span>添加楼房</span>
						</p>
					</div>
				</el-card>
			<!-- <el-card shadow="hover" @click.native="addBuildingNotUnit">
          <div class="state-img">
            <p class="icon-superhigh-b"></p>
            <p class="title">
              <span>添加非单元楼</span>
            </p>
          </div>
					        </el-card> -->
				<el-card shadow="hover" @click.native="addCourtyard">
					<div class="state-img">
						<p class="icon-courtyard"></p>
						<p class="title">
							<span>添加院落</span>
						</p>
					</div>
				</el-card>
			</div>
			<div class="remarks">
				<p>注：</p>
				<p>楼房：有单元的楼房</p>
				<!-- <p>非单元楼：无单元的楼房</p> -->
				<p>
					院落：适用于房屋前后用墙或栅栏围起来的建筑，多指农村住宅或别墅。或无楼号的楼房或楼群
				</p>
			</div>
		</el-dialog>
		<!-- 编辑楼房弹窗 -->
		<el-dialog :visible.sync="buildingDialogEdit" v-loading="loading" title="编辑楼房/院落" width="70%"
			:close-on-click-modal="false" @close="cancel('editForm')" class="building_dialog_wrap">
			<template>
				<el-form v-model="editForm">
					<div class="el_dialog_top">
						<p class="title">网格信息：</p>
						<ul class="one">
							<li>
								<span>网格编号：</span>
								<span>{{ editDialogInfo.areaNo }}</span>
							</li>
							<li>
								<span>网格名称：</span>
								<span>{{ editDialogInfo.areaName }}</span>
							</li>
							<li>
								<span>网格简称：</span>
								<span>{{ editDialogInfo.areaShortname }}</span>
							</li>
						</ul>
						<ul class="two">
							<li>
								<span>网格类型：</span>
								<span>{{ editDialogInfo.areaType }}</span>
							</li>
							<li>
								<span>网格长：</span>
								<span>{{ editDialogInfo.arealeaderName }}</span>
							</li>
							<li>
								<span>网格面积：</span>
								<span>{{ editDialogInfo.areaMeasure }}</span>
								<span>㎡</span>
							</li>
						</ul>
						<ul class="three">
							<li>
								<span>所属网格：</span>
								<span>{{ editDialogInfo.belongtoArea }}</span>
							</li>
						</ul>
					</div>
					<div class="el_dialog_bottom">
						<p class="title">楼栋信息：</p>
						<div class="edit_dialog_top">
							<el-form-item label="所属小区：">
								<el-select v-model="editForm.communityName" placeholder="请选择">
									<el-option v-for="(item, index) in areaList" :key="index.id" :label="item.communityName"
										:value="item.id" @click.native="editCommunit(item)">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="建筑名称：">
								<el-input v-model="editForm.buildingName"></el-input>
							</el-form-item>
							<el-form-item label="楼房编号：" class="three">
								<el-input v-model="editForm.id" readonly></el-input>
							</el-form-item>
						</div>
						<div class="edit_dialog_top two">
							<el-form-item label="建筑类型：">
								<el-select v-model="editForm.architectureType" placeholder="请选择">
									<el-option v-for="dict in dict.type.building_type" :key="dict.value" :label="dict.label"
										:value="dict.value" @click.native="Buildingpulldown(dict)">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="建筑用途：">
								<el-select v-model="editForm.architecturePurpose" placeholder="请选择">
									<el-option v-for="item in dingpulldown" :key="item.value" :label="item.lable"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="楼房产权：">
								<el-select v-model="editForm.housePropertyRight" placeholder="请选择">
									<el-option v-for="dict in dict.type.house_property_right" :key="dict.value"
										:label="dict.label" :value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="edit_dialog_top three">
							<el-form-item label="楼房隐患类型：">
								<el-select v-model="editForm.hiddenDangerType" placeholder="请选择">
									<el-option v-for="dict in dict.type.building_danger_type" :key="dict.value"
										:label="dict.label" :value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="楼房隐患级别：">
								<el-select v-model="editForm.hiddenDangerLevel" placeholder="请选择">
									<el-option v-for="dict in dict.type.focous_degree" :key="dict.value" :label="dict.label"
										:value="dict.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="楼长：">
								<el-input v-model="managerInput" placeholder="输入楼长姓名"></el-input>
								<el-button size="mini" @click="addManager">添加</el-button>
								<div class="add_manager_wrap">
									<div class="add_manager" v-for="(item, index) in managerList" :key="index">
										<span>{{ item }}</span>
										<span class="icon-close" @click="canelManager(item, index)"></span>
									</div>
								</div>
							</el-form-item>
						</div>
						<div class="edit_dialog_top four">
							<el-form-item label="标准地址：">
								<el-input v-model="editForm.buildingAddress" placeholder="请输入标准地址"></el-input>
							</el-form-item>
						</div>
						<div class="edit_dialog_top five">
							<el-form-item label="上传图片：">
								<image-upload v-model="editForm.picture" :limit="1" />
							</el-form-item>
						</div>
						<ul class="six">
							<li>
								<span>楼房简介：</span>
								<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容"
									v-model="editForm.brief">
								</el-input>
							</li>
						</ul>
					</div>
				</el-form>
			</template>
			<div slot="footer" style="text-align: center">
				<el-button type="primary" @click="submitForm(editForm)">保存</el-button>
				<el-button type="default" @click="cancel('editForm')">取消</el-button>
			</div>
		</el-dialog>
		<!--标注弹窗-->
		<el-dialog :visible.sync="dialogAnnotate" title="绘制网格" width="70%" height="600px" class="map" ref="dialogData"
			:close-on-click-modal="false" @close="closeMap()">
			<gridMap :mapData="mapData" :dialogAnnotate="dialogAnnotate" @coordinates="coordinates"></gridMap>
		</el-dialog>
	</div>
</template>

<script>
import { treeList, areaTree } from "@/api/area/area";
import {
	getAllBuilding,
	halfTreeList,
	childrenList,
	childrenListNoPage,
	getAreaTree,
	getSelectBuilding,
	returnDefaultBuild,
	updateBuliding,
	deleteCardInfo,
	buildArchTypeAndPur,
	updateGIS,
	queryBuildingArea,
	getArchiPurposeByType,
} from "@/api/area/house";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Cookies from "js-cookie";
import gridMap from "@/components/gridMap/index";
export default {
	dicts: [
		"building_type",
		"building_purpose",
		"house_property_right",
		"building_danger_type",
		"focous_degree",
		"building",
	],
	name: "newHouse",
	components: {
		gridMap,
		Treeselect,
	},
	data() {
		return {
			addShow: false, //添加按钮是否显示
			managerInput: "", // 楼长输入框双向绑定
			managerList: [], // 添加楼长存储集合
			addressInput: "", // 标准地址输入框
			textarea2: "", // 楼房简介输入框
			areaList: [],
			editDialogInfo: {}, // 楼房全部编辑弹框默认返回信息存储对象
			editForm: {
				buildingAddress: "",
				hiddenDangerLevel: "",
				architectureType: "",
				buildingName: "",
				houseType: "",
				communityName: "",
				id: 139,
				housePropertyRight: null,
				buildingMaster: null,
				architecturePurpose: null,
				hiddenDangerType: null,
				buildingPicture: "",
				admin: "",
				updateBy: "",
			},
			buildingDialogEdit: false, // 编辑楼房弹窗
			dialogEdit: false, // 添加建筑弹窗
			dialogDetailedEdit: false, // 添加建筑详细信息弹窗
			total: 0, // 分页总条数
			commandstats: null,
			cardInfo: {
				total: "",
				unitSize: "",
				noUnitSize: "",
				courtyardSize: "",
				basicSize: "",
			}, // 接收卡片信息接口储存
			cardList: [],
			cardState: "已标注", // 卡片已标注/未标注
			activeName: "first",
			active: 0,
			childrenList: [],
			// 楼房统计
			houseStats: null,
			dingpulldown: [], // 实有建筑-编辑楼房-选择建筑类型建筑用途列表数据
			// 表单校验
			rules: {
				userName: [{
					required: true,
					message: "用户名称不能为空",
					trigger: "blur"
				},
				{
					min: 2,
					max: 20,
					message: "用户名称长度必须介于 2 和 20 之间",
					trigger: "blur",
				},
				],
				nickName: [{
					required: true,
					message: "用户昵称不能为空",
					trigger: "blur"
				},],
				password: [{
					required: true,
					message: "用户密码不能为空",
					trigger: "blur"
				},
				{
					min: 5,
					max: 20,
					message: "用户密码长度必须介于 5 和 20 之间",
					trigger: "blur",
				},
				],
				email: [{
					type: "email",
					message: "请输入正确的邮箱地址",
					trigger: ["blur", "change"],
				},],
				phonenumber: [{
					pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
					message: "请输入正确的手机号码",
					trigger: "blur",
				},],
			},
			// 弹出层标题
			title: "",
			// 是否显示弹出层
			open: false,
			currentDate: new Date(),
			// 部门树选项
			deptOptions: undefined,
			form: {},
			pageParams: {
				userId: localStorage.getItem("userId"),
				areaId: localStorage.getItem("areaId"),
				buidingNumber: "",
				houseType: "",
				currentPage: 1,
				pageSize: 9,
				buildingName: "",
			},
			// 卡片查询参数
			queryParams: {
				userId: localStorage.getItem("userId"),
				currentPage: 1, //当前页
				pageSize: 9, //每页条数
				queryName: "", // 楼房/院落名称
				areaName: null,
				areaShortname: null,
				areaMeasure: null,
				areaType: null,
				areaId: "",
			},
			// 显示搜索条件
			showSearch: true,
			treeProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			value: "", // 网格选中回显值
			treeData: [], //下拉框数据
			areaTitle: "", //区域标题
			stringPosition: "", //位置信息
			loading: true,
			tabName: "全部", // 右边tab名称（全部/楼房/院落）
			getAccount: {},
			dialogAnnotate: false, //打开地图弹窗
			mapData: {
				build: "",
				gridCenter: "", //给地图传参（中心点）
				areaId: "", //给地图传参（id）
			},
			paramAreaId: "",
		};
	},
	created() {
		this.getTree();
	},
	mounted() {
		window.addEventListener("beforeunload", (e) => {
			sessionStorage.removeItem("data");
		});
	},
	destroyed() {
		window.removeEventListener("beforeunload", (e) => {
			sessionStorage.removeItem("data");
		});
	},
	methods: {
		// 左侧卡片网格 - 半棵树查询树
		getTree() {
			let param = {
				userId: localStorage.getItem("userId"),
				flag: 1,
			};
			areaTree(param).then((res) => {
				this.treeData = res.data;
				this.areaTitle = res.data[0].label;
				this.stringPosition = res.data[0].label;
				//取
				// let dataId = JSON.parse(localStorage.getItem("data"));
				let dataId = JSON.parse(sessionStorage.getItem("data"));
				if (dataId) {
					this.value = dataId.id;
				} else {
					this.value = res.data[0] && res.data[0].id;
				}
				this.paramAreaId = res.data[0].id;
				this.loading = false;
				if (res.data[0]) {
					if (!res.data[0].children) {
						localStorage.setItem("areaId", res.data[0].id);
						localStorage.setItem("areaName", res.data[0].label);
						console.log(res.data[0].areaLevel)
						console.log(res.data[0].areaLevel === "6")
						if (res.data[0].areaType === "专属网格") {
							this.addShow = true;
						} else {
							if (res.data[0].areaLevel === "6") {
								this.addShow = true;
							} else {
								this.addShow = false;
							}
						}
					} else {
						this.addShow = false;
					}
				}
				this.getList(dataId);
			});
		},

		//获取标题和位置并传参
		getList(data) {
			//存
			// localStorage.setItem("data", JSON.stringify(data));
			sessionStorage.setItem("data", JSON.stringify(data));
			if (data !== undefined && data !== null) {
				this.getParent(this.treeData, data.id);
				this.areaTitle = data.label;
				let param = {
					areaId: data.id,
				};
				let buildArchType = {
					userId: localStorage.getItem("userId"),
					areaId: data.id,
				};
				this.handleChildren(param);
				this.getSelectAccount(buildArchType);
			} else {
				let param = {
					areaId: this.paramAreaId,
				};
				let buildArchType = {
					userId: localStorage.getItem("userId"),
					areaId: this.paramAreaId,
				};
				this.handleChildren(param);
				this.getSelectAccount(buildArchType);
			}
		},
		// getList(data) {
		//   if (data !== undefined && data !== null) {
		//     this.getParent(this.treeData, data.id);
		//     this.areaTitle = data.label;
		//     let param = {
		//       areaId: data.id,
		//     };
		//     let buildArchType = {
		//       userId: localStorage.getItem("userId"),
		//       areaId: data.id,
		//     };
		//     this.handleChildren(param);
		//     this.getSelectAccount(buildArchType);
		//   } else {
		//     let param = {
		//       areaId: this.paramAreaId,
		//     };
		//     let buildArchType = {
		//       userId: localStorage.getItem("userId"),
		//       areaId: this.paramAreaId,
		//     };
		//     this.handleChildren(param);
		//     this.getSelectAccount(buildArchType);
		//   }
		// },

		//反向递归获取位置
		getParent(treeData, value, label, children = "children", level = 0) {
			let arrResString = "";
			let obj = {
				value: 0,
				[children]: treeData
			};
			let rev = (treeData, value, level) => {
				if (!treeData || !treeData[children] || !treeData[children].length) {
					return;
				}
				for (let i = 0; i < treeData[children].length; i += 1) {
					let item = treeData[children][i];
					// 有则跳出循环再次递归
					if (item.id === value) {
						arrResString = item.label + " > " + arrResString;
						rev(obj, treeData.id, 0);
						break;
					} else if (item[children] && item[children].length > 0) {
						rev(item, value, level + 1);
					}
				}
			};
			rev(obj, value, level);
			this.stringPosition = arrResString.substring(
				0,
				arrResString.lastIndexOf(" > ")
			);
			return;
		},

		//获取所选区域下级（中间显示的）
		handleChildren(value) {
			getAreaTree(value).then((res) => {
				this.childrenList = res.data;
				console.log('this.childrenList', this.childrenList)
				if (this.childrenList.length !== 0) {
					this.queryParams.areaId = this.childrenList[0].areaId;
					localStorage.setItem("areaId", this.childrenList[0].areaId);
					localStorage.setItem("areaName", this.childrenList[0].areaName);
					this.active = 0;
					if (this.childrenList[0].areaType === "专属网格") {
						this.addShow = true;
					} else {
						if (this.childrenList[0].areaLevel === "6") {
							this.addShow = true;
						} else {
							this.addShow = false;
						}
					}
				}
				this.getBuild();
			});
		},

		//左侧楼房院落信息
		getSelectAccount(data) {
			buildArchTypeAndPur(data).then((res) => {
				if (res.code === 200) {
					this.getAccount = res.data;
				}
			});
		},

		// 获取楼房卡片
		getBuild() {
			this.loading = true;
			getAllBuilding(this.queryParams).then((res) => {
				if (res.code === 200) {
					this.loading = false;
					this.cardInfo.total = res.data[0].total;
					this.total = res.data[0].total;
					this.cardInfo.unitSize = res.data[1].unitSize;
					this.cardInfo.noUnitSize = res.data[1].noUnitSize;
					this.cardInfo.courtyardSize = res.data[1].courtyardSize;
					this.cardInfo.basicSize = res.data[1].basicSize;
					this.cardList = res.data[1].buildingList;
				}
			});
		},

		//添加建筑
		addBuild() {
			if (this.tabName === "楼房") {
				this.$router.push({
					path: "/addBuilding",
					query: {
						houseType: "楼房"
					},
				});
			} else if (this.tabName === "院落") {
				this.$router.push({
					path: "/addBuilding",
					query: {
						houseType: "院落"
					},
				});
			}
		},
		// 编辑弹窗保存按钮
		submitForm(value) {
			this.editForm.updateBy = Cookies.get("username");
			let masterList = [];
			this.managerList.map((item) => {
				masterList.push(item);
			});
			this.editForm.buildingMaster = masterList.toString();
			let editForm = {
				buildingAddress: this.editForm.buildingAddress,
				hiddenDangerLevel: this.editForm.hiddenDangerLevel,
				architectureType: this.editForm.architectureType,
				buildingName: this.editForm.buildingName,
				houseType: this.editForm.houseType,
				communityName: this.editForm.communityName,
				id: this.editForm.id,
				housePropertyRight: this.editForm.housePropertyRight,
				buildingMaster: this.editForm.buildingMaster,
				architecturePurpose: this.editForm.architecturePurpose,
				hiddenDangerType: this.editForm.hiddenDangerType,
				buildingPicture: this.editForm.picture,
				buildingBriefIntroduction: this.editForm.brief,
			};
			updateBuliding(editForm).then((res) => {
				if (res.code === 200) {
					masterList = [];
					this.buildingDialogEdit = false;
					this.$message.success("修改成功");
					let dataId = JSON.parse(sessionStorage.getItem("data"));
					this.getList(dataId);
				}
			});
		},
		// 编辑遮罩层 - 添加楼长之后显示的tab删除按钮
		canelManager(item, index) {
			this.managerList.splice(index, 1);
		},
		// 编辑遮罩层 - 添加楼长按钮
		addManager() {
			this.managerList.push(this.managerInput);
			this.managerInput = "";
		},
		// 编辑的取消按钮
		cancel() {
			this.managerList = [];
			this.buildingDialogEdit = false;
		},
		handleDelete(item, index) {
			let params = {
				id: item.id,
			};
			if (this.tabName === "全部") {
				this.$confirm('是否删除建筑："' + item.buildingName + '"？', "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					this.loading = true;
					deleteCardInfo(params).then((res) => {
						let dataId = JSON.parse(sessionStorage.getItem("data"));
						if (res.code === 200) {
							this.loading = false;
							this.$message.success(res.msg);
							this.getList(dataId);
						} else if (res.code === 201) {
							this.loading = false;
							this.$message.error(res.msg);
							this.getList(dataId);
						}
					});
				});
			} else if (this.tabName === "楼房" || this.tabName === "院落") {
				this.$confirm('是否删除网格："' + item.buildingName + '"？', "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					deleteCardInfo(params).then((res) => {
						if (res.code === 200) {
							this.$message.success(res.msg);
							this.getSelectBuildCard();
						}
					});
				});
			}
		},
		handleEdit(item, index) {
			let params = {
				id: item.id,
			};
			this.loading = true;
			returnDefaultBuild(params).then((res) => {
				if (res.code === 200) {
					this.editDialogInfo = res.data[0];
					this.editForm = this.editDialogInfo;
					this.buildingDialogEdit = true;
					this.loading = false;
					let a = [];
					if (
						this.editDialogInfo.buildingMaster !== null &&
						this.editDialogInfo.buildingMaster !== ""
					) {
						a = this.editDialogInfo.buildingMaster.split(",");
						a.map((item) => {
							if (this.managerList.indexOf(item) === -1) {
								this.managerList.push(item);
							}
						});
					} else { }
				}
			});
			let param = {
				areaId: localStorage.getItem("areaId"),
			};
			queryBuildingArea(param).then((res) => {
				if (res.code === 200) {
					this.areaList = res.data;
				}
			});
		},
		// 编辑楼房所属小区下拉款选择按钮
		editCommunit(item) {
			this.editForm.communityId = item.id;
			this.editForm.communityName = item.communityName;
		},
		// 根据条件查询卡片
		getSelectBuildCard() {
			this.loading = true;
			this.pageParams.areaId = localStorage.getItem("areaId");
			console.log(localStorage.getItem("areaId"));
			getSelectBuilding(this.pageParams).then((res) => {
				if (res.code === 200) {
					this.loading = false;
					this.cardList = res.data[1].buildingList;
					this.pageParams.currentPage = res.data[0].pageNum;
					if (this.cardList.length === 0) {
						this.cardInfo.total = 0;
						this.cardInfo.buidingSize = 0;
						this.cardInfo.courtySize = 0;
					} else {
						this.cardInfo.total = this.total = res.data[0].total;
						// this.cardInfo.buidingSize =  this.total = res.data[1].buidingSize
						// this.cardInfo.courtySize =  this.total = res.data[1].courtySize
					}
				}
			});
		},

		unitNamenormalizer(node) {
			if (node.children && !node.children.length) {
				delete node.children;
			}
			return {
				id: node.deptId,
				label: node.deptName,
			};
		},
		// 详情页面
		goBuildingInfo(card, id) {
			localStorage.setItem("houseName", card.buildingName);
			console.log(card);
			if (card.buildingTemplate === "楼房院落" && card.houseType === "楼房") {
				this.$router.push({
					path: "/buildingInfo",
					query: {
						id: id
					}
				});
			} else if (
				card.buildingTemplate === "楼房院落" &&
				card.houseType === "院落"
			) {
				this.$router.push({
					path: "/buildingInfo",
					query: {
						id: id
					}
				});
			} else if (card.buildingTemplate === "公共建筑") {
				this.$router.push({
					path: "/basicsInfo",
					query: {
						id: id,
						buildingTemplate: "公共建筑"
					},
				});
			}
		},
		// 添加院落
		addCourtyard() {
			this.$router.push({
				path: "/addCourtyard",
				query: {
					houseType: "院落",
					buildingTemplate: "楼房院落"
				},
			});
		},
		// 添加楼房
		addBuilding() {
			this.$router.push({
				path: "/addBuilding",
				query: {
					houseType: "楼房",
					buildingTemplate: "楼房院落"
				},
			});
		},
		// 添加非单元楼
		// addBuildingNotUnit() {
		//   this.$router.push({
		//     path: "/addNotUnit",
		//     query: { houseType: "非单元", buildingTemplate: "楼房院落" },
		//   });
		// },
		// 添加公共建筑
		addBasicsBuild() {
			this.$router.push({
				path: "/addBasics",
				query: {
					houseType: "",
					buildingTemplate: "公共建筑"
				},
			});
		},
		// 添加建筑按钮
		addBuildingShow() {
			this.dialogEdit = true;
		},
		//详细信息
		detailed() {
			this.dialogDetailedEdit = true;
		},
		switchPage() {
			if (this.tabName === "楼房" || this.tabName === "全部") {
				this.$router.push({
					path: "/buildingHeight"
				});
			} else if (this.tabName === "院落") {
				this.$router.push({
					path: "/houseHeight"
				});
			}
		},
		querySubmit() {
			this.pageParams.currentPage = 1
			this.getSelectBuildCard();
		},
		handleClick(tab) {
			if (tab.label === "全部") {
				this.pageParams.houseType = "";
				this.getList();
				this.tabName = "全部";
			} else if (tab.label === "楼房") {
				this.pageParams.houseType = "楼房";
				this.getSelectBuildCard();
				this.tabName = "楼房";
			} else if (tab.label === "院落") {
				this.pageParams.houseType = "院落";
				this.getSelectBuildCard();
				this.tabName = "院落";
			}
		},
		getRegionList(data, index) {
			console.log(data);
			if (data.areaType === "专属网格") {
				this.addShow = true;
			} else {
				if (data.areaLevel === "6") {
					this.addShow = true;
				} else {
					this.addShow = false;
				}
			}
			if (data !== undefined && data !== null) {
				this.active = index;
				this.queryParams.areaId = data.areaId;
				localStorage.setItem("areaId", data.areaId);
				localStorage.setItem("areaName", data.areaName);
				this.getBuild();
			} else {
				this.queryParams.areaId = this.paramAreaId;
				this.getBuild();
			}
		},

		// /** 获取网格树状结构数据 */
		// getTreeSelect () {
		//   treeList ().then(res => {
		//     this.treeData = res.data
		//     this.childrenList = res.data[0].children
		//     localStorage.setItem('areaId', res.data[0].children[0].id)
		//     localStorage.setItem('threeName', res.data[0].children[0].label)
		//     this.areaTitle = res.data[0].label
		//     this.stringPosition = res.data[0].label
		//     this.loading = false
		//   })
		// },

		getEcts() {
			// this.houseStats = echarts.init(this.$refs.houseStats, "macarons");
			// this.houseStats.setOption({
			//   tooltip: {
			//     trigger: "item",
			//     formatter: "{a} <br/>{b} : {c} ({d}%)",
			//   },
			//   series: [
			//     {
			//       name: "命令",
			//       type: "pie",
			//       roseType: "radius",
			//       radius: [15, 95],
			//       center: ["50%", "38%"],
			//       data: response.data.houseStats,
			//       animationEasing: "cubicInOut",
			//       animationDuration: 1000,
			//     },
			//   ],
			// });
		},

		// 标注弹窗打开
		openMap(center, id) {
			this.mapData.build = true;
			this.mapData.gridCenter = center;
			this.mapData.areaId = id;
			this.dialogAnnotate = true;
			this.$refs.dialogData.mapData = this.mapData;
		},

		//接收地图标注的传值
		coordinates(value, id) {
			// value 就是子组件传递过来的数据
			console.log("子组件传参==", value, id);
			var param = {
				id: id,
				gis: value.areaCenter,
			};
			updateGIS(param).then((response) => {
				this.$modal.msgSuccess("保存成功");
				this.dialogAnnotate = false;
				// this.getBuild();
				this.getSelectBuildCard();
			});
		},
		//关闭标注弹窗
		closeMap() {
			this.dialogAnnotate = false;
		},

		// 实有建筑-编辑楼房-选择建筑类型调用接口渲染建筑用途
		Buildingpulldown(data) {
			console.log(data);
			let params = {
				// architectureType:  this.editForm.architectureType, // 建筑类型
				architectureType: data.label, // 建筑类型
			};
			console.log(params);
			getArchiPurposeByType(params).then((res) => {
				if (res.code === 200) {
					this.dingpulldown = res.data;
					console.log(this.dingpulldown);
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep .el-select-dropdown__list {
	background-color: red;

	::v-deep .el-select-dropdown__item {
		padding-left: 10px !important;
	}
}

.app-container {
	padding: 20px;
}

/*三个区域公共样式*/

.box {
	display: inline-block;
	padding: 20px;
	height: 100%;
	overflow: hidden;
	vertical-align: top;
}

.buildingLeft {
	width: 19%;
	box-shadow: 12px 0 12px -12px rgba(0, 0, 0, 0.1);
}

.buildingCenter {
	width: 14%;
	text-align: center;
}

.buildingRight {
	width: 67%;
	box-shadow: -12px 0 12px -12px rgba(0, 0, 0, 0.1);
}

.edit_dialog_top {
	display: flex;
	margin-left: 34px;

	::v-deep .el-form-item {
		margin-left: 30px;

		.el-form-item__label {
			font-size: 14px;
			font-weight: 400;
			color: #000000;
			padding: 0;
		}

		.el-form-item__content {
			display: flex;
		}

		.el-select {
			width: 215px;
			height: 35px;
		}

		&.three {
			.el-form-item__content {
				.el-input__inner {
					width: 215px;
					height: 35px;
					background-color: #ccc;
					border-radius: 0;
					color: #000;
					padding: 2px;
				}
			}
		}

		&:nth-child(1) {
			margin-left: 0;
		}

		&:nth-child(2) {
			.el-input {
				width: 215px;
				height: 35px;
			}
		}
	}

	&.two {
		.el-form-item {
			&:nth-child(2) {
				margin-left: 65px;
			}
		}
	}

	&.three {
		margin-left: 6px;

		.el-form-item {
			&:nth-child(2) {
				margin-left: 38px;
			}

			&:nth-child(3) {
				display: flex;
				margin-left: 59px;
				align-items: center;
				position: relative;

				.el-input {
					width: 215px;
					height: 35px;
				}

				.el-button {
					margin-left: 11px;
				}

				.add_manager_wrap {
					position: absolute;
					top: 50px;
					width: 150%;

					.add_manager {
						width: 83px;
						height: 31px;
						border: 1px solid #ccc;
						text-align: center;
						line-height: 31px;
						float: left;
						margin-right: 5px;
						margin-bottom: 5px;

						.icon-close {
							position: relative;
							left: 5px;
						}
					}
				}
			}
		}
	}

	&.four {
		.el-input {
			width: 570px;
			height: 35px;
		}
	}

	&.five {
		.el-form-item {
			::v-deep .el-form-item__label {
				position: relative;
				top: 50px;
			}

			::v-deep .el-upload-list {
				margin: 0;
			}

			::v-deep .el-upload-list__item-actions {
				span {
					color: #fff;
				}
			}
		}
	}
}

/** 修改el-dialog样式 */

::v-deep .building_dialog_wrap {
	border-radius: 10px;

	.el-dialog__title {
		font-size: 20px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #000000;
	}

	.el-dialog__body {
		padding-top: 0;
	}

	.el_dialog_top {
		margin-left: 22px;

		.title {
			font-size: 16px;
			font-weight: bold;
			color: #000000;
		}

		ul {
			display: flex;
			margin-left: 12px;
			margin-top: 19px;

			li {
				display: flex;
				align-items: center;
				margin-left: 64px;

				span {
					font-size: 14px;
					font-weight: 400;
					color: #000000;

					&:nth-child(2) {
						display: inline-block;
						width: 215px;
						height: 35px;
						background-color: #cccccc;
						line-height: 35px;
						box-sizing: border-box;
						padding-left: 11px;
					}
				}

				&:first-child {
					margin: 0;
				}
			}

			&.one {
				margin-top: 0;
			}

			&.two {
				li {
					&:nth-child(2) {
						margin-left: 79px;
					}

					&:nth-child(3) {
						span {
							&:nth-child(2) {
								width: 184px;
								height: 35px;
							}

							&:nth-child(3) {
								margin-left: 5px;
								position: relative;
								top: -10px;
							}
						}
					}
				}
			}

			&.three {
				li {
					span {
						&:nth-child(2) {
							width: 565px;
							height: 35px;
						}
					}
				}
			}
		}
	}

	.el_dialog_bottom {
		.title {
			font-size: 16px;
			font-weight: bold;
			color: #000000;
			margin-left: 10px;
		}

		ul {
			display: flex;
			margin-left: 34px;
			margin-top: 18px;

			li {
				margin-left: 30px;
				display: flex;
				align-items: center;

				span {
					font-size: 14px;
					font-weight: 400;
					color: #000000;
				}

				&:first-child {
					margin: 0;
				}
			}

			&.six {
				li {
					span {
						display: inline-block;
						width: 75px;
					}

					.el-textarea__inner {
						width: 1123px;
						height: 76px !important;
						min-height: 76px !important;
					}
				}
			}
		}
	}
}

.clearfix {
	position: absolute;
	top: 10px;
	right: 10px;
}

::v-deep .el-tabs__header {
	border: 0 !important;
	margin-bottom: 20px;
}

::v-deep .el-tabs--card>.el-tabs__header .el-tabs__nav {
	border: none;
}

::v-deep .el-tabs__item {
	align-items: center;
	width: 90px;
	height: 34px;
	line-height: 34px;
	margin-right: 10px;
	border: 1px solid #569af6 !important;
	text-align: center;
	border-radius: 8px;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #1f79f3;

	&.is-active {
		background-color: #1f79f3;
		color: #fff;
	}
}

.app-container {

	ul,
	li {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	p {
		font-family: Microsoft YaHei;
	}

	span {
		font-size: 12px;
		font-weight: 400;
		font-family: Microsoft YaHei;
	}

	.top {
		display: flex;
		align-items: center;
		margin-bottom: 14px;

		.icon-g-icon {
			font-size: 28px;
		}

		p {
			margin: 0 0 0 4px;
			font-size: 24px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #f27463;
		}
	}

	.address {
		width: auto;
		height: 40px;
		padding: 0 10px;
		background: #ccc;
		border-radius: 20px;
		display: flex;
		align-items: center;

		p {
			font-size: 12px;
			color: #ffffff;
			text-align: left;
			margin: 0;
		}
	}

	//.grid {
	//  margin: 20px 0 0 24px
	//}
	.house {

		//margin-left: 24px;
		span {
			font-size: 18px;
			font-weight: 400;
			color: #000000;
		}

		ul {
			margin-top: 15px;
			width: 100%;
			display: flex;
			flex-wrap: wrap;

			li {
				margin-right: 5px;
				margin-top: 5px;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 114px;
				height: 34px;
				border: 1px solid #d9d9d9;
			}

			span {
				font-size: 12px;
				font-weight: 400;
				color: #f48778;
			}
		}
	}

	.courtyard {
		margin-top: 25px;

		//margin-left: 24px;
		span {
			font-size: 18px;
			font-weight: 400;
			color: #000000;
		}

		ul {
			margin-top: 15px;
			width: 100%;
			display: flex;
			flex-wrap: wrap;

			li {
				margin-right: 5px;
				margin-top: 5px;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 114px;
				height: 34px;
				border: 1px solid #d9d9d9;
			}

			span {
				font-size: 12px;
				font-weight: 400;
				color: #f48778;
			}
		}
	}

	nav {
		margin-left: 20px;

		ul {
			li {
				width: 156px;
				box-sizing: border-box;
				padding: 10px 0;
				margin-top: 15px;
				border: 1px solid #e5e5e5;
				border-radius: 5px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;

				&.isActive {
					background-color: #1f79f3;

					span {
						color: #fff;
					}
				}

				span {
					color: #000000;
				}
			}
		}
	}

	.first {
		::v-deep .el-form-item__label {
			padding-right: 3px;
		}

		.first-quantity {
			span {
				margin-right: 15px;
				font-size: 12px;
				font-weight: 400;
			}
		}

		.first-card {
			position: relative;

			p {
				margin: 0 0 10px 0;
				font-size: 18px;
				font-weight: bold;
				color: #000000;
				width: 66%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.first-card-msg {
				p {
					margin: 0;
					padding: 0;
					font-size: 12px;
					font-weight: 400;
					color: #666666;
					line-height: 22px;
				}
			}

			.bottom {
				position: absolute;
				right: 10px;
				top: 10px;

				::v-deep .el-button {
					width: 67px;
					height: 30px;
					border: 1px solid #ccc;
					border-radius: 5px;
					display: flex;
					justify-content: center;
					align-items: center;

					span {
						font-size: 12px;
						font-weight: 400;
						color: #000000;
					}
				}
			}

			.card-state {
				font-size: 12px;
				font-weight: bold;
				margin: 6px;
				position: absolute;
				right: 10px;
				bottom: 10px;
			}

			/* 已标注字体颜色 */
			.marked {
				color: #3bc2b4;
			}

			/* 未标注字体颜色 */
			.unmarked {
				color: #999;
			}

			.state-img {
				position: absolute;
				left: 55%;
				top: 30%;

				.icon-city {
					font-size: 88px;
					color: #ffe7e6;
					text-align: center;
				}

				.icon-superhigh-b {
					font-size: 88px;
					color: #ffe9d3;
					text-align: center;
				}

				.icon-courtyard {
					font-size: 88px;
					color: #e1e7ff;
					text-align: center;
				}

				.icon-menu-event {
					font-size: 88px;
					color: #ffe7e6;
					text-align: center;
				}

				.icon-information {
					font-size: 88px;
					color: #d6f3df;
					text-align: center;
				}
			}
		}

		.card-wrap {
			width: 100%;
			display: flex;
			flex-wrap: wrap;

			::v-deep .el-card {
				width: 32%;
				height: 167px;
				border-radius: 15px;
				margin-right: 10px;
				margin-bottom: 10px;
			}

			.el-card:hover {
				background: #ebf7ff !important;
			}
		}
	}

	::v-deep .pagination-container {
		margin-bottom: 50px;
	}

	/* 修改添加建筑弹窗距离顶部距离 */
	::v-deep .el-dialog:not(.is-fullscreen) {
		//margin-top: 40vh !important;
	}

	::v-deep .addBuild_or_addHouse {
		.el-dialog {
			.el-dialog__header {
				border-bottom: 1px solid #eeeeee;
				padding: 10px 20px;

				.el-dialog__title {
					font-size: 14px;
					font-family: Microsoft YaHei;
					font-weight: bold;
					color: #000000;
				}

				.el-dialog__headerbtn {
					top: 15px;
				}
			}

			.el-dialog__body {
				.dialog-card-wrap {
					display: flex;
					justify-content: space-around;

					.is-hover-shadow {
						width: 205px;
						height: 165px;
						cursor: pointer;

						.state-img {
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;

							.icon-city {
								margin: 0;
								font-size: 88px;
								color: #ffe7e6;
								text-align: center;
							}

							.icon-superhigh-b {
								margin: 0;
								font-size: 88px;
								color: #ffe9d3;
								text-align: center;
							}

							.icon-courtyard {
								margin: 0;
								font-size: 88px;
								color: #e1e7ff;
								text-align: center;
							}

							.icon-menu-event {
								margin: 0;
								font-size: 88px;
								color: #ffe7e6;
								text-align: center;
							}

							.icon-information {
								margin: 0;
								font-size: 88px;
								color: #d6f3df;
								text-align: center;
							}

							.title {
								span {
									font-size: 18px;
									font-weight: 400;
									color: #000000;
								}
							}
						}
					}
				}
			}
		}
	}
}

.icon-city {
	width: 100% !important;
}

.icon-superhigh-b {
	width: 100% !important;
}

.icon-courtyard {
	width: 100% !important;
}

.icon-information {
	width: 100% !important;
}

.icon-menu-event {
	width: 100% !important;
}

.el-table::before {
	display: none;
}

.remarks {
	font-size: 12px;
	color: red;
	padding: 10px;
}

.remarks p {
	margin: 0 0 10px 0;
}
</style>