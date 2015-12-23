function initSameHeight(){
	function update(blocks){
		var maxheight = 0;

		blocks.each(function(){
			$(this).css({'height': 'auto'});
			if(!$(this).is(".dependentheight") && !$(this).is(".hide") && $(this).outerHeight() > maxheight){
				maxheight = $(this).outerHeight();
			}
		});
		
		if(maxheight > 0){
			blocks.each(function(){
				$(this).css({'height': maxheight + 'px'});
			});
		}
	}
	$('.sameheight').each(function(){
		if($(this).parents('.sameheightparent').length == 0){
			$(this).parent().addClass('sameheightparent');
		}
	});
	$('.sameheightparent').each(function(){
		var parent = $(this);
		var blocks = $(this).find('.sameheight');
		update(blocks);
		$(window).on('resize', function(){
			update(blocks);
		});
		$(document).on('sameHeightUpdateNeeded', function(){
			update(blocks);
		});
	});
}

function initSameWidth(){
	function update(blocks){
		blocks.css({'width': 100/blocks.length + "%"});
	}
	$('.samewidth').each(function(){
		if($(this).parents('.samewidthparent').length == 0){
			$(this).parent().addClass('samewidthparent');
		}
	});
	$('.samewidthparent').each(function(){
		var parent = $(this);
		var blocks = $(this).find('.samewidth');
		update(blocks);
		$(window).on('resize', function(){
			update(blocks);
		});
		$(document).on('samewidthUpdateNeeded', function(){
			update(blocks);
		});
	});
}

function initCounte(){
	function counter(e,stop_time){
		now_time = new Date();
		if(stop_time){
			m = stop_time.match(/(\d+)-(\d+)-(\d+)\s+(\d+):(\d+):(\d+)/);	
			stop_time = new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]);
		
			difference_time = stop_time.getTime()-now_time.getTime();
			
			if(Math.floor(difference_time/ (60 * 1e3)) < 0){
				$(e).remove();
			}else{				
				day = ""+Math.floor(difference_time / (24 * 60 * 60 * 1e3));
				hours = ""+Math.floor(difference_time / (60 * 60 * 1e3) - 24 * day);
				minutes = ""+Math.floor(difference_time / (60 * 1e3) - 24 * 60 * day - hours * 60); 
				seconds = ""+Math.floor(difference_time / 1e3 - 24 * 60 * 60 * day - hours * 60 * 60 - minutes * 60); 
				
				if(day == "0"){
					e.find(".day").hide();
					e.find(".sec").show();
				}else{
					e.find(".day").show();
					e.find(".sec").hide();
				}
				
				day = day.length == 2?day:"0"+day;
				hours = hours.length == 2?hours:"0"+hours;
				minutes= minutes.length == 2?minutes:"0"+minutes;
				seconds= seconds.length == 2?seconds:"0"+seconds;
				
				$(e).find(".day>span").html("<span>"+day.split("").join("</span><span>")+"</span>");
				$(e).find(".hou>span").html("<span>"+hours.split("").join("</span><span>")+"</span>");
				$(e).find(".min>span").html("<span>"+minutes.split("").join("</span><span>")+"</span>");
				$(e).find(".sec>span").html("<span>"+seconds.split("").join("</span><span>")+"</span>");
			}
		}
	}
	
	$(".counter").each(
		function(){
			time_parth = {
				"day":"дней",
				"hou":"часов",
				"min":"минут",
				"sec":"секунды"	
			};
			for(i in time_parth){
				$(this).append(
					[
						'<div class="'+i+'">',
							'<span>',
								'<span>0</span>',
								'<span>0</span>',
							'</span>',
							'<div>'+time_parth[i]+'</div>',
						'</div>'
					].join("")
				);	
			}
			$(this).append('<div class="clear"></div>');
			counter($(this),$(this).attr("data-counter"));
		}
	);
	
	setInterval(
		function(){
			$(".counter").each(
				function(){
					counter($(this),$(this).attr("data-counter"));
				}
			);
		},
		1e3
	);
}

function initSmartLinks(){
	$(".phone-link").each(
		function(){
			$(this).attr("href","tel:+"+$(this).text().replace(/\D+/g,""));	
		}
	);
	$(".email-link").each(
		function(){
			$(this).attr("href","mailto:"+$(this).text().trim());				
		}
	);
	$(".skype-link").each(
		function(){
			$(this).attr("href","skype:+"+$(this).text().trim());	
		}
	);
	$(".icq-link").each(
		function(){
			$(this).attr("href","icq:"+$(this).text().trim());				
		}
	);	
}

$(document).ready(
	function(){
		initSameWidth();
		initSameHeight();
		initCounte();
		initSmartLinks();	
	}
);

var window_width,window_height,document_scroll;

function getDocumentScroll(){
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return scrollTop;
}

function getWindowHeight(){
	if (document.body && document.body.offsetWidth) {
		winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) {
		winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		winH = window.innerHeight;
	}
	return winH;
}

function getDocumentHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

function getWindowWidth(){
	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
	}
	if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) {
		winW = document.documentElement.offsetWidth;
	}
	if (window.innerWidth && window.innerHeight) {
		winW = window.innerWidth;
	}
	return winW;
}

function getDocumentWidth() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
        Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
        Math.max(D.body.clientWidth, D.documentElement.clientWidth)
    );
}


function getBoundingClientRect(){
	var ret;
	if (node.getBoundingClientRect ){
		ret = node.getBoundingClientRect();
	}else
	{
		var element = node;
		var coords = { x: 0, y: 0, width: element.offsetWidth,
		height:element.offsetHeight };
		while (element) {
			coords.x += element.offsetLeft;
			coords.y += element.offsetTop;
			element = element.offsetParent;
		}
		ret =  {left:coords.x, right:coords.x +
		coords.width,top:coords.y,bottom:coords.y+coords.height};
	}
}

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}