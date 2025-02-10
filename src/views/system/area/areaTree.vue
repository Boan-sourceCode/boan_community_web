<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="名称" prop="areaName">
        <el-input
          v-model="queryParams.areaName"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="网格名简写" prop="areaShortname">
        <el-input
          v-model="queryParams.areaShortname"
          placeholder="请输入网格名简写"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="面积" prop="areaMeasure">
        <el-input
          v-model="queryParams.areaMeasure"
          placeholder="请输入面积"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:areaTree:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          size="mini"
          @click="toggleExpandAll"
          >展开/折叠</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="areaTreeList"
      row-key="areaId"
      :default-expand-all="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="编号" prop="areaNo" />
      <el-table-column label="名称" align="center" prop="areaName" />
      <el-table-column label="网格名简写" align="center" prop="areaShortname" />
      <el-table-column label="地址" align="center" prop="areaAddr" />
      <el-table-column
        label="网格长姓名"
        align="center"
        prop="arealeaderName"
      />
      <el-table-column label="网格长ID" align="center" prop="arealeaderCard" />
      <el-table-column label="网格员姓名" align="center" prop="areaerName" />
      <el-table-column label="网格是否标注" align="center" prop="isTagging">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.sys_normal_disable"
            :value="scope.row.isTagging"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="网格图片"
        align="center"
        prop="areaPicture"
        width="100"
      >
        <template slot-scope="scope">
          <image-preview
            :src="scope.row.areaPicture"
            :width="50"
            :height="50"
          />
        </template>
      </el-table-column>
      <el-table-column label="区域层级" align="center" prop="areaLevel" />
      <el-table-column label="网格类型" align="center" prop="areaType" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:areaTree:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:areaTree:add']"
            >新增</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:areaTree:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改网格-网格管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="编号" prop="areaNo">
          <el-input v-model="form.areaNo" placeholder="请输入编号" />
        </el-form-item>
        <el-form-item label="名称" prop="areaName">
          <el-input v-model="form.areaName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="网格名简写" prop="areaShortname">
          <el-input
            v-model="form.areaShortname"
            placeholder="请输入网格名简写"
          />
        </el-form-item>
        <el-form-item label="地址" prop="areaAddr">
          <el-input v-model="form.areaAddr" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="面积" prop="areaMeasure">
          <el-input v-model="form.areaMeasure" placeholder="请输入面积" />
        </el-form-item>
        <el-form-item label="所属上级" prop="pAreaId">
          <treeselect
            v-model="form.pAreaId"
            :options="areaTreeOptions"
            :normalizer="normalizer"
            placeholder="请选择所属上级"
          />
        </el-form-item>
        <el-form-item label="网格长姓名" prop="arealeaderName">
          <el-input
            v-model="form.arealeaderName"
            placeholder="请输入网格长姓名"
          />
        </el-form-item>
        <el-form-item label="网格长ID" prop="arealeaderCard">
          <el-input
            v-model="form.arealeaderCard"
            placeholder="请输入网格长ID"
          />
        </el-form-item>
        <el-form-item label="网格员姓名" prop="areaerName">
          <el-input
            v-model="form.areaerName"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="中心点" prop="areaCenter">
          <el-input v-model="form.areaCenter" placeholder="请输入中心点" />
        </el-form-item>
        <el-form-item label="网格是否标注">
          <el-radio-group v-model="form.isTagging">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="网格简介" prop="areaIntroduction">
          <el-input
            v-model="form.areaIntroduction"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="网格图片">
          <image-upload v-model="form.areaPicture" />
        </el-form-item>
        <el-form-item label="添加人" prop="addUser">
          <el-input v-model="form.addUser" placeholder="请输入添加人" />
        </el-form-item>
        <el-form-item label="修改人" prop="updateUser">
          <el-input v-model="form.updateUser" placeholder="请输入修改人" />
        </el-form-item>
        <el-form-item label="风采">
          <image-upload v-model="form.areaMien" />
        </el-form-item>
        <el-form-item label="介绍">
          <editor v-model="form.areaIntroduce" :min-height="192" />
        </el-form-item>
        <el-form-item label="添加时间" prop="addTime">
          <el-date-picker
            clearable
            v-model="form.addTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择添加时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="该区域事件总数" prop="keyeventsCount">
          <el-input
            v-model="form.keyeventsCount"
            placeholder="请输入该区域事件总数"
          />
        </el-form-item>
        <el-form-item label="该区域人口总数" prop="peopleCount">
          <el-input
            v-model="form.peopleCount"
            placeholder="请输入该区域人口总数"
          />
        </el-form-item>
        <el-form-item label="该区域非公有制经济组织总数" prop="norgCount">
          <el-input
            v-model="form.norgCount"
            placeholder="请输入该区域非公有制经济组织总数"
          />
        </el-form-item>
        <el-form-item label="该区域社会组织总数" prop="orgCount">
          <el-input
            v-model="form.orgCount"
            placeholder="请输入该区域社会组织总数"
          />
        </el-form-item>
        <el-form-item label="该区域部件总数" prop="attachmentsCount">
          <el-input
            v-model="form.attachmentsCount"
            placeholder="请输入该区域部件总数"
          />
        </el-form-item>
        <el-form-item label="该区域建筑物总数" prop="buildingCount">
          <el-input
            v-model="form.buildingCount"
            placeholder="请输入该区域建筑物总数"
          />
        </el-form-item>
        <el-form-item label="该区域社情民意总数" prop="pollCount">
          <el-input
            v-model="form.pollCount"
            placeholder="请输入该区域社情民意总数"
          />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="党组织名称" prop="partyName">
          <el-input v-model="form.partyName" placeholder="请输入党组织名称" />
        </el-form-item>
        <el-form-item label="党组织负责人" prop="partyManager">
          <el-input
            v-model="form.partyManager"
            placeholder="请输入党组织负责人"
          />
        </el-form-item>
        <el-form-item label="党组织风采" prop="partyPropagate">
          <el-input
            v-model="form.partyPropagate"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="党组织头像">
          <image-upload v-model="form.partyAvatar" />
        </el-form-item>
        <el-form-item label="党组织分级 关联code表" prop="partyLevel">
          <el-input
            v-model="form.partyLevel"
            placeholder="请输入党组织分级 关联code表"
          />
        </el-form-item>
        <el-form-item label="党组织坐标" prop="partyMap">
          <el-input v-model="form.partyMap" placeholder="请输入党组织坐标" />
        </el-form-item>
        <el-form-item label="党组织简介" prop="partyAbstract">
          <el-input
            v-model="form.partyAbstract"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="党组织缩写" prop="partyAcronym">
          <el-input
            v-model="form.partyAcronym"
            placeholder="请输入党组织缩写"
          />
        </el-form-item>
        <el-form-item label="党组织账号" prop="partyUser">
          <el-input v-model="form.partyUser" placeholder="请输入党组织账号" />
        </el-form-item>
        <el-form-item label="党组织荣誉,关联type表" prop="partyHonor">
          <el-input
            v-model="form.partyHonor"
            placeholder="请输入党组织荣誉,关联type表"
          />
        </el-form-item>
        <el-form-item label="党组织密码" prop="partyPassword">
          <el-input
            v-model="form.partyPassword"
            placeholder="请输入党组织密码"
          />
        </el-form-item>
        <el-form-item label="有效状态;0.有效1.以停用2.已注销" prop="validType">
          <el-select
            v-model="form.validType"
            placeholder="请选择有效状态;0.有效1.以停用2.已注销"
          >
            <el-option
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网格标注颜色" prop="areaColor">
          <el-input v-model="form.areaColor" placeholder="请输入网格标注颜色" />
        </el-form-item>
        <el-form-item label="网格员ID" prop="areaerCard">
          <el-input v-model="form.areaerCard" placeholder="请输入网格员ID" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listAreaTree,
  getAreaTree,
  delAreaTree,
  addAreaTree,
  updateAreaTree,
} from "@/api/area/areaTree";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "AreaTree",
  dicts: ["sys_normal_disable"],
  components: {
    Treeselect,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 网格-网格管理表格数据
      areaTreeList: [],
      // 网格-网格管理树选项
      areaTreeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        areaName: null,
        areaShortname: null,
        areaMeasure: null,
        areaType: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询网格-网格管理列表 */
    getList() {
      this.loading = true;
      listAreaTree(this.queryParams).then((response) => {
        this.areaTreeList = this.handleTree(response.data, "areaId", "pAreaId");
        this.loading = false;
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
        children: node.children,
      };
    },
    /** 查询网格-网格管理下拉树结构 */
    getTreeselect() {
      listAreaTree().then((response) => {
        this.areaTreeOptions = [];
        const data = { areaId: 0, areaName: "顶级节点", children: [] };
        data.children = this.handleTree(response.data, "areaId", "pAreaId");
        this.areaTreeOptions.push(data);
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        areaId: null,
        areaNo: null,
        areaName: null,
        areaShortname: null,
        areaAddr: null,
        areaMeasure: null,
        pAreaId: null,
        arealeaderName: null,
        arealeaderCard: null,
        areaerName: null,
        areaCenter: null,
        isTagging: "0",

        areaIntroduction: null,
        areaPicture: null,
        areaLevel: null,
        areaType: null,
        addUser: null,
        updateUser: null,
        status: 0,

        updateTime: null,
        areaMien: null,
        areaIntroduce: null,
        addTime: null,
        keyeventsCount: null,
        peopleCount: null,
        norgCount: null,
        orgCount: null,
        attachmentsCount: null,
        buildingCount: null,
        pollCount: null,
        memo: null,
        partyName: null,
        partyManager: null,
        partyPropagate: null,
        partyAvatar: null,
        partyLevel: null,
        partyMap: null,
        partyAbstract: null,
        partyAcronym: null,
        partyUser: null,
        partyHonor: null,
        partyPassword: null,
        validType: null,
        mergeType: null,
        areaColor: null,
        areaerCard: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != null && row.areaId) {
        this.form.pAreaId = row.areaId;
      } else {
        this.form.pAreaId = 0;
      }
      this.open = true;
      this.title = "添加网格-网格管理";
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      if (row != null) {
        this.form.pAreaId = row.areaId;
      }
      getAreaTree(row.areaId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改网格-网格管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.areaId != null) {
            updateAreaTree(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAreaTree(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal
        .confirm(
          '是否确认删除网格-网格管理编号为"' + row.areaId + '"的数据项？'
        )
        .then(function () {
          return delAreaTree(row.areaId);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
  },
};
</script>
