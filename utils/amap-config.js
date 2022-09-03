const amap_file = require('./amap-wx.130')
const map = new amap_file.AMapWX({
    key: '41ff3247413c3d26b2d7fa1f3e2c232c'
})
module.exports = {
    map: map
}