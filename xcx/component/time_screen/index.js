Component({
    properties: {
        time_picker: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        value: [ 0, 0 ],
        years: [],
        months: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    },
    lifetimes: {
        attached: function() {
            var t = new Date(), e = [];
            e[0] = t.getFullYear(), e[1] = t.getFullYear() - 1;
            for (var a = t.getMonth() + 1, s = [], i = 0; i < a; i++) s[i] = i + 1;
            this.setData({
                years: e,
                months: s
            });
        },
        detached: function() {}
    },
    methods: {
        timeBtn: function(t) {
            var e = this.data.value, a = this.data.years[e[0]], s = this.data.months[e[1]];
            this.triggerEvent("sTime", {
                year: a,
                month: s,
                select: 1
            }, {});
        },
        closeBtn: function() {
            this.triggerEvent("sTime", {
                select: 2
            }, {});
        },
        pickerTime: function(t) {
            console.log(t.detail.value);
            var e = t.detail.value;
            if (0 == e[0]) {
                for (var a = new Date().getMonth() + 1, s = [], i = 0; i < a; i++) s[i] = i + 1;
                this.setData({
                    months: s,
                    value: e
                });
            } else this.setData({
                months: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
                value: e
            });
        }
    }
});