$(function(){
	$('.nav li').mouseover(function(){
		$(this).addClass('act').siblings().removeClass('act');
		$(this).addClass('act2').siblings().removeClass('act2');
	});
	$('.nav li').mouseout(function(){
		$(this).removeClass('act2');
	});
});
// 导航部分
$(function(){
	var arr=['#FF6900','#000','#193D85'];
	$('.banner ul li').each(function(i,item){
		$(item).css({'background':arr[i]});
	});
	var num=0;
		var timer=null;
		$('.banner ol li').mouseover(function(){
			if(!$('.banner ul li').is(":animated")){
				var index=$(this).index();
				$(this).addClass('act').siblings().removeClass('act');
				$('.banner ul li').eq(index).fadeIn(1000).siblings().fadeOut(1000);
			}
		});
		$('.banner .l').click(function(){
				num--;
				if(num==-1){
					num=4;
				}
				$('.banner ol li').eq(num).addClass('act').siblings().removeClass('act');
				$('.banner ul li').eq(num).fadeIn(1000).siblings().fadeOut(1000);
		});
		$('.banner .r').click(function(){
				num++;
				if(num==5){
					num=0;
				}
				$('.banner ol li').eq(num).addClass('act').siblings().removeClass('act');
				$('.banner ul li').eq(num).fadeIn(1000).siblings().fadeOut(1000);
		});
		function autoplay(){
				num++;
				if(num==5){
					num=0;
				}
				$('.banner ol li').eq(num).addClass('act').siblings().removeClass('act');
				$('.banner ul li').eq(num).fadeIn(1000).siblings().fadeOut(1000);
		}
		timer=setInterval(autoplay,2000);
		$('.banner').mouseover(function(){
			clearInterval(timer);
		});
		$('.banner').mouseout(function(){
			timer=setInterval(autoplay,2000);
		});
});
// 分类导航的js
$(function(){
	var arr=['url(image/icon-24.png) no-repeat 0 0','url(image/icon-24.png) no-repeat -300px 0','url(image/icon-24.png) no-repeat -621px 0'];
	var arr1=['url(image/icon-24.png) no-repeat 0 -127px','url(image/icon-24.png) no-repeat -300px -127px','url(image/icon-24.png) no-repeat -621px -127px'];
	$('.listNav li').mouseover(function(){
		var index=$(this).index();
		$('.listNav li span').eq(index).css({'background':arr[index]});
		$(this).addClass('act').siblings().removeClass('act');
	});
	$('.listNav li').mouseout(function(){
		var index=$(this).index();
		$('.listNav li span').eq(index).css({'background':arr1[index]});
		$(this).removeClass('act');
	});
});
//关注部分
$(function(){
	$('.guanzhu span').mouseover(function(){
		$(this).css({'background':'url(image/back.png) -82px -352px no-repeat'});
		$(this).siblings('.ewm').slideDown(400);
	});
	$('.guanzhu span').mouseout(function(){
		$(this).css({'background':'url(image/back.png) 0 -352px no-repeat'});
		$(this).siblings('.ewm').slideUp(400);
	});
});
// 主体部分
$(function(){
	$('.conR strong').mouseover(function(){
		$(this).css({'color':'white','background':'url(image/back.png) 0 -92px no-repeat'});
	});
	$('.conR strong').mouseout(function(){
		$(this).css({'color':'#FF6932','background':'url(image/back.png) 0 -54px no-repeat'});
	});
});
$(function(){
	$('.image1').mouseover(function(){
		//alert(1);
			$(this).children('img').stop().animate({'width':120+'%','height':120+'%','left':-30,'top':-16});
		
	}).mouseout(function(){
			$(this).children('img').stop().animate({'width':100+'%','height':100+'%','left':0,'top':0});
	});
});
	