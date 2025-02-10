<!-- 综合查询 -->
<template>
  <div class="app-container">
    <h1 class="title-font">人口卡片</h1>
    <div class="app-container_content">
      <div class="menu">
        <h1>分类列表</h1>
        <el-menu :default-active="defaultActive" @open="handleOpen" @close="handleClose">
          <el-submenu
            :index="oneIndex + 1 + ''"
            v-for="(oneItem, oneIndex) in treeList"
            :key="oneIndex"
          >
            <template slot="title">
              <span>{{ oneItem.templateType }}</span>
            </template>
            <el-menu-item
              :index="twoItem.templateId + ''"
              v-for="twoItem in oneItem.child"
              :key="twoItem.templateId"
              @click="clickMenu(twoItem)"
              >{{ twoItem.templateName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </div>

      <!-- 常用内容 -->
      <div class="content" v-show="pageType == 'list'">
        <h1>内容列表</h1>
        <queryCommon :templateCode="templateCode" :templateName="templateName"></queryCommon>
      </div>

      <!-- 统计页面 -->
      <div class="statistics-container" v-show="pageType == 'statistics'">
        <div class="top">
          <!-- 年龄占比 -->
          <div class="age-box">
            <div class="title">年龄占比</div>
            <div id="ageEchart" style="width: 100%; height: 100%"></div>
          </div>
          <!-- 空巢、独居老人占比 -->
          <div class="alone-box">
            <div class="title">空巢、独居老人占比</div>
            <div id="aloneEchart" style="width: 100%; height: 100%"></div>
          </div>
          <!-- 健康状况 -->
          <div class="healthy-box">
            <div class="title">健康状况</div>
            <div id="healthyEchart" style="width: 100%; height: 100%"></div>
          </div>
        </div>

        <div class="bottom">
          <!-- 居住分布 -->
          <div class="live-box">
            <div class="title">居住分布</div>
            <div id="liveEchart" style="width: 100%; height: 100%"></div>
          </div>
          <!-- 兴趣排行榜 -->
          <div class="interest-box">
            <div class="title">兴趣排行榜</div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="No" align="center" label="排名"> </el-table-column>
              <el-table-column prop="name" align="center" label="项目"> </el-table-column>
              <el-table-column prop="num" align="center" label="人数"> </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTemplateTree } from '@/api/area/common.js'
import queryCommon from './querySon/queryCommon'
import * as echarts from 'echarts'

export default {
  name: 'query',
  components: {
    queryCommon,
  },
  data() {
    return {
      activeName: '常用', //页面默认选项
      loading: true, // 遮罩层
      treeList: [],
      // 模板名称
      templateName: '',
      // 模板编码
      templateCode: '',
      // 默认选中菜单
      defaultActive: '',
      // 页面类型
      pageType: 'list',
      // ==================================================================统计图==================================================================
      ageOptions: {
        color: ['#21ccff', '#846bce', '#249eff', '#86df6c', '#0e42d2'],
        legend: {
          top: 'bottom',
        },
        series: [
          {
            name: '年龄占比',
            type: 'pie',
            startAngle: 280,
            radius: [40, 75],
            center: ['50%', '40%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              show: true,
              formatter(param) {
                return param.value + '人'
              },
            },
            data: [
              { name: '60-80岁', value: 171 },
              { name: '80-90岁', value: 63 },
              { name: '90岁以上', value: 23 },
            ],
          },
        ],
      },
      aloneOptions: {
        color: ['#0055fe', '#ff81a3', '#21ccff'],
        legend: {
          top: 'bottom',
        },
        series: [
          {
            name: '空巢、独居老人占比',
            type: 'pie',
            startAngle: 280,
            radius: [40, 75],
            center: ['50%', '40%'],
            minAngle: 15,
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              show: true,
              formatter(param) {
                return param.value + '%'
              },
            },
            data: [
              { name: '空巢老人', value: 1.31 },
              { name: '独居老人', value: 0.12 },
              { name: '其他', value: 98.57 },
            ],
          },
        ],
      },
      healthyOptions: {
        color: ['#21ccff', '#846bce', '#249eff', '#86df6c', '#0e42d2'],
        legend: {
          top: 'bottom',
        },
        series: [
          {
            name: '健康状况',
            type: 'pie',
            startAngle: 280,
            radius: [40, 75],
            center: ['50%', '40%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              show: true,
              formatter(param) {
                return param.value + '%'
              },
            },
            data: [
              { name: '健康', value: 28 },
              { name: '糖尿病', value: 15 },
              { name: '慢性病', value: 20 },
              { name: '重病', value: 19 },
              { name: '高血压', value: 18 },
            ],
          },
        ],
      },
      liveOptions: {
        color: ['#21ccff'],
        xAxis: {
          type: 'category',
          data: [
            '第一网格',
            '第二网格',
            '第三网格',
            '第四网格',
            '第五网格',
            '第六网格',
            '第七网格',
            '第八网格',
            '第九网格',
            '第十网格',
            '第十一网格',
            '第十二网格',
          ],
        },
        yAxis: {
          type: 'value',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 40, 60, 150, 180, 160],
            barWidth: '30',
            type: 'bar',
          },
        ],
      },
      tableData: [
        { No: 'NO.1', name: '跳舞', num: 28 },
        { No: 'NO.2', name: '下象棋', num: 20 },
        { No: 'NO.3', name: '太极', num: 16 },
        { No: 'NO.4', name: '钓鱼', num: 13 },
        { No: 'NO.5', name: '书画', num: 12 },
      ],
    }
  },
  created() {
    this.fetchTreeList()
  },
  mounted() {
    if (this.treeList.length) {
      this.clickMenu(this.treeList[0].child[0])
    }
  },
  methods: {
    clickMenu(item) {
      if (item.templateName == '养老统计') {
        this.pageType = 'statistics'
        this.$nextTick(() => {
          this.initEcharts()
        })
      } else {
        this.pageType = 'list'
        this.templateName = item.templateName
        this.templateCode = item.templateCode
      }
    },
    fetchTreeList() {
      getTemplateTree().then((res) => {
        // 插入养老统计菜单
        res.data.forEach((item) => {
          if (item.templateType == '养老卡片') {
            item.child.unshift({
              templateType: '养老卡片',
              templateName: '养老统计',
              templateId: Date.now(),
            })
          }
        })
        this.treeList = res.data
        this.defaultActive = res.data[0].child[0].templateId + ''
        this.clickMenu(this.treeList[0].child[0])
      })
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    // ==================================================================统计图==================================================================
    initEcharts() {
      this.setEchart('ageEchart', this.ageOptions)
      this.setEchart('aloneEchart', this.aloneOptions)
      this.setEchart('healthyEchart', this.healthyOptions)
      this.setEchart('liveEchart', this.liveOptions)
    },
    // 设置图表
    setEchart(id, options) {
      const dom = echarts.init(document.getElementById(id))
      if (dom) dom.setOption(options)
    },
  },
}
</script>

