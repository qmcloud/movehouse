var _driver = require("../../../modules/driver"), _address = require("../../../modules/address"), addressModule = new _address.address(), driverModule = new _driver.driver(), app = getApp();

Component({
    properties: {
        info: {
            type: Object
        }
    },
    data: {
        title: [ "待接单", "进行中"],
        idx: 0,
        left: "",
        wait_order_list: [],
        underway_order_list: [],
        isWait: !0,
        isData: !0,
        wait_page: 1,
        page: 1
    },
    lifetimes: {
        attached: function() {
            this.robbedOrderList();
        }
    },
    pageLifetimes: {
        show: function() {
            var a = this;
            app.getWebSocket().onMessage(function(t) {
                var e = JSON.parse(t.data);
                console.log(e), "sendOrder" == e.type && (a.robbedOrderList_T(), a.underwayOrder());
            });
        },
        hide: function() {},
        resize: function(t) {}
    },
    methods: {
        confirmOrder: function(n) {
            var o = this;
            addressModule.getLocation().then(function(t) {
                var e = t.latitude, a = t.longitude, r = n.currentTarget.dataset.status, i = n.currentTarget.dataset.id;
                if (2 == r) {
                    var d = app.globalData.cargo_img[i];
                    return d ? void driverModule.confirmGetGoods({
                        order_id: i,
                        picture: d.img,
                        lat: e,
                        lng: a
                    }).then(function(t) {
                        app.hint("取货成功~"), o.underwayOrder();
                    }, function(t) {}) : (console.log(i), void wx.navigateTo({
                        url: "../loading/loading?id=" + i
                    }));
                }
                driverModule.confirmSuccessOrder({
                    order_id: i,
                    lat: e,
                    lng: a
                }).then(function(t) {
                    app.hint("收货成功~"), o.underwayOrder();
                }, function(t) {});
            });
        },
        underwayOrder: function() {
            var e = this, a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1;
            if (1 < a && !this.data.isData) return app.hint("暂无更多数据~");
            var r = [];
            driverModule.underwayOrder({
                page: a
            }).then(function(t) {
                r = t, 1 < a && (r = e.data.underway_order_list.concat(t)), e.setData({
                    underway_order_list: r,
                    page: a,
                    isData: !0
                });
            }, function(t) {
                if (1 < a) return e.setData({
                    isData: !1
                }), app.hint("没有更多订单了~");
                e.setData({
                    underway_order_list: r,
                    page: a
                });
            });
        },
        robbedOrderList_T: function() {
            var a = this;
            app.util.request({
                url: "entry/wxapp/robbed_order_list",
                success: function(t) {
                    var e = [];
                    t.data.data && (e = t.data.data.data), a.setData({
                        wait_order_list: e
                    });
                }
            });
        },
        robbedOrderList: function() {
            var e = this, a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1;
            if (1 < a && !this.data.isWait) return app.hint("暂无更多数据~");
            var r = [];
            driverModule.robbedOrderList({
                page: a
            }).then(function(t) {
                r = t.data, console.log(t.data), 1 < a && (r = e.data.wait_order_list.concat(t.data)), 
                e.setData({
                    wait_order_list: r,
                    wait_page: a,
                    isWait: !0
                });
            }, function(t) {
                if (1 < a) return e.setData({
                    isWait: !1
                }), app.hint("没有更多订单了");
                e.setData({
                    wait_order_list: r,
                    wait_page: a
                });
            });
        },
        scrollSole: function() {
            0 != this.data.idx ? this.underwayOrder(1 * this.data.page + 1) : this.robbedOrderList(1 * this.data.wait_page + 1);
        },
        callTel: function(t) {
            wx.makePhoneCall({
                phoneNumber: t.currentTarget.dataset.phone
            });
        },
        navigation: function(t) {
            var e = 1 * t.currentTarget.dataset.lat, a = 1 * t.currentTarget.dataset.lng, r = t.currentTarget.dataset.name, i = t.currentTarget.dataset.address;
            wx.openLocation({
                latitude: e,
                longitude: a,
                name: r,
                address: i
            });
        },
        robbedOrder: function(e) {
            var a = this;
            wx.showLoading({
                title: "加载中",
                mask: !0
            }), addressModule.getLocation().then(function(t) {
                driverModule.robbedOrder({
                    order_id: e.currentTarget.dataset.id,
                    latitude: t.latitude,
                    longitude: t.longitude
                }).then(function(t) {
                    return wx.hideLoading(), a.setData({
                        idx: 1
                    }), a.underwayOrder(1), app.hint("抢单成功");
                }, function(t) {
                    wx.hideLoading();
                });
            }, function(t) {});
        },
        orderDetail: function(t) {
            var e = t.currentTarget.dataset.idx, a = "";
            a = 1 == t.currentTarget.dataset.status ? this.data.wait_order_list[e] : this.data.underway_order_list[e], 
            wx.setStorageSync("order_detail", a), wx.navigateTo({
                url: "../order_detail/order_detail"
            });
        },
        changeStatus: function(t) {
            var e = this, a = t.currentTarget.dataset.status;
            driverModule.switch({
                statef: a
            }).then(function(t) {
                e.triggerEvent("switch", {
                    status: a
                }, {});
            }, function(t) {});
        },
        changeTab: function(t) {
            var e = t.currentTarget.dataset.idx;
            this.setData({
                idx: e
            }), 0 != e ? this.underwayOrder() : this.robbedOrderList();
        }
    }
});