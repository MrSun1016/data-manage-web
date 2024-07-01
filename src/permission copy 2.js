import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN,INDEX_MAIN_PAGE_PATH } from '@/store/mutation-types'
import { generateIndexRouter } from "@/utils/util"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [
  // '/system/IDMUser',
  // '/system/Depart',
  // '/system/User',
  // '/system/QuartzJobList',
  // '/performanceManage/edit',
  // '/performanceManage/details',
  // '/performanceManage/add',
  // '/performanceManage/quote',
  // '/isystem/dict',
  // '/system/menu',
  // '/system/role',
  '/user/login',
  '/user/login1',
  '/bigScreen',
  '/echartsDemo',
  '/BusinessManage',
  // 数据前台白名单
  '/login',
  '/openPlatform/home',
  '/share/informationsharing',
  '/service/serviceitem',
  '/catalogue/datacatalogue',
  '/catalogue/datacatalogue/details',
  '/InformationUsageData',
  '/system/policyrule',
  '/system/datastandard'

  // '/CustomerService',
  // '/ProductionManage',
  //  '/user/register',
  //  '/user/register-result',
  // '/user/alteration',
  // '/performanceManage',
  // '/targetDev',
  // '/targetManage',
  // '/OPS/Work',
  // '/OPS/Examples'
] // no redirect whitelist
let menuData = ""
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
 
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: INDEX_MAIN_PAGE_PATH })
      NProgress.done()
    } else {
      if (store.getters.permissionList.length === 0) {
        store.dispatch('GetPermissionList').then(res => {
              menuData = res.result.menu;
              //console.log(res.message)
              if (menuData === null || menuData === "" || menuData === undefined) {
                return;
              }
              let constRoutes = [];
              constRoutes = generateIndexRouter(menuData);
              // constRoutes = [constRoutes[0],
              // {
              //   path: '/', redirect: menuData[0] && menuData[0].path, hidden: true
              // }
              // ,constRoutes[1]]
              // 添加主界面路由
              store.dispatch('UpdateAppRouter',  { constRoutes }).then(() => {
                // 根据roles权限生成可访问的路由表
                // 动态添加可访问路由表
                router.addRoutes(store.getters.addRouters)
                const redirect = decodeURIComponent(from.query.redirect || to.path)
                if (to.path === redirect) {
                  // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                  next({ ...to, replace: true })
                } else {
                  // 跳转到目的路由
                  next({ path: redirect })
                }
              })
            })
          .catch(() => {
           /* notification.error({
              message: '系统提示',
              description: '请求用户信息失败，请重试！'
            })*/
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        // 匹配到/ 重定向到 路由第一个
        if(from.path &&to.path &&  from.path === "/" && to.path === "/404" && menuData && menuData.length >0){
          next({ path: menuData[0].path })
        }else{
          next()
        }
        //next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
