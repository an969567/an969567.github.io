document.body.addEventListener("keydown", function (e) { //tylko tyle??
	keys[e.keyCode] = true; //na strzałki keyCode i "keydown" //ale może to można bardziej uniwersalnie
	if (e.keyCode == 39 || e.keyCode == 68 || e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 38 || e.keyCode == 87/*jeżeli któryś z wprawiających w ruch*/){
		licznik = 0;
	}
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