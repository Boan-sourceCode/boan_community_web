<!--建筑组件-->
<template>
  <div id="buildBox">
    <!--图标和文字-->
    <el-tabs v-model="activeName" tabPosition="right" class="tabRight" @tab-click="handleClick">
      <el-tab-pane name="all">
        <div slot="label" @click="isShow" style="margin-top: 6px">
          <i class="icon-city iconRight" style="background:#fff"></i>
          <p style="color: #1F79F3">所有建筑</p>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--内容-->
    <div class="contentPosition">
      <!--指向箭头-->
      <div class="arrow"></div>
      <div class="contentRight">
        <div v-if="this.activeName === 'all'">
          <div style="padding: 0 20px">
            <div>
              <p style="font-weight: bold;">
                工作人员（{{ this.sum }}）
                <i class="el-icon-d-arrow-right iconArrow" @click="isHidden" style="cursor: pointer"></i>
              </p>
            </div>
            <div>
              <div class="peopleBox" :class="tabActive === '公共建筑' ? 'isSchoolActive' : ''" style="background: #DFF4E6"
                @click="build('公共建筑')">
                <div class="peopleIcon">
                  <i class="icon-school"></i>
                </div>
                <div class="peopleContent">
                  <p>公共建筑({{ this.buildingType.publicAccount }})</p>
                </div>
              </div>
              <div class="peopleBox city" :class="tabActive === '楼房' ? 'isCityActive' : ''" style="background: #E1ECFA;"
                @click="build('楼房')">
                <div class="peopleIcon">
                  <i class="icon-city"></i>
                </div>
                <div class="peopleContent">
                  <p>所有楼房({{ this.buildingType.buildingAccount }})</p>
                </div>
              </div>
              <div class="peopleBox" :class="tabActive === '院落' ? 'isCourtyardActive' : ''" style="background: #EDF4DC"
                @click="build('院落')">
                <div class="peopleIcon">
                  <i class="icon-courtyard"></i>
                </div>
                <div class="peopleContent">
                  <p>所有院落({{ this.buildingType.courtyardAccount }})</p>
                </div>
              </div>
              <div class="peopleBox low" :class="tabActive === '低层建筑' ? 'isLowActive' : ''" style="background: #F8EFE2;"
                @click="build('低层建筑')">
                <div class="peopleIcon">
                  <i class="icon-low-b"></i>
                </div>
                <div class="peopleContent">
                  <p>低层建筑({{ this.buildingType.groundFloorbuilding }})</p>
                </div>
              </div>
              <div class="peopleBox high" :class="tabActive === '高层建筑' ? 'isHighActive' : ''" style="background: #EFEAFA;"
                @click="build('高层建筑')">
                <div class="peopleIcon">
                  <i class="icon-high-b"></i>
                </div>
                <div class="peopleContent">
                  <p>高层建筑({{ this.buildingType.highRiseBuilding }})</p>
                </div>
              </div>
              <div class="peopleBox superHigh" :class="tabActive === '超高层建筑' ? 'isSuperHighActive' : ''"
                style="background: #FFE8E8;" @click="build('超高层建筑')">
                <div class="peopleIcon">
                  <i class="icon-superhigh-b"></i>
                </div>
                <div class="peopleContent">
                  <p>超高层建筑({{ this.buildingType.superHighRisebuilding }})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { BuildType, BuildPurpose, build, buildNoPage } from "@/api/area/gisMap";
