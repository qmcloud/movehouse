Page({
    data: {
        src: "/images/kg_bg.jpg",
        btnSrc: "/images/rename_btn.png",
        title: "小程序升级"
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    openKgMiniApp: function() {
        wx.navigateToMiniProgram({
            appId: "wx4cf3a49a9f3f8462",
            path: "pages/beforeOrder/mkOrder/mkOrder",
            success: function(n) {}
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(n) {
        return "button" === n.from && console.log(n.target), {
            title: "深圳鸿途搬家",
            path: "/pages/moveHouse/index",
            imageUrl: "/images/bj_share.png"
        };
    }
});