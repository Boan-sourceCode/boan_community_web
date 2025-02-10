<template>
	<div class="app-container">
		<div class="partyOrganization">
			<el-form>
				<el-form-item label="党组织：">
					<treeSelect v-model="treeValue" :props="treeProps" :options="treeData" :value="treeValue" placeholder="请选择">
				</treeSelect>
				</el-form-item>
			</el-form>
			<div class="partyBoxs boxs">
				<div :class="bgc[0]" class="partyBox">
					<div class="details">
						<p class="p1">党组织</p>
						<p class="p2">{{party.party}}</p>
					</div>
				</div>
				<div :class="bgc[1]" class="partyBox">
					<div class="details">
						<p class="p1">优秀党组织</p>
						<p class="p2">{{party.honorParty}}</p>
					</div>
				</div>
				<div :class="bgc[2]" class="partyBox">
					<div class="details">
						<p class="p1">党员</p>
						<p class="p2">{{party.partyMember}}</p>
					</div>
				</div>
				<div :class="bgc[3]" class="partyBox">
					<div class="details">
						<p class="p1">优秀党员</p>
						<p class="p2">{{party.honorMember}}</p>
					</div>
				</div>
				<div :class="bgc[4]" class="partyBox">
					<div class="details">
						<p class="p1">三会一课</p>
						<p class="p2">{{party.meetingCount}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="threeClass">
			<div class="left" style="width: 796px;">
				<div class="title">
					<!-- <img src="@/assets/images/country.png" alt="" /> -->
          <div class="bluebox"></div>
					<span>三会一课</span>
				</div>
				<el-form>
					<el-form-item label="时间：" prop="time">
						<el-date-picker v-model="meetTime" type="daterange" value-format="yyyy-MM-dd" placeholder="选择日期" @change="getMeetTime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				</el-form>
				<div class="threeClassBoxs boxs" style="justify-content: flex-start;">
					<div v-for="(item, index) in meetList" :key="index" class="threeClassBox">
						<p>{{item.meetingType}}</p>
						<p>{{item.meetingTypeCount}}</p>
						<div class="font">
							<span>未开始:{{item.noStart}}</span>
							<span>进行中:{{item.startMeeting}}</span>
							<span>已结束:{{item.endMeeting}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="right" style="width: 696px;">
				<div class="title">
					<!-- <div class="redBox" style="width: 17px;height: 17px;background: #d30000;display: inline-block;"></div> -->
          <div class="bluebox"></div>
					<span>党龄分布</span>
				</div>
				<!-- 分布柱状图 -->
        <div class="partyAge" ref="echarts" style="width: 90%; height: 340px"></div>
			</div>
		</div>

		<div class="partyFeePayment" style="display: none;">
			<div class="left">
				<div class="title">
					<img src="@/assets/images/country.png" alt="" />
					<span @click="handlePayment()">党员缴纳</span>
				</div>
				<el-form>
					<el-form-item label="时间：" prop="time">
						<el-date-picker v-model="moneyTime" type="daterange" value-format="yyyy-MM-dd" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				</el-form>
				<div class="partyFeePaymentBoxs boxs">
					<div class="partyFeePaymentBox">
						<p>本月已缴费人数</p>
						<p>190</p>
						<div class="font">
							<span>未开始:0</span>
							<span>进行中:0</span>
							<span>已结束:52</span>
						</div>
					</div>
					<div class="partyFeePaymentBox">
						<p>本月已缴费人数</p>
						<p>100</p>
						<div class="font">
							<span>未开始:0</span>
							<span>进行中:1</span>
							<span>已结束:52</span>
						</div>
					</div>
					<div class="partyFeePaymentBox">
						<p>本月已缴费人数</p>
						<p>90</p>
						<div class="font">
							<span>未开始:0</span>
							<span>进行中:2</span>
							<span>已结束:50</span>
						</div>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="title">
					<div class="redBox" style="width: 17px;height: 17px;background: #d30000;display: inline-block; "></div>
					<span>学历分布</span>
				</div>
				<!-- 学历分布饼图 -->
				<div class="degreeAge" ref="echartsPie" style="width: 481px; height: 216px"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { selectMeetingByTime, selectPartyInfoOfIndex, selectPartyAgeOfIndex, selectPartyEducation ,getPartyTree} from "@/api/area/village";
	import { getTree } from "@/api/area/dataBase.js";
	export default {
		data() {
			return {
				name: "index",
				bgc: ["bgc1", "bgc2", "bgc3", "bgc4", "bgc5"],
				treeData: [],
				value: "",
				treeProps: {
					label: "label",
					value: "id",
					children: "children",
				},
				treeValue: "",
				party: {},
				ageArr: [],
				colorArr: [],
				nameArr: [],
				educationArr: [],
				moneyTime: "",
				meetTime: [],
				meetList:[]
			};
		},
		created() {
			this.bg()
			this.getTree()
			// this.getParty()
			// this.getAge()
			// this.getEducation()
			// this.getMeetTime()
		},
		watch:{
			treeValue(){
				console.log(this.treeValue)
				this.getParty()
				this.getAge()
				this.getEducation()
				this.getMeetTime()
			}
		},
		methods: {
			getParty() {//党组织统计
				let param = {
					partyId: this.treeValue
				}
				selectPartyInfoOfIndex(param).then((res) => {
					this.party = res.data
				});
			},
			getTree() {//权限树
				let param = {
					userId: localStorage.getItem("userId")
				}
				getPartyTree(param).then(res => {
					console.log(res.data)
					this.treeData = res.data
          this.treeValue = res.data[0].id
				})
			},
			getMeetTime() {//三会一课
				let param = {
					selectStartTime: this.meetTime[0],
					selectEndTime: this.meetTime[1],
					partyId:this.treeValue
				}
				selectMeetingByTime(param).then(res => {
					this.meetList=res.data
				})
			},
			getEducation() {//柱状图
				let param = {
					partyId: this.treeValue
				}
				selectPartyEducation(param).then(res => {
					this.educationArr = res.data;
					this.pieChart(); //饼状图
				})
			},
			getAge() {//饼状图
				let param = {
					partyId: this.treeValue
				}
				selectPartyAgeOfIndex(param).then((res) => {
					var list = res.data;
					var arr = []
					var arr2 = []
					var arr3 = []
					for(var i in list) {
						arr.push(list[i].data.value)
						arr2.push(list[i].data.itemStyle.color)
						arr3.push(list[i].name)
					}
					this.ageArr = arr
					this.colorArr = arr2
					this.nameArr = arr3
					this.columnChart();
				});
			},
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
			// 柱状图
			columnChart() {
				// 基于准备好的dom，初始化echarts实例
				var echartsC = this.$echarts.init(this.$refs.echarts); //使用$echarts
				// 绘制图表，指定图表配置项和数据
				var option = {
					grid: {
						//图表位置
						left: "5%",
						right: "10%",
						bottom: "20%",
						top: "20%",
						containLabel: true, //grid 区域是否包含坐标轴的刻度标签
					},
					// x轴样式设置
					xAxis: {
						type: "category",
						// 更改x轴线的颜色
						axisLine: {
							lineStyle: {
								color: "#D5DCF4",
								width: 1, //x轴线的宽度
							},
						},
						// 更改x轴线标签
						axisLabel: {
							interval: 0,
							// 更改x轴文字颜色
							textStyle: {
								color: "#8D9ECE", //处理x轴的文字颜色【黑色】
							},
						},
						data: this.nameArr,
					},
					// y轴样式设置
					yAxis: {
						type: "value",
						minInterval:1,
						splitLine: {
							show: false,
						},
						// 更改y轴线的颜色
						axisLine: {
							lineStyle: {
								color: "#D5DCF4",
								width: 1, //x轴线的宽度
							},
						},
						//更改y轴线标签
						axisLabel: {
							formatter: "{value}人",
							interval: 0,
							// 更改y轴文字颜色
							textStyle: {
								color: "#8D9ECE ", //处理y轴的文字颜色【黑色】
							},
						},
					},
					series: [{
						// 柱子样式设置
						type: "bar",
						barWidth: 25, //柱图宽度
            markPoint: {    // 标注
              data: [
                {  value: this.ageArr[0], xAxis: 0, yAxis: this.ageArr[0] },
                {  value: this.ageArr[1], xAxis: 1, yAxis: this.ageArr[1] },
                {  value: this.ageArr[2], xAxis: 2, yAxis: this.ageArr[2] },
                {  value: this.ageArr[3], xAxis: 3, yAxis: this.ageArr[3] },
                {  value: this.ageArr[4], xAxis: 4, yAxis: this.ageArr[4] },
              ],
              itemStyle: {
                color: '#E2AAFF',
              }
            },
						itemStyle: {
							normal: {
								//改变柱子颜色
								color: {
                  type: 'linearGradient',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                      { offset: 0, color: '#85A2FF' },
                      { offset: 1, color: '#526EFF' }
                  ]
                },
                barBorderRadius: [20, 20, 0, 0],      // 圆角
								// 柱子上边字体设置
								// label: {
								// 	show: true, //开启显示数值
								// 	position: "top", //数值在上方显示
								// 	textStyle: {
								// 		//数值样式
								// 		color: "#000", //字体颜色
								// 		fontSize: 12, //字体大小
								// 	},
								// },
							},
						},
						data: this.ageArr,
					}, ],
				};
				echartsC.setOption(option);
			},
			pieChart() {
				// 基于准备好的dom，初始化echarts实例
				var echartsP = this.$echarts.init(this.$refs.echartsPie); //使用$echarts
				// 绘制图表，指定图表配置项和数据
				var option = {
					tooltip: {
						trigger: "item",
					},
					color: [
						"#3EC2B3",
						"#2678F5",
						"#FA5C61",
						"#FF9439",
						"#8281B1",
						"#A18780",
					],
					series: [{
						name: "Access From",
						type: "pie",
						radius: "60%",
						data: this.educationArr,
						label: {
							normal: {
								show: true,
								formatter: `{b} {c}`,
								color: '#000',
							},
						},
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					}, ],
				};
				echartsP.setOption(option);
			},
			//三会一课点击入口
			// handleThreeClass(){
			//       const src = `/partyBuildingView/threeClass`;
			//       this.$router.push({
			//          path: src,
			//       })
			// handlePayment(){
			//    const src = `/partyBuildingView/partyFeePayment`;
			//     this.$router.push({
			//       path: src,
			//      })
			// },
		},
	};
</script>

<style scoped>
	/* 党组织下边框 */

	.partyOrganization {
		padding-bottom: 30px;
		border-bottom: 2px solid #d2d2d2;
	}
	/* 盒子公共样式 */

	.boxs {
		display: flex;
		flex-wrap: wrap;
    justify-content: space-between;
	}

	.boxs div {
		border-radius: 5%;
	}
	/* 党组织盒子样式 */

	.partyBoxs .partyBox {
		width: 295px;
		height: 160px;
		margin-right: 13px;
    background-repeat: no-repeat;
    background-size: 100%;
	}

	.partyBoxs div img {
		width: 65px;
		margin-left: 20px;
	}

	.partyBoxs .details {
		display: block;
		font-size: 24px;
		font-weight: bold;
    float: right;
    margin-top: 45px;
    text-align: center;
	}

	.partyBoxs div p {
		margin: 0;
		font-size: 18px;
		color: #172D60;
		margin-right: 42px;
    color: #172D60;
	}
  .partyBoxs div .p1{
    font-size: 22px;
  }
  .partyBoxs div .p2{
    font-size: 48px;
    margin-top: 15px;
  }

	/* .partyBoxs div p:first-child {
		font-size: 36px;
	} */

	/* .partyBoxs div p:nth-child(2) {
		font-size: 18px;
	} */
	/* 三会一课,党员缴纳共有样式 */

	.threeClass,
	.partyFeePayment {
		display: flex;
		justify-content: space-between;
		/* align-items: flex-end; */
	}

	.threeClass .left .title,
	.partyFeePayment .left .title {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 22px;
		font-weight: bold;
	}

	.threeClassBox,
	.partyFeePaymentBox {
		width: 348px;
    height: 170px;
		margin-right: 10px;
		padding: 0 10px;
		/* border: 3px solid #ececec; */
		/* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    background-color: #F7F8FA;
    border-radius: 15px;
    margin: 0 30px 30px 0;
    position: relative;
	}

	.threeClassBox p:first-child,
	.partyFeePaymentBox p:first-child {
		font-size: 32px;
		font-weight: bold;
		margin: 35px;
    color: #333333;
	}

	.threeClassBox p:nth-child(2),
	.partyFeePaymentBox p:nth-child(2) {
		font-size: 36px;
		color: #333333;
		margin: 0 auto;
		text-align: center;
    position: absolute;
    right: 35px;
    top: 35px;
	}

	.threeClassBoxs .font,
	.partyFeePaymentBoxs .font {
		display: inline-block;
		font-size: 16px;
		padding: 0;
		margin: 0;
		width: 100%;
		overflow: hidden;
    padding: 0 35px;
    display: flex;
    justify-content: space-between;
    color: #666666;
	}

	.threeClassBoxs .font span,
	.partyFeePaymentBoxs .font span {
		margin-right: 10px;
		font-size: 12px;
		float: left;
	}
	.font span:last-of-type{
		margin-right: 0;
	}

	.threeClass .right .title，.partyFeePayment .right .title {
		display: flex;
		justify-content: flex-start;
		margin-bottom: 10px;
		text-align: center;
	}
	/* 三会一课样式 */

	.threeClass .left .title {
		color: #333;
    margin-bottom: 30px;
    margin-top: 15px;
	}
	/* 党龄分布,党员缴纳标题小盒子样式 */

	.right .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 22px;
    font-weight: bold;
		color: #333;
		margin-bottom: 30px;
		margin-top: 15px;
	}

	.redBox {
		width: 17px;
		height: 17px;
		background-color: #d30000;
		border-radius: 5px;
		margin-right: 6px;
		float: left;
	}
	/* 党龄分布柱状图/学历分布饼图边框样式 */

	.partyAge,
	.degreeAge {
		/* border: 3px solid #ececec; */
		/* border-radius: 10px; */
		/* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
	}
	/* 党员缴纳样式 */

	/* .partyFeePayment .left .title {
		color: #a0887e;
	} */
  .bluebox{
    width: 4px;
    height: 20px;
    border-radius: 5px;
    background-color: #1F79F3;
    margin-right: 6px;
  }
</style>
<style lang="scss" scoped>
	.bgc1 {
		background-image: url('../../../../assets/images/Group_18.png');
	}

	.bgc2 {
		background-image: url('../../../../assets/images/Group_19.png');
	}

	.bgc3 {
		background-image: url('../../../../assets/images/Group_20.png');
	}

	.bgc4 {
		background-image: url('../../../../assets/images/Group_21.png');
	}

	.bgc5 {
		background-image: url('../../../../assets/images/Group_22.png');
	}
</style>
