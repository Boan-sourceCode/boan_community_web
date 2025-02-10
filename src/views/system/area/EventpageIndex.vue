<!-- 事件督办首页 -->
<template>
  <div class="app-container">
    <!-- 网格 -->
    <el-form :model="queryParams">
      <el-form-item label="网格：" prop="areaId" style="display:inline-block; width: 20%">
        <treeSelect
          v-model="queryParams.areaId"
          :props="treeProps"
          :options="treeData"
          :value="value"
          :accordion="true"
          placeholder="请选择">
        </treeSelect>
      </el-form-item>
      <el-form-item label="时间范围：" style="display:inline-block; width: 20%">
          <el-select clearable filterable v-model="queryParams.timeRange" placeholder="请选择">
            <el-option
              v-for="dict in dict.type.time_range"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item style="display:inline-block;">
        <el-button size="medium" @click="click()"> 搜索 </el-button>
      </el-form-item>
      <!-- 高级查询 -->
      <el-form-item style="float: right">
        <el-button type="primary" plain size="medium"  @click="handleSenior()"> 高级查询 </el-button>
      </el-form-item>
    </el-form>
    <!-- 上报事件，完成事件柱状图 -->
    <div class="one">
      <div class="Escalation">
        <p>上报事件：{{this.reportSum}}</p>
        <div id="Columnarone"></div>
      </div>
      <div class="complete">
        <div class="Columnar">
          <p>完成事件：{{this.finishSum}}</p>
          <div id="Columnartwo"></div>
        </div>
        <div class="score">
          <div class="rate">
            <span class="number">{{this.finishPer}}</span><br>
            <span class="success">完成率</span>
          </div>
          <div class="flat">
            <span class="number">{{this.settleAvg}}</span><br>
            <span class="success">评价平均分</span>
          </div>
          <div class="Small">
            <span class="number">{{this.lessSixty}}</span><br>
            <span class="success">小于60分</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 流转类型 -->
    <div class="two">
      <div class="bgc1 circulation">
          <span class="icon-overtime eventIcon"/>
          <span class="time">超时流转事件：{{this.deferredAudit}}</span>
          <span class="Proportion">占比</span>
          <span class="Percent">{{this.deferredAuditPer}}</span>
      </div>
      <div class="bgc2 circulation">
        <span class="icon-normaltime eventIcon"/>
        <span class="time">正常事件：{{this.normal}}</span>
        <span class="Proportion">占比</span>
        <span class="Percent">{{this.normalPer}}</span>
      </div>
      <div class="bgc3 circulation">
        <span class="icon-circulation eventIcon"/>
        <span class="time">废弃事件：{{this.abandon}}</span>
        <span class="Proportion">占比</span>
        <span class="Percent">{{this.abandonPer}}</span>
      </div>
    </div>

    <!-- 近期事件走势图 -->
    <div class="trsee" id="trsee"></div>

    <!-- table表格 -->
    <div class="thenearfuture">
      <p class="p">近期事件：{{this.total}}</p>
      <el-table :data="tabList" :header-cell-style="{background:'#EBF7FF'}" stripe border >
        <el-table-column label="事件编号" prop="areaId" width="100" align="center"/>
        <el-table-column label="所属网格" prop="areaName" width="180" align="center"/>
        <el-table-column label="事件名称" prop="incidentName" width="170" align="center"/>
        <el-table-column label="事件来源" prop="incidentSource" align="center"/>
        <el-table-column label="登记时间" prop="registrationTime" width="154" align="center"/>
        <el-table-column label="事件发生时间" prop="dispatchTime" width="154" align="center"/>
        <el-table-column label="事件类别" prop="incidentCategory" align="center"/>
        <el-table-column label="事件规模" prop="incidentScale" align="center"/>
        <el-table-column label="事件等级" prop="incidentLevel" align="center"/>
        <el-table-column label="事件状态" prop="status" align="center"/>
        <el-table-column label="处理期限" prop="dispatchDeadline" width="154" align="center"/>
        <el-table-column label="上报人" prop="reportName" align="center"/>
        <el-table-column label="事件流转类型" prop="incidentType" width="110" align="center"/>
      </el-table>
      <p>共查询/检索{{this.total}}条信息</p>
      <!-- 分页 -->
      <pagination
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList()"
      />
    </div>

  </div>
</template>

