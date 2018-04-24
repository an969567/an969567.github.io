function colCheck(shapeA, shapeB) { //jeden z shapów to zawsze player //shapeA to player
	// get the vectors to check against  //bierze dwa kształty, jeden platforma, drugi gracz
	var vX = (shapeA.HBx + (shapeA.HBwidth / 2)) - (shapeB.x + (shapeB.width / 2)), //tylko x i y się różnią  //może to lepiej zrozumieć //nawiasy dla ułatwienia czytania, drugi nawias jest ważny //width jest brane pod uwagę przy x //składowa wektoru x czyli jestesmy przy leweym końcu i dodajemy pół szerokości. potem odejmujemy środek szerokości kształtuB //czyli odległość pomiędzy nimi dwoma
		vY = (shapeA.HBy + (shapeA.HBheight / 2)) - (shapeB.y + (shapeB.height / 2)), //dałoby się zmienić na player ale może nie warto
		// add the half widths and half heights of the objects //to jest dobrze opisane na jego stronie //analogicznie
		hWidths = (shapeA.HBwidth / 2) + (shapeB.width / 2), // minimalna odległość między dwoma
		hHeights = (shapeA.HBheight / 2) + (shapeB.height / 2),
		colDir = null; //zwraca tyle jeżeli nie ma kolizji

	// if the x and y vector are less than the half width AND half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { // a tu nie powinno być OR ?//nie //obecnie bierze pod uwagę oba równocześnie // i dobrze
		// figures out on which side we are colliding (top, bottom, left, or right)
		var oX = hWidths - Math.abs(vX),  //od czego to skróty oX //to jest dystans przesunięcia //oX i oY dodatnie
			oY = hHeights - Math.abs(vY);  //dziwne, co jeżeli tylko z jednej strony uderzy //normalne
		if (oX >= oY) {
			if (vY > 0) {
				colDir = "t"; //to return właściwie potrzebne? // chyba nie bardzo //jednak potrzebne// do ustawiania właściwości playera
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
				shapeA.x += oX;  //shapeA jest traktowane specjalnie
				shapeA.HBx += oX;
			} else {
				colDir = "r";
				shapeA.x -= oX; ///aaaa zmieniane jest na koniec // oX = przesunięcie
				shapeA.HBx -= oX;
			}
		}
	}
	return colDir; //zwracal null jeśli się nie dotykają
}
//teleporter
function collision(shapeB) { //zmieniamy na funkcję jednego argumentu
	var vX = (player.HBx + (player.HBwidth / 2)) - (shapeB.x + (shapeB.width / 2)), 
		vY = (player.HBy + (player.HBheight / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (player.HBwidth / 2) + (shapeB.width / 2),
		hHeights = (player.HBheight / 2) + (shapeB.height / 2);

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { //jeżeli ten if to wystąpiła kolizja
		level++; //w przyszłości zrobimy level++
		player.x = basePlayer.x;
		player.y = basePlayer.y;
		player.HBx = basePlayer.x + 10; //po tym się psuje
		player.HBy = basePlayer.y + 10; //a właściwie to po tym
	}
}
//spikes
function kill(shapeB) { //zmieniamy na funkcję jednego argumentu //zabijanie //dla kolców i monster1 i loszka
	var vX = (player.HBx + (player.HBwidth / 2)) - (shapeB.x + (shapeB.width / 2)), 
		vY = (player.HBy + (player.HBheight / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (player.HBwidth / 2) + (shapeB.width / 2),
		hHeights = (player.HBheight / 2) + (shapeB.height / 2);

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { //jeżeli ten if to wystąpiła kolizja
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("You died",70,150);
		alive = false;
	}
}

function kill2(shapeB) { //na potwora co można na niego skoczyć
	var vX = (player.HBx + (player.HBwidth / 2)) - (shapeB.HBx + (shapeB.HBwidth / 2)), 
		vY = (player.HBy + (player.HBheight / 2)) - (shapeB.HBy + (shapeB.HBheight / 2)),
		hWidths = (player.HBwidth / 2) + (shapeB.HBwidth / 2),
		hHeights = (player.HBheight / 2) + (shapeB.HBheight / 2);

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { // a tu nie powinno być OR ? //obecnie bierze pod uwagę oba równocześnie
		// figures out on which side we are colliding (top, bottom, left, or right)
		var oX = hWidths - Math.abs(vX),  //od czego to skróty oX //to jest dystans przesunięcia //oX i oY dodatnie
			oY = hHeights - Math.abs(vY);  //dziwne, co jeżeli tylko z jednej strony uderzy
		if (oX >= oY) {
			shapeB.fall();
			player.velY -= 20;
		}
		else {
				alive = false;  //umiera od prawej i lewej
		}
	}
}

function colCheck2(shapeA, shapeB) { //teraz będzie bullet + potworo loszka //shapeB - potworoloszka //shapeA - bullet
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

function colCheck3(shapeA, shapeB) { //shapeA - blok //shapeB - pocisk
	// get the vectors to check against  //bierze dwa kształty, jeden platforma, drugi gracz
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)), //tylko x i y się różnią  //może to lepiej zrozumieć //nawiasy dla ułatwienia czytania, drugi nawias jest ważny //width jest brane pod uwagę przy x //składowa wektoru x czyli jestesmy przy leweym końcu i dodajemy pół szerokości. potem odejmujemy środek szerokości kształtuB //czyli odległość pomiędzy nimi dwoma
		vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)), //dałoby się zmienić na player ale może nie warto
		// add the half widths and half heights of the objects //to jest dobrze opisane na jego stronie //analogicznie
		hWidths = (shapeA.width / 2) + (shapeB.width / 2), // minimalna odległość między dwoma
		hHeights = (shapeA.height / 2) + (shapeB.height / 2);

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { // a tu nie powinno być OR ? //obecnie bierze pod uwagę oba równocześnie
		// figures out on which side we are colliding (top, bottom, left, or right)
		return true; //jest kolizja
	}
	return false; //else jest niepotrzebne
} //taka generalna bardzo funkcja

function kill3(shapeB) { //zmieniamy na funkcję jednego argumentu //zabijanie //z hitboxami
	var vX = (player.HBx + (player.HBwidth / 2)) - (shapeB.HBx + (shapeB.HBwidth / 2)), 
		vY = (player.HBy + (player.HBheight / 2)) - (shapeB.HBy + (shapeB.HBheight / 2)),
		hWidths = (player.HBwidth / 2) + (shapeB.HBwidth / 2),
		hHeights = (player.HBheight / 2) + (shapeB.HBheight / 2);

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { //jeżeli ten if to wystąpiła kolizja
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("You died",70,150);
		alive = false;
	}
}