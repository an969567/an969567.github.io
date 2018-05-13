function drawPlayer() {

	ctx.font = "30px Titan one";
	ctx.fillStyle = "red";
	ctx.fillText("Welcome in Mental Asylum",70,70);
	if (Math.abs(player.velX) < 0.1) player.velX = 0;
	if (!player.inAir && player.direction == "right" && !player.velX && !shooting && alive) {
		var h = frameCount % 40;
		myDraw2(idleImg[Math.floor(h/4)], player);
	}
	if (!player.inAir && player.direction == "left" && !player.velX && !shooting && alive) {
		var h = frameCount % 40;
		myDraw3(idleImg[Math.floor(h/4)], player);
	}
	if (!player.inAir && player.direction == "right" && !player.velX && shooting && alive) {
		shoot();
		myDraw2(eval('shoot' + (Math.ceil((36-licznik)/12)) + 'Img'), player);
	}
	if (!player.inAir && player.direction == "left" && !player.velX && shooting && alive) {
		shoot();
		myDraw3(eval('shoot' + (Math.ceil((36-licznik)/12)) + 'Img'), player);
	}
	if (!player.inAir && player.velX > 0 && alive) {
		var h = frameCount % 32;
		myDraw2(eval('run'+ (Math.floor(h/4)+1) +'Img'), player);
	}
	if (!player.inAir && player.velX < 0 && alive) {
		var h = frameCount % 32;
		myDraw3(eval('run'+ (Math.floor(h/4)+1) +'Img'), player);
	}
	if (player.inAir && player.direction == "right" && player.velY < 0 /*leci w górę*/ && alive) {
		myDraw2(jumpImg, player);
	}
	if (player.inAir && player.direction == "right" && player.velY >= 0 /*leci w dół*/ && alive) {
		myDraw2(fallImg, player);
	}
	if (player.inAir && player.direction == "left" && player.velY < 0 /*leci w górę*/ && alive) {
		myDraw3(jumpImg, player);
	}
	if (player.inAir && player.direction == "left" && player.velY >= 0 /*leci w górę*/ && alive) {
		myDraw3(fallImg, player);
	}
	if (!alive){
		player.velX = 0; player.velY = 0; player.y = basePlayer.y+20;
		//do siódmego //trzy ostatnie to to samo co siódme //7 * 12 = 84
		if (!rozpocznij) scream.play();
		if(rozpocznij < 84)	myDraw2(eval('dead'+ (Math.floor(rozpocznij++/12)+1) +'Img'), player);
		else myDraw2(dead7Img, player);
	}
}
function level1(){
		myDraw(map);
		for (i of boxes) {
			myRect(i);
			setDir(i);
			
			for (var j=0;j<bullets.length;j++) {
				if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1); //to się pewnie da ulepszyć
			}
		}
		myDraw(teleporter);
		collision(teleporter);
}

