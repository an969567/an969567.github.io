function loadLevel3(){
	 boxes3 = [];

	 map[3] = {
		x: 0,
		y: 0,
		width: width + 500,
		height: height + 500,
		img: background3Img
	};

	//na razie takie samo //ale warto to zmienić
	//tylko cztery granice
	boxes3.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map[3].height + 22 //żeby się stykało z dolną granicą
	});
	boxes3.push({ //dolna granica
		x: -10,
		y: map[3].height,
		width: map[3].width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes3.push({ //prawa granica
		x: map[3].width,
		y: -2,
		width: 10,
		height: map[3].height + 22
	});
	boxes3.push({ //górna granica
		x: 0,
		y: -2,
		width: map[3].width,
		height: 2
	});
	 teleporter3 = {
		x: map[3].width - 70 - 160, //prawa platforma //ważniejsza, będzie teleporterem
		y: map[3].height - 200,
		width: 80,
		height: 200
	};
	 monster = {
		x: map[3].width*0.5-100,
		y: map[3].height - 90,
		width: 100,
		height: 90,
		minX: map[3].width*0.5-200,
		maxX: map[3].width*0.5,
		direction: "right",
		HBx: map[3].width*0.5-60, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
		HBy: map[3].height - 50, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
		HBwidth: 22, //Hit Box
		HBheight: 50,
		img: monsterImg
		//speed
	};

	coins3 = [];

	coin = new Coin();
	coin.x = map[3].width/2 - 300;
	coin.y = map[3].height - 60;
	coins3.push(coin);

	coin = new Coin();
	coin.x = map[3].width/2 + 300;
	coin.y = map[3].height - 60;
	coins3.push(coin);

	coin = new Coin();
	coin.x = 10;
	coin.y = map[3].height - 60;
	coins3.push(coin);
}