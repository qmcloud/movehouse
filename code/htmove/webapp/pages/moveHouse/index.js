var o = require("../../utils/config.js"), t = o.env, e = o.moveHouseH5, n = o.storageKey, a = require("../../utils/util.js"), r = a.UserInfo, c = a.obj2Query, i = require("../../utils/API.js").PASSPORT_MID_URL;

Page({
    data: {
        src: "https://www.58hongtu.com/index/index/home"
    },
    onLoad: function(o) {
        var a = this, s = getApp().globalData.query.hmsr || "", l = this.getOpenerEventChannel(), u = r.getSerializeParams() || JSON.stringify({
            mobile: ""
        }), d = "", f = wx.getStorageSync(n.localCity);
        f && f.cityId && (d = f.cityId);
        var g = "".concat(e[t], "?wxUserInfo=").concat(u, "&hmsr=").concat(s, "&realcityid=").concat(d);
        o && c(o), console.log("onLoad:tempBanJiaUrl", g), l.hasOwnProperty("on") ? l.on("loginSuc", function(o) {
            console.log("moveHouse:onLoad", o);
            var t = o.data, e = t.djfrttok, n = t.djfrtuid, r = t.djfrtexp, c = "".concat(i, "?djfrttok=").concat(e, "&djfrtuid=").concat(n, "&djfrtexp=").concat(r, "&djfrtthsource=webChat&redirectUrl=").concat(g);
            console.log("moveHouse:onload:tempUrl", c), a.setData({
                src: c
            });
        }) : this.setData({
            src: g
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(o) {
        return "button" === o.from && console.log(o.target), {
            title: "快狗打车 搬家",
            path: "/pages/moveHouse/index",
            imageUrl: "/images/bj_share.png"
        };
    }
});