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
				if (spacePressed == false) { //nie ma spacji //powinno zaczynać od false przecież
					/************************************************************************************************************************/
					//zakładamy, że przez całą grę tylko stoi dziewczynka
					//i nic nie wciskamy
					//ilość klatek = 10
					//z użyciem eval()
					if (player.x < width/2) {
						for(var i=0; i<20; i++){
							if(frameCount % 20 == i) ctx.drawImage(eval('idle'+ (Math.floor(i/2)+1) +'Img'), player.x, player.y, player.width, player.height);
						}
					}
					else {
						for(var i=0; i<10; i++){
							if(frameCount % 10 == i) ctx.drawImage(eval('idle'+(i+1) +'Img'), width/2, player.y, player.width, player.height);
						}
					}
					/************************************************************************************************************************/
				}
				else {
					licznik = frameCount % 3;
					if (player.x < width/2) ctx.drawImage(shootImg, player.x, player.y, player.width, player.height);
					else ctx.drawImage(shootImg, width/2, player.y, player.width, player.height);
				}
			}
			else {
				if (player.x < width/2) ctx.drawImage(runImg, player.x, player.y, player.width, player.height);
				else ctx.drawImage(runImg, width/2, player.y, player.width, player.height);
			}
		}
		else {
			if(player.velX == 0) {
				if (spacePressed == false) {
					if(player.x < width/2) ctx.drawImage(leftImg, player.x, player.y, player.width, player.height);
					else ctx.drawImage(leftImg, width/2, player.y, player.width, player.height);
				}
				else {
					if(player.x < width/2) ctx.drawImage(shootLeftImg, player.x, player.y, player.width, player.height);
					else ctx.drawImage(shootLeftImg, width/2, player.y, player.width, player.height);			
				}
			}
			else {
				if(player.x < width/2) ctx.drawImage(runLeftImg, player.x, player.y, player.width, player.height);
				else ctx.drawImage(runLeftImg, width/2, player.y, player.width, player.height);
			}
		}
	}
	else {
		if(player.direction == "right"){
			if (player.x < width/2) ctx.drawImage(jumpImg, player.x, player.y, player.width, player.height);
			else ctx.drawImage(jumpImg, width/2, player.y, player.width, player.height);
		}
		else {
			if(player.x < width/2) ctx.drawImage(jumpLeftImg, player.x, player.y, player.width, player.height);
			else ctx.drawImage(jumpLeftImg, width/2, player.y, player.width, player.height);
		}
	}
}

function level1(){
		if (player.x < width/2 ) myDraw(map); 
		else myDraw2(map);
		for (var i = 0; i < boxes.length; i++) {
			ctx.fillStyle= "black";
			ctx.beginPath();
			if (player.x < width/2 ) ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
			else ctx.rect(boxes[i].x - player.x + width/2, boxes[i].y, boxes[i].width, boxes[i].height);
			ctx.fill();
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
				if (colCheck3(boxes[i], bullets[j]) == true) bullets[j] = 0;
			}
		}
		myDraw2(teleporter);
		collision(teleporter);
}

function level2(){
	if(player.x < width/2 ) myDraw(map2);
	else myDraw2(map2);
		for (var i = 0; i < boxes2.length; i++) {
			ctx.fillStyle = "black"
			if (player.x < width/2) ctx.rect(boxes2[i].x, boxes2[i].y, boxes2[i].width, boxes2[i].height);
			else ctx.rect(boxes2[i].x - player.x + width/2, boxes2[i].y, boxes2[i].width, boxes2[i].height);
			ctx.fill();
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
					if (colCheck3(boxes2[i], bullets[j]) == true) bullets[j] = 0;
			}
    	}
		if (player.x < width/2 ) myDraw(spikes);
		else myDraw2(spikes);
		myDraw2(teleporter);
		kill3(spikes);
		collision2(teleporter2);
}

function level3(){
	if(player.x < width/2 ) myDraw(map3);
	else myDraw2(map3);
		for (var i = 0; i < boxes3.length; i++) {
			ctx.fillStyle = "black"
			if (player.x < width/2) ctx.rect(boxes3[i].x, boxes3[i].y, boxes3[i].width, boxes3[i].height);
			else ctx.rect(boxes3[i].x - player.x + width/2, boxes3[i].y, boxes3[i].width, boxes3[i].height);
			ctx.fill();
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
				if (colCheck3(boxes3[i], bullets[j]) == true) bullets[j] = 0;
			}
    	}
		kill3(monster);
		if(monster.x < monster.maxX && monster.direction == "right") { monster.x++; monster.HBx++; }
		if(monster.x >= monster.maxX) { monster.x--; monster.direction = "left"; monster.HBx--; }
		if(monster.direction == "left" && monster.x > monster.minX) { monster.x--; monster.HBx--; }
		if(monster.x <= monster.minX) { monster.direction = "right"; monster.x++; monster.HBx++; }
		if (monster.direction == "left"){
			if (player.x < width/2 ) myDraw(monster);
			else myDraw2(monster);
		}
		else
			if (player.x < width/2 ) ctx.drawImage(monsterRightImg, monster.x, monster.y, monster.width, monster.height);
			else ctx.drawImage(monsterRightImg, monster.x - player.x + width/2, monster.y, monster.width, monster.height);
		myDraw2(teleporter);
		collision3(teleporter3);
}

