<!--智慧党建组件-->
<template>
  <div>
    <!--左侧-->
    <div class="box">
      <!--三会一课-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">三会一课</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="capsuleBox">
            <dv-capsule-chart :config="configParty" class="capsule" />
          </div>
        </dv-border-box-12>
      </div>
      <!--党龄分布-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">党龄分布</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="chartPartyAge" id="chartPartyAge" class="bar"></div>
          </div>
        </dv-border-box-12>
      </div>
      <!--学历分布-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">学历分布</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="chartEducation" id="chartEducation" class="chart"></div>
          </div>
        </dv-border-box-12>
      </div>
    </div>
    <!--中间-->
    <div class="box" style="width: 42%">
      <!--智慧党建图片-->
      <div class="centerBox">
        <div class="centerImg">
          <video :src="videoUrl" class="partyVideo" controls="controls"></video>
        </div>
        <div class="centerTitle">
          <p>{{this.videoName}}</p>
        </div>
      </div>
      <!--底部展示-->
      <div class="leftBox" style="padding: 0">
        <div class="information" style="padding: 44px 0 0 0">
          <div class="center">
            <div class="centerItem sign"></div>
            <div class="centerItem" style="color: #F78FB2">
              <div class="iconBox">
                <span class="icon-organize"></span>
              </div>
              <div class="content">
                <p class="number">{{this.partyList.party}}</p>
                <p class="name">党组织</p>
              </div>
            </div>
            <div class="centerItem" style="color: #F5D794">
              <div class="iconBox">
                <span class="icon-trophy"></span>
              </div>
              <div class="content">
                <p class="number">{{this.partyList.honorParty}}</p>
                <p class="name">优秀党组织</p>
              </div>
            </div>
          </div>
          <div class="center">
            <div class="centerItem" style="color: #FFFFFF">
              <div class="iconBox">
                <span class="icon-personnel" style="color: #10B9F8"></span>
              </div>
              <div class="content">
                <p class="number">{{this.partyList.partyMember}}</p>
                <p class="name">党员人数</p>
              </div>
            </div>
            <div class="centerItem" style="color: #F65E5D">
              <div class="iconBox">
                <span class="icon-Medal"></span>
              </div>
              <div class="content">
                <p class="number">{{this.partyList.honorMember}}</p>
                <p class="name">优秀党员</p>
              </div>
            </div>
            <div class="centerItem" style="color: #3ED992">
              <div class="iconBox">
                <span class="icon-meeting"></span>
              </div>
              <div class="content">
                <p class="number">{{this.partyList.meetingCount}}</p>
                <p class="name">三会一课</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--右侧-->
    <div class="box">
      <!--企业展示-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">会议名称</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="brokenLineBox">
            <dv-scroll-board :config="configMeeting" class="brokenLine"/>
          </div>
        </dv-border-box-12>
      </div>
      <!--学历分布-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">党费缴纳</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="information partyRight" style="padding: 8px 0">
            <div class="party" style="margin-top: 10px">
              <div class="partyItem" style="color: #27AEEE">
                <div class="iconBox">
                  <span class="icon-cost"></span>
                </div>
                <div class="content">
                  <p class="name">本月已缴费金额</p>
                  <p class="number">{{ this.payList.thisMonthAmount }}</p>
                </div>
              </div>
              <span class="line"></span>
              <div class="partyItem" style="color: #40D28A">
                <div class="content">
                  <p class="name">本年累计缴纳金额</p>
                  <p class="number">{{ this.payList.thisYearAmount }}</p>
                </div>
              </div>
            </div>
            <div class="party">
              <div class="partyItem" style="color: #F590B2">
                <div class="iconBox">
                  <span class="icon-personnel"></span>
                </div>
                <div class="content">
                  <p class="name">本月已缴纳人数</p>
                  <p class="number">{{ this.payList.thisNum }}</p>
                </div>
              </div>
              <span class="line"></span>
              <div class="partyItem" style="color: #E9D6AF">
                <div class="content">
                  <p class="name">本月未缴纳人数</p>
                  <p class="number">{{ this.payList.NoNum }}</p>
                </div>
              </div>
            </div>
          </div>
        </dv-border-box-12>
      </div>
    </div>
  </div>
