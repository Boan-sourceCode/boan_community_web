<template>
  <div class="app-container">
    <h1 class="title-font">部件列表</h1>
    <hr />
    <!-- 表单 -->
    <el-form v-model="queryParams.itemName" :inline="true">
      <el-form-item label="部件名称：" prop="key" label-width="82px">
        <el-input v-model="queryParams.itemName" clearable />
      </el-form-item>
      <el-form-item
        label="部件类型："
        prop="attachmentsType"
        label-width="82px"
      >
        <el-select
          v-model="queryParams.attachmentsType"
          clearable
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
      <el-form-item style="position: absolute; right: 3.125rem">
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >查询</el-button
        >
        <el-button
          type="warning"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:area:export']"
          >添加
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="areaList"
      :header-cell-style="{ background: '#EBF7FF' }"
      stripe
      border
    >
      <el-table-column label="编号" align="center" width="60" sortable>
        <template slot-scope="scope">
          {{
            scope.$index + 1 + (queryParams.pageNum - 1) * queryParams.pageSize
          }}
        </template>
      </el-table-column>
      <el-table-column label="所属网格" prop="areaName" width="164px" />
      <el-table-column label="部件名称" align="center" prop="itemName" />
      <el-table-column label="部件类型" align="center" prop="attachmentsType" />
      <el-table-column label="是否标记" align="center" prop="isTagging">
        <template slot-scope="scope">
          <a
            class="card-state unmarked icon-map-marker"
            @click.stop="
              openMap(
                scope.row.areaCenter,
                scope.row.isTagging,
                scope.row.areaName,
                scope.row.areaColor,
                scope.row.areaId
              )
            "
            v-if="scope.row.isTagging === null || scope.row.isTagging === ''"
            >未标注</a
          >
          <a
            class="card-state marked icon-map-marker"
            @click.stop="
              openMap(
                scope.row.areaCenter,
                scope.row.isTagging,
                scope.row.areaName,
                scope.row.areaColor,
                scope.row.areaId
              )
            "
            v-else
            >已标注</a
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="232px">
        <template slot-scope="scope">
          <el-button
            type="success"
            plain
            size="small"
            @click="handleDetails(scope.row)"
            >详情</el-button
          >
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            plain
            size="small"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <p>共查询/检索{{ this.total }}条信息</p>

    <!-- 编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogEdit"
      title="编辑部件"
      width="70%"
      :close-on-click-modal="false"
      @close="dictEditVisible('attachmentsUpdata')"
    >
      <template>
        <el-form
          :model="attachmentsUpdata"
          label-width="106px"
          :rules="rules"
          ref="attachmentsUpdata"
          class="form-box"
        >
          <el-form-item label="编号：" prop="attachmentsNo" class="input-width">
            <el-input clearable v-model="attachmentsUpdata.attachmentsNo" />
          </el-form-item>

          <el-form-item
            label="所属网格："
            prop="pAreaId"
            class="input-width"
            style="vertical-align: top"
          >
            <Treeselect
              v-model="attachmentsUpdata.areaId"
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
              v-model="attachmentsUpdata.attachmentsType"
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
            <el-input clearable v-model="attachmentsUpdata.itemName" />
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
            <image-upload v-model="attachmentsUpdata.picture" :limit="1" />
          </el-form-item>

          <el-form-item label="部件介绍:" style="width: 50%; display: block">
            <el-input
              type="textarea"
              label-width="70%"
              clearable
              v-model="attachmentsUpdata.summary"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitForm('attachmentsUpdata')"
          >保存</el-button
        >
        <el-button type="default" @click="dictEditVisible('attachmentsUpdata')"
          >取消</el-button
        >
      </div>
    </el-dialog>

    <!--标注弹窗-->
    <el-dialog
      :visible.sync="dialogAnnotate"
      title="绘制网格"
      width="70%"
      height="600px"
      class="map"
      ref="dialogData"
      :close-on-click-modal="false"
      @close="closeMap()"
    >
      <gridMap
        :mapData="mapData"
        :dialogAnnotate="dialogAnnotate"
        @coordinates="coordinates"
      ></gridMap>
    </el-dialog>
    <!-- 分页 -->
    <pagination
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList()"
    />
  </div>
</template>

<script>
import {
  attachments,
  attachmentsDel,
  attachmentsList,
  attachmentsPut,
} from "@/api/area/depart";
import { treeList } from "@/api/area/area";
import { listAreaTree } from "@/api/area/areaTree";

