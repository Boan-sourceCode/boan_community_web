<template>
  <div class="app-container" v-loading="loading">
    <p class="title">批量修改房层属性</p>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :header-cell-style="{ background: '#EBF7FF' }"
    >
      <el-table-column prop="id" label="编号" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="houseNumber"
        label="门牌号"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="areaName"
        label="所属网格"
        width="110"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="communityName"
        label="所属建筑"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.communityName }}{{ scope.row.buidingNumber }}
        </template>
      </el-table-column>
      <el-table-column
        prop="unitNumber"
        label="所属单元"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="storey" label="楼层" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="housePropertyRight"
        label="房屋产权"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.housePropertyRight"
            placeholder="请选择"
          >
            <el-option
              v-for="dict in dict.type.house_property_right"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="houseMeasure"
        label="建筑面积（㎡）"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.houseMeasure"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="houseType"
        label="房屋房型"
        width="135"
        align="center"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.houseType" placeholder="请选择">
            <el-option
              v-for="dict in dict.type.house_housetype"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="houseProperty"
        label="房屋性质"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.houseProperty" placeholder="请选择">
            <el-option
              v-for="dict in dict.type.house_property"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="housePurpose"
        label="房屋用途"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.housePurpose" placeholder="请选择">
            <el-option
              v-for="dict in dict.type.courtyard_house_purpose"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="hiddenDangerType"
        label="楼隐患类型"
        width="155"
        align="center"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.hiddenDangerType" placeholder="请选择">
            <el-option
              v-for="dict in dict.type.building_danger_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="hiddenDangerLevel"
        label="楼隐患级别"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.hiddenDangerLevel" placeholder="请选择">
            <el-option
              v-for="dict in dict.type.focous_degree"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否落户为房屋"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.registeredStatus" placeholder="请选择">
            <el-option
              v-for="dict in dict.type.is_party_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
              @click.native="getStatus(value)"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="houseAddress"
        label="标准地址"
        align="center"
        width="500"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.houseAddress"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <footer>
      <el-button type="primary" @click="save">确定</el-button>
    </footer>
  </div>
</template>

<script>
import {
  houseReturnUnpdateInfo,
  batchUpdateHouseBefore,
  batchUpdateHouseInfo,
} from "@/api/area/house";
export default {
  dicts: [
    "house_property_right",
    "building_danger_type",
    "focous_degree",
    "house_housetype",
    "is_party_status",
    "house_property",
    "courtyard_house_purpose",
  ],
  name: "batchSettingsHouseHeight",
  data() {
    return {
      loading: false,
      tableData: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      queryParams: {},
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getStatus(val) {
      console.log(val);
    },
    save() {
      let params = [];
      this.tableData.map((item) => {
        console.log(item);
        params.push({
          id: item.id,
          housePropertyRight: item.housePropertyRight,
          houseMeasure: item.houseMeasure,
          houseType: item.houseType,
          houseProperty: item.houseProperty,
          housePurpose: item.housePurpose,
          hiddenDangerType: item.hiddenDangerType,
          hiddenDangerLevel: item.hiddenDangerLevel,
          registeredStatus: item.registeredStatus,
          houseAddress: item.houseAddress,
        });
      });
      console.log(params);
      params.map((i) => {
        if (i.registeredStatus === "是") {
          i.registeredStatus = 0;
        } else {
          i.registeredStatus = 1;
        }
      });
      this.loading = true;
      batchUpdateHouseInfo(params).then((res) => {
        if (res.code === 200) {
          this.loading = false;
          this.$router.push({
            path: "/houseHeight",
            query: {
              id: this.$route.query.id,
              areaId: this.$route.query.areaId,
            },
          });
          this.$message.success(res.msg);
          console.log(res);
        }
      });
    },
    getInfo() {
      console.log(JSON.parse(localStorage.getItem("houseHeightCheckedIdList")));
      let params = {
        idList: JSON.parse(localStorage.getItem("houseHeightCheckedIdList")),
      };
      this.loading = true;
      batchUpdateHouseBefore(params).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.loading = false;
          this.tableData = res.data;
          // this.queryParams = res.data[0]
          this.tableData.map((item) => {
            if (item.registeredStatus === 0) {
              item.registeredStatus = "是";
            } else {
              item.registeredStatus = "否";
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    margin: 0 0 20px 0;
  }
  p {
    font-family: Microsoft YaHei;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    text-align: center;
  }
  ::v-deep .el-table {
    ::v-deep .el-table__header-wrapper {
    }
  }
  footer {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
}
</style>
