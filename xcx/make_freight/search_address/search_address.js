var _address = require("../../modules/address.js"), addressModel = new _address.address(), app = getApp();

Page({
    data: {
        search_list_list: [],
        search: !1,
        no_search: !0,
        id: 0,
        no_data: !0,
        search_value: "",
        city: "",
        address_type: 0,
        img_url: app.globalData.img_url
    },
    onLoad: function(a) {
        this.setData({
            address_type: wx.getStorageSync("address_type")
        }), this.lookHistoryResort();
    },
    lookHistoryResort: function() {
        var a = wx.getStorageSync("history_list");
        a ? this.setData({
            history_list: a,
            search: !0,
            no_search: !1,
            no_data: !0
        }) : this.setData({
            search: !0,
            no_search: !0,
            no_data: !1
        });
    },
    clear: function() {
        this.setData({
            search_value: ""
        });
    },
    searchAddress: function(a) {
        var t = this, e = a.detail.value, s = "";
        s = 0 == this.data.address_type ? wx.getStorageSync("fahuo_template").ad_info.city : wx.getStorageSync("shouhuo_template").ad_info.city, 
        e && addressModel.getAddress(e, s, app.globalData.tmap).then(function(a) {
            t.setData({
                search_list: a,
                search: !1,
                no_search: !0,
                no_data: !0
            });
        }, function(a) {});
    },
    confirm: function(a) {
        var t = a.currentTarget.id, e = a.currentTarget.dataset.sid, s = this.data.address_type, o = this.data.search_list;
        addressModel.confirm(t, e, s, o), wx.navigateBack({
            delta: 1
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