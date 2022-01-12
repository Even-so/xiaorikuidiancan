// pages/payment/payment.js
import request from "../../utils/request";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        _num: 1, //选择就餐方式标志位
        textareaValue: "", //备注
        cart: [], //购物车物品
        merchant: {}, //门店信息，没用
        merchantId: 0, //门店id
        total: 0, //总价格，不包括打包费
        merchantInfo: {}, //门店信息
        packingFee: 0, //总打包费
    },
    //就餐方式的选择
    changetype: async function (e) {
        console.log(e.target.dataset.num);
        this.setData({
            _num: e.target.dataset.num,
        });
        if (e.target.dataset.num == 2) {
            this.setData({
                packingFee: this.data.merchantInfo.packingFee * this.data.cart.length,
            });
        } else {
            this.setData({
                packingFee: 0,
            });
        }
    },
    //备注
    handleother: function () {
        wx.navigateTo({
            url: "/pages/beizhu/beizhu?textareaValue=" + this.data.textareaValue,
        });
    },
    //立即支付
    async hanglepay() {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var purchasedGoods = "";
        var goodsNumber = "";

        var paymentTime = y + "-" + m + "-" + d + " " + h + ":" + m + ":" + s;
        for (let index = 0; index < this.data.cart.length; index++) {
            const element = this.data.cart[index];
            purchasedGoods = purchasedGoods + element.dishId + ",";
            goodsNumber = goodsNumber + element.shuliang + ",";
        }
        var mealCode = "1" + (Math.floor(Math.random() * 90) + 10);
        let payInfo = await request(
            "/orderList.php?action=create",
            {
                userId: 1,
                merchantId: this.data.merchantId,
                tableNumber: 15,
                mealCode,
                paymentStatus: 1,
                paymentTime: paymentTime,
                packingFee: this.data.packingFee,
                remarks: " this.data.textareaValue",
                purchasedGoods,
                goodsNumber,
                payPrice: this.data.total * 1 + this.data.packingFee * 1,
            },
            "post"
        );
        console.log("this.data.merchantInfo", this.data.merchantInfo);
        wx.navigateTo({
            url:
                "/pages/historicalOrder/historicalOrder?merchantId=" +
                this.data.merchantId +
                "&&merchantName=" +
                this.data.merchantInfo.merchantName,
        });
    },
    changetypeDabao: function (event) {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.setData({
            cart: JSON.parse(options.cart),
        });
        // let merchantData = await request("/merchant.php?action=getInfo", {
        //     merchantId: options.merchantId,
        // });
        this.setData({
            merchantId: options.merchantId,
            // merchant: merchantData.merchant,
            textareaValue: options.textareaValue,
            total: options.total,
        });
        let merchantListData = await request(
            "/merchant.php?action=getInfo",
            {
                merchantId: this.data.merchantId,
            },
            "post"
        );
        this.setData({
            merchantInfo: merchantListData.merchant[0],
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
