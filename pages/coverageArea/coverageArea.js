// pages/coverageArea/coverageArea.js
var util = require('../../utils/util.js');
import cityListObj from '../common/wx-index-list.js'
var app = getApp();
var requestUrl = app.globalData.officialURL;
var header = app.globalData.header;
var coverageObj = {

  /**
   * 页面的初始数据
   */
  data: {
    City: [],
      cityShow:'false',
      rightArr:[],
      jumpNum:'index0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '',
    })
    var that = this;
    var url = requestUrl + "/insurance-buy-common//insurance/v1/getSupCity";
    if (wx.getStorageSync("supCity") && wx.getStorageSync("supCity").hasCity == true){
      wx.hideLoading();
      //console.log("缓存读取支持城市");
      this.setData({
        City: wx.getStorageSync("supCity").City,
        rightArr: wx.getStorageSync("supCity").rightArr
      })
      return
    }
    wx.request({
      url: url,
      success: function (res) {
        if (res.data.rc!=0){
          wx.showToast({
            title: '热门城市获取出错',
            icon:'none'
          })
          return
        }
        //console.log(res)
        var cityData = [];
        let rightArr = [];
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
          rightArr.push(item.substr(0, 1));
          for (var i = 0; i < res.data.data[item].length; i++) {
            if (res.data.data[item][i].isHot == 1) {
              //console.log(res.data.data[item][i])
              obj.item.push(res.data.data[item][i])
            }
          }
        }
        cityData.unshift(obj);
        rightArr.unshift('热');
        that.setData({
          City: cityData,
          rightArr: rightArr
        })
        wx.setStorageSync("supCity", {
          City: cityData,
          rightArr: rightArr,
          hasCity:true
        });
        wx.hideLoading()
      },
      fail: function (err) {
        //console.log(err);
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

  },
  jumpMt(e) {

    let jumpNum = e.currentTarget.dataset.id;
    //console.log(jumpNum)
    this.setData({ jumpNum: jumpNum });
  }
};
// coverageObj['jumpMt'] = cityListObj.jumpMt;
Page(coverageObj);