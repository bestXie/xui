$(function () {
    var myVideo = document.getElementById('myVideo')
    $(window).bind('scroll load resize', function () {
        if ($(this).scrollTop() >= $(document).height()-$(window).height()) {
            myVideo.play();
            $('#mainBox').hide();
            $('#videoBox').css({"z-index":"1"});
        }
    });
    myVideo.addEventListener('ended',function(){
        myVideo.pause();
        $('#videoBox').hide();
        $('#myVideo').hide();
        $('#video-play').show();
        myVideo.muted=true;
    })
});
