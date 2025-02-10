<!--基础信息-->
<template>
  <div class="app-container" v-loading="loading">
    <el-steps :active="active" align-center>
      <el-step title="添加基础建筑"></el-step>
      <el-step title="生成建筑信息"></el-step>
      <el-step title="生成建筑地址"></el-step>
    </el-steps>
    <nav>
      <div class="step_one_wrap" v-if="active === 1">
        <div class="top">
          <p class="title">网格信息：</p>
          <ul class="left">
            <li>
              <span>网格编号：</span>
              <span>{{ stepOneInfo.areaNo }}</span>
            </li>
            <li>
              <span>网格名称：</span>
              <span>{{ stepOneInfo.areaName }}</span>
            </li>
            <li>
              <span>网格简称：</span>
              <span>{{ stepOneInfo.areaShortname }}</span>
            </li>
            <li>
              <span>网格类型：</span>
              <span>{{ stepOneInfo.areaType }}</span>
            </li>
          </ul>
          <div class="right">
            <ul>
              <li>
                <span>网格长：</span>
                <span>{{ stepOneInfo.arealeaderName }}</span>
              </li>
              <li>
                <span>网格面积：</span>
                <span style="width: 183px">{{ stepOneInfo.areaMeasure }}</span>
                <span style="margin-left: 14px; position: relative; top: -8px;">㎡</span>
              </li>
              <li style="margin-left: 70px">
                <span>所属网格：</span>
                <span style="width: 550px">{{ stepOneInfo.belongtoArea }}</span>
              </li>
            </ul>
          </div>
          <div class="bottom">
            <ul>
              <li>
                <span>上级组织：</span>
                <span>{{ stepOneInfo.pAreaName }}</span>
              </li>
              <li>
                <span>物业公司：</span>
                <span>保利物业</span>
              </li>
            </ul>
          </div>
        </div>
        <el-card class="box-card">
          <div class="card_wrap">
            <p>批量添加建筑信息：</p>
            <div class="card_top">
              <ul>
                <li>
                  <span class="essential">*</span><span>建筑类型：</span>
                  <el-select v-model="queryParams.architectureType" placeholder="请选择">
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
                  <el-select v-model="queryParams.architecturePurpose" placeholder="请选择">
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
                  <el-select v-model="queryParams.communityName" placeholder="请选择">
                    <el-option
                      v-for="item in stepOneInfo.belongtoCommunity"
                      :key="item.communityId"
                      :label="item.communityName"
                      :value="item.communityId"
                      @click.native="getCommunityId(item)">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span>建筑名称前缀：</span>
                  <el-input v-model="queryParams.buildingPrefix" placeholder="请输入内容" style="width: 67%;"></el-input>
                </li>
              </ul>
            </div>
            <div class="card_top">
              <ul>
                <li>
                  <span class="essential">*</span><span>建筑名称：</span>
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
              </ul>
              <span class="info">建筑名称+计量单位，例如：1号院，1号院；南大院，北大院</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="step_two_wrap" v-if="active ===2">
        <el-card class="box-card">
          <div class="top">
            <span>建筑数量：</span>
            <span>{{ stepTwoInfo.courtyardCount }}</span>
          </div>
          <div class="center">
            <span>建筑名称：</span>
            <p>
              <span v-for="(item, index) in stepTwoInfo.buildings" :key="index">{{ item }}</span>
            </p>
          </div>
          <div class="bottom">
            <span>建筑地址前缀：</span>
            <el-input v-model="houseAddressPrefix" placeholder="请输入内容"></el-input>
          </div>
        </el-card>
      </div>
      <div class="step_three_wrap" v-if="active ===3">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="{background:'#EBF7FF',color:'#606266', 'text-align': 'center'}">
          <el-table-column
            prop="id"
            label="建筑编号"
            width="100"
            align="center"
            :header-row-style="{background:'#000'}">
          </el-table-column>
          <el-table-column
            prop="buidingNumber"
            label="建筑名称"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="buildingAddress"
            label="房屋标准地址">
            <template slot-scope="scope">
              <el-input v-model="scope.row.buildingAddress"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </nav>
    <footer>
      <el-button style="margin-top: 12px;" v-if="active !==1" @click="previous" type="info">上一步</el-button>
      <el-button style="margin-top: 12px;"  v-if="active !==3" @click="next" type="primary">下一步</el-button>
      <el-button style="margin-top: 12px;"  v-if="active ===3" @click="confirm" type="primary">确认</el-button>
    </footer>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {saveBuildReturnData, getReturnGridInfo, createCourtyardTable, updateHouseAddress,getArchiPurposeByType} from '@/api/area/house'
