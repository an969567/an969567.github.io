function loadLevel7(){
	 boxes7 = [];

	 map[7] = {
		x: 0,
		y: 0,
		width: width + 800,
		height: height + 500,
		img: background7Img
	};
	boxes7.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map[7].height + 22 //żeby się stykało z dolną granicą
	});
	boxes7.push({ //dolna granica
		x: -10,
		y: map[7].height,
		width: map[7].width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes7.push({ //prawa granica
		x: map[7].width,
		y: -2,
		width: 10,
		height: map[7].height + 22
	});
	boxes7.push({ //górna granica
		x: 0,
		y: -2,
		width: map[7].width,
		height: 2
	});
	//wieża
	boxes7.push({
		x: map[7].width/2-200,
		y: map[7].height/2 + 200,
		width: 200,
		height: 4
	});
	boxes7.push({
		x: map[7].width/2+20,
		y: map[7].height/2 + 20,
		width: 200,
		height: 4
	});
	boxes7.push({
		x: map[7].width/2 + 360,
		y: map[7].height/2 - 80,
		width: 200,
		height: 4
	});
	boxes7.push({
		x: map[7].width/2 + 20,
		y: map[7].height/2 - 200,
		width: 200,
		height: 4
	});
	boxes7.push({
		x: map[7].width/2 - 210,
		y: 200,
		width: 200,
		height: 4
	});
	boxes7.push({ //pierwsza platfroma
		x: 70,
		y: map[7].height - 350,
		width: 80,
		height: 40
	});
	boxes7.push({
		x: map[7].width -230, //prawa platforma
		y: map[7].height - 450, //najwyższa
		width: 160,
		height: 40
	});
	boxes7.push({
		x: 220,
		y: map[7].height - 400,
		width: 80,
		height: 80
	});
	boxes7.push({ //cztery pudełka, ostatnie mniejsze
		x: 270,
		y: map[7].height - 120, //najniższa
		width: 100,
		height: 40
	}); //teraz jakieś pośrodku
	boxes7.push({
		x: 600,
		y: map[7].height - 250,
		width: 100,
		height: 40
	});
	 teleporter7 = {
		x: map[7].width/2 - 210,
		y: 0,
		width: 80,
		height: 200,
		img: teleporterImg
	};

	coins7 = [];

	coin = new Coin(); //w ukryciu
	coin.x = map[7].width - 50;
	coin.y = map[7].height - 60;
	coins7.push(coin);

	coin = new Coin();
	coin.x = map[7].width/2 - 200;
	coin.y = map[7].height - 60;
	coins7.push(coin);

	coin = new Coin();
	coin.x = map[7].width/2 + 200;
	coin.y = map[7].height - 60;
	coins7.push(coin);

	coin = new Coin();
	coin.x = map.width - 250;
	coin.y = map[7].height/2 - 140;
	coins7.push(coin)
}