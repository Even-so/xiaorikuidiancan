import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/login.vue";
import register from "../components/register.vue";
import retrievePwd from "../components/retrievePwd.vue";
import index from "../components/index.vue";
import goodsInfo from "../components/goods/goodsInfo.vue";
import goodsList from "../components/goods/goodsList.vue";
import addGoods from "../components/goods/addGoods.vue";
import baseInfo from "../components/index/baseInfo.vue";
import indexImg from "../components/index/indexImg.vue";
import orders from "../components/orders/orders.vue";
import orderInfo from "../components/orders/orderInfo.vue";
// import print from "../components/orders/print.vue";

import reserve from "../components/reserve/reserve.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        component: login,
    },
    {
        path: "/register",
        component: register,
    },
    {
        path: "/retrievePwd",
        component: retrievePwd,
    },
    {
        path: "/index",
        component: index,
        redirect: "/index/baseInfo",
        meta: { requireAuth: true },
        children: [
            { path: "goodsInfo", component: goodsInfo, meta: { requireAuth: true } },
            { path: "goodsList", component: goodsList, meta: { requireAuth: true } },
            { path: "addGoods", component: addGoods, meta: { requireAuth: true } },
            { path: "baseInfo", component: baseInfo, meta: { requireAuth: true } },
            { path: "indexImg", component: indexImg, meta: { requireAuth: true } },
            { path: "orders", component: orders, meta: { requireAuth: true } },
            // { path: "print", component: print ,meta: { requireAuth: true },},
            { path: "orderInfo", component: orderInfo, meta: { requireAuth: true } },
            { path: "reserve", component: reserve, meta: { requireAuth: true } },
        ],
    },
    {
        // 重定向
        path: "/",
        redirect: "/login",
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
//登陆判断
router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    if (to.meta.requireAuth) {
        // 判断该路由是否需要登录权限
        if (JSON.parse(sessionStorage.getItem("token"))) {
            //判断本地是否存在access_token
            next();
        } else {
            next("/login");
            if (to.path === "/login") {
                next();
            }
        }
    } else {
        next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if (to.fullPath == "/login") {
        if (JSON.parse(sessionStorage.getItem("token"))) {
            next({
                path: from.fullPath,
            });
        } else {
            next();
        }
    }
});
// router.beforeEach((to, from, next) => {
//     if (
//         to.path != "/" ||
//         to.path != "/login" ||
//         to.path != "/retrievePwd" ||
//         to.path != "/register"
//     ) {
//         let token = sessionStorage.getItem("token");
//         console.log(token);
//         if (token === null || token === "") {
//             next("/login");
//             // console.log("非登录入口" + token);
//         } else {
//             // console.log("登录入口" + token);
//             next();
//         }
//     } else {
//         next();
//     }
//     next();
// });
export default router;
