import Vue from "vue";
import login from "./LoginDialog.vue"; // 引入弹窗组件
const LoginDialog = Vue.extend(login);

login.install = function(data) {
    let instance = new LoginDialog({
      data,
    }).$mount();
  
    document.body.appendChild(instance.$el);
  
    Vue.nextTick(() => {
      instance.open();
    });
  };
export default login; // 导出