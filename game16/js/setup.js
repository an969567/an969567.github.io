function loadSetup(){

	viewport = {};

	clamp = (n, lo, hi) => n < lo ? lo : n > hi ? hi : n;

	map = [];

	map[1] = { //nowe ważne
		x: 0,
		y: 0,
		width: width + 500,
		height: height + 500,
		img: background1Img
	};

	basePlayer = {
		x: 100,
		y: map[1].height - 180
	};

	player = {
		x: basePlayer.x, 
		y: basePlayer.y,
		width: 150,
		height: 180,
		speed: 10,
		velX: 0,
		velY: 0,
		inAir: true, //zaczyna inAir,
		direction: "right",
		HBx: basePlayer.x + 35, //dziwna niespójność //zmieniamy z 35 na 10, żeby było tak jak przy teleporcie. //35 oznacza, że rysowany jest później, czyli uderzanie bloku z prawej strony to... Ech, ciężko wydedukować. //Oznacza, to że... wystaje bardziej z prawej strony. Czyli niby powinien być odstęp większy przy uderzaniu z prawej strony. Zgadza się. Zmieniamy z powrotem na 35 i w innych miejscach też dajemy 35.
		HBy: basePlayer.y + 10,
		HBwidth: 65,
		HBheight: 158
	};

	frameCount = 0;

	HP = 100;

	//keys = [];//wciśnięte klawisze

	friction = 0.9; //tym większe tym wolniej spowalnia (odwrotne niż w fizyce)
	gravity = 0.6;
	alive = true; //śmierć

	shooting = false;

	licznik = 0; //do strzelania

	level = 1; //zaczynamy od pierwszego

	rozpocznij = 0; //animacja dead

	score = 0;

	boxes = []; //robimy pustą listę

	boxes.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map[1].height + 22 //żeby się stykało z dolną granicą
	});
	boxes.push({ //dolna granica
		x: -10,
		y: map[1].height,
		width: map[1].width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes.push({ //prawa granica
		x: map[1].width,
		y: -2,
		width: 10,
		height: map[1].height + 22
	});
	boxes.push({ //górna granica
		x: 0,
		y: -2,
		width: map[1].width,
		height: 2
	});

	boxes.push({ //pierwsza platfroma
		x: 70,
		y: map[1].height - 350,
		width: 80,
		height: 40
	});
	boxes.push({
		x: 220,
		y: map[1].height - 400,
		width: 80,
		height: 80
	});
	boxes.push({ //cztery pudełka, ostatnie mniejsze
		x: 270,
		y: map[1].height - 100,
		width: 100,
		height: 30
	}); //teraz jakieś pośrodku
	boxes.push({ //bezimienny obiekt
		x: 400,
		y: map[1].height - 250,
		width: 100,
		height: 40
	});
	teleporter = {
		x: map[1].width - 70 - 160,
		y: map[1].height - 200,
		width: 80,
		height: 200,
		img: teleporterImg
	};

	bullets = []; //na amunicję

	speaker = {
		x: canvas.width - 90, //canvas.width = 1366
		y: 20,
		width: 60,
		height: 45,
		img: speakerImg
	};

	coins = [];

	coin = new Coin();
	coin.x = map[1].width/2 - 200;
	coin.y = map[1].height - 60;
	coins.push(coin); //oby nazwa była tracona

	coin = new Coin();
	coin.x = map[1].width/2 + 200;
	coin.y = map[1].height - 60;
	coins.push(coin);

	coin = new Coin();
	coin.x = 92;
	coin.y = map[1].height/2 + 130;
	coins.push(coin);

	mute = {
		x: canvas.width - 90, //canvas.width = 1366
		y: 20,
		width: 60,
		height: 45,
		img: muteImg
	};

}