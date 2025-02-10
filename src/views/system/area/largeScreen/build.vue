<!--实有建筑组件-->
<template>
  <div>
    <!--左侧-->
    <div class="box">
      <!--建筑类型-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">建筑类型</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="buildChart" id="buildChart" class="chart"></div>
          </div>
        </dv-border-box-12>
      </div>
      <!--房屋性质-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">房屋性质</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="chartType" id="chartType" class="bar"></div>
          </div>
        </dv-border-box-12>
      </div>
      <!--房屋产权-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">房屋产权</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="chartHouse" id="chartHouse" class="bar"></div>
          </div>
        </dv-border-box-12>
      </div>
    </div>
    <!--中间-->
    <div class="box" style="width: 42%">
      <!--建筑图片-->
      <div class="centerBox">
        <div class="centerImg">
          <img src="@/assets/images/build.png" width="100%" height="100%"/>
        </div>
        <div class="party city">
          <div class="partyItem">
            <div class="iconBox">
              <span class="icon-city"></span>
            </div>
            <div class="content">
              <p class="name">楼房</p>
              <p class="number" style="color: #00F5FD">{{ this.buildNum.buildingNum }}</p>
            </div>
          </div>
        </div>
        <div class="party courtyard">
          <div class="partyItem">
            <div class="iconBox">
              <span class="icon-courtyard"></span>
            </div>
            <div class="content">
              <p class="name">院落</p>
              <p class="number" style="color: #02FF85">{{ this.buildNum.courtyardNum }}</p>
            </div>
          </div>
        </div>
        <div class="party house">
          <div class="partyItem">
            <div class="iconBox">
              <span class="icon-house"></span>
            </div>
            <div class="content">
              <p class="name">房屋</p>
              <p class="number" style="color: #FF6A6A">{{ this.buildNum.houseNumber }}</p>
            </div>
          </div>
        </div>
      </div>
      <!--建筑名称-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">建筑名称</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="brokenLineBox">
            <dv-scroll-board :config="configName" class="brokenLine"/>
          </div>
        </dv-border-box-12>
      </div>
    </div>
    <!--右侧-->
    <div class="box">
      <!--建筑用途-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">建筑用途</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="information dataBox">
            <div class="right">
              <div class="rightItem" style="color: #F78FB2">
                <p class="number">{{ this.buildingPurpose.supermarket }}</p>
                <p class="name">超级市场</p>
              </div>
              <div class="rightItem" style="color: #C23EFF">
                <p class="number">{{ this.buildingPurpose.kindergarten }}</p>
                <p class="name">幼儿园</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #F09F38">
                <p class="number">{{ this.buildingPurpose.hospital }}</p>
                <p class="name">医院</p>
              </div>
              <div class="rightItem" style="color: #FF227C">
                <p class="number">{{ this.buildingPurpose.bank }}</p>
                <p class="name">银行</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #3BC2B4">
                <p class="number">{{ this.buildingPurpose.parkinglot }}</p>
                <p class="name">停车场</p>
              </div>
              <div class="rightItem" style="color: #60FF5C">
                <p class="number">{{ this.buildingPurpose.firebrigade }}</p>
                <p class="name">消防队</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #FFCE00">
                <p class="number">{{ this.buildingPurpose.hotel }}</p>
                <p class="name">酒店</p>
              </div>
              <div class="rightItem" style="color: #45A2FF">
                <p class="number">{{ this.buildingPurpose.library }}</p>
                <p class="name">图书馆</p>
              </div>
            </div>
          </div>
        </dv-border-box-12>
      </div>
      <!--建筑隐患-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">建筑隐患</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="capsuleBox">
            <dv-capsule-chart :config="configDanger" class="capsule" />
          </div>
        </dv-border-box-12>
      </div>
    </div>
  </div>
</template>

