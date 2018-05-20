function loadLevel6(){
	 boxes6 = [];

	 map[6] = {
		x: 0,
		y: 0,
		width: width + 500,
		height: height + 500,
		img: background6Img
	};

	//na razie takie samo //ale warto to zmienić
	//tylko cztery granice
	boxes6.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map[6].height + 22 //żeby się stykało z dolną granicą
	});
	boxes6.push({ //dolna granica
		x: -10,
		y: map[6].height,
		width: map[6].width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes6.push({ //prawa granica
		x: map[6].width,
		y: -2,
		width: 10,
		height: map[6].height + 22
	});
	boxes6.push({ //górna granica
		x: 0,
		y: -2,
		width: map[6].width,
		height: 2
	});
	 teleporter6 = {
		x: map[6].width - 230,
		y: map[6].height - 200,
		width: 80,
		height: 200
	};
	 loszka = {
		x: map[6].width*0.5-100,
		y: map[6].height - 150,
		width: 40,
		height: 150,
		fall: function (){this.y+=500; this.HBy+=500; score += 40;},
		img: loszkaImg,
		HBx: map[6].width*0.5-71, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
		HBy: map[6].height - 140, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
		HBwidth: 1, //Hit Box
		HBheight: 140
	};

	coins6 = [];

	coin = new Coin();
	coin.x = map[6].width/2 - 400;
	coin.y = map[6].height - 60;
	coins6.push(coin);

	coin = new Coin();
	coin.x = map[6].width/2 + 200;
	coin.y = map[6].height - 60;
	coins6.push(coin);
}