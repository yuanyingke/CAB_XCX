// pages/passportDetail/passportDetail.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dogInfo: {},
    insuranceInfo:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var policyHolderInfo = wx.getStorageSync("policyHolderInfo");
    if (policyHolderInfo.existFlag == 1) {
      var date1 = policyHolderInfo.insuranceDog.birthdate;
      var myDate = new Date();
      var date2 = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDate();
      date1 = date1.split('-');
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
      date2 = date2.split('-');
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
      var m = Math.abs(date1 - date2);
      policyHolderInfo.insuranceDog.monthText = m + "个月";
      this.setData({
        dogInfo: policyHolderInfo.insuranceDog,
        insuranceInfo: policyHolderInfo
      })
    }else{
      if (wx.getStorageSync("insuranceInfo") && wx.getStorageSync('dogInfo')) {
        this.setData({
          dogInfo: wx.getStorageSync('dogInfo'),
          insuranceInfo: wx.getStorageSync("insuranceInfo").data
        })
      }
    }
    
  },
  ZADeatil:function(){
    wx.downloadFile({
      url: "https" + this.data.insuranceInfo.contractURL.substring(4),
      success: function (res) {
        var filePath = res.tempFilePath
        //console.log(filePath);
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                wx.hideLoading();
                //console.log('打开文档成功')
              }
            });
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