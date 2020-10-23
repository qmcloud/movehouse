var _home = require("../../modules/home"), homeModule = new _home.home(), app = getApp();

Page({
    data: {
        top_item: [ "全部", "可使用", "不可用" ],
        top_p: "0 60rpx",
        idx: 0,
        list: [],
        isData: !0,
        page: 1,
        price: 0,
        use: 0,
        value: ""
    },
    onLoad: function(t) {
        var a = t.use ? t.use : 0, e = t.price ? t.price : 0;
        this.setData({
            use: a,
            price: e
        }), this.postData(0, 1);
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    conversion: function() {
        var a = this, t = this.data.value;
        if (!t) return app.hint("兑换码不能为空~");
        homeModule.conversionCoupon({
            code: t
        }).then(function(t) {
            a.postData(), app.hint("兑换成功");
        }, function(t) {});
    },
    conversionValue: function(t) {
        this.setData({
            value: t.detail.value
        });
    },
    useCoupon: function(t) {
        console.log(this.data.use)
        if (this.data.use) {
            var a = this.data.list[t.currentTarget.dataset.idx];
            if (2 != a.status) return app.hint("不可使用~");
            if (parseFloat(a.use_limit) > parseFloat(this.data.price)) return app.hint("需要满" + a.use_limit + "元才能使用");
            wx.setStorageSync("coupon", a), wx.navigateBack({
                delta: 1
            });
        }
    },
    postData: function() {
        
        var a = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
        if (1 < e && !this.data.isData) return app.hint("暂无更多数据~");
        /*homeModule.coupons({
            page: e,
            status: t
        }).then(function(t) {
            a.setData({
                list: t,
                isData: !0
            });
        }, function(t) {
            1 < e ? a.setData({
                isData: !1
            }) : a.setData({
                list: []
            });
        });*/
        var openid=wx.getStorageSync('user');//openid 
        wx.request({
            url: 'https://www.58hongtu.com/api/index/getCoupons', //接口地址
                  method: "POST",
            data: {
                openid:openid.openid,
                page: e,
                status: t
            },
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
                console.log(res.data)
                //console.log(obj);
                a.setData({
                    list: res.data,
                    isData: !0
                })

            },fail: function (res) {
              wx.showToast({
                title: '网络异常，稍后重试',
                icon: 'error',
                duration: 2000
            })
            }
          })

    },
    Getidx: function(t) {
        var a = t.detail.idx;
        this.setData({
            idx: a
        }), this.postData(a, 1);
    },
    scrollSole: function() {
        console.log(1111111111111)
        var t = this.data.idx, a = 1 * this.data.page + 1;
        this.postData(t, a);
    },
    go_use: function() {
        wx.switchTab({
            url: "../index/index"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    }
});