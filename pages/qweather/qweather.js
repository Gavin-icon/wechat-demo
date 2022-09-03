const API = require('../../utils/api')

// pages/qweather/qweather.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        longitude: null,
        latitude: null,
        markers: [],
        threeDaily: [],
        icon: '../../static/images/marker.png'
    },
    doSearch(e) {
        if(e.currentTarget.dataset.keyword != "") {
            wx.navigateTo({
              url: '/pages/qweather/index?keyword=' + e.currentTarget.dataset.keyword,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
              that.setData({
                  longitude: res.longitude,
                  latitude: res.latitude,
                  markers: [{
                      id: 0,
                      latitude: res.latitude,
                      longitude: res.longitude,
                      iconPath: '/static/images/location.png',
                      width: 40,
                      height: 40,
                      callout: {
                          'display': 'ALWAYS',
                          'font-size': '30rpx',
                          'content': '我在这',
                          'padding': '8rpx',
                          'boxshadow': '0 0 5rpx #333',
                          'borderRadius': '4rpx'
                      }
                  }]
              })
              const data = {
                location: that.data.longitude+','+res.latitude
            }
              API.threedays(data).then(res => that.setData({threeDaily: res.data.daily}))
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