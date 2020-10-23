Component({
    properties: {
        hidden: {
            type: Boolean
        },
        standard: {
            type: []
        },
        weight_num: {
            type: Number
        },
        img_url: {
            type: String
        }
    },
    data: {
        less: "<",
        idx: -1
    },
    methods: {
        standard_bj: function() {
            this.triggerEvent("standard_bg", {
                standard_bg: !0
            }, {}), this.setData({
                hidden: !0
            });
        },
        add: function() {
            var t = this.data.weight_num + 1;
            this.setData({
                weight_num: t
            });
        },
        reduce: function() {
            var t = this.data.weight_num - 1;
            0 < t && this.setData({
                weight_num: t
            });
        },
        selected: function(t) {
            var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.idx;
            this.setData({
                idx: a,
                id: e
            });
        },
        confirm: function() {
            var t = this.data.id, e = this.data.idx, a = this.data.weight_num;
            this.triggerEvent("standardSelected", {
                id: t,
                idx: e,
                weight_num: a
            }, {});
        }
    }
});