export default {
  name: "communication",
  dicts: ['building_type'], //字典
  props: ['map', 'areaId'],  //接收父组件的值
  data() {
    return {
      markerCl: null,
      objMap: {
        '公共建筑': {
          icon: require("@/assets/images/gis_gonggongjianzhu.png"),
          icon1: require("@/assets/images/gis_gonggongjianzhu_1.png"),
          color: '#62C680',
        },
        '院落': {
          icon: require("@/assets/images/gis_yuanluo.png"),
          icon1: require("@/assets/images/gis_yuanluo_1.png"),
          color: '#A6C650',
        },
        '楼房': {
          icon: require("@/assets/images/gis_loufang.png"),
          icon1: require("@/assets/images/gis_loufang_1.png"),
          color: '#6CA0E6',
        },
        '低层建筑': {
          icon: require("@/assets/images/gis_dicengjianzhu.png"),
          icon1: require("@/assets/images/gis_dicengjianzhu_1.png"),
          color: '#D9B171',
        },
        '高层建筑': {
          icon: require("@/assets/images/gis_gaocengjianzhu.png"),
          icon1: require("@/assets/images/gis_gaocengjianzhu_1.png"),
          color: '#AD94E6',
        },
        '超高层建筑': {
          icon: require("@/assets/images/gis_chaogaojianzhu.png"),
          icon1: require("@/assets/images/gis_chaogaojianzhu_1.png"),
          color: '#FD8D8D',
        },
      },
      show: true, //当只有一页时隐藏分页
      tabActive: '公共建筑', //选中样式
      activeName: 'all', //右侧选项
      aresIds: '',  //监听树形下拉框的数据
      sum: '',  //建筑总数
      buildingType: [],  //建筑类型统计
      buildList: [],  //不同组织的数据
      markerGroups: [],  //标注点集合

      //建筑类型
      typePage: {
        total: 0,   // 总条数
        pageNum: 1, //当前页
        pageSize: 8, //每页多少条
      },
      buildType: '住宅建筑',  //建筑类型下拉框
      purposeOptions: [],  //建筑用途数据
      active: '',  //建筑用途选中数据
      purposeList: [],  //不同建筑用途的数据
      purposeName: '',  //建筑用途搜索条件
      purposeMarkerList: [],  //建筑用途标注点集合

      //搜索
      searchPage: {
        total: 0,   // 总条数
        pageNum: 1, //当前页
        pageSize: 8, //每页多少条
      },
      searchName: '',  //搜索框
      searchList: [],  //不同组织的数据
      buildingName: '', //搜索条件
      searchMarkerList: [],  //搜索标注点集合
    }
  },
  watch: {
    //监听父组件的下拉框数据
    areaId: {
      handler(newVal) {
        if (newVal) {
          this.aresIds = newVal
          this.getBuildType(newVal)
          if (this.activeName === 'all') {
            this.tabActive = '公共建筑'
            this.getMarker()
          } else if (this.activeName === 'type') {
            this.getBuildPurpose()
          } else if (this.activeName === 'search') {
            this.getSearch()
          }
        }
      },
      immediate: true,  //立即监听
    },
  },
  mounted() {
    this.initPage()

    // this.getBuildPurpose()
  },
  beforeDestroy() { //销毁前清除地图上的聚合点
    if (this.markerCl) {
      this.markerCl.setMap(null)
    }
    this.markerCl = null
  },
  methods: {
    async initPage() {
      const res = await this.communicationLogin()
      console.log('communicationLogin', res)
      const userAgent = res.userAgent
      userAgent.on('connected', function (data) {
        console.log('data.socket', data.socket)
      })
      userAgent.on('registered', function (data) {
        //data.response 收到的SIP 2XX响应的实例
        console.log('data.response', data.response)
      })
      console.log('t01Sip', t01Sip)
      console.log('t01Sip.call', t01Sip.call)
      await t01Sip.call({
        userAgent: userAgent,
        callNumber: '70001192',
        callType: 'audio'
      })
    },
    //内容框显示
    isShow() {
      this.isHidden()
      //卡片内容
      var Id = document.getElementById("buildBox");
      let visible = Id.getElementsByClassName("contentRight")
      for (var i = 0; i < visible.length; i++) {
        visible[i].style.display = "block";
      }
      //指向箭头
      let icon = Id.getElementsByClassName('arrow')
      for (var j = 0; j < icon.length; j++) {
        icon[j].style.display = "block";
      }
    },

    //内容框隐藏
    isHidden() {
      //卡片内容
      var Id = document.getElementById("buildBox");
      let visible = Id.getElementsByClassName("contentRight")
      for (var i = 0; i < visible.length; i++) {
        visible[i].style.display = "none";
      }
      //指向箭头
      let icon = Id.getElementsByClassName('arrow')
      for (var j = 0; j < icon.length; j++) {
        icon[j].style.display = "none";
      }
    },

    //获取建筑信息（统计）
    getBuildType(data) {
      let areaIds = ''
      if (data === '' || data === undefined) {
        areaIds = ''
      } else {
        areaIds = data
      }
      let param = {
        areaId: areaIds,
        userId: localStorage.getItem("userId"),
      }
      BuildType(param).then(res => {
        this.buildingType = res.data
        this.sum = this.buildingType.courtyardAccount + this.buildingType.buildingAccount
      })
    },

    // 获取所有的标点数据
    getMarker() {
      if (this.markerCl) {
        this.markerCl.setMap(null)
      }
      let areaIds = ''
      if (this.aresIds === '' || this.aresIds === undefined) {
        areaIds = ''
      } else {
        areaIds = this.aresIds
      }
      let param = {
        areaId: areaIds,
        buildingTemplate: this.tabActive,
        gis: 1,
        userId: localStorage.getItem("userId"),
      }
      buildNoPage(param).then((res) => {
        this.buildList = res.data
        const markese = []
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(12, -6)
        });
        for (var i = 0; i < this.buildList.length; i += 1) {
          // 处理坐标数据
          if (this.buildList[i].gis !== null && this.buildList[i].gis != 0) {
            var centerArray = this.buildList[i].gis.split(',');
            let center = []
            centerArray.forEach((item) => {
              let number = Number(item)
              center.push(number)
            })
            markese.push({ lnglat: center, data: this.buildList[i] })
          }
        }
        this.markerCl = new AMap.MarkerClusterer(this.$parent.map, markese, {
          gridSize: 80,
          renderClusterMarker: this._renderClusterMarker,
          renderMarker: this._renderMarker,
        });
        this.markerCl.on('click', data => {
          if (data.clusterData.length <= 1) {
            const option = data.clusterData[0].data
            this.showDe(infoWindow, option, data.clusterData[0].lnglat)
          } else {
            //计算所有聚合点的中心点
            let alng = 0,
              alat = 0;
            for (const m of data.clusterData) {
              alng += m.lnglat.lng;
              alat += m.lnglat.lat;
            }
            const lat = alat / data.clusterData.length;
            const lng = alng / data.clusterData.length;
            //以中心点固定倍数放大地图，达到展开聚合点的效果
            this.$parent.map.setZoom(this.$parent.map.getZoom() + 1);
            this.$parent.map.setCenter([lng, lat]);
          }
        });
      })
    },
    _renderMarker(context) {
      // 自定义点标记样式
      var div = document.createElement('div');
      div.innerHTML = `
        <img src="${this.objMap[this.tabActive].icon1}" style="width: 55px;height: 55px;">`;
      div.style.color = this.objMap[this.tabActive].color;
      context.marker.setContent(div);
      context.marker.setAnchor('center');
    },
    _renderClusterMarker(context) {
      const count = context.count; // 聚合中点的总数
      const styleObj = {
        text: 'text',
        size: Math.round(30 + Math.pow(count / this.buildList.length, 1 / 5) * 70),
        color: '#ffffff',
        textAlign: 'center',
        boxShadow: '0px 0px 12px rgba(0,0,0,0.15)'
      };
      // 自定义点标记样式
      var div = document.createElement('div');
      div.style.backgroundColor = 'white';
      div.style.borderRadius = '10px';
      div.style.padding = '5px';
      div.style.display = 'flex';
      div.style.width = 'max-content';
      div.innerHTML = `
        <div style="
          width: 13px;
          height: 13px;
          position: absolute;
          left: 50%;
          top: 84%;
          background: #fff;
          transform: rotate(135deg);
          "></div>
        <img src="${this.objMap[this.tabActive].icon}" style="width: 35px;height: 35px;">
        <div style="font-size: 10px; margin-left: 5px;">
            <div style=" margin-top: 2px;">${count}</div>
            <div style=" margin-top: 3px;">${this.tabActive}个数</div>
        </div>
          `;
      div.style.color = this.objMap[this.tabActive].color;
      div.style.boxShadow = styleObj.boxShadow;
      context.marker.setContent(div);
      context.marker.setAnchor('center');
    },
    showDe(infoWindow, option, lnglat) {
      const content = `<strong style="font-size: 17px;padding: 6px">${option.building_name}
                  <a target="_blank" style="color: #1F79F3;font-size: 12px;"
                    href="/buildingInfo?id=${option.id}">（详情）</a></strong>
                <p style="font-size: 12px;margin: 4px">所属网格：${option.area_name}</p>
                <p style="font-size: 12px;margin: 4px">小区名称：${option.community_name}</p>
                <div>
                  <p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%">建筑类型：${option.architecture_type}</p>
                  <p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%">建筑用途：${option.architecture_purpose}</p>
                </div>
                <div>
                  <p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #1F79F3;">实有人口：${option.actualNum}</p>
                  <p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #F27463;">户籍人口：${option.registeredNum}</p>
                </div>
                <div>
                  <p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #3BC2B4;">未落户人口：${option.unregisteredNum}</p>
                  <p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #A0887E;">自住房屋：${option.propertyNum}</p>
                </div>
                <div>
                  <p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #FF933E;">租赁房屋：${option.autonomicNum}</p>
                  <p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #333333;">空置房屋：${option.vacantNum}</p>
                </div>
                <p style="font-size: 12px;margin: 4px">地址：${option.building_address}</p>`
      infoWindow.setContent(content);
      infoWindow.open(this.$parent.map, lnglat);
    },
    //切换建筑类型
    build(val) {
      this.tabActive = val
      this.getMarker()
    },

    //切换右侧选项
    handleClick(tab, event) {
      if (tab === undefined) {
        this.activeName = ''
      } else {
        this.activeName = tab.name
        if (tab.name === 'all') {
          this.getMarker()
        } else if (tab.name === 'type') {
          this.getBuildPurpose()
        } else if (tab.name === 'search') {
          this.getSearch()
        }
        let icon = document.getElementsByClassName('arrow')
        icon = Array.from(icon);
        icon.forEach(function (item) {
          if (tab.name === 'all') {
            item.style.top = 3.125 + 'rem'
          } else if (tab.name === 'type') {
            item.style.top = 8.125 + 'rem'
          } else if (tab.name === 'search') {
            item.style.top = 13.375 + 'rem'
          }
        })
      }
    },

    //根据建筑类型获取建筑用途信息
    getBuildPurpose() {
      this.active = ''
      let param = {
        buildingType: this.buildType,
      }
      BuildPurpose(param).then(res => {
        this.purposeOptions = res.data;
      })
      this.getPurposeList()
    },

    //获取建筑用途列表
    getPurposeList(data, index) {
      if (data !== undefined && data !== null) {
        let purpose = data.buildingPurpose
        this.active = index
        this.getPurpose(purpose)
      } else {
        let purpose = ''
        this.getPurpose(purpose)
      }
    },

    //添加建筑用途的点标记
    getPurpose(data) {
      this.$parent.map.clearInfoWindow();
      this.$parent.map.remove(this.markerGroups);
      this.purposeList = []
      let areaIds = ''
      if (this.aresIds === '' || this.aresIds === undefined) {
        areaIds = ''
      } else {
        areaIds = this.aresIds
      }
      let param = {
        areaId: areaIds,
        architectureType: this.buildType,
        architecturePurpose: data,
        gis: 1,
        pageNum: this.typePage.pageNum,
        pageSize: this.typePage.pageSize,
        userId: localStorage.getItem("userId"),
      }
      build(param).then((res) => {
        this.purposeList = res.rows
        this.purposeName = data
        this.typePage.total = res.total
        let purposeMap = this.$parent.map
        let that = this
        for (var i = 0; i < this.purposeList.length; i += 1) {
          //处理坐标数据
          if (this.purposeList[i].gis !== null) {
            var centerArray = this.purposeList[i].gis.split(',');
          }
          let center = []
          centerArray.forEach((item) => {
            let number = Number(item)
            center.push(number)
          })
          this.purposeList[i].gis = center
        }

        AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
          function (MarkerList, SimpleMarker, SimpleInfoWindow) {
            var defaultIconStyle = function (index) {
              return 'red-' + (index + 1);
            }, //默认的图标样式
              hoverIconStyle = function (index) {
                return 'blue-' + (index + 1);
              }, //鼠标hover时的样式
              selectedIconStyle = function (index) {
                return 'blue-' + (index + 1);
              }; //选中时的图标样式

            that.purposeMarkerList = new MarkerList({
              //关联的map对象
              map: purposeMap,
              //列表的dom容器的id
              listContainer: "purposeList",
              //返回数据项的Id
              getDataId: function (dataItem, index) {
                //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                return index;
              },
              //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
              getPosition: function (dataItem) {
                return dataItem.gis;
              },
              //返回数据项对应的infoWindow
              getInfoWindow: function (data, context, recycledInfoWindow) {
                if (recycledInfoWindow) {
                  recycledInfoWindow.setInfoTitle('<strong style="font-size: 17px;padding: 6px">' + data.building_name +
                    '<a target="_blank" style="color: #1F79F3;font-size: 12px;" href=\'/buildingInfo?id=' + data.id + '\'>（详情）</a>' +
                    '</strong>',);
                  recycledInfoWindow.setInfoBody('<p style="font-size: 12px;margin: 4px">所属网格：' + data.area_name + '</p>' +
                    '<p style="font-size: 12px;margin: 4px">小区名称：' + data.community_name + '</p>' +
                    '<div>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%">建筑类型：' + data.architecture_type + '</p>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%">建筑用途：' + data.architecture_purpose + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #1F79F3;">实有人口：' + data.actualNum + '</p>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #F27463;">户籍人口：' + data.registeredNum + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #3BC2B4;">未落户人口：' + data.unregisteredNum + '</p>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #A0887E;">自住房屋：' + data.propertyNum + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #FF933E;">租赁房屋：' + data.autonomicNum + '</p>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #333333;">空置房屋：' + data.vacantNum + '</p>' +
                    '</div>' +
                    '<p style="font-size: 12px;margin: 4px">地址：' + data.building_address + '</p>',);
                  return recycledInfoWindow;
                }
                return new SimpleInfoWindow({
                  infoTitle: '<strong style="font-size: 17px;padding: 6px">' + data.building_name +
                    '<a target="_blank" style="color: #1F79F3;font-size: 12px;" href=\'/buildingInfo?id=' + data.id + '\'>（详情）</a>' +
                    '</strong>',
                  infoBody: '<p style="font-size: 12px;margin: 4px">所属网格：' + data.area_name + '</p>' +
                    '<p style="font-size: 12px;margin: 4px">小区名称：' + data.community_name + '</p>' +
                    '<div>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%">建筑类型：' + data.architecture_type + '</p>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%">建筑用途：' + data.architecture_purpose + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #1F79F3;">实有人口：' + data.actualNum + '</p>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #F27463;">户籍人口：' + data.registeredNum + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #3BC2B4;">未落户人口：' + data.unregisteredNum + '</p>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #A0887E;">自住房屋：' + data.propertyNum + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #FF933E;">租赁房屋：' + data.autonomicNum + '</p>' +
                    '<p style="font-size: 12px;margin: 4px;display: inline-block;width: 47%;color: #333333;">空置房屋：' + data.vacantNum + '</p>' +
                    '</div>' +
                    '<p style="font-size: 12px;margin: 4px">地址：' + data.building_address + '</p>',
                  offset: new AMap.Pixel(0, -32)
                });
              },

              //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
              getMarker: function (data, context, recycledMarker) {
                if (recycledMarker) {
                  recycledMarker.setIconStyle(defaultIconStyle(context.index));
                  return;
                }
                return new SimpleMarker({
                  iconTheme: 'numv1',
                  containerClassNames: 'my-marker',
                  iconStyle: defaultIconStyle(context.index),
                });
              },

              //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
              getListElement: function (data, context, recycledListElement) {
                var label = '' + (context.index + 1);
                //使用模板创建
                var innerHTML = MarkerList.utils.template(
                  '<div class="iconBox">' +
                  '   <i class="icon-site"></i>' +
                  '   <div class="number">' +
                  '     <p><%- label %></p>' +
                  '   </div>' +
                  '</div>' +
                  '<div class="content">' +
                  '   <p class="name"><%- data.building_name %></p>' +
                  '   <p class="address"><%- data.building_address %></p>' +
                  '</div>', {
                  data: data,
                  label: label
                });
                if (recycledListElement) {
                  recycledListElement.innerHTML = innerHTML;
                  return recycledListElement;
                }
                return '<li class="contentBox">' + innerHTML + '</li>';
              },
              //列表节点上监听的事件
              listElementEvents: ['click', 'mouseenter', 'mouseleave'],
              //marker上监听的事件
              markerEvents: ['click', 'mouseover', 'mouseout'],
              //makeSelectedEvents:false,
              selectedClassNames: 'selected',
              autoSetFitView: true,
            });
            //监听鼠标选中改变
            that.purposeMarkerList.on('selectedChanged', function (event, info) {
              if (info.selected) {
                if (info.selected.marker) {
                  //更新为选中样式
                  info.selected.marker.setIconStyle(selectedIconStyle(info.selected.index));
                }
              }
              if (info.unSelected && info.unSelected.marker) {
                //更新为默认样式
                info.unSelected.marker.setIconStyle(defaultIconStyle(info.unSelected.index));
              }
            });

            //监听鼠标悬停改变
            that.purposeMarkerList.on('listElementMouseenter markerMouseover', function (event, record) {
              if (record && record.marker) {
                //非选中的id
                if (!this.isSelectedDataId(record.id)) {
                  //设置为hover样式
                  record.marker.setIconStyle(hoverIconStyle(record.index));
                }
              }
            });

            //监听鼠标移出改变
            that.purposeMarkerList.on('listElementMouseleave markerMouseout', function (event, record) {
              if (record && record.marker) {
                if (!this.isSelectedDataId(record.id)) {
                  //恢复默认样式
                  record.marker.setIconStyle(defaultIconStyle(record.index));
                }
              }
            });
            //展示数据
            that.purposeMarkerList.render(that.purposeList);
          });
        this.remove()
      })
    },

    //搜索移除标注点
    remove() {
      if (this.searchMarkerList.length !== 0) {
        this.searchMarkerList.render([]);
      }
      if (this.markerGroups.length !== 0) {
        this.$parent.map.clearInfoWindow();
        this.$parent.map.remove(this.markerGroups);
      }
      if (this.purposeMarkerList.length !== 0) {
        this.purposeMarkerList.render([]);
      }
    },
    //融合通信登录
    async communicationLogin() {
      const res = await t01Sip.register({
        url: '/api',
        userId: '70000127',
        userPwd: '1234',
        userType: 2,
        devType: 'WEB',
        imei: 'b118755328f6cbc245e64ca2f5ec35e9'
      })
      sessionStorage.setItem('communication_login', res)
      return res
    }
  }
}
</script>

