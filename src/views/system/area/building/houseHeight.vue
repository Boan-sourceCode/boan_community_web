<template>
  <div class="app-container">
    <h1>房屋高级查询检索</h1>
    <!-- 下拉选择集合 -->
    <el-form class="demo-form-inline" :model="createParams" ref="form" size="small" :inline="true" v-show="showSearch"
      label-width="68px">
      <div class="top">
        <el-form-item prop="grid" class="grid">
          <p class="title" style="display: inline-block; font-weight:400; margin-left: 25px">网格：</p>
          <treeSelect :props="treeProps" :options="treeData" v-model="value" :accordion="true" @getValue="getList($event)"
            placeholder="请选择">
          </treeSelect>
        </el-form-item>
        <el-form-item>
          <p class="title" style="display: inline-block; font-weight:400;">所属小区：</p>
          <el-select v-model="createParams.communityId" clearable placeholder="请选择">
            <el-option v-for="item in areaList" :key="item.id" :label="item.communityName" :value="item.id"
              @click.native="getCommunityId(item.id)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p class="title" style="display: inline-block; font-weight:400;">所属建筑：</p>
          <el-select v-model="createParams.buidingName" clearable placeholder="请选择">
            <el-option v-for="item in allUnitAndStorey" :key="item.id" :label="item.buildingName" :value="item.id"
              @click.native="getBuild(item)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p class="title" style="display: inline-block; font-weight:400;">所属单元：</p>
          <el-select v-model="createParams.unitId" clearable placeholder="请选择">
            <el-option v-for="item in unitList" :key="item.id" :label="item.unitNumber" :value="item.id"
              @click.native="getUnitInfo(item)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p class="title" style="display: inline-block; font-weight:400;">楼层：</p>
          <el-select v-model="createParams.storeyName" clearable placeholder="请选择">
            <el-option v-for="item in selectFloorList" :key="item" :value="item" @click.native="getFloor(item)">
              <span>{{ item }}层</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p class="title" style="display: inline-block; font-weight:400;">房属产权：</p>
          <el-select v-model="createParams.housePropertyRight" clearable placeholder="请选择">
            <el-option v-for="dict in dict.type.house_property_right" :key="dict.value" :label="dict.label"
              :value="dict.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p class="title" style="display: inline-block; font-weight:400;">房屋类型：</p>
          <el-select v-model="createParams.houseType" clearable placeholder="请选择">
            <el-option v-for="dict in dict.type.house_housetype" :key="dict.value" :label="dict.label"
              :value="dict.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p class="title" style="display: inline-block; font-weight:400;">房屋性质：</p>
          <el-select v-model="createParams.houseProperty" clearable placeholder="请选择">
            <el-option v-for="dict in dict.type.house_property" :key="dict.value" :label="dict.label" :value="dict.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p class="title" style="display: inline-block; font-weight:400;">房屋用途：</p>
          <el-select v-model="createParams.housePurpose" clearable placeholder="请选择">
            <el-option v-for="dict in dict.type.courtyard_house_purpose" :key="dict.value" :label="dict.label"
              :value="dict.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p class="title" style="display: inline-block; font-weight:400;">楼隐患类型：</p>
          <el-select v-model="createParams.hiddenDangerType" clearable placeholder="请选择">
            <el-option v-for="dict in dict.type.building_danger_type" :key="dict.value" :label="dict.label"
              :value="dict.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p class="title" style="display: inline-block; font-weight:400;">楼隐患级别：</p>
          <el-select v-model="createParams.hiddenDangerLevel" clearable placeholder="请选择">
            <el-option v-for="dict in dict.type.focous_degree" :key="dict.value" :label="dict.label" :value="dict.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="bottom">
        <div class="left">
          <div>
            <span>关键字:</span>
            <el-input v-model="createParams.keyWord" clearable placeholder="名称/门牌号"></el-input>
          </div>
          <el-button type="primary" @click="getTabInfo">查询</el-button>
        </div>
        <div class="right">
          <el-button type="primary" class="right-first" @click="batchUpdateInfo">批量修改房屋属性</el-button>
          <el-button type="primary" @click="exportHouse">导出</el-button>
        </div>
      </div>
    </el-form>
    <!-- table表格 -->
    <el-table v-loading="loading" :data="tabList" @selection-change="handleSelectionChange"
      :header-cell-style="{ background: '#EBF7FF' }" stripe border>
      <el-table-column type="selection" width="55" align="center" />
      <!--      <el-table-column label="编号" prop="id" width="60" align="center"/>-->
      <el-table-column label="序号" align="center" width="60">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (createParams.currentPage - 1) * createParams.pageSize }}
        </template>
      </el-table-column>
      <!--      <el-table-column label="类型" prop="roleName" :show-overflow-tooltip="true" width="61" align="center"/>-->
      <el-table-column label="门牌号" prop="houseNumber" :show-overflow-tooltip="true" width="61" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.houseNumber === '' || scope.row.houseNumber === null">/</p>
          <p v-else>{{ scope.row.houseNumber }}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属网格" prop="areaName" width="110" align="center" />
      <el-table-column label="所属建筑" prop="communityName, buidingNumber" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.communityName }}{{ scope.row.buidingNumber }}
        </template>
      </el-table-column>
      <el-table-column label="所属单元" prop="unitNumber" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.unitNumber === '' || scope.row.unitNumber === null">/</p>
          <p v-else>{{ scope.row.unitNumber }}</p>
        </template>
      </el-table-column>
      <el-table-column label="楼层" prop="storey" width="65" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.storey === '' || scope.row.storey === null">/</p>
          <p v-else>{{ scope.row.storey }}</p>
        </template>
      </el-table-column>
      <el-table-column label="房屋产权" prop="housePropertyRight" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.housePropertyRight === '' || scope.row.housePropertyRight === null">/</p>
          <p v-else>{{ scope.row.housePropertyRight }}</p>
        </template>
      </el-table-column>
      <el-table-column label="建筑面积（㎡）" prop="houseMeasure" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.houseMeasure === '' || scope.row.houseMeasure === null">/</p>
          <p v-else>{{ scope.row.houseMeasure }}</p>
        </template>
      </el-table-column>
      <el-table-column label="房屋房型" prop="houseType" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.houseType === '' || scope.row.houseType === null">/</p>
          <p v-else>{{ scope.row.houseType }}</p>
        </template>
      </el-table-column>
      <el-table-column label="房屋性质" prop="houseProperty" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.houseProperty === '' || scope.row.houseProperty === null">/</p>
          <p v-else>{{ scope.row.houseProperty }}</p>
        </template>
      </el-table-column>
      <el-table-column label="房屋用途" prop="housePurpose" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.housePurpose === '' || scope.row.housePurpose === null">/</p>
          <p v-else>{{ scope.row.housePurpose }}</p>
        </template>
      </el-table-column>
      <el-table-column label="楼隐患类型" prop="hiddenDangerType" width="90" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.hiddenDangerType === '' || scope.row.hiddenDangerType === null">/</p>
          <p v-else>{{ scope.row.hiddenDangerType }}</p>
        </template>
      </el-table-column>
      <el-table-column label="是否为落户房屋" prop="registeredStatus" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.registeredStatus === 0 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column label="标准地址" prop="houseAddress" align="center" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope"> <!--v-if="scope.row.roleId !== 1" -->
          <el-button type="primary" plain size="small" @click="handleUpdate(scope.row)"
            v-hasPermi="['system:role:edit']">编辑</el-button>
          <el-button type="danger" plain size="small" @click="handleDelete(scope.row)"
            v-hasPermi="['system:role:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p class="bottom-msg">共查询/检索 {{ total }} 条信息</p>
    <!-- 编辑楼房弹窗 -->
    <el-dialog :visible.sync="dialogEdit" title="编辑房屋" width="70%" :close-on-click-modal="false"
      @close="cancel('editForm')" class="building_dialog_wrap">
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
                <span>{{ editDialogInfo.arealeaderName }}</span>
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
            <p class="title">房屋信息：</p>
            <!--            <div class="edit_dialog_top">
              <el-form-item label="所属小区：">
                <el-select v-model="editForm.communityName" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in areaList"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼栋/院落名称：">
                <el-input v-model="editForm.buidingNumber"></el-input>
              </el-form-item>
              <el-form-item label="楼房编号：" class="three">
                <el-input v-model="editForm.id" readonly></el-input>
              </el-form-item>
            </div>-->
            <div class="edit_dialog_top two">
              <el-form-item label="房屋产权：">
                <el-select v-model="editForm.housePropertyRight" placeholder="请选择">
                  <el-option v-for="dict in dict.type.house_property_right" :key="dict.value" :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="建筑面积㎡：" style="margin-left: 50px">
                <el-input v-model="editForm.houseMeasure"></el-input>
              </el-form-item>
              <el-form-item label="房屋房型：" style="margin-left: 75px">
                <el-select v-model="editForm.houseType" placeholder="请选择">
                  <el-option v-for="dict in dict.type.house_housetype" :key="dict.value" :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="edit_dialog_top three">
              <el-form-item label="房屋性质：" style="margin-left: 28px">
                <el-select v-model="editForm.houseProperty" placeholder="请选择">
                  <el-option v-for="dict in dict.type.house_property" :key="dict.value" :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房屋用途：" style="margin-left: 66px">
                <el-select v-model="editForm.housePurpose" placeholder="请选择">
                  <el-option v-for="dict in dict.type.building_purpose" :key="dict.value" :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼房隐患类型：" style="margin-left: 48px">
                <el-select v-model="editForm.hiddenDangerType" placeholder="请选择">
                  <el-option v-for="dict in dict.type.building_danger_type" :key="dict.value" :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="edit_dialog_top">
              <el-form-item label="楼房隐患级别：">
                <el-select v-model="editForm.hiddenDangerLevel" placeholder="请选择">
                  <el-option v-for="dict in dict.type.focous_degree" :key="dict.value" :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否为落户房屋：" style="margin-left: 50px">
                <el-select v-model="editForm.registeredStatus" placeholder="请选择">
                  <el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="edit_dialog_top four">
              <el-form-item label="标准地址：">
                <el-input v-model="editForm.houseAddress" placeholder="请输入标准地址"></el-input>
              </el-form-item>
            </div>
            <!--            <div class="edit_dialog_top five">
              <el-form-item label="上传图片：">
                <image-upload v-model="editForm.buildingPicture" :limit="1" />
              </el-form-item>
            </div>
            <ul class="six">
              <li>
                <span>楼房简介：</span>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="editForm.buildingBriefIntroduction">
                </el-input>
              </li>
            </ul>-->
          </div>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitForm('editForm')">保存</el-button>
        <el-button type="default" @click="cancel('editForm')">取消</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <pagination :total="total" :page.sync="createParams.currentPage" :limit.sync="createParams.pageSize"
      @pagination="getTabInfo()" />
  </div>
