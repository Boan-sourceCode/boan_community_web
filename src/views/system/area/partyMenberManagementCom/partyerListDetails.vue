<!--党员详情-->
<template>
  <div class="app-container">
    <h4 class="h4">党员画像</h4>
    <!--左侧区域-->
    <div class="box left-box">
      <div class="information-top">
      	<p>基本信息</p>
        <div class="image">
          <!--<el-image :src="require('@/assets/images/partyImg.jpg')" :fit="fit" class="img" v-if="this.headPortrait === null || this.headPortrait === ''"></el-image>
          <el-image :src="this.headPortrait" :fit="fit" class="img" v-else></el-image>-->
          <img :src="this.headPortrait?this.headPortrait:image" class="img" />
        </div>
      </div>
      <div class="information-bottom">
        <p>姓名：{{ this.peopleData.name }}</p>
        <p>性别：{{ this.peopleData.sex }}</p>
        <p>出生日期：{{ this.peopleData.formatBirthday }}</p>
        <p v-if="this.peopleData.nation !== '' && this.peopleData.nation !== null">民族：{{ this.peopleData.nation }}</p>
        <p v-else>民族：暂无</p>
        <p v-if="this.peopleData.idCard !== '' && this.peopleData.idCard !== null">身份证号：{{ this.peopleData.idCard }}</p>
        <p v-else>身份证号：暂无</p>
        <p v-if="this.peopleData.nativePlace !== '' && this.peopleData.nativePlace !== null">籍贯：{{ this.peopleData.nativePlace }}</p>
        <p v-else>籍贯：暂无</p>
        <p v-if="this.peopleData.qualification !== '' && this.peopleData.qualification !== null">学历：{{ this.peopleData.qualification }}</p>
        <p v-else>学历：暂无</p>
        <p v-if="this.peopleData.graduationSchool !== '' && this.peopleData.graduationSchool !== null">毕业院校: {{ this.peopleData.graduationSchool }}</p>
        <p v-else>毕业院校: 暂无</p>
        <p v-if="this.peopleData.phoneNumber !== '' && this.peopleData.phoneNumber !== null">联系方式：{{ this.peopleData.phoneNumber }}</p>
        <p v-else>联系方式：暂无</p>
        <p v-if="this.peopleData.address !== '' && this.peopleData.address !== null">
          现住址:<br />
          {{ this.peopleData.address }}
        </p>
        <p v-else>现住址：暂无</p>
      </div>
    </div>
    <!--中间区域-->
    <div class="box center-box">
      <div ref="graph" id="graph" class="graph"></div>
    </div>
    <!--右侧区域-->
    <div class="right-box">
      <div class="politics">
        <h3 class="fontColor" style="color: #000000">党内信息</h3>
        <div class="contents">
          <p v-if="this.peopleData.flowFlag === 1">所属党支部：{{ this.peopleData.partyName }}</p>
          <p v-if="this.peopleData.flowFlag === 0">流动党支部：{{ this.peopleData.flowInfo.beforePartyName }}</p>
          <p v-if="this.peopleData.flowFlag === 0">当前党支部：{{ this.peopleData.flowInfo.partyName }}</p>
          <p v-if="this.peopleData.flowFlag === 0 && this.peopleData.flowInfo.createTime !== null && this.peopleData.flowInfo.createTime !== ''">申请时间：{{ this.peopleData.flowInfo.createTime }}</p>
          <p v-else-if="this.peopleData.flowFlag === 0 && this.peopleData.flowInfo.createTime === null">申请时间：暂无</p>
          <p v-else-if="this.peopleData.flowFlag === 0 && this.peopleData.flowInfo.createTime === ''">申请时间：暂无</p>
          <p v-if="this.peopleData.flowFlag === 0 && this.peopleData.flowInfo.transoutReason !== null && this.peopleData.flowInfo.transoutReason !== ''">申请原因：{{ this.peopleData.flowInfo.transoutReason }}</p>
          <p v-else-if="this.peopleData.flowFlag === 0 && this.peopleData.flowInfo.transoutReason === null">申请原因：暂无</p>
          <p v-else-if="this.peopleData.flowFlag === 0 && this.peopleData.flowInfo.transoutReason === ''">申请原因：暂无</p>
          <p v-if="this.peopleData.partyOccupation !== '' &&  this.peopleData.partyOccupation !== null">所属职务：{{ this.peopleData.partyOccupation }}</p>
          <p v-else>所属职务：暂无</p>
          <p v-if="this.peopleData.applyJoinpartyTime !== '' &&  this.peopleData.applyJoinpartyTime !== null">申请入党：{{ this.peopleData.applyJoinpartyTime }}</p>
          <p v-else>申请入党：暂无</p>
          <p v-if="this.peopleData.officiaJoinpartyTime !== '' &&  this.peopleData.officiaJoinpartyTime !== null">正式入党：{{ this.peopleData.officiaJoinpartyTime }}</p>
          <p v-else>正式入党：暂无</p>
          <p v-if="this.peopleData.wonHonorRemark !== '' &&  this.peopleData.wonHonorRemark !== null">党员荣誉：{{ this.peopleData.wonHonorRemark }}</p>
          <p v-else>党员荣誉：暂无</p>
          <p style="padding-bottom: 14px">个人党龄：{{ this.peopleData.partyAge }}年</p>
        </div>
      </div>
      <div class="politics" style="margin-top: 24px">
        <h3 class="fontColor" style="color: #000000">党内缴费记录</h3>
        <div class="contents">
          <p class="right-con" v-for="item in peopleData.partyDueInfo">
            <span>{{ item.duesTime }}</span><span>缴费{{ item.duesAmount }}元</span>
          </p>
          <p v-if="this.cost !== 0" class="cost">累计缴费金额：{{ this.peopleData.duesAmount }}元</p>
          <p v-else class="empty">暂无记录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberDetails,memberGraph } from "@/api/area/partymember";
