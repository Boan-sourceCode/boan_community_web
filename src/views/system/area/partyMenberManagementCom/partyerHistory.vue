<!-- 历史党员 -->
<template>
  <div class="app-container">
    <!-- 查询条件 -->
    <el-form
      :model="queryParams"
      ref="queryParams"
      size="small"
      :inline="true"
      label-width="82px">
      <el-form-item label="所属组织：" prop="partyBranch">
        <treeSelect
          v-model="queryParams.partyBranch"
          :props="partyTreeProps"
          :options="partyTreeData"
          :value="value"
          placeholder="请选择">
        </treeSelect>
      </el-form-item>
      <el-form-item label="关键词：" prop="key">
        <el-input clearable v-model="queryParams.key" placeholder="姓名/身份证"/>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="handleQuery">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button plain @click="handleExport()">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :loading="loading"
      :data="historyPartyList"
      :header-cell-style="{ background: '#EBF7FF' }"
      stripe border>
      <el-table-column label="姓名" align="center" prop="name"/>
      <el-table-column label="性别" align="center" prop="sex">
        <template slot-scope="scope">
          <p v-if="scope.row.sex === '' || scope.row.sex === null">/</p>
          <p v-else>{{scope.row.sex}}</p>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" align="center" prop="birthday">
        <template slot-scope="scope">
          <p v-if="scope.row.birthday === '' || scope.row.birthday === null">/</p>
          <p v-else>{{scope.row.birthday}}</p>
        </template>
      </el-table-column>
      <el-table-column label="民族" align="center" prop="nation">
        <template slot-scope="scope">
          <p v-if="scope.row.nation === '' || scope.row.nation === null">/</p>
          <p v-else>{{scope.row.nation}}</p>
        </template>
      </el-table-column>
      <el-table-column label="身份证" align="center" prop="idCard">
        <template slot-scope="scope">
          <p v-if="scope.row.idCard === '' || scope.row.idCard === null">/</p>
          <p v-else>{{scope.row.idCard}}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属组织" align="center" prop="partyName">
        <template slot-scope="scope">
          <p v-if="scope.row.partyName === '' || scope.row.partyName === null">/</p>
          <p v-else>{{scope.row.partyName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="党内职务" align="center" prop="partyOccupation">
        <template slot-scope="scope">
          <p v-if="scope.row.partyOccupation === '' || scope.row.partyOccupation === null">/</p>
          <p v-else>{{scope.row.partyOccupation}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" plain size="small" @click="handleDetails(scope.row)">详情</el-button>
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p>共查询/检索{{ this.total }}条信息</p>

    <!-- 分页 -->
    <pagination
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList()"
    />

    <!-- 编辑弹窗 -->
    <el-dialog
      :visible.sync="editDialog"
      title="历史党员编辑"
      width="70%"
      :close-on-click-modal="false"
      @close="dictEditVisible('editForm')"
      center>
      <template>
        <el-form
          ref="editForm"
          label-width="138px"
          :model="editForm"
          :rules="rules">
          <div class="dialogBox">
            <el-form-item label="姓名：" prop="name" class="input-width">
              <el-input clearable v-model="editForm.name" disabled placeholder="请输入编号"/>
            </el-form-item>
            <el-form-item label="性别：" prop="sex" class="input-width">
              <el-select clearable v-model="editForm.sex" disabled placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.sys_user_sex"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="民族：" prop="nation" class="input-width">
              <el-select clearable disabled v-model="editForm.nation" placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.nation"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件类型：" prop="certificateType" class="input-width">
              <el-select clearable disabled v-model="editForm.certificateType" placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.certificate_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号：" prop="peopleCard" class="input-width">
              <el-input clearable disabled v-model="editForm.peopleCard" placeholder="请输入编号"/>
            </el-form-item>
            <el-form-item label="出生日期：" prop="birthday" class="input-width">
              <el-date-picker
                disabled
                v-model="editForm.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="partyImg" label="党员头像：" prop="headPortrait" style="margin-bottom: 0">
              <img v-if="this.editForm.headPortrait !== ''" :src="editForm.headPortrait" />
              <p v-else>暂无</p>
            </el-form-item>
            <hr style="margin-bottom: 24px" />
            <el-form-item label="所属党支部：" prop="partyId" class="input-width">
              <treeSelect
                disabled
                v-model="editForm.partyId"
                :props="partyTreeProps"
                :options="partyTreeData"
                :value="value"
                placeholder="请选择">
              </treeSelect>
            </el-form-item>
            <el-form-item label="党内所属职务：" prop="partyOccupation" class="input-width">
              <el-select clearable v-model="editForm.partyOccupation" placeholder="请选择">
                <el-option
                  v-for="item in postOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="党员状态：" prop="partyMemberStatus" class="input-width">
              <el-select clearable v-model="editForm.partyMemberStatus" placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.party_status"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请入党时间：" prop="applyJoinpartyTime" class="input-width">
              <el-date-picker
                v-model="editForm.applyJoinpartyTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="正式入党时间：" prop="officiaJoinpartyTime" class="input-width">
              <el-date-picker
                v-model="editForm.officiaJoinpartyTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="来源：" prop="source" class="input-width">
              <el-input clearable v-model="editForm.source" placeholder="请输入来源" />
            </el-form-item>
            <!--              <el-form-item label="党员失联/清退时间:" prop="dismissalTime" class="input-width">-->
            <!--                <el-date-picker-->
            <!--                  v-model="editForm.dismissalTime"-->
            <!--                  type="date"-->
            <!--                  placeholder="选择日期">-->
            <!--                </el-date-picker>-->
            <!--              </el-form-item>-->
            <el-form-item label="是否获得党员荣誉：" prop="honor" class="input-width">
              <el-select clearable v-model="editForm.honor" placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.is_party_status"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
              <el-input type="textarea" :rows="3" clearable v-model="editForm.remark" placeholder="请输入备注"/>
            </el-form-item>
          </div>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitEdit('editForm')">保存</el-button>
        <el-button @click="dictEditVisible('editForm')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { historyParty,partyTreeLimit,partyEdit,partyPost,partySubmit } from "@/api/area/partymember";
export default {
  name: "partyerHistory",
  dicts: [
    "sys_user_sex",
    "nation",
    "certificate_type",
    "party_status",
    "is_party_status",
  ],
  data() {
    return {
      loading: true, // 遮罩层
      historyPartyList: [], // 党组织表格数据
      // 查询参数
      queryParams: {
        userId:localStorage.getItem("userId"),
        partyBranch:"",
        key:"",
        pageNum: 1,
        pageSize: 10,
        flag:1,
      },
      total: 0, // 总条数
      partyTreeData: [], //党组织数据
      partyTreeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      value:'',
      editDialog: false, //编辑党组织弹窗
      editForm: { //编辑参数
        peopleCard:'',
        partyId:'',
        partyOccupation:'',
        partyMemberStatus:'',
        applyJoinpartyTime:'',
        officiaJoinpartyTime:'',
        source:'',
        honor:'',
        remark:'',
      },
      postOptions:[], //党员职务数据
      rules: {},
    };
  },
  created() {
    this.getList();
    this.getTree();
  },
  methods: {
    // 获取页面数据
    getList() {
      this.loading = true;
      historyParty(this.queryParams).then((res) => {
        this.historyPartyList = res.rows;
        this.total = res.total;
        this.loading = false;
      });
    },

    // 查询树
    getTree() {
      let param = {
        userId:localStorage.getItem("userId"),
      }
      partyTreeLimit(param).then(res => {
        this.partyTreeData = res.data
      })
    },

    //查询按钮
    handleQuery() {
      this.getList(this.queryParams);
    },

    //导出按钮操作
    handleExport() {
      this.download('/system/member/export', {
        ...this.queryParams
      }, `历史党员-${new Date().getTime()}.xlsx`)
    },

    //详情
    handleDetails(row) {
      const src = `/partyerListDetails`;
      this.$router.push({
        path: src,
        query: { id: row.id},
      });
    },

    // 编辑弹窗打开
    handleEdit(row) {
      this.editDialog = true;
      let param = {
        id:row.id,
      }
      partyEdit(param).then((res) => {
        if (res.code === 200) {
          this.editForm = res.data;
          if (this.editForm.headPortrait !== "" && this.editForm.headPortrait !== null){
            this.editForm.headPortrait = process.env.VUE_APP_BASE_API + this.editForm.headPortrait
          }else {
            this.editForm.headPortrait = ''
          }
        }
      });
      this.getPartyPost()
    },

    //获取党员职务
    getPartyPost() {
      partyPost().then((res) => {
        if (res.code === 200) {
          let options = res.data
          this.postOptions = options.map(item => {
            return {value:`${item.dutyName}`,label: `${item.dutyName}`};
          })
        }
      });
    },

    //编辑的提交按钮
    submitEdit(editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          console.log(this.editForm);
          partySubmit(this.editForm).then((res) => {
            this.editDialog = false;
            this.$message.success("修改成功");
            this.getList();
          })
        }
      });
    },

    //编辑弹窗关闭
    dictEditVisible(editForm) {
      this.$refs[editForm].resetFields();
      this.editDialog = false;
    },
  },
};
</script>
<style scoped>
/* 编辑样式 */
.input-width {
  width: 31%;
  display: inline-block;
}
.input-width div {
  width: 90%;
}
::v-deep .el-dialog__title{
  font-weight: bold;
}
.partyImg img{
  width: 146px;
  height: 146px;
}
.partyImg p{
  margin: 0;
}
</style>
