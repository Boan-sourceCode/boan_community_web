<!--首页组件-->
<template>
  <div>
    <!--左侧-->
    <div class="box">
      <!--党建数字-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">党建数字</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="information" style="padding: 8px 70px">
            <div class="party">
              <div class="partyItem" style="color: #FFC74A">
                <div class="iconBox">
                  <span class="icon-organize"></span>
                </div>
                <div class="content">
                  <p class="number">1</p>
                  <p class="name">党组织</p>
                </div>
              </div>
              <!-- <div class="partyItem" style="color: #F78FB2">
                <div class="iconBox">
                  <span class="icon-trophy"></span>
                </div>
                <div class="content">
                  <p class="number">{{this.partyList.honorParty}}</p>
                  <p class="name">优秀党组织</p>
                </div>
              </div> -->
              <div class="partyItem" style="color: #F78FB2">
                <div class="iconBox">
                  <span class="icon-personnel"></span>
                </div>
                <div class="content">
                  <p class="number">330</p>
                  <p class="name">党员总数</p>
                </div>
              </div>
            </div>
            <div class="party">
              <div class="partyItem" style="color: #26FFB2">
                <div class="iconBox">
                  <span class="icon-edit"></span>
                </div>
                <div class="content">
                  <p class="number">62</p>
                  <p class="name">直管党员</p>
                </div>
              </div>
              <div class="partyItem" style="color: #20E2E4">
                <div class="iconBox">
                  <span class="icon-Medal"></span>
                </div>
                <div class="content">
                  <p class="number">188</p>
                  <p class="name">在职党员</p>
                </div>
              </div>
            </div>
            <div class="party">
              <div class="partyItem" style="color: #F5D794">
                <div class="iconBox">
                  <span class="icon-user"></span>
                </div>
                <div class="content">
                  <p class="number">14</p>
                  <p class="name">流动党员</p>
                </div>
              </div>
              <div class="partyItem" style="color: #ff227c">
                <div class="iconBox">
                  <span class="icon-bookmark"></span>
                </div>
                <div class="content">
                  <p class="number">66</p>
                  <p class="name">退休党员</p>
                </div>
              </div>
            </div>
          </div>
        </dv-border-box-12>
      </div>
      <!--实有人口-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">实有人口</p>
        </div>
        <dv-border-box-12 style="height: 13rem;" :color="color" :backgroundColor="backgroundColor">
          <div class="chartBox" style="height: 13rem;">
            <div ref="chartPeople" id="chartPeople" class="chart"></div>
          </div>
        </dv-border-box-12>
      </div>
      <!--实有建筑-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">性别比例</p>
        </div>
        <dv-border-box-12 style="height: 11rem;"  :color="color" :backgroundColor="backgroundColor">
          <div class="brokenLineBox" style="height: 11rem;" >
            <div ref="manChart" id="manChart" class="chartItem"></div>
            <div ref="womanChart" id="womanChart" class="chartItem"></div>
          </div>
        </dv-border-box-12>
        <!-- <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="capsuleBox">
            <dv-capsule-chart :config="configBuild" class="capsule" />
          </div>
        </dv-border-box-12> -->
      </div>
    </div>
    <!--中间-->
    <div class="box" style="width: 42%">
      <!--地图-->
      <div class="mapBox" style="display: none;">
        <dv-border-box-10>
          <div id="container" class="map"></div>
        </dv-border-box-10>
      </div>
      <!-- 20230520演示新增内容**********************************开始 -->
      <ul class="centerImg_title">
        <li class="center_h">
          <dv-border-box-12>
            <h3>人口</h3>
            <!-- <p>{{this.informationList.peopleNum}}</p> -->
            <p>3191</p>
          </dv-border-box-12>
        </li>
        <li class="center_h">
          <dv-border-box-12>
            <h3>房屋</h3>
            <!-- <p>{{this.informationList.houseNum}}</p> -->
            <p>1574</p>
          </dv-border-box-12>
        </li>
        <li class="center_h">
          <dv-border-box-12>
            <h3>面积(m&sup2;)</h3>
            <p>291700</p>
          </dv-border-box-12>
        </li>
      </ul>
      <ul class="meter">
        <li>
          <div class="imgRotate"></div>
          <p>党组织</p>
          <!-- <span>{{this.partyList.party}}</span> -->
          <span>1</span>
        </li>
        <li>
          <div class="imgRotate"></div>
          <p>三会一课</p>
          <!-- <span>{{this.partyList.meetingCount}}</span> -->
          <span>8</span>
        </li>
        <li>
          <div class="imgRotate"></div>
          <p>企业</p>
          <!-- <span>{{this.informationList.enterNum}}</span> -->
          <span>1</span>
        </li>
        <li>
          <div class="imgRotate"></div>
          <p>医院</p>
          <!-- <span>{{this.informationList.hospital}}</span> -->
          <span>1</span>
        </li>
        <li>
          <div class="imgRotate"></div>
          <p>学校</p>
          <!-- <span>{{this.informationList.school}}</span> -->
          <span>1</span>
        </li>
      </ul>
      <div class="chartBox" style="width: 50%;display: inline-block;">
        <div ref="chartAge" id="chartAge" class="chart"></div>
      </div>
      <div class="chartBox" style="width: 50%;display: inline-block;">
        <div ref="marriageChart" id="marriageChart" class="chart" style=""></div>
      </div>
      <!--党员分布-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">党员分布</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="brokenLineBox">
            <dv-scroll-board :config="configName" class="brokenLine"/>
          </div>
        </dv-border-box-12>
      </div>
      <!-- 20230520演示新增内容**********************************结束 -->
      <!--底部展示-->
      <div class="leftBox" style="padding: 0;display: none;">
        <div class="information" style="padding: 44px 0 0 0">
          <div class="center">
            <div class="centerItem" style="color: #10B9F8">
              <div class="iconBox">
                <span class="icon-areadata"></span>
              </div>
              <div class="content">
                <p class="number">{{this.bigNumberTransform(this.informationList.measureNum)}}</p>
                <p class="name">面积(m&sup2;)</p>
              </div>
            </div>
            <div class="centerItem" style="color: #F78FB2">
              <div class="iconBox">
                <span class="icon-personnel"></span>
              </div>
              <div class="content">
                <p class="number">{{this.informationList.peopleNum}}</p>
                <!-- <p class="number">70644</p> -->
                <p class="name">人口</p>
              </div>
            </div>
            <div class="centerItem" style="color: #F5D794">
              <div class="iconBox">
                <span class="icon-house"></span>
              </div>
              <div class="content">
                <p class="number">{{this.informationList.houseNum}}</p>
                <!-- <p class="number">31477</p> -->
                <p class="name">房屋</p>
              </div>
            </div>
          </div>
          <div class="center">
            <div class="centerItem" style="color: #FFFFFF">
              <div class="iconBox">
                <span class="icon-institution"></span>
              </div>
              <div class="content">
                <p class="number">{{this.informationList.enterNum}}</p>
                <!-- <p class="number">34</p> -->
                <p class="name">企业</p>
              </div>
            </div>
            <div class="centerItem" style="color: #F65E5D">
              <div class="iconBox">
                <span class="icon-hospital"></span>
              </div>
              <div class="content">
                <p class="number">{{this.informationList.hospital}}</p>
                <!-- <p class="number">5</p> -->
                <p class="name">医院</p>
              </div>
            </div>
            <div class="centerItem" style="color: #3ED992">
              <div class="iconBox">
                <span class="icon-school"></span>
              </div>
              <div class="content">
                <p class="number">{{this.informationList.school}}</p>
                <!-- <p class="number">10</p> -->
                <p class="name">学校</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--右侧-->
    <div class="box">
      <!--数据展示-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">数据展示</p>
        </div>
        <dv-border-box-12 :color="color" :backgroundColor="backgroundColor">
          <div class="information dataBox">
            <div class="right">
              <div class="rightItem" style="color: #F78FB2">
                <!-- <p class="number">{{this.informationList.areaNum}}</p> -->
                <p class="number">3</p>
                <p class="name">网格数量</p>
              </div>
              <div class="rightItem" style="color: #C23EFF">
                <p class="number">{{this.informationList.buildingNum}}</p>
                <!-- <p class="number">2303</p> -->
                <p class="name">实有建筑</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #F09F38">
                <!-- <p class="number">{{this.informationList.permanentNum}}</p> -->
                <p class="number">2854</p>
                <p class="name">常住人口</p>
              </div>
              <div class="rightItem" style="color: #FF227C">
                <p class="number">{{this.informationList.registeredNum}}</p>
                <!-- <p class="number">67918</p> -->
                <p class="name">户籍人口</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #3BC2B4">
                <p class="number">{{this.informationList.newGroup}}</p>
                <!-- <p class="number">34</p> -->
                <p class="name">新经济组织</p>
              </div>
              <div class="rightItem" style="color: #60FF5C">
                <p class="number">{{this.informationList.institutions}}</p>
                <!-- <p class="number">0</p> -->
                <p class="name">事业单位</p>
              </div>
            </div>
            <div class="right">
              <div class="rightItem" style="color: #FFCE00">
                <!-- <p class="number">{{this.informationList.partyGroup}}</p> -->
                <p class="number">5</p>
                <p class="name">党政机关</p>
              </div>
              <div class="rightItem" style="color: #45A2FF">
                <p class="number">{{this.informationList.countryGroup}}</p>
                <p class="name">国家机关</p>
              </div>
            </div>
          </div>
        </dv-border-box-12>
      </div>
      <!--网格微站-->
      <div class="leftBox">
        <hr class="leftLine"/>
        <hr class="rightLine"/>
        <div class="boxTitle">
          <p class="title">网格微站</p>
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
import AMapLoader from "@amap/amap-jsapi-loader";
import { selectIndexData,partyNumber,peopleType,eventTrends,peopleAge,buildingInformation } from "@/api/area/largeScreen";
export default {
  name: "index",
  data(){
    return{
      partyList:{}, //党建数字
      informationList:{}, //中间下方模块信息
      eventData:{}, //事件趋势图
      season:[], //季度
      incidentNum:[], //值
      color:['#1064B0', '#59bdf7'],  //边框颜色
      backgroundColor:'rgba(3,26,84,0.5)',   //边框背景色
      //建筑名称轮播表
      configName: {
        header: ['楼栋','党员总数', '直管党员','在职党员','退休党员','居民党员'],
        rowNum:4,
        rowHeight:31,
        headerBGC: "rgba(0,0,0,0)",  //表头背景色
        oddRowBGC: "rgba(0,0,0,0)",  //奇数行背景色
        // evenRowBGC: "rgba(16,100,176,0.2)",  //偶数行背景色
        evenRowBGC: "rgba(20,51,124,0.5)",  //偶数行背景色
        data: [
          ['天玺小区5号楼',55,8,31,14,2],
          ['天玺小区6号楼',62,12,35,14,1],
          ['天玺小区7号楼',61,14,34,13,1],
          ['天玺小区8号楼',46,11,31,3,1],
          ['天玺小区9号楼',59,10,34,13,2],
          ['天玺小区11号楼',36,5,19,10,2]
        ]
      },
      //服务群体胶囊图
      configGroup: {
        data: [],
        colors: ['#0273FF', '#E973FE', '#02FF86'],
        showValue: true,
        xAxis:{
          "show":false,
        },
        data: [
          {name: '网格微站', value: 3},
          {name: '网格员', value: 3},
          {name: '网辅员', value: 24},
          {name: '党员', value: 10}
        ]
      },
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
            radius: ['34%', '80%'],
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
            radius: ['34%', '40%'],
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
            radius: ['34%', '40%'],
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
          left:'43%',
          top:'45%',
          z:14,
          style:{
            text:'婚姻',
            textAlign:'center',
            fill:'#fff',
            font:'bolder 22px 微软雅黑'
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['34%', '65%'],
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
      //实有人口饼图
      optionPeople : {
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
            text:'人口',
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
            //roseType: 'radius',  //将饼图变为南丁格尔玫瑰图
            label: {  //隐藏指引线
              show: false,
              formatter: '{d}%'
            },
            emphasis: {  //选中时显示指引线
              label: {
                show: true
              }
            },
            color:['#10B9F8','#FF6A6A','#90ED7D','#F7A35C','#8085E9','#920783','#E4D354','#0273FF'],
            data:[],
          },
        ]
      },
      //实有建筑胶囊图
      configBuild:{
        data:[],
        colors: ['#0273FF', '#E973FE', '#02FF86'],
        showValue: true,
        xAxis:{
          "show":false,
        }
      },
      map: null,  //地图
    }
  },
  mounted() {
    this.initAMap();
    this.selectIndexData();
    // this.getEvent(); //获取事件趋势图
    this.getBuildingInformation(); //建筑名称
  },
  methods:{
    //初始化地图
    async initAMap() {
      window._AMapSecurityConfig = {
        securityJsCode:'e2bc5aa4293feefd736ef345549aaa79',
      }
      let AMap = await AMapLoader.load({
        key: '4e1c48b4317ccc211cacdc9dde63e5ef',  //设置您的key
        version: "2.0",
        plugins: [],
        Loca: {
          version: "2.0"
        },
      })
      //初始化地图
      this.map = new AMap.Map("container", {
        viewMode: "2D",
        zoom: 15,
        center:[112.549656,37.870451],
        mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
      });
    },
    selectIndexData(){
      let param = {
        userId:localStorage.getItem("userId"),
        flag:0,
      }
      selectIndexData(param).then(res => {
        this.getParty(res.data.partyInfo); //获取党建数字
        this.getPeople(res.data.peopleIndexInfo); //获取实有人口饼图
        this.getBuild(res.data.buildingIndexInfo); //获取实有建筑胶囊图
        this.getInformation(res.data.indexInfo); //获取中间下方模块信息
      })
      peopleAge(param).then(res => {
        this.getPeopleAge(res.data.peopleAge);
        this.getPeopleMarry(res.data.marryInfo);   //人口婚姻状况
        this.getPeopleProportionMan(res.data.peopleProportion.maleInfo);   //人口比例（男）
        this.getPeopleProportionWoman(res.data.peopleProportion.femaleInfo);   //人口比例（女）
      })
    },
    //获取党建数字
    getParty(data){
        this.partyList = data
    },

    //获取实有人口饼图
    getPeople(data){
      console.log(data)
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
          this.optionPeople.series[0].data.push({name: item.name, value: item.value})
        })
        this.init();
    },

    //渲染饼图
    init(){
      // 已在main.js中全局引入echarts
      //引入多个echarts
      var myChartPeople = this.$echarts.init(this.$refs.chartPeople);
      // 使用刚指定的配置项和数据显示图表。
      myChartPeople.setOption(this.optionPeople);

      this.tootipTimer = tools.loopShowTooltip(myChartPeople, this.optionPeople, {
        interval: 2000, // 轮播间隔时间
        loopSeries: true // 是否开启轮播循环
      });
      //跟随窗口大小改变
      window.addEventListener("resize", () => { myChartPeople.resize();});
    },

    //获取实有建筑胶囊图
    getBuild(data){
      data.forEach((item) =>{
          this.configBuild.data.push({name: item.name, value: item.value})
          this.configBuild = { ...this.configBuild };
        })
    },

    //获取中间下方模块信息和数据展示
    getInformation(data){
      console.log(data)
        this.informationList = data
    },

    //获取事件趋势图  // 六类分类
    getEvent(){
      this.eventData = {}
      this.season = []
      this.incidentNum = []
      let season = [];
      let incidentNum = [];
      const myChartEvent = this.$echarts.init(document.getElementById("chartEvent"))
      let param = {
        userId:localStorage.getItem("userId"),
      }
      eventTrends(param).then(res => {
        this.eventData = res.data
        for(let i=0;i<this.eventData.length; i++) {
          this.season[i] = this.eventData[i].season
          this.incidentNum[i] = this.eventData[i].incidentNum
        }
        season = this.season
        incidentNum = this.incidentNum
        var mycharteventoptions = {
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
            data: ['网格微站','网格员','网辅员','党员'],
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
              data:['20','30','40','50'],
            }
          ]
        };
        myChartEvent.setOption(mycharteventoptions);
        this.tootipTimer = tools.loopShowTooltip(myChartEvent, mycharteventoptions, {
          interval: 2000, // 轮播间隔时间
          loopSeries: true // 是否开启轮播循环
        });
      })
      // 随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChartEvent.resize()
      })
    },
    bigNumberTransform (value) {
      const newValue = ['', '', '']
      let fr = 1000
      let num = 3
      let text1 = ''
      let fm = 1
      while (value / fr >= 1) {
        fr *= 10
        num += 1
        // console.log('数字', value / fr, 'num:', num)
      }
      if (num <= 4) { // 千
        newValue[0] = parseInt(value / 1000) + ''
        newValue[1] = '千'
      } else if (num <= 8) { // 万
        text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
        // tslint:disable-next-line:no-shadowed-variable
        fm = text1 === '万' ? 10000 : 10000000
        if (value % fm === 0) {
          newValue[0] = parseInt(value / fm) + ''
        } else {
          newValue[0] = parseFloat(value / fm).toFixed(1) + ''
        }
        newValue[1] = text1
      } else if (num <= 16) { // 亿
        text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
        text1 = (num - 8) / 4 > 1 ? '万亿' : text1
        text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
        // tslint:disable-next-line:no-shadowed-variable
        fm = 1
        if (text1 === '亿') {
          fm = 100000000
        } else if (text1 === '千亿') {
          fm = 100000000000
        } else if (text1 === '万亿') {
          fm = 1000000000000
        } else if (text1 === '千万亿') {
          fm = 1000000000000000
        }
        if (value % fm === 0) {
          newValue[0] = parseInt(value / fm) + ''
        } else {
          newValue[0] = parseFloat(value / fm).toFixed(2) + ''
        }
        newValue[1] = text1
      }
      if (value < 1000) {
        newValue[0] = value + ''
        newValue[1] = ''
      }
      return newValue.join('')
    },
    // 20230520新增****************************//
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
    //建筑名称
    getBuildingInformation(){
      let param = {
        userId:localStorage.getItem("userId"),
      }
      buildingInformation(param).then(res => {
        res.data.forEach((item) =>{
          console.log(item)
          //this.configName.data.push()
          this.configName = { ...this.configName };
        })
      })
    },
    //人口比例（男）
    getPeopleProportionMan(data){
        this.optionMan.title[0].text = 1564
        data.sexInfo.forEach((item) =>{
          console.log(item)
          this.optionMan.series[0].data.push(item)
        })
        const myChartMan = this.$echarts.init(this.$refs.manChart);
        myChartMan.setOption(this.optionMan);
        // 自适应
        window.addEventListener("resize", () => { myChartMan.resize();});
    },

    //人口比例（女）
    getPeopleProportionWoman(data){
        this.optionWoman.title[0].text = 1627
        data.sexInfo.forEach((item) =>{
          console.log(item)
          this.optionWoman.series[0].data.push(item)
        })
        const myChartWoman = this.$echarts.init(this.$refs.womanChart);
        myChartWoman.setOption(this.optionWoman);
        window.addEventListener("resize", () => { myChartWoman.resize();});
    },
  }
}
</script>

