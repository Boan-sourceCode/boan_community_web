<!--添加网格-->

<template>
  <div class="app-container">
    <h1 class="title-font">部件详情</h1>
    <hr />
    <el-form :model="attachmentsData" label-width="106px" class="form-box">
      <el-form-item label="编号：" prop="areaName" class="input-width">
        <el-input v-model="attachmentsData.attachmentsNo" />
      </el-form-item>
      <el-form-item label="所属网格：" prop="areaLevel" class="input-width">
        <el-input v-model="attachmentsData.areaName"> </el-input>
      </el-form-item>
      <el-form-item label="部件类型：" prop="areaType" class="input-width">
        <el-input v-model="attachmentsData.attachmentsType"> </el-input>
      </el-form-item>
      <!-- 摄像头 -->
      <!-- <el-form-item
        label="直播地址："
        prop="areaAddr"
        style="width: 50%; display: inline-block"
        v-if="this.addForm.areaType == '摄像头'"
      >
        <el-input clearable :placeholder="item.monitoringPointNumber" />
      </el-form-item> -->
      <br />
      <el-form-item label="部件图片：" prop="areaName">
        <el-image
          style="width: 100px; height: 100px"
          :src="attachmentsData.picture"
          :preview-src-list="srcList"
        >
        </el-image>
      </el-form-item>

      <el-form-item label="部件介绍:" style="width: 50%; display: block">
        <el-input
          type="textarea"
          label-width="70%"
          v-model="attachmentsData.summary"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { attachmentsList } from "@/api/area/depart";
export default {
  data() {
    return {
      attachmentsData: {}, //卡片数据
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //获取页面数据
    getList() {
      let areaId = this.$route.query.ID;
      console.log("123:", areaId);
      attachmentsList(areaId).then((res) => {
        console.log("123:", res);
        // if (res.code === 200) {
        this.attachmentsData = res.data;
        console.log("456", this.attachmentsData);
        
      });
    },
    //约束图片大小
    beforeAvatarUpload(file) {
      const isLt2M = file.size < 960 + "px" * 540 + "px";

      if (!isLt2M) {
        this.$message.error("换张图片吧~");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style scoped>
/* p标签公共样式 */
.font {
  margin: 0;
  padding: 0;
}
/* 标题样式 */
.title-font {
  text-align: center;
  font-weight: bold;
}
/* 边框 */
.form-box {
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #ddd;
  padding: 20px;
  margin: 30px;
}
/* 编辑输入框样式 */
.input-width {
  width: 25%;
  display: inline-block;
}
.input-width div {
  width: 90%;
}
/* 卡片样式 */
.el-card {
  border-radius: 10px;
  width: 48%;
  margin: 0 1%;
  display: inline-block;
}
/* 卡片标题样式 */
.card-font-title {
  margin: 8px 0;
  font-size: 14px;
  font-weight: bold;
}
.card-font-title span {
  color: #1f79f3;
}
/* 卡片内容字体样式 */
.card-font {
  margin: 8px 0;
  font-size: 12px;
}
/* 卡片操作按钮样式 */
.card-btn {
  text-align: right;
}
/* 卡片标注状态字体样式 */
.card-state {
  float: right;
  font-weight: bold;
  margin: 6px;
  font-size: 12px;
}
/* 网格和网格数量的字体样式 */
.title {
  margin: 0 0 0 5px;
  padding: 0;
  font-size: 14px;
  font-weight: bold;
}

hr {
  color: #eee;
  margin-bottom: 2rem;
}
</style>
