<!-- 网格管理 -->
<template>
	<div class="app-container">
		<!-- 标题 -->
		<div>
			<span class="fontColor" @click="details()" style="font-size: 24px;cursor: pointer;">
				<span class="icon-g-icon"></span> {{ this.areaTitle }}
				<span class="spanColor">(详情)</span>
			</span>
		</div>
		<!-- 位置 -->
		<p class="position"> 当前位置：{{ this.stringPosition }}</p>
		<el-form :model="queryParams">
			<el-form-item label="网格：" prop="areaId" style="display: inline-block;width: 20%">
				<treeSelect v-model="queryParams.areaId" :props="treeProps" :options="treeData" :value="value"
					@getValue="getList($event)" placeholder="请选择">
				</treeSelect>
			</el-form-item>
			<el-form-item style="display: inline-block">
				<p class="title" style="margin-left: 10px">网格数量：{{ this.total }}</p>
			</el-form-item>

			<!-- 添加网格 -->
			<el-form-item style="float: right">
				<el-button type="primary" plain size="mini" @click="uploadQRcode()"> 下载便民码 </el-button>
				<el-button type="primary" plain size="mini" v-hasPermi="['system:indexSeniorGrid:list']"
					@click="handleSearch()"> 高级 </el-button>
				<el-button type="primary" plain size="mini" v-hasPermi="['system:addGrid:add']" @click="handleAdd()"> 添加网格
				</el-button>
			</el-form-item>
		</el-form>
		<canvas id="qrdiv" ref="qrdiv" width="864" height="1155" style="display:none;width:864px;height:1155px;"></canvas>
		<img id="qrbg" ref="qrbg" src="../../../assets/images/qrcode_bg.jpg"
			style="display:none;width:864px;height:1155px;" />
		<!-- 卡片 -->
		<el-row style="cursor: pointer" v-loading="loading">
			<el-card :body-style="{ padding: '6px' }" v-for="item in cardData" :key="item.areaId">
				<!-- 操作按钮 -->
				<el-popover placement="bottom" width="160" trigger="click">
					<div style="text-align: center; margin: 0">
						<!-- 编辑按钮 -->
						<el-button type="primary" plain size="mini" v-hasPermi="['system:editGrid:edit']"
							@click="handleEdit(item)" style="border-radius: 6px">编辑</el-button>
						<!-- 删除按钮 -->
						<el-button type="danger" plain size="mini" v-hasPermi="['system:delGrid:del']"
							@click="handleDelete(item)" style="border-radius: 6px">删除</el-button>
					</div>
					<el-button class="card-btn" v-hasPermi="['system:operationGrid:operation']"
						slot="reference">操作</el-button>
				</el-popover>

				<!-- 卡片内容 -->
				<div @click="getNextList(item)">
					<el-tooltip class="item" effect="dark" placement="top">
						<div slot="content">{{ item.areaName }}</div>
						<h1 class="card-title"><span class="icon-g-icon" style="margin-right: 4px"
								:style="{ color: item.areaColor }"></span>{{ item.areaName }}</h1>
					</el-tooltip>
					<div style="margin: 0 0 30px 30px">
						<p class="card-font">编号：{{ item.areaNo }}</p>
						<p class="card-font">所属上级：{{ item.pareaName }}</p>
						<p class="card-font">网格类型：{{ item.areaType }}</p>
						<p class="card-font" style="margin-top: 0"
							v-if="item.arealeaderName === '' || item.arealeaderName === null || item.arealeaderName === undefined">
							网格长：暂无</p>
						<p class="card-font" style="margin-top: 0" v-else>网格长：{{ item.arealeaderName }}</p>
						<p class="card-font" v-if="item.partyName === null || item.partyName === ''">党组织设立：否</p>
						<p class="card-font" v-else>党组织设立：是</p>
						<!-- 已标注和未标注的状态 -->
						<a class="card-state unmarked icon-map-marker" v-hasPermi="['system:tagGrid:tag']"
							@click.stop="openMap(item.areaCenter, item.isTagging, item.areaName, item.areaColor, item.areaId)"
							v-if="item.isTagging === null || item.isTagging === '' || item.isTagging == 0">未标注</a>
						<a class="card-state marked icon-map-marker" v-hasPermi="['system:tagGrid:tag']"
							@click.stop="openMap(item.areaCenter, item.isTagging, item.areaName, item.areaColor, item.areaId)"
							v-else>已标注</a>
					</div>
				</div>
			</el-card>
		</el-row>

		<div slot="empty">
			<el-row style="cursor: pointer" v-if="this.cardData.length === 0">
				<el-card :body-style="{ padding: '6px' }" v-for="item in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" key="item">
					<el-skeleton :rows="6" animated style="width: 242px;height: 185px;margin-top:10px;" />
				</el-card>
			</el-row>
		</div>

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
							:normalizer="normalizer" :value="value" style="width: 96%" placeholder="请选择" @input="getLeve">
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

		<!--标注弹窗-->
		<el-dialog :visible.sync="dialogAnnotate" title="绘制网格" width="70%" height="600px" class="map" ref="dialogData"
			:close-on-click-modal="false" @close="closeMap()">
			<gridMap :mapData='mapData' :dialogAnnotate='dialogAnnotate' @coordinates="coordinates"></gridMap>
		</el-dialog>

		<!-- 分页 -->
		<pagination v-if="total !== 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
			@pagination="getList()" />
	</div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import { listUser, areaTree, listArea, getArea, delArea, updateArea, levelList, listOfBianMin } from "@/api/area/area";
