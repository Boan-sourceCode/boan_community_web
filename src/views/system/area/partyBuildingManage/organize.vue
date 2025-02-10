<!-- 优秀党组织 -->
<template>
  <div class="app-container">
    <!-- 上侧表单 -->
    <el-form
      :model="queryParams"
      ref="queryParams"
      size="small"
      :inline="true"
      label-width="82px">
      <el-form-item label="所属网格：" prop="areaId">
        <treeSelect
          v-model="queryParams.areaId"
          :props="treeProps"
          :options="treeData"
          :value="value"
          placeholder="请选择">
        </treeSelect>
      </el-form-item>
      <el-form-item label="年份：" prop="year">
        <el-date-picker
          v-model="queryParams.year"
          type="year"
          value-format="yyyy"
          placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字：" prop="partyName">
        <el-input clearable v-model="queryParams.partyName" placeholder="请输入党组织名称"/>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="handleQuery">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button plain @click="handleAddOne()">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :loading="loading"
      :data="tableList"
      :header-cell-style="{ background: '#EBF7FF' }"
      stripe border>
      <el-table-column label="编号" align="center" prop="extend" />
      <el-table-column label="所属网格" align="center" prop="areaName" />
      <el-table-column label="优秀党组织名称" align="center" prop="partyName" />
      <el-table-column label="优秀党组织级别" align="center" prop="partyLevel" />
      <el-table-column label="年份" align="center" prop="year" />
      <el-table-column label="添加人" align="center" prop="addUser" />
      <el-table-column label="添加时间" align="center" prop="addTime" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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
    <!-- 添加优秀党组织三级弹窗 -->
    <div>
      <!-- 添加优秀党组织一级弹窗 -->
      <el-dialog
        :visible.sync="addDialogOne"
        title="添加优秀党组织"
        width="50%"
        :close-on-click-modal="false"
        @close="closeDialogOne('honorForm')">
        <el-form
          ref="honorForm"
          label-width="138px"
          :model="honorForm"
          :rules="rules"
          style="padding: 0 25%">
          <el-form-item label="年份：" prop="year">
            <el-date-picker
              v-model="honorForm.year"
              type="year"
              value-format="yyyy"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="党组织荣誉：" prop="partyHonor">
            <el-select clearable v-model="honorForm.partyHonor" placeholder="请选择">
              <el-option
                v-for="dict in dict.type.party_honor"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align: center">
          <el-button type="primary" @click="handleAddTwo('honorForm')">下一步</el-button>
        </div>
      </el-dialog>
      <!-- 添加优秀党组织二级弹窗 -->
      <el-dialog
        :visible.sync="addDialogTwo"
        title="添加优秀党组织"
        width="60%"
        :close-on-click-modal="false"
        @close="closeDialogTwo()"
        class="honor">
        <!-- 上侧表单 -->
        <div class="titleBox">
          <p>选择党组织</p>
        </div>
        <el-form
          :model="honorTwoForm"
          ref="honorTwoForm"
          size="small"
          :inline="true"
          label-width="82px">
          <el-form-item label="所属网格：">
            <treeSelect
              v-model="honorTwoForm.areaId"
              :props="treeProps"
              :options="treeData"
              :value="value"
              placeholder="请选择">
            </treeSelect>
          </el-form-item>
          <el-form-item label="关键字：" prop="partyName">
            <el-input clearable v-model="honorTwoForm.partyName" placeholder="请输入党组织名称"/>
          </el-form-item>
          <el-form-item>
            <el-button plain @click="honorData()">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
          :loading="loading"
          :data="honorTwoData"
          :header-cell-style="{ background: '#EBF7FF' }"
          stripe border
          @selection-change="handleSelectionChange"
          ref="multipleTable"
          :row-key="getRowKey">
          <el-table-column :reserve-selection="true" label="选择" type="selection" width="55" align="center"/>
          <el-table-column label="所属网格" align="center" prop="areaName" />
          <el-table-column label="党组织" align="center" prop="partyName" />
          <el-table-column label="年份" align="center" prop="year" />
        </el-table>
        <!-- 分页 -->
        <pagination
          :total="honorTwoTotal"
          :page.sync="honorTwoForm.pageNum"
          :limit.sync="honorTwoForm.pageSize"
          @pagination="honorData()"
        />
        <div slot="footer" style="text-align: center">
          <el-button type="primary" @click="handleAddThree()">确定</el-button>
        </div>
      </el-dialog>
      <!-- 添加优秀党组织三级弹窗 -->
      <el-dialog
        :visible.sync="addDialogThree"
        title="添加优秀党组织"
        width="50%"
        :close-on-click-modal="false"
        @close="closeDialogThree()"
        class="honor">
        <!-- 表格 -->
        <div class="titleBox">
          <p>{{this.partyHonor}}</p>
        </div>
        <el-table :loading="loading" :data="honorThreeData" :header-cell-style="{ background: '#EBF7FF' }" stripe border>
          <el-table-column label="所属网格" align="center" prop="areaName" />
          <el-table-column label="党组织" align="center" prop="partyName" />
          <el-table-column label="年份" align="center" prop="year" />
        </el-table>
        <!-- 分页 -->
        <pagination
          :total="honorThreeTotal"
          :page.sync="honorThreeForm.pageNum"
          :limit.sync="honorThreeForm.pageSize"
          @pagination="handleAddThree()"
        />
        <div slot="footer" style="text-align: center">
          <el-button type="primary" @click="closeDialogThree()">完成</el-button>
        </div>
      </el-dialog>
    </div>

    <!--优秀党组织编辑弹窗-->
    <div>
      <!-- 党组织编辑弹窗 -->
      <el-dialog
        :visible.sync="editPartyDialog"
        title="优秀党组织编辑"
        width="70%"
        :close-on-click-modal="false"
        @close="closeEditDialog('editPartyForm')"
        center>
        <template>
          <el-form
            ref="editPartyForm"
            label-width="138px"
            :model="editPartyForm"
            :rules="rules">
            <div class="dialogBox">
              <el-form-item label="所属网格：" prop="areaId" class="input-width">
                <treeSelect
                  v-model="editPartyForm.areaId"
                  :props="treeProps"
                  :options="treeData"
                  :value="value"
                  disabled
                  placeholder="请选择">
                </treeSelect>
              </el-form-item>
              <el-form-item label="编号：" prop="extend" class="input-width">
                <el-input clearable disabled v-model="editPartyForm.extend" placeholder="请输入编号"/>
              </el-form-item>
              <el-form-item label="所属上级：" prop="partyPid" class="input-width">
                <treeSelect
                  v-model="editPartyForm.partyPid"
                  :props="partyTreeProps"
                  :options="partyTreeData"
                  :value="partyValue"
                  disabled
                  placeholder="请选择">
                </treeSelect>
              </el-form-item>
              <el-form-item label="党组织名称：" prop="partyName" class="input-width">
                <el-input clearable v-model="editPartyForm.partyName" placeholder="请输入组织名称"/>
              </el-form-item>
              <el-form-item label="党组织简称：" prop="partyAcronym" class="input-width">
                <el-input clearable v-model="editPartyForm.partyAcronym" placeholder="请输入简称"/>
              </el-form-item>
              <div>
                <el-form-item label="书记：" prop="partyManager" class="input-width">
                  <span class="peopleSpan" v-if="editPartyForm.partyManagerInfo === null">暂无人员</span>
                  <span class="peopleSpan" v-else-if="editPartyForm.partyManagerInfo === undefined">暂无人员</span>
                  <span class="peopleSpan" v-else-if="editPartyForm.partyManagerInfo.length === 0">暂无人员</span>
                  <span class="peopleSpan" v-else v-for="item in editPartyForm.partyManagerInfo">{{ item.name }}</span>
                  <el-button class="choose" plain style="margin-left: 3%" @click="handleChoose(sign='书记')">选择</el-button>
                </el-form-item>
                <el-form-item label="委员：" prop="partyCommittee" class="input-width">
                  <span class="peopleSpan" v-if="editPartyForm.partyCommitteeInfo === null">暂无人员</span>
                  <span class="peopleSpan" v-else-if="editPartyForm.partyCommitteeInfo === undefined">暂无人员</span>
                  <span class="peopleSpan" v-else-if="editPartyForm.partyCommitteeInfo.length === 0">暂无人员</span>
                  <span class="peopleSpan" v-else v-for="item in editPartyForm.partyCommitteeInfo">{{ item.name }}</span>
                  <el-button class="choose" plain style="margin-left: 3%" @click="handleChoose(sign='委员')">选择</el-button>
                </el-form-item>
                <el-form-item label="组织管理员：" prop="partyAdmins" class="input-width">
                  <span class="peopleSpan" v-if="editPartyForm.partyAdminsInfo === null">暂无人员</span>
                  <span class="peopleSpan" v-else-if="editPartyForm.partyAdminsInfo === undefined">暂无人员</span>
                  <span class="peopleSpan" v-else-if="editPartyForm.partyAdminsInfo.length === 0">暂无人员</span>
                  <span class="peopleSpan" v-else v-for="item in editPartyForm.partyAdminsInfo">{{ item.name }}</span>
                  <el-button class="choose" plain style="margin-left: 3%" @click="handleChoose(sign='组织管理员')">选择</el-button>
                </el-form-item>
                <el-form-item label="党组织荣誉：" prop="partyHonor" class="input-width">
                  <el-select clearable v-model="editPartyForm.partyHonor" placeholder="请选择">
                    <el-option
                      v-for="dict in dict.type.party_honor"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="党组织分级：" prop="partyLevel" class="input-width">
                  <el-select clearable v-model="editPartyForm.partyLevel" placeholder="请选择">
                    <el-option
                      v-for="dict in dict.type.party_level"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="党组织头像：" prop="partyAvatar" class="input-width">
                  <image-upload v-model="editPartyForm.partyAvatar" :limit="1" style="margin-top: 18px"/>
                </el-form-item>
                <el-form-item label="党组织风采：" prop="partyPropagate" class="input-width">
                  <image-upload v-model="editPartyForm.partyPropagate" :limit="1" style="margin-top: 18px"/>
                </el-form-item>
                <el-form-item label="简介：" prop="partyAbstract">
                  <el-input type="textarea" :rows="2" clearable v-model="editPartyForm.partyAbstract" placeholder="简历文字"/>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </template>
        <div slot="footer" style="text-align: center">
          <el-button type="primary" @click="submitEdit('editPartyForm')">保存</el-button>
          <el-button @click="closeEditDialog('editPartyForm')">取消</el-button>
        </div>
      </el-dialog>

      <!-- 党员选择器弹窗 -->
      <el-dialog
        :visible.sync="chooseDialog"
        title="党员选择器"
        width="80%"
        :close-on-click-modal="false"
        @close="closeChooseDialog()"
        style="font-size: 20px; height: 769px">
        <template>
          <el-form
            ref="chooseForm"
            label-width="138px"
            :model="chooseForm"
            :rules="rules">
            <div class="bigbox">
              <div class="leftbox">
                <p class="boxTitle">党支部:</p>
                <el-tree :data="partyTreeData" :props="partyTreeProps" node-key="id"  @node-click="sendYourSelf" style="background:#efefef"></el-tree>
              </div>
              <div class="rightbox">
                <div class="table">
                  <el-form v-model="queryParams" :inline="true" size="small">
                    <el-form-item label-width="96px">
                      <el-input clearable v-model="chooseForm.key" placeholder="姓名/身份证"/>
                    </el-form-item>
                    <el-button size="small" @click="handlePartyQuery" plain>查询</el-button>
                  </el-form>
                  <el-table
                    :loading="loading"
                    :data="partyChooseList"
                    :header-cell-style="{ background: '#EBF7FF' }"
                    stripe border
                    @selection-change="partySelectionChange"
                    ref="partyMemberTable"
                    :row-key="getRowKeyParty">
                    <el-table-column label="选择" :reserve-selection="true" type="selection" width="55" align="center"/>
                    <el-table-column label="姓名" prop="name" align="center" />
                    <el-table-column label="党组织" prop="partyName" align="center"/>
                    <el-table-column label="身份证号" prop="idCard" align="center">
                      <template slot-scope="scope">
                        <p v-if="scope.row.idCard === '' || scope.row.idCard === null">/</p>
                        <p v-else>{{ scope.row.idCard }}</p>
                      </template>
                    </el-table-column>
                    <el-table-column label="性别" prop="sex" align="center">
                      <template slot-scope="scope">
                        <p v-if="scope.row.sex === '' || scope.row.sex === null">/</p>
                        <p v-else>{{ scope.row.sex }}</p>
                      </template>
                    </el-table-column>
                    <el-table-column label="联系方式" prop="phoneNumber" align="center">
                      <template slot-scope="scope">
                        <p v-if="scope.row.phoneNumber === '' || scope.row.phoneNumber === null">/</p>
                        <p v-else>{{ scope.row.phoneNumber }}</p>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                  <pagination
                    :total="partyChooseTotal"
                    :page.sync="chooseForm.pageNum"
                    :limit.sync="chooseForm.pageSize"
                    @pagination="sendYourSelf()"
                  />
                </div>
                <div class="choice">
                  <p style="margin-top: 0">已选择</p>
                  <div v-if="this.partyMemberIds.length !== 0">
                    <p v-for="(item,index) in this.partyMemberIds">
                      <span>{{ item.name }}</span>
                      <i @click="toggleSelection(item)" class="el-icon-circle-close"></i>
                    </p>
                  </div>
                  <div v-else style="text-align: center">
                    <p>暂未选择</p>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </template>
        <div slot="footer" style="text-align: center">
          <el-button type="primary" @click="submitChoose">保存</el-button>
          <el-button @click="closeChooseDialog()">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { partyTreeLimit } from "@/api/area/partymember";
