$(function () {
    var str = ['<div class="rule-box" id="ruleBox">',
        '    <a href="javascript:;" class="quit" id="quit"></a>',
        '    <a href="javascript:;" class="icon-vr"></a>',
        '    <div class="rule-one" id="rule-box-one"><a href="javascript:;" class="btn" id="rule-box-btn"></a></div>',
        '    <div class="rule-three" id="rule-box-three"><a href="javascript:;" class="btn" id="rule-box-btn2"></a></div>',
        '    <div class="rule-two" id="rule-box-two">',
        '        <a href="javascript:;" class="btn" id="rule-box-btn3"></a>',
        '    </div>',
        '</div>'].join("");
    $('body').append(str);

    var dom = document;
    var oBtn1 = dom.getElementById('rule-box-btn');
    var oBtn2 = dom.getElementById('rule-box-btn2');
    var oOne = dom.getElementById('rule-box-one');
    var oTwo = dom.getElementById('rule-box-two');
    var oThree = dom.getElementById('rule-box-three');

    oBtn1.addEventListener('touchend', function (e) {
        oOne.style.display = 'none';
        oThree.style.display = 'block';
        e.preventDefault();
        e.stopPropagation();
    });
    oBtn2.addEventListener('touchend', function (e) {
        oThree.style.display = 'none';
        oTwo.style.display = 'block';
        e.preventDefault();
        e.stopPropagation();
    });
    $('#rule-box-btn3,#quit').click(function (e) {
        $('#ruleBox').hide();
        e.preventDefault();
        e.stopPropagation();
    });

    $('#showRuler').click(function () {
        $('#ruleBox').show();
        oOne.style.display = 'block';
        oThree.style.display = 'none';
        oTwo.style.display = 'none';
    });
});
