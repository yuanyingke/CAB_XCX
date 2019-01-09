// pages/confirmInfo/confirmInfo.js
var util = require('../../utils/util.js');
var app = getApp();
var requestUrl = app.globalData.officialUrl;
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked:false,
    dogInfo: {
    },
    centerHeight:0,
    bottomHeight:0,
    topHeight:0,
    contentHeight:0,
    scrollId:"topLoad1",
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dogInfo: wx.getStorageSync('dogInfo')
    })
  },
  back:function(){
    wx.navigateBack()
  },
  confirm:function(e){
    if (!this.data.isChecked){
      // let query = wx.createSelectorQuery().in(this)
      // query.select('#content').boundingClientRect((res) => {
      //   this.setData({
      //     scrollTop: res.bottom+1000*1
      //   })
      // }).exec()
      this.setData({
        scrollId:"agreeBoxA"
      })
      
      wx.showToast({
        title: '您还未阅读保险条款',
        icon:'none'
      })
    }else{
      wx.navigateTo({
        url: '../policyHolderInfo/policyHolderInfo',
      });
    }
  },
  toggleSelect:function(){
    this.setData({
      isChecked: !this.data.isChecked
    })
  },
  toInsuranceClause:function(){
      if (wx.getStorageSync("clausePath")) {
        this.data.clausePath = wx.getStorageSync("clausePath");
        if (this.data.clausePath != '') {
          //console.log("本地读取Clause文档")
          wx.openDocument({
            filePath: this.data.clausePath,
            success: function (res) {
              wx.hideLoading();
              //console.log('打开文档成功')
            }
          });
          return
        }
      }
      
      wx.showLoading({
        title: '',
      })
      wx.downloadFile({
        url: requestUrl + '/insurance-buy-common/static/insurance/insurance-clause.pdf',
        success: function (res) {
          var filePath = res.tempFilePath
          wx.saveFile({
            tempFilePath: filePath,
            success: function (res) {
              var savedFilePath = res.savedFilePath;
              wx.setStorageSync("clausePath", savedFilePath);
              wx.openDocument({
                filePath: savedFilePath,
                success: function (res) {
                  wx.hideLoading();
                  //console.log('打开文档成功')
                }
              });
            }
          })
        }
      })
  },
  toPupInsurance:function(){
    wx.navigateTo({
      url: '../pupInsurance/pupInsurance',
    })
  },
  centerLoad:function(e){
    this.setData({
      centerHeight: e.detail.height,
      contentHeight: this.data.centerHeight + this.data.bottomHeight + this.data.topHeight
    })
  },
  bottomLoad: function (e) {
    this.setData({
      bottomHeight: e.detail.height,
      contentHeight: this.data.centerHeight + this.data.bottomHeight + this.data.topHeight
    })
  },
  topLoad: function (e) {
    this.setData({
      topHeight: e.detail.height,
      contentHeight: this.data.centerHeight + this.data.bottomHeight + this.data.topHeight
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
    this.setData({
      contentHeight: this.data.centerHeight + this.data.bottomHeight + this.data.topHeight
    })
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