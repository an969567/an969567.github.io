function drawPlayer() {

	ctx.font = "30px Gravity-Regular";
	ctx.fillStyle = "red";
	ctx.fillText("Welcome in Mental Asylum", 50, 50);
	ctx.fillText("Score", 50, 80);
	ctx.fillText(score, 230, 80);
	ctx.fillText("Health", 50, 110);
	ctx.fillText(HP, 230, 110);
	ctx.fillText("Level", canvas.width - 250, 50);
	if (level < map.length) ctx.fillText(level, canvas.width - 130, 50);
	else ctx.fillText(map.length - 1, canvas.width - 130, 50); //żeby nie pokazywało większego levelu przy wygranej
	if (Math.abs(player.velX) < 0.1) player.velX = 0;
	if (hurting == false) {
		if (!player.inAir && player.direction == "right" && !player.velX && !licznik && alive) {
			var h = frameCount % 40;
			myDraw2(idleImg[Math.floor(h/4)], player);
		}
		if (!player.inAir && player.direction == "left" && !player.velX && !licznik && alive) {
			var h = frameCount % 40;
			myDraw3(idleImg[Math.floor(h/4)], player);
		}
		if (!player.inAir && player.direction == "right" && !player.velX && licznik && alive) { //strzelanie
			shoot();
			myDraw2(shootImg[Math.ceil((36-licznik)/12)], player);
		}
		if (!player.inAir && player.direction == "left" && !player.velX && licznik && alive) { //strzelanie
			shoot();
			myDraw3(shootImg[Math.ceil((36-licznik)/12)], player);
		}
		if (!player.inAir && player.velX > 0 && alive) {
			var h = frameCount % 32;
			myDraw2(runImg[Math.floor(h/4)+1], player);
		}
		if (!player.inAir && player.velX < 0 && alive) {
			var h = frameCount % 32;
			myDraw3(runImg[Math.floor(h/4)+1], player);
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
	}
	else {
		if (!player.inAir && player.direction == "right" && !player.velX && !licznik && alive) {
			var h = frameCount % 40;
			myDraw2(idle2Img[Math.floor(h/4)], player);
		}
		if (!player.inAir && player.direction == "left" && !player.velX && !licznik && alive) {
			var h = frameCount % 40;
			myDraw3(idle2Img[Math.floor(h/4)], player);
		}
		if (!player.inAir && player.direction == "right" && !player.velX && licznik && alive) { //strzelanie
			shoot();
			myDraw2(shoot2Img[Math.ceil((36-licznik)/12)], player);
		}
		if (!player.inAir && player.direction == "left" && !player.velX && licznik && alive) { //strzelanie
			shoot();
			myDraw3(shoot2Img[Math.ceil((36-licznik)/12)], player);
		}
		if (!player.inAir && player.velX > 0 && alive) {
			var h = frameCount % 32;
			myDraw2(run2Img[Math.floor(h/4)+1], player);
		}
		if (!player.inAir && player.velX < 0 && alive) {
			var h = frameCount % 32;
			myDraw3(run2Img[Math.floor(h/4)+1], player);
		}
		if (player.inAir && player.direction == "right" && player.velY < 0 /*leci w górę*/ && alive) {
			myDraw2(jump2Img, player);
		}
		if (player.inAir && player.direction == "right" && player.velY >= 0 /*leci w dół*/ && alive) {
			myDraw2(fall2Img, player);
		}
		if (player.inAir && player.direction == "left" && player.velY < 0 /*leci w górę*/ && alive) {
			myDraw3(jump2Img, player);
		}
		if (player.inAir && player.direction == "left" && player.velY >= 0 /*leci w górę*/ && alive) {
			myDraw3(fall2Img, player);
		}
	}

	if (!alive){
		player.velX = 0; player.velY = 0; player.y = basePlayer.y+20;
		if (!rozpocznij) scream.play();
		if(rozpocznij < 84)	myDraw2(deadImg[Math.floor(rozpocznij++/12)+1], player);
		else myDraw2(deadImg[7], player);
	}
}

tylko_raz47 = false;
//var odcinek_czasu

function level1(){
	myDraw(map[1]);
	for (i of boxes) {
		myRect(i);
		setDir(i);
		
		for (var j=0;j<bullets.length;j++) {
			if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1); //to się pewnie da ulepszyć
		}
	}
	myDraw(teleporter);
	collision(teleporter);
	for (c of coins)	{
		myDraw6(c);
		collision2(c);
	}
	if(tylko_raz47 == false){
		czas_rozpoczecia = new Date().getTime();
		tylko_raz47 = true;
	}
	czas_teraz = new Date().getTime();
	odcinek_czasu = czas_teraz - czas_rozpoczecia;
	if(odcinek_czasu < 3000/*3sekundy*/){
		ctx.font = "30px Gravity-Regular";
		ctx.fillStyle = "red";
		ctx.fillText("Collect coins and get to the teleporter!", 250, 250);
	}
}

