#bc-vr

### 安装与运行
* git clone 代码地址
* cd 项目地址
* npm install 服务器端依赖安装
* bower install 前端依赖安装
* 启动 node ./bin/www
* 访问地址 http://localhost:3000/

### 前端代码采用bower 管理
* 默认安装路径为 /public/libs/

### API
* 微信分享参数 
```
 地址:GET http://wildwithin.cn/wechat/api/jssdk-params
    参数: url

    如:
        http://wildwithin.cn/wechat/api/jssdk-params?url=http%3A%2F%2Fwildwithin.cn%2Fwechat%2Fmobile%2Fphoto.html

    返回结果:
        {
            debug: false,
            appId: "wx7a95447231077159",
            timestamp: "1451197889",
            nonceStr: "0a9hyb1iw9udi",
            signature: "23dc91932407dce89479a56a9b4713f19566bdf0",
            jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "uploadImage",
                "chooseImage",
                "previewImage",
                "downloadImage"
            ]
        }
```
