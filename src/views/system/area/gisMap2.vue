<template>
	<div class="home_div">
		<!--头部内容-->
		<div class="mapTop">
			<!--左侧标题-->
			<div class="map_title">
				<p @click="toIntroduction"><i class="icon-gis"></i>感知平台</p>
			</div>
			<div class="mapTab">
				<!-- <div :class="isActive('people') ? 'is-active item' : 'item'" name="people" @click="selectTab('people')">
          <div>
            <i class="icon-personnel iconTab peopleTab" style="background:#00ed7c"></i>
            <p class="tabName peopleName" style="color: #00ed7c;">人口</p>
          </div>
        </div>
        <div :class="isActive('party') ? 'is-active item' : 'item'" name="party" @click="selectTab('party')">
          <div>
            <i class="icon-party iconTab partyTab" style="background:#F34434"></i>
            <p class="tabName partyName" style="color: #F34434;">党组织</p>
          </div>
        </div>
        <div :class="isActive('build') ? 'is-active item' : 'item'" name="build" @click="selectTab('build')">
          <div>
            <i class="icon-city iconTab cityTab" style="background:#1F79F3"></i>
            <p class="tabName cityName" style="color: #1F79F3;">建筑</p>
          </div>
        </div> -->
				<!-- <div :class="isActive('parts') ? 'is-active item' : 'item'" name="parts" @click="selectTab('parts')">
          <div>
            <i class="icon-parts-camera iconTab partsTab" style="background:#9E25B2"></i>
            <p class="tabName partsName" style="color: #9E25B2;">部件</p>
          </div>
        </div>
        <div :class="isActive('event') ? 'is-active item' : 'item'" name="event" @click="selectTab('event')">
          <div>
            <i class="icon-event-b iconTab eventTab" style="background:#D84416"></i>
            <p class="tabName eventName" style="color: #D84416;">事件</p>
          </div>
        </div>
        <div :class="isActive('enterprise') ? 'is-active item' : 'item'" name="enterprise"
          @click="selectTab('enterprise')">
          <div>
            <i class="icon-institution iconTab enterpriseTab" style="background:#00B9D5"></i>
            <p class="tabName enterpriseName" style="color: #00B9D5;">企业</p>
          </div>
        </div> -->
				<!-- <div :class="isActive('communication') ? 'is-active item' : 'item'" name="communication"
          @click="selectTab('communication')">
          <div>
            <i class="icon-facing iconTab communicationTab" style="background:#2699D6"></i>
            <p class="tabName communicationName" style="color: #2699D6;">通信</p>
          </div>
        </div> -->
			</div>
			<!--右侧内容-->
			<div class="map">
				<!--日期及天气-->
				<p style="font-weight: bold;font-size: 18px;margin-bottom: 0">
					<span style="margin-right: 10px">{{ this.data }}</span>
					<span style="margin-right: 10px">{{ this.time }}</span>
					<span style="margin-right: 10px">{{ this.city }}</span>
					<span style="margin-right: 10px">{{ this.weather }}</span>
					<span>{{ this.temperature }}</span>
				</p>
				<!--引导页和账号-->
				<div style="font-size: 14px;text-align: right;font-weight: bold">
					<!-- <span style="margin-right: 20px;cursor: pointer" @click="toIntroduction">返回引导页</span> -->
					<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
						<div class="avatar-wrapper">
							<p class="alignment" style="color: #000;cursor: pointer">{{ username }}<i
									class="icon-chevron-down"></i></p>
						</div>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<span>消息通知</span>
							</el-dropdown-item>
							<router-link to="/user/profile">
								<el-dropdown-item divided>个人设置</el-dropdown-item>
							</router-link>
							<el-dropdown-item divided @click.native="logout">
								<span>退出</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
		</div>
		<!--下拉框-->
		<div class="selected">
			<treeSelect ref="selectTree" v-model="value" :props="treeProps" :options="treeData"
				@getValue="getAreaList($event)" placeholder="请选择">
			</treeSelect>
		</div>
		<div class="rightCenter">
			<!--部件-->
			<div v-if="isActive('parts')">
				<parts :areaId='value'></parts>
			</div>
		</div>

		<!--显示隐藏网格-->
		<div class="grid">
			<div class="gridBox">
				<div @click="showGrid">
					<i class="icon-grid iconTab partyTab" style="background:#1F79F3"></i>
					<p class="tabName" style=" background: #1F79F3;">显示网格区域</p>
				</div>
				<div @click="hideGrid">
					<i class="icon-grid iconTab partyTab" style="background:#666666"></i>
					<p class="tabName" style="background: #666666;">隐藏网格区域</p>
				</div>
			</div>
		</div>
		<!--地图-->
		<div id="container"></div>
	</div>
