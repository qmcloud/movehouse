var _driver = require("../../../modules/driver"), driverModule = new _driver.driver(), app = getApp();

Page({
    data: {
        list: [],
        cur: 0,
        idx: -1,
        id_car: "",
        id_card: "",
        name: "",
        phone: "",
        photos: [],
        upload_photos: [],
        type: 0
    },
    onLoad: function(t) {
        var a = t.type ? 1 : 0, e = t.name ? t.name : 0;
        this.cartype(e), 1 == a && (wx.setNavigationBarTitle({
            title: "司机信息"
        }), this.getDriverMsg(a));
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    getDriverMsg: function(a) {
        var e = this;
        driverModule.driverMsg().then(function(t) {
            e.setData({
                type: a,
                photos: t.image_url,
                upload_photos: t.image,
                name: t.driver_name,
                phone: t.driver_phone,
                id_car: t.plate_number,
                id_card: t.driver_IDcard
            });
        }, function(t) {});
    },
    confirm: function() {
        var t = this.data.name, a = this.data.phone, e = this.data.id_card, i = this.data.id_car;
        if (!t) return app.hint("姓名不能为空~");
        if (!a) return app.hint("手机号不能为空~");
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(a)) return app.hint("请填写正确的手机号~");
        if (!e) return app.hint("身份证号不能为空~");
        if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e)) return app.hint("身份证号码输入有误~");
        if (!i) return app.hint("车牌号不能为空~");
        var n = this.data.list, r = this.data.idx;
        if (r < 0) return app.hint("请选择车型~");
        var o = this.data.upload_photos;
        return o[0] ? o[1] ? o[2] ? o[3] ? o[6] ? void driverModule.register({
            name: t,
            phone: a,
            IDcard: e,
            plate_number: i,
            car_id: n[r].id,
            front_IDcard: o[0],
            contrary_IDcard: o[1],
            photo: o[2],
            drivers_license: o[3],
            car_image: o[6]
        }).then(function(t) {
            wx.switchTab({
                url: "../info/info"
            }), app.hint("提交成功,需要等待审核~");
        }, function(t) {}) : app.hint("请上传车身正面~") : app.hint("请上传行驶证~") : app.hint("请上传个人自拍~") : app.hint("请上传身份证反面~") : app.hint("请上传身份证正面~");
    },
    cartype: function(i) {
        var a = this;
        driverModule.carType().then(function(t) {
            var e = -1;
            0 < t.length && t.forEach(function(t, a) {
                t.title == i && (e = a);
            }), a.setData({
                list: t,
                idx: e
            });
        }, function(t) {});
    },
    photoFrom: function(t) {
        var i = this, n = t.currentTarget.dataset.idx;
        wx.chooseImage({
            count: 1,
            sizeType: "compressed",
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var a = i.data.photos, e = t.tempFilePaths[0];
                a[n] = e, i.uploadImg(e, n), i.setData({
                    photos: a
                });
            }
        });
    },
    uploadImg: function(t, e) {
        var i = this, a = app.util.url("entry/wxapp/uploadImage", {
            m: "make_freight"
        });
        wx.uploadFile({
            url: a,
            filePath: t,
            header: {
                "Content-Type": "multipart/form-data"
            },
            name: "image",
            success: function(t) {
                var a = JSON.parse(t.data);
                i.data.upload_photos[e] = a.data;
            }
        });
    },
    name: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    phone: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    idCard: function(t) {
        this.setData({
            id_card: t.detail.value
        });
    },
    idCar: function(t) {
        this.setData({
            id_car: t.detail.value
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    },
    selected: function(t) {
        var a = t.currentTarget.dataset.idx;
        this.setData({
            idx: a
        });
    }
});