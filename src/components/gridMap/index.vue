<template>
  <div>
    <div id="container"></div>
    <div class="button-card">
      <el-button type="primary" v-if="build !== true" @click="polygon()">绘制区域</el-button>
      <el-button type="primary" @click="marker()">绘制中心点</el-button>
      <el-button type="primary" @click="clearPoly()">清除区域</el-button>
      <el-button type="primary" @click="goParent()">保存</el-button>
    </div>
    <div class="input-item">
      <el-input placeholder="请输入关键字" size="mini" id="tipInput" v-model="searchFor">
        <template slot="prepend">请输入关键字</template>
      </el-input>
    </div>
  </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import { updateArea } from "@/api/area/area";
export default {
  name: 'gridMap',
  props: ['mapData', 'dialogAnnotate'],  //接收父组件的值
  data() {
    return {
      polyEditor: null,
      polygonPaths: [],
      map: null,
      polygons: [],
      mouseTool: null,
      placeSearch: null,
      searchFor: '',  //搜索框
      mapInfo: {
        areaLabel: null,    //标注（绘制）
        areaCenter: null    //中心点（绘制）
      },
      areaId: '',
      gridMapData: {}, //监听到的父组件传值
      clear: false, //点击清空
      polygonClick: false,  //点击绘制区域
      markerClick: false,  //点击绘制中心点
      poly: [],  //区域点数组
      build: '',
    }
  },
  watch: {
    //监听父组件弹窗是否打开
    dialogAnnotate: {
      handler(newVal) {
        this.clear = false
        this.polygonClick = false
        this.markerClick = false
        if (newVal === true) {
          this.clear = false
          this.initMap()
        }
      },
      immediate: true,  //立即监听
    },
    //监听父组件的传值
    mapData: {
      handler(newVal) {
        console.log(newVal)
        this.gridMapData = newVal
        this.areaId = newVal.areaId
        this.build = newVal.build
        // console.log(this.areaId,4575)
        this.mapInfo = {
          areaLabel: newVal.gridTagging,    //标注（绘制）
          areaCenter: newVal.gridCenter    //中心点（绘制）
        }
      },
      immediate: true,  //立即监听
      deep: true,  //深度监听
    },
  },
  methods: {
    async initMap() {
      window._AMapSecurityConfig = {
        securityJsCode: 'e2bc5aa4293feefd736ef345549aaa79',
      }
      let AMap = await AMapLoader.load({
        key: '4e1c48b4317ccc211cacdc9dde63e5ef',
        version: '2.0',
        plugins: [
          'AMap.PolygonEditor',
          'AMap.Autocomplete',
          'AMap.PlaceSearch',
          'AMap.Scale',
          'AMap.OverView',
          'AMap.ToolBar',
          'AMap.MapType',
          'AMap.PolyEditor',
          'AMap.CircleEditor',
          'AMap.Geolocation',
          'AMap.Geocoder',
          'AMap.AMapUI',
          'AMap.MouseTool',
        ]
      })
      this.map = new AMap.Map('container', {
        zoom: 15,
        plugin: [   //一些工具插件
          {
            pName: 'MapType',  //地图类型
            defaultType: 0,
            events: {
              init(instance) {
              }
            }
          },
        ]
      })
      //当页面未清除时显示默认覆盖物
      if (this.clear === false) {
        this.covering()
      }
      //当点击绘制区域，绘制完成后显示覆盖物
      if (this.polygonClick === true) {
        this.polygonEnd()
      }
      //当点击绘制中心点，绘制完成后显示点标记
      if (this.markerClick === true) {
        this.markerEnd()
      }
      //搜索
      this.mapSearchInit()
      // 缩放地图到合适的视野级别
      this.map.setFitView()
    },

    //页面打开默认展示覆盖物
    covering() {
      if (this.gridMapData.gridCenter !== null && this.gridMapData.gridCenter !== undefined && this.gridMapData.gridCenter !== '') {
        let center = []
        let itemCenter = this.gridMapData.gridCenter.split(',')
        itemCenter.forEach((item) => {
          let centerNumber = Number(item)
          center.push(centerNumber)
        })
        //文本标签
        if (this.build === undefined) {
          var text = new AMap.Text({
            text: this.gridMapData.areaName,
            position: center,
            anchor: 'center', //设置锚点
            style: {
              'text-align': 'center',
              'font-size': '16px',
              'background': this.gridMapData.areaColor,
              'color': '#fff',
              'padding': '6px'
            },
          });
          this.map.add(text)
        } else if (this.build === true) {
          var buildMarker = new AMap.Marker({
            position: center,
          });
          this.map.add(buildMarker)
        }
      }
      if (this.gridMapData.gridTagging !== null && this.gridMapData.gridTagging !== undefined && this.gridMapData.gridTagging !== '') {
        let tagging = []
        let gridDefault = this.gridMapData.gridTagging.split(';')
        gridDefault.forEach((item) => {
          let array = []
          let items = item.split(',')
          items.forEach((item) => {
            let number = Number(item)
            array.push(number)
          })
          tagging.push(array)
        })
        //网格默认显示区域
        var polygon = new AMap.Polygon({
          path: tagging,
          strokeColor: this.gridMapData.areaColor,
          strokeWeight: 3,
          fillOpacity: 0.4,
          fillColor: this.gridMapData.areaColor,
          zIndex: 50,
          bubble: true,
        })
        this.map.add(polygon)
      }
      console.log();
    },

    //搜索
    mapSearchInit() {
      const self = this
      AMap.plugin(['AMap.AutoComplete', 'AMap.PlaceSearch'], function () {
        var autoOptions = {
          input: "tipInput",
          city: '太原市',
        };
        const auto = new AMap.Autocomplete(autoOptions);
        const placeSearch = new AMap.PlaceSearch({
          map: self.map
        });  //构造地点查询类
        function seach(e) {
          self.info = {
            la: e.poi.location.lat,
            wd: e.poi.location.lng,
          };
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name); //关键字查询查询
        }
        auto.on("select", seach);
      })
    },

    // 绘制中心点
    marker() {
      this.markerClick = true
      var markers = new AMap.MouseTool(this.map);
      markers.marker(); //使用鼠标工具，在地图上画标记点
      markers.on('draw', (event) => {
        let marker = event.obj   // 绘制完点实例对象
        console.log('点的位置--------> ', marker.getPosition())
        var center = marker.getPosition().lng + ',' + marker.getPosition().lat
        console.log(center)
        this.mapInfo.areaCenter = center
        this.initMap()
      })
    },
    //中心点绘制完成显示
    markerEnd() {
      let center = this.mapInfo.areaCenter.split(',')
      var marker = new AMap.Marker({
        position: center,
      });
      this.map.add(marker)
      // var text = new AMap.Text({
      //   text:this.gridMapData.areaName,
      //   position: center,
      //   anchor: 'center', //设置锚点
      //   style:{
      //     'text-align': 'center',
      //     'font-size': '16px',
      //     'background':this.gridMapData.areaColor,
      //     'color': '#fff',
      //     'padding':'6px'
      //   },
      // });
      // this.map.add(text)
    },

    // 绘制区域
    polygon() {
      this.$notify({
        title: '操作提示',
        message: '点击绘制网格后，依次单击地图页面开始绘制，双击完成绘制操作',
      });
      this.polygonClick = true
      var polyTool = new AMap.MouseTool(this.map);
      polyTool.polygon({
        strokeColor: "#1791fc",
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#1791fc',
        fillOpacity: 0.4,
        strokeStyle: "solid",
        extData: {
          id: '123'
        }
      })
      polyTool.on('draw', (event) => {
        this.poly = event.obj   // 绘制完多边形实例对象
        // console.log('绘制图形顶点信息列表--------> ', this.poly.getOptions())
        // console.log('绘制图形的自定义属性--------> ', this.poly.getOptions().path)
        var coordinates = ''
        for (let i = 0; i < this.poly.getOptions().path.length; i++) {
          const element = this.poly.getOptions().path[i];
          var data = element[0] + ',' + element[1]
          coordinates = data + ';' + coordinates
        }
        this.mapInfo.areaLabel = coordinates.substring(0, coordinates.lastIndexOf(';'))
        polyTool.close()
        polyTool = null
        this.initMap()
      })
    },

    //区域绘制完成显示
    polygonEnd() {
      let poly = this.poly.getOptions().path
      var polygon = new AMap.Polygon({
        path: poly,
        strokeColor: this.gridMapData.areaColor,
        strokeWeight: 3,
        fillOpacity: 0.4,
        fillColor: this.gridMapData.areaColor,
        zIndex: 50,
        bubble: true,
      })
      this.map.add(polygon)
    },

    //清除区域
    clearPoly() {
      this.clear = true
      this.polygonClick = false
      this.markerClick = false
      this.map.clearMap(); //去除
      this.initMap();
      this.mapInfo = {
        areaCenter: null,  //中心点
        areaLabel: null
      };  //x
      //setTimeout(this.goParent,1000); //vue定时器

      this.$emit("coordinates", this.mapInfo, this.areaId);


      //    var param  = {
      //      areaId : this.areaId,
      //      areaCenter : this.mapInfo.areaCenter,
      //      isTagging: this.mapInfo.areaLabel
      //    }
      //    // console.log('子组件传参==',param);
      //    updateArea(param).then((res) => {
      //      // console.log('子组件传参==',param);
      //      this.$modal.msgSuccess("清除成功");
      //    });
    },
    //保存
    goParent() {
      this.$emit("coordinates", this.mapInfo, this.areaId);
      console.log(this.mapInfo)


      //   	if(!this.mapInfo.areaCenter&&!this.mapInfo.areaLabel){
      //   	console.log(this.gridMapData)
      //   	this.mapInfo.areaCenter=this.gridMapData.gridCenter
      //   	this.mapInfo.areaLabel=this.gridMapData.gridTagging
      //   	}
      //   	var param  = {
      //      areaId :this.areaId,
      //      areaCenter : this.mapInfo.areaCenter,
      //      isTagging: this.mapInfo.areaLabel
      //    }
      //    updateArea(param).then((res) => {
      //    	if(res.code==200){
      //	        this.$modal.msgSuccess("保存成功");
      //		      //给父组件通信传参
      //		      this.$emit("coordinates");
      //    	}
      //    });
    },
  }
}
</script>
<style scoped>
/*地图*/
#container {
  width: 100%;
  height: 600px;
}

/*搜索框位置*/
.input-item {
  position: absolute;
  background: white;
  padding: 10px;
  left: 12px;
  top: 60px;
}

/*搜索框高度*/
.el-input--mini .el-input__inner {
  height: 38px;
  line-height: 38px;
}

/*按钮位置*/
.button-card {
  text-align: right;
  position: relative;
  bottom: 42px;
  right: 10px;
}
</style>
