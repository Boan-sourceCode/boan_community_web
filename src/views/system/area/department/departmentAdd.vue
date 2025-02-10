<!--添加网格-->
<template>
  <div class="app-container">
    <h1 class="title-font">添加部件</h1>
    <hr />
    <el-form
      :model="attachmentsFrom"
      label-width="106px"
      :rules="rules"
      ref="attachmentsFrom"
      class="form-box"
    >
      <el-form-item label="编号：" prop="attachmentsNo" class="input-width">
        <el-input clearable v-model="attachmentsFrom.attachmentsNo" />
      </el-form-item>
      <!-- <el-form-item label="所属网格：" prop="areaId" class="input-width">
        <el-select
          clearable
          v-model="attachmentsFrom.areaId"
          placeholder="请选择"
        >
          <el-option
            v-for="dict in dict.type.grid_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item
        label="所属网格："
        prop="pAreaId"
        class="input-width"
        style="vertical-align: top"
      >
        <Treeselect
          v-model="attachmentsFrom.pAreaId"
          :props="deptProps"
          :options="deptOptions"
          :value="value"
          placeholder="请选择"
          @click.native="getTree"
        >
        </Treeselect>
      </el-form-item>
      <el-form-item
        label="部件类型："
        prop="attachmentsType"
        class="input-width"
      >
        <el-select
          clearable
          v-model="attachmentsFrom.attachmentsType"
          placeholder="请选择"
        >
          <el-option
            v-for="dict in dict.type.attachments_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部件名称：" prop="itemName" class="input-width">
        <el-input clearable v-model="attachmentsFrom.itemName" />
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
      <el-form-item label="部件图片：">
        <!-- <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <span
            slot="tip"
            style="color: red; display: inline-block; margin-left: 1rem"
          >
            *只能上传jpg/png文件，且不超过500kb
          </span>
        </el-upload> -->
        <image-upload v-model="attachmentsFrom.picture" :limit="1" />
      </el-form-item>

      <el-form-item label="部件介绍:" style="width: 50%; display: block">
        <el-input
          type="textarea"
          label-width="70%"
          clearable
          v-model="attachmentsFrom.summary"
        ></el-input>
      </el-form-item>

      <el-form-item style="text-align: center; margin: 0">
        <el-button
          type="primary"
          plain
          size="mini"
          @click="saveAndAdd('attachmentsFrom')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { treeList } from "@/api/area/area";
import { attachmentsAdd } from "@/api/area/depart";
import { listAreaTree } from "@/api/area/areaTree";
export default {
  dicts: ["attachments_type", "grid_type"],
  data() {
    return {
      // 新增查询树
      deptOptions: [],
      deptProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      value: "", //选中的数据
      // fileList,
      attachmentsFrom: {
        //新增表单参数
        attachmentsNo: "",
        areaId: "",
        itemName: "",
        attachmentsType: "",
        picture: "",
        summary: "",
      },
      newAreaLists: [], //保存新添加的网格
      // 表单校验
      rules: {
        attachmentsType: [
          { required: true, trigger: "change", message: "请选择部件类型" },
        ],

        itemName: [
          { required: true, trigger: "blur", message: "请输入部件名称" },
        ],
      },
    };
  },
  mounted() {
    this.getTree();
  },
  methods: {
    // 查询树
    getTree() {
      treeList().then((res) => {
        console.log("res :>> ", res);
        this.deptOptions = res.data;
        console.log("object :>> ", this.deptOptions);
      });
    },
    //转换网格-网格管理数据结构
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.areaId,
        label: node.areaName,
        children: node.children,
      };
    },

    // 查询网格-网格管理下拉树结构
    getTreeselect() {
      listAreaTree().then((response) => {
        this.areaTreeOptions = [];
        const data = { areaId: 0, areaName: "顶级节点", children: [] };
        data.children = this.handleTree(response.data, "areaId", "pAreaId");
        this.areaTreeOptions.push(data);
      });
    },
    //保存
    saveAndAdd(attachmentsFrom) {
      this.$refs[attachmentsFrom].validate((valid) => {
        if (valid) {
          attachmentsAdd(this.attachmentsFrom).then((res) => {
            console.log("res :>> ", res);
            this.$message.success("添加成功");
            this.newAreaLists.push(res.data);
          });
        }
      });
    },
  },
  // handleRemove(file, fileList) {
  //   console.log(file, fileList);
  // },
  // //约束图片大小
  // beforeAvatarUpload(file) {
  //   const isLt2M = file.size < 960 + "px" * 540 + "px";

  //   if (!isLt2M) {
  //     this.$message.error("换张图片吧~");
  //   }
  //   return isJPG && isLt2M;
  // },
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