export default {
  name: "partyerListDetails",
  data() {
    return {
      peopleData: [], //人员详情数据
      fit: "contain", // img图片填充方式
      headPortrait: "", //人员头像
      relationshipData:[], //人员关系缴费数据
      cost:'',  //党员缴费数据是否有值
      image:require('@/assets/images/partyImg.jpg')
    };
  },
  mounted() {
    this.getList();
    this.relationship();
  },
  methods: {
    //获取页面数据
    getList() {
      this.loading = true;
      let param = {
        id : this.$route.query.id
      }
      memberDetails(param).then((res) => {
        if (res.code === 200) {
          this.peopleData = res.data;
          this.cost = res.data.partyDueInfo.length
          if (this.peopleData.headPortrait !== "" && this.peopleData.headPortrait !== null) {
            this.headPortrait = process.env.VUE_APP_BASE_API + this.peopleData.headPortrait;
          } else {
            this.headPortrait = "";
          }
        }
      });
    },

    //人员关系图表
    relationship() {
      let memberGraphData = []
      let memberGraphLinks = []
      const myGraph = this.$echarts.init(this.$refs.graph);
      let param = {
        id : this.$route.query.id
      }
      memberGraph(param).then((res) => {
        this.relationshipData = res.data
        memberGraphData = res.data.data
        memberGraphLinks = res.data.links
        memberGraphData[0].symbol = 'image://' + process.env.VUE_APP_BASE_URL + memberGraphData[0].symbol
        myGraph.setOption({
          series: [
            {
              type: "graph", //图表类型为关系图
              layout: "force", //图布局类型为力导图
              force: {
                //力引导图基本配置
                repulsion: 100, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                gravity: 0.02, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                edgeLength: 230, //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                layoutAnimation: false,
                //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
              },
              symbolSize: 70, //节点大小
              label: {
                //节点内的名称展示
                show: true,
              },
              // edgeSymbol: ["circle", "arrow"], //边两端的标记类型（箭头）
              edgeSymbolSize: [0, 10], //边两端的标记大小
              itemStyle: {
                //节点样式
                color: "#1F79F3",
              },
              lineStyle: {
                //连接线样式
                width: 1.5,
                color: "#ccc",
              },
              data: memberGraphData,
              links: memberGraphLinks,
            },
          ],
        })
        // 随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myGraph.resize()
        })
      });
    },
  },
};
</script>

<style scoped>
/*党员画像标题*/
.h4 {
  text-align: center;
  font-weight: bold;
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
  height: 672px;
  background: #ffffff;
  border-radius: 10px;
  width: 18%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
/*左侧上面盒子*/
.information-top {
}
.information-top p{
	font-size: 18px;
font-family: Microsoft YaHei;
font-weight: bold;
color: #000000;
line-height: 24px;
}
/*图片*/
.image {
  width: 34%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  margin-left: 33%;
}
.image .img {
  width: 100%;
  height: 100%;
}
.el-image__inner{
  width: 100%;
  height: 100%;
}
/*左侧下面盒子*/
.information-bottom {
  font-size: 14px;
}
.information-bottom p {
  margin-bottom: 0;
}
/*中间*/
.center-box {
  width: 55%;
  height: 672px;
  background: #ffffff;
  border-radius: 10px 10px 10px 10px;
  margin-left: 21px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
/*人员拓扑图*/
.graph{
  width: 100%;
  height: 626px;
}
/*右侧*/
.right-box {
  display: inline-block;
  width: 22%;
  margin-left: 21px;
  margin-top: -11px;
}
/*右侧标题样式*/
.fontColor {
  padding: 0;
  margin: 0;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
}
.politics {
  height: 324px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px;
}
/*政治面貌p标签*/
.politics p {
  font-size: 14px;
  color: #666;
}
/*右侧两个模块滚动条*/
.politics::-webkit-scrollbar {
  width: 6px;
  height: 2px;
}
.politics::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: rgba(0,0,0,0.3);
}
.politics::-webkit-scrollbar-track {
  border-radius: 0;
}
/* 内容框 */
.contents {
  width: 323px;
  height: 219px;
  font-size: 14px;
  color: #000;
  line-height: 20px;
}
/*缴纳金额*/
.cost{
  float: right;
  margin: 0;
  padding: 10px;
}
/*缴纳金额无记录*/
.empty{
  text-align: center;
  line-height: 219px;
}
.right-con {
  margin: 0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
.right-con span {
  display: inline-block;
}
</style>
