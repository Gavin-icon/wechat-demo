### 小程序开发储备知识：
1. wx.getLocation({
    type: 'wgs84' | 'gcj02', 默认是wgs84
    success: function(res){
        console.log(res)
    }
})
同时需要配置app.json：{
    "permisson": {
        "scope.userLocation": {
            "desc": "允许获取您的地理信息"
        }
    }
}

2. wx.request({
    url: 'url',
    data: {

    },
    success: function(res) {
        conosle.log(res)
    }
})

3. map组件：
<map longitude="" latitude="" scale="" markers="" name=""></map>
markers = [{ id: '', longitude: '', latitude: '', iconPath: '', width: '', height: '', callout: {} }]

4. 模板调用：
模板创建： <template name=""></template>
模板调用：<import src=""></import> <template is=""></template>