var e = getApp();

Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function() {
        var o = this;
        e.globalData.userInfo ? this.setData({
            userInfo: e.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? e.userInfoReadyCallback = function(e) {
            o.setData({
                userInfo: e.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(s) {
                e.globalData.userInfo = s.userInfo, o.setData({
                    userInfo: s.userInfo,
                    hasUserInfo: !0
                });
            }
        });
    },
    getUserInfo: function(o) {
        console.log(o), e.globalData.userInfo = o.detail.userInfo, this.setData({
            userInfo: o.detail.userInfo,
            hasUserInfo: !0
        });
    },
    onShareAppMessage: function(e) {
        return "button" === e.from && console.log(e.target), {
            title: "深圳鸿途搬家",
            path: "/pages/moveHouse/index",
            imageUrl: "/images/bj_share.png"
        };
    }
});