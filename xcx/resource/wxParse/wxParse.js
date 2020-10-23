var _showdown = require("./showdown.js"), _showdown2 = _interopRequireDefault(_showdown), _html2json = require("./html2json.js"), _html2json2 = _interopRequireDefault(_html2json);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var realWindowWidth = 0, realWindowHeight = 0;

function wxParse() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "wxParseData", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "html", a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', i = arguments[3], r = arguments[4], o = i, n = {};
    if ("html" == t) n = _html2json2.default.html2json(a, e), console.log(JSON.stringify(n, " ", " ")); else if ("md" == t || "markdown" == t) {
        var d = new _showdown2.default.Converter().makeHtml(a);
        n = _html2json2.default.html2json(d, e), console.log(JSON.stringify(n, " ", " "));
    }
    n.view = {}, void (n.view.imagePadding = 0) !== r && (n.view.imagePadding = r);
    var s = {};
    s[e] = n, o.setData(s), o.wxParseImgLoad = wxParseImgLoad, o.wxParseImgTap = wxParseImgTap;
}

function wxParseImgTap(e) {
    var t = e.target.dataset.src, a = e.target.dataset.from;
    void 0 !== a && 0 < a.length && wx.previewImage({
        current: t,
        urls: this.data[a].imageUrls
    });
}

function wxParseImgLoad(e) {
    var t = e.target.dataset.from, a = e.target.dataset.idx;
    void 0 !== t && 0 < t.length && calMoreImageInfo(e, a, this, t);
}

function calMoreImageInfo(e, t, a, i) {
    var r, o = a.data[i];
    if (o && 0 != o.images.length) {
        var n = o.images, d = wxAutoImageCal(e.detail.width, e.detail.height, a, i), s = n[t].index, l = "" + i, g = !0, m = !1, h = void 0;
        try {
            for (var w, u = s.split(".")[Symbol.iterator](); !(g = (w = u.next()).done); g = !0) {
                l += ".nodes[" + w.value + "]";
            }
        } catch (e) {
            m = !0, h = e;
        } finally {
            try {
                !g && u.return && u.return();
            } finally {
                if (m) throw h;
            }
        }
        var f = l + ".width", v = l + ".height";
        a.setData((_defineProperty(r = {}, f, d.imageWidth), _defineProperty(r, v, d.imageheight), 
        r));
    }
}

function wxAutoImageCal(e, t, a, i) {
    var r, o = 0, n = 0, d = {}, s = a.data[i].view.imagePadding;
    return realWindowHeight, (r = realWindowWidth - 2 * s) < e ? (n = (o = r) * t / e, 
    d.imageWidth = o, d.imageheight = n) : (d.imageWidth = e, d.imageheight = t), d;
}

function wxParseTemArray(e, t, a, i) {
    for (var r = [], o = i.data, n = null, d = 0; d < a; d++) {
        var s = o[t + d].nodes;
        r.push(s);
    }
    e = e || "wxParseTemArray", (n = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(n);
}

function emojisInit() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments[2];
    _html2json2.default.emojisInit(e, t, a);
}

wx.getSystemInfo({
    success: function(e) {
        realWindowWidth = e.windowWidth, realWindowHeight = e.windowHeight;
    }
}), module.exports = {
    wxParse: wxParse,
    wxParseTemArray: wxParseTemArray,
    emojisInit: emojisInit
};