</template>

<script>
import { loopShowTooltip  } from "../../../../../public/static/echarts-auto-tooltip.js"
import { partyDataAll,meeting,partyAge,education,partyNumber,meetingName,partyFeePayment,video } from "@/api/area/largeScreen";
export default {
  name: "party",
  data(){
    return{
      partyList:{}, //获取中间数字
      payList:{}, //获取党费缴纳
      videoUrl:'',  //视频地址
      videoName:'',  //视频名称
      color:['#1064B0', '#59bdf7'],  //边框颜色
      backgroundColor:'rgba(3,26,84,0.5)',   //边框背景色
      //三会一课胶囊图
      configParty:{
        data: [],
        colors: ['#0273FF', '#E973FE', '#02FF86','#FE8251'],
        showValue: true,
        xAxis:{
          "show":false,
        }
      },
      //学历分布饼图
      optionEducation : {
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
            radius: ['34%', '60%'],
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
      //会议名称轮播表
      configMeeting: {
        header: ['名称', '支部'],
        rowNum:12,
        rowHeight:31,
        headerBGC: "rgba(0,0,0,0)",  //表头背景色
        oddRowBGC: "rgba(0,0,0,0)",  //奇数行背景色
        evenRowBGC: "rgba(5,35,110,0.5)",  //偶数行背景色
        data:[],
      },
    }
  },
  mounted() {
    this.partyDataAll()
    this.getVideo(); //获取视频
    this.getMeetingName(); //会议名称
  },
  methods:{
    partyDataAll(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      partyDataAll(param).then(res => {
          console.log(res)
          this.getMeeting(res.data.meetingAndLecture)
        this.getPartyAge(res.data.partyAgeList)
        this.getParty(res.data.partyInfo)
        this.getEducation(res.data.partyMemberEducation)
        this.getPayment(res.data.partyMemberFeeAmount)

        // res.data.forEach((item) =>{
        //   this.configParty.data.push({name: item.name, value: item.value})
        //   this.configParty = { ...this.configParty };
        // })
      })
    },
    //三会一课
    getMeeting(data){
      data.forEach((item) =>{
        this.configParty.data.push({name: item.name, value: item.value})
        this.configParty = { ...this.configParty };
      })
    },

    //党龄分布
    getPartyAge(data){
      let ageData = []
      let xAgeArr = []
      let yAgeArr = []
      const myChartPartyAge = this.$echarts.init(this.$refs.chartPartyAge);
      let param = {
        userId:localStorage.getItem("userId"),
      }
      ageData = data
      for(let i=0;i< ageData.length; i++) {
        xAgeArr[i] = ageData[i].name
        yAgeArr[i] = ageData[i].data
      }
      var myChartPartyAgeoption = {
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
          data: xAgeArr,
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
            data:yAgeArr,
          }
        ]
      };
      myChartPartyAge.setOption(myChartPartyAgeoption);
      // 自动轮播提示
      this.tootipTimer = tools.loopShowTooltip(myChartPartyAge, myChartPartyAgeoption, {
        interval: 2000, // 轮播间隔时间
        loopSeries: true // 是否开启轮播循环
      });
      // 随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChartPartyAge.resize()
      })
    },

    //学历分布
    getEducation(data){
      data.forEach((item) =>{
          this.optionEducation.series[0].data.push({name: item.name, value: item.value})
        })
        this.init();
    },

    //渲染图表
    init(){
      // 已在main.js中全局引入echarts
      //引入多个echarts
      var myChartEducation = this.$echarts.init(this.$refs.chartEducation);
      // 使用刚指定的配置项和数据显示图表。
      myChartEducation.setOption(this.optionEducation);
      //自动轮播
      this.tootipTimer = tools.loopShowTooltip(myChartEducation, this.optionEducation, {
        interval: 2000, // 轮播间隔时间
        loopSeries: true // 是否开启轮播循环
      });
      //自适应
      window.addEventListener("resize", () => { myChartEducation.resize();})
    },

    //获取中间数字
    getParty(data){
      this.partyList = data
    },

    //视频
    getVideo(){
      video().then(res => {
        this.videoUrl = res.data.configValue
        this.videoName = res.data.remark
      })
    },

    //会议名称
    getMeetingName(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      meetingName(param).then(res => {
        res.data.forEach((item) =>{
          this.configMeeting.data.push(item)
          this.configMeeting = { ...this.configMeeting };
        })
      })
    },

    //党费缴纳
    getPayment(data){
        this.payList = data
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
  vertical-align: top;
}
/*左边div*/
.leftBox{
  padding: 0 20px;
}
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
  text-align: right;
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
  min-height: 198px;
  padding: 5px 60px 5px 20px;
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
  height: 444px;
  width: 100%;
  background: rgba(9,33,93,0.8);
  margin-top: 58px;
}
.partyVideo{
  width: 100%;
  height: 100%;
  background: #000;
}
.centerImg{
  height: 380px;
}
.centerTitle{
  height: 64px;
}
.centerTitle p{
  margin: 0;
  color: #10B9F0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 64px;
}
.center{
  padding: 8px 0;
}
.centerItem{
  width: 32%;
  margin-right: 2%;
  display: inline-block;
  text-align: left;
  background: linear-gradient(90deg,rgba(18,93,136,0.5),rgba(33,64,156,0.5));
  padding: 4px 10px;
  border-radius: 16px;
}
.centerItem:last-child{
  margin-right: 0;
}
/*党标图片*/
.sign{
  width: 12%;
  height: 18%;
  margin: 0;
  padding: 0;
  background: url("../../../../assets/images/partySign.png") no-repeat;
  background-size: 94% 90%;
  position: absolute;
  bottom: 13%;
  left: 30%;
}
.centerItem p{
  margin: 4px;
}
.centerItem .iconBox{
  display: inline-block;
  font-size: 64px;
  padding: 0 10px;
}
.centerItem .content{
  display: inline-block;
}
.centerItem .number{
  font-size: 36px;
}
.centerItem .name{
  font-size: 18px;
}
/*右侧*/
/*轮播表*/
.brokenLineBox{
  width: 100%;
  height: 454px;
  padding: 0 20px;
  z-index: 15;
}
.brokenLine{
  width: 100%;
  height: 96%;
  padding: 16px 8px 0 8px;
  z-index: 14;
}
/deep/.dv-scroll-board .header{
  color: #00F5FD;
  border-bottom: 1px solid;
  border-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #1064B0 50%, rgba(255, 255, 255, 0) 99%) 2 2 2 2;
}
/deep/.dv-scroll-board .header .header-item:last-child{
  text-align: right;
}
/deep/.dv-scroll-board .rows .ceil:first-child{
  color: #00F5FD;
}
/deep/.dv-scroll-board .rows .ceil:last-child{
  text-align: right;
}
/*学历分布*/
.partyRight .party{
  display: flex;
  justify-content: space-evenly;
}
.partyRight .partyItem{
  display: inline-block;
  text-align: left;
  vertical-align: top;
}
.partyRight .iconBox{
  display: inline-block;
  font-size: 74px;
  margin-right: 10px;
}
.partyRight .line{
  margin: 14px 0;
  border-right: 1px solid #519DDF;
}
.partyRight .content{
  display: inline-block;
  vertical-align: top;
  margin-top: 14px;
}
.partyRight .number{
  margin: 0;
  font-size: 30px;
  font-weight: bold;
}
.partyRight .name{
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}
</style>
