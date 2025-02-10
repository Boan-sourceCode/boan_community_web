<template>
  <div>
    <el-form :model="enterpriseParams" size="small" :inline="true" label-width="82px">
      <el-form-item label="所属网格：" prop="areaId">
        <treeSelect
          v-model="enterpriseParams.areaId"
          :props="treeProps"
          :options="treeData"
          :value="value"
          :accordion="true"
          @getValue="getEnterpriseList($event)"
          placeholder="请选择">
        </treeSelect>
      </el-form-item>
      <el-form-item label="建筑：" prop="buildingId">
        <el-select clearable filterable v-model="enterpriseParams.buildingId" placeholder="请选择">
          <el-option
            v-for="item in enterpriseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织类型：" prop="groupType">
        <el-select clearable v-model="enterpriseParams.groupType" placeholder="请选择">
          <el-option
            v-for="dict in dict.type.organization_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业类型：" prop="enterType">
        <el-select clearable v-model="enterpriseParams.enterType" placeholder="请选择">
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
          <el-input clearable v-model="enterpriseParams.key" placeholder="企业/法人名称" />
        </el-form-item>
        <el-form-item>
          <el-button plain @click="handleEnterpriseQuery">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button v-hasPermi="['system:enterprise:export']" @click="handleEnterpriseExport">批量导出</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table
      :loading="loading"
      :data="enterpriseList"
      :header-cell-style="{background:'#EBF7FF'}"
      stripe border>
      <el-table-column label="序号" align="center" prop="id">
        <template slot-scope="scope">
          {{ (scope.$index+1)+(enterpriseParams.pageNum-1)*enterpriseParams.pageSize}}
        </template>
      </el-table-column>
      <el-table-column label="企业名称" align="center" prop="enterName" width="200">
        <template slot-scope="scope">
          <p v-if="scope.row.enterName === '' || scope.row.enterName === null">/</p>
          <p v-else>{{scope.row.enterName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属网格" align="center" prop="areaId" width="172">
        <template slot-scope="scope">
          <p class="card-font" v-if="scope.row.baGridArea === '' || scope.row.baGridArea === null || scope.row.baGridArea === undefined">顶级网格</p>
          <p class="card-font" v-else>{{scope.row.baGridArea.areaName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属建筑" align="center" prop="buildingId" width="116">
        <template slot-scope="scope">
          <p class="card-font" v-if="scope.row.baBuiding === '' || scope.row.baBuiding === null || scope.row.baBuiding === undefined">/</p>
          <p class="card-font" v-else>{{scope.row.baBuiding.communityName}}{{scope.row.baBuiding.buidingNumber}}</p>
        </template>
      </el-table-column>
      <el-table-column label="组织类型" align="center" prop="groupType">
        <template slot-scope="scope">
          <p v-if="scope.row.groupType === '' || scope.row.groupType === null">/</p>
          <dict-tag :options="dict.type.organization_type" :value= scope.row.groupType />
        </template>
      </el-table-column>
      <el-table-column label="企业类型" align="center" prop="enterType">
        <template slot-scope="scope">
          <p v-if="scope.row.enterType === '' || scope.row.enterType === null">/</p>
          <dict-tag v-else :options="dict.type.enterprise_type" :value= scope.row.enterType />
        </template>
      </el-table-column>
      <el-table-column label="企业证件登记号" align="center" prop="certRegisterNo" width="114">
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
      <el-table-column label="法人代表联系方式" align="center" prop="legalRepresentPhone" width="126">
        <template slot-scope="scope">
          <p v-if="scope.row.legalRepresentPhone === '' || scope.row.legalRepresentPhone === null">/</p>
          <p v-else>{{scope.row.legalRepresentPhone}}</p>
        </template>
      </el-table-column>
      <el-table-column label="企业人数" align="center" prop="enterPeopleNum">
        <template slot-scope="scope">
          <p v-if="scope.row.enterPeopleNum === '' || scope.row.enterPeopleNum === null">/</p>
          <p v-else>{{scope.row.enterPeopleNum}}</p>
        </template>
      </el-table-column>
      <el-table-column label="标准地址" align="center" prop="enterAddress" width="400">
        <template slot-scope="scope">
          <p v-if="scope.row.enterAddress === '' || scope.row.enterAddress === null">/</p>
          <p v-else>{{scope.row.enterAddress}}</p>
        </template>
      </el-table-column>
    </el-table>
    <p>共查询/检索{{ this.enterpriseParams.total }}条信息</p>

    <!-- 分页 -->
    <pagination
      :total="enterpriseParams.total"
      :page.sync="enterpriseParams.pageNum"
      :limit.sync="enterpriseParams.pageSize"
      @pagination="getEnterpriseList()"
    />
  </div>
</template>

<script>
import {areaTree} from "@/api/area/area";
import {buildingList} from "@/api/area/population";
import {listEnterpriseLimit} from "@/api/area/enterprise";
export default {
  name: "queryEnterprise",
  dicts: [
    'organization_type',
    'enterprise_type',
  ],
  data() {
    return {
      loading: true,  // 遮罩层
      treeData: [], //下拉框数据
      treeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      value:'',//选中的数据
      //实有企业
      enterpriseList: [], // 实有企业数据
      enterpriseOptions:[], //实有企业建筑下拉框
      enterpriseParams: {  //实有企业
        userId:localStorage.getItem("userId"),
        pageNum: 1, //当前页数
        pageSize: 10,  //每页条数
        total: 0, // 总页数
      },
      form:{},
      rules:{}
    };
  },
  mounted() {
    this.getTree();  //树状下拉框
    this.getEnterpriseList();  //实有企业数据
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
    //实有企业
    //建筑下拉框
    getEnterpriseBuilding(value) {
      buildingList(value).then(res => {
        let options = res.data;
        this.enterpriseOptions = options.map(item => {
          return {value:`${item.id}`,label: `${item.community_name}${item.buiding_number}`};
        })
      })
    },
    // 查询所有企业列表
    getEnterpriseList(data) {
      this.loading = true;
      listEnterpriseLimit(this.enterpriseParams).then((res) => {
        if(res.code === 200){
          this.enterpriseList = res.rows
          this.enterpriseParams.total = res.total
          let param = {
            areaId: this.enterpriseParams.areaId,
            communityId:null,
            houseType:null,
          }
          this.getEnterpriseBuilding(param)
        }
      });
    },
    //查询
    handleEnterpriseQuery() {
      this.enterpriseParams.pageNum = 1;
      this.getEnterpriseList(this.enterpriseParams);
    },
    //批量导出
    handleEnterpriseExport() {
      this.download('/system/enterprise/export', {
        ...this.enterpriseParams
      }, `企业信息-${new Date().getTime()}.xlsx`)
    },
  },
}
</script>

<style scoped>

</style>