function level4(){
	if(player.x < width/2 ) myDraw(map4);
	else myDraw2(map4);
		for (var i = 0; i < boxes4.length; i++) {
			ctx.fillStyle = "black"
			if (player.x < width/2) ctx.rect(boxes4[i].x, boxes4[i].y, boxes4[i].width, boxes4[i].height);
			else ctx.rect(boxes4[i].x - player.x + width/2, boxes4[i].y, boxes4[i].width, boxes4[i].height);
			ctx.fill();
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
				if (colCheck3(boxes4[i], bullets[j]) == true) bullets[j] = 0;
			}
    	}
		myDraw2(teleporter);
		kill2(monster2);
		if (player.x < width/2 ) myDraw(monster2);
		else myDraw2(monster2);
		collision4(teleporter4);
}

function level5(){
	if(player.x < width/2 ) myDraw(map5);
	else myDraw2(map5);
		for (var i = 0; i < boxes5.length; i++) {
			ctx.fillStyle = "black"
			if (player.x < width/2) ctx.rect(boxes5[i].x, boxes5[i].y, boxes5[i].width, boxes5[i].height);
			else ctx.rect(boxes5[i].x - player.x + width/2, boxes5[i].y, boxes5[i].width, boxes5[i].height);
			ctx.fill();
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
				if (colCheck3(boxes5[i], bullets[j]) == true) bullets[j] = 0;
			}
    	}
		kill2(monster3);
		if(monster3.x < monster3.maxX && monster3.direction == "right") { monster3.x++; monster3.HBx++;}
		if(monster3.x >= monster3.maxX) { monster3.x--; monster3.direction = "left"; monster3.HBx--; }
		if(monster3.direction == "left" && monster3.x > monster.minX) { monster3.x--; monster3.HBx--; }
		if(monster3.x <= monster.minX) { monster3.direction = "right"; monster3.x++; monster3.HBx++; }
		if (monster3.direction == "left"){
			if (player.x < width/2 ) myDraw(monster3);
			else myDraw2(monster3);
		}
		else
			if (player.x < width/2 ) ctx.drawImage(monster2rightImg, monster3.x, monster3.y, monster3.width, monster3.height);
			else ctx.drawImage(monster2rightImg, monster3.x - player.x + width/2, monster3.y, monster3.width, monster3.height);
		myDraw2(teleporter);
		collision5(teleporter5);
}
function level6(){
	if(player.x < width/2 ) myDraw(map6);
	else myDraw2(map6);
		for (var i = 0; i < boxes6.length; i++) {
			ctx.fillStyle = "black"
			if (player.x < width/2) ctx.rect(boxes6[i].x, boxes6[i].y, boxes6[i].width, boxes6[i].height);
			else ctx.rect(boxes6[i].x - player.x + width/2, boxes6[i].y, boxes6[i].width, boxes6[i].height);
			ctx.fill();
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
				if (colCheck3(boxes6[i], bullets[j]) == true) bullets[j] = 0;
			}
    	}
		kill3(loszka);
		for(i=0;i<bullets.length;i++) colCheck2(bullets[i], loszka);
		//if(monster3.x < monster3.maxX && monster3.direction == "right") monster3.x++;
		//if(monster3.x >= monster3.maxX) { monster3.x--; monster3.direction = "left"; }
		//if(monster3.direction == "left" && monster3.x > monster.minX) monster3.x--;
		//if(monster3.x <= monster.minX) { monster3.direction = "right"; monster3.x++;}
		//if (monster3.direction == "left"){
		if (player.x < width/2 ) myDraw(loszka);
		else myDraw2(loszka);
		//}
		//else
		//	ctx.drawImage(monster2rightImg, monster3.x - player.x + width/2, monster3.y - player.y + height/2, monster3.width, monster3.height);
		myDraw2(teleporter);
		collision5(teleporter5);
}

function myDraw(myObject){
	ctx.drawImage(myObject.img, myObject.x , myObject.y, myObject.width, myObject.height);
}

function myDraw2(myObject){
	ctx.drawImage(myObject.img, myObject.x - player.x + width/2 , myObject.y, myObject.width, myObject.height);
}