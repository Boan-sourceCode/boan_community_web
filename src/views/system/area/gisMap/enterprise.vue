<!--企业组件-->
<template>
  <div id="enterBox">
    <!--图标和文字-->
    <el-tabs v-model="activeName" tabPosition="right" class="tabRight" @tab-click="handleClick">
      <el-tab-pane name="all">
        <div slot="label" @click="isShow" style="margin-top: 6px">
          <i class="icon-institution iconRight" style="background:#fff"></i>
          <p style="color: #00B9D5">所有组织</p>
        </div>
      </el-tab-pane>
      <!--<el-tab-pane name="search">-->
        <!--<div slot="label" @click="isShow">-->
          <!--<i class="icon-search iconRight" style="background:#fff"></i>-->
          <!--<p style="color: #00B9D5">搜索</p>-->
        <!--</div>-->
      <!--</el-tab-pane>-->
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
                所有组织（{{ this.countType.total }}）
                <i class="el-icon-d-arrow-right iconArrow" @click="isHidden" style="cursor: pointer"></i>
              </p>
            </div>
            <div>
              <!--<div-->
                <!--class="peopleBox"-->
                <!--:class="tabActive === '新经济组织' ? 'isEconomicActive' : ''"-->
                <!--style="background: #DEEBFD;"-->
                <!--@click="enterprise('新经济组织')">-->
                <!--<div class="peopleIcon">-->
                  <!--<i class="icon-economic"></i>-->
                <!--</div>-->
                <!--<div class="peopleContent">-->
                  <!--<p>新经济组织({{ this.countType.economyOrganization }})</p>-->
                <!--</div>-->
              <!--</div>-->
              <div
                class="peopleBox"
                :class="tabActive === '新社会组织' ? 'isOrganizationActive' : ''"
                style="background: #D9F0F4;"
                @click="enterprise('新社会组织')">
                <div class="peopleIcon">
                  <i class="icon-organization"></i>
                </div>
                <div class="peopleContent">
                  <p>新社会组织({{ this.countType.socialOrganization }})</p>
                </div>
              </div>
              <div
                class="peopleBox"
                :class="tabActive === '党政机关' ? 'isPartyActive' : ''"
                style="background: #F7DFDD;"
                @click="enterprise('党政机关')">
                <div class="peopleIcon">
                  <i><img src="../../../../assets/images/party.png" width="32"/></i>
                </div>
                <div class="peopleContent">
                  <p>党政机关({{ this.countType.governmentOffices }})</p>
                </div>
              </div>
              <div
                class="peopleBox"
                :class="tabActive === '国家机关' ? 'isCountryActive' : ''"
                style="background: #FCE0DF;"
                @click="enterprise('国家机关')">
                <div class="peopleIcon">
                  <i><img src="../../../../assets/images/country.png" width="32"/></i>
                </div>
                <div class="peopleContent">
                  <p>国家机关({{ this.countType.stateOrgans }})</p>
                </div>
              </div>
              <div
                class="peopleBox"
                :class="tabActive === '事业单位' ? 'isCauseActive' : ''"
                style="background: #DDECF8;"
                @click="enterprise('事业单位')">
                <div class="peopleIcon">
                  <i><img src="../../../../assets/images/cause.png" width="32"/></i>
                </div>
                <div class="peopleContent">
                  <p>事业单位({{ this.countType.publicInstitution }})</p>
                </div>
              </div>
              <div
                class="peopleBox"
                :class="tabActive === '事业单位' ? 'isCauseActive' : ''"
                style="background: #DDECF8;"
                @click="enterprise('事业单位')">
                <div class="peopleIcon">
                  <i><img src="../../../../assets/images/cause.png" width="32"/></i>
                </div>
                <div class="peopleContent">
                  <p>新经济组织({{ this.countType.economyOrganization }})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.activeName === 'search'">
          <div style="padding: 0 20px">
            <div>
              <p style="font-weight: bold;">
                搜索
                <i class="el-icon-d-arrow-right iconArrow" @click="isHidden" style="cursor: pointer"></i>
              </p>
            </div>
            <div>
              <el-input clearable v-model="searchName" placeholder="请输入建筑名称" style="margin-right: 10px;width: 70%;"/>
              <el-button class="searchButton" @click="getSearch">搜索</el-button></div>
          </div>
          <div>
            <p class="title" v-if="this.searchList.length !== 0 && this.enterName !== ''">搜索  “{{ this.enterName }}” 结果{{ this.total }}条</p>
            <ul id="myList"></ul>
            <!-- 分页 -->
            <pagination
              small
              background
              :hide-on-single-page="show"
              layout="prev, pager, next"
              :total="total"
              :page.sync="pageNum"
              :limit.sync="pageSize"
              @pagination="getSearch()"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {countType,enterprise,enterpriseNoPage} from "@/api/area/gisMap";