<style scoped lang="scss">
/*右侧菜单*/
.tabRight {
  /*position: absolute;*/
  /*top: 144px;*/
  /*right: 10px;*/
  z-index: 1;
}

/*菜单div*/
.iconRight {
  font-size: 26px;
  color: #1F79F3;
  border-radius: 50%;
  padding: 6px;
}

::v-deep .el-tabs__item.is-active .iconRight {
  background: #1F79F3 !important;
  color: #fff;
}

/*隐藏tab默认样式*/
::v-deep .el-tabs__active-bar,
::v-deep .el-tabs__nav-wrap:after {
  display: none;
}

.tabRight p {
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
  line-height: 0;
}

/*菜单内容*/
.contentPosition {
  width: 338px;
  max-height: 723px;
  position: absolute;
  top: 0px;
  right: 78px;
  z-index: 1
}

.contentRight {
  width: 338px;
  max-height: 723px;
  background: #fff;
  z-index: 1;
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding-bottom: 20px;
  overflow: auto;
}

.contentRight::-webkit-scrollbar {
  border-width: 1px;
}

/*指向箭头*/
.arrow {
  width: 14px;
  height: 14px;
  position: absolute;
  left: 330px;
  top: 50px;
  background: #fff;
  transform: rotate(135deg);
}

