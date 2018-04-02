var boxes4 = [];

var map4 = {
	width: width + 500,
	height: height
};

//na razie takie samo //ale warto to zmienić
//tylko cztery granice
boxes4.push({ //lewa grannica
	x: 0,
	y: 0,
	width: 10,
	height: map2.height
});
boxes4.push({ //dolna granica
	x: 0,
	y: map2.height,
	width: map2.width,
	height: 20 //grube, żeby nie znikał
});
boxes4.push({ //prawa granica
	x: map2.width, //robimy mapę o 100 pixeli większą od canvasu
	y: 0,
	width: 10,
	height: map2.height
});
boxes4.push({ //górna granica
	x: 0,
	y: 0,
	width: map2.width,
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
	y: map.height - 50,
	width: 40,
	height: 50,
	fall: function (){this.y+=200}
};