<!--事件管理组件-->
<template>
  <div>
    <!--左侧-->
    <div class="box">
      <!--事件类别-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">事件类别</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="eventChart" id="eventChart" class="chart"></div>
          </div>
        </dv-border-box-12>
      </div>
      <!--事件数据-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">事件数据</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="chartEventData" id="chartEventData" class="bar"></div>
          </div>
        </dv-border-box-12>
      </div>
      <!--网格事件-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">网格事件</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="chartGridEvent" id="chartGridEvent" class="brokenLine"></div>
          </div>
        </dv-border-box-12>
      </div>
    </div>
    <!--中间-->
    <div class="box" style="width: 42%">
      <!--事件资讯-->
      <div class="centerBox">
        <dv-border-box-5 :color="colorInfo" :backgroundColor="backgroundColor">
          <div class="centerItem">
            <div class="centerItemLeft">
              <img src="../../../../assets/images/eventInfo.png" class="centerImg"/></div>
            <div class="centerItemRight">
              <h1>江苏省化工（危化品）生产企业主要负责培训“充电”</h1>
              <p class="icon-map-marker">巴陵北街社区第1网格XX小区</p>
              <p class="icon-cost">2022-08-05  05:00</p>
            </div>
          </div>
        </dv-border-box-5>
      </div>
      <!--事件上报-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">事件上报</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="brokenLineBox">
            <dv-scroll-board :config="configReport" class="brokenLine"/>
          </div>
        </dv-border-box-12>
      </div>
    </div>
    <!--右侧-->
    <div class="box">
      <!--事件状态-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">事件状态</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="information dataBox">
            <div class="right">
              <div class="rightItem" style="color: #F78FB2">
                <p class="number">{{ this.eventStatusList.reportingEvents }}</p>
                <p class="name">总事件</p>
              </div>
              <div class="rightItem" style="color: #C23EFF">
                <p class="number">{{ this.eventStatusList.noRecive }}</p>
                <p class="name">待接收</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #F09F38">
                <p class="number">{{ this.eventStatusList.noDisPose }}</p>
                <p class="name">待处理</p>
              </div>
              <div class="rightItem" style="color: #FF227C">
                <p class="number">{{ this.eventStatusList.noInspect }}</p>
                <p class="name">待核查</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #3BC2B4">
                <p class="number">{{ this.eventStatusList.noSettle }}</p>
                <p class="name">待结案</p>
              </div>
              <div class="rightItem" style="color: #60FF5C">
                <p class="number">{{ this.eventStatusList.settled }}</p>
                <p class="name">已结案</p>
              </div>
            </div>
            <div class="right rightChart">
              <div ref="chartStateCompletion" id="chartStateCompletion" class="chart"></div>
              <div ref="chartStateOvertime" id="chartStateOvertime" class="chart"></div>
              <div ref="chartAbandonment" id="chartAbandonment" class="chart"></div>
            </div>
          </div>
        </dv-border-box-12>
      </div>
      <!--事件规模-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">事件规模</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="capsuleBox">
            <dv-capsule-chart :config="configScale" class="capsule" />
          </div>
        </dv-border-box-12>
      </div>
    </div>
  </div>
</template>

