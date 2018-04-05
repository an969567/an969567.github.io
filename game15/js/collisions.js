//Game15 = lewo, prawo

function colCheck(shapeA, shapeB) { //jeden z shapów to zawsze player //shapeA to player
	// get the vectors to check against  //bierze dwa kształty, jeden platforma, drugi gracz
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)), //tylko x i y się różnią  //może to lepiej zrozumieć //nawiasy dla ułatwienia czytania, drugi nawias jest ważny //width jest brane pod uwagę przy x //składowa wektoru x czyli jestesmy przy leweym końcu i dodajemy pół szerokości. potem odejmujemy środek szerokości kształtuB //czyli odległość pomiędzy nimi dwoma
		vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)), //dałoby się zmienić na player ale może nie warto
		// add the half widths and half heights of the objects //to jest dobrze opisane na jego stronie //analogicznie
		hWidths = (shapeA.width / 2) + (shapeB.width / 2), // minimalna odległość między dwoma
		hHeights = (shapeA.height / 2) + (shapeB.height / 2),
		colDir = null; //zwraca tyle jeżeli nie ma kolizji

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { // a tu nie powinno być OR ? //obecnie bierze pod uwagę oba równocześnie
		// figures out on which side we are colliding (top, bottom, left, or right)
		var oX = hWidths - Math.abs(vX),  //od czego to skróty oX //to jest dystans przesunięcia //oX i oY dodatnie
			oY = hHeights - Math.abs(vY);  //dziwne, co jeżeli tylko z jednej strony uderzy
		if (oX >= oY) {
			if (vY > 0) {
				colDir = "t";
				shapeA.y += oY;
			} else {
				colDir = "b";
				shapeA.y -= oY;
			}
		} else {
			if (vX > 0) {
				colDir = "l";
				shapeA.x += oX;  //shapeA jest traktowane specjalnie
			} else {
				colDir = "r";
				shapeA.x -= oX; ///aaaa zmieniane jest na koniec // oX = przesunięcie
			}
		}
	}
	return colDir; //zwracal null jeśli się nie dotykają
}

