Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.home = void 0;

var _createClass = function() {
    function n(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(e, t, r) {
        return t && n(e.prototype, t), r && n(e, r), e;
    };
}(), _http2 = require("../utils/http.js");

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var app = getApp(), home = function(e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return _inherits(t, _http2.http), _createClass(t, [ {
        key: "getTest",
        value: function() {
            return this.request({
                url: "index"
            });
        }
    }, {
        key: "getUserId",
        value: function() {
            return this.request({
                url: "getuserid"
            });
        }
    }, {
        key: "newCoupon",
        value: function(e) {
            return this.request({
                url: "new_user_coupon",
                data: e
            });
        }
    }, {
        key: "evaluate",
        value: function(e) {
            return this.request({
                url: "score_order",
                data: e
            });
        }
    }, {
        key: "cancelOrder",
        value: function(e) {
            return this.request({
                url: "cancel_order",
                data: e
            });
        }
    }, {
        key: "conversionCoupon",
        value: function(e) {
            return this.request({
                url: "get_coupon",
                data: e
            });
        }
    }, {
        key: "serverWeb",
        value: function() {
            return this.request({
                url: "service_network"
            });
        }
    }, {
        key: "we",
        value: function() {
            return this.request({
                url: "about"
            });
        }
    }, {
        key: "feedback",
        value: function(e) {
            return this.request({
                url: "save_feedback",
                data: e
            });
        }
    }, {
        key: "questionType",
        value: function() {
            return this.request({
                url: "question_cate"
            });
        }
    }, {
        key: "getQuestion",
        value: function() {
            return this.request({
                url: "faq"
            });
        }
    }, {
        key: "orderDetail",
        value: function(e) {
            return this.request({
                url: "user_order_detail",
                data: e
            });
        }
    }, {
        key: "orderList",
        value: function(e) {
            return this.request({
                url: "user_all_order",
                data: e
            });
        }
    }, {
        key: "coupons",
        value: function(e) {
            console.log(e)
            return this.request({
                url: "all_user_coupon",
                data: e
            });
        }
    }, {
        key: "postOrder",
        value: function(e) {
            return this.request({
                url: "create_order",
                data: e
            });
        }
    }, {
        key: "login",
        value: function(e) {
            return this.request({
                url: "login",
                data: e
            });
        }
    }, {
        key: "topSwiper",
        value: function() {
            return this.request({
                url: "banner"
            });
        }
    }, {
        key: "carType",
        value: function() {
            return this.request({
                url: "get_car"
            });
        }
    }, {
        key: "getSystem",
        value: function() {
            return this.request({
                url: "get_config"
            });
        }
    }, {
        key: "faq",
        value: function() {
            return this.request({
                url: "faq"
            });
        }
    }, {
        key: "predictPrice",
        value: function(e) {
            return this.request({
                url: "price_count",
                data: e
            });
        }
    }, {
        key: "getTime",
        value: function() {
            return this.request({
                url: "getTime"
            });
        }
    }, {
        key: "pay",
        value: function(e) {
            return this.request({
                url: "pay_order",
                data: e
            });
        }
    }, {
        key: "confirmPayRequest",
        value: function(r) {
            var n = this;
            return new Promise(function(e, t) {
                n._confirmPayRequest(r, e, t);
            });
        }
    }, {
        key: "_confirmPayRequest",
        value: function(e, t, r) {
            wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: e.signType,
                paySign: e.paySign,
                success: function(e) {
                    e ? t(e) : r(e);
                },
                fail: function(e) {
                    r(e);
                }
            });
        }
    }, {
        key: "mapMarke",
        value: function(e, t, r, n) {
            var u = wx.getStorageSync("rider"), o = r.data.duration, a = [ {
                id: 1,
                latitude: e.location.lat,
                longitude: e.location.lng,
                iconPath: "/image/start.png",
                width: 25,
                height: 40,
                callout: {}
            }, {
                id: 2,
                latitude: t.location.lat,
                longitude: t.location.lng,
                iconPath: "/image/end.png",
                width: 25,
                height: 40,
                callout: {
                    content: "送达预计" + o + "分钟",
                    color: "#000000",
                    display: "ALWAYS",
                    bgColor: "#ffffff",
                    fontSize: "12px",
                    textAlign: "center",
                    borderRadius: "35px",
                    padding: "8px"
                }
            } ];
            if (2 <= r.data.status) {
                var i = r.data.duration_start;
                a[0].callout = {
                    content: "取货预计" + i + "分钟",
                    color: "#000000",
                    display: "ALWAYS",
                    bgColor: "#ffffff",
                    fontSize: "12px",
                    textAlign: "center",
                    borderRadius: "35px",
                    padding: "5px"
                }, a.push({
                    id: 0,
                    latitude: u.location.lat,
                    longitude: u.location.lng,
                    iconPath: "/image/driver.png",
                    width: 40,
                    height: 40
                });
            }
            r.setData({
                latitude: e.location.lat,
                longitude: e.location.lng,
                markers: a,
                polyline: [ {
                    points: n,
                    color: "#c1c1bf",
                    width: 5,
                    arrowLine: !0,
                    arrowIconPath: app.globalData.img_url + "jiantou.png"
                } ]
            });
        }
    } ]), t;
}();

exports.home = home;