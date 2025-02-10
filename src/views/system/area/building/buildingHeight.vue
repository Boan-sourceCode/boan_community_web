<template>
  <div class="app-container">
    <h1>楼房/院落高级查询检索</h1>
    <!-- 下拉选择集合 -->
    <el-form class="demo-form-inline" :model="queryParams" ref="form" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <div class="top">
        <ul class="one">
          <li>
            <el-form-item prop="grid" class="grid">
              <p class="title" style="display: inline-block; font-weight:400;">网格：</p>
              <treeSelect
                :props="treeProps"
                :options="treeData"
                v-model="value"
                :accordion="true"
                @getValue="getList($event)"
                placeholder="请选择">
              </treeSelect>
            </el-form-item>
          </li>
          <li>
            <el-form-item>
              <p class="title" style="display: inline-block; font-weight:400;">类型：</p>
              <el-select v-model="queryParams.houseType" clearable placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.building"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li>
            <el-form-item>
              <p class="title" style="display: inline-block; font-weight:400;">所属小区：</p>
              <el-select v-model="queryParams.communityName" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in areaList"
                  :key="item.id"
                  :label="item.communityName"
                  :value="item.id"
                  @click.native="topSelectCommunty(item)">
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li>
            <el-form-item>
              <p class="title" style="display: inline-block; font-weight:400;">建筑类型：</p>
              <el-select v-model="queryParams.architectureType" clearable placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.building_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li>
            <el-form-item>
              <p class="title" style="display: inline-block; font-weight:400;">建筑用途：</p>
              <el-select v-model="queryParams.architecturePurpose" clearable placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.building_purpose"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
          </li>
        </ul>
        <ul class="two">
          <li>
            <el-form-item>
              <p class="title" style="display: inline-block; font-weight:400;">房属产权：</p>
              <el-select v-model="queryParams.housePropertyRight" clearable placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.house_property_right"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li>
            <el-form-item>
              <p class="title" style="display: inline-block; font-weight:400;">楼隐患类型：</p>
              <el-select v-model="queryParams.hiddenDangerType" clearable placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.building_danger_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li>
            <el-form-item>
              <p class="title" style="display: inline-block; font-weight:400;">楼隐患级别：</p>
              <el-select v-model="queryParams.hiddenDangerLevel" clearable placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.focous_degree"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
          </li>
<!--          <li>-->
<!--            <el-form-item>-->
<!--              <p class="title" style="display: inline-block; font-weight:400;">楼长：</p>-->
<!--              <el-select v-model="queryParams.buildingMaster" clearable placeholder="请选择">-->
<!--                <el-option-->
<!--                  v-for="item in masterList"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </li>-->
        </ul>
      </div>
      <div class="bottom">
        <div class="left">
          <div>
            <span>关键字:</span>
            <el-input v-model="queryParams.key" clearable placeholder="名称/楼长"></el-input>
          </div>
          <el-button type="primary" @click="getTabInfo">查询</el-button>
        </div>
        <div class="right">
          <el-button type="primary" @click="moveBuilding">移动</el-button>
          <el-button type="primary" class="right-first" @click="batchUpdateAddress">批量修改标准地址</el-button>
          <el-button type="primary" class="right-first" @click="batchSettingsAttributes">批量设置楼房/院落属性</el-button>
          <el-button type="primary" @click="handleExport">导出</el-button>
        </div>
      </div>
    </el-form>
    <!-- table表格 -->
    <el-table v-loading="loading" :data="tabList" @selection-change="handleSelectionChange"  :header-cell-style="{background:'#EBF7FF'}" stripe border>
      <el-table-column type="selection" width="55" align="center"/>
