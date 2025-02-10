<!-- 综合查询 -->
<template>
  <div class="app-container">
    <h1 class="title-font">综合查询</h1>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="网格" name="网格"></el-tab-pane>
      <el-tab-pane label="实有建筑" name="实有建筑"></el-tab-pane>
      <el-tab-pane label="实有人口" name="实有人口"></el-tab-pane>
      <el-tab-pane label="实有企业" name="实有企业"></el-tab-pane>
    </el-tabs>
      <!--网格-->
      <div v-if="this.activeName === '网格'">
        <queryGrid></queryGrid>
      </div>
      <!--实有建筑-->
      <div v-if="this.activeName === '实有建筑'">
        <queryBuild></queryBuild>
      </div>
      <!--实有人口-->
      <div v-if="this.activeName === '实有人口'">
        <queryPeople></queryPeople>
      </div>
      <!--实有企业-->
      <div v-if="this.activeName === '实有企业'">
        <queryEnterprise></queryEnterprise>
      </div>
  </div>
</template>

<script>
import queryGrid from './querySon/queryGrid'
import queryBuild from './querySon/queryBuild'
import queryPeople from './querySon/queryPeople'
import queryEnterprise from './querySon/queryEnterprise'
export default {
  name: "query",
  components: {
    queryGrid,
    queryBuild,
    queryPeople,
    queryEnterprise,
  },
  data() {
    return {
      activeName: '网格',    //页面默认选项
      loading: true,  // 遮罩层
    }
  },
  mounted() {},
  methods: {
    handleClick(tab) {
      if (tab === undefined) {
        this.activeName = ''
      } else {
        this.activeName = tab.name
      }
    },
  }
};
</script>
<style scoped>
/* 标题样式 */
.title-font {
  text-align: left;
  font-weight: bold;
  color: #FF933E;
}
/*选项卡公共样式*/
/deep/ .el-tabs--card > .el-tabs__header{
  border: none;
}
/deep/ .el-tabs__nav-scroll{
  width:27%;
  margin:0 auto
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav{
  border-bottom: 1px solid #dfe4ed;
  margin-bottom: 10px;
}
</style>
