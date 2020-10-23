var _home = require("../../modules/home.js"), homeModule = new _home.home();

Component({
    properties: {
        data: {
            type: Object,
            value: {}
        },
        myCity: {
            type: String,
            value: "上海"
        },
        search: {
            type: String,
            value: "",
            observer: function(t, e) {
                this.value = t, this.searchMt();
            }
        }
    },
    data: {
        list: [],
        rightArr: [],
        jumpNum: "",
        myCityName: "北京"
    },
    ready: function() {
        var e = this;
        homeModule.getCity("city").then(function(t) {
            e.resetRight(t), e.data.myCity && e.getCity();
        }, function(t) {});
    },
    methods: {
        resetRight: function(t) {
            var e = [];
            for (var a in t) e.push(t[a].title.substr(0, 1));
            this.setData({
                list: t,
                rightArr: e
            });
        },
        getCity: function() {
            var i = this;
            wx.getLocation({
                type: "gcj02",
                success: function(t) {
                    var e = t.longitude, a = t.latitude;
                    wx.request({
                        url: "https://apis.map.qq.com/ws/geocoder/v1/?location=" + a + "," + e + "&key=4ODBZ-P2XWO-56NW7-SF2NY-6YFF3-GDBGE",
                        data: {},
                        header: {
                            "Content-Type": "application/json"
                        },
                        success: function(t) {
                            var e = t.data.result.ad_info.city;
                            i.setData({
                                myCityName: e.substr(0, e.length - 1)
                            });
                        },
                        fail: function() {}
                    });
                }
            });
        },
        jumpMt: function(t) {
            var e = t.currentTarget.dataset.id;
            this.setData({
                jumpNum: e
            });
        },
        detailMt: function(t) {
            t.currentTarget.dataset.detail;
            wx.setStorageSync("city", t.currentTarget.dataset.detail.name), wx.navigateBack({
                delta: 1
            });
        },
        input: function(t) {
            this.value = t.detail.value;
        },
        searchMt: function() {
            this._search();
        },
        _search: function() {
            for (var t = this.data.data, e = [], a = 0; a < t.length; a++) {
                for (var i = [], n = 0; n < t[a].item.length; n++) if (-1 < t[a].item[n].name.indexOf(this.value)) {
                    var r = {};
                    for (var s in t[a].item[n]) r[s] = t[a].item[n][s];
                    i.push(r);
                }
                0 !== i.length && e.push({
                    title: t[a].title,
                    type: t[a].type ? t[a].type : "",
                    item: i
                });
            }
            this.resetRight(e);
        },
        locationMt: function(t) {
            wx.setStorageSync("city", t.currentTarget.dataset.detail), wx.navigateBack({
                delta: 1
            });
        }
    }
});