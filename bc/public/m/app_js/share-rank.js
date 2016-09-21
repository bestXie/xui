var g = window.global;

$(function () {
    var pageN = 1, flag = true, isLoad = false, clickFlag = true;

    function getList(pageN) {
        if (!flag) {
            return false;
        }
        flag = false;
        $.ajax({
            type: 'GET',
            url: g.SERVER_URL.RECORD_RANK + '?access_token=' + g.ACCESS_TOKEN + '&pz=10&p=' + pageN,
            dataType: 'json',
            success: function (data) {
                flag = true;
                if (data && data.length > 0) {
                    ruPageList(data);
                    if (data.length == 10) {
                        isLoad = true;
                    } else {
                        isLoad = false;
                    }
                } else {
                    isLoad = false;
                }
            },
            error: function () {
                flag = true;
            }
        });
    }

    var str = '<div class="flex rank-entry" data-nid="{id}">'
        + '<div class="col-9">'
        + '<div class="vote-user">'
        + '<span>{name}</span><span class="vote-area"><span class="icon-snow"></span><strong class="vote-count">{num}</strong></span>'
        + '</div>'
        + '<div class="vote-text">{txt}</div>'
        + '</div>'
        + '<div class="col-3 text-center"><button class="btn btn-md vote-btn-selected {class}">送雪花</button></div>'
        + '</div>'
        + '<div class="divider"></div>';

    function ruPageList(data) {
        var listHtml = '';
        for (var i = 0, len = data.length; i < len; i++) {
            var itemid = data[i].id,
                itemname = data[i].nickname || '',
                itemnum = data[i].snows || 0,
                itemtxt = data[i].content || '',
                itemclass = '';
            listHtml += str.replace(/{id}/g, itemid).replace(/{name}/g, itemname).replace(/{num}/g, itemnum).replace(/{txt}/g, itemtxt).replace(/{class}/g, itemclass)
        }
        $('#rankList').append(listHtml);
    }


    $(window).bind('scroll load resize', function () {
        if ($(this).scrollTop() >= $(document).height() - $(window).height()) {
            if (isLoad) {
                pageN = pageN + 1;
                getList(pageN)
            }
        }
    });
    $('#xui-toast-close').click(function () {
        $('#xui-toast').hide();
    });
    getList(1);
    var btb_s = true;
    $('.btn').live('tap', function () {
        var _this = $(this);
        //if (!clickFlag) {
        //    $('#xui-toast').show();
        //    return false;
        //}
        if (!btb_s) {
            return false;
        }
        btb_s = false;
        var id = _this.parents('.rank-entry').attr('data-nid');
        $.ajax({
            type: 'POST',
            url: g.SERVER_PATH + '/record/' + id + '/vote?access_token=' + g.ACCESS_TOKEN,
            dataType: 'json',
            success: function (data) {
                btb_s = true;
                if (data && data.code == 405) {
                    $('#xui-toast').show();
                    clickFlag = false;
                    return false;
                }

                if (data && data.code == 200) {
                    _this.addClass('vote-btn');
                    var onum = _this.parents('.rank-entry').find('.vote-count')
                    var num = onum.html();
                    num = parseInt(num);
                    onum.html(num + 1);
                }
            },
            error: function () {
                btb_s = true;
            }
        });
    })
});