import { honorList,partyInfo,honorParty,selectParty,partyEdit,selectPartyMember,submitPartyMember } from "@/api/area/partyOrganization";
import { areaTree } from "@/api/area/area";
export default {
  name: "organize",
  dicts: [
    "party_honor",
    "party_level",
  ],
  data() {
    return {
      loading: true, // 遮罩层
      tableList: [], // 优秀党组织表格数据
      // 查询参数
      queryParams: {
        userId:localStorage.getItem("userId"),
        areaId:'',
        year:'',
        key:'',
        pageNum: 1,
        pageSize: 10,
      },
      total: 0, // 总条数
      treeData: [], //下拉框数据
      treeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      value:'',

      //添加优秀党组织
      addDialogOne: false, //添加优秀党组织一级弹窗
      year:'',
      partyHonor:'',
      honorForm:{ //添加优秀党组织一级弹窗数据
        year:'',
        partyHonor:'',
      },
      addDialogTwo: false, //添加优秀党组织二级弹窗
      //添加优秀党组织二级弹窗查询
      honorTwoForm:{
        year:'',
        partyHonor:'',
        areaId: "",
        partyName: "",
        pageNum: 1,
        pageSize: 10,
        userId:localStorage.getItem("userId"),
      },
      honorTwoData:[], //表格数据
      honorTwoTotal:0,  //表格分页
      honorIds:[], //选中的人员数组
      addDialogThree: false, //添加优秀党组织三级弹窗
      honorThreeData:[], //添加优秀党组织后的表格数据
      honorThreeForm:{
        pageNum: 1,
        pageSize: 10,
      },
      honorThreeTotal:0, //添加优秀党组织后的表格分页
      rules: {
        year: [
          {required: true, trigger: "change", message: '请选择年份'}
        ],
        partyHonor: [
          {required: true, trigger: "change", message: '请选择党组织荣誉'}
        ],
      },

    //党组织编辑
      editPartyDialog:false, //党组织编辑弹窗
      editPartyForm:{}, //编辑党组织参数
      chooseForm: { //党员选择器表格数据
        partyBranch:'',
        key:'',
        flag:0,
        pageNum:1,
        pageSize:10,
      },
      partyChooseTotal:0, //党员选择器表格总条数
      chooseDialog: false, //党员选择器弹窗
      sign:'',    //弹窗打开时保存是哪个的选择，用于保存时判断
      partyChooseList: [], //党员选择器表格数据
      partyMemberIds:[], //党员选择器多选框选中数据
      partyData:[], //党员选择器保存返回的数据
      partyValue:'',
    //党支部树
      partyTreeData: [], //党组织数据
      partyTreeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
    };
  },
  created() {
    this.getList();
    this.getTree();
  },
  methods: {
    // 查询树
    getTree(value) {
      let param = {
        userId:localStorage.getItem("userId"),
        flag:0  //为0时是全部的，为1时展示到社区
      }
      areaTree(param).then((res) => {
        this.treeData = res.data;
      });
    },

    // 获取页面数据
    getList() {
      this.loading = true;
      honorList(this.queryParams).then((res) => {
        this.tableList = res.rows;
        this.total = res.total;
        this.loading = false;
      });
    },

    //查询按钮
    handleQuery() {
      this.getList(this.queryParams);
    },

    //添加优秀党组织弹窗
    //添加优秀党组织一级弹窗
    handleAddOne() {
      this.addDialogOne = true;
    },
    // 添加优秀党组织一级弹窗关闭
    closeDialogOne(honorForm) {
      this.addDialogOne = false;
      this.$refs[honorForm].resetFields();
    },
    //添加优秀党组织二级弹窗（一级弹窗的下一步按钮）
    handleAddTwo(honorForm) {
      this.year = this.honorForm.year
      this.partyHonor = this.honorForm.partyHonor
      this.$refs[honorForm].validate((valid) => {
        if (valid) {
          this.addDialogOne = false;
          this.addDialogTwo = true;
          if(this.$refs.multipleTable) {
            this.$refs.multipleTable.clearSelection();
          }
          this.honorData()
        }
      })
    },
    //获取二级弹窗的表格数据（要用分页和查询所以单独写）
    honorData(){
      this.honorTwoForm.year = this.year
      this.honorTwoForm.partyHonor = this.partyHonor
      partyInfo(this.honorTwoForm).then((res) => {
        this.honorTwoData = res.rows;
        this.honorTwoTotal = res.total
      });
    },
    // 添加优秀党组织二级弹窗关闭
    closeDialogTwo() {
      this.addDialogTwo = false;
      this.honorTwoForm.partyName = ""
      this.honorTwoForm.areaId = ""
    },
    //分页后选中的值不被清空
    getRowKey(row){
      return row.id
    },
    // 多选框选中数据
    handleSelectionChange(val) {
      this.honorIds = val.map(item => item.partyId)
    },
    //添加优秀党组织三级弹窗（二级弹窗的确定按钮）
    handleAddThree() {
      if(this.honorIds.length === 0){
        this.$message.error('请选择党组织')
      }else{
        this.addDialogTwo = false;
        this.addDialogThree = true;
        let param = {
          year:this.year,
          partyHonor:this.partyHonor,
          addUser:localStorage.getItem("username"),
          partyIds:this.honorIds,
          userId:localStorage.getItem("userId"),
        }
        honorParty(param).then((res) => {
          this.honorThreeData = res.rows;
          this.honorThreeTotal = res.total
        });
      }
    },
    // 添加优秀党组织三级弹窗关闭
    closeDialogThree() {
      this.addDialogThree = false;
      this.honorIds = []
      this.getList();
    },

    // 编辑党组织弹窗打开
    handleEdit(row) {
      this.editPartyDialog = true;
      selectParty(row.partyId).then((res) => {
        if (res.code === 200) {
          this.editPartyForm = res.data;
        }
      });
      this.getPartyTree(); //党组织树
    },

    // 编辑党组织弹窗提交
    submitEdit(editPartyForm) {
      this.$refs[editPartyForm].validate((valid) => {
        if (valid) {
          console.log(this.editPartyForm);
          partyEdit(this.editPartyForm).then((res) => {
              this.editPartyDialog = false;
              this.$message.success("修改成功");
              this.getList();
            }).catch(() => {});
        }
      });
    },

    //编辑党组织弹窗关闭
    closeEditDialog(editPartyForm) {
      this.editPartyDialog = false;
      this.$refs[editPartyForm].resetFields();
    },

    // 党组织编辑弹窗-至-党员选择器弹窗
    handleChoose(sign) {
      this.sign = sign
      this.chooseDialog = true;
    },
    //添加党员选择器弹窗关闭
    closeChooseDialog() {
      this.chooseDialog = false;
      if(this.$refs.partyMemberTable) {
        this.$refs.partyMemberTable.clearSelection();
      }
    },
    //党组织树
    getPartyTree() {
      let param = {
        userId:localStorage.getItem("userId"),
      }
      partyTreeLimit(param).then(res => {
        this.partyTreeData = res.data
        this.sendYourSelf()
      })
    },

    //党员选择器表格数据
    sendYourSelf(data) {
      if(data !== null && data !== undefined && data !== ''){
        this.chooseForm.partyBranch = data.id
      }else {
        this.chooseForm.partyBranch = ''
      }
      selectPartyMember(this.chooseForm).then((res) => {
        this.partyChooseList = res.data.list;
        this.partyChooseTotal = res.data.total
      });
      console.log(this.partyMemberIds)
    },

    // 党员查询按钮
    handlePartyQuery() {
      this.sendYourSelf()
    },

    // 党员选择器多选框选中数据
    partySelectionChange(val) {
      if(this.sign === '书记'){
        if (val.length === 1) {
          this.partyMemberIds = val
        }
        if (val.length > 1) {
          this.partyMemberIds = val
          // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
          // 该方法不创建新数组，而是直接修改原有的 arrayObject。
          let del_row = val.shift()
          // 其余的都不选中
          this.$refs.partyMemberTable.toggleRowSelection(del_row, false)
          console.log(this.partyMemberIds)
        }
      }else{
        this.partyMemberIds = val
      }
    },


    //党员选择器分页后选中的值不被清空
    getRowKeyParty(row){
      return row.id
    },

    //点击清除选中
    toggleSelection(val) {
      this.$refs.partyMemberTable.toggleRowSelection(val);
      if(this.sign === '书记'){
        this.partyMemberIds = []
      }
    },

    //多选框数据保存
    submitChoose(){
      console.log(this.sign)
      let ids = this.partyMemberIds.map(item => item.id)
      let param = {
        partyIds:ids
      }
      submitPartyMember(param).then(res => {
        let options = res.data
        this.partyData = options.map(item => {
          return {idCard:`${item.peopleCard}`,name: `${item.name}`};
        })
        if(this.sign === '书记'){
          this.editPartyForm.partyManagerInfo = this.partyData
        }else if (this.sign === '委员'){
          this.editPartyForm.partyCommitteeInfo = this.partyData
        }else if (this.sign === '组织管理员'){
          this.editPartyForm.partyAdminsInfo = this.partyData
        }
        this.chooseDialog = false;
        this.$message.success('保存成功！')
      })
    },

  },
};
</script>


