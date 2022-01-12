<template>
    <div class="ordertable">
        <h1>预定管理</h1>
        <el-table :data="reserveList" style="width: 900px">
            <el-table-column label="用户" width="180">
                <template #default="scope">
                    <span style="margin-left: 10px">{{ scope.row.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="时间" width="180">
                <template #default="scope">
                    <span style="margin-left: 10px">{{ scope.row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="人数" width="180">
                <template #default="scope">
                    <span style="margin-left: 10px">{{ scope.row.peopleNum }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{
                        scope.row.status == 2 ? "已同意" : "同意"
                    }}</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >{{ scope.row.errstatus == 3 ? "已退订" : "退订" }}</el-button
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
            reserveList: [],
        };
    },
    methods: {
        //同意预定
        handleEdit(index, row) {
            let data = new URLSearchParams();
            data.append("id", row.id);
            data.append("merchantStatus", 2);
            this.$http.post("/reserve.php?action=agree", data).then((res) => {
                console.log(res);
            });
            this.reserveList[index].status = 2;
        },
        //退订预定
        handleDelete(index, row) {
            let data = new URLSearchParams();
            data.append("id", row.id);
            data.append("merchantStatus", 3);
            this.$http.post("/reserve.php?action=agree", data).then((res) => {
                console.log(res);
            });
            this.reserveList[index].errstatus = 3;
        },
    },
    created() {
        //获取菜品类名
        var merchantId = sessionStorage.getItem("token");
        let data = new URLSearchParams();
        data.append("merchantId", merchantId);
        this.$http.post("/reserve.php?action=readMerchantId", data).then((res) => {
            for (let index = 0; index < res.data.reserveList.length; index++) {
                res.data.reserveList[index].status = 1;
                res.data.reserveList[index].errstatus = 1;
            }
            this.reserveList = res.data.reserveList;
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
