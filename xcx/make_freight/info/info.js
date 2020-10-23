var app = getApp();

Page({
    data: {},
    onLoad: function(e) {},
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    onHide: function() {},
    myOrder: function() {
        wx.navigateTo({
            url: "../order_list/order_list"
        });
    },
    Question: function() {
        wx.navigateTo({
            url: "../question/question"
        });
    },
    myCoupons: function() {
        wx.navigateTo({
            url: "../coupon/coupon"
        });
    },
    Feedback: function() {
        wx.navigateTo({
            url: "../feedback/feedback"
        });
    },
    callTel: function(e) {
        wx.makePhoneCall({
            phoneNumber: '075523318769'
        });
    },
    serviceWeb: function() {
        wx.navigateTo({
            url: "../service_web/service_web"
        });
    },
    We: function() {
        wx.navigateTo({
            url: "../we/we"
        });
    },
    myDriver: function(e) {
        app.saveFromId(e.detail.formId), wx.navigateTo({
            url: "../driver/home/home"
        });
    },
    Logout: function() {
        wx.reLaunch({
            url: "../auth/auth"
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    }
});