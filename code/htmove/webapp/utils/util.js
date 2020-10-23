var e = require("../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../@babel/runtime/helpers/classCallCheck")), n = e(require("../@babel/runtime/helpers/createClass")), r = require("./config.js"), a = r.env, o = (r.IP, 
function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}), i = function() {
    var e = 0;
    return function() {
        return e++;
    };
}();

var u = 0, s = 0, c = 0, g = 0, l = 0, f = 0, d = 0, h = 120, m = !0;

var b = 6378137, p = Math.PI;

function v(e) {
    return e * p / 180;
}

var y = function() {
    function e() {
        (0, t.default)(this, e);
    }
    return (0, n.default)(e, null, [ {
        key: "setInfo",
        value: function(t, n) {
            var r = wx.getStorageSync(e.storageKey) || {};
            r && (r[t] = n), wx.setStorageSync(e.storageKey, r);
        }
    }, {
        key: "getInfo",
        value: function(t) {
            var n = wx.getStorageSync(e.storageKey);
            return n ? n[t] : "";
        }
    }, {
        key: "getSerializeParams",
        value: function() {
            var t = wx.getStorageSync(e.storageKey);
            return t ? encodeURIComponent(JSON.stringify(t)) : "";
        }
    }, {
        key: "mobileKey",
        get: function() {
            return "mobile";
        }
    }, {
        key: "storageKey",
        get: function() {
            return "userInfo";
        }
    } ]), e;
}();

