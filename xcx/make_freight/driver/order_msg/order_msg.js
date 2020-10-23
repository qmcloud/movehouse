var _driver = require("../../../modules/driver"), driverModule = new _driver.driver(), app = getApp();

Page({
    data: {
        list: {}
    },
    onLoad: function(e) {
        this.orderDetail(e.id);
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    orderDetail: function(e) {
        var n = this;
        driverModule.orderDetail({
            order_id: e
        }).then(function(e) {
            n.setData({
                list: e
            });
        }, function(e) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    }
});