function collision(shapeB) { //zmieniamy na funkcję jednego argumentu
	var vX = (player.x + (player.width / 2)) - (shapeB.x + (shapeB.width / 2)), 
		vY = (player.y + (player.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (player.width / 2) + (shapeB.width / 2),
		hHeights = (player.height / 2) + (shapeB.height / 2),
		colDir = null;

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { //jeżeli ten if to wystąpiła kolizja
		level = 2; //w przyszłości zrobimy level++
		player.x = basePlayer.x;
		player.y = basePlayer.y;
	}
}

function kill(shapeB) { //zmieniamy na funkcję jednego argumentu //zabijanie
	var vX = (player.x + (player.width / 2)) - (shapeB.x + (shapeB.width / 2)), 
		vY = (player.y + (player.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (player.width / 2) + (shapeB.width / 2),
		hHeights = (player.height / 2) + (shapeB.height / 2),
		colDir = null;

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { //jeżeli ten if to wystąpiła kolizja
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("You died",70,150);
		alive = false;
	}
}

function collision2(shapeB) { //zmieniamy na funkcję jednego argumentu
	var vX = (player.x + (player.width / 2)) - (shapeB.x + (shapeB.width / 2)), 
		vY = (player.y + (player.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (player.width / 2) + (shapeB.width / 2),
		hHeights = (player.height / 2) + (shapeB.height / 2),
		colDir = null;

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { //jeżeli ten if to wystąpiła kolizja
		level = 3; //w przyszłości zrobimy level++
		player.x = basePlayer.x;
		player.y = basePlayer.y;
	}
}
function collision3(shapeB) { //zmieniamy na funkcję jednego argumentu
	var vX = (player.x + (player.width / 2)) - (shapeB.x + (shapeB.width / 2)), 
		vY = (player.y + (player.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (player.width / 2) + (shapeB.width / 2),
		hHeights = (player.height / 2) + (shapeB.height / 2),
		colDir = null;

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { //jeżeli ten if to wystąpiła kolizja
		level = 4; //w przyszłości zrobimy level++
		player.x = basePlayer.x;
		player.y = basePlayer.y;
	}
}

function kill2(shapeB) { //jeden z shapów to zawsze player //shapeA to player
	// get the vectors to check against  //bierze dwa kształty, jeden platforma, drugi gracz
	var vX = (player.x + (player.width / 2)) - (shapeB.x + (shapeB.width / 2)), //tylko x i y się różnią  //może to lepiej zrozumieć //nawiasy dla ułatwienia czytania, drugi nawias jest ważny //width jest brane pod uwagę przy x //składowa wektoru x czyli jestesmy przy leweym końcu i dodajemy pół szerokości. potem odejmujemy środek szerokości kształtuB //czyli odległość pomiędzy nimi dwoma
		vY = (player.y + (player.height / 2)) - (shapeB.y + (shapeB.height / 2)), //dałoby się zmienić na player ale może nie warto
		// add the half widths and half heights of the objects //to jest dobrze opisane na jego stronie //analogicznie
		hWidths = (player.width / 2) + (shapeB.width / 2), // minimalna odległość między dwoma
		hHeights = (player.height / 2) + (shapeB.height / 2),
		colDir = null; //zwraca tyle jeżeli nie ma kolizji

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { // a tu nie powinno być OR ? //obecnie bierze pod uwagę oba równocześnie
		// figures out on which side we are colliding (top, bottom, left, or right)
		var oX = hWidths - Math.abs(vX),  //od czego to skróty oX //to jest dystans przesunięcia //oX i oY dodatnie
			oY = hHeights - Math.abs(vY);  //dziwne, co jeżeli tylko z jednej strony uderzy
		if (oX >= oY) {
			if (vY > 0) {
				shapeB.fall();
			} else {
				shapeB.fall();
			}
		} else {
			if (vX > 0) {
				ctx.font = "30px Arial";
				ctx.fillStyle = "red";
				ctx.fillText("You died",70,150);
				alive = false;  //od lewej umiera //odwrotnie - od prawej
			} else {
				colDir = "r";
				player.x -= oX; ///aaaa zmieniane jest na koniec // oX = przesunięcie
			}
		}
	}
	return colDir; //zwracal null jeśli się nie dotykają
}

function collision4(shapeB) { //zmieniamy na funkcję jednego argumentu
	var vX = (player.x + (player.width / 2)) - (shapeB.x + (shapeB.width / 2)), 
		vY = (player.y + (player.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (player.width / 2) + (shapeB.width / 2),
		hHeights = (player.height / 2) + (shapeB.height / 2),
		colDir = null;

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { //jeżeli ten if to wystąpiła kolizja
		level = 5; //w przyszłości zrobimy level++
		player.x = basePlayer.x;
		player.y = basePlayer.y;
	}
}

function collision5(shapeB) { //zmieniamy na funkcję jednego argumentu
	var vX = (player.x + (player.width / 2)) - (shapeB.x + (shapeB.width / 2)), 
		vY = (player.y + (player.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (player.width / 2) + (shapeB.width / 2),
		hHeights = (player.height / 2) + (shapeB.height / 2),
		colDir = null;

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { //jeżeli ten if to wystąpiła kolizja
		level = 6; //w przyszłości zrobimy level++
		player.x = basePlayer.x;
		player.y = basePlayer.y;
	}
}

function colCheck2(shapeA, shapeB) { //jeden z shapów to zawsze player //shapeA to player //teraz będzie bullet + potworo loszka //shapeB - potworoloszka //shapeA - bullet
	// get the vectors to check against  //bierze dwa kształty, jeden platforma, drugi gracz
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)), //tylko x i y się różnią  //może to lepiej zrozumieć //nawiasy dla ułatwienia czytania, drugi nawias jest ważny //width jest brane pod uwagę przy x //składowa wektoru x czyli jestesmy przy leweym końcu i dodajemy pół szerokości. potem odejmujemy środek szerokości kształtuB //czyli odległość pomiędzy nimi dwoma
		vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)), //dałoby się zmienić na player ale może nie warto
		// add the half widths and half heights of the objects //to jest dobrze opisane na jego stronie //analogicznie
		hWidths = (shapeA.width / 2) + (shapeB.width / 2), // minimalna odległość między dwoma
		hHeights = (shapeA.height / 2) + (shapeB.height / 2);

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { // a tu nie powinno być OR ? //obecnie bierze pod uwagę oba równocześnie
		// figures out on which side we are colliding (top, bottom, left, or right)
		shapeB.fall();
	}
}