<!--概况组件-->
<template>
  <div id="surveyBox">
    <!--图标和文字-->
    <div class="tabRight">
      <div style="cursor: pointer;text-align: center;" @click="isShow">
        <i class="icon-survey iconRight" style="background:#1F79F3"></i>
        <p style="color: #1F79F3">概况</p>
      </div>
    </div>
    <!--内容-->
    <div class="contentPosition">
      <!--指向箭头-->
      <div class="arrow"></div>
      <div class="contentRight">
        <div>
          <p style="font-weight: bold;">
            实有人口（{{this.sum}}）
            <i class="el-icon-d-arrow-right iconArrow" @click="isHidden" style="cursor: pointer"></i>
          </p>
        </div>
        <div class="peopleBox" style="color: #F08C00;background-color: #FBE2BF;height: 98px">
          <i class="icon-population-r"></i>
          <p>户籍人口（{{this.residence}}）</p>
          <div class="boxTab">
            <p>常住人员：{{this.peopleList.registeredPermanentNum}}人</p>
            <p>空挂人员：{{ this.peopleList.registeredHangNum }}人</p>
            <p>外出人员：{{ this.peopleList.registeredOuterNum }}人</p>
          </div>
        </div>
        <div class="peopleBox" style="color: #A92EBC;background: #E9CBEE;height: 98px">
          <i class="icon-population-n"></i>
          <p>未落户人口（{{this.notSettled}}）</p>
          <!-- <p>未落户人口（{{this.peopleList.unregisteredPermanentNum + this.peopleList.unregisteredFlowNum}}）</p> -->
          <div class="boxTab">
            <!-- <p>常住人员：{{ this.peopleList.unregisteredPermanentNum }}人</p> -->
            <p>常住人员：{{ this.notSettled - this.peopleList.unregisteredFlowNum }}人</p>
            <p>流动人员：{{ this.peopleList.unregisteredFlowNum }}人</p>
          </div>
        </div>
        <div class="peopleBox" style="color: #0396AB;background: #C0E5EA;height: 98px">
          <i class="icon-plane"></i>
          <p>境外人口（{{this.abroad}}）</p>
          <div class="boxTab">
            <p>常住人员：{{ this.peopleList.foreignPermanentNum }}人</p>
            <p>流动人员：{{ this.peopleList.foreignFlowNum }}人</p>
          </div>
        </div>
        <div class="peopleBox" style="color: #09AE47;background: #C1EBD1;height: 98px">
          <i class="icon-heart"></i>
          <p>社会救助对象人员（{{this.rescue}}）</p>
          <div class="boxTab">
            <p>残疾人员：{{ this.peopleList.disabilityNum }}人</p>
            <p>民政优抚对象：{{ this.peopleList.preferentialNum }}人</p>
            <p>低保/五保人员：{{ this.peopleList.subsistenceNum }}人</p>
          </div>
        </div>
        <div class="peopleBox" style="color: #CA2B18;background: #F2CAC5;height: 98px">
          <i class="icon-star"></i>
          <p>重点人员关注（{{this.stress}}）</p>
          <div class="boxTab">
            <p>刑满释放人员：{{ this.peopleList.releaseNum }}人</p>
            <p>吸毒人员：{{ this.peopleList.drugNum }}人</p>
            <p>重点青少年人员：{{ this.peopleList.keyoungerNum }}人</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {peopleListLimit} from "@/api/area/gisMap";
export default {
  name: "survey",
  props:['areaId'],  //接收父组件的值
  data(){
    return{
      peopleList:{},
      residence:'',
      notSettled:'',
      abroad:'',
      rescue:'',
      stress:'',
      sum:'',
    }
  },
  watch:{
    //监听父组件的下拉框数据
    areaId:{
      handler(newVal) {
        if(newVal){
          this.getPeopleList(newVal)
        }
      },

      immediate: true,  //立即监听
    }
  },
  mounted() {
    // this.getPeopleList()
  },
  methods:{
    //内容框显示
    isShow(){
      this.isHidden()
      //卡片内容
      var Id=document.getElementById("surveyBox");
      let visible = Id.getElementsByClassName("contentRight")
      for (var i = 0; i < visible.length; i++) {
        visible[i].style.display="block";
      }
      //指向箭头
      let icon = Id.getElementsByClassName('arrow')
      for (var j = 0; j < icon.length; j++) {
        icon[j].style.display="block";
      }
    },

    //内容框隐藏
    isHidden(){
      //卡片内容
      let visible = document.getElementsByClassName("contentRight")
      for (var i = 0; i < visible.length; i++) {
        visible[i].style.display="none";
      }
      //指向箭头
      let icon = document.getElementsByClassName('arrow')
      for (var j = 0; j < icon.length; j++) {
        icon[j].style.display="none";
      }
    },

    //获取人员信息
    getPeopleList(data) {
      let areaIds = ''
      if (data === '' || data === undefined){
        areaIds = ''
      }else{
        areaIds = data
      }
      let param = {
        areaId : areaIds,
        userId:localStorage.getItem("userId"),
      }
      peopleListLimit(param).then(res => {
        this.peopleList = res.data
        this.residence = res.data?.registeredNum  //户籍人口
        this.notSettled = res.data?.unregisteredNum //未落户人口
        this.abroad =  res.data?.foreignNum //境外人口
        this.rescue = this.peopleList.disabilityNum + this.peopleList.preferentialNum + this.peopleList.subsistenceNum  //社会救助对象人员
        this.stress = this.peopleList.releaseNum + this.peopleList.drugNum + this.peopleList.keyoungerNum //重点人员关注
        this.sum = res.data?.actualNum  //总人口
      })
    }
  }
}
</script>

<style scoped>
/*右侧菜单*/
.tabRight{
  /*position: absolute;*/
  /*top: 154px;*/
  /*right: 20px;*/
  z-index: 1;
}
/*菜单div*/
.iconRight{
  font-size: 26px;
  color: #fff;
  border-radius: 50%;
  padding: 6px;
}
.tabRight p{
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
}
/*菜单内容*/
.contentPosition{
  width: 338px;
  max-height:723px;
  position: absolute;
  top: 0px;
  right: 78px;
  z-index:1;
}
.contentRight{
  width: 338px;
  max-height:723px;
  background: #fff;
  z-index: 1;
  box-shadow: 6px 6px 10px 0 rgba(0,0,0,0.3);
  border-radius: 10px;
  padding: 0 20px 20px 20px;
  overflow: auto;
}
.contentRight::-webkit-scrollbar {
  border-width:1px;
}
/*指向箭头*/
.arrow {
  width: 14px;
  height: 14px;
  position: absolute;
  left: 330px;
  top: 50px;
  background: #fff;
  transform: rotate(135deg);
}
/*标题旁箭头*/
.iconArrow{
  font-weight: bold;
  float: right;
}
/*单个内容div*/
.peopleBox{
  /*height: 98px;*/
  border-radius: 10px;
  padding: 10px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
}
.peopleBox p{
  margin: 0;
}
.peopleBox i{
  position: absolute;
  bottom: 0;
  right: 12px;
  font-size: 72px;
  color: rgba(255,255,255,0.6);
}
/*内容p标签公共样式*/
.boxTab{
  margin-top: 8px;
}
.boxTab p{
  margin: 2px;
  font-weight: normal;
  font-size: 12px;
}
</style>
