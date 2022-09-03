// pages/route/car.js
const amap =require('../../utils/amap-config')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listHeight: '50px',
        listShowed: false
    },
    // 跳转到不同的tab页面
    changeNav(e) {
        wx.navigateTo({
          url: '/pages/route/'+e.currentTarget.dataset.type+'?poilocation='+this.data.poilocation,
        })
    },
        // 查看详情
        checkDetail() {
            if (this.data.listShowed){
                this.setData({
                    listShowed: false,
                    listHeight: '50px'
                })
            }else {
                this.setData({
                    listShowed: true,
                    listHeight: '80vh'
                })
            }
        },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if(options.poilocation!=""){
            // 将poilocation设置到data中
            this.setData({
                poilocation: options.poilocation,
                markers: [
                    {
                        id: 1,
                        width: '28px',
                        height: '35px',
                        longitude: wx.getStorageSync('longitude'),
                        latitude: wx.getStorageSync('latitude'),
                        iconPath: '/static/images/nav_s.png'
                    },
                    {
                        id: 2,
                        width: '28px',
                        height: '35px',
                        longitude: parseFloat(options.poilocation.split(',')[0]),
                        latitude: parseFloat(options.poilocation.split(',')[1]),
                        iconPath: '/static/images/nav_e.png'
                    }
                ]
            })
            const origin = wx.getStorageSync('longitude')+','+wx.getStorageSync('latitude')
            var that = this
            var points = []
            amap.map.getDrivingRoute({
                origin: origin,
                destination: options.poilocation,
                strategy:0,
                success(data){
                    if(data.paths&&data.paths[0]&&data.paths[0].steps){
                        var steps = data.paths[0].steps
                        // 对每一个steps中的polyline进行拆分,将所有经纬度放在points数组
                        for (let i = 0; i < steps.length; i++) {
                            // '经度,纬度;经度,纬度;经度,纬度'
                            var poLen = steps[i].polyline.split(';')
                            // poLen: ['经度,纬度','经度,纬度','经度,纬度']
                            for(let j=0; j<poLen.length; j++) {
                                points.push({
                                    longitude: poLen[j].split(',')[0],
                                    latitude: poLen[j].split(',')[1]
                                })
                            }
                        }
                    }
                    that.setData({
                        polyline: [{
                            points: points,
                            color: "#0091ff",
                            width: 6
                        }],
                        steps: data.paths[0].steps
                    })
                    if (data.paths[0]&&data.paths[0].distance) {
                        that.setData({
                            distance: parseFloat(data.paths[0].distance / 1000).toFixed(1) + '公里'
                        })
                    }
                    if (data.paths[0]&&data.paths[0].duration) {
                        that.setData({
                            duration: parseFloat(data.paths[0].duration / 60).toFixed(1) + '分钟'
                        })
                    }
                }
            })
        }else {
            console.log('参数错误')
        }
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