<!--添加非单元-->
<template>
  <div class="app-container">
    <el-steps :active="active" align-center>
      <el-step title="添加楼房">
        添加楼房
      </el-step>
      <el-step title="生成楼房信息">
        <div>
          生成楼房信息
        </div>
      </el-step>
      <el-step title="生成楼房用户">
        <div>
          生成楼房用户
        </div>
      </el-step>
      <el-step title="生成房屋门牌号">
        <div>
          步生成房屋门牌号
        </div>
      </el-step>
      <el-step title="生成房屋信息">
        <div>
          生成房屋信息
        </div>
      </el-step>
    </el-steps>
    <nav>
      <div class="step_one_wrap" v-if="active === 1">
        <div class="top">
          <p class="title">网格信息：</p>
          <ul class="left">
            <li>
              <span>网格编号：</span>
              <span>{{ gridInfo.areaNo }}</span>
            </li>
            <li>
              <span>网格名称：</span>
              <span>{{ gridInfo.areaName }}</span>
            </li>
            <li>
              <span>网格简称：</span>
              <span>{{ gridInfo.areaShortname }}</span>
            </li>
            <li>
              <span>网格类型：</span>
              <span>{{ gridInfo.areaType }}</span>
            </li>
          </ul>
          <div class="right">
            <ul>
              <li>
                <span>网格长：</span>
                <span>{{ gridInfo.arealeaderName }}</span>
              </li>
              <li>
                <span>网格面积：</span>
                <span style="width: 183px">{{ gridInfo.areaMeasure }}</span>
                <span style="margin-left: 14px; position: relative; top: -8px;">㎡</span>
              </li>
              <li style="margin-left: 70px">
                <span>所属网格：</span>
                <span style="width: 550px">{{ gridInfo.belongtoArea }}</span>
              </li>
            </ul>
          </div>
        </div>
        <el-card class="box-card">
          <div class="card_wrap">
            <p>批量添加楼房信息：</p>
            <div class="card_top">
              <ul style="margin-bottom: 30px">
                <li>
                  <span class="essential">*</span><span>建筑类型：</span>
                  <el-select v-model="stepOne.architectureType" placeholder="请选择">
                    <el-option
                      v-for="dict in dict.type.building_type"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                      @click.native="Buildingpulldown(dict)">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span class="essential">*</span><span>建筑用途：</span>
                  <el-select v-model="stepOne.architecturePurpose" placeholder="请选择">
                    <el-option
                      v-for="item in dingpulldown"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span>所属小区：</span>
                  <el-select v-model="stepOneAndTwoParams.communityName" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in belongCommunity"
                      :key="index"
                      :label="item.communityName"
                      :value="item.communityId"
                      @click.native="getCommunityInfo(item)">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span>楼房名称前缀：</span>
                  <el-input v-model="stepOneAndTwoParams.buildingPrefix" placeholder="请输入内容"></el-input>
                </li>
              </ul>
            </div>
            <div class="card_center card_top">
              <ul>
                <li>
                  <span class="essential">*</span><span>楼栋号或名称：</span>
                  <!--                  <el-input class="last_input" v-model="buildingNumber" placeholder="请输入内容"></el-input>-->
                  <div>
                    <vue-tags-input
                      style="width: 547px"
                      placeholder="回车键添加"
                      v-model="buildingNumber"
                      :tags="tags"
                      @tags-changed="newTags => tags = newTags"
                    />
                  </div>
                </li>
                <li>
                  <span class="essential">*</span><span>地上楼层数：</span>
                  <el-input v-model="stepOne.storyNumber" placeholder="请输入内容"></el-input>
                </li>
                <li>
                  <span>地下楼层数：</span>
                  <el-input v-model="stepOne.undergroundNumber" placeholder="请输入内容"></el-input>
                </li>
              </ul>
              <span class="info">楼栋号或名称+计量单位，例如：1号楼,2号楼,勤奋楼,振兴楼</span>
            </div>
            <div class="card_bottom card_top">
              <ul style="margin-top: 16px">
                <li>
                  <span><span class="essential">*</span>每层用户数：</span>
                  <el-input v-model="stepOne.unitPerfloorHousenumber" placeholder="请输入内容"></el-input>
                </li>
              </ul>
            </div>
          </div>
        </el-card>
      </div>
      <div class="step_two_wrap parent" v-if="active === 2">
        <el-card class="box-card">
          <div class="step2_top">
            <ul>
              <li>
                <span>楼房数量：</span>
                <span>{{ buildingSize }}</span>
              </li>
              <li>
                <span>楼栋最高层数：</span>
                <span>{{ stepOne.storyNumber }}</span>
              </li>
              <li>
                <span>每层最多户数：</span>
                <span>{{ stepOne.unitPerfloorHousenumber }}</span>
              </li>
            </ul>
          </div>
          <div class="step2_two">
            <p>
              <span>楼栋号：</span>
              <span v-for="(item, index) in listOne" :key="index">{{ item.buildingNumber }}</span>
            </p>
          </div>
          <div class="step2_three">
            <p>楼房标准地址前缀：</p>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="step2_four">
            <p>单元楼层数：</p>
            <div class="select_wrap">
              <span>楼栋号</span>
              <ul>
                <li v-for="(item, index) in listOne" :key="index" :class="activeOne === index ? 'isActive' : ''"
                    @click="selectActiveOne(item, index)">
                  <span>{{ item.buildingNumber }}</span>
                </li>
              </ul>
            </div>
            <div class="select_wrap">
              <span>地上楼层</span>
              <ul>
                <li v-for="(item, index) in listTwo" :key="index" slot style="border: none" v-if="item.buildingInfo !== []">
                  <el-input v-model="item.storyNumber" placeholder="请输入内容"></el-input>
                </li>
              </ul>
            </div>
            <div class="select_wrap">
              <span>地下楼层</span>
              <ul>
                <li v-for="(item, index) in listTwo" :key="index" slot style="border: none" v-if="item.buildingInfo !== []">
                  <el-input v-model="item.underGroundNumber" placeholder="请输入内容"></el-input>
                </li>
              </ul>
            </div>
          </div>
        </el-card>
        <el-button class="previous" style="margin-top: 12px;" @click="previous" type="info">上一步</el-button>
      </div>
      <el-card class="step3_wrap" v-if="active === 3">
        <p>生成楼层用户：</p>
        <div class="step2_four">
          <div class="select_wrap">
            <span>楼栋号</span>
            <ul>
              <li v-for="(item, index) in listThree" :key="index" :class="activeOne === index ? 'isActive' : ''"
                  @click="stepThreeBuildActive(item, index)">
                <span>{{ item.buildingName }}</span>
              </li>
            </ul>
          </div>
          <div class="select_wrap">
            <span>层数</span>
            <ul>
              <li v-for="(item, index) in stepThreeFloorList" :key="index" :class="activeThree === index ? 'isActive' : ''"
                  @click="stepThreeLayers(item, index)">
                <span>{{item.storey}}</span>
              </li>
            </ul>
          </div>
          <div class="select_wrap">
            <span>每层户数</span>
            <ul>
              <li class="last-children" v-for="(item, index) in stepThreeFloorList" :key="index" slot style="border: none">
                <el-input v-model="item.unitPerfloorHousenumber" placeholder="请输入内容" @input="changeFunc(item, index)"></el-input>
              </li>
            </ul>
          </div>
        </div>
      </el-card>
      <div class="step4_wrap parent" v-if="active === 4">
        <el-card>
          <p>生成房屋门牌号：</p>
          <div class="step2_four">
            <div class="select_wrap">
              <span>楼栋号</span>
              <ul>
                <li v-for="(item, index) in listThree" :key="index" :class="activeOne === index ? 'isActive' : ''"
                    @click="selectActiveOne(item, index)">
                  <span>{{ item.buildingName }}</span>
                </li>
              </ul>
            </div>
            <div class="select_wrap">
              <span>层数</span>
              <ul>
                <li v-for="(item, index) in stepFourFloor" :key="index" :class="activeStepThree === index ? 'isActive' : ''"
                    @click="stepFourLayers(item, index)">
                  <span>{{item.storey}}</span>
                </li>
              </ul>
            </div>
            <div class="select_wrap">
              <span style="text-align: left; display: inline-block; width: 100%">门牌号</span>
              <ul>
                <li class="last-children" v-for="(item, index) in stepFourFloor" :key="index" slot style="border: none">
                  <div class="step_four_number_wrap">
                    <ul>
                      <li v-for="(number, index) in item.houseNumberList.slice(0, 6)" :key="index">
                        <span>{{number.houseNumber}}</span>
                      </li>
                    </ul>
                  </div>
