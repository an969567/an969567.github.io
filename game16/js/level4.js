var boxes4 = [];

var map4 = {
	width: width + 500,
	height: height
};

//na razie takie samo //ale warto to zmienić
//tylko cztery granice
boxes4.push({ //lewa grannica
	x: -10,
	y: -2, //żeby się stykało z górną granicą
	width: 10,
	height: map.height + 22 //żeby się stykało z dolną granicą
});
boxes4.push({ //dolna granica
	x: -10,
	y: map.height,
	width: map.width + 20,
	height: 20 //grube, żeby nie znikał
});
boxes4.push({ //prawa granica
	x: map.width,
	y: -2,
	width: 10,
	height: map.height + 22
});
boxes4.push({ //górna granica
	x: 0,
	y: -2,
	width: map.width,
	height: 2
});
var teleporter4 = {
	x: map.width - 70 - 160,
	y: map.height - 200,
	width: 80,
	height: 200
};
var monster2 = {
	x: map.width*0.5-100,
	y: map.height - 100,
	width: 90,
	height: 100,
	fall: function (){this.y+=500}
};