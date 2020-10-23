var _home = require("../../modules/home.js"), _address = require("../../modules/address"), addressModule = new _address.address(), homeModule = new _home.home();

Component({
    properties: {
        days: {
            type: Array
        },
        hours: {
            type: Array
        },
        minutes: {
            type: Array
        },
        hidden: {
            type: Boolean
        }
    },
    data: {
        time_bg: !0,
        value: [ 0, 0, 0 ]
    },
    methods: {
        getTime: function() {
            var s = this;
            homeModule.getTime("getTime").then(function(e) {
                var t = addressModule.date(e.days, e.hours, e.minutes);
                s.setData({
                    days: t.days,
                    hours: t.hours,
                    minutes: t.minutes
                });
            });
        },
        pickerTime: function(e) {
            var t = e.detail.value, s = t[0], a = t[1];
            0 == s && a <= 1 && this.getTime(), 0 == s ? 1 < a && this.minute() : (this.minute(), 
            this.hour()), this.setData({
                value: t,
                a: s,
                b: a
            });
        },
        hour: function() {
            for (var e = [], t = 0; t < 24; t++) e.push(t + "点");
            this.setData({
                hours: e
            });
        },
        minute: function() {
            for (var e = [], t = 0; t < 60; t += 10) e.push(t);
            this.setData({
                minutes: e
            });
        },
        confirmBtn: function(e) {
            var t = this.data.value, s = 1, a = this.data.days[t[0]], i = "", r = this.data.hours[t[1]];
            "立即取货" != r ? (r = parseInt(this.data.hours[t[1]]), i = parseInt(this.data.minutes[t[2]])) : s = 0, 
            this.triggerEvent("confirmTime", {
                day: a,
                hour: r,
                minute: i,
                isImmediately: s
            }, {});
        },
        closeBtn: function() {
            this.triggerEvent("time_bg", {}, {});
        }
    }
});