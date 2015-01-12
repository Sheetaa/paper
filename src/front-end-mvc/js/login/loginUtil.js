
var winWidth = 0;
var winHeight = 0;
function resizeHead(){
	if(window.innerWidth){//window.innerWidth只有ff支持，ie不支持
		winWidth = window.innerWidth;
	}else if((document.body)&&(document.body.clientWidth)){//ff和ie都支持
		winWidth = document.body.clientWidth;
	}
	if(window.innerHeight){
		winHeight = window.innerHeight;
	}else if((document.body)&&(document.body.clientHeight)){
		winHeight = document.body.clientHeight;
	}
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
		//document.documentElement.clientHeight ff和ie都支持
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
	var mainDiv = {
		width: winWidth,
      	height: winHeight
	};
	
	$("img#bgImage").css(mainDiv);
	$(".main").css(mainDiv);
	// Start: login.jsp页面元素的位置动态相对布局 Add by WangPei
	var loginDivLeft = $(window).width() / 2 - 176;
	var blueBarTop = $("#blue-bar").offset().top;
	$(".login").css("left", loginDivLeft + "px").css("top", (blueBarTop + 15) + "px");
	$("#login-logo-baoli").css("left", (loginDivLeft - 38) + "px").css("top", (blueBarTop - 90) + "px");
	$("#login-logo-title").css("left", (loginDivLeft + 198) + "px").css("top", (blueBarTop - 30) + "px");
	// End  : login.jsp页面元素的位置动态相对布局
}
function loadimage(){ 
	document.getElementById("randImage").src = "code.jsp?" + Math.random();
}