/*标题旁箭头*/
.iconArrow {
  font-weight: bold;
  float: right;
}

/*选项div*/
.peopleBox {
  width: 100%;
  margin-right: 5%;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  display: inline-block;
  cursor: pointer;
}

.icon-courtyard {
  color: #02A940;
}

.icon-city {
  color: #1F79F3;
}

.icon-low-b {
  color: #A92EBC
}

.icon-high-b {
  color: #F18D02
}

.icon-superhigh-b {
  color: #D93C3B
}

.isSchoolActive,
.isSchoolActive i {
  background: #62C680 !important;
  color: #fff;
}

.isCourtyardActive,
.isCourtyardActive i {
  background: #A6C650 !important;
  color: #fff;
}

.isCityActive,
.isCityActive i {
  background: #6CA0E6 !important;
  color: #fff;
}

.isLowActive,
.isLowActive i {
  background: #D9B171 !important;
  color: #fff;
}

.isHighActive,
.isHighActive i {
  background: #AD94E6 !important;
  color: #fff;
}

.isSuperHighActive,
.isSuperHighActive i {
  background: #FD8D8D !important;
  color: #fff;
}

.peopleBox:nth-child(2n) {
  margin-right: 0;
}

.peopleIcon {
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: top;
}

.peopleContent {
  display: inline-block;
  width: 68%;
  height: 32px;
  line-height: 32px;
}

