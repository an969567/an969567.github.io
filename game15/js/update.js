//update
function update() {
	// check keys
	if (keys[38] || keys[32] || keys[87]) {
		// up arrow or space or w
		if (!player.jumping && player.grounded) {
			player.jumping = true;
			player.grounded = false;
			player.velY = -player.speed * 2;
		}
	}
	if (keys[39] || keys[68]) {
		// right arrow
		if (player.velX < player.speed) {
			player.velX++;
			player.direction = "right";
		}
	}
	if (keys[37] || keys[65]) { // o jest tutaj
		// left arrow
		if (player.velX > -player.speed) {
			player.velX--;
			player.direction = "left";
		}
	}

	player.velX *= friction; //zmniejsza się
	player.velY += gravity; //dodaje się w dół
	player.grounded = false;

	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "black"; //rysowane
	ctx.beginPath(); //?????? new path ale czy potrzebne //działa bez tego, ale sporo wolniej

	//gdzieś tutaj musi być przesunięcie o wektor // może o przesunięcie playera //czyli na początku by ruszał wszyskim, bez inteligentej kamery przy krawędziach
	if (level == 1) {
		ctx.drawImage(backgroundImg, - player.x + width/2, - player.y + height/2, map.width, map.height);
		for (var i = 0; i < boxes.length; i++) { //rysowanie boxów
		/// ctx.fillStyle = boxes[i].color; //rysowane
		//ctx.beginPath(); //?????? new path ale czy potrzebne //działa bez tego, ale sporo wolniej
			ctx.fillStyle= "black";
			ctx.beginPath();
			ctx.rect(boxes[i].x - player.x + width/2, boxes[i].y - player.y + height/2, boxes[i].width, boxes[i].height); //odwoływanie się do obiektów, tutaj same kwadraty, ale nie muszą to być kwadraty //więc użyłem prostokątów. //ctx.rect() //width i height nie zmieniają sie o wektor //czyli w tej wersji czerwony prostokąt byłby ciągle w tym samym miejscu //player.x player.y ? tak
			ctx.fill();
			//ctx.beginPath();
			//ctx.fillStyle = "green";
			ctx.drawImage(teleporterImg, teleporter.x - player.x + width/2, teleporter.y - player.y + height/2, teleporter.width, teleporter.height);
			//ctx.fill(); //inna technika
			var dir = colCheck(player, boxes[i]); //przypisuje "l", "r", "b" lub "t"

			if (dir === "l" || dir === "r") { //l lub r
				player.velX = 0; //zatrzymuje się w poziomie
				//  player.jumping = false; //czy to potrzebne?? wydaje się, że nie
			} else if (dir === "b") { 
				player.grounded = true;
				player.jumping = false;
			} else if (dir === "t") {
				player.velY *= -1;
			}
			collision(teleporter);
		}
	}
	
	if (level == 2){
		ctx.drawImage(background2Img, - player.x + width/2, - player.y + height/2, map.width, map.height);
		for (var i = 0; i < boxes2.length; i++) {
			ctx.fillStyle = "black"
			ctx.rect(boxes2[i].x - player.x + width/2, boxes2[i].y - player.y + height/2, boxes2[i].width, boxes2[i].height);
			ctx.fill();
			ctx.drawImage(spikesImg, spikes.x - player.x + width/2, spikes.y - player.y + height/2, spikes.width, spikes.height);
			ctx.drawImage(teleporterImg, teleporter.x - player.x + width/2, teleporter.y - player.y + height/2, teleporter.width, teleporter.height);
			var dir = colCheck(player, boxes2[i]);

			if (dir === "l" || dir === "r") {
			player.velX = 0;
				
			} else if (dir === "b") { 
				player.grounded = true;
				player.jumping = false;
			} else if (dir === "t") {
				player.velY *= -1;
			}
			kill(spikes); //dodać obiekt czerwony klocek //albo kolce // to działa :)))))
			collision2(teleporter2);
    	}
		
	}
	if (level == 3){
		ctx.drawImage(background3Img, - player.x + width/2, - player.y + height/2, map.width, map.height);
		for (var i = 0; i < boxes3.length; i++) {
			ctx.fillStyle = "black"
			ctx.rect(boxes3[i].x - player.x + width/2, boxes3[i].y - player.y + height/2, boxes3[i].width, boxes3[i].height);
			ctx.fill();
			ctx.drawImage(teleporterImg, teleporter.x - player.x + width/2, teleporter.y - player.y + height/2, teleporter.width, teleporter.height);
			var dir = colCheck(player, boxes3[i]);

			if (dir === "l" || dir === "r") {
			player.velX = 0;
				
			} else if (dir === "b") { 
				player.grounded = true;
				player.jumping = false;
			} else if (dir === "t") {
				player.velY *= -1;
			}
			kill(monster);
    	}
		if(monster.x < monster.maxX && monster.direction == "right") monster.x++;
		if(monster.x >= monster.maxX) { monster.x--; monster.direction = "left"; }
		if(monster.direction == "left" && monster.x > monster.minX) monster.x--;
		if(monster.x <= monster.minX) { monster.direction = "right"; monster.x++;}
		ctx.drawImage(monsterImg, monster.x - player.x + width/2, monster.y - player.y + height/2, monster.width, monster.height);
		collision3(teleporter3);
	}
	if (level == 4){
		ctx.drawImage(background4Img, - player.x + width/2, - player.y + height/2, map.width, map.height);
		for (var i = 0; i < boxes4.length; i++) {
			ctx.fillStyle = "black"
			ctx.rect(boxes4[i].x - player.x + width/2, boxes4[i].y - player.y + height/2, boxes4[i].width, boxes4[i].height);
			ctx.fill();
			ctx.drawImage(teleporterImg, teleporter.x - player.x + width/2, teleporter.y - player.y + height/2, teleporter.width, teleporter.height);
			var dir = colCheck(player, boxes4[i]);

			if (dir === "l" || dir === "r") {
			player.velX = 0;
				
			} else if (dir === "b") { 
				player.grounded = true;
				player.jumping = false;
			} else if (dir === "t") {
				player.velY *= -1;
			}
			kill2(monster2);
    	}
		ctx.drawImage(monster2Img, monster2.x - player.x + width/2, monster2.y - player.y + height/2, monster2.width, monster2.height);
		collision4(teleporter4);
	}
	if (level == 5){
		ctx.drawImage(background5Img, - player.x + width/2, - player.y + height/2, map.width, map.height);
		for (var i = 0; i < boxes5.length; i++) {
			ctx.fillStyle = "black"
			ctx.rect(boxes5[i].x - player.x + width/2, boxes5[i].y - player.y + height/2, boxes5[i].width, boxes5[i].height);
			ctx.fill();
			ctx.drawImage(teleporterImg, teleporter.x - player.x + width/2, teleporter.y - player.y + height/2, teleporter.width, teleporter.height);
			var dir = colCheck(player, boxes5[i]);

			if (dir === "l" || dir === "r") {
			player.velX = 0;
				
			} else if (dir === "b") { 
				player.grounded = true;
				player.jumping = false;
			} else if (dir === "t") {
				player.velY *= -1;
			}
			kill2(monster3);
    	}
		if(monster3.x < monster3.maxX && monster3.direction == "right") monster3.x++;
		if(monster3.x >= monster3.maxX) { monster3.x--; monster3.direction = "left"; }
		if(monster3.direction == "left" && monster3.x > monster.minX) monster3.x--;
		if(monster3.x <= monster.minX) { monster3.direction = "right"; monster3.x++;}
		ctx.drawImage(monster2Img, monster3.x - player.x + width/2, monster3.y - player.y + height/2, monster3.width, monster3.height);
		collision4(teleporter4);
	}
	if(player.grounded){
		player.velY = 0;
	}
	
	player.x += player.velX;
	player.y += player.velY;
	console.log(level);
	//tutaj rysujemy gracza
	ctx.font = "30px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Welcome in Mental Asylum",70,70);
	if (player.jumping == false){
		if (player.direction == "right"){
			ctx.drawImage(girlImg, width/2, height/2, player.width, player.height);
		}
		else {
			ctx.drawImage(leftImg, width/2, height/2, player.width, player.height);
		}
	}
	else {
		if(player.direction == "right"){
			ctx.drawImage(jumpImg, width/2, height/2, player.width, player.height);
		}
		else {
			ctx.drawImage(jumpLeftImg, width/2, height/2, player.width, player.height);
		}
	}
	if (alive == true){
		requestAnimationFrame(update); //siebie przywołuje?
	}
}