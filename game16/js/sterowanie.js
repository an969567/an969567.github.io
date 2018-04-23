document.body.addEventListener("keydown", function (e) { //tylko tyle??
	keys[e.keyCode] = true;
});  //metoda

document.body.addEventListener("keypress", function (e) {
	if(e.key == " "){
		spacePressed = true;
	}
}); 

document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
	spacePressed = false; //mam nadzieję, że też odświeża 60 razy na sekundę
});


window.addEventListener("load", function () {
	update();
});