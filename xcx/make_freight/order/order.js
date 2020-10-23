var _home = require("../../modules/home"), homeModule = new _home.home(), app = getApp();

Page({
    data: {
        imgs: [],
        imgid:0,
        sn:"",
        swiper_tap: 0,
        fahuo: {},
        shouhou: {},
        goods: {},
        distance: 0,
        price: 0,
        real_price:0,
        remark: "",
        coupon_id: 0,
        coupon_money: 0,
        loading: !1,
        images: '' ,
        upload_picture_list: [],
        imagesList:[], 
        img:'/images/up.png',
        file:'',
        is_anonymous: false,
        name:"",
        phone:"",
        startDate: "请选择日期",
        multiArray: [['今天', '明天'], [8,9,10,11,12,13,14,15,16,17,18,19,20,21], [0,10,20,30,40,50]],
        multiIndex: [0, 0, 0],
        cartype:"",
        carprice:"",
        distance:"",
        duration:"",
        ewprice:[],
        pre_price:"",
        openid:"" 

    },
    onLoad: function(e) {
        this.init(e);
    },
    onReady: function() {
        app.setNavigation();
    },
    onShow: function() {
        this.isCoupons();
    },
    noUseCoupon: function() {
        
      wx.removeStorageSync("coupon"), this.isCoupons()
    },
    isCoupons: function() {
        var e = wx.getStorageSync("coupon"), o = this.data.real_price, t = 0, a = 0;
        e ? ((o = this.data.real_price - 1 * e.price) < 0 && (o = 0), t = e.id, a = e.price, 
        console.log(e),
        this.setData({
            coupon: e,
            real_price:o,
            coupon_money: a,
            coupon_id: t
        })) : this.setData({
            coupon: e,
            real_price: this.data.pre_price,
            coupon_money: a,
            coupon_id: t
        });
    },
    init: function(e) {
      var that = this;  
        var o = wx.getStorageSync("time");
        //获取订单
        wx.removeStorageSync("coupon");
        var name=wx.getStorageSync("name");
        var openid=wx.getStorageSync('user');//openid 
        o || (o = ""), this.setData({
            swiper_tap: e.swiper_tap,
            fahuo: wx.getStorageSync("fahuo"),
            shouhuo: wx.getStorageSync("shouhuo"),
            goods: wx.getStorageSync("goods"),
            time: o,
            distance: e.distance,
            price: e.price,
            real_price: e.price,
            name: name,
            volume: e.volume,
            phone:wx.getStorageSync("phoneObj"),
            openid:openid.openid
        });
        //接口拿数据
        
        wx.request({
            url: 'https://www.58hongtu.com/api/index/addorder', //接口地址
                  //method: "POST",
            data: {
                openid:openid.openid,
                tel: wx.getStorageSync("phoneObj"),
            },
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
                console.log(res.data.cartype)
                //console.log(obj);
                that.setData({
                  sn:res.data.data.sn,
                  cartype:res.data.data.cartype,
                  carprice:res.data.data.carprice,
                  distance:res.data.data.distance,
                  duration:res.data.data.duration,
                  ewprice:res.data.data.ewprice,
                  real_price:res.data.data.pre_price,
                  pre_price:res.data.data.pre_price 
                });

            },fail: function (res) {
             
            }
          })

    },
    remark: function(e) {
        this.setData({
            remark: e.detail.value
        });
    },
    bindCoupon: function() {
        var openid=wx.getStorageSync('user');//存储openid 
        wx.navigateTo({
            url: "../coupon/coupon?use="+openid.openid+"&price=" + this.data.price
        });
    },
    confirm: function(e) {
       console.log(e)
      var that = this 
       var openid=wx.getStorageSync('user');//openid 
       var name=wx.getStorageSync('name');//name 
       var maxLength=6; //上传几张照片
       if(name==""){
          app.hint("姓名不能为空~");
          return false
       }
       if(that.data.startDate=="" || that.data.startDate=="请选择日期"){
        app.hint("预约时间不能为空~");
        return false
      }
      if(that.data.tel==""){
        app.hint("电话不能为空~");
        return false
      }
      if(that.data.imgs=="" || that.data.imgs.length< maxLength){
        var imgln =0;
        if(that.data.imgs!=""){
          imgln=that.data.imgs.length;
        }
        app.hint("还有"+(maxLength-imgln)+"张照片要上传");
        return false
      }
      var coupon=wx.getStorageSync('coupon');//name 
      console.log(coupon)
       wx.request({
        url: 'https://www.58hongtu.com/api/index/saveorder', //接口地址
              //method: "POST",
        data: {
            openid:openid.openid,
            name:name,
            time:that.data.startDate,
            mark:that.data.remark,
            couponid:coupon.id,
            coupon_price:coupon.price,
            price:that.data.real_price,
            sn:that.data.sn
        },
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
            console.log(res)
            //console.log(obj);
            if(res.statusCode==200){
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
            
             wx.navigateTo({
              url: '../order_list/order_list',
             })
            }

        },fail: function (res) {
          wx.showToast({
            title: '网络异常，稍后重试',
            icon: 'error',
            duration: 2000
        })
        }
      })

    },
    uploader: function () {
        var that = this;
        var imgs = this.data.imgs;
        var imgid = 0;
        let imagesList = [];
        let maxSize = 1024 * 1024;
        let maxLength = 6;
        let flag = true;
        wx.chooseImage({
          count: 6, //最多可以选择的图片总数
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 'original', 
          sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有 'album', 
          success: function (res) {
            console.log(res)
            wx.showToast({
              title: '正在上传...',
              icon: 'loading',
              mask: true,
              duration: 500
            })
            for (let i = 0; i < res.tempFiles.length; i++) {
              if (res.tempFiles[i].size > maxSize) {
                flag = false;
                wx.showModal({
                  content: '图片太大，不允许上传',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')

                    }
                  }
                });
              }
            }
            if (res.tempFiles.length > maxLength) {
              
              wx.showModal({
                content: '最多能上传' + maxLength + '张图片',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('确定');
                  }
                }
              })
            }
            if (flag == true && res.tempFiles.length <= maxLength) {
              that.setData({
                imagesList: res.tempFilePaths
              })
            }
            console.log(res.tempFilePaths);
            var length = res.tempFilePaths.length;
           
            for(var i = 0; i < length; i++){ 
              if (imgs.length >= maxLength) {
                that.setData({
                  imgs: imgs
                });
                wx.showModal({
                  content: '最多能上传' + maxLength + '张图片',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('确定');
                    }
                  }
                })
                return false;
              } else {
                imgs.push(res.tempFilePaths[i]);
              }
              if(imgs==''){
                imgid=0;
              }else{
                imgid=imgs.length-1
              }
              var upurl="https://www.58hongtu.com/api/index/addimg?openid="+that.data.openid+"&sn="+that.data.sn+"&key="+imgid;
              wx.uploadFile({
                url: upurl,
                filePath: res.tempFilePaths[i],
                name: 'file',
                header: {
                  "Content-Type": "multipart/form-data"
                  // 'Content-Type': 'application/json'
                },
                success: function (data) {
                    console.log(data)
                      wx.showToast({
                      title: '成功',
                      icon: 'success',
                       duration: 2000
              })
                },
                fail: function (data) {
                  console.log(data);
                }
              });
    
            }
            // 成功之后上传到服务器
            that.setData({
              imgs: imgs
            });
            
          },
          fail: function (res) {
            console.log(res);
          }
        })
      },
      // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
    pay: function(o) {
        var t = this;
        homeModule.pay({
            id: o.order_id,
            order_number: o.order_num
        }).then(function(e) {
            homeModule.confirmPayRequest(e).then(function(e) {
                t.setData({
                    loading: !1
                }), wx.redirectTo({
                    url: "../order_detail/order_detail?id=" + o.order_id
                });
            }, function(e) {
                t.setData({
                    loading: !1
                });
            });
        }, function(e) {
            t.setData({
                loading: !1
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        wx.removeStorageSync("coupon");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.userShare();
    },
    pickerTap:function() {
        var date = new Date();
    
        var monthDay = ['今天','明天'];
        var hours = [];
        var minute = [];
    
        // 月-日
        for (var i = 2; i <= 12; i++) {
          var date1 = new Date(date);
          date1.setDate(date.getDate() + i);
          var md = (date1.getMonth() + 1) + "-" + date1.getDate();
          monthDay.push(md);
        }
    
        // 时
        for (var i = 8; i < 21; i++) {
          hours.push(i);
        }
    
        // 分
        for (var i = 0; i < 60; i += 10) {
          minute.push(i);
        }
    
        var data = {
          multiArray: this.data.multiArray,
          multiIndex: this.data.multiIndex
       };
        data.multiArray[0] = monthDay;
        data.multiArray[1] = hours;
        data.multiArray[2] = minute;
        this.setData(data);
    },
    pickerTap:function() {
      var date = new Date();
  
      var monthDay = ['今天','明天'];
      var hours = [];
      var minute = [];
  
      // 月-日
      for (var i = 2; i <= 28; i++) {
        var date1 = new Date(date);
        date1.setDate(date.getDate() + i);
        var md = (date1.getMonth() + 1) + "-" + date1.getDate();
        monthDay.push(md);
      }
  
      // 时
      for (var i = 0; i < 24; i++) {
        hours.push(i);
      }
  
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
  
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
     };
      data.multiArray[0] = monthDay;
      data.multiArray[1] = hours;
      data.multiArray[2] = minute;
      this.setData(data);
  },
    
  bindMultiPickerColumnChange:function(e) {

    var date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    var currentHours = date.getHours();
    var currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);
        
      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if(data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },

  loadData: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute){
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },
  bindStartMultiPickerChange: function (e) {
    console.log(e)
    var date = new Date();
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      var month = date.getMonth()+1;
      var day = date.getDate();
      monthDay = month + "月" + day + "日";
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
    }

    var startDate = monthDay + " " + hours + ":" + minute;
    that.setData({
      startDate: startDate
    })
  },
  inputBlur:function(e){
      console.log(e)
      var name = e.detail.value
      wx.setStorageSync("name", name)
  }
});