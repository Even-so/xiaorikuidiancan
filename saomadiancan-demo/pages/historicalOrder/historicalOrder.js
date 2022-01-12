// pages/historicalOrder/historicalOrder.js
import request from "../../utils/request";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        orderList: [],
        merchantName: "",
        GoodsListData: [],
    },
    tomendianMenu() {
        wx.navigateTo({
            url: "/pages/mendianMenu/mendianMenu?merchantId=" + this.data.orderList[0].merchantId,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //获取订单信息
        let orderListData = await request(
            "/orderList.php?action=getusersorder",
            {
                merchantId: options.merchantId,
                userId: 1, //用户id
            },
            "post"
        );

        //获取订单的菜品信息
        var goodsArr = "";
        for (let index = 0; index < orderListData.orderList.length; index++) {
            let Arr = orderListData.orderList[index].purchasedGoods.split(",")[0];
            goodsArr = goodsArr + Arr + ",";
        }
        console.log("goodsArr", goodsArr);
        let GoodsListData = await request(
            "/menuLsit.php?action=readArr",
            {
                purchasedGoods: goodsArr,
            },
            "post"
        );
        // console.log("GoodsListData", GoodsListData);
        // console.log("zheshiorderList1", this.data.orderList);

        for (let index = 0; index < orderListData.orderList.length; index++) {
            orderListData.orderList[index].dishList = GoodsListData.dishList[index];
        }
        this.setData({
            orderList: orderListData.orderList.reverse(),
            merchantName: options.merchantName,
        });
        // console.log("zheshiorderList2", this.data.orderList);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
});
