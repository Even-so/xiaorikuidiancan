// pages/mendianInfo/mendianInfo.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        makerlat: 21.22613,
        makerlon: 110.388588,
        merchantInfo: {}, //商业页面跳转拿到的数据，包括index
        merchant: {}, //不包括index
    },
    /**
     * 生命周期函数--监听页面加载
     */ onLoad: function (options) {
        //  二维码跳转时使用
        // let merchantListData = await request("/merchant.php?action=getInfo", {merchantId});
        // this.setData({
        //     merchantList: merchantListData.merchant,
        // });
        // console.log(merchantListData);

        console.log("1111:,", JSON.parse(options.merchantInfo));
        this.setData({
            merchantInfo: JSON.parse(options.merchantInfo),
        });
        this.setData({
            merchant: this.data.merchantInfo.merchantinfo,
            makerlat: this.data.merchantInfo.merchantinfo.Lat,
            makerlon: this.data.merchantInfo.merchantinfo.Lng,
        });
    },

    //跳转 mendianMenu 页面
    tomendianMenu() {
        wx.navigateTo({
            url: "/pages/mendianMenu/mendianMenu?merchantId=" + this.data.merchant.merchantId,
        });
    },
    //跳转 reserve 页面
    toreserve() {
        wx.navigateTo({
            url: "/pages/reserve/reserve?merchantId=" + this.data.merchant.merchantId,
        });
    },
    //跳转 businessAddress 页面
    tobusinessAddress() {
        var than = this.data;
        wx.getLocation({
            type: "gcj02", // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function (res) {
                var lat = than.merchantInfo.merchantinfo.Lat * 1;
                var lng = than.merchantInfo.merchantinfo.Lng * 1;
                wx.openLocation({
                    latitude: lat, // 纬度，范围为-90~90，负数表示南纬
                    longitude: lng, // 经度，范围为-180~180，负数表示西经
                    scale: 14, // 缩放比例
                    name: than.merchant.merchantName,
                    address: than.merchant.adddess,
                });
            },
        });
    },
    //跳转 historicalOrder 页面
    tohistoricalOrder() {
        wx.navigateTo({
            url:
                "/pages/historicalOrder/historicalOrder?merchantId=" +
                this.data.merchant.merchantId +
                "&&merchantName=" +
                this.data.merchant.merchantName,
        });
    },
    //联系商家
    handleShowModal() {
        wx.showModal({
            title: "联系商家", //提示的标题
            content: "即将拨打电话" + this.data.merchant.telNumber, //提示的内容
            success: function (res) {
                if (res.confirm) {
                    console.log("用户点击了确定");
                    wx.makePhoneCall({
                        phoneNumber: this.data.merchant.telNumber,
                    });
                } else if (res.cancel) {
                    console.log("用户点击了取消");
                }
            },
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