<script>
import { loopShowTooltip  } from "../../../../../public/static/echarts-auto-tooltip.js"
import { newBuildNew,buildType,houseProperty,houseStatus,buildingNum,buildingInformation,buildingPurpose,hiddenDanger } from "@/api/area/largeScreen";
export default {
  name: "build",
  data(){
    return{
      buildNum:{},  //中间统计楼房，院落，房屋的数量
      buildingPurpose:{},  //建筑用途
      color:['#1064B0', '#59bdf7'],  //边框颜色
      backgroundColor:'rgba(3,26,84,0.5)',   //边框背景色
      //建筑类型饼图
      optionBuild : {
        tooltip:{
            show: true
        },
        legend: {  //图例组件
          orient : 'right',
          x : 'right',
          y: 'center',
          itemWidth:10,  //图例标记的图形宽度
          itemHeight:10, //图例标记的图形高度
          itemGap:6,  //图例每项之间的间隔
          selectedMode: false, // 是否允许点击
          textStyle:{    //图例文字的样式
            color:'#fff',
          }
        },
        graphic:{            //echarts饼图中间放字
          type:'text',
          left:'34%',
          top:'45%',
          z:14,
          style:{
            text:'类型',
            textAlign:'center',
            fill:'#fff',
            font:'bolder 22px 微软雅黑'
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['34%', '80%'],
            center: ['40%', '50%'],
            roseType: 'radius',  //将饼图变为南丁格尔玫瑰图
            label: {  //隐藏指引线
              show: false,
              formatter: '{d}%'
            },
            emphasis: {  //选中时显示指引线
              label: {
                show: true
              }
            },
            color:['#10B9F8','#FF6A6A','#90ED7D','#F7A35C','#8085E9','#920783','#E4D354'],
            data:[],
          },
        ]
      },
      //建筑名称轮播表
      configName: {
        header: ['名称', '楼栋', '房屋'],
        rowNum:4,
        rowHeight:31,
        headerBGC: "rgba(0,0,0,0)",  //表头背景色
        oddRowBGC: "rgba(0,0,0,0)",  //奇数行背景色
        // evenRowBGC: "rgba(16,100,176,0.2)",  //偶数行背景色
        evenRowBGC: "rgba(20,51,124,0.5)",  //偶数行背景色
        data: []
      },
      //建筑隐患胶囊图
      configDanger: {
        data:[],
        colors: ['#0273FF', '#E973FE', '#02FF86'],
        showValue: true,
        xAxis:{
          "show":false,
        }
      },
    }
  },
  mounted() {
    this.newBuildNew()
    // this.getBuildType(); //建筑类型
    // this.getHouseStatus(); //房屋性质
    // this.getHouse(); //房屋产权
    // this.getBuildingNum(); //中间统计楼房，院落，房屋的数量
    this.getBuildingInformation(); //建筑名称
    // this.getBuildingPurpose(); //建筑用途
    // this.getHiddenDanger(); //建筑隐患
  },
  methods:{
    newBuildNew(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      buildType(param).then(res => {
        this.getBuildType(res.data.buildingType)
        this.getHouseStatus(res.data.houseProperty)
        this.getHouse(res.data.housePropertyRight)
        this.getBuildingPurpose(res.data.buildingPurpose)
        this.getHiddenDanger(res.data.buildingHiddenDanger)
        this.getBuildingNum(res.data.buildingInfo)
      })
    },
    //建筑类型
    getBuildType(data){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      data.forEach((item) =>{
          this.optionBuild.series[0].data.push({name: item.name, value: item.value})
        })
        this.init();
    },

    //渲染图表
    init(){
      // 已在main.js中全局引入echarts
      //引入多个echarts
      var myChartBuild = this.$echarts.init(this.$refs.buildChart);
      // 使用刚指定的配置项和数据显示图表。
      myChartBuild.setOption(this.optionBuild);
      // 自动轮播提示
      this.tootipTimer = tools.loopShowTooltip(myChartBuild, this.optionBuild, {
        interval: 2000, // 轮播间隔时间
        loopSeries: true // 是否开启轮播循环
      });
      //自适应
      window.addEventListener("resize", () => { myChartBuild.resize();});
    },

    //房屋性质柱形图
    getHouseStatus(data){
      let houseStatusData = []
      let xHouseStatusArr = []
      let yHouseStatusArr = []
      const myChartType = this.$echarts.init(this.$refs.chartType);
        houseStatusData = data
        for (let i = 0; i < houseStatusData.length; i++) {
          xHouseStatusArr[i] = houseStatusData[i].name
          yHouseStatusArr[i] = houseStatusData[i].data
        }
        var myChartTypeoption = {
          tooltip:{
              show: true
          },
          grid:{  //设置折线图的大小
            left: 20,
            top :30,
            right: 0,
            bottom: 20,
            containLabel:true
          },
          xAxis: {
            type: 'category',
            data: xHouseStatusArr,
            axisLine:{
              lineStyle:{
                color:'#CDD1DC',
              }
            },
            //  改变x轴字体颜色和大小
            axisLabel: {
              textStyle: {
                color: '#CDD1DC',
                fontSize:'14',
              },
            },
            // 去除刻度线
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            //  改变y轴颜色
            axisLine:{
              lineStyle:{
                color:'#CDD1DC',
              }
            },
            //  改变y轴字体颜色和大小
            axisLabel: {
              textStyle: {
                color: '#CDD1DC',
                fontSize:'14',
              },
            },
            splitLine: {  //不显示折线图的网格线
              show: false,
            },
            // 去除刻度线
            axisTick: {
              show: false
            }
          },
          series: [
            {
              type: 'bar',
              barWidth:25,
              label: {  //隐藏指引线
                show: true,
                formatter: '{c}',
                position: 'top'
              },
              data:yHouseStatusArr,
            }
          ]
        };
        myChartType.setOption(myChartTypeoption)
        // 自动轮播提示
        this.tootipTimer = tools.loopShowTooltip(myChartType, myChartTypeoption, {
          interval: 2000, // 轮播间隔时间
          loopSeries: true // 是否开启轮播循环
        });
        // 随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChartType.resize()
        })
    },

    //房屋产权柱形图
    getHouse(data){
      let houseData = []
      let xHouseArr = []
      let yHouseArr = []
      const myChartHouse = this.$echarts.init(this.$refs.chartHouse);
        houseData = data
        for (let i = 0; i < houseData.length; i++) {
          xHouseArr[i] = houseData[i].name
          yHouseArr[i] = houseData[i].data
        }
        var myChartHouseoption = {
          tooltip:{
              show: true
          },
          grid:{  //设置折线图的大小
            left: 20,
            top :30,
            right: 0,
            bottom: 20,
            containLabel:true
          },
          xAxis: {
            type: 'value',
            //  改变x轴颜色
            axisLine:{
              lineStyle:{
                color:'#CDD1DC',
              }
            },
            //去除x轴文字
            axisLabel: {
              show:false,
            },
            splitLine: {  //不显示折线图的网格线
              show: false,
            },
            // 去除刻度线
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: xHouseArr,
            axisLine:{
              lineStyle:{
                color:'#CDD1DC',
              }
            },
            //  改变y轴字体颜色和大小
            axisLabel: {
              textStyle: {
                color: '#CDD1DC',
                fontSize:'14',
              },
            },
            // 去除刻度线
            axisTick: {
              show: false
            }
          },
          series: [
            {
              type: 'bar',
              barWidth:10,
              label: {  //隐藏指引线
                show: true,
                formatter: '{c}',
                position: 'right'
              },
              data:yHouseArr,
            }
          ]
        };
        myChartHouse.setOption(myChartHouseoption)
        //自动轮播提示
        this.tootipTimer = tools.loopShowTooltip(myChartHouse, myChartHouseoption, {
          interval: 2000, // 轮播间隔时间
          loopSeries: true // 是否开启轮播循环
        });
        // 随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChartHouse.resize()
        })
    },

    //中间统计楼房，院落，房屋的数量
    getBuildingNum(data){
        console.log(data)
        this.buildNum = data
    },

    //建筑名称
    getBuildingInformation(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      buildingInformation(param).then(res => {
        res.data.forEach((item) =>{
          this.configName.data.push(item)
          this.configName = { ...this.configName };
        })
      })
    },

    //建筑用途
    getBuildingPurpose(data){
        this.buildingPurpose = data
    },

    //建筑隐患
    getHiddenDanger(data){
      data.forEach((item) =>{
          this.configDanger.data.push({name: item.name, value: item.value})
          this.configDanger = { ...this.configDanger };
        })
    },
  }
}
</script>

