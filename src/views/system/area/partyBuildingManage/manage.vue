<!-- 党内职务管理 -->
<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryParams"
      size="small"
      :inline="true"
      label-width="82px">
      <el-form-item label="关键词：" prop="keyword">
        <el-input clearable v-model="queryParams.dutyName" placeholder="请输入职务名称"/>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="handleQuery">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button plain @click="handleAdd()">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :loading="loading"
      :data="tableList"
      :header-cell-style="{ background: '#EBF7FF' }"
      stripe border>
<!--      <el-table-column label="职务编号" align="center" prop="dutyId" />-->
      <el-table-column label="职务名称" align="center" prop="dutyName" />
      <el-table-column label="状态" align="center" prop="dutyStatus" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" plain size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p>共查询/检索{{ this.total }}条信息</p>

    <!-- 党内职务管理添加弹窗 -->
    <el-dialog
      :visible.sync="addDialog"
      title="党内职务管理添加"
      width="30%"
      :close-on-click-modal="false"
      @close="closeAddDialog('addForm')">
      <template>
        <el-form
          ref="addForm"
          label-width="138px"
          :model="addForm"
          :rules="rules">
          <div class="dialogBox">
            <el-form-item label="职务名称：" prop="jobName">
              <el-input clearable v-model="addForm.dutyName" placeholder="请输入职务名称"/>
            </el-form-item>
            <el-form-item label="状态：" prop="radio">
              <el-radio v-model="addForm.dutyStatus" label="正常">正常</el-radio>
              <el-radio v-model="addForm.dutyStatus" label="停用">停用</el-radio>
            </el-form-item>
            <el-form-item label="备注：" prop="note">
              <el-input type="textarea" :rows="2" clearable v-model="addForm.memo" placeholder="请输入备注信息"/>
            </el-form-item>
          </div>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitAdd('addForm')">保存</el-button>
        <el-button  @click="closeAddDialog('addForm')">取消</el-button>
      </div>
    </el-dialog>

    <!-- 党内职务管理编辑弹窗 -->
    <el-dialog
      :visible.sync="editDialog"
      title="党内职务管理编辑"
      width="30%"
      :close-on-click-modal="false"
      @close="closeEditDialog('editForm')">
      <template>
        <el-form
          ref="editForm"
          label-width="138px"
          :model="editForm"
          :rules="rules">
          <div class="dialogBox">
            <el-form-item label="职务名称：" >
              <el-input clearable v-model="editForm.dutyName" placeholder="请输入职务名称"/>
            </el-form-item>
            <el-form-item label="状态：" prop="radio">
              <el-radio v-model="editForm.dutyStatus" label="正常">正常</el-radio>
              <el-radio v-model="editForm.dutyStatus" label="停用">停用</el-radio>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" :rows="2" v-model="editForm.memo" clearable placeholder="请输入备注信息"/>
            </el-form-item>
          </div>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitEdit('editForm')">保存</el-button>
        <el-button @click="closeEditDialog('editForm')">取消</el-button>
      </div>
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
import { dutyList,dutyEdit,dutyAdd,dutyDel } from "@/api/area/partyOrganization";
export default {
  name: "manage",
  data() {
    return {
      loading: true, // 遮罩层
      tableList: [], // 党组织表格数据
      // 查询参数
      queryParams: {
        userId:localStorage.getItem("userId"),
        dutyName:'',
        pageNum: 1,
        pageSize: 10,
      },
      total: 0, // 总条数
      addDialog: false, //添加党组织弹窗
      addForm: {  //添加党组织参数
        dutyStatus:'正常',
      },
      editDialog: false, //编辑党组织弹窗
      editForm: {}, //编辑党组织参数
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取页面数据
    getList() {
      this.loading = true;
      dutyList(this.queryParams).then((res) => {
        this.tableList = res.rows;
        this.total = res.total;
        this.loading = false;
      });
    },

    //查询按钮
    handleQuery() {
      this.getList(this.queryParams);
    },

    //添加党内职务管理弹窗打开
    handleAdd() {
      this.addDialog = true;
    },

    //添加党组织弹窗提交
    submitAdd(addForm) {
      this.$refs[addForm].validate((valid) => {
        dutyAdd(this.addForm).then((res) => {
          this.addDialog = false;
          this.$message.success("添加成功");
          this.$refs[addForm].resetFields();
          this.getList();
        });
      });
    },

    //添加党组织弹窗关闭
    closeAddDialog(addForm) {
      this.$refs[addForm].resetFields();
      this.addForm = {};
      this.addDialog = false;
    },

    // 编辑党组织弹窗打开
    handleEdit(row) {
      this.editDialog = true;
      console.log(row)
      let param = {
        dutyId:row.dutyId
      }
      dutyList(param).then((res) => {
        this.editForm = res.rows[0];
      });
    },

    //编辑党组织弹窗提交
    submitEdit(editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          console.log(this.editForm);
          dutyEdit(this.editForm)
            .then((res) => {
              this.editDialog = false;
              this.$message.success("修改成功");
              this.getList();
            })
            .catch(() => {});
        }
      });
    },

    //党组织弹窗关闭
    closeEditDialog(editForm) {
      this.$refs[editForm].resetFields();
      this.editDialog = false;
    },

    //删除按钮操作
    handleDelete(row) {
      const id = row.dutyId;
      this.$confirm('是否删除职务："' + row.dutyName + '"？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
          return dutyDel(id);
        }).then((data) => {
          this.$message.success("删除成功");
          this.getList();
        }).catch(() => {});
    },
  },
};
</script>
<style scoped>
::v-deep .el-dialog__title{
  font-weight: bold;
}
</style>
