Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function n(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(e, t, a) {
        return t && n(e.prototype, t), a && n(e, a), e;
    };
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var app = getApp(), http = function() {
    function e() {
        _classCallCheck(this, e);
    }
    return _createClass(e, [ {
        key: "request",
        value: function(e) {
            var a = this, n = e.url, t = e.data, o = void 0 === t ? {} : t, r = e.cachetime, i = void 0 === r ? 0 : r;
            return o.m = "make_freight", new Promise(function(e, t) {
                a._request(n, o, e, t, i);
            });
        }
    }, {
        key: "_request",
        value: function(e, t, a, n, o) {
            app.util.request({
                url: "entry/wxapp/" + e,
                data: t,
                cachetime: o,
                showLoading: !1,
                success: function(e) {
                    e.data.data ? a(e.data.data) : (e.data.message && wx.showToast({
                        title: e.data.message,
                        icon: "none",
                        duration: 2e3
                    }), n(e.data.data));
                },
                fail: function(e) {
                    console.log("出错了"), console.log(e), n(e);
                }
            });
        }
    }, {
        key: "confirmPayRequest",
        value: function(e) {
            var a = this, t = e.result, n = void 0 === t ? {} : t;
            return new Promise(function(e, t) {
                a._confirmPayRequest(n, e, t);
            });
        }
    }, {
        key: "_confirmPayRequest",
        value: function(e, t, a) {
            wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: "MD5",
                paySign: e.paySign,
                success: function(e) {
                    e ? t(e) : a(e);
                },
                fail: function(e) {
                    a(e);
                }
            });
        }
    } ]), e;
}();

exports.http = http;