<script>
import {areaTree} from "@/api/area/area";
import {getIncidentOfIndex,Columnarone,statistics,statisticsLine} from "@/api/area/event";
export default {
  dicts:['time_range'],
  data() {
    return {
      tabList:[], //表格数据
      total: 0,   // 总条数
      // 卡片查询参数
      queryParams: {
        userId:localStorage.getItem("userId"),
        pageNum: 1,    //当前页
        pageSize: 10,  //每页条数
        areaId:'',
        timeRange:'',
      },
      value:'',//选中的数据
      treeData: [], //下拉框数据
      cardData:[],  //卡片数据
      treeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
       bgc: ["bgc1", "bgc2", "bgc3"],
      //统计数据
      finishPer:'',  //完成率
      settleAvg:'',  //评价平均分
      lessSixty:'',  //小于60分
      deferredAudit:'',  //超时流转事件
      deferredAuditPer:'',  //超时流转事件百分比
      normal:'',  //正常事件
      normalPer:'',  //正常百分比
      abandon:'',  //废弃事件
      abandonPer:'',  //废弃事件百分比
      // 上报事件
      reportSum:'',  //上报事件总数
      reportData: {}, // 上报事件数据
      xReportArr: [], // X轴街道数组
      yReportArr: [], // Y轴数量数组
      // 完成事件
      finishSum:'',  //完成事件总数
      finishData: {}, // 完成事件数据
      xFinishArr: [], // X轴街道数组
      yFinishArr: [], // Y轴数量数组
      //折线图
      lineData:{},
      month:[],
      seriesReport: [], // 上报事件数据
      seriesFinish: [], // 完成事件数据
    };
  },
  mounted() {
    this.getTree(); // 调用网格树
  },
  methods: {
    // 查询网格树
    getTree() {
      let param = {
        userId:localStorage.getItem("userId"),
        flag:1
      }
      areaTree(param).then(res => {
        this.treeData = res.data
        this.queryParams.areaId = res.data[0].id
        this.getList();
        this.Shangshi();
        this.Finish()
        this.drawLine();
        this.statistics()
      })
    },

    //获取页面表格等数据
    getList() {
      this.loading = true;
      getIncidentOfIndex(this.queryParams).then(res => {
        this.tabList = res.rows;
        this.total = res.total;
        this.loading = false;
      });
    },

    //下拉框点击事件
    click(){
      console.log(this.queryParams)
      this.getList();
      this.Shangshi();
      this.Finish()
      this.drawLine();
      this.statistics()
    },

    //统计数据
    statistics(){
      let params = {
        userId:localStorage.getItem("userId"),
        areaId: this.queryParams.areaId,
        timeRange:this.queryParams.timeRange,
      }
      statistics(params).then(res => {
        this.finishPer = res.data.finishPer
        this.settleAvg = res.data.settleAvg
        this.lessSixty = res.data.lessSixty
        this.deferredAudit = res.data.deferredAudit
        this.deferredAuditPer = res.data.deferredAuditPer
        this.normal = res.data.normal
        this.normalPer = res.data.normalPer
        this.abandon = res.data.abandon
        this.abandonPer = res.data.abandonPer
      });
    },
    // 上报事件的柱状图
    Shangshi () {
      this.reportData = []
      this.xReportArr = []
      this.xReportArr = []
      let xReportArr = []
      let yReportArr = []
      let levelName = ''
      const report = this.$echarts.init(document.getElementById("Columnarone"))// 图标初始化
      let param = {
        userId:localStorage.getItem("userId"),
        tag:0,
        areaId: this.queryParams.areaId,
        timeRange:this.queryParams.timeRange,
      }
      Columnarone(param).then(res => {
        levelName = res.data.levelName
        this.reportSum = res.data.sum
        this.reportData = res.data.list
        for(let i=0;i<this.reportData.length; i++) {
          this.xReportArr[i] = this.reportData[i].areaNames
          this.yReportArr[i] = this.reportData[i].incidentCounts
        }
        xReportArr = this.xReportArr
        yReportArr = this.yReportArr
        report.setOption({
          xAxis:{
            name: levelName,
            type: 'category', //坐标轴类型
            data:xReportArr,
            triggerEvent:true,  //鼠标悬浮显示全部
            axisLabel:{
              interval:0,
              rotate:40,
              formatter:function (value){
                if (value.length > 5){
                  return`${value.slice(0,5)}...`;  //超出六个字截取并显示省略号
                }
                return value
              }
            },
          },
          yAxis:{
            name:"数量",
            type:"value"
          },
          series:[
            {
              type: "bar", // 类型为柱状图
              data: yReportArr,
              color:'#5081BE',
              barWidth: "20%", // 柱条宽度 每个柱条的宽度就是类目宽度的 20%
            }
          ]
        })
      })
      this.extension(report)
      // 随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        report.resize()
      })
    },

    // 完成事件的柱状图
    Finish () {
      this.finishData = []
      this.xFinishArr = []
      this.yFinishArr = []
      let xFinishArr = []
      let yFinishArr = []
      let levelName = ''
      const Finish = this.$echarts.init(document.getElementById("Columnartwo"))// 图标初始化
      let param = {
        userId:localStorage.getItem("userId"),
        tag:1,
        areaId: this.queryParams.areaId,
        timeRange:this.queryParams.timeRange,
      }
      Columnarone(param).then(res => {
        levelName = res.data.levelName
        this.finishSum = res.data.sum
        this.finishData = res.data.list
        for(let i=0;i<this.finishData.length; i++) {
          this.xFinishArr[i] = this.finishData[i].areaNames
          this.yFinishArr[i] = this.finishData[i].incidentCounts
        }
        xFinishArr = this.xFinishArr
        yFinishArr = this.yFinishArr
        Finish.setOption({
          xAxis:{
            name: levelName,
            type: 'category', //坐标轴类型
            data:xFinishArr,
            triggerEvent:true,  //鼠标悬浮显示全部
            axisLabel:{
              interval:0,
              rotate:40,
              formatter:function (value){
                if (value.length > 5){
                  return`${value.slice(0,5)}...`;  //超出六个字截取并显示省略号
                }
                return value
              }
            },
          },
          yAxis:{
            name:"数量",
            type:"value"
          },
          series:[
            {
              type: "bar", // 类型为柱状图
              data: yFinishArr,
              color:'#5081BE',
              barWidth: "20%", // 柱条宽度 每个柱条的宽度就是类目宽度的 20%
            }
          ]
        })
      })
      this.extension(Finish)
      // 随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        Finish.resize()
      })
    },

    //折线图
    drawLine(){
      this.monthData = {}
      this.seriesReport = []
      this.seriesFinish = []
      let month = [];
      let seriesReport = [];
      let seriesFinish = [];
      const Line = this.$echarts.init(document.getElementById("trsee"))// 图标初始化
      let param = {
        userId:localStorage.getItem("userId"),
        areaId: this.queryParams.areaId,
        timeRange:this.queryParams.timeRange,
      }
      statisticsLine(param).then(res => {
        this.lineData = res.data
        for(let i=0;i<this.lineData.report.length; i++) {
          this.month[i] = this.lineData.report[i].month
          this.seriesReport[i] = this.lineData.report[i].reportCount
        }
        for(let i=0;i<this.lineData.finish.length; i++) {
          this.seriesFinish[i] = this.lineData.finish[i].finishCount
        }
        month = this.month
        seriesReport = this.seriesReport
        seriesFinish = this.seriesFinish
        Line.setOption({
          title: {text: '近期事件走势图'},  //title图表的标题
          legend: {  //事件类型解释
            data: ['上报事件', '完成事件']
          },
          xAxis: {
            name: '月份', //名字
            data: month, //数据
            type: 'category', //坐标轴类型
            boundaryGap: false, //取消左侧的间距
          },
          yAxis: {
            name: '数量',
            type: 'value'
          },
          grid: { //图表位置
            left: '3%',
            right: '4%',
            bottom: '1%',
            top: '30%',
            containLabel: true //grid 区域是否包含坐标轴的刻度标签
          },
          series: [{
            name: '上报事件', //名字
            color: '#486BC8',  //颜色
            type: 'line',    //line（折线图）、bar（柱状图）、pie（饼图）、scatter（散点图）、graph（关系图）、tree（树图）、...
            data: seriesReport  //series的数据，对应着xAxis.data
          },
            {
              name: '完成事件',
              color: '#D48A3D',
              type: 'line',
              data: seriesFinish
            },]
        })
      })
      // 随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        Line.resize()
      })
    },

    //悬浮时显示所有的x轴名称
    extension(chart) {
      // 注意这里，是以X轴显示内容过长为例，如果是y轴的话，需要把params.componentType == 'xAxis'改为yAxis
      // 判断是否创建过div框,如果创建过就不再创建了
      // 该div用来盛放文本显示内容的，方便对其悬浮位置进行处理
      var elementDiv = document.getElementById('extension')
      if (!elementDiv) {
        var div = document.createElement('div')
        div.setAttribute('id', 'extension')
        div.style.display = 'block'
        document.querySelector('html').appendChild(div)
      }
      chart.on('mouseover', function (params) {
        if (params.componentType === 'xAxis' && params.targetType === 'axisLabel') {
          var elementDiv = document.querySelector('#extension')
          //设置悬浮文本的位置以及样式
          var elementStyle =
            'position: absolute;z-index: 99999;color: #fff;font-size: 12px;padding: 5px;display: inline;border-radius: 4px;background-color: #303133;box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px'
          elementDiv.style.cssText = elementStyle
          elementDiv.innerHTML = params.value
          document.querySelector('html').onmousemove = function (event) {
            var elementDiv = document.querySelector('#extension')
            var xx = event.pageX + 10
            var yy = event.pageY - 30
            elementDiv.style.top = yy + 'px'
            elementDiv.style.left = xx + 'px'
          }
        }
      })
      chart.on('mouseout', function (params) {
        //注意这里，我是以X轴显示内容过长为例，如果是y轴的话，需要改为yAxis
        if (params.componentType === 'xAxis' && params.targetType === 'axisLabel') {
          var elementDiv = document.querySelector('#extension')
          elementDiv.style.cssText = 'display:none'
        }
      })
    },

    //高级查询按钮跳转页面
    handleSenior() {
      const src = `/Eventpage/EventpageSenior`;
      this.$router.push({
        path: src,
      })
    },
  }
};
</script>
<style scoped>
/* 近期事件表格样式 */
.thenearfuture{
  margin-top: 10px;
}

