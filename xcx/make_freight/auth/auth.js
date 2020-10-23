var _home = require("../../modules/home"), homeModule = new _home.home(), app = getApp();

Page({
    data: {
        logo: ""
    },
    onLoad: function(n) {
        var o = this, t = setInterval(function() {
            app.globalData.syStem && (clearInterval(t), o.setData({
                logo: app.globalData.syStem.logo
            }));
        }, 10);
        //this.getPhoneNumber();
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {},
    getPhoneNumber: function (e) {
        
        var ivObj = e.detail.iv
        var telObj = e.detail.encryptedData
        var codeObj = "";
        var that = this;
        var openid=wx.getStorageSync('user');//openid 
        var phone = wx.getStorageSync('phoneObj')
        
        //------执行Login---------
        wx.login({
         success: res => {
          //console.log('code转换', res.code);
          
          //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
          if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
            wx.navigateTo({
                url: '../error/error?code=2',
               })
          } else { //允许授权执行跳转
            　　　　//用code传给服务器调换session_key
            if(phone !=""){
                wx.navigateTo({
                    url: '../order/order',
                   })
                   return true;
            }
          
          var session_key=wx.getStorageSync('user');
          wx.request({
           url: 'https://www.58hongtu.com/api/index/getphone', //接口地址
           data: {
            openid:openid.openid,   
            code: res.code,
            se_key:session_key.session_key,
            encryptedData: telObj,
            iv: ivObj
           },
           success: function (res) {
            //phoneObj = res.data.phoneNumber;
            //console.log(res.data.phoneNumber)
            console.log(res)
            if(res.data.phoneNumber==null){
                wx.navigateTo({
                    url: '../error/error?code=1',
                   }) 
            }
            wx.setStorage({  //存储数据并准备发送给下一页使用
             key: "phoneObj",
             data: res.data.phoneNumber,
            })
            wx.navigateTo({
                url: '../order/order',
               })
           },faill(res){
            wx.navigateTo({
                    url: '../error/error?code=1',
                   }) 
           }
          })
          console.log(e)

          }
         }
        });
     },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    }
});