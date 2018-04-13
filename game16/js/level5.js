var boxes5 = [];

var map5 = {
	x: 0,
	y: 0,
	width: width + 500,
	height: height,
	img: background5Img
};

//na razie takie samo //ale warto to zmienić
//tylko cztery granice
boxes5.push({ //lewa grannica
	x: -10,
	y: -2, //żeby się stykało z górną granicą
	width: 10,
	height: map5.height + 22 //żeby się stykało z dolną granicą
});
boxes5.push({ //dolna granica
	x: -10,
	y: map5.height,
	width: map5.width + 20,
	height: 20 //grube, żeby nie znikał
});
boxes5.push({ //prawa granica
	x: map5.width,
	y: -2,
	width: 10,
	height: map5.height + 22
});
boxes5.push({ //górna granica
	x: 0,
	y: -2,
	width: map5.width,
	height: 2
});
var teleporter5 = {
	x: map5.width - 70 - 160,
	y: map5.height - 200,
	width: 80,
	height: 200
};
var monster3 = {
	x: map5.width*0.5-100,
	y: map5.height - 100,
	width: 90,
	height: 100,
	minX: map5.width*0.5-200,
	maxX: map5.width*0.5,
	direction: "right",
	fall: function (){this.y+=500; this.HBy+=500; },
	img: monster2Img, //to nie jest błąd
	HBx: map4.width*0.5-70, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
	HBy: map4.height - 100, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
	HBwidth: 35, //Hit Box
	HBheight: 100
};