function resize(){
	window_width = getWindowWidth();
	window_height = getWindowHeight();
	document_scroll = getDocumentScroll();
	
}
$(document).ready(
	function(){
		resize();
	}
);

$(window).resize(
	function(){
		resize();
	}
);

$(window).scroll(
	function(){
		resize();
	}
);

if(window.addEventListener){
	window.addEventListener('orientationchange',
		function () {
			resize();
		}
	);
}

/******************************************/
