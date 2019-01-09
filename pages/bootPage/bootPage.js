// pages/bootPage/bootPage.js
var util = require('../../utils/util.js');
var app = getApp();
let requestUrl = app.globalData.officialURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '',
    })
    var that = this;
    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: requestUrl + '/insurance-buy-common/api/wechat/getOpenIdByCode?code=' + res.code,
          success: function (res) {
            //console.log(res);
            if (res.data.rc == 0) {
              app.globalData.isLogin = true;
              app.globalData.header.cookie = 'insurance.session.id=' + res.data.user.sessionId;
              wx.setStorageSync("policyHolderInfo", res.data.user);
              if (res.data.user.existFlag == 1) {
                wx.redirectTo({
                  url: '../passportDetail/passportDetail',
                })
              }else{
                wx.redirectTo({
                  url: '../firstPage/firstPage',
                })
              }
            } else {
              wx.showToast({
                title: '获取openId失败',
                icon: "none"
              })
            }
          },
          fail: function (err) {
            wx.showToast({
              title: '获取openId失败',
              icon: "none"
            })
          }
        })
      }
    })
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