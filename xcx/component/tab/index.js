var config = require("config");

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        top_item: {
            type: Array
        },
        content_item: {
            type: Array
        },
        top_p: {
            type: String
        }
    },
    data: {
        idx: 0,
        bg_color: config.bg_c,
        font_active_color: config.font_a_c,
        font_color: config.font_c,
        line_color: config.line_c,
        line_active_color: config.line_a_c,
        view_bg: config.view_bg,
        top_f: config.top_f,
        status: 0
    },
    methods: {
        topTap: function(t) {
            var i = t.currentTarget.dataset.idx;
            this.setData({
                idx: i,
                status: 1
            }), this.triggerEvent("Getidx", {
                idx: i
            }, "");
        },
        swiper: function(t) {
            if (this.data.status) return this.setData({
                status: 0
            });
            var i = t.detail.current;
            this.setData({
                idx: i
            }), this.triggerEvent("Getidx", {
                idx: i
            }, "");
        },
        scrollSole: function() {
            this.triggerEvent("scrollSole", "", "");
        }
    }
});