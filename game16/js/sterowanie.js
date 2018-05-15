document.body.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true;
	if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 87/*jeżeli któryś z wprawiających w ruch*/){
		licznik = 0;
	}
});

document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
});