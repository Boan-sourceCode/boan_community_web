<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}" :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <h1 class="sidebar-title icon-grid" v-if="this.moduleType === '网格化'" style="color: #1F79F3">基础信息</h1>
        <h1 class="sidebar-title icon-grid" v-if="this.moduleType === '感知平台'" style="color: #1F79F3">感知平台</h1>
        <h1 class="sidebar-title icon-party" v-if="this.moduleType === '党建'" style="color: #F27563">智慧党建</h1>
        <h1 class="sidebar-title icon-event" v-if="this.moduleType === '事件'" style="color: #FF933E">事件督办</h1>
        <h1 class="sidebar-title icon-search" v-if="this.moduleType === '综合查询'" style="color: #9B89B9">数据全景</h1>
        <h1 class="sidebar-title icon-event" v-if="this.moduleType === '政务服务'" style="color: #FF933E">便民服务</h1>C
        <h1 class="sidebar-title icon-system" v-if="this.moduleType === '系统管理'" style="color: #3BC2B4">系统管理</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <h1 class="sidebar-title icon-grid" v-if="this.moduleType === '网格化'" style="color: #1F79F3">基础信息</h1>
        <h1 class="sidebar-title icon-grid" v-if="this.moduleType === '感知平台'" style="color: #1F79F3">感知平台</h1>
        <h1 class="sidebar-title icon-party" v-if="this.moduleType === '党建'" style="color: #F27563">智慧党建</h1>
        <h1 class="sidebar-title icon-event" v-if="this.moduleType === '事件'" style="color: #FF933E">事件督办</h1>
        <h1 class="sidebar-title icon-search" v-if="this.moduleType === '综合查询'" style="color: #9B89B9">数据全景</h1>
        <h1 class="sidebar-title icon-event" v-if="this.moduleType === '政务服务'" style="color: #FF933E">便民服务</h1>
        <h1 class="sidebar-title icon-system" v-if="this.moduleType === '系统管理'" style="color: #3BC2B4">系统管理</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/logo/logo.png'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    variables() {
      return variables;
    },
    sideTheme() {
      return this.$store.state.settings.sideTheme
    },
  },
  data() {
    return {
      moduleType:'',
      logo: logoImg
    }
  },
  mounted() {
    this.cache()
  },
  methods:{
    cache(){
      let param = localStorage.getItem("param");
      let paramObj=JSON.parse(param);
      this.moduleType = paramObj.moduleType
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  margin-top: 32px;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      // margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      //color: #1F79F3 !important;
      font-weight: 600;
      line-height: 50px;
      font-size: 24px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