module.exports = {
    formatNumber: o,
    sortCompare: function(e, t, n) {
        if (t) return e.sort(function(e, r) {
            var a = e[t], o = r[t];
            return n ? a < o ? -1 : a > o ? 1 : 0 : a < o ? 1 : a > o ? -1 : 0;
        });
        console.err("id不能为空");
    },
    removeSame: function(e, t) {
        var n = [], r = {};
        if (t) for (var a = 0; a < e.length; a++) r[e[a][t]] || (r[e[a][t]] = 1, n.push(e[a])); else for (var o = 0; o < e.length; o++) r[e[o]] || (r[e[o]] = 1, 
        n.push(e[o]));
        return n;
    },
    formatTime: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/", n = e.getFullYear(), r = e.getMonth() + 1, a = e.getDate(), i = e.getHours(), u = e.getMinutes(), s = e.getSeconds();
        return [ n, r, a ].map(o).join(t) + " " + [ i, u, s ].map(o).join(":");
    },
    formatHeader: function() {
        var e, t;
        try {
            e = wx.getStorageSync("token");
        } catch (e) {
            console.log("获取保存的token失败", e);
        }
        try {
            t = wx.getSystemInfoSync();
        } catch (e) {
            console.log("获取系统信息失败", e);
        }
        var n = {
            djfrtthsource: "webChat",
            systemInfo: JSON.stringify(t)
        };
        return Object.assign({}, n, e);
    },
    isEmptyObject: function(e) {
        for (var t in e) return !1;
        return !0;
    },
    transformToMarkers: function(e, t) {
        if (e.location) var n = e.location.split(",");
        var r = e.name || e.locationName || "未知地点";
        r.length > 14 && (r = (r = r.substring(0, 12) + "...").substring(0, 7) + "\n" + r.substring(7));
        var a = {
            borderRadius: 100,
            color: "#000000",
            content: r,
            display: "ALWAYS",
            fontSize: "14",
            padding: 0,
            textAlign: "center",
            anchorX: 10,
            anchorY: -7
        };
        return {
            name: e.name || e.locationName,
            address: e.address,
            iconPath: t || "/images/map_end.png",
            id: i(),
            longitude: n && n[0] || e.lng,
            latitude: n && n[1] || e.lat,
            width: 24,
            height: 31,
            label: a
        };
    },
    initMarksByTude: function(e, t, n) {
        var r = [], a = {
            borderRadius: 100,
            color: "#000000",
            content: n,
            display: "ALWAYS",
            fontSize: "14",
            padding: 0,
            textAlign: "center",
            anchorX: 10,
            anchorY: -7
        };
        return r.push({
            id: i(),
            zIndex: 990 + Number(i()),
            longitude: t,
            latitude: e,
            width: 0,
            height: 0,
            alpha: 0,
            label: a
        }), r;
    },
    bPhone: function(e) {
        return /^(1[3456789])\d{9}$/.test(e) || /^58\d{9}$/.test(e);
    },
    getStorage: function(e) {
        return new Promise(function(t, n) {
            wx.getStorage({
                key: e,
                success: function(e) {
                    t(e.data);
                },
                fail: function(e) {
                    console.error(e), n(e);
                }
            });
        });
    },
    isObject: function(e) {
        return console.log("sssss", data), "[object Object]" === Object.prototype.toString.call(e);
    },
    parseExtreData: function(e) {
        var t = [];
        for (var n in e) t.push(n + "&" + e[n]);
        return t.join("#");
    },
    bFunction: function(e) {
        return "[object Function]" === Object.prototype.toString.call(e);
    },
    shake: function(e) {
        var t = new Date().getTime();
        if (t - u > 100) {
            var n = t - u;
            if (u = t, s = e.x, c = e.y, g = e.z, Math.abs(s + c + g - l - f - d) / n * 1e4 > h && m) {
                m = !1;
                var r, o = [ "ip", "test", "box", "online", "配置页" ], i = wx.getStorageSync("env") || a;
                o.forEach(function(e, t) {
                    e == i && (o[t] = e + "(当前环境)", r = t);
                }), wx.showActionSheet({
                    itemList: o,
                    success: function(e) {
                        4 != e.tapIndex ? e.tapIndex != r && wx.setStorageSync("env", o[e.tapIndex]) : wx.navigateTo({
                            url: "/pages/beforeOrder/configPage/configPage"
                        });
                    },
                    complete: function() {
                        m = !0;
                    }
                }), +new Date();
            }
            l = s, f = c, d = g;
        }
    },
    getUrlParam: function(e, t) {
        var n = {}, r = (e = e || "").indexOf("?");
        if (r > -1) for (var a = e.substring(r + 1).split("&"), o = 0; o < a.length; o++) {
            var i = a[o].split("=");
            i[1].indexOf("#") > -1 && (i[1] = i[1].substring(0, i[1].indexOf("#"))), n[i[0]] = i[1];
        }
        return n[t];
    },
    formatBjTime: function(e) {
        var t = e.useCarTime, n = "", r = "";
        switch (new Date(e.serviceTime).getDay()) {
          case 0:
            r = "日";
            break;

          case 1:
            r = "一";
            break;

          case 2:
            r = "二";
            break;

          case 3:
            r = "三";
            break;

          case 4:
            r = "四";
            break;

          case 5:
            r = "五";
            break;

          case 6:
            r = "六";
        }
        r = "星期" + r, -1 != t.indexOf("天") && (n = "天"), -1 != t.indexOf("日") && (n = "日");
        var a = (t = t.slice(0, -1)).split(n);
        return a[1] = a[1].split("点").join(":"), a[0] + n + " " + r + " " + a[1];
    },
    json2url: function(e) {
        return "?" + Object.keys(e).map(function(t) {
            return "".concat(t, "=").concat(encodeURIComponent(e[t]));
        }).join("&");
    },
    getFlatternDistance: function(e, t) {
        var n, r, a, o, i = Number(e.split(",")[1]), u = Number(e.split(",")[0]), s = Number(t.split(",")[1]), c = Number(t.split(",")[0]), g = v((i + s) / 2), l = v((i - s) / 2), f = v((u - c) / 2), d = Math.sin(l), h = Math.sin(f), m = Math.sin(g), p = b;
        return n = (d *= d) * (1 - (h *= h)) + (1 - (m *= m)) * h, r = (1 - d) * (1 - h) + m * h, 
        2 * (a = Math.atan(Math.sqrt(n / r))) * p * (1 + 1 / 298.257 * ((3 * (o = Math.sqrt(n * r) / a) - 1) / 2 / r * m * (1 - d) - (3 * o + 1) / 2 / n * (1 - m) * d));
    },
    timeFormat: function(e) {
        var t = new Date(e), n = t.getFullYear() + ".", r = (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + ".", a = (t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " ", o = t.getHours() < 10 ? "0" + t.getHours() : t.getHours() + ":", i = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
        return t.getSeconds(), n + r + a + o + i;
    },
    UserInfo: y,
    obj2Query: function(e) {
        return Object.keys(e).map(function(t) {
            return e[t];
        }).join("&");
    }
};