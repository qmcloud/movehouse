var app = getApp(), backApp = function(e) {
    if (e) try {
        wx.setStorageSync("we7_webview", e);
    } catch (e) {
        console.log(e);
    }
    var t = getCurrentPages();
    if (1 < t.length) for (var r in t) "wn_storex/pages/view/index" === t[r].__route__ && wx.navigateBack({
        data: t.length - r + 1
    });
}, urlAddCode = function(n) {
    var e = wx.getStorageSync("userInfo"), t = function(e) {
        var t = getQueryString(n, "state");
        n.indexOf("http") || t || (n = n.replace(/index.php\?/, "index.php?from=wxapp&state=we7sid-" + e.sessionid + "&"));
        var r = getCurrentPages();
        r && (r = r[getCurrentPages().length - 1]), r.setData({
            url: n
        });
    };
    e.sessionid ? t(e) : app.util.getUserInfo(t);
};

function getQueryString(e, t) {
    e = e.replace(/(#\/)(.*)/, "");
    var r = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"), n = e.match(r);
    return null !== n ? unescape(n[2]) : null;
}

module.exports = {
    backApp: backApp,
    urlAddCode: urlAddCode
};