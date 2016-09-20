var btn =  document.getElementById('position-gift');
var bg = document.getElementById('bg-body');
var body = document.getElementById('body');
var content = document.getElementById('alert-body');
var close = document.getElementById('close');
btn.onclick=function(){
    bg.style.display = 'block';
    content.style.display = 'block';
    body.style.overflow = 'hidden';
};
close.onclick =function(){
    body.style.overflow = 'auto';
    bg.style.display = 'none';
    content.style.display = 'none';
};
new WOW().init();