<!--      <el-table-column label="编号" prop="id" width="80" align="center"/>-->
      <el-table-column label="序号" align="center" width="60">
        <template slot-scope="scope">
          {{ (scope.$index+1)+(queryParams.currentPage-1)*queryParams.pageSize}}
        </template>
      </el-table-column>
      <el-table-column label="模板" prop="buildingTemplate" :show-overflow-tooltip="true" width="80" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.buildingTemplate === '' || scope.row.buildingTemplate === null">/</p>
          <p v-else>{{scope.row.buildingTemplate}}</p>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="houseType" :show-overflow-tooltip="true" width="80" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.houseType === '' || scope.row.houseType === null">/</p>
          <p v-else>{{scope.row.houseType}}</p>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="buildingName" :show-overflow-tooltip="true" width="110" align="center"/>
      <el-table-column label="所属网格" prop="areaName" width="180" align="center"/>
      <el-table-column label="所属小区" prop="communityName" width="110" align="center"/>
      <el-table-column label="楼长" prop="building_master" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.houseType === '楼房'">{{scope.row.buildingMaster}}</p>
          <p v-if="scope.row.houseType === '院落'">无</p>
        </template>
      </el-table-column>
      <el-table-column label="建筑类型" prop="architectureType" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.architectureType === '' || scope.row.architectureType === null">/</p>
          <p v-else>{{scope.row.architectureType}}</p>
        </template>
      </el-table-column>
      <el-table-column label="建筑用途" prop="architecturePurpose" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.architecturePurpose === '' || scope.row.architecturePurpose === null">/</p>
          <p v-else>{{scope.row.architecturePurpose}}</p>
        </template>
      </el-table-column>
      <el-table-column label="房屋产权" prop="housePropertyRight" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.housePropertyRight === '' || scope.row.housePropertyRight === null">/</p>
          <p v-else>{{scope.row.housePropertyRight}}</p>
        </template>
      </el-table-column>
      <el-table-column label="楼隐患类型" prop="hiddenDangerType" width="110" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.hiddenDangerType === '' || scope.row.hiddenDangerType === null">/</p>
          <p v-else>{{scope.row.hiddenDangerType}}</p>
        </template>
      </el-table-column>
      <el-table-column label="楼隐患级别" prop="hiddenDangerLevel" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.hiddenDangerLevel === '' || scope.row.hiddenDangerLevel === null">/</p>
          <p v-else>{{scope.row.hiddenDangerLevel}}</p>
        </template>
      </el-table-column>
      <el-table-column label="标准地址" prop="buildingAddress" align="center"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope"> <!--v-if="scope.row.roleId !== 1" -->
          <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)" v-hasPermi="['system:role:edit']">编辑</el-button>
          <el-button type="danger" plain size="small" @click="handleDelete(scope.row)" v-hasPermi="['system:role:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p class="bottom-msg">共查询/检索 {{ total }} 条信息</p>

    <!-- 编辑楼房弹窗 -->
    <el-dialog
      :visible.sync="dialogEdit"
      title="编辑楼房/院落"
      width="70%"
      :close-on-click-modal="false"
      @close="cancel('editForm')"
      class="building_dialog_wrap">
      <template>
        <el-form v-model="editForm">
          <div class="el_dialog_top">
            <p class="title">网格信息：</p>
            <ul class="one">
              <li>
                <span>网格编号：</span>
                <span>{{ editDialogInfo.areaNo }}</span>
              </li>
              <li>
                <span>网格名称：</span>
                <span>{{ editDialogInfo.areaName }}</span>
              </li>
              <li>
                <span>网格简称：</span>
                <span>{{ editDialogInfo.areaShortname }}</span>
              </li>
            </ul>
            <ul class="two">
              <li>
                <span>网格类型：</span>
                <span>{{ editDialogInfo.areaType }}</span>
              </li>
              <li>
                <span>网格长：</span>
                <span>{{ editDialogInfo.buildingMaster }}</span>
              </li>
              <li>
                <span>网格面积：</span>
                <span>{{ editDialogInfo.areaMeasure }}</span>
                <span>㎡</span>
              </li>
            </ul>
            <ul class="three">
              <li>
                <span>所属网格：</span>
                <span>{{ editDialogInfo.belongtoArea }}</span>
              </li>
            </ul>
          </div>
          <div class="el_dialog_bottom">
            <p class="title">楼栋信息：</p>
            <div class="edit_dialog_top">
              <el-form-item label="所属小区：">
                <el-select v-model="editForm.communityName" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in areaList"
                    :key="index"
                    :label="item.communityName"
                    :value="item.id"
                    @click.native="seletCommunity(item)">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼栋/院落名称：">
                <el-input v-model="editForm.buildingName"></el-input>
              </el-form-item>
              <el-form-item label="楼房编号：" class="three">
                <el-input v-model="editForm.id" readonly></el-input>
              </el-form-item>
            </div>
            <div class="edit_dialog_top two">
              <el-form-item label="建筑类型：">
                <el-select v-model="editForm.architectureType" placeholder="请选择">
                  <el-option
                    v-for="dict in dict.type.building_type"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                    @click.native="Buildingpulldown">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="建筑用途：">
                <el-select v-model="editForm.architecturePurpose" placeholder="请选择">
                  <el-option
                    v-for="item in dingpulldown"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼房产权：">
                <el-select v-model="editForm.housePropertyRight" placeholder="请选择">
                  <el-option
                    v-for="dict in dict.type.house_property_right"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="edit_dialog_top three">
              <el-form-item label="楼房隐患类型：">
                <el-select v-model="editForm.hiddenDangerType" placeholder="请选择">
                  <el-option
                    v-for="dict in dict.type.building_danger_type"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼房隐患级别：">
                <el-select v-model="editForm.hiddenDangerLevel" placeholder="请选择">
                  <el-option
                    v-for="dict in dict.type.focous_degree"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼长：">
                <el-input v-model="managerInput" placeholder="输入楼长姓名"></el-input>
                <el-button size="mini" @click="addManager">添加</el-button>
                <div class="add_manager_wrap">
                  <div class="add_manager" v-for="(item, index) in managerList" :key="index">
                    <span>{{ item }}</span>
                    <span class="icon-close" @click="canelManager(item, index)"></span>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div class="edit_dialog_top four">
              <el-form-item label="标准地址：">
                <el-input v-model="editForm.buildingAddress" placeholder="请输入标准地址"></el-input>
              </el-form-item>
            </div>
            <div class="edit_dialog_top five">
              <el-form-item label="上传图片：">
                <image-upload v-model="editForm.picture" :limit="1" />
              </el-form-item>
            </div>
            <ul class="six">
              <li>
                <span>楼房简介：</span>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="editForm.brief">
                </el-input>
              </li>
            </ul>
          </div>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitForm(editForm)">保存</el-button>
        <el-button type="default" @click="cancel('editForm')">取消</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <pagination
      :total="total"
      :page.sync="queryParams.currentPage"
      :limit.sync="queryParams.pageSize"
      @pagination="getTabInfo()"
    />
    <!-- 移动功能弹出框   -->
    <el-dialog title="提示信息" :visible.sync="outerVisible" width="20%">
      <div class="outer_wrap">
        <span class="icon-exclamation-circle"></span>
        <span class="outer_msg">您确定移动选中的楼房及楼房下单元、房屋嘛？</span>
      </div>
      <el-dialog
        width="30%"
        title="楼房批量移动"
        :visible.sync="innerVisible"
        append-to-body
        class="inner_container">
        <div class="inner_wrap">
          <p class="title" style="display: inline-block; font-weight:400;">网格：</p>
          <treeSelect
            :props="treeProps"
            :options="treeData"
            v-model="value"
            :accordion="true"
            @getValue="moveGrid($event)"
            placeholder="请选择">
          </treeSelect>
          <el-alert
            title="请选择要移动至的网格！"
            type="error"
            v-if="moveErrorMsg"
            style="position: relative; top: 20px; width: 65%; margin-left: 19px;">
          </el-alert>
        </div>
        <footer slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerConfirm" :disabled="innerDis">确定</el-button>
          <el-button type="info" @click="innerCancel">取消</el-button>
        </footer>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="moveHandle">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { treeList ,areaTree} from "@/api/area/area";
