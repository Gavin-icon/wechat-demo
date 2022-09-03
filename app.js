// app.js
App({
  onLaunch() {
    var that = this
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getLocation({
        type: 'gcj02',
        success: function(res){
            wx.setStorageSync('longitude', res.longitude)
            wx.setStorageSync('latitude', res.latitude)
            that.globalData.position.longitude = res.longitude
            that.globalData.position.latitude = res.latitude
            that.globalData.position.speed = res.speed
            that.globalData.position.accuracy = res.accuracy
        }
    })
  },
  globalData: {
    userInfo: null,
    position: {
        longitude: '',
        latitude: '',
        speed: '',
        accuracy: ''
    }
  }
})
