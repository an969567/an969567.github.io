function loadSetup(){
	width = 1366;
	height = 584;
	keys = []; //wciśnięte klawisze
	friction = 0.9; //tym większe tym wolniej spowalnia (odwrotne niż w fizyce)
	gravity = 0.6;
	alive = true; //śmierć
	right = true; //do kierunków

	shooting = false;

	clamp = (n, lo, hi) => n < lo ? lo : n > hi ? hi : n;

	viewport = {};

	licznik = 0; //do strzelania
	spacePressed = false;

	level = 1; //zaczynamy od pierwszego

	boxes = []; //robimy pustą listę

	rozpocznij = 0;

	music.play();

	map.img = background1Img;

	// dimensions
	boxes.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map.height + 22 //żeby się stykało z dolną granicą
	});
	boxes.push({ //dolna granica
		x: -10,
		y: map.height,
		width: map.width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes.push({ //prawa granica
		x: map.width,
		y: -2,
		width: 10,
		height: map.height + 22
	});
	boxes.push({ //górna granica
		x: 0,
		y: -2,
		width: map.width,
		height: 2
	});

	boxes.push({ //pierwsza platfroma
		x: 70,
		y: map.height - 350,
		width: 80,
		height: 40
	});
	boxes.push({
		x: 220,
		y: map.height - 400,
		width: 80,
		height: 80
	});
	boxes.push({ //cztery pudełka, ostatnie mniejsze
		x: 270,
		y: map.height - 100,
		width: 100,
		height: 30
	}); //teraz jakieś pośrodku
	boxes.push({ //bezimienny obiekt
		x: 400,
		y: map.height - 250,
		width: 100,
		height: 40
	});
	teleporter = {
		x: map.width - 70 - 160,
		y: map.height - 200,
		width: 80,
		height: 200,
		img: teleporterImg
	};

	bullets = []; //na amunicję
}