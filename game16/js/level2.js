var boxes2 = [];

var map2 = {
	x: 0,
	y: 0,
	width: width + 800,
	height: height,
	img: background2Img
};
boxes2.push({ //lewa grannica
	x: -10,
	y: -2, //żeby się stykało z górną granicą
	width: 10,
	height: map.height + 22 //żeby się stykało z dolną granicą
});
boxes2.push({ //dolna granica
	x: -10,
	y: map.height,
	width: map.width + 20,
	height: 20 //grube, żeby nie znikał
});
boxes2.push({ //prawa granica
	x: map.width,
	y: -2,
	width: 10,
	height: map.height + 22
});
boxes2.push({ //górna granica
	x: 0,
	y: -2,
	width: map.width,
	height: 2
});
//wieża
boxes2.push({
	x: map2.width/2-200,
	y: map2.height/2,
	width: 200,
	height: map2.height/2
});

boxes2.push({ //pierwsza platfroma
	x: 70,
	y: map2.height - 350,
	width: 80,
	height: 40
});
boxes2.push({
	x: map2.width -230, //prawa platforma
	y: map2.height - 450, //najwyższa
	width: 160,
	height: 40
});
boxes2.push({
	x: 220,
	y: map2.height - 400,
	width: 80,
	height: 80
});
boxes2.push({ //cztery pudełka, ostatnie mniejsze
	x: 270,
	y: map2.height - 120, //najniższa
	width: 100,
	height: 40
}); //teraz jakieś pośrodku
boxes2.push({
	x: 600,
	y: map2.height - 250,
	width: 100,
	height: 40
});
var spikes = {
	x: map2.width - 800, //prawa platforma //kolce
	y: map2.height - 40,
	width: 160,
	height: 40,
	HBx: map2.width - 770, //chcemy, żeby zaczynał rysować się później. Czyli HBx musi być większy. Czyli odejmowanie mniejsze.
	HBy: map2.height - 25, //chcemy, żeby zaczynał rysować się później. Czyli HBy musi być większy. Czyli odejmowanie mniejsze.
	HBwidth: 90, //Hit Box
	HBheight: 25,
	img: spikesImg
};
var teleporter2 = {
	x: map2.width - 400,
	y: map2.height - 200,
	width: 80,
	height: 200,
	img: teleporterImg
};