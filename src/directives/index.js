import Vue from "vue";
import { Message, MessageBox } from 'element-ui';
// import LoginDialog from "../components/LoginDialog.vue"; // 引入弹窗组件
/**
 * 前台按钮权限
 */
// 注册一个全局自定义指令 `v-login`
export default Vue.directive('login', {
    // 当被绑定的元素插入到 DOM 中时……
    bind: function (el) {
        // true能优先触发事件
        el.addEventListener('click', login, true)
    }
})
function login(e) {
    let token = localStorage.getItem('pro__Access-Token')
    if (!token) {
        Message({
            message: '您还未登录，请登录后重试',
            type: 'error'
        });
        // 用于取消所有后续事件捕获或事件冒泡，并阻止调用任何后续事件处理程序（DOM3 Events 中新增）
        e.stopImmediatePropagation()
    }
}