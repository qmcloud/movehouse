var app = getApp();

Page({
    data: {
        status: 1,
        create_time: "",
        driver_time: "",
        getgoods_time: "",
        end_time: ""
    },
    onLoad: function(t) {
        this.setData({
            status: t.status ? t.status : 4,
            create_time: t.create_time,
            driver_time: t.driver_time,
            getgoods_time: t.getgoods_time,
            end_time: t.end_time
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