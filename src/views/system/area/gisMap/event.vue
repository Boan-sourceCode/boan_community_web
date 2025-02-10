<!--事件组件-->
<template>
  <div id="evnetBox">
      <!--图标和文字-->
      <el-tabs v-model="activeName" tabPosition="right" class="tabRight" @tab-click="handleClick">
        <el-tab-pane name="all">
          <div slot="label" @click="isShow" style="margin-top: 6px">
            <i class="icon-event iconRight" style="background:#fff"></i>
            <p style="color: #D84416">所有事件</p>
          </div>
        </el-tab-pane>
        <!--<el-tab-pane name="search">-->
          <!--<div slot="label" @click="isShow">-->
            <!--<i class="icon-search iconRight" style="background:#fff"></i>-->
            <!--<p style="color: #D84416">搜索</p>-->
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
                所有事件（{{ this.sum }}）
                <i class="el-icon-d-arrow-right iconArrow" @click="isHidden" style="cursor: pointer"></i>
              </p>
            </div>
            <div>
              <div
                class="peopleBox"
                :class="tabActive === 1 ? 'isAcceptActive' : ''"
                style="background: #FAE2E2;"
                @click="events('受理中')">
                <div style="background: #DC393C" class="boxIcon">
                  <p style="color: #fff;">受</p>
                </div>
                <div class="peopleContent">
                  <p>受理中({{ this.eventType.dipatch }})</p>
                </div>
              </div>
              <div
                class="peopleBox"
                :class="tabActive === 2 ? 'isDispatchActive' : ''"
                style="background: #F2E0F5;"
                @click="events('处理中')">
                <div style="background: #A92EBC" class="boxIcon">
                  <p style="color: #fff;">处</p>
                </div>
                <div class="peopleContent">
                  <p>处理中({{ this.eventType.dispose }})</p>
                </div>
              </div>
              <div
                class="peopleBox"
                :class="tabActive === 3 ? 'isPeopleAcceptActive' : ''"
                style="background: #FDEED9;"
                @click="events('核查中')">
                <div style="background: #F28E03" class="boxIcon">
                  <p style="color: #fff;">核</p>
                </div>
                <div class="peopleContent">
                  <p>核查中({{ this.eventType.inspecting }})</p>
                </div>
              </div>
              <div
                class="peopleBox"
                :class="tabActive === 4 ? 'isHandleActive' : ''"
                style="background: #DAF3E4;"
                @click="events('评价结案中')">
                <div style="background: #09AE47" class="boxIcon">
                  <p style="color: #fff;">结</p>
                </div>
                <div class="peopleContent">
                  <p>评价结案中({{ this.eventType.settle }})</p>
                </div>
              </div>
              <div
                class="peopleBox"
                :class="tabActive === 5 ? 'isCheckActive' : ''"
                style="background: #DDEAF8;"
                @click="events('延期审核中')">
                <div style="background: #1874CE" class="boxIcon">
                  <p style="color: #fff;">延</p>
                </div>
                <div class="peopleContent">
                  <p>延期审核中({{ this.eventType.deferred }})</p>
                </div>
              </div>
              <div
                class="peopleBox"
                :class="tabActive === 6 ? 'isEvaluateActive' : ''"
                style="background: #D9EFF2;"
                @click="events('废弃')">
                <div style="background: #0396AB" class="boxIcon">
                  <p style="color: #fff;">废</p>
                </div>
                <div class="peopleContent">
                  <p>废弃({{ this.eventType.abandoned }})</p>
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
import {eventType,event,eventNoPage} from "@/api/area/gisMap";
export default {
  name: "event",
  props:['map','areaId','showFlag'],  //接收父组件的值
  data(){
    return{
      show:true, //当只有一页时隐藏分页
      total: 0,   // 总条数
      pageNum: 1, //当前页
      pageSize: 8, //每页多少条
      tabActive:'',  //选中样式
      activeName:'all', //右侧选项
      searchName:'',  //搜索框
      enterName: '', //搜索条件
      aresIds:'',  //监听树形下拉框的数据
      eventType:[],  //事件类型统计
      sum:'',  //机构总数
      eventList:[],  //不同事件的数据
      searchList:[],  //不同组织的数据
      markerGroups:[],  //标注点集合
      markerList:[],  //搜索标注点集合
    }
  },
  watch:{
    //监听父组件的下拉框数据
    areaId:{
      handler(newVal) {
        if(newVal) {
          this.aresIds = newVal
          this.getEventType(newVal)
          if (this.activeName === 'all') {
            this.tabActive = ''
            this.getMarker()
          } else if (this.activeName === 'search') {
            this.getSearch()
          }
        }
      },
      immediate: true,  //立即监听
    },
  },
  methods:{
    //内容框显示
    isShow(){
      this.isHidden()
      //卡片内容
      var Id=document.getElementById("partsBox");
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
      var Id=document.getElementById("partsBox");
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

    //获取事件信息
    getEventType(data) {
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
      eventType(param).then(res => {
        this.eventType = res.data
        this.sum = this.eventType.dipatch + this.eventType.dispose + this.eventType.inspecting + this.eventType.settle + this.eventType.deferred + this.eventType.abandoned
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
        statu : this.tabActive,
        userId:localStorage.getItem("userId"),
      }
      eventNoPage(param).then((res) => {
        this.eventList = res.data
        let enterpriseMap = this.$parent.map
        var markers = []
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(12, -6)
        });
        for(var i=0;i<this.eventList.length;i+=1){
          // 处理icon图片
          let img = ''
          if(this.eventList[i].statu === 1){
            img = '受'
          }else if(this.eventList[i].statu === 2){
            img = '处'
          }else if(this.eventList[i].statu === 3){
            img = '核'
          }else if(this.eventList[i].statu === 4){
            img = '结'
          }else if(this.eventList[i].statu === 5){
            img = '延'
          }else if(this.eventList[i].statu === 6){
            img = '废'
          }
          var markerContent = '' +
            '<div class="amap-icon" style="width: 26px;height: 26px;">' +
            '<p style="width: 26px;height: 26px;text-align: center;color: #fff;font-size: 12px;font-weight: bold;background: #D84416;border-radius:50%;padding:4px;box-shadow: 0 0 4px 2px rgb(222,57,5); ">'+ img +'</p>'+
            '</div>';
          // 处理坐标数据
          if(this.eventList[i].incidentLocation !== null&&this.eventList[i].incidentLocation != '0'){
            var centerArray = this.eventList[i].incidentLocation.split(',');

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
              '<strong style="font-size: 17px;padding: 6px">'+ this.eventList[i].incidentName +
              // '<a target="_blank" style="color: #1F79F3;font-size: 12px;" href=\'/enterprise/enterpriseDetails?enterpriseId='+ this.eventList[i].id +'\'>（详情）</a>' +
              '</strong>',
              '<p style="font-size: 12px;margin: 4px">地址：'+ this.eventList[i].sceneAction +'</p>',
            ]
            marker.content = content.join("");
            marker.typeBj='event'
            marker.on('click', markerClick);
            markers.push(marker);
          }
          console.log(marker)
        }
        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(enterpriseMap, e.target.getPosition());
        }
        this.markerGroups = new AMap.OverlayGroup(markers);
        this.$parent.map.add(this.markerGroups);
      })
    },

    //切换事件类型
    events(val){
      console.log(val);
      if (val === '受理中') {
        this.tabActive = 1
      }else if (val === '处理中') {
        this.tabActive = 2
      }else if (val === '核查中') {
        this.tabActive = 3
      }else if (val === '评价结案中') {
        this.tabActive = 4
      }else if (val === '延期审核中') {
        this.tabActive = 5
      }else if (val === '废弃') {
        this.tabActive = 6
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
        incidentName : this.searchName,
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        userId:localStorage.getItem("userId"),
      }
      event(param).then((res) => {
        this.searchList = res.rows
        this.enterName = this.searchName
        this.total = res.total
        let searchMap = this.$parent.map
        let that = this
        for(var i=0;i<this.searchList.length;i+=1) {
          //处理坐标数据
          if (this.searchList[i].incidentLocation !== null) {
            var centerArray = this.searchList[i].incidentLocation.split(',');
          }
          let center = []
          centerArray.forEach((item) => {
            let number = Number(item)
            center.push(number)
          })
          this.searchList[i].incidentLocation = center
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
                return dataItem.incidentLocation;
              },
              //返回数据项对应的infoWindow
              getInfoWindow: function(data, context, recycledInfoWindow) {
                if (recycledInfoWindow) {
                  recycledInfoWindow.setInfoTitle('<strong style="font-size: 17px;padding: 6px">'+ data.incidentName +
                    // '<a target="_blank" style="color: #1F79F3;font-size: 12px;" href=\'/enterprise/enterpriseDetails?enterpriseId='+ data.id +'\'>（详情）</a>' +
                    '</strong>',);
                  recycledInfoWindow.setInfoBody('<p style="font-size: 12px;margin: 4px">地址：'+ data.sceneAction +'</p>');
                  return recycledInfoWindow;
                }
                return new SimpleInfoWindow({
                  infoTitle:'<strong style="font-size: 17px;padding: 6px">'+ data.incidentName +
                    // '<a target="_blank" style="color: #1F79F3;font-size: 12px;" href=\'/enterprise/enterpriseDetails?id='+ data.id +'\'>（详情）</a>' +
                    '</strong>',
                  infoBody: '<p style="font-size: 12px;margin: 4px">地址：'+ data.sceneAction +'</p>',
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
                  '   <p class="name"><%- data.incidentName %></p>' +
                  '   <p class="address"><%- data.sceneAction %></p>' +
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
  /*top: 154px;*/
  /*right: 10px;*/
  z-index: 1;
}
/*菜单div*/
.iconRight{
  font-size: 26px;
  color: #D84416;
  border-radius: 50%;
  padding: 6px;
}
::v-deep .el-tabs__item.is-active .iconRight{
  background: #D84416 !important;
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
.isAcceptActive{
  background: #DC393C !important;
  .boxIcon{
    background: #fff !important;
    p{
      color: #DC393C !important;
    }
  }
  .peopleContent p{
    color: #fff;
  }
}
.peopleBox:nth-child(2n){
  margin-right: 0;
}
.isDispatchActive{
  background: #A92EBC !important;
  .boxIcon{
    background: #fff !important;
    p{
      color:#A92EBC !important;
    }
  }
  .peopleContent p{
    color: #fff;
  }
}
.isPeopleAcceptActive{
  background: #F28E04 !important;
  .boxIcon{
    background: #fff !important;
    p{
      color:#F28E04 !important;
    }
  }
  .peopleContent p{
    color: #fff;
  }
}
.isHandleActive{
  background: #09AE46 !important;
  .boxIcon{
    background: #fff !important;
    p{
      color:#09AE46 !important;
    }
  }
  .peopleContent p{
    color: #fff;
  }
}
.isCheckActive{
  background: #1974CF !important;
  .boxIcon{
    background: #fff !important;
    p{
      color:#1974CF !important;
    }
  }
  .peopleContent p{
    color: #fff;
  }
}
.isEvaluateActive{
  background: #0497AB !important;
  .boxIcon{
    background: #fff !important;
    p{
      color:#0497AB !important;
    }
  }
  .peopleContent p{
    color: #fff;
  }
}
.isCaseActive{
  background: #749649 !important;
  .boxIcon{
    background: #fff !important;
    p{
      color:#749649 !important;
    }
  }
  .peopleContent p{
    color: #fff;
  }
}
.isEndActive{
  background: #DD5E01 !important;
  .boxIcon{
    background: #fff !important;
    p{
      color:#DD5E01 !important;
    }
  }
  .peopleContent p{
    color: #fff;
  }
}
.isDelayActive{
  background: #41379A !important;
  .boxIcon{
    background: #fff !important;
    p{
      color:#41379A !important;
    }
  }
  .peopleContent p{
    color: #fff;
  }
}
.peopleBox:nth-child(2n){
  margin-right: 0;
}
.peopleContent{
  display: inline-block;
  width: 68%;
  height: 32px;
  line-height: 32px;
}
.boxIcon{
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  bottom: 0;
  right: 0;
  border-radius: 50%;
}
.boxIcon p{
  padding: 0 !important;
  text-align: center !important;
  line-height: 30px;
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
