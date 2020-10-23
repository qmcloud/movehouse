Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.driver = void 0;

var _createClass = function() {
    function u(e, r) {
        for (var t = 0; t < r.length; t++) {
            var u = r[t];
            u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), 
            Object.defineProperty(e, u.key, u);
        }
    }
    return function(e, r, t) {
        return r && u(e.prototype, r), t && u(e, t), e;
    };
}(), _http2 = require("../utils/http");

function _classCallCheck(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, r) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !r || "object" != typeof r && "function" != typeof r ? e : r;
}

function _inherits(e, r) {
    if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + typeof r);
    e.prototype = Object.create(r && r.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}

var driver = function(e) {
    function r() {
        return _classCallCheck(this, r), _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
    }
    return _inherits(r, _http2.http), _createClass(r, [ {
        key: "getTest",
        value: function() {
            return this.request({
                url: "index"
            });
        }
    }, {
        key: "postLog",
        value: function(e) {
            return this.request({
                url: "log",
                data: e
            });
        }
    }, {
        key: "driverMsg",
        value: function(e) {
            return this.request({
                url: "my_info",
                data: e
            });
        }
    }, {
        key: "amountDetail",
        value: function(e) {
            return this.request({
                url: "get_amount_detail",
                data: e
            });
        }
    }, {
        key: "cancelOrder",
        value: function(e) {
            return this.request({
                url: "driver_cancel_order",
                data: e
            });
        }
    }, {
        key: "orderFee",
        value: function(e) {
            return this.request({
                url: "order_fee_detail",
                data: e
            });
        }
    }, {
        key: "updatePosition",
        value: function(e) {
            return this.request({
                url: "update_driver_address",
                data: e
            });
        }
    }, {
        key: "confirmSuccessOrder",
        value: function(e) {
            return this.request({
                url: "confirm_delivery",
                data: e
            });
        }
    }, {
        key: "confirmGetGoods",
        value: function(e) {
            return this.request({
                url: "update_order",
                data: e
            });
        }
    }, {
        key: "underwayOrder",
        value: function(e) {
            return this.request({
                url: "received_order_list",
                data: e
            });
        }
    }, {
        key: "robbedOrder",
        value: function(e) {
            return this.request({
                url: "robbed_order",
                data: e
            });
        }
    }, {
        key: "robbedOrderList",
        value: function(e) {
            return this.request({
                url: "robbed_order_list",
                data: e
            });
        }
    }, {
        key: "orderDetail",
        value: function(e) {
            return this.request({
                url: "get_order_detail",
                data: e
            });
        }
    }, {
        key: "orderList",
        value: function(e) {
            return this.request({
                url: "driver_order_list",
                data: e
            });
        }
    }, {
        key: "updatePhone",
        value: function(e) {
            return this.request({
                url: "update_driver_mobile",
                data: e
            });
        }
    }, {
        key: "sendCode",
        value: function(e) {
            return this.request({
                url: "get_code",
                data: e
            });
        }
    }, {
        key: "switch",
        value: function(e) {
            return this.request({
                url: "update_driver_address",
                data: e
            });
        }
    }, {
        key: "driverInfo",
        value: function() {
            return this.request({
                url: "driver_info"
            });
        }
    }, {
        key: "withdraw",
        value: function(e) {
            return this.request({
                url: "withdraw",
                data: e
            });
        }
    }, {
        key: "myMoney",
        value: function() {
            return this.request({
                url: "get_money"
            });
        }
    }, {
        key: "register",
        value: function(e) {
            return this.request({
                url: "register_driver",
                data: e
            });
        }
    }, {
        key: "carType",
        value: function() {
            return this.request({
                url: "get_car"
            });
        }
    } ]), r;
}();

exports.driver = driver;