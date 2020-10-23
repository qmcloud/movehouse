var app = getApp();

Page({
    data: {
        template: {},
        address_type: '',
        lt: "",
        des: "",
        type : "",
        picker1Value:0,
        picker1Range:[' 请选择楼层   （楼层费只是针对无电梯房）',' 有电梯-楼层费 0元',' 无电梯住1层-楼层费 0元',' 无电梯住2层-楼层费 15元',' 无电梯住3层-楼层费 30元',' 无电梯住4层-楼层费 45元',' 无电梯住5层-楼层费 60元',' 无电梯住6层-楼层费 75元',' 无电梯住7层-楼层费 95元',' 无电梯住8层-楼层费 115元'],
    },
    onLoad: function(e) {
        console.log(e.type)
        this.setData({
            address_type: e.address_type,
            type : e.type
        });
        var t = "";
        if(e.type==0){
            wx.getStorageSync("fahuo") && (t.person && this.setData({
                name: t.person.name,
                phone: t.person.phone,
                des: t.person.des
            }), this.setData({
                template: t
            }));
        }else{
            wx.getStorageSync("shouhuo") && (t.person && this.setData({
                name: t.person.name,
                phone: t.person.phone,
                des: t.person.des
            }), this.setData({
                template: t
            }));
        }
        
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {
        this.examineAddress();
    },
    confirm: function(e) {
        var t = e.detail.value;
        if (!t.lt) return app.hint("楼梯层数不能为空~");
        if (!t.des) return app.hint("详细地址不能为空~");
        var a = {};
        if (a.name = t.name, !t.name) {
            var n = wx.getStorageSync("userInfo");
            n && n.wxInfo && n.wxInfo.nickName && (a.name = n.wxInfo.nickName);
        }
        a.phone = t.phone, a.des = t.des;
        var o = this.data.template;
        var openid=wx.getStorageSync('user');//存储openid 
        var url='';
        console.log(this.data.type)
        if(0 == this.data.type){
            url ='https://www.58hongtu.com/api/index/setslocation';
            wx.setStorageSync("fahuo", o)
        }else{
            url ='https://www.58hongtu.com/api/index/setelocation';
            wx.setStorageSync("shouhuo", o)
        }
        var llt = t.lt-1>0?t.lt-1:0;
        //发送请求
        wx.request({
            url: url, //接口地址
            data:{
                openid:openid.openid,
                slocation:o,
                lt:llt,
                des:t.des
            },
            header: {
            'content-type': 'application/json' //默认值
            },
            success: function (res) {

                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
              })
            }
        })

        o.person = a,
        wx.navigateTo({
            url: '/make_freight/index/index'})
    },
    getTime: function() {
        var a = this;
        homeModule.getTime().then(function(e) {
            var t = homeModule.date(e.days, e.hours, e.minutes);
            a.setData({
                xTime: t
            });
        }, function(e) {}), this.setData({
            time_bg: !1
        });
    },
    examineAddress: function() {
        var e = "";
    
        e = 0 == wx.getStorageSync("address_type") ? wx.getStorageSync("fahuo_template") : wx.getStorageSync("shouhuo_template"), 
        this.setData({
            template: e
        });
    },
    searchAddress: function() {
        wx.navigateTo({
            url: "../search_address/search_address"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    },
    normalPickerBindchange:function(e){
        this.setData({
          picker1Value:e.detail.value
        })
      },
});