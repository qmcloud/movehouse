var _driver = require("../../../modules/driver"), driverModule = new _driver.driver(), app = getApp();

Page({
    data: {
        time: 60,
        phone: 0,
        code: 0
    },
    onLoad: function(e) {},
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    confirm: function() {
        var e = this.data.phone, n = this.data.code;
        return e ? /^1(3|4|5|6|7|8|9)\d{9}$/.test(e) ? void driverModule.updatePhone({
            mobile: e,
            code: n
        }).then(function(e) {
            app.hint("修改成功~"), wx.navigateBack({
                delta: 1
            });
        }, function(e) {}) : app.hint("请填写正确的手机号~") : app.hint("号码不能为空~");
    },
    sendCode: function() {
        var t = this, e = this.data.phone;
        if (!e) return app.hint("号码不能为空~");
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(e)) return app.hint("请填写正确的手机号~");
        var i = setInterval(function() {
            var e = t.data.time - 1, n = !0;
            e <= 0 && (clearInterval(i), n = !1, e = 60), t.setData({
                time: e,
                time_switch: n
            });
        }, 1e3);
        driverModule.sendCode({
            mobile: e
        }).then(function(e) {
            app.hint("发送成功~");
        }, function(e) {});
    },
    phone: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    code: function(e) {
        this.setData({
            code: e.detail.value
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    }
});