Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.address = void 0;

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _createClass = function() {
    function o(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(t, e, n) {
        return e && o(t.prototype, e), n && o(t, n), t;
    };
}(), _qqmapWxJssdk = require("../utils/qqmap-wx-jssdk.js"), _amapWx = require("../utils/amap-wx.js");

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var app = getApp(), address = function() {
    function t() {
        _classCallCheck(this, t);
    }
    return _createClass(t, [ {
        key: "getAddress",
        value: function() {
            var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "政府", o = this, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "南宁", s = arguments[2];
            return s ? new Promise(function(t, e) {
                o._getAddress(n, i, s, t, e);
            }) : app.hint("腾讯地图的key值未设置");
        }
    }, {
        key: "_getAddress",
        value: function(t, e, n, o, i) {
            new _qqmapWxJssdk.QQMapWX({
                key: n
            }).getSuggestion({
                keyword: t,
                region: e,
                region_fix: 1,
                policy: 1,
                success: function(t) {
                    t.data ? o(t.data) : i();
                },
                fail: function(t) {
                    i();
                },
                complete: function(t) {}
            });
        }
    }, {
        key: "getLocation",
        value: function() {
            var o = this;
            return new Promise(function(e, n) {
                wx.getLocation({
                    type: "gcj02",
                    success: function(t) {
                        t ? e(t) : n();
                    },
                    fail: function(t) {
                        o.getAddressAuth(), n();
                    }
                });
            });
        }
    }, {
        key: "getCurrentCityMessage",
        value: function() {
            var o = this;
            return new Promise(function(e, n) {
                o.getLocation().then(function(t) {
                    o.getCity(t.latitude, t.longitude, 0, app.globalData.tmap).then(function(t) {
                        e(t);
                    }, function(t) {
                        n(t);
                    });
                }, function(t) {
                    n(t);
                });
            });
        }
    }, {
        key: "setLocationAuth",
        value: function() {
            wx.showModal({
                title: "地址授权请求",
                content: "我们需要获取您当前所在的位置",
                success: function(t) {
                    t.confirm && wx.openSetting({
                        success: function(t) {}
                    });
                }
            });
        }
    }, {
        key: "getAddressAuth",
        value: function() {
            var e = this;
            wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.userLocation"] || e.setLocationAuth();
                },
                fail: function(t) {}
            });
        }
    }, {
        key: "getCity",
        value: function(t, e, i, s) {
            return s ? new Promise(function(n, o) {
                new _qqmapWxJssdk.QQMapWX({
                    key: s //腾讯地图key
                }).reverseGeocoder({
                    location: {
                        latitude: t,
                        longitude: e
                    },
                    get_poi: 1,
                    success: function(t) {
                        if (t) if (1 == i) {
                            var e = t.result.pois[0].ad_info.city;
                            n(e);
                        } else 0 == i ? n(t.result.pois[0]) : 2 == i ? n(t.result.pois) : o(); else o();
                    },
                    fail: function(t) {
                        o(t);
                    }
                });
            }) : app.hint("腾讯地图的key值未设置");
        }
    }, {
        key: "confirm",
        value: function(t, e, n, o) {
            if (0 == n) {
                if (0 == t) return void this._addHistory(o[e], n);
                var i = wx.getStorageSync("history_list");
                this._addHistory(i[e], n);
            } else {
                if (0 == t) return void this._addHistory(o[e], n);
                var s = wx.getStorageSync("history_list");
                this._addHistory(s[e], n);
            }
        }
    }, {
        key: "_addHistory",
        value: function(t, e) {
            var n = wx.getStorageSync("history_list");
            if (n || (n = []), 0 < n.length) {
                for (var o = 0; o < n.length; o++) n[o].id == t.id && n.splice(o, 1);
                5 <= n.length && n.pop();
            }
            var i = t.city;
            console.log(void 0 === i ? "undefined" : _typeof(i)), "object" == (void 0 === i ? "undefined" : _typeof(i)) && (i = i.city);
            var s = {};
            s.city = i, t.ad_info = s, 0 == e ? wx.setStorageSync("fahuo_template", t) : wx.setStorageSync("shouhuo_template", t), 
            app.globalData.search_address = 1, n.unshift(t), wx.setStorageSync("history_list", n);
        }
    }, {
        key: "getDistance",
        value: function(n, o) {
            var i = this, s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0, a = arguments[3];
            return a ? new Promise(function(t, e) {
                i._getDistance(t, e, n, o, s, a);
            }) : app.hint("高德地图的key值未设置");
        }
    }, {
        key: "_getDistance",
        value: function(f, e, t, n, c, o) {
            new _amapWx.AMapWX({
                key: o
            }).getRidingRoute({
                origin: t.location.lng + "," + t.location.lat,
                destination: n.location.lng + "," + n.location.lat,
                success: function(t) {
                    var e = (t.paths[0].distance / 1e3).toFixed(1), n = Math.ceil(t.paths[0].duration / 60), o = {};
                    if (o.distance = e, o.duration = n, c) {
                        var i = [];
                        if (t.paths && t.paths[0] && t.paths[0].steps) for (var s = t.paths[0].steps, a = 0; a < s.length; a++) for (var r = s[a].polyline.split(";"), u = 0; u < r.length; u++) i.push({
                            longitude: parseFloat(r[u].split(",")[0]),
                            latitude: parseFloat(r[u].split(",")[1])
                        });
                        return o.points = i, f(o);
                    }
                    f(o);
                },
                fail: function(t) {
                    e(t);
                }
            });
        }
    }, {
        key: "date",
        value: function(t, e, n) {
            var o = t, i = 10 * e / 10, s = 10 * n / 10, a = s - 60, r = [], u = [];
            if (23 == i && 0 == a) {
                for (var f = 0; f <= 23; f++) u.push(f);
                for (var c = 0; c < 60; c += 10) r.push(c);
                4 == o.length && o.shift();
            }
            if (i < 23 && 0 == a) {
                for (f = 0; f < 24; f++) i < f && u.push(f);
                for (c = 0; c < 60; c += 10) r.push(c);
                4 == o.length && o.pop();
            }
            if (23 == i && 0 < a) {
                for (f = 0; f <= 23; f++) u.push(f);
                for (c = 0; c < 60; c += 10) a <= 10 ? 10 <= c && r.push(c) : 10 < c && r.push(c);
                4 == o.length && o.shift();
            }
            if (i < 23 && 0 < a) {
                for (f = 0; f < 24; f++) i < f && u.push(f);
                for (c = 0; c < 60; c += 10) a <= 10 ? 10 <= c && r.push(c) : 10 < c && r.push(c);
                4 == o.length && o.pop();
            }
            if (i < 23 && a < 0) {
                for (f = 0; f < 24; f++) i <= f && u.push(f);
                for (c = 0; c <= 60; c += 10) s <= c && r.push(c);
                if (60 == r.pop()) if ("" == r) {
                    r = [];
                    for (var l = 0; l < 60; l += 10) r.push(l);
                    u.shift(), 4 == o.length && o.pop();
                } else 4 == o.length && o.pop();
            }
            if (23 == i && a < 0) {
                for (c = 0; c <= 60; c += 10) s <= c && r.push(c);
                if (60 == r.pop()) if ("" == r) {
                    r = [], u = [];
                    for (l = 0; l < 60; l += 10) r.push(l);
                    for (var p = 0; p < 24; p++) u.push(p);
                    4 == o.length && o.shift();
                } else u = [ 23 ], 4 == o.length && o.pop();
            }
            return o.shift(), o.unshift("今天"), (u = u.map(function(t) {
                return t + "点";
            })).unshift("立即出发"), {
                minutes: r,
                hours: u,
                days: o
            };
        }
    } ]), t;
}();

exports.address = address;