tylko_raz48 = false;

function level2(){
	myDraw(map[2]);
	for (i of boxes2) {
		myRect(i);
		setDir(i);

		for (var j=0;j<bullets.length;j++) {
			if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
		}
   	}
	myDraw(spikes);
	myDraw(teleporter2);
	kill(spikes);
	collision(teleporter2);
	for (c of coins2) {
		myDraw6(c);
		collision2(c);
	}
	if(tylko_raz48 == false){
		czas_rozpoczecia = new Date().getTime();
		tylko_raz48 = true;
	}
	czas_teraz = new Date().getTime();
	odcinek_czasu = czas_teraz - czas_rozpoczecia;
	if(odcinek_czasu < 3000/*3sekundy*/){
		ctx.font = "30px Gravity-Regular";
		ctx.fillStyle = "red";
		ctx.fillText("Watch out for spikes!", 250, 250);
	}
}

tylko_raz49 = false;

function level3(){
	myDraw(map[3]);
	for (i of boxes3) {
		myRect(i);
		setDir(i);
		for (var j=0;j<bullets.length;j++) {
			if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
		}
   	}
	kill(monster);
	patrol(monster);
	if (monster.direction == "left") myDraw(monster);
	else myDraw4(monsterImg, monster);
	myDraw(teleporter);
	collision(teleporter3);
	for (c of coins3) {
		myDraw6(c);
		collision2(c);
	}
	if(tylko_raz49 == false){
		czas_rozpoczecia = new Date().getTime();
		tylko_raz49 = true;
	}
	czas_teraz = new Date().getTime();
	odcinek_czasu = czas_teraz - czas_rozpoczecia;
	if(odcinek_czasu < 3000/*3sekundy*/){
		ctx.font = "30px Gravity-Regular";
		ctx.fillStyle = "red";
		ctx.fillText("Avoid the monster!", 250, 250);
	}
}

tylko_raz50 = false;

function level4(){
	myDraw(map[4]);
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
	for (c of coins4) {
		myDraw6(c);
		collision2(c);
	}
	if(tylko_raz50 == false){
		czas_rozpoczecia = new Date().getTime();
		tylko_raz50 = true;
	}
	czas_teraz = new Date().getTime();
	odcinek_czasu = czas_teraz - czas_rozpoczecia;
	if(odcinek_czasu < 3000/*3sekundy*/){
		ctx.font = "30px Gravity-Regular";
		ctx.fillStyle = "red";
		ctx.fillText("Jump on the monster", 250, 250);
	}
}

tylko_raz51 = false;

function level5(){
	myDraw(map[5]);
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
	for (c of coins5) {
		myDraw6(c);
		collision2(c);
	}
	if(tylko_raz51 == false){
		czas_rozpoczecia = new Date().getTime();
		tylko_raz51 = true;
	}
	czas_teraz = new Date().getTime();
	odcinek_czasu = czas_teraz - czas_rozpoczecia;
	if(odcinek_czasu < 3000/*3sekundy*/){
		ctx.font = "30px Gravity-Regular";
		ctx.fillStyle = "red";
		ctx.fillText("Jump on the monster", 250, 250);
	}
}

tylko_raz52 = false;

function level6(){
	myDraw(map[6]);
	for (i of boxes6) {
		myRect(i);
		setDir(i);
		for (var j=0;j<bullets.length;j++) {
			if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
		}
    }
	kill(loszka);
	for(i=0;i<bullets.length;i++) colCheck2(bullets[i], loszka);
	myDraw(loszka);
	myDraw(teleporter);
	collision(teleporter6);
	for (c of coins6) {
		myDraw6(c);
		collision2(c);
	}
	if(tylko_raz52 == false){
		czas_rozpoczecia = new Date().getTime();
		tylko_raz52 = true;
	}
	czas_teraz = new Date().getTime();
	odcinek_czasu = czas_teraz - czas_rozpoczecia;
	if(odcinek_czasu < 3000/*3sekundy*/){
		ctx.font = "30px Gravity-Regular";
		ctx.fillStyle = "red";
		ctx.fillText("Shoot the monster girl", 250, 250);
	}
}

tylko_raz53 = false;

function level7(){
	myDraw(map[7]);
	for (i of boxes7) {
		myRect(i);
		setDir(i);
		for (var j=0;j<bullets.length;j++) {
			if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
		}
    }
	myDraw(teleporter7);
	collision(teleporter7);
	for (c of coins7) {
		myDraw6(c);
		collision2(c);
	}
	if(tylko_raz53 == false){
		czas_rozpoczecia = new Date().getTime();
		tylko_raz53 = true;
	}
	czas_teraz = new Date().getTime();
	odcinek_czasu = czas_teraz - czas_rozpoczecia;
	if(odcinek_czasu < 3000/*3sekundy*/){
		ctx.font = "30px Gravity-Regular";
		ctx.fillStyle = "red";
		ctx.fillText("Climb high", 250, 250);
	}
}

