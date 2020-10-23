Component({
    properties: {
        driver: {
            type: Object
        }
    },
    data: {},
    methods: {
        callTel: function() {
            wx.makePhoneCall({
                phoneNumber: this.data.driver.phone
            });
        }
    }
});