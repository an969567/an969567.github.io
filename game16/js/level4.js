var boxes4 = [];

var map4 = {
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
	height: map4.height + 22 //żeby się stykało z dolną granicą
});
boxes4.push({ //dolna granica
	x: -10,
	y: map4.height,
	width: map4.width + 20,
	height: 20 //grube, żeby nie znikał
});
boxes4.push({ //prawa granica
	x: map4.width,
	y: -2,
	width: 10,
	height: map4.height + 22
});
boxes4.push({ //górna granica
	x: 0,
	y: -2,
	width: map4.width,
	height: 2
});
var teleporter4 = {
	x: map4.width - 70 - 160,
	y: map4.height - 200,
	width: 80,
	height: 200
};
var monster2 = {
	x: map4.width*0.5-100,
	y: map4.height - 100,
	width: 90,
	height: 100,
	fall: function (){this.y+=500; this.HBy+=500;},
	img: monster2Img,
	HBx: map4.width*0.5-70, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
	HBy: map4.height - 100, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
	HBwidth: 30, //Hit Box
	HBheight: 100
};