<!--                  <vue-tags-input
                    v-model="tag"
                    :tags="tags"
                    :placeholder="stepFourInput"
                    @tags-changed="newTags => tags = newTags"
                  />-->
                  <span class="more" @click="more(item, index)">更多</span>
                </li>
              </ul>
            </div>
            <div class="select_wrap_last">
              <span>门牌号单位名称</span>
              <el-select class="select" v-model="stepFiveParams.houseNumber" placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.house_no"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-card>
        <el-button class="previous" style="margin-top: 12px;" v-if="(active !==1) || (active !== 3)" @click="previous" type="info">上一步</el-button>
      </div>
      <div class="step5_wrap parent" v-if="active === 5">
        <el-table
          :data="stepFiveTableList"
          border
          style="width: 100%"
          :header-cell-style="{background:'#EBF7FF',color:'#606266', 'text-align': 'center'}">
          <el-table-column
            prop="id"
            label="房屋编号"
            width="100"
            align="center"
            :header-row-style="{background:'#000'}">
          </el-table-column>
          <el-table-column
            prop="buildingName"
            label="楼栋号"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="storey"
            label="楼层"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="houseNumber"
            label="房屋门牌号"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="houseAddress"
            label="房屋标准地址">
            <template slot-scope="scope">
              <el-input v-model="scope.row.houseAddress" placeholder="请输⼊" size="medium" @input="stepFiveChange(scope.row)"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="previous" style="margin-top: 12px; bottom: -98px !important;" v-if="(active !==1) || (active !== 3)" @click="previous" type="info">上一步</el-button>
        <!-- 分页 -->
        <pagination
          :total="total"
          :page.sync="stepFiveParams.currentPage"
          :limit.sync="stepFiveParams.pageSize"
          @pagination="stepFiveCreateTable()"
        />
      </div>
    </nav>
    <footer>
      <el-button style="margin-top: 12px;"  v-if="active !==5" @click="next" type="primary" :disabled="onDisabled">下一步</el-button>
      <el-button style="margin-top: 12px;"  v-if="active ===5" @click="confirm" type="primary">确认</el-button>
    </footer>
    <!-- 步骤四点击更多弹出遮罩层 -->
    <el-dialog
      :visible.sync="dialogEdit"
      title="门牌号"
      width="800px"
      :close-on-click-modal="false">
      <div class="dialog-card-wrap">
        <p>{{ this.buildingTile +',' + this.storeyTitle }}：</p>
        <div class="input_container">
          <div class="input_wrap" v-for="(item,index) in stepHouseNumberList" :key="index">
            <input type="text" v-model="item.houseNumber">
            <span class="el-icon-error" @click="deleteCol(index)"></span>
          </div>
          <div class="add_input" @click="addCol">
            <span class="el-icon-plus"></span>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" @click="getInputVal">确定</el-button>
        <el-button type="info" @click="cancelMore">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {saveBuildReturnData, addBuildStepTwo, getReturnGridInfo, createHouseNumber, createDefaultHouseNumber, createUpdateHouseNumber,updateFloorNumber,
  updateHouseNumber, createHouseTable, stepFiveUpdateAddress, batchInsertHouse,getArchiPurposeByType} from '@/api/area/house'
