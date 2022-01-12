// pages/businessAddress/businessAddress.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        makerlat: 23.10587225432938,
        makerlon: 113.3235209011552,
    },
    onLoad: function () {
        var than = this.data;
        wx.getLocation({
            type: "gcj02", // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function (res) {
                console.log(res.latitude);
                console.log(res.longitude);
                wx.openLocation({
                    latitude: than.makerlat, // 纬度，范围为-90~90，负数表示南纬
                    longitude: than.makerlon, // 经度，范围为-180~180，负数表示西经
                    scale: 14, // 缩放比例
                    name: "测试",
                    address: "测试详细地址",
                });
            },
        });
    },
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
