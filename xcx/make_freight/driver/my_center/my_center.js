var app = getApp();

Component({
    properties: {
        info: {
            type: Object
        }
    },
    data: {},
    methods: {
        myIsUser: function() {
            wx.switchTab({
                url: "../../index/index"
            });
        },
        registerBtn: function(e) {
            wx.navigateTo({
                url: "../register/register?type=1&name=" + e.currentTarget.dataset.name
            });
        },
        wallet: function() {
            wx.navigateTo({
                url: "../wallet/wallet"
            });
        },
        my_order: function() {
            wx.navigateTo({
                url: "../my_order/my_order"
            });
        },
        callTel: function(e) {
            wx.makePhoneCall({
                phoneNumber: app.globalData.syStem.service_tel
            });
        },
        update_mobile: function() {
            wx.navigateTo({
                url: "../update_mobile/update_mobile"
            });
        }
    }
});