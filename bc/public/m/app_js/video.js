var g = window.global;
$(function () {
    var dataUrl = 'dataUrl', urls = [];
    dataUrl = dataUrl.replace(/([A-Z])/g, function (match, $1) {
        return "-" + $1.toLowerCase();
    });

    Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var number = this,
            negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    };
    var els = $('.' + dataUrl);
    if (els.length > 0) {
        els.each(function (i, item) {
            urls.push($(item).attr(dataUrl));
        });
        $.ajax({
            type: 'GET',
            url: g.SERVER_URL.GET_LINK_VIEW + '?access_token=' + g.ACCESS_TOKEN + '&urls=' + urls.join(','),
            dataType: 'json',
            success: function (data) {
                if (data && data.length > 0) {
                    els.each(function (i, item) {
                        $.each(data, function (j, jtem) {
                            if (jtem.url == $(item).attr(dataUrl)) {
                                var num = 0;
                                if (jtem.views) {
                                    num = parseInt(jtem.views).formatMoney(0);
                                }
                                $(item).html(num + '\u6b21\u64ad\u653e');
                            }
                        })
                    })
                }
            },
            error: function () {
            }
        });
    }
});
