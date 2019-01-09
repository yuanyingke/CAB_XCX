// pages/pupInsurance/pupInsurance.js
var util = require('../../utils/util.js');
var app = getApp();
var header = app.globalData.header;
var requestUrl = app.globalData.officialURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topHeight:0,
    infoPath:'',
    clausePath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },

  topLoad: function (e) {
    this.setData({
      topHeight: e.detail.height
    })
  },
  insuranceInfo:function(){
    if (wx.getStorageSync("infoPath")) {
      this.data.infoPath = wx.getStorageSync("infoPath");
    }
    if (this.data.infoPath != ''){
      //console.log("本地读取info文档")
      wx.openDocument({
        filePath: this.data.infoPath,
        success: function (res) {
         wx.hideLoading();
         //console.log('打开文档成功')
        }
      });
      return
    }
    wx.showLoading({
      title: '',
    })
    wx.downloadFile({
      url: requestUrl+'/insurance-buy-common/static/insurance/insurance-information.pdf',
      success: function (res) {
        var filePath = res.tempFilePath
        //console.log(filePath);
        wx.saveFile({
          tempFilePath: filePath,
          success: function (res) {
            var savedFilePath = res.savedFilePath;
            wx.setStorageSync("infoPath", savedFilePath);
            wx.openDocument({
              filePath: savedFilePath,
              success: function (res) {
                wx.hideLoading();
                //console.log('打开文档成功')
              }
            });
          },fail:function(err){
            //console.log(err)
          }
        })
        
      }
    })
  },
  insuranceClause: function () {
    if (wx.getStorageSync("clausePath")) {
      this.data.clausePath = wx.getStorageSync("clausePath");
    }
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
    wx.showLoading({
      title: '',
    })
    wx.downloadFile({
      url: requestUrl+'/insurance-buy-common/static/insurance/insurance-clause.pdf',
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
  coverageArea:function(){
    wx.navigateTo({
      url: '../coverageArea/coverageArea',
    })
  },
  afterSale: function () {
    wx.navigateTo({
      url: '../afterSale/afterSale',
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