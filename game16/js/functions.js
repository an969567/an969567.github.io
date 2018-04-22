function drawPlayer() {
	console.log(player.velY);
	console.log(player.grounded);

	ctx.font = "30px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Welcome in Mental Asylum",70,70);
	if (Math.abs(player.velX) < 0.1) player.velX = 0;
	if (!player.jumping && player.direction == "right" && !player.velX && !spacePressed && !shooting) {
		var h = frameCount % 40;
		myDraw2(eval('idle'+ (Math.floor(h/4)+1) +'Img'), player);
	}
	if (!player.jumping && player.direction == "left" && !player.velX && !spacePressed && !shooting) {
		myDraw3(idle1Img, player);
	}
	if (!player.jumping && player.direction == "right" && !player.velX && (spacePressed  || shooting)) {
		shoot();
		myDraw2(shootImg, player);
	}
	if (!player.jumping && player.direction == "left" && !player.velX && (spacePressed || shooting)) {
		shoot();
		myDraw3(shootImg, player); //odbicie lustrzane
	}
	if (!player.jumping && player.velX > 0) {
		myDraw2(runImg, player);
	}
	if (!player.jumping && player.velX < 0) {
		myDraw3(runImg, player);
	}
	if (player.jumping && player.direction == "right") {
		myDraw2(jumpImg, player);
	}
	if (player.jumping && player.direction == "left") {
		myDraw3(jumpImg, player);
	}
}
function level1(){
		myDraw(map);
		for (var i = 0; i < boxes.length; i++) {
			myRect(boxes[i]);
			setDir(boxes[i]);
			
			for (var j=0;j<bullets.length;j++) {
				if (colCheck3(boxes[i], bullets[j]) == true) bullets.splice(j,1);
			}
		}
		myDraw(teleporter);
		collision(teleporter);
}

function level2(){
	myDraw(map2);
		for (var i = 0; i < boxes2.length; i++) {
			myRect(boxes2[i]);
			setDir(boxes2[i]);

			for (var j=0;j<bullets.length;j++) {
					if (colCheck3(boxes2[i], bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		myDraw(spikes);
		myDraw(teleporter);
		kill3(spikes);
		collision(teleporter2);
}

function level3(){
	myDraw(map3);
		for (var i = 0; i < boxes3.length; i++) {
			myRect(boxes3[i]);
			setDir(boxes3[i]);

			for (var j=0;j<bullets.length;j++) {
				if (colCheck3(boxes3[i], bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		kill3(monster);
		patrol(monster);
		if (monster.direction == "left") myDraw(monster);
		else myDraw3(monsterImg, monster);
		myDraw(teleporter);
		collision(teleporter3);
}

function level4(){
	myDraw(map4);
		for (var i = 0; i < boxes4.length; i++) {
			myRect(boxes4[i]);
			setDir(boxes4[i]);

			for (var j=0;j<bullets.length;j++) {
				if (colCheck3(boxes4[i], bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		myDraw(teleporter);
		kill2(monster2);
		myDraw(monster2);
		collision(teleporter4);
}

function level5(){
	myDraw(map5);
	for (var i = 0; i < boxes5.length; i++) {
		myRect(boxes5[i]);
		setDir(boxes5[i]);

		for (var j=0;j<bullets.length;j++) {
			if (colCheck3(boxes5[i], bullets[j]) == true) bullets.splice(j,1);
		}
    }
	kill2(monster3);
	patrol(monster3);
	if (monster3.direction == "left") myDraw(monster3);
	else myDraw3(monster2Img, monster3);
		myDraw(teleporter);
		collision(teleporter5);
}
function level6(){
	myDraw(map6);
		for (var i = 0; i < boxes6.length; i++) {
			myRect(boxes6[i]);
			setDir(boxes6[i]);
			for (var j=0;j<bullets.length;j++) {
				if (colCheck3(boxes6[i], bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		kill3(loszka);
		for(i=0;i<bullets.length;i++) colCheck2(bullets[i], loszka);
		myDraw(loszka);
		myDraw(teleporter);
		collision(teleporter6);
}

function myDraw(myObject){
	ctx.drawImage(myObject.img, myObject.x + viewport.x, myObject.y, myObject.width, myObject.height);
}
function myRect(myBox){
	ctx.fillStyle= "black";
	ctx.beginPath();
	ctx.rect( myBox.x + viewport.x, myBox.y, myBox.width, myBox.height);
	ctx.fill();
}
function myDraw2(myImage, myObject){
	ctx.drawImage(myImage, myObject.x + viewport.x, myObject.y, myObject.width, myObject.height);
}
function setDir(myBox){
	var dir = colCheck(player, myBox);
	if (dir === "l" || dir === "r") player.velX = 0;
	else if (dir === "b") { 
		player.grounded = true;
		player.jumping = false;
	} else if (dir === "t")	player.velY *= -1;
}
function patrol(myMonster){
	if (myMonster.x < myMonster.maxX && myMonster.direction == "right") { myMonster.x++; myMonster.HBx++; }
	if (myMonster.x >= myMonster.maxX) { myMonster.x--; myMonster.direction = "left"; myMonster.HBx--; }
	if (myMonster.direction == "left" && myMonster.x > myMonster.minX) { myMonster.x--; myMonster.HBx--; }
	if (myMonster.x <= myMonster.minX) { myMonster.direction = "right"; myMonster.x++; myMonster.HBx++; }
}
function myDraw3(myImage, myObject){
	ctx.translate(myObject.x + viewport.x + 100,0);  //przesuwa origin
 	ctx.scale(-1,1);
	ctx.drawImage(myImage, 0, myObject.y, myObject.width, myObject.height)
	ctx.setTransform(1,0,0,1,0,0);
}
function playSound(){
	with(new AudioContext)for(i in D=[12])with(createOscillator())if(D[i])connect(destination),frequency.value=440*1.06**(13-D[i]),start(i*.1),stop(i*.1+.1)
}
function shoot(){
	if (spacePressed && nie == false) {
		spacePressed = false;
		shooting = true;
		licznik = 40;
		var b = new Bullet();
		bullets.push(b);
		nie = true;
		playSound();
	}
	if(licznik) licznik--;
	if(!licznik) { shooting = false; nie = false; }
}