function doNavigate(){
	 if (document.getElementById("myMainMenu").options[document.getElementById("myMainMenu").selectedIndex].value != "#" ) {
		 document.location.href = document.getElementById("myMainMenu").options[document.getElementById("myMainMenu").selectedIndex].value;
	 }
	 else document.location.href = "index.html";
}