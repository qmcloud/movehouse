Page({
    data: {
        src: "https://www.58hongtu.com/index/index/home",
    },
    onLoad: function() {
      var that = this;
      //获取openid不需要授权
      wx.getStorage({
          key: 'user',
          success (res) {
              if(res.data.expires_in<Date.now()){
                wx.login({
                  success:function(res){
                    //console.log(res.code)
                    //发送请求
                    wx.request({
                      url: 'https://www.58hongtu.com/api/index/openid', //接口地址
                      data: {code:res.code},
                      header: {
                        'content-type': 'application/json' //默认值
                      },
                      success: function (res) {
                          console.log(res)
                          var obj={};
                          obj.openid=res.data.openid;
                          obj.session_key=res.data.session_key;  
                          obj.expires_in=Date.now()+60*9; 
                          //console.log(obj);
                          wx.setStorageSync('user', obj);//存储openid 
                          //console.log(res.data)
                          that.setData({
                            src: "https://www.58hongtu.com/index/index/home?openid="+res.data.openid
                        })
                      },fail: function (res) {
                        wx.showToast({
                          title: '网络异常，稍后重试',
                          icon: 'error',
                          duration: 2000
                      })
                      }
                    })
                  }
                }) 
              }
              that.setData({
                  src: "https://www.58hongtu.com/index/index/home?openid="+res.data.openid
              })
          },fail: function (res) {
            wx.login({
              success:function(res){
                //console.log(res.code)
                //发送请求
                wx.request({
                  url: 'https://www.58hongtu.com/api/index/openid', //接口地址
                  data: {code:res.code},
                  header: {
                    'content-type': 'application/json' //默认值
                  },
                  success: function (res) {
                      console.log(res)
                      var obj={};
                      obj.openid=res.data.openid;
                      obj.session_key=res.data.session_key;  
                      obj.expires_in=Date.now()+86400; 
                      //console.log(obj);
                      wx.setStorageSync('user', obj);//存储openid 
                      //console.log(res.data)
                      that.setData({
                        src: "https://www.58hongtu.com/index/index/home?openid="+res.data.openid
                    })
                  },fail: function (res) {
                    wx.showToast({
                      title: '网络异常，稍后重试',
                      icon: 'error',
                      duration: 2000
                  })
                  }
                })
              }
            }) 
        },  
        })
            
    },

    onReady: function() {},
    onShow: function() {
        
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(o) {
        return "button" === o.from && console.log(o.target), {
            title: "鸿途搬家",
            path: "/make_freight/index/index",
            imageUrl: "/image/logo.png"
        };
    }
});