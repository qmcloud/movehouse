var _driver = require("../../../modules/driver"), driverModule = new _driver.driver(), app = getApp();

Page({
    data: {
        my_money: 0,
        money: 0
    },
    onLoad: function(n) {
        this.getMoney();
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    allMoney: function() {
        this.setData({
            money: this.data.my_money
        });
    },
    withdraw: function() {
        var e = this, t = this.data.money;
        if (!t) return app.hint("提现的金额不能为0~");
        driverModule.withdraw({
            amount: t
        }).then(function(n) {
            app.hint("提现成功"), e.setData({
                my_money: e.data.my_money - t,
                money: ""
            });
        }, function(n) {});
    },
    callTel: function(n) {
        wx.makePhoneCall({
            phoneNumber: app.globalData.syStem.service_tel
        });
    },
    getMoney: function() {
        var e = this;
        driverModule.myMoney().then(function(n) {
            e.setData({
                my_money: n.balance
            });
        }, function(n) {});
    },
    money: function(n) {
        var e = n.detail.value;
        this.setData({
            money: e
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    },
    priceDetail: function() {
        wx.navigateTo({
            url: "../balance_detail/balance_detail"
        });
    }
});