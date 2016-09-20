$(function () {
    var s, y = 0,
        C = 0,
        E = 0,
        v = 0,
        F = 0,
        L = 0,
        J = false,
        x = false,
        I = false,
        K = 256,
        G = z(-256, ".8"),
        M = z(0, ".8"),
        w = ".panel",
        R = "iScroll",
        H = $(".navbtn"),
        num = $("#menu");

    function t(a, b) {
        return Math.atan2(b, a) * 180 / Math.PI
    }

    function D(g, a, d, e) {
        var h = a - e;
        var f = d - g;
        var b = 0;
        if (Math.abs(f) < 2 && Math.abs(h) < 2) {
            return b
        }
        var c = t(f, h);
        if (c >= -45 && c < 45) {
            b = 4
        } else {
            if (c >= 45 && c < 135) {
                b = 1
            } else {
                if (c >= -135 && c < -45) {
                    b = 2
                } else {
                    if ((c >= 135 && c <= 180) || (c >= -180 && c < -135)) {
                        b = 3
                    }
                }
            }
        }
        return b
    }

    function z(a, b) {
        b = b || 0;
        return {
            "transition": b + "s",
            "-webkit-transition": b + "s",
            "transform": "translateX(" + a + "px)",
            "-webkit-transform": "translateX(" + a + "px)"
        }
    }

    function A(a) {
        s = $(this);
        I = false;
        v = 256;
        F = a.changedTouches[0].pageX;
        L = a.changedTouches[0].pageY;
        J = s.hasClass(R);
        num.show();
    }

    function u(a) {
        C = a.changedTouches[0].pageX;
        E = a.changedTouches[0].pageY;
        y = J ? -K + (C - F) : C - F;
        if (!I) {
            x = D(F, L, C, E);
            I = true
        }
        if (x == 3 || x == 4) {
            a.preventDefault();
        } else {
            x = false;
        }
        if(x){
            y = y > 0 ? 0 : y;
            y = y < -K ? -K : y;
            s.css(z(y));
        }
        a.stopPropagation()
    }

    function B(a) {
        if (!x) {
            return;
        }
        if (y < -parseInt(K / 2)) {
            s.addClass(R);
            s.css(G)
        } else {
            s.css(M);
            s.removeClass(R)
        }
        a.stopPropagation()
    }

    H.bind("click", function (a) {
        a.stopPropagation();
        var b = $(w);
        if (b.hasClass(R)) {
            b.css(M).removeClass(R)
        } else {
            num.show();
            b.css(G).addClass(R)
        }
        return false;
    });
    $(w).on("touchstart", A);
    $(w).on("touchmove", u);
    $(w).on("touchend", B);
    $('.video').addClass('animated');
    $('.man').addClass('animated');
});
