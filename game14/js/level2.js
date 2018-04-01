var boxes2 = [];

var map2 = {
	width: width + 500,
	height: height
};

//na razie takie samo //ale warto to zmienić
boxes2.push({ //lewa grannica
	x: 0,
	y: 0,
	width: 10,
	height: map2.height
});
boxes2.push({ //dolna granica
	x: 0,
	y: map2.height - 2,
	width: map2.width/2 -200,
	height: 20 //grube, żeby nie znikał
});
boxes2.push({ //dolna granica
	x: map2.width/2,
	y: map2.height - 2,
	width: map2.width/2,
	height: 20 //grube, żeby nie znikał
});
//wieża
boxes2.push({ //dolna granica
	x: map2.width/2-200,
	y: map2.height/2,
	width: 200,
	height: map2.height/2 //grube, żeby nie znikał
});
boxes2.push({ //prawa granica
	x: map2.width, //robimy mapę o 100 pixeli większą od canvasu
	y: 0,
	width: 10,
	height: map2.height
});
boxes2.push({ //górna granica
	x: 0,
	y: 0,
	width: map2.width,
	height: 2
});

boxes2.push({ //pushujemy obiekt który składa się z współrzędnych i wielkości
	x: 70,   //pierwsza platfroma
	y: map2.height - 150,
	width: 80,
	height: 40
});
boxes2.push({ //podoba mi się ten design, oryginalny
	x: map2.width - 70 - 160, //prawa platforma
	y: map2.height - 450,
	width: 160,
	height: 40
});
boxes2.push({
	x: 220,
	y: map2.height - 130,
	width: 80,
	height: 80
});
boxes2.push({ //cztery pudełka, ostatnie mniejsze
	x: 270,
	y: map2.height - 80,
	width: 40,
	height: 40
}); //teraz jakieś pośrodku
boxes2.push({
	x: 400,
	y: map2.height - 250,
	width: 100,
	height: 40
});
var spikes = {
	x: map2.width - 800, //prawa platforma //kolce
	y: map2.height - 40,
	width: 160,
	height: 40
};
var teleporter2 = {
	x: map.width - 70 - 160, //prawa platforma //ważniejsza, będzie teleporterem
	y: map.height - 200,
	width: 80,
	height: 200
};