.thenearfuture .p{
  margin-left: 10px;
  height: 18px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #000000;
}

/* 上报事件，完成事件柱状图样式 */
.one{
  width: 100%;
  height: 340px;
  overflow: hidden;
}
/* 上报事件 */
.one .Escalation{
  width: 42%;
  height: 312px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  float: left;
  border-radius: 5px;
  margin: 12px;
}

.one .Escalation p{
  height: 18px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #000000;
  margin-left: 28px;
}

.one .Escalation #Columnarone{
  height: 255px;
}

/* 完成事件 */
.one .complete{
  width: 55%;
  height: 312px;
  float: left;
  margin: 12px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.one .complete .Columnar{
  width: 760px;
  height: 312px;
  float: left;
}

.one .complete .Columnar #Columnartwo{
  height: 255px;
  width: 750px;
}

.one .complete .Columnar p{
  height: 18px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #000000;
  margin-left: 28px;
}

.one .complete .score{
  width: 135px;
  height: 312px;
  float: left;
}

.one .complete .score .rate{
  width: 112px;
  height: 70px;
  background-color:#3BC2B4;
  margin-top: 30px;
  border-radius: 5px;
  text-align: center;
}

.one .complete .score .flat{
  width: 112px;
  height: 70px;
  background-color:#5C6BC0;
  margin-top: 20px;
  border-radius: 5px;
  text-align: center;
}

