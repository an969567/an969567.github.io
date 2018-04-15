function update() {

	frameCount++;	
	
	if (keys[38] || keys[87]) {
		// up arrow or space or w
		if (!player.jumping && player.grounded) {
			player.jumping = true;
			player.grounded = false;
			player.velY = -player.speed * 1.5;
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
		var b = new Bullet();
		bullets.push(b);  //SMART!!!!!!!!!
		//console.log(bullets.length);
		spacePressed2 = false; //!!!
		spacePressed = true; //do sprajtu
		/**********************************/
		with(new AudioContext)for(i in D=[12])with(createOscillator())if(D[i])connect(destination),frequency.value=440*1.06**(13-D[i]),start(i*.1),stop(i*.1+.1)
		/*********************************/
	}
	
	player.velX *= friction;
	player.velY += gravity;
	player.grounded = false;

	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "black";
	ctx.beginPath();
	
	if (level == 1) {
		level1();
	}
	if (level == 2){
		level2();
	}
	if (level == 3){
		level3();
	}
	if (level == 4){
		level4();
	}
	if (level == 5){
		level5();
	}
	if (level == 6){
		level6();
	}
	
	
	/*--------------------------------------------------------------------------------------------*/
	
	if(player.grounded){
		player.velY = 0;
	}
	
	drawPlayer();
	
	for(var i=0; i < bullets.length; i++){
		if (bullets[i].direction == "right") bullets[i].x+=20;
		else bullets[i].x-=20;
		if (player.x < width/2) ctx.drawImage(bulletImg, bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
		else ctx.drawImage(bulletImg, bullets[i].x - player.x + width/2, bullets[i].y, bullets[i].width, bullets[i].height);
	} //na wierzchu bullets
	if (alive == true){
		window.requestAnimationFrame(update); //siebie przywołuje?
	}
}