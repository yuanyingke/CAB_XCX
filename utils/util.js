const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function relaunch (){
  if (app.globalData.scene == 0) {
    if (wx.getStorageSync("policyHolderInfo").existFlag == 1) {
      wx.reLaunch({
        url: '../passportDetail/passportDetail',
      })
      return
    } else {
      wx.reLaunch({
        url: '../firstPage/firstPage',
      })
      return
    }
  }
}

module.exports = {
  formatTime: formatTime,
  relaunch: relaunch
}
