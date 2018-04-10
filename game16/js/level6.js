var boxes6 = [];

var map6 = {
	width: width + 500,
	height: height
};

//na razie takie samo //ale warto to zmienić
//tylko cztery granice
boxes6.push({ //lewa grannica
	x: -10,
	y: -2, //żeby się stykało z górną granicą
	width: 10,
	height: map.height + 22 //żeby się stykało z dolną granicą
});
boxes6.push({ //dolna granica
	x: -10,
	y: map.height,
	width: map.width + 20,
	height: 20 //grube, żeby nie znikał
});
boxes6.push({ //prawa granica
	x: map.width,
	y: -2,
	width: 10,
	height: map.height + 22
});
boxes6.push({ //górna granica
	x: 0,
	y: -2,
	width: map.width,
	height: 2
});
var teleporter6 = {
	x: map.width - 70 - 160,
	y: map.height - 200,
	width: 80,
	height: 200
};
var loszka = {  //upioroloszka
	x: map.width*0.5-100,
	y: map.height - 120,
	width: 70,
	height: 120,
	//minX: map.width*0.5-200,
	//maxX: map.width*0.5,
	//direction: "right",
	fall: function (){this.y+=500}
};