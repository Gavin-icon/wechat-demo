// pages/route/bus.js
const amap = require('../../utils/amap-config')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: '最便捷',
        listHeight: '50px',
        listShowed: false
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
    // 跳转到不同的tab页面
    changeNav(e) {
        wx.navigateTo({
          url: '/pages/route/'+e.currentTarget.dataset.type+'?poilocation='+this.data.poilocation,
        })
    },
    selectType(){
        // 0最便捷， 1最经济， 2最少换乘， 3最少步行， 5不乘地铁
        var that = this
        var itemList = ['最便捷','最经济','最少换乘','最少步行','不乘地铁']
        wx.showActionSheet({
          itemList: itemList,
          success:function(res) {
              if (res.tapIndex == 4) {
                  res.tapIndex = 5
              }
              // 修改type
              that.setData({
                  type: res.tapIndex==5 ? itemList[res.tapIndex-1] : itemList[res.tapIndex]
              })
            //   switch(res.tapIndex) {
            //     case 0:
            //         that.setData({
            //             type: itemList[0]
            //         })
            //         break;
            //     case 1:
            //         that.setData({
            //             type: itemList[1]
            //         })
            //         break;
            //     case 2:
            //         that.setData({
            //             type: itemList[2]
            //         })
            //         break;
            //     case 3: 
            //         that.setData({
            //             type: itemList[3]
            //         })
            //         break;
            //     case 5:
            //         that.setData({
            //             type: itemList[4]
            //         })
            //         break;
            //     default:
            //         type: itemList[0]
            //   }
            that.setData({
                strategy: res.tapIndex
            })
              const origin = wx.getStorageSync('longitude')+','+wx.getStorageSync('latitude')
              that.getBusRoute(origin, that.data.poilocation, that.data.strategy)
            }
        })
    },
    getBusRoute(origin, destination, strategy) {
        amap.map.getTransitRoute({
            origin:origin,
            destination: destination,
            strategy: strategy,
            city: '大同市',
            success(res){
                console.log(res)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options.poilocation!=""){
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
            var that = this
            const origin = wx.getStorageSync('longitude')+','+wx.getStorageSync('latitude')
            that.getBusRoute(origin,options.poilocation,0)
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