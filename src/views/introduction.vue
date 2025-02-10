<template>
  <div class="introduction">
    <!--系统引导页 旧版-->
    <div v-if="area === '旧系统'">
      <div class="title">
        <div class="tit-span">
          <div class="logo">
            <img src="../assets/images/login.png" width="100%" />
          </div>
          <span>杏花岭区“千站万人”强治理服务平台</span>
        </div>
        <div class="tit-span1">
          <span style="margin-left: 200px"
            >{{ username }}（{{ roleName }}）</span
          >
          <span
            class="editbtnnew"
            @click="system"
            v-hasPermi="['views:introduction:system']"
            >系统设置</span
          >
          <span class="outbtnnew" @click="logout" style="cursor: pointer"
            >退出</span
          >
          <span
            class="outbtnnew"
            @click="changesever2"
            style="cursor: pointer; margin-left: 15px"
            >切换系统</span
          >
        </div>
        <div class="list">
          <div class="liBox">
            <div
              class="li"
              v-hasPermi="['views:introduction:party']"
              @click="party"
            >
              <img
                src="../assets/images/dangjianyinlin.png"
                style="width: 66px; height: 66px; top: 106px"
                class="iconLight"
              />
              <img
                src="../assets/images/beamLight.png"
                width="100%"
                class="beam"
              />
              <div class="imgWrap">
                <img
                  src="../assets/images/circleLight.png"
                  class="rotate"
                  width="100%"
                />
              </div>
              <p class="iconTitle party" style="color: #d90e1e">党建引领</p>
            </div>
            <div
              class="li"
              v-hasPermi="['views:introduction:weizhan']"
              @click="weizhan"
            >
              <img
                src="../assets/images/wanggeweizhan.png"
                style="width: 66px; height: 66px; top: 106px"
                class="iconLight"
              />
              <img
                src="../assets/images/beamLight.png"
                width="100%"
                class="beam"
              />
              <div class="imgWrap">
                <img
                  src="../assets/images/circleLight.png"
                  class="rotate"
                  width="100%"
                />
              </div>
              <p class="iconTitle event" style="color: #ee4f47">网格微站</p>
            </div>
            <div
              class="li"
              v-hasPermi="['views:introduction:service']"
              @click="service"
            >
              <img
                src="../assets/images/bianminfuwu.png"
                style="width: 66px; height: 66px; top: 106px"
                class="iconLight"
              />
              <img
                src="../assets/images/beamLight.png"
                width="100%"
                class="beam"
              />
              <div class="imgWrap">
                <img
                  src="../assets/images/circleLight.png"
                  class="rotate"
                  width="100%"
                />
              </div>
              <p class="iconTitle institution" style="color: #fd912e">
                便民服务
              </p>
            </div>
          </div>
          <div class="liBox">
            <div
              class="li"
              v-hasPermi="['views:introduction:grid']"
              @click="grid"
            >
              <img
                src="../assets/images/xinxicaiji.png"
                style="width: 66px; height: 66px; top: 106px"
                class="iconLight"
              />
              <img
                src="../assets/images/beamLight.png"
                width="100%"
                class="beam"
              />
              <div class="imgWrap">
                <img
                  src="../assets/images/circleLight.png"
                  class="rotate"
                  width="100%"
                />
              </div>
              <p class="iconTitle grid" style="color: #4dccbe">基础信息</p>
            </div>
            <div
              class="li"
              v-hasPermi="['views:introduction:gis']"
              @click="gis"
            >
              <img
                src="../assets/images/shujuditu.png"
                style="width: 66px; height: 66px; top: 106px"
                class="iconLight"
              />
              <img
                src="../assets/images/beamLight.png"
                width="100%"
                class="beam"
              />
              <div class="imgWrap">
                <img
                  src="../assets/images/circleLight.png"
                  class="rotate"
                  width="100%"
                />
              </div>
              <p class="iconTitle gis" style="color: #40a6e6">数据地图</p>
            </div>
            <div
              class="li"
              v-hasPermi="['views:introduction:largeScreen']"
              @click="largeScreen"
            >
              <img
                src="../assets/images/zhihuizhongxin.png"
                style="width: 66px; height: 66px; top: 106px"
                class="iconLight"
              />
              <img
                src="../assets/images/beamLight.png"
                width="100%"
                class="beam"
              />
              <div class="imgWrap">
                <img
                  src="../assets/images/circleLight.png"
                  class="rotate"
                  width="100%"
                />
              </div>
              <p class="iconTitle bigdata" style="color: #467fdb">指挥中心</p>
            </div>
            <div
              class="li"
              v-hasPermi="['views:introduction:search']"
              @click="search"
            >
              <img
                src="../assets/images/zonghechaxun.png"
                style="width: 66px; height: 66px; top: 106px"
                class="iconLight"
              />
              <img
                src="../assets/images/beamLight.png"
                width="100%"
                class="beam"
              />
              <div class="imgWrap">
                <img
                  src="../assets/images/circleLight.png"
                  class="rotate"
                  width="100%"
                />
              </div>
              <p class="iconTitle search" style="color: #8d79e2">综合查询</p>
            </div>
          </div>
        </div>
        <!-- <div class=" footer">
                  <span>人在格中走，事在格中办，责在格中尽</span>
              </div> -->
      </div>
    </div>

    <!-- 新版 -->
    <div class="w-pages" v-else>
      <img class="w-bgimg" src="../../src/assets/newIndex/bg1.png" alt="" />
      <div class="w-content">
        <img class="w-bgimg2" src="../../src/assets/newIndex/bg2.png" alt="" />
        <img class="w-bgimg3" src="../../src/assets/newIndex/bg3.png" alt="" />

        <img class="w-bian1" src="../../src/assets/newIndex/bian1.png" alt="" />
        <img class="w-bian2" src="../../src/assets/newIndex/bian2.png" alt="" />
        <div class="w-zongText1">工作应用</div>
        <div class="w-zongText2">服务应用</div>

        <div class="w-headbox">
          <img
            class="w-head"
            src="../../src/assets/newIndex/head1.png"
            alt=""
          />
          <div class="w-admin">{{ username }}（{{ roleName }}）</div>
        </div>

        <div class="w-oldbox">
          <div class="w-old" @click="changesever">切换旧版</div>
        </div>

        <div class="w-exitbox" @click="logout">
          <img
            class="w-exitimg"
            src="../../src/assets/newIndex/exit1.png"
            alt=""
          />
          <div class="w-exitText">退出</div>
        </div>

        <img
          class="w-bgimghu1"
          src="../../src/assets/newIndex/btnbghu1.png"
          alt=""
        />
        <img
          class="w-bgimghu2"
          src="../../src/assets/newIndex/btnbghu1.png"
          alt=""
        />

        <div
          v-for="(v, i) in 6"
          :key="i"
          @mouseenter="mouseenter(i)"
          @mouseleave="mouseleave(i)"
        >
          <!-- 中间按钮 -->
          <img
            :class="'w-bgimgbtn' + (i + 1)"
            @click="tab(i)"
            :src="require('@/assets/newIndex/btnbg' + (i + 1) + '.png')"
            alt=""
          />
          <div class="w-bgimgbtnbox">
            <img
              v-show="active == i"
              :class="'w-bgimghuac' + (i + 1)"
              :src="
                require('@/assets/newIndex/btnbghuac' +
                  (i == 1 || i == 4 ? '1' : '2') +
                  '.png')
              "
              alt=""
            />
            <img
              v-show="active == i"
              :class="'w-bgimgbtnac' + (i + 1)"
              @click="tab(i)"
              :src="require('@/assets/newIndex/btnbgac' + (i + 1) + '.png')"
              alt=""
            />
          </div>
        </div>

        <!-- <img class="w-bgimgbottom1" src="../../src/assets/newIndex/bottombg1.png" alt=""> -->

        <!-- <img class="w-bgimg4 w-qiu" src="../../src/assets/newIndex/bg4.png" alt=""> -->
        <div class="w-shanqiu">
          <!-- <img class="w-bgimg41 w-qiu" src="../../src/assets/newIndex/bg41.png" alt=""> -->
          <div class="w-bgimg41 w-qiu" style="width: 26vw; height: 26vw">
            <div class="main-con">
              <tmap />
            </div>
          </div>

          <div class="w-shanbox">
            <!-- 橙色点点 -->
            <!-- <div class="w-dian orange  w-shanC1"></div>
						<div class="w-dian orange opacity09 w-shanC2 "></div>
						<div class="w-dian orange opacity07 w-shanC3 "></div> -->
            <!-- 黄色小点点 -->
            <!-- <div class="w-dian yellow w-dianH1 "></div>
						<div class="w-dian yellow opacity08 w-dianH2 "></div>
						<div class="w-dian yellow opacity07 w-dianH3 "></div>
						<div class="w-dian yellow opacity09 w-dianH4 "></div>
						<div class="w-dian yellow opacity08 w-dianH5 "></div>
						<div class="w-dian yellow opacity09 w-dianH6 "></div> -->
            <!-- 黄色大点 -->
            <!-- <div class=" w-shanD1 ">
							<div class="w-dian yellow w-shanS1"></div>
						</div>
						<div class=" w-shanD2 ">
							<div class="w-dian yellow w-shanS2"></div>
						</div>
						<div class="w-shanD3">
							<div class="w-dian yellow opacity07 w-shanS3"></div>
						</div> -->
            <!-- 白色点点 -->
            <<!-- div class="w-dian white opacity08 w-dianW1 "></div>
						<div class="w-dian white opacity07 w-dianW2 "></div>
						<div class="w-dian white opacity07 w-dianW3 "></div> -->
          </div>
        </div>
        <div class="w-zhunbottom">
          <img
            class="w-zhuan1"
            src="../../src/assets/newIndex/bzhuan11.png"
            alt=""
          />
          <img
            class="w-zhuan2"
            src="../../src/assets/newIndex/bzhuan2.png"
            alt=""
          />
          <img
            class="w-zhuan3"
            src="../../src/assets/newIndex/bzhuan3.png"
            alt=""
          />
          <!-- <img class="w-zhuan1" src="../../src/assets/newIndex/bzhuan2.png" alt=""> -->
        </div>

        <img
          class="w-bgimgbottom2"
          src="../../src/assets/newIndex/bottombg2.png"
          alt=""
        />
        <!-- 底部 -->
        <img
          class="w-bgimgbottom3"
          src="../../src/assets/newIndex/bottombg3.png"
          alt=""
          @click="gis2"
        />
        <img
          class="w-bgimgbottom4"
          src="../../src/assets/newIndex/bottombg4.png"
          alt=""
          @click="largeScreen"
        />
        <img
          class="w-bgimgbottom5"
          src="../../src/assets/newIndex/bottombg5.png"
          alt=""
          @click="gis"
        />
      </div>
    </div>
  </div>
