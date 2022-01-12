<template>
    <div class="ordertable">
        <h1>订单信息</h1>
        <el-table :data="tableData" border style="width: 1200px" max-height="" height="">
            <el-table-column fixed prop="orderId" label="订单编号" width="200"> </el-table-column>
            <el-table-column prop="userId" label="购买者" width="100"> </el-table-column>
            <el-table-column prop="paymentStatus" label="支付状态" width="120"> </el-table-column>
            <el-table-column prop="paymentTime" label="支付时间" width="250"> </el-table-column>
            <el-table-column prop="tableNumber" label="桌号" width="120"> </el-table-column>
            <el-table-column prop="mealCode" label="取餐码" width="120"> </el-table-column>
            <el-table-column prop="packingFee" label="打包费" width="120"> </el-table-column>
            <el-table-column prop="payPrice" label="支付金额" width="120"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        @click="handleCheck(scope.$index, scope.row)"
                        type="text"
                        size="small"
                    >
                        查看
                    </el-button>
                    <el-button
                        @click="handleDelete(scope.$index, scope.row)"
                        type="text"
                        size="small"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination> -->
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
        //查看一条数据
        handleCheck(index, row) {
            row = JSON.stringify(row);
            this.$router.push("/index/orderInfo?row=" + row);
            console.log(row);
            console.log(index);
        },
        //删除一条数据
        handleDelete(index, row) {
            console.log(index);
            this.tableData.splice(index, 1);
            let data = new URLSearchParams();
            data.append("orderId", row.orderId);
            this.$http.post("/orderList.php?action=delete", data).then((res) => {
                console.log(res);
            });
            console.log(row);
            console.log(index);
        },
    },
    //页面渲染时完成
    created() {
        //获取订单信息
        var merchantId = sessionStorage.getItem("token");
        let data = new URLSearchParams();
        data.append("merchantId", merchantId);
        this.$http.post("/orderList.php?action=read", data).then((res) => {
            this.tableData = res.data.orderList;
            console.log("这是tableData", this.tableData);
            console.log("这是res.data.orderList", res.data.orderList);
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
    .el-table {
        width: 500px;
    }
}
</style>
