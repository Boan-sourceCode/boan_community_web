<template>
  <div class="app-container">
    <div class="left_card_wrap">
      <el-card class="box-card">
        <div class="center">
          <div class="center_top">
            <div class="title">
              <p>{{ params.name }}</p>
              <p v-if="buildingInfo.buildingType === '单元'">{{buildingInfo.unitNumber}}/{{buildingInfo.houseNumber}}</p>
              <p v-if="buildingInfo.buildingType === '非单元'">{{buildingInfo.houseNumber}}</p>
            </div>
            <div>
              <div class="top_button" v-hasPermi="['system:house:edit']" @click="buildingEdit">
                <span>编辑</span>
              </div>
              <div class="icon-house"></div>
            </div>
          </div>
          <div class="center_container">
            <p class="homeowner" v-if="buildingInfo.peopleName !== null && buildingInfo.peopleName !== ''">房主：{{ buildingInfo.peopleName }}</p>
            <p class="homeowner" v-else>房主：无</p>
            <div class="top">
              <p>房屋基本信息：</p>
            </div>
            <div class="info">
              <p>
                <span v-if="buildingInfo.id !== null && buildingInfo.id !== ''">房屋编号：{{buildingInfo.id}}</span>
                <span v-else>房屋编号：无</span>
              </p>
              <p>
                <span v-if="buildingInfo.houseType !== null && buildingInfo.houseType !== ''">房屋房型：{{buildingInfo.houseType}}</span>
                <span v-else>房屋房型：无</span>
              </p>
              <p>
                <span v-if="buildingInfo.houseProperty !== null && buildingInfo.houseProperty !== ''">房屋性质：{{buildingInfo.houseProperty}}</span>
                <span v-else>房屋性质：无</span>
              </p>
              <p>
                <span v-if="buildingInfo.housePurpose !== null && buildingInfo.housePurpose !== ''">房屋用途：{{buildingInfo.housePurpose}}</span>
                <span v-else>房屋用途：无</span>
              </p>
              <p>
                <span v-if="buildingInfo.hiddenDangerType !== null && buildingInfo.hiddenDangerType !== ''">房屋隐患类型：{{buildingInfo.hiddenDangerType}}</span>
                <span v-else>房屋隐患类型：无</span>
              </p>
              <p>
                <span v-if="buildingInfo.hiddenDangerLevel !== null && buildingInfo.hiddenDangerLevel !== ''">房屋隐患级别：{{buildingInfo.hiddenDangerLevel}}</span>
                <span v-else>房屋隐患级别：无</span>
              </p>
              <p>
                <span v-if="buildingInfo.houseAddress !== null && buildingInfo.houseAddress !== ''">标准地址：{{buildingInfo.houseAddress}}</span>
                <span v-else>标准地址：无</span>
              </p>
            </div>
          </div>
          <el-card v-show="enterpriseCard" :body-style="{ padding: '10px'}" style="min-height: 20px;margin-top: 30px">
            <!-- 卡片内容 -->
            <div>
              <div style="margin: 0 0 10px 10px">
                <p class="card-title" style="font-size: 14px;margin-top: 10px">企业基本信息：</p>
                <p class="card-font">企业名称：{{enterpriseList.enterName}}</p>
                <p class="card-font">组织类型：{{enterpriseList.groupType}}</p>
                <p class="card-font">企业类型：{{enterpriseList.enterType}}</p>
                <p class="card-font">企业证件登记号：{{enterpriseList.certRegisterNo}}</p>
                <p class="card-font">登记机关：{{enterpriseList.registerAuthority}}</p>
                <p class="card-font">法定代表人姓名：{{enterpriseList.legalRepresentName}}</p>
                <p class="card-font">法人代表证件号：{{enterpriseList.legalRepresentCertid}}</p>
                <p class="card-font">法人代表联系方式：{{enterpriseList.legalRepresentPhone}}</p>
                <p class="card-font">负责人姓名：{{enterpriseList.securityChargeName}}</p>
                <p class="card-font">负责人证件号：{{enterpriseList.securityChargeCertid}}</p>
                <p class="card-font">负责人联系方式：{{enterpriseList.securityChargePhone}}</p>
              </div>
            </div>
          </el-card>
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
                    <img src="./img/man.jpg" alt="">
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
                <p>本房屋暂无居住人员，请添加人员</p>
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
                    <img src="./img/man.jpg" alt="">
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
                <p>本房屋暂无居住人员，请添加人员</p>
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
                    <img src="./img/man.jpg" alt="">
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
                <p>本房屋暂无居住人员，请添加人员</p>
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
    <el-dialog title="编辑居住人员" :visible.sync="editFormVisible" class="add_people_dialog" @close="close">
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
            <el-form-item 
              label="与房屋房主关系" 
              prop="relationship" 
              class="left"
            >
              <el-select 
                v-model="editForm.relationship" 
                placeholder="请选择"
              >
                <el-option 
                  v-for="dict in dict.type.relationship" 
                  :key="dict.value" 
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item 
              label="是否常住本房屋" 
              prop="residentHouse"
              class="left right"
            >
              <el-select 
                v-model="editForm.residentHouse" 
                placeholder="请选择"
              >
                <el-option 
                  v-for="dict in dict.type.is_party_status" 
                  :label="dict.label" 
                  :value="dict.value"
                  :key="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item 
              label="与本房屋户主关系" 
              prop="relationshipRegister" 
              class="left footer"
            >
              <el-select 
                v-model="editForm.relationshipRegister" 
                placeholder="请选择"
              >
                <el-option 
                  v-for="dict in dict.type.relationship_register" 
                  :key="dict.value" 
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <footer>
            <el-button type="primary" @click="editSave('ruleForm')">确 定</el-button>
          </footer>
        </div>
      </el-form>
    </el-dialog>
    <!-- 添加居住人员弹出框   -->
    <el-dialog title="添加居住人员" :visible.sync="dialogFormVisible" class="add_people_dialog" :before-close="handleClose">
      <el-form :model="form" ref="ruleForm" class="demo-ruleForm" scope>
        <el-form-item v-show="showOne" style="position: relative">
          <p>请输入居住人员身份证号码</p>
          <el-input v-model="form.certificateId" autocomplete="off" style="margin-bottom: 60px" placeholder="请先输入身份证号码后点击右侧图标进行查询有无该人员信息"></el-input>
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
            <el-input v-model="form.certificateId" placeholder="请输入身份证件号码"></el-input>
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
            <el-form-item label="民族" prop="type" class="left" style="margin-left: 116px">
              <el-select v-model="form.nation" placeholder="请选择">
                <el-option v-for="dict in dict.type.nation" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
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
    <!-- 编辑房屋弹窗 -->
    <el-dialog
      :visible.sync="dialogEdit"
      title="添加/编辑房屋"
      width="70%"
      :close-on-click-modal="false"
      @close="cancelHouseDialog()"
      class="house_dialog_wrap">
      <template>
        <el-form v-model="buildingInfo">
          <div class="el_dialog_top">
            <ul class="one">
              <li>
                <el-form-item prop="grid" class="grid">
                  <p class="title" style="display: inline-block; font-weight:400; margin-left: 25px; font-size: 14px;">网格：</p>
                  <treeSelect
                    :props="treeProps"
                    :options="treeData"
                    v-model="editHouseInfo.areaId"
                    :accordion="true"
                    :disabled="true"
                    placeholder="请选择">
                  </treeSelect>
                </el-form-item>
              </li>
              <li>
                <el-form-item>
                  <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">所属建筑：</p>
                  <el-select v-model="editHouseInfo.buildingName" placeholder="请选择" disabled></el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item>
                  <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">所属单元：</p>
                  <el-select v-model="editHouseInfo.unitNumber" placeholder="请选择" disabled></el-select>
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
                    <el-option
                      v-for="dict in dict.type.house_property_right"
                      :key="dict.value"
                      :label="dict.label"
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
                    <el-option
                      v-for="dict in dict.type.house_housetype"
                      :key="dict.value"
                      :label="dict.label"
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
                    <el-option
                      v-for="dict in dict.type.house_property"
                      :key="dict.value"
                      :label="dict.label"
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
                    <el-option
                      v-for="dict in dict.type.courtyard_house_purpose"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">楼房隐患类型：</p>
                <el-form-item>
                  <el-select v-model="editHouseInfo.hiddenDangerType" placeholder="请选择">
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
                <p class="title" style="display: inline-block; font-weight:400; font-size: 14px;">楼房隐患级别：</p>
                <el-form-item>
                  <el-select v-model="editHouseInfo.hiddenDangerLevel" placeholder="请选择">
                    <el-option
                      v-for="dict in dict.type.focous_degree"
                      :key="dict.value"
                      :label="dict.label"
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
                    <el-option
                      v-for="dict in dict.type.is_party_status"
                      :key="dict.value"
                      :label="dict.label"
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
  </div>
