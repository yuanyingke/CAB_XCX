// pages/fillDogInfo/fillDogInfo.js
var util = require('../../utils/util.js');
var QQMapWX = require('../common/lib/qqmap-wx-jssdk.min.js');
//获取应用实例
var qqmapsdk;
var app = getApp();
var requestUrl = app.globalData.officialURL;
var header = app.globalData.header;
var mapKey = app.globalData.mapKey;
console.log(requestUrl)
Page({
  data: {
    chipNo:'',
    dogInfo:{
    },
    City: [],
    cityShow:false,
    cityName:'请选择',
    dogInfoShow:false,
    supportCity:false
  },
  selectCity:function(){
    this.setData({
      cityShow:true
    })
  },
  binddetail:function(e){
    this.setData({
      cityShow: false,
      cityName: e.detail.name,
      chipNo: this.data.chipNo
    })
    this.checkSuppportCity('', e.detail.name);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.navigateTo({
    //   url: '../confirmInfo/confirmInfo',
    // })
    
    if (options.close == 'true') {
      wx.navigateBack({
         delta: 10
      })
      return
    }
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      //key: 'TOABZ-57CR6-MHLSO-MWVSM-JB6XK-AFBNX'
      key: mapKey
    });
    let that = this;
    this.getAllCity();
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        wx.showToast({
          title: '加载中...',
          icon: 'loading'
        })
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            //console.log(res)
            that.setData({
              cityShow: false,
              cityName: res.result.ad_info.city
            });
            that.checkSuppportCity(res.result.ad_info.province,res.result.ad_info.city);
          },
          fail: function (err) {
            //console.log(err)
            that.setData({
              provinceName: '',
              cityName: '请选择',
              supportCity: false
            });
            wx.hideToast();
            wx.showToast({
              title: '获取定位失败,请手动选择犬只饲养地',
              icon: 'none'
            })
          },
        });
      },
      fail: function (err) {
      //console.log(err)
        wx.showToast({
          title: '获取定位失败,请手动选择犬只饲养地',
          icon:'none'
        })
      }
    })
  },
  getAllCity:function(){
    var that = this;
    if (wx.getStorageSync("allCity") && wx.getStorageSync("allCity").hasAllCity == true) {
      wx.hideLoading();
      //console.log("缓存读取所有城市");
      this.setData({
        City: wx.getStorageSync("allCity").City
      })
      return
    }
    wx.request({
      url: requestUrl + '/insurance-buy-common//insurance/v1/getNaCity',
      success: function (res) {
        var cityData = [];
        var obj = {
          title: "热门城市",
          isHot: 1,
          item: []
        };
        for (var item in res.data.data) {
          cityData.push({
            title: item,
            item: res.data.data[item]
          })
          for (var i = 0; i < res.data.data[item].length; i++) {
            if (res.data.data[item][i].isHot == 1) {
              obj.item.push(res.data.data[item][i])
            }
          }
        }
        cityData.unshift(obj);
        that.setData({
          City: cityData
        })
        wx.setStorageSync("allCity", {
          City: cityData,
          hasAllCity: true
        });
      },
      fail: function (err) {
        //console.log(err);
      }
    })
  },
  checkSuppportCity: function (province, city) {
    //console.log(header);
    var that = this;
    wx.request({
      url: requestUrl+'/insurance-buy-common//insurance/v1/isSupCity',
      header:header,
      data: {
        city: city
      },
      success: function (res) {
        //console.log(res);
        wx.hideToast();
        that.setData({
          provinceName: province,
          cityName: city,
          supportCity: true
        });
        if (res.data.rc == 0 && res.data.data == 'true') {

        }else{
          wx.showModal({
            title: '',
            content: '您当前所在的城市众安幼犬保险未开通，可能会导致无法成功理赔。',
            cancelText: "以后再说",
            confirmText: "继续开通",
            success: function (res) {
              if (res.confirm) {
                
              } else if (res.cancel) {
                //console.log('用户点击取消')
                that.setData({
                  provinceName: '',
                  cityName: '请选择',
                });
              }
            }
          })
        }
      },
      fail: function (err) {
        console.log(err)
        wx.hideToast();
        wx.showToast({
          title: '获取定位失败,请手动选择犬只饲养地',
          icon:"none"
        })
      }
    })
  },
  bindSave:function(){
    if(!app.globalData.isLogin){
      wx.showToast({
        title: '未获取到sessionId,请重新登陆',
        icon: "none"
      })
    }else if (this.data.cityName == "请选择"){
      wx.showToast({
        title: '请选择犬只饲养地',
        icon: "none"
      })

    } else if (this.data.chipNo == '' || this.data.chipNo.length == 0) {
      wx.showToast({
        title: '芯片号输入不能为空',
        icon: "none"
      })
    } else if (!this.data.dogInfoShow || this.data.chipNo.length != 15){
        wx.showToast({
          title: '芯片号输入错误，请重新输入',
          icon:"none"
        })
    }else{
      this.data.dogInfo.chipNo = this.data.chipNo;
      this.data.dogInfo.cityName = this.data.cityName;
      wx.setStorageSync('dogInfo', this.data.dogInfo);
      wx.navigateTo({
        url: '../confirmInfo/confirmInfo',
      })
    }
  },
  
  chipNoChange:function(e){
    
    var that = this;
    var chipNo = e.detail.value;
    this.data.chipNo = chipNo;
    if (chipNo.length == 15){
        wx.showLoading({
          title: '加载中',
          mask: true
        });
      
      wx.request({
        url: requestUrl + "/insurance-buy-common//insurance/v1/getDog",
        method:"GET",
        header:header,
        data:{
          key: chipNo
        },
        success: function (res) {
          //console.log(res.data.data);
          wx.hideLoading();
          if(res.data.rc == 0 && res.data.data){
            if (res.data.data == "CKU官网查询犬接口出错！"){
              wx.showToast({
                title: 'CKU官网查询犬接口出错！',
                icon:"none"
              })
              return false
            }
            if (res.data.data == 1) {
              wx.showModal({
                title: '提示',
                content: '本犬犬龄已超过270日，已经不适用该保险',
                showCancel: false,
                confirmText: "我知道了",
                success: function (res) {
                  if (res.confirm) {
                    //console.log('用户点击确定')
                  } else if (res.cancel) {
                    //console.log('用户点击取消')
                  }
                }
              })
              that.setData({
                dogInfo: {},
                dogInfoShow: false
              })
              return false
            }
            var date1 = res.data.data.birthdate;
            var myDate = new Date();
            var date2 = myDate.getFullYear() + "-" + myDate.getMonth() + "-" +myDate.getDate();
            date1 = date1.split('-');
            date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
            date2 = date2.split('-');
            date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
            var m = Math.abs(date1 - date2);
            res.data.data.monthText = m+"个月";
            that.setData({
              dogInfo: res.data.data,
              dogInfoShow: true
            })
            if (res.data.data.days < 90 || res.data.data.days == 90){
              wx.showModal({
                title: '提示',
                content: '本犬犬龄不足3个月，保险将在该犬只犬龄满3月时自动激活',
                showCancel: false,
                confirmText: "我知道了",
                success: function (res) {
                }
              })
            }
          } else if (res.data.rc < 0){
            wx.showToast({
              title: res.data.msg,
              icon:"none"
            })
          }
        },
        fail: function (err) {
         // console.log(res)
          wx.showToast({
            title: '犬只信息获取失败,请稍后重试',
            icon:"none"
          })
        },
      })
    }else{
      this.setData({
        dogInfo: '',
        dogInfoShow: false
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})