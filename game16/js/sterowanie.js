document.body.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true;
	console.log(e.key);
	if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 87/*jeżeli któryś z wprawiających w ruch*/){
		licznik = 0;
	}
	if(e.key == " "){
		spacePressed = true;
	}
});

/*document.body.addEventListener("keypress", function (e) {
	if(e.key == " "){
		spacePressed = true;
	}
});*/ 

document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
	spacePressed = false;
});