tylko_raz54 = false;

function level8(){
	myDraw(map[8]);
	for (i of boxes8) {
		myRect(i);
		setDir(i);
		for (var j=0;j<bullets.length;j++) {
			if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
		}
   	}
	myDraw(spikes2);
	myDraw(teleporter8);
	kill(spikes2);
	collision(teleporter8);
	patrol2(kula_ognista);
	myDraw(kula_ognista);
	kill(kula_ognista);
	for (c of coins8) {
		myDraw6(c);
		collision2(c);
	}
	if(tylko_raz54 == false){
		czas_rozpoczecia = new Date().getTime();
		tylko_raz54 = true;
	}
	czas_teraz = new Date().getTime();
	odcinek_czasu = czas_teraz - czas_rozpoczecia;
	if(odcinek_czasu < 3000/*3sekundy*/){
		ctx.font = "30px Gravity-Regular";
		ctx.fillStyle = "red";
		ctx.fillText("Jump across", 250, 250);
	}
}

tylko_raz = true;
wait = -1;
tylko_raz55 = false;

function level9(){
	myDraw(map[9]);
	traci_zdrowie = false;
	for (i of boxes9) {
		myRect(i);
		setDir(i);
		for (var j=0;j<bullets.length;j++) {
			if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
			if (bullets[j].x > map[9].width - 500) {
				bullets.splice(j,1);
				boss.HP--;
				traci_zdrowie = true;
				if(boss.alive) myDraw2(wisielec2Img,boss);
			}
		}
   	}
	for (c of coins9) {
		myDraw6(c);
		collision2(c);
	}
	if(boss.HP <= 0) boss.alive = false;
	if(boss.alive) {
		if(traci_zdrowie == false) myDraw(boss);
		//myDraw2(wisielec2Img,boss);
		kill(boss);
		for(var j=0;j<fireballs.length;j++){ //tu są przesuwane bullety
			fireballs[j].x -= 1;
			fireballs[j].HBx -= 1;
			//console.log("Hitbox: ",fireballs[j].HBx);
			//console.log("X: ",fireballs[j].x);
			if(fireballs[j].x <= 500) {
				fireballs[j].x = fireballs[j].baseX;
				fireballs[j].HBx = fireballs[j].baseX;
			}
			myDraw(fireballs[j]);
			kill(fireballs[j]);
		}
	}
	if(tylko_raz && boss.alive == false){
		tylko_raz = false;
		wait = 100;
	}
	wait--;
	if(wait == 0) {
		level++;
		player.x = basePlayer.x;
		player.y = basePlayer.y;
		player.HBx = basePlayer.x + 35;
		player.HBy = basePlayer.y + 10;
	}
	if(tylko_raz55 == false){
		czas_rozpoczecia = new Date().getTime();
		tylko_raz55 = true;
	}
	czas_teraz = new Date().getTime();
	odcinek_czasu = czas_teraz - czas_rozpoczecia;
	if(odcinek_czasu < 3000/*3sekundy*/){
		ctx.font = "30px Gravity-Regular";
		ctx.fillStyle = "red";
		ctx.fillText("Kill the boss", 250, 250);
	}
}

tylko_raz56 = false;

function level10(){
	myDraw(map[10]);
	for (i of boxes10) {
		myRect(i);
		setDir(i);
		for (var j=0;j<bullets.length;j++) {
			if (colCheck3(i, bullets[j]) == true) bullets.splice(j,1);
		}
   	}
	myDraw(spikes3);
	myDraw(teleporter10);
	kill(spikes3);
	collision(teleporter10);
	for (c of coins10) {
		myDraw6(c);
		collision2(c);
	}
	myDraw(spikes4);
	kill(spikes4);
	if(tylko_raz56 == false){
		czas_rozpoczecia = new Date().getTime();
		tylko_raz56 = true;
	}
	czas_teraz = new Date().getTime();
	odcinek_czasu = czas_teraz - czas_rozpoczecia;
	if(odcinek_czasu < 3000/*3sekundy*/){
		ctx.font = "30px Gravity-Regular";
		ctx.fillStyle = "red";
		ctx.fillText("Double jump!", 250, 250);
	}
}

function myDraw(myObject){
	ctx.drawImage(myObject.img, myObject.x + viewport.x, myObject.y + viewport.y, myObject.width, myObject.height);
	//console.log("myDraw");
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
	if (dir === "b") { 
		player.inAir = false;
		skoczyl_juz = false;
	} else if (dir === "t")	player.velY *= -1;
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
	if (licznik == 36) { 
		var b = new Bullet();
		bullets.push(b);
		playSound();
	}
	if(licznik) licznik--;
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

function myDraw5(myObject){
	ctx.drawImage(myObject.img, myObject.x, myObject.y, myObject.width, myObject.height);
}

//bez wielkości
function myDraw6(myObject){
	ctx.drawImage(myObject.img, myObject.x + viewport.x, myObject.y + viewport.y);
}