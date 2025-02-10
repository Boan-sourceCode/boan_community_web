<template>
  <div class="table">
    <el-form :model="queryForm" :inline="true" label-width="110px">
      <p style="font-size: 14px; font-weight: bold; color: #606266">基本筛选：</p>
      <el-form-item label="所属网格：" prop="areaId">
        <treeSelect
          v-model="queryForm.areaId"
          :props="treeProps"
          :options="treeData"
          :value="queryForm.areaId"
          :accordion="true"
          @getValue="getAreaValue($event)"
          placeholder="请选择"
          :clearable="false"
        >
        </treeSelect>
      </el-form-item>
      <el-form-item label="所属建筑：" prop="id" class="input-width">
        <el-input clearable placeholder="请输入" v-model="queryForm.buildingName" />
        <!-- <el-select clearable filterable v-model="queryForm.buildingName" placeholder="请选择">
          <el-option
            v-for="item in peopleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="关键字：" prop="key" class="input-width">
        <el-input clearable placeholder="请输入" v-model="queryForm.key" />
      </el-form-item>

      <el-form-item>
        <el-button plain @click="handlePeopleQuery">查询</el-button>
        <el-button @click="handlePeopleExport">批量导出</el-button>
      </el-form-item>
    </el-form>

    <div class="account">
      <div>{{ templateName }}共{{ page.total }}条信息</div>
      <el-button plain @click="clickAccount()">统计</el-button>
    </div>

    <el-table
      v-loading="tabLoading"
      :data="list"
      :header-cell-style="{ background: '#EBF7FF' }"
      stripe
      border
      style="width: 100%"
      @expand-change="tableExpand"
    >
      <!-- 公共列 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="center" inline class="demo-table-expand">
            <el-form-item label="标准地址:">
              <p v-for="(item, index) in props.row.expand" :key="timeKey + index">
                {{ item.houseAddress }}
              </p>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" align="center" width="100px">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (page.pageNum - 1) * page.pageSize }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" prop="name" width="120px">
        <template slot-scope="scope">
          <p v-if="scope.row.name === '' || scope.row.name === null">/</p>
          <p v-else>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="身份证号"
        align="center"
        prop="idCardNo"
        min-width="180px"
      ></el-table-column>
      <el-table-column
        label="手机号"
        align="center"
        prop="phoneNumber"
        min-width="180px"
      ></el-table-column>
      <el-table-column label="所属网格" align="center" prop="areaName" min-width="164px">
        <template slot-scope="scope">
          <p v-if="scope.row.areaName === '' || scope.row.areaName === null">/</p>
          <p v-else>{{ scope.row.areaName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属建筑" align="center" prop="buildingName" min-width="180px">
        <template slot-scope="scope">
          <p>{{ scope.row.buildingName }}</p>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleDetail(scope.row)"
            >详情卡片</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :total="page.total"
      :page.sync="page.pageNum"
      :limit.sync="page.pageSize"
      @pagination="fetchList()"
    />

    <!-- 查看卡片弹窗 -->
    <el-dialog
      :visible.sync="Browsecard"
      width="70%"
      :close-on-click-modal="false"
      @close="Cancelcard('editHouseInfo')"
      class="house_dialog_wrap"
    >
      <template v-loading="loading">
        <el-form v-model="displayList" ref="displayList" :rules="rules" :model="form">
          <div class="el_dialog_top">
            <el-form-item style="margin-left: 35%">
              <p class="title" style="display: inline-block; font-weight: 900; font-size: 24px">
                卡片类型：
                <span>{{ displayList.templateName }}</span>
              </p>
              <!-- <el-select v-model="displayList.templateName" placeholder="请选择" disabled>
                <el-option
                  v-for="item in editHouseInfo"
                  :key="item.templateId"
                  :label="item.templateName"
                  :value="item.templateId"
                  @click.native="editCommunit(item)"
                >
                </el-option>
              </el-select> -->
            </el-form-item>

            <el-row>
              <div v-for="(item, index) in displayList.peopleCardInfo" :key="index" class="card">
                <el-col :span="12">
                  <el-form-item
                    :label="item.controlName + ':'"
                    prop="name"
                    :key="index"
                    label-width="110px"
                  >
                    <div>{{ formdisplay[item.controlCode] || '暂无信息' }}</div>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <!-- <div v-for="(item, index) in displayList.peopleCardInfo" :key="index" class="card">
              <el-form-item
                v-if="item.controlType === 'input'"
                :label="item.controlName"
                prop="name"
                :key="index"
                label-width="110px"
              >
                <el-input
                  clearable
                  placeholder="请输入"
                  v-model="formdisplay[item.controlCode]"
                  style="width: 75%"
                  :key="index"
                  disabled
                />
              </el-form-item>

              <el-form-item
                v-if="item.controlType === 'select'"
                :label="item.controlName"
                label-width="110px"
              >
                <el-select
                  placeholder="请选择"
                  v-model="formdisplay[item.controlCode]"
                  style="width: 75%"
                  disabled
                >
                  <el-option
                    v-for="selectItem in item.controlOptionValueList"
                    :key="selectItem.value"
                    :label="selectItem.lable"
                    :value="selectItem.lable"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                v-if="item.controlType === 'radio'"
                :label="item.controlName"
                label-width="110px"
              >
                <el-radio-group v-model="formdisplay[item.controlCode]" style="width: 75%" disabled>
                  <el-radio
                    v-for="radioItem in item.controlOptionValueList"
                    :key="radioItem.value"
                    :label="radioItem.lable"
                    :value="radioItem.lable"
                  >
                    {{ radioItem.lable }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                v-if="item.controlType === 'date'"
                :label="item.controlName"
                label-width="110px"
              >
                <el-date-picker
                  v-model="formdisplay[item.controlCode]"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 75%"
                  disabled
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                v-if="item.controlType === 'textarea'"
                :label="item.controlName"
                label-width="110px"
              >
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="formdisplay[item.controlCode]"
                  style="width: 75%"
                  disabled
                >
                </el-input>
              </el-form-item>

              <el-form-item v-if="item.controlType === 'checkbox'" :label="item.controlName">
                <el-checkbox-group v-model="formdisplay[item.controlCode]" disabled>
                  <el-checkbox
                    v-for="checkboxItem in item.controlOptionValueList"
                    :key="checkboxItem.value"
                    :label="checkboxItem.lable"
                    :value="checkboxItem.lable"
                  >
                    {{ checkboxItem.lable }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div> -->
          </div>
        </el-form>
      </template>
    </el-dialog>

    <!-- 统计弹窗 -->
    <el-dialog
      :visible.sync="countDialog.visible"
      width="700px"
      :close-on-click-modal="false"
      @close="cancelCountDialog()"
    >
      <div class="breadcrumb">
        <div
          class="item"
          v-for="(item, index) in breadcrumbList"
          :key="item.areaId"
          @click="clickBreadcrumb(item, index)"
        >
          <a class="label">{{ item.label }}</a>
          <span class="arrow">></span>
        </div>
      </div>

      <div class="account-num">
        {{breadcrumbList.length&&breadcrumbList.at(-1).label}}{{templateName}}共{{ countDialog.list.reduce((num, item) => num + item.count, 0) }}个
      </div>

      <el-table
        v-loading="countDialog.loading"
        :data="countDialog.list"
        :header-cell-style="{ background: '#EBF7FF' }"
        stripe
        border__
        style="width: 100%"
      >
        <el-table-column label="序号" align="center" min-width="100px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center" prop="areaName" min-width="100px">
          <template slot-scope="scope">
            <div
              class="areaName"
              :style="{
                color: scope.row.level <= 5 ? '#1890ff' : '#333',
                cursor: scope.row.level <= 5 ? 'pointer' : 'default',
              }"
              @click="clickAreaName(scope.row)"
            >
              {{ scope.row.areaName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          align="center"
          prop="count"
          min-width="100px"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getList, countPeopleByType } from '@/api/area/common.js'
import { areaTree } from '@/api/area/area'
import { buildingList } from '@/api/area/population'
import { getHouseList, returnCardDataById } from '@/api/area/population'

export default {
  name: 'queryCommon',
  props: {
    // 模板名称
    templateName: {
      typeof: String,
      default: '',
    },
    // 模板编码code
    templateCode: {
      typeof: String,
      default: '',
    },
  },
  data() {
    return {
      tabLoading: true,
      loading: false,
      list: [],
      // 列表查询条件
      queryForm: {},
      // 分页
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      //所属网格
      treeData: [],
      treeProps: {
        label: 'label',
        value: 'id',
        children: 'children',
      },
      // 建筑下拉框
      peopleOptions: [],

      activeName: ['1'], //折叠板默认展开
      activeNames: ['1'], //折叠板默认展开
      houseDialogEdit: false, // 添加卡片遮罩层
      Editcard: false, //编辑卡片遮罩层
      Browsecard: false, //查看卡片遮罩层
      editHouseInfo: [], // 添加卡片表单信息集合
      allUnitAndStorey: [], // 卡片类型集合
      relationshipData: [], //人口关系集合
      Cardpulldown: [], //选中后卡片数据
      CardList: [], //人员卡片信息合集
      Cardmodify: {}, //编辑卡片数据
      displayList: {}, //查看卡片数据
      total: '', //人口卡片数量
      peopleCardOptions: [], //人口卡片数据
      screenCardDialog: false, //卡片筛选弹窗
      checkbox: '', //多选
      input: '', //输入框
      radio: '', //单选
      select: '', //下拉
      date: '', //时间
      textarea: '', //文本

      // 表单校验
      rules: {},
      data: '',
      disabled: false,
      form: {}, //测试添加动态表单数据
      formcard: {}, //编辑的动态表单数据
      formdisplay: {}, //查看卡片表单数据
      floorActive: 'index', // 添加保存按钮选中值
      itemID: null,
      timeKey: 0,
      timer: null,

      // 统计弹窗
      countDialog: {
        visible: false,
        loading: false,
        list: [],
      },
      // 统计等级面包屑
      breadcrumbList: [],
      // 当前选中区域数据
      selectArea: {},
    }
  },
  watch: {
    templateCode(val) {
      if (val) {
        this.timer = setInterval(() => {
          if (this.queryForm.areaId) {
            clearInterval(this.timer)
            this.fetchList()
          }
        }, 100)
      }
    },
  },
  created() {
    this.getTree()
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    // 树状回调
    getAreaValue(val) {
      this.selectArea = val
      this.getPeopleBuilding()
      // 解决在queryForm.areaId为更改时就查询
      setTimeout(() => {
        this.handlePeopleQuery()
      }, 0)
    },

    // 统计按钮点击事件
    clickAccount() {
      if (!this.queryForm.areaId) return
      this.countDialog.visible = true
      this.breadcrumbList.push(this.selectArea)
      this.fetchAccountList(this.queryForm.areaId)
    },

    // 查询统计列表数据
    fetchAccountList(areaId) {
      let params = {
        templateCode: this.templateCode,
        areaId: areaId,
      }
      this.countDialog.loading = true
      countPeopleByType(params).then((res) => {
        if (res.code == 200) {
          this.countDialog.loading = false
          this.countDialog.list = res.data
        }
      })
    },
    // 关闭统计弹窗
    cancelCountDialog() {
      this.countDialog.visible = false
      this.breadcrumbList = []
    },

    // 面包屑 点击事事件
    clickBreadcrumb(item, index) {
      this.breadcrumbList = this.breadcrumbList.slice(0, index + 1)
      this.fetchAccountList(item.id)
    },

    // 点击统计行街道名
    clickAreaName(row) {
      // 当为网格时不可点击
      if(row.level == 6) return
      this.breadcrumbList.push({ id: row.areaId, label: row.areaName })
      this.fetchAccountList(row.areaId)
    },

    // 查询建筑
    getPeopleBuilding() {
      let param = {
        areaId: this.queryForm.areaId,
        communityId: null,
        houseType: null,
      }
      buildingList(param).then((res) => {
        let options = res.data
        this.peopleOptions = options.map((item) => {
          return {
            value: `${item.id}`,
            label: `${item.building_name}`,
          }
        })
      })
    },

    //批量导出
    handlePeopleExport() {
      this.download(
        '/system/people/exportPeopleByType',
        {
          ...this.queryForm,
          templateCode: this.templateCode,
          templateName: this.templateName,
        },
        `${this.templateName}信息-${new Date().getTime()}.xlsx`,
      )
    },

    // 表格行内点击事件  卡片详情
    handleDetail(item) {
      this.loading = true
      this.Browsecard = true
      let params = {
        dataId: item.dataId,
      }
      returnCardDataById(params).then((res) => {
        if (res.code === 200) {
          this.displayList = res.data
          this.peopleCardInfo = this.displayList.peopleCardInfo
          // 请求后赋值【此时已经请求到了后端返回的数据Cardpulldown】
          // 动态往表单中添加对应属性及数据
          this.formdisplay = {}
          for (let i = 0; i < this.peopleCardInfo.length; i++) {
            //【row[xxx] || "表示：从表格中拿到值用来回显，若没有值则赋新的空值】
            // let  value = "";
            let value = this.peopleCardInfo[i].controlValue || ''
            // 创建表单项，用于绑定数据
            this.$set(this.formdisplay, this.peopleCardInfo[i].controlCode, value)
          }
        }
        this.loading = false
      })
    },

    // 取消卡片编辑
    Cancelcard() {
      this.Editcard = false
    },

    // 查询树
    getTree() {
      let param = {
        userId: localStorage.getItem('userId'),
        flag: 0,
      }
      areaTree(param).then((res) => {
        this.$set(this.queryForm, 'areaId', res.data[0].id)
        this.selectArea = res.data[0]
        this.treeData = res.data
      })
    },
    //查询
    handlePeopleQuery() {
      this.page.pageNum = 1
      this.fetchList()
    },
    // 查询表格列表数据
    fetchList() {
      this.tabLoading = true
      let params = {
        ...this.queryForm,
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        templateCode: this.templateCode,
      }
      getList(params).then((res) => {
        if (res.code == 200) {
          this.page.total = res.total
          let arr = res.rows.map((item) => {
            item.expand = []
            return item
          })
          this.list = arr
        } else {
          this.page.total = 0
        }
        this.tabLoading = false
      })
    },

    //获取标准地址
    tableExpand(row) {
      // 先判断该行是否已经展开了
      let param = {
        certificateId: row.idCardNo,
      }
      getHouseList(param).then((res) => {
        row.expand = res.data
        this.timeKey = Date.now()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 10px;
  display: flex;
  .item {
    .label {
      cursor: pointer;
    }
    .arrow {
      margin: 0 10px;
    }
  }
  .item:last-child {
    .label {
      color: #1890ff;
    }
    .arrow {
      display: none;
    }
  }
}
.table {
  width: 100%;
  padding-left: 10px;
  .account {
    display: flex;
    align-items: center;
    height: 35px;
    margin-bottom: 10px;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>

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