</template>

<script>
import {getHouseInfoById, getPeopleById, getEnterpriseById, editPeopleInfo, updatePeopleInfo, judgeCertificateId, insertHaveNotPeople, insertHavePeople, deleteBaHousepeopleRelationshipByShipId,editHouseBefore,getUnitAndStoreyById,houseCardUpdate,judgeEnterprise,enterRelationship,addEnterprise} from '@/api/area/house'
import Cookies from "js-cookie";
import { areaTree } from "@/api/area/area";
import { deepCopy } from '@/utils/ruoyi';
export default {
  name: "houseInfo",
  dicts:[
    'relationship',
    'relationship_register',
    'is_party_status',
    'nation',
    'certificate_type',
    'political_status',
    'marital_status',
    'house_property_right',
    'house_housetype',
    'house_property',
    'courtyard_house_purpose',
    'building_danger_type',
    'focous_degree',
    'organization_type',
    'enterprise_type',
    'nationality',
  ],
  data () {
    return {
      tabList: [],
      showThree: false,
      hasPeopleInfo: false, // 添加人员弹出窗 - 根据输入身份证提示有无该人员提示以及添加人员按钮展示状态
      rules: {
        // 校验姓名
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          {pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文'}
        ],
        // 校验身份证号
        certificateId: [
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
      form: {
        buildingTemplate:'详细建筑',
        addUser: '', // 登录名
        name: '', // 姓名
        certificateId: '', // 身份证号
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
      formLabelWidth: '120px',
      dialogFormVisible: false,

      residentNumber: '', // 居住人口总数
      hujiNumber: '', // 户籍人口总数
      workNumber: '', // 工作人口总数
      params: {
        houseId: this.$route.query.houseId,
        name: localStorage.getItem('houseName')
      },
      getPeopleParams: {
        houseId: this.$route.query.houseId,
        flag: 0
      },
      buildingInfo: {}, // 调取接口存储左侧卡片信息数据
      activeName: 'first',
      peopleList: [],
      showOne: true, // 添加人员弹出框第一次展示状态
      showTwo: false, // 添加人员弹出框第二次展示状态
      saveShow: false, // 添加人员弹出框确定按钮
      noThing: false, // 没有人员的情况下需要显示添加人员卡片
      loading: true,
      enterpriseTabList: [],
      enterpriseShowThree: false,
      hasEnterpriseInfo: false, // 添加企业弹出窗 - 根据输入身份证提示有无该人员提示以及添加人员按钮展示状态
      enterpriseShowOne: true, // 添加企业弹出框第一次展示信息
      enterpriseShowTwo: false, // 添加企业弹出框第二次展示状态
      enterpriseSaveShow: false, // 添加企业弹出框确定按钮
      enterpriseVisible: false, // 添加企业弹出框
      checked: '', //企业选择单选是否选中
      enterpriseForm: { // 添加企业弹出框表单信息
        buildingTemplate:'楼房院落',
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
        buildingTemplate:'详细建筑',
        houseId: this.$route.query.houseId,
        enterId:'',
      },
      enterpriseList: [],
      enterpriseCard:false,
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
      peopleInfo: {}, // 点击编辑调取接口存储人员基本信息
      updatePeople: {},
      showThreeParams: {
        buildingTemplate:'详细建筑',
        addUser: '',
        houseId: '',
        certificateId: '',
        relationship: '',
        relationshipRegister: '',
        residentHouse: ''
      },
      dialogEdit:false,  //房屋编辑弹窗
      editHouseInfo: {}, // 房屋卡片编辑存储表单信息集合
      allUnitAndStorey: [] , // 所属建筑集合
      treeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      treeData: [], //下拉框数据
    }
  },
  created() {
    this.getHouseInfoLeft()
    this.getPeopleInfo()
    this.getTreeSelect()
  },
  methods: {
    // 查询输入身份证
    searchIdNumber () {
      let params = {
        certificateId: this.form.certificateId
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
    // 添加人员弹出窗箭头关闭按钮
    handleClose () {
      this.showTwo = false
      this.showThree = false
      this.dialogFormVisible = false
      this.form.certificateId = ''
      this.hasPeopleInfo = false
    },
    cancelPeopleCard () {},
    addSaveShowThree () {
      this.showThreeParams.houseId = this.buildingInfo.id
      this.showThreeParams.addUser = Cookies.get('username')
      this.showThreeParams.buildingTemplate = '详细建筑'
      console.log(this.showThreeParams);
      insertHavePeople (this.showThreeParams).then((res) => {
        if (res.code === 200) {
          this.showThree = false
          this.dialogFormVisible = false
          this.$message.success(res.msg)
          this.form.certificateId = ''
          this.getPeopleInfo()
          this.getHouseInfoLeft()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加人员弹出框确定按钮
    addSave () {
      console.log(this.form);
      if (this.form.name === '') {
        this.$message.error('请输入人员姓名！')
      } else if (this.form.certificateId === '') {
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
      } else if (this.form.nation === '') {
        this.$message.error('请选择民族！')
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
            this.form.certificateId = ''
            this.hasPeopleInfo = false
            console.log(this.form);
            this.form = {}
          }
        })
      }
    },
    // 编辑弹框确定按钮
    editSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updatePeople = deepCopy(this.editForm);
          if (this.updatePeople.residentHouse === '是') {
            this.updatePeople.residentHouse = 0
          } else if (this.updatePeople.residentHouse === '否') {
            this.updatePeople.residentHouse = 1
          }
          updatePeopleInfo (this.updatePeople).then((res) => {
            if (res.code === 200) {
              console.log(res);
              this.$message.success('修改成功')
              this.getPeopleInfo()
              this.getHouseInfoLeft()
              this.editFormVisible = false
            }
          })
        } else {
          return false;
        }
      });
      
      
    },
    close() {
      this.clearValidate('ruleForm')
    },
    clearValidate (formName) {
      this.$refs[formName].clearValidate();
    },
    // 弹窗添加人员按钮
    dialogAddPeople () {
      this.showOne = false
      this.showTwo = true
      this.saveShow = false
    },
    // 添加人员按钮
    addPeople () {
      // let people = {
      //   certificateId: "141022200006564877",
      //   houseId: 1,
      //   hukouAddress: "1",
      //   id: 7,
      //   name: "Arlen",
      //   phoneNumber: "18834153859",
      //   relationship: "房主",
      //   residentHouse: 0,
      //   shipId: 160214
      // }
      // this.peopleList.push(people)
      this.dialogFormVisible = true
      this.showOne = true
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
          // if (this.editForm.residentHouse === 0) {
          //   this.editForm.residentHouse = '是'
          // } else {
          //   this.editForm.residentHouse = '否'
          // }
          if (this.editForm.residentHouse === null) {
            this.editForm.residentHouse = '';
          }
          console.log(this.editForm, res.data[0].name);
        }
      })
      this.editFormVisible = true
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
      getEnterpriseById (this.enterpriseParams).then((res) => {
        if (res.code === 200) {
          console.log(res.data.length)
          if(res.data.length !== 0){
            this.enterpriseList = res.data[0]
            this.enterpriseCard = true
          }else{
            this.enterpriseList = ''
            this.enterpriseCard = false
          }
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
    // 获取左边侧边栏信息
    getHouseInfoLeft () {
      getHouseInfoById (this.params).then((res => {
        if (res.code === 200) {
          this.buildingInfo = res.data.baseInfo[0]
          this.loading = false
          console.log(this.buildingInfo)
        }
      }))
    },
    /** 获取网格树状结构数据 */
    getTreeSelect () {
      let param = {
        userId:localStorage.getItem("userId"),
        flag:0
      }
      areaTree(param).then(res => {
        this.treeData = res.data
        this.childrenList = res.data[0].children
      })
    },
    // 房屋编辑弹窗打开
    buildingEdit () {
      this.dialogEdit = true
      let params = {
        id: this.$route.query.houseId
      }
      editHouseBefore (params).then((res) => {
        if (res.code === 200) {
          this.editHouseInfo = res.data
          console.log(this.editHouseInfo);
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
        getUnitAndStoreyById (params).then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.allUnitAndStorey = res.data
          }
        })
      })
    },
    // 房屋编辑弹窗保存
    submitForm () {
      if(this.editHouseInfo.houseNumber === '' || this.editHouseInfo.houseNumber === null || this.editHouseInfo.houseNumber === undefined){
        this.$message.error('请输入门牌号！')
      }else{
        if (this.editHouseInfo.registeredStatus === '是') {
          this.editHouseInfo.registeredStatus = 0
        } else if (this.editHouseInfo.registeredStatus === '否') {
          this.editHouseInfo.registeredStatus = 1
        }
        console.log(this.editHouseInfo);
        houseCardUpdate (this.editHouseInfo).then((res) => {
          if (res.code === 200) {
            this.dialogEdit = false
            this.$message.success(res.msg)
            this.editHouseInfo = {}
            this.getHouseInfoLeft()
          }
        })
      }
    },
    // 房屋编辑弹窗关闭
    cancelHouseDialog () {
      this.dialogEdit = false
      this.editHouseInfo = {}
    },

    // 添加企业按钮
    addEnterprise () {
      this.enterpriseVisible = true
      this.enterpriseShowOne = true
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
      min-height: calc(100vh - 300px);
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
    .top_button {
      width: 74px;
      height: 34px;
      border: 1px solid #3D8BF5;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-top: 10px;
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
    .center {
      .center_top {
        display: flex;
        justify-content: space-between;
        //margin-top: 20px;
        .title {
          text-align: left;
          p {
            font-size: 24px;
            font-weight: bold;
            color: #F27463;
            &:nth-child(1) {
              font-size: 14px;
              color: #000;
              margin-bottom: 0;
            }
            &:nth-child(2) {
              margin-top: 10px;
            }
          }
        }
        .icon-house {
          font-size: 65px;
          color: #CCE4FF;
        }
      }
      .center_container {
        .homeowner {
          font-size: 14px;
          font-weight: bold;
          color: #000000;
          margin: 0;
        }
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
//  房屋编辑样式
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
}
/* 编辑输入框样式 */
.input-width {
  width: 25%;
  display: inline-block;
}
.input-width div {
  width: 90%;
}
/* 企业卡片大标题样式 */
.card-title {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 企业卡片内容字体样式 */
.card-font {
  margin: 6px 0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
