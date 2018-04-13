var boxes3 = [];

var map3 = {
	x: 0,
	y: 0,
	width: width + 500,
	height: height,
	img: background3Img
};

//na razie takie samo //ale warto to zmienić
//tylko cztery granice
boxes3.push({ //lewa grannica
	x: -10,
	y: -2, //żeby się stykało z górną granicą
	width: 10,
	height: map3.height + 22 //żeby się stykało z dolną granicą
});
boxes3.push({ //dolna granica
	x: -10,
	y: map3.height,
	width: map3.width + 20,
	height: 20 //grube, żeby nie znikał
});
boxes3.push({ //prawa granica
	x: map3.width,
	y: -2,
	width: 10,
	height: map3.height + 22
});
boxes3.push({ //górna granica
	x: 0,
	y: -2,
	width: map3.width,
	height: 2
});
var teleporter3 = {
	x: map3.width - 70 - 160, //prawa platforma //ważniejsza, będzie teleporterem
	y: map3.height - 200,
	width: 80,
	height: 200
};
var monster = {
	x: map3.width*0.5-100,
	y: map3.height - 90,
	width: 100,
	height: 90,
	minX: map3.width*0.5-200,
	maxX: map3.width*0.5,
	direction: "right",
	HBx: map3.width*0.5-60, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
	HBy: map3.height - 50, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
	HBwidth: 22, //Hit Box
	HBheight: 50,
	img: monsterImg
	//speed
};