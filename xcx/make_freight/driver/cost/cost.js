var _driver = require("../../../modules/driver"), driverModule = new _driver.driver(), app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var e = this;
        driverModule.orderFee({
            order_id: n.id
        }).then(function(n) {
            e.setData({
                list: n
            }, function(n) {});
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