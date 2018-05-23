function update() {

	if (level <= map.length - 1) {
		viewport.x = clamp(-player.x + canvas.width / 2, //aha, czyli clamp jest do viewportu
		canvas.width - map[level].width, 0 //0 to max  //map.width - bierze dla pierwszego
		);
		viewport.y = clamp(-player.y + canvas.height / 2,
		canvas.height - map[level].height, 0
		);
	}

	hurting = false;

	frameCount++;
		
	player.inAir = true; //do sprajtu potrzebne

	if (keys[82]) {
		// R
		alive = true;
		HP = 100;
		player.x = basePlayer.x;
		player.y = basePlayer.y;
		player.HBx = basePlayer.x + 35;
		player.HBy = basePlayer.y + 10;
	}
	
	if (keys[39] || keys[68]) {
		// right arrow
		if (player.velX < player.speed) {
			player.velX++;
			player.direction = "right";
		}
	}
	if (keys[37] || keys[65]) {
		// left arrow
		if (player.velX > -player.speed) {
			player.velX--;
			player.direction = "left";
		}
	}
	
	if (keys[32]) {
		// space
		if(!licznik) licznik = 36;
	}
	
	player.velX *= friction;

	ctx.fillStyle = "black";
	ctx.beginPath();
	
	switch (level) {
		case 1:
			level1();
			break;
		case 2:
			level2();
			break;
		case 3:
			level3();
			break;
		case 4:
			level4();
			break;
		case 5:
			level5();
			break;
		case 6:
			level6();
			break;
		case 7:
			level7();
			break;
		case 8:
			level8();
			break;
		case 9:
			level9();
			break;
		default:
			ctx.font = "30px Arial";
			ctx.fillStyle = "red";
			ctx.fillText("You won!", 70, 160);
	}

	if ((keys[38] || keys[87]) && !player.inAir /*&& (skoczyl_juz == 0 || skoczyl_juz == 1)*/) { //!player.inAir nie pozwala mu skoczyć znowu
		// up arrow
			player.velY = -player.speed * 1.5;
			//skoczyl_juz++;
	}

	if ((keys[38] || keys[87]) && skoczyl_juz == false && player.velY > 0) {
		// up arrow
			player.velY = -player.speed * 1.5;
			skoczyl_juz = true;
	}

	if(player.inAir) player.velY += gravity;	
	
	drawPlayer();
	
	for(i of bullets){ //tu są przesuwane bullety
		if (i.direction == "right") i.x+=20;
		else i.x-=20;
		myDraw2(bulletImg, i);
	}

	if (music_playing)
		myDraw5(speaker);
	else
		myDraw5(mute);

	player.x += player.velX;
	player.HBx += player.velX;
	player.y += player.velY;
	player.HBy += player.velY;

	if (HP <= 0) alive = false;

	if(!alive){
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("You died", 70, 160);
	}

	window.requestAnimationFrame(update);
}