import request from "../../utils/request";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        navList: [], //菜品数据
        currentIndex: 0, //左边对应的索引
        rightViewId: "", //点击事件右边的索引
        cart: [], //购物车数据
        cartNum: 0, //显示购物车数量
        navListIndex: 0, //第一层navlist的index索引值
        merchantId: "", //门店id
        total: 0, //总价格
    },
    //左右联动
    getScroll(e) {
        //微信小程序中绑定滑动函数，每滑动一下都会触发
        let top = e.detail.scrollTop,
            h = 0,
            _this = this;

        for (let i = 0; i < this.data.navList.length; i++) {
            let dishSize = this.data.navList[i].list.length; //获取数据对应展示商品的json
            h += 38 + parseInt(dishSize * 80); //获取当前元素的高度，38是标题高度，80是元素高度

            if (top <= h) {
                //满足条件立刻停止循环，就会一直停留再当前索引，不满足当前就会自动到下一个菜单
                _this.setData({
                    currentIndex: i,
                });
                break;
            }
        }
    },
    //左边控制右边
    changeMenu(e) {
        console.log(this.data.heightArr, this.data.topArr);

        this.setData({
            currentIndex: e.currentTarget.dataset.i,
            rightViewId: e.currentTarget.dataset.id,
        });
    },
    //获取第一层navlist的index索引值
    getNavListIndex(e) {
        this.setData({
            navListIndex: e.currentTarget.dataset.index1,
        });
    },
    //添加进购物车
    addCart(e) {
        //获取商品id
        //获取第二层list的index索引值
        var index = e.currentTarget.dataset.index;
        // var items = e.currentTarget.dataset.items;
        //创建储存数组
        var Cart = [];
        Cart = this.data.cart;
        //第一层index
        var index1 = this.data.navListIndex;
        //第二层index
        var index2 = index;
        var upflag = "navList[" + index1 + "].list[" + index2 + "].flag";
        var upshuliang = "navList[" + index1 + "].list[" + index2 + "].shuliang";
        var Cartobj = this.data.navList[index1].list[index2];
        Cart.push(Cartobj);
        //计算总价格
        var total = this.data.total * 1 + this.data.navList[index1].list[index2].dishPrice * 1;
        //将商品信息写入
        this.setData({
            [upflag]: true,
            [upshuliang]: 1,
        });
        this.setData({
            cart: Cart,
            cartNum: this.data.cartNum * 1 + 1,
            total: total,
        });
        console.log("添加进购物车navList", this.data.navList);
        console.log("添加进购物车cart", this.data.cart);
    },
    //数量加1
    addshuliang(e) {
        var dishId = e.currentTarget.dataset.items.dishId;
        //第一层index
        var index1 = this.data.navListIndex;
        //第二层index
        var index2 = e.currentTarget.dataset.index;
        var upshuliang = "navList[" + index1 + "].list[" + index2 + "].shuliang";

        for (let i = 0; i < this.data.cart.length; i++) {
            if (this.data.cart[i].dishId == dishId) {
                var index3 = i;
            } else var index3 = 0;
        }
        var upcartshuliang = "cart[" + index3 + "].shuliang";
        var shuliang = this.data.navList[index1].list[index2].shuliang * 1;
        shuliang += 1;
        //计算总价格
        var total =
            this.data.total * 1 + this.data.navList[index1].list[index2].dishPrice * shuliang;
        this.setData({
            [upshuliang]: shuliang,
            [upcartshuliang]: shuliang,
            total: total,
        });
        console.log("数量+1cart", this.data.cart);
        console.log("数量+1navList", this.data.navList);
    },
    //数量减1
    subshuliang(e) {
        var dishId = e.currentTarget.dataset.items.dishId;
        //第一层index
        var index1 = this.data.navListIndex;
        //第二层index
        var index2 = e.currentTarget.dataset.index;
        var upshuliang = "navList[" + index1 + "].list[" + index2 + "].shuliang";
        var upflag = "navList[" + index1 + "].list[" + index2 + "].flag";

        for (let i = 0; i < this.data.cart.length; i++) {
            if (this.data.cart[i].dishId == dishId) {
                var index3 = i;
            } else var index3 = 0;
        }
        var upcartshuliang = "cart[" + index3 + "].shuliang";
        var shuliang = this.data.navList[index1].list[index2].shuliang;
        if (shuliang <= 1) {
            this.data.cart.splice(index3, 1);
            this.setData({
                [upflag]: false,
                cartNum: this.data.cartNum * 1 + -1,
            });
        } else {
            shuliang -= 1;
            this.setData({
                [upcartshuliang]: shuliang,
            });
        }
        //计算总价格
        var total = this.data.total + this.data.navList[index1].list[index2].dishPrice * shuliang;
        shuliang -= 1;
        this.setData({
            [upshuliang]: shuliang,
            total: total,
        });
        console.log("数量-1cart", this.data.cart);
        console.log("数量-1navList", this.data.navList);
    },
    // 输入数量
    inputshuliang(e) {
        var dishId = e.currentTarget.dataset.items.dishId;
        //第一层index
        var index1 = this.data.navListIndex;
        //第二层index
        var index2 = e.currentTarget.dataset.index;
        var upshuliang = "navList[" + index1 + "].list[" + index2 + "].shuliang";
        var upflag = "navList[" + index1 + "].list[" + index2 + "].flag";
        //遍历添加cart数组，查找对象所在位置
        for (let i = 0; i < this.data.cart.length; i++) {
            if ((this.data.cart[i].id = dishId)) {
                var index3 = i;
            }
        }
        var upcartshuliang = "cart[" + index3 + "].shuliang";
        // var upcartlist = "cart";
        // var shuliang = this.data.navList[index1].list[index2].shuliang;
        // var cartList =
        // var cartshuliang = this.data.cart[index3].shuliang;
        //获取输入的数量
        // shuliang = e.detail.value;
        // cartshuliang = e.detail.value;
        //计算总价格
        var total =
            this.data.total + this.data.navList[index1].list[index2].dishPrice * e.detail.value;
        if (e.detail.value <= 0) {
            this.data.cart.splice(index3, 1);
            this.setData({
                [upflag]: false,
                [upshuliang]: 0,
                cartNum: this.data.cartNum * 1 + -1,
                total: total,
            });
        } else {
            this.setData({
                [upcartshuliang]: e.detail.value,
                [upshuliang]: e.detail.value,
                total: total,
            });
        }

        console.log("输入数量cart", this.data.cart);
        console.log("输入数量navList", this.data.navList);
    },
    //跳转 payment 页面
    topayment() {
        wx.navigateTo({
            url:
                "/pages/payment/payment?cart= " +
                JSON.stringify(this.data.cart) +
                "&&merchantId=" +
                this.data.merchantId +
                "&&total=" +
                this.data.total,
        });
        console.log(this.data.navList);
    },
    //跳转 historicalOrdert 页面
    tohistoricalOrder() {
        wx.navigateTo({
            url: "/pages/historicalOrder/historicalOrder",
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.setData({
            merchantId: options.merchantId,
        });
        wx.request({
            url: "http://119.23.63.87/phpsaomaserver/menuLsit.php?action=getClass", //接口
            method: "POST",
            data: { merchantId: options.merchantId },
            header: {
                "content-type": "application/x-www-form-urlencoded",
            },
            success: (res) => {
                console.log(res);
                var that = this;
                this.setData({
                    navList: res.data.classList,
                });
                for (let index = 0; index < this.data.navList.length; index++) {
                    const element = this.data.navList[index].classId;
                    // console.log(element);
                    wx.request({
                        url: "http://119.23.63.87/phpsaomaserver/menuLsit.php?action=readClassArr", //接口
                        method: "POST",
                        data: { classId: element },
                        header: {
                            "content-type": "application/x-www-form-urlencoded",
                        },
                        success: (res) => {
                            for (let index = 0; index < res.data.dishList.length; index++) {
                                const element = res.data.dishList[index];
                                element.flag = false;
                                element.shuliang = 0;
                            }
                            var list = "navList[" + index + "].list";
                            var navList = "that.data.navList[" + index + "].list";

                            console.log(res.data.dishList);
                            this.setData({
                                [list]: res.data.dishList,
                            });
                        },
                    });
                }
                // for (var index in this.data.navList) {
                //     const element = this.data.navList[index].classId;
                //     // console.log(element);
                //     wx.request({
                //         url: "http://119.23.63.87/phpsaomaserver/menuLsit.php?action=readClassArr", //接口
                //         method: "POST",
                //         data: { classId: element },
                //         header: {
                //             "content-type": "application/x-www-form-urlencoded",
                //         },
                //         success: (res) => {
                //             var classList = "navList[" + index + "].list";
                //             console.log(res.data.dishList);
                //             this.setData({
                //                 [classList]: res.data.classList,
                //             });
                //         },
                //     });
                // }
                // let GoodsListData = await request(
                //     "/menuLsit.php?action=readClassArr",
                //     {
                //         classId: element,
                //     },
                //     "post"
                // );
                // var classList = "navList[" + index + "].list";
                // console.log(GoodsListData.dishList);
                // this.setData({
                //     [classList]: ClassListData.classList,
                // });

                console.log(this.data.navList);
            },
        });
        console.log(this.data.navList);
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
