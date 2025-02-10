<template>
  <div class="app-container" v-loading="loading">
    <div class="left_card_wrap">
      <el-card class="box-card">
        <div class="top">
          <div class="top_button" v-hasPermi="['system:detailsBuild:tag']" @click="annotateMap()">
            <span>GIS标注</span>
          </div>
          <div class="top_button" v-hasPermi="['system:detailsBuild:edit']" @click="buildingEdit">
            <span>编辑</span>
          </div>
        </div>
        <div class="center">
          <div class="center_top">
            <p>{{ buildingInfo.buildingName }}</p>
            <div class="img_wrap">
              <img :src="buildingInfo.buildingPicture ? '/prod-api' + buildingInfo.buildingPicture : buildingNone" alt="">
            </div>
          </div>
          <div class="center_container">
            <div class="top">
              <p>建筑物信息：</p>
            </div>
            <div class="info">
              <p>
                <span>所属网格：</span>
                <span>{{ buildingInfo.areaName }}</span>
              </p>
              <p>
                <span>小区名称：</span>
                <span>{{ buildingInfo.communityName }}</span>
              </p>
              <p>
                <span>建筑类型：</span>
                <span>{{ buildingInfo.architectureType }}</span>
              </p>
              <p>
                <span>建筑用途：</span>
                <span>{{ buildingInfo.architecturePurpose }}</span>
              </p>
              <p>
                <span>房屋产权：</span>
                <span>{{ buildingInfo.housePropertyRight }}</span>
              </p>
              <p>
                <span>楼隐患类型：</span>
                <span>{{ buildingInfo.hiddenDangerType }}</span>
              </p>
              <p>
                <span>楼隐患级别：</span>
                <span>{{ buildingInfo.hiddenDangerLevel }}</span>
              </p>
              <p>
                <span>建筑面积：</span>
                <span>{{ buildingInfo.buidingMeasure }}</span>
              </p>
              <p>
                <span>物业公司：</span>
                <span>{{ buildingInfo.propertyName }}</span>
              </p>
              <p>
                <span>楼长：</span>
                <span>{{ buildingInfo.buildingMaster }}</span>
              </p>
              <p>
                <span>标准地址：</span>
                <span>{{ buildingInfo.buildingAddress }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <ul>
            <li>
              <p>实有人口</p>
              <p>{{ Count.actualNum }}</p>
            </li>
            <li>
              <p>户籍人口</p>
              <p>{{ Count.registeredNum }}</p>
            </li>
            <li>
              <p>未落户人口</p>
              <p>{{ Count.unregisteredNum }}</p>
            </li>
            <li>
              <p>境外人口</p>
              <p>{{ Count.foreignNum }}</p>
            </li>
            <li>
              <p>自住房屋</p>
              <p>{{ Count.selfHouse }}</p>
            </li>
            <li>
              <p>租贷房屋</p>
              <p>{{ Count.leaseHouse }}</p>
            </li>
            <li>
              <p>空置房屋</p>
              <p>{{ Count.vacantHouse }}</p>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
    <div class="right_center_wrap" v-if="this.buildingInfo.houseType !== '院落'">
      <p>单元/楼层筛选</p>
      <div class="center_container">
        <ul class="unit">
          <li v-for="(item, index) in unitList" :key="index" :class="unitActive === index ? 'isActive' : ''"
            @click="selectUnit(item, index)">
            <span>{{ item.unitNumber }}</span>
          </li>
          <li @click="unitEdit" :class="unitEditActive === 0 ? 'isActive' : ''">
            <span>编辑单元</span>
          </li>
        </ul>
        <ul class="floor">
          <li v-for="(item, index) in floorList" :key="index" :class="floorActive === index ? 'isActive' : ''"
            @click="selectFloor(item, index)">
            <span>{{ item.floor }}</span>
          </li>
          <!--<li  @click="unitEdit" :class="floorActive === 0 ? 'isActive' : ''">-->
          <!--<span>编辑楼层</span>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
    <nav>
      <header>
        <p>有 {{ total }}条房屋数据</p>
        <div class="header_bottom">
          <div class="header_bottom_left">
            <span>房屋性质：</span>
            <ul>
              <li>
                <span></span>
                <span>自住房屋</span>
              </li>
              <li>
                <span></span>
                <span>租贷房屋</span>
              </li>
              <li>
                <span></span>
                <span>空置房屋</span>
              </li>
            </ul>
          </div>
          <div class="header_bottom_right">
            <el-button type="primary" v-hasPermi="['system:detailsBuild:senior']" @click="goHeightPage">高级</el-button>
            <el-button type="primary" style="margin-left: 9px;" @click="addHouse"
              v-if="this.floorActive !== ''">添加建筑</el-button>
          </div>
        </div>
      </header>
      <div class="border-bottom"></div>
      <footer>
        <el-card class="box-card" v-for="(item, index) in houseList" :key="index">
          <el-popover placement="bottom" width="160" style="float: right">
            <div style="text-align: center; margin: 0">
              <!-- 编辑按钮 -->
              <el-button type="primary" v-hasPermi="['system:detailsBuild:cardEdit']" plain size="mini"
                style="border-radius: 6px" @click="handleEdit(item, index)">编辑</el-button>
              <!-- 删除按钮 -->
              <el-button type="danger" v-hasPermi="['system:detailsBuild:cardDel']" plain size="mini"
                style="border-radius: 6px" @click="handleDelete(item, index)">删除</el-button>
            </div>
            <el-button class="card-btn" v-hasPermi="['system:detailsBuild:operation']" slot="reference">操作</el-button>
          </el-popover>
          <div @click="goUnitPage(item)">
            <div class="card_top">
              <div class="card_top_left">
                <p>{{ item.houseName }}</p>
                <!--<p v-else>{{ item.houseNumber }}</p>-->
                <p>
                  <span>所有人：</span>
                  <span>{{ item.peopleName }}</span>
                </p>
              </div>
            </div>
            <div class="card_center">
              <p>
                <span>产权：</span>
                <span>{{ item.housePropertyRight }}</span>
              </p>
              <p>
                <span>房屋性质：</span>
                <span>{{ item.houseProperty }}</span>
              </p>
              <p>
                <span>房屋房型：</span>
                <span>{{ item.houseType }}</span>
              </p>
              <p>
                <span>居住人员({{ item.residentPeopleSize }})：</span>
                <span v-for="(i, index) in item.residentPeople">
                  {{ i.name }}{{ index === item.residentPeople.length - 1 ? '' : ',' }}
                </span>
              </p>
            </div>
            <div class="card_bottom">
              <div class="status_one" v-if="item.houseProperty == '自住房屋'">
                <span>{{ item.houseProperty }}</span>
              </div>
              <div class="status_one" style="background: #999;" v-if="item.houseProperty == '空置房屋'">
                <span>{{ item.houseProperty }}</span>
              </div>
              <div class="status_one" style="background:#ff933e;" v-if="item.houseProperty == '租赁房屋'">
                <span>{{ item.houseProperty }}</span>
              </div>
              <div class="status_two" v-if="item.housePurpose === '办公'">
                <span>企</span>
              </div>
            </div>
          </div>
        </el-card>
      </footer>
      <pagination :total="total" :page.sync="houseParams.currentPage" :limit.sync="houseParams.pageSize"
        :page-sizes="[9, 12, 20, 50]" @pagination="getHouse()" style="margin: 20px auto" />
    </nav>

    <!-- 编辑楼房弹窗 -->
    <el-dialog :visible.sync="dialogEdit" title="编辑楼房/院落" width="70%" :close-on-click-modal="false"
      @close="cancel('editForm')" class="building_dialog_wrap">
      <template>
        <el-form v-model="buildEditForm">
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
                <el-select v-model="buildEditForm.communityName" placeholder="请选择">
                  <el-option v-for="(item, index) in areaList" :key="item.id" :label="item.communityName" :value="item.id"
                    @click.native="editCommunit(item)">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼栋/院落名称：">
                <el-input v-model="buildEditForm.buildingName"></el-input>
              </el-form-item>
              <el-form-item label="楼房编号：" class="three">
                <el-input v-model="buildEditForm.id" readonly></el-input>
              </el-form-item>
            </div>
            <div class="edit_dialog_top two">
              <el-form-item label="建筑类型：">
                <el-select v-model="buildEditForm.architectureType" placeholder="请选择">
                  <el-option v-for="dict in dict.type.building_type" :key="dict.value" :label="dict.label"
                    :value="dict.value" @click.native="Buildingpulldown">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="建筑用途：">
                <el-select v-model="buildEditForm.architecturePurpose" placeholder="请选择">
                  <el-option v-for="item in dingpulldown" :key="item.value" :label="item.lable" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼房产权：">
                <el-select v-model="buildEditForm.housePropertyRight" placeholder="请选择">
                  <el-option v-for="dict in dict.type.house_property_right" :key="dict.value" :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="edit_dialog_top three">
              <el-form-item label="楼房隐患类型：">
                <el-select v-model="buildEditForm.hiddenDangerType" placeholder="请选择">
                  <el-option v-for="dict in dict.type.building_danger_type" :key="dict.value" :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼房隐患级别：">
                <el-select v-model="buildEditForm.hiddenDangerLevel" placeholder="请选择">
                  <el-option v-for="dict in dict.type.focous_degree" :key="dict.value" :label="dict.label"
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
                <el-input v-model="buildEditForm.buildingAddress" placeholder="请输入标准地址"></el-input>
              </el-form-item>
            </div>
            <div class="edit_dialog_top five">
              <el-form-item label="上传图片：">
                <image-upload v-model="buildEditForm.picture" :limit="1" />
              </el-form-item>
            </div>
            <ul class="six">
              <li>
                <span>楼房简介：</span>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容"
                  v-model="buildEditForm.brief">
                </el-input>
              </li>
            </ul>
          </div>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="buildSubmitForm('buildEditForm')">保存</el-button>
        <el-button type="default" @click="cancel('buildEditForm')">取消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑单元弹窗 -->
    <el-dialog :visible.sync="unitDialogEdit" title="编辑单元" width="70%" :close-on-click-modal="false"
      @close="cancelUnitDialog('editForm')" class="unitDialog_wrap">
      <div class="infinite-list-wrapper" style="overflow:auto; height: 768px">
        <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li v-for="(item, index) in unitEditDialogList" :key="index" class="list-item">
            <!-- 编辑单元列表 -->
            <template>
              <el-form>
                <div class="el_dialog_top">
                  <el-card class="box-card">
                    <ul class="one">
                      <li>
                        <span>单元：</span>
                        <span>{{ item.unitNumber }}</span>
                      </li>
                      <li>
                        <span>单元每层户数：</span>
                        <span>{{ item.unitPerfloorHousenumber }}</span>
                      </li>
                    </ul>
                    <ul v-for="(layerItem, index) in item.storeyInfo" :key="index">
                      <div>
                        <li style="margin-left:40px">
                          <span>层数：</span>
                          <span>{{ layerItem.storey }}</span>
                        </li>
                      </div>

                      <div>
                        <li style="margin-left:36px;float: left">
                          <span>门牌号：</span>
                          <el-row :gutter="5" class="up_house_number">
                            <el-col :span="4" v-for="(houseNumbersItem, index) in layerItem.houseNumbers" :key="index">
                              <p style="width:auto;margin-right: 0;padding: 0 6px">{{ houseNumbersItem }}</p>
                            </el-col>
                          </el-row>
                        </li>
                        <div class="more" @click="more(layerItem, item.id)">
                          <p>编辑</p>
                        </div>
                      </div>
                    </ul>
                    <div class="el_diolog_top_footer">
                      <!--                      <el-button size="medium" type="primary" @click="modifyForm(item, index)" plain>修改</el-button>-->
                      <el-button size="medium" type="primary" @click="saveUpHouseNumber(item, index)" plain>保存</el-button>
                      <el-button size="medium" type="info" v-if="item.id != $route.query.id"
                        @click="cancelUnitDialogEdit(item, index)" plain>删除</el-button>
                    </div>
                  </el-card>
                </div>
              </el-form>
            </template>
          </li>
        </ul>
        <!-- 添加单元格 -->
        <el-form status-icon v-model="saveAddUnitFrom" ref="ruleForm" class="demo-ruleForm" v-if="addUnitShow">
          <el-card class="box-card add_unit" v-for="(item, index) in addUnitForm" :key="index">
            <div class="add_unit_one_wrap">
              <el-form-item label="单元：" class="add_unit_one">
                <el-input v-model="item.unitNumber"></el-input>
              </el-form-item>
              <el-form-item label="单元每层户数：">
                <el-input v-model="item.unitPerfloorHousenumber"></el-input>
              </el-form-item>
            </div>

            <div class="add_unit_three_wrap">
              <el-form-item label="地上楼层：">
                <el-input v-model.number="item.storeyNumber"></el-input>
              </el-form-item>
              <el-form-item label="地下楼层：">
                <el-input v-model.number="item.undergroundNumber"></el-input>
              </el-form-item>
            </div>
            <el-button size="medium" type="primary" plain @click="addUnitSave(item, index)">保存</el-button>
          </el-card>

        </el-form>

        <p v-if="scrollLoading" class="scroll_msg">加载中...</p>
        <p v-if="noMore" class="scroll_msg">没有更多了</p>
      </div>
      <footer>
        <p @click="addUnit">添加单元格</p>
      </footer>
    </el-dialog>

    <!-- 门牌号修改 -->
    <el-dialog :visible.sync="Brand" title="门牌号" width="800px" :close-on-click-modal="false" @close="cancelMore">
      <el-form>
        <div class="dialog-card-wrap">
          <p>{{ this.storey }}层：</p>
          <div class="input_container">
            <div class="input_wrap" v-for="(item, index) in stepHouseNumberList" :key="index">
              <input type="text" v-model="item.houseNumber">
              <span class="el-icon-error" @click="deleteBrand(index)"></span>
            </div>
            <div class="add_input" @click="modification" style="cursor: pointer;">
              <span class="el-icon-plus"></span>
            </div>
          </div>
        </div>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="getInputValbrand()">确定</el-button>
        <el-button type="info" @click="cancelMore">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑房屋弹窗 -->
    <el-dialog :visible.sync="houseDialogEdit" title="添加/编辑房屋" width="70%" :close-on-click-modal="false"
      @close="cancelHouseDialog('editForm')" class="house_dialog_wrap">
      <template>
        <el-form v-model="editHouseInfo">
          <div class="el_dialog_top">
            <ul class="one">
              <li>
                <el-form-item prop="grid" class="grid">
                  <p class="title" style="display: inline-block; font-weight:400; margin-left: 25px; font-size: 14px;">网格：
                  </p>
                  <treeSelect :props="treeProps" :options="treeData" v-model="editHouseInfo.areaId" :accordion="true"
                    :disabled="true" @getValue="getList($event)" placeholder="请选择">
                  </treeSelect>
                </el-form-item>
              </li>
              <li>
                <el-form-item>
                  <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">所属建筑：</p>
                  <el-select v-model="editHouseInfo.buildingName" placeholder="请选择" disabled>
                    <el-option v-for="item in allUnitAndStorey" :key="item.id" :label="item.buildingName" :value="item.id"
                      @click.native="getBuild(item)">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item>
                  <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">所属单元：</p>
                  <el-select v-model="editHouseInfo.unitNumber" placeholder="请选择" disabled>
                    <el-option v-for="item in houseCardEditUnitList" :key="item.id" :label="item.unitNumber"
                      :value="item.id" @click.native="getUnitInfo(item)">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
            </ul>
            <ul class="two">
              <li>
                <span style="color: #000; font-weight:400;">楼层：</span>
                <el-input v-model="editHouseInfo.storey" placeholder="请输入内容" disabled></el-input>
              </li>
              <li>
                <span style="color: #000; font-weight:400;">门牌号<span style="color: red">*</span>：</span>
                <el-input v-model="editHouseInfo.houseNumber" placeholder="请输入内容"></el-input>
              </li>
              <li>
                <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">房屋产权：</p>
                <el-form-item>
                  <el-select v-model="editHouseInfo.housePropertyRight" placeholder="请选择">
                    <el-option v-for="dict in dict.type.house_property_right" :key="dict.value" :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
            </ul>
            <ul class="three">
              <li>
                <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">房屋房型：</p>
                <el-form-item>
                  <el-select v-model="editHouseInfo.houseType" placeholder="请选择">
                    <el-option v-for="dict in dict.type.house_housetype" :key="dict.value" :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <span style="color: #000; font-weight: 400;">建筑面积：</span>
                <el-input v-model="editHouseInfo.houseMeasure" placeholder="请输入内容"></el-input>
                <span class="area">㎡</span>
              </li>
              <li>
                <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">房屋性质：</p>
                <el-form-item>
                  <el-select v-model="editHouseInfo.houseProperty" placeholder="请选择">
                    <el-option v-for="dict in dict.type.house_property" :key="dict.value" :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
            </ul>
            <ul class="four">
              <li>
                <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">房屋用途：</p>
                <el-form-item>
                  <el-select v-model="editHouseInfo.housePurpose" placeholder="请选择">
                    <el-option v-for="dict in dict.type.courtyard_house_purpose" :key="dict.value" :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">楼房隐患类型：</p>
                <el-form-item>
                  <el-select v-model="editHouseInfo.hiddenDangerType" placeholder="请选择">
                    <el-option v-for="dict in dict.type.building_danger_type" :key="dict.value" :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">楼房隐患级别：</p>
                <el-form-item>
                  <el-select v-model="editHouseInfo.hiddenDangerLevel" placeholder="请选择">
                    <el-option v-for="dict in dict.type.focous_degree" :key="dict.value" :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
            </ul>
            <ul class="five">
              <li>
                <span style="color: #000; font-weight: 400;">标准地址：</span>
                <el-input v-model="editHouseInfo.houseAddress" placeholder="请输入内容" disabled></el-input>
              </li>
              <li>
                <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">是否为落户房屋：</p>
                <el-form-item>
                  <el-select v-model="editHouseInfo.registeredStatus" placeholder="请选择">
                    <el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
            </ul>
          </div>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitForm('editHouseInfo')">保存</el-button>
        <el-button type="default" @click="cancelHouseDialog('editHouseInfo')">取消</el-button>
      </div>
    </el-dialog>
    <!--标注弹窗-->
    <el-dialog :visible.sync="dialogAnnotate" title="绘制网格" width="70%" height="600px" class="map" ref="dialogDataBuilding"
      :close-on-click-modal="false" @close="closeMap()">
      <gridMap :mapData='mapData' :dialogAnnotate='dialogAnnotate' @coordinates="coordinates"></gridMap>
    </el-dialog>

    <!-- 编辑单元弹窗点击修改 -->
    <el-dialog :visible.sync="updateUnitEdit" title="修改单元" width="800px" :close-on-click-modal="false">
      <div class="dialog-card-wrap">
        <p>{{ this.buildingTile + '-' + this.unitTitle }}：</p>
        <div class="input_container">
          <div class="input_wrap" v-for="(item, index) in this.storeyHouseNumberArr" :key="index">
            <input type="text" v-model="storeyHouseNumberArr[index]">
            <span class="el-icon-error" @click="deleteCol(index)"></span>
          </div>
          <div class="add_input" @click="addCol">
            <span class="el-icon-plus"></span>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" @click="getInputVal">确定</el-button>
        <el-button type="info" @click="cancelUpdateUnitEditOne">取消</el-button>
      </div>
    </el-dialog>
    <!-- 修改单元地下楼层数添加门牌号弹出框-->
    <el-dialog :visible.sync="updateUnitEditUnder" title="修改单元" width="800px" :close-on-click-modal="false">
      <div class="dialog-card-wrap">
        <p>{{ this.buildingTile + '-' + this.unitTitle }}：</p>
        <div class="input_container">
          <div class="input_wrap" v-for="(item, index) in this.underHouseNumberArr" :key="index">
            <input type="text" v-model="underHouseNumberArr[index]">
            <span class="el-icon-error" @click="deleteColTwo(index)"></span>
          </div>
          <div class="add_input" @click="addColTwo">
            <span class="el-icon-plus"></span>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" @click="getInputValTwo">确定</el-button>
        <el-button type="info" @click="cancelUpdateUnitEdit">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBuildingInfoLeft, getUnitAndStory, getUnitAndFloorHoseInfo, getBuildingUnitInfo, returnDefaultBuild, queryBuildingArea,
  updateBuliding, deleteCommunity, buildingInfoAddUnit, houseHeightDelete, editHouseBefore, houseCardUpdate, getUnitAndStoreyById,
  updateGIS, getCount, getArchiPurposeByType, updateCardData, returnNumberList, houseAddCardUpdate
} from '@/api/area/house'
import Cookies from "js-cookie";
import buildingNone from "./img/building.png";
import VueTagsInput from '@johmun/vue-tags-input' // 输入框标签插件
import { treeList } from "@/api/area/area";
import { getUserProfile } from "@/api/system/user"; //获取用户名
import gridMap from "@/components/gridMap/index";  //标注地图
export default {
  dicts: ['building_type', 'house_property_right', 'building_danger_type', 'focous_degree',
    'building', 'house_property', 'courtyard_house_purpose', 'house_housetype', 'is_party_status'],
  name: "buildingInfo",
  components: {
    gridMap,
    VueTagsInput
  },
  data() {
    return {
      buildingNone: buildingNone,
      addUnitShow: false,
      addUpHouseNum: '',
      addDownHouseNum: '',
      underHouseNumber: '',
      underTags: [],
      storeyHouseNumber: '',
      tags: [],
      updateUnitEditUnder: false,
      updataHouseNumber: {},
      updateUnitEdit: false,
      // 所属小区下拉数据
      areaList: [],
      buildEditForm: {
        buildingAddress: "",
        hiddenDangerLevel: "",
        architectureType: "",
        buildingName: "",
        houseType: "",
        communityId: '',
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
      editDialogInfo: {}, // 点击左侧卡片编辑楼房保存默认展示信息
      total: 0,
      center: [12529117.002647482, 4561158.359249212], //地图中心点
      dialogAnnotate: false,  //地图弹窗
      houseSelectOne: '',
      houseInputOne: '',
      count: 0, // 起始页数
      scrollLoading: false, // 加载中字段默认隐藏
      totalCount: "",//取后端返回内容的总页数
      unitEditDialogList: [], // 单元编辑弹窗列表集合
      dialogImageUrl: '',
      dialogVisible: false,
      managerInput: '', // 楼长输入框双向绑定
      managerList: [], // 添加楼长存储集合
      addressInput: '', // 标准地址输入框
      textarea2: '', // 楼房简介输入框
      value: '',
      houseDialogEdit: false, // 编辑房屋遮罩层
      unitDialogEdit: false, // 编辑单元弹窗
      loading: true,
      buildingInfo: {}, // 调取接口存储左侧卡片信息数据
      params: {
        id: this.$route.query.id,
      },
      unitList: [], // 存储单元集合
      unitActive: 0, // 单元选中值
      floorList: [], // 存储楼层集合
      floorActive: '', // 楼层选中值
      houseParams: {
        buidingId: this.$route.query.id, // 卡片ID this.$route.query.id
        storey: '', // 楼层ID
        currentPage: 1,
        pageSize: 9
      },
      houseList: [], // 存储房屋卡片集合
      dialogEdit: false, // 编辑楼房弹窗展示状态
      editForm: {}, //编辑表单参数
      rules: {}, // 表单校验
      unitEditActive: '', // 单元编辑按钮动态class
      ruleFormUnit: [
        {
          id: '',
          unitNum: '',
          upFloorNumId: '',
          upFloorNumHouseNum: '',
          downFloorNumId: '',
          downFloorNumHouseNum: ''
        }
      ], // 单元编辑表单
      unitRules: {}, // 单元编辑表单验证
      addUnitForm: [], // 单元编辑添加的列表
      editFormShow: false, // 单元编辑弹出框点击修改展示的可编辑列表
      // 单元编辑弹出框点击修改新增表单双向数据绑定
      editFormUnit: {
        id: '',  //该栋楼的单元编号
        unitNumber: '', //单元
        unitPerfloorHousenumber: '', //单元每层户数
        userName: '', //用户名
        array: [],
      },

      areaId: '',
      unitTitle: '',
      storeyTitle: '',
      downFloorNumList: [],
      storeyHouseNumberArr: [],
      underHouseNumberArr: [],
      updateParams: {
        userName: '',
        unitPerfloorHousenumber: '',
        unitNumber: '',
        id: '',
        storey: {
          storeyHouseNumber: [],
          storeyNumber: ''
        },
        under: {
          underNumber: '',
          underHouseNumber: []
        }
      },
      //添加单元格的表单
      saveAddUnitFrom: {
        id: '', //单元编号
        unitNumber: '', //单元名称
        unitPerfloorHousenumber: '', //每层户数
        createBy: '', //用户名
        storeyNumber: '', //地上层数
        undergroundNumber: '', //地下层数
      },
      Brand: false, //门牌号更多按钮弹窗默认展示状态
      treeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      treeData: [], //下拉框数据
      createParams: {
        areaId: this.$route.query.areaId,
        communityId: '', // 小区编号
        buidingId: '', // 所属建筑编号
        buidingName: '',
        unitId: '', // 所属单元编号
        storey: '', // 楼层
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
      houseCardEditUnitList: [],
      editHouseInfo: {}, // 房屋卡片编辑存储表单信息集合
      Count: {}, // 实有建筑 -楼房详情页 - 实有人口数据
      dingpulldown: [],// 实有建筑-编辑楼房-选择建筑类型建筑用途列表数据
      unitNumber: '', //单元编辑-修改-更多单元号
      storey: '',//单元编辑-修改-更多层数
      buildingTile: '', // 单元编辑-修改-更多层数楼栋号
      stepHouseNumberList: [], // 单元编辑-修改-更多 更多展示指定楼栋下面指定单元的所有门牌号集合
      mapData: {
        build: '',
        gridCenter: '',  //给地图传参（中心点）
        areaId: '',  //给地图传参（id）
      },
      unitActiveNumber: '',  //选中的单元
      unitActiveId: '',  //选中单元的ID
      floorActiveNumber: '',  //选中的楼层
      activeClick: '',
      moreId: '',  //更多弹窗的单元ID
      buildingTemplate: '',   // 详细建筑/基础建筑
      houseType: '',   // 单元楼/非单元楼/院落
    }
  },
  created() {
    this.getInfoLeft()
    this.getTreeSelect()
    this.getUser(); //调用用户名
  },
  computed: {
    noMore() {
      //当起始页数大于总页数时停止加载
      return this.unitEditDialogList.length >= this.unitEditDialogList.length
    },
    disabled() {
      return this.scrollLoading || this.noMore
    }
  },
  methods: {
    cancelUpdateUnitEditOne() {
      this.updateUnitEdit = false
    },
    // 房屋卡片编辑所属单元选择按钮
    getUnitInfo(item) {
      console.log(item);
      this.editHouseInfo.buidingId = item.id
    },
    // 房屋卡片编辑所属小区选择按钮
    getBuild(item) {
      console.log(item);
      this.editHouseInfo.buildingName = item.buildingName
      this.houseCardEditUnitList = item.unitInfo
      this.editHouseInfo.buidingId = item.id
    },
    // 编辑楼房所属小区下拉款选择按钮
    editCommunit(item) {
      this.buildEditForm.communityId = item.id
      this.buildEditForm.communityName = item.communityName
    },

    // 添加新单元保存按钮
    addUnitSave(item, index) {
      let undergroundNumber = '';
      if (item.undergroundNumber) {
        undergroundNumber = item.undergroundNumber;
      } else {
        undergroundNumber = 0;
      }
      let params = {
        id: this.$route.query.id, // 该楼栋的单元编号
        unitNumber: item.unitNumber, // 单元名称
        unitPerfloorHousenumber: item.unitPerfloorHousenumber, // 单元每层户数
        storeyNumber: item.storeyNumber, // 地上楼层层数
        undergroundNumber: undergroundNumber, // 地下楼层层数
        createBy: this.userName //用户名
      }

      console.log(params)
      buildingInfoAddUnit(params).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.$message.success(res.msg)
          // 保存时隐藏添加的表格
          this.addUnitShow = false
          // 保存后删除数组中的元素
          for (var i = 0; i < this.addUnitForm.length; i++) {
            this.addUnitForm.splice(i, 1);
            i--;
          }
          //保存后调用编辑单元方法重新加载页面
          this.unitEdit()
        }
      })
    },

    //用户名接口数据
    getUser() {
      getUserProfile().then(response => {
        this.userName = response.data.userName;
      })

    },

    // 编辑单元 - 修改单元保存按钮
    saveUpHouseNumber(item) {
      updateCardData(item).then((res) => {
        if (res.code === 200) {
          this.$message.success('修改成功')
          this.unitEdit() //保存后调用方法重新加载编辑单元列表页面
        }
      })
    },

    // 编辑门牌号更多按钮
    more(item, id) {
      this.moreId = id
      this.Brand = true
      this.storey = item.storey
      let aBrand = item.houseNumbers
      let houseArry = [] //定义门牌号数组
      // //遍历Brand门牌号数组
      aBrand.forEach((items) => {
        //定义houseNumber对象，里面是门牌号和他对应的字段
        let houseNumber = {
          houseNumber: items,
          storey: this.storey
        }
        //将houseNumber对象添加到houseArry数组中，形成数组对象的格式在html代码中遍历获取数据
        houseArry.push(houseNumber)
      });
      this.stepHouseNumberList = houseArry
    },

    // 门牌号点击更多弹出遮罩层取消按钮
    cancelMore() {
      this.Brand = false
    },

    //删除门牌号按钮
    deleteBrand(index) {
      this.stepHouseNumberList.splice(index, 1)
    },

    //添加门牌号按钮
    modification() {
      this.stepHouseNumberList.push({ houseNumber: '', storey: this.storey })
    },

    // 门牌号更多弹窗确定按钮
    getInputValbrand() {
      let params = {
        id: this.moreId,
        houseNumbers: [],
        storey: this.storey,
      }
      this.stepHouseNumberList.map((item) => {
        params.houseNumbers.push(item.houseNumber)
      })
      this.unitEditDialogList.forEach((item) => {
        if (item.id === params.id) {
          item.storeyInfo.forEach((item) => {
            if (item.storey === params.storey) {
              item.houseNumbers = params.houseNumbers
              this.Brand = false
            }
          })
        }
      })
    },

    cancelUpdateUnitEdit() {
      this.updateUnitEditUnder = false
    },
    // 修改单元确定按钮
    getInputVal() {
      this.editFormUnit.upFloorNumHouseNum = this.storeyHouseNumberArr.toString()
      this.updateUnitEdit = false
    },
    // 修改单元确定按钮
    getInputValTwo() {
      this.editFormUnit.downFloorNumHouseNum = this.underHouseNumberArr.toString()
      this.updateUnitEditUnder = false
    },
    addColTwo(index) {
      console.log(this.underHouseNumberArr);
      this.underHouseNumberArr.push('')
    },
    deleteColTwo(index) {
      // if(this.form.addForm.length === 1){
      //   return alert('提示：必须填写一条')
      // }
      this.underHouseNumberArr.splice(index, 1)
    },
    deleteCol(index) {
      // if(this.form.addForm.length === 1){
      //   return alert('提示：必须填写一条')
      // }
      this.storeyHouseNumberArr.splice(index, 1)
      console.log(this.storeyHouseNumberArr);
    },
    addCol() {
      this.storeyHouseNumberArr.push('')
    },
    addHouse() {
      this.houseDialogEdit = true
      this.activeClick = 'add'
      this.editHouseInfo.areaId = this.buildingInfo.areaId
      this.editHouseInfo.buildingName = this.buildingInfo.buildingName
      this.editHouseInfo.unitNumber = this.unitActiveNumber
      this.editHouseInfo.buidingId = this.unitActiveId
      this.editHouseInfo.storey = this.floorActiveNumber
      this.editHouseInfo.houseAddress = this.buildingInfo.buildingAddress
    },
    buildSubmitForm() { // 左侧楼房卡片编辑弹窗保存按钮
      this.buildEditForm.updateBy = Cookies.get('username')
      let masterList = []
      this.managerList.map((item) => {
        masterList.push(item)
      })
      this.buildEditForm.buildingMaster = masterList.toString();
      let editForm = {
        buildingAddress: this.buildEditForm.buildingAddress,
        hiddenDangerLevel: this.buildEditForm.hiddenDangerLevel,
        architectureType: this.buildEditForm.architectureType,
        buildingName: this.buildEditForm.buildingName,
        houseType: this.buildEditForm.houseType,
        communityId: this.buildEditForm.communityId,
        communityName: this.buildEditForm.communityName,
        id: this.buildEditForm.id,
        housePropertyRight: this.buildEditForm.housePropertyRight,
        buildingMaster: this.buildEditForm.buildingMaster,
        architecturePurpose: this.buildEditForm.architecturePurpose,
        hiddenDangerType: this.buildEditForm.hiddenDangerType,
        buildingPicture: this.buildEditForm.picture,
        buildingBriefIntroduction: this.buildEditForm.brief
      }
      updateBuliding(editForm).then((res) => {
        if (res.code === 200) {
          masterList = []
          this.dialogEdit = false
          this.$message.success('修改成功')
          this.getInfoLeft()
        }
      })
    },

    // 标注弹窗打开
    annotateMap() {
      this.mapData.build = true
      this.mapData.gridCenter = this.buildingInfo.gis
      this.mapData.areaId = this.$route.query.id
      this.dialogAnnotate = true;
      this.$refs.dialogDataBuilding.mapData = this.mapData
    },
    //接收地图标注的传值
    coordinates(value, id) {
      // value 就是子组件传递过来的数据
      console.log('子组件传参==', value, id);
      var param = {
        id: id,
        gis: value.areaCenter,
      }
      updateGIS(param).then((response) => {
        this.$modal.msgSuccess("保存成功");
        this.dialogAnnotate = false;
        this.getInfoLeft();
      });
    },
    //关闭标注弹窗
    closeMap() {
      this.dialogAnnotate = false;
    },
    // 表单保存按钮
    submitForm(form) {
      console.log(this.editHouseInfo);
      if (this.editHouseInfo.houseNumber === '' || this.editHouseInfo.houseNumber === null || this.editHouseInfo.houseNumber === undefined) {
        this.$message.error('请输入门牌号！')
      } else {
        if (this.editHouseInfo.registeredStatus === '是') {
          this.editHouseInfo.registeredStatus = 0
        } else if (this.editHouseInfo.registeredStatus === '否') {
          this.editHouseInfo.registeredStatus = 1
        }
        if (this.activeClick === 'add') {
          houseAddCardUpdate(this.editHouseInfo).then((res) => {
            if (res.code === 200) {
              this.houseDialogEdit = false
              this.$message.success(res.msg)
              this.editHouseInfo = {}
              this.getInfoLeft()
            }
          })
        } else if (this.activeClick === 'edit') {
          houseCardUpdate(this.editHouseInfo).then((res) => {
            if (res.code === 200) {
              this.houseDialogEdit = false
              this.$message.success(res.msg)
              this.editHouseInfo = {}
              this.getInfoLeft()
            }
          })
        }
      }
    },
    getItem(item) {
    },
    // 跳转房屋高级页面
    goHeightPage() {
      this.$router.push({ path: 'houseHeight', query: { 'id': this.buildingInfo.id, 'areaId': this.buildingInfo.areaId } })
    },
    // 房屋 - 编辑房屋遮罩层关闭方法
    cancelHouseDialog() {
      this.houseDialogEdit = false
      this.editHouseInfo = {}
    },
    // 点击房屋卡片跳转页面
    goUnitPage(item) {
      console.log(item)
      localStorage.setItem('unitName', item.houseName)
      this.$router.push({ path: '/houseInfo', query: { houseId: item.id } })
    },
    load() {
      //滑到底部时进行加载
      this.scrollLoading = true
      setTimeout(() => {
        this.count += 1 // 页数加一
        this.scrollLoading = false
      }, 2000)
    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 单元弹窗 - 列表修改按钮
    modifyForm(item, index) {
      console.log(item, index)
      this.editFormShow = index
      this.editFormUnit.id = item.id  //该栋楼的单元编号
      this.editFormUnit.unitNumber = item.unitNumber  //单元
      this.editFormUnit.unitPerfloorHousenumber = item.unitPerfloorHousenumber  //单元每层户数
      this.editFormUnit.storeyInfo = item.storeyInfo //层数

      //遍历storeyInfo数组对象
      this.editFormUnit.storeyInfo.forEach((item) => {
        let houseArry = [] //定义门牌号数组
        let storey = item.storey  //定义的层数
        // 遍历houseNumbers获取门牌号
        item.houseNumbers.forEach((houseItem) => {
          houseArry.push(houseItem)
        })
        // 定义param对象，包含层数，门牌号
        let param = {
          storey: storey,
          houseNumbers: houseArry.toString()
        }
        // 定义array数组放入param对象
        this.editFormUnit.array.push(param)
      });
    },

    // 单元弹窗 - 添加新单元
    addUnit() {
      let addUnit = {
        id: '', //单元编号
        unitNumber: '', //单元名称
        unitPerfloorHousenumber: '', //每层户数
        createBy: '', //用户名
        storeyNumber: '', //地上层数
        undergroundNumber: '', //地下层数
      }
      console.log(this.addUnitForm);
      this.addUnitForm.push(addUnit)
      this.addUnitShow = true
    },

    // 单元弹窗 - 删除按钮
    cancelUnitDialogEdit(item, index) {
      console.log(item)
      let params = {
        id: item.id,
        viewId: this.$route.query.id,
        updateBy: this.userName
      }
      this.loading = true
      console.log(params)
      console.log(this.unitEditDialogList)
      if (this.unitEditDialogList.length === 1) {
        this.$message.error('当此楼栋下只有一个单元时，不可删除！')
      } else {
        deleteCommunity(params).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.data.msg)
            getBuildingUnitInfo(this.params).then((res) => {
              if (res.code === 200) {
                this.loading = false
                this.unitEditDialogList = res.data
              }
            })
          } else if (res.code === 500) {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    // 单元弹窗 - 取消按钮
    cancelUnitDialog() {
      this.unitDialogEdit = false
      this.loading = false
      this.editFormShow = false
      this.addUnitShow = false
      this.editFormUnit.array = [] //清空点击修改显示的数据
      this.addUnitForm = [] //清空点击添加单元显示的数据
      this.unitEditActive = 1 //点击取消时取消编辑单元按钮的选中
      this.unitEditDialogList = []
      this.getUnitAndStoryInfo()  //查询楼房单元以及层数接口
    },
    // 编辑单元
    unitEdit() {
      this.unitEditActive = 0
      this.params.areaId = this.buildingInfo.areaId
      getBuildingUnitInfo(this.params).then((res) => {
        if (res.code === 200) {
          this.unitDialogEdit = true
          this.unitEditDialogList = res.data
          console.log(this.unitEditDialogList, '777')
          this.unitEditDialogList.map((item) => {
          })
        }
      })
    },
    // 房屋操作 - 卡片单元编辑按钮
    handleEdit(item, index) {
      this.houseDialogEdit = true
      this.activeClick = 'edit'
      console.log(item);
      let params = {
        id: item.id
      }
      // this.loading = true
      editHouseBefore(params).then((res) => {
        if (res.code === 200) {
          // this.loading = false
          this.editHouseInfo = res.data
          console.log(this.editHouseInfo.registeredStatus);
          if (this.editHouseInfo.registeredStatus === 0) {
            this.editHouseInfo.registeredStatus = '是'
          } else if (this.editHouseInfo.registeredStatus === 1) {
            this.editHouseInfo.registeredStatus = '否'
          }
          console.log(this.editHouseInfo);
        }
      }).then(() => {
        let params = {
          areaId: this.editHouseInfo.areaId,
          communityId: this.editHouseInfo.communityId
        }
        console.log(params);
        getUnitAndStoreyById(params).then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.allUnitAndStorey = res.data
          }
        })
      })
    },
    // 编辑遮罩层 - 添加楼长之后显示的tab删除按钮
    canelManager(item, index) {
      this.managerList.splice(index, 1)
    },
    // 编辑遮罩层 - 添加楼长按钮
    addManager() {
      if (this.managerInput != '') {
        this.managerList.push(this.managerInput)
        this.managerInput = ''
      }
    },
    // 编辑的取消按钮
    cancel() {
      this.dialogEdit = false;
    },
    // 房屋操作 - 左侧楼房编辑按钮
    buildingEdit() {
      let params = {
        id: this.buildingInfo.id
      }
      // this.loading = true
      returnDefaultBuild(params).then((res) => {
        if (res.code === 200) {
          this.editDialogInfo = res.data[0]
          this.buildEditForm = this.editDialogInfo
          // this.loading = false
          this.dialogEdit = true
          let a = []
          if (this.editDialogInfo.buildingMaster !== null && this.editDialogInfo.buildingMaster !== '') {
            a = this.editDialogInfo.buildingMaster.split(',')
            a.map((item) => {
              if (this.managerList.indexOf(item) === -1) {
                this.managerList.push(item)
              }
            })
          } else { }
        }
      })
    },
    // 房屋操作 - 删除按钮
    handleDelete(item, index) {
      // const areaIds = row.areaId || this.ids;
      let params = {
        id: item.id,
        updateBy: Cookies.get('username')
      }
      console.log(item);
      this.$modal
        .confirm('是否确认删除网格-网格管理编号为"' + item.houseName + '"的数据项？')
        .then(() => {
          houseHeightDelete(params).then((res) => {
            if (res.code === 200) {
              this.getInfoLeft()
              this.$modal.msgSuccess("删除成功");
            }
          })
        })
        .catch(() => { });
    },
    // 获取某个单元下/某个楼层下的房屋信息
    getHouse() {
      this.loading = true
      getUnitAndFloorHoseInfo(this.houseParams).then((res) => {
        if (res.code === 200) {
          this.loading = false
          this.houseList = res.data[1]
          this.loading = false
          this.total = res.data[0].total
          let param = {
            areaId: localStorage.getItem('areaId')
          }
          queryBuildingArea(param).then((res) => {
            if (res.code === 200) {
              this.areaList = res.data
            }
          })
        }
      })
    },
    // 选择楼层
    selectFloor(item, index) {
      this.floorActive = index
      this.floorActiveNumber = item.id
      this.houseParams.storey = item.floor.substr(0, item.floor.indexOf('层'))
      this.getHouse()
    },
    // 选择单元
    selectUnit(item, index) {
      this.unitActive = index
      this.unitActiveNumber = item.unitNumber
      this.unitActiveId = item.id
      this.floorList = item.floorList
      this.floorActive = ''
      this.houseParams.buidingId = item.id
      this.houseParams.storey = ''
      this.getHouse()
    },
    // 查询左侧卡片部分信息
    getInfoLeft() {
      getBuildingInfoLeft(this.params).then((res) => {
        if (res.code === 200) {
          this.buildingInfo = res.data[0]
          this.buildingTemplate = this.buildingInfo.buildingTemplate
          this.houseType = this.buildingInfo.houseType
          this.areaId = this.buildingInfo.areaId
          // localStorage.setItem('communityName', this.buildingInfo.communityName)
          this.getUnitAndStoryInfo()
          //调用实有人口数据函数
          this.getgetCount()
        }
      })
    },
    // 实有建筑 -楼房详情页 - 实有人口数据
    getgetCount() {
      let params = {
        areaId: this.buildingInfo.areaId,
        communityId: this.buildingInfo.communityId,
        buildingPrefix: this.buildingInfo.buildingPrefix,
        buidingNumber: this.buildingInfo.buidingNumber
      }
      getCount(params).then((res) => {
        if (res.code === 200) {
          this.Count = res.data
        }
      })
    },
    // 查询楼房单元以及层数接口
    getUnitAndStoryInfo() {
      let params = {
        id: this.$route.query.id,
        areaId: this.areaId
      }
      getUnitAndStory(params).then((res) => {
        if (res.code === 200) {
          this.unitList = res.data
          this.unitActiveNumber = this.unitList[0].unitNumber
          this.unitActiveId = this.unitList[0].id
          this.floorList = res.data[0].floorList
          this.getHouse()
        }
      })
    },

    /** 获取网格树状结构数据 */
    getTreeSelect() {
      var query = {
        userId: localStorage.getItem("userId"),
        flag: 0
      }
      treeList(query).then(res => {
        console.log('res', res)
        this.treeData = res.data
        this.childrenList = res.data[0].children
        this.areaTitle = res.data[0].label
        this.stringPosition = res.data[0].label
        this.loading = false
      })
    },
    getList(data) {
      console.log(data);
      if (data !== undefined) {
        this.getParent(this.treeData, data.id)
        this.areaTitle = data.label
        console.log(data);
        this.createParams.areaId = data.id
        this.editHouseInfo.areaId = data.id
        this.editHouseInfo.areaName = data.label
      }
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
    // 实有建筑-编辑楼房-选择建筑类型调用接口渲染建筑用途
    Buildingpulldown() {
      let params = {
        architectureType: this.buildEditForm.architectureType, // 建筑类型
      }
      console.log(params)
      getArchiPurposeByType(params).then((res) => {
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
  display: flex;

  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none
  }

  p,
  span {
    font-family: Microsoft YaHei;
  }

  .left_card_wrap {
    width: 311px;

    ::v-deep .el-card {
      min-height: calc(100vh - 50px);
    }

    .top {
      display: flex;
      justify-content: space-between;

      .top_button {
        width: 74px;
        height: 34px;
        border: 1px solid #3D8BF5;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        span {
          color: #1F79F3;
          font-size: 14px;
          font-weight: 400;
        }

        &:nth-child(2) {
          margin-left: 21px;
        }

        &:last-child {
          margin-left: 9px;
        }
      }
    }

    .center {
      .center_top {
        p {
          font-size: 24px;
          font-weight: bold;
          color: #F27463;
        }

        .img_wrap {
          width: 250px;
          height: 188px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .center_container {
        .top {
          p {
            font-size: 14px;
            font-weight: bold;
            color: #333333;
          }
        }

        .info {
          p {
            margin: 0;

            span {
              font-size: 12px;
              color: #333;
            }
          }
        }
      }
    }

    .bottom {
      margin-top: 16px;

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 113px;
          height: 52px;
          border: 1px solid #E5E5E5;
          margin-right: 8px;
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          p {
            margin: 0;
            text-align: center;
            font-size: 12px;
            font-weight: 400;
            color: #1F79F3;
          }

          &:nth-child(2) {
            p {
              color: #F27463;
            }
          }

          &:nth-child(3) {
            p {
              color: #3BC2B4;
            }
          }

          &:nth-child(4) {
            p {
              color: #5C6BC0;
            }
          }

          &:nth-child(5) {
            p {
              color: #A0887E;
            }
          }

          &:nth-child(6) {
            p {
              color: #FF933E;
            }
          }

          &:nth-child(7) {
            p {
              color: #333333;
            }
          }
        }
      }
    }
  }

  .right_center_wrap {
    width: 258px;
    min-height: calc(100vh - 50px);
    text-align: center;

    p {
      font-size: 14px;
      font-weight: bold;
      color: #000000;
      margin-top: 30px;
      margin-left: 19px;
    }

    .center_container {
      display: flex;
      justify-content: center;
      margin-left: 32px;

      .unit {
        padding: 0 10px;

        li {
          width: 90px;
          height: 33px;
          border: 1px solid #E5E5E5;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin-top: 18px;

          span {
            font-size: 12px;
            font-weight: 400;
            color: #000000;
          }

          &.isActive {
            background-color: #1F79F3;
            border: none;

            span {
              color: #FFF;
            }
          }

          &:first-child {
            margin: 0;
          }
        }
      }

      .floor {
        li {
          width: 90px;
          height: 33px;
          border: 1px solid #E5E5E5;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin-top: 18px;

          span {
            font-size: 12px;
            font-weight: 400;
            color: #000000;
          }

          &.isActive {
            background-color: #1F79F3;
            border: none;

            span {
              color: #FFF;
            }
          }

          &:first-child {
            margin: 0;
          }
        }
      }
    }
  }

  nav {
    width: 80%;
    margin-left: 20px;
    box-sizing: border-box;
    padding: 16px 0 0 30px;

    p {
      margin: 0;
    }

    header {
      p {
        margin-top: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #000000;
      }

      .header_bottom {
        margin-top: 36px;
        display: flex;
        justify-content: space-between;

        .header_bottom_left {
          display: flex;
          align-items: center;

          span {
            font-size: 14px;
            font-weight: 400;
            color: #000000;
          }

          ul {
            display: flex;
            align-items: center;

            li {
              display: flex;
              align-items: center;

              span {
                &:first-child {
                  display: inline-block;
                  width: 13px;
                  height: 13px;
                  background-color: #3BC2B4;
                  margin-left: 3px;
                }

                &:last-child {
                  margin-left: 4px;
                }
              }

              &:nth-child(2) {
                span {
                  &:first-child {
                    margin-left: 11px;
                    background-color: #FF933E;
                  }
                }
              }

              &:nth-child(3) {
                span {
                  &:first-child {
                    margin-left: 11px;
                    background-color: #999999;
                  }
                }
              }
            }
          }
        }

        .header_bottom_right {
          display: flex;

          ::v-deep .el-button {
            width: 90px;
            height: 33px;
            background-color: #FFF;
            color: #1F79F3;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .border-bottom {
      width: 100%;
      height: 1px;
      background-color: #CCCCCC;
      margin: 10px 0;
    }

    footer {
      display: flex;
      flex-wrap: wrap;

      ::v-deep .el-card {
        width: 32.33%;
        margin: 10px 0;
        border-radius: 10px;
      }

      ::v-deep .el-card__body {
        padding: 10px 10px 15px 15px;
      }

      .box-card {
        margin-right: 10px;

        .card_top {
          display: flex;
          justify-content: space-between;

          .card_top_left {
            margin-top: 10px;

            p {
              font-size: 18px;
              font-weight: bold;
              color: #000000;

              &:nth-child(2) {
                span {
                  font-size: 14px;
                }
              }
            }
          }
        }

        .card_center {
          margin-top: 10px;

          p {
            span {
              font-size: 12px;
              font-weight: 400;
              color: #666666;
            }
          }
        }

        .card_bottom {
          display: flex;
          justify-content: right;

          span {
            font-size: 12px;
            font-weight: 400;
            color: #FDFFFF;
          }

          .status_one {
            height: 21px;
            background-color: #3BC2B4;
            display: flex;
            justify-content: center;
            line-height: 21px;
            padding: 0 9px;

            span {
              font-size: 12px;
            }
          }

          .status_two {
            width: 21px;
            height: 21px;
            background-color: #5C6BC0;
            display: flex;
            justify-content: center;
            line-height: 21px;
            margin-left: 9px;
          }
        }

        ::v-deep .el-button {
          padding: 3px 0;
          width: 67px;
          height: 30px;
          border: 1px solid #CCCCCC;
          border-radius: 5px;

          span {
            font-size: 12px;
            font-weight: 400;
            color: #000000;
          }
        }
      }
    }
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
              background-color: #ededed;
              line-height: 35px;
              box-sizing: border-box;
              padding-left: 11px;
            }
          }

          &:first-child {
            margin: 0;
          }

          .up_house_number {
            width: 638px;
            height: auto;
            background-color: #ededed;
            display: flex;
            align-items: center;

            p {
              margin: 2px 2px 2px 2px;
              width: 100px;
              height: 27px;
              line-height: 27px;
              text-align: center;
              border-color: #FFF;
              background-color: #FFF;

              &:last-child {
                margin-right: 10px;
              }
            }
          }
        }

        .more {
          display: inline-block;
          float: right;
          cursor: pointer;
          width: 67px !important;
          height: 36px;
          text-align: center;
          margin-left: 6px;

          p {
            width: 100%;
            margin: 0;
            height: 100%;
            line-height: 36px;
            border-radius: 4px;
            background: #e8f4ff;
            color: #1890ff;
            border: 1px solid #a3d3ff;
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

          .el-form-item {
            margin: 0;
          }
        }

        &.one {
          margin-top: 0;
        }

        &.two {
          margin-left: 28px;

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

        .story_house_number {
          display: flex;
          flex-wrap: wrap;
        }

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

  .add-house_number_wrap {
    ::v-deep .el-form-item__content {
      display: flex;

      .add_house_number {
        position: relative;
        top: -5px;
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
}

.app-container[data-v-abf8b69e] .unitDialog_wrap .el_dialog_top .el-card {
  width: 78.375rem;
  margin: 0 auto;
  border-radius: 0.625rem;
  min-height: 120px;
}

.app-container[data-v-abf8b69e] .unitDialog_wrap .add_unit .add_unit_two_wrap .el-form-item {
  display: flex;
  margin-left: 40px;
}

.app-container[data-v-abf8b69e] .unitDialog_wrap .add_unit .add_unit_three_wrap .el-form-item:nth-child(2) {
  margin-left: 65px;
}

.app-container[data-v-abf8b69e] .unitDialog_wrap .add_unit .add_unit_three_wrap .el-form-item:nth-child(2) .el-input {
  width: 215px;
}

.el-row {

  display: flex;

  flex-wrap: wrap;

}
</style>
