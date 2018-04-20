function drawPlayer() {
	player.x += player.velX;
	player.y += player.velY;
	ctx.font = "30px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Welcome in Mental Asylum",70,70);
	if (player.velX < 0.1 && player.velX > -0.1) player.velX = 0; //absolute value
	if (player.jumping == false){
		if (player.direction == "right"){
			if(player.velX == 0) {
				if (spacePressed == false) {
					/************************************************************************************************************************/
					h = frameCount % 40;
					myDraw2(eval('idle'+ (Math.floor(h/4)+1) +'Img'), player);
					/************************************************************************************************************************/
				}
				else {
					licznik = frameCount % 3;
					myDraw2(shootImg, player);
				}
			}
			else myDraw2(runImg, player);
		}
		else {
			if(player.velX == 0) {
				if (spacePressed == false) myDraw2(leftImg, player);
				else myDraw2(shootLeftImg, player);
			}
			else {
				myDraw2(runLeftImg, player);
			}
		}
	}
	else {
		if(player.direction == "right") myDraw2(jumpImg, player);
		else myDraw2(jumpLeftImg, player);
	}
}

function level1(){
		myDraw(map);
		for (var i = 0; i < boxes.length; i++) {
			myRect(boxes[i]);

			var dir = colCheck(player, boxes[i]);
			if (dir === "l" || dir === "r") {
				player.velX = 0;
			} else if (dir === "b") { 
				player.grounded = true;
				player.jumping = false;
			} else if (dir === "t") {
				player.velY *= -1;
			}
			for (j=0;j<bullets.length;j++) {
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

			var dir = colCheck(player, boxes2[i]);
			if (dir === "l" || dir === "r") {
			player.velX = 0;	
			} else if (dir === "b") { 
				player.grounded = true;
				player.jumping = false;
			} else if (dir === "t") {
				player.velY *= -1;
			}
			for (j=0;j<bullets.length;j++) {
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

			var dir = colCheck(player, boxes3[i]);
			if (dir === "l" || dir === "r") {
			player.velX = 0;
			} else if (dir === "b") { 
				player.grounded = true;
				player.jumping = false;
			} else if (dir === "t") {
				player.velY *= -1;
			}
			for (j=0;j<bullets.length;j++) {
				if (colCheck3(boxes3[i], bullets[j]) == true) bullets.splice(j,1);
			}
    	}
		kill3(monster);
		if(monster.x < monster.maxX && monster.direction == "right") { monster.x++; monster.HBx++; }
		if(monster.x >= monster.maxX) { monster.x--; monster.direction = "left"; monster.HBx--; }
		if(monster.direction == "left" && monster.x > monster.minX) { monster.x--; monster.HBx--; }
		if(monster.x <= monster.minX) { monster.direction = "right"; monster.x++; monster.HBx++; }
		if (monster.direction == "left") myDraw(monster);
		else myDraw2(monsterRightImg, monster);
		myDraw(teleporter);
		collision(teleporter3);
}

function level4(){
	myDraw(map4);
		for (var i = 0; i < boxes4.length; i++) {
			myRect(boxes4[i]);

			var dir = colCheck(player, boxes4[i]);
			if (dir === "l" || dir === "r") {
			player.velX = 0;
			} else if (dir === "b") { 
				player.grounded = true;
				player.jumping = false;
			} else if (dir === "t") {
				player.velY *= -1;
			}
			for (j=0;j<bullets.length;j++) {
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

		var dir = colCheck(player, boxes5[i]);
		if (dir === "l" || dir === "r") {
		player.velX = 0;
		} else if (dir === "b") { 
			player.grounded = true;
			player.jumping = false;
		} else if (dir === "t") {
			player.velY *= -1;
		}
		for (j=0;j<bullets.length;j++) {
			if (colCheck3(boxes5[i], bullets[j]) == true) bullets.splice(j,1);
		}
    }
	kill2(monster3);
	if(monster3.x < monster3.maxX && monster3.direction == "right") { monster3.x++; monster3.HBx++;}//to też możnaby zmienić na funkcję
	if(monster3.x >= monster3.maxX) { monster3.x--; monster3.direction = "left"; monster3.HBx--; }
	if(monster3.direction == "left" && monster3.x > monster.minX) { monster3.x--; monster3.HBx--; }
	if(monster3.x <= monster.minX) { monster3.direction = "right"; monster3.x++; monster3.HBx++; }
	if (monster3.direction == "left") myDraw(monster3);
	else myDraw2(monster2rightImg, monster3);
		myDraw(teleporter);
		collision(teleporter5);
}
function level6(){
	myDraw(map6);
		for (var i = 0; i < boxes6.length; i++) {
			myRect(boxes6[i]);

			var dir = colCheck(player, boxes6[i]);
			if (dir === "l" || dir === "r") {
			player.velX = 0;
			} else if (dir === "b") { 
				player.grounded = true;
				player.jumping = false;
			} else if (dir === "t") {
				player.velY *= -1;
			}
			for (j=0;j<bullets.length;j++) {
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