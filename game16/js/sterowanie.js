document.body.addEventListener("keydown", function (e) { //tylko tyle??
	keys[e.keyCode] = true; //na strzałki keyCode i "keydown" //ale może to można bardziej uniwersalnie
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

//czyli tutaj zaczyna się update
/*window.addEventListener("load", function () {
	update();
});*/