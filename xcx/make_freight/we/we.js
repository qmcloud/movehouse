var _home = require("../../modules/home"), homeModule = new _home.home(), app = getApp();

Page({
    data: {
        list: {}
    },
    onLoad: function(n) {
        var e = this;
        homeModule.we().then(function(n) {
            e.setData({
                list: n
            }, function(n) {});
        });
    },
    callTel: function(n) {
        wx.makePhoneCall({
            phoneNumber: n.currentTarget.dataset.phone
        });
    },
    copy: function(n) {
        wx.setClipboardData({
            data: n.currentTarget.dataset.content,
            success: function(n) {
                app.hint("复制成功~");
            },
            fail: function(n) {}
        });
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    }
});