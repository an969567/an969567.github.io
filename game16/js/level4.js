function loadLevel4(){
	 boxes4 = [];

	 map[4] = {
		x: 0,
		y: 0,
		width: width + 500,
		height: height + 500,
		img: background4Img
	};

	//na razie takie samo //ale warto to zmienić
	//tylko cztery granice
	boxes4.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map[4].height + 22 //żeby się stykało z dolną granicą
	});
	boxes4.push({ //dolna granica
		x: -10,
		y: map[4].height,
		width: map[4].width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes4.push({ //prawa granica
		x: map[4].width,
		y: -2,
		width: 10,
		height: map[4].height + 22
	});
	boxes4.push({ //górna granica
		x: 0,
		y: -2,
		width: map[4].width,
		height: 2
	});
	 teleporter4 = {
		x: map[4].width - 70 - 160,
		y: map[4].height - 200,
		width: 80,
		height: 200
	};
	 monster2 = {
		x: map[4].width*0.5-100,
		y: map[4].height - 100,
		width: 90,
		height: 100,
		fall: function (){this.y+=500; this.HBy+=500; score+=20;},
		img: monster2Img,
		HBx: map[4].width*0.5-70, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
		HBy: map[4].height - 100, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
		HBwidth: 30, //Hit Box
		HBheight: 100
	};

	coins4 = [];

	coin = new Coin();
	coin.x = 10;
	coin.y = map[4].height - 60;
	coins4.push(coin);

	coin = new Coin();
	coin.x = map[4].width/2 - 80;
	coin.y = map[4].height - 150;
	coins4.push(coin);
}