.one .complete .score .Small{
  width: 112px;
  height: 70px;
  background-color:#FF933E;
  margin-top: 20px;
  border-radius: 5px;
  text-align: center;
}

.one .complete .score .number{
  font-size: 29px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #FFFFFF;
  display: inline-block;
  margin-top: 5px;
}

.one .complete .score .success{
  font-size: 14px;
  font-family: Microsoft YaHei;
  color: #FFFFFF;
  display: inline-block;
}
/* 流转类型 */
.two{
  width: 100%;
  height: 120px;
  overflow: hidden;
}
.two .circulation{
  width: 32%;
  height: 92px;
  float: left;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.two .circulation .eventIcon{
  position: relative;
  top: 15px;
  left: 20px;
  font-size: 64px;
}

.two .circulation .time{
  position: relative;
  top: -8px;
  left: 40px;
  height: 18px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
}

.two .circulation .Proportion{
  position: relative;
  top: -8px;
  left: 70px;
  height: 18px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #000000;
}

.two .circulation .Percent{
  position: relative;
  top: -1px;
  left: 90px;
  height: 31px;
  font-size: 40px;
  font-family: Source Han Sans CN;
  font-weight: bold;
}

.two  .bgc1 .time{
  color: #F27463;
}
.two  .bgc1 .eventIcon{
  color: #F27463;
}
.two  .bgc1 .Percent{
  color: #F27463;
}

.bgc2 {
  margin-left: 6px;
  margin-right: 6px;
}

.two  .bgc2 .time{
  color: #3BC2B4;
}
.two  .bgc2 .eventIcon{
  color: #3BC2B4;
}
.two  .bgc2 .Percent{
  color: #3BC2B4;
}

.two  .bgc3 .time{
  color: #FF933E;
}
.two  .bgc3 .eventIcon{
  color: #FF933E;
}
.two  .bgc3 .Percent{
  color: #FF933E;
}

/* 近期事件走势图 */
.trsee{
  width: 100%;
  min-height: 422px;
  border-radius: 5px;
  margin-top: 10px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.trsee p{
  margin-left: 10px;
  height: 18px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #000000;
}

</style>