import { Loading } from 'element-ui';
// import {listUser,} from "@/api/system/user";
import QRCode from 'qrcode';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import gridMap from "@/components/gridMap/index";
export default {
	name: "index",
	dicts: ['administrative_region', 'grid_type'],
	components: {
		gridMap,
	},
	data() {
		return {
			loading: true, // 遮罩层
			areaTitle: "", //区域标题
			areaID: "", //区域ID
			stringPosition: "", //位置信息
			grid: "", //网格
			cardData: [], //卡片数据
			treeProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			value: '', //选中的数据
			treeData: [], //下拉框数据
			// 卡片查询参数
			queryParams: {
				pageNum: 1, //当前页
				pageSize: 10, //每页条数
				areaId: '',
				userId: localStorage.getItem("userId"),
			},
			total: 0, // 总条数
			memberOptions: [], // 网格长和网格员选项
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
				arealeaderId: '', //网格长
				areaerCard: '', //网格员
			},
			areaTreeOptions: [],
			dialogAnnotate: false, //打开地图弹窗
			center: [12529117.002647482, 4561158.359249212], //地图中心点
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
		};
	},
	mounted() {
		this.getTree()
		this.getUserList();
	},
	methods: {
		// 查询树
		getTree(value) {
			let param = {
				userId: localStorage.getItem("userId"),
				flag: 1
			}
			areaTree(param).then(res => {
				this.treeData = res.data
				this.areaTitle = res.data[0].label
				this.areaID = res.data[0].id
				this.stringPosition = res.data[0].label
				this.getList(res.data[0])
			})
		},
		// 查询网格长或网格员
		getUserList() {
			this.loading = true;
			let param = {
				deptId: localStorage.getItem("deptId")
			}
			listUser(param).then((res) => {
				this.loading = false;
				let options = res.data;
				console.log('res.data', res.data)
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

		//网格管理卡片数据
		getList(data) {
			this.loading = true;
			if (data !== undefined && data !== null) {
				this.getParent(this.treeData, data.id)
				this.queryParams.areaId = data.id
				this.areaTitle = data.label
				this.areaID = data.id
			}
			listArea(this.queryParams).then((res) => {
				this.loading = false;
				if (res.code === 200) {
					this.cardData = res.rows
					this.total = res.total
				}
			});
		},

		//反向递归获取位置
		getParent(treeData, value, children = 'children', level = 0) {
			let arrResString = '';
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
						arrResString = item.label + ' > ' + arrResString
						rev(obj, treeData.id, 0);
						break;
					} else if (item[children] && item[children].length > 0) {
						rev(item, value, level + 1);
					}
				}
			}
			rev(obj, value, level);
			this.stringPosition = arrResString.substring(0, arrResString.lastIndexOf(" > "));
			return
		},

		//点击卡片-查询下级网格
		getNextList(data) {
			this.loading = true;
			if (data !== undefined) {
				this.getParent(this.treeData, data.areaId)
				this.queryParams.areaId = data.areaId
				this.areaTitle = data.areaName
				this.areaID = data.areaId
			}
			listArea(this.queryParams).then((res) => {
				this.loading = false;
				if (res.code === 200) {
					this.cardData = res.rows
					this.total = res.total
				}
			});
		},

		// 标注弹窗打开
		openMap(center, isTagging, areaName, areaColor, areaId) {
			this.mapData.gridCenter = center
			this.mapData.gridTagging = isTagging
			this.mapData.areaName = areaName
			this.mapData.areaColor = areaColor
			this.mapData.areaId = areaId
			this.dialogAnnotate = true;
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

		//关闭标注弹窗
		closeMap() {
			this.dialogAnnotate = false;
		},

		//点击详情跳转页面
		details() {
			const src = `/grid/indexDetailsGrid`;
			let areaID = this.areaID
			this.$router.push({
				path: src,
				query: {
					ID: areaID
				}
			});
		},
		// 生成qrcode
		async uploadQRcode() {
			let loadingInstance = Loading.service({
				text: '下载中'
			});
			const retdata = await listOfBianMin(this.queryParams.areaId)
			const bgimg = this.$refs.qrbg
			console.log("bgimg",bgimg)
			const codeList = []
			const myCanvas = this.$refs.qrdiv
			const newcardData = retdata.data
			const zip = new JSZip();
			const Img = zip.folder("便民码");
			for (let i = 0; i < newcardData.length; i++) {
				let newqrcode = await QRCode.toDataURL(process.env.VUE_APP_CONVENIENCE + '#/?id=' + newcardData[i].areaId, {
					width: 410,
					height: 410,
					margin: 0,
				})
				codeList.push({ code: newqrcode, name: newcardData[i].areaName })
			}
			const ctx = myCanvas.getContext('2d');
			const nextSrc = (srcArr, number) => {
				let img = new Image();
				img.onload = () => {
					ctx.fillStyle = "white";
					ctx.fillRect(-50, -50, 1300, 1300);
					ctx.drawImage(bgimg, 0, 0);
					ctx.drawImage(img, 226, 470);
					ctx.fillStyle = "black";
					ctx.font = '14px Arial';
					ctx.fillText(srcArr[number].name, 25, 1135)
					Img.file(srcArr[number].name + '.png', myCanvas.toDataURL("image/png").replace("data:image/png;base64,", ""), { base64: true });
					number++;
					if (srcArr[number]) {
						nextSrc(srcArr, number)
					} else {
						loadingInstance.close();
						zip.generateAsync({ type: "blob" }).then(function (content) {
							// content就是blob数据，这里以example.zip名称下载
							// 使用了FileSaver.js
							FileSaver.saveAs(content, '便民码.zip')
						});
					}
				}
				img.src = srcArr[number].code;
			}
			nextSrc(codeList, 0)
		},
		//高级按钮跳转页面
		handleSearch() {
			const src = `/grid/indexSeniorGrid`;
			this.$router.push({
				path: src,
			});
		},

		//添加网格按钮跳转页面
		handleAdd() {
			const src = `/grid/indexAddGrid`;
			this.$router.push({
				path: src,
			});
		},

		//获取网格级别
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
			getArea(row.areaId).then((res) => {
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

		//删除按钮操作
		handleDelete(row) {
			const areaId = row.areaId;
			this.$confirm('是否删除网格："' + row.areaName + '"？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(function () {
				return delArea(areaId)
			}).then(data => {
				this.getTree();
				this.getList();
				this.$message.success('删除成功')
			}).catch(() => { })
		},
	},
};
</script>
<style scoped>
/* 网格和网格数量的字体样式 */

.title {
	margin: 0 0 0 5px;
	padding: 0;
	font-size: 14px;
	font-weight: bold;
}

/* 区域字体样式 */

.fontColor {
	margin: 0;
	padding: 0;
	color: #1f79f3;
	font-weight: bold;
}

/* 详情字体样式 */

.spanColor {
	color: #000;
	font-size: 12px;
	font-weight: normal;
}

.spanColor:hover {
	color: #1F79F3;
}

/* 灰色位置狂样式 */

.position {
	width: auto;
	display: inline-block !important;
	display: inline;
	height: 24px;
	line-height: 24px;
	font-size: 12px;
	text-align: left;
	color: #fff;
	padding: 0 10px;
	background: #ccc;
	border-radius: 12px;
}

/* 卡片样式 */

.el-card {
	border-radius: 10px;
	width: 19%;
	margin: 0.5% 0.5%;
	display: inline-block;
}

.el-card:hover {
	background: #EBF7FF !important;
}

/* 卡片大标题样式 */

.card-title {
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 卡片内容字体样式 */

.card-font {
	margin: 6px 0;
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 卡片操作按钮样式 */

.card-btn {
	float: right;
	padding: 6px 14px;
	margin: 6px;
	border-radius: 6px;
}

/* 卡片标注状态字体样式 */

.card-state {
	float: right;
	font-weight: bold;
	margin: 6px;
	font-size: 12px;
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
