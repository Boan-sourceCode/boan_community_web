<!--实有企业组件-->
<template>
  <div>
    <!--左侧-->
    <div class="box">
      <!--企业类型-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">企业类型</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="typeChart" id="typeChart" class="chart"></div>
          </div>
        </dv-border-box-12>
      </div>
      <!--企业人数-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">企业人数</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="chartNumber" id="chartNumber" class="bar"></div>
          </div>
        </dv-border-box-12>
      </div>
      <!--新增企业-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">新增企业</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="capsuleBox">
            <dv-capsule-chart :config="configGrid" class="capsule" />
          </div>
        </dv-border-box-12>
      </div>
    </div>
    <!--中间-->
    <div class="box" style="width: 42%">
      <!--实有企业图片-->
      <div class="centerBox">
        <div class="centerImg">
          <img src="@/assets/images/business.png" width="77%"/>
        </div>
        <div class="leftBox">
          <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
            <p class="businessNumber">实有企业/组织数量：{{ this.enterpriseNum.total }}</p>
          </dv-border-box-12>
        </div>
        <div class="party organization">
          <div class="partyItem">
            <div class="iconBox">
              <span class="icon-organization"></span>
            </div>
            <div class="content">
              <p class="name">新社会组织</p>
              <p class="number" style="color: #FF6A6A">{{ this.enterpriseNum.society }}</p>
            </div>
          </div>
        </div>
        <div class="party economic">
          <div class="partyItem">
            <div class="iconBox">
              <span class="icon-economic"></span>
            </div>
            <div class="content">
              <p class="name">新经济组织</p>
              <p class="number" style="color: #00F5FD">{{ this.enterpriseNum.economic }}</p>
            </div>
          </div>
        </div>
        <div class="party cause">
          <div class="partyItem">
            <div class="iconBox">
              <img src="@/assets/images/cause.png"/>
            </div>
            <div class="content">
              <p class="name">事业单位</p>
              <p class="number" style="color: #10B9F8">{{ this.enterpriseNum.cause }}</p>
            </div>
          </div>
        </div>
        <div class="party partyImg">
          <div class="partyItem">
            <div class="iconBox">
              <img src="@/assets/images/party.png"/>
            </div>
            <div class="content">
              <p class="name">党政机关</p>
              <p class="number" style="color: #F7A35C">{{ this.enterpriseNum.government }}</p>
            </div>
          </div>
        </div>
        <div class="party country">
          <div class="partyItem">
            <div class="iconBox">
              <img src="@/assets/images/country.png"/>
            </div>
            <div class="content">
              <p class="name">国家机关</p>
              <p class="number" style="color: #F65E5D">{{ this.enterpriseNum.country }}</p>
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
          <p class="title">企业展示</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="brokenLineBox">
            <dv-scroll-board :config="configShow" class="brokenLine"/>
          </div>
        </dv-border-box-12>
      </div>
      <!--学历分布-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">企业规模</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="chartScale" id="chartScale" class="education"></div>
          </div>
        </dv-border-box-12>
      </div>
    </div>
  </div>
</template>