</template>
<script>
	import AMapLoader from '@amap/amap-jsapi-loader';
	import {
		listAreaNoPage
	} from "@/api/area/gisMap";
	import {
		areaTree
	} from "@/api/area/area";
	import survey from './gisMap/survey'
	import party from './gisMap/party'
	import build from './gisMap/build'
	import parts from './gisMap/parts'
	import event from './gisMap/event'
	import enterprise from './gisMap/enterprise'
	import communication from './gisMap/communication'

	export default {
		name: "gisMap",
		components: {
			survey,
			party,
			build,
			parts,
			event,
			enterprise,
			communication,
		},
		data() {
			return {
				hasTab: ['parts'],
				username: '',
				map: null,
				tabName: '', //选项名称
				data: '', //日期
				time: '', //时间
				city: '', //城市
				weather: '', //天气
				temperature: '', //温度
				treeData: [], //下拉框数据
				treeProps: {
					label: "label",
					value: "id",
					children: "children",
				},
				value: '', //给子组件传参
				accordion: true,
				polygon: [], //创建默认网格实例
				defaultText: [], //创建默认网格标签
				gridPath: [], //默认展示的网格
				overlayGroup: [], //创建点击网格组实例
				gridGroup: [], //点击选中后展示网格组

			}
		},
		created() {
			var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
			this.timer = setInterval(function() {
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth() + 1;
				let dd = new Date().getDate();
				let hh = new Date().getHours();
				let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
				let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
				_this.data = mm + '月' + dd + '日'
				_this.time = hh + ':' + mf + ':' + ss;
			}, 1000);
			this.getTree()
			this.username = localStorage.getItem("username");
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
			}
		},
		mounted() {
			// this.handleClick();
		},
		methods: {

			isHidden() {
				//卡片内容
				let visible = document.getElementsByClassName("contentRight")
				for (var i = 0; i < visible.length; i++) {
					visible[i].style.display = "none";
				}
				//指向箭头
				let icon = document.getElementsByClassName('arrow')
				for (var j = 0; j < icon.length; j++) {
					icon[j].style.display = "none";
				}
			},
			isActive(val) {
				var hasIndex = -1;
				this.hasTab.forEach((item, index) => {
					if (item == val) {
						hasIndex = index
					}
				})
				if (hasIndex == -1) {
					return false
				} else {
					return true
				}
			},
			selectTab(val) {
				var hasIndex = -1;
				this.hasTab.forEach((item, index) => {
					if (item == val) {
						hasIndex = index
					}
				})
				if (hasIndex == -1) {
					//新打开
					this.isHidden()
					this.map.clearInfoWindow() //清除之前的信息弹窗
					this.hasTab.push(val)
				} else {
					//关闭某个标签
					this.hasTab.splice(hasIndex, 1)
					this.removeBj(val)
				}
				console.log(this.map.getAllOverlays('marker'))
			},
			//初始化地图
			async initAMap(id) {
				window._AMapSecurityConfig = {
					securityJsCode: 'e2bc5aa4293feefd736ef345549aaa79',
				}
				let AMap = await AMapLoader.load({
					key: '4e1c48b4317ccc211cacdc9dde63e5ef', //设置您的key
					version: "2.0",
					plugins: [
						'AMap.ToolBar',
						'AMap.Driving',
						'AMap.CitySearch',
						'AMap.Weather',
						'AMap.MarkerClusterer'
					],
					AMapUI: {
						version: "1.1",
						plugins: [
							'misc/MarkerList',
							'overlay/SimpleMarker',
							'overlay/SimpleInfoWindow'
						],
					},
					Loca: {
						version: "2.0"
					},
				})
				//初始化地图
				this.map = new AMap.Map("container", {
					viewMode: "3D",
					zoom: 15,
       		pitch: 55,
					center: [112.576149, 37.921448],
				});

				//天气
				var that = this
				var citySearch = new AMap.CitySearch()
				await citySearch.getLocalCity(function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						// 查询成功，result即为当前所在城市信息
						that.city = result.city
						//创建天气查询实例
						var weather = new AMap.Weather();
						//执行实时天气信息查询
						weather.getLive(result.city, function(err, data) {
							that.temperature = data.temperature + '°C'
							that.city = data.city
							that.weather = data.weather
						});
					}
				})
				this.getAreaList({
					id
				})
			},
			// 查询树
			async getTree() {
				let param = {
					userId: localStorage.getItem("userId"),
					flag: 0
				}
				const res = await areaTree(param)
				this.value = res.data[0].id
				this.treeData = res.data
				this.initAMap(res.data[0].id);
			},

			//点击后获取下级网格
			getAreaList(data) {

				console.log('-------------------', data)
				this.remove()
				//数据处理
				this.areaId = data.id
				let param = {
					areaId: data.id
				}
				console.log('----------')
				listAreaNoPage(param).then((res) => {
					console.log(res)
					if (res.code === 200) {
						this.gridGroup = []
						let gridData = res.data.sonAreas
						//循环分割后的item，并转为数字
						const dealGroupNumber = (data, array) => {
							data.forEach((item) => {
								let groupNumber = Number(item)
								array.push(groupNumber)
							})
						}
						//循环子级数组，并逗号分割子级的item
						const dealGroupData = (data, AreaData) => {
							data.forEach((item) => {
								let groupArray = []
								let groupItems = item.split(',')
								dealGroupNumber(groupItems, groupArray);
								AreaData.push(groupArray)
							})
						}
						console.log(new Date())
						//循环接口数据，取其子级数组
						gridData.forEach((item) => {
							if (item.isTagging !== null && item.isTagging !== '' && item.isTagging !==
								undefined) {
								const newList = item.isTagging.split('#')
								for (let i = 0; i < newList.length; i++) {
									if ((!item.areaCenter) || (!newList.length)) {
										continue;
									}
									const groups = {
										color: '',
										name: '',
										tagging: ''
									}
									let group = newList[i].split(';')
									let AreaData = []
									dealGroupData(group, AreaData);
									groups.name = item.areaName
									groups.color = item.areaColor
									groups.areaCenter = item.areaCenter
									groups.grid = AreaData
                groups.allData = item
									this.gridGroup.push(groups)
								}
							}
						})

						//移除默认显示网格
						this.map.remove(this.polygon);
						var gridGroupData = []
						console.log(new Date())
						this.gridGroup.forEach((item) => {
							// 覆盖物
							var polygon = new AMap.Polygon({
								path: item.grid,
								strokeColor: item.color, //线颜色
								strokeWeight: 3, //线宽
								fillColor: item.color, //填充色
								fillOpacity: 0.6 //填充透明度
							});
							let areaCenter = item.areaCenter.split(',')
							var text = new AMap.Text({
								text: item.name,
								position: new AMap.LngLat(areaCenter[0], areaCenter[1]),
								anchor: 'center', //设置锚点
								style: {
									'text-align': 'center',
									'font-size': '16px',
									'background': item.color,
									'color': '#fff',
									'padding': '6px'
								},
							});
            polygon.columnData = item.allData
            polygon.on('click', this.clickPolygon)
            text.columnData = item.allData
            text.on('click', this.clickPolygon)
							gridGroupData.push(polygon, text)
						})
						// 创建覆盖物群组，传入覆盖物组成的数组
						this.overlayGroup = new AMap.OverlayGroup(gridGroupData);
						// 统一添加到地图实例上
						this.map.add(this.overlayGroup);
						this.map.setFitView();
					}
				});
			},

    // 点击网格区块
    clickPolygon(e) {
      let obj = e.target.columnData
      this.value = obj.areaId
      this.getAreaList({ id: obj.areaId, areaLevel: obj.areaLevel })
    },
			//移除覆盖物
			remove() {
				this.map.remove(this.overlayGroup);
			},

			//显示网格
			showGrid() {
				// this.polygon.show();
				if (this.overlayGroup.length !== 0) {
					this.overlayGroup.show();
				}
			},

			//隐藏网格
			hideGrid() {
				// this.polygon.hide();
				if (this.overlayGroup.length !== 0) {
					this.overlayGroup.hide();
				}
			},

			//获取覆盖物中心点
			calculateCenter(lnglatarr) {
				var total = lnglatarr.length;
				var X = 0,
					Y = 0,
					Z = 0;
				lnglatarr.map((item) => {
					var lng = (item[0] * Math.PI) / 180;
					var lat = (item[1] * Math.PI) / 180;
					var x, y, z;
					x = Math.cos(lat) * Math.cos(lng);
					y = Math.cos(lat) * Math.sin(lng);
					z = Math.sin(lat);
					X += x;
					Y += y;
					Z += z;
				});
				X = X / total;
				Y = Y / total;
				Z = Z / total;
				var Lng = Math.atan2(Y, X);
				var Hyp = Math.sqrt(X * X + Y * Y);
				var Lat = Math.atan2(Z, Hyp);
				return new AMap.LngLat((Lng * 180) / Math.PI, (Lat * 180) / Math.PI);
			},

			//选项卡切换
			removeBj(type) {
				if (type != 'people') {
					var allMarker = this.map.getAllOverlays('marker') //获取页面所有的点标记
					var removeList = [];
					allMarker.forEach(item => {
						if (item.typeBj == type) {
							removeList.push(item)
						}
					})
					if (removeList.length > 0) {
						this.map.clearInfoWindow() //清除之前的信息弹窗
						this.map.remove(removeList) //清除之前的点标记
					}
				}
			},

			//返回引导页
			toIntroduction() {
				this.$router.push({
					path: '/introduction'
				})
			},

			// 退出系统
			async logout() {
				this.$confirm('确定注销并退出系统吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('LogOut').then(() => {
						location.href = '/index';
					})
				}).catch(() => {});
			}
		}
	}
