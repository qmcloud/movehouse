var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _base = require("base64"), _md = require("md5"), _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var util = {};

function getQuery(e) {
    var t = [];
    if (-1 != e.indexOf("?")) for (var n = e.split("?")[1].split("&"), a = 0; a < n.length; a++) n[a].split("=")[0] && unescape(n[a].split("=")[1]) && (t[a] = {
        name: n[a].split("=")[0],
        value: unescape(n[a].split("=")[1])
    });
    return t;
}

function getUrlParam(e, t) {
    var n = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), a = e.split("?")[1].match(n);
    return null != a ? unescape(a[2]) : null;
}

function getSign(e, t, n) {
    var a = require("underscore.js"), r = require("md5.js"), i = "", o = getUrlParam(e, "sign");
    if (o || t && t.sign) return !1;
    if (e && (i = getQuery(e)), t) {
        var s = [];
        for (var u in t) u && t[u] && (s = s.concat({
            name: u,
            value: t[u]
        }));
        i = i.concat(s);
    }
    i = a.sortBy(i, "name"), i = a.uniq(i, !0, "name");
    for (var c = "", f = 0; f < i.length; f++) i[f] && i[f].name && i[f].value && (c += i[f].name + "=" + i[f].value, 
    f < i.length - 1 && (c += "&"));
    return o = r(c + (n = n || getApp().siteInfo.token));
}