import VueTagsInput from '@johmun/vue-tags-input' // 输入框标签插件
import Cookies from "js-cookie";
import { getUserProfile } from "@/api/system/user";  //用户编号
export default {
  dicts:['house_no','building_type'],
  name: "addBuilding",
  components: {
    VueTagsInput
  },
  data() {
    return {
      houseType: this.$route.query.houseType, // 单元/非单元/院落
      xxxx: '',
      unitTags: [], // 储存单元名称集合
      buildingSize: '', // 楼房数量
      unitSize: '', // 单元数量
      buildingNumber: '', // 第一步楼栋号或名称输入框
      unit: '', // 第一步单元+计量单位
      // 第一步保存的信息
      stepOne: {
        buildingTemplate: this.$route.query.buildingTemplate, // 楼房/院落
        architectureType:'',  //建筑类型
        architecturePurpose:'',  //建筑用途
        houseType: this.$route.query.houseType, // 单元/非单元/院落
        buildingNumber: [], // 楼栋号+计量单位
        unit: [], // 单元+计量单位
        unitPerfloorHousenumber: '', // 单元每层户数
        storyNumber: '', // 地上层数
        undergroundNumber: '', // 地下层数
      },
      // 第一步和第二步保存的信息
      stepOneAndTwoParams: {
        buildingTemplate: this.$route.query.buildingTemplate, // 详细/基础
        houseType: this.$route.query.houseType, // 单元/非单元/院落
        architectureType:'',  //建筑类型
        architecturePurpose:'',  //建筑用途
        userName: '', // 登录的用户名
        areaId: '', // 网格ID
        communityId: '', // 小区ID
        communityName: '', // 所属小区
        buildingAddress: '', // 楼房标准地址前缀
        buildingPrefix: '', // 楼房名称前缀
        unitPerfloorHousenumber: '' , // 单元每层用户
        userId:'', //用户名编号
        building: [ // 楼房信息
          {
            buildingNumber: '', // 楼栋号
            buildingInfo: [
              {
                unitNumber: '', // 单元号
                storyNumber: '', // 地上层数
                underGroundNumber: '' // 地下层数
              }
            ], // 楼栋信息
          },
        ],
        flag: 0
      },
      dialogEdit: false, // 步骤四门牌号更多按钮弹窗默认展示状态
      stepFourInput: '',

      tag: '',
      tags: [],

      activeStepThree: 2,

      active: 1, // 步骤条默认第一步
      onDisabled: false, //上一个按钮禁止点击状态
      input: '',
      radio1: '上海',
      listOne: [],
      activeOne: 0,
      listTwo: [],
      stepThreeData: [], // 第三步接收信息集合
      activeTwo: 0,
      inputTwo: 6,
      activeThree: 0,
      newArr: [],
      gridParams: {
        areaId: localStorage.getItem('areaId')
      },
      gridInfo: {}, // 存放网格信息数据
      belongCommunity: [], // 所属小区集合
      listThree: [], // 第三步储存接口返回楼栋号集合
      stepThreeUnitList: [], // 第三步存储接口返回单元集合
      stepThreeNew: [], // 用来做去重处理
      stepThreeFloorList: [], // 第三步存储接口返回楼层集合
      stepThreeParams: {
        id: '',
        floor: [
          {
            storey: '',
            unitPerfloorHousenumber: ''
          }
        ]
      },
      stepThreeParamsList: [],
      stepFourFloor: [], // 存储第四部门牌号集合
      updateStepFourParams: {
        id: '',
        storey: '',
        unitPerfloorHousenumber: '',
        flag: 0,
        userId:'' //用户名编号
      },
      stepFourNumberParams: {
        buildingName: '',
        unit: '',
        flag: 0,
        userId:'' //用户名编号
      },
      buildingTile: '', // 第四步点击更多展示的楼栋号名字
      unitTitle: '', // 第四步点击更多展示的单元号名字
      storeyTitle: '', // 第四步点击更多展示的层数名字
      stepHouseNumberList: [], // 第四步点击更多展示指定楼栋下面指定单元的所有门牌号集合
      stepFiveParams: {
        houseNumber: '号',
        createBy: '',
        areaId: '',
        currentPage: 0,
        pageSize: 10,
        userId: ''
      },
      stepFiveTableList: [], // 第五步表格数据集合
      stepFiveFlag: {
        flag: 0,
        userId:''
      },
      total: 0,
      dingpulldown:[],// 建筑用途列表数据
    };
  },
  created() {
    console.log(this.tag);
    // this.tags = ['101', '102']
    this.getGridInfo()
    this.getUser(); //调用用户编号接口
  },
  methods: {
    // 建筑用途
    Buildingpulldown(data) {
      console.log(data)
      let params = {
        // architectureType:  this.editForm.architectureType, // 建筑类型
        architectureType:  data.label, // 建筑类型
      }
      console.log(params)
      getArchiPurposeByType (params).then((res) => {
        if (res.code === 200) {
          this.dingpulldown = res.data
          console.log(this.dingpulldown)
        }
      })
    },

    // 第四步点击更多弹出遮罩层取消按钮
    cancelMore () {
      this.dialogEdit = false
    },
    // 第五步修改地址
    stepFiveChange (row) {
      console.log(row);
      row.userId = this.userId
      console.log(row,'999')
      clearTimeout(this.timeout)
      this.timeout = setTimeout (() => {
        if (row.houseAddress !== '') {
          stepFiveUpdateAddress (row).then((res) => {
            if (res.code === 200) {
              console.log(res);
              this.stepFiveFlag.flag = 1
            }
          })
        }
      }, 500)
    },
    // 第三步选择楼房
    stepThreeBuildActive (item, index) {
      console.log(index)
      this.activeOne = index
      this.stepThreeUnitList = this.listThree[index].buildingInfo
      console.log(this.stepThreeUnitList);
      this.stepThreeFloorList = this.stepThreeUnitList[0].floor
      this.activeTwo = 0
      this.activeThree = 0
      this.stepThreeUnitActive(this.stepThreeUnitList[0],0)
    },
    // 第三步选择单元
    stepThreeUnitActive (unit, index) {
      this.activeTwo = index
      console.log(unit);
      this.updateStepFourParams.id = unit.id
      this.stepThreeFloorList = unit.floor
      this.activeThree = 0
    },
    // 第三步修改户数监听输入框值实时修改每层户数
    changeFunc (item, index) {
      if (item.unitPerfloorHousenumber !== '') {
        console.log(item, index, '户数里面有值');
        console.log(this.updateStepFourParams);
        this.updateStepFourParams.storey = item.storey
        this.updateStepFourParams.unitPerfloorHousenumber = item.unitPerfloorHousenumber
        this.updateStepFourParams.userId = this.userId
        console.log(this.updateStepFourParams,'590')
        updateFloorNumber (this.updateStepFourParams).then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.stepFourNumberParams.flag = 1
            this.updateStepFourParams.flag = 1
          } else {
            this.stepFourNumberParams.flag = 0
            this.updateStepFourParams.flag = 0
          }
        })
      }
    },
    // 所属小区点击列表
    getCommunityInfo (item) {
      console.log(item);
      this.stepOneAndTwoParams.communityName = item.communityName
      this.stepOneAndTwoParams.communityId = item.communityId
    },
    // 获取网格信息以及网格下所有小区信息
    getGridInfo () {
      getReturnGridInfo (this.gridParams).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.gridInfo = res.data
          this.belongCommunity = res.data.belongtoCommunity
          console.log(this.gridInfo);
          this.buildingAddress = this.gridInfo.address
        }
      })
    },
    // 步骤四更多弹窗确定按钮
    getInputVal () {
      let params = {
        buildingName: this.buildingTile,
        unitName: this.unitTitle,
        storey: this.storeyTitle,
        userId:this.userId,
        houseNumberList: []
      }
      this.stepHouseNumberList.map((item) => {
        params.houseNumberList.push(item.houseNumber)
      })
      console.log(params,'633')
      updateHouseNumber ({...params,houseType:'非单元'}).then((res) => {
        if (res.code === 200) {
          this.dialogEdit = false
          this.$message.success('修改成功')
        }
      })
      console.log(this.stepHouseNumberList, params);
    },
    deleteCol(index){
      console.log(index);
      // if(this.form.addForm.length === 1){
      //   return alert('提示：必须填写一条')
      // }
      this.stepHouseNumberList.splice(index, 1)
    },
    addCol() {
      this.stepHouseNumberList.push({houseNumberList: ''})
    },
    // 步骤四门牌号更多按钮
    more (item, index) {
      // this.getName()
      this.dialogEdit = true
      console.log(item, index);
      this.buildingTile = this.stepFourNumberParams.buildingName
      this.unitTitle = this.stepFourNumberParams.unit
      this.storeyTitle = item.storey
      this.stepHouseNumberList = item.houseNumberList
      console.log(this.buildingTile, this.unitTitle, this.storeyTitle);
    },
    // 步骤五 - 确认按钮
    confirm () {
      console.log('确认按钮');
      console.log(this.stepFiveFlag.flag);
      this.stepFiveFlag.userId = this.userId
      console.log(this.stepFiveFlag,'672')
      batchInsertHouse(this.stepFiveFlag).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.$message.success('保存成功')
          this.$router.push({path: '/newHouse'})
        }
      })
    },

    // 步骤四 - 选择层数
    stepFourLayers (item, index) {
      this.activeStepThree = index
      this.storeyTitle = item.storey
      console.log(item);
    },
    // 步骤三 - 选择层数
    stepThreeLayers (item, index) {
      this.activeThree = index
    },
    selectActiveTwo (unit, index) {
      this.activeTwo = index
      console.log(unit);
      console.log(this.listTwo[index]);
      if (this.active === 4) {
        this.stepFourNumberParams.unit = this.listTwo[index].unitNumber
        this.unitTitle = this.listTwo[index].unitNumber
        // createDefaultHouseNumber (this.stepFourNumberParams).then((res) => {
           // 新接口1
       createUpdateHouseNumber (this.stepFourNumberParams).then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.stepFourFloor = res.data.floor
          }
        })
      }
    },
    selectActiveOne (item, index) {
      this.activeOne = index
      this.listTwo = this.listOne[index].buildingInfo
      this.activeTwo = 0
      console.log(this.listTwo, this.listOne[index].buildingNumber);
      console.log(this.active);
      if (this.active === 4) {
        this.stepFourNumberParams.buildingName = this.listOne[index].buildingNumber
        this.stepFourNumberParams.unit = this.listOne[index].buildingInfo[0].unitNumber
        this.buildingTile = this.listOne[index].buildingNumber
        // createDefaultHouseNumber (this.stepFourNumberParams).then((res) => {
          // 新接口2
          createUpdateHouseNumber (this.stepFourNumberParams).then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.stepFourFloor = res.data.floor
          }
        })
      }
    },
    previous () {
      console.log(this.active);
      this.active--
      this.activeOne = 0
      this.activeTwo = 0
      this.activeThree = 0
      this.activeStepThree = 0
      this.onDisabled = false
    },
    next() {
      if (this.active < 5) {
        this.onDisabled = false
        this.activeOne = 0
        this.activeTwo = 0
        this.activeThree = 0
        this.activeStepThree = 0
        console.log(this.active);
        // 第一步点击下一步按钮
        if (this.active === 1) {
          this.stepOne.buildingNumber = []
          this.stepOne.unit = []
          this.tags.map((item) => {
            this.newArr.push(item.text)
            if(this.stepOne.buildingNumber.indexOf(item.text) === -1) {
              this.stepOne.buildingNumber.push(item.text)
            }
          })
          this.unitTags.map((item) => {
            if(this.stepOne.unit.indexOf(item.text) === -1) {
              this.stepOne.unit.push(item.text)
            }
          })
          saveBuildReturnData(this.stepOne).then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.active++
              this.listOne = res.data[0]
              console.log(this.listOne);
              if (this.listOne.length !== 0 && this.listOne[0].buildingInfo !== []) {
                this.listTwo = this.listOne[0].buildingInfo
              }
              this.buildingSize = res.data[1].buildingSize
              this.unitSize = res.data[1].unitSize
              console.log(this.buildingAddress + this.stepOneAndTwoParams.communityName + this.stepOneAndTwoParams.buildingPrefix);
              this.input = this.buildingAddress + this.stepOneAndTwoParams.communityName + this.stepOneAndTwoParams.buildingPrefix
            }
          })
        } else if (this.active === 2) { // 第二步点击下一步按钮
          this.stepOneAndTwoParams.userName = Cookies.get('username')
          this.stepOneAndTwoParams.building = this.listOne
          this.stepOneAndTwoParams.areaId = localStorage.getItem('areaId')
          this.stepOneAndTwoParams.unitPerfloorHousenumber = this.stepOne.unitPerfloorHousenumber
          this.stepOneAndTwoParams.userId = this.userId
          this.stepOneAndTwoParams.architectureType = this.stepOne.architectureType
          this.stepOneAndTwoParams.architecturePurpose = this.stepOne.architecturePurpose
          console.log(this.stepOneAndTwoParams);
          this.stepOneAndTwoParams.buildingAddress = this.input
          addBuildStepTwo (this.stepOneAndTwoParams).then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.active++
              this.listThree = res.data
              this.stepOneAndTwoParams.flag = 1
              this.stepThreeUnitList = this.listThree[0].buildingInfo
              console.log(this.stepThreeUnitList);
              this.stepThreeParams.id = this.stepThreeUnitList[0].id
              this.stepThreeFloorList = this.stepThreeUnitList[0].floor
              console.log(this.stepThreeFloorList);
              this.stepThreeParams.floor = this.stepThreeFloorList[0]
              console.log(this.stepThreeParams.floor);
              this.updateStepFourParams.id = res.data[0].buildingInfo[0].id
              this.stepThreeBuildActive(res.data[0],0)
            } else {
              this.onDisabled = true
              this.$message.error(res.msg)
              this.stepOneAndTwoParams.flag = 0
            }
          })
        } else if (this.active === 3) { // 第三步点击下一步按钮
          console.log(this.listThree);
          this.stepFourNumberParams.buildingName = this.listThree[0].buildingName
          this.stepFourNumberParams.unit = this.listThree[0].buildingInfo[0].unit
          this.stepFourNumberParams.userId = this.userId
          console.log(this.stepFourNumberParams);
          createDefaultHouseNumber (this.stepFourNumberParams).then((res) => {
            if (res.code === 200) {
              console.log(res);
              this.active++
              this.stepFourFloor = res.data.floor
            }
          })
        } else if (this.active === 4) { // 第四步的下一步
          this.stepFiveParams.createBy = Cookies.get('username')
          this.stepFiveParams.areaId = localStorage.getItem('areaId')
          console.log(this.stepFiveParams);
          this.stepFiveCreateTable()
        }
      }
    },
    addTabs () {
      console.log(this.tags);
    },
    // 第五步获取表格
    stepFiveCreateTable () {
      this.stepFiveParams.userId = this.userId
      console.log(this.stepFiveParams,'820')
      createHouseTable (this.stepFiveParams).then((res) => {
        if (res.code === 200) {
          console.log(res);
          console.log(this.active);
          if (this.active === 5) {
            this.stepFiveTableList = res.data.list
            this.total = res.data.total
          } else {
            this.active++
            this.stepFiveTableList = res.data.list
            this.total = res.data.total
          }
        }
      })
    },

    // 用户编号接口
    getUser() {
      getUserProfile().then(response => {
        this.userId = response.data.userId;
        console.log(this.userId,'222')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  p, span {
    font-family: Microsoft YaHei;
  }
  /* 修改el-input的placeholder样式 */
  ::v-deep .el-input__inner {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
  }
  /** 修改步骤条宽度解决字体展示不全的问题*/
  ::v-deep .el-step.is-simple:not(:last-of-type) .el-step__title {
    max-width: 65%;
  }
  /* 修改步骤条对钩颜色 */
  ::v-deep .el-step__head.is-success {
    color: #1F79F3;
  }
  /* 修改步骤条选中样式 */
  ::v-deep .el-icon-check {
    color: #1F79F3;
  }
  footer {
    display: flex;
    justify-content: center;
    margin-top: 51px;
  }
  .parent {
    position: relative;
    .previous {
      position: absolute;
      margin-top: 63px !important;
      left: 40%;
    }
  }
  nav {
    width: 1649px;
    margin: 20px auto 0;
    .step2_top {
      box-sizing: border-box;
      padding: 0 23px;
      ul {
        display: flex;
        li {
          display: flex;
          align-items: center;
          margin-left: 48px;
          span {
            font-size: 14px;
            font-weight: 400;
            color: #000000;
            &:last-child {
              box-sizing: border-box;
              padding-left: 5px;
              display: block;
              width: 215px;
              height: 35px;
              background-color: #CCCCCC;
              line-height: 35px;
            }
          }
          &:first-child {
            margin: 0;
          }
        }
      }
    }
    .step2_two {
      box-sizing: border-box;
      padding: 0 37px;
      p {
        span {
          display: inline-block;
          width: 79px;
          height: 34px;
          background-color: #CCC;
          font-size: 14px;
          font-weight: 400;
          color: #000000;
          margin-left: 8px;
          line-height: 34px;
          box-sizing: border-box;
          padding-left: 5px;
          &:first-child {
            display: inline;
            background-color: #FFF;
            margin: 0;
            padding: 0;
          }
          &:nth-child(2) {
            margin: 0;
          }
        }
      }
    }
    .step2_three {
      box-sizing: border-box;
      padding: 0 23px;
      display: flex;
      align-items: center;
      p {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
      }
      ::v-deep .el-input {
        width: 899px;
        height: 35px;
        //:-moz-placeholder/* Mozilla Firefox 4 to 18 */
        //::-moz-placeholder  /* Mozilla Firefox 19+ */
        //:-ms-input-placeholder /* Internet Explorer 10-11 */
        //::-ms-input-placeholder
      }
    }
    .step2_four {
      display: flex;
      box-sizing: border-box;
      padding: 0 7px;
      p {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
      }
      .select_wrap {
        margin-top: 35px;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        ul {
          li {
            cursor: pointer;
            width: 106px;
            height: 34px;
            border: 1px solid #1F79F3;
            margin-top: 9px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            &.isActive {
              background: #1F79F3;
              span {
                color: #FFFFFF;
              }
            }
            span {
              font-size: 12px;
              font-weight: 400;
              color: #000000;
            }
          }
        }
        ::v-deep .el-input__inner {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
          text-align: center;
        }
      }
    }
    .step_one_wrap {
      .top {
        width: 1649px;
        height: 188px;
        background-color: #EEEEEE;
        margin: 0 auto;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 20px 30px;
        margin-bottom: 19px;
        .title {
          font-size: 16px;
          font-weight: bold;
          color: #000000;
        }
        .left {
          display: flex;
          li {
            display: flex;
            align-items: center;
            margin-left: 65px;
            span {
              font-size: 14px;
              font-weight: 400;
              color: #000000;
              &:last-child {
                display: inline-block;
                width: 215px;
                height: 35px;
                background-color: #CCCCCC;
                box-sizing: border-box;
                padding-left: 5px;
                line-height: 35px;
              }
            }
            &:first-child {
              margin: 0;
            }
          }
        }
        .right {
          margin-top: 19px;
          margin-left: 15px;
          ul {
            display: flex;
            li {
              display: flex;
              align-items: center;
              margin-left: 65px;
              span {
                font-size: 14px;
                font-weight: 400;
                color: #000000;
                &:nth-child(2) {
                  display: inline-block;
                  width: 215px;
                  height: 35px;
                  background-color: #CCCCCC;
                  box-sizing: border-box;
                  padding-left: 5px;
                  line-height: 35px;
                }
              }
              &:first-child {
                margin: 0;
              }
            }
          }
        }
      }
      .card_wrap {
        p {
          font-size: 16px;
          font-weight: bold;
          color: #000000;
        }
        .card_top {
          ul {
            width: 100%;
            display: flex;
            margin-bottom: 10px;
            li {
              display: flex;
              margin-left: 37px;
              align-items: center;
              span {
                font-size: 14px;
                font-weight: 400;
                color: #000000;
              }
              &:first-child {
                margin: 0;
              }
              ::v-deep .el-input {
                width: 215px;
                height: 35px;
                //:-moz-placeholder/* Mozilla Firefox 4 to 18 */
                //::-moz-placeholder  /* Mozilla Firefox 19+ */
                //:-ms-input-placeholder /* Internet Explorer 10-11 */
                //::-ms-input-placeholder
              }
              .last_input {
                width: 457px;
              }
            }
          }
          .info {
            font-size: 12px;
            font-weight: 400;
            color: #999999;
            margin-left: 100px;
          }
        }
        .card_bottom {
          ul {
            li {
              .one {
                width: 567px;
              }
            }
          }
          .info {
            font-size: 12px;
            font-weight: 400;
            color: #999999;
            margin-left: 70px;
          }
        }
      }
    }
    .step3_wrap {
      p {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        margin-bottom: 0;
      }
      .step2_four {
        display: flex;
        box-sizing: border-box;
        padding: 0 7px;
        margin-left: 80px;
        margin-bottom: 20px;
        p {
          font-size: 14px;
          font-weight: 400;
          color: #000000;
        }
        .select_wrap {
          margin-top: 10px;
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          ul {
            li {
              cursor: pointer;
              width: 106px;
              height: 34px;
              border: 1px solid #1F79F3;
              margin-top: 9px;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              &.isActive {
                background: #1F79F3;
                span {
                  color: #FFFFFF;
                }
              }
              span {
                font-size: 12px;
                font-weight: 400;
                color: #000000;
              }
              .unit_wrap {
                margin-left: 400px;
              }
            }
          }
          ::v-deep .el-input__inner {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #000000;
            text-align: center;
          }
        }
      }
      .last-children {
        width: 163px !important;
      }
      span {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
      }
    }
    .step4_wrap {
      p {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        margin-bottom: 0;
      }
      .step2_four {
        display: flex;
        box-sizing: border-box;
        padding: 0 7px;
        margin-left: 80px;
        margin-bottom: 20px;
        p {
          font-size: 14px;
          font-weight: 400;
          color: #000000;
        }
        .select_wrap {
          margin-top: 10px;
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          ul {
            li {
              cursor: pointer;
              width: 106px;
              height: 34px;
              border: 1px solid #1F79F3;
              margin-top: 9px;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              &.isActive {
                background: #1F79F3;
                span {
                  color: #FFFFFF;
                }
              }
              span {
                font-size: 12px;
                font-weight: 400;
                color: #000000;
              }
              ::v-deep .vue-tags-input {
                background-color: #ddd;
              }
              ::v-deep .ti-new-tag-input-wrapper input {
                background-color: #ddd;
              }
              .more {
                position: absolute;
                right: 9px;
                display: inline-block;
                width: 67px;
                height: 27px;
                line-height: 27px;
                text-align: center;
                background-color: #FFF;
                font-size: 12px;
                font-weight: 400;
                color: #000000;
              }
            }
          }
          ::v-deep .el-input__inner {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #000000;
            text-align: center;
          }
        }
        .select_wrap_last {
          display: flex;
          flex-direction: column;
          margin: 10px 0 0 30px;
          .select {
            margin-top: 8px;
            ::v-deep .el-input {
              width: 100px;
            }
          }
        }
      }
      span {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
      }
      .last-children {
        width: 583px !important;
        div {
          width: 851px;
          height: 35px;
          background-color: #ddd;
        }
      }
      ::v-deep .vue-tags-input {
        width: 100%;
        max-width: 100%
      }
    }
    .step5_wrap {
      ::v-deep .el-table_5_column_29 {
        text-align: left !important;
      }
    }
  }
  /* 修改弹窗样式 */
  ::v-deep .el-dialog__wrapper {
    top: 25vh;
  }
  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #EEEEEE;
    padding: 10px 20px;
    .el-dialog__title {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
    }
    .el-dialog__headerbtn {
      top: 15px;
    }
  }
  ::v-deep .el-dialog__body {
    padding-bottom: 0;
    box-sizing: border-box;
    .dialog-card-wrap {
      .input_container {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        display: flex;
        flex-wrap: wrap;
        .input_wrap {
          position: relative;
          margin: 6px 0 0 3px;
          input {
            width: 67px;
            height: 35px;
            outline: none;
            text-align: center;
            border: 1px solid #D9D9D9;
          }
        }
        .add_input {
          width: 67px;
          height: 35px;
          border: 1px solid #D9D9D9;
          margin: 6px 0 0 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          .el-icon-plus {
            color: #999999;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }
    .footer {
      width: 800px;
      height: 47px;
      margin-top: 246px;
      background-color: #F2F2F2;
      position: relative;
      left: -20px;
      display: flex;
      align-items: center;
      justify-content: right;
      padding-right: 20px;
    }
  }
  ::v-deep .el-icon-error {
    color: #999 !important;
    position: absolute;
    left: 55px;
    top: -4px;
  }
  .step_four_number_wrap {
    ul {
      display: flex;
      align-items: center;
      height: 100%;
      li {
        margin: 0 0 0 10px !important;
        width: 66px !important;
        height: 27px !important;
        border-radius: 0 !important;
        border-color: #FFF !important;
        background-color: #FFF !important;
      }
    }
  }
}
.essential{
  padding: 6px 2px 2px 2px;
  color: red !important;
}
</style>
