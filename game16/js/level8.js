function loadLevel8() {
	boxes8 = [];

	map8 = {
		x: 0,
		y: 0,
		width: width + 800,
		height: height + 500,
		img: background8Img
	};
	boxes8.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map8.height + 22 //żeby się stykało z dolną granicą
	});
	boxes8.push({ //dolna granica
		x: -10,
		y: map8.height,
		width: map8.width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes8.push({ //prawa granica
		x: map8.width,
		y: -2,
		width: 10,
		height: map8.height + 22
	});
	boxes8.push({ //górna granica
		x: 0,
		y: -2,
		width: map8.width,
		height: 2
	});
	//wieża
	boxes8.push({
		x: 300,
		y: map8.height-150,
		width: 300,
		height: 150
	});
	//druga wieża
	boxes8.push({
		x: 800,
		y: map8.height-150,
		width: 300,
		height: 150
	});
	//platforma1
	boxes8.push({
		x: 1100,
		y: map8.height - 300, //chcemy, żeby była niżej. Czyli y większy. Czyli minusowanie mniejsze.
		width: 120,
		height: 20
	});
	//platforma2
	boxes8.push({
		x: 1550,
		y: map8.height - 370, //chcemy, żeby była wyżej. Czyli y mniejszy. Czyli minusowanie większe.
		width: 120,
		height: 20
	});
	spikes2 = {
		x: 630,//map8.width - 800,
		y: map8.height - 40,
		width: 160,
		height: 40,
		HBx: 660, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy //o 30 później.
		HBy: map8.height - 25, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
		HBwidth: 90, //Hit Box
		HBheight: 25,
		img: spikesImg
	};

	teleporter8 = {
		x: map8.width - 400,
		y: map8.height - 600, //chcemy, żeby był wyżej. Czyli y musi być mniejszy. Czyli odejmowanie musi być większe.
		width: 80,
		height: 200,
		img: teleporterImg
	};

	fireball = {
		x: 1200,//map8.width - 800,
		y: map8.height - 300, //chcemy, żeby był wyżej, więc y musi byc mniejszy, czyli odejmujemy więcej.
		width: 40,
		height: 40,
		HBx: 1190, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy //o 30 później.
		HBy: map8.height - 290, //chcemy, żeby zaczynał rysować się niżej. Czyli Yhb musi być 
		HBwidth: 30, //Hit Box
		HBheight: 30,
		direction: "right", //or "right"
		minX: 1000, //i tak będzie poruszać się po ukosie
		maxX: 1400,
		img: fireballImg
	};

	coins8 = [];

	coin = new Coin();
	coin.x = map8.width/2 - 660;
	coin.y = map8.height - 200;
	coins8.push(coin);

	coin = new Coin();
	coin.x = map8.width/2 - 160;
	coin.y = map8.height - 200;
	coins8.push(coin);

	coin = new Coin();
	coin.x = map.width - 280;
	coin.y = map8.height - 450;
	coins8.push(coin)
}