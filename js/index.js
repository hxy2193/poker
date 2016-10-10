$(function(){
	//红桃:H 黑桃:S 梅花:C 方块:D
	var item=$('.item')
	var doorl=$('.doorl')
	var doorr=$('.doorr')
	var fapai=$('.fapai')
	var restart=$('.restart')
	var btn=$('.btn')
	var movel=$('.move-left')
	var mover=$('.move-right')
	item.on('click',function () {
		item.addClass('up')
		doorl.addClass('l')
		doorr.addClass('r')
		btn.delay(1000).animate({opacity:1},3500)

	})
	fapai.on('click',function () {
		setPoker(makePoker())
		movel.delay(1500).animate({opacity:1},2500)
		mover.delay(1500).animate({opacity:1},2500)
	})
	restart.on('click',function () {
		location.reload();
		return poke;
	})
	function makePoker(){
		var color=['h','s','c','d'];
		var dirt={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K'};
		 poker=[];
		var info={};
		while(poker.length!=52){
			var num=Math.ceil(Math.random()*13);
			var cc=Math.floor(Math.random()*4);
			var m={
				num:dirt[num],
				color:color[cc]
			}
			if(!(info[m.num+m.color])){
				poker.push(m);
				info[dirt[num]+color[cc]]=true;
			}
		}
		return poker;
	}

	function setPoker(poker) {
		var index=0;
		for(var i=0;i<7;i++){
			for(var j=0;j<=i;j++){
				poke=poker[index];
				index++;
				$("<div>").attr('id',i+'_'+j).attr('number',poke.num).addClass('poke').appendTo(".box").css({backgroundImage:'url(./image/'+poke.num+poke.color+'.png)'}).delay(20*index).animate({top:35*i,left:(6-i)*65+130*j+50,opacity:1})
			}
		}
		for(;index<poker.length;index++){
			poke=poker[index];
			$("<div>").attr('number',poke.num).addClass('poke left').appendTo(".box").css({backgroundImage:'url(./image/'+poke.num+poke.color+'.png)'}).delay(20*index).animate({top:402,left:190,opacity:1})
		}
		// return $('.poke')
// return poker
		$(".poke").on("click",function(){

			if($(this).attr('id')&&!canClick($(this))){
				return;
			}
			var num=getNum($(this));
			$(this).css({border:'4px solid red'});
			if(num===13){
				$(this).animate({top:0,left:700}).queue(function(){
					$(this).detach().dequeue()
				})
				return;
			}else{
				if(prev){
					if((getNum(prev)+getNum($(this)))==13){
						prev.add($(this)).animate({top:0,left:700}).queue(function(){
							$(this).detach().dequeue()
						})
					}else{
						prev.add($(this)).css({border:'none'})
					}
					prev=null;
				}else{
					prev=$(this);
				}
			}
		})
	}

	// setPoker(makePoker())
	var btnr=$(".box .move-right");
	var zIndex=1;
	btnr.on("click",function(){

		return function(){
			if($(".box .left").length){
				$(".box .left").last().css({zIndex:zIndex++}).animate({left:690}).queue(function(){
					$(this).removeClass("left");
					$(this).addClass("right");
					$(this).dequeue()
				})
			}
		}
	}())
	var btnl=$(".box .move-left");
	btnl.on("click",function(){

		var num=0;
		return function(){
			if($(".box .left").length){
				return;
			}
			num++;
			if(num>3){
				return;
			}
			$(".box .right").each(function(i,v){
				$(this).css({zIndex:zIndex++}).delay(i*20).animate({left:190}).queue(function(){
					$(this).addClass("left");
					$(this).removeClass("right");
					$(this).dequeue()
				})
			})
		}
	}())
	function getNum(el){
		var num=el.attr('number');
		if(num=='A'){num='1'}
		if(num=='T'){num='10'}
		if(num=='J'){num='11'}
		if(num=='Q'){num='12'}
		if(num=='K'){num='13'}
		return parseInt(num);
	}
	function canClick(el){
		var x=parseInt(el.attr("id").split("_")[0]);
		var y=parseInt(el.attr("id").split("_")[1]);
		if($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length){
			return false;
		}else{
			return true;
		}
	}
	var prev=null;

	// $(".poke").on("click",function(){
    //
	// 	if($(this).attr('id')&&!canClick($(this))){
	// 		return;
	// 	}
	// 	var num=getNum($(this));
	// 	$(this).css({border:'1px solid red'});
	// 	if(num===13){
	// 		$(this).animate({top:0,left:700}).queue(function(){
	// 			$(this).detach().dequeue()
	// 		})
	// 		return;
	// 	}else{
	// 		if(prev){
	// 			if((getNum(prev)+getNum($(this)))==13){
	// 				prev.add($(this)).animate({top:0,left:700}).queue(function(){
	// 					$(this).detach().dequeue()
	// 				})
	// 			}else{
	// 				prev.add($(this)).css({border:'none'})
	// 			}
	// 			prev=null;
	// 		}else{
	// 			prev=$(this);
	// 		}
	// 	}
	// })
})