// index.js
// 获取应用实例
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUseGetUserProfile: false,
    },

    //跳转Recommendsong页面
    tomendian() {
        if (this.data.hasUserInfo) {
            wx.navigateTo({
                url: "/pages/mendian/mendian",
            });
        } else {
            this.getUserProfile();
        }
    },
    toallHistoricalOrder() {
        if (this.data.hasUserInfo) {
            wx.navigateTo({
                url: "/pages/allHistoricalOrder/allHistoricalOrder",
            });
        } else {
            this.getUserProfile();
        }
    },
    //跳转topersonal页面
    topersonal() {
        if (this.data.hasUserInfo) {
            wx.navigateTo({
                url: "/pages/personal/personal?userInfo=" + JSON.stringify(this.data.userInfo),
            });
            console.log(this.data.userInfo);
        } else {
            this.getUserProfile();
        }
    },
    //获取用户信息
    async getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
            },
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true,
            });
        }
        console.log(this.data.userInfo.nickName);
    },
    onLaunch: function () {
        wx.getUserProfile({
            desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
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
