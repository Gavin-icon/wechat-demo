// pages/home/index.js
// 引入高德地图
const amap = require('../../utils/amap-config')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputShowed: false,
        inputVal: '',
        tips: []
    },
    showInput() {
        this.setData({
          inputShowed: true,
        });
      },
      hideInput() {
        this.setData({
          inputVal: '',
          inputShowed: false,
          tips: []
        });
      },
      clearInput() {
        this.setData({
          inputVal: '',
          tips: []
        });
      },
      inputTyping(e) {
        if (e.detail.value == "") {
            this.setData({
                inputVal: "",
                tips: []
            })
        }
        this.keyword(e.detail.value)
      },
    keyword(keyword) {
        var that = this
        amap.map.getInputtips({
            keywords: keyword,
            location: that.data.longitude+','+that.data.latitude,
            success: function(res) {
                console.log(res)
                that.setData({
                    tips: res.tips
                })
            }
        })
    },
    goRoute(e) {
        console.log(e)
        if (e.currentTarget.dataset.poilocation!=""){
            wx.navigateTo({
              url: '/pages/route/walking?poilocation='+e.currentTarget.dataset.poilocation,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        // 获取经纬度信息
        that.setData({
            'longitude': wx.getStorageSync('longitude'),
            'latitude': wx.getStorageSync('latitude')
        })
        // 逆地址解析
        amap.map.getRegeo({
            success(res) {
                console.log(res)
                res[0].iconPath = '/static/images/location.png'
                res[0].width='28px'
                res[0].height="35px"
                that.setData({
                    markers: res
                })
            },
            fail(mes){
                console.log(mes)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})