util.base64Encode = function(e) {
    return (0, _base.base64_encode)(e);
}, util.base64Decode = function(e) {
    return (0, _base.base64_decode)(e);
}, util.md5 = function(e) {
    return (0, _md2.default)(e);
}, util.url = function(e, t) {
    var n = getApp(), a = n.siteInfo.siteroot + "?i=" + n.siteInfo.uniacid + "&t=" + n.siteInfo.multiid + "&v=" + n.siteInfo.version + "&from=wxapp&";
    if (e && ((e = e.split("/"))[0] && (a += "c=" + e[0] + "&"), e[1] && (a += "a=" + e[1] + "&"), 
    e[2] && (a += "do=" + e[2] + "&")), t && "object" === (void 0 === t ? "undefined" : _typeof(t))) for (var r in t) r && t.hasOwnProperty(r) && t[r] && (a += r + "=" + t[r] + "&");
    return a;
}, util.getSign = function(e, t, n) {
    return getSign(e, t, n);
}, util.request = function(a) {
    require("underscore.js");
    var e, t = require("md5.js"), r = getApp();
    (a = a || {}).cachetime = a.cachetime ? a.cachetime : 0, a.showLoading = void 0 === a.showLoading || a.showLoading;
    var n = wx.getStorageSync("userInfo").sessionid, i = a.url;
    if (-1 == i.indexOf("http://") && -1 == i.indexOf("https://") && (i = util.url(i)), 
    getUrlParam(i, "state") || a.data && a.data.state || !n || (i = i + "&state=we7sid-" + n), 
    !a.data || !a.data.m) {
        var o = getCurrentPages();
        o.length && (o = o[getCurrentPages().length - 1]) && o.__route__ && (i = i + "&m=" + o.__route__.split("/")[0]);
    }
    var s = getSign(i, a.data);
    if (s && (i = i + "&sign=" + s), !i) return !1;
    if (wx.showNavigationBarLoading(), a.showLoading && util.showLoading(), a.cachetime) {
        var u = t(i), c = wx.getStorageSync(u), f = Date.parse(new Date());
        if (c && c.data) {
            if (c.expire > f) return a.complete && "function" == typeof a.complete && a.complete(c), 
            a.success && "function" == typeof a.success && a.success(c), console.log("cache:" + i), 
            wx.hideLoading(), wx.hideNavigationBarLoading(), !0;
            wx.removeStorageSync(u);
        }
    }
    wx.request((_defineProperty(e = {
        url: i,
        data: a.data ? a.data : {},
        header: a.header ? a.header : {},
        method: a.method ? a.method : "GET"
    }, "header", {
        "content-type": "application/x-www-form-urlencoded"
    }), _defineProperty(e, "success", function(e) {
        if (wx.hideNavigationBarLoading(), wx.hideLoading(), e.data.errno) {
            if ("41009" == e.data.errno) return wx.setStorageSync("userInfo", ""), void util.getUserInfo(function() {
                util.request(a);
            });
            if (a.fail && "function" == typeof a.fail) a.fail(e); else if (e.data.message) {
                if (null != e.data.data && e.data.data.redirect) var t = e.data.data.redirect; else t = "";
                r.util.message(e.data.message, t, "error");
            }
        } else if (a.success && "function" == typeof a.success && a.success(e), a.cachetime) {
            var n = {
                data: e.data,
                expire: f + 1e3 * a.cachetime
            };
            wx.setStorageSync(u, n);
        }
    }), _defineProperty(e, "fail", function(e) {
        wx.hideNavigationBarLoading(), wx.hideLoading();
        var t = require("md5.js")(i), n = wx.getStorageSync(t);
        if (n && n.data) return a.success && "function" == typeof a.success && a.success(n), 
        console.log("failreadcache:" + i), !0;
        a.fail && "function" == typeof a.fail && a.fail(e);
    }), _defineProperty(e, "complete", function(e) {
        a.complete && "function" == typeof a.complete && a.complete(e);
    }), e));
}, util.getWe7User = function(t, e) {
    var n = wx.getStorageSync("userInfo") || {};
    util.request({
        url: "auth/session/openid",
        data: {
            code: e || ""
        },
        cachetime: 0,
        showLoading: !1,
        success: function(e) {
            e.data.errno || (n.sessionid = e.data.data.sessionid, n.memberInfo = e.data.data.userinfo, 
            wx.setStorageSync("userInfo", n)), "function" == typeof t && t(n);
        }
    });
}, util.upadteUser = function(e, t) {
    var n = wx.getStorageSync("userInfo");
    if (!e) return "function" == typeof t && t(n);
    n.wxInfo = e.userInfo, util.request({
        url: "auth/session/userinfo",
        data: {
            signature: e.signature,
            rawData: e.rawData,
            iv: e.iv,
            encryptedData: e.encryptedData
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        cachetime: 0,
        success: function(e) {
            e.data.errno || (n.memberInfo = e.data.data, wx.setStorageSync("userInfo", n)), 
            "function" == typeof t && t(n);
        }
    });
}, util.checkSession = function(t) {
    util.request({
        url: "auth/session/check",
        method: "POST",
        cachetime: 0,
        showLoading: !1,
        success: function(e) {
            e.data.errno ? "function" == typeof t.fail && t.fail() : "function" == typeof t.success && t.success();
        },
        fail: function() {
            "function" == typeof t.fail && t.fail();
        }
    });
}, util.getUserInfo = function(t, n) {
    var e = function() {
        console.log("start login");
        wx.login({
            success: function(e) {
                util.getWe7User(function(e) {
                    n ? util.upadteUser(n, function(e) {
                        "function" == typeof t && t(e);
                    }) : wx.canIUse("getUserInfo") ? wx.getUserInfo({
                        withCredentials: !0,
                        success: function(e) {
                            util.upadteUser(e, function(e) {
                                "function" == typeof t && t(e);
                            });
                        },
                        fail: function() {
                            "function" == typeof t && t(e);
                        }
                    }) : "function" == typeof t && t(e);
                }, e.code);
            },
            fail: function() {
                wx.showModal({
                    title: "获取信息失败",
                    content: "请允许授权以便为您提供给服务",
                    success: function(e) {
                        e.confirm && util.getUserInfo();
                    }
                });
            }
        });
    }, a = wx.getStorageSync("userInfo") || {};
    a.sessionid ? util.checkSession({
        success: function() {
            n ? util.upadteUser(n, function(e) {
                "function" == typeof t && t(e);
            }) : "function" == typeof t && t(a);
        },
        fail: function() {
            a.sessionid = "", console.log("relogin"), wx.removeStorageSync("userInfo"), e();
        }
    }) : e();
}, util.navigateBack = function(t) {
    var e = t.delta ? t.delta : 1;
    if (t.data) {
        var n = getCurrentPages(), a = n[n.length - (e + 1)];
        a.pageForResult ? a.pageForResult(t.data) : a.setData(t.data);
    }
    wx.navigateBack({
        delta: e,
        success: function(e) {
            "function" == typeof t.success && t.success(e);
        },
        fail: function(e) {
            "function" == typeof t.fail && t.fail(e);
        },
        complete: function() {
            "function" == typeof t.complete && t.complete();
        }
    });
}, util.footer = function(e) {
    var t = e, n = getApp().tabBar;
    for (var a in n.list) n.list[a].pageUrl = n.list[a].pagePath.replace(/(\?|#)[^"]*/g, "");
    t.setData({
        tabBar: n,
        "tabBar.thisurl": t.__route__
    });
}, util.message = function(e, t, n) {
    if (!e) return !0;
    if ("object" == (void 0 === e ? "undefined" : _typeof(e)) && (t = e.redirect, n = e.type, 
    e = e.title), t) {
        var a = t.substring(0, 9), r = "", i = "";
        "navigate:" == a ? (i = "navigateTo", r = t.substring(9)) : "redirect:" == a ? (i = "redirectTo", 
        r = t.substring(9)) : (r = t, i = "redirectTo");
    }
    console.log(r), n || (n = "success"), "success" == n ? wx.showToast({
        title: e,
        icon: "success",
        duration: 2e3,
        mask: !!r,
        complete: function() {
            r && setTimeout(function() {
                wx[i]({
                    url: r
                });
            }, 1800);
        }
    }) : "error" == n && wx.showModal({
        title: "系统信息",
        content: e,
        showCancel: !1,
        complete: function() {
            r && wx[i]({
                url: r
            });
        }
    });
}, util.user = util.getUserInfo, util.showLoading = function() {}, util.showImage = function(e) {
    var t = e ? e.currentTarget.dataset.preview : "";
    if (!t) return !1;
    wx.previewImage({
        urls: [ t ]
    });
}, util.parseContent = function(e) {
    if (!e) return e;
    var t = e.match(new RegExp([ "\ud83c[\udf00-\udfff]", "\ud83d[\udc00-\ude4f]", "\ud83d[\ude80-\udeff]" ].join("|"), "g"));
    if (t) for (var n in t) e = e.replace(t[n], "[U+" + t[n].codePointAt(0).toString(16).toUpperCase() + "]");
    return e;
}, util.date = function() {
    this.isLeapYear = function(e) {
        return 0 == e.getYear() % 4 && (e.getYear() % 100 != 0 || e.getYear() % 400 == 0);
    }, this.dateToStr = function(e, t) {
        e = e || "yyyy-MM-dd HH:mm:ss", t = t || new Date();
        var n = e;
        return n = (n = (n = (n = (n = (n = (n = (n = (n = (n = (n = (n = (n = n.replace(/yyyy|YYYY/, t.getFullYear())).replace(/yy|YY/, 9 < t.getYear() % 100 ? (t.getYear() % 100).toString() : "0" + t.getYear() % 100)).replace(/MM/, 9 < t.getMonth() ? t.getMonth() + 1 : "0" + (t.getMonth() + 1))).replace(/M/g, t.getMonth())).replace(/w|W/g, [ "日", "一", "二", "三", "四", "五", "六" ][t.getDay()])).replace(/dd|DD/, 9 < t.getDate() ? t.getDate().toString() : "0" + t.getDate())).replace(/d|D/g, t.getDate())).replace(/hh|HH/, 9 < t.getHours() ? t.getHours().toString() : "0" + t.getHours())).replace(/h|H/g, t.getHours())).replace(/mm/, 9 < t.getMinutes() ? t.getMinutes().toString() : "0" + t.getMinutes())).replace(/m/g, t.getMinutes())).replace(/ss|SS/, 9 < t.getSeconds() ? t.getSeconds().toString() : "0" + t.getSeconds())).replace(/s|S/g, t.getSeconds());
    }, this.dateAdd = function(e, t, n) {
        switch (n = n || new Date(), e) {
          case "s":
            return new Date(n.getTime() + 1e3 * t);

          case "n":
            return new Date(n.getTime() + 6e4 * t);

          case "h":
            return new Date(n.getTime() + 36e5 * t);

          case "d":
            return new Date(n.getTime() + 864e5 * t);

          case "w":
            return new Date(n.getTime() + 6048e5 * t);

          case "m":
            return new Date(n.getFullYear(), n.getMonth() + t, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds());

          case "y":
            return new Date(n.getFullYear() + t, n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds());
        }
    }, this.dateDiff = function(e, t, n) {
        switch (e) {
          case "s":
            return parseInt((n - t) / 1e3);

          case "n":
            return parseInt((n - t) / 6e4);

          case "h":
            return parseInt((n - t) / 36e5);

          case "d":
            return parseInt((n - t) / 864e5);

          case "w":
            return parseInt((n - t) / 6048e5);

          case "m":
            return n.getMonth() + 1 + 12 * (n.getFullYear() - t.getFullYear()) - (t.getMonth() + 1);

          case "y":
            return n.getFullYear() - t.getFullYear();
        }
    }, this.strToDate = function(dateStr) {
        var data = dateStr, reCat = /(\d{1,4})/gm, t = data.match(reCat);
        return t[1] = t[1] - 1, eval("var d = new Date(" + t.join(",") + ");"), d;
    }, this.strFormatToDate = function(e, t) {
        var n = 0, a = -1, r = t.length;
        -1 < (a = e.indexOf("yyyy")) && a < r && (n = t.substr(a, 4));
        var i = 0;
        -1 < (a = e.indexOf("MM")) && a < r && (i = parseInt(t.substr(a, 2)) - 1);
        var o = 0;
        -1 < (a = e.indexOf("dd")) && a < r && (o = parseInt(t.substr(a, 2)));
        var s = 0;
        (-1 < (a = e.indexOf("HH")) || 1 < (a = e.indexOf("hh"))) && a < r && (s = parseInt(t.substr(a, 2)));
        var u = 0;
        -1 < (a = e.indexOf("mm")) && a < r && (u = t.substr(a, 2));
        var c = 0;
        return -1 < (a = e.indexOf("ss")) && a < r && (c = t.substr(a, 2)), new Date(n, i, o, s, u, c);
    }, this.dateToLong = function(e) {
        return e.getTime();
    }, this.longToDate = function(e) {
        return new Date(e);
    }, this.isDate = function(e, t) {
        null == t && (t = "yyyyMMdd");
        var n = t.indexOf("yyyy");
        if (-1 == n) return !1;
        var a = e.substring(n, n + 4), r = t.indexOf("MM");
        if (-1 == r) return !1;
        var i = e.substring(r, r + 2), o = t.indexOf("dd");
        if (-1 == o) return !1;
        var s = e.substring(o, o + 2);
        return !(!isNumber(a) || "2100" < a || a < "1900") && (!(!isNumber(i) || "12" < i || i < "01") && !(s > getMaxDay(a, i) || s < "01"));
    }, this.getMaxDay = function(e, t) {
        return 4 == t || 6 == t || 9 == t || 11 == t ? "30" : 2 == t ? e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? "29" : "28" : "31";
    }, this.isNumber = function(e) {
        return /^\d+$/g.test(e);
    }, this.toArray = function(e) {
        e = e || new Date();
        var t = Array();
        return t[0] = e.getFullYear(), t[1] = e.getMonth(), t[2] = e.getDate(), t[3] = e.getHours(), 
        t[4] = e.getMinutes(), t[5] = e.getSeconds(), t;
    }, this.datePart = function(e, t) {
        t = t || new Date();
        var n = "";
        switch (e) {
          case "y":
            n = t.getFullYear();
            break;

          case "M":
            n = t.getMonth() + 1;
            break;

          case "d":
            n = t.getDate();
            break;

          case "w":
            n = [ "日", "一", "二", "三", "四", "五", "六" ][t.getDay()];
            break;

          case "ww":
            n = t.WeekNumOfYear();
            break;

          case "h":
            n = t.getHours();
            break;

          case "m":
            n = t.getMinutes();
            break;

          case "s":
            n = t.getSeconds();
        }
        return n;
    }, this.maxDayOfDate = function(e) {
        (e = e || new Date()).setDate(1), e.setMonth(e.getMonth() + 1);
        var t = e.getTime() - 864e5;
        return new Date(t).getDate();
    };
}, module.exports = util;