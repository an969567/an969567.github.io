function update() {
	
	viewport.x = clamp(-player.x + canvas.width / 2, //aha, czyli clamp jest do viewportu
		canvas.width - map.width, 0 //0 to max
	 );
	  viewport.y = clamp(-player.y + canvas.height / 2,
		canvas.height - map.height, 0
	 );

	frameCount++;
		
	
	if (keys[38] || keys[87]) {
		// up arrow or w
		if (!player.jumping/* && player.grounded*/) {
			player.jumping = true;
			player.grounded = false;
			player.velY = -player.speed * 1.5; //czyli nadaje raz prędkość, a potem już tylko grawitacja zmniejsza  //prędkość pionowa //a właściwie szybkość pionowa
		}
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
	
	spacePressed = false; //do sprajtu
	if (spacePressed2 == true) {
		//console.log("space");
		 //SMART!!!!!!!!!
		//console.log(bullets.length);
		spacePressed2 = false; //!!!
		spacePressed = true; //do sprajtu
	}
	
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

	if(player.grounded){ //does this happen
		player.velY = 0;
	} //czyli to powinno zostać zerem na koniec frejmu

	if(player.grounded == false)/*no zgadza się, aplikujemy wtedy jest grounded*//*if (player.velY!=0)*/player.velY += gravity;
	player.grounded = false;  //tylko to jest głupie  //jeżeli nie jest grounded, to nie może skoczyć //AAAA skomplikowane
	
	
	/*--------------------------------------------------------------------------------------------*/
	
	drawPlayer();
	
	for(var i=0; i < bullets.length; i++){
		if (bullets[i].direction == "right") bullets[i].x+=20;
		else bullets[i].x-=20;
		ctx.drawImage(bulletImg, bullets[i].x + viewport.x, bullets[i].y, bullets[i].width, bullets[i].height);
	} //na wierzchu bullets
	
	console.log(player.jumping);

	if(player.velY == -0.6) player.velY = 0;

	player.x += player.velX;
	player.HBx += player.velX;
	player.y += player.velY;
	player.HBy += player.velY;

	if (alive){
		window.requestAnimationFrame(update); //siebie przywołuje?
	}
}