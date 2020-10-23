var _driver = require("../../../modules/driver"), driverModule = new _driver.driver(), app = getApp();

Page({
    data: {
        top_item: [ "全部", "待取货", "待送达", "已完成" ],
        top_p: "0 50rpx",
        idx: 0,
        list: [],
        isData: !0,
        page: 1
    },
    onLoad: function(t) {
        this.postData(0, 1);
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    orderDetail: function(t) {
        wx.navigateTo({
            url: "../../driver/order_msg/order_msg?id=" + t.currentTarget.dataset.id
        });
    },
    postData: function() {
        var a = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
        if (1 < i && !this.data.isData) return app.hint("暂无更多数据~");
        var e = [];
        driverModule.orderList({
            page: i,
            status: t
        }).then(function(t) {
            e = t.data, 1 < i && (e = a.data.list.concat(t.data)), a.setData({
                list: e,
                page: i,
                isData: !0
            });
        }, function(t) {
            if (1 < i) return a.setData({
                isData: !1
            }), app.hint("没有更多订单了~");
            a.setData({
                list: []
            });
        });
    },
    Getidx: function(t) {
        var a = t.detail.idx;
        this.setData({
            idx: a
        }), this.postData(a, 1);
    },
    scrollSole: function() {
        var t = this.data.idx, a = 1 * this.data.page + 1;
        this.postData(t, a);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    }
});