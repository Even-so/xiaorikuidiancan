<template>
    <div class="ordertable">
        <h1>菜品信息</h1>
        <el-table :data="tableData" style="width: 900px" max-height="" height="">
            <el-table-column label="图片" width="180">
                <template #default="scope">
                    <div class="block">
                        <el-avatar
                            shape="square"
                            :size="50"
                            :src="'http://119.23.63.87/phpsaomaserver/uploads/' + scope.row.menuImg"
                        ></el-avatar>
                    </div>
                    <!-- <image
                        :src="'http://localhost/phpsaomaserver' + scope.row.menuImg"
                        style="margin-left: 10px; width: 10%; height: 10%"
                    ></image> -->
                </template>
            </el-table-column>
            <el-table-column label="菜品名" width="180">
                <template #default="scope">
                    <span style="margin-left: 10px">{{ scope.row.dishName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="菜品分类" width="180">
                <template #default="scope">
                    <span style="margin-left: 10px">{{ scope.row.className }}</span>
                </template>
            </el-table-column>
            <el-table-column label="菜品价格" width="180">
                <template #default="scope">
                    <span style="margin-left: 10px">{{ scope.row.dishPrice }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
        };
    },
    methods: {
        handleEdit(index, row) {
            row = JSON.stringify(row);
            this.$router.push("/index/goodsInfo?row=" + row);
            console.log(row);
        },

        //删除一条数据
        handleDelete(index, row) {
            console.log(index);
            this.tableData.splice(index, 1);
            let data = new URLSearchParams();
            data.append("dishId", row.dishId);
            this.$http.post("/menuLsit.php?action=delete", data).then((res) => {
                console.log(res);
            });
        },
    },
    //页面渲染时完成
    created() {
        //获取菜品类名
        var merchantId = sessionStorage.getItem("token");
        let data = new URLSearchParams();
        data.append("merchantId", merchantId);
        this.$http.post("/menuLsit.php?action=read", data).then((res) => {
            this.tableData = res.data.menuLsit;
            console.log("这是tableData", this.tableData);
            console.log("这是res.data.menuLsit", res.data.menuLsit);
        });
    },
};
</script>

<style lang="less" scoped>
.ordertable {
    margin: 20px 20px 0 200px;
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
