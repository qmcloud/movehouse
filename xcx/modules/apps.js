Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.apps = void 0;

var _createClass = function() {
    function n(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(e, t, r) {
        return t && n(e.prototype, t), r && n(e, r), e;
    };
}(), _app2 = require("../utils/app.js");

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var apps = function(e) {
    function t() {
        return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return _inherits(t, _app2.app), _createClass(t, [ {
        key: "getNewOrder",
        value: function(e, t) {
            return this.app_request({
                that: e,
                url: "acceptOrderDetail",
                data: t,
                cachetime: 0
            });
        }
    }, {
        key: "getSystem",
        value: function(e) {
            return this.app_request({
                that: e,
                url: "get_config"
            });
        }
    }, {
        key: "getUserId",
        value: function(e) {
            return this.app_request({
                that: e,
                url: "getUserId"
            });
        }
    }, {
        key: "getFormId",
        value: function(e, t) {
            return this.app_request({
                that: e,
                url: "add_formid",
                data: t
            });
        }
    } ]), t;
}();

exports.apps = apps;