<template>
    <div class="main">
        <div class="content">
            <h1>基本信息</h1>
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                size="40"
            >
                <el-form-item label="门店名称" prop="name" id="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item class="address" label="营业地址" prop="adddess">
                    <el-input v-model="ruleForm.adddess" id="address"> </el-input>
                </el-form-item>
                <div class="sumbit">
                    <el-button @click="searchaddress">搜索</el-button>
                    <el-button @click="changeaddress">确认</el-button>
                </div>
                <div id="container">
                    <img src="../../assets/marker.png" id="marker" />
                </div>

                <el-form-item label="联系电话" prop="telNumber">
                    <el-input v-model="ruleForm.telNumber"></el-input>
                </el-form-item>
                <el-form-item label="打包费/元" prop="packingFee">
                    <el-input v-model="ruleForm.packingFee"></el-input>
                </el-form-item>
                <!-- <el-form-item
                    label="打包费/元"
                    prop="packingFee"
                    :rules="[
                        { required: true, message: '打包费不能为空' },
                        { type: 'number', message: '打包费必须为数字值' },
                    ]"
                >
                    <el-input
                        type="age"
                        v-model.number="ruleForm.packingFee"
                        autocomplete="off"
                    ></el-input>
                </el-form-item> -->
                <el-form-item label="营业时间" required>
                    <el-time-picker
                        is-range
                        arrow-control
                        v-model="datevalue"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                    >
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="营业状态" prop="delivery">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" :plain="true" @click="submitForm('ruleForm')"
                        >立即创建</el-button
                    >
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("打包费不能为空"));
            }
            setTimeout(() => {
                if (!Number.isInteger(value * 1)) {
                    callback(new Error("请输入数字值"));
                } else {
                    callback();
                }
            }, 100);
        };
        return {
            map: {},
            datevalue: [new Date(2016, 9, 10, 10, 40, 10), new Date(2016, 9, 10, 16, 40, 20)],
            ruleForm: {
                name: "",
                adddess: "",
                telNumber: "",
                packingFee: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
                businessStatus: "",
                Lat: "39.908802",
                Lng: "116.397502",
            },
            rules: {
                name: [
                    { required: true, message: "请输入门店名称", trigger: "blur" },
                    {
                        min: 3,
                        max: 15,
                        message: "长度在 3 到 15 个字符",
                        trigger: "blur",
                    },
                ],
                adddess: [
                    { required: true, message: "请输入门店地址", trigger: "blur" },
                    {
                        min: 3,
                        max: 25,
                        message: "长度在 3 到 25 个字符",
                        trigger: "blur",
                    },
                ],
                telNumber: [
                    { required: true, message: "请输入联系电话", trigger: "blur" },
                    {
                        min: 11,
                        max: 11,
                        message: "格式不符合",
                        trigger: "blur",
                    },
                ],
                // packingFee: [
                //     { required: true, message: "请输入打包费", trigger: "blur" },
                //     {
                //         min: 1,
                //         max: 5,
                //         message: "格式不符合",
                //         trigger: "blur",
                //     },
                // ],
                packingFee: [{ required: true, validator: checkAge, trigger: "blur" }],
                date1: [
                    {
                        type: "date",
                        required: true,
                        message: "请选择日期",
                        trigger: "change",
                    },
                ],
                date2: [
                    {
                        type: "date",
                        required: true,
                        message: "请选择时间",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    methods: {
        changeaddress() {
            var centerLatLng = this.map.getCenter();
            this.ruleForm.Lat = centerLatLng.getLat().toFixed(6);
            this.ruleForm.Lng = centerLatLng.getLng().toFixed(6);
        },

        //地址搜索
        async searchaddress() {
            const { data: res } = await this.$jsonp(
                "https://apis.map.qq.com/ws/geocoder/v1/?address=",
                {
                    key: "LV3BZ-WAHCF-E57JG-NOOUT-CTG32-UVBXJ",
                    address: this.ruleForm.adddess,
                    output: "jsonp",
                }
            )
                .then((res) => {
                    this.ruleForm.Lat = res.result.location.lat;
                    this.ruleForm.Lng = res.result.location.lng;
                    this.map.setCenter(
                        new TMap.LatLng(res.result.location.lat, res.result.location.lng)
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async changebase(data) {
            const { data: res } = await this.$http
                .post("/merchant.php?action=changebase", data)
                .then((res) => {
                    console.log(res);
                });
        },
        //修改数据
        async submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var s = this.datevalue[0];
                    var s = s.getHours() * 60 * 60 + s.getMinutes() * 60 + s.getSeconds();
                    this.ruleForm.date1 = s;
                    var d = this.datevalue[1];
                    var d = d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
                    this.ruleForm.date2 = d;
                    console.log(this.ruleForm.delivery);
                    if (this.ruleForm.delivery) {
                        this.ruleForm.businessStatus = 1;
                    } else {
                        this.ruleForm.businessStatus = 0;
                    }
                    var merchantId = sessionStorage.getItem("token");
                    let data = new URLSearchParams();
                    data.append("merchantId", merchantId);
                    data.append("merchantName", this.ruleForm.name);
                    data.append("adddess", this.ruleForm.adddess);
                    data.append("Telephone", this.ruleForm.telNumber);
                    data.append("packingFee", this.ruleForm.packingFee);
                    data.append("dateB", this.ruleForm.date1);
                    data.append("dateE", this.ruleForm.date2);
                    data.append("Lat", this.ruleForm.Lat);
                    data.append("Lng", this.ruleForm.Lng);
                    data.append("businessStatus", this.ruleForm.businessStatus);
                    this.changebase(data); //发送请求
                    // this.resetForm(formName);
                    this.$message({
                        message: "修改成功",
                        type: "success",
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },

    //页面渲染时完成
    async created() {
        var merchantId = sessionStorage.getItem("token");
        let data = new URLSearchParams();
        data.append("merchantId", merchantId);
        const { data: res } = await this.$http.post("/merchant.php?action=getInfo", data);
        let detailArr = res.merchant[0];
        console.log(detailArr);
        console.log(this.ruleForm);
        this.ruleForm.name = detailArr.merchantName;
        this.ruleForm.adddess = detailArr.adddess;
        this.ruleForm.telNumber = detailArr.telNumber;
        this.ruleForm.packingFee = detailArr.packingFee * 1;
        this.ruleForm.date1 = detailArr.dateB;
        this.ruleForm.date2 = detailArr.dateE;
        this.ruleForm.Lat = detailArr.Lat;
        this.ruleForm.Lng = detailArr.Lng;
        this.ruleForm.businessStatus = detailArr.businessStatus;

        //显示营业时间
        var num1 = Number(this.ruleForm.date1);
        var num2 = Number(this.ruleForm.date2);
        this.datevalue[0].setHours((num1 / 60 / 60) % 60);
        this.datevalue[0].setMinutes((num1 / 60) % 60);
        this.datevalue[0].setSeconds(num1 % 60);
        this.datevalue[1].setHours((num2 / 60 / 60) % 60);
        this.datevalue[1].setMinutes((num2 / 60) % 60);
        this.datevalue[1].setSeconds(num2 % 60);
        var arrayObj = new Array();
        arrayObj.push(this.datevalue[0], this.datevalue[1]);
        this.$set(this, "datevalue", arrayObj);

        //这是营业状态
        if (detailArr.businessStatus == 0) {
            this.ruleForm.delivery = false;
        } else {
            this.ruleForm.delivery = true;
        }

        //地图设置
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://map.qq.com/api/gljs?v=1.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&callback=init";
        document.body.appendChild(script);
        //定义地图中心点坐标;初始位置
        if (detailArr.Lat == null) {
            detailArr.Lat = "39.908802";
            detailArr.Lng = "116.397502";
        }
        var center = new TMap.LatLng(detailArr.Lat, detailArr.Lng);
        // var center = new TMap.LatLng(39.984104, 116.307503);
        //定义map变量，调用 TMap.Map() 构造函数创建地图
        var map = new TMap.Map(document.getElementById("container"), {
            center: center, //设置地图中心点坐标
            zoom: 15, //设置地图缩放级别
            pitch: 43.5, //设置俯仰角
            rotation: 45, //设置地图旋转角度
            viewMode: "2D",
        });
        this.map = map;
    },
    mounted() {},
};
</script>

<style lang="less" scoped>
.main {
    margin-top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    .content {
        width: 600px;
        background-color: white;
        // box-shadow: 0px 0px 5px rgba(100, 100, 100, 0.5);
        h1 {
            font-family: "STKaiti", Courier, monospace;
            text-align: center;
            margin-top: 100px;
            font-size: 30px;
            font-weight: 400;
        }
        .el-form {
            padding: 0px;
            .sumbit {
                margin-bottom: 5px;
                margin-top: -15px;
                display: flex;
                justify-content: flex-end;
            }
            .el-input__inner {
                width: 420px;
            }

            #container {
                margin-left: 100px;
                position: relative;
                margin-bottom: 20px;
                z-index: 1;
                #marker {
                    position: absolute;
                    left: 50%;
                    top: 48%;
                    width: 20px;
                    height: 20px;
                }
            }

            .btn {
                text-align: center;
                margin-left: -100px;
            }
        }
    }
}
</style>
