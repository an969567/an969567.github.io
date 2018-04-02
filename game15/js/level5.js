var boxes5 = [];

var map5 = {
	width: width + 500,
	height: height
};

//na razie takie samo //ale warto to zmienić
//tylko cztery granice
boxes5.push({ //lewa grannica
	x: 0,
	y: 0,
	width: 10,
	height: map2.height
});
boxes5.push({ //dolna granica
	x: 0,
	y: map2.height,
	width: map2.width,
	height: 20 //grube, żeby nie znikał
});
boxes5.push({ //prawa granica
	x: map2.width, //robimy mapę o 100 pixeli większą od canvasu
	y: 0,
	width: 10,
	height: map2.height
});
boxes5.push({ //górna granica
	x: 0,
	y: 0,
	width: map2.width,
	height: 2
});
var teleporter5 = {
	x: map.width - 70 - 160,
	y: map.height - 200,
	width: 80,
	height: 200
};
var monster3 = {
	x: map.width*0.5-100,
	y: map.height - 50,
	width: 40,
	height: 50,
	minX: map.width*0.5-200,
	maxX: map.width*0.5,
	direction: "right",
	fall: function (){this.y+=200}
};