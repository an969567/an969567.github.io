function loadLevel2() {
	boxes2 = [];

	map[2] = {
		x: 0,
		y: 0,
		width: width + 800,
		height: height + 500,
		img: background2Img
	};
	boxes2.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map[2].height + 22 //żeby się stykało z dolną granicą
	});
	boxes2.push({ //dolna granica
		x: -10,
		y: map[2].height,
		width: map[2].width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes2.push({ //prawa granica
		x: map[2].width,
		y: -2,
		width: 10,
		height: map[2].height + 22
	});
	boxes2.push({ //górna granica
		x: 0,
		y: -2,
		width: map[2].width,
		height: 2
	});
	//wieża
	boxes2.push({
		x: map[2].width/2-200,
		y: map[2].height/2+300,
		width: 200,
		height: map[2].height/2 -300
	});

	boxes2.push({ //pierwsza platfroma
		x: 70,
		y: map[2].height - 350,
		width: 80,
		height: 40
	});
	boxes2.push({
		x: map[2].width -230, //prawa platforma
		y: map[2].height - 450, //najwyższa
		width: 160,
		height: 40
	});
	boxes2.push({
		x: 220,
		y: map[2].height - 400,
		width: 80,
		height: 80
	});
	boxes2.push({ //cztery pudełka, ostatnie mniejsze
		x: 270,
		y: map[2].height - 120, //najniższa
		width: 100,
		height: 40
	}); //teraz jakieś pośrodku
	boxes2.push({
		x: 600,
		y: map[2].height - 250,
		width: 100,
		height: 40
	});
	spikes = {
		x: map[2].width - 800, //prawa platforma //kolce
		y: map[2].height - 40,
		width: 160,
		height: 40,
		HBx: map[2].width - 770, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
		HBy: map[2].height - 25, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
		HBwidth: 90, //Hit Box
		HBheight: 25,
		img: spikesImg
	};
	teleporter2 = {
		x: map[2].width - 400,
		y: map[2].height - 200,
		width: 80,
		height: 200,
		img: teleporterImg
	};

	coins2 = [];

	coin = new Coin();
	coin.x = map[2].width/2 - 250;
	coin.y = map[2].height - 60;
	coins2.push(coin);

	coin = new Coin();
	coin.x = map[2].width/2 + 200;
	coin.y = map[2].height - 60;
	coins2.push(coin);

	coin = new Coin();
	coin.x = 92;
	coin.y = map[2].height/2 + 130;
	coins2.push(coin);

	coin = new Coin();
	coin.x = map[2].width - 480;
	coin.y = map[2].height - 60;
	coins2.push(coin);
}