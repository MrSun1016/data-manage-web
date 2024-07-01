<template>
  <a-layout id="components-layout-demo-custom-trigger" :class="[device]">
    <!-- height: calc(100vh - 70px); -->
    <div style="background-color: #001529">
      <div style="overflow-y: auto; height: 100vh; background-color: #001529">
        <side-menu
          mode="inline"
          :menus="menus"
          @menuSelect="myMenuSelect"
          :theme="'dark'"
          :collapsed="collapsed"
          :collapsible="true"
        />
      </div>
    </div>
    <!-- 菜单End -->
    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: fixSiderbar && isDesktop() ? `${sidebarOpened ? 200 : 80}px` : '0' }"
    >
      <!-- 头部 -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
        @menuSelect="myMenuSelect"
      />
      <!-- 头部End -->

      <!-- 面包屑导航 -->
      <div class="crumbs" v-if="this.$route.meta.title!='首页'">
        <el-breadcrumb separator="">
          <el-breadcrumb-item v-for="(routes, index) in route" :key="routes.path" :to="{ path: routes.path }">
            <span v-if="routes.meta.title != '首页'"><span class="interval">{{ index > 1 ? '/' : '' }}</span><span>{{ routes.meta.title }}</span></span>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-breadcrumb>
          <el-breadcrumb-item v-for="route in route" :key="route.path" :to="{ path: route.path }"
            >{{ route.meta.title }}</el-breadcrumb-item
          >
        </el-breadcrumb> -->
      </div>
      <!-- 面包屑导航End -->
      <!-- 内容区 -->
      <div style="overflow: auto; height: calc(100vh - 122px)">
        <a-layout-content :style="{ margin: '15px 15px', minHeight: '280px' }">
          <slot ref="content"></slot>
        </a-layout-content>
      </div>
      <!-- 内容区End -->
    </a-layout>
  </a-layout>
</template>
<script>
import SideMenu from '@/components/menu/SideMenu'
import GlobalHeader from '@/components/page/GlobalHeader'
import GlobalFooter from '@/components/page/GlobalFooter'
// update-start---- author:os_chengtgen -- date:20190830 --  for:issues/463 -编译主题颜色已生效，但还一直转圈，显示主题 正在编译 ------
// import SettingDrawer from '@/components/setting/SettingDrawer'
// 注释这个因为在个人设置模块已经加载了SettingDrawer页面
// update-end ---- author:os_chengtgen -- date:20190830 --  for:issues/463 -编译主题颜色已生效，但还一直转圈，显示主题 正在编译 ------

