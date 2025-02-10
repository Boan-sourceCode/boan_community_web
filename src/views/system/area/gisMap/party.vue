<!--党组织组件-->
<template>
  <div id="partyBox">
    <!--图标和文字-->
    <div class="tabRight">
      <div style="cursor: pointer;text-align: center;" @click="isShow">
        <i class="icon-mans iconRight" style="background:#F34434"></i>
        <p style="color: #F34434">党员</p>
      </div>
    </div>
    <!--内容-->
    <div class="contentPosition">
      <!--指向箭头-->
      <div class="arrow"></div>
      <div class="contentRight">
        <div>
          <p style="font-weight: bold;">
            党员人数（{{ this.peopleList.partyMemberNum }}）
            <i class="el-icon-d-arrow-right iconArrow" @click="isHidden" style="cursor: pointer"></i>
          </p>
        </div>
        <div class="peopleBox" style="color: #F08C00;background: #FBE2BF;height: 98px">
          <i class="icon-population-r"></i>
          <p>户籍人口（{{ this.peopleList.registeredNum }}）</p>
          <div class="boxTab">
            <p>常住人员：{{ this.peopleList.registeredPermanentNum }}人</p>
            <p>党员空挂人员：{{ this.peopleList.registeredHangNum }}人</p>
            <p>外出人员：{{ this.peopleList.registeredOuterNum }}人</p>
          </div>
        </div>
        <div class="peopleBox" style="color: #A92EBC;background: #E9CBEE;height: 98px">
          <i class="icon-population-n"></i>
          <p>未落户人口（{{ this.peopleList.unregisteredNum }}）</p>
          <div class="boxTab">
            <p>党员常住人员：{{ this.peopleList.unregisteredPermanentNum }}人</p>
            <p>流动人员：{{ this.peopleList.unregisteredFlowNum }}人</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="contentimg" v-if="imgsign" >
      <div style="height: 30px;margin-top: 15px;">
        <span @click="imgsign = false" style="font-size: 16px;display: block;text-align: right;cursor: pointer;">
          <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
        </span>
      </div>
      <div>
        <img style="width: 100%;display: block;margin: auto;" src="../../../../assets/images/threeimg.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { selectPartyMemberOfGIS, party } from "@/api/area/gisMap";
export default {
  name: "party",
  props: ['areaId'],  //接收父组件的值
  data() {
    return {
      imgsign: false,
      peopleList: {},
      residence: '',
      notSettled: '',
      aresIds: '', //监听树形下拉框的数据
      partyList: [],  //不同组织的数据
      markerGroups: [],  //标注点集合
    }
  },
  watch: {
    //监听父组件的下拉框数据
    areaId: {
      handler(newVal) {
        if (newVal) {
          this.aresIds = newVal
          this.getPeopleList(newVal)
          this.getMarker()
        }
      },
      immediate: true,  //立即监听
    }
  },
  mounted() {
    // this.getPeopleList()
  },
  methods: {

    //内容框显示
    isShow() {
      this.isHidden()
      //卡片内容
      var Id = document.getElementById("partyBox");
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
      let visible = document.getElementsByClassName("contentRight")
      for (var i = 0; i < visible.length; i++) {
        visible[i].style.display = "none";
      }
      //指向箭头
      let icon = document.getElementsByClassName('arrow')
      for (var j = 0; j < icon.length; j++) {
        icon[j].style.display = "none";
      }
    },

    //获取人员信息
    getPeopleList(data) {
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
      selectPartyMemberOfGIS(param).then(res => {
        this.peopleList = res.data
        this.residence = this.peopleList.registerPartyNum + this.peopleList.registerEmptyPartyNum + this.peopleList.registerGoOutPartyNum  //户籍人口
        this.notSettled = this.peopleList.notSettledPartyNum + this.peopleList.notPartyMigrantNum //未落户人口
      })
    },

    // 获取所有的标点数据
    getMarker() {
      this.remove()
      let areaIds = ''
      if (this.aresIds === '' || this.aresIds === undefined) {
        areaIds = ''
      } else {
        areaIds = this.aresIds
      }
      let param = {
        areaId: areaIds,
        userId: localStorage.getItem("userId"),
      }
      party(param).then((res) => {
        this.partyList = res.data
        let enterpriseMap = this.$parent.map
        var markers = []
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(12, -6)
        });
        for (var i = 0; i < this.partyList.length; i += 1) {
          // 处理icon图片
          let img = ''
          img = require("@/assets/images/partyOne.png")
          var markerContent = '' +
            '<div class="amap-icon" style="width: 26px;height: 26px;">' +
            '   <img src="' + img + '" style="width: 26px;height: 26px; background: #f34434;border-radius:50%;padding:4px;box-shadow: 0 0 4px 2px rgb(255 108 95); ">' +
            '</div>';
          // 处理坐标数据
          if (this.partyList[i].partyMap !== null && this.partyList[i].partyMap != 0) {
            var centerArray = this.partyList[i].partyMap.split(',');

            let center = []
            centerArray.forEach((item) => {
              let number = Number(item)
              center.push(number)
            })
            var marker = new AMap.Marker({
              position: center,
              content: markerContent,
            });
            marker.typeBj = 'party'
            markers.push(marker);
            // marker.on('click',this.markerClick);
          }
          this.markerGroups = new AMap.OverlayGroup(markers);
          this.$parent.map.add(this.markerGroups);
        }
      })
    },
    // markerClick() {
    //   this.imgsign = true
    // },
    //移除标注点
    remove() {
      this.$parent.map.remove(this.markerGroups);
    },
  }
}
</script>

<style scoped>
  .contentimg{
    width: 25.875rem;
    height: auto;
    max-height: 45.1875rem;
    background: #fff;
    z-index: 1;
    box-shadow: 0.375rem 0.375rem 0.625rem 0 rgba(0, 0, 0, 0.3);
    border-radius: 0.625rem;
    padding: 0 1.25rem 1.25rem 1.25rem;
    overflow: auto;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
  }
/*右侧菜单*/
.tabRight {
  /*position: absolute;*/
  /*top: 154px;*/
  /*right: 20px;*/
  z-index: 1;
}

/*菜单div*/
.iconRight {
  font-size: 26px;
  color: #fff;
  border-radius: 50%;
  padding: 6px;
}

.tabRight p {
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
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
  padding: 0 20px 20px 20px;
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

/*单个内容div*/
.peopleBox {
  /*height: 98px;*/
  border-radius: 10px;
  padding: 10px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
}

.peopleBox p {
  margin: 0;
}

.peopleBox i {
  position: absolute;
  bottom: 0;
  right: 12px;
  font-size: 72px;
  color: rgba(255, 255, 255, 0.6);
}

/*内容p标签公共样式*/
.boxTab {
  margin-top: 8px;
}

.boxTab p {
  margin: 2px;
  font-weight: normal;
  font-size: 12px;
}</style>
