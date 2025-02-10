<template>
  <div>
    <el-form v-model="queryParams" :inline="true" size="small">
      <el-form-item label="网格：" prop="areaId" label-width="54px">
        <treeSelect
          v-model="queryParams.areaId"
          :props="treeProps"
          :options="treeData"
          :value="value"
          :accordion="true"
          @click.native="getTree"
          placeholder="请选择">
        </treeSelect>
      </el-form-item>
      <el-form-item label="关键字：" prop="key" label-width="68px">
        <el-input clearable v-model="queryParams.key" placeholder="名称/网格长/网络员" />
      </el-form-item>
      <el-form-item label="网格类型：" prop="areaType" label-width="82px">
        <el-select clearable v-model="queryParams.areaType" placeholder="请选择">
          <el-option
            v-for="dict in dict.type.grid_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标注状态：" prop="isLabel" label-width="82px">
        <el-select clearable v-model="queryParams.isLabel" placeholder="请选择">
          <el-option
            v-for="dict in dict.type.is_label"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="党组织设立：" prop="isParty" label-width="96px">
        <el-select clearable v-model="queryParams.isParty" placeholder="请选择">
          <el-option
            v-for="dict in dict.type.is_party"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="position: absolute;width: 124px">
        <el-button plain size="mini" @click="handleGridQuery">查询</el-button>
        <el-button plain size="mini" v-hasPermi="['system:grid:export']" @click="handleGridExport">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :loading="loading"
      :data="gridList"
      :header-cell-style="{background:'#EBF7FF'}"
      stripe border>
      <!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="网格编号" align="center" prop="areaNo" />
      <el-table-column label="名称" align="center" prop="areaName" width="164px">
        <template slot-scope="scope">
          <p v-if="scope.row.areaName === '' || scope.row.areaName === null">/</p>
          <p v-else>{{scope.row.areaName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属上级" align="center" prop="baGridArea">
        <template slot-scope="scope">
          <p class="card-font" v-if="scope.row.baGridArea === '' || scope.row.baGridArea === null || scope.row.baGridArea === undefined">顶级网格</p>
          <p class="card-font" v-else>{{scope.row.baGridArea.areaName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="网格类型" align="center" prop="areaType">
        <template slot-scope="scope">
          <p v-if="scope.row.areaType === '' || scope.row.areaType === null">/</p>
          <p v-else>{{scope.row.areaType}}</p>
        </template>
      </el-table-column>
      <el-table-column label="网格长" align="center" prop="arealeaderName">
        <template slot-scope="scope">
          <p v-if="scope.row.arealeaderName === '' || scope.row.arealeaderName === null">/</p>
          <p v-else>{{scope.row.arealeaderName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="网格员" align="center" prop="areaerName">
        <template slot-scope="scope">
          <p v-if="scope.row.areaerName === '' || scope.row.areaerName === null">/</p>
          <p v-else>{{scope.row.areaerName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="党组织是否设立" align="center" prop="partyName">
        <template slot-scope="scope">
          <p v-if="scope.row.partyName === '' || scope.row.partyName === null">否</p>
          <p v-else>是</p>
        </template>
      </el-table-column>
      <el-table-column label="地图标注" align="center" prop= isTagging>
        <template slot-scope="scope">
          <a class="card-state unmarked icon-map-marker" @click.stop="openMap()" v-if="scope.row.isTagging === null || scope.row.isTagging === '' ">未标注</a>
          <a class="card-state marked icon-map-marker" @click.stop="openMap()" v-else>已标注</a>
        </template>
      </el-table-column>
      <el-table-column label="行政区类别" align="center" prop="areaLevel">
        <template slot-scope="scope">
          <p v-if="scope.row.areaLevel === '' || scope.row.areaLevel === null">/</p>
          <dict-tag v-else :options="dict.type.administrative_region" :value= scope.row.areaLevel />
        </template>
      </el-table-column>
    </el-table>
    <p>共查询/检索{{this.queryParams.total}}条信息</p>

    <!--        &lt;!&ndash;标注弹窗&ndash;&gt;-->
    <!--        <el-dialog-->
    <!--          :visible.sync="dialogAnnotate"-->
    <!--          title="绘制网格"-->
    <!--          width="70%"-->
    <!--          height="600px"-->
    <!--          class="map"-->
    <!--          :close-on-click-modal="false">-->
    <!--          <gridMap :center="this.center"></gridMap>-->
    <!--        </el-dialog>-->

    <!-- 分页 -->
    <pagination
      :total="queryParams.total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getGridList()"
    />
  </div>
</template>

<script>
import {listAreaLimit,areaTree} from "@/api/area/area";
export default {
  name: "queryGrid",
  dicts: [
    'grid_type',
    'administrative_region',
    'is_label',
    'is_party',
  ],
  data() {
    return {
      loading: true,  // 遮罩层
      dialogAnnotate: false,  //地图弹窗
      center: [12529117.002647482,4561158.359249212], //地图中心点
      gridList: [], // 网格数据
      treeData: [], //下拉框数据
      treeProps: {
        label: "label",
        value: "id",
        children: "children",
      },
      value:'',//选中的数据
      queryParams: {  //网格
        userId:localStorage.getItem("userId"), //用户ID
        pageNum: 1, //当前页数
        pageSize: 10,  //每页条数
        total: 0, // 总页数
      },
    };
  },
  mounted() {
    this.getGridList();  //网格数据
    this.getTree();  //树状下拉框
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
    //网格
    //获取网格数据
    getGridList() {
      this.loading = true;
      listAreaLimit(this.queryParams).then(res => {
        this.gridList = res.rows;
        this.queryParams.total = res.total;
      });
    },

    // 查询
    handleGridQuery() {
      this.queryParams.pageNum = 1;
      this.getGridList(this.queryParams);
    },

    // 导出
    handleGridExport() {
      this.download('system/area/export', {
        ...this.queryParams
      }, `网格信息-${new Date().getTime()}.xlsx`)
    },

    // 标注弹窗打开
    openMap() {
      this.dialogAnnotate = true;
    },
  },
}
</script>

<style scoped>
/* 已标注字体颜色 */
.marked {
  color: #3bc2b4;
}
/* 未标注字体颜色 */
.unmarked {
  color: #999;
}
</style>
