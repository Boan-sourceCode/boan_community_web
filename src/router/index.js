import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true,
  },
  //无跳转路径时去引导页
  {
    path: "",
    component: Layout,
    redirect: "introduction",
  },
  // 引导页
  {
    path: "/introduction",
    component: () => import("@/views/introduction"),
    hidden: true,
  },
  //个人中心
  {
    path: "/user",
    component: Layout,
    hidden: true,
    redirect: "noredirect",
    children: [
      {
        path: "profile",
        component: () => import("@/views/system/user/profile/index"),
        name: "Profile",
        meta: { title: "个人中心", icon: "user" },
      },
    ],
  },
  //网格化
  // 网格化页面详情
  {
    path: "/grid",
    component: Layout,
    redirect: "/grid/indexDetailsGrid",
    children: [
      {
        path: "indexDetailsGrid",
        component: () => import("@/views/system/area/grid/indexDetailsGrid"),
        hidden: true,
        meta: { title: "网格管理 > 网格详情" },
      },
    ],
  },
  // 网格化页面高级
  {
    path: "/grid",
    component: Layout,
    redirect: "/grid/indexSeniorGrid",
    children: [
      {
        path: "indexSeniorGrid",
        component: () => import("@/views/system/area/grid/indexSeniorGrid"),
        hidden: true,
        meta: { title: "网格管理 > 高级" },
      },
    ],
  },
  // 网格化页面新增网格
  {
    path: "/grid",
    component: Layout,
    redirect: "/grid/indexAddGrid",
    children: [
      {
        path: "indexAddGrid",
        component: () => import("@/views/system/area/grid/indexAddGrid"),
        hidden: true,
        meta: { title: "网格管理 > 添加网格" },
      },
    ],
  },

  // 实有建筑
  // 实有建筑 - 房屋高级页面
  {
    path: "/building",
    component: Layout,
    redirect: "/building/houseHeight",
    children: [
      {
        name: "houseHeight",
        path: "/houseHeight",
        component: () => import("@/views/system/area/building/houseHeight"),
        hidden: true,
        meta: { title: "实有建筑 > 楼房 > 房屋高级查询检索" },
      },
    ],
  },
  // 添加楼房页面（单元楼）
  {
    path: "/building",
    component: Layout,
    redirect: "/building/addBuilding",
    children: [
      {
        name: "addBuilding",
        path: "/addBuilding",
        component: () => import("@/views/system/area/building/addBuilding"),
        hidden: true,
        meta: { title: "实有建筑 > 添加单元楼" },
      },
    ],
  },
  // 添加楼房页面（非单元楼）
  {
    path: "/building",
    component: Layout,
    redirect: "/building/addNotUnit",
    children: [
      {
        name: "addNotUnit",
        path: "/addNotUnit",
        component: () => import("@/views/system/area/building/addNotUnit"),
        hidden: true,
        meta: { title: "实有建筑 > 添加非单元楼" },
      },
    ],
  },
  // 添加院落
  {
    path: "/building",
    component: Layout,
    redirect: "/building/addCourtyard",
    children: [
      {
        name: "addCourtyard",
        path: "/addCourtyard",
        component: () => import("@/views/system/area/building/addCourtyard"),
        hidden: true,
        meta: { title: "实有建筑 > 添加院落" },
      },
    ],
  },
  // 添加基础建筑
  {
    path: "/building",
    component: Layout,
    redirect: "/building/addBasics",
    children: [
      {
        name: "addBasics",
        path: "/addBasics",
        component: () => import("@/views/system/area/building/addBasics"),
        hidden: true,
        meta: { title: "实有建筑 > 添加基础建筑" },
      },
    ],
  },
  // 楼房展示页/详情页
  {
    path: "/building",
    component: Layout,
    redirect: "/building/buildingInfo",
    children: [
      {
        name: "buildingInfo",
        path: "/buildingInfo",
        component: () => import("@/views/system/area/building/buildingInfo"),
        hidden: true,
        meta: { title: "实有建筑 > 详情" },
      },
    ],
  },
  // 基础建筑展示页/详情页
  {
    path: "/building",
    component: Layout,
    redirect: "/building/basicsInfo",
    children: [
      {
        name: "basicsInfo",
        path: "/basicsInfo",
        component: () => import("@/views/system/area/building/basicsInfo"),
        hidden: true,
        meta: { title: "实有建筑 > 详情" },
      },
    ],
  },
  // 实有建筑 - 楼房/院落高级页面
  {
    path: "/building",
    component: Layout,
    redirect: "/building/buildingHeight",
    children: [
      {
        name: "buildingHeight",
        path: "/buildingHeight",
        component: () => import("@/views/system/area/building/buildingHeight"),
        hidden: true,
        meta: { title: "实有建筑 > 楼房 > 楼房/院落高级查询检索" },
      },
    ],
  },
  // 实有建筑 - 楼房/院落高级页面 - 批量修改标准地址
  {
    path: "/building",
    component: Layout,
    redirect: "/building/batchUpdateAddress",
    children: [
      {
        name: "batchUpdateAddress",
        path: "/batchUpdateAddress",
        component: () =>
          import("@/views/system/area/building/batchUpdateAddress"),
        hidden: true,
        meta: { title: "实有建筑 > 楼房/院落高级查询检索 > 批量修改标准地址" },
      },
    ],
  },
  // 实有建筑 - 楼房/院落高级页面 - 批量设置楼房/院落属性
  {
    path: "/building",
    component: Layout,
    redirect: "/building/batchSettingsBuildHeight",
    children: [
      {
        name: "batchSettingsBuildHeight",
        path: "/batchSettingsBuildHeight",
        component: () =>
          import("@/views/system/area/building/batchSettingsBuildHeight"),
        hidden: true,
        meta: {
          title: "实有建筑 > 楼房/院落高级查询检索 > 批量设置楼房/院落属性",
        },
      },
    ],
  },
  // 实有建筑 - 房屋展示页
  {
    path: "/building",
    component: Layout,
    redirect: "/building/houseInfo",
    children: [
      {
        name: "houseInfo",
        path: "/houseInfo",
        component: () => import("@/views/system/area/building/houseInfo"),
        hidden: true,
        meta: { title: "实有建筑 > 楼房 > 房屋展示" },
      },
    ],
  },
  // 实有建筑 - 房屋高级页面 - 批量修改房层属性
  {
    path: "/building",
    component: Layout,
    redirect: "/building/batchSettingsHouseHeight",
    children: [
      {
        name: "batchSettingsHouseHeight",
        path: "/batchSettingsHouseHeight",
        component: () =>
          import("@/views/system/area/building/batchSettingsHouseHeight"),
        hidden: true,
        meta: { title: "实有建筑 > 房屋高级查询检索 > 批量修改房层属性" },
      },
    ],
  },

  // 实有人口
  // 实有人口高级
  {
    path: "/population",
    component: Layout,
    redirect: "/population/populationSenior",
    children: [
      {
        path: "populationSenior",
        component: () =>
          import("@/views/system/area/population/populationSenior"),
        hidden: true,
        meta: { title: "实有人口 > 高级" },
      },
    ],
  },
  // 实有人口详情
  {
    path: "/population",
    component: Layout,
    redirect: "/population/populationDetails",
    children: [
      {
        path: "populationDetails",
        component: () =>
          import("@/views/system/area/population/populationDetails"),
        hidden: true,
        meta: { title: "实有人口 > 人口详情" },
      },
    ],
  },

  // 实有企业
  // 实有企业高级
  {
    path: "/enterprise",
    component: Layout,
    redirect: "/enterprise/enterpriseSenior",
    children: [
      {
        path: "enterpriseSenior",
        component: () =>
          import("@/views/system/area/enterprise/enterpriseSenior"),
        hidden: true,
        meta: { title: "实有企业 > 高级" },
      },
    ],
  },
  // 实有企业详情
  {
    path: "/enterprise",
    component: Layout,
    redirect: "/enterprise/enterpriseDetails",
    children: [
      {
        path: "enterpriseDetails",
        component: () =>
          import("@/views/system/area/enterprise/enterpriseDetails"),
        hidden: true,
        meta: { title: "实有企业 > 企业详情" },
      },
    ],
  },

  //部件
  //部件添加/编辑
  {
    path: "/DepartMent",
    component: Layout,
    redirect: "/department/departmentAdd",
    children: [
      {
        path: "DepartmentAdd",
        component: () => import("@/views/system/area/department/departmentAdd"),
        name: "departmentAdd",
        hidden: true,
        meta: {
          title: "部件管理 > 部门添加/编辑",
          icon: "build",
          hidden: true,
        },
      },
    ],
  },
  //部件详情
  {
    path: "/DepartMent",
    component: Layout,
    redirect: "/department/departmentDetails",
    children: [
      {
        path: "DepartmentDetails",
        component: () =>
          import("@/views/system/area/department/departmentDetails"),
        name: "departmentDetails",
        hidden: true,
        meta: { title: "部件管理 > 部件详情", icon: "build", hidden: true },
      },
    ],
  },
  // 智慧党建
  // 智慧党建数据看板——三会一课
  {
    path: "/threeClass",
    component: Layout,
    redirect: "/partyBuildingView/threeClass",
    children: [
      {
        path: "threeClass",
        component: () =>
          import("@/views/system/area/partyBuildingView/threeClass"),
        hidden: true,
        meta: { title: "数据看板 > 三会一课", icon: "build" },
      },
    ],
  },
  // 智慧党建数据看板——党费缴纳
  {
    path: "/partyBuildingView/partyFeePayment",
    component: Layout,
    redirect: "/partyBuildingView/partyFeePayment",
    children: [
      {
        path: "partyFeePayment",
        component: () =>
          import("@/views/system/area/partyBuildingView/partyFeePayment"),
        hidden: true,
        meta: { title: "数据看板 > 党费缴纳", icon: "build" },
      },
    ],
  },
  // 党员管理详情
  {
    path: "/partyerListDetails",
    component: Layout,
    redirect: "/partyMenberManagementCom/partyerListDetails",
    children: [
      {
        path: "/partyerListDetails",
        component: () =>
          import(
            "@/views/system/area/partyMenberManagementCom/partyerListDetails"
          ),
        hidden: true,
        meta: { title: "党员管理 > 党员管理详情" },
      },
    ],
  },

  // 党员管理详情
  {
    path: "/partyThreeLessonsDetail",
    component: Layout,
    redirect: "/partyThreeLessons/partyThreeLessonsDetail",
    children: [
      {
        path: "/partyThreeLessonsDetail",
        component: () =>
          import(
            "@/views/system/area/partyThreeLessons/partyThreeLessonsDetail"
          ),
        hidden: true,
        meta: { title: "三会一课 > 会议详情" },
      },
      {
        path: "/partyThreeLessonsAdd",
        component: () =>
          import("@/views/system/area/partyThreeLessons/partyThreeLessonsAdd"),
        hidden: true,
        meta: { title: "三会一课 > 会议详情 > 添加会议记录" },
      },
    ],
  },

  {
    path: "/gisMap2",
    component: () => import("@/views/system/area/gisMap2"),
    hidden: true,
  },
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: "/system/user-auth",
    component: Layout,
    hidden: true,
    permissions: ["system:user:edit"],
    children: [
      {
        path: "role/:userId(\\d+)",
        component: () => import("@/views/system/user/authRole"),
        name: "AuthRole",
        meta: { title: "分配角色", activeMenu: "/system/user" },
      },
    ],
  },
  {
    path: "/system/role-auth",
    component: Layout,
    hidden: true,
    permissions: ["system:role:edit"],
    children: [
      {
        path: "user/:roleId(\\d+)",
        component: () => import("@/views/system/role/authUser"),
        name: "AuthUser",
        meta: { title: "分配用户", activeMenu: "/system/role" },
      },
    ],
  },
  {
    path: "/system/dict-data",
    component: Layout,
    hidden: true,
    permissions: ["system:dict:list"],
    children: [
      {
        path: "index/:dictId(\\d+)",
        component: () => import("@/views/system/dict/data"),
        name: "Data",
        meta: { title: "字典数据", activeMenu: "/system/dict" },
      },
    ],
  },
  {
    path: "/monitor/job-log",
    component: Layout,
    hidden: true,
    permissions: ["monitor:job:list"],
    children: [
      {
        path: "index",
        component: () => import("@/views/monitor/job/log"),
        name: "JobLog",
        meta: { title: "调度日志", activeMenu: "/monitor/job" },
      },
    ],
  },
  {
    path: "/tool/gen-edit",
    component: Layout,
    hidden: true,
    permissions: ["tool:gen:edit"],
    children: [
      {
        path: "index/:tableId(\\d+)",
        component: () => import("@/views/tool/gen/editTable"),
        name: "GenEdit",
        meta: { title: "修改生成配置", activeMenu: "/tool/gen" },
      },
    ],
  },
];

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};

export default new Router({
  mode: "history", // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
