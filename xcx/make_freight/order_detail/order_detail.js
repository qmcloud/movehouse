var _home = require("../../modules/home"), _address = require("../../modules/address"), addressModule = new _address.address(), homeModule = new _home.home(), app = getApp();

Page({
    data: {
        latitude: 22.791375,
        longitude: 108.384247,
        markers: [],
        polyline: [],
        map_height: 500,
        status: 2,
        driver: "",
        start: "",
        end: "",
        sn:"",
        time:"",
        driver_tel:"",
        remark:"",
        real_price:""

    },
    onLoad: function(t) {
        var e = t.id;
        this.postData(e);
    },
    onReady: function() {
        app.setNavigation();
    },
    callTel: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.phone
        });
    },
    onShow: function() {
        /*var a = this;
        wx.getStorageSync("evaluate") && this.postData(this.data.order.id), wx.removeStorageSync("evaluate"), 
        app.getWebSocket().onMessage(function(t) {
            var e = JSON.parse(t.data);
            console.log(e), "orderChange" == e.type && a.postData(e.data.id);
        });*/
    },
    evaluateBtn: function() {
        wx.navigateTo({
            url: "../order_evaluate/order_evaluate?driver_id=" + this.data.order.driver_id + "&status=" + this.data.status + "&order_id=" + this.data.order.id
        });
    },
    callTel: function(t) {
        var e = this.data.order.driver_phone;
        1 != t.currentTarget.dataset.idx && (e = app.globalData.syStem.service_tel), wx.makePhoneCall({
            phoneNumber: e
        });
    },
    cancelOrder: function() {
        var e = this;
        wx.showModal({
            title: "取消订单",
            content: "是否确认要取消该订单~",
            success: function(t) {
                t.confirm && (wx.showLoading({
                    title: "加载中",
                    mask: !0
                }), homeModule.cancelOrder({
                    id: e.data.order.id
                }).then(function(t) {
                    wx.hideLoading(), e.setData({
                        status: 6
                    }), wx.navigateTo({
                        url: "../order_list/order_list"
                    });
                }, function(t) {
                    console.log(1111);
                }));
            }
        });
    },
    orderPay: function() {
        var e = this;
        homeModule.pay({
            id: this.data.order.id,
            order_number: this.data.order.order_number
        }).then(function(t) {
            homeModule.confirmPayRequest(t).then(function(t) {
                e.postData(e.data.order.id);
            }, function(t) {});
        }, function(t) {});
    },
    indexBtn: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    postData: function(t) {
        var that = this
        var id=t
        wx.request({
            url: 'https://www.58hongtu.com/api/index/findorderbyid?id='+id, //接口地址
                  method: "POST",
            data: {
                id:id
            },
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
                console.log(res.data)
                //console.log(obj);
                if(res.statusCode==200){
                    that.setData({
                        driver: res.data.driver,
                        status: res.data.status,
                        start: res.data.start,
                        end: res.data.end,
                        sn:res.data.sn,
                        time:res.data.movetime,
                        driver_tel:res.data.driver_tel,
                        remark:res.data.mark,
                        real_price:res.data.price  
                    });
                    
                }
    
            },fail: function (res) {
             
            }
          })


        /*var i = this;
        homeModule.orderDetail({
            order_id: t
        }).then(function(o) {
            var t = {}, e = {};
            t.title = o.place_dispatch, t.address = o.place_dispatch_detail, e.title = o.place_receipt, 
            e.address = o.place_receipt_detail, i.setData({
                order: o,
                status: o.status,
                order_type: o.type,
                fa_address: t,
                shou_address: e,
                driver: {
                    icon: o.photo,
                    name: o.driver_name,
                    phone: o.driver_phone,
                    service_mark: o.service_mark
                }
            });
            var n = {};
            n.location = {
                lat: 1 * o.start_lat,
                lng: 1 * o.start_lot
            };
            var d = {};
            d.location = {
                lat: 1 * o.end_lat,
                lng: 1 * o.end_lot
            };
            var s = setInterval(function() {
                if (app.globalData.syStem) {
                    if (clearInterval(s), 2 == o.status || 3 == o.status) {
                        var t = {}, e = {};
                        e.lat = o.latitude, e.lng = o.longitude, t.location = e, wx.setStorageSync("rider", t);
                        var a = addressModule.getDistance(t, n, 2, app.globalData.syStem.amap), r = addressModule.getDistance(n, d, 1, app.globalData.syStem.amap);
                        Promise.all([ a, r ]).then(function(t) {
                            i.setData({
                                distance: t[1].distance,
                                duration: t[1].duration,
                                distance_start: t[0].distance,
                                duration_start: t[0].duration
                            });
                            var e = t[0].points;
                            e = e.concat(t[1].points), i.map(n, d, e);
                        }, function(t) {});
                    }
                    7 != o.status && 1 != o.status && 1 != o.status && 5 != o.status || addressModule.getDistance(n, d, 2, app.globalData.syStem.amap).then(function(t) {
                        i.setData({
                            distance: t.distance,
                            duration: t.duration
                        }), i.map(n, d, t.points);
                    });
                }
            }, 10);
        }, function(t) {});
        */
        

    },
    map: function(t, e, a) {
        homeModule.mapMarke(t, e, this, a);
    },
    orderStatus: function() {
        6 != this.data.status && wx.navigateTo({
            url: "../order_status/order_status?create_time=" + this.data.order.create_time + "&driver_time=" + this.data.order.dcreate_time + "&getgoods_time=" + this.data.order.get_cargo_time + "&end_time=" + this.data.order.end_time + "&status=" + this.data.status
        });
    },
    onHide: function() {
        wx.removeStorageSync("evaluate");
    },
    onUnload: function() {
        wx.removeStorageSync("evaluate");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    }
});