var app = getApp();
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    texts: [
      '拥有CKU血统证书或身份识别卡的犬只，补充资料后即可拥有你的宠爱护照',
      '如果你拥有众安幼犬保险，添加犬只后激活。',
    ],
    imageHeight:0,
    scanResult:'',
    imageBtnHeight:0
  },
  toFillDogInfo:function(){
    if (wx.getStorageSync("policyHolderInfo").existFlag == 1) {
      wx.redirectTo({
        url: '../passportDetail/passportDetail',
      })
      return
    }
    wx.redirectTo({
      url: '../fillDogInfo/fillDogInfo',
    })
  },
  imageLoad:function(e){
    this.setData({
      imageHeight: e.detail.height
    })
    
  },
  imageBtnLoad: function (e) {
    this.setData({
      imageBtnHeight: e.detail.height
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
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
  
  },
  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        that.setData({
          result: res.result
        })
      },
      fail: function (res) {
      }
    })
  }
})