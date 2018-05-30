/* Load manager */

knightImg = new Image();
knightImg.src = 'images/knight.png';
monsterImg = new Image();
monsterImg.src = 'images/monster.png'

/************************************************************/

canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"); //jakby wskaźnik

canvas.width = 1300;
canvas.height = 600;

/**************************************************************/
knight = {
	x: 100,
	y: 100,
	width: 96,
	height: 96,
	img: knightImg
};

monster = {
	x: 100,
	y: 100,
	width: 96,
	height: 96,
	img: monsterImg
}

function myRect(){
	ctx.fillStyle= "green"; /*"#00FF00"*/
	ctx.beginPath();
	ctx.rect( 0, 0, canvas.width, canvas.height);
	ctx.fill();
}

myRect();

function myDraw(myObject){
	ctx.drawImage(myObject.img, myObject.x, myObject.y);
}

function update(){
	myDraw(knight);
}

window.addEventListener("load", function () {
	update();
});

function getMousePos(canvas, event) {
	rect = canvas.getBoundingClientRect();
	return { //zwraca obiekt
		x: event.clientX - rect.left, //czyli normalnie chyba zwraca względem ekranu, a nie canvasu
		y: event.clientY - rect.top
	};
}

mousePos ={
	x: canvas.width/2,
	y: canvas.height/2
};

canvas.addEventListener('click', function(evt) {
	mousePos = getMousePos(canvas, evt);
}, false);

function divide(){
	X = (mousePos.x - knight.x)/10;
	Y = (mousePos.y - knight.y)/10; //mogą być ujemne. //tak chcemy //potem można standaryzować wielkość wektora przesunięcia (tak żeby X^2 + Y^2 = 1)
}

function randomizeMonster(){
	monster.x = (canvas.width-96) * Math.random(); //żeby nie wypadał poza krawędzie
	monster.y = (canvas.height-96) * Math.random();
}

function collisionCheck(){
	/* return true or false */
}

function colCheck3(shapeA, shapeB) { //generalna funkcja
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
		vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (shapeA.width / 2) + (shapeB.width / 2),
		hHeights = (shapeA.height / 2) + (shapeB.height / 2);

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		return true; //jest kolizja
	}
	return false; //else jest niepotrzebne
} 

function petla(){
	myRect();
	divide();
	knight.x += X;
	knight.y += Y;
	myDraw(knight);
	myDraw(monster);
	if(colCheck3(knight, monster)) randomizeMonster();
	window.requestAnimationFrame(petla);
}

petla();

//teraz żeby ruszał się w kierunku kliknięcia
//hmmm to niełatwe. Można zrobić, żeby 8 kieurnków było. Albo podzielimy na 10 kawałków odległość.
//w końcu było nietrudne.