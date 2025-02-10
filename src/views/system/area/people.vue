<!-- 综合查询 -->
<template>
  <div class="app-container">
    <h1 class="title-font">人口查询</h1>
      <!--实有人口-->
      <div v-if="this.activeName === '实有人口'">
        <queryPeople></queryPeople>
      </div>
  </div>
</template>

<script>
import queryPeople from './querySon/queryPeople'
export default {
  name: "query",
  components: {
    queryPeople,
  },
  data() {
    return {
      activeName: '实有人口',    //页面默认选项
      loading: true,  // 遮罩层
    }
  },
  mounted() {},
  methods: {
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
