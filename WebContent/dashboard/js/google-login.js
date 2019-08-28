var sign=false;
function signIn(){
	sign=true;
}
function onSignIn(googleUser){
	if(sign){
     var profile=googleUser.getBasicProfile();
     var imgURL=profile.getImageUrl();
     var name=profile.getName();
     var info={
    		 imgURL:imgURL,
    		 name:name
     }
     var lol=jQuery.param(info);
     googleUser.disconnect();
     window.location = "http://localhost:2018/FitBuds/dasboard/index.html?"+lol;
     /*$("#g-signin2").css("display","none");
      * $("#pic").attr("src",profile.getImageUrl())
     $("#data").css("display","block");
     $("#pic").attr("src",profile.getImageUrl());
     $("#email").text(profile.getEmail());
     $("#id").text(profile.getId());
     $("#name").text(profile.getName());
     $("#given_name").text(profile.getGivenName());
     $("#family_name").text(profile.getFamilyName());*/
	}
}
function signOut(){
	var auth2=gapi.auth2.getAuthInstance();
	auth2.signOut.then(function(){
		alert("signed out");
	});
}