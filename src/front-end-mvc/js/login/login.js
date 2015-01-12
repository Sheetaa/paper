var hasLogin = false;
var intervalId;
var dotCount = 1;
function dotGen(dotNum) {
	var retVal = "";
	for (i = 0; i < dotNum; i++) {
		retVal += " ."
	}
	return retVal;
}
function loginAni() {
	if(dotCount > 11) {
		dotCount = 0;
	}
	var btnText = "登 录 中" + dotGen(dotCount++);
	$("#submit").val(btnText);
}
function btnOnLogin() {
	$("#submit").attr("disabled", "disabled").val("登 录 中").addClass("ui-state-active");
	hasLogin = true;
	dotCount = 1;
	intervalId = window.setInterval(loginAni, 300);
}
function btnLogin() {
	$("#submit").removeAttr("disabled").val("用 户 登 录").removeClass("ui-state-active");
	hasLogin = false;
	window.clearInterval(intervalId);
}
$(document).ready(function(){
    var count = 0;
    $("#submit").click(function(){ 
	    	if(hasLogin) {
	    		return false;
	    	}
	    	if($("#companyname").val() == "") {
	    		$("#tips").html("公司名不能为空");
	    		$("#companyname").focus();
	    		count++;
	    	} else if($("#username").val() == "") {
	    		$("#tips").html("用户名不能为空");
	    		$("#username").focus();
	    		count++;
	    	} else if($("#password").val() == "") {
	    		$("#tips").html("密码不能为空");
	    		$("#password").focus();
	    		count++;
	    	} else {
		    	if($("#yincang").is(":visible")==false) { //验证码不可见的时候
		    		var $this = $(this);
			    	if (!$this.data("sending")){
			    		$.ajax({
			    			url : "login.action",
			    			type : "post",
			    			data : {
			    			  "username" : $("#username").val(),
			    			  "companyname" : $("#companyname").val(),
			    			  "password" : $("#password").val()
			    			},
			    			beforeSend : function (){
			    			  $this.data("sending",true);
			    			  btnOnLogin();
			    			},
			    			success : function (result){
			    				$this.data("sending", false);
			    				var rslt = $.parseJSON(result.result);
			    				if(rslt == null) {
			    					$("#tips").html("系统错误，请联系开发人员！");
			    					$("#companyname").select();
			    					btnLogin();
			    					return ;
			    				}
			    				var code = rslt.result,
			    				    retUrl = rslt.retUrl,
			    				    accountState = rslt.accountState;
			    				var reallyLogin = true;
			    				if(accountState == "haslogin"){
			    					var reallyLogin = confirm("本账户已经登陆，是否重新登陆？");
			    				}
			    				if (code == "SUCCESS"){
			    					if(reallyLogin){
			    						saveCookie();
			    						$.ajax({
			    							url : "accountOper_register",
			    							type:"post",
			    							success:function(){
			    								window.location.replace(retUrl);
			    							},error:function(){
			    								btnLogin();
			    							}
			    						});
			    					}else{
			    						$.ajax({
			    							url : "accountOper_clearSession",
			    							type: "post",
			    							success:function(){
			    								btnLogin();
			    							},
			    							error:function(){
			    								btnLogin();
			    							}
			    						});
			    						btnLogin();
			    					}
			    				} else {
			    					if(code == "WRONG_INPUT") {
			    						$("#tips").html("请检查您的密码！");
			    						$("#password").select();
			    					} else if(code == "USER_NOT_EXIST") {
			    						$("#tips").html("用户名、公司名不匹配！");
			    						$("#companyname").select();
			    					} else {
			    						$("#tips").html("用户名、公司名或密码错误！");
			    						$("#companyname").select();
			    					}
			    					
			    					count++;
			    					if(count == 3)
			    					{
			    						$("#yincang").css("display","");
			    					}
			    					
			    					btnLogin();
			    				}
			    			},
			    			error : function () {
			    				$this.data("sending", false);
			    				btnLogin();
			    				$("#loader").hide();
			    			}
			    		});
			    	}
		    	}else if($("#yincang").is(":visible")){
		    		var rand = getUnencCookie("rand");
					var shuru = $("#yanzm").val();
					if(!$("#yanzm").val()){
						$("#tips").html("请输入验证码！");
						$("#yanzm").focus();
						btnLogin();
						loadimage();
			    	}else if(shuru.toUpperCase() == rand){
			    		var $this = $(this);
				    	if (!$this.data("sending")){
				    		$.ajax({
				    			url : "login.action",
				    			type : "post",
				    			data : {
				    			  "username" : $("#username").val(),
				    			  "companyname" : $("#companyname").val(),
				    			  "password" : $("#password").val()
				    			},
				    			beforeSend : function (){
				    			  $this.data("sending",true);
				    			  btnOnLogin();
				    			},
				    			success : function (result){
				    				$this.data("sending", false);
				    				
				    				var rslt = $.parseJSON(result.result),
				    				    code = rslt.result,
				    				    retUrl = rslt.retUrl;
				    				if (code == "SUCCESS"){
				    					$("#waiting").css("display","inline");
				    					saveCookie();
				    					window.location.replace(retUrl);
				    				} else {
				    					if(code == "WRONG_INPUT") {
				    						$("#tips").html("请检查您的密码！");
				    						$("#password").select();
				    					} else if(code == "USER_NOT_EXIST") {
				    						$("#tips").html("用户名、公司名不匹配！");
				    						$("#companyname").select();
				    					} else {
				    						$("#tips").html("用户名、公司名或密码错误！");
				    						$("#companyname").select();
				    					}
				    					btnLogin();
				    				    loadimage();
				    				}
				    			},
				    			error : function () {
				    				$this.data("sending", false);
				    				btnLogin();
				    				$("#loader").hide();
				    			}
				    		});
				    	}
			    	}else{
			    		$("#tips").html("请输入正确的验证码！");
			    		$("#yanzm").select();
			    		btnLogin();
			    		loadimage();
			    	}
		    	}
	    	}
	    }
    ).data("sending", false);
});
