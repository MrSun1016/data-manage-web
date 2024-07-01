import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router'
import store from './store/'
import loginOrder from './directives'
import login from "./components/LoginDialog.js"; // 登录弹窗全局组件
// import mock from './mock'

import { VueAxios } from "@/utils/request"

import Antd from 'ant-design-vue'
// import Viser from 'viser-vue'
import 'ant-design-vue/dist/antd.less'; // or 'ant-design-vue/dist/antd.less'

import '@/permission' // permission control
import '@/utils/filter' // base filter


// import Print from 'vue-print-nb-jeecg' //打印
/*import '@babel/polyfill'*/
// import preview from 'vue-photo-preview' //图片裁剪工具
// import 'vue-photo-preview/dist/skin.css'

// require('@jeecg/antd-online-mini')
// require('@jeecg/antd-online-mini/dist/OnlineForm.css')

// import 'lib-flexible'

// 自定义组件
// import AddOrModify from '@/components/AddOrModify'
// Vue.component('AddOrModify', AddOrModify)
// import ExcelLeadingin from '@/views/datefrom/components/ExcelLeadingin'
// Vue.component('ExcelLeadingin', ExcelLeadingin)



import {
    ACCESS_TOKEN,
    DEFAULT_COLOR,
    DEFAULT_THEME,
    DEFAULT_LAYOUT_MODE,
    DEFAULT_COLOR_WEAK,
    SIDEBAR_TYPE,
    DEFAULT_FIXED_HEADER,
    DEFAULT_FIXED_HEADER_HIDDEN,
    DEFAULT_FIXED_SIDEMENU,
    DEFAULT_CONTENT_WIDTH_TYPE,
    DEFAULT_MULTI_PAGE
} from "@/store/mutation-types"
import config from '@/defaultSettings'

import JDictSelectTag from './components/dict/index.js'
import hasPermission from '@/utils/hasPermission'
import vueBus from '@/utils/vueBus';
import JeecgComponents from '@/components/jeecg/index'
import '@/assets/less/JAreaLinkage.less'
import VueAreaLinkage from 'vue-area-linkage'
import "./assets/icfonts/iconfont.css";

// ElementUI 放置最前，Antd放置于后
// 引入elment ui
import ElementUI from 'element-ui'
// 修改 el-dialog 默认点击遮照为不关闭
ElementUI.Dialog.props.closeOnClickModal.default = false
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN.js' // lang i18n
import { MessageBox } from 'element-ui'
import * as echarts from 'echarts';

import tool from "./utils/tool";
Vue.use(tool);

Vue.prototype.$echarts = echarts;
Vue.use(ElementUI, { locale })
// import KFormDesign from './components/k-form-design/packages'
// // import './components/k-form-design/styles/form-design.less'
// Vue.use(KFormDesign)
Vue.prototype.$login = login.install
Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Storage, config.storageOptions)
Vue.use(Antd)
Vue.use(VueAxios, router)
// Vue.use(Viser)
Vue.use(hasPermission)
Vue.use(JDictSelectTag)
// Vue.use(Print)
// Vue.use(preview)
Vue.use(vueBus);
Vue.use(JeecgComponents);
Vue.use(VueAreaLinkage);
// import echarts from 'echarts'
Vue.prototype.reportedUrl = 'http://192.168.2.1:8086/dtwave-om/'
Vue.prototype.formatTime = function (da, type) {
    if (type == 'hms') {
        if (da != null) {
            var date = new Date(da)
            var Y = date.getFullYear() + '-'
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
            return Y + M + D
        }
    } else {
        if (da != null) {
            var date = new Date(da)
            var Y = date.getFullYear() + '-'
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
            var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
            return Y + M + D + h + m + s
        }
    }

}



Vue.prototype.formatNumber = function (value) {
    value = Number(value);
    return value.toLocaleString();
};
// Vue.prototype.$echarts = echarts
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
new Vue({
    router,
    store,
    loginOrder,
    mounted() {
        store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true))
        store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme))
        store.commit('TOGGLE_LAYOUT_MODE', Vue.ls.get(DEFAULT_LAYOUT_MODE, config.layout))
        store.commit('TOGGLE_FIXED_HEADER', Vue.ls.get(DEFAULT_FIXED_HEADER, config.fixedHeader))
        store.commit('TOGGLE_FIXED_SIDERBAR', Vue.ls.get(DEFAULT_FIXED_SIDEMENU, config.fixSiderbar))
        store.commit('TOGGLE_CONTENT_WIDTH', Vue.ls.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth))
        store.commit('TOGGLE_FIXED_HEADER_HIDDEN', Vue.ls.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader))
        store.commit('TOGGLE_WEAK', Vue.ls.get(DEFAULT_COLOR_WEAK, config.colorWeak))
        store.commit('TOGGLE_COLOR', Vue.ls.get(DEFAULT_COLOR, config.primaryColor))
        store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
        store.commit('SET_MULTI_PAGE', Vue.ls.get(DEFAULT_MULTI_PAGE, config.multipage))
    },
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this //安装 全局事件总线 this指向vue原型
    }
}).$mount('#app')