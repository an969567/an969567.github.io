function loadLevel9(){
	 boxes9 = [];

	 map[9] = {
		x: 0,
		y: 0,
		width: width + 500,
		height: height + 500,
		img: background9Img
	};

	//na razie takie samo //ale warto to zmienić
	//tylko cztery granice
	boxes9.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map[9].height + 22 //żeby się stykało z dolną granicą
	});
	boxes9.push({ //dolna granica
		x: -10,
		y: map[9].height,
		width: map[9].width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes9.push({ //prawa granica
		x: map[9].width,
		y: -2,
		width: 10,
		height: map[9].height + 22
	});
	boxes9.push({ //górna granica
		x: 0,
		y: -2,
		width: map[9].width,
		height: 2
	});

	coins9 = [];

	coin = new Coin();
	coin.x = map[9].width/2 - 300;
	coin.y = map[9].height - 60;
	coins9.push(coin);

	coin = new Coin();
	coin.x = map[9].width/2 + 300;
	coin.y = map[9].height - 60;
	coins9.push(coin);

	coin = new Coin();
	coin.x = 10;
	coin.y = map[9].height - 60;
	coins9.push(coin);

	boss = {
		x: map[9].width - 500,
		y: map[9].height - 500,
		width: 500,
		height: 500,
		HBx: map[9].width - 500, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
		HBy: map[9].height - 500, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
		HBwidth: 500, //Hit Box
		HBheight: 500,
		img: wisielecImg,
		//ile zdrowia//ile hitów potrzebuje oberwać. może cztery
		HP: 4,
		alive: true
	};
	/*fireball1, fireball2, fireball3*/
	fireballs = [];

	fireball1 = new Fireball;
	fireball1.x = 700;
	fireball1.HBx = 700;
	fireballs.push(fireball1);

	fireball2 = new Fireball;
	fireball2.x = 1000;
	fireball2.HBx = 1000;
	fireballs.push(fireball2);

	fireball3 = new Fireball;
	fireball3.x = 1300;
	fireball3.HBx = 1300;
	fireballs.push(fireball3);
}

function Fireball() {
		this.baseX = boss.x + 100; //tam gdzie player się znajduje
		this.baseY = boss.y + 450; //potem to wykalibrujemy by leciało nie z lewego górnego rogu laseczki
		this.x = this.baseX;
		this.y = this.baseY;
		this.HBx = this.x; //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
		this.HBy = this.y;
		this.width = 40;
		this.height = 40;
		this.HBwidth = 40; //Hit Box
		this.HBheight = 40;
		this.direction = "left";
		this.img = fireballImg;
}