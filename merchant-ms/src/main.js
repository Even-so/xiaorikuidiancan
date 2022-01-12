import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

//引入axios
import axios from "axios";

//引入Jsonp，解决跨域
import { VueJsonp } from "vue-jsonp";
Vue.use(VueJsonp);

//配置全局根路径
axios.defaults.baseURL = "http://119.23.63.87/phpsaomaserver";
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
//将axios挂载到vue原型中
// axios.defaults.headers.common['Device'] = 111111;
// axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
