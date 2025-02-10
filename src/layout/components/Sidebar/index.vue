<template>
    <div :class="{'has-logo':showLogo}" :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
        <logo v-if="showLogo" :collapse="false" />
        <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="false"
                :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
                :text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
                @click.native="menuClick"
            >
                <sidebar-item
                    v-for="(route, index) in sidebarRouters"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"
                    ref="active"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["sidebarRouters", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
  watch: {
    'router':'menuClick'
  },
  mounted() {
    console.log('456789',this.sidebarRouters)
    this.menuClick()
    let listItem = document.getElementsByClassName('el-menu-item')
    listItem = Array.from(listItem);
    listItem.forEach(function(item) {
      // if(item.innerText === "网格管理"){
      //   item.style.background = '#1f79f3'
      // }else if(item.innerText === "实有建筑"){
      //   item.style.background = '#f27463'
      // }else if(item.innerText === "实有人口"){
      //   item.style.background = '#3bc2b4'
      // }else if(item.innerText === "实有企业"){
      //   item.style.background = '#5c6bc0'
      // }else if(item.innerText === "小区管理"){
      //   item.style.background = '#a0887e'
      // }else if(item.innerText === "综合查询"){
      //   item.style.background = '#ff933e'
      // }else{
      //   item.style.background = '#1f79f3'
      // }
      // if(item.innerText === "实有建筑"){
      //   item.style.background = '#f27463'
      // }else{
      //     item.style.background = '#1f79f3'
      //   }
    });

    let itemList = document.getElementsByClassName('el-submenu')
    itemList = Array.from(itemList);
    console.log(itemList)
    let icon = document.getElementsByClassName('leftIcon')
    icon = Array.from(icon);
    itemList.forEach(function(item) {
      if(item.innerText === "系统管理"){
        item.style.cssText = `background: transparent !important;`
        icon.forEach(function(iconItem) {
          iconItem.style.display = 'none'
        })
      }else if(item.innerText === "系统工具"){
        item.style.cssText = `background: transparent !important;`
        icon.forEach(function(iconItem) {
          iconItem.style.display = 'none'
        })
      }
    });
  },
  methods:{
      menuClick(){
        //获取箭头
        let icon = document.getElementsByClassName('leftIcon')
        icon = Array.from(icon);

        //获取点击的item
        let active = document.getElementsByClassName('el-menu-item is-active')
        active = Array.from(active);

        //当点击有值时触发
        if(active.length !== 0){
          let activeTop = active[0].getBoundingClientRect().top
          icon.forEach(function(item) {
            item.style.top = activeTop + 26 + 'px'
          })
        }else {
          // 获取路由名称
          let routerName = this.$route.meta.title
          // console.log(routerName)
          icon.forEach(function(item) {
            if(routerName === "网格管理 > 网格详情" || routerName === "网格管理 > 高级" || routerName === "网格管理 > 添加网格" || routerName === "事件 > 高级"){
              item.style.top = 8 + 'rem'
            }else if(routerName === "实有建筑 > 楼房 > 房屋高级查询检索" || routerName === "实有建筑 > 添加单元楼" || routerName === "实有建筑 > 添加非单元楼" || routerName === "实有建筑 > 添加院落" || routerName === "实有建筑 > 添加基础建筑" || routerName === "实有建筑 > 详情" || routerName === "实有建筑 > 楼房 > 楼房/院落高级查询检索" || routerName === "实有建筑 > 楼房/院落高级查询检索 > 批量修改标准地址" || routerName === "实有建筑 > 楼房/院落高级查询检索 > 批量设置楼房/院落属性" || routerName === "实有建筑 > 楼房 > 房屋展示" || routerName === "实有建筑 > 房屋高级查询检索 > 批量修改房层属性"){
              item.style.top = 14.25 + 'rem'
            }else if(routerName === "实有人口 > 高级" || routerName === "实有人口 > 人口详情"){
              item.style.top = 20.5 + 'rem'
            }else if(routerName === "实有企业 > 高级" || routerName === "实有企业 > 企业详情" || routerName === "党员管理 > 党员管理详情"){
              item.style.top = 26.5 + 'rem'
            }else if(routerName === "部件管理 > 部门添加/编辑" || routerName === "部件管理 > 部件详情"){
              item.style.top = 38.9 + 'rem'
            }else if(routerName === "我的事件 > 上报/派遣事件" || routerName === "我的事件 > 未处理的事件" || routerName === "数据看板 > 三会一课" || routerName === "数据看板 > 党费缴纳"){
              item.style.top = 14.25 + 'rem'
            }

          })
        }

      }
  }
};
</script>
