var _home = require("../../modules/home"), homeModule = new _home.home(), app = getApp();

Page({
    data: {
        list: [],
        idx: -1
    },
    onLoad: function(e) {
        var n = this;
        homeModule.getQuestion().then(function(e) {
            n.setData({
                list: e
            });
        }, function(e) {});
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    lookQuestion: function(e) {
        var n = e.currentTarget.dataset.idx;
        n == this.data.idx && (n = -1), this.setData({
            idx: n
        });
    },
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: app.globalData.syStem.service_tel
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