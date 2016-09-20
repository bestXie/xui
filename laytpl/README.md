
## 简要
laytpl是一款颠覆性的JavaScript模板引擎，它用巧妙的实现方式，将自身的体积变得小巧玲珑，不仅性能接近极致，并且还具备传统前端引擎的几乎所有功能。所有的变身魔法都由不到1KB的代码创造，这仿佛是一场革命，又或者不是，但毋庸置疑的是，laytpl的确在用最轻量的方式呈现给世人。如果你对此心存质疑，没关系，下面的讲述将会让你迫不及待地选择laytpl，从此更好地把握页面的数据渲染，走上人生巅峰！

[文档与演示](http://sentsin.com/layui/laytpl/)   

![laytpl](http://sentsin.qiniudn.com/sentsinlaytpltuiguang.png)

## 优势
1. 性能卓绝，执行速度比号称性能王的artTemplate、doT还要快将近1倍，比baiduTemplate、kissyTemplate等快20-40倍，数据规模和渲染频率越大越明显。（[性能测试](http://sentsin.com/layui/laytpl/test.html)）
2. 体积小到极致，只有1kb。
3. 具备转义等安全机制，较科学的报错功能。
4. 模版中可任意书写Native JavaScript，充分确保模版的灵活度。
5. 支持应用在Node.js平台。
6. 支持所有古代或现代的主流浏览器。

## 更新日志

【1.1】 2014-08-16

1. 优化引擎的核心算法，性能大幅度提升。
2. 在不丧失功能的前提下，代码减少0.5kb
3. 模版规则微调，通过d来读取字段，如：{{ d.title }}
4. 修复缓存模版，并渲染不同数据时，视图不改变的bug

【1.0】 2014-8-10（首个版本）

## 备注
[官网](http://sentsin.com/layui/laytpl/)

