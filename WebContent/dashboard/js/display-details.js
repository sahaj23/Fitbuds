$(document).ready(function(){
	var urlParams = new URLSearchParams(window.location.search);
	var myParam = urlParams.get('imgURL');
	if(myParam!=null){
	$("#profile-pic").attr("src",myParam);
	var name=urlParams.get('name');
	$("#user-name").text(name);
	}
});