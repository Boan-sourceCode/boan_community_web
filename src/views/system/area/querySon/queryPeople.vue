<template>
  <div>
    <div style="margin-bottom: 14px">
      <el-button type="primary" size="medium" plain @click="handleScreen()">设置基本筛选</el-button>
      <!-- <el-button type="primary" size="medium" plain @click="handleCardScreen()">添加卡片筛选</el-button> -->
    </div>
    <el-form :model="peopleParams" :inline="true" label-width="110px">
      <p style="font-size: 14px; font-weight: bold; color: #606266">
        基本筛选：
      </p>
      <el-form-item label="所属网格：" prop="areaId" v-if="this.searchList.includes('所属网格') === true">
        <treeSelect v-model="peopleParams.areaId" :props="treeProps" :options="treeData" :value="value"
          :accordion="true" @getValue="getPeopleList($event)" placeholder="请选择">
        </treeSelect>
      </el-form-item>
      <el-form-item label="所属建筑：" prop="id" class="input-width" v-if="this.searchList.includes('所属建筑') === true">
        <el-select clearable filterable v-model="peopleParams.id" placeholder="请选择">
          <el-option v-for="item in peopleOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属小区：" prop="communityId" v-if="this.searchList.includes('所属小区') === true">
        <el-select clearable v-model="peopleParams.communityId" placeholder="请选择" @change="getMaster">
          <el-option v-for="item in buildingAreaList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼房/院落类型：" prop="houseType" label-width="114px"
        v-if="this.searchList.includes('楼房/院落类型') === true">
        <el-select clearable v-model="peopleParams.houseType" placeholder="请选择">
          <el-option v-for="dict in dict.type.building" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件类型：" prop="certificateType" class="input-width"
        v-if="this.searchList.includes('证件类型') === true">
        <el-select clearable v-model="peopleParams.certificateType" placeholder="请选择">
          <el-option v-for="dict in dict.type.certificate_type" :key="dict.value" :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民族：" prop="nation" class="input-width" v-if="this.searchList.includes('民族') === true">
        <el-select clearable v-model="peopleParams.nation" placeholder="请选择">
          <el-option v-for="dict in dict.type.nation" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="政治面貌：" prop="politicalStatus" class="input-width"
        v-if="this.searchList.includes('政治面貌') === true">
        <el-select clearable v-model="peopleParams.politicalStatus" placeholder="请选择">
          <el-option v-for="dict in dict.type.political_status" :key="dict.value" :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="国籍：" prop="nationality" class="input-width" v-if="this.searchList.includes('国籍') === true">
        <el-select clearable v-model="peopleParams.nationality" placeholder="请选择">
          <el-option v-for="dict in dict.type.nationality" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别：" prop="sex" class="input-width" v-if="this.searchList.includes('性别') === true">
        <el-select clearable v-model="peopleParams.sex" placeholder="请选择">
          <el-option v-for="dict in dict.type.sys_user_sex" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="籍贯：" prop="nativePlace" class="input-width" v-if="this.searchList.includes('籍贯') === true">
        <el-input clearable v-model="peopleParams.nativePlace" placeholder="请输入籍贯" />
      </el-form-item>
      <el-form-item label="是否重点人员关注：" prop="concernStatus" class="input-width" label-width="138px"
        v-if="this.searchList.includes('是否重点人员关注') === true">
        <el-select clearable v-model="peopleParams.concernStatus" placeholder="请选择">
          <el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="婚姻状况：" prop="maritalStatus" class="input-width"
        v-if="this.searchList.includes('婚姻状况') === true">
        <el-select clearable v-model="peopleParams.maritalStatus" placeholder="请选择">
          <el-option v-for="dict in dict.type.marital_status" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生年龄段：" prop="time" class="input-width" v-if="this.searchList.includes('出生年龄段') === true">
        <el-date-picker v-model="peopleParams.time" type="daterange" @change="setTime" value-format="yyyy-MM-dd"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="人口类型：" prop="typeCode" class="input-width" v-if="this.searchList.includes('人口类型') === true">
        <el-select clearable v-model="peopleParams.typeCode" placeholder="请选择" @change="getStatus">
          <el-option v-for="dict in dict.type.people_type" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人口类型状态：" prop="extendTypeName" class="input-width"
        v-if="this.searchList.includes('人口类型状态') === true">
        <el-select clearable v-model="peopleParams.extendTypeName" placeholder="请选择">
          <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="与房屋房主关系：" label-width="130px" prop="relationship" class="input-width"
        v-if="this.searchList.includes('与房屋房主关系') === true">
        <el-select clearable v-model="peopleParams.relationship" placeholder="请选择">
          <el-option v-for="dict in dict.type.relationship" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员类别：" prop="peopleType" class="input-width"
        v-if="this.searchList.includes('人员类别') === true">
        <el-select clearable v-model="peopleParams.peopleType" placeholder="请选择">
          <el-option v-for="dict in dict.type.people_category" :key="dict.value" :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 把这个改成多级 s-->
      <!-- <el-form-item label="人员卡片类型：" prop="templateType" class="input-width"
        v-if="this.searchList.includes('人员卡片类型') === true">
        <el-select clearable v-model="peopleParams.templateType" placeholder="请选择">
          <el-option v-for="dict in dict.type.card_type" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="人员卡片类型：" prop="templateType" class="input-width"
        v-if="this.searchList.includes('人员卡片类型') === true">
        <el-cascader v-model="peopleParams.templateCode" :options="peopleCardOptions" :props="{value:'templateCode'}"
          @change="setTemplateType">
        </el-cascader>
      </el-form-item>

      <!-- 把这个改成多级 end-->
      <el-form-item label="健康情况：" prop="health" class="input-width" v-if="this.searchList.includes('健康情况') === true">
        <el-select clearable v-model="peopleParams.health" placeholder="请选择">
          <el-option v-for="dict in dict.type.healthy_status" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="兵役情况：" prop="militaryServiceStatus" class="input-width"
        v-if="this.searchList.includes('兵役情况') === true">
        <el-select clearable v-model="peopleParams.militaryServiceStatus" placeholder="请选择">
          <el-option v-for="dict in dict.type.military_status" :key="dict.value" :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="社保状态：" prop="socialSecurityStatus" class="input-width"
        v-if="this.searchList.includes('社保状态') === true">
        <el-select clearable v-model="peopleParams.socialSecurityStatus" placeholder="请选择">
          <el-option v-for="dict in dict.type.social_security_status" :key="dict.value" :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否社会救助对象：" prop="socialAssistanceStatus" class="input-width" label-width="138px"
        v-if="this.searchList.includes('是否社会救助对象') === true">
        <el-select clearable v-model="peopleParams.socialAssistanceStatus" placeholder="请选择">
          <el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否科技工作者：" prop="technicalWorkerStatus" class="input-width" label-width="138px"
        v-if="this.searchList.includes('是否科技工作者') === true">
        <el-select clearable v-model="peopleParams.technicalWorkerStatus" placeholder="请选择">
          <el-option v-for="dict in dict.type.is_party_status" :key="dict.value" :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历：" prop="qualification" class="input-width" v-if="this.searchList.includes('学历') === true">
        <el-select clearable v-model="peopleParams.qualification" placeholder="请选择">
          <el-option v-for="dict in dict.type.qualification" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业类别：" prop="occupationalCategory" class="input-width"
        v-if="this.searchList.includes('职业类别') === true">
        <el-select clearable v-model="peopleParams.occupationalCategory" placeholder="请选择">
          <el-option v-for="dict in dict.type.occupational_category" :key="dict.value" :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="退休类型：" prop="retireType" class="input-width"
        v-if="this.searchList.includes('退休类型') === true">
        <el-select clearable v-model="peopleParams.retireType" placeholder="请选择">
          <el-option v-for="dict in dict.type.retire_type" :key="dict.value" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属党支部：" prop="pAreaId" class="input-width" v-if="this.searchList.includes('所属党支部') === true">
        <el-select clearable v-model="peopleParams.areaLevel" placeholder="请选择">
          <!--                  <el-option-->
          <!--                    v-for="dict in dict.type.administrative_region"-->
          <!--                    :key="dict.value"-->
          <!--                    :label="dict.label"-->
          <!--                    :value="dict.value">-->
          <!--                  </el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="党内所属职位：" prop="pAreaId" class="input-width"
        v-if="this.searchList.includes('党内所属职位') === true">
        <el-select clearable v-model="peopleParams.areaLevel" placeholder="请选择">
          <!--                  <el-option-->
          <!--                    v-for="dict in dict.type.administrative_region"-->
          <!--                    :key="dict.value"-->
          <!--                    :label="dict.label"-->
          <!--                    :value="dict.value">-->
          <!--                  </el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="党员状态：" prop="pAreaId" class="input-width" v-if="this.searchList.includes('党员状态') === true">
        <el-select clearable v-model="peopleParams.areaLevel" placeholder="请选择">
          <!--                  <el-option-->
          <!--                    v-for="dict in dict.type.administrative_region"-->
          <!--                    :key="dict.value"-->
          <!--                    :label="dict.label"-->
          <!--                    :value="dict.value">-->
          <!--                  </el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="是否获得党员荣誉：" prop="pAreaId" class="input-width" label-width="138px"
        v-if="this.searchList.includes('是否获得党员荣誉') === true">
        <el-select clearable v-model="peopleParams.areaLevel" placeholder="请选择">
          <!--                  <el-option-->
          <!--                    v-for="dict in dict.type.administrative_region"-->
          <!--                    :key="dict.value"-->
          <!--                    :label="dict.label"-->
          <!--                    :value="dict.value">-->
          <!--                  </el-option>-->
        </el-select>
      </el-form-item>
      <div v-if="this.searchCardList.length !== 0">
        <hr />
        <p style="font-size: 14px; font-weight: bold; color: #606266">
          卡片筛选：
        </p>
        <div v-for="(item, index) in this.searchCardList" class="card-width">
          <el-form-item v-if="item.controlType === 'input'" :label="item.controlName" prop="name" :key="index">
            <el-input clearable placeholder="请输入" v-model="peopleParams.cardInfo[item.controlCode]" :key="index" />
          </el-form-item>

          <el-form-item v-if="item.controlType === 'select'" :label="item.controlName">
            <el-select clearable placeholder="请选择" v-model="peopleParams.cardInfo[item.controlCode]">
              <el-option v-for="selectItem in item.controlOptionValueList" :key="selectItem.value"
                :label="selectItem.lable" :value="selectItem.lable">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="item.controlType === 'radio'" :label="item.controlName">
            <el-radio-group v-model="peopleParams.cardInfo[item.controlCode]">
              <el-radio v-for="radioItem in item.controlOptionValueList" :key="radioItem.value" :label="radioItem.lable"
                :value="radioItem.lable">
                {{ radioItem.lable }}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="item.controlType === 'date'" :label="item.controlName">
            <el-date-picker v-model="peopleParams.cardInfo[item.controlCode]" type="date" value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item v-if="item.controlType === 'textarea'" :label="item.controlName">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="peopleParams.cardInfo[item.controlCode]">
            </el-input>
          </el-form-item>

          <el-form-item v-if="item.controlType === 'checkbox'" :label="item.controlName">
            <el-checkbox-group v-model="peopleParams.cardInfo[item.controlCode]">
              <el-checkbox v-for="checkboxItem in item.controlOptionValueList" :key="checkboxItem.value"
                :label="checkboxItem.lable" :value="checkboxItem.lable">
                {{ checkboxItem.lable }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>

      <el-form-item style="float: right">
        <el-button plain @click="handlePeopleQuery">查询</el-button>
        <el-button @click="handleImport">批量导入</el-button>
        <el-button v-hasPermi="['system:people:export']" @click="handlePeopleExport">批量导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :loading="loading" :data="peopleList" :header-cell-style="{ background: '#EBF7FF' }" stripe border
      @expand-change="tableExpand">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="center" inline class="demo-table-expand">
            <el-form-item label="标准地址:">
              <p v-for="(item, index) in props.row.expand">
                {{ item.houseAddress }}
              </p>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" align="center" width="60px">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (page.pageNum - 1) * page.pageSize }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" prop="name">
        <template slot-scope="scope">
          <p v-if="scope.row.name === '' || scope.row.name === null">/</p>
          <p v-else>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属网格" align="center" prop="areaName" width="164px">
        <template slot-scope="scope">
          <p v-if="scope.row.areaName === '' || scope.row.areaName === null">
            /
          </p>
          <p v-else>{{ scope.row.areaName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属建筑" align="center" prop="communityName" width="108px">
        <template slot-scope="scope">
          <p>{{ scope.row.communityName }}{{ scope.row.buidingNumber }}</p>
        </template>
      </el-table-column>
      <el-table-column label="人口类型" align="center" prop="typeCode">
        <template slot-scope="scope">
          <p v-if="scope.row.typeCode === '' || scope.row.typeCode === null">
            /
          </p>
          <p v-else>{{ scope.row.typeCode }}</p>
        </template>
      </el-table-column>
      <el-table-column label="人口类型状态" align="center" prop="extendTypeName">
        <template slot-scope="scope">
          <p v-if="scope.row.extendTypeName === '' ||
            scope.row.extendTypeName === null
            ">
            /
          </p>
          <p v-else>{{ scope.row.extendTypeName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="与房屋房主关系" align="center" prop="relationship">
        <template slot-scope="scope">
          <p v-if="scope.row.relationship === '' || scope.row.relationship === null
            ">
            /
          </p>
          <p v-else>{{ scope.row.relationship }}</p>
        </template>
      </el-table-column>
      <el-table-column label="证件类型" align="center" prop="certificateType">
        <template slot-scope="scope">
          <p v-if="scope.row.certificateType === '' ||
            scope.row.certificateType === null
            ">
            /
          </p>
          <dict-tag v-else :options="dict.type.certificate_type" :value="scope.row.certificateType" />
        </template>
      </el-table-column>
      <el-table-column label="证件号" align="center" prop="idCard" width="156px">
        <template slot-scope="scope">
          <p v-if="scope.row.idCard === '' || scope.row.idCard === null">/</p>
          <p v-else>{{ scope.row.idCard }}</p>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center" prop="sex" width="60px">
        <template slot-scope="scope">
          <p v-if="scope.row.sex === '' || scope.row.sex === null">/</p>
          <p v-else>{{ scope.row.sex }}</p>
        </template>
      </el-table-column>
      <el-table-column label="民族" align="center" prop="nation">
        <template slot-scope="scope">
          <p v-if="scope.row.nation === '' || scope.row.nation === null">/</p>
          <p v-else>{{ scope.row.nation }}</p>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" align="center" prop="birthday" width="96px" />
      <el-table-column label="政治面貌" align="center" prop="politicalStatus">
        <template slot-scope="scope">
          <p v-if="scope.row.politicalStatus === '' ||
            scope.row.politicalStatus === null
            ">
            /
          </p>
          <dict-tag v-else :options="dict.type.political_status" :value="scope.row.politicalStatus" />
        </template>
      </el-table-column>
      <el-table-column label="国籍" align="center" prop="nationality">
        <template slot-scope="scope">
          <p v-if="scope.row.nationality === '' || scope.row.nationality === null
            ">
            /
          </p>
          <p v-else>{{ scope.row.nationality }}</p>
        </template>
      </el-table-column>
      <el-table-column label="是否重点人员关注" align="center" prop="concernStatus">
        <template slot-scope="scope">
          <p v-if="scope.row.concernStatus === '' || scope.row.concernStatus === null
            ">
            /
          </p>
          <dict-tag v-else :options="dict.type.is_party_status" :value="scope.row.concernStatus" />
        </template>
      </el-table-column>
      <el-table-column label="婚姻状况" align="center" prop="maritalStatus">
        <template slot-scope="scope">
          <p v-if="scope.row.maritalStatus === '' || scope.row.maritalStatus === null
            ">
            /
          </p>
          <p v-else>{{ scope.row.maritalStatus }}</p>
        </template>
      </el-table-column>
    </el-table>
    <p>共查询/检索{{ this.page.total }}条信息</p>

    <!-- 分页 -->
    <pagination :total="page.total" :page.sync="page.pageNum" :limit.sync="page.pageSize"
      @pagination="getPeopleList()" />
    <!-- 用户导入对话框 -->
    <el-dialog :visible.sync="upload.importDialog" title="实有人口批量导入" width="21%" :close-on-click-modal="false">
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers" :action="upload.url"
        :data="params" :disabled="upload.isUploading" :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" @change="getUpdateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.importDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--设置基本筛选弹窗 -->
    <el-dialog :visible.sync="screenDialog" title="设置基本筛选" width="70%" :close-on-click-modal="false"
      @close="dictScreenVisible()">
      <template>
        <el-form>
          <el-form-item class="itemStyle">
            <p style="margin: 0; padding: 0; font-weight: bold">
              网格区域字段选择：
            </p>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="所属网格"></el-checkbox>
              <el-checkbox label="所属建筑"></el-checkbox>
              <el-checkbox label="所属小区"></el-checkbox>
              <el-checkbox label="楼房/院落类型"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="itemStyle">
            <p style="margin: 0; padding: 0; font-weight: bold">
              基础信息字段选择：
            </p>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="证件类型"></el-checkbox>
              <el-checkbox label="民族"></el-checkbox>
              <el-checkbox label="政治面貌"></el-checkbox>
              <el-checkbox label="国籍"></el-checkbox>
              <el-checkbox label="性别"></el-checkbox>
              <el-checkbox label="籍贯"></el-checkbox>
              <el-checkbox label="是否重点人员关注"></el-checkbox>
              <el-checkbox label="婚姻状况"></el-checkbox>
              <el-checkbox label="出生年龄段"></el-checkbox>
              <el-checkbox label="人口类型"></el-checkbox>
              <el-checkbox label="人口类型状态"></el-checkbox>
              <el-checkbox label="与房屋房主关系"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="itemStyle">
            <p style="margin: 0; padding: 0; font-weight: bold">
              扩展信息字段选择：
            </p>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="人员类别"></el-checkbox>
              <el-checkbox label="人员卡片类型"></el-checkbox>
              <el-checkbox label="健康情况"></el-checkbox>
              <el-checkbox label="兵役情况"></el-checkbox>
              <el-checkbox label="社保状态"></el-checkbox>
              <el-checkbox label="是否社会救助对象"></el-checkbox>
              <el-checkbox label="是否科技工作者"></el-checkbox>
              <el-checkbox label="学历"></el-checkbox>
              <el-checkbox label="职业类别"></el-checkbox>
              <el-checkbox label="退休类型"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="itemStyle">
            <p style="margin: 0; padding: 0; font-weight: bold">
              党员信息字段选择：
            </p>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="所属党支部"></el-checkbox>
              <el-checkbox label="党内所属职位"></el-checkbox>
              <el-checkbox label="党员状态"></el-checkbox>
              <el-checkbox label="是否获得党员荣誉"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitScreenForm()">确定查询字段</el-button>
        <el-button type="default" @click="dictScreenVisible()">取消</el-button>
      </div>
    </el-dialog>

    <!--添加卡片筛选弹窗 -->
    <el-dialog :visible.sync="screenCardDialog" title="添加卡片筛选" width="40%" :close-on-click-modal="false"
      @close="dictScreenVisible('screenCardForm')">
      <template>
        <el-form ref="screenCardForm" :model="screenCardForm" :rules="rules">
          <el-form-item label="人员卡片类型：" prop="pAreaId">
            <el-cascader v-model="screenCardForm.templateId" :options="peopleCardOptions" @change="editCommunit">
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="controlIds">
              <el-checkbox v-for="checkboxItem in Cardpulldown" :label="checkboxItem.controlId">
                {{ checkboxItem.controlName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="submitCardForm()">确定查询字段</el-button>
        <el-button type="default" @click="dictCardVisible()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    areaTree
  } from "@/api/area/area";
  import {
    getToken
  } from "@/utils/auth";
  import {
    comprehensiveQueryPeople,
    getHouseList,
    buildingList,
    getPeopleStatus,
    cardTree,
    getCardByTemplateId,
    cardList,
  } from "@/api/area/population";
  export default {
    name: "queryPeople",
    dicts: [
      "building",
      "certificate_type",
      "nation",
      "political_status",
      "nationality",
      "sys_user_sex",
      "is_party_status",
      "marital_status",
      "people_type",
      "relationship",
      "people_category",
      "card_type",
      "healthy_status",
      "military_status",
      "social_security_status",
      "qualification",
      "occupational_category",
      "retire_type",
      "administrative_region",
    ],
    data() {
      return {
        loading: true, // 遮罩层
        treeData: [], //下拉框数据
        treeProps: {
          label: "label",
          value: "id",
          children: "children",
        },
        value: "", //选中的数据
        //实有人口
        peopleList: [], // 实有人口数据
        houseList: [], //标准地址
        time: [], //出生年龄段
        params: {
          userId: localStorage.getItem("userId"),
          updateSupport: 0,
        },
        peopleParams: {
          //实有人口
          userId: localStorage.getItem("userId"),
          startTime: null,
          endTime: null,
          cardInfo: {},
        },
        page: {
          pageNum: 1, //当前页数
          pageSize: 10, //每页条数
          total: 0, // 总页数
        },
        screenDialog: false, //基本筛选弹窗
        screenCardDialog: false, //卡片筛选弹窗
        screenCardForm: {}, //卡片筛选form
        checkList: [], //基本筛选复选框
        searchList: [], //基本筛选复选框
        peopleOptions: [], //建筑下拉框
        statusOptions: [], //人口类型状态
        peopleCardOptions: [], //人口卡片数据
        Cardpulldown: [], //选中后卡片数据
        controlIds: [], //卡片筛选复选框
        searchCardList: [], //卡片已选筛选条件
        rules: {},
        // 用户导入参数
        upload: {
          importDialog: false, // 是否显示弹出层（用户导入）
          title: "", // 弹出层标题（用户导入）
          isUploading: false, // 是否禁用上传
          updateSupport: 0, // 是否更新已经存在的用户数据
          headers: {
            Authorization: "Bearer" + getToken()
          }, // 设置上传的请求头部
          url: process.env.VUE_APP_BASE_API + "/system/people/importData", // 上传的地址
        },
      };
    },
    mounted() {
      this.getTree(); //树状下拉框
      this.getPeopleList(); //实有人口数据
      this.getPeopleCardList() //获取人员卡片类型
    },
    methods: {
      // 查询树
      getTree() {
        let param = {
          userId: localStorage.getItem("userId"),
          flag: 0,
        };
        areaTree(param).then((res) => {
          this.treeData = res.data;
          console.log(res.data)
        });
      },

      //实有人口
      // 查询建筑
      getPeopleBuilding(value) {
        buildingList(value).then((res) => {
          let options = res.data;
          this.peopleOptions = options.map((item) => {
            return {
              value: `${item.id}`,
              label: `${item.building_name}`,
            };
          });
        });
      },
      //获取实有人口数据
      getPeopleList() {
        this.loading = true;
        if (this.searchList.length === 0) {
          this.searchList = [
            "所属网格",
            "所属建筑",
            "人口类型",
            "人口类型状态",
            "性别",
            "民族",
            "出生年龄段",
            "政治面貌",
          ];
        }
        console.log(this.peopleParams)
        comprehensiveQueryPeople(
          Object.assign({
              pageNum: this.page.pageNum,
              pageSize: this.page.pageSize,
            },
            this.peopleParams
          )
        ).then((res) => {
          this.peopleList = res.rows;
          this.page.total = res.total;
          this.loading = false;
          this.peopleList.forEach((item) => {
            this.$set(item, "expand");
            item.expand = "";
          });
          let param = {
            areaId: this.peopleParams.areaId,
            communityId: null,
            houseType: null,
          };
          this.getPeopleBuilding(param);
        });
      },
      getPeopleCardList() {
        var that = this;
        cardTree().then((res) => {
          that.peopleCardOptions = res.data;
          // that.templateCode
        });
      },
      // 导入按钮操作
      handleImport() {
        this.upload.importDialog = true;
      },
      //下载模板操作
      importTemplate() {
        this.download(
          "/system/people/importTemplate", {},
          `实有人口模板-${new Date().getTime()}.xlsx`
        );
      },
      // 文件上传中处理
      handleFileUploadProgress(event, file, fileList) {
        this.upload.isUploading = true;
      },
      getUpdateSupport() {
        this.params.updateSupport = this.upload.updateSupport;
      },
      // 文件上传成功处理
      handleFileSuccess(response, file, fileList) {
        this.upload.importDialog = false;
        this.upload.isUploading = false;
        this.$refs.upload.clearFiles();
        this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'> " + response
          .msg + "</div>" + "<button style='margin:1% 0 0 8%' @click='handleDownload'>下载</button>", "导入结果", {
            dangerouslyUseHTMLString: true,
            roundButton: true
          });
        if (response.msg === "操作成功") {
          this.$message.success("操作成功");
        } else {
          this.arr = response.msg.split("<br/>");
          this.dialogVisible = true;
        }
        this.getList();
      },
      // 提交上传文件
      submitFileForm() {
        this.$refs.upload.submit();
      },
      //根据人口类型获取人口类型状态
      getStatus(data) {
        let param = {
          typeCode: data,
        };
        getPeopleStatus(param).then((res) => {
          if (res.code === 200) {
            this.statusOptions = res.data;
          }
        });
      },
      //获取标准地址
      tableExpand(row) {
        let param = {
          certificateId: row.peopleCard,
        };
        getHouseList(param).then((res) => {
          row.expand = res.data;
        });
      },
      // 开始时间结束时间
      setTime(e) {
        if (e !== null && e !== "" && e !== undefined) {
          this.peopleParams.startTime = e[0];
          this.peopleParams.endTime = e[1];
        } else {
          this.peopleParams.startTime = "";
          this.peopleParams.endTime = "";
        }
      },
      setTemplateType(e) {
        console.log(e)
        if (e !== null && e !== "" && e !== undefined) {
          this.peopleParams.templateCode = e[1];
        } else {
          this.peopleParams.templateCode = "";
        }
      },
      //基本筛选
      handleScreen() {
        this.screenDialog = true;
        this.checkList = this.searchList;
      },
      //基本筛选的提交按钮
      submitScreenForm() {
        this.searchList = this.checkList;
        this.screenDialog = false;
      },
      //基本筛选弹窗关闭
      dictScreenVisible() {
        this.screenDialog = false;
      },
      //卡片筛选
      handleCardScreen() {
        cardTree().then((res) => {
          this.peopleCardOptions = res.data;
        });
        this.screenCardDialog = true;
      },
      //卡片下拉选择
      editCommunit(value) {
        let params = {
          templateId: value[1], // 卡片类型
          flag: 1,
        };
        getCardByTemplateId(params).then((res) => {
          if (res.code === 200) {
            this.Cardpulldown = res.data;
          }
        });
      },
      //卡片筛选的提交按钮
      submitCardForm() {
        let param = {
          controlIds: this.controlIds,
        };
        cardList(param).then((res) => {
          this.searchCardList = res.data;
        });
        this.screenCardDialog = false;
      },
      //卡片筛选弹窗关闭
      dictCardVisible() {
        this.screenCardDialog = false;
      },
      //查询
      handlePeopleQuery() {
        this.page.pageNum = 1;
        this.getPeopleList(this.peopleParams);
      },
      //批量导出
      handlePeopleExport() {
        this.download(
          "/system/people/export", {
            ...this.peopleParams,
          },
          `人口信息-${new Date().getTime()}.xlsx`
        );
      },
    },
  };
</script>

<style scoped>
  /*实有人口*/
  /*标准地址*/
  /deep/ .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  /deep/ .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }

  .demo-table-expand p {
    margin: 0;
    padding: 0;
  }

  .card-width {
    /*width: 21%;*/
    display: inline-block;
  }

  /*设置基本筛选弹窗样式*/
  .itemStyle {
    border-bottom: 2px solid #ccc;
  }
</style>
