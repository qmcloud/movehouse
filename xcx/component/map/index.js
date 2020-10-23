var _address = require("../../modules/address.js"), addressModule = new _address.address(), app = getApp();

Component({
    properties: {
        address_type: {
            type: Number,
            value: 0
        },
        order_type: {
            type: Number,
            value: 0
        },
        location: {
            type: Object,
            observer: function(t, e, a) {}
        }
    },
    data: {
        latitude: "",
        longitude: "",
        isLocation: 0,
        city: "",
        markers: [],
        scale: 14,
        search_page: 0
    },
    lifetimes: {
        attached: function() {
            var t = "", e = (t = 0 == wx.getStorageSync("address_type") ? wx.getStorageSync("fahuo") : wx.getStorageSync("shouhuo")).location;
            t && e.lat ? this.setData({
                latitude: e.lat,
                longitude: e.lng
            }) : this.location(), this.mapCtx = wx.createMapContext("map", this);
        },
        detached: function() {}
    },
    pageLifetimes: {
        show: function() {
            if (1 == app.globalData.search_address) {
                var t = "";
                t = 0 == wx.getStorageSync("address_type") ? wx.getStorageSync("fahuo_template") : wx.getStorageSync("shouhuo_template"), 
                this.setData({
                    search_page: 1,
                    latitude: t.location.lat,
                    longitude: t.location.lng
                }), app.globalData.search_address = 0;
            }
        },
        hide: function() {},
        resize: function(t) {}
    },
    methods: {
        location: function() {
            var e = this;
            addressModule.getLocation().then(function(t) {
                e.setData({
                    latitude: t.latitude,
                    longitude: t.longitude,
                    scale: 14
                }), wx.setStorageSync("isLocation", 1), e.getAddressDetail(t.latitude, t.longitude, 1);
            }, function(t) {
                wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userLocation"] || e.setLocationAuth();
                    }
                });
            });
        },
        setLocationAuth: function() {
            var e = this;
            wx.showModal({
                title: "地址授权请求",
                content: "我们需要获取您当前所在的位置",
                success: function(t) {
                    t.confirm ? wx.openSetting({
                        success: function(t) {}
                    }) : t.cancel && e.setLocationAuth();
                }
            });
        },
        regionchange: function(t) {
            "end" == t.type && (0 == this.data.search_page ? this.getLongitude() : this.setData({
                search_page: 0
            }));
        },
        getLongitude: function() {
            var e = this;
            this.mapCtx.getCenterLocation({
                success: function(t) {
                    e.getAddressDetail(t.latitude, t.longitude, 0);
                },
                fail: function(t) {}
            });
        },
        getAddressDetail: function(t, e) {
            var s = this;
            2 < arguments.length && void 0 !== arguments[2] && arguments[2];
            addressModule.getCity(t, e, 0, app.globalData.tmap).then(function(t) {
                var e = s.data.address_type, a = wx.getStorageSync("fahuo"), o = wx.getStorageSync("shouhuo");
                t.ad_info && !t.ad_info.city || 0 == e && a.id == t.id || 1 == e && o.id == t.id || (0 == e ? wx.setStorageSync("fahuo_template", t) : wx.setStorageSync("shouhuo_template", t), 
                s.triggerEvent("examineAddress", {
                    address_type: e
                }, {}));
            });
        },
        cityLocation: function(e) {
            var a = this;
            addressModule.getAddress("政府", e, app.globalData.syStem.tmap).then(function(t) {
                a.setData({
                    city: e,
                    longitude: t[0].location.lng,
                    latitude: t[0].location.lat
                });
                wx.setStorageSync("fahuo", t[0]), a.triggerEvent("getAddress", {
                    city: e,
                    tap_city: 1
                }, {});
            });
        }
    }
});