<script>
import { enterpriseType,enterpriseNumber,addEnterprise,enterpriseOrganizationType,enterpriseInformation,enterpriseScale } from "@/api/area/largeScreen";
export default {
  name: "business",
  data(){
    return{
      enterpriseNum:{},  //中间统计企业组织类型
      color:['#1064B0', '#59bdf7'],  //边框颜色
      backgroundColor:'rgba(3,26,84,0.5)',   //边框背景色
      //企业类型饼图
      optionType : {
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
          left:'35%',
          top:'54%',
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
            radius: ['34%', '84%'],
            center: ['40%', '60%'],
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
      //新增企业胶囊图
      configGrid: {
        data: [],
        colors: ['#0273FF', '#E973FE', '#02FF86','#FF933E'],
        showValue: true,
        xAxis:{
          "show":false,
        }
      },
      //企业展示轮播表
      configShow: {
        header: ['名称', '企业人数'],
        rowNum:12,
        rowHeight:31,
        headerBGC: "rgba(0,0,0,0)",  //表头背景色
        oddRowBGC: "rgba(0,0,0,0)",  //奇数行背景色
        evenRowBGC: "rgba(5,35,110,0.5)",  //偶数行背景色
        data: []
      },
      //企业规模饼图
      optionScale : {
        legend: {  //图例组件
          bottom: '5%',
          left: 'center',
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
        },
        series: [
          {
            type: 'pie',
            radius: ['34%', '56%'],
            center: ['50%', '50%'],
            roseType: 'radius',  //将饼图变为南丁格尔玫瑰图
            label: {  //隐藏指引线
              // show: false,
              formatter: '{d}%,{c}'
            },
            emphasis: {  //选中时显示指引线
              label: {
                show: true
              }
            },
            color:['#6054FF','#88FFC3','#FF6E76','#FDDD60','#59BFF7'],
            data: []
          },
        ]
      },
    }
  },
  mounted() {
    this.getAll()

  },
  methods:{
    getAll(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      enterpriseType(param).then(res => {
        this.getEnterpriseType(res.data.enterpriseType)  //企业类型
        this.getEnterpriseNumber(res.data.enterPeopleNumber)  //企业人数
        this.getAddEnterprise(res.data.addEnterpriseNumber)  //新增企业
        this.getEnterpriseOrganizationType(res.data.enterpriseOrganizationType)  //中间统计企业组织类型
        this.getEnterpriseInformation()  //企业展示
        this.getEnterpriseScale(res.data.enterScale)  //企业规模
      })
    },
    //企业类型
    getEnterpriseType(data){
     data.forEach((item) =>{
          this.optionType.series[0].data.push({name: item.name, value: item.value})
        })
        const myChartType = this.$echarts.init(this.$refs.typeChart);
        myChartType.setOption(this.optionType);
        window.addEventListener("resize", () => { myChartType.resize();});
    },

    //企业人数柱形图
    getEnterpriseNumber(data){
      let enterpriseNumberData = []
      let xEnterpriseNumberArr = []
      let yEnterpriseNumberArr = []
      const myChartNumber = this.$echarts.init(this.$refs.chartNumber);
        enterpriseNumberData = data
        for (let i = 0; i < enterpriseNumberData.length; i++) {
          xEnterpriseNumberArr[i] = enterpriseNumberData[i].name
          yEnterpriseNumberArr[i] = enterpriseNumberData[i].data
        }
        myChartNumber.setOption({
          grid:{  //设置折线图的大小
            left: 20,
            top :30,
            right: 0,
            bottom: 20,
            containLabel:true
          },
          xAxis: {
            type: 'category',
            data: xEnterpriseNumberArr,
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
              data: yEnterpriseNumberArr,
            }
          ]
        })
        // 随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChartNumber.resize()
        })
    },

    //新增企业
    getAddEnterprise(data){
      data.forEach((item) =>{
          this.configGrid.data.push({name: item.name, value: item.value})
          this.configGrid = { ...this.configGrid };
        })
    },

    //中间统计企业组织类型
    getEnterpriseOrganizationType(data){

        this.enterpriseNum = data
    },

    //企业展示
    getEnterpriseInformation(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      enterpriseInformation(param).then(res => {
        res.data.forEach((item) =>{
          this.configShow.data.push(item)
          this.configShow = { ...this.configShow };
        })
      })
    },

    //企业规模
    getEnterpriseScale(data){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      data.forEach((item) =>{
          this.optionScale.series[0].data.push({name: item.name, value: item.value})
        })
        const myChartScale = this.$echarts.init(this.$refs.chartScale);
        myChartScale.setOption(this.optionScale);
        window.addEventListener("resize", () => { myChartScale.resize();});
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
.education{
  width: 100%;
  height: 100%;
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
  height: 36px;
  line-height: 36px;
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
  width: 100%;
  margin-top: 43px;
  text-align: center;
}
/*实有企业数量*/
.businessNumber{
  font-size: 22px;
  font-weight: bold;
  color: #00F5FD;
  padding: 20px 0;
  text-align: center;
}
/*中间展示的数据*/
.party{
  padding: 8px;
  border-radius: 6px;
  overflow: hidden;
  width: 19%;
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
/*新社会组织和icon渐变*/
.organization{
  position: relative;
  top: -147%;
  left: 71%;
}
.organization .icon-organization{
  background-image: linear-gradient(90deg, #FF4599,#EAEB71);
  -webkit-background-clip: text;
  color:transparent;
}
/*新经济组织定位和icon渐变*/
.economic{
  position: relative;
  top: -148%;
  left: 11%;
}
.economic .icon-economic{
  background-image: linear-gradient(90deg, #0278FF,#00F3F6,#0272FF,#00F5F6);
  -webkit-background-clip: text;
  color:transparent;
}
/*事业单位定位*/
.cause{
  position: relative;
  top: -114%;
  left: 75%;
}
/*党政机关定位*/
.partyImg{
  position: relative;
  top: -112%;
  left: 10%;
}
/*国家机关定位*/
.country{
  position: relative;
  top: -102%;
  left: 40%;
}
.partyItem .iconBox{
  display: inline-block;
  font-size: 44px;
  padding-right: 10px;
}
.partyItem .iconBox img{
  width: 44px;
  vertical-align: top;
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
</style>