import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'GlobalLayout',
  components: {
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    // update-start---- author:os_chengtgen -- date:20190830 --  for:issues/463 -编译主题颜色已生效，但还一直转圈，显示主题 正在编译 ------
    // // SettingDrawer
    // 注释这个因为在个人设置模块已经加载了SettingDrawer页面
    // update-end ---- author:os_chengtgen -- date:20190830 --  for:issues/463 -编译主题颜色已生效，但还一直转圈，显示主题 正在编译 ------
  },
  mixins: [mixin, mixinDevice],
  data() {
    return {
      hideroute:'',
      collapsed: false,
      routes: [],
      activeMenu: {},
      menus: [
        {
          meta: {
            internalOrExternal: false,
            keepAlive: false,
            title: '绩效管理',
            icon: 'line-chart',
          },
          name: 'PerformanceManage',
          path: '/performanceManage',
          redirect: null,
          route: '1',
          // children:[],
        },
        {
          meta: {
            internalOrExternal: false,
            keepAlive: false,
            title: '指标管理',
            icon: 'form',
          },
          name: 'TargetManage',
          path: '/targetManage',
          redirect: null,
          route: '2',
          // children:[],
        },
        {
          meta: {
            internalOrExternal: false,
            keepAlive: false,
            title: '指标开发',
            icon: 'bars',
          },
          name: 'TargetDev',
          path: '/targetDev',
          redirect: null,
          route: '3',
          // children:[],
        },
        {
          meta: {
            internalOrExternal: false,
            keepAlive: false,
            title: '任务运维',
            icon: 'check-circle',
          },
          name: 'OPS',
          path: '/OPS',
          redirect: null,
          route: '3',
          children: [
            {
              meta: {
                internalOrExternal: false,
                keepAlive: false,
                title: '运行作业',
              },
              name: 'Work',
              path: '/OPS/Work',
              redirect: null,
              route: '3.1',
            },
            {
              meta: {
                internalOrExternal: false,
                keepAlive: false,
                title: '运行实例',
              },
              name: 'Examples',
              path: '/OPS/Examples',
              redirect: null,
              route: '3.1',
            },
          ],
        },
        {
          meta: {
            internalOrExternal: false,
            keepAlive: false,
            title: '系统管理',
            icon: 'setting',
          },
          name: 'System',
          path: '/system',
          redirect: null,
          route: '4',
          children: [
            {
              meta: {
                internalOrExternal: false,
                keepAlive: false,
                title: '菜单管理',
              },
              name: 'PermissionList',
              path: '/system/menu',
              redirect: null,
              route: '4.1',
            },
            {
              meta: {
                internalOrExternal: false,
                keepAlive: false,
                title: '角色管理',
              },
              name: 'RoleUserList',
              path: '/system/role',
              redirect: null,
              route: '4.1',
            },
            {
              meta: {
                internalOrExternal: false,
                keepAlive: false,
                title: '定时任务',
              },
              name: 'QuartzJobList',
              path: '/system/QuartzJobList',
              redirect: null,
              route: '4.2',
            },
            {
              meta: {
                internalOrExternal: false,
                keepAlive: false,
                title: '用户管理',
              },
              name: 'User',
              path: '/system/User',
              redirect: null,
              route: '4.3',
            },
            {
              meta: {
                internalOrExternal: false,
                keepAlive: false,
                title: 'IDM用户管理',
              },
              name: 'IDMUser',
              path: '/system/IDMUser',
              redirect: null,
              route: '4.4',
            },
            {
              meta: {
                internalOrExternal: false,
                keepAlive: false,
                title: '部门管理',
              },
              name: 'Depart',
              path: '/system/Depart',
              redirect: null,
              route: '4.5',
            },
          ],
        },
      ],
    }
  },
  computed: {
    ...mapState({
      // 主路由
      mainRouters: (state) => state.permission.addRouters,
      // 后台菜单
      permissionMenuList: (state) => state.user.permissionList,
    }),
    route() {
      //由于后端传递'首页'标识，剔除第一个'首页'展示
      //this.$route.matched.shift()
      return this.$route.matched
    },
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val
    },
    $route:{
      handler: function(val, oldVal){
      this.hideroute = val.name
    },
    // 深度观察监听
    deep: true
    }
  },
  created() {
    // --update-begin----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
    // this.menus = this.mainRouters.find((item) => item.path === '/').children;
    // console.log(this.permissionMenuList)
    this.menus = this.permissionMenuList
   
    // 根据后台配置菜单，重新排序加载路由信息
    // --update-end----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
  },
  methods: {
    ...mapActions(['setSidebar']),
    handleRefresh(route){
      console.log(route)
      // window.location.href = data.path
    },
    toggle() {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    menuSelect() {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    //update-begin-author:taoyan date:20190430 for:动态路由title显示配置的菜单title而不是其对应路由的title
    myMenuSelect(value) {
      //此处触发动态路由被点击事件
      this.findMenuBykey(this.menus, value.key)
      this.$emit('dynamicRouterShow', value.key, this.activeMenu.meta.title)
      // update-begin-author:sunjianlei date:20191223 for: 修复刷新后菜单Tab名字显示异常
      let storeKey = 'route:title:' + this.activeMenu.path
      this.$ls.set(storeKey, this.activeMenu.meta.title)
      // update-end-author:sunjianlei date:20191223 for: 修复刷新后菜单Tab名字显示异常
    },
    findMenuBykey(menus, key) {
      for (let i of menus) {
        if (i.path == key) {
          this.activeMenu = { ...i }
        } else if (i.children && i.children.length > 0) {
          this.findMenuBykey(i.children, key)
        }
      }
    },
    //update-end-author:taoyan date:20190430 for:动态路由title显示配置的菜单title而不是其对应路由的title
  },
}
</script>
<style lang="less" scoped>
body {
  // 打开滚动条固定显示
  overflow-y: scroll;

  &.colorWeak {
    filter: invert(80%);
  }
}
.crumbs {
  background: white;
  padding: 11px 0;
  font-size: 14px !important;
  border-top: 2px solid #f1f3f4;
  .interval{
    margin-right: 15px;
  }
}
.layout {
  min-height: 100vh !important;
  overflow-x: hidden;
  .content-hight {
    // margin-top: 66px;
    height: calc(100vh - 66px);
    .sider {
      box-shadow: none;
    }
  }

  &.mobile {
    .ant-layout-content {
      .content {
        margin: 24px 0 0;
      }
    }

    /**
       * ant-table-wrapper
       * 覆盖的表格手机模式样式，如果想修改在手机上表格最低宽度，可以在这里改动
       */
    .ant-table-wrapper {
      .ant-table-content {
        overflow-y: auto;
      }
      .ant-table-body {
        min-width: 800px;
      }
    }
    .sidemenu {
      .ant-header-fixedHeader {
        &.ant-header-side-opened,
        &.ant-header-side-closed {
          width: 100%;
        }
      }
    }

    .topmenu {
      /* 必须为 topmenu  才能启用流式布局 */
      &.content-width-Fluid {
        .header-index-wide {
          margin-left: 0;
        }
      }
    }
    .header,
    .top-nav-header-index {
      .user-wrapper .action {
        padding: 0 12px;
      }
    }
  }

  &.ant-layout-has-sider {
    flex-direction: row;
  }

  .trigger {
    font-size: 22px;
    line-height: 42px;
    padding: 0 18px;
    cursor: pointer;
    transition: color 300ms, background 300ms;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .topmenu {
    .ant-header-fixedHeader {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: 100%;
      transition: width 0.2s;

      &.ant-header-side-opened {
        width: 100%;
      }

      &.ant-header-side-closed {
        width: 100%;
      }
    }
    /* 必须为 topmenu  才能启用流式布局 */
    &.content-width-Fluid {
      .header-index-wide {
        max-width: unset;
        margin-left: 24px;
      }

      .page-header-index-wide {
        max-width: unset;
      }
    }
  }

  .sidemenu {
    .ant-header-fixedHeader {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: 100%;
      transition: width 0.2s;

      &.ant-header-side-opened {
        width: calc(100% - 200px);
      }

      &.ant-header-side-closed {
        width: calc(100% - 80px);
      }
    }
  }

  .header {
    height: 64px;
    padding: 0 12px 0 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: relative;
  }

  .header,
  .top-nav-header-index {
    .user-wrapper {
      float: right;
      height: 100%;

      .action {
        cursor: pointer;
        padding: 0 14px;
        display: inline-block;
        transition: all 0.3s;

        height: 70%;
        line-height: 46px;

        &.action-full {
          height: 100%;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .avatar {
          margin: 20px 10px 20px 0;
          color: #1890ff;
          background: hsla(0, 0%, 100%, 0.85);
          vertical-align: middle;
        }

        .icon {
          font-size: 16px;
          padding: 4px;
        }

        .anticon {
          color: white;
        }
      }
    }

    &.dark {
      .user-wrapper {
        .action {
          color: black;

          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }

          .anticon {
            color: black;
          }
        }
      }
    }
  }

  &.mobile {
    .top-nav-header-index {
      .header-index-wide {
        .header-index-left {
          .trigger {
            color: rgba(255, 255, 255, 0.85);
            padding: 0 12px;
          }

          .logo.top-nav-header {
            text-align: center;
            width: 56px;
            line-height: 58px;
          }
        }
      }

      .user-wrapper .action .avatar {
        margin: 20px 0;
      }

      &.light {
        .header-index-wide {
          .header-index-left {
            .trigger {
              color: rgba(0, 0, 0, 0.65);
            }
          }
        }
        //
      }
    }
  }

  &.tablet {
    // overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
    .top-nav-header-index {
      .header-index-wide {
        .header-index-left {
          .logo > a {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .top-nav-header-index {
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: relative;
    transition: background 0.3s, width 0.2s;

    .header-index-wide {
      width: 100%;
      margin: auto;
      padding: 0 20px 0 0;
      display: flex;
      height: 59px;

      .ant-menu.ant-menu-horizontal {
        border: none;
        height: 64px;
        line-height: 64px;
      }

      .header-index-left {
        flex: 1 1;
        display: flex;

        .logo.top-nav-header {
          width: 165px;
          height: 64px;
          position: relative;
          line-height: 64px;
          transition: all 0.3s;
          overflow: hidden;

          img {
            display: inline-block;
            vertical-align: middle;
            height: 32px;
          }

          h1 {
            color: #fff;
            display: inline-block;
            vertical-align: top;
            font-size: 16px;
            margin: 0 0 0 12px;
            font-weight: 400;
          }
        }
      }

      .header-index-right {
        float: right;
        height: 59px;
        overflow: hidden;
        .action:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }

    &.light {
      background-color: #fff;

      .header-index-wide {
        .header-index-left {
          .logo {
            h1 {
              color: #002140;
            }
          }
        }
      }
    }

    &.dark {
      .user-wrapper {
        .action {
          color: white;

          &:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }
      }
      .header-index-wide .header-index-left .trigger:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  // 内容区
  .layout-content {
    margin: 24px 24px 0px;
    height: 64px;
    padding: 0 12px 0 0;
  }
}

.topmenu {
  .page-header-index-wide {
    margin: 0 auto;
    width: 100%;
  }
}

// drawer-sider 自定义
.ant-drawer.drawer-sider {
  .sider {
    box-shadow: none;
  }

  &.dark {
    .ant-drawer-content {
      background-color: rgb(0, 21, 41);
    }
  }
  &.light {
    box-shadow: none;
    .ant-drawer-content {
      background-color: #fff;
    }
  }

  .ant-drawer-body {
    padding: 0;
  }
}

// 菜单样式
.sider {
  box-shadow: 2px 116px 6px 0 rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;

  &.ant-fixed-sidemenu {
    position: fixed;
    height: 100%;
  }

  .logo {
    height: 64px;
    position: relative;
    line-height: 64px;
    padding-left: 10px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    background: #002140;
    overflow: hidden;

    img,
    h1 {
      display: inline-block;
      vertical-align: middle;
    }

    img {
      height: 28px;
    }

    h1 {
      color: #fff;
      font-size: 18px;
      margin: 0 0 0 8px;
      font-family: 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';
      font-weight: 600;
    }
  }

  &.light {
    background-color: #fff;
    box-shadow: 2px 116px 8px 0 rgba(29, 35, 41, 0.05);

    .logo {
      background: #fff;
      box-shadow: 1px 1px 0 0 #e8e8e8;

      h1 {
        color: unset;
      }
    }

    .ant-menu-light {
      border-right-color: transparent;
    }
  }
}

// 外置的样式控制
.user-dropdown-menu-wrapper.ant-dropdown-menu {
  padding: 4px 0;

  .ant-dropdown-menu-item {
    width: 160px;
  }

  .ant-dropdown-menu-item > .anticon:first-child,
  .ant-dropdown-menu-item > a > .anticon:first-child,
  .ant-dropdown-menu-submenu-title > .anticon:first-child .ant-dropdown-menu-submenu-title > a > .anticon:first-child {
    min-width: 12px;
    margin-right: 8px;
  }
}

// 数据列表 样式
.table-alert {
  margin-bottom: 16px;
}

.table-page-search-wrapper {
  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 24px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
}

.content {
  .table-operator {
    margin-bottom: 18px;

    button {
      margin-right: 8px;
    }
  }
}
</style>