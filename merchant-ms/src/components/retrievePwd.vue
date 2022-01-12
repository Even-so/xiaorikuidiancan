<template>
    <div class="login">
        <div class="title">
            <span>向日葵点餐系统</span>
        </div>
        <div class="form">
            <h3 class="login-title">找回密码</h3>
            <div class="zhanghao">
                <input
                    id="zhanghao"
                    type="text"
                    v-model.trim="zhanghao"
                    placeholder="请输入手机号"
                />
            </div>
            <div class="password">
                <input id="password" type="text" v-model.trim="code" placeholder="请输入验证码" />
                <router-link class="getCode" to="/getCode">获取验证码</router-link>
            </div>
            <div class="password">
                <input
                    id="password"
                    type="password"
                    v-model.trim="password1"
                    placeholder="请输入密码"
                />
            </div>
            <div class="password">
                <input
                    id="password"
                    type="password"
                    v-model.trim="password2"
                    placeholder="请再次输入密码"
                />
            </div>
            <div class="button">
                <el-button type="button" class="submit" :plain="true" @click="submit"
                    >确认修改</el-button
                >
            </div>
            <div class="other">
                <router-link class="register" id="login" to="/login">返回登陆</router-link>
                <router-link class="register" to="/register">还没有账号？注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            zhanghao: "",
            code: "",
            password1: "",
            password2: "",
            error: "",
        };
    },
    methods: {
        //格式验证
        async submit() {
            if (this.zhanghao.length != 11) {
                this.error = "账号格式不正确";
                this.$message({
                    message: this.error,
                    center: true,
                });
            } else {
                if (this.code.length != 4) {
                    this.error = "验证码不正确";
                    this.$message({
                        message: this.error,
                        center: true,
                    });
                } else {
                    if (
                        this.password2.length == 0 ||
                        this.password1.length == 0 ||
                        this.password2.length < 6 ||
                        this.password1.length < 6
                    ) {
                        this.error = "密码格式不正确";
                        this.$message({
                            message: this.error,
                            center: true,
                        });
                    } else {
                        if (this.password1 != this.password2) {
                            this.error = "两次密码不一致";
                            this.$message({
                                message: this.error,
                                center: true,
                            });
                        } else {
                            //发送请求
                            let data = new URLSearchParams();
                            data.append("telNumber", this.zhanghao);
                            data.append("merchantPwd", this.password1);
                            const { data: res } = await this.$http.post(
                                "/merchant.php?action=changePwd",
                                data
                            );
                            if (res.code == 200) {
                                sessionStorage.setItem("token", res.token);
                                this.error = "修改成功";
                                this.$message({
                                    message: this.error,
                                    center: true,
                                    type: "success",
                                });
                                this.$router.push("/login");
                                console.log(res.token);
                            } else {
                                if (res.code == 406) {
                                    sessionStorage.setItem("token", "");
                                    this.error = "号码未注册";
                                    this.$message({
                                        message: this.error,
                                        center: true,
                                    });
                                } else {
                                    sessionStorage.setItem("token", "");
                                    this.error = "修改失败";
                                    this.$message({
                                        message: this.error,
                                        center: true,
                                    });
                                }
                            }
                        }
                    }
                }
            }
        },
    },
};
</script>

<style lang="less" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background-image: url(../assets/index3.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    background-clip: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .title {
        position: absolute;
        top: 20px;
        left: 0px;
        span {
            color: white;
            padding: 20px;
            font-size: 30px;
            font-weight: 400;
        }
    }
    .form {
        width: 550px;
        height: 620px;
        background-color: rgba(255, 255, 255, 0.856);
        box-shadow: 0px 0px 20px rgba(100, 100, 100, 0.5);
        padding: 50px 56px 60px;
        box-sizing: border-box;
        border-radius: 6px;

        .login-title {
            font-weight: 500;
            font-size: 26px;
            color: #323233;
            cursor: default;
        }
        .zhanghao {
            width: 438px;
            height: 48px;
            margin-bottom: 30px;
            border-bottom: 2px solid #bb8888;
            #zhanghao {
                padding: 10px 10px 0px 10px;
                background: none;
                outline: none;
                border: none;
                font-size: 16px;
                :focus {
                    border: none;
                }
            }
            input::-moz-placeholder {
                color: #989999;
                font-size: 16px;
            }
        }
        .password {
            width: 438px;
            height: 48px;
            margin-bottom: 30px;
            border-bottom: 2px solid #bb8888;
            position: relative;
            #password {
                padding: 10px;
                background: none;
                outline: none;
                border: none;
                font-size: 16px;
                :focus {
                    border: none;
                }
            }
            input::-moz-placeholder {
                color: #989999;
                font-size: 16px;
            }
            a {
                text-decoration: none;
                color: #a67c51;
                position: absolute;
                right: 18px;
                top: 50%;
                transform: translateY(-50%);
                width: 84px;
                font-size: 16px;
                height: 14px;
                line-height: 14px;
                border-left: 1px solid #bb8888;
                padding-left: 18px;
                box-sizing: border-box;
                white-space: nowrap;
                cursor: pointer;
            }
            /*正常的未被访问过的链接*/
            a:link {
                text-decoration: none;
            }
            /*已经访问过的链接*/
            a:visited {
                text-decoration: none;
            }
            /*鼠标划过(停留)的链接*/
            a:hover {
                text-decoration: none;
            }
            /* 正在点击的链接*/
            a:active {
                text-decoration: none;
            }
        }
        .submit {
            margin-top: 50px;
            width: 438px;
            height: 48px;
            border-style: none;
            cursor: unset !important;
            pointer-events: unset;
            border-color: #ebedf0;
            background-color: #bb8888;
            border-radius: 20px;
            font-size: 18px;
            font-weight: 300;
            color: white;
        }
        button:hover {
            background-color: none;
        }
        .other {
            width: 438px;
            height: 48px;
            position: relative;
            #login {
                position: absolute;
                left: -15px;
            }
            a {
                text-align: right;
                text-decoration: none;
                color: #a67c51;
                position: absolute;
                right: 60px;
                top: 50%;
                transform: translateY(50%);
                width: 84px;
                font-size: 16px;
                height: 14px;
                line-height: 14px;
                padding-left: 18px;
                box-sizing: border-box;
                white-space: nowrap;
                cursor: pointer;
            }
            /*正常的未被访问过的链接*/
            a:link {
                text-decoration: none;
            }
            /*已经访问过的链接*/
            a:visited {
                text-decoration: none;
            }
            /*鼠标划过(停留)的链接*/
            a:hover {
                text-decoration: none;
            }
            /* 正在点击的链接*/
            a:active {
                text-decoration: none;
            }
        }
    }
    .info {
        font-family: "FangSong", Courier, monospace;
        margin-left: 20px;
        position: relative;
        width: 382px;
        height: 520px;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 0.856);
        box-shadow: 0px 0px 20px rgba(100, 100, 100, 0.5);
        .title {
            width: 382px;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
            span {
                padding: 20px;
                font-size: 30px;
                font-weight: 400;
                border-bottom: 2px solid #bb8888;
            }
        }
        .infotoken {
            font-size: 20px;
            font-weight: 400;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-top: 100px;
            background-image: url(../assets/logo.png);
            background-repeat: no-repeat;
            background-position: 130% 100%;
            background-size: 40% auto;
        }
        .infotoken > span {
            margin-bottom: 20px;
        }
    }
}
</style>
