var QQ_APPID = "100542450";
var QQ_APPKEY = "b4049044f4c6628d8a8c117522ce5be4";
var QQ_CALLBACK = "http://yunzd.hi-service.cn:8088/HiServiceCRM/oauth2_qq";
var QQ_GET_AUTH_CODE_URL = "https://graph.qq.com/oauth2.0/authorize";

var WEIBO_APPKEY = "4168067247";
var WEIBO_APPSECRET = "9e71974d4da0d931ee647a1226d7b573";
var WEIBO_CALLBACK = "http://yunzd.hi-service.cn:8088/HiServiceCRM/oauth2_weibo";
var WEIBO_GET_CODE = "https://api.weibo.com/oauth2/authorize";

function qqLogin(){
	var state = hex_md5(Math.random());
	var loginURL = QQ_GET_AUTH_CODE_URL
					+"?response_type=code&client_id="+QQ_APPID
					+"&redirect_uri="+encodeURIComponent(QQ_CALLBACK)
					+"&state="+state
					+"&scope=all";
	location.href = loginURL;
}
function weiboLogin(){
	var state = hex_md5(Math.random());
	var loginURL = WEIBO_GET_CODE
					+"?client_id="+WEIBO_APPKEY
					+"&response_type=code&state"+state
					+"&redirect_uri="+encodeURIComponent(WEIBO_CALLBACK);
	location.href = loginURL;
}