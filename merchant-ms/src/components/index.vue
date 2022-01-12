<template>
    <el-container>
        <el-header>
            <span>向日葵点餐系统</span>
            <el-button type="warning" plain @click="handleback">退出登录</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-col :span="12" width="200px">
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                    >
                        <el-menu-item index="1" @click="tobaseInfo">
                            <i class="el-icon-menu"></i>
                            <span slot="title">基本信息</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="toindexImg">
                            <i class="el-icon-s-tools"></i>
                            <span slot="title">主页图片</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="togoodsInfo">
                            <i class="el-icon-s-goods"></i>
                            <span slot="title">菜品信息</span> </el-menu-item
                        ><el-menu-item index="4" @click="toaddGoods">
                            <i class="el-icon-plus"></i>
                            <span slot="title">添加菜品</span>
                        </el-menu-item>
                        <!-- <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>店铺管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1" @click="toindexImg">主页图片</el-menu-item>
                                <el-menu-item index="2-2" @click="togoodsInfo">菜品信息</el-menu-item>
                                <el-menu-item index="2-3" @click="toaddGoods">添加菜品</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu> -->
                        <el-menu-item index="5" @click="toorders">
                            <i class="el-icon-document"></i>
                            <span slot="title">订单管理</span>
                        </el-menu-item>
                        <el-menu-item index="6" @click="toreserve">
                            <i class="el-icon-document"></i>
                            <span slot="title">预定管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    methods: {
        //退出登陆
        handleback() {
            sessionStorage.setItem("token", "");
            this.$router.push("/login");
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        tobaseInfo() {
            this.$router.push("/index/baseInfo");
        },
        toindexImg() {
            this.$router.push("/index/indexImg");
        },
        togoodsInfo() {
            this.$router.push("/index/goodsList");
        },

        toorders() {
            this.$router.push("/index/orders");
        },

        toaddGoods() {
            this.$router.push("/index/addGoods");
        },
        toreserve() {
            this.$router.push("/index/reserve");
        },
    },
};
</script>

<style lang="less" scoped>
.el-container {
    .el-header {
        width: 100%;
        position: fixed;
        background-color: #545c64;
        color: rgb(255, 255, 255);
        font-size: 20px;
        font-weight: 400;
        text-align: center;
        line-height: 60px;
        z-index: 150;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px #ffd04b solid;
        z-index: 100;
        .el-button {
            background-color: rgba(255, 255, 255, 0);
        }
    }

    .el-aside {
        top: 60px;
        position: fixed;
        background-color: #545c64;
        color: #333;
        text-align: center;
        line-height: 200px;
        z-index: 103;
        height: 100%;
        height: calc(100vh - 60px);
        .el-col {
            width: 100%;
            float: none;
        }
    }

    .el-main {
        height: calc(100vh - 60px);
        width: calc(100vw - 200px);
        padding: 0;
        margin-top: 60px;
    }
    .title {
        width: 200px;
    }
}
</style>
