const app = getApp();

Page({

  data: {

    items: {

      labelText: '已阅读并同意',

      iconType: 'circle',

      is_default: false

    }

  },

  onLoad(e) {

    console.log(e);
    var typeText = app.globalData.type === 'success' ? '网络异常稍后再试！' : '起始位置和终点位置不能为空！';
    if(e.code==1){
      typeText = '网络异常，请稍后再试一次';
      wx.removeStorage({
        key: 'phoneObj'
      })
      wx.removeStorage({
        key: 'user'
      })
    }
    if(e.code==2){
      typeText = '同意获取手机号后，才能够继续下单';
      wx.removeStorage({
        key: 'phoneObj'
      })
      wx.removeStorage({
        key: 'user'
      })
    }

    const src = app.globalData.type === 'success' ? 'success.png' : 'fail.png';

    const type = app.globalData.type === 'success' ? 1 : 0;

    this.setData({

      // subOrderSn: app.globalData.subOrderSn,
      src,

      typeText,

      type

    });

  }

});
