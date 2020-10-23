var _home = require("../../../modules/home"), _address = require("../../../modules/address"), _driver = require("../../../modules/driver"), driverModule = new _driver.driver(), addressModule = new _address.address(), homeModule = new _home.home(), app = getApp();

Page({
    data: {
        latitude: 22.791375,
        longitude: 108.384247,
        markers: [],
        polyline: [],
        status: 1
    },
    onLoad: function(t) {
        this.orderDetail();
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    orderDetail: function(t) {
        var e = this, a = wx.getStorageSync("order_detail"), o = a.status;
        this.setData({
            status: o,
            order: a
        });
        var n = {};
        n.location = {
            lat: 1 * a.start_lat,
            lng: 1 * a.start_lot
        };
        var r = {};
        if (r.location = {
            lat: 1 * a.end_lat,
            lng: 1 * a.end_lot
        }, 2 == o || 3 == o) {
            var d = {}, i = {};
            i.lat = a.latitude, i.lng = a.longitude, d.location = i, wx.setStorageSync("rider", d);
            var s = addressModule.getDistance(d, n, 2, app.globalData.syStem.amap), l = addressModule.getDistance(n, r, 1, app.globalData.syStem.amap);
            Promise.all([ s, l ]).then(function(t) {
                e.setData({
                    distance: t[1].distance,
                    duration: t[1].duration,
                    distance_start: t[0].distance,
                    duration_start: t[0].duration
                });
                var a = t[0].points;
                a = a.concat(t[1].points), e.map(n, r, a);
            }, function(t) {});
        }
        1 == o && addressModule.getDistance(n, r, 2, app.globalData.syStem.amap).then(function(t) {
            e.setData({
                distance: t.distance,
                duration: t.duration
            }), e.map(n, r, t.points);
        });
    },
    cancelOrder: function() {
        var a = this;
        wx.showModal({
            title: "取消订单",
            content: "是否确认要取消该订单~",
            success: function(t) {
                t.confirm && driverModule.cancelOrder({
                    order_id: a.data.order.order_id
                }).then(function(t) {
                    app.hint("取消订单成功"), a.setData({
                        status: 1
                    });
                }, function(t) {});
            }
        });
    },
    callTel: function(t) {
        wx.makePhoneCall({
            phoneNumber: app.globalData.syStem.service_tel
        });
    },
    loading: function() {
        wx.navigateTo({
            url: "../loading/loading?id=" + this.data.order.order_id
        });
    },
    cost: function() {
        wx.navigateTo({
            url: "../cost/cost?id=" + this.data.order.order_id
        });
    },
    order_msg: function() {
        wx.navigateTo({
            url: "../order_msg/order_msg?id=" + this.data.order.order_id
        });
    },
    map: function(t, a, e) {
        homeModule.mapMarke(t, a, this, e);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    }
});