export default {
  dicts: ["attachments_type"],
  data() {
    return {
      input: "",
      value: "", //选中的数据
      areaList: [], // 表格数据
      queryParams: {
        // 查询参数
        pageNum: 1,
        pageSize: 10,
      },
      total: 0, // 总页数
      dialogAnnotate: false, //地图弹窗
      // 地图
      mapData: {
        gridCenter: "", //给地图传参（中心点）
        gridTagging: "", //给地图传参（覆盖物）
        areaName: "", //给地图传参（网格名称）
        areaColor: "", //给地图传参（网格颜色）
        areaId: "", //给地图传参（网格id）
      },
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

      dialogEdit: false, //编辑弹窗
      attachmentsUpdata: {
        //编辑表单参数
        attachmentsNo: "",
        pAreaId: "",
        itemName: "",
        attachmentsType: "",
        picture: "",
        summary: "",
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //添加网格按钮跳转页面
    handleAdd() {
      const src = `/department/departmentAdd`;
      this.$router.push({
        path: src,
      });
    },

    //获取页面数据
    getList() {
      attachments(this.queryParams).then((res) => {
        this.areaList = res.rows;
        console.log(this.areaList);
        console.log(res);
        console.log("object :>> ", this.queryParams);
        this.total = res.total;
      });
    },
    //点击详情跳转页面
    handleDetails(row) {
      const src = `/department/departmentDetails`;
      let areaId = row.attachmentsId;
      this.$router.push({
        path: src,
        query: { ID: areaId },
      });
    },
    //删除按钮操作
    handleDelete(row) {
      const areaId = row.attachmentsId;
      this.$confirm('是否删除网格："' + row.itemName + '"？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return attachmentsDel(areaId);
        })
        .then((data) => {
          // this.queryParams.pageNum = 1
          this.getList();
          this.$message.success("删除成功");
        })
        .catch(() => {});
    },

    /** 搜索按钮操作 */
    handleQuery() {
      console.log(this.queryParams);
      this.queryParams.pageNum = 1;
      this.getList(this.queryParams);
    },

    // 标注弹窗打开
    openMap(center, isTagging, areaName, areaColor, areaId) {
      this.mapData.gridCenter = center;
      this.mapData.gridTagging = isTagging;
      this.mapData.areaName = areaName;
      this.mapData.areaColor = areaColor;
      this.mapData.areaId = areaId;
      this.dialogAnnotate = true;
      this.$refs.dialogData.mapData = this.mapData;
    },

    //接收地图标注的传值
    coordinates(value, id) {
      // value 就是子组件传递过来的数据
      console.log("子组件传参==", value, id);
      var param = {
        areaId: id,
        areaCenter: value.areaCenter,
        isTagging: value.areaLabel,
      };
      //接口问题
      // updateArea(param).then((response) => {
      //   this.$modal.msgSuccess("保存成功");
      //   this.dialogAnnotate = false;
      //   this.getList();
      // });
    },

    //关闭标注弹窗
    closeMap() {
      this.dialogAnnotate = false;
    },
    //获取编辑页面数据
    getLists() {
      let areaId = this.$route.query.ID;
      console.log("123:", areaId);
      attachmentsList(areaId).then((res) => {
        console.log("123:", res);
        // if (res.code === 200) {
        this.attachmentsData = res.data;
        console.log("456", this.attachmentsData);
      });
    },
    // 查询树
    getTree() {
      treeList().then((res) => {
        console.log("res :>>网格数据 ", res);
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
    // 编辑弹窗打开
    handleEdit(row) {
      this.dialogEdit = true;
      this.getTreeselect();

      attachmentsList(row.attachmentsId).then((res) => {
        if (res.code === 200) {
          this.attachmentsUpdata = res.data;
          console.log("res :>> ", res);
        }
      });
    },

    //编辑的提交按钮
    submitForm(attachmentsUpdata) {
      this.$refs[attachmentsUpdata].validate((valid) => {
        if (valid) {
          // if (this.attachmentsUpdata.areaId != null) {
          // if (
          //   this.attachmentsUpdata.areaerCard !== undefined &&
          //   this.attachmentsUpdata.areaerCard !== null &&
          //   this.attachmentsUpdata.areaerCard !== "" &&
          //   this.attachmentsUpdata.areaerCard.length !== 0
          // ) {
          //   this.attachmentsUpdata.areaerCard =
          //     this.attachmentsUpdata.areaerCard.toString();
          // } else {
          //   this.attachmentsUpdata.areaerCard = "";
          // }
          attachmentsPut(this.attachmentsUpdata)
            .then(() => {
              this.$message.success("修改成功");
              this.getList();
              this.dialogEdit = false;
            })
            .catch(() => {});
          // }
        }
      });
    },

    //编辑弹窗关闭
    dictEditVisible(attachmentsUpdata) {
      this.$refs[attachmentsUpdata].resetFields();
      this.dialogEdit = false;
    },
  },
};
</script>

<style scoped>
/* 标题样式 */
.title-font {
  text-align: center;
  font-weight: bold;
}
el-form {
  display: inline-block;
}
hr {
  color: #eee;
  margin-bottom: 2rem;
}
/* 已标注字体颜色 */
.marked {
  color: #3bc2b4;
}
/* 未标注字体颜色 */
.unmarked {
  color: #999;
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
  display: inline-block;
  text-align: center;
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
</style>
