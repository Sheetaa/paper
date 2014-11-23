function getUnencCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return document.cookie.substring(c_start,c_end)
    } 
  }
return ""
}

function getCookie(c_name)
{
	c_name = f23.s52e(c_name);
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return f23.s52d(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=f23.s52e(c_name)+ "=" +f23.s52e(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function checkCookie(){
	var hiCookie_Username = $.cookie('username'),
		hiCookie_Companyname = $.cookie('companyname'),
		saveCookie = $.cookie('saveCookie');
	if (hiCookie_Username){
	  $("#username").val(hiCookie_Username);
	}
	
	if (hiCookie_Companyname){
		$("#companyname").val(hiCookie_Companyname);
	}
	
	if(saveCookie === "true"){
		$("#saveUsernameAndCompany").trigger("click");
	}
}
	
function saveCookie()
{
	$.cookie("companyname",$("#companyname").val(),{expires: 28});
	if($("#saveUsernameAndCompany").attr("checked") === "checked"){
		$.cookie("saveCookie","true", {expires: 28});
		$.cookie("username",$("#username").val(),{expires: 28});
	} else {
		$.cookie("saveCookie",null);
		$.cookie("username",null);
	}
	
}