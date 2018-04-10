var boxes3 = [];

var map3 = {
	width: width + 500,
	height: height
};

//na razie takie samo //ale warto to zmienić
//tylko cztery granice
boxes3.push({ //lewa grannica
	x: -10,
	y: -2, //żeby się stykało z górną granicą
	width: 10,
	height: map.height + 22 //żeby się stykało z dolną granicą
});
boxes3.push({ //dolna granica
	x: -10,
	y: map.height,
	width: map.width + 20,
	height: 20 //grube, żeby nie znikał
});
boxes3.push({ //prawa granica
	x: map.width,
	y: -2,
	width: 10,
	height: map.height + 22
});
boxes3.push({ //górna granica
	x: 0,
	y: -2,
	width: map.width,
	height: 2
});
var teleporter3 = {
	x: map.width - 70 - 160, //prawa platforma //ważniejsza, będzie teleporterem
	y: map.height - 200,
	width: 80,
	height: 200
};
var monster = {
	x: map.width*0.5-100,
	y: map.height - 90,
	width: 100,
	height: 90,
	minX: map.width*0.5-200,
	maxX: map.width*0.5,
	direction: "right",
	HBx: map.width*0.5-60, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
	HBy: map.height - 50, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
	HBwidth: 80, //Hit Box
	HBheight: 50
	//speed
};