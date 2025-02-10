<template>
  <div class="app-container">
    <div class="swiper" style="width: 100%;height: 100%;position: absolute;z-index: 1002;padding: 0.625rem;">
      <el-carousel :interval="4000" arrow="never" class="carouselHeight">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.idView" class="image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="header">
      <!-- <p class="title">智慧党建信息服务</p> -->
      <div class="partyBox">
        <div class="info">
          <i class="icon-organize"></i>
          <div class="number">
            <p>党组织</p>
            <p>{{ this.partyList.party }}</p>
          </div>
        </div>
        <div class="info">
          <i class="icon-mans"></i>
          <div class="number">
            <p>党员数</p>
            <p>{{ this.partyList.partyMember }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="boxs">
        <div class="bgc1" @click="goview(0)">
          <i class="icon-bigdata"></i>
          <p>数据看板</p>
        </div>
        <div class="bgc2" @click="goview(1)">
          <i class="icon-organize"></i>
          <p>党组织管理</p>
        </div>
        <div class="bgc3" @click="goview(2)">
          <i class="icon-mans"></i>
          <p>党员管理</p>
        </div>
        <div class="bgc5" @click="goview(4)">
          <i class="icon-meeting"></i>
          <p>三会一课</p>
        </div>
        <div class="bgc7" @click="goview(6)">
          <i class="icon-information"></i>
          <p>学习教育</p>
        </div>
        <div class="bgc8" @click="goview(7)">
          <i class="icon-information"></i>
          <p>党史学习</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { partyNumber } from "@/api/area/largeScreen";
export default {
  name: "index",
  data() {
    return {
      partyList: {}, //获取党员和党组织
      imgList: [
        {
          id: 0,
          idView: "https://xhl-zhsq.ks3-cn-beijing.ksyuncs.com/20230909/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230908162724.png"
        },
        {
          id: 1,
          idView:
            "https://xhl-zhsq.ks3-cn-beijing.ksyuncs.com/20230909/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230909160442.jpg",
        },
        {
          id: 2,
          idView:
            "https://xhl-zhsq.ks3-cn-beijing.ksyuncs.com/20230909/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230909160448.jpg",
        },
        {
          id: 3,
          idView:
            "https://xhl-zhsq.ks3-cn-beijing.ksyuncs.com/20230909/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230909160455.jpg",
        },
      ],
      bgc: ["bgc1", "bgc2", "bgc3", "bgc4", "bgc5", "bgc6", "bgc7", "bgc8"],
    };
  },
  mounted() {
    this.bg() //背景
    this.getParty()  //获取党员和党组织
  },
  methods: {
    bg() {
      //更改导航栏背景色
      let barList = document.getElementsByClassName('navbar')
      barList = Array.from(barList);
      barList.forEach(function (item) {
        item.style.background = 'transparent'
        item.style.position = 'absolute'
        item.style.zIndex = '1003'
        item.style.right = '50px'
      })
      //更改导航栏字体颜色
      let barListItem = document.getElementsByClassName('alignment')
      barListItem = Array.from(barListItem);
      barListItem.forEach(function (item) {
        item.style.color = '#FAD28E'
      })
      //更改背景图
      let itemList = document.getElementsByClassName('main-box')
      itemList = Array.from(itemList);
      // itemList.forEach(function (item) {
      //   let img = require('@/assets/images/partyBg.png')
      //   item.style.background = 'url("' + img + '")';
      //   item.style.backgroundSize = 'cover'
      //   item.style.backgroundRepeat = 'no-repeat'
      // })
      //更改小箭头
      // let icon = document.getElementsByClassName('leftIcon')
      // icon = Array.from(icon);
      // icon.forEach(function (item) {
      //   item.style.background = '#b31021'
      // })
    },
    goview(num) {
      if (num == 0) {
        this.$router.push({
          path: "partyBuildingView",
        });
      } else if (num == 1) {
        this.$router.push({
          path: "partyBuildingManage",
        });
      } else if (num == 2) {
        this.$router.push({
          path: "partymembersList",
        });
      } else if (num == 3) {

      } else if (num == 4) {
        this.$router.push({
          path: "partyThreeLessons",
        });
      } else if (num == 5) {

      } else if (num == 6) {
        this.$router.push({
          path: "partyBuildingStudy",
        });
      } else if (num == 7) {
        this.$router.push({
          path: "partyBuildingHisStudy",
        });
      }
    },
    //获取党员和党组织
    getParty() {
      let param = {
        userId: localStorage.getItem("userId"),
        flag: 0,
      }
      partyNumber(param).then(res => {
        this.partyList = res.data
      })
    },
  },
};
</script>


<style scoped>
/*大标题*/
.header{
  position: absolute;
  z-index: 1005;
  right: 150px;
  top: 50px;
}
.header .title {
  font-size: 48px;
  font-weight: bold;
  color: #FAD28E;
  display: inline-block;
  position: relative;
  top: 22px;
  left: 74px;
  margin: 0;
  padding: 0;
}

/*党员党组织*/
.partyBox {
  display: inline-block;
  position: relative;
  top: 26px;
  left: 104px;
}

.partyBox .info {
  width: 234px;
  height: 88px;
  background-color: rgba(198, 39, 43, 1);
  border-radius: 6px;
  margin-right: 10px;
  margin-top: 15px;
}

.partyBox i {
  font-size: 50px;
  color: #FFFFFF;
  line-height: 88px;
  padding: 0 20px;
  float: left;
}

.partyBox .info .number {
  display: inline-block;
  text-align: left;
  font-size: 22px;
  font-weight: bold;
  color: #FFFFFF;
  float: left;
  line-height: 30px;
  padding-top: 20px;
}

.partyBox .info .number p {
  margin: 0;
  padding: 0;
}

.body {
  /* margin: 94px 0 70px 0; */
  position: absolute;
  z-index: 1004;
  left: 0.625rem;
  right: 0.625rem;
  bottom: 0.625rem;
  background-color: rgba(255, 6, 6, 0.47);
  display: flex;

  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

.body .swiper {
  width: 60%;
  display: inline-block;
  vertical-align: top;
}

.swiper {
  width: 100%;
  display: inline-block;
  vertical-align: top;
}

.carouselHeight {
  height: 100%;
}

/deep/.el-carousel__container {
  height: 100%;
}

/* 轮播图 */
.el-carousel {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: #4c4b4b 0 5px 10px 0;
}

.el-carousel__item img {
  width: 100%;
  min-height: 100%;
}

/deep/.el-carousel__indicators {
  /* 指示器 */
  left: unset;
  transform: unset;
  right: 2%;
}

/deep/.el-carousel__button {
  /* 指示器按钮 */
  width: 13px;
  height: 13px;
  border: none;
  border-radius: 50%;
  background-color: #fad28e;
  opacity: 0.4;
}

/deep/.is-active .el-carousel__button {
  /* 指示器激活按钮 */
  background: #fad28e;
}

/*!* 小盒子 *!*/
.body .boxs {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
}

.body .boxs div {
  width: 212px;
  height: 166px;
  margin: 30px;
  border-radius: 5%;
  display: inline-block;
  /* box-shadow: #4c4b4b 0 5px 10px 0; */
  background-color: #ffffff;
  text-align: center;
  cursor: pointer;
}

.body .boxs div i {
  font-size: 85px;
  color: rgba(197, 39, 40, 1);
  line-height: 130px;
  padding: 20px 20px 0;
}

.body .boxs div p {
  font-size: 22px;
  font-weight: bold;
  color: rgba(197, 39, 40, 1);
  margin: 0;
  overflow: hidden;
  margin-top: -20px;
}
</style>
<style lang="scss" scoped>
// .bgc1 {
//   background: linear-gradient(#1FCDF3, #1F79F3);
// }

// .bgc2 {
//   background: linear-gradient(#7EDBC7, #3CC2B4);
// }

// .bgc3 {
//   background: linear-gradient(#E98685, #D13838);
// }

// .bgc4 {
//   background: linear-gradient(#B7AB98, #A0887E);
// }

// .bgc5 {
//   background: linear-gradient(#FFCA3E, #FF933E);
// }

// .bgc6 {
//   background: linear-gradient(#879FD9, #8182B1);
// }

// .bgc7 {
//   background: linear-gradient(#84D73E, #04B920);
// }

// .bgc8 {
//   background: linear-gradient(#5A5F74, #373343);
// }
.app-container{
  padding: 0;
}
</style>
