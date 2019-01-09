var util = require('../../utils/util.js');
var app = getApp();
var header = app.globalData.header;
var requestUrl = app.globalData.officialURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    userName:'',
    userCard:'',
    code:'',
    messageTime:60,
    isSend:false
  },
  codeInput:function(e){
    this.data.code = e.detail.value;
  },
  mobileInput: function (e) {
    this.data.mobile = e.detail.value;
  },
  nameInput: function (e) {
    this.data.userName = e.detail.value;
  },
  cardInput: function (e) {
    this.data.userCard = e.detail.value;
  },
  getCode: function () {
    var that = this;
    var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
    if(reg.test(this.data.mobile)){
      wx.request({
        url: requestUrl+'/insurance-buy-common/api/open/getMobileCode',
        header:header,
        data:{
          mobile:this.data.mobile
        },
        success:function(res){
          //console.log(res)
        },
        fail: function (err) {
          wx.showToast({
            title: '该手机号已超过每日发送验证码次数上限 ',
            icon:"none"
          })
        }
      })
      this.setData({
        isSend:true
      });
      var codeTimer = setInterval(function(){
        var messageTime = that.data.messageTime-1;
        that.setData({
          messageTime: messageTime
        });
        if (messageTime <=0){
          clearInterval(codeTimer);
          that.setData({
            isSend: false,
            messageTime:60
          });
        }
      },1000);
    }else{
      wx.showToast({
        title: '手机号格式不正确',
        icon:"none"
      })
    }
  },
  getCodeNotice:function(){
    wx.showToast({
      title: '请稍后再获取验证码',
      icon: 'none'
    })
  },
  bindSave:function(){ 
    var that = this;
    var nameReg = /^[\u4e00-\u9fa5]{2,5}$/;
    var idCard = this.data.userCard;
    if(this.data.mobile.length != 11){
      wx.showToast({
        title: '手机号输入有误',
        icon:"none"
      })
    } else if (this.data.code == '' || this.data.code == undefined){
      wx.showToast({
        title: '请输入验证码',
        icon: "none"
      })
    }else if (this.data.userName.length < 2 || this.data.userName.length > 5 || !nameReg.test(this.data.userName)){
      wx.showToast({
        title: '姓名输入有误',
        icon: "none"
      })
    }else{
      this.checkIdCard(idCard);
      if (this.data.isIdCard) {
        wx.showLoading({
          title: '',
        })
        wx.request({
          url: requestUrl+'/insurance-buy-common/api/insurance',
          header:header,
          method:"POST",
          data: {
            mobile: that.data.mobile,
            code:that.data.code,
            cardNo: that.data.userCard,
            name: that.data.userName
          },
          success: function (res) {
            if(res.data.rc == 0){
              wx.setStorageSync("insuranceInfo", res.data);
              wx.reLaunch({
                url: '../passportDetail/passportDetail',
              })
            }else{
              wx.showToast({
                title: res.data.msg,
                icon:'none'
              })
            }
          },
          fail: function (err) {
            //console.log(err)
            wx.showToast({
              title: err.data.msg,
              icon: "none"
            })
          },
        })
      } else {
        wx.showToast({
          title: '身份证号格式不正确',
          icon: "none"
        })
        return
      }
    } 
  },
  checkIdCard:function(idCard){
    var isIdCard = false;
    //15位和18位身份证号码的正则表达式  
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算  
    if (regIdCard.test(idCard)) {
      if (idCard.length == 18) {
        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里  
        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组  
        var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和  
        for (var i = 0; i < 17; i++) {
          idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
        }

        var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置  
        var idCardLast = idCard.substring(17);//得到最后一位身份证号码  

        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X  
        if (idCardMod == 2) {
          if (idCardLast == "X" || idCardLast == "x") {
            isIdCard = true;
          } else {
            isIdCard = false;
          }
        } else {
          //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码  
          if (idCardLast == idCardY[idCardMod]) {
            isIdCard = true;
          } else {
            isIdCard = false;
          }
        }
      }
    } else {
      isIdCard = false;
    }
    this.setData({
      isIdCard: isIdCard
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var policyHolderInfo = wx.getStorageSync("policyHolderInfo");
    if (policyHolderInfo.name != ''){
      this.setData({ userName: policyHolderInfo.name})
    }
    if (policyHolderInfo.mobile != '') {
      this.setData({ mobile: policyHolderInfo.mobile })
    }
    if (policyHolderInfo.cardNo != '') {
      this.setData({ userCard: policyHolderInfo.cardNo })
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