$(function () {
    var date = new Date();
    var date1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    if (!validTime(date1, "2015-07-15")) {
        $(".end").attr({
            style: "display:block"
        });
        return
    }
    
    $('#submit').on("click", function () {
        var phone = $("#phone").val();
        var bankCode = $("#bankCode").val();
        if (bankCode.replace(/(^\s*)|(\s*$)/g, '').length < 6) {
            alert("银行卡号错误!");
            document.getElementById("bankCode").focus();
            return;
        }

        var ptest = /^((?:13\d|14\d|15[\d]|17[\d]|18[\d])-?\d{5}(\d{3}|\*{3}))$/;
        if (phone != "") {
            if (!ptest.test(phone)) {
                alert("手机格式不正确!");
                document.getElementById("phone").focus();
                return;
            }
        } else {
            alert("手机号码不能为空!");
            document.getElementById("phone").focus();
            return;
        }

        $.ajax({
            async: false,
            type: "GET",
            url: "Handler.ashx?phone=" + phone + "&code=6EAF3B878255&checkCode=" + $("#code").val() + "&bankCode=" + $("#bankCode").val() + "&type=getCoupon",
            dataType: "json",
            success: function (data) {
                if (data.Status == -6) {
                    alert("银行卡号错误!");
                    document.getElementById("bankCode").focus();
                    return;
                }
                else if (data.Status == -5) {
                    alert("验证码错误!");
                    document.getElementById("code").focus();
                    return;
                }
                else if (data.Status == 1) {
                    location.href = "../PuFaBank/list.html?type=0&phone=" + phone;
                }
                else if (data.Status == -1) {
                    alert('活动已过期');
                }
                else if (data.Status == -2) {
                    alert('活动已关闭');
                }
                else if (data.Status == -3) {
                    alert('活动未开启');
                }
                else if (data.Status == -4) {
                    location.href = "../PuFaBank/list.html?type=1&phone=" + phone;
                } else {
                    alert('领取失败啦');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { }
        });

    });

    $('#getCode').on("click", function () {
        var phone = $("#phone").val();
        var ptest = /^((?:13\d|14\d|15[\d]|17[\d]|18[\d])-?\d{5}(\d{3}|\*{3}))$/;
        if (phone != "") {
            if (!ptest.test(phone)) {
                alert("手机格式不正确!");
                document.getElementById("phone").focus();
                return;
            }
        } else {
            alert("手机号码不能为空!");
            document.getElementById("phone").focus();
            return;
        }

        time(this);

        $.ajax({
            async: false,
            type: "GET",
            url: "Handler.ashx?phone=" + phone + "&type=sendCode",
            dataType: "text",
            success: function (data) { },
            error: function (XMLHttpRequest, textStatus, errorThrown) { }
        })
    });
});

//判断时间大小
function validTime(startTime, endTime) {
    var arr1 = startTime.split("-");
    var arr2 = endTime.split("-");
    var date1 = new Date(parseInt(arr1[0]), parseInt(arr1[1]) - 1, parseInt(arr1[2]), 0, 0, 0);
    var date2 = new Date(parseInt(arr2[0]), parseInt(arr2[1]) - 1, parseInt(arr2[2]), 0, 0, 0);
    if (date1.getTime() > date2.getTime()) {
        return false
    } else {
        return true
    }
    return false
}

//时间倒计时
var wait = 60;
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value = "获取验证码";
        wait = 60
    } else {
        o.setAttribute("disabled", true);
        o.value = wait + "秒后获取";
        wait--;
        setTimeout(function () {
            time(o)
        },
        1000)
    }
}
