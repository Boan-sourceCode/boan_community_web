<template>
  <div class="app-container">
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
              <img :src="'/dev-api'+buildingInfo.buildingPicture" alt="">
            </div>
          </div>
          <div class="center_container">
            <div class="top">
              <p>建筑物信息：</p>
            </div>
            <div class="info">
              <p>
                <span>所属网格：</span>
                <span>{{buildingInfo.areaName}}</span>
              </p>
              <p>
                <span>小区名称：</span>
                <span>{{buildingInfo.communityName}}</span>
              </p>
              <p>
                <span>建筑类型：</span>
                <span>{{buildingInfo.architectureType}}</span>
              </p>
              <p>
                <span>建筑用途：</span>
                <span>{{buildingInfo.architecturePurpose}}</span>
              </p>
              <p>
                <span>房屋产权：</span>
                <span>{{buildingInfo.housePropertyRight}}</span>
              </p>
              <p>
                <span>楼隐患类型：</span>
                <span>{{buildingInfo.hiddenDangerType}}</span>
              </p>
              <p>
                <span>楼隐患级别：</span>
                <span>{{buildingInfo.hiddenDangerLevel}}</span>
              </p>
              <p>
                <span>建筑面积：</span>
                <span>{{buildingInfo.buidingMeasure}}</span>
              </p>
              <p>
                <span>物业公司：</span>
                <span>{{buildingInfo.propertyName}}</span>
              </p>
              <p>
                <span>楼长：</span>
                <span>{{buildingInfo.buildingMaster}}</span>
              </p>
              <p>
                <span>标准地址：</span>
                <span>{{buildingInfo.buildingAddress}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <ul>
            <li>
              <p>实有人口</p>
              <p>{{Count.actualNum}}</p>
            </li>
            <li>
              <p>户籍人口</p>
              <p>{{Count.registeredNum}}</p>
            </li>
            <li>
              <p>未落户人口</p>
              <p>{{Count.unregisteredNum}}</p>
            </li>
            <li>
              <p>境外人口</p>
              <p>{{Count.foreignNum}}</p>
            </li>
            <li>
              <p>自住房屋</p>
              <p>{{Count.selfHouse}}</p>
            </li>
            <li>
              <p>租贷房屋</p>
              <p>{{Count.leaseHouse}}</p>
            </li>
            <li>
              <p>空置房屋</p>
              <p>{{Count.vacantHouse}}</p>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
    <div class="right_wrap">
      <div class="top_tabs">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="'居住人口('+ residentNumber + ')' " name="first">
            <el-card class="box-card" v-for="(item, index) in peopleList" :key="index" shadow="always">
              <el-popover placement="bottom" width="160" style="float: right;">
                <div style="text-align: center; margin: 0">
                  <!-- 编辑按钮 -->
                  <el-button type="primary" v-hasPermi="['system:house:cardEdit']" plain size="mini" style="border-radius: 6px" @click="handleEdit(item, index)">编辑</el-button>
                  <!-- 删除按钮 -->
                  <el-button type="danger" v-hasPermi="['system:house:cardDel']" plain size="mini" style="border-radius: 6px" @click="handleDelete(item, index)">移除</el-button>
                </div>
                <el-button class="card-btn" v-hasPermi="['system:house:operation']" slot="reference">操作</el-button>
              </el-popover>
              <div class="card_container">
                <p class="card_top">
                  <span>{{ item.relationship }}</span>
                  <span v-if="item.residentHouse === 0">常住</span>
                </p>
                <div class="card_center">
                  <div class="card_center_img">
                    <img v-if="item.headPortrait" :src="'/dev-api'+item.headPortrait" alt="">
                    <img v-if="!item.headPortrait" src="./img/man.jpg" alt="">
                  </div>
                  <div class="card_center_right">
                    <p>{{ item.name }}</p>
                    <p>{{ item.certificateId }}</p>
                    <p>
                      <span>户籍地址：</span>
                      <span>{{ item.hukouAddress }}</span>
                    </p>
                    <p>
                      <span>电话：</span>
                      <span>{{ item.phoneNumber }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <footer @click="goPeopleInfo(item)" style="cursor: pointer;">
                <p>查看人员详情</p>
              </footer>
            </el-card>
            <el-card class="add_box-card" v-if="noThing" shadow="always">
              <div class="left">
                <p class="icon-user"></p>
              </div>
              <div class="right">
                <p>暂无居住人员，请添加人员</p>
                <span v-hasPermi="['system:house:addPeople']" @click="addPeople">添加人员</span>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane :label="'户籍人口('+ hujiNumber + ')'" name="second">
            <el-card class="box-card" v-for="(item, index) in peopleList" :key="index" shadow="always">
              <el-popover placement="bottom" width="160" style="float: right;">
                <div style="text-align: center; margin: 0">
                  <!-- 编辑按钮 -->
                  <el-button type="primary" v-hasPermi="['system:house:cardEdit']" plain size="mini" style="border-radius: 6px" @click="handleEdit(item, index)">编辑</el-button>
                  <!-- 删除按钮 -->
                  <el-button type="danger" v-hasPermi="['system:house:cardDel']" plain size="mini" style="border-radius: 6px" @click="handleDelete(item, index)">删除</el-button>
                </div>
                <el-button class="card-btn" v-hasPermi="['system:house:operation']" slot="reference">操作</el-button>
              </el-popover>
              <div class="card_container">
                <p class="card_top">
                  <span>{{ item.relationship }}</span>
                  <span v-if="item.residentHouse === 0">常住</span>
                </p>
                <div class="card_center">
                  <div class="card_center_img">
                    <img v-if="item.headPortrait" :src="'/dev-api'+item.headPortrait" alt="">
                    <img v-if="!item.headPortrait" src="./img/man.jpg" alt="">
                  </div>
                  <div class="card_center_right">
                    <p>{{ item.name }}</p>
                    <p>{{ item.certificateId }}</p>
                    <p>
                      <span>户籍地址：</span>
                      <span>{{ item.hukouAddress }}</span>
                    </p>
                    <p>
                      <span>电话：</span>
                      <span>{{ item.phoneNumber }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <footer @click="goPeopleInfo(item)" style="cursor: pointer;">
                <p>查看人员详情</p>
              </footer>
            </el-card>
            <el-card class="add_box-card" v-if="noThing" shadow="always">
              <div class="left">
                <p class="icon-user"></p>
              </div>
              <div class="right">
                <p>暂无居住人员，请添加人员</p>
                <span v-hasPermi="['system:house:addPeople']" @click="addPeople">添加人员</span>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane :label="'工作('+ workNumber + ')'" name="third">
            <el-card class="box-card" v-for="(item, index) in peopleList" :key="index" shadow="always">
              <el-popover placement="bottom" width="160" style="float: right;">
                <div style="text-align: center; margin: 0">
                  <!-- 编辑按钮 -->
                  <el-button type="primary" v-hasPermi="['system:house:cardEdit']" plain size="mini" style="border-radius: 6px" @click="handleEdit(item, index)">编辑</el-button>
                  <!-- 删除按钮 -->
                  <el-button type="danger" v-hasPermi="['system:house:cardDel']" plain size="mini" style="border-radius: 6px" @click="handleDelete(item, index)">删除</el-button>
                </div>
                <el-button class="card-btn" v-hasPermi="['system:house:operation']" slot="reference">操作</el-button>
              </el-popover>
              <div class="card_container">
                <p class="card_top">
                  <span>{{ item.relationship }}</span>
                  <span v-if="item.residentHouse === 0">常住</span>
                </p>
                <div class="card_center">
                  <div class="card_center_img">
                    <img v-if="item.headPortrait" :src="'/dev-api'+item.headPortrait" alt="">
                    <img v-if="!item.headPortrait" src="./img/man.jpg" alt="">
                  </div>
                  <div class="card_center_right">
                    <p>{{ item.name }}</p>
                    <p>{{ item.certificateId }}</p>
                    <p>
                      <span>户籍地址：</span>
                      <span>{{ item.hukouAddress }}</span>
                    </p>
                    <p>
                      <span>电话：</span>
                      <span>{{ item.phoneNumber }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <footer @click="goPeopleInfo(item)" style="cursor: pointer;">
                <p>查看人员详情</p>
              </footer>
            </el-card>
            <el-card class="add_box-card" v-if="noThing" shadow="always">
              <div class="left">
                <p class="icon-user"></p>
              </div>
              <div class="right">
                <p>暂无居住人员，请添加人员</p>
                <span v-hasPermi="['system:house:addPeople']" @click="addPeople">添加人员</span>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="button" style="position: absolute; right: 48px; top: 60px;">
        <el-button v-hasPermi="['system:house:addEnterprise']" @click="addEnterprise">添加企业</el-button>
        <el-button v-hasPermi="['system:house:addPeople']" @click="addPeople">添加人员</el-button>
      </div>
    </div>
    <!-- 卡片编辑弹出框   -->
    <el-dialog title="编辑居住人员" :visible.sync="editFormVisible" class="add_people_dialog">
      <el-form :model="editForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" scope>
        <div class="two_wrap edit_wrap">
          <p>编辑居住人员信息</p>
          <el-form-item label="姓名" class="top">
            <el-input v-model="editForm.name" readonly class="one"></el-input>
          </el-form-item>
          <el-form-item label="身份证件号" class="top_two">
            <el-input v-model="editForm.idNumber" readonly class="one"></el-input>
          </el-form-item>
          <p class="change_info">设置人员与房屋信息</p>
          <div class="bottom">
            <el-form-item label="与房屋房主关系" prop="region" class="left">
              <el-select v-model="editForm.relationship" placeholder="请选择">
                <el-option v-for="dict in dict.type.relationship" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否常住本房屋" prop="date1" class="left right">
              <el-select v-model="editForm.residentHouse" placeholder="请选择">
                <el-option v-for="dict in dict.type.is_party_status" :label="dict.label" :value="dict.value"
                           :key="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="与本房屋户主关系" prop="type" class="left footer">
              <el-select v-model="editForm.relationshipRegister" placeholder="请选择">
                <el-option v-for="dict in dict.type.relationship_register" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <footer>
            <el-button type="primary" @click="editSave">确 定</el-button>
          </footer>
        </div>
      </el-form>
    </el-dialog>
    <!-- 添加居住人员弹出框   -->
    <el-dialog title="添加居住人员" :visible.sync="dialogFormVisible" class="add_people_dialog" :before-close="handleClose">
      <el-form :model="form" ref="ruleForm" class="demo-ruleForm" scope>
        <el-form-item v-show="showOne" style="position: relative">
          <p>请输入居住人员身份证号码</p>
          <el-input v-model="form.idcardNo" autocomplete="off" style="margin-bottom: 60px" placeholder="请先输入身份证号码后点击右侧图标进行查询有无该人员信息"></el-input>
          <span class="el-icon-search" style="position: absolute; top: 117px; right: 450px;cursor: pointer" @click="searchIdNumber"></span>
          <p v-if="hasPeopleInfo">系统暂无该证件人员信息，请添加</p>
          <el-button type="primary" v-if="hasPeopleInfo" @click="dialogAddPeople">添加人员</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" v-show="saveShow">确 定</el-button>
        </el-form-item>
        <div class="two_wrap" v-show="showTwo">
          <p>添加居住人员信息</p>
          <el-form-item label="姓名" prop="name" class="top">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证件号" prop="idNumber" class="top_two">
            <el-input v-model="form.idcardNo" placeholder="请输入身份证件号码"></el-input>
          </el-form-item>
          <el-form-item label="国籍：" prop="nationality" class="top_two top_three">
            <el-select clearable v-model="form.nationality" placeholder="请选择">
              <el-option
                v-for="dict in dict.type.nationality"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="籍贯" prop="nativePlace" class="top_two top_three">
            <el-input v-model="form.nativePlace" placeholder="请输入籍贯"></el-input>
          </el-form-item>
          <p class="change_info">设置人员与房屋信息</p>
          <div class="bottom">
            <el-form-item label="与房屋房主关系" prop="region" class="left">
              <el-select v-model="form.relationship" placeholder="请选择">
                <el-option v-for="dict in dict.type.relationship" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否常住本房屋" prop="date1" class="left right">
              <el-select v-model="form.residentHouse" placeholder="请选择">
                <el-option v-for="dict in dict.type.is_party_status" :label="dict.label" :value="dict.value"
                           :key="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="与本房屋户主关系" prop="type" class="left" style="margin-left: 32px">
              <el-select v-model="form.relationshipRegister" placeholder="请选择">
                <el-option v-for="dict in dict.type.relationship_register" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="bottom bottom_0">
            <el-form-item label="民族" prop="type" class="left" style="margin-left: 116px" v-if="form.nationality=='中国'">
              <el-select v-model="form.nation" placeholder="请选择">
                <el-option v-for="dict in dict.type.nation" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件类型" prop="certificateType" class="left" style="margin-left: 69px">
              <el-select v-model="form.certificateType" placeholder="请选择">
                <el-option v-for="dict in dict.type.certificate_type" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌" prop="politicalStatus" class="left" style="margin-left: 85px">
              <el-select v-model="form.politicalStatus" placeholder="请选择">
                <el-option v-for="dict in dict.type.political_status" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="bottom bottom_0">
          </div>
          <div class="bottom bottom_0">
            <el-form-item label="是否重点关注人员" prop="concernStatus" class="left" style="margin-left: 30px">
              <el-select v-model="form.concernStatus" placeholder="请选择">
                <el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="婚姻状况" prop="maritalStatus" class="left" style="margin-left: 69px">
              <el-select v-model="form.maritalStatus" placeholder="请选择">
                <el-option v-for="dict in dict.type.marital_status" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <footer style="display: flex; justify-content: center">
            <el-button type="primary" @click="addSave">确 定</el-button>
          </footer>
        </div>
        <div class="two_wrap three_wrap" v-show="showThree">
          <p>添加居住人员信息</p>
          <el-table :data="tabList" :border="true">
            <el-table-column label="姓名" prop="name" width="80" align="center"/>
            <el-table-column label="证件类型" prop="certificateType" :show-overflow-tooltip="true" width="80" align="center"/>
            <el-table-column label="证件号码" prop="certificateId" :show-overflow-tooltip="true" width="180" align="center"/>
            <el-table-column label="性别" prop="sex" width="80" align="center"/>
            <el-table-column label="民族" prop="nation" width="110" align="center"/>
            <el-table-column label="国籍" prop="nationality" width="90" align="center"/>
            <el-table-column label="籍贯" prop="nativePlace" width="90" align="center"/>
            <el-table-column label="出生日期" prop="birthday" width="160" align="center"/>
            <el-table-column label="婚姻状况" prop="maritalStatus" width="90" align="center"/>
            <el-table-column label="是否重点人员关注" prop="concernStatus" width="150" align="center"/>
            <el-table-column label="联系方式" prop="phoneNumber" align="center"/>
          </el-table>
          <p class="change_info">设置人员与房屋信息</p>
          <div class="bottom">
            <el-form-item label="与房屋房主关系" prop="region" class="left">
              <el-select v-model="showThreeParams.relationship" placeholder="请选择">
                <el-option v-for="dict in dict.type.relationship" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否常住本房屋" prop="date1" class="left right">
              <el-select v-model="showThreeParams.residentHouse" placeholder="请选择">
                <el-option v-for="dict in dict.type.is_party_status" :label="dict.label" :value="dict.value"
                           :key="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="与本房屋户主关系" prop="type" class="left" style="margin-left: 32px">
              <el-select v-model="showThreeParams.relationshipRegister" placeholder="请选择">
                <el-option v-for="dict in dict.type.relationship_register" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <footer style="display: flex; justify-content: center">
            <el-button type="primary" @click="addSaveShowThree">确 定</el-button>
          </footer>
        </div>
      </el-form>
    </el-dialog>
    <!-- 添加企业弹出框   -->
    <el-dialog title="添加企业" :visible.sync="enterpriseVisible" class="add_people_dialog" :before-close="handleEnterpriseClose">
      <el-form :model="enterpriseForm" ref="ruleForm" class="demo-ruleForm" scope>
        <el-form-item v-show="enterpriseShowOne" style="position: relative">
          <p>请输入企业名称</p>
          <el-input v-model="enterpriseForm.enterName" autocomplete="off" style="margin-bottom: 60px" placeholder="请先输入企业名称后点击右侧图标进行查询有无该企业信息"></el-input>
          <span class="el-icon-search" style="position: absolute; top: 117px; right: 450px;cursor: pointer" @click="searchEnterprise"></span>
          <p v-if="hasEnterpriseInfo">系统暂无该企业信息，请添加</p>
          <el-button type="primary" v-if="hasEnterpriseInfo" @click="dialogAddEnterprise">添加企业</el-button>
          <el-button type="primary" @click="enterpriseVisible = false" v-show="enterpriseSaveShow">确 定</el-button>
        </el-form-item>
        <div class="two_wrap" v-show="enterpriseShowTwo">
          <p>添加企业信息</p>
          <div class="bottom">
            <el-form-item label="企业名称：" prop="enterName" class="left" label-width="148px">
              <el-input clearable v-model="enterpriseForm.enterName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="组织类型：" prop="groupType" class="left right" label-width="148px">
              <el-select clearable v-model="enterpriseForm.groupType" placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.organization_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业类型：" prop="enterType" class="left" label-width="148px">
              <el-select clearable v-model="enterpriseForm.enterType" placeholder="请选择">
                <el-option
                  v-for="dict in dict.type.enterprise_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="bottom">
            <el-form-item label="企业证件登记号：" prop="certRegisterNo" class="left" label-width="148px">
              <el-input clearable v-model="enterpriseForm.certRegisterNo" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="登记机关：" prop="registerAuthority" class="left right" label-width="148px">
              <el-input clearable v-model="enterpriseForm.registerAuthority" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="bottom">
            <el-form-item label="法定代表人姓名：" prop="legalRepresentName" class="left" label-width="148px">
              <el-input clearable v-model="enterpriseForm.legalRepresentName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="法人代表证件号：" prop="legalRepresentCertid" class="left right" label-width="148px">
              <el-input clearable v-model="enterpriseForm.legalRepresentCertid" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="法人代表联系方式：" prop="legalRepresentPhone" class="left" label-width="148px">
              <el-input clearable v-model="enterpriseForm.legalRepresentPhone" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="bottom">
            <el-form-item label="负责人姓名：" prop="securityChargeName" class="left" label-width="148px">
              <el-input clearable v-model="enterpriseForm.securityChargeName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="负责人证件号：" prop="securityChargeCertid" class="left right" label-width="148px">
              <el-input clearable v-model="enterpriseForm.securityChargeCertid" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="负责人联系方式：" prop="securityChargePhone" class="left" label-width="148px">
              <el-input clearable v-model="enterpriseForm.securityChargePhone" placeholder="请输入" />
            </el-form-item>
          </div>
          <footer style="display: flex; justify-content: center">
            <el-button type="primary" @click="addSaveEnterprise">确 定</el-button>
          </footer>
        </div>
        <div class="two_wrap three_wrap" v-show="enterpriseShowThree">
          <p>添加企业信息</p>
          <el-table :data="enterpriseTabList" :border="true">
            <el-table-column align="center" width="36">
              <template slot-scope="scope">
                <el-radio :label="scope.row.id" v-model="checked">{{''}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="企业名称" prop="enterName" align="center"/>
            <el-table-column label="组织类型" prop="groupType" align="center"/>
            <el-table-column label="企业类型" prop="enterType" align="center"/>
            <el-table-column label="企业证件登记号" prop="certRegisterNo" align="center"/>
            <el-table-column label="登记机关" prop="registerAuthority" align="center"/>
            <el-table-column label="法定代表人姓名" prop="legalRepresentName" align="center"/>
            <el-table-column label="法人代表证件号" prop="legalRepresentCertid" width="162" align="center"/>
            <el-table-column label="法人代表联系方式" prop="legalRepresentPhone" align="center"/>
            <el-table-column label="负责人姓名" prop="securityChargeName" align="center"/>
            <el-table-column label="负责人证件号" prop="securityChargeCertid" width="162" align="center"/>
            <el-table-column label="负责人联系方式" prop="securityChargePhone" align="center"/>
          </el-table>
          <footer style="display: flex; justify-content: center;margin-top: 20px">
            <el-button type="primary" @click="addEnterpriseShowThree">确 定</el-button>
          </footer>
        </div>
      </el-form>
    </el-dialog>
    <!-- 编辑楼房弹窗 -->
    <el-dialog
      :visible.sync="dialogEdit"
      title="编辑楼房/院落"
      width="70%"
      :close-on-click-modal="false"
      @close="cancel('editForm')"
      class="building_dialog_wrap">
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
            <p class="title">楼栋信息：</p>
            <div class="edit_dialog_top">
              <el-form-item label="所属小区：">
                <el-select v-model="buildEditForm.communityName" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in areaList"
                    :key="item.id"
                    :label="item.communityName"
                    :value="item.id"
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
                <el-select v-model="buildEditForm.architecturePurpose" placeholder="请选择">
                  <el-option
                    v-for="item in dingpulldown"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼房产权：">
                <el-select v-model="buildEditForm.housePropertyRight" placeholder="请选择">
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
                <el-select v-model="buildEditForm.hiddenDangerType" placeholder="请选择">
                  <el-option
                    v-for="dict in dict.type.building_danger_type"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼房隐患级别：">
                <el-select v-model="buildEditForm.hiddenDangerLevel" placeholder="请选择">
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
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
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
    <!--标注弹窗-->
    <el-dialog
      :visible.sync="dialogAnnotate"
      title="绘制网格"
      width="70%"
      height="600px"
      class="map"
      ref="dialogDataBuilding"
      :close-on-click-modal="false"
      @close="closeMap()">
      <gridMap :mapData = 'mapData' :dialogAnnotate = 'dialogAnnotate' @coordinates="coordinates"></gridMap>
    </el-dialog>

  </div>
</template>

<script>
import {getBuildingInfoLeft,returnDefaultBuild, updateBuliding, updateGIS, getCount, getArchiPurposeByType,getPeopleById,editPeopleInfo,deleteBaHousepeopleRelationshipByShipId,updatePeopleInfo,judgeCertificateId,insertHaveNotPeople,insertHavePeople,judgeEnterprise,addEnterprise,enterRelationship} from '@/api/area/house'
import Cookies from "js-cookie";
import VueTagsInput from '@johmun/vue-tags-input' // 输入框标签插件
import gridMap from "@/components/gridMap/index";  //标注地图
export default {
  dicts:[
    'building_type',
    'house_property_right',
    'building_danger_type',
    'focous_degree',
    'nationality',
    'relationship',
    'relationship_register',
    'is_party_status',
    'nation',
    'certificate_type',
    'political_status',
    'marital_status',
    'organization_type',
    'enterprise_type',
  ],
  name: "basicsInfo",
  components: {
    gridMap,
    VueTagsInput
  },
  data () {
    return {
      buildingInfo: {}, // 调取接口存储左侧卡片信息数据
      Count:{}, // 实有建筑 -楼房详情页 - 实有人口数据
      dialogEdit: false, // 编辑楼房弹窗展示状态
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
        hiddenDangerType:null,
        buildingPicture: '',
        admin:'',
        updateBy: ''
      },
      editDialogInfo: {}, // 点击左侧卡片编辑楼房保存默认展示信息
      managerInput: '', // 楼长输入框双向绑定
      managerList: [], // 添加楼长存储集合
      dialogAnnotate:false,  //地图弹窗
      mapData:{
        build:'',
        gridCenter:'',  //给地图传参（中心点）
        areaId:'',  //给地图传参（id）
      },
      buildingTemplate:'',   // 详细建筑/基础建筑
      houseType:'',   // 单元楼/非单元楼/院落
      areaId: '',
      dingpulldown:[],// 实有建筑-编辑楼房-选择建筑类型建筑用途列表数据
      // 所属小区下拉数据
      areaList: [],
      params: {
        id: this.$route.query.id,
      },
      activeName: 'first',
      residentNumber: '', // 居住人口总数
      hujiNumber: '', // 户籍人口总数
      workNumber: '', // 工作人口总数
      peopleList: [],
      noThing: false, // 没有人员的情况下需要显示添加人员卡片
      editFormVisible: false, // 编辑弹出框
      editForm: { // 编辑弹出框表单信息/点击确定更新数据参数
        name: '', // 姓名
        idNumber: '', // 身份证号
        shipId: '', // 人员编号
        relationship: '', // 与房屋房主关系
        residentHouse: '', // 是否常住本房屋
        relationshipRegister: '', // 与户主关系
      },
      editParams: {
        peopleId: '',
        houseId: ''
      },
      dialogFormVisible: false,
      form: {
        buildingTemplate:'基础建筑',
        addUser: '', // 登录名
        name: '', // 姓名
        idcardNo: '', // 身份证号
        relationship: '', // 与房屋房主关系
        residentHouse: '', // 是否常住本房屋
        relationshipRegister: '', // 与户主关系
        houseId: '', // 房屋编号,
        nationality: '', // 国籍
        nativePlace: '', // 籍贯
        nation: '', // 民族
        certificateType: '', // 证件类型
        politicalStatus: '', // 政治面貌
        concernStatus: '', // 是否重点关注人员
        maritalStatus: '', // 婚姻状况
      },
      showOne: true, // 添加人员弹出框第一次展示状态
      showTwo: false, // 添加人员弹出框第二次展示状态
      howTwo: false, // 添加人员弹出框第二次展示状态
      hasPeopleInfo: false, // 添加人员弹出窗 - 根据输入身份证提示有无该人员提示以及添加人员按钮展示状态
      showThree: false,
      tabList: [],
      showThreeParams: {
        buildingTemplate:'基础建筑',
        addUser: '',
        houseId: '',
        idcardNo: '',
        relationship: '',
        relationshipRegister: '',
        residentHouse: ''
      },
      getPeopleParams: {
        houseId: this.$route.query.id,
        flag: 0
      },
      updatePeople: {},
      saveShow: false, // 添加人员弹出框确定按钮

      enterpriseTabList: [],
      enterpriseShowThree: false,
      hasEnterpriseInfo: false, // 添加企业弹出窗 - 根据输入身份证提示有无该人员提示以及添加人员按钮展示状态
      enterpriseShowOne: true, // 添加企业弹出框第一次展示信息
      enterpriseShowTwo: false, // 添加企业弹出框第二次展示状态
      enterpriseSaveShow: false, // 添加企业弹出框确定按钮
      enterpriseVisible: false, // 添加企业弹出框
      checked: '', //企业选择单选是否选中
      enterpriseForm: { // 添加企业弹出框表单信息
        buildingTemplate:'基础建筑',
        houseId:'',
        enterName: '', //企业名称
        groupType: '',
        enterType: '',
        certRegisterNo: '',
        registerAuthority: '',
        legalRepresentName: '',
        legalRepresentCertid: '',
        legalRepresentPhone: '',
        securityChargeName: '',
        securityChargeCertid: '',
        securityChargePhone: '',
      },
      enterpriseParams:{
        buildingTemplate:'基础建筑',
        houseId: this.$route.query.houseId,
        enterId:'',
      },
      enterpriseList: [],
      enterpriseCard:false,
      rules: {
        // 校验姓名
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          {pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文'}
        ],
        // 校验身份证号
        idcardNo: [
          { required: true, message: '请输入身份证件号', trigger: 'change' },
          {pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确' }
        ],
        nationality: [
          { required: true, message: '请输入国籍', trigger: 'blur' },
        ],
        nativePlace: [
          { required: true, message: '请输入籍贯', trigger: 'blur' },
        ],
        // 校验与房屋房主关系
        relationship: [
          { required: true, message: '请选择与房屋房主关系', trigger: 'change' }
        ],
        // 校验是否常住本房屋
        residentHouse: [
          {required: true, message: '是否常住本房屋', trigger: 'change' }
        ],
        // 校验与户主关系
        relationshipRegister: [
          {required: true, message: '请选择与本房屋户主关系', trigger: 'change' }
        ],
        nation: [
          {required: true, message: '请选择民族', trigger: 'change' }
        ],
        certificateType: [
          {required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        politicalStatus: [
          {required: true, message: '请选择政治面貌', trigger: 'change' }
        ],
        concernStatus: [
          {required: true, message: '请选择是否重点关注人员', trigger: 'change' }
        ],
        maritalStatus: [
          {required: true, message: '请选择婚姻状况', trigger: 'change' }
        ],
      },
    }
  },
  created() {
    this.getInfoLeft()
    this.getPeopleInfo()
  },
  methods: {
    // 查询左侧卡片部分信息
    getInfoLeft () {
      getBuildingInfoLeft (this.params).then((res) => {
        if (res.code === 200) {
          this.buildingInfo = res.data[0]
          this.buildingTemplate = this.buildingInfo.buildingTemplate
          this.houseType = this.buildingInfo.houseType
          this.areaId = this.buildingInfo.areaId
          //调用实有人口数据函数
          this.getgetCount()
        }
      })
    },

    // 实有建筑 -楼房详情页 - 实有人口数据
    getgetCount () {
      let params = {
        areaId: this.buildingInfo.areaId,
        communityId: this.buildingInfo.communityId,
        buildingPrefix : this.buildingInfo.buildingPrefix,
        buidingNumber: this.buildingInfo.buidingNumber
      }
      getCount (params).then((res) => {
        if (res.code === 200) {
          this.Count = res.data
        }
      })
    },

    // 房屋操作 - 左侧楼房编辑按钮
    buildingEdit () {
      let params = {
        id: this.buildingInfo.id
      }
      returnDefaultBuild (params).then((res) => {
        if (res.code === 200) {
          this.editDialogInfo = res.data[0]
          this.buildEditForm = this.editDialogInfo
          this.dialogEdit = true
          let a = []
          if(this.editDialogInfo.buildingMaster !== null && this.editDialogInfo.buildingMaster !== ''){
            a = this.editDialogInfo.buildingMaster.split(',')
            a.map((item) => {
              if (this.managerList.indexOf(item) === -1) {
                this.managerList.push(item)
              }
            })
          }else{}
        }
      })
    },

    // 编辑遮罩层 - 添加楼长之后显示的tab删除按钮
    canelManager (item, index) {
      this.managerList.splice(index,1)
    },
    // 编辑遮罩层 - 添加楼长按钮
    addManager () {
    	if(this.managerInput){
	      this.managerList.push(this.managerInput)
	      this.managerInput = ''
    	}else{
    		this.$message.error('请输入楼长姓名')
    	}
    },
    // 编辑的取消按钮
    cancel() {
      this.dialogEdit = false;
    },

    buildSubmitForm () { // 左侧楼房卡片编辑弹窗保存按钮
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
      updateBuliding (editForm).then((res) => {
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
    coordinates(value,id) {
      // value 就是子组件传递过来的数据
      console.log('子组件传参==',value,id);
      var param  = {
        id : id,
        gis : value.areaCenter,
      }
      updateGIS(param).then((response) => {
        this.$modal.msgSuccess("保存成功");
        this.dialogAnnotate = false;
        this.getInfoLeft();
      });
    },
    //关闭标注弹窗
    closeMap(){
      this.dialogAnnotate = false;
    },

    // 实有建筑-编辑楼房-选择建筑类型调用接口渲染建筑用途
    Buildingpulldown() {
      let params = {
        architectureType:  this.buildEditForm.architectureType, // 建筑类型
      }
      console.log(params)
      getArchiPurposeByType (params).then((res) => {
        if (res.code === 200) {
          this.dingpulldown = res.data
          console.log(this.dingpulldown)
        }
      })
    },

    handleClick(tab, event) {
      console.log(tab.name, event);
      if (tab.name === 'first') {
        this.getPeopleParams.flag = 0
        this.loading = true
        this.getPeopleInfo()
      } else if (tab.name === 'second') {
        this.getPeopleParams.flag = 1
        this.loading = true
        this.getPeopleInfo()
      } else if (tab.name === 'third') {
        this.getPeopleParams.flag = 2
        this.loading = true
        this.getPeopleInfo()
      }
    },

    // 根据房屋ID获取房屋下的人员信息
    getPeopleInfo () {
      getPeopleById (this.getPeopleParams).then((res) => {
        if (res.code === 200) {
          this.peopleList = res.data[0]
          if (this.peopleList.length <= 0) {
            this.noThing = true
          } else {
            this.noThing = false
          }
          this.residentNumber = res.data[1].residentNumber
          this.hujiNumber = res.data[1].hujiNumber
          this.workNumber = res.data[1].workNumber
        }
      })
    },

    // 操作 - 卡片单元编辑按钮
    handleEdit (item, index) {
      console.log(item, index);
      this.editParams.peopleId = item.id
      this.editParams.houseId = item.houseId
      editPeopleInfo (this.editParams).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.editForm.name = res.data[0].name
          this.editForm.idNumber = res.data[0].certificateId
          this.editForm.relationship = res.data[0].relationship
          this.editForm.residentHouse = res.data[0].residentHouse
          this.editForm.relationshipRegister = res.data[0].relationshipRegister
          this.editForm.shipId = res.data[0].shipId
        }
      })
      this.editFormVisible = true
    },

    // 操作 - 删除按钮
    handleDelete (item, index) {
      console.log(item);
      let params = {
        shipId: item.shipId
      }
      this.$modal
        .confirm('是否确认删除居住人员-居住人"' + item.name + '"的信息？')
        .then(() => {
          deleteBaHousepeopleRelationshipByShipId (params).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.getPeopleInfo()
              this.getHouseInfoLeft()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {});
    },

    // 查看人员详情
    goPeopleInfo (item) {
      console.log(item);
      const src = `/population/populationDetails`;
      this.$router.push({
        path: src,
        query:{id:item.id}
      });
    },

    // 添加人员按钮
    addPeople () {
      this.dialogFormVisible = true
      this.showOne = true
    },
		getHouseInfoLeft(){},
    // 编辑弹框确定按钮
    editSave () {
      this.updatePeople = this.editForm
      if (this.editForm.residentHouse === '是') {
        this.updatePeople.residentHouse = 0
      } else if (this.editForm.residentHouse === '否') {
        this.updatePeople.residentHouse = 1
      }
      updatePeopleInfo (this.updatePeople).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.editFormVisible = false
          this.$message.success('修改成功')
          this.getPeopleInfo()
          this.getHouseInfoLeft()
        }
      })
      console.log(this.updatePeople);
    },

    // 查询输入身份证
    searchIdNumber () {
      let params = {
        certificateId: this.form.idcardNo
      }
      let idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      console.log(params);
      if (!idCardReg.test(params.certificateId)) {
        this.$message.error('身份证输入不正确')
      } else {
        judgeCertificateId (params).then((res) => {
          if (res.code === 200) {
            this.showOne = false
            this.showThree = true
            this.tabList = res.data
            this.showThreeParams = res.data[0]
            console.log(this.showThreeParams);
          } else if (res.code === 201) {
            // this.$message.info(res.msg)
            this.hasPeopleInfo = true
          }
        })
      }
    },

    // 弹窗添加人员按钮
    dialogAddPeople () {
      this.showOne = false
      this.showTwo = true
      this.saveShow = false
    },

    // 添加人员弹出框确定按钮
    addSave () {
      console.log(this.form);
      if (this.form.name === '') {
        this.$message.error('请输入人员姓名！')
      } else if (this.form.idcardNo === '') {
        this.$message.error('请输入人员身份证件号！')
      } else if (this.form.nationality === '') {
        this.$message.error('请输入国籍！')
      } else if (this.form.nativePlace === '') {
        this.$message.error('请输入籍贯！')
      } else if (this.form.relationship === '') {
        this.$message.error('请选择与房屋房主关系！')
      } else if (this.form.residentHouse === '') {
        this.$message.error('请选择是否常住本房屋！')
      } else if (this.form.relationshipRegister === '') {
        this.$message.error('请选择与本房屋户主关系！')
//    } else if (this.form.nation === '') {
//      this.$message.error('请选择民族！')
      } else if (this.form.certificateType === '') {
        this.$message.error('请选择证件类型！')
      } else if (this.form.politicalStatus === '') {
        this.$message.error('请选择政治面貌！')
      } else if (this.form.concernStatus === '') {
        this.$message.error('请选择是否重点关注人员')
      } else if (this.form.maritalStatus === '') {
        this.$message.error('请选择婚姻状况')
      } else {
        this.form.houseId = this.buildingInfo.id
        this.form.addUser = Cookies.get('username')
        console.log(this.buildingInfo.id);
        insertHaveNotPeople (this.form).then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.showTwo = false
            this.dialogFormVisible = false
            this.$message.success(res.msg)
            this.getPeopleInfo()
            this.getHouseInfoLeft()
            this.form.idcardNo = ''
            this.hasPeopleInfo = false
            console.log(this.form);
            this.form = {}
          }
        })
      }
    },

    addSaveShowThree () {
      this.showThreeParams.houseId = this.buildingInfo.id
      this.showThreeParams.addUser = Cookies.get('username')
      this.showThreeParams.buildingTemplate = '基础建筑'
      console.log(this.showThreeParams);
      insertHavePeople (this.showThreeParams).then((res) => {
        if (res.code === 200) {
          this.showThree = false
          this.dialogFormVisible = false
          this.$message.success(res.msg)
          this.form.idcardNo = ''
          this.getPeopleInfo()
          this.getHouseInfoLeft()
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    // 添加人员弹出窗箭头关闭按钮
    handleClose () {
      this.showTwo = false
      this.showThree = false
      this.dialogFormVisible = false
      this.form.idcardNo = ''
      this.hasPeopleInfo = false
    },

    // 添加企业按钮
    addEnterprise () {
      this.enterpriseVisible = true
      this.enterpriseShowOne = true
      this.hasEnterpriseInfo=false
			this.enterpriseShowTwo=false
			this.enterpriseForm={}
    },
    // 查询输入企业名称
    searchEnterprise () {
      let params = {
        enterName: this.enterpriseForm.enterName
      }
      console.log(params)
      judgeEnterprise (params).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.enterpriseShowOne = false
          this.enterpriseShowThree = true
          this.enterpriseTabList = res.data
        } else if (res.code === 201) {
          // this.$message.info(res.msg)
          this.hasEnterpriseInfo = true
        }
      })
    },
    // 弹窗添加企业按钮
    dialogAddEnterprise () {
      this.enterpriseShowOne = false
      this.enterpriseShowTwo = true
      this.enterpriseSaveShow = false
    },
    // 添加企业弹出框确定按钮
    addSaveEnterprise () {
      console.log(this.enterpriseForm)
      if (this.enterpriseForm.enterName === '') {
        this.$message.error('请输入企业名称！')
      } else if (this.enterpriseForm.groupType === '') {
        this.$message.error('请选择组织类型！')
      } else if (this.enterpriseForm.enterType === '') {
        this.$message.error('请选择企业类型')
      } else if (this.enterpriseForm.certRegisterNo === '') {
        this.$message.error('请输入企业证件登记号！')
      } else if (this.enterpriseForm.registerAuthority === '') {
        this.$message.error('请输入登记机关！')
      } else if (this.enterpriseForm.legalRepresentName === '') {
        this.$message.error('请输入法定代表人姓名！')
      } else if (this.enterpriseForm.legalRepresentCertid === '') {
        this.$message.error('请输入法人代表证件号！')
      } else if (this.enterpriseForm.legalRepresentPhone === '') {
        this.$message.error('请输入法人代表联系方式！')
      } else if (this.enterpriseForm.securityChargeName === '') {
        this.$message.error('请输入负责人姓名！')
      } else if (this.enterpriseForm.securityChargeCertid === '') {
        this.$message.error('请输入负责人证件号！')
      } else if (this.enterpriseForm.securityChargePhone === '') {
        this.$message.error('请输入负责人联系方式！')
      } else {
        this.enterpriseForm.houseId = this.buildingInfo.id
        console.log(this.enterpriseForm);
        addEnterprise (this.enterpriseForm).then((res) => {
          if (res.code === 200) {
            this.enterpriseShowThree = false
            this.enterpriseVisible = false
            this.$message.success(res.msg)
            this.enterpriseForm.enterName = ''
            this.getPeopleInfo()
            this.getHouseInfoLeft()
          }
        })
      }
    },
    // 添加企业弹出窗箭头关闭按钮
    handleEnterpriseClose () {
      this.enterpriseShowTwo = false
      this.enterpriseShowThree = false
      this.enterpriseVisible = false
      this.enterpriseForm.enterName = ''
      this.hasEnterpriseInfo = false
    },
    //添加企业确定按钮
    addEnterpriseShowThree () {
      console.log(this.checked)
      this.enterpriseParams.houseId = this.buildingInfo.id
      this.enterpriseParams.enterId = this.checked
      console.log(this.enterpriseParams);
      enterRelationship (this.enterpriseParams).then((res) => {
        if (res.code === 200) {
          this.enterpriseShowThree = false
          this.enterpriseVisible = false
          this.$message.success(res.msg)
          this.enterpriseForm.enterName = ''
          this.getPeopleInfo()
          this.getHouseInfoLeft()
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  ul, li {
    padding: 0;
    margin: 0;
    list-style: none
  }
  p, span {
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
  .right_wrap {
    width: 80%;
    margin-left: 29px;
    ::v-deep .top_tabs {
      .el-tabs--card {
        .el-tabs__header {
          margin-top: 40px;
          border: none;
          .el-tabs__nav {
            border-bottom: 1px !important;
            .el-tabs__item {
              width: 122px;
              height: 34px;
              line-height: 34px;
              text-align: center;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #1F79F3;
              border: 1px solid #1F79F3;
              &:nth-child(1) {
              }
              &:nth-child(2) {
                border-left: none;
                border-right: none;
              }
              &#tab-third {
              }
              &.is-active {
                background-color: #1F79F3;
                color: #FFF;
              }
            }
          }
        }
      }
    }
    ::v-deep .el-card {
      width: 30%;
      border-radius: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
      .card_container {
        .card_top {
          margin-top: 0;
          span {
            display: inline-block;
            width: 41px;
            height: 21px;
            line-height: 21px;
            text-align: center;
            font-size: 12px;
            font-weight: 400;
            color: #FDFFFF;
            &:nth-child(1) {
              background-color: #F27463;
            }
            &:nth-child(2) {
              background-color: #3BC2B4;
              margin-left: 6px;
            }
          }
        }
        .card_center {
          display: flex;
          .card_center_img {
            width: 101px;
            height: 131px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .card_center_right {
            p {
              margin: 0 0 0 20px;
              &:nth-child(1) {
                font-size: 18px;
                font-weight: bold;
                color: #000000;
              }
              &:nth-child(2) {
                font-size: 14px;
                color: #000000;
                font-weight: bold;
                margin-top: 5px;
              }
              &:nth-child(3) {
                margin-top: 15px;
                span {
                  font-size: 12px;
                  font-weight: 400;
                  color: #666666;
                }
              }
              &:nth-child(4) {
                span {
                  font-size: 12px;
                  font-weight: 400;
                  color: #666666;
                }
              }
            }
          }
        }
      }
      footer {
        height: 25px;
        background-color: #F2F6FF;
        border-radius: 5px;
        margin: 20px auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 12px;
          font-weight: 400;
          color: #666666;
        }
      }
    }
    ::v-deep .el-tab-pane {
      display: flex;
      flex-wrap: wrap;
    }
    .button {
      .el-button {
        border-color: #1F79F3;
        color: #1F79F3;
      }
    }
  }
  .add_box-card {
    ::v-deep .el-card__body {
      height: 100%;
      display: flex;
      align-items: center;
      .left {
        width: 101px;
        height: 132px;
        background-color: #E6EDFF;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-user {
          margin: 0;
          color: #FFF;
          font-size: 48px;
        }
      }
      .right {
        margin-left: 19px;
        p {
          margin: 0;
          font-size: 14px;
          font-weight: 400;
          color: #999999;
        }
        span {
          margin-top: 18px;
          display: block;
          width: 90px;
          height: 34px;
          border: 1px solid #1F79F3;
          color: #1F79F3;
          border-radius: 5px;
          font-size: 14px;
          line-height: 34px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
  ::v-deep .add_people_dialog {
    .el-dialog {
      top: 12%;
      width: 70%;
      .el-dialog__header {
        border: 1px solid #EEEEEE;
        padding-top: 5px;
        padding-bottom: 5px;
        .el-dialog__title {
          font-size: 14px;
          font-weight: bold;
          color: #000000;
        }
        .el-dialog__headerbtn {
          top: 10px;
          right: 10px;
        }
      }
      .el-dialog__body {
        .el-form-item__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          p {
            font-size: 20px;
            font-weight: bold;
            color: #000000;
            text-align: center;
            margin: 50px 0 20px 0;
            &:nth-child(4) {
              font-size: 12px;
              font-weight: 400;
              color: #FF0000;
              margin: 0 0 51px 0;
            }
          }
          .el-input {
            width: 423px;
            height: 35px;
          }
          .el-button {
            width: 131px;
            height: 33px;
            line-height: 33px;
            padding: 0;
          }
        }
        .two_wrap {
          p {
            font-size: 20px;
            font-weight: bold;
            color: #000000;
            text-align: center;
            margin: 0 0 20px 0;
            &.change_info {
              margin-top: 40px;
            }
          }
          .top {
            display: flex;
            justify-content: center;
            .el-form-item__label {
              font-size: 14px;
              font-weight: 400;
              color: #000000;
            }
            .el-form-item__label:before {
              content: '';
            }
            .el-form-item__label:after {
              content: "*";
              color: #ff4949;
              margin-right: 0.25rem;
            }
            .el-form-item__content {
              margin: 0;
              display: block;
              .el-input {
                width: 575px;
                height: 35px;
              }
            }
          }
          .top_two {
            display: flex;
            justify-content: center;
            margin-right: 38px;
            .el-form-item__label {
              font-size: 14px;
              font-weight: 400;
              color: #000000;
            }
            .el-form-item__label:before {
              content: '';
            }
            .el-form-item__label:after {
              content: "*";
              color: #ff4949;
              margin-right: 0.25rem;
            }
            .el-form-item__content {
              margin: 0;
              display: block;
              .el-input {
                width: 575px;
                height: 35px;
              }
            }
          }
          .top_three {
            margin-right: 0;
            display: flex;
            justify-content: center;
          }
          .bottom {
            display: flex;
            .left {
              margin-left: 45px;
              display: flex;
              .el-form-item__label {
                font-size: 14px;
                font-weight: 400;
                color: #000000;
              }
              .el-form-item__label:before {
                content: '';
              }
              .el-form-item__label:after {
                content: "*";
                color: #ff4949;
                margin-right: 0.25rem;
              }
              .el-form-item__content {
                margin: 0 !important;
                .el-input {
                  width: 215px;
                  height: 35px;
                }
              }
              &.right {
                margin-left: 31px;
              }
            }
          }
          .footer {
            margin-left: 31px;
            .el-form-item__label {
              font-size: 14px;
              font-weight: 400;
              color: #000000;
            }
            .el-form-item__label:before {
              content: '';
            }
            .el-form-item__label:after {
              content: "*";
              color: #ff4949;
              margin-right: 0.25rem;
            }
            .el-form-item__content {
              display: block;
              margin: 0 !important;
              .el-input {
                width: 215px;
                height: 35px;
              }
            }
          }
        }
      }
    }
  }
  .edit_wrap {
    ::v-deep .el-form-item__content {
      .one {
        .el-input__inner {
          background-color: #CCC;
        }
      }
    }
    footer {
      width: 100%;
      display: flex;
      justify-content: center;
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
            height: 35px;
            background-color: #ededed;
            display: flex;
            align-items: center;
            p {
              margin: 0 0 0 10px;
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
        .more{
          display: inline-block;
          float: right;
          cursor: pointer;
          width: 67px !important;
          height: 36px;
          text-align: center;
          margin-left: 6px;
          p{
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
</style>
