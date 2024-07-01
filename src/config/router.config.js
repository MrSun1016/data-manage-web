import { UserLayout, TabLayout, RouteView, BlankLayout, PageView, OpenPlatformLayout, PlatformServerLayout } from '@/components/layouts'

/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */
export const asyncRouterMap = [

  // {
  //   path: '/',
  //   name: 'dashboard',
  //   component: TabLayout,
  //   meta: { title: '首页' },
  //   redirect: '/performanceManage',
  //   children: [

  //   ]
  // },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  // 登录直接跳转首页
  // {
  //   path: '/',
  //   name: 'Dashboard',
  //   component: TabLayout,
  //   meta: { title: '首页' },
  //   redirect: '/dashboard/analysis',
  //   children: [
  //   ]
  // },
  {
    path: '/',
    name: 'Dashboard',
    component: TabLayout,
    meta: { title: '首页' },
    redirect: '/openPlatform/Home',
    children: [
    ]
  },
  // {
  //   path: '/',
  //   name: 'Dashboard',
  //   component: TabLayout,
  //   meta: { title: '首页' },
  //   redirect: '/openPlatform/home',
  //   children: [
  //   ]
  // },
  {
    path: '/bigScreen',
    name: 'bigScreen',
    component: () => import(/* webpackChunkName: "user" */ '@/views/bigScreen/prameterKey')
    // component: () => import(/* webpackChunkName: "user" */ '@/views/formManagement/DesignFormList')
  },
  // {
  //   path: '/datefrom',
  //   name: 'Datefrom',
  //   component: () => import('@/views/datefrom'),
  //   meta: { title: '数据编目111'}
  // },
  {
    path: '/user',
    component: UserLayout,
    // redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login1')
        // component: () => import(/* webpackChunkName: "user" */ '@/views/formManagement/DesignFormList')
      },
      {
        path: 'login1',
        name: 'login1',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login1')
        // component: () => import(/* webpackChunkName: "user" */ '@/views/formManagement/DesignFormList')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'alteration',
        name: 'alteration',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Alteration')
      },
    ]
  },


  //数据开放平台
  //PlatformLayout
  {
    path: '/escsso',
    name: 'escSso',
    meta: { title: 'sso登录' },
    component: () => import('@/views/user/EscSso'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('@/views/user/OpenPlatformLogin'),
  },
  {
    path: '/openPlatform/home',
    name: 'openPlatformHome',
    meta: { title: '前台首页', keepAlive: true },
    component: () => import('@/views/openPlatform/Home'),
  },
  {
    path: '/openPlatform/home2',
    name: 'openPlatformHome2',
    meta: { title: '前台首页', keepAlive: true },
    component: () => import('@/views/openPlatform/Home2'),
  },
  {
    path: '/openPlatform/search',
    name: 'openPlatformSearch',
    meta: { title: '搜索', keepAlive: true },
    component: () => import('@/views/openPlatform/HomeSearch'),
  },
  {
    path: '/system/policyrule',
    name: 'policyrule',
    meta: { title: '政策法规', keepAlive: false },
    component: () => import('@/views/system/PolicyRule'),
  },
  {
    path: '/system/datastandard',
    name: 'datastandard',
    meta: { title: '数据规范', keepAlive: false },
    component: () => import('@/views/system/DataStandard'),
  },
  {
    path: '/system/helpdocument',
    name: 'helpdocument',
    meta: { title: '前台帮助文档', keepAlive: false },
    component: () => import('@/views/system/HelpDocument'),
  },
  {
    path: '/system/FunctionNavigation',
    name: 'functionNavigation',
    meta: { title: '功能导航', keepAlive: false },
    component: () => import('@/views/system/FunctionNavigation'),
  },
  {
    path: '/system/systemNavigation',
    name: 'systemNavigation',
    meta: { title: '功能导航2.0', keepAlive: false },
    component: () => import('@/views/system/systemNavigation'),
  },
  {
    path: '/system/NewNavigation',
    name: 'newNavigation',
    meta: { title: '系统导航', keepAlive: false },
    component: () => import('@/views/system/NewNavigation'),
  },
  {
    path: '/system/NewNavigation2',
    name: 'newNavigation2',
    meta: { title: '系统导航', keepAlive: false },
    component: () => import('@/views/system/NewNavigation2'),
  },
  {
    path: '/system/EmbedPage',
    name: 'embedPage',
    meta: { title: '嵌入页面', keepAlive: false },
    component: () => import('@/views/system/EmbedPage'),
  },
  {
    path: '/d',
    name: 'catalogue',
    component: OpenPlatformLayout,
    redirect: '/catalogue/datacatalogue',
    children: [
      {
        path: '/catalogue/datacatalogue',
        name: 'catalogue/datacatalogue',
        meta: { title: '数据目录', keepAlive: true },
        component: () => import('@/views/catalogue/DataCatalogue'),
      },
    ]
  },
  {
    path: '/catalogue/datacatalogue/details',
    name: 'DataCatalogueDetails',
    meta: { title: '数据项详情', keepAlive: false },
    component: () => import('@/views/catalogue/DataCatalogueDetails')
  },
  {
    path: '/s',
    name: 'Service',
    component: PlatformServerLayout,
    redirect: '/service/serviceitem',
    children: [
      {
        path: '/service/serviceitem',
        name: 'ServiceItem',
        meta: { title: '事项主线目录', keepAlive: true },
        component: () => import('@/views/service/ServiceItem'),
      },
    ],
  },

  // {
  //   path: '/share/informationsharing',
  //   name: 'InformationSharing',
  //   meta: { title: '数据共享', keepAlive: false },
  //   component: () => import('@/views/share/InformationSharing'),
  // },
  // {
  //   path: '/InformationUsageData',
  //   name: 'InformationUsageData',
  //   meta: { title: '使用数据', keepAlive: true },
  //   component: () => import('@/views/share/components/InformationUsageData'),
  // },
  {
    path: '/systemmaintenance',
    name: 'maintenance',
    meta: { title: '系统维护', keepAlive: true },
    component: () => import('@/views/system/Maintenance'),
  },
  // {
  //   path: '/page',
  //   component: TabLayout,
  //   children: [
  //     {
  //       path: '/performanceManage',
  //       component: () => import('@/views/performanceManage/index'),
  //       name: 'PerformanceManage',
  //       meta: { title: '绩效管理'}
  //     },
  //     {
  //       path: '/performanceManage/quote',
  //       component: () => import('@/views/performanceManage/quotePage'),
  //       name: 'PerformanceManageQuote',
  //       meta: { title: '引用模板'}
  //     },{
  //       path: '/performanceManage/add',
  //       component: () => import('@/views/performanceManage/addPage'),
  //       name: 'PerformanceManageAdd',
  //       meta: { title: '新建模板'}
  //     },
  //     {
  //       path: '/performanceManage/edit',
  //       component: () => import('@/views/performanceManage/addPage'),
  //       name: 'PerformanceManageEdit',
  //       meta: { title: '编辑模板'}
  //     },
  //     {
  //       path: '/performanceManage/details',
  //       component: () => import('@/views/performanceManage/modelDetails'),
  //       name: 'PerformanceManageDetails',
  //       meta: { title: '查看模板'}
  //     },
  //     {
  //       path: '/targetDev',
  //       component: () => import('@/views/targetDev/index'),
  //       name: 'TargetDev',
  //       meta: { title: '指标开发'}
  //     },{
  //       path: '/targetManage',
  //       component: () => import('@/views/targetManage/index'),
  //       name: 'TargetManage',
  //       meta: { title: '指标管理'}
  //     },{
  //       path:'/targetManage/addTarget',
  //       component: () => import('@/views/targetManage/components/addTarget'),
  //       name: 'AddTarget',
  //       meta: { title: '新建指标'}
  //     }
  //   ]
  // },
  // {
  //   path: '/OPS',
  //   component: TabLayout,
  //   children:[
  //     {
  //       path: '/OPS/Work',
  //       component: () => import('@/views/OPS/Work'),
  //       name: 'Work',
  //       meta: { title: '任务作业'}
  //     },{
  //       path: '/OPS/Examples',
  //       component: () => import('@/views/OPS/Examples'),
  //       name: 'Examples',
  //       meta: { title: '任务实例'}
  //     },
  //   ]
  // },
  // {
  //   path: '/system',
  //   component: TabLayout,
  //   children:[
  //     {
  //       path: '/system/menu',
  //       component: () => import('@/views/system/PermissionList'),
  //       name: 'PermissionList',
  //       meta: { title: '菜单管理'}
  //     },{
  //       path: '/system/role',
  //       component: () => import('@/views/system/RoleUserList'),
  //       name: 'RoleUserList',
  //       meta: { title: '角色管理'}
  //     },{
  //       path: '/system/dict',
  //       component: () => import('@/views/system/DictList'),
  //       name: 'Dict',
  //       meta: { title: '数据字典'}
  //     },{
  //       path: '/system/QuartzJobList',
  //       component: () => import('@/views/system/QuartzJobList'),
  //       name: 'QuartzJobList',
  //       meta: { title: '定时任务'}
  //     },{
  //       path: '/system/User',
  //       component: () => import('@/views/system/UserList'),
  //       name: 'User',
  //       meta: { title: '用户管理'}
  //     },{
  //       path: '/system/IDMUser',
  //       component: () => import('@/views/system/IDMUserList'),
  //       name: 'IDMUser',
  //       meta: { title: 'IDM用户管理'}
  //     },{
  //       path: '/system/Depart',
  //       component: () => import('@/views/system/DepartList'),
  //       name: 'Depart',
  //       meta: { title: '部门管理'}
  //     }
  //     // ,{
  //     //   path: '/system/menu',
  //     //   component: () => import('@/views/system/PermissionList'),
  //     //   name: 'PermissionList',
  //     //   meta: { title: '菜单管理'}
  //     // },{
  //     //   path: '/system/menu',
  //     //   component: () => import('@/views/system/PermissionList'),
  //     //   name: 'PermissionList',
  //     //   meta: { title: '菜单管理'}
  //     // },
  //   ]
  // },

  // {
  //   path: '/',
  //   name: 'index',
  //   component: TabLayout,
  //   meta: {title: '首页'},
  //   redirect: '/dashboard/workplace',
  //   children: [
  //     {
  //       path: '/online',
  //       name: 'online',
  //       redirect: '/online',
  //       component: RouteView,
  //       meta: {title: '在线开发', icon: 'dashboard', permission: ['dashboard']},
  //       children: [
  //         {
  //           path: '/online/auto/:code',
  //           name: 'report',
  //           component: () => import('@/views/modules/online/cgreport/OnlCgreportAutoList')
  //         },
  //       ]
  //     },
  //   ]
  // },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403')
  },
]
