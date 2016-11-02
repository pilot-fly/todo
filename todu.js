$(function(){
	var add=$(".add");
	var input=$(".header input");
	var ul=$(".todulist");
	var todus=[];
	var starpos;
	if(localStorage.d){
		todus=JSON.parse(localStorage.d);
		render();
	}
	function render(){
		ul.empty();
		for(var i=0;i<todus.length;i++){
			var c=(todus[i].state)?"done":"";
			$('<li class="'+c+'"><div class="content">'+todus[i].name+'</div><div class="delet">x</div></li>').appendTo(".todulist");
			
		}
	}
	add.on("touchend",function(){
		var v=input.val();
		if(!v){
			return;
		}
		var todu={name:v,state:0};
		todus.push(todu);
		localStorage.d=JSON.stringify(todus);
		render();
		input.val("");
	});
	
	$('.todulist').on('touchstart','li',function(e){
		starpos=e.originalEvent.changedTouches[0].clientX;
	});
	$('.todulist').on('touchend','li',function(e){
		var n=e.originalEvent.changedTouches[0].clientX;
		if(n-starpos>=50){
			todus[$(this).index()].state=1;
			$(this).addClass("done");
			localStorage.d=JSON.stringify(todus);
		}
		if(n-starpos<-50){
			todus[$(this).index()].state=0;
			$(this).removeClass("done");
			localStorage.d=JSON.stringify(todus);
		}
	});

    //选项卡
    var lis=$('.foot li');
    lis.on('touchend',function(){
    	lis.removeClass('active');
    	$(this).addClass('active');
    	ul.find('li').show();
   	    var role=$(this).attr('data-role');
   	    if(role=='com'){
   	    	ul.find('li:not(.done)').hide();
   	    }else if(role=='re'){
   	    	ul.find('.done').hide();
   	    }
    });
    //删除
    ul.on('touchstart','.delet',function(){
    	var index=$(this).closest('li').index();
    	var li=$(this).closest('li');
    	li.addClass('piao');
    	li.delay(800).queue(function(){
    		$(this).remove().dequeue();
    	});
    	todus.splice(index,1);
    	localStorage.d=JSON.stringify(todus);
    	
    });
    //全部清除
    var clearall=$(".clearall");
    clearall.on("touchend",function(){
    	ul.find('.done').each(function(i){
    		$(this).delay(i*80).queue(function(){
    			$(this).addClass('piao');
				$(this).dequeue();
    		});
    	});
    	var t=800+ul.find('.done').length*80;
        ul.find('.done').delay(t).queue(function(){
    		ul.find('.done').remove();
    		$(this).dequeue();
    	});
    	var newarr=[];
    	for(var i=0;i<todus.length;i++){
    		if(todus[i].state==0){
    			newarr.push(todus[i]);
    		}
    	}
    	todus=newarr;
    	localStorage.d=JSON.stringify(todus);
    	clearall.html('清除已完成');
    	clearall.end();
    	clearall.delay(7000).html('全部清除');

    });
});
