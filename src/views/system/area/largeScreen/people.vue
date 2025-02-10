<!--实有人口组件-->
<template>
  <div>
    <!--左侧-->
    <div class="box">
      <!--人口年龄-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">人口年龄</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="chartAge" id="chartAge" class="chart"></div>
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
            <div ref="chartEducation" id="chartEducation" class="bar"></div>
          </div>
        </dv-border-box-12>
      </div>
      <!--民族人口数量-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">民族人口数量</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox">
            <div ref="chartNumber" id="chartNumber" class="brokenLine"></div>
          </div>
        </dv-border-box-12>
      </div>
    </div>
    <!--中间-->
    <div class="box" style="width: 42%">
      <!--实有人口图片-->
      <div class="centerBox">
        <div class="centerImg">
          <img src="@/assets/images/peopleCenter.png" width="50%"/>
        </div>
        <!-- <p class="peopleNumber">实有人口：{{ this.peopleStatisticsList.total }}</p> -->
        <p class="peopleNumber">实有人口：3191</p>
        <div class="centerLeftBox">
          <div class="party">
            <span class="icon-population-r iconBox"></span>
            <div class="content">
              <!-- <p class="number" style="color: #96FF00">{{ this.peopleStatisticsList.registeredNum }}</p> -->
              <p class="number" style="color: #96FF00">4700</p>
              <p class="name">户籍人口</p>
            </div>
          </div>
          <div class="party">
            <span class="icon-population-n iconBox"></span>
            <div class="content">
              <!-- <p class="number" style="color: #DE5AF9">{{ this.peopleStatisticsList.unregisteredNum }}</p> -->
              <p class="number" style="color: #DE5AF9">0</p>
              <p class="name">未落户人口</p>
            </div>
          </div>
          <div class="party">
            <span class="icon-plane iconBox"></span>
            <div class="content">
              <!-- <p class="number" style="color: #2DD6E2">{{ this.peopleStatisticsList.foreignNum }}</p> -->
              <p class="number" style="color: #2DD6E2">1</p>
              <p class="name">境外人口</p>
            </div>
          </div>
        </div>
        <div class="centerRightBox">
          <div class="party">
            <span class="icon-heart iconBox"></span>
            <div class="content">
              <!-- <p class="number" style="color: #FFC050">{{ this.peopleStatisticsList.specialNum }}</p> -->
              <p class="number" style="color: #FFC050">10</p>
              <p class="name">特殊人员</p>
            </div>
          </div>
          <div class="party">
            <span class="icon-star iconBox"></span>
            <div class="content">
              <!-- <p class="number" style="color: #EF001D">{{ this.peopleStatisticsList.concernNum }}</p> -->
              <p class="number" style="color: #EF001D">5</p>
              <p class="name">重点人员关注</p>
            </div>
          </div>
          <div class="party">
            <span class="icon-party-man iconBox"></span>
            <div class="content">
              <!-- <p class="number" style="color: #8085E9">{{ this.peopleStatisticsList.partyMember }}</p> -->
              <p class="number" style="color: #8085E9">330</p>
              <p class="name">党员</p>
            </div>
          </div>
        </div>
      </div>
      <!--人口比例-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">人口比例</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="brokenLineBox">
            <div ref="manChart" id="manChart" class="chartItem"></div>
            <div ref="womanChart" id="womanChart" class="chartItem"></div>
            <div ref="marriageChart" id="marriageChart" class="chartItem" style="width: 44%"></div>
          </div>
        </dv-border-box-12>
      </div>
    </div>
    <!--右侧-->
    <div class="box">
      <!--人口卡片-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">人口卡片</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="information dataBox">
            <div class="right">
              <div class="rightItem" style="color: #F78FB2">
                <!-- <p class="number">{{ this.peopleCardList.disabler }}</p> -->
                <p class="number">5</p>
                <p class="name">残疾人员</p>
              </div>
              <div class="rightItem" style="color: #C23EFF">
                <!-- <p class="number">{{ this.peopleCardList.preferentialTreatment }}</p> -->
                <p class="number">3</p>
                <p class="name">社区解矫人员</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #F09F38">
                <!-- <p class="number">{{ this.peopleCardList.subsistenceAllowances }}</p> -->
                <p class="number">2</p>
                <p class="name">社区矫正人员</p>
              </div>
              <div class="rightItem" style="color: #FF227C">
                <!-- <p class="number">{{ this.peopleCardList.releaseFromPrison }}</p> -->
                <p class="number">1</p>
                <p class="name">刑满释放人员</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #3BC2B4">
                <!-- <p class="number">{{ this.peopleCardList.childbearingAge }}</p> -->
                <p class="number">2</p>
                <p class="name">退役人员</p>
              </div>
              <div class="rightItem" style="color: #60FF5C">
                <!-- <p class="number">{{ this.peopleCardList.exServicemen }}</p> -->
                <p class="number">2</p>
                <p class="name">民政优抚对象</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #FFCE00">
                <!-- <p class="number">{{ this.peopleCardList.unemployed }}</p> -->
                <p class="number">8</p>
                <p class="name">失业人员</p>
              </div>
              <div class="rightItem" style="color: #45A2FF">
                <!-- <p class="number">{{ this.peopleCardList.drugAddicts }}</p> -->
                <p class="number">0</p>
                <p class="name">吸毒人员</p>
              </div>
            </div>
          </div>
        </dv-border-box-12>
      </div>
      <!--服务群体-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">服务群体</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="capsuleBox">
            <dv-capsule-chart :config="configGroup" class="capsule" />
          </div>
        </dv-border-box-12>
      </div>
    </div>
  </div>
