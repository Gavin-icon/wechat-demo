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

5. 页面跳转的几种方式：
wx.navigateTo() -- 跳转到非tabbar页面，保留当前页面
wx.navigateBack() -- 跳回,配合wx.navigateTo()使用
wx.redirectTo() -- 跳转到非tabbar页面，不保留当前页面
wx.switchTab() -- 跳转到tabbar页面
wx.reLaunch() -- 关闭内存中保留的页面，再跳转 | 同wx.redirectTo()相似
<navigator url="" open-type="navigate | navigateBack | redirect | switchTab | reLaunch"></navigator>

6. 小程序传参：data-keyword=""进行传递参数；配合bindtap跳转; 查询参数时: 通过e.currentTarget.dataset.keyword查询；

7. bindinput 对输入框事件绑定，查看输入的内容：e.detail.value
   bingtap 点击事件绑定

8. wx.showActionSheet: 弹出选择框的API，配置itemList参数为数组