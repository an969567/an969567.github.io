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
	width: 96, //do zderzeń
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

function myRect(){ //robi background
	ctx.fillStyle= "green";
	ctx.beginPath();
	ctx.rect( 0, 0, canvas.width, canvas.height);
	ctx.fill();
}

function myDraw(myObject){
	ctx.drawImage(myObject.img, myObject.x, myObject.y);
}

function getMousePos(event) {
	var rect = canvas.getBoundingClientRect(); //jest w dokumentacji
	return { //zwraca obiekt
		x: event.clientX /*jest w dokumentacji*/ - rect.left, //czyli normalnie chyba zwraca względem ekranu, a nie canvasu
		y: event.clientY - rect.top
	};
}

mousePos = {
	x: knight.x,
	y: knight.y
};

canvas.addEventListener('contextmenu', function(evt) {
	if (remember) mousePos = getMousePos(evt);
}, false);

function divide(){
	X = (mousePos.x - knight.x)/10;
	Y = (mousePos.y - knight.y)/10; //mogą być ujemne. //tak chcemy //potem można standaryzować wielkość wektora przesunięcia (tak żeby X^2 + Y^2 = 1)
}

function randomizeMonster(){
	monster.x = (canvas.width-96) * Math.random(); //żeby nie wypadał poza krawędzie
	monster.y = (canvas.height-96) * Math.random();
}

function colCheck3(shapeA, shapeB) { //generalna funkcja
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
		vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (shapeA.width / 2) + (shapeB.width / 2),
		hHeights = (shapeA.height / 2) + (shapeB.height / 2);

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		return true;
	}
	return false;
}

function drawRect(myObject/*knight*/){
	ctx.beginPath();
	ctx.strokeStyle="#00FF00";
	ctx.rect(myObject.x, myObject.y , myObject.width, myObject.height);
	ctx.stroke();
}

function isInside(pos, rect){
	return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

remember = false;

function klikniety(){
	if(isInside(mousePos2, knight)) {
		remember = true;
	}
	else {
		remember = false;
	}
}

function getMousePos2(event) {
	var rect = canvas.getBoundingClientRect(); //jest w dokumentacji
	return { //zwraca obiekt
		x: event.clientX /*jest w dokumentacji*/ - rect.left, //czyli normalnie chyba zwraca względem ekranu, a nie canvasu
		y: event.clientY - rect.top
	};
}

canvas.addEventListener('click', function(evt) { //do zielonego prostokątu
	mousePos2 = getMousePos2(evt);
	eventFired = true;
	klikniety();
}, false); //nie wiem co oznacza ten 'false'

mousePos2 = {
	x: canvas.width/2,
	y: canvas.height/2
};

function petla(){
	myRect();
	divide();
	if(remember){
		knight.x += X;
		knight.y += Y;
	}
	myDraw(knight);
	myDraw(monster);
	if(colCheck3(knight, monster)) randomizeMonster();
	if(remember) drawRect(knight); //rysuje prostokąt jeśli wtedy trafiliśmy na knight'a //na razie pojedyncze klikniecie bez odklikania
	window.requestAnimationFrame(petla);
}

petla();