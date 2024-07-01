import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { INDEX_MAIN_PAGE_PATH ,ACCESS_TOKEN, USER_NAME,USER_INFO,USER_AUTH,SYS_BUTTON_AUTH,UI_CACHE_DB_DICT_DATA,TENANT_ID} from '@/store/mutation-types'
import { generateIndexRouter,welcome } from "@/utils/util"
import { mapActions } from "vuex"
import { getAction } from '@/api/manage'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login','/echartsDemo','/BusinessManage','/CustomerService','/ProductionManage', '/user/register', '/user/register-result','/user/alteration'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  
  
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */

    if (to.path === '/user/login') {
      next({ path: INDEX_MAIN_PAGE_PATH })
      NProgress.done()
    } else {
      
      if (store.getters.permissionList.length === 0) {
        if(from.fullPath=='/user/login'){
          store.dispatch('GetPermissionList').then(res => {
            const menuData = res.result.menu;
      
            if (menuData === null || menuData === "" || menuData === undefined) {
              return;
            }
            let constRoutes = [];
            constRoutes = generateIndexRouter(menuData);
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
        return
        }
       
        getAction('/cas/client/validateLogin').then(response=>{
          if(response&&response.success){
            const result = response.result
            const userInfo = result.userInfo
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems, 7 * 24 * 60 * 60 * 1000)
            store.commit('SET_TOKEN', result.token)
            store.commit('SET_INFO', userInfo)
            store.commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname, welcome: welcome() })
            store.commit('SET_AVATAR', userInfo.avatar)
            store.dispatch('GetPermissionList').then(res => {
              const menuData = res.result.menu;
              if (menuData === null || menuData === "" || menuData === undefined) {
                return;
              }
              let constRoutes = [];
              constRoutes = generateIndexRouter(menuData);
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
          }else{
            store.dispatch('GetPermissionList').then(res => {
              const menuData = res.result.menu;
 
              if (menuData === null || menuData === "" || menuData === undefined) {
                return;
              }
              let constRoutes = [];
              constRoutes = generateIndexRouter(menuData);
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
           
          }
        }).catch(()=>{
          store.dispatch('GetPermissionList').then(res => {
            const menuData = res.result.menu;
            if (menuData === null || menuData === "" || menuData === undefined) {
              return;
            }
            let constRoutes = [];
            constRoutes = generateIndexRouter(menuData);
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
         
        })
        return
        store.dispatch('GetPermissionList').then(res => {
              const menuData = res.result.menu;
              if (menuData === null || menuData === "" || menuData === undefined) {
                return;
              }
              let constRoutes = [];
              constRoutes = generateIndexRouter(menuData);
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
        next()
      }
    }
  } else {
    
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      getAction('/cas/client/validateLogin').then(response=>{
        if(response&&response.success){
          const result = response.result
          const userInfo = result.userInfo
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems, 7 * 24 * 60 * 60 * 1000)
          store.commit('SET_TOKEN', result.token)
          store.commit('SET_INFO', userInfo)
          store.commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname, welcome: welcome() })
          store.commit('SET_AVATAR', userInfo.avatar)
          store.dispatch('GetPermissionList').then(res => {
            const menuData = res.result.menu;
            if (menuData === null || menuData === "" || menuData === undefined) {
              return;
            }
            let constRoutes = [];
            constRoutes = generateIndexRouter(menuData);
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
        }else{
          next({ path: '/user/login', query: { redirect: to.fullPath } })
          NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      
        }
      }).catch(()=>{
        next({ path: '/user/login', query: { redirect: to.fullPath } })
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    
      })
      
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
