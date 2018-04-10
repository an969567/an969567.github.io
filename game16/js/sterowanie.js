document.body.addEventListener("keydown", function (e) { //tylko tyle??
	keys[e.keyCode] = true;
});  //metoda

document.body.addEventListener("keypress", function (e) { //tylko tyle??
	if(e.key == " "){
		spacePressed2 = true;
		//console.log("Space pressed!");
	}
	//console.log(e.key);
}); 

document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
	spacePressed2 = false; //mam nadzieję, że też odświeża 60 razy na sekundę
});


window.addEventListener("load", function () {
	update();
});