</template>

<script>
import tmap from "./components/tmap/tmap.vue";
import router from "@/router";
import store from "@/store";
export default {
  components: {
    tmap,
  },
  name: "introduction",
  data() {
    return {
      activeName: "浅色背景",
      username: "",
      roleName: "",
      area: "",
      active: -1,
    };
  },
  activated() {
    location.reload();
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.roleName = localStorage.getItem("roleName");
    this.area = localStorage.getItem("area");
    if (this.area === "耐火西巷") {
      this.getList();
    }
  },
  methods: {
    // 1、进入元素
    mouseenter(i) {
      document.querySelector(".w-bgimghuac" + (i + 1)).style.display = "block";
      document.querySelector(".w-bgimgbtnac" + (i + 1)).style.display = "block";

      console.log("mouseover进入元素");
    },
    mouseleave(i) {
      document.querySelector(".w-bgimghuac" + (i + 1)).style.display = "none";
      document.querySelector(".w-bgimgbtnac" + (i + 1)).style.display = "none";
      console.log("mouseover进入元素");
    },
    tab(i) {
      var that = this;
      that.active = i;

      console.log(i);
      if (i == 0) {
        // 党建
        this.party();
      } else if (i == 1) {
        // 综合查询
        this.search();
      } else if (i == 2) {
        // 基础信息
        this.grid();
      } else if (i == 3) {
        // 便民服务
        this.$message.warning("暂无权限,请购买后使用");
      } else if (i == 4) {
        // 发布系统
        this.$message.warning("暂无权限,请购买后使用");
      } else if (i == 5) {
        // 网格微站
        this.$message.warning("暂无权限,请购买后使用");
      }
    },
    getList() {
      document.querySelector(".introduction").className = "introduction bgArea";
    },
    handleClick(tab, event) {
      if (tab.label === "浅色背景") {
        document.querySelector(".introduction").className =
          "introduction bgLight";
        document.querySelector(".title").className = "title titleLight";
      } else if (tab.label === "深色背景") {
        document.querySelector(".introduction").className =
          "introduction bgDark";
        document.querySelector(".title").className = "title titleDark";
      }
    },
    //退出系统
    logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.href = "/login";
          });
        })
        .catch(() => {});
    },
    // 切换系统
    changesever() {
      this.$confirm("确定切换为旧版系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 存储
          localStorage.setItem("area", "旧系统");
          location.reload();
        })
        .catch(() => {});
    },
    changesever2() {
      this.$confirm("确定切换为新版系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 存储
          localStorage.setItem("area", "系统");
          location.reload();
        })
        .catch(() => {});
    },
    //智慧社区
    grid() {
      let param = {
        moduleType: "网格化",
      };
      var paramObj = JSON.stringify(param);
      localStorage.setItem("param", paramObj);
      let a = localStorage.getItem("param");
      console.log(a);
      store.dispatch("GetInfo").then(() => {
        store.dispatch("GenerateRoutes").then((accessRoutes) => {
          // 根据roles权限生成可访问的路由表
          router.addRoutes(accessRoutes); // 动态添加可访问路由表
          const src = `/index`;
          this.$router.push({
            path: src,
          });
        });
      });
    },

    //智慧党建
    party() {
      let param = {
        moduleType: "党建",
      };
      var paramObj = JSON.stringify(param);
      localStorage.setItem("param", paramObj);
      let a = localStorage.getItem("param");
      console.log(a);
      store.dispatch("GetInfo").then(() => {
        store.dispatch("GenerateRoutes").then((accessRoutes) => {
          // 根据roles权限生成可访问的路由表
          router.addRoutes(accessRoutes); // 动态添加可访问路由表
          const src = `/partyBuildingIndex`;
          this.$router.push({
            path: src,
          });
        });
      });
    },
    // 社区养老
    old() {
      // window.open("http://www.ylaow.cn/fpng/xhlq/swiper/swiper.html###")
      // return
      this.$router.push({
        path: "/old",
      });
    },

    //数据查询中心
    search() {
      let param = {
        moduleType: "综合查询",
      };
      var paramObj = JSON.stringify(param);
      localStorage.setItem("param", paramObj);
      let a = localStorage.getItem("param");
      console.log(a);
      store.dispatch("GetInfo").then(() => {
        store.dispatch("GenerateRoutes").then((accessRoutes) => {
          // 根据roles权限生成可访问的路由表
          router.addRoutes(accessRoutes); // 动态添加可访问路由表
          // const src = `/query`;
          const src = `/area`;
          this.$router.push({
            path: src,
          });
        });
      });
    },
    //gis地图
    gis() {
      this.$message.warning("暂无权限,请购买后使用");
    },
    // 感知平台
    gis2() {
      let param = {
        moduleType: "感知平台",
      };
      var paramObj = JSON.stringify(param);
      localStorage.setItem("param", paramObj);
      let a = localStorage.getItem("param");
      console.log(a);
      store.dispatch("GetInfo").then(() => {
        store.dispatch("GenerateRoutes").then((accessRoutes) => {
          // 根据roles权限生成可访问的路由表
          router.addRoutes(accessRoutes); // 动态添加可访问路由表
          const src = `/gisMap2`;
          this.$router.push({
            path: src,
          });
        });
      });
    },

    //数据大屏
    largeScreen() {
      this.$message.warning("暂无权限,请购买后使用");
    },
    //数据大屏
    system() {
      let param = {
        moduleType: "系统管理",
      };
      var paramObj = JSON.stringify(param);
      localStorage.setItem("param", paramObj);
      let a = localStorage.getItem("param");
      console.log(a);
      store.dispatch("GetInfo").then(() => {
        store.dispatch("GenerateRoutes").then((accessRoutes) => {
          // 根据roles权限生成可访问的路由表
          router.addRoutes(accessRoutes); // 动态添加可访问路由表
          const src = `/system/user`;
          this.$router.push({
            path: src,
          });
        });
      });
    },
  },
};
</script>

