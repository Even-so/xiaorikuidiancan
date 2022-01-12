// pages/reserve/reserve.js
import request from "../../utils/request";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        array: ["1", "2", "3", "4", "5", "6", "7", "8"],
        objectArray: [
            {
                id: 0,
                name: "1",
            },
            {
                id: 1,
                name: "2",
            },
            {
                id: 2,
                name: "3",
            },
            {
                id: 3,
                name: "4",
            },
            {
                id: 4,
                name: "5",
            },
            {
                id: 5,
                name: "6",
            },
            {
                id: 6,
                name: "7",
            },
            {
                id: 7,
                name: "8",
            },
        ],
        index: 0,
        time: "12:00",
        merchantId: "",
    },
    bindPickerChange: function (e) {
        // console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index: e.detail.value,
        });
    },
    bindTimeChange: function (e) {
        // console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            time: e.detail.value,
        });
    },
    //跳转 mendianMenu 页面
    async tomendianMenu() {
        await request(
            "/reserve.php?action=submit",
            {
                userId: 1,
                merchantId: this.data.merchantId,
                time: this.data.time,
                peopleNum: this.data.index,
            },
            "post"
        );
        wx.navigateTo({
            url: "/pages/mendianMenu/mendianMenu?merchantId=" + this.data.merchantId,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            merchantId: options.merchantId,
        });
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