import VueTagsInput from '@johmun/vue-tags-input' // 输入框标签插件
export default {
  dicts:['courtyard_no','building_type'],
  name: "addCourtyard",
  components: {
    VueTagsInput
  },
  data () {
    return {
      buildingNumber: '',
      tags: [],
      queryParams: {
        buildingTemplate: this.$route.query.buildingTemplate, // 详细/基础
        architectureType:'',  //建筑类型
        architecturePurpose:'',  //建筑用途
        communityName: '', // 所属小区
        buildingPrefix: '', // 院落名称前缀
        buildingNumber: [], // 院落号或名称
        buildingMeasure: '' // 院落号(计量单位)
      },
      houseAddressPrefix: '', // 步骤条第二步院落标准地址前缀
      active: 1, // 步骤条默认第一步
      tableData: [],
      loading: false,
      stepOneInfo: {},
      stepTwoInfo: {},
      communityId: '',
      communityName: '',
      dingpulldown:[],// 建筑用途列表数据
    }
  },
  created() {
    this.getGridInfo()
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

    getCommunityId (item) {
      console.log(item);
      this.communityId = item.communityId
      this.communityName = item.communityName
    },
    getGridInfo() {
      let params = {
        areaId: localStorage.getItem('areaId')
      }
      this.loading = true
      getReturnGridInfo (params).then((res) => {
        if (res.code === 200) {
          this.loading = false
          this.stepOneInfo = res.data
          console.log(this.stepOneInfo);
        }
      })
    },
    previous () {
      this.active--
    },
    next() {
      if (this.active < 3) {
        // this.active++
        console.log(this.active);
        console.log(this.queryParams);
        if (this.active === 1) {
          this.tags.map((item) => {
            if(this.queryParams.buildingNumber.indexOf(item.text) === -1) {
              this.queryParams.buildingNumber.push(item.text)
            }
          })
          saveBuildReturnData (this.queryParams).then((res) => {
            if (res.code === 200) {
              this.active++
              this.stepTwoInfo = res.data[0]
              console.log(this.stepTwoInfo);
              this.houseAddressPrefix = this.stepOneInfo.address + this.communityName + this.queryParams.buildingPrefix
            }
          })
        } else if (this.active === 2) {
          let params = {
            userName: Cookies.get('username'),
            areaId: this.stepOneInfo.areaId,
            belongtoArea: this.stepOneInfo.belongtoArea,
            communityId: this.communityId,
            communityName: this.communityName,
            buildingPrefix: this.queryParams.buildingPrefix,
            buildingAddress: this.houseAddressPrefix,
            buildingNumber: this.queryParams.buildingNumber,
            buildingMeasure: this.queryParams.buildingMeasure,
            buildingTemplate: this.$route.query.buildingTemplate, // 详细/基础
            architectureType:this.queryParams.architectureType,  //建筑类型
            architecturePurpose:this.queryParams.architecturePurpose,  //建筑用途
          }
          this.loading = true
          createCourtyardTable (params).then((res) => {
            if (res.code === 200) {
              this.loading = false
              this.active++
              this.tableData = res.data
            }
          })
        }
      }
    },
    confirm () {
      let params = []
      this.tableData.map((item) => {
        params.push(
          {
            id: item.id,
            buildingAddress: item.buildingAddress,
          }
        )
      })
      console.log(params);
      this.loading = true
      updateHouseAddress (params).then((res => {
        if (res.code === 200) {
          console.log(res);
          this.loading = false
          this.$router.push({path: '/newHouse'})
          this.$message.success(res.msg)
        }
      }))
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
  footer {
    display: flex;
    justify-content: center;
    margin-top: 51px;
  }
  nav {
    /* 修改卡片内边距 */
    ::v-deep .el-card__body {
      padding-bottom: 30px;
    }
    width: 1649px;
    margin: 20px auto 0;
    .step_one_wrap {
      .top {
        width: 1649px;
        height: 237px;
        background-color: #EEEEEE;
        margin: 0 auto 19px;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 20px 30px;
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
        .bottom {
          margin-top: 19px;
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
              &:last-child {
                ::v-deep .el-input {
                  width: 100px;
                  //:-moz-placeholder/* Mozilla Firefox 4 to 18 */
                  //::-moz-placeholder  /* Mozilla Firefox 19+ */
                  //:-ms-input-placeholder /* Internet Explorer 10-11 */
                  //::-ms-input-placeholder
                }
              }
            }
          }
          .info {
            font-size: 12px;
            font-weight: 400;
            color: #999999;
            margin-left: 80px;
          }
        }
      }
    }
    .step_two_wrap {
      .top {
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
          margin: 0 0 0 27px;
        }
      }
      .center {
        display: flex;
        align-items: center;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #000000;
        }
        p {
          span {
            display: inline-block;
            width: 78px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            background-color: #CCCCCC;
            margin-left: 8px;
            &:first-child {
              margin: 0;
            }
          }
        }
      }
      .bottom {
        margin-bottom: 20px;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #000000;
        }
        /* 修改el-input的placeholder样式 */
        ::v-deep .el-input__inner {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
        }
        /** 修改输入框大小样式 */
        ::v-deep .el-input {
          width: 899px;
          height: 35px;
        }
      }
    }
    .step_three_wrap {
      width: 1036px;
      margin: 0 auto;
    }
  }
  .essential{
    padding: 6px 2px 2px 2px;
    color: red !important;
  }
}
</style>
