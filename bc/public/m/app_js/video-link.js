$(function () {
    $('.video').addClass('animated');
    $('.man').addClass('animated');
    $('#ruler').bind('tap',function(){
        window.location.href ='share-rule.html?url_h=video-link';
    })
});
