<!--网格详情-->
<template>
	<div class="app-container">
		<div class="top">
			<div style="margin-bottom: 20px">
				<!-- 标题 -->
				<h1 class="fontColor"><span class="icon-g-icon" :style="{ color: this.cardData.areaColor }"></span>{{
					this.cardData.areaName }}</h1>
				<!-- 右侧按钮 -->
				<div style="float: right">
					<el-button type="primary" plain size="mini" v-hasPermi="['system:details:tag']" @click="annotateMap()">
						标注地图 </el-button>
					<el-button type="primary" plain size="mini" v-hasPermi="['system:area:query']" @click="handleEdit()"> 编辑
					</el-button>
				</div>
			</div>
			<div>
				<!--风采图片-->
				<div class="box image">
					<el-image :src="require('@/assets/images/building.jpg')" :fit="fit" class="img"
						v-if="this.areaMien === ''"></el-image>
					<el-image :src="areaMien" :fit="fit" class="img" v-else></el-image>
				</div>
				<!--网格信息-->
				<div class="box information">
					<p class="card-font"
						v-if="this.cardData.baGridArea === '' || this.cardData.baGridArea === null || this.cardData.baGridArea === undefined">
						所属上级：顶级网格</p>
					<p class="card-font" v-else>所属上级：{{ this.cardData.baGridArea.areaName }}</p>
					<p class="card-font">行政区类别：
						<dict-tag :options="dict.type.administrative_region" :value=this.cardData.areaLevel
							style="display: inline-block;" />
					</p>
					<p>网格类型：
						<dict-tag :options="dict.type.grid_type" :value=this.cardData.areaType
							style="display: inline-block;" />
					</p>
					<p>网格编号：{{ this.cardData.areaNo }}</p>
					<p style="display: inline-block;vertical-align: top">网格颜色：</p>
					<p style="width: 20px;height: 20px;display: inline-block;"
						:style="{ background: this.cardData.areaColor }"></p>
					<p v-if="this.cardData.areaMeasure === ''">网格面积：暂无</p>
					<p v-else>网格面积：{{ this.cardData.areaMeasure }} ㎡</p>
					<p>网格简介：
						<span style="color: #ccc;font-size: 12px"
							v-if="this.cardData.areaIntroduction === '' || this.cardData.areaIntroduction === null">
							暂无
							<span style="color: #1F79F3;cursor: pointer" @click="openDetails">（详情介绍）</span>
						</span>
						<span style="color: #ccc;font-size: 12px" v-else>
							{{ this.cardData.areaIntroduction }}
							<span style="color: #1F79F3;cursor: pointer" @click="openDetails">（详情介绍）</span>
						</span>
					</p>
				</div>
				<div class="box grid personnel">
					<div class="master">
						<el-image
							:src="this.cardData.arealeaderImage ? this.cardData.arealeaderImage : require('@/assets/images/portrait.jpg')"
							:fit="fit" class="gridImg"></el-image>
						<p v-if="this.cardData.arealeaderName === null || this.cardData.arealeaderName === ''">无网格长</p>
						<p v-else>{{ this.cardData.arealeaderName }}</p>
					</div>
					<div class="member">
						<p>网格员：</p>
						<span v-if="this.cardData.areaerName === null || this.cardData.areaerName === ''">暂无</span>
						<span v-else>{{ this.cardData.areaerName }}</span>
					</div>
				</div>
				<div class="box grid">
					<div class="master">
						<el-image :src="require('@/assets/images/portrait.jpg')" :fit="fit" class="gridImg"></el-image>
						<p>{{ byAreaDetail.partyManager ? byAreaDetail.partyManager : "暂无" }}</p>
					</div>
					<div class="member">
						<p>{{ byAreaDetail.partyName }}</p>
						<p>组织委员：{{ byAreaDetail.partyCommitteeSize ? byAreaDetail.partyCommitteeSize : 0 }}</p>
						<p>下属党员：{{ byAreaDetail.partyMemberSize ? byAreaDetail.partyMemberSize : 0 }}</p>
					</div>
				</div>
				<div class="code">
					<!--<img src="" alt="">-->
				</div>
			</div>
		</div>

		<div class="bottom">
			<div style="width: 74%;margin-right: 2%;display: inline-block;">
				<!--实有人口-->
				<div class="card borderOption">
					<div>
						<span class="icon-mans icon" style="color: #3BC2B4;"></span>
						<h3 class="card-title">实有人口（{{ peopleList.actualNum }}）</h3>
					</div>
					<p>户籍 {{ peopleList.registeredNum }}</p>
					<p>未落户 {{ peopleList.unregisteredNum }}</p>
					<p>常住 {{ peopleList.permanentNum }}</p>
					<p>流动 {{ peopleList.flowNum }}</p>
					<p>外出 {{ peopleList.outerNum }}</p>
					<p>空挂 {{ peopleList.hangNum }}</p>
					<p>境外 {{ peopleList.foreignNum }}</p>
				</div>
				<!--实有建筑-->
				<div class="card ">
					<div>
						<span class="icon-city icon" style="color: #F27463;"></span>
						<h3 class="card-title">实有建筑（{{ this.Buildingnum }}）</h3>
						<div>
							<div ref="chartOne" id="chartOne" class="chart"></div>
						</div>

					</div>
				</div>
				<!--实有部件-->
				<div class="card borderOption">
					<div>
						<span class="icon-parts-camera icon" style="color: #1F79F3;"></span>
						<h3 class="card-title">实有部件（{{ partsList.total }}）</h3>
					</div>
					<p>路灯 {{ partsList.light }}</p>
					<p>健身器材 {{ partsList.fitnessEquipment }}</p>
					<p>宣传栏 {{ partsList.billboard }}</p>
					<p>摄像头 {{ partsList.camera }}</p>
					<p>垃圾桶 {{ partsList.trashCan }}</p>
					<p>消防 {{ partsList.fireControl }}</p>
					<p>井盖 {{ partsList.ManholeCover }}</p>
				</div>
				<!--事件-->
				<div class="card event">
					<div>
						<span class="icon-event icon" style="color: #FF933E;"></span>
						<h3 class="card-title">事件（0）</h3>
						<!--<p style="display: inline-block;float: right;margin: 16px 0">查看全部</p>-->
					</div>
					<div v-for="(item, index) in eventList" :key="index">
						<p>{{ item[2] }} {{ item[0] }}</p>
						<p style="float: right">{{ item[3] }}</p>
					</div>

				</div>
				<!--巡查-->
				<div class="card ">
					<div>
						<span class="icon-patrol icon" style="color: #5C6BC0;"></span>
						<h3 class="card-title">巡查（0）</h3>
					</div>
				</div>
				<!--实有企业-->
				<div class="card">
					<div>
						<span class="icon-institution icon" style="color: #5C6BC0;"></span>
						<h3 class="card-title">实有企业（{{ this.enterpriseList.length }}）</h3>
					</div>
					<div v-for="(item, i) in enterpriseList" :key="i">
						<p>{{ item[0] }}</p>
					</div>
				</div>
			</div>
			<!--下级网格-->
			<div class="cardR">
				<h3 class="card-title">下级网格（{{ subordinateData.size }}）</h3>
				<el-tree :data="subordinateData.treeList" :props="subordinateProps" node-key="id"
					:default-expand-all="true"></el-tree>
			</div>
		</div>

		<!--标注弹窗-->
		<el-dialog :visible.sync="dialogAnnotate" title="绘制网格" width="70%" height="600px" class="map" ref="dialogData"
			:close-on-click-modal="false" @close="closeMap()">
			<gridMap :mapData='mapData' :dialogAnnotate='dialogAnnotate' @coordinates="coordinates"></gridMap>
		</el-dialog>

		<!--详情弹窗-->
		<el-dialog :visible.sync="detailsVisible" title="详情介绍" width="50%" :close="handleClose">
			<p v-if="this.cardData.areaIntroduce === '' || this.cardData.areaIntroduce === null" style="text-align: center">
				暂无数据</p>
			<!--<editor v-else v-model="this.cardData.areaIntroduce" :min-height="192"  @focus="onEditorFocus($event)" />-->
			<div v-html="this.cardData.areaIntroduce"></div>
		</el-dialog>

		<!-- 编辑弹窗 -->
		<el-dialog :visible.sync="dialogEdit" title="编辑网格" width="70%" :close-on-click-modal="false"
			@close="dictEditVisible('editForm')">
			<template>
				<el-form ref="editForm" :model="editForm" label-width="106px" :rules="rules">
					<el-form-item label="网格类型：" prop="areaType" class="input-width">
						<el-select clearable v-model="editForm.areaType" placeholder="请选择" @change="getLeve()">
							<el-option v-for="dict in dict.type.grid_type" :key="dict.value" :label="dict.label"
								:value="dict.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上级网格：" prop="pAreaId" class="input-width" style="vertical-align: top;width: 50%">
						<Treeselect v-model="editForm.pAreaId" :props="treeProps" :options="areaTreeOptions"
							:normalizer="normalizer" :value="value" style="width: 96%" placeholder="请选择">
						</Treeselect>
					</el-form-item>
					<el-form-item label="网格级别：" prop="areaLevel" class="input-width">
						<el-select clearable v-model="editForm.areaLevel" placeholder="请选择">
							<el-option v-for="item in leveOptions" :key="item.value" :label="item.label"
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
					<el-form-item label="面积：" prop="areaMeasure" class="input-width">
						<!--            <el-input clearable v-model="editForm.areaMeasure" placeholder="请输入面积" />-->
						<span class="square" v-if="editForm.areaMeasure !== '' && editForm.areaMeasure !== null">{{
							editForm.areaMeasure }}
							m&sup2;</span>
						<span class="square" v-else>暂无</span>
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
					<el-form-item label="网格颜色：" prop="areaColor" class="input-width" style="vertical-align: top">
						<el-color-picker v-model="editForm.areaColor"></el-color-picker>
					</el-form-item>
					<el-form-item label="地址：" prop="areaAddr" style="width: 100%;display: inline-block">
						<el-input v-model="editForm.areaAddr" placeholder="请输入地址" />
					</el-form-item>
					<el-form-item label="简介：" prop="areaIntroduction">
						<el-input v-model="editForm.areaIntroduction" type="textarea" maxlength="50" show-word-limit
							placeholder="请输入内容" />
					</el-form-item>
					<el-form-item label="详细介绍：" prop="areaIntroduce">
						<editor v-model="editForm.areaIntroduce" :min-height="192" />
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
import AMapLoader from '@amap/amap-jsapi-loader';
import { getNoPIdList, areaTree, listUser, levelList, getArea, updateArea, getPeopleCount, getArchTypeAndPur, countRealBuilding, statisticNum, selectEnterpriseInformation, selectIncidentReport, updateAreaWai, getByAreaId } from "@/api/area/area";
// import {listUser,} from "@/api/system/user";
import gridMap from "@/components/gridMap/index";
export default {
	name: "indexDetailsGrid",
	dicts: ["administrative_region", "grid_type"],
	components: {
		gridMap,
	},
	data() {
		return {
			peopleList: '', //实有人口数量
			partsList: '', //部件数量
			enterpriseList: '', //企业信息
			eventList: '', //事件数量
			register: "", //户籍人口
			registerNum: "", //户籍人口数量（图表）
			optionOne: {
				//户籍人口
				legend: {
					//图例
					orient: "right",
					x: "right",
					y: "center",
					icon: "circle",
					selectedMode: false, // 是否允许点击
				},
				series: [{
					name: "户籍人口",
					type: "pie",
					radius: "80%",
					center: ["30%", "50%"],
					avoidLabelOverlap: false,
					label: {
						//内容文本
						show: true,
						position: "inside",
						formatter: "{d}%",
					},
					emphasis: {
						//选中样式
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: "rgba(0, 0, 0, 0.5)",
						},
					},
					data: [],
				},],
			},

			Buildingnum: 0,
			cardData: [], //卡片数据
			fit: 'contain', // img图片填充方式
			areaMien: '', //风采图片
			detailsVisible: false, //详情介绍弹窗
			subordinateData: {
				size: 0,
				treeList: []
			}, //下级网格数据
			subordinateProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			areaTreeOptions: [], //下拉框数据
			value: '', //选中的数据
			treeProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			memberOptions: [], // 网格长和网格员选项
			dialogAnnotate: false, //地图弹窗
			center: [12529117.002647482, 4561158.359249212], //地图中心点
			dialogEdit: false, //编辑弹窗
			editForm: { //编辑表单参数
				// pAreaId:'',   //上级网格
				areaLevel: '', //行政区类别
				areaType: '', //网格类型
				areaName: '', //网格名称
				areaShortname: '', //网格简称
				areaMeasure: '', //面积
				areaColor: '#1f79f3', //网格颜色
				areaAddr: '', //地址
				arealeaderCard: '', //网格长
				areaerCard: '', //网格员
				areaIntroduce: undefined
			},
			areaInfo: {}, //详情数据
			mapData: {
				gridCenter: '', //给地图传参（中心点）
				gridTagging: '', //给地图传参（覆盖物）
				areaName: '', //给地图传参（网格名称）
				areaColor: '', //给地图传参（网格颜色）
				areaId: '', //给地图传参（网格id）
			},
			leveOptions: [], //网格级别
			// 表单校验
			rules: {
				areaLevel: [{
					required: true,
					trigger: "change",
					message: '请选择行政区类别'
				}],
				areaType: [{
					required: true,
					trigger: "change",
					message: '请选择网格类型'
				}],
				areaName: [{
					required: true,
					trigger: "blur",
					message: '请输入网格名称'
				}],
				areaShortname: [{
					required: true,
					trigger: "blur",
					message: '请输入网格简称'
				}],
			},
			byAreaDetail: {}
		}
	},
	mounted() {
		this.getList()
		this.getTree()
		this.getUserList();
		this.getSubordinate();
		this.show()
		this.getByarea()
	},
	methods: {
		onEditorFocus(event) {
			event.enable(false);
		},
		getByarea() {
			let param = {
				areaId: this.$route.query.ID
			}
			getByAreaId(param).then(res => {
				this.byAreaDetail = res.data
			})
		},
		changeColor(value) {
			this.cardData.areaColor = value
			let param = {
				areaId: this.$route.query.ID,
				areaColor: value
			}
			updateAreaWai(param).then(res => {
				this.getList();
			})
		},
		//获取页面数据
		async getList() {
			//调用高德API
			window._AMapSecurityConfig = {
				securityJsCode: 'e2bc5aa4293feefd736ef345549aaa79',
			}
			let AMap = await AMapLoader.load({
				key: '4e1c48b4317ccc211cacdc9dde63e5ef', //设置您的key
				version: "2.0",
			})
			this.loading = true;
			let areaID = this.$route.query.ID
			console.log('areaID', areaID)
			getArea(areaID).then((res) => {
				if (res.code === 200) {
					this.cardData = res.data
					//计算面积
					if (res.data.isTagging !== null && res.data.isTagging !== '') {
						let gridDefault = res.data.isTagging.split(';')
						let measureArray = []
						gridDefault.forEach((item) => {
							let itemArr = item.split(',')
							measureArray.push(itemArr)
						})
						this.cardData.areaMeasure = Math.round(AMap.GeometryUtil.ringArea(measureArray));
						console.log(this.cardData.areaMeasure)
					}
					if (this.cardData.areaMien !== "" && this.cardData.areaMien !== null) {
						this.areaMien = process.env.VUE_APP_BASE_API + this.cardData.areaMien
					} else {
						this.areaMien = ''
					}
				}
			});

		},

		// 查询下级网格
		getSubordinate() {
			let param = {
				areaId: this.$route.query.ID
			}
			getNoPIdList(param).then(res => {
				var list = res.data.treeList;
				console.log(list)
				for (var i in list) {
					console.log(list[i])
					if (list[i].children) {
						list[i].label = list[i].label + "(" + list[i].children.length + ")"
					}
				}
				this.subordinateData.size = res.data.size
				this.subordinateData.treeList = list
			})
		},

		//查询树
		getTree() {
			//    treeList().then(res => {
			//      this.treeData = res.data
			//    })
		},

		// 查询网格长或网格员
		getUserList() {
			this.loading = true;
			let param = {
				deptId: localStorage.getItem("deptId")
			}
			listUser(param).then((res) => {
				let options = res.data;
				this.memberOptions = options.map(item => {
					return {
						value: `${item.userId}`,
						label: `${item.nickName}`,
						cardId: `${item.cardId}`,
						sex: `${item.sex}`,
						phone: `${item.phonenumber}`,
						birthData: `${item.birthData}`
					};
				})
			});
		},

		//网格详情介绍
		openDetails() {
			this.detailsVisible = true
			console.log(this.cardData.areaIntroduce)
			// const temp = this.cardData.areaIntroduce.replace(/。/g, '。\n').replace(/&nbsp;/g,'');
			// this.cardData.areaIntroduce = temp;

		},
		handleClose() {
			this.detailsVisible = false
		},

		//转换网格-网格管理数据结构
		normalizer(node) {
			if (node.children && !node.children.length) {
				delete node.children;
			}
			return {
				id: node.id,
				label: node.label,
				children: node.children
			};
		},

		// 查询网格-网格管理下拉树结构
		getTreeselect() {
			areaTree({
				userId: localStorage.getItem("userId"),
				flag: 1
			}).then(response => {
				this.areaTreeOptions = [];
				const data = {
					id: 0,
					label: '顶级节点',
					areaId: 0,
					areaName: '顶级节点',
					children: []
				};
				data.children = response.data;
				this.areaTreeOptions = [data];
				console.log([data])
			});
		},

		// 标注弹窗打开
		annotateMap() {
			// console.log(center)
			this.mapData.gridCenter = this.cardData.areaCenter
			this.mapData.gridTagging = this.cardData.isTagging
			this.mapData.areaName = this.cardData.areaName
			this.mapData.areaColor = this.cardData.areaColor
			this.mapData.areaId = this.cardData.areaId
			this.dialogAnnotate = true;
			console.log(this.mapData)
			this.$refs.dialogData.mapData = this.mapData
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
		//人口类型
		show() {
			let userId = localStorage.getItem("userId")
			var param = {
				userId: userId,
				areaId: this.$route.query.ID
			}
			//查询实有人口
			getPeopleCount(param).then(res => {
				this.peopleList = res.data
			})
			countRealBuilding(param).then(res => {
				this.Buildingnum = res.data
			})
			//查询实有建筑
			getArchTypeAndPur(param).then(res => {
				this.register = res.data;
				let registerNum = 0;
				this.register.forEach((item) => {
					if (this.optionOne.series[0].data.length <= 6) {
						this.optionOne.series[0].data.push({
							name: item.name + '(' + item.data.value + ')',
							value: item.data.value,
							itemStyle: item.data.itemStyle,
						});
					}
					registerNum += item.value;
					this.registerNum = registerNum;
				});
				this.init();
			})
			//查询部件数量
			var param1 = {
				areaId: this.$route.query.ID,
				userId: userId,
				isTagging: 1,
			}
			statisticNum(param1).then(res => {
				this.partsList = res.data
			})
			//企业信息
			selectEnterpriseInformation(param).then(res => {
				this.enterpriseList = res.data
			})
			selectIncidentReport(param).then(res => {
				this.eventList = res.data
			})

		},
		init() {
			var myChartOne = this.$echarts.init(this.$refs.chartOne);
			// 使用刚指定的配置项和数据显示图表。
			myChartOne.setOption(this.optionOne);
		},

		//关闭标注弹窗
		closeMap() {
			this.dialogAnnotate = false;
		},

		//编辑获取网格级别
		getLeve() {
			let param = {
				areaType: this.editForm.areaType,
				pAreaId: this.editForm.pAreaId,
			}
			levelList(param).then(res => {
				let options = res.data
				this.leveOptions = options.map(item => {
					return {
						value: `${item.level}`,
						label: `${item.levelName}`
					};
				})
			})
		},

		// 编辑弹窗打开
		async handleEdit(row) {
			//调用高德API
			window._AMapSecurityConfig = {
				securityJsCode: 'e2bc5aa4293feefd736ef345549aaa79',
			}
			let AMap = await AMapLoader.load({
				key: '4e1c48b4317ccc211cacdc9dde63e5ef', //设置您的key
				version: "2.0",
			})
			this.dialogEdit = true;
			this.getTreeselect();
			getArea(this.$route.query.ID).then((res) => {
				if (res.code === 200) {
					const areaerIds = []
					if (res.data?.arealeaderId) {
						for (let i = 0; i < res.data.areaerIds.length; i++) {
							areaerIds.push(res.data.areaerIds[i] + '')
						}
					} else {
						res.data.arealeaderId = ''
					}
					this.editForm = {
						...res.data,
						arealeaderId: res.data.arealeaderId + '',
						areaerIds
					};
					//计算面积
					if (res.data.isTagging !== null && res.data.isTagging !== '') {
						let gridDefault = res.data.isTagging.split(';')
						let measureArray = []
						gridDefault.forEach((item) => {
							let itemArr = item.split(',')
							measureArray.push(itemArr)
						})
						this.editForm.areaMeasure = Math.round(AMap.GeometryUtil.ringArea(measureArray));
					}
				}
			});
		},

		//编辑的提交按钮
		submitForm(editForm) {
			this.$refs[editForm].validate((valid) => {
				if (!valid) return
				updateArea(this.editForm).then((res) => {
					this.$message.success("修改成功");
					this.getList();
					this.dialogEdit = false;
				}).catch(() => {

				});
			});
		},

		//编辑弹窗关闭
		dictEditVisible(editForm) {
			this.$refs[editForm].resetFields();
			this.dialogEdit = false
		},

	}
}
</script>

