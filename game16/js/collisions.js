function colCheck(shapeA, shapeB) {
	var vX = (shapeA.HBx + (shapeA.HBwidth / 2)) - (shapeB.x + (shapeB.width / 2)),
		vY = (shapeA.HBy + (shapeA.HBheight / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (shapeA.HBwidth / 2) + (shapeB.width / 2),
		hHeights = (shapeA.HBheight / 2) + (shapeB.height / 2),
		colDir = null;

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		var oX = hWidths - Math.abs(vX),
			oY = hHeights - Math.abs(vY);
		if (oX >= oY) {
			if (vY > 0) {
				colDir = "t";
				shapeA.y += oY;
				shapeA.HBy += oY;
			} else {
				colDir = "b";
				shapeA.y -= oY;
				shapeA.HBy -= oY;
			}
		} else {
			if (vX > 0) {
				colDir = "l";
				shapeA.x += oX;
				shapeA.HBx += oX;
			} else {
				colDir = "r";
				shapeA.x -= oX;
				shapeA.HBx -= oX;
			}
		}
	}
	return colDir;
}
//teleporter
function collision(shapeB) {
	var vX = (player.HBx + (player.HBwidth / 2)) - (shapeB.x + (shapeB.width / 2)), 
		vY = (player.HBy + (player.HBheight / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (player.HBwidth / 2) + (shapeB.width / 2),
		hHeights = (player.HBheight / 2) + (shapeB.height / 2);

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		level++;
		player.x = basePlayer.x;
		player.y = basePlayer.y;
		player.HBx = basePlayer.x + 10; //dziwna niespójność
		player.HBy = basePlayer.y + 10;
	}
}
//dla kolców i monster1 i loszka
function kill(shapeB) {
	var vX = (player.HBx + (player.HBwidth / 2)) - (shapeB.x + (shapeB.width / 2)), 
		vY = (player.HBy + (player.HBheight / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (player.HBwidth / 2) + (shapeB.width / 2),
		hHeights = (player.HBheight / 2) + (shapeB.height / 2);

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("You died",70,150);
		alive = false;
	}
}

//na potwora co można na niego skoczyć
function kill2(shapeB) {
	var vX = (player.HBx + (player.HBwidth / 2)) - (shapeB.HBx + (shapeB.HBwidth / 2)), 
		vY = (player.HBy + (player.HBheight / 2)) - (shapeB.HBy + (shapeB.HBheight / 2)),
		hWidths = (player.HBwidth / 2) + (shapeB.HBwidth / 2),
		hHeights = (player.HBheight / 2) + (shapeB.HBheight / 2);

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { 
		var oX = hWidths - Math.abs(vX),
			oY = hHeights - Math.abs(vY);
		if (oX >= oY) {
			shapeB.fall();
			player.velY -= 20; //odbicie
			bounce.play();
		}
		else {
				alive = false;
		}
	}
}

//bullet + potworo loszka //shapeB - potworoloszka //shapeA - bullet
function colCheck2(shapeA, shapeB) {
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
		vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (shapeA.width / 2) + (shapeB.width / 2),
		hHeights = (shapeA.height / 2) + (shapeB.height / 2);

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		//spadek potworoloszki
		shapeB.fall();
	}
}

//shapeA - blok //shapeB - pocisk
function colCheck3(shapeA, shapeB) {
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
		vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (shapeA.width / 2) + (shapeB.width / 2),
		hHeights = (shapeA.height / 2) + (shapeB.height / 2);

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		return true; //jest kolizja
	}
	return false; //else jest niepotrzebne
} //taka generalna bardzo funkcja

function kill3(shapeB) { //zmieniamy na funkcję jednego argumentu //zabijanie //z hitboxami
	var vX = (player.HBx + (player.HBwidth / 2)) - (shapeB.HBx + (shapeB.HBwidth / 2)), 
		vY = (player.HBy + (player.HBheight / 2)) - (shapeB.HBy + (shapeB.HBheight / 2)),
		hWidths = (player.HBwidth / 2) + (shapeB.HBwidth / 2),
		hHeights = (player.HBheight / 2) + (shapeB.HBheight / 2);

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("You died",70,150);
		alive = false;
	}
}

//for coin
//może korzystać z generalnej funkcji colCheck3(shapeA, shapeB)
//jednego argumentu, bo drugi to player (nie komplikujemy zbytecznie)
//eh, tylko że powinniśmy sprawdzać hitBoxy playera. Na razie zostawmy tak, bez hitboxów
function collision2(shape){
	if(colCheck3(player, shape)) {
		shape.fall();
		console.log("Kolizja2");
	}
}
//colCheck3 jest generalną funkcją kolizji
//niby można by to zrefaktorowować