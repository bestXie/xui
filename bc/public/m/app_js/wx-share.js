var g = window.global;
$(function() {
    $.get(g.SERVER_URL.WECHAT_SHARE_PARAMS, {url: window.location.href, debug: true}, function(result) {
        if (window.wx) {
            wx.config(result);
        }
    }, "json");
});

function wxShare(params) {
    var title = params.title;
    var desc = params.desc;
    var link = params.link;
    var pic = params.pic;
    wx.ready(function () {
        window.wx && wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc, //分享描述
            link: link, // 分享链接
            imgUrl: pic, // 分享图标
        });

        window.wx && wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: pic, // 分享图标
        });

        wx.error(function (err) {
            console.error(err);
        });
    })

}
window.onload = function(){
    initWxShare();
};
