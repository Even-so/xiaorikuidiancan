<template>
    <div class="main">
        <div class="content">
            <h1>修改菜品信息</h1>
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                size="40"
            >
                <el-form-item label="菜品名" prop="dishName" id="dishName">
                    <el-input v-model="ruleForm.dishName"></el-input>
                </el-form-item>
                <!-- <el-form-item label="价格" prop="dishPrice">
                    <el-input v-model="ruleForm.dishPrice"></el-input>
                </el-form-item> -->

                <el-form-item
                    label="价格"
                    prop="dishPrice"
                    :rules="[
                        { required: true, message: '价格不能为空' },
                        { type: 'number', message: '价格必须为数字值' },
                    ]"
                >
                    <el-input
                        type="age"
                        v-model.number="ruleForm.dishPrice"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="classId">
                    <el-select
                        v-model="getStatus"
                        placeholder="请选择"
                        clearable="turn"
                        @change="changeClass"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.getStatus"
                            :label="item.className"
                            :value="item.classId"
                            :file-list="fileList"
                        >
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="open" plain>添加类</el-button>
                </el-form-item>
                <el-form-item label="图片" prop="imageUrl">
                    <el-upload
                        :action="uploadURL"
                        list-type="picture"
                        :headers="headerObj"
                        :on-success="handleSuccess"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
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
        return {
            //分类的初始值
            getStatus: "",
            uploadURL: "http://119.23.63.87/phpsaomaserver/upload.php?action=update",
            // 图片上传组件的headers请求头对象
            headerObj: {
                Authorization: window.sessionStorage.getItem("token"),
            },
            fileList: [
                {
                    name: "",
                    url: "",
                },
            ],
            fileimg: "",
            previewPath: "",
            previewVisible: false,
            photo: "",
            files: {},
            photoObj: "",
            ruleForm: {
                pics: [],
                dishName: "",
                dishPrice: "",
                dishId: "",
                classId: "",
                className: "",
                type: [],
                resource: "",
                desc: "",
                imageUrl: "",
            },
            options: [],
            value: "",
            rules: {
                dishName: [
                    { required: true, message: "请输入菜品名称", trigger: "blur" },
                    {
                        min: 1,
                        max: 15,
                        message: "长度在 1 到 15 个字符",
                        trigger: "blur",
                    },
                ],
                dishPrice: [
                    { required: true, message: "请输入菜品金额", trigger: "blur" },
                    {
                        min: 1,
                        max: 25,
                        message: "长度在 1 到 25 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        // 监听图片上传成功的事件
        handleSuccess(response, file, fileList) {
            console.log(file.name);
            this.fileimg = file.name;
        },
        //类名发生变化时触发
        changeClass(val) {
            let proNum = this.options.findIndex((item, index) => {
                return item.classId == val;
            });
            this.ruleForm.classId = this.options[proNum].classId;
            this.ruleForm.className = this.options[proNum].className;
            console.log("选中的类名id:", val);
            console.log(val);
        },
        //确认
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //URLSearchParams对象
                    let Paramsdata = new URLSearchParams();
                    //修改需要传菜品id
                    Paramsdata.append("dishName", this.ruleForm.dishName);
                    Paramsdata.append("dishPrice", this.ruleForm.dishPrice);
                    Paramsdata.append("dishId", this.ruleForm.dishId);
                    Paramsdata.append("classId", this.ruleForm.classId);
                    Paramsdata.append("className", this.ruleForm.className);
                    if (this.fileimg != "") {
                        Paramsdata.append("imgname", this.fileimg);
                    } else {
                        Paramsdata.append("imgname", this.fileList[0].name);
                    }

                    console.log(Paramsdata);
                    let config = {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        methods: "post",
                    };
                    this.$http.post("/menuLsit.php?action=update", Paramsdata).then((res) => {
                        console.log("修改菜品", res);
                        this.$router.push("/index/goodsList");
                        this.$message({
                            message: "修改成功",
                            type: "success",
                        });
                    });
                } else {
                    return false;
                }
            });
        },
        //重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        uploadSectionFile(file) {
            const typeArr = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
            const isJPG = typeArr.indexOf(file.raw.type) !== -1;
            const isLt3M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$message.error("只能是图片!");
                this.$refs.upload.clearFiles();
                this.files = null;
                return;
            }
            if (!isLt3M) {
                this.$message.error("上传图片大小不能超过 5MB!");
                this.$refs.upload.clearFiles();
                this.files = null;
                return;
            }
            this.files = file.raw;
        },
        //添加类
        open() {
            this.$prompt("请输入分类名称", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /^[\u4E00-\u9FA5A-Za-z_]+$/,
                inputErrorMessage: "分类名格式不正确",
            })
                .then(({ value }) => {
                    this.$message({
                        type: "success",
                        message: value + "分类名设置成功 ",
                    });
                    let data = new URLSearchParams();
                    data.append("merchantId", sessionStorage.getItem("token"));
                    data.append("className", value);
                    this.$http.post("/classList.php?action=create", data).then((res) => {
                        console.log("类名添加成功", res);
                        this.$router.go(0);
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消输入",
                    });
                });
        },
    },
    //页面渲染时完成
    created() {
        let row = JSON.parse(this.$route.query.row);
        this.fileList[0].name = row.menuImg;
        this.fileList[0].url = row.menuImg;
        this.ruleForm.dishName = row.dishName;
        this.ruleForm.dishPrice = row.dishPrice;
        this.ruleForm.dishId = row.dishId;
        this.ruleForm.classId = row.classId;
        this.getStatus = row.className;
        this.ruleForm.className = row.className;
        //获取菜品类名
        var merchantId = sessionStorage.getItem("token");
        let data = new URLSearchParams();
        data.append("merchantId", merchantId);
        this.$http.post("/menuLsit.php?action=getClass", data).then((res) => {
            this.options = res.data.classList;
            console.log(this.options);
        });
    },
};
</script>

<style lang="less" scoped>
.main {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    .content {
        width: 600px;
        background-color: white;
        h1 {
            font-family: "STKaiti", Courier, monospace;
            text-align: center;
            margin-top: 40px;
            font-size: 30px;
            font-weight: 400;
        }
        .el-form {
            padding: 40px;
            .el-input__inner {
                width: 420px;
            }
            .el-select {
                margin-right: 20px;
            }

            .btn {
                text-align: center;
                margin-left: -100px;
            }
        }
    }
}
</style>