<style scoped>
.chart {
	width: 100%;
	height: 120px;
}

/*第一个卡片*/

.top {
	padding: 30px;
	border-radius: 10px;
	background: #fff;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 区域字体样式 */

.fontColor {
	margin: 0;
	padding: 0;
	color: #1f79f3;
	font-weight: bold;
	display: inline-block;
}

/*公共样式*/

.box {
	margin-right: 10px;
	width: 25%;
	display: inline-block;
	overflow: hidden;
	vertical-align: top;
}

/*社区图片*/

.image {
	width: 16%;
}

.image .img {
	width: 100%;
	height: 100%;
}

/*社区信息*/

.information p {
	font-size: 14px;
	margin: 6px 0;
	/*overflow: hidden;*/
	/*text-overflow: ellipsis;*/
	/*white-space: nowrap;*/
}

/*网格员头像*/

.grid {
	width: 20%;
}

.gridImg {
	width: 80px;
	height: 80px;
	border-radius: 50%;
}

.grid p,
.grid span {
	font-size: 14px;
	white-space: normal;
	margin-top: 0;
}

.grid div {
	height: 100%;
	display: inline-block;
	overflow: hidden;
}

.master {
	width: 26%;
	margin-right: 2%
}

.master p {
	text-align: center;
}

.member {
	width: 72%;
	vertical-align: top;
}

/*网格成员单独样式*/

.personnel {
	width: 30%;
}

.personnel .master {
	width: 17%;
}

.personnel .member {
	padding-right: 10%
}

/*二维码*/

.code {
	width: 100px;
	height: 100px;
	vertical-align: top;
	display: inline-block;
	overflow: hidden;
}

.code img {
	width: 100%;
	height: 100%;
}

/*卡片*/

.bottom {
	margin-top: 2%;
}

.card {
	border-radius: 10px;
	background: #fff;
	padding: 1% 2%;
	margin-right: 2%;
	width: 32%;
	height: 210px;
	overflow: auto;
	display: inline-block;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar {
	width: 14px;
	height: 14px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
	border-radius: 999px;
	border: 5px solid transparent;
}

::-webkit-scrollbar-track {
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-thumb {
	min-height: 20px;
	background-clip: content-box;
	box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-corner {
	background: transparent;
}

.card:nth-child(3n) {
	margin-right: 0;
}

.card:nth-child(n+4) {
	margin-top: 2%;
}

.card-title {
	font-size: 18px;
	font-weight: bold;
	display: inline-block;
}

.card p {
	font-size: 12px;
}

.icon {
	padding-right: 4px;
	font-size: 28px;
	vertical-align: sub;
}

.borderOption p {
	border: 1px solid #ccc;
	display: inline-block;
	padding: 6px 10px;
	margin-right: 10px;
}

.event p {
	margin: 0;
	padding: 0;
	display: inline-block;
}

/*右侧卡片*/

.cardR {
	width: 24%;
	height: 452px;
	display: inline-block;
	border-radius: 10px;
	background: #fff;
	padding: 1% 2%;
	vertical-align: top;
	overflow-x: hidden;
	overflow-y: auto;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.cardR::-webkit-scrollbar {
	width: 6px;
	height: 2px;
}

.cardR::-webkit-scrollbar-thumb {
	border-radius: 2px;
	background: rgba(0, 0, 0, 0.3);
}

.cardR::-webkit-scrollbar-track {
	border-radius: 0;
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

.font {
	margin: 0;
	padding: 0;
}

/*地图弹窗样式*/

/deep/ .map .el-dialog__body {
	padding: 0;
	height: 600px;
}
</style>