<style scoped>
/*添加优秀党组织*/
.honor ::v-deep .el-dialog__body{
  padding-top: 0;
}
.honor .titleBox{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #303133;
}
.honor .titleBox p{
  margin-top: 0;
}
/* 添加/编辑弹出框样式 */
.input-width {
  width: 31%;
  display: inline-block;
}
.input-width div {
  width: 90%;
}
.choose {
  position: absolute;
  top: 0;
  right: 3%;
  width: 66px;
  height: 36px;
}
/*党员选择器*/
/* 大盒子 */
.bigbox {
  overflow: hidden;
  width: 100%;
}
/* 党员选择器-左侧盒子 */
.leftbox {
  width: 27%;
  height: 100vh;
  background-color: #efefef;
  float: left;
  overflow-x: hidden;
  overflow-y: auto;
}
/*左侧滚动条*/
.leftbox::-webkit-scrollbar {
  width: 6px;
  height: 2px;
}
.leftbox::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: rgba(0,0,0,0.3);
}
.leftbox::-webkit-scrollbar-track {
  border-radius: 0;
}
/* 右侧盒子 */
.rightbox {
  float: left;
  margin-left: 1%;
  width: 72%;
  padding: 0 20px 10px 20px;
}
.boxTitle {
  margin-left: 15px;
  font-size: 14px;
  font-weight: bold;
}
/* 请输入盒子 */
.table{
  display: inline-block;
  width: 80%;
  vertical-align: top;
}
.choice {
  display: inline-block;
  width: 20%;
  padding-left: 20px;
}
.choice div{
  border: 1px solid #ccc;
}
.choice p{
  position: relative;
}
.choice span{
  padding: 0 0 0 30%;
}
.choice i{
  cursor: pointer;
  position: absolute;
  top: 3px;
  right: 16%;
}
.peopleSpan{
  margin-right: 10px;
  padding: 6px;
  border-radius: 4px;
  background: #9bc6e3;
  color: #fff;
}
</style>
