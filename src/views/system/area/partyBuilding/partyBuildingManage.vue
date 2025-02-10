<template>
  <div>
    <!-- 放置水平导航 -->
    <el-tabs v-model="activeName" type="card" tab-position="top" class="event">
      <el-tab-pane label="党组织列表" name="list">
        <list></list>
      </el-tab-pane>
      <el-tab-pane label="优秀党组织" name="organize">
        <organize></organize>
      </el-tab-pane>
      <el-tab-pane label="党内职务管理" name="manage">
        <manage></manage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import List from "../partyBuildingManage/list.vue";
import Manage from "../partyBuildingManage/manage.vue";
import Organize from "../partyBuildingManage/organize.vue";
export default {
  components: { List, Organize, Manage },
  data() {
    return {
      activeName: "list",
    };
  },
};
</script>
<style scoped>
/*tabs公共样式*/
/deep/ .el-tabs--card > .el-tabs__header {
  border: none;
}
/deep/ .el-tabs__nav-scroll {
  width: 27%;
  margin: 0 auto;
  text-align: center;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-bottom: 1px solid #dfe4ed;
  margin-bottom: 10px;
}
/* 选中时状态 */
/deep/.el-tabs__item.is-active {
  background-color: #1890ff;
  color: white;
}
</style>
