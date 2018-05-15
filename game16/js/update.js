function update() {

	viewport.x = clamp(-player.x + canvas.width / 2, //aha, czyli clamp jest do viewportu
		canvas.width - map.width, 0 //0 to max  //map.width - bierze dla pierwszego
	 );
	  viewport.y = clamp(-player.y + canvas.height / 2,
		canvas.height - map.height, 0
	 );

	frameCount++;
		
	player.inAir = true; //do sprajtu potrzebne
	
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
		default:
			ctx.font = "30px Arial";
			ctx.fillStyle = "red";
			ctx.fillText("You won!",70,150);
	}

	if ((keys[38] || keys[87]) && !player.inAir) {
		// up arrow
			player.velY = -player.speed * 1.5;
	}

	if(player.inAir) player.velY += gravity;	
	
	drawPlayer();
	
	for(i of bullets){
		if (i.direction == "right") i.x+=20;
		else i.x-=20;
		myDraw2(bulletImg, i);
	}
	/* draw speaker */
	myDraw5(speaker);

	player.x += player.velX;
	player.HBx += player.velX;
	player.y += player.velY;
	player.HBy += player.velY;

	if(!alive){
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("You died",70,150);
	}

	window.requestAnimationFrame(update);
}