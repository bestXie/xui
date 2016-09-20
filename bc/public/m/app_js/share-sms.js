var g = window.global;

$(function () {
    $('.video').addClass('animated');
    $('.man').addClass('animated');

    $.ajax({
        type: 'GET',
        url: g.SERVER_URL.USER_INFO + '?access_token=' + g.ACCESS_TOKEN,
        dataType: 'json',
        success: function (data) {
            if (data && data.id) {
                $('#name').html(data.nickname + ' 您好');
                $('#headerImg').attr('src', data.avatar);
            }
            //$.hideIndicator();
        },
        error: function () {
            //$.hideIndicator();
        }
    });

    $('#formBtn').bind('tap', function () {
        var content = $('#textarea').val();
        if (!content) {
            alert('请输入');
            return false;
        }
        $.ajax({
            type: 'POST',
            url: g.SERVER_URL.RECORD_CREATE + '?access_token=' + g.ACCESS_TOKEN,
            data: {'content': content},
            dataType: 'json',
            success: function (data) {
                if (data && data.id) {
                    window.location.href = "share-like.html?id=" + data.id;
                }
            },
            error: function () {
                alert('系统繁忙，请稍后重试!');
            }
        });
    })
});