<style scoped>
/*三个布局div*/
.box{
  width: 28%;
  height: 100%;
  display: inline-block;
  margin-right: 1%;
  vertical-align: top;
}
.box:last-child{
  margin-right: 0;
}
/*标题两侧的线*/
.leftLine{
  width: 66px;
  margin: 0 auto;
  border: 1px solid #01DFF4;
  position: relative;
  top: 58px;
  left: -118px;
  z-index: 14;
  box-shadow: -12px 0 12px -12px rgba(0,0,0,0.1);
}
.rightLine{
  width: 66px;
  margin: 0 auto;
  border: 1px solid #01DFF4;
  position: relative;
  top: 56px;
  left: 158px;
  z-index: 14;
}
/*左边div*/
.leftBox{
  padding: 0 20px;
}
/*每个div的标题*/
.boxTitle{
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../../../../assets/images/boxTitle.png");
  position: relative;
  top: 15px;
  left: 34%;
  width: 192px;
  height: 30px;
  z-index: 15;
}
.title{
  text-align: center;
  font-size: 20px;
  color: #00F5FD;
  font-weight: bold;
}
/*信息*/
.information{
  padding: 20px 40px;
}
.dataBox{
  min-height: 456px;
}
/*饼图*/
.chartBox{
  width: 100%;
  height: 200px;
  z-index: 14;
}
.chart{
  width: 100%;
  height: 100%;
  padding-right:80px;
  z-index: 14;
}
/*条形图*/
.bar{
  width: 100%;
  height: 100%;
  padding: 0 30px 0 10px;
  z-index: 14;
}
/*胶囊图单位*/
.capsuleBox{
  padding: 20px 60px;
}
.capsule{
  height:158px
}
/deep/.dv-capsule-chart .unit-label{
  display: none;
}
/deep/.dv-capsule-chart .capsule-item{
  box-shadow: none;
}
/deep/.dv-capsule-chart .capsule-item .capsule-item-column{
  height: 16px;
}
/deep/.capsule-item-value{
  transform: translateX(180%) !important;
}
/deep/.dv-capsule-chart .capsule-container{
  justify-content: space-around;
}
/deep/.dv-capsule-chart .label-column div{
  height: 42px;
  line-height: 42px;
}
/deep/.dv-capsule-chart .label-column div:last-child{
  display: none;
}
/*中间*/
.centerBox{
  height: 466px;
  width: 100%;
}
.centerImg{
  height: 450px;
  width: 98%;
  margin-top: 43px;
}
.party{
  padding: 8px;
  border-radius: 6px;
  overflow: hidden;
  width: 18%;
  text-align: center;
  background: linear-gradient(128deg,rgba(0,245,246,0.2),rgba(9,42,119,0.5));
}
/*边框渐变*/
.party::before{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border:2px solid;
  border-image: linear-gradient(90deg, #1064B0, #00E7F2) 1;
}
.partyItem{
  display: inline-block;
}
/*楼房定位和icon渐变*/
.city{
  position: relative;
  top: -88%;
  left: 14%;
}
.city .icon-city{
  background-image: linear-gradient(90deg, #0278FF,#00F3F6,#0272FF,#00F5F6);
  -webkit-background-clip: text;
  color:transparent;
}
/*院落定位和icon渐变*/
.courtyard{
  position: relative;
  top: -74%;
  left: 20%;
}
.courtyard .icon-courtyard{
  background-image: linear-gradient(90deg, #02FF88,#00FBE3,#02FF85,#00FAF0);
  -webkit-background-clip: text;
  color:transparent;
}
/*房屋定位和icon渐变*/
.house{
  position: relative;
  top: -106%;
  left: 70%;
}
.house .icon-house{
  background-image: linear-gradient(90deg, #FF4599,#EAEB71);
  -webkit-background-clip: text;
  color:transparent;
}
.partyItem .iconBox{
  display: inline-block;
  font-size: 44px;
  padding-right: 10px;
}
.partyItem .content{
  display: inline-block;
  padding-right: 10px;
  text-align: left;
}
.partyItem .number{
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}
.partyItem .name{
  margin: 0;
  font-size: 14px;
  color: #fff;
}
/*轮播表*/
.brokenLineBox{
  width: 100%;
  height: 199px;
  padding: 0 20px;
  z-index: 15;
}
.brokenLine{
  width: 100%;
  height: 94%;
  padding: 12px 8px 0 8px;
  z-index: 14;
}
/deep/.dv-scroll-board .rows{
  height: 140px !important;
}
/deep/.dv-scroll-board .header{
  color: #00F5FD;
  border-bottom: 1px solid;
  border-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #1064B0 50%, rgba(255, 255, 255, 0) 99%) 2 2 2 2;
}
/deep/.dv-scroll-board .rows .ceil:first-child{
  color: #00F5FD;
}
/*右侧*/
.right{
  padding: 6px 0;
}
.rightItem{
  width: 48%;
  margin-right: 4%;
  display: inline-block;
  text-align: center;
  background: linear-gradient(90deg,rgba(9,65,99,0.5),rgba(22,29,113,0.5));
  padding: 10px;
  border-radius: 16px;
}
.rightItem:last-child{
  margin-right: 0;
}
.rightItem p{
  margin: 2px;
}
.rightItem .number{
  font-size: 36px;
}
.rightItem .name{
  font-size: 18px;
}
</style>
