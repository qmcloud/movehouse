var app = getApp();

Page({
    data: {
        obj: {},
        id: 0
    },
    onLoad: function(a) {
        var t = "", o = a.id;
        0 < app.globalData.cargo_img.length && (t = app.globalData.cargo_img[o]), this.setData({
            id: o,
            obj: t
        });
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    confirm: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    upload: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: "compressed",
            sourceType: [ "album", "camera" ],
            success: function(a) {
                t.uploadImg(a.tempFilePaths[0]);
            }
        });
    },
    uploadImg: function(o) {
        var e = this, a = app.util.url("entry/wxapp/uploadImage", {
            m: "make_freight"
        });
        wx.uploadFile({
            url: a,
            filePath: o,
            header: {
                "Content-Type": "multipart/form-data"
            },
            name: "image",
            formData: {
                user: "test"
            },
            success: function(a) {
                a = JSON.parse(a.data);
                var t = {};
                t.temp = o, t.img = a.data, app.globalData.cargo_img[e.data.id] = t, e.setData({
                    obj: t
                });
            },
            fail: function(a) {},
            complete: function() {}
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