<script>
import { eventType,eventData,eventGrid,eventReport,eventStatus,incidentStatus,eventScale } from "@/api/area/largeScreen";
export default {
  name: "event",
  data(){
    return{
      eventStatusList:{},  //事件状态
      color:['#1064B0', '#59bdf7'],  //边框颜色
      colorInfo:['#2C72BC', '#00A2E5'],
      backgroundColor:'rgba(3,26,84,0.5)',   //边框背景色
      //事件类别饼图
      optionEvent : {
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
          top:'52%',
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
            center: ['40%', '56%'],
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
            data: []
          },
        ]
      },
      //事件上报轮播表
      configReport: {
        header: ['名称', '地点', '上报时间','状态'],
        rowNum:8,
        headerBGC: "rgba(0,0,0,0)",  //表头背景色
        oddRowBGC: "rgba(0,0,0,0)",  //奇数行背景色
        // evenRowBGC: "rgba(16,100,176,0.2)",  //偶数行背景色
        evenRowBGC: "rgba(20,51,124,0.5)",  //偶数行背景色
        data: []
      },
      //事件状态三个饼图
      //完成率
      optionStateCompletion: {
        title: [
          {
            subtext: '完成率',
            left: '50%',
            top: '73%',
            textAlign: 'center',
            subtextStyle:{
              color:'#60FF5C',
            }
          },
        ],
        graphic:{            //echarts饼图中间放字
          type:'text',
          left:'center',
          top:'35%',
          z:14,
          style:{
            text:'',
            textAlign:'center',
            fill:'#60FF5C',
            font:'bolder 14px 微软雅黑'
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '40%'],
            clockwise :  false,
            silent: true,
            color: ['#78757B','#60FF5C'],
            labelLine: {  //提示线
              show:false
            },
            data: [],
          },
        ]
      },
      //超时流转
      optionStateOvertime: {
        title: [
          {
            subtext: '超时流转',
            left: '50%',
            top: '73%',
            textAlign: 'center',
            subtextStyle:{
              color:'#F7A35C',
            }
          },
        ],
        graphic:{            //echarts饼图中间放字
          type:'text',
          left:'center',
          top:'35%',
          z:14,
          style:{
            text:'',
            textAlign:'center',
            fill:'#F7A35C',
            font:'bolder 14px 微软雅黑'
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '40%'],
            clockwise :  false,
            silent: true,
            labelLine: {  //提示线
              show:false
            },
            color: ['#78757B','#F7A35C'],
            data: [],
          },
        ]
      },
      //废弃
      optionAbandonment: {
        title: [
          {
            subtext: '废弃',
            left: '50%',
            top: '73%',
            textAlign: 'center',
            subtextStyle:{
              color:'#8085E9',
            }
          }
        ],
        graphic:{            //echarts饼图中间放字
          type:'text',
          left:'center',
          top:'35%',
          z:14,
          style:{
            text:'',
            textAlign:'center',
            fill:'#8085E9',
            font:'bolder 14px 微软雅黑'
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '40%'],
            clockwise :  false,
            silent: true,
            color: ['#767879', '#8085E9'],
            labelLine: {  //提示线
              show:false
            },
            data: [],
          }
        ]
      },
      //事件规模胶囊图
      configScale: {
        data: [],
        colors: ['#0273FF', '#E973FE', '#02FF86'],
        showValue: true,
        xAxis:{
          "show":false,
        }
      },
    }
  },
  mounted() {
    this.getEventType();  //事件类别
    this.getEventData();  //事件数据
    this.getEventGrid();  //网格事件
    this.getEventReport();  //事件上报
    this.getEventStatus();  //事件状态
    this.getCompletion();  //事件状态完成率饼图
    this.getOvertime();  //事件状态超时流转饼图
    this.getAbandonment();  //事件状态废弃饼图
    this.getEventScale();  //事件规模
  },
  methods:{
    //事件类别
    getEventType(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      eventType(param).then(res => {
        res.data.forEach((item) =>{
          this.optionEvent.series[0].data.push({name: item.name, value: item.value})
        })
        const myChartEvent = this.$echarts.init(this.$refs.eventChart);
        myChartEvent.setOption(this.optionEvent);
        window.addEventListener("resize", () => { myChartEvent.resize();});
      })
    },

    //事件数据
    getEventData(){
      let incidentData = []
      let xIncidentArr = []
      let yIncidentArr = []
      const myChartEventData = this.$echarts.init(this.$refs.chartEventData);
      let param = {
        userId:localStorage.getItem("userId"),
      }
      eventData(param).then(res => {
        incidentData = res.data
        for (let i = 0; i < incidentData.length; i++) {
          xIncidentArr[i] = incidentData[i].name
          yIncidentArr[i] = incidentData[i].data
        }
        myChartEventData.setOption({
          grid:{  //设置折线图的大小
            left: 20,
            top :30,
            right: 0,
            bottom: 20,
            containLabel:true
          },
          xAxis: {
            type: 'category',
            data: xIncidentArr,
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
              data: yIncidentArr,
            }
          ]
        })
        // 随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChartEventData.resize()
        })
      })
    },

    //网格事件
    getEventGrid(){
      let eventGridData = []
      let month = [];
      let seriesReport = [];
      let seriesFinish = [];
      const myChartGridEvent = this.$echarts.init(this.$refs.chartGridEvent);
      let param = {
        userId:localStorage.getItem("userId"),
      }
      eventGrid(param).then(res => {
        eventGridData = res.data
        for (let i = 0; i < eventGridData.report.length; i++) {
          month[i] = eventGridData.report[i].month
          seriesReport[i] = eventGridData.report[i].reportCount
        }
        for (let i = 0; i < eventGridData.finish.length; i++) {
          seriesFinish[i] = eventGridData.finish[i].finishCount
        }
        myChartGridEvent.setOption({
          legend: {  //事件类型解释
            top:'8%',
            data: ['上报事件', '完成事件'],
            textStyle:{
              color:'#fff',
            },
          },
          xAxis: {
            name:'月份', //名字
            data: month, //数据
            type: 'category', //坐标轴类型
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
            name:'数量',
            type: 'value',
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
          grid: { //图表位置
            left: '4%',
            right: '10%',
            bottom: '4%',
            top:'30%',
            containLabel: true //grid 区域是否包含坐标轴的刻度标签
          },
          series: [{
            name: '上报事件', //名字
            color:'#486BC8',  //颜色
            type: 'line',    //line（折线图）、bar（柱状图）、pie（饼图）、scatter（散点图）、graph（关系图）、tree（树图）、...
            data: seriesReport  //series的数据，对应着xAxis.data
          },
            {
              name: '完成事件',
              color:'#D48A3D',
              type: 'line',
              data: seriesFinish
            },]
        })
        // 随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChartGridEvent.resize()
        })
      })
    },

    //事件上报
    getEventReport(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      eventReport(param).then(res => {
        res.data.forEach((item) =>{
          this.configReport.data.push(item)
          this.configReport = { ...this.configReport };
        })
      })
    },

    //事件状态
    getEventStatus(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      eventStatus(param).then(res => {
        this.eventStatusList = res.data
      })
    },

    //事件状态完成率饼图
    getCompletion(){
      let param = {
        userId:localStorage.getItem("userId"),
        tag:0
      }
      incidentStatus(param).then(res => {
        this.optionStateCompletion.graphic.style.text = res.data.total
        res.data.incidentInfo.forEach((item) =>{
          console.log(item)
          this.optionStateCompletion.series[0].data.push(item)
        })
        const myChartStateCompletion = this.$echarts.init(this.$refs.chartStateCompletion);
        myChartStateCompletion.setOption(this.optionStateCompletion);
        window.addEventListener("resize", () => { myChartStateCompletion.resize();});
      })
    },

    //事件状态超时流转饼图
    getOvertime(){
      let param = {
        userId:localStorage.getItem("userId"),
        tag:1
      }
      incidentStatus(param).then(res => {
        this.optionStateOvertime.graphic.style.text = res.data.total
        res.data.incidentInfo.forEach((item) =>{
          console.log(item)
          this.optionStateOvertime.series[0].data.push(item)
        })
        const myChartStateOvertime = this.$echarts.init(this.$refs.chartStateOvertime);
        myChartStateOvertime.setOption(this.optionStateOvertime);
        window.addEventListener("resize", () => { myChartStateOvertime.resize();});
      })
    },

    //事件状态废弃饼图
    getAbandonment(){
      let param = {
        userId:localStorage.getItem("userId"),
        tag:2
      }
      incidentStatus(param).then(res => {
        this.optionAbandonment.graphic.style.text = res.data.total
        res.data.incidentInfo.forEach((item) =>{
          console.log(item)
          this.optionAbandonment.series[0].data.push(item)
        })
        const myChartAbandonment = this.$echarts.init(this.$refs.chartAbandonment);
        myChartAbandonment.setOption(this.optionAbandonment);
        window.addEventListener("resize", () => { myChartAbandonment.resize();});
      })
    },

    //事件规模
    getEventScale(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      eventScale(param).then(res => {
        res.data.forEach((item) =>{
          this.configScale.data.push({name: item.name, value: item.value})
          this.configScale = { ...this.configScale };
        })
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
  height: 310px;
  width: 100%;
  padding-top: 58px;
}
.centerItem{
  height: 100%;
  padding: 42px 30px;
}
.centerItemLeft{
  width: 40%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
}
.centerImg{
  width: 100%;
  height: 100%;
}
.centerItemRight{
  width: 60%;
  height: 100%;
  padding-left: 20px;
  display: inline-block;
  overflow: hidden;
}
.centerItemRight h1{
  color: #10B9F8;
  line-height: 44px;
  margin: 0;
  font-weight: bold;
}
.centerItemRight p{
  color: #fff;
}
/*轮播表*/
.brokenLineBox{
  width: 100%;
  height: 398px;
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
  /*height: 140px !important;*/
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
.rightChart{
  height: 104px;
}
.rightChart .chart{
  width: 33%;
  display: inline-block;
  padding-right: 0;
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
