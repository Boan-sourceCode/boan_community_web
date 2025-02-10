<!-- 实有企业高级 -->
<template>
  <div class="app-container">
    <h1 class="title-font">企业高级查询/检索</h1>
    <el-form :model="queryParams" size="small" :inline="true" label-width="82px">
      <el-form-item label="所属网格：" prop="areaId">
        <treeSelect
          v-model="queryParams.areaId"
          :props="treeProps"
          :options="treeData"
          :value="value"
          :accordion="true"
          placeholder="请选择">
        </treeSelect>
      </el-form-item>
      <el-form-item label="建筑：" prop="buildingId">
        <el-select clearable filterable v-model="queryParams.buildingId" placeholder="请选择">
          <el-option
            v-for="item in buildingOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织类型：" prop="groupType">
        <el-select clearable v-model="queryParams.groupType" placeholder="请选择">
          <el-option
            v-for="dict in dict.type.organization_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业类型：" prop="enterType">
        <el-select clearable v-model="queryParams.enterType" placeholder="请选择">
          <el-option
            v-for="dict in dict.type.enterprise_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="关键字：" prop="key">
          <el-input clearable v-model="queryParams.key" placeholder="企业/法人名称" />
        </el-form-item>
        <el-form-item>
          <el-button plain @click="handleQuery">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="handleImport">批量导入</el-button>
          <el-button @click="handleExport">批量导出</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table
      :loading="loading"
      :data="enterprises"
      :header-cell-style="{background:'#EBF7FF'}"
      stripe border>
      <el-table-column label="序号" align="center" prop="id" width="60px"/>
      <el-table-column label="企业名称" align="center" prop="enterName" />
      <el-table-column label="所属网格" align="center" prop="areaId" width="170">
        <template slot-scope="scope">
          <p class="card-font" v-if="scope.row.baGridArea === '' || scope.row.baGridArea === null || scope.row.baGridArea === undefined">顶级网格</p>
          <p class="card-font" v-else>{{scope.row.baGridArea.areaName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属建筑" align="center" prop="buildingId" width="130">
        <template slot-scope="scope">
          <p class="card-font" v-if="scope.row.baBuiding === '' || scope.row.baBuiding === null || scope.row.baBuiding === undefined">/</p>
          <p class="card-font" v-else>{{scope.row.baBuiding.communityName}}{{scope.row.baBuiding.buidingNumber}}</p>
        </template>
      </el-table-column>
      <el-table-column label="组织类型" align="center" prop="groupType">
        <template slot-scope="scope">
          <p v-if="scope.row.groupType === '' || scope.row.groupType === null">/</p>
          <dict-tag v-else :options="dict.type.organization_type" :value= scope.row.groupType />
        </template>
      </el-table-column>
      <el-table-column label="企业类型" align="center" prop="enterType">
        <template slot-scope="scope">
          <p v-if="scope.row.enterType === '' || scope.row.enterType === null">/</p>
          <dict-tag v-else :options="dict.type.enterprise_type" :value= scope.row.enterType />
        </template>
      </el-table-column>
      <el-table-column label="企业证件登记号" align="center" prop="certRegisterNo" width="130">
        <template slot-scope="scope">
          <p v-if="scope.row.certRegisterNo === '' || scope.row.certRegisterNo === null">/</p>
          <p v-else>{{scope.row.certRegisterNo}}</p>
        </template>
      </el-table-column>
      <el-table-column label="法定代表人" align="center" prop="legalRepresentName">
        <template slot-scope="scope">
          <p v-if="scope.row.legalRepresentName === '' || scope.row.legalRepresentName === null">/</p>
          <p v-else>{{scope.row.legalRepresentName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="法人代表联系方式" align="center" prop="legalRepresentPhone" width="130">
        <template slot-scope="scope">
          <p v-if="scope.row.legalRepresentPhone === '' || scope.row.legalRepresentPhone === null">/</p>
          <p v-else>{{scope.row.legalRepresentPhone}}</p>
        </template>
      </el-table-column>
      <el-table-column label="企业人数" align="center" prop="enterPeopleNum" width="82">
        <template slot-scope="scope">
          <p v-if="scope.row.enterPeopleNum === '' || scope.row.enterPeopleNum === null">/</p>
          <p v-else>{{scope.row.enterPeopleNum}}</p>
        </template>
      </el-table-column>
      <el-table-column label="标准地址" align="center" prop="enterAddress" width="294">
        <template slot-scope="scope">
          <p v-if="scope.row.enterAddress === '' || scope.row.enterAddress === null">/</p>
          <p v-else>{{scope.row.enterAddress}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="168">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleEdit(scope.row)" v-hasPermi="['system:areaTree:edit']">编辑</el-button>
          <el-button type="danger" plain size="small" @click="handleDelete(scope.row)" v-hasPermi="['system:areaTree:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p>共查询/检索{{ this.total }}条信息</p>

    <!-- 用户导入对话框 -->
    <el-dialog
      :visible.sync="upload.importDialog"
      title="实有企业批量导入"
      width="21%"
      :close-on-click-modal="false">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.importDialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogEdit"
      title="编辑企业"
      width="70%"
      :close-on-click-modal="false"
      @close="dictEditVisible('editForm')">
      <template>
        <el-form
          ref="editForm"
          label-width="138px"
          :model="editForm"
          :rules="rules">
          <div class="dialogBox">
            <p class="boxTitle">房屋信息</p>
            <el-form-item label="所属房屋：" prop="houseAddress">
              <el-input v-model="editForm.baHouse.houseAddress" placeholder="请选择" style="display: inline-block;width: 90%"/>
              <el-button type="primary" plain style="margin-left: 1%" @click="houseSelection()">选择</el-button>
            </el-form-item>
            <div>
              <el-form-item label="所属小区：" prop="communityName" class="house-width">
                <el-input v-model="editForm.baHouse.communityName" disabled placeholder="请输入" />
              </el-form-item>
              <el-form-item label="所属性质：" prop="houseProperty" class="house-width">
                <el-input v-model="editForm.baHouse.houseProperty" disabled placeholder="请输入" />
              </el-form-item>
              <el-form-item label="房屋产权：" prop="housePropertyRight" class="house-width">
                <el-input v-model="editForm.baHouse.housePropertyRight" disabled placeholder="请输入" />
              </el-form-item>
              <el-form-item label="房屋用途：" prop="housePurpose" class="house-width">
                <el-input v-model="editForm.baHouse.housePurpose" disabled placeholder="请输入" />
              </el-form-item>
              <el-form-item label="房屋标准地址：" prop="houseAddress">
                <el-input v-model="editForm.baHouse.houseAddress" disabled placeholder="请输入" />
              </el-form-item>
            </div>
          </div>
          <div class="dialogBox">
            <p class="boxTitle">基本信息</p>
            <el-form-item label="企业名称：" prop="enterName" class="input-width">
              <el-input clearable v-model="editForm.enterName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="组织类型：" prop="groupType" class="input-width">
              <el-select clearable v-model="editForm.groupType" placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.organization_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业类型：" prop="enterType" class="input-width">
              <el-select clearable v-model="editForm.enterType" placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.enterprise_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业证件登记号：" prop="certRegisterNo" class="input-width">
              <el-input clearable v-model="editForm.certRegisterNo" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="登记机关：" prop="registerAuthority" class="input-width">
              <el-input clearable v-model="editForm.registerAuthority" placeholder="请输入" />
            </el-form-item>
            <div>
              <el-form-item label="法定代表人姓名：" prop="legalRepresentName" class="input-width">
                <el-input clearable v-model="editForm.legalRepresentName" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="法人代表证件号：" prop="legalRepresentCertid" class="input-width">
                <el-input clearable v-model="editForm.legalRepresentCertid" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="法人代表联系方式：" prop="legalRepresentPhone" class="input-width">
                <el-input clearable v-model="editForm.legalRepresentPhone" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="负责人姓名：" prop="securityChargeName" class="input-width">
                <el-input clearable v-model="editForm.securityChargeName" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="负责人证件号：" prop="securityChargeCertid" class="input-width">
                <el-input clearable v-model="editForm.securityChargeCertid" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="负责人联系方式：" prop="securityChargePhone" class="input-width">
                <el-input clearable v-model="editForm.securityChargePhone" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="办公地址：" prop="enterAddress">
                <el-input v-model="editForm.enterAddress" placeholder="请输入" />
              </el-form-item>
            </div>
          </div>
          <div class="dialogBox">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="扩展信息" name="1">
                <div style="width: 70%;display: inline-block;vertical-align: top">
                  <el-form-item label="企业人数：" prop="pAreaId" class="extend-width">
                    <el-input clearable v-model="editForm.enterPeopleNum" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item label="关注程度：" prop="concernDegree" class="extend-width">
                    <el-select clearable v-model="editForm.concernDegree" placeholder="请选择" style="width: 100%">
                      <el-option
                        v-for="dict in dict.type.focous_degree"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否有境外背景：" prop="overseaBackgroud" class="extend-width">
                    <el-select clearable v-model="editForm.overseaBackgroud" placeholder="请选择" style="width: 100%">
                      <el-option
                        v-for="dict in dict.type.is_party_status"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="资金来源：" prop="fundsSource" class="extend-width">
                    <el-input clearable v-model="editForm.fundsSource" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item label="是否有中国党组织：" prop="chinaPartyOrg" class="extend-width">
                    <el-select clearable v-model="editForm.chinaPartyOrg" placeholder="请选择" style="width: 100%">
                      <el-option
                        v-for="dict in dict.type.is_party_status"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="中共党员数量：" prop="cpcPartymemberNum" class="extend-width" v-if="editForm.chinaPartyOrg === '是'">
                    <el-input clearable v-model="editForm.cpcPartymemberNum" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item label="是否有工会：" prop="labourUnion" class="extend-width">
                    <el-select clearable v-model="editForm.labourUnion" placeholder="请选择" style="width: 100%">
                      <el-option
                        v-for="dict in dict.type.is_party_status"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="工会会员数量：" prop="labourMemberNum" class="extend-width" v-if="editForm.labourUnion === '是'">
                    <el-input clearable v-model="editForm.labourMemberNum" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item label="是否有妇联组织：" prop="womenOrganization" class="extend-width">
                    <el-select clearable v-model="editForm.womenOrganization" placeholder="请选择" style="width: 100%">
                      <el-option
                        v-for="dict in dict.type.is_party_status"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="妇联数量：" prop="womenNum" class="extend-width" v-if="editForm.womenOrganization === '是'">
                    <el-input clearable v-model="editForm.womenNum" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item label="简介：" prop="briefIntroduction">
                    <el-input v-model="editForm.briefIntroduction" type="textarea" placeholder="请输入" />
                  </el-form-item>
                </div>
                <div style="display: inline-block;width: 30%;vertical-align: top">
                  <el-form-item label="企业logo：" prop="enterLogoPicture">
                    <image-upload v-model="editForm.enterLogoPicture" :limit="1"/>
                  </el-form-item>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitForm('editForm')">保存</el-button>
        <el-button type="default" @click="dictEditVisible('editForm')">取消</el-button>
      </div>
    </el-dialog>

    <!--房屋选择弹窗 -->
    <el-dialog
      :visible.sync="houseDialog"
      title="房屋选择器"
      width="70%"
      :close-on-click-modal="false"
      @close="dictHouseVisible()">
      <template>
        <el-form
          ref="houseForm"
          :model="houseForm"
          size="small"
          :inline="true"
          label-width="82px">
          <el-form-item label="网格：" prop="areaId">
            <treeSelect
              v-model="houseForm.areaId"
              :props="treeProps"
              :options="treeData"
              placeholder="请选择"
              @getValue="getEstate($event)">
            </treeSelect>
          </el-form-item>
          <el-form-item label="所属小区：">
            <el-select clearable filterable v-model="houseForm.communityId" placeholder="请选择" @change="getBuilding">
              <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属建筑：">
            <el-select clearable filterable v-model="houseForm.building" placeholder="请选择"  @change="getUnit($event)">
              <el-option
                v-for="item in buildingOptions"
                :key="item.value"
                :label="item.label"
                :value={value:item.value,buidingNumber:item.buidingNumber}>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属单元：">
            <el-select clearable filterable v-model="houseForm.unitNumber" placeholder="请选择">
              <el-option
                v-for="item in UnitOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字：">
            <el-input clearable v-model="houseForm.key" placeholder="房主姓名/门牌号" />
          </el-form-item>
          <el-form-item>
            <el-button plain size="small" @click="houseHandleQuery">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :loading="loading"
          :data="houseList"
          :header-cell-style="{background:'#EBF7FF'}"
          stripe border>
          <el-table-column align="center" width="36">
            <template slot-scope="scope">
              <el-radio :label="scope.row.houseId" v-model="checked" @change="cardRadionChange(scope.row)">{{''}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="所属网格" align="center" prop="areaName" />
          <el-table-column label="所属建筑" align="center" prop="communityName">
            <template slot-scope="scope">
              <p>{{scope.row.communityName}}{{scope.row.buidingNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="所属单元" align="center" prop="unitNumber" width="120"/>
          <el-table-column label="门牌号" align="center" prop="houseNumber" width="100">
            <template slot-scope="scope">
              <p v-if="scope.row.houseNumber === '' || scope.row.houseNumber === null">/</p>
              <p v-else>{{scope.row.houseNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="房主" align="center" prop="name" width="120">
            <template slot-scope="scope">
              <p v-if="scope.row.name === '' || scope.row.name === null">/</p>
              <p v-else>{{scope.row.name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="标准地址" align="center" prop="houseAddress" width="462">
            <template slot-scope="scope">
              <p v-if="scope.row.houseAddress === '' || scope.row.houseAddress === null">/</p>
              <p v-else>{{scope.row.houseAddress}}</p>
            </template>
          </el-table-column>
        </el-table>
        <p>共{{this.houseForm.total}}条</p>
        <!-- 分页 -->
        <pagination
          :total="houseForm.total"
          :page.sync="houseForm.pageNum"
          :limit.sync="houseForm.pageSize"
          @pagination="houseSelection()"
        />
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="houseSubmitForm()">确定</el-button>
        <el-button type="default" @click="dictHouseVisible()">取消</el-button>
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
import {treeList,areaTree} from "@/api/area/area";
import {estateList,buildingList} from "@/api/area/population";
import {listEnterprise,listEnterpriseLimit,delEnterprise,getHouseList,getEnterprise,updateEnterprise,getUnitList} from "@/api/area/enterprise";
import { getToken } from "@/utils/auth";

export default {
  name: "populationSenior",
  dicts: [
    'organization_type',
    'enterprise_type',
    'sys_normal_disable',
    'focous_degree',
    'is_party_status'
  ],
  data() {
    return {
      loading: true, // 遮罩层
      buildingOptions:[],  //建筑下拉框
      treeData: [], //下拉框数据
      treeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      value:'',//选中的数据
      enterprises: [], //企业列表
      queryParams: {   // 查询参数
        userId:localStorage.getItem("userId"),
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,  // 总条数
      houseDialog:false,  // 房屋选择弹窗
      checked: '', //房屋选择单选是否选中
      dialogEdit: false, //编辑弹窗
      editForm: {  //编辑表单参数
        baHouse:{}
      },
      houseList: [], //房屋选择器表单数据
      houseSelected: {}, //单选选中的数据
      activeNames: ['1'],  //折叠板默认展开
      regionOptions:[],  //小区下拉框
      UnitOptions:[],  //单元下拉框
      //房屋选择器搜索参数
      houseForm: {
        pageNum: 1,    //当前页
        pageSize: 10,  //每页条数
        total: 0,   // 总条数
      },
      // 用户导入参数
      upload: {
        importDialog: false, // 是否显示弹出层（用户导入）
        isUploading: false, // 是否禁用上传
        updateSupport: 0,   // 是否更新已经存在的用户数据
        headers: { Authorization: "Bearer" + getToken()}, // 设置上传的请求头部
        url: process.env.VUE_APP_BASE_API + "/system/enterprise/importData"  // 上传的地址
      },

      // 表单校验
      rules: {},
    };
  },

  mounted() {
    this.getList();
    this.getTree();
    this.getBuildings();
  },
  methods: {
    // 查询树
    getTree() {
      let param = {
        userId:localStorage.getItem("userId"),
        flag:0
      }
      // treeList().then(res => {
      areaTree(param).then(res => {
        this.treeData = res.data
      })
    },

    // 查询建筑
    getBuildings() {
      buildingList().then(res => {
        let options = res.data;
        this.buildingOptions = options.map(item => {
          return {value:`${item.id}`,label: `${item.community_name}${item.buiding_number}`};
        })
      })
    },

    // 获取所有企业列表
    getList(data) {
      this.loading = true;
      listEnterpriseLimit(this.queryParams).then((res) => {
        if(res.code === 200){
          this.enterprises = res.rows
          this.total = res.total
        }
      });
    },

    //房屋选择器弹窗
    houseSelection(){
      this.houseDialog = true
      if(this.editForm.houseId !== '' && this.editForm.houseId !== null && this.editForm.houseId !== undefined){
        this.checked = this.editForm.houseId
      }
      getHouseList(this.houseForm).then((res) => {
        if (res.code === 200) {
          this.houseList = res.rows;
          this.houseForm.total = res.total
        }
      });
    },

    //小区
    getEstate(value) {
      let param = {
        areaId : value.id
      }
      estateList(param).then(res => {
        let options = res.rows;
        this.regionOptions = options.map(item => {
          return {value:`${item.id}`,label: `${item.communityName}`};
        })
      })
    },

    // 所属建筑
    getBuilding(value) {
      let param = {
        areaId: this.houseForm.areaId,
        communityId:value,
      }
      buildingList(param).then(res => {
        let options = res.data;
        this.buildingOptions = options.map(item => {
          return {value:`${item.id}`,label: `${item.community_name}${item.buiding_number}`,buidingNumber: `${item.buiding_number}`};
        })
      })
    },

    // 所属单元
    getUnit(value) {
      let param = {
        communityId:value.value,
        buidingNumber:value.buidingNumber,
      }
      getUnitList(param).then(res => {
        console.log(res)
        let options = res.data;
        this.UnitOptions = options.map(item => {
          return {value:`${item.unit_number}`,label: `${item.unit_number}`};
        })
      })
    },

    //房屋选择器查询
    houseHandleQuery() {
      this.houseForm.pageNum = 1;
      console.log(this.houseForm.building)
      if(this.houseForm.building !== undefined){
        this.houseForm.id = this.houseForm.building.value
      }
      this.houseSelection(this.houseForm);
    },

    //房屋选择器单选按钮
    cardRadionChange(row) {
      this.houseList.forEach(item=>{
        item.checked= item.houseId
      })
      this.houseSelected = row
    },

    //房屋选择器确定
    houseSubmitForm(){
      this.houseDialog = false
      console.log(this.isAdd)
      if(this.isAdd === true){
        this.addForm.houseAddress = this.houseSelected.houseAddress
        this.addForm.communityName = this.houseSelected.communityName
        this.addForm.houseProperty = this.houseSelected.houseProperty
        this.addForm.housePropertyRight = this.houseSelected.housePropertyRight
        this.addForm.housePurpose = this.houseSelected.housePurpose
        this.addForm.houseId = this.houseSelected.houseId
      }else if(this.isAdd === false){
        this.editForm.baHouse.houseAddress = this.houseSelected.houseAddress
        this.editForm.baHouse.communityName = this.houseSelected.communityName
        this.editForm.baHouse.houseProperty = this.houseSelected.houseProperty
        this.editForm.baHouse.housePropertyRight = this.houseSelected.housePropertyRight
        this.editForm.baHouse.housePurpose = this.houseSelected.housePurpose
        this.editForm.baHouse.houseId = this.houseSelected.houseId
        this.editForm.houseId = this.houseSelected.houseId
      }
    },

    //房屋选择器取消
    dictHouseVisible(){
      this.houseDialog = false
      this.houseSelected = {}
      this.houseForm = {}
    },

    // 编辑弹窗打开
    handleEdit(row) {
      this.dialogEdit = true;
      this.isAdd = false
      getEnterprise(row.id).then((res) => {
        if (res.code === 200) {
          console.log(res)
          this.editForm = res.data;
        }
      });
    },

    //编辑的提交按钮
    submitForm(editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          console.log(this.editForm)
          updateEnterprise(this.editForm).then((res) => {
            this.dialogEdit =false;
            this.$message.success("修改成功");
            this.getList()
          }).catch(() => {
          });
        }
      });
    },

    //编辑弹窗关闭
    dictEditVisible(editForm) {
      this.$refs[editForm].resetFields();
      this.dialogEdit = false
    },

    //查询
    handleQuery() {
      console.log(this.queryParams);
      this.queryParams.pageNum = 1;
      this.getList(this.queryParams);
    },

    //删除按钮操作
    handleDelete(row) {
      const id = row.id;
      this.$confirm('是否删除企业："' + row.enterName + '"？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delEnterprise(id)
      }).then(data => {
        this.getList();
        this.$message.success('删除成功')
      }).catch(() => {})
    },

    // 导入按钮操作
    handleImport() {
      this.upload.importDialog = true;
    },

    //下载模板操作
    importTemplate() {
      this.download('/system/enterprise/importTemplate', {
      }, `实有企业模板-${new Date().getTime()}.xlsx`)
    },

    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },

    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.importDialog = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },

    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },

    //批量导出
    handleExport() {
      this.download('/system/enterprise/export', {
        ...this.queryParams
      }, `企业信息-${new Date().getTime()}.xlsx`)
    },
  }
};
</script>
<style scoped>
/* 标题样式 */
.title-font {
  text-align: center;
  font-weight: bold;
}
/*弹窗公共样式*/
.dialogBox{
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
}
.boxTitle{
  font-size: 14px;
  font-weight: bold;
}
/* 房屋信息编辑输入框样式 */
.house-width {
  width: 25%;
  display: inline-block;
}
/* 基本信息输入框样式 */
.input-width {
  width: 31%;
  display: inline-block;
}
/* 扩展信息输入框样式 */
.extend-width {
  width: 50%;
  display: inline-block;
}
/*折叠版块样式*/
/deep/ .el-collapse{
  border: none;
}
/deep/.el-collapse-item__wrap{
  border: none;
}
/deep/ .el-collapse-item__header{
  font-weight: bold;
  color: #606266;
  border: none;
}
</style>