<style scoped>
/*三个布局div*/
/* 新增样式 */
/deep/.dv-capsule-chart .label-column div {
    height: 1rem !important;
    line-height: 1rem !important;
}
/deep/.dv-capsule-chart .capsule-item {
    box-shadow: 0 0 0.1875rem #999;
    height: 0.625rem;
    margin: 0.9rem;
    border-radius: 0.3125rem;
}
/deep/.dv-scroll-board .rows{
  height: 140px !important;
}
/deep/.dv-scroll-board .header{
  padding-top: 15px;
  color: #00F5FD;
  border-bottom: 1px solid;
  border-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #1064B0 50%, rgba(255, 255, 255, 0) 99%) 2 2 2 2;
}
/deep/.dv-scroll-board .rows .ceil:first-child{
  color: #00F5FD;
}
.chartItem{
  width: 50%;
  height: 100%;
  z-index: 14;
  display: inline-block;
}
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
.centerImg_title{
    display: flex;
    justify-content: space-evenly;
    padding-top: 1.17647rem;
    height: 10vh;
    margin-top: 2rem;
    padding: 0;
}
.centerImg_title li {
    list-style: none;
    width: 25%;
    height: 5.47059rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
    text-align: center;
    /*background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAAByCAYAAAArm//rAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5OGFjYzA4Yi1jYTUxLWZmNDAtYmQ2MC1mNzIzNDRiZjc0MmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTU1NEM4REQzNjZCMTFFQUIwRTBGNDZBMzAzNjA4MjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTU1NEM4REMzNjZCMTFFQUIwRTBGNDZBMzAzNjA4MjkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI5ODBhZWY0LTU2OWUtYmE0Ny1iMWYwLTk0M2Q3Zjk1MTI4NyIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjI1NzIzYzI0LTU4MjEtOWE0Ny1iMzRhLWQwNWNi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);*/
}
/* .centerImg_title li::before{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

} */
.centerImg_title li h3 {
    margin-top: 0.58824rem;
    font-size: 1.21176rem;
    color: #fff;
    margin-bottom: 0.6rem;
    padding-top: 12px;
}
.centerImg_title li p{
    font-size: 1.55882rem;
    color: #fff;
    font-weight: 700;
    margin: 0;
}
.meter{
    margin-top: 3.52941rem;
    display: flex;
    justify-content: space-evenly;
    height: 13.2vh;
    padding: 0;
}
.meter li{
    width: 7.64706rem;
    height: 7.64706rem;
    color: #fff;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.17647rem;
}
.meter li .imgRotate {
    width: 100%;
    height: 100%;
    background: url('../../../../assets/images/circleDark.png') no-repeat;
    background-size: 100% auto;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    animation: ROTATE-data-v-1aa66f40 5s linear infinite;
    transition: all .25s;
}
@keyframes ROTATE-data-v-1aa66f40 {
    0% {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(1turn)
    }
}
.meter li p{
    font-size: .94118rem;
    color: #fff;
}
.meter li span{
    font-size: 1.41176rem;
    /* color: #00fff6; */
    color: #ffffff;
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
.party{
  padding: 8px 0;
  border-bottom: 1px solid #00E7F2;
  display: flex;
  justify-content: space-between;
}
.party:last-child{
  border-bottom: none;
}
.partyItem{
  /*width: 50%;*/
  display: inline-block;
  text-align: left;
}
.iconBox{
  display: inline-block;
  font-size: 44px;
}
.content{
  display: inline-block;
}
.number{
  margin: 0;
  font-size: 24px;
}
.name{
  margin: 0;
  font-size: 12px;
}
/*饼图*/
.chartBox{
  width: 100%;
  height: 184px;
  z-index: 14;
}
.chart{
  width: 100%;
  height: 100%;
  padding-right:80px;
  z-index: 14;
}
/*胶囊图单位*/
.capsuleBox{
  padding: 20px 40px;
  margin-right: 20px;
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
/*地图*/
.mapBox{
  height: 456px;
  width: 100%;
  margin-bottom: 10px;
}
.map{
  height: 440px;
  width: 98%;
  margin-top: 50px;
  position: relative;
  top: 8px;
  left: 8px;
}
/*去除高德logo和版本号*/
/deep/.amap-logo{
  display: none;
  opacity:0 !important;
}
/deep/.amap-copyright {
  opacity:0;
}
.center{
  padding: 5px 0;
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
.centerItem p{
  margin: 4px;
}
.centerItem .iconBox{
  font-size: 64px;
  padding: 0 10px;
}
.centerItem .number{
  font-size: 36px;
}
.centerItem .name{
  font-size: 18px;
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
.dataBox{
  min-height: 456px;
}
/*折线图*/
.brokenLineBox{
  width: 100%;
  height: 200px;
  z-index: 14;
}
.brokenLine{
  width: 100%;
  height: 100%;
  padding:0 20px;
  z-index: 14;
}
</style>
