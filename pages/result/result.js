// pages/result/result.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconSize:80,
    success:true
  },
  changeStatus:function(){
    this.setData({
      success:!this.data.success
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var insuranceInfo = wx.getStorageSync("insuranceInfo").data;
    this.setData({
      policyEndDate: insuranceInfo.policyEndDate || "",
      policyStartDate: insuranceInfo.policyStartDate || "",
      dogObPeriodTo: (insuranceInfo.dogObPeriodTo || "").slice(0, 8),
      dogObPeriodFrom: (insuranceInfo.dogObPeriodFrom || "").slice(0, 8),
      dogGuPeriodTo: (insuranceInfo.dogGuPeriodTo || "").slice(0, 8),
      dogGuPeriodFrom: (insuranceInfo.dogGuPeriodFrom || "").slice(0, 8)
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