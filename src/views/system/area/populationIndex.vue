<!--实有人员-->
<template>
	<div class="app-container">
		<!--左侧区域-->
		<div class="box left-box">
			<!-- 标题 -->
			<h1 class="fontColor">
				<span class="icon-g-icon"></span>{{ this.areaTitle }}
			</h1>
			<!-- 位置 -->
			<p class="position">当前位置：{{ this.stringPosition }}</p>
			<!--网格-->
			<el-form v-model="queryParams">
				<el-form-item label="网格：" prop="areaId" label-width="54px">
					<treeSelect v-model="value" :props="treeProps" :options="treeData" @getValue="getList($event)"
						placeholder="请选择">
					</treeSelect>
				</el-form-item>
			</el-form>
			<P class="font">实有人口（{{ this.optionOnedata[0] }}）</P><!-- {{ this.registeredNum }} -->
			<div ref="chartOne" id="chartOne" class="chart" style="display: none;"></div>
      <div class="" style="height: 13rem;margin-top: 15px;">
        <!-- <div style="width: 49%;display: inline-block;">
          <p class="number">78521</p>
          <p class="name">实有人口</p>
        </div> -->
        <div style="width: 49%;display: inline-block;border-bottom: 1px solid #dadada;border-right: 1px solid #dadada;">
          <p class="number newcolor1">{{ this.optionOnedata[1] }}</p>
          <p class="name newcolor1">户籍人口</p>
        </div>
        <div style="width: 49%;display: inline-block;border-bottom: 1px solid #dadada;">
          <p class="number newcolor2">{{ this.optionOnedata[2] }}</p>
          <p class="name newcolor2">未落户人口</p>
        </div>
        <div style="width: 49%;display: inline-block;border-right: 1px solid #dadada;">
          <p class="number newcolor3">{{ this.optionOnedata[3] }}</p>
          <p class="name newcolor3">常住人口</p>
        </div>
        <div style="width: 49%;display: inline-block;">
          <p class="number newcolor4">{{ this.optionOnedata[4] }}</p>
          <p class="name newcolor4">流动人口</p>
        </div>
      </div>
			<!-- <P class="font">未落户人口（{{ this.unregisteredNum }}）</P> -->
      <p class="font">人口年龄</p>
			<div ref="chartTwo" id="chartTwo" class="chart" style="height: 13rem;"></div>
			<!-- <P class="font">境外人口（{{ this.foreignNum }}）</P> -->
      <p class="font">人口类型</p>
			<div ref="chartThree" id="chartThree" class="chart" style="height: 13rem;"></div>
		</div>
		<!--中间区域-->
		<div class="box center-box">
			<el-button :class="index === active ? 'isActive' : ''" v-for="(item, index) in this.childrenList" :key="index"
				@click="getRegionList(item, index)">
				{{ item.areaName }}
			</el-button>
		</div>
		<!--右侧区域-->
		<div class="box right-box" style="padding-top: 0">
			<!--查询组-->
			<el-form ref="editForm" :model="editForm" label-width="60px"
				style="margin: 20px 0; border-bottom: 1px solid #ccc" :rules="rules">
				<!--按钮组-->
				<el-form-item label-width="0">
					<el-tabs v-model="activeName" type="card" @tab-click="getBuilding">
						<el-tab-pane label="全部" name="first"></el-tab-pane>
						<el-tab-pane label="楼房" name="second"></el-tab-pane>
						<el-tab-pane label="院落" name="four"></el-tab-pane>
					</el-tabs>
				</el-form-item>
				<el-form-item label="小区：" class="input-width">
					<el-select clearable filterable v-model="editForm.estate" placeholder="请选择" @change="getBuilding">
						<el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="楼房：" class="input-width">
					<el-select clearable filterable v-model="editForm.building" placeholder="请选择">
						<el-option v-for="item in buildingOptions" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="关键字：" prop="key" class="input-width" label-width="68px">
					<el-input clearable v-model="editForm.key" placeholder="姓名/身份证/联系方式" />
				</el-form-item>
				<el-button plain @click="handleSearch()">查询</el-button>
				<el-button plain style="float: right" @click="handleSenior()">高级</el-button>
			</el-form>
			<!--人员信息-->
			<div>
				<span class="spanTitle">实有人口：{{ this.actualNum }}</span>
				<span class="spanTitle">户籍人口：{{ this.registeredNum }}</span>
				<span class="spanTitle">未落户人口：{{ this.unregisteredNum }}</span>
				<span class="spanTitle">境外人口：{{ this.foreignNum }}</span>
        <span class="spanTitle">系统未分配人口：{{ this.actualNum-this.unregisteredNum-this.registeredNum-this.foreignNum }}</span>
			</div>
			<!-- 卡片 -->
			<el-row style="margin-top: 20px; cursor: pointer">
				<el-card :body-style="{ padding: '10px', height: '184px' }" v-for="item in cardData" :key="item.areaId"
					@click.native="handleDetails(item)">
					<!-- 标签 -->
					<div class="labelBox">
						<p v-if="item.concernStatus === '是'" style="background: #f27463" class="label">
							重点
						</p>
						<p v-if="item.num > 1" style="background: #5c6bc0" class="label">
							多房
						</p>
					</div>
					<!-- 删除按钮 -->
					<el-button type="text" icon="el-icon-delete" class="card-btn"
						@click.stop="handleDelete(item)"></el-button>
					<!-- 卡片内容 -->
					<div>
						<div style=" width: 100px; height: 130px; float: left; margin-right: 10px; ">
							<el-image :src="require('@/assets/images/man.jpg')" :fit="fit" class="img"
								v-if="!item.headPortrait && item.sex == '男'"></el-image>
							<el-image :src="require('@/assets/images/woman.jpg')" :fit="fit" class="img"
								v-else-if="!item.headPortrait && item.sex == '女'"></el-image>
							<el-image :src="item.headPortrait" :fit="fit" class="img" v-else></el-image>
						</div>
						<div style="margin: 0 0 30px 30px">
							<p class="card-title">
								{{ item.name }}
								<span class="icon-man sexIcon" v-if="item.sex === '男'" style="color: #1f79f3"></span>
								<span class="icon-women sexIcon" style="color: #f27463" v-if="item.sex === '女'"></span>
							</p>
							<p class="card-font">{{ item.idCard }}</p>
							<p class="card-font" v-if="item.mobile == null">电话：暂无</p>
							<p class="card-font" v-if="item.mobile != null">电话：{{ item.mobile }}</p>
							<p class="card-font">
								建筑：{{ item.communityName }}{{ item.buildingName }}
							</p>
							<p class="card-font">所属网格：{{ item.areaName }}</p>
						</div>
					</div>
				</el-card>
			</el-row>
			<!-- 分页 -->
			<pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
				:page-sizes="[9, 12, 15, 18]" @pagination="getPeople()" />
		</div>
	</div>