function level2(){
	myDraw(map2);
		for (i of boxes2) {
			myRect(i);
			setDir(i);

			for (var j=0;j<bullets.length;j++) {
					if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		myDraw(spikes);
		myDraw(teleporter2);
		kill3(spikes);
		collision(teleporter2);
}

function level3(){
	myDraw(map3);
		for (i of boxes3) {
			myRect(i);
			setDir(i);

			for (var j=0;j<bullets.length;j++) {
				if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		kill3(monster);
		patrol(monster);
		if (monster.direction == "left") myDraw(monster);
		else myDraw4(monsterImg, monster);
		myDraw(teleporter);
		collision(teleporter3);
}

function level4(){
	myDraw(map4);
		for (i of boxes4) {
			myRect(i);
			setDir(i);

			for (var j=0;j<bullets.length;j++) {
				if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		myDraw(teleporter);
		kill2(monster2);
		myDraw(monster2);
		collision(teleporter4);
}

function level5(){
	myDraw(map5);
	for (i of boxes5) {
		myRect(i);
		setDir(i);

		for (var j=0;j<bullets.length;j++) {
			if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
		}
    }
	kill2(monster3);
	patrol(monster3);
	if (monster3.direction == "left") myDraw(monster3);
	else myDraw4(monster2Img, monster3);
		myDraw(teleporter);
		collision(teleporter5);
}
function level6(){
	myDraw(map6);
		for (i of boxes6) {
			myRect(i);
			setDir(i);
			for (var j=0;j<bullets.length;j++) {
				if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		kill3(loszka);
		for(i=0;i<bullets.length;i++) colCheck2(bullets[i], loszka);
		myDraw(loszka);
		myDraw(teleporter);
		collision(teleporter6);
}

function level7(){
	myDraw(map7);
		for (i of boxes7) {
			myRect(i);
			setDir(i);
			for (var j=0;j<bullets.length;j++) {
				if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		myDraw(teleporter7);
		collision(teleporter7);
}

function level8(){
	myDraw(map8);
		for (i of boxes8) {
			myRect(i);
			setDir(i);

			for (var j=0;j<bullets.length;j++) {
					if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		myDraw(spikes2);
		myDraw(teleporter8);
		kill3(spikes2);
		collision(teleporter8);
		patrol2(fireball);
		myDraw(fireball);
		kill3(fireball);
}

function myDraw(myObject){
	ctx.drawImage(myObject.img, myObject.x + viewport.x, myObject.y + viewport.y, myObject.width, myObject.height);
}
function myRect(myBox){
	ctx.fillStyle= "black";
	ctx.beginPath();
	ctx.rect( myBox.x + viewport.x, myBox.y + viewport.y, myBox.width, myBox.height);
	ctx.fill();
}
function myDraw2(myImage, myObject) {
	ctx.drawImage(myImage, myObject.x + viewport.x, myObject.y + viewport.y, myObject.width, myObject.height);
}
function setDir(myBox) {
	var dir = colCheck(player, myBox);
	if (dir === "l" || dir === "r") player.velX = 0;
	else if (dir === "b") { 
		player.inAir = false;
	} else if (dir === "t")	player.velY *= -1; //odbija się od dołu platformy (uderzył topem charactera)
}
function patrol(myMonster) {
	if (myMonster.x < myMonster.maxX && myMonster.direction == "right") { myMonster.x++; myMonster.HBx++; }
	if (myMonster.x >= myMonster.maxX) { myMonster.x--; myMonster.direction = "left"; myMonster.HBx--; }
	if (myMonster.direction == "left" && myMonster.x > myMonster.minX) { myMonster.x--; myMonster.HBx--; }
	if (myMonster.x <= myMonster.minX) { myMonster.direction = "right"; myMonster.x++; myMonster.HBx++; }
}
function patrol2(myMonster) {
	if (myMonster.x < myMonster.maxX && myMonster.direction == "right") { myMonster.x++; myMonster.HBx++; myMonster.y++; myMonster.HBy++; }
	if (myMonster.x >= myMonster.maxX) { myMonster.x--; myMonster.direction = "left"; myMonster.HBx--; myMonster.y--; myMonster.HBy--; }
	if (myMonster.direction == "left" && myMonster.x > myMonster.minX) { myMonster.x--; myMonster.HBx--; myMonster.y--; myMonster.HBy--; }
	if (myMonster.x <= myMonster.minX) { myMonster.direction = "right"; myMonster.x++; myMonster.HBx++; myMonster.y++; myMonster.HBy++; }
}
function myDraw3(myImage, myObject){
	ctx.translate(myObject.x + viewport.x + 150,0);  //przesuwa origin
 	ctx.scale(-1,1);
	ctx.drawImage(myImage, 0, myObject.y + viewport.y, myObject.width, myObject.height)
	ctx.setTransform(1,0,0,1,0,0);
}
function playSound(){
	with(new AudioContext)for(i in D=[12])with(createOscillator())if(D[i])connect(destination),frequency.value=440*1.06**(13-D[i]),start(i*.1),stop(i*.1+.1)
}
function shoot(){
	if (!licznik) { 
		shooting = true;  //jestesmy w trakcie strzelania
		licznik = 36; //jeżeli 0 to nadaje 36 i był rozkaz shoot
		var b = new Bullet();
		bullets.push(b);
		playSound();
		//dobrze jest, ja zawszę będę winna
	}
	if(licznik) licznik--; //czyli do funkcji trafia 35.
	if(!licznik) shooting = false;
}
function myDraw4(myImage, myObject){
	ctx.translate(myObject.x + viewport.x + 100,0);  //przesuwa origin
 	ctx.scale(-1,1);
	ctx.drawImage(myImage, 0, myObject.y + viewport.y, myObject.width, myObject.height)
	ctx.setTransform(1,0,0,1,0,0);
}

function Bullet() {
		this.baseX = player.x + player.width/2; //tam gdzie player się znajduje
		this.baseY = player.y + player.height/2; //potem to wykalibrujemy by leciało nie z lewego górnego rogu laseczki
		if(player.direction == "left") this.x = this.baseX - 60;
		else this.x = this.baseX;
		this.y = this.baseY;
		this.width = 20;
		this.height = 20;
		this.direction = player.direction;
}