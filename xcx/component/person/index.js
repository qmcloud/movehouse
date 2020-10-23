Component({
    properties: {
        name: {
            type: String
        },
        phone: {
            type: String
        },
        avatar: {
            type: String
        }
    },
    data: {},
    methods: {
        callTel: function(e) {
            wx.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.phone
            });
        }
    }
});