</template>
<script>
import { loopShowTooltip  } from "./../../../../public/static/echarts-auto-tooltip.js"
import { areaTree } from "@/api/area/area";
import {
	treeHalfList,
	childrenList,
	getPeopleList,
	delPeople,
	estateList,
	buildingList,
	pieList,
  pieageList,
	peopleTypeList,
} from "@/api/area/population";
export default {
	name: "population",
	dicts: ["building"],
	data() {
		return {
			// 指定图表的配置项和数据
			register: "", //户籍人口
			registerNum: "", //户籍人口数量（图表）
			notSettled: "", //未落户人口
			notSettledNum: "", //未落户人口数量（图表）
			overseas: "", //境外人口
			overseasNum: "", //境外人口数量（图表）
      optionOnedata: [],
			optionOne: {
				//户籍人口
				legend: {
					orient : 'right',
					x : 'right',
					y: 'center',
					itemWidth:10,  //图例标记的图形宽度
					itemHeight:10, //图例标记的图形高度
					itemGap:6,  //图例每项之间的间隔
					selectedMode: false, // 是否允许点击
					textStyle:{    //图例文字的样式
					  color:'#666',
					}
				},
				series: [{
					name: "户籍人口",
					type: "pie",
					radius: "70%",
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
			optionTwo: {
        tooltip:{
          show: true
        },
				//人口年龄
				legend: {
					orient: "right",
					x: "right",
					// y: "center",
					icon: "circle",
					selectedMode: false, // 是否允许点击
				},
				series: [{
					name: "人口年龄",
					type: "pie",
					radius: "60%",
					center: ["25%", "50%"],
					avoidLabelOverlap: false,
					label: {
						show: true,
						position: "inside",
						formatter: "{d}%",
					},
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: "rgba(0, 0, 0, 0.5)",
						},
					},
					data: [],
				},],
			},
			optionThree: {
        tooltip:{
          show: true
        },
        grid: {
          top: 20,
          left: 50,
          bottom: 50
        },
        xAxis: {
          type: 'category',
          axisLabel: {
             interval:0,
             rotate:40,
             textStyle: {
                 fontSize:'10'
             }
          },
          data: []
        },
        yAxis: [
          {
            type: 'value',
            name: '',
            interval: 50,
            axisLabel: {
              textStyle: {
                  fontSize:'8'
              },
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            data: [],
            barWidth: 13, // 柱子宽度
            itemStyle:{
              normal:{
                  color:'#1f79f3'
              }
            },
            type: 'bar'
          },
        ]
      },
			fit: "contain", // img图片填充方式
			param: {
				areaId: "",
				houseType: null,
				communityId: null,
			},
			areaTitle: "", //区域标题
			stringPosition: "", //位置信息
			cardData: [], //卡片数据
			treeData: [], //下拉框数据
			treeProps: {
				label: "label",
				value: "id",
				children: "children",
			},
			value: "", //选中的数据
			childrenList: [], //选中网格后所对应的下级
			// 卡片查询参数
			queryParams: {
				// 查询参数
				pageNum: 1,
				pageSize: 12,
				areaId: "",
				houseType: null,
				communityId: null,
				id: null,
			},
			total: 0, // 总页数
			editForm: {
				button: "全部",
			},
			actualNum: "", //实有人口数量（卡片上方）
			registeredNum: "", //户籍人口数量（卡片上方）
			unregisteredNum: "", //未落户人口数量（卡片上方）
			foreignNum: "", //境外人口数量（卡片上方）
			regionOptions: [], //小区下拉框
			buildingOptions: [], //楼房下拉框
			activeName: "first",
			active: 0,
			rules: {},
		};
	},
	async mounted() {
		await this.getTree();
		await this.getList();
	},
	methods: {
		//渲染饼图
		init() {
			// 已在main.js中全局引入echarts
			//引入多个echarts
			var myChartOne = this.$echarts.init(this.$refs.chartOne);
			var myChartTwo = this.$echarts.init(this.$refs.chartTwo);
			var myChartThree = this.$echarts.init(this.$refs.chartThree);
			// 使用刚指定的配置项和数据显示图表。
			myChartOne.setOption(this.optionOne);
			myChartTwo.setOption(this.optionTwo);
			myChartThree.setOption(this.optionThree);
      this.tootipTimer = tools.loopShowTooltip(myChartTwo, this.optionTwo, {
        interval: 3000, // 轮播间隔时间
        loopSeries: true // 是否开启轮播循环
      });
      this.tootipTimer = tools.loopShowTooltip(myChartThree, this.optionThree, {
        interval: 3000, // 轮播间隔时间
        loopSeries: true // 是否开启轮播循环
      });
		},

		// 查询树
		async getTree() {
			let param = {
				userId: localStorage.getItem("userId"),
				flag: 1,
			};
			await areaTree(param).then((res) => {
				this.treeData = res.data;
				this.value = res.data[0] && res.data[0].id;
				this.areaTitle = res.data[0].label;
				this.stringPosition = res.data[0].label;
			});
		},

		//获取标题和位置并传参
		async getList(data) {
			this.loading = true;
			if (data !== undefined && data !== null) {
				await this.getParent(this.treeData, data.id);
				this.areaTitle = data.label;
				let param = {
					areaId: data.id,
				};
				await this.handleChildren(param);
        this.getPieList(param);
			} else {
				let param = {
					areaId: this.value || 1,
				};
				await this.handleChildren(param);
        this.getPieList(param);
			}
		},

		//反向递归获取位置
		getParent(treeData, value, children = "children", level = 0) {
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

		//获取饼图数据
		getPieList(value) {
      this.optionOnedata = []
      this.optionTwo.series[0].data = []
      this.optionThree.xAxis.data = []
      this.optionThree.series[0].data = []
			pieList(value).then((res) => {
				//户籍人口
        res.data.forEach((item,index) => {
          this.optionOnedata.push(item.value)
        })
        console.log(this.optionOnedata)
        this.optionOne.series[0].data = res.data
        this.init();
				// this.register.forEach((item) => {
				// 	if (this.optionOne.series[0].data.length <= 2) {
				// 		this.optionOne.series[0].data.push({
				// 			name: item.name,
				// 			value: item.value,
				// 			itemStyle: item.itemStyle,
				// 		});
				// 	} else {
				// 		this.optionOne.series[0].data.splice(0, 3, {
				// 			name: item.name,
				// 			value: item.value,
				// 			itemStyle: item.itemStyle,
				// 		});
				// 	}
				// 	registerNum += item.value;
				// 	this.registerNum = registerNum;
				// });
				// //未落户人口
				// this.notSettled = res.data.notSettled;
				// let notSettledNum = 0;
				// this.notSettled.forEach((item) => {
				// 	if (this.optionTwo.series[0].data.length <= 1) {
				// 		this.optionTwo.series[0].data.push({
				// 			name: item.name,
				// 			value: item.value,
				// 			itemStyle: item.itemStyle,
				// 		});
				// 	} else {
				// 		this.optionTwo.series[0].data.splice(0, 2, {
				// 			name: item.name,
				// 			value: item.value,
				// 			itemStyle: item.itemStyle,
				// 		});
				// 	}
				// 	notSettledNum += item.value;
				// 	this.notSettledNum = notSettledNum;
				// });
				// //境外人口
				// this.overseas = res.data.overseas;
				// let overseasNum = 0;
				// this.overseas.forEach((item) => {
				// 	if (this.optionThree.series[0].data.length <= 1) {
				// 		this.optionThree.series[0].data.push({
				// 			name: item.name,
				// 			value: item.value,
				// 			itemStyle: item.itemStyle,
				// 		});
				// 	} else {
				// 		this.optionThree.series[0].data.splice(0, 2, {
				// 			name: item.name,
				// 			value: item.value,
				// 			itemStyle: item.itemStyle,
				// 		});
				// 	}
				// 	overseasNum += item.value;
				// 	this.overseasNum = overseasNum;
				// });
			});
      // 获取人口年龄信息
      pieageList(value).then((res) => {
        this.optionTwo.series[0].data = res.data
        this.init();
      })
      // 3
      this.getPeoplenew();
		},
    //获取实有人口饼图
    getPeoplenew(){
      var data = [
        {name: '党员中心户', value: 24},
        {name: '退役军人', value: 45},
        {name: '空巢老人', value: 220},
        {name: '独居老人', value: 16},
        {name: '租户', value: 157},
        {name: '残疾人', value: 5},
        {name: '60+岁老人', value: 531},
        {name: '80+岁老人', value: 124},
      ]
      data.forEach((item) =>{
          this.optionThree.xAxis.data.push(item.name)
          this.optionThree.series[0].data.push(item.value)
      })
      this.init();
    },

		//获取人口类型数据
		getPeopleType(value) {
			peopleTypeList(value).then((res) => {
				this.actualNum = res.data.actualNum; //实有人口
				this.registeredNum = res.data.registeredNum; //户籍人口
				this.unregisteredNum = res.data.unregisteredNum; //未落户人口
				this.foreignNum = res.data.foreignNum; //境外人口
			});
		},

		//获取所选区域下级
		handleChildren(value) {
			childrenList(value).then((res) => {
        console.log(res)
				this.childrenList = res.data;
				this.param.areaId = this.childrenList[0].areaId;
				this.active = 0;
				this.getPeople();
				let param = {
					areaId: this.childrenList[0].areaId,
					userId: localStorage.getItem("userId"),
				};
				this.getPeopleType(param);

			});
		},

		//获取当前下级的信息
		async getRegionList(data, index) {
			if (data !== undefined && data !== null) {
				this.active = index;
				this.param.areaId = data.areaId;
				let param = {
					areaId: data.areaId,
					userId: localStorage.getItem("userId"),
				};
				await this.getEstate(param);
				await this.getBuilding(this.param);
				await this.getPeopleType(param);
				// await this.getPieList(param)
			} else {
				let param = {
					areaId: this.value,
					userId: localStorage.getItem("userId"),
				};
				await this.getEstate(param);
				await this.getBuilding(this.param);
				await this.getPeopleType(param);
			}
		},

		// 查询小区
		getEstate(value) {
			console.log(value)
			estateList(value).then((res) => {
				let options = res.rows;
				this.regionOptions = options.map((item) => {
					return {
						value: `${item.id}`,
						label: `${item.communityName}`
					};
				});
			});
		},

		// 查询楼房
		getBuilding(value) {
			if (value.label !== undefined) {
				this.param.houseType = value.label;
				if (this.param.houseType === "全部") {
					this.param.houseType = null;
				}
			}
			this.param.communityId = this.editForm.estate;
			buildingList(this.param).then((res) => {
				let options = res.data;
				this.buildingOptions = options.map((item) => {
					return {
						value: `${item.id}`,
						label: `${item.community_name}${item.buiding_number}`,
					};
				});
			});
			this.getPeople();
		},

		//获取人员卡片
		getPeople() {
			this.queryParams.areaId = this.param.areaId;
			this.queryParams.houseType = this.param.houseType;
			this.queryParams.communityId = this.editForm.estate;
			this.queryParams.id = this.editForm.building;
			this.queryParams.key = this.editForm.key;
			getPeopleList(this.queryParams).then((res) => {
				if (res.code === 200) {
					this.cardData = res.rows;
					for (let i = 0; i < this.cardData.length; i++) {
						if (
							this.cardData[i].headPortrait !== "" &&
							this.cardData[i].headPortrait !== null
						) {

							console.log(process.env.VUE_APP_BASE_API, this.cardData[i].headPortrait)

							this.cardData[i].headPortrait =
								process.env.VUE_APP_BASE_API + this.cardData[i].headPortrait;
							console.log(this.cardData[i].headPortrait)
							console.log(i)
							console.log('11111')
						} else {
							this.cardData[i].headPortrait = "";
						}
					}
					this.total = res.total;
				}
			});
		},

		//查询
		handleSearch() {
			this.getPeople();
		},

		//高级按钮跳转页面
		handleSenior() {
			const src = `/population/populationSenior`;
			this.$router.push({
				path: src,
			});
		},

		//点击卡片跳转页面
		handleDetails(row) {
			const src = `/population/populationDetails`;
			this.$router.push({
				path: src,
				query: {
					id: row.peopleId
				},
			});
		},

		//删除按钮操作
		handleDelete(row) {
			const id = row.peopleId;
			this.$confirm('是否删除人员："' + row.name + '"？', "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(function () {
					return delPeople(id);
				})
				.then((data) => {
					this.$message.success("删除成功");
					this.getList();
				})
				.catch(() => { });
		},
	},
};
</script>
<style lang="scss" scoped>
/* p标签公共样式 */
.number{
  font-size: 1.5rem;
  text-align: center;
  margin: 1.5rem 0 0 0;
  height: 1.5rem;
  font-weight: bold;
}
.name{
  font-size: 0.6rem;
  text-align: center;
}
.newcolor1{
  color: #2a659f;
}
.newcolor2{
  color: #c5a005;
}
.newcolor3{
  color: #43b940;
}
.newcolor4{
  color: #c58534;
}
.font {
	margin: 0;
	padding: 0;
}

/*三个区域公共样式*/

.box {
	display: inline-block;
	padding: 20px;
	height: 100%;
	overflow: hidden;
	vertical-align: top;
}

/*左侧*/

.left-box {
	width: 20%;
	box-shadow: 12px 0 12px -12px rgba(0, 0, 0, 0.1);
}

/* 左侧区域字体样式 */

.fontColor {
	margin: 0;
	padding: 0;
	color: #3bc2b4;
	font-weight: bold;
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

.chart {
	width: 100%;
	height: 170px;
}

/*选择框标题*/

.title {
	display: inline-block;
	margin: 0;
	padding: 0;
}

/*中间*/

.center-box {
	width: 15%;
	text-align: center;
}

.center-box .el-button {
	width: 9.75rem;
	box-sizing: border-box;
	padding: 0.625rem 0;
	margin-left: 1.25rem;
	margin-bottom: 0.9375rem;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	// overflow: hidden;
	// text-overflow: ellipsis;
	white-space: normal;
}

/*右侧*/

.right-box {
	width: 65%;
	box-shadow: -12px 0 12px -12px rgba(0, 0, 0, 0.1);
}

/*输入框样式 */

.input-width {
	width: 25%;
	display: inline-block;
	margin-right: 10px;
}

/*右侧选择框标题*/

.el-form-item__label {
	padding: 0;
}

/*各种人员人数*/

.spanTitle {
	font-size: 12px;
	font-weight: bold;
	margin-right: 20px;
}

/* 卡片样式 */

.el-card {
	border-radius: 10px;
	width: 32%;
	margin: 0.5% 0.5%;
	display: inline-block;
}

.el-card:hover {
	background: #ebf7ff !important;
}

/* 卡片大标题样式 */

.card-title {
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 卡片操作按钮样式 */

.card-btn {
	float: right;
	padding: 0;
	border-radius: 6px;
}

// 人员头像
.img {
	width: 100%;
	height: 100%;
}

/* 卡片内容字体样式 */

.card-font {
	margin: 6px 0;
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

//性别图标
.sexIcon {
	font-weight: bold;
	font-size: 18px;
	margin-left: 4px;
}

//标签样式
.labelBox {
	float: left;
	width: 100%;
	height: 1.25rem;
}

.label {
	width: 40px;
	height: 20px;
	text-align: center;
	line-height: 20px;
	font-size: 12px;
	color: #fff;
	margin: 0 6px 0 0;
	display: inline-block;
}

.isActive {
	background-color: #1f79f3;
	color: #fff;
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

::v-deep .el-tabs--card>.el-tabs__header,
::v-deep .el-tabs--card>.el-tabs__header .el-tabs__nav {
	border: none;
	margin: 0;
}
</style>
