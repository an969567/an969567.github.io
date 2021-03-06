document.body.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true;
	if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 87/*jeżeli któryś z wprawiających w ruch*/){
		licznik = 0;
	}
});

document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
});

var rect = {
	x: 1366 - 90,
	y: 20,
	width: 60,
	heigth: 45
};

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return { //zwraca obiekt
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}
function isInside(pos, rect){
	return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y
}

music_playing = false;

canvas.addEventListener('click', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	if (isInside(mousePos,rect)) {
		if(!music_playing){
			music.play();
			music_playing = true;
		}
		else {
			music.pause();
			music_playing = false;
		}
    }
}, false);