.peopleBox i {
  font-size: 32px;
}

.peopleBox p {
  margin: 0;
  padding-left: 6px;
  font-weight: bold;
}

/*选项内容标题*/
.title {
  font-size: 14px;
  font-weight: bold;
  padding: 0 20px;
  margin: 4px;
}

/*选项内容单个样式*/
::v-deep .contentBox {
  padding: 10px;
  cursor: pointer;
}

::v-deep .contentBox:hover {
  background: #EBF7FF;
}

::v-deep .contentBox:hover .icon-site {
  color: #3d93fd;
}

::v-deep #myList li.selected {
  background: #EBF7FF;

  .icon-site {
    color: #3d93fd;
  }
}

/*点标记盒子*/
::v-deep .contentBox .iconBox {
  width: 36px;
  height: 36px;
  display: inline-block;
  text-align: center;
  position: relative;
  vertical-align: top;
}

/*点标记icon*/
::v-deep .contentBox .icon-site {
  font-size: 36px;
  color: #FF3636;
  position: absolute;
  top: 0;
  left: 0;
}

/*点标记序号盒子*/
::v-deep .contentBox .number {
  width: 36px;
  height: 36px;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
}

/*点标记序号数字*/
::v-deep .number p {
  color: #fff;
  font-size: 10px;
  line-height: 30px;
  margin: 0
}

::v-deep .content {
  display: inline-block;
  width: 86%;
}

::v-deep .content p {
  font-size: 12px;
  margin: 0;
  color: #999999;
}

::v-deep .content .name {
  color: #1F79F3;
  margin-bottom: 2px;
}

::v-deep .content .address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/*右侧选项卡大小*/
::v-deep .el-tabs__item {
  height: 80px;
}

/*文字*/
.category {
  margin: 10px 0;
}

.category p {
  width: 33%;
  font-size: 12px;
  font-weight: bold;
  margin: 0 1px 0 0;
  padding: 6px;
  display: inline-block;
  cursor: pointer;
  text-align: center;
}

.category p:nth-child(3n) {
  margin: 0;
}

.isActive {
  color: #fff;
  background: #1F79F3;
  border-radius: 4px;
}

.categoryButton {
  margin: 6px 0;
}

/*搜索按钮*/
.searchButton {
  color: #1F79F3;
  background: #fff;
  border: 1px solid #1F79F3;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
<style>
.amap-ui-smp-ifwn-content-body {
  border: none !important;
  box-shadow: none !important;
  width: 100%;
}

.amap-ui-smp-ifwn-info-title {
  border: none !important;
}
</style>
