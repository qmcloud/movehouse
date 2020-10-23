var formatTime = function(e) {
    var s = e.getFullYear(), t = e.getMonth() + 1, n = e.getDate(), a = e.getHours(), o = e.getMinutes(), r = e.getSeconds();
    return [ s, t, n ].map(formatNumber).join("/") + " " + [ a, o, r ].map(formatNumber).join(":");
}, formatNumber = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

function sendMessage() {
    wx.sendSocketMessage({
        data: JSON.stringify({
            cmd: "connect.getWlList",
            data: {
                mdd: "7502"
            }
        }),
        success: function(e) {}
    });
}

function resiverMessage(s) {
    wx.onSocketMessage(function(e) {
        console.log(6666), s.onMessage(JSON.parse(e.data));
    });
}

module.exports = {
    formatTime: formatTime,
    sendMessage: sendMessage,
    resiverMessage: resiverMessage
};