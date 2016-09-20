var wbshare =  'http://wildwithin.cn/2016vr/assets/share-weibo.png';
shareWeibo = function(text, image) {
  text = text || '#下一秒，全景BC#全新炫酷的VR视频将带你穿越时空，开启一次360°全景沉浸式的虚拟旅行。你将漫步在世界最大温带雨林间，乘快艇畅游超凡自然的山川湖泊，并与野生动物亲密接触。欢迎点击欣赏VR视频>> http://wildwithin.cn/2016vr/index.html 分享你的观后感，集36个赞就可赢取500份谷歌VR眼镜！@加拿大BC省旅游局';
  image = image || wbshare;
  WB2.anyWhere(function(W){
    W.widget.publish({
      'id': 'wb_publish',
      'default_text': text,
      'default_image': image,
      'callback' : function() {}
    });
  });
};

$(document).ready(startup);
function startup() {
  $('body').append('<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=2765913678&debug=true"></script>');
  $('.icon-weibo').on('click', shareWeibo);
}
function shareWeibo(e) {
  e.preventDefault();
  return exports.shareWeibo();
}