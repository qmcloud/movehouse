var _socket = require("./utils/socket"), _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

App({
    globalData: {
        syStem: "",
        tmap: "OESBZ-JEFCP-MWDD5-VWIQ6-E3NO2-HNFUW", //腾讯地图key
        search_address:0,
        user_id: 0,
        cargo_img: [],
        websocketUrl: "",
        is_client: "",
        appid:'1wqas2342dasaqwe2323424ac23qwe',//appid需自己提供，此处的appid我随机编写
        secret:'e0dassdadef2424234209bwqqweqw123ccqwa',//secret需自己提供，此处的secret我随机编写
    },
    appu: require("modules/apps.js"),
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    data: require("utils/util.js"),
    onLaunch: function(t) {
         
        /*var e = t.path;
        this.socket = new _socket2.default({
            heartCheck: !0,
            isReconnection: !0
        });
        var o = this.siteInfo.siteroot.match(/\/\/\w+\S+(?=\/app)/)[0];
        this.globalData.websocketUrl = "wss:" + o + ":3671", this.getUserAuth(e);*/
    },
    onHide: function() {
        //this.socket.closeWebSocket();
    },
    onShow: function() {
        /*if (0 !== this.globalData.user_id) {
            var t = {
                type: "bindUid",
                uid: this.globalData.user_id
            };
            this.linkWebsocket(t);
        }
        this.socket.onSocketClosed({
            url: this.globalData.websocketUrl,
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        }), this.socket.onNetworkChange({
            url: this.globalData.websocketUrl,
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        }), this.socket.onMessage(function(t) {
            var e = JSON.parse(t.data);
            console.log(e);
        });*/
    },
    linkWebsocket: function(t) {
        /*console.log(t);
        this.socket.initWebSocket({
            url: this.globalData.websocketUrl,
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        }), this.socket._onSocketOpened(t);*/
    },
    getWebSocket: function() {
        //return this.socket;
    },
    hint: function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "none";
        wx.showToast({
            title: t,
            icon: e,
            duration: 2e3
        });
    },
    delayHint: function(t) {
        var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "none";
        return new Promise(function(o, e) {
            wx.showToast({
                title: t,
                icon: n,
                duration: 2e3,
                success: function(t) {
                    var e = setTimeout(function() {
                        clearTimeout(e), wx.hideToast(), o();
                    }, 2e3);
                },
                fail: function(t) {
                    e();
                }
            });
        });
    },
    getUserAuth: function(e) {
        var o = this, n = new this.appu.apps();
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? o.util.getUserInfo(function(t) {}) : "make_freight/auth/auth" != e && wx.redirectTo({
                    url: "../auth/auth"
                });
            },
            fail: function(t) {},
            complete: function(t) {
                n.getSystem(o).then(function(t) {
                    o.globalData.syStem = t;
                }, function(t) {});
            }
        });
    },
    setNavigation: function() {
        var t = this.globalData.syStem;
        if (t) wx.setNavigationBarColor({
            frontColor: t.program_font,
            backgroundColor: t.program_background
        }); else var e = setInterval(function() {
            t && (clearInterval(e), wx.setNavigationBarColor({
                frontColor: t.program_font,
                backgroundColor: t.program_background
            }));
        }, 10);
    },
    userShare: function() {
        return {
            title: this.globalData.syStem.program_title,
            path: "/make_freight/index/index",
            imageUrl: this.globalData.syStem.share ? this.globalData.syStem.share : ""
        };
    },
    saveFromId: function(t) {
        new this.appu.apps().getFormId(this, {
            form_id: t
        }).then(function(t) {}, function(t) {});
    },
    getLocation: function() {
        return new Promise(function(e, o) {
            wx.getLocation({
                type: "gcj02",
                success: function(t) {
                    t ? (console.log(t), e(t)) : o();
                },
                fail: function(t) {
                    o();
                }
            });
        });
    },
    getAddressAuth: function() {
        return new Promise(function(e, o) {
            wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.userLocation"] ? e(t.authSetting["scope.userLocation"]) : o();
                },
                fail: function(t) {
                    o();
                }
            });
        });
    }
});