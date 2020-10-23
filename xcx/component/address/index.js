var _home = require("../../modules/home"), _address = require("../../modules/address"), addressModule = new _address.address(), homeModule = new _home.home();

Component({
    properties: {
        fahuo: {
            type: Object
        },
        shouhuo: {
            type: Object
        },
        type: {
            type: Number
        }
    },
    data: {
        time_bg: !0,
        is_address: 0,
        xTime: {},
        isImmediately: 0
    },
    methods: {
        getAddress: function(e) {
            if (1 == this.data.type) {
                var t = e.currentTarget.dataset.id;
                wx.setStorageSync("address_type", t), wx.navigateTo({
                    url: "../address/address?address_type=" + t
                });
            }
        },
        getTime: function() {
            var d = this;
            homeModule.getTime().then(function(e) {
                var t = addressModule.date(e.days, e.hours, e.minutes);
                d.setData({
                    xTime: t,
                    time_bg: !1
                });
            }, function(e) {});
        },
        confirmTime: function(e) {
            this.setData({
                day: e.detail.day,
                hour: e.detail.hour,
                minute: e.detail.minute,
                isImmediately: e.detail.isImmediately,
                time_bg: !0
            }), "立即" != e.detail.hour ? wx.setStorageSync("time", e.detail.day + "" + e.detail.hour + "点" + e.detail.minute + "分") : wx.setStorageSync("time", e.detail.hour);
        },
        time_bg: function() {
            this.setData({
                time_bg: !0
            });
        }
    }
});