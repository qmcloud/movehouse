var _home = require("../../modules/home"), homeModule = new _home.home(), app = getApp();

Component({
    properties: {
        new_person: {
            type: Object
        }
    },
    data: {},
    methods: {
        getRed: function(e) {
            var o = this, n = e.currentTarget.dataset.id;
            homeModule.conversionCoupon({
                coupon_id: n
            }).then(function(e) {
                wx.navigateTo({
                    url: "../coupon/coupon"
                }), app.hint("领取成功~"), o.triggerEvent("closeIndexImg", "", "");
            }, function(e) {
                o.triggerEvent("closeIndexImg", "", "");
            });
        },
        closeIndex: function() {
            this.triggerEvent("closeIndexImg", "", "");
        }
    }
});