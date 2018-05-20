function loadLevel5(){
	 boxes5 = [];

	 map[5] = {
		x: 0,
		y: 0,
		width: width + 500,
		height: height + 500,
		img: background5Img
	};

	//na razie takie samo //ale warto to zmienić
	//tylko cztery granice
	boxes5.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map[5].height + 22 //żeby się stykało z dolną granicą
	});
	boxes5.push({ //dolna granica
		x: -10,
		y: map[5].height,
		width: map[5].width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes5.push({ //prawa granica
		x: map[5].width,
		y: -2,
		width: 10,
		height: map[5].height + 22
	});
	boxes5.push({ //górna granica
		x: 0,
		y: -2,
		width: map[5].width,
		height: 2
	});
	 teleporter5 = {
		x: map[5].width - 70 - 160,
		y: map[5].height - 200,
		width: 80,
		height: 200
	};
	 monster3 = {
		x: map[5].width*0.5-100,
		y: map[5].height - 100,
		width: 90,
		height: 100,
		minX: map[5].width*0.5-200,
		maxX: map[5].width*0.5,
		direction: "right",
		fall: function (){this.y+=500; this.HBy+=500; score+= 30;},
		img: monster2Img, //to nie jest błąd
		HBx: map[5].width*0.5-70, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
		HBy: map[5].height - 100, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
		HBwidth: 35, //Hit Box
		HBheight: 100
	};

	coins5 = [];

	coin = new Coin();
	coin.x = map[5].width/2 - 300;
	coin.y = map[5].height - 60;
	coins5.push(coin);

	coin = new Coin();
	coin.x = map[5].width/2 + 300;
	coin.y = map[5].height - 60;
	coins5.push(coin);

	coin = new Coin();
	coin.x = 10;
	coin.y = map[5].height - 60;
	coins5.push(coin);
}