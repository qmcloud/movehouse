var _home = require("../../modules/home"), homeModule = new _home.home(), app = getApp();

Page({
    data: {
        question_list: [{title:"订单问题"},{title:"价格问题"},{title:"其他问题"}],
        idx: 0,
        img_temp: [],
        imgs: "",
        value: "",
        font_num: 0,
        phone: 0
    },
    onLoad: function(t) {
        this.quesionType();
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    confirm: function() {
        var e = this, t = this.data.question_list[this.data.idx].title, a = this.data.value;
        if (!a) return app.hint("反馈意见不能为空~");
        var n = this.data.imgs;

        wx.request({
            url: 'https://www.58hongtu.com/api/index/feedback', //接口地址
                  //method: "POST",
            data: {
                type: t,
                tel: this.data.phone,
                content: a,
            },
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
                app.hint("提交成功~");

            },fail: function (res) {
                app.hint("提交失败~");
            }
          })

        /*homeModule.feedback({
            name: t,
            contact: this.data.phone,
            content: a,
            image: n
        }).then(function(t) {
            e.setData({
                value: "",
                font_num: 0,
                img_temp: [],
                imgs: ""
            }), app.hint("提交成功~");
        }, function(t) {});*/
    },
    phone: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    quesionType: function() {
        var e = this;
        homeModule.questionType().then(function(t) {
            e.setData({
                question_list: t
            });
        }, function(t) {});
    },
    textArea: function(t) {
        var e = t.detail.value;
        this.setData({
            value: e,
            font_num: e.length
        });
    },
    selectType: function(t) {
        this.setData({
            idx: t.currentTarget.dataset.idx
        });
    },
    photoFrom: function(t) {
        var n = this;
        wx.chooseImage({
            count: 9,
            sizeType: "compressed",
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = n.data.img_temp, a = n.data.img_temp.length;
                if (2 < e.length + a) return app.hint("最多上传2张~");
                e = a ? e.concat(t.tempFilePaths) : t.tempFilePaths, n.setData({
                    img_temp: e
                }), n.uploadImg(e, a);
            }
        });
    },
    delImg: function(t) {
        var e = t.currentTarget.dataset.idx, a = this.data.img_temp, n = this.data.imgs;
        1 == a.length ? (a = [], n = "") : (a.splice(e, 1), (n = n.split(",")).splice(e, 1)), 
        this.setData({
            img_temp: a,
            imgs: n
        });
    },
    uploadImg: function(t) {
        var a = this, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, e = app.util.url("entry/wxapp/uploadImage", {
            m: "make_freight"
        });
        wx.uploadFile({
            url: e,
            filePath: t[n],
            header: {
                "Content-Type": "multipart/form-data"
            },
            name: "image",
            formData: {
                user: "test"
            },
            success: function(t) {
                console.log(n), t = JSON.parse(t.data);
                var e = 0 == n ? t.data : a.data.imgs + "," + t.data;
                a.setData({
                    imgs: e
                });
            },
            fail: function(t) {
                console.log("上传失败" + n);
            },
            complete: function() {
                n == t.length - 1 ? console.log("上传成功") : a.uploadImg(t, ++n);
            }
        });
    },
    preImg: function(t) {
        var e = this.data.img_temp;
        wx.previewImage({
            current: e[t.currentTarget.dataset.idx],
            urls: e
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