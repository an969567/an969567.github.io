function loadLevel6(){
	 boxes6 = [];

	 map6 = {
		x: 0,
		y: 0,
		width: width + 500,
		height: height + 500,
		img: background6Img //jak byśmy zostawili bez cudzysłowów to by może działało. Obiekt jako property obiektu. Tylko potem musiała by być funkcja myDraw() bez eval.
	};

	//na razie takie samo //ale warto to zmienić
	//tylko cztery granice
	boxes6.push({ //lewa grannica
		x: -10,
		y: -2, //żeby się stykało z górną granicą
		width: 10,
		height: map6.height + 22 //żeby się stykało z dolną granicą
	});
	boxes6.push({ //dolna granica
		x: -10,
		y: map6.height,
		width: map6.width + 20,
		height: 20 //grube, żeby nie znikał
	});
	boxes6.push({ //prawa granica
		x: map6.width,
		y: -2,
		width: 10,
		height: map6.height + 22
	});
	boxes6.push({ //górna granica
		x: 0,
		y: -2,
		width: map6.width,
		height: 2
	});
	 teleporter6 = {
		x: map6.width - 230,
		y: map6.height - 200,
		width: 80,
		height: 200
	};
	 loszka = {  //upioroloszka
		x: map6.width*0.5-100,
		y: map6.height - 150,
		width: 40,
		height: 150,
		//minX: map.width*0.5-200,
		//maxX: map.width*0.5,
		//direction: "right",
		fall: function (){this.y+=500; this.HBy+=500;},
		img: loszkaImg,
		HBx: map6.width*0.5-71, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
		HBy: map6.height - 140, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
		HBwidth: 1, //Hit Box
		HBheight: 140
	};
}