<style scoped>
.editbtnnew {
  margin-left: 15px;
  margin-right: 25px;
  cursor: pointer;
}

.editbtnnew:hover,
.outbtnnew:hover {
  color: #75b1fb;
}

/*最大div*/
.introduction {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url("../assets/images/bgLight.jpg");
}

/*浅色背景图*/
.bgLight {
  background-image: url("../assets/images/bgLight.jpg");
}

/*深色背景图*/
.bgDark {
  background-image: url("../assets/images/bgDark.jpg");
}

/*社区背景图*/
.bgArea {
  background-image: url("../assets/images/areabg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/*标题大盒子*/
.title {
  width: 100%;
  height: 124px;
  text-align: center;
  position: relative;
  background: url("../assets/images/headLight.png") center no-repeat;
}

.titleLight {
  background: url("../assets/images/headLight.png") center no-repeat;
}

.titleDark {
  background: url("../assets/images/headDark.png") center no-repeat;
}

.titleArea {
  background: url("../assets/images/areaTop.png") center no-repeat;
  background-size: 100% 100%;
}

/*标题文字*/
.tit-span {
  width: 33%;
  height: 100%;
  margin: auto;
  text-align: center;
  line-height: 108px;
  font-size: 30px;
  color: #318bf9;
  font-weight: bold;
}

.areaTitle {
  margin-top: 50px;
}

.titleArea .tit-span {
  width: 40%;
}

.titleArea .areaTitle {
  margin-top: 32px;
}

/*网格logo*/
.logo {
  width: 82px;
  height: 82px;
  float: left;
  border-radius: 50%;
  padding: 2px 0;
  line-height: 162px;
}

/*用户字体样式*/
.tit-span1 {
  position: relative;
  bottom: 18px;
  left: 28%;
  color: #318bf9;
  font-size: 16px;
}

/*选项卡公共样式*/
/deep/ .el-tabs--card > .el-tabs__header {
  border: none;
}

/deep/ .el-tabs__nav-scroll {
  position: fixed;
  top: 10px;
  right: 10px;
}

/deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 2px solid #d5dbe1;
  border-radius: 4px;
}

/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border: none;
}