</template>

<script>
import { loopShowTooltip  } from "../../../../../public/static/echarts-auto-tooltip.js"
import { peopleAge,peopleEducation,peopleNation,peopleStatistics,peopleCard,peopleServiceGroup,peopleMarry,peopleProportion } from "@/api/area/largeScreen";
export default {
  name: "people",
  data(){
    return{
      peopleStatisticsList:{},  //中间统计人口
      peopleCardList:{},  //人口卡片
      color:['#1064B0', '#59bdf7'],  //边框颜色
      backgroundColor:'rgba(3,26,84,0.5)',   //边框背景色
      //人口年龄饼图
      optionAge : {
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
          top:'50%',
          z:14,
          style:{
            text:'年龄',
            textAlign:'center',
            fill:'#fff',
            font:'bolder 22px 微软雅黑'
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['34%', '70%'],
            center: ['40%', '55%'],
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
      //服务群体胶囊图
      configGroup: {
        data: [
          {name: '党员', value: 330},
          {name: '网格员', value: 3},
          {name: '志愿者', value: 128}
        ],
        colors: ['#0273FF', '#E973FE', '#02FF86'],
        showValue: true,
        xAxis:{
          "show":false,
        }
      },
      //男性占比饼图
      optionMan : {
        graphic:{
          elements: [{
            type: 'image',
            style: {
              image: require('@/assets/images/peopleMan.png'),//你的图片地址
              width: 20,
              height: 40
            },
            left: 'center',
            top: 'center'
          }]
        },
        title: [
          {
            text: '',
            left: 'center',
            top:'80%',
            textStyle:{
              color:'#21B7E7',
              fontSize:14,
            }
          },
          {
            subtext: '男性',
            left: '48%',
            top: '4%',
            textAlign: 'center',
            subtextStyle:{
              color:'#21B7E7',
              fontSize:14,
            }
          },
        ],
        series: [
          {
            type: 'pie',
            // roseType: 'area',  //将饼图变为南丁格尔玫瑰图
            radius: ['34%', '46%'],
            center: ['50%', '50%'],
            clockwise :  false,
            silent: true,
            color: ['#767879', '#21B7E7'],
            labelLine: {  //提示线
              lineStyle: {
                color: '#fff'
              },
            },
            label: {
              formatter: '{d}%',
              color:'#fff',
              fontWeight:600,
            },
            data: []
          }
        ]
      },
      //女性占比饼图
      optionWoman: {
        graphic:{
          elements: [{
            type: 'image',
            style: {
              image: require('@/assets/images/peopleWoman.png'),//你的图片地址
              width: 20,
              height: 40
            },
            left: 'center',
            top: 'center'
          }]
        },
        title: [
          {
            text: '',
            left: 'center',
            top:'80%',
            textStyle:{
              color:'#FF6C9A',
              fontSize:14,
            }
          },
          {
            subtext: '女性',
            left: '48%',
            top: '4%',
            textAlign: 'center',
            subtextStyle:{
              color:'#FF6C9A',
              fontSize:14,
            }
          },
        ],
        series: [
          {
            type: 'pie',
            // roseType: 'area',  //将饼图变为南丁格尔玫瑰图
            radius: ['34%', '46%'],
            center: ['50%', '50%'],
            clockwise :  false,
            silent: true,
            color: ['#767879', '#FF6C9A'],
            labelLine: {  //提示线
              lineStyle: {
                color: '#fff'
              },
            },
            label: {
              formatter: '{d}%',
              color:'#fff',
              fontWeight:600,
            },
            data: []
          }
        ]
      },
      //婚姻占比饼图
      optionMarriage : {
        tooltip:{
            show: true
        },
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
            clockwise:false,  //逆时针展示
            // roseType: 'radius',  //将饼图变为南丁格尔玫瑰图
            label: {  //隐藏指引线
              show: true,
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
    this.getPeopleAll();   //人口年龄

  },
  methods:{
    getPeopleAll(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      peopleAge(param).then(res => {
        this.getPeopleAge(res.data.peopleAge)
        this.getPeopleEducation(res.data.peopleEducation);   //人口学历分布
        this.getPeopleNation(res.data.peopleNation);   //民族人口数量
        this.getPeopleStatistics(res.data.peopleInfo);   //中间统计人口
        this.getPeopleProportionMan(res.data.peopleProportion.maleInfo);   //人口比例（男）
        this.getPeopleProportionWoman(res.data.peopleProportion.femaleInfo);   //人口比例（女）
        this.getPeopleMarry(res.data.marryInfo);   //人口婚姻状况
        this.getPeopleCard(res.data.peopleCard);   //人口卡片
        // this.getPeopleServiceGroup(res.data.serviceGroup);   //服务群体
      })
    },
    //人口年龄
    getPeopleAge(data){
      data.forEach((item) =>{
          this.optionAge.series[0].data.push({name: item.name, value: item.value})
        })
        const myChartAge = this.$echarts.init(this.$refs.chartAge);
        myChartAge.setOption(this.optionAge);
        // 自动轮播提示信息
        this.tootipTimer = tools.loopShowTooltip(myChartAge, this.optionAge, {
          interval: 2000, // 轮播间隔时间
          loopSeries: true // 是否开启轮播循环
        });
        //自适应
        window.addEventListener("resize", () => { myChartAge.resize();});
    },

    //人口学历分布
    getPeopleEducation(data){
      let peopleEducationData = []
      let xPeopleEducationArr = []
      let yPeopleEducationArr = []
      const myChartEducation = this.$echarts.init(this.$refs.chartEducation);
      let param = {
        userId:localStorage.getItem("userId"),
      }
        peopleEducationData = data
        for (let i = 0; i < peopleEducationData.length; i++) {
          xPeopleEducationArr[i] = peopleEducationData[i].name
          yPeopleEducationArr[i] = peopleEducationData[i].data
        }
        var myChartEducationoption = {
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
            data: xPeopleEducationArr,
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
              formatter: "{value}人",
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
              data:yPeopleEducationArr,
            }
          ]
        };
        myChartEducation.setOption(myChartEducationoption)
        // 自动轮播
        this.tootipTimer = tools.loopShowTooltip(myChartEducation, myChartEducationoption, {
          interval: 2000, // 轮播间隔时间
          loopSeries: true // 是否开启轮播循环
        });
        // 随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChartEducation.resize()
        })
    },

    //民族人口数量
    getPeopleNation(data){
      let peopleNationData = []
      let xPeopleNationArr = []
      let yPeopleNationArr = []
      const myChartNumber = this.$echarts.init(this.$refs.chartNumber);
      let param = {
        userId:localStorage.getItem("userId"),
      }
        peopleNationData = data
        for (let i = 0; i < peopleNationData.length; i++) {
          xPeopleNationArr[i] = peopleNationData[i].name
          yPeopleNationArr[i] = peopleNationData[i].value
        }
        var myChartNumberoption ={
          tooltip:{
              show: true
          },
          grid:{  //设置折线图的大小
            left: 20,
            top :30,
            right: 38,
            bottom: 20,
            containLabel:true
          },
          xAxis: {   //x轴
            type: 'category',
            boundaryGap: false,
            data: xPeopleNationArr,
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
          yAxis: {  //y轴
            type : 'value',
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
            splitLine: {  //将折线图的网格线变为虚线
              show: true,
              lineStyle:{
                type:'dashed',
                color: ['#666'],
              }
            },
            // 去除刻度线
            axisTick: {
              show: false
            }
          },
          series: [
            {
              data: yPeopleNationArr,
              type: 'line',
              color: '#00B5CD',
            }
          ]
        };
        myChartNumber.setOption(myChartNumberoption);
        // 自动轮播
        this.tootipTimer = tools.loopShowTooltip(myChartNumber, myChartNumberoption, {
          interval: 2000, // 轮播间隔时间
          loopSeries: true // 是否开启轮播循环
        });
        // 随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChartNumber.resize()
        })
    },

    //中间统计人口
    getPeopleStatistics(data){

        this.peopleStatisticsList = data
    },

    //人口比例（男）
    getPeopleProportionMan(data){

        // this.optionMan.title[0].text = data.total
        this.optionMan.title[0].text = 1564
        data.sexInfo.forEach((item) =>{
          console.log(item)
          this.optionMan.series[0].data.push(item)
        })
        const myChartMan = this.$echarts.init(this.$refs.manChart);
        myChartMan.setOption(this.optionMan);
        window.addEventListener("resize", () => { myChartMan.resize();});
    },

    //人口比例（女）
    getPeopleProportionWoman(data){

        this.optionWoman.title[0].text = 1627
        // this.optionWoman.title[0].text = data.total
        data.sexInfo.forEach((item) =>{
          console.log(item)
          this.optionWoman.series[0].data.push(item)
        })
        const myChartWoman = this.$echarts.init(this.$refs.womanChart);
        myChartWoman.setOption(this.optionWoman);
        window.addEventListener("resize", () => { myChartWoman.resize();});
    },

    //人口婚姻状况
    getPeopleMarry(data){
        var data = [
          {name: '未婚', value: 180},
          {name: '已婚', value: 902},
          {name: '再婚', value: 1},
          {name: '离异', value: 26},
          {name: '丧偶', value: 67}
        ];

        data.forEach((item) =>{
          this.optionMarriage.series[0].data.push({name: item.name, value: item.value})
        })
        const myChartMarriage = this.$echarts.init(this.$refs.marriageChart);
        myChartMarriage.setOption(this.optionMarriage);
        //自动轮播提示
        this.tootipTimer = tools.loopShowTooltip(myChartMarriage, this.optionMarriage, {
          interval: 2000, // 轮播间隔时间
          loopSeries: true // 是否开启轮播循环
        });
        // 自适应
        window.addEventListener("resize", () => { myChartMarriage.resize();});
    },

    //人口卡片
    getPeopleCard(data){

        this.peopleCardList = data
    },

    //服务群体
    getPeopleServiceGroup(data){
        console.log(data)
        data.forEach((item) =>{
          this.configGroup.data.push({name: item.name, value: item.value})
          this.configGroup = { ...this.configGroup };
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
  vertical-align: top;
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
.chartItem{
  width: 26%;
  height: 100%;
  z-index: 14;
  display: inline-block;
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
  height:158px;
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
  width: 100%;
  margin-top: 43px;
  text-align: center;
}
/*中间的左侧信息*/
.centerLeftBox{
  width: 24%;
  position: relative;
  top: -104%;
  left: 0;
  display: flex;
  flex-direction: column;
}
.centerLeftBox .party{
  padding: 8px;
  text-align: right;
}
/*中间的右侧信息*/
.centerRightBox{
  width: 24%;
  position: relative;
  top: -183%;
  left: 76%;
  display: flex;
  flex-direction: column;
}
.centerRightBox .party{
  padding: 13px 8px;
  text-align: left;
}
.centerRightBox .party .iconBox{
  font-size: 38px;
}
.party .iconBox{
  font-size: 48px;
}
.iconBox{
  background-image: linear-gradient(90deg, #0274FF,#00F4F6);
  -webkit-background-clip: text;
  color:transparent;
}
.party p{
  margin: 0;
  font-size: 30px;
  font-weight: bold;
  color: #AEB6BD;
}
.party .name{
  font-size: 18px;
}
/*实有人口数量*/
.peopleNumber{
  font-size: 22px;
  font-weight: bold;
  color: #00F5FD;
  padding: 12px 52px;
  border-radius: 12px;
  border: 1px solid #00DCF8;
  margin: 34px auto 0 auto;
  width: 50%;
  text-align: center;
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
/*折线图*/
.brokenLineBox{
  width: 100%;
  height: 200px;
  z-index: 15;
}
.brokenLine{
  width: 100%;
  height: 100%;
  padding: 14px 20px 20px 20px;
  z-index: 14;
}
</style>
