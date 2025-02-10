<!-- 头部导航栏 -->
<template>
  <div class="navbar">
<!--    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->
<!--    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav"/>-->
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav"/>

    <div style="margin: 0;float: left" v-if="this.flag === true">
      <div class="left-menu">
        <el-button type="primary" size="small" plain @click="goBack">返回</el-button>
      </div>
      <p class="current">当前位置：</p>
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>



    <div class="right-menu">
      <template v-if="device!=='mobile'">
   <p class="alignment"><i class="icon-repeat" @click="reload()" style="cursor: pointer"></i></p>
        <p class="alignment"><i class="icon-bell-o" style="font-weight: bold;cursor: pointer"></i></p>
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <p class="alignment">{{ username }}<i class="icon-chevron-down"></i></p>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span>消息通知</span>
          </el-dropdown-item>
          <router-link to="/user/profile">
            <el-dropdown-item divided>个人设置</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span>退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import log from "../../views/monitor/job/log";
import Cookies from "js-cookie";

export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },
  data() {
    return {
      flag : true,
      router:'',
      username:'',
    }
  },
  watch: {
    $route:{
      handler(newVal) {
        this.router = newVal.path
        console.log(this.router)
        this.location()
      },
      immediate: true,  //立即监听
    }
  },
  mounted() {
    this.username = localStorage.getItem("username");
    // this.location()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    toIntroduction(){
      this.$router.push({path: '/introduction'})
    },
    location(){
      console.log(this.router)
      if(this.router === '/index'){
        this.flag = false
      }else if(this.router === '/newHouse'){
        this.flag = false
      }else if(this.router === '/populationIndex'){
        this.flag = false
      }else if(this.router === '/enterpriseIndex'){
        this.flag = false
      }else if(this.router === '/village'){
        this.flag = false
      }else if(this.router === '/departMentIndex'){
        this.flag = false
      }else if(this.router === '/query'){
        this.flag = false
      }else if(this.router === '/partyBuildingIndex'){
        this.flag = false
      }else if(this.router === '/partyBuildingView'){
        this.flag = false
      }else if(this.router === '/partyBuildingManage'){
        this.flag = false
      }else if(this.router === '/partymembersList'){
        this.flag = false
      }else if(this.router === '/EventpageIndex'){
        this.flag = false
      }else if(this.router === '/EventpageMy'){
        this.flag = false
      }else if(this.router === '/system/user'){
        this.flag = false
      }else if(this.router === '/system/role'){
        this.flag = false
      }else if(this.router === '/system/menu'){
        this.flag = false
      }else if(this.router === '/system/dept'){
        this.flag = false
      }else if(this.router === '/system/post'){
        this.flag = false
      }else if(this.router === '/system/dict'){
        this.flag = false
      }else if(this.router === '/system/config'){
        this.flag = false
      }else if(this.router === '/tool/build'){
        this.flag = false
      }else if(this.router === '/tool/gen'){
        this.flag = false
      }else if(this.router === '/tool/swagger'){
        this.flag = false
      }else if(this.router === '/service'){
        this.flag = false
      }else if(this.router === '/service2'){
        this.flag = false
      }else if(this.router === '/service4'){
        this.flag = false
      }else if(this.router === '/service3'){
        this.flag = false
      }else if(this.router === '/weizhan'){
        this.flag = false
      }else {
        this.flag = true
      }
    },
    goBack(){
      window.history.go(-1);
    },
    reload(){
      location.reload();
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/login';
        })
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-radius: 10px 10px 0 0;
  //box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  //.breadcrumb-container {
  //  float: left;
  //}

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .left-menu{
    float: left;
    height: 100%;
    line-height: 50px;
    margin: 0 20px 0 30px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      color: #5a5e66;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.alignment{
  display: inline-block;
  font-size: 14px;
  margin: 0 10px;
  padding: 0;
  line-height: 50px;
  font-weight: bold;
}
.el-dropdown-menu--medium .el-dropdown-menu__item{
  line-height: 20px;
  text-align: center;
  font-weight: bold;
}
.current{
  display: inline-block;
  margin: 0;
  line-height: 50px;
  vertical-align: top;
  font-size: 14px;
  color: #97a8be;
}
</style>