/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
  background: #dfeaf6;
  color: #5f97f6;
}

/deep/.el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
  background: #0b265e;
  color: #5f97f6;
}

/deep/.el-tabs__item {
  height: 30px;
  line-height: 30px;
}

/*中间部分*/
.list {
  width: 100%;
  height: auto;
  margin: 50px 0;
}

.listArea {
  width: 100%;
  height: auto;
  margin-top: 84px;
}

/*中间上半部分*/
.liBox {
  width: 60%;
  height: 48%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/*图标公共样式*/
.li {
  width: 16%;
  height: 300px;
  cursor: pointer;
}

.liArea {
  width: 14%;
  height: 200px;
  cursor: pointer;
}

.iconLight {
  position: relative;
  top: 106px;
  right: 0;
  font-size: 80px;
  z-index: 1000;
  animation: beat 3s linear infinite;
}

@keyframes beat {
  0%,
  100% {
    top: 106px;
  }

  33% {
    top: 100px;
  }

  66% {
    top: 112px;
  }
}

.iconDark {
  position: relative;
  top: 106px;
  right: 38px;
  font-size: 80px;
  z-index: 1000;
  background-image: -webkit-linear-gradient(top, #045ec2, #00aaff);
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.iconTitle {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  position: relative;
  top: -148px;
  left: 0;
}

.iconTitleArea {
  margin: 0;
  font-size: 20px;
}

.iconArea {
  position: relative;
  top: 124px;
  right: 0;
  font-size: 80px;
  z-index: 1000;
  color: #fff;
}

.partyArea {
  color: #fff !important;
  font-size: 24px;
}

.partyLeader {
  width: 50%;
  position: relative;
  top: 112px;
  right: 0;
}

.grid {
  color: #1f79f3;
}

.party {
  color: #f27563;
}

.event {
  color: #27acbc;
}

.search {
  color: #9b89b9;
}

.bigdata {
  color: #5c6bc0;
}

.gis {
  color: #a0887e;
}

.institution {
  color: #fea428;
}

.system {
  color: #3bc2b4;
}

.dark {
  color: #00aaff;
}

.star {
  position: relative;
  top: 100px;
  left: 50px;
  width: 86px;
  z-index: 1005;
  animation: myStar 2s ease-in-out infinite;
}

@keyframes myStar {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

/*光束样式*/
.beam {
  position: relative;
  top: 10px;
  opacity: 0.4;
}

/*底部*/
.footer {
  width: 100%;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #318bf9;
  font-weight: bold;
  /* position: absolute;
  bottom: 20px; */
}

.footerArea {
  width: 100%;
  height: 70px;
  /*text-align:center;
  line-height:100px;
  font-size:20px;
  color:#fff;
  font-weight: bold;*/
  position: absolute;
  bottom: 0;
  background: url("../assets/images/areaFooter.png") center no-repeat;
  background-size: 100% 100%;
}

.icon-menu-party::before {
  content: "\e907";
}

/*底部标题文字*/
.footer-span {
  width: 18%;
  height: 100%;
  margin: auto;
}

.footer-span img {
  margin-top: 24px;
}

.imgWrap {
  position: relative;
  top: -88px;
  transform: rotateX(75deg);
}

.rotate {
  animation: imgRotate 5s linear infinite;
  opacity: 0.8;
}

@keyframes imgRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 新首页样式 */
.w-pages {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: RGBA(0, 12, 27, 1);
}

.w-bgimg {
  width: 100vw;
  position: relative;
  top: -2vw;
}

.w-bgimg2 {
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-bgimg3 {
  width: 30vw;
  /* height: 100vh; */
  position: absolute;
  top: 6vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-bgimg4 {
  width: 100vw;
  position: absolute;
  top: -2vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-content {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
}

/* .................. */
.w-bian1 {
  position: absolute;
  top: 0;
  width: 90vw;
  height: 100vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-bian2 {
  position: absolute;
  top: 0;
  width: 90vw;
  height: 100vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-zongText1 {
  position: absolute;
  top: 22vw;
  width: 20px;
  left: 3vw;
  margin: auto;
  display: block;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}

.w-zongText2 {
  width: 20px;
  position: absolute;
  top: 22vw;
  right: 3vw;
  margin: auto;
  display: block;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}

/* ........................ */
.w-headbox {
  position: absolute;
  top: 5.5vw;
  right: 13vw;
  /* width: 200px; */
  display: flex;
  align-items: center;
}

.w-head {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.w-admin {
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
}

.w-exitbox {
  position: absolute;
  top: 5.5vw;
  right: 7vw;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.w-exitimg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: block;
  cursor: pointer;
}

.w-exitText {
  color: #fff;
  font-size: 14px;
  display: block;
  margin-left: 10px;
}

.w-oldbox {
  height: 40px;
  position: absolute;
  top: 5.5vw;
  right: 2vw;
  display: flex;
  align-items: center;
}

.w-old {
  color: #fff;
  font-size: 14px;
  display: block;
  cursor: pointer;
}

/* ................. */
.w-bgimgbtn1,
.w-bgimgbtnac1 {
  width: 20vw;
  position: absolute;
  top: 13.5vw;
  left: -50vw;
  right: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
  z-index: 999;
}

.w-bgimgbtn1:hover + .w-bgimgbtnbox .w-bgimgbtnac1 {
  display: block !important;
}

.w-bgimgbtn2,
.w-bgimgbtnac2 {
  width: 17vw;
  position: absolute;
  top: 23vw;
  left: -55vw;
  right: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
}

.w-bgimgbtn2:hover + .w-bgimgbtnbox .w-bgimgbtnac2 {
  display: block !important;
}

.w-bgimgbtn2:hover + .w-bgimgbtnbox .w-bgimghuac2 {
  display: block !important;
}

.w-bgimgbtn3,
.w-bgimgbtnac3 {
  width: 20vw;
  position: absolute;
  top: 33vw;
  left: -50vw;
  right: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
}

.w-bgimgbtn3:hover + .w-bgimgbtnbox .w-bgimgbtnac3 {
  display: block !important;
}

.w-bgimgbtn3:hover + .w-bgimgbtnbox .w-bgimghuac3 {
  display: block !important;
}

.w-bgimgbtn4,
.w-bgimgbtnac4 {
  width: 20vw;
  position: absolute;
  top: 13.5vw;
  right: -50vw;
  left: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
}

.w-bgimgbtn4:hover + .w-bgimgbtnbox .w-bgimgbtnac4 {
  display: block !important;
}

.w-bgimgbtn4:hover + .w-bgimgbtnbox .w-bgimghuac4 {
  display: block !important;
}

.w-bgimgbtn5,
.w-bgimgbtnac5 {
  width: 17vw;
  position: absolute;
  top: 23vw;
  right: -55vw;
  left: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
}

.w-bgimgbtn5:hover + .w-bgimgbtnbox .w-bgimgbtnac5 {
  display: block !important;
}

.w-bgimgbtn5:hover + .w-bgimgbtnbox .w-bgimghuac5 {
  display: block !important;
}

.w-bgimgbtn6,
.w-bgimgbtnac6 {
  width: 20vw;
  position: absolute;
  top: 33vw;
  right: -50vw;
  left: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
}

.w-bgimgbtn6:hover + .w-bgimgbtnbox .w-bgimgbtnac6 {
  display: block !important;
}

.w-bgimgbtn6:hover + .w-bgimgbtnbox .w-bgimghuac6 {
  display: block !important;
}

/* .............................. */
.w-bgimghu1 {
  width: 16vw;
  position: absolute;
  top: 8vw;
  right: -28vw;
  left: 0;
  margin: 0 auto;
  display: block;
}

.w-bgimghu2 {
  width: 16vw;
  position: absolute;
  top: 8vw;
  right: 28vw;
  left: 0;
  margin: 0 auto;
  display: block;
  transform: rotate(180deg);
}

.w-bgimghuac1 {
  width: 15vw;
  position: absolute;
  top: 8vw;
  right: 27vw;
  left: 0;
  margin: 0 auto;
  display: block;
  transform: rotateX(197deg);
}

.w-bgimghuac2 {
  width: 17vw;
  position: absolute;
  top: 8.6vw;
  right: 29.5vw;
  left: 0;
  margin: 0 auto;
  display: block;
  transform: rotateX(5deg);
}

.w-bgimghuac3 {
  width: 16vw;
  position: absolute;
  top: 10vw;
  right: 26.3vw;
  left: 0;
  margin: 0 auto;
  display: block;
  transform: rotateX(22deg);
}

.w-bgimghuac4 {
  width: 15vw;
  position: absolute;
  top: 7.7vw;
  right: -26.6vw;
  left: 0;
  margin: 0 auto;
  display: block;
  transform: rotateZ(180deg);
}

.w-bgimghuac5 {
  width: 17vw;
  position: absolute;
  top: 9vw;
  right: -29.3vw;
  left: 0;
  margin: 0 auto;
  display: block;
  transform: rotate(182deg);
}

.w-bgimghuac6 {
  width: 15vw;
  position: absolute;
  top: 11vw;
  right: -26.6vw;
  left: 0;
  margin: 0 auto;
  display: block;
  transform: rotateY(180deg);
}

/* ..................... */
.w-bgimgbottom1 {
  width: 56vw;
  position: absolute;
  top: 37vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-bgimgbottom2 {
  /* width: 26vw; */
  height: 9vh;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-bgimgbottom3 {
  /* width: 8vw; */
  height: 7vh;
  position: absolute;
  bottom: 0;
  left: -38vh;
  right: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
}

.w-bgimgbottom4 {
  height: 7vh;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
}

.w-bgimgbottom5 {
  height: 7vh;
  position: absolute;
  bottom: 0;
  left: 38vh;
  right: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
}

/* ................... */
.w-zhunbottom {
  transform: rotateX(82deg);
  width: 62vw;
  position: absolute;
  top: 36vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-zhuan1 {
  width: 100%;
  animation: circles 100s linear infinite;
  position: absolute;
  top: 29vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-zhuan2 {
  width: 41%;
  animation: circles2 30s linear infinite;
  position: absolute;
  top: 42vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-zhuan3 {
  width: 34%;
  position: absolute;
  top: 42vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
  animation: circles 30s linear infinite;
}

@keyframes circles {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes circles2 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
}

/* ...................... */
.w-shanqiu {
  width: 26vw;
  position: absolute;
  top: 12.5vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

.w-bgimg41 {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
}

/* 橙色点点 */
.w-dian {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
}

.opacity09 {
  opacity: 0.9;
}

.opacity08 {
  opacity: 0.8;
}

.opacity07 {
  opacity: 0.7;
}

.orange {
  background-color: rgba(248, 68, 47, 1);
}

.yellow {
  background-color: rgba(239, 242, 167, 1);
}

.white {
  background-color: rgba(255, 255, 255, 1);
}

.w-shanC1 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.5);
  top: 7vw;
  left: 4vw;
  animation: blink 2s linear infinite 4s alternate;
}

.w-shanC2 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.5);
  top: 14.5vw;
  left: 22vw;
  animation: blink 1s linear infinite 2s alternate;
}

.w-shanC3 {
  box-shadow: 0 0 7px 4px rgba(239, 242, 167, 0.4);
  top: 18vw;
  left: 18vw;
  animation: blink 3s linear infinite 6s alternate;
}

/* 黄色小点点 */
.w-dianH1 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.5);
  top: 6.3vw;
  left: 5.8vw;
  animation: blink 3s linear infinite 1s alternate;
}

.w-dianH2 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.5);
  top: 6.5vw;
  left: 7vw;
  animation: blink 2s linear infinite 4s alternate;
}

.w-dianH3 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.5);
  top: 9.4vw;
  left: 5.4vw;
  animation: blink 3s linear infinite 2s alternate;
}

.w-dianH4 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.5);
  top: 15vw;
  left: 7.5vw;
  animation: blink 1s linear infinite 1s alternate;
}

.w-dianH5 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.3);
  top: 4vw;
  left: 16.5vw;
  animation: blink 2s linear infinite 4s alternate;
}

.w-dianH6 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.5);
  top: 4.5vw;
  left: 17.5vw;
  animation: blink 4s linear infinite 2s alternate;
}