export default {
  name: "enterprise",
  props:['map','areaId'],  //接收父组件的值
  data(){
    return{
      show:true, //当只有一页时隐藏分页
      total: 0,   // 总条数
      pageNum: 1, //当前页
      pageSize: 8, //每页多少条
      tabActive:'',  //选中样式
      activeName:'all', //右侧选项
      searchName:'',  //搜索框
      countType:[],  //企业类型统计
      sum:'',  //机构总数
      enterpriseList:[],  //不同组织的数据
      searchList:[],  //不同组织的数据
      markerGroups:[],  //标注点集合
      enterName: '', //搜索条件
      markerList:[],  //搜索标注点集合
      aresIds:'',  //监听树形下拉框的数据
    }
  },
  watch:{
    //监听父组件的下拉框数据
    areaId:{
      handler(newVal) {
        if(newVal) {
          this.aresIds = newVal
          this.getCountType(newVal)
          if (this.activeName === 'all') {
            this.tabActive = ''
            this.getMarker()
          } else if (this.activeName === 'search') {
            this.getSearch()
          }
        }
      },
      immediate: true,  //立即监听
    }
  },
  mounted() {
    // this.getCountType()
    // this.getMarker()
  },
  methods:{
    //内容框显示
    isShow(){
      this.isHidden()
      //卡片内容
      var Id=document.getElementById("enterBox");
      let visible = Id.getElementsByClassName("contentRight")
      for (var i = 0; i < visible.length; i++) {
        visible[i].style.display="block";
      }
      //指向箭头
      let icon = Id.getElementsByClassName('arrow')
      for (var j = 0; j < icon.length; j++) {
        icon[j].style.display="block";
      }
    },

    //内容框隐藏
    isHidden(){
      //卡片内容
      var Id=document.getElementById("enterBox");
      let visible = Id.getElementsByClassName("contentRight")
      for (var i = 0; i < visible.length; i++) {
        visible[i].style.display="none";
      }
      //指向箭头
      let icon = Id.getElementsByClassName('arrow')
      for (var j = 0; j < icon.length; j++) {
        icon[j].style.display="none";
      }
    },

    //获取企业信息
    getCountType(data) {
      let areaIds = ''
      if (data === '' || data === undefined){
        areaIds = ''
      }else{
        areaIds = data
      }
      let param = {
        areaId : areaIds,
        userId:localStorage.getItem("userId"),
      }
      countType(param).then(res => {
        this.countType = res.data
        this.sum = this.countType.socialOrganization + this.countType.governmentOffices + this.countType.stateOrgans + this.countType.publicInstitution

        // this.sum = this.countType.economyOrganization + this.countType.socialOrganization + this.countType.governmentOffices + this.countType.stateOrgans + this.countType.publicInstitution
      })
    },

    // 获取所有的标点数据
    getMarker(){
      this.remove()
      let areaIds = ''
      if (this.aresIds === '' || this.aresIds === undefined){
        areaIds = ''
      }else{
        areaIds = this.aresIds
      }
      let param = {
        areaId : areaIds,
        groupType : this.tabActive,
        userId:localStorage.getItem("userId"),
      }
      enterpriseNoPage(param).then((res) => {
        this.enterpriseList = res.data
        let enterpriseMap = this.$parent.map
        var markers = []
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(12, -6)
        });
        for(var i=0;i<this.enterpriseList.length;i+=1){
          // 处理icon图片
          let img = ''
          if(this.enterpriseList[i].groupType != '新经济组织'){
            console.log(this.enterpriseList[i])
            if(this.enterpriseList[i].groupType === '新社会组织'){
              img = require("@/assets/images/organization.png")
            } else if(this.enterpriseList[i].groupType === '党政机关'){
              img = require("@/assets/images/party.png")
            }else if(this.enterpriseList[i].groupType === '国家机关'){
              img = require("@/assets/images/country.png")
            } else if(this.enterpriseList[i].groupType === '事业单位'){
              img = require("@/assets/images/cause.png")
            }
            var markerContent = '' +
              '<div class="amap-icon" style="width: 26px;height: 26px;">' +
              '   <img src="' + img + '" style="width: 26px;height: 26px; background: #00B9D5;border-radius:50%;padding:4px;box-shadow: 0 0 4px 2px rgb(0,192,221); ">' +
              '</div>';
            // 处理坐标数据
            if(this.enterpriseList[i].tagging !== null&&this.enterpriseList[i].tagging !=0){
              var centerArray = this.enterpriseList[i].tagging.split(',');
                let center = []
                centerArray.forEach((item) => {
                  let number = Number(item)
                  center.push(number)
                })
                var marker = new AMap.Marker({
                  position: center,
                  content: markerContent,
                });
                var content = [
                  '<strong style="font-size: 17px;padding: 6px">'+ this.enterpriseList[i].enterName +
                    '<a target="_blank" style="color: #1F79F3;font-size: 12px;" href=\'/enterprise/enterpriseDetails?enterpriseId='+ this.enterpriseList[i].id +'\'>（详情）</a>' +
                  '</strong>',
                  '<p style="font-size: 12px;margin: 4px">地址：'+ this.enterpriseList[i].enterAddress +'</p>',
                ]
                marker.content = content.join("");
                marker.typeBj='enterprise'
                marker.on('click', markerClick);
                markers.push(marker);
            }
          }
        }
        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(enterpriseMap, e.target.getPosition());
        }
        this.markerGroups = new AMap.OverlayGroup(markers);
        this.$parent.map.add(this.markerGroups);
      })
    },

    //切换组织类型
    enterprise(val){
      if (val === '新经济组织') {
        this.tabActive = val
      } else if (val === '新社会组织') {
        this.tabActive = val
      }else if (val === '党政机关') {
        this.tabActive = val
      }else if (val === '国家机关') {
        this.tabActive = val
      }else if (val === '事业单位') {
        this.tabActive = val
      }
      if(this.markerGroups.length !== 0){
        this.$parent.map.remove(this.markerGroups);
      }
      this.getMarker()
    },

    //切换右侧选项
    handleClick(tab,event) {
      if(tab === undefined){
        this.activeName = ''
      }else {
        this.activeName = tab.name
        if(tab.name === 'all'){
          this.tabActive =''
          this.getMarker()
        }else if(tab.name === 'search'){
          this.getSearch()
        }
        let icon = document.getElementsByClassName('arrow')
        icon = Array.from(icon);
        icon.forEach(function(item) {
          if(tab.name === 'all'){
            item.style.top = 3.125 + 'rem'
          }else if(tab.name === 'search'){
            item.style.top = 8.125 + 'rem'
          }
        })
      }
    },

    //搜索
    getSearch(){
      this.$parent.map.clearInfoWindow();
      this.$parent.map.remove(this.markerGroups);
      this.searchList = []
      let areaIds = ''
      if (this.aresIds === '' || this.aresIds === undefined){
        areaIds = ''
      }else{
        areaIds = this.aresIds
      }
      let param = {
        areaId : areaIds,
        istagging : 'false',
        enterName : this.searchName,
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        userId:localStorage.getItem("userId"),
      }
      enterprise(param).then((res) => {
        this.searchList = res.rows
        this.enterName = this.searchName
        this.total = res.total
        let searchMap = this.$parent.map
        let that = this
        for(var i=0;i<this.searchList.length;i+=1) {
          //处理坐标数据
          if (this.searchList[i].tagging !== null) {
            var centerArray = this.searchList[i].tagging.split(',');
          }
          let center = []
          centerArray.forEach((item) => {
            let number = Number(item)
            center.push(number)
          })
          this.searchList[i].tagging = center
        }

        AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
          function(MarkerList, SimpleMarker, SimpleInfoWindow) {
          var defaultIconStyle = function(index) {
              return 'red-' + (index + 1);
            }, //默认的图标样式
            hoverIconStyle = function(index) {
              return 'blue-' + (index + 1);
            }, //鼠标hover时的样式
            selectedIconStyle = function(index) {
              return 'blue-' + (index + 1);
            }; //选中时的图标样式


            that.markerList = new MarkerList({
            //关联的map对象
            map: searchMap,
            //列表的dom容器的id
            listContainer: "myList",
            //返回数据项的Id
            getDataId: function(dataItem, index) {
              //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
              return index;
            },
            //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
            getPosition: function(dataItem) {
              return dataItem.tagging;
            },
            //返回数据项对应的infoWindow
            getInfoWindow: function(data, context, recycledInfoWindow) {
              if (recycledInfoWindow) {
                recycledInfoWindow.setInfoTitle('<strong style="font-size: 17px;padding: 6px">'+ data.enterName +
                                                  '<a target="_blank" style="color: #1F79F3;font-size: 12px;" href=\'/enterprise/enterpriseDetails?enterpriseId='+ data.id +'\'>（详情）</a>' +
                                                '</strong>',);
                recycledInfoWindow.setInfoBody('<p style="font-size: 12px;margin: 4px">地址：'+ data.enterAddress +'</p>');
                return recycledInfoWindow;
              }
              return new SimpleInfoWindow({
                infoTitle:'<strong style="font-size: 17px;padding: 6px">'+ data.enterName +
                            '<a target="_blank" style="color: #1F79F3;font-size: 12px;" href=\'/enterprise/enterpriseDetails?id='+ data.id +'\'>（详情）</a>' +
                          '</strong>',
                infoBody: '<p style="font-size: 12px;margin: 4px">地址：'+ data.enterAddress +'</p>',
                offset: new AMap.Pixel(0, -32)
              });
            },

            //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
            getMarker: function(data, context, recycledMarker) {
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
            getListElement: function(data, context, recycledListElement) {
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
                '   <p class="name"><%- data.enterName %></p>' +
                '   <p class="address"><%- data.enterAddress %></p>' +
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
            that.markerList.on('selectedChanged', function(event, info) {
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
            that.markerList.on('listElementMouseenter markerMouseover', function(event, record) {
              if (record && record.marker) {
                //非选中的id
                if (!this.isSelectedDataId(record.id)) {
                  //设置为hover样式
                  record.marker.setIconStyle(hoverIconStyle(record.index));
                }
              }
            });

            //监听鼠标移出改变
            that.markerList.on('listElementMouseleave markerMouseout', function(event, record) {
              if (record && record.marker) {
                if (!this.isSelectedDataId(record.id)) {
                  //恢复默认样式
                  record.marker.setIconStyle(defaultIconStyle(record.index));
                }
              }
            });
             //展示数据
            that.markerList.render(that.searchList);
        });
        this.remove()
      })
    },

    //移除标注点
    remove(){
      if(this.markerGroups.length !== 0){
        this.$parent.map.clearInfoWindow();
        this.$parent.map.remove(this.markerGroups);
      }
      if(this.markerList.length !== 0){
        this.$parent.map.clearInfoWindow();
        this.markerList.render([]);
      }
    },
  }
}
</script>

<style scoped lang="scss">
/*右侧菜单*/
.tabRight{
  /*position: absolute;*/
  /*top: 144px;*/
  /*right: 10px;*/
  z-index: 1;
}
/*菜单div*/
.iconRight{
  font-size: 26px;
  color: #00B9D5;
  border-radius: 50%;
  padding: 6px;
}
::v-deep .el-tabs__item.is-active .iconRight{
  background: #00B9D5 !important;
  color: #fff;
}
/*隐藏tab默认样式*/
::v-deep .el-tabs__active-bar,::v-deep .el-tabs__nav-wrap:after{
  display: none;
}
.tabRight p{
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
  line-height: 0;
}
/*菜单内容*/
.contentPosition{
  width: 338px;
  max-height:723px;
  position: absolute;
  top: 0px;
  right: 78px;
  z-index:1
}
.contentRight{
  width: 338px;
  max-height:723px;
  background: #fff;
  z-index: 1;
  box-shadow: 6px 6px 10px 0 rgba(0,0,0,0.3);
  border-radius: 10px;
  padding-bottom:20px;
  overflow: auto;
}
.contentRight::-webkit-scrollbar {
  border-width:1px;
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
.iconArrow{
  font-weight: bold;
  float: right;
}
/*选项div*/
.peopleBox{
  width: 100%;
  margin-right: 5%;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  display: inline-block;
  cursor: pointer;
}
.icon-economic{
  color: #1F79F3
}
.icon-organization{
  color: #039CB6
}
.isEconomicActive,.isEconomicActive i{
  background: #1F79F3 !important;
  color: #fff;
}
.isOrganizationActive,.isOrganizationActive i{
  background: #029CB6 !important;
  color: #fff;
}
.isPartyActive,.isPartyActive i{
  background: #CA2B18 !important;
  color: #fff;
}
.isCountryActive,.isCountryActive i{
  background: #ED2C25 !important;
  color: #fff;
}
.isCauseActive,.isCauseActive i{
  background: #1B7ED1 !important;
  color: #fff;
}
.peopleBox:nth-child(2n){
  margin-right: 0;
}
.peopleIcon{
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: top;
}
.peopleContent{
  display: inline-block;
  width: 68%;
  height: 32px;
  line-height: 32px;
}
.peopleBox i{
  font-size: 32px;
}
.peopleBox p{
  margin: 0;
  padding-left: 6px;
  font-weight: bold;
}
/*选项内容标题*/
.title{
  font-size: 14px;
  font-weight:bold;
  padding: 0 20px;
  margin: 4px;
}
::v-deep .contentBox{
  padding: 10px;
  cursor: pointer;
}
::v-deep .contentBox:hover{
  background: #EBF7FF;
}
::v-deep .contentBox:hover .icon-site{
  color: #3d93fd;
}
::v-deep #myList li.selected {
  background: #EBF7FF;
  .icon-site{
    color: #3d93fd;
  }
}
/*点标记盒子*/
::v-deep .contentBox .iconBox{
  width: 36px;
  height: 36px;
  display: inline-block;
  text-align: center;
  position: relative;
  vertical-align: top;
}
/*点标记icon*/
::v-deep .contentBox .icon-site{
  font-size: 36px;
  color: #FF3636;
  position: absolute;
  top: 0;
  left: 0;
}

/*点标记序号盒子*/
::v-deep .contentBox .number{
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
::v-deep .content{
  display: inline-block;
  width: 86%;
}
::v-deep .content p{
  font-size: 12px;
  margin: 0;
  color: #999999;
}
::v-deep .content .name{
  color: #1F79F3;
  margin-bottom: 2px;
}
::v-deep .content .address{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/*右侧选项卡大小*/
::v-deep .el-tabs__item{
  height: 80px;
}
/*搜索按钮*/
.searchButton {
  width: 25%;
  color: #1890ff;
  background: #fff;
  border: 1px solid #1890ff;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
