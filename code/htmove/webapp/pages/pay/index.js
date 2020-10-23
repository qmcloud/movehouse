var e, t, n, o = require("../../@babel/runtime/helpers/interopRequireDefault"), r = o(require("../../@babel/runtime/regenerator")), a = o(require("../../@babel/runtime/helpers/asyncToGenerator")), s = require("../../utils/xhr.js").getWxPay, i = require("../../utils/config.js").storageKey, c = require("../../utils/service.js").fufillPath;

Page({
    data: {
        title: "支付"
    },
    onLoad: function() {
        var o = (0, a.default)(r.default.mark(function o(a) {
            return r.default.wrap(function(o) {
                for (;;) switch (o.prev = o.next) {
                  case 0:
                    console.log("onLoad:options", a), a.source && (n = a.source), a.orderId && (t = a.orderId, 
                    console.log("orderId", t)), (e = wx.getStorageSync(i.openId)) && this.wxPay();

                  case 5:
                  case "end":
                    return o.stop();
                }
            }, o, this);
        }));
        return function(e) {
            return o.apply(this, arguments);
        };
    }(),
    wxPay: function() {
        var o = (0, a.default)(r.default.mark(function o() {
            var a, i, u, l, d, f, p;
            return r.default.wrap(function(o) {
                for (;;) switch (o.prev = o.next) {
                  case 0:
                    return o.prev = 0, o.next = 3, s({
                        orderId: t,
                        openid: e
                    });

                  case 3:
                    a = o.sent, console.log("wxPay", a), 0 == a.data.code ? (i = JSON.parse(a.data.data), 
                    i.appId, u = i.timeStamp, l = i.nonceStr, d = i.package, f = i.signType, p = i.paySign, 
                    wx.requestPayment({
                        timeStamp: u,
                        nonceStr: l,
                        package: d,
                        signType: f,
                        paySign: p,
                        success: function(e) {
                            console.log("调用微信支付成功", e), "requestPayment:ok" == e.errMsg ? (console.log("微信支付成功"), 
                            wx.nextTick(function() {
                                wx.redirectTo({
                                    url: c(n)
                                });
                            })) : (console.log("微信支付失败"), wx.showToast({
                                title: "支付失败，请重试！",
                                icon: "none"
                            }), wx.nextTick(function() {
                                wx.redirectTo({
                                    url: c(n)
                                });
                            }));
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: "取消支付",
                                icon: "none"
                            }), wx.nextTick(function() {
                                wx.redirectTo({
                                    url: c(n)
                                });
                            }), console.log("_source", n), console.error("requestPayment:error", e);
                        }
                    })) : wx.showToast({
                        title: a.data.message,
                        icon: "none"
                    }), o.next = 12;
                    break;

                  case 8:
                    o.prev = 8, o.t0 = o.catch(0), 1001 == o.t0.data.code ? wx.showToast({
                        title: "支付成功",
                        success: function() {
                            wx.redirectTo({
                                url: c(n)
                            });
                        }
                    }) : wx.showToast({
                        title: o.t0.data.message,
                        icon: "none"
                    }), console.error("onLoad:requestPayment", o.t0);

                  case 12:
                  case "end":
                    return o.stop();
                }
            }, o, null, [ [ 0, 8 ] ]);
        }));
        return function() {
            return o.apply(this, arguments);
        };
    }(),
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        return "button" === e.from && console.log(e.target), {
            title: "鸿途搬家",
            path: "/pages/moveHouse/index",
            imageUrl: "/images/bj_share.png"
        };
    }
});