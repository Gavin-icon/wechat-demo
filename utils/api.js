function threedays (data) {
    return new Promise((resolve,reject) => {
        wx.request({
            url: 'https://devapi.qweather.com/v7/weather/3d?',
            data: {
              key: 'b8cb41e1090743ba97b75b5880eac40f',
              location: data.location
            },
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
module.exports = {
    threedays: threedays
}