/* 边缘大的点 */
.w-shanD1 {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: rgba(239, 242, 167, 0.05);
  box-shadow: 0 0 5px 1px rgba(239, 242, 167, 0.2) inset;
  position: absolute;
  top: 3.5vw;
  left: 13vw;
  animation: blink 2s linear infinite 2s alternate;
}

.w-shanS1 {
  box-shadow: 0 0 6px 3px rgba(239, 242, 167, 0.5);
  top: 17px;
  left: 17px;
}

.w-shanD2 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(239, 242, 167, 0.04);
  box-shadow: 0 0 5px 1px rgba(239, 242, 167, 0.2) inset;
  position: absolute;
  top: 1.8vw;
  left: 11vw;
  animation: blink 4s linear infinite 2s alternate;
}

.w-shanS2 {
  box-shadow: 0 0 6px 3px rgba(239, 242, 167, 0.5);
  top: 11px;
  left: 11px;
}

.w-shanD3 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(239, 242, 167, 0.04);
  box-shadow: 0 0 5px 1px rgba(239, 242, 167, 0.2) inset;
  position: absolute;
  top: 9vw;
  left: 9.6vw;
  animation: blink 2s linear infinite 3s alternate;
}

.w-shanS3 {
  box-shadow: 0 0 6px 3px rgba(239, 242, 167, 0.5);
  position: absolute;
  top: 11px;
  left: 11px;
}

/* 白色点 */
.w-dianW1 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.5);
  top: 8.1vw;
  left: 21.4vw;
  animation: blink 1s linear infinite 4s alternate;
}

.w-dianW2 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.5);
  top: 3.7vw;
  left: 17.4vw;
  animation: blink 2s linear infinite 1s alternate;
}

.w-dianW3 {
  box-shadow: 0 0 3px 4px rgba(239, 242, 167, 0.5);
  top: 4vw;
  left: 8vw;
  animation: blink 2s linear infinite 6s alternate;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

/* 球 */
.main-con {
  width: 100%;
  height: 100%;
}
</style>
