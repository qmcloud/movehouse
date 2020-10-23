var _ = require("../../../we7/resource/js/underscore.js"), md5 = require("../../../we7/resource/js/md5.js"), util = require("../../../we7/resource/js/util.js"), createurl = function(e) {
    getApp();
    var t = wx.getStorageSync("userInfo").sessionid, a = e.url;
    -1 == a.indexOf("http://") && -1 == a.indexOf("https://") && (a = util.url(a));
    getUrlParam(a, "state");
    a = a + "&state=we7sid-" + t;
    var n = getCurrentPages();
    n.length && (n = n[getCurrentPages().length - 1]) && n.__route__ && (a = a + "&m=" + n.__route__.split("/")[0]);
    var r = getSign(a, e.data);
    return r && (a = a + "&sign=" + r), a;
}, upload = function(t) {
    getApp();
    (t = t || {}).showLoading = void 0 === t.showLoading || t.showLoading;
    var e = wx.getStorageSync("userInfo").sessionid, a = t.url;
    -1 == a.indexOf("http://") && -1 == a.indexOf("https://") && (a = util.url(a));
    getUrlParam(a, "state");
    a = a + "&state=we7sid-" + e;
    var n = getCurrentPages();
    n.length && (n = n[getCurrentPages().length - 1]) && n.__route__ && (a = a + "&m=" + n.__route__.split("/")[0]);
    var r = getSign(a, t.data);
    if (r && (a = a + "&sign=" + r), !a) return !1;
    wx.showNavigationBarLoading(), t.showLoading && util.showLoading(), wx.uploadFile({
        url: a,
        filePath: t.file,
        name: t.name,
        success: function(e) {
            e.data = JSON.parse(e.data), wx.hideNavigationBarLoading(), wx.hideLoading(), t.success && "function" == typeof t.success && t.success(e);
        },
        fail: function(e) {
            wx.hideNavigationBarLoading(), wx.hideLoading(), e.data = JSON.parse(e.data), t.fail && "function" == typeof t.fail && t.fail(e);
        },
        complete: function(e) {
            t.complete && "function" == typeof t.complete && t.complete(e);
        }
    });
};

function getUrlParam(e, t) {
    var a = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = e.split("?")[1].match(a);
    return null != n ? unescape(n[2]) : null;
}

function getSign(e, t, a) {
    var n = "", r = getUrlParam(e, "sign");
    if (r || t && t.sign) return !1;
    if (e && (n = getQuery(e)), t) {
        var i = [];
        for (var s in t) s && t[s] && (i = i.concat({
            name: s,
            value: t[s]
        }));
        n = n.concat(i);
    }
    n = _.sortBy(n, "name"), n = _.uniq(n, !0, "name");
    for (var u = "", o = 0; o < n.length; o++) n[o] && n[o].name && n[o].value && (u += n[o].name + "=" + n[o].value, 
    o < n.length - 1 && (u += "&"));
    return a = a || getApp().siteInfo.token, r = md5(u + a);
}

function getQuery(e) {
    var t = [];
    if (-1 != e.indexOf("?")) for (var a = e.split("?")[1].split("&"), n = 0; n < a.length; n++) a[n].split("=")[0] && unescape(a[n].split("=")[1]) && (t[n] = {
        name: a[n].split("=")[0],
        value: unescape(a[n].split("=")[1])
    });
    return t;
}

module.exports = {
    upload: upload,
    createurl: createurl
};