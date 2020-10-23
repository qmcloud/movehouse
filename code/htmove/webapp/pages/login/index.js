var e = require("../../utils/util.js").bPhone, t = require("../../utils/xhr.js"), o = t.getCode, i = (t.login, 
require("../../utils/config.js").bu), n = require("../../utils/login.js").getLogin, a = require("../../utils/service.js").fufillPath, s = new (getApp().globalData.tracker)();

Page({
    data: {
        active: !1,
        codeTip: "获取验证码",
        vCode: "",
        title: "登录快狗打车"
    },
    onLoad: function(e) {
        this.source = e.source, console.log("页面上一级来源", this.source);
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        this.setData({
            vCode: ""
        }), s.setPageView("log_in", "login_code"), this.getCode(), this.timer = setInterval(function() {
            e.getCode();
        }, 27e4), this.enterStamp = new Date().getTime();
    },
    onHide: function() {
        s.setPageEvent({
            event_id: "native_load",
            length_stay: new Date().getTime() - this.enterStamp
        }, "native_load", {
            page_type: "log_in",
            page_name: "login_code"
        }), this.timer && clearInterval(this.timer);
    },
    onUnload: function() {
        s.setPageEvent({
            event_id: "native_load",
            length_stay: new Date().getTime() - this.enterStamp
        }, "native_load", {
            page_type: "log_in",
            page_name: "login_code"
        }), this.timer && clearInterval(this.timer);
    },
    getCode: function() {
        var e = this;
        wx.login({
            success: function(t) {
                t.code ? e.loginCode = t.code : console.log("微信登录失败！" + t.errMsg);
            },
            fail: function(e) {
                console.log("微信登录失败！" + e);
            }
        });
    },
    onInputPhone: function(t) {
        var o = t.detail.value;
        e(o) && (this.phone = o, this.setData({
            active: !0
        }));
    },
    onTapVertifyCode: function(e) {
        this.setData({
            active: !0
        });
        var t = e.detail.value;
        this.code = t;
    },
    onTapGetCode: function() {
        this.data.active && (console.log("获取验证码"), this.updetateTip(), this.getVertifyCode());
    },
    onTapCancel: function() {
        var e = "/pages/whenOrder/pages/loginType/loginType";
        this.source && (e = e + "?source=" + this.source), wx.redirectTo({
            url: e
        });
    },
    onTapLogin: function() {
        this.data.active ? this.code && 4 == this.code.length ? (this.loginByCode(), s.setPageEvent({
            event_id: "click_to_login"
        }, "click", {
            page_type: "log_in",
            page_name: "login_code"
        })) : wx.showToast({
            title: "请输入正确的验证码",
            icon: "none"
        }) : wx.showToast({
            title: "请输入正确的手机号",
            icon: "none"
        });
    },
    loginByCode: function() {
        var e = this, t = {
            code: this.loginCode,
            loginType: 1,
            mobile: this.phone,
            smsCode: this.code
        };
        n(t, function(t) {
            if (console.log("getLogin", t), "moveHouse" == e.source) {
                var o = a(e.source);
                wx.navigateTo({
                    url: o,
                    success: function(e) {
                        e.eventChannel.emit("loginSuc", {
                            data: t
                        });
                    }
                });
            }
            s.setPageEvent({
                event_id: "login_successful_20181212145413287603",
                login_type: 1,
                new_account: t.isNewUser
            });
        }, function() {
            clearInterval(e.timer), e.getCode(), e.timer = setInterval(function() {
                e.getCode();
            }, 27e4);
        });
    },
    updetateTip: function() {
        var e = this, t = 60;
        this.setData({
            active: !1,
            codeTip: t + "s"
        });
        var o = setInterval(function() {
            if (--t < 0) return clearInterval(o), void e.setData({
                active: !0,
                codeTip: "获取验证码"
            });
            e.setData({
                codeTip: t + "s"
            });
        }, 1e3);
    },
    getVertifyCode: function() {
        var e = {
            mobile: this.phone,
            bu: i
        };
        o({
            data: e,
            tip: !1
        }).then(function(e) {
            console.log("获取验证码成功");
        }).catch(function(e) {
            console.log("获取验证码失败", e), 63 == e.data.code ? wx.showToast({
                title: "您今日验证码发送次数已达上限",
                icon: "none"
            }) : wx.showToast({
                title: "网络异常，请稍后重试～",
                icon: "none"
            });
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