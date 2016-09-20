### 接口文档

* 链接访问量

```
url: /link/view
method: POST
参数: url

测试
curl -d url=http://localhost:3000/test http://localhost:3000/link/view
返回结果:
{"code":200,"msg":"SUCCESS"}
```

* 获取链接访问量
```
url: /link/view
method: GET
参数: urls
测试: curl http://localhost:3000/linl/view?urls=url1,url2, 多个链接逗号分隔
返回结果：
[{"url":"url1","views":0},{"url":"url2","views":0}]
```

* 生成新纪录

```
url: /record/create?access_token=凭证
method POST
参数: content
测试:
curl -d content=test http://localhost:3000/record/create?access_token=test2016
返回结果：
{"id":2,"nickname":"昵称"avatar":"","content":"test","snows":0}
```

* 获取单条记录
```
url: /record/记录ID
method: GET
参数: 无
测试:
http://localhost:3000/record/2?access_token=test2016
返回结果：
{"id":2,"content":"test","user_id":1,"nickname":"王大拿","avatar":"","create_at":"2016-09-10T10:30:13.000Z","snows":0}
```

* 投票
```
url: /record/记录ID/vote?access_token=凭证
method: POST
参数: 无
测试:
curl -d snows=1 http://localhost:3000/record/1/vote?access_token=test2016
返回结果：
{"code":200,"msg":"SUCCESS"}
```

* 获取用户信息
```
url: /user-info?access_token=凭证
method: GET
参数:无
测试:
curl http://localhost:3000/user-info?access_token=test2016
返回结果： {"id":1,"nickname":"昵称"avatar":""}
```

* 获取记录列表
```
url: /records?access_token=凭证&p=页数&pz=每页条数
method: GET
测试:
curl http://localhost:3000/records?access_token=test2016&p=1&pz=20
返回结果:
[
  {"id":1,"content":"test","user_id":1,"nickname":"鐜嬪ぇ鎷?,"avatar":"","create_at":"2016-09-10T10:12:54.000Z","snows":3},
  {"id":2,"content":"test","user_id":1,"nickname":"鐜嬪ぇ鎷?,"avatar":"","create_at":"2016-09-10T10:30:13.000Z","snows":0}
]
```