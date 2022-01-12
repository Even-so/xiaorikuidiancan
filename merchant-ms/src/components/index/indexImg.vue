<template>
    <div class="main">
        <div class="content">
            <h1>图片设置</h1>
            <div class="imgcontent">
                <div class="img touxiang">
                    <label for="">头像上传</label>
                    <div>
                        <!-- <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload> -->
                        <el-upload
                            :action="uploadURL"
                            list-type="picture"
                            :headers="headerObj"
                            :on-success="handleSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="img lunbotu1">
                    <label for="">轮播图1</label>
                    <div>
                        <!-- <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
                        <el-upload
                            :action="uploadURL"
                            list-type="picture"
                            :headers="headerObj"
                            :on-success="handleSuccess1"
                            :before-upload="beforeAvatarUpload"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="img lunbotu2">
                    <label for="">轮播图2</label>
                    <div>
                        <!-- <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload> -->
                        <el-upload
                            :action="uploadURL"
                            list-type="picture"
                            :headers="headerObj"
                            :on-success="handleSuccess2"
                            :before-upload="beforeAvatarUpload"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="img lunbotu3">
                    <label for="">轮播图3</label>
                    <div>
                        <!-- <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="imageUrl3" :src="imageUrl3" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload> -->
                        <el-upload
                            :action="uploadURL"
                            list-type="picture"
                            :headers="headerObj"
                            :on-success="handleSuccess3"
                            :before-upload="beforeAvatarUpload"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //图片请求地址
            uploadURL: "http://119.23.63.87/phpsaomaserver/upload.php?action=update",
            headerObj: {
                Authorization: window.sessionStorage.getItem("token"),
            },
            imageUrl: "",
            imageUrl1: "",
            imageUrl2: "",
            imageUrl3: "",
        };
    },
    methods: {
        //上传图片后执行
        handleSuccess(response, file, fileList) {
            this.imageUrl = file.name;
            var merchantId = sessionStorage.getItem("token");
            let data = new URLSearchParams();
            data.append("imgname", this.imageUrl);
            data.append("merchantId", merchantId);
            this.$http.post("/merchant.php?action=changeindexImage", data).then((res) => {});
        },
        handleSuccess1(response, file, fileList) {
            this.imageUrl1 = file.name;
            var merchantId = sessionStorage.getItem("token");
            let data = new URLSearchParams();
            data.append("imgname", this.imageUrl1);
            data.append("merchantId", merchantId);
            this.$http.post("/merchant.php?action=changeswiperImage1", data).then((res) => {});
        },
        handleSuccess2(response, file, fileList) {
            this.imageUrl2 = file.name;
            var merchantId = sessionStorage.getItem("token");
            let data = new URLSearchParams();
            data.append("imgname", this.imageUrl2);
            data.append("merchantId", merchantId);
            this.$http.post("/merchant.php?action=changeswiperImage2", data).then((res) => {});
        },
        handleSuccess3(response, file, fileList) {
            this.imageUrl3 = file.name;
            var merchantId = sessionStorage.getItem("token");
            let data = new URLSearchParams();
            data.append("imgname", this.imageUrl3);
            data.append("merchantId", merchantId);
            this.$http.post("/merchant.php?action=changeswiperImage3", data).then((res) => {});
        },
        //图片上传限制jpeg和5m
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 5MB!");
            }
            return isJPG && isLt2M;
        },
    },
};
</script>

<style lang="less">
.main {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    .content {
        h1 {
            font-family: "STKaiti", Courier, monospace;
            text-align: center;
            margin-top: 50px;
            margin-bottom: 50px;

            font-size: 30px;
            font-weight: 400;
        }
        .imgcontent {
            display: flex;
            width: 100%;
            margin-left: 60px;
            .img {
                flex: 1;
                width: 330px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .el-upload {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 20px;
                }
                label {
                    margin-bottom: 20px;
                }
            }
            .lunbotu {
                display: flex;
            }
        }
        .avatar-uploader .el-upload {
            margin: 20px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409eff;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
}
</style>
