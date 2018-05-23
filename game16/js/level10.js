function loadLevel10() {
	boxes10 = [];

	map[10] = {
		x: 0,
		y: 0,
		width: width + 800,
		height: height + 500,
		img: background10Img
	};
	boxes10.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map[10].height + 22 //żeby się stykało z dolną granicą
	});
	boxes10.push({ //dolna granica
		x: -10,
		y: map[10].height,
		width: map[10].width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes10.push({ //prawa granica
		x: map[10].width,
		y: -2,
		width: 10,
		height: map[10].height + 22
	});
	boxes10.push({ //górna granica
		x: 0,
		y: -2,
		width: map[10].width,
		height: 2
	});
	//wieża
	boxes10.push({
		x: 300,
		y: map[10].height-300,
		width: 300,
		height: 300
	});
	//druga wieża
	boxes10.push({
		x: 1300,
		y: map[10].height-300,
		width: 300,
		height: 300
	});
	spikes3 = {
		x: 630,//map[10].width - 800,
		y: map[10].height - 40,
		width: 160,
		height: 40,
		HBx: 660, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy //o 30 później.
		HBy: map[10].height - 25, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
		HBwidth: 90, //Hit Box
		HBheight: 25,
		img: spikesImg
	};
	spikes4 = {
		x: 830,//map[10].width - 800,
		y: map[10].height - 40,
		width: 160,
		height: 40,
		HBx: 860, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy //o 30 później.
		HBy: map[10].height - 25, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
		HBwidth: 90, //Hit Box
		HBheight: 25,
		img: spikesImg
	};

	teleporter10 = {
		x: map[10].width - 400,
		y: map[10].height - 600, //chcemy, żeby był wyżej. Czyli y musi być mniejszy. Czyli odejmowanie musi być większe.
		width: 80,
		height: 200,
		img: teleporterImg
	};

	coins10 = [];

	coin = new Coin();
	coin.x = map[10].width/2 - 660;
	coin.y = map[10].height - 400;
	coins10.push(coin);

	coin = new Coin();
	coin.x = map[10].width/2;
	coin.y = map[10].height - 400;
	coins10.push(coin);

	coin = new Coin();
	coin.x = map[10].width - 280;
	coin.y = map[10].height - 450;
	coins10.push(coin)
}