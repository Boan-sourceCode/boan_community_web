<template>
  <div>
    <!-- 放置水平导航 -->
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="党员列表" name="党员列表"></el-tab-pane>
      <el-tab-pane label="优秀党员" name="优秀党员"></el-tab-pane>
<!--      <el-tab-pane label="历史党员" name="历史党员"></el-tab-pane>-->
      <el-tab-pane label="党员流动管理" name="党员流动管理"></el-tab-pane>
    </el-tabs>
    <!--党员列表-->
    <div v-if="this.activeName === '党员列表'">
      <partyer-list></partyer-list>
    </div>
    <!--优秀党员-->
    <div v-if="this.activeName === '优秀党员'">
      <partyer-good></partyer-good>
    </div>
    <!--历史党员-->
<!--    <div v-if="this.activeName === '历史党员'">-->
<!--      <partyer-history></partyer-history>-->
<!--    </div>-->
    <!--党员流动管理-->
    <div v-if="this.activeName === '党员流动管理'">
      <partyer-flow></partyer-flow>
    </div>
  </div>
</template>

<script>
import PartyerGood from "../partyMenberManagementCom/partyerGood";
import PartyerHistory from "../partyMenberManagementCom/partyerHistory";
import PartyerFlow from "../partyMenberManagementCom/partyerFlow";
import PartyerList from "../partyMenberManagementCom/partyerList";
export default {
  name:'partymembersList',
  components: { PartyerGood, PartyerHistory, PartyerFlow, PartyerList },
  data() {
    return {
      activeName: "党员列表",
    };
  },
  mounted() {
    this.bg()
  },
  methods:{
    bg(){
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

    //选项卡切换
    handleClick(tab) {
      console.log(tab)
      if(tab === undefined){
        this.activeName = ''
      }else {
        this.activeName = tab.name
      }
    },
  }
};
</script>
<style scoped>
/*tabs公共样式*/
/deep/ .el-tabs--card > .el-tabs__header {
  border: none;
}
/deep/ .el-tabs__nav-scroll {
  width: 25%;
  margin: 0 auto;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-bottom: 1px solid #dfe4ed;
}
/* 选中时状态 */
/deep/.el-tabs__item.is-active {
  background-color: #1890ff;
  color: white;
  border: none;
}
</style>
