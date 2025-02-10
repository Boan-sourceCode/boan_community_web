<!--院落信息-->
<template>
  <div class="app-container" v-loading="loading">
    <el-steps :active="active" align-center>
      <el-step title="添加院落"></el-step>
      <el-step title="生成院落信息"></el-step>
      <el-step title="生成院落地址"></el-step>
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
            <!--<li>
                <span>物业公司：</span>
                <span></span>
                        </li>-->
            </ul>
          </div>
        </div>
        <el-card class="box-card">
          <div class="card_wrap">
            <p>批量添加院落信息：</p>
            <div class="card_top">
              <ul>
                <li>
                  <span class="essential">*</span><span>建筑类型：</span>
                  <el-select v-model="queryParams.architectureType" placeholder="请选择">
                    <el-option v-for="dict in dict.type.building_type" :key="dict.value" :label="dict.label"
                      :value="dict.value" @click.native="Buildingpulldown(dict)">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span class="essential">*</span><span>建筑用途：</span>
                  <el-select v-model="queryParams.architecturePurpose" placeholder="请选择">
                    <el-option v-for="item in dingpulldown" :key="item.value" :label="item.lable" :value="item.value">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span>所属小区：</span>
                  <el-select v-model="queryParams.communityName" placeholder="请选择">
                    <el-option v-for="item in stepOneInfo.belongtoCommunity" :key="item.communityId"
                      :label="item.communityName" :value="item.communityId" @click.native="getCommunityId(item)">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span>院落名称前缀：</span>
                  <el-input v-model="queryParams.buildingPrefix" placeholder="请输入内容" style="width: 67%;"></el-input>
                </li>
              </ul>
            </div>
            <div class="card_top">
              <ul>
                <li>
                  <span class="essential">*</span><span>院落号或名称：</span>
                  <div>
                    <vue-tags-input style="width: 547px" placeholder="回车键添加" v-model="buildingNumber" :tags="tags"
                      @tags-changed="newTags => tags = newTags" />
                  </div>
                </li>
                <li>
                  <span>院落号（计量单位）：</span>
                  <el-select class="select" v-model="queryParams.buildingMeasure" placeholder="请选择">
                    <el-option v-for="dict in dict.type.courtyard_no" :key="dict.value" :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </li>
              </ul>
              <span class="info">院落号或名称+计量单位，例如：1号院，1号院；南大院，北大院</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="step_two_wrap" v-if="active === 2">
        <el-card class="box-card">
          <div class="top">
            <span>院落数量：</span>
            <span>{{ stepTwoInfo.courtyardCount }}</span>
          </div>
          <div class="center">
            <span>院落号或名称：</span>
            <p>
              <span v-for="(item, index) in stepTwoInfo.buildings" :key="index">{{ item }}</span>
            </p>
          </div>
          <div class="bottom">
            <span>院落标准地址前缀：</span>
            <el-input v-model="houseAddressPrefix" placeholder="请输入内容"></el-input>
          </div>
          <div class="step2_four">
            <p>院落户数：</p>
            <div class="select_wrap">
              <span>院落号</span>
              <ul>
                <li v-for="(item, index) in listOne" :key="index" :class="activeOne === index ? 'isActive' : ''"
                  @click="selectActiveOne(item, index)">
                  <span>{{ item.buildingName }}</span>
                </li>
              </ul>
            </div>
            <div class="select_wrap">
              <span style="text-align: left; display: inline-block; width: 100%">门牌号</span>
              <ul>
                <li class="last-children" v-for="(item, index) in listOne" :key="index" slot style="border: none">
                  <div class="step_four_number_wrap">
                    <ul>
                      <li v-for="(number, index) in item.houseNumber" :key="index">
                        <span>{{ number }}</span>
                      </li>
                    </ul>
                  </div>
                  <span class="more" @click="more(item, index)">添加</span>
                </li>
              </ul>
            </div>
          </div>
        </el-card>
      </div>
      <div class="step_three_wrap" v-if="active === 3">
        <el-table :data="tableData" border style="width: 100%"
          :header-cell-style="{ background: '#EBF7FF', color: '#606266', 'text-align': 'center' }">
          <el-table-column prop="building_name" label="院落号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="id" label="房屋编号" width="100" align="center" :header-row-style="{ background: '#000' }">
          </el-table-column>
          <el-table-column prop="house_number" label="门牌号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="house_address" label="房屋标准地址">
            <template slot-scope="scope">
              <el-input v-model="scope.row.house_address"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </nav>
    <footer>
      <el-button style="margin-top: 12px;" v-if="active !== 1" @click="previous" type="info">上一步</el-button>
      <el-button style="margin-top: 12px;" v-if="active !== 3" @click="next" type="primary">下一步</el-button>
      <el-button style="margin-top: 12px;" v-if="active === 3" @click="confirm" type="primary">确认</el-button>
    </footer>
    <!--击更多弹出遮罩层 -->
    <el-dialog :visible.sync="dialogEdit" title="门牌号" width="800px" class="moreAdd" :close-on-click-modal="false">
      <div class="dialog-card-wrap">
        <p>{{ this.buildingTile }}：</p>
        <div class="input_container">
          <div class="input_wrap" v-for="(item, index) in stepHouseNumberList" :key="index">
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
import Cookies from "js-cookie";
import { saveBuildReturnData, getReturnGridInfo, createCourtyardTable, updateHouseAddress, getArchiPurposeByType } from '@/api/area/house'
import VueTagsInput from '@johmun/vue-tags-input' // 输入框标签插件
export default {
  dicts: ['courtyard_no', 'building_type'],
  name: "addCourtyard",
  components: {
    VueTagsInput
  },
  data() {
    return {
      buildingNumber: '',
      tags: [],
      queryParams: {
        buildingTemplate: this.$route.query.buildingTemplate, // 详细/基础
        houseType: this.$route.query.houseType,
        architectureType: '',  //建筑类型
        architecturePurpose: '',  //建筑用途
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
      dingpulldown: [],// 建筑用途列表数据
      listOne: [],
      activeOne: 0,
      dialogEdit: false, // 门牌号添加按钮弹窗默认展示状态
      stepHouseNumberList: [], // 点击添加展示指定楼栋下面指定单元的所有门牌号集合
      buildingTile: '', // 点击添加展示的院落名字
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
        architectureType: data.label, // 建筑类型
      }
      console.log(params)
      getArchiPurposeByType(params).then((res) => {
        if (res.code === 200) {
          this.dingpulldown = res.data
          console.log(this.dingpulldown)
        }
      })
    },

    selectActiveOne(item, index) {
      this.activeOne = index
    },

    // 添加弹窗确定按钮
    getInputVal() {
      let params = {
        buildingName: this.buildingTile,
        houseNumber: []
      }
      this.stepHouseNumberList.map((item) => {
        params.houseNumber.push(item.houseNumber)
      })
      this.listOne.forEach((item) => {
        if (item.buildingName === params.buildingName) {
          item.houseNumber = params.houseNumber
          this.dialogEdit = false
        }
      })
      console.log(this.listOne)
    },

    // 点击添加弹出遮罩层取消按钮
    cancelMore() {
      this.dialogEdit = false
    },

    deleteCol(index) {
      this.stepHouseNumberList.splice(index, 1)
    },
    addCol() {
      this.stepHouseNumberList.push({ houseNumber: '' })
    },

    more(item, index) {
      this.dialogEdit = true
      console.log(item, index)
      this.buildingTile = item.buildingName
      let aBrand = item.houseNumber
      let houseArry = [] //定义门牌号数组
      // //遍历Brand门牌号数组
      aBrand.forEach((items) => {
        //定义houseNumber对象，里面是门牌号和他对应的字段
        let houseNumber = {
          houseNumber: items,
        }
        //将houseNumber对象添加到houseArry数组中，形成数组对象的格式在html代码中遍历获取数据
        houseArry.push(houseNumber)
      });
      this.stepHouseNumberList = houseArry
      console.log(this.stepHouseNumberList)
    },

    getCommunityId(item) {
      console.log(item);
      this.communityId = item.communityId
      this.communityName = item.communityName
    },
    getGridInfo() {
      let params = {
        areaId: localStorage.getItem('areaId')
      }
      this.loading = true
      getReturnGridInfo(params).then((res) => {
        if (res.code === 200) {
          this.loading = false
          this.stepOneInfo = res.data
          console.log(this.stepOneInfo);
        }
      })
    },
    previous() {
      this.active--
    },
    next() {
      if (this.active < 3) {
        if (this.active === 1) {
          this.queryParams.buildingNumber = []
          const newlist = []
          this.tags.map((item) => {
            if (this.queryParams.buildingNumber.indexOf(item.text) === -1) {
              newlist.push(item.text)
            }
          })
          this.queryParams.buildingNumber = newlist
          saveBuildReturnData(this.queryParams).then((res) => {
            if (res.code === 200) {
              this.active++
              this.stepTwoInfo = res.data[0]
              this.listOne = res.data[0].buildingList
              console.log(this.stepTwoInfo);
              this.houseAddressPrefix = this.stepOneInfo.areaAddr + this.communityName + this.queryParams.buildingPrefix
            }
          })
        } else if (this.active === 2) {
          let params = {
            userName: Cookies.get('username'),
            areaId: this.stepOneInfo.areaId,
            belongtoArea: this.stepOneInfo.belongtoArea,
            communityId: this.communityId,
            communityName: this.communityName,
            building: this.listOne,
            buildingPrefix: this.queryParams.buildingPrefix,
            buildingAddress: this.houseAddressPrefix,
            buildingNumber: this.queryParams.buildingNumber,
            buildingMeasure: this.queryParams.buildingMeasure,
            buildingTemplate: this.$route.query.buildingTemplate, // 详细/基础
            houseType: this.$route.query.houseType, // 单元/非单元/院落
          }
          this.loading = true
          createCourtyardTable(params).then((res) => {
            if (res.code === 200) {
              this.active++
              this.tableData = res.data
            }
            this.loading = false
          }).catch(res => {
            console.log(res)
            this.loading = false
          })
        }
      }
    },
    confirm() {
      let params = []
      this.tableData.map((item) => {
        params.push(
          {
            id: item.id,
            buildingAddress: item.house_address,
          }
        )
      })
      console.log(params);
      this.loading = true
      updateHouseAddress(params).then((res => {
        if (res.code === 200) {
          console.log(res);
          this.loading = false
          this.$router.push({ path: '/newHouse' })
          this.$message.success(res.msg)
        }
      }))
    },
  }
}
</script>

<style lang="scss" scoped>
.app-container {

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  p,
  span {
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
            margin-left: 108px;
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

  .essential {
    padding: 6px 2px 2px 2px;
    color: red !important;
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
  }

  .last-children {
    width: 583px !important;

    div {
      width: 851px;
      height: 35px;
      background-color: #ddd;
    }
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

  .moreAdd .el-dialog__body {
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
}
</style>
