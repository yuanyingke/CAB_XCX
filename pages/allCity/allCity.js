var util = require('../../utils/util.js');
var app = getApp();
let requestUrl = app.globalData.officialURL;
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allCity: [],
    cityShow: 'true',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '',
    // })
    var that = this;
    var url = requestUrl + "/insurance-buy-common//insurance/v1/getNaCity";
    var cityData = [];
    wx.request({
      url: url,
      success: function (res) {
        wx.hideLoading();
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
          allCity: cityData
        })
      },
      fail: function (err) {
        //console.log(err);
      }
    })
  },
  binddetail: function (e) {
    //wx.setStorageSync("cityName", e.detail.value);
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