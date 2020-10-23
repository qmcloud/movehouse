Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function o(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(e, t, n) {
        return t && o(e.prototype, t), n && o(e, n), e;
    };
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var websocket = function() {
    function t(e) {
        e.heartCheck, e.isReconnection;
        _classCallCheck(this, t), this._isLogin = !1, this._netWork = !0, this._isClosed = !1, 
        this._timeout = 5e4, this._timeoutObj = null, this._connectNum = 0, this._heartCheck = !0, 
        this._isReconnection = !0, this._onSocketOpened();
    }
    return _createClass(t, [ {
        key: "_reset",
        value: function() {
            return clearTimeout(this._timeoutObj), this;
        }
    }, {
        key: "_start",
        value: function() {
            var t = this;
            this._timeoutObj = setInterval(function() {
                wx.sendSocketMessage({
                    data: JSON.stringify({
                        heart: "heart"
                    }),
                    success: function(e) {
                        console.log("发送心跳成功");
                    },
                    fail: function(e) {
                        console.log(e), t._reset();
                    }
                });
            }, this._timeout);
        }
    }, {
        key: "onSocketClosed",
        value: function(t) {
            var n = this;
            wx.onSocketClose(function(e) {
                console.log("当前websocket连接已关闭,错误信息为:" + JSON.stringify(e)), n._heartCheck && n._reset(), 
                n._isLogin = !1, n._isClosed || n._isReconnection && n._reConnect(t);
            });
        }
    }, {
        key: "onNetworkChange",
        value: function(t) {
            var n = this;
            wx.onNetworkStatusChange(function(e) {
                console.log("当前网络状态:" + e.isConnected), n._netWork || (n._isLogin = !1, n._isReconnection && n._reConnect(t));
            });
        }
    }, {
        key: "_onSocketOpened",
        value: function(t) {
            var n = this;
            wx.onSocketOpen(function(e) {
                n._isLogin = !0, n._heartCheck && n._reset()._start(), void 0 !== t && wx.sendSocketMessage({
                    data: JSON.stringify(t)
                }), n._netWork = !0;
            });
        }
    }, {
        key: "onMessage",
        value: function(t) {
            wx.onSocketMessage(function(e) {
                "function" == typeof t ? t(e) : console.log("参数的类型必须为函数");
            });
        }
    }, {
        key: "initWebSocket",
        value: function(t) {
            var n = this;
            this._isLogin ? console.log("您已经登录了") : wx.getNetworkType({
                success: function(e) {
                    "none" != e.networkType ? wx.connectSocket({
                        url: t.url,
                        success: function(e) {
                            "function" == typeof t.success ? t.success(e) : console.log("参数的类型必须为函数");
                        },
                        fail: function(e) {
                            "function" == typeof t.fail ? t.fail(e) : console.log("参数的类型必须为函数");
                        }
                    }) : (console.log("网络已断开"), n._netWork = !1, wx.showModal({
                        title: "网络错误",
                        content: "请重新打开网络",
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && console.log("用户点击确定");
                        }
                    }));
                }
            });
        }
    }, {
        key: "sendMsg",
        value: function(t) {
            wx.sendSocketMessage({
                data: t.data,
                success: function(e) {
                    "function" == typeof t.success ? t.success(e) : console.log("参数的类型必须为函数");
                },
                fail: function(e) {
                    "function" == typeof t.fail ? t.fail(e) : console.log("参数的类型必须为函数");
                }
            });
        }
    }, {
        key: "_reConnect",
        value: function(e) {
            var t = this;
            this._connectNum < 20 ? setTimeout(function() {
                t.initWebSocket(e);
            }, 3e3) : this._connectNum < 50 ? setTimeout(function() {
                t.initWebSocket(e);
            }, 1e4) : setTimeout(function() {
                t.initWebSocket(e);
            }, 45e4), this._connectNum += 1;
        }
    }, {
        key: "closeWebSocket",
        value: function() {
            wx.closeSocket(), this._isClosed = !0;
        }
    } ]), t;
}();

exports.default = websocket;