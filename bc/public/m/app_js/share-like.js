var g = window.global;
var idReg = /id=(\d+)/i;
var id = null;
var groups = idReg.exec(window.location.href);
if (groups && groups.length) {
    id = groups[1];
}
if (!id) {
    alert('信息不存在');
}

$(function () {
    $('.video').addClass('animated');
    $('.man').addClass('animated');

    if (id) {
        $.ajax({
            type: 'GET',
            url: global.SERVER_PATH + '/record/' + id + '?access_token=' + g.ACCESS_TOKEN,
            dataType: 'json',
            success: function (data) {
                if (data && data.id) {
                    var name = '';
                    if (data.nickname) {
                        name = data.nickname;
                    }
                    $('#name').html(name || '');
                    $('#headerImg').attr('src', data.avatar || '');
                    $('#num').html(data.snows || 0);
                    if (data.content) {
                        $('#likeTips').html(data.content);
                    }

                }
            },
            error: function () {
            }
        });
    }
    $.ajax({
        type: 'GET',
        url: g.SERVER_URL.USER_INFO + '?access_token=' + g.ACCESS_TOKEN,
        dataType: 'json',
        success: function (data) {
            if (data && data.id) {
                if (!id) {
                    var name = '';
                    if (data.nickname) {
                        name = data.nickname;
                    }
                    $('#name').html(name);
                    $('#headerImg').attr('src', data.avatar);
                }
            }
        },
        error: function () {
        }
    });


    var btb_s = true;
    $('#btn-s').bind('tap', function () {
        if (!btb_s) {
            return false;
        }
        btb_s = false;
        $.ajax({
            type: 'POST',
            url: g.SERVER_PATH + '/record/' + id + '/vote?access_token=' + g.ACCESS_TOKEN,
            dataType: 'json',
            success: function (data) {
                btb_s = true;
                if (data && data.code == 405) {
                    $('#tishi').show();
                    return false;
                }
                if (data && data.code == 200) {
                    $('#xuehuapiao').show().addClass('piao');
                    setTimeout(function () {
                        var num = $('#num').html();
                        num = parseInt(num);
                        $('#num').html(num + 1);
                        $('#xuehuapiao').hide().removeClass('piao');
                    }, 1000)
                }
                //$.hideIndicator();
            },
            error: function () {
                btb_s = true;
                //$.hideIndicator();
            }
        });
    });

    $('#tishibtn').bind('tap', function (a) {
        $('#tishi').hide();
        a.stopPropagation();
        return false;
    });
    function flipContainer() {
        $('.flip-container ').addClass('hover');
        $('.title').show();
        $('.man_small').show();
        setTimeout(function () {
            $('.flip-container ').hide();
            $('.title').addClass('showDow');
            $('.man_small').addClass('showDow');
            setTimeout(function () {
                $('.title').removeClass('showDow');
                $('.man_small').removeClass('showDow');
                setTimeout(function () {
                    $('.flip-container ').show();
                    $('.flip-container ').removeClass('hover');
                    setTimeout(flipContainer, 6000);
                }, 800)
            }, 6000)
        }, 800)
    }

    setTimeout(flipContainer, 2000)
});