<style lang="scss" scoped>
.app-container_content {
  display: flex;
  .menu {
    width: 230px;
    ::v-deep .el-menu {
      width: 230px;
      border-right: none;
    }
  }
  .content {
    flex: 1;
    width: calc(100% - 230px);
  }

  // 统计页面内容
  .statistics-container {
    width: 100%;
    .top,
    .bottom {
      & > div[class*='-box'] {
        .title {
          text-align: center;
          font-size: 26px;
          font-weight: bold;
          color: #333333;
          line-height: 26px;
        }
      }
    }

    .top {
      display: flex;
      align-items: center;
      width: 100%;
      .age-box {
        flex: 1;
        // width: 400px;
        height: 320px;
      }
      .alone-box {
        flex: 1;
        // width: 400px;
        height: 320px;
      }
      .healthy-box {
        flex: 1;
        // width: 400px;
        height: 320px;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 60px;
      .live-box {
        width: calc(100% - 430px);
        height: 340px;
      }
      .interest-box {
        width: 430px;
        height: 340px;
        .el-table {
          margin-top: 16px;
        }
      }
    }
  }
}
.title-font {
  text-align: left;
  font-weight: bold;
  color: #ff933e;
}
/*选项卡公共样式*/
::v-deep .el-tabs--card > .el-tabs__header {
  border: none;
}
::v-deep .el-tabs__nav-scroll {
  width: 27%;
  margin: 0 auto;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-bottom: 1px solid #dfe4ed;
  margin-bottom: 10px;
}
</style>