</script>
<style scoped>
	/*功能模块div*/
	.home_div {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		position: relative;
	}

	/*地图*/
	#container {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
	}

	/*头部div*/
	.mapTop {
		position: absolute;
		z-index: 1;
		width: 100%;
	}

	/*左侧标题*/
	.map_title {
		position: absolute;
		z-index: 1;
		width: 307px;
		height: 44px;
		background-color: #73AAF6;
		border-radius: 10px;
		top: 32px;
		left: 20px;
	}

	.map_title p {
		color: #fff;
		font-size: 20px;
		margin: 0;
		text-align: center;
		line-height: 44px;
	}

	/*标题icon*/
	.icon-gis {
		font-size: 28px;
		vertical-align: sub;
		margin-right: 10px;
	}

	/*中间选项*/
	.mapTab {
		position: relative;
		width: 50%;
		top: 32px;
		margin: 0 auto;
		display: flex;
	}

	.mapTab .item {
		cursor: pointer;
	}

	/*icon*/
	.iconTab {
		font-size: 26px;
		color: #fff;
		border-radius: 50%;
		padding: 6px;
		position: relative;
		top: 7px;
		left: 32px;
		z-index: 1;
	}

	/*选项名称*/
	.mapTab .tabName {
		font-size: 14px;
		margin: 0;
		display: inline-block;
		padding: 0 20px 0 42px;
		font-weight: bold;
		text-align: center;
		background: rgb(255, 255, 255);
		border-radius: 19px;
		line-height: 28px;
		box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.3);
	}

	/*党组织点击样式*/
	.is-active .partyTab {
		box-shadow: 0 0 4px 2px rgb(223, 28, 10);
	}

	.is-active .partyName {
		background: #F34434;
		color: #fff !important;
	}

	.is-active .peopleTab {
		box-shadow: 0 0 4px 2px rgb(43, 223, 10);
	}

	.is-active .peopleName {
		background: #00ed7c;
		color: #fff !important;
	}

	/*建筑点击样式*/
	.is-active .cityTab {
		box-shadow: 0 0 4px 2px rgb(10, 96, 213);
	}

	.is-active .cityName {
		background: #1F79F3;
		color: #fff !important;
	}

	/*部件点击样式*/
	.is-active .partsTab {
		box-shadow: 0 0 4px 2px rgb(133, 39, 149);
	}

	.is-active .partsName {
		background: #9E25B2;
		color: #fff !important;
	}

	/*事件点击样式*/
	.is-active .eventTab {
		box-shadow: 0 0 4px 2px rgb(193, 46, 0);
	}

	.is-active .eventName {
		background: #D84416;
		color: #fff !important;
	}

	/*企业点击样式*/
	.is-active .enterpriseTab {
		box-shadow: 0 0 4px 2px rgb(0, 152, 175);
	}

	.is-active .communicationTab {
		box-shadow: 0 0 4px 2px rgb(0, 152, 175);
	}

	.is-active .enterpriseName {
		background: #00B9D5;
		color: #fff !important;
	}

	.is-active .communicationName {
		background: #2699D6;
		color: #fff !important;
	}



	/*隐藏tab默认样式*/
	/deep/ .el-tabs__active-bar,
	/deep/ .el-tabs__nav-wrap:after {
		display: none;
	}

	/deep/ .el-tabs__item {
		padding: 0 !important;
		margin: 4px 0;
		text-align: center;
	}

	/*右侧天气*/
	.map {
		position: absolute;
		top: 0;
		right: 20px;
	}

	/*下拉框*/
	.selected {
		position: absolute;
		top: 126px;
		left: 38px;
		z-index: 1;
	}

	/*显示隐藏网格*/
	.grid {
		position: absolute;
		width: 100%;
		bottom: 50px;
		z-index: 1;
	}

	.gridBox {
		width: 400px;
		margin: 0 auto;
	}

	.gridBox div {
		display: inline-block;
		cursor: pointer;
	}

	.gridBox .tabName {
		font-size: 14px;
		margin: 0;
		display: inline-block;
		padding: 0 20px 0 42px;
		font-weight: bold;
		text-align: center;
		color: #fff;
		opacity: 0.7;
		border-radius: 19px;
		line-height: 28px;
	}

	.rightCenter {
		position: absolute;
		top: 144px;
		right: 10px;
		z-index: 1;
		flex-wrap: wrap;
		display: flex;
		flex-direction: column;

	}

	.rightCenter>div {
		position: relative;
	}

	.smokeboxbig {
		position: fixed;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 26vw;
		height: 13vw;
		background-image: url(../../../assets/gisMap/smoke/bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 0 12px;
		padding-bottom: 10px;
		box-sizing: border-box;
	}

	.smok-rightbox {
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		flex: 1;
	}

	.w-smokeimg {
		width: 194px;
		height: 170px;
		margin-right: 10px;
	}

	.smokeTitle {
		padding: 6px 8px;
		box-sizing: border-box;
		font-size: 22px;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.smokebox {
		padding-top: 18px;
	}

	.smokecloseImg {
		width: 20px;
		height: 20px;
	}

	.peo-rightli:last-child {
		margin-bottom: 0;
	}


</style>
