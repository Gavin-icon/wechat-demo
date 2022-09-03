// pages/qweather/index.js
const amap = require('../../utils/amap-config')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        longitude: wx.getStorageSync('longitude'),
        latitude: wx.getStorageSync('latitude'),
        markers: []
    },
    globalMarkers: [],
    showMarkInfo(markersData, i) {
        console.log(1)
        this.setData({
            textData: {
                name: markersData[i].name,
                address: markersData[i].address,
                location: markersData[i].longitude+','+markersData[i].latitude
            }
        })
    },
    changeMarkIcon(markersData, i) {
        console.log(2)
        var that = this
        var temp = []
        // 循环遍历每一项去修改icon路径
        for (let j=0; j<markersData.length; j++) {
            if (i == j) {
                markersData[j].iconPath='../../static/images/marker_checked.png'
            }else {
                markersData[j].iconPath='../../static/images/marker.png'
            }
            temp.push({
                id: markersData[j].id,
                iconPath: markersData[j].iconPath,
                width: markersData[j].width,
                height: markersData[j].height,
                longitude: markersData[j].longitude,
                latitude: markersData[j].latitude
            })
        }
        that.setData({
            markers: temp
        })
    },
    // 点击地图上的标记点
    markertap(e) {
        console.log(e)
        const id = e.detail.markerId
        this.showMarkInfo(this.globalMarkers,id)
        this.changeMarkIcon(this.globalMarkers,id)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        console.log(options.keyword)
        // 将关键字设置为标题
        wx.setNavigationBarTitle({
          title: '周边'+options.keyword,
        })
        amap.map.getPoiAround({
            querykeywords: options.keyword,
            iconPath: '/static/images/marker.png',
            iconPathSelected: '/static/images/marker_checked.png',
            success(data){
                that.globalMarkers = data.markers
                console.log(that.globalMarkers)
                if (that.globalMarkers.length > 0){
                    that.setData({
                        markers: that.globalMarkers
                    })
                    that.showMarkInfo(that.globalMarkers, 0)
                    that.changeMarkIcon(that.globalMarkers, 0)
                }else {
                    that.setData({
                        textData: {
                            name: '暂未开通哦!'
                        }
                    })
                }
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