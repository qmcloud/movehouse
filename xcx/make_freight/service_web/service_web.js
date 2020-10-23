var _home = require("../../modules/home"), homeModule = new _home.home(), app = getApp();

Page({
    data: {
        list: []
    },
    onLoad: function(e) {
        var n = this;
        homeModule.serverWeb().then(function(e) {
            n.setData({
                list: e
            });
        }, function(e) {});
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    callTel: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
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