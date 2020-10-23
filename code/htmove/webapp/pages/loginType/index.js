var e = require("../../utils/login.js").authorizeLogin, t = require("../../utils/service.js").fufillPath, a = require("../../utils/util.js"), n = a.UserInfo, i = a.obj2Query, o = new (getApp().globalData.tracker)(), s = null;

Page({
    data: {
        title: "登录快狗打车"
    },
    onLoad: function(e) {
        this.source = e.source, s = e, console.log("页面上一级来源", e.param, this.source), e.param && (this.estimateParam = JSON.parse(e.param)), 
        wx.setStorage({
            key: "eParam",
            data: this.estimateParam
        });
    },
    onShow: function() {
        var e = this;
        o.setPageView("log_in", "login_phone"), this.getCode(), this.timer = setInterval(function() {
            e.getCode();
        }, 27e4), this.enterStamp = new Date().getTime();
    },
    getCode: function() {
        var e = this;
        wx.login({
            success: function(t) {
                t.code && (e.code = t.code);
            }
        });
    },
    getPhoneNumber: function(e) {
        if (e.detail.encryptedData) {
            console.log("getPhoneNumber", e);
            var t = e.detail.iv, a = e.detail.encryptedData;
            this.loginByAuth(t, a), o.setPageEvent({
                event_id: "wechat_authorization"
            }, "click", {
                page_type: "log_in",
                page_name: "login_phone"
            }), wx.navigateBack({
                delta: 1
            });
        } else {
            var n = "/pages/moveHouse/index";
            this.source && (n = n + "?source=" + this.source), wx.redirectTo({
                url: n
            }), o.setPageEvent({
                event_id: "wechat_cancel_authorization"
            }, "click", {
                page_type: "log_in",
                page_name: "login_phone"
            });
        }
    },
    loginByAuth: function(a, r) {
        var l = this, g = {
            code: this.code,
            loginType: 2,
            mobileIv: a,
            mobileEncryptedData: r
        };
        e(g, function(e) {
            if (console.log("authorizeLogin", e), n.setInfo(n.mobileKey, e.mobile), l.source) {
                if ("moveHouse" == l.source) {
                    var a = t(l.source);
                    (s = {
                        aa: 1
                    }) && i(s), wx.navigateTo({
                        url: a,
                        success: function(t) {
                            t.eventChannel.emit("loginSuc", {
                                data: e
                            });
                        }
                    });
                }
            } else wx.navigateBack({
                delta: 1
            });
            o.setPageEvent({
                event_id: "login_successful_20181212145346218720",
                login_type: 2,
                new_account: e.isNewUser
            });
        }, function() {
            clearInterval(l.timer), l.getCode(), l.timer = setInterval(function() {
                l.getCode();
            }, 27e4);
        });
    },
    onHide: function() {
        clearInterval(this.timer), o.setPageEvent({
            event_id: "native_load",
            length_stay: new Date().getTime() - this.enterStamp
        }, "native_load", {
            page_type: "log_in",
            page_name: "login_phone"
        });
    },
    onUnload: function() {
        clearInterval(this.timer), o.setPageEvent({
            event_id: "native_load",
            length_stay: new Date().getTime() - this.enterStamp
        }, "native_load", {
            page_type: "log_in",
            page_name: "login_phone"
        });
    },
    onShareAppMessage: function(e) {
        return "button" === e.from && console.log(e.target), {
            title: "快狗打车 搬家",
            path: "/pages/moveHouse/index",
            imageUrl: "/images/bj_share.png"
        };
    }
});