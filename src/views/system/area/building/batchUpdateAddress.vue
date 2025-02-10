<template>
  <div class="app-container" v-loading="loading">
    <div class="wrap">
      <el-table
        :data="tableList"
        border
        style="width: 100%"
        :header-cell-style="{background:'#EBF7FF',color:'#606266', 'text-align': 'center'}">
        <el-table-column
          prop="id"
          label="编号"
          width="100"
          align="center"
          :header-row-style="{background:'#000'}">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="类型"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="名称"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="所属网格"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="所属小区"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="buildingAddress"
          label="房屋标准地址">
          <template slot-scope="scope">
            <el-input v-model="scope.row.buildingAddress" placeholder="请输⼊阈值" size="medium"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <footer>
        <el-button type="primary" @click="save">确定</el-button>
      </footer>
    </div>
  </div>
</template>

<script>
import {retrunUpdateInfo, batchUpdateAddress} from '@/api/area/house'
export default {
  name: "batchUpdateAddress",
  data () {
    return {
      loading: false,
      tableList: []
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    save () {
      let params = []
      this.tableList.map((item) => {
        params.push(
          {
            id: item.id,
            buildingAddress: item.buildingAddress,
            buildingMaster: '',
            buidingMeasure: '',
            architectureType: '',
            architecturePurpose: '',
            housePropertyRight: '',
            hiddenDangerType: '',
            hiddenDangerLevel: ''
          }
        )
      })
      console.log(params);
      this.loading = true
      batchUpdateAddress (params).then((res) => {
        if (res.code === 200) {
          this.loading = false
          this.$router.push({path: '/buildingHeight'})
          this.$message.success(res.msg)
          console.log(res);
        }
      })
    },
    getInfo () {
      let idList = localStorage.getItem('checkedIdList')
      this.loading = true
      retrunUpdateInfo (idList).then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.loading = false
          this.tableList = res.data
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  footer {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 60px;
  }
}
</style>
