var _home = require("../../modules/home"), homeModule = new _home.home(), app = getApp();

Page({
    data: {
        speed: 5,
        service: 5,
        synthesize: 5,
        suggest: "",
        status: 5,
        order_id: 0,
        driver_id: 0
    },
    onLoad: function(t) {
        var e = this, s = t.driver_id, a = t.status, i = t.order_id;
        this.setData({
            driver_id: s,
            status: a,
            order_id: i
        }), 5 == a && homeModule.evaluate({
            driver_id: s,
            status: a,
            order_id: i
        }).then(function(t) {
            e.setData({
                synthesize: parseInt(t.score),
                service: parseInt(t.score1),
                speed: parseInt(t.score2),
                suggest: t.suggest
            });
        }, function(t) {});
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    confirm: function() {
        var e = this;
        homeModule.evaluate({
            score: this.data.synthesize,
            score1: this.data.service,
            score2: this.data.speed,
            order_id: this.data.order_id,
            driver_id: this.data.driver_id,
            suggest: this.data.suggest
        }).then(function(t) {
            app.hint("评价成功~"), e.setData({
                status: 5
            }), wx.setStorageSync("evaluate", 1);
        }, function(t) {});
    },
    serviceStar: function(t) {
        if (5 != this.data.status) {
            var e = t.currentTarget.dataset.id + 1;
            this.setData({
                service: e
            });
        }
    },
    speedStar: function(t) {
        if (5 != this.data.status) {
            var e = t.currentTarget.dataset.id + 1;
            this.setData({
                speed: e
            });
        }
    },
    synthesizeStar: function(t) {
        if (5 != this.data.status) {
            var e = t.currentTarget.dataset.id + 1;
            this.setData({
                synthesize: e
            });
        }
    },
    suggest: function(t) {
        this.setData({
            suggest: t.detail.value
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