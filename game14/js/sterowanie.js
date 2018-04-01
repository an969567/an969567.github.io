document.body.addEventListener("keydown", function (e) { //tylko tyle??
	keys[e.keyCode] = true;
});  //metoda

document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
	update();
});