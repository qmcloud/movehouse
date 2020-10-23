Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function s(e, n) {
        for (var t = 0; t < n.length; t++) {
            var s = n[t];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(e, n, t) {
        return n && s(e.prototype, n), t && s(e, t), e;
    };
}();

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var setting = function() {
    function e() {
        _classCallCheck(this, e);
    }
    return _createClass(e, [ {
        key: "addressAuth",
        value: function() {
            return new Promise(function(n, t) {
                wx.getSetting({
                    success: function(e) {
                        console.log(e), e.authSetting["scope.userLocation"] ? n(e.authSetting["scope.userLocation"]) : t();
                    }
                });
            });
        }
    }, {
        key: "settingHeight",
        value: function() {
            return new Promise(function(n, t) {
                wx.getSystemInfo({
                    success: function(e) {
                        e ? n(e.screenHeight) : t();
                    }
                });
            });
        }
    }, {
        key: "systemInfo",
        value: function() {
            return new Promise(function(n, t) {
                wx.getSystemInfo({
                    success: function(e) {
                        e ? n(e) : t();
                    }
                });
            });
        }
    } ]), e;
}();

exports.setting = setting;