</template>

<script>
import { treeList, areaTree } from "@/api/area/area";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { houseAdvanceSelect, houseAdvanceSelectLimit, getUnitAndStoreyById, houseReturnUnpdateInfo, houseSaveEdit, getReturnGridInfo, houseHeightDelete, houseExport, queryBuildingArea } from '@/api/area/house'
import Cookies from "js-cookie";
export default {
  dicts: ['building_type', 'building_purpose', 'house_property_right', 'building_danger_type', 'focous_degree',
    'building', 'house_property', 'courtyard_house_purpose', 'house_housetype', 'is_party_status'],
  name: "houseHeight",
  components: { Treeselect },
  data() {
    return {
      selectFloorList: [], // 存储楼层数据下拉框集合
      // 遮罩层
      loading: true,
      // 角色表格数据
      tabList: [],
      input: '', // 关键字
      // 所属小区
      area: '',
      // 所属小区下拉数据
      areaList: [],
      // 卡片查询参数
      queryParams: {
        pageNum: 1,    //当前页
        pageSize: 10,  //每页条数
        queryName: '', // 楼房/院落名称
        areaName: null,
        areaShortname: null,
        areaMeasure: null,
        areaType: null,
        areaId: ''
      },
      // 显示搜索条件
      showSearch: true,
      treeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      treeData: [], //下拉框数据
      value: '',//选中的数据
      total: 0,
      createParams: {
        userId: localStorage.getItem("userId"),
        areaId: '',
        communityId: '', // 小区编号
        buidingId: '', // 所属建筑编号
        buidingName: '',
        unitId: '', // 所属单元编号
        storey: '', // 楼层
        storeyName: '',
        housePropertyRight: '', // 房屋产权
        houseType: '', // 房屋房型
        houseProperty: '', // 房屋性质
        housePurpose: '', // 房屋用途
        hiddenDangerType: '', // 房屋隐患类型
        hiddenDangerLevel: '', // 房屋隐患级别
        keyWord: '', // 关键字
        currentPage: 1, // 当前页
        pageSize: 10, // 每页大小
      },
      allUnitAndStorey: [], // 所属建筑集合
      editParams: {
        id: ''
      },
      managerInput: '', // 楼长输入框双向绑定
      managerList: [], // 添加楼长存储集合
      dialogEdit: false,
      editForm: {
        buildingAddress: "",
        hiddenDangerLevel: "",
        architectureType: "",
        buildingName: "",
        houseType: "",
        communityName: "",
        id: 139,
        housePropertyRight: null,
        buildingMaster: null,
        architecturePurpose: null,
        hiddenDangerType: null,
        buildingPicture: '',
        admin: '',
        updateBy: ''
      },
      editDialogInfo: {}, // 编辑弹框默认返回信息存储对象
      checkedIdList: [], // 表格选中ID集合
      unitList: [], // 高级检索所属单元集合
      exportBuilding: {
        idList: []
      },
      areaId: ''
    }
  },
  created() {
    // this.getSelect()
    this.getTabInfo()
    this.getTreeSelect()
  },
  methods: {
    getFloor(item) {
      console.log(item);
      this.createParams.storeyName = item + '层'
      this.createParams.storey = item
    },
    // 所属小区下拉框选中
    getCommunityId(id) {
      console.log(id);
      let params = {
        communityId: id,
        areaId: this.areaId
      }
      getUnitAndStoreyById(params).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.allUnitAndStorey = res.data
          console.log(this.allUnitAndStorey);
        }
      })
    },
    // 导出
    exportHouse() {
      if (this.checkedIdList.length === 0) {
        this.download('/front/building/houseExport', {
          ...this.createParams
        }, `网格信息-${new Date().getTime()}.xlsx`)
      } else if (this.checkedIdList.length !== 0) {
        this.download('/front/house/houseExport', {
          ...this.exportBuilding
        }, `网格信息-${new Date().getTime()}.xlsx`)
      }
    },
    // 表格删除
    handleDelete(row) {
      console.log(row);
      let params = {
        id: row.id,
        updateBy: Cookies.get('username')
      }
      this.$confirm('是否删除网格："' + row.communityName + row.buidingNumber + '"？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        houseHeightDelete(params).then((res) => {
          if (res.code === 200) {
            console.log(res);
            // this.getSelect();
            this.getTabInfo()
            this.$message.success(res.msg)
          } else if (res.code === 201) {
            // this.getSelect();
            this.getTabInfo()
            this.$message.error(res.msg)
          }
        })
      }).catch(() => { })
    },
    // 所属单元下拉款选中按钮
    getUnitInfo(item) {
      console.log(item);
      this.selectFloorList = item.floorList
    },
    // 所属建筑下拉框选中按钮
    getBuild(item) {
      console.log(item);
      this.unitList = item.unitInfo
      this.createParams.buidingId = item.unitInfo[0].id
      console.log(this.createParams.buidingId);
    },
    // 编辑遮罩层 - 添加楼长之后显示的tab删除按钮
    canelManager(item, index) {
      this.managerList.splice(index, 1)
    },
    // 编辑遮罩层 - 添加楼长按钮
    addManager() {
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
    // 编辑弹窗保存按钮
    submitForm(value) {
      this.editForm.updateBy = Cookies.get('username')
      let masterList = []
      this.managerList.map((item) => {
        masterList.push(item)
      })
      this.editForm.buildingMaster = masterList.toString();
      console.log(this.editForm);
      let editForm = {
        houseProperty: this.editForm.houseProperty,
        buildingAddress: this.editForm.houseAddress,
        hiddenDangerLevel: this.editForm.hiddenDangerLevel,
        houseType: this.editForm.houseType,
        id: this.editForm.id,
        housePropertyRight: this.editForm.housePropertyRight,
        hiddenDangerType: this.editForm.hiddenDangerType,
        updateBy: Cookies.get('username'),
        houseMeasure: this.editForm.houseMeasure,
        registeredStatus: this.editForm.registeredStatus,
        housePurpose: this.editForm.housePurpose,
      }
      console.log(editForm);
      if (editForm.registeredStatus === '否') {
        editForm.registeredStatus = 1
      } else if (editForm.registeredStatus === '是') {
        editForm.registeredStatus = 0
      }
      houseSaveEdit(editForm).then((res) => {
        if (res.code === 200) {
          masterList = []
          this.dialogEdit = false
          this.$message.success('修改成功')
          // this.getSelect()
          this.getTabInfo()
        }
      })
    },
    // 表格编辑按钮
    handleUpdate(row) {
      console.log(1111, row);
      let id = row.id
      this.loading = true
      let params = {
        areaId: row.areaId
        // areaId: this.$route.query.areaId
      }
      getReturnGridInfo(params).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.editDialogInfo = res.data
          console.log(this.editDialogInfo);
        }
      })
      houseReturnUnpdateInfo(id).then((res) => {
        if (res.code === 200) {
          this.dialogEdit = true
          this.loading = false
          this.editForm = res.data
          if (this.editForm.registeredStatus === 0) {
            this.editForm.registeredStatus = '是'
          } else if (this.editForm.registeredStatus === 1) {
            this.editForm.registeredStatus = '否'
          }
        }
      })
    },
    // 批量修改房层属性按钮
    batchUpdateInfo() {
      console.log(this.checkedIdList);
      if (this.checkedIdList.length === 0) {
        this.$message.error('请选择要修改的房屋')
      } else {
        this.$router.push({ path: 'batchSettingsHouseHeight', query: { 'id': this.$route.query.id, 'areaId': this.$route.query.areaId } })
      }
    },
    // 获取所属小区、建筑、单元、楼层等下拉框数据
    getSelect() {
      let queryParams = {
        // areaId: this.$route.query.areaId
        areaId: this.areaId
      }
      queryBuildingArea(queryParams).then((res) => {
        if (res.code === 200) {
          this.areaList = res.data
          console.log(this.areaList);
        }
      })
      // .then(() => {
      //   this.getTabInfo()
      // })
    },
    getTabInfo() {
      this.loading = true
      houseAdvanceSelectLimit(this.createParams).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.total = res.data.total
          this.tabList = res.data.list
          this.loading = false
        }
      })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log(selection);
      this.checkedIdList = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
      this.exportBuilding.idList = this.checkedIdList
      console.log(this.checkedIdList);
      localStorage.setItem('houseHeightCheckedIdList', JSON.stringify(selection.map(item => item.id)))
    },
    /** 获取网格树状结构数据 */
    getTreeSelect() {
      let param = {
        userId: localStorage.getItem("userId"),
        flag: 0
      }
      // treeList ().then(res => {
      areaTree(param).then(res => {
        this.treeData = res.data
        this.childrenList = res.data[0].children
        this.queryParams.areaId = res.data[0].children[0].id
        this.areaTitle = res.data[0].label
        this.stringPosition = res.data[0].label
        this.loading = false
        console.log(res.data);
      })
    },
    getList(data) {
      if (data !== undefined) {
        this.getParent(this.treeData, data.id)
        this.areaTitle = data.label
        this.queryParams.areaId = data.id
        console.log(data);
        this.createParams.areaId = data.id
        this.areaId = data.id
        this.getSelect()
        let params = {
          areaId: this.areaId
        }
        getUnitAndStoreyById(params).then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.allUnitAndStorey = res.data
            console.log(this.allUnitAndStorey);
          }
        })
        // if (data.children && data.children.length !==0) {
        //   console.log(data.children);
        //   this.childrenList = data.children
        // }
      }
      // getAllBuilding(this.queryParams).then((res) => {
      //   if (res.code === 200) {
      //     console.log(res);
      //     this.cardInfo.total = res.data[0].total
      //     this.total = res.data[0].total
      //     this.cardInfo.buidingSize = res.data[1].buidingSize
      //     this.cardInfo.courtySize = res.data[1].courtySize
      //     this.cardList = res.data[1].buildingList
      //     console.log(this.cardList);
      //   }
      // })
    },
    //反向递归获取位置
    getParent(treeData, value, children = 'children', level = 0) {
      let arrResString = '';
      let obj = { value: 0, [children]: treeData };
      let rev = (treeData, value, level) => {
        if (!treeData || !treeData[children] || !treeData[children].length) {
          return;
        }
        for (let i = 0; i < treeData[children].length; i += 1) {
          let item = treeData[children][i];
          // 有则跳出循环再次递归
          if (item.id === value) {
            arrResString = item.label + ' > ' + arrResString
            rev(obj, treeData.id, 0);
            break;
          }
          else if (item[children] && item[children].length > 0) {
            rev(item, value, level + 1);
          }
        }
      }
      rev(obj, value, level);
      this.stringPosition = arrResString.substring(0, arrResString.lastIndexOf(" > "));
      return
    },
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
      p {
        text-align: justify;
      }

      ::v-deep .el-input__inner {
        width: 88%;
      }

      ::v-deep .el-input__suffix {
        right: 30px;
      }

      ::v-deep .el-form-item {
        margin: 0 0 0 10px;
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

        span {
          font-size: 14px;
          font-weight: 400;
          color: #000000;
        }

        ::v-deep .el-input {
          width: 215px;
          height: 35px;
          margin-left: 10px;
        }
      }

      ::v-deep .el-button {
        width: 90px;
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
        .right-first {
          width: 162px;
          height: 34px;
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
        margin-top: 19px;
        padding-left: 15px;

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
          margin-left: 0;

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
