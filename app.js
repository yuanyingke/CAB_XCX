var test1Url = "http://192.168.18.198:8181";
var test2Url = "http://192.168.18.100:8181";
var mapKey = 'LWFBZ-YZNKV-O44PJ-UO7YU-RNK5K-N4FH5';
var ceShiOfficialURL = "https://insuranceza.ceshi.chongaibao.com";
var officialURL = "https://insuranceza.chongaibao.com";

App({
  onLaunch: function () {
    wx.clearStorageSync();
  },
  globalData: {
    userInfo: null,
    officialURL: ceShiOfficialURL,
    isLogin:false,
    header: { 'cookie': '' },
    mapKey: mapKey,
    scene:1
  }
})