function docReady() {
  initTips();
}

function initTips() {
  $('body').append('<div class="vr-tip1"></div><div class="vr-tip2"></div>');
  $('head').append(
    '<style>' + 
    '.vr-tip1 {' +
    '  position: absolute;' +
    '  left: 0;' +
    '  right: 0;' +
    '  top: 0;' +
    '  bottom: 0;' +
    '  opacity: 0;' +
    '  background: rgba(0,0,0,.33) url(http://cdn.wildwithin.cn/2016vr/vr-tip1-ed45696cc386023b59fd6bb9b8df6091.png) no-repeat center;' +
    '  transition: opacity .4s ease;' +
    '}' +
    '' +
    '.vr-tip2 {' +
    '  position: absolute;' +
    '  left: 60%;' +
    '  bottom: 8rem;' +
    '  width: 1.60rem;' +
    '  height: 0.60rem;' +
    '  opacity: 0;' +
    '  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAABWCAYAAADfVTrzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNEM5MkREQTNEMDkxMUU2QjczMkEwMjE3NzZGM0M5MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNEM5MkREQjNEMDkxMUU2QjczMkEwMjE3NzZGM0M5MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM0QzkyREQ4M0QwOTExRTZCNzMyQTAyMTc3NkYzQzkzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM0QzkyREQ5M0QwOTExRTZCNzMyQTAyMTc3NkYzQzkzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2siW2gAAEspJREFUeNrsnQt0FdUV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) no-repeat center / 160px 60px;' +
    '  transition: opacity .4s ease;' +
    '}' +
    '' +
    '.vr-tip1.vr-tip-show,' +
    '.vr-tip2.vr-tip-show {' +
    '  opacity: 1;' +
    '}' + 
    '' +
    '.hide,' +
    '.hidden,' +
    '[hidden] {' +
    '  display: none;' +
    '}' +
    '</style>'
  );

  showTip($('.vr-tip1'));
}

function showTip($el, callback) {
  delay(function() {
    $el.addClass('vr-tip-show');
    delay(function() {
      $el.removeClass('vr-tip-show');
      delay(function() {
        $el.addClass('hide');
        callback && callback();
      }, 400);
    }, 2000);
  }, 400);
}

function delay(fn, ms) {
  return window.setTimeout(fn, ms);
}

if (!window.jQuery || window.Zepto) {
  document.write('<script src="//cdn.bootcss.com/jquery/2.2.4/jquery.js"></script>');
}
$(document).on('ready', docReady);