import {getBuildingHeightInfo,getBuildingHeightInfoLimit, returnDefaultBuild, updateBuliding, queryBuildingArea, deleteBuilding, advanceExport,
  moveOtherAreaPort, getBuildingMaster, buildingExport,getArchiPurposeByType} from '@/api/area/house'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  dicts:['building_type', 'building_purpose', 'house_property_right', 'building_danger_type', 'focous_degree', 'building'],
  name: "houseHeight",
  components: { Treeselect },
  data () {
    return {
      dingpulldown:[],// 实有建筑-编辑楼房-选择建筑类型建筑用途列表数据
      innerDis: false, // 移动内部弹框确定按钮禁用
      moveErrorMsg: false, // 移动内部弹出框不选择网格的错误提示信息
      outerVisible: false, // 移动功能外部弹出框
      innerVisible: false, // 移动功能内部弹出框
      // 遮罩层
      loading: true,
      input: '', // 关键字
      // 所属小区
      area: '',
      // 所属小区下拉数据
      areaList: [],
      // 查询表格数据
      queryParams: {
        userId:localStorage.getItem("userId"),
        areaId: '',
        communityName: '',
        communityId: '',
        buidingNumber: '',
        architectureType: '',
        architecturePurpose: '',
        housePropertyRight: '',
        hiddenDangerType: '',
        hiddenDangerLevel: '',
        buildingMaster: '',
        buildingName: '',
        currentPage: 1,
        pageSize: 10
      },
      // 显示搜索条件
      showSearch: true,
      treeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      treeData: [], //下拉框数据
      value:'',//选中的数据
      tabList: [], // 存储表格信息列表集合
      settingsParams: { // 批量设置楼房/院落属性请求参数
        ids: []
      },
      dialogEdit: false, // 编辑楼房弹窗展示状态

      managerInput: '', // 楼长输入框双向绑定
      managerList: [], // 添加楼长存储集合
      addressInput: '', // 标准地址输入框
      textarea2: '', // 楼房简介输入框
      dialogVisible: false,
      editParams: {
        id: ''
      },
      editDialogInfo: {}, // 编辑弹框默认返回信息存储对象
      editForm: {
        buildingAddress: "",
        hiddenDangerLevel: "",
        architectureType: "",
        buildingName: "",
        houseType: "",
        communityName: "",
        communityId: '',
        id: 139,
        housePropertyRight: null,
        buildingMaster: null,
        architecturePurpose: null,
        hiddenDangerType:null,
        buildingPicture: '',
        admin:'',
        updateBy: ''
      },
      total: 0, // 总页数,
      checkedIdList: [], // 选中的表格ID集合
      exportBuilding: {
        idList: []
      },
      moveParams: {
        areaId: '',
        buildingInfo: []
      },
      masterList:[], //楼长数据
    }
  },
  created() {
    this.getTabInfo()
    this.getTreeSelect()
  },
  methods: {
    topSelectCommunty (item) {
      this.queryParams.communityId = item.id
      this.queryParams.communityName = item.communityName
    },
    seletCommunity (item) {
      this.editForm.communityId = item.id
      this.editForm.communityName = item.communityName
    },
    // 批量修改标准地址
    batchUpdateAddress () {
      if (this.checkedIdList.length === 0) {
        this.$message.error('请先选择要编辑的楼房！')
      } else {
        this.$router.push({path: '/batchUpdateAddress'})
      }
    },
    // 移动按钮内部弹出框确定按钮
    innerConfirm () {
      console.log(this.moveParams.areaId);
      if (this.moveParams.areaId === '') {
        this.moveErrorMsg = true
        this.innerDis = true
      } else if (this.moveParams.areaId !== '') {
        console.log(this.moveParams);
        moveOtherAreaPort (this.moveParams).then((res) => {
          if (res.code === 200) {
            this.innerVisible = false
            this.$message.success(res.msg)
            this.getTabInfo()
          }
        })
      }
    },
    // 移动内部弹出框取消按钮
    innerCancel () {
      this.outerVisible = false
      this.innerVisible = false
    },
    moveGrid (data) {
      if (data !== undefined) {
        this.getParent(this.treeData, data.id)
        this.moveParams.areaId = data.id
        console.log(this.checkedIdList);
        this.moveErrorMsg = false
        this.innerDis = false
        console.log(data);
      }
    },
    // 移动弹框一级弹出框确定按钮
    moveHandle () {
      this.outerVisible = false
      this.innerVisible = true
    },
    // 移动按钮
    moveBuilding () {
      console.log(this.checkedIdList);
      if (this.checkedIdList.length === 0) {
        this.$message.error('请先选择要移动的楼房')
      } else {
        this.outerVisible = true
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      console.log(this.exportBuilding)
      if (this.checkedIdList.length === 0) {
        this.download('/system/buiding/export', {
          ...this.queryParams
        }, `网格信息-${new Date().getTime()}.xlsx`)
      } else if (this.checkedIdList.length !== 0) {
        this.download('/front/building/advanceExport', {
          ...this.exportBuilding
        }, `网格信息-${new Date().getTime()}.xlsx`)
      }
    },
    // 编辑弹窗保存按钮
    submitForm (value) {
      this.editForm.updateBy = Cookies.get('username')
      let masterList = []
      this.managerList.map((item) => {
        masterList.push(item)
      })
      this.editForm.buildingMaster = masterList.toString();
      console.log(this.editForm);
      let editForm = {
        buildingAddress: this.editForm.buildingAddress,
        hiddenDangerLevel: this.editForm.hiddenDangerLevel,
        architectureType: this.editForm.architectureType,
        buildingName: this.editForm.buildingName,
        houseType: this.editForm.houseType,
        communityId: this.editForm.communityId,
        communityName: this.editForm.communityName,
        id: this.editForm.id,
        housePropertyRight: this.editForm.housePropertyRight,
        buildingMaster: this.editForm.buildingMaster,
        architecturePurpose: this.editForm.architecturePurpose,
        hiddenDangerType: this.editForm.hiddenDangerType,
        buildingPicture: this.editForm.picture,
        buildingBriefIntroduction: this.editForm.brief
      }
      console.log(editForm);
      updateBuliding (editForm).then((res) => {
        if (res.code === 200) {
          masterList = []
          this.dialogEdit = false
          this.$message.success('修改成功')
          this.getTabInfo()
        }
      })
    },
    // 编辑遮罩层 - 添加楼长之后显示的tab删除按钮
    canelManager (item, index) {
      this.managerList.splice(index,1)
    },
    // 编辑遮罩层 - 添加楼长按钮
    addManager () {
      this.managerList.push(this.managerInput)
      console.log(this.managerInput);
      this.managerInput = ''
    },
    // 编辑的取消按钮
    cancel() {
      console.log(this.managerList);
      this.managerList = []
      this.dialogEdit = false;
    },
    // 表格编辑按钮
    handleUpdate (row) {
      console.log(row);
      this.editParams.id = row.id
      this.loading = true
      returnDefaultBuild (this.editParams).then((res) => {
        if (res.code === 200) {
          this.dialogEdit = true
          this.loading = false
          this.editDialogInfo = res.data[0]
          this.editForm = this.editDialogInfo
          // this.editForm.buildingPicture = res.data[0].picture
          let a = []
          a.push(this.editDialogInfo.buildingMaster)
          a.map((item) => {
            console.log(item);
            if (this.managerList.indexOf(item) === -1) {
              this.managerList.push(item)
            }
          })
        }
      })
    },
    // 表格删除
    handleDelete (row) {
      console.log(row);
      let params = {
        id: row.id,
        houseType: row.house_type,
        communityName: row.community_name
      }
      this.$confirm('是否删除建筑："' + row.building_name + '"？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBuilding (params).then((res) => {
          if (res.code === 200) {
            this.getTabInfo();
            this.$message.success('删除成功')
          }
        })
      }).catch(() => {})
    },
    // 批量设置楼房/院落属性按钮 - 跳转相应页面进行处理
    batchSettingsAttributes () {
      console.log(this.queryParams.areaId);
      if (this.checkedIdList.length === 0) {
        this.$message.error('请先选择要编辑的楼房！')
      } else {
        this.$router.push({path: '/batchSettingsBuildHeight'})
      }
    },
    // 获取表格信息
    getTabInfo () {
      console.log(this.queryParams);
      this.loading = true
      getBuildingHeightInfoLimit (this.queryParams).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.loading = false
          this.tabList = res.data.list
          this.total = res.data.total
          console.log(this.tabList);
          console.log(this.queryParams)
          // if (this.queryParams.areaId === ''){
          //   let param = {
          //     areaId: 1
          //   }
          //   queryBuildingArea (param).then ((res) => {
          //     if (res.code === 200) {
          //       this.areaList = res.data
          //     }
          //   })
          // }else{
          //   let param = {
          //     areaId: this.queryParams.areaId
          //   }
          //   queryBuildingArea (param).then ((res) => {
          //     if (res.code === 200) {
          //       this.areaList = res.data
          //     }
          //   })
          // }
          // this.buildingMaster()
        }
      })
    },
    //获取楼长
    // buildingMaster(){
    //   if (this.queryParams.areaId === ''){
    //     let param = {
    //       areaId: 1
    //     }
    //     getBuildingMaster (param).then((res) => {
    //       if (res.code === 200) {
    //         let masterOptions = res.data
    //         this.masterList = masterOptions.map(item => {
    //           return {value:`${item.buildingMaster}`,label: `${item.buildingMaster}`};
    //         })
    //         console.log(res);
    //       }
    //     })
    //   }else{
    //     let param = {
    //       areaId: this.queryParams.areaId
    //     }
    //     getBuildingMaster (param).then((res) => {
    //       if (res.code === 200) {
    //         let masterOptions = res.data
    //         this.masterList = masterOptions.map(item => {
    //           return {value:`${item.buildingMaster}`,label: `${item.buildingMaster}`};
    //         })
    //         console.log(res);
    //       }
    //     })
    //   }
    // },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.settingsParams.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
      this.exportBuilding.idList = this.settingsParams.ids
      this.checkedIdList = selection.map(item => item.id)
      this.moveParams.buildingInfo = selection.map(item => item.id)
      localStorage.setItem('checkedIdList', JSON.stringify(selection.map(item => item.id)))
    },

    /** 获取网格树状结构数据 */
    getTreeSelect () {
      let param = {
        userId:localStorage.getItem("userId"),
        flag:0
      }
      // treeList ().then(res => {
      areaTree (param).then(res => {
        this.treeData = res.data
        this.childrenList = res.data[0].children
        this.areaTitle = res.data[0].label
        this.stringPosition = res.data[0].label
        this.loading = false
        console.log(res.data);
      })
    },
    getList (data) {
      if (data !== undefined) {
        this.getParent(this.treeData, data.id)
        console.log(data);
        this.areaTitle = data.label
        this.queryParams.areaId= data.id
        // this.buildingMaster()
        console.log(data);
        console.log(this.queryParams.areaId);
        let param = {
          areaId: this.queryParams.areaId
        }
        queryBuildingArea (param).then ((res) => {
          if (res.code === 200) {
            this.areaList = res.data
          }
        })
      }
    },
    //反向递归获取位置
    getParent(treeData, value ,children = 'children', level = 0 ) {
      let arrResString = '';
      let obj={value:0,[children]:treeData};
      let rev=(treeData,value,level)=>{
        if(!treeData||!treeData[children]||!treeData[children].length){
          return;
        }
        for (let i = 0; i < treeData[children].length; i+=1) {
          let item = treeData[children][i];
          // 有则跳出循环再次递归
          if (item.id === value) {
            arrResString = item.label  + ' > ' + arrResString
            rev(obj, treeData.id, 0);
            break;
          }
          else if (item[children] && item[children].length > 0) {
            rev(item, value, level + 1);
          }
        }
      }
      rev(obj, value, level);
      return
    },
    // 实有建筑-编辑楼房-选择建筑类型调用接口渲染建筑用途
    Buildingpulldown() {
      let params = {
        architectureType:  this.editForm.architectureType, // 建筑类型
      }
      console.log(params)
      getArchiPurposeByType (params).then((res) => {
        if (res.code === 200) {
          this.dingpulldown = res.data
          console.log(this.dingpulldown)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  p {
    font-family: Microsoft YaHei;
  }
  span {
    font-family: Microsoft YaHei;
  }
  ul,li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    margin: 0 0 20px 0;
  }
  .demo-form-inline {
    .grid {
      .title {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
      }
      ::v-deep .el-input {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
      }
    }
    .top {
      ::v-deep .el-form-item {
        margin-bottom: 0;
      }
      p {
        text-align: justify;
      }
      .one {
        display: flex;
        margin-left: 27px;
        li {
          margin-left: 60px;
          ::v-deep .el-input {
            width: 163px;
            height: 35px;
          }
          &:first-child {
            margin-left: 0;
          }
          &:nth-child(2) {
            margin-left: 100px;
          }
          &:nth-child(3) {
            margin-left: 75px;
          }
        }
      }
      .two {
        display: flex;
        li {
          margin-left: 60px;
          ::v-deep .el-input {
            width: 163px;
            height: 35px;
          }
          &:first-child {
            margin-left: 0;
          }
          &:nth-child(4) {
            margin-left: 87px;
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 18px 0 0 10px;
      .left {
        display: flex;
        align-items: center;
        margin-left: 7px;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #000000;
        }
        ::v-deep .el-input{
          width: 215px;
          height: 35px;
          margin-left: 10px;
        }
      }
      ::v-deep .el-button {
        height: 33px;
        background-color: #FFF;
        border-radius: 5px;
        margin-left: 19px;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #1F79F3;
        }
      }
      .right {
        display: flex;
        .el-button {
          margin-left: 9px;
        }
        .right-first {
          height: 34px;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
  /* 修改table表格整体默认宽度以及居中展示 */
  ::v-deep .el-table {
    width: 100%;
    margin: 23px auto;
  }
  ::v-deep .el-table__row {
    ::v-deep .el-button {
      width: 66px;
      height: 25px;
      border: 1px solid #D9D9D9;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
    }
  }
  .bottom-msg {
    font-size: 12px;
    font-weight: 400;
    color: #000000;
  }
  /** 修改el-dialog样式 */
  ::v-deep .building_dialog_wrap {
    border-radius: 10px;
    .el-dialog__title {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .el_dialog_top {
      margin-left: 22px;
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #000000;
      }
      ul {
        display: flex;
        margin-left: 12px;
        margin-top: 19px;
        li {
          display: flex;
          align-items: center;
          margin-left: 64px;
          span {
            font-size: 14px;
            font-weight: 400;
            color: #000000;
            &:nth-child(2) {
              display: inline-block;
              width: 215px;
              height: 35px;
              background-color: #CCCCCC;
              line-height: 35px;
              box-sizing: border-box;
              padding-left: 11px;
            }
          }
          &:first-child {
            margin: 0;
          }
        }
        &.one {
          margin-top: 0;
        }
        &.two {
          li {
            &:nth-child(2) {
              margin-left: 79px;
            }
            &:nth-child(3) {
              span {
                &:nth-child(2) {
                  width: 184px;
                  height: 35px;
                }
                &:nth-child(3) {
                  margin-left: 5px;
                  position: relative;
                  top: -10px;
                }
              }
            }
          }
        }
        &.three {
          li {
            span {
              &:nth-child(2) {
                width: 565px;
                height: 35px;
              }
            }
          }
        }
      }
    }
    .el_dialog_bottom {
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        margin-left: 10px;
      }
      ul {
        display: flex;
        margin-left: 34px;
        margin-top: 18px;
        li {
          margin-left: 30px;
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            font-weight: 400;
            color: #000000;
          }
          &:first-child {
            margin: 0;
          }
        }
        &.six {
          li {
            span {
              display: inline-block;
              width: 75px;
            }
            .el-textarea__inner {
              width: 1123px;
              height: 76px !important;
              min-height: 76px !important;
            }
          }
        }
      }
    }
  }
  ::v-deep .unitDialog_wrap {
    .el-dialog__body {
      padding: 0;
      .scroll_msg {
        text-align: center;
      }
    }
    .el-dialog__title {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
    }
    .el_dialog_top {
      position: relative;
      margin-top: 20px;
      ul {
        display: flex;
        margin-left: 12px;
        margin-top: 19px;
        li {
          display: flex;
          align-items: center;
          margin-left: 36px;
          span {
            font-size: 14px;
            font-weight: 400;
            color: #000000;
            &:nth-child(2) {
              display: inline-block;
              width: 215px;
              height: 35px;
              background-color: #CCCCCC;
              line-height: 35px;
              box-sizing: border-box;
              padding-left: 11px;
            }
          }
          &:first-child {
            margin: 0;
          }
        }
        &.one {
          margin-top: 0;
          li {
            &:first-child {
              margin-left: 41px;
            }
          }
        }
        &.two {
          li {
            &:nth-child(2) {
              margin-left: 78px;
              span {
                &:nth-child(2) {
                  width: 618px;
                }
              }
            }
          }
        }
        &.three {
          li {
            &:nth-child(2) {
              margin-left: 78px;
              span {
                &:nth-child(2) {
                  width: 618px;
                }
              }
            }
          }
        }
      }
      .el-card {
        width: 1254px;
        margin: 0 auto;
        border-radius: 10px;
      }
      .el_diolog_top_footer {
        position: absolute;
        top: 20px;
        right: 60px;
        .el-button {
          display: block;
          &:nth-child(2) {
            margin: 10px 0 0 0;
          }
        }
      }
    }
    footer {
      height: 77px;
      background-color: #F2F2F2;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        width: 130px;
        height: 33px;
        background-color: #1F79F3;
        color: #FFF;
        cursor: pointer;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .add_unit {
      position: relative;
      width: 1254px;
      margin: 20px auto;
      border-radius: 10px;
      .el-form-item__label {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
      }
      .el-input {
        width: 215px;
        height: 35px;
      }
      .add_unit_one_wrap {
        display: flex;
        .el-form-item {
          display: flex;
          &:nth-child(1) {
            margin-left: 41px;
          }
          &:nth-child(2) {
            margin-left: 36px;
          }
        }
      }
      .add_unit_two_wrap {
        display: flex;
        .el-form-item {
          display: flex;
          margin-left: 12px;
          &:nth-child(2) {
            margin-left: 78px;
            .el-input {
              width: 618px;
            }
          }
        }
      }
      .add_unit_three_wrap {
        display: flex;
        .el-form-item {
          display: flex;
          margin-left: 12px;
          &:nth-child(2) {
            margin-left: 78px;
            .el-input {
              width: 618px;
            }
          }
        }
      }
      .el-button {
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }
  ::v-deep .house_dialog_wrap {
    border-radius: 10px;
    .el-dialog__title {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
    }
    .el-dialog__body {
      padding-top: 0;
      margin-top: 20px;
    }
    .el_dialog_top {
      margin-left: 22px;
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #000000;
      }
      ul {
        display: flex;
        margin-left: 12px;
        margin-top: 19px;
        li {
          display: flex;
          align-items: center;
          margin-left: 64px;
          &:first-child {
            margin: 0;
          }
          .el-input {
            width: 215px;
            height: 35px;
          }
        }
        &.one {
          margin-top: 0;
          margin-left: 39px;
        }
        &.two {
          margin-left: 39px;
          li {
            &:nth-child(1) {
              span {
                &:nth-child(2) {
                  width: 215px;
                  height: 35px;
                  background-color: #CCCCCC;
                  display: flex;
                  align-items: center;
                  box-sizing: border-box;
                  padding-left: 5px;
                }
              }
            }
            &:nth-child(2) {
              margin-left: 73px;
            }
          }
        }
        &.three {
          li {
            &:nth-child(2) {
              margin-left: 68px;
              .el-input {
                width: 178px;
              }
              .area {
                margin-left: 20px;
              }
            }
          }
        }
        &.four {
          li {
            &:nth-child(2) {
              margin-left: 42px;
            }
            &:nth-child(3) {
              margin-left: 33px;
            }
          }
        }
        &.five {
          li {
            &:nth-child(1) {
              .el-input {
                width: 579px;
              }
            }
            &:nth-child(2) {
              margin-left: 12px;
            }
          }
        }
      }
    }
    .el_dialog_bottom {
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        margin-left: 10px;
      }
      ul {
        display: flex;
        margin-left: 34px;
        margin-top: 18px;
        li {
          margin-left: 30px;
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            font-weight: 400;
            color: #000000;
          }
          &:first-child {
            margin: 0;
          }
        }
        &.one {
          margin-top: 0;
          li {
            &:nth-child(3) {
              span {
                &:nth-child(2) {
                  display: inline-block;
                  width: 215px;
                  height: 35px;
                  background-color: #CCC;
                  line-height: 35px;
                  box-sizing: border-box;
                  padding-left: 5px;
                }
              }
            }
          }
        }
        &.two {
          li {
            &:nth-child(2) {
              margin-left: 65px;
            }
          }
        }
        &.three {
          margin-left: 6px;
          li {
            &:nth-child(2) {
              margin-left: 38px;
            }
            &:nth-child(3) {
              display: flex;
              margin-left: 59px;
              align-items: center;
              position: relative;
              .el-input {
                width: 215px;
                height: 35px;
              }
              .el-button {
                margin-left: 11px;
              }
              .add_manager_wrap {
                position: absolute;
                top: 50px;
                left: 43px;
                width: 150%;
                .add_manager {
                  width: 83px;
                  height: 31px;
                  border: 1px solid #CCC;
                  text-align: center;
                  line-height: 31px;
                  float: left;
                  margin-right: 5px;
                  margin-bottom: 5px;
                  .icon-close {
                    position: relative;
                    left: 5px;
                  }
                }
              }
            }
          }
        }
        &.four {
          .el-input {
            width: 570px;
            height: 35px;
          }
        }
        &.five {
          li {
            span {
              position: relative;
              top: -25px;
            }
            .upload_wrap {
              margin-top: 0px;
              .el-upload-list {
                margin: 0;
                position: absolute;
              }
            }
          }
        }
        &.six {
          li {
            span {
              display: inline-block;
              width: 75px;
            }
            .el-textarea__inner {
              width: 1123px;
              height: 76px !important;
              min-height: 76px !important;
            }
          }
        }
      }
    }
  }
  .edit_dialog_top {
    display: flex;
    margin-left: 34px;
    ::v-deep .el-form-item {
      margin-left: 30px;
      .el-form-item__label {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        padding: 0;
      }
      .el-form-item__content {
        display: flex;
      }
      .el-select {
        width: 215px;
        height: 35px;
      }
      &.three {
        .el-form-item__content {
          .el-input__inner {
            width: 215px;
            height: 35px;
            background-color: #CCC;
            border-radius: 0;
            color: #000;
            padding: 2px;
          }
        }
      }
      &:nth-child(1) {
        margin-left: 0;
      }
      &:nth-child(2) {
        .el-input {
          width: 215px;
          height: 35px;
        }
      }
    }
    &.two {
      .el-form-item {
        &:nth-child(2) {
          margin-left: 65px;
        }
      }
    }
    &.three {
      margin-left: 6px;
      .el-form-item {
        &:nth-child(2) {
          margin-left: 38px;
        }
        &:nth-child(3) {
          display: flex;
          margin-left: 59px;
          align-items: center;
          position: relative;
          .el-input {
            width: 215px;
            height: 35px;
          }
          .el-button {
            margin-left: 11px;
          }
          .add_manager_wrap {
            position: absolute;
            top: 50px;
            width: 150%;
            .add_manager {
              width: 83px;
              height: 31px;
              border: 1px solid #CCC;
              text-align: center;
              line-height: 31px;
              float: left;
              margin-right: 5px;
              margin-bottom: 5px;
              .icon-close {
                position: relative;
                left: 5px;
              }
            }
          }
        }
      }
    }
    &.four {
      .el-input {
        width: 570px;
        height: 35px;
      }
    }
    &.five {
      .el-form-item {
        ::v-deep .el-form-item__label {
          position: relative;
          top: 50px;
        }
        ::v-deep .el-upload-list {
          margin: 0;
        }
        ::v-deep .el-upload-list__item-actions {
          span {
            color: #FFF;
          }
        }
      }
    }
  }
  .outer_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-exclamation-circle {
      color: #F27463;
      font-size: 48px;
    }
    .outer_msg {
      font-size: 12px;
      font-weight: 400;
      color: #000000;
    }
  }
  ::v-deep .el-alert {
    margin-top: 20px;
  }
}
</style>
