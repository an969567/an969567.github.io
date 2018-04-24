function update() {
	
	viewport.x = clamp(-player.x + canvas.width / 2, //aha, czyli clamp jest do viewportu
		canvas.width - map.width, 0 //0 to max
	 );
	  viewport.y = clamp(-player.y + canvas.height / 2,
		canvas.height - map.height, 0
	 );

	frameCount++;
		
	player.inAir = true; //do sprajtu potrzebne
	
	if ((keys[39] || keys[68]) && alive) {
		// right arrow
		if (player.velX < player.speed) {
			player.velX++;
			player.direction = "right";
		}
	}
	if ((keys[37] || keys[65]) && alive) {
		// left arrow
		if (player.velX > -player.speed) {
			player.velX--;
			player.direction = "left";
		}
	}
	
	if (spacePressed == true && alive) shooting = true;
	
	player.velX *= friction;

	ctx.clearRect(0, 0, width, height);
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
		default:
			ctx.font = "30px Arial";
			ctx.fillStyle = "red";
			ctx.fillText("You won!",70,150);
	}

	if ((keys[38] || keys[87]) && !player.inAir && alive) {
		// up arrow or w  //zapobiega jumpom w powietrzu //można zrobić w przyszłości double jump
			player.velY = -player.speed * 1.5;
	}

	if(player.inAir) player.velY += gravity; //bez ifa zaczyna się kumulować

	//debugger;
	
	
	/*--------------------------------------------------------------------------------------------*/
	
	drawPlayer();
	
	for(var i=0; i < bullets.length; i++){
		if (bullets[i].direction == "right") bullets[i].x+=20;
		else bullets[i].x-=20;
		myDraw2(bulletImg, bullets[i]);
	} //na wierzchu bullets

	player.x += player.velX;
	player.HBx += player.velX;
	player.y += player.velY;
	player.HBy += player.velY;

	if(!alive){
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("You died",70,150);
	}

	window.requestAnimationFrame(update); //siebie przywołuje
}