<template>
  <div class="app-container">
    <h1 class="title-font">部件列表</h1>
    <!-- 表单 -->
    <el-form v-model="queryParams" :inline="true">
      <el-form-item label="部件名称：" prop="key">
        <el-input v-model="queryParams.itemName" clearable placeholder="请输入部件名称" />
      </el-form-item>
      <el-form-item label="部件类型：" prop="attachmentsType">
        <el-select v-model="queryParams.attachmentsType" clearable placeholder="请选择">
          <el-option v-for="dict in dict.type.attachments_type" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button plain @click="handleQuery">查询</el-button>
      <el-form-item style="position: absolute; right: 3.125rem">
        <el-button plain @click="handleAdd" v-hasPermi="['system:departMent:add']"> 添加部件 </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :loading="loading" :data="areaList" :header-cell-style="{ background: '#EBF7FF' }" stripe border>
      <el-table-column label="序号" align="center" width="60">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (queryParams.pageNum - 1) * queryParams.pageSize }}
        </template>
      </el-table-column>
      <el-table-column label="所属网格" align="center" prop="areaName" />
      <el-table-column label="部件名称" align="center" prop="itemName">
        <template slot-scope="scope">
          <p v-if="scope.row.itemName === '' || scope.row.itemName === null">/</p>
          <p v-else>{{ scope.row.itemName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="部件类型" align="center" prop="attachmentsType">
        <template slot-scope="scope">
          <p v-if="scope.row.attachmentsType === '' || scope.row.attachmentsType === null">/</p>
          <p v-else>{{ scope.row.attachmentsType }}</p>
        </template>
      </el-table-column>
      <el-table-column label="地图标注" align="center" prop="isTagging">
        <template slot-scope="scope">
          <a class="card-state unmarked icon-map-marker"
            @click.stop="openMap(scope.row.mapTagging, scope.row.attachmentsId)"
            v-if="scope.row.isTagging == '未标注'">未标注</a>
          <a class="card-state marked icon-map-marker"
            @click.stop="openMap(scope.row.mapTagging, scope.row.attachmentsId)" v-else>已标注</a>
        </template>
      </el-table-column>
      <el-table-column label="部件地址" align="center" prop="address">
        <template slot-scope="scope">
          <p v-if="scope.row.address === '' || scope.row.address === null">/</p>
          <p v-else>{{ scope.row.address }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <!--          <el-button type="success" plain size="small" @click="handleDetails(scope.row)">详情</el-button>-->
          <el-button type="primary" plain size="small" v-hasPermi="['system:departMent:edit']"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" plain size="small" v-hasPermi="['system:departMent:del']"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p>共查询/检索{{ this.total }}条信息</p>

    <!-- 添加弹窗 -->
    <el-dialog :visible.sync="dialogAdd" title="添加部件" width="50%" :close-on-click-modal="false"
      @close="dictAddVisible('attachmentsFrom')">
      <template>
        <el-form :model="attachmentsFrom" label-width="106px" :rules="rules" ref="attachmentsFrom">
          <el-form-item label="所属网格：" class="input-width" style="vertical-align: top" prop="areaId">
            <Treeselect v-model="attachmentsFrom.areaId" :props="deptProps" :options="deptOptions" :value="value"
              placeholder="请选择" @click.native="getTree">
            </Treeselect>
          </el-form-item>
          <el-form-item label="部件名称：" prop="itemName" class="input-width">
            <el-input clearable v-model="attachmentsFrom.itemName" placeholder="请输入部件名称" />
          </el-form-item>
          <el-form-item label="部件编号：" prop="attachmentsNo" class="input-width">
            <el-input clearable v-model="attachmentsFrom.attachmentsNo" placeholder="请输入部件编号" />
          </el-form-item>
          <el-form-item label="部件类型：" prop="attachmentsType" class="input-width">
            <el-select clearable v-model="attachmentsFrom.attachmentsType" placeholder="请选择">
              <el-option v-for="dict in dict.type.attachments_type" :key="dict.value" :label="dict.label"
                :value="dict.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 摄像头 -->
          <el-form-item label="直播地址：" prop="cameraLiveAddress" style="width: 50%; display: inline-block"
            v-if="attachmentsFrom.attachmentsType == '摄像头'">
            <el-input clearable placeholder="直播地址" v-model="attachmentsFrom.cameraLiveAddress" />
          </el-form-item>
          <el-form-item label="部件地址：" prop="address">
            <el-input clearable v-model="attachmentsFrom.address" placeholder="请输入部件地址" />
          </el-form-item>
          <el-form-item label="部件介绍:">
            <el-input type="textarea" clearable v-model="attachmentsFrom.summary" placeholder="请输入部件介绍"></el-input>
          </el-form-item>
          <el-form-item label="部件图片：">
            <image-upload v-model="attachmentsFrom.picture" :limit="1" />
          </el-form-item>

        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="save('attachmentsFrom')">保存</el-button>
        <el-button type="default" @click="dictAddVisible('attachmentsFrom')">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog :visible.sync="dialogEdit" title="编辑部件" width="50%" :close-on-click-modal="false"
      @close="dictEditVisible('attachmentsUpdata')">
      <template>
        <el-form :model="attachmentsUpdata" label-width="106px" :rules="rules" ref="attachmentsUpdata">
          <el-form-item label="所属网格：" class="input-width" style="vertical-align: top">
            <treeSelect v-model="attachmentsUpdata.areaId" :props="deptProps" :options="deptOptions" placeholder="请选择">
            </treeSelect>
          </el-form-item>
          <el-form-item label="部件名称：" prop="itemName" class="input-width">
            <el-input clearable v-model="attachmentsUpdata.itemName" placeholder="请输入部件名称" />
          </el-form-item>
          <el-form-item label="部件编号：" prop="attachmentsNo" class="input-width">
            <el-input clearable v-model="attachmentsUpdata.attachmentsNo" placeholder="请输入部件编号" />
          </el-form-item>
          <el-form-item label="部件类型：" prop="attachmentsType" class="input-width">
            <el-select clearable v-model="attachmentsUpdata.attachmentsType" placeholder="请选择">
              <el-option v-for="dict in dict.type.attachments_type" :key="dict.value" :label="dict.label"
                :value="dict.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 摄像头 -->
          <el-form-item label="直播地址：" prop="cameraLiveAddress" class="input-width"
            v-if="attachmentsUpdata.attachmentsType == '摄像头'">
            <el-input clearable placeholder="直播地址" v-model="attachmentsUpdata.cameraLiveAddress" />
          </el-form-item>
          <el-form-item label="部件地址：" prop="address">
            <el-input clearable v-model="attachmentsUpdata.address" placeholder="请输入部件地址" />
          </el-form-item>
          <el-form-item label="部件介绍:">
            <el-input type="textarea" clearable v-model="attachmentsUpdata.summary" placeholder="请输入部件介绍"></el-input>
          </el-form-item>
          <el-form-item label="部件图片：">
            <image-upload v-model="attachmentsUpdata.picture" :limit="1" />
          </el-form-item>

        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitForm('attachmentsUpdata')">保存</el-button>
        <el-button type="default" @click="dictEditVisible('attachmentsUpdata')">取消</el-button>
      </div>
    </el-dialog>

    <!--标注弹窗-->
    <el-dialog :visible.sync="dialogAnnotate" title="绘制网格" width="70%" height="600px" class="map" ref="dialogData"
      :close-on-click-modal="false" @close="closeMap()">
      <gridMap :mapData="mapData" :dialogAnnotate="dialogAnnotate" @coordinates="coordinates">
      </gridMap>
    </el-dialog>

    <!-- 分页 -->
    <pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList()" />
  </div>
</template>

<script>
import { attachments, attachmentsLimit, attachmentsAdd, attachmentsDel, attachmentsList, attachmentsPut, } from "@/api/area/depart";
import { areaTree } from "@/api/area/area";
import gridMap from "@/components/gridMap/index";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  dicts: ["attachments_type"],
  components: { gridMap, Treeselect },
  data() {
    return {
      loading: true,   // 遮罩层
      value: "", //选中的数据
      id: '',
      areaList: [], // 表格数据
      // 查询参数
      queryParams: {
        userId: localStorage.getItem("userId"),
        pageNum: 1,
        pageSize: 10,
      },
      total: 0, // 总页数
      // 地图
      dialogAnnotate: false, //地图弹窗
      mapData: {
        gridCenter: "", //给地图传参（中心点）
        areaId: "", //给地图传参（id）
      },
      // 新增查询树
      deptOptions: [],
      deptProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      //新增
      dialogAdd: false, //新增弹窗
      attachmentsFrom: {   //新增表单参数
        attachmentsNo: "",
        areaId: null,
        itemName: "",
        attachmentsType: "",
        picture: "",
        summary: "",
      },
      //编辑
      dialogEdit: false, //编辑弹窗
      attachmentsUpdata: {   //编辑表单参数
        attachmentsNo: "",
        areaId: "",
        itemName: "",
        attachmentsType: "",
        picture: "",
        summary: "",
      },
      // 表单校验
      rules: {
        areaId: [
          { required: true, trigger: "change", message: "请选择所属网格" },
        ],
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
    this.getList();
    this.getTree();
  },
  methods: {
    //获取页面数据
    getList() {
      this.loading = true;
      attachmentsLimit(this.queryParams).then((res) => {
        this.areaList = res.rows;
        this.total = res.total;
      });
    },

    /** 转换网格-网格管理数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.areaId,
        label: node.areaName,
        children: node.children
      };
    },
    // 查询树
    getTree() {
      let param = {
        userId: localStorage.getItem("userId"),
        flag: 0
      }
      areaTree(param).then((res) => {
        this.deptOptions = res.data;
      });
    },

    //添加弹窗打开
    handleAdd() {
      this.attachmentsFrom.areaId = null
      this.dialogAdd = true;
      console.log(this.attachmentsFrom, 11111)
    },
    // 添加部件保存
    save(attachmentsFrom) {
      this.$refs[attachmentsFrom].validate((valid) => {
        if (valid) {
          attachmentsAdd(this.attachmentsFrom).then((res) => {
            this.dialogAdd = false;
            this.$message.success("添加成功");
            this.$refs[attachmentsFrom].resetFields();
            this.getList()
          });
        }
      });
    },
    //添加弹窗关闭
    dictAddVisible(attachmentsFrom) {
      this.$refs[attachmentsFrom].resetFields();
      this.attachmentsFrom = {}
      this.attachmentsFrom.areaId = ""
      this.dialogAdd = false;
      console.log(this.attachmentsFrom, 333333)
    },

    // 编辑弹窗打开
    handleEdit(row) {
      this.dialogEdit = true;
      attachmentsList(row.attachmentsId).then((res) => {
        if (res.code === 200) {
          this.attachmentsUpdata = res.data;
        }
      });
    },

    //编辑的提交按钮
    submitForm(attachmentsUpdata) {
      this.$refs[attachmentsUpdata].validate((valid) => {
        if (valid) {

          var ajson = {
            ...this.attachmentsUpdata
          }
          console.log('ajson', ajson)
          attachmentsPut(ajson).then(() => {
            this.$message.success("修改成功");
            this.getList();
            this.dialogEdit = false;
          }).catch(() => { });
        }
      });
    },

    //编辑弹窗关闭
    dictEditVisible(attachmentsUpdata) {
      this.$refs[attachmentsUpdata].resetFields();
      this.attachmentsUpdata = {}
      this.attachmentsUpdata.areaId = null
      this.dialogEdit = false;
    },

    //删除按钮操作
    handleDelete(row) {
      const areaId = row.attachmentsId;
      this.$confirm('是否删除网格："' + row.itemName + '"？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        attachmentsDel(areaId).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getList();
          }
        })
      })
    },

    /** 搜索按钮操作 */
    handleQuery() {
      console.log(this.queryParams);
      this.queryParams.pageNum = 1;
      this.getList(this.queryParams);
    },

    // 标注弹窗打开
    openMap(center, id) {
      this.mapData.build = true
      this.mapData.gridCenter = center
      this.mapData.areaId = id
      this.dialogAnnotate = true;
      this.$refs.dialogData.mapData = this.mapData
    },

    //接收地图标注的传值
    coordinates(value, id) {
      // value 就是子组件传递过来的数据
      var param = {
        attachmentsId: id,
        mapTagging: value.areaCenter,
      };
      attachmentsPut(param).then((response) => {
        this.$modal.msgSuccess("保存成功");
        this.dialogAnnotate = false;
        this.getList();
      });
    },

    //关闭标注弹窗
    closeMap() {
      this.dialogAnnotate = false;
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

/* 编辑输入框样式 */
.input-width {
  width: 50%;
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
