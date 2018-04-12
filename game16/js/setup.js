var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"), //ctx to teraz obiekt
	width = 1366,
	height = 584,
	keys = [], //wciśnięte klawisze
	friction = 0.95,
	gravity = 0.6,
	alive = true, //śmierć
	right = true; //do kierunków

var frameCount = 0;
var licznik = 0; //do strzelania
var keys2=[]; //do keypress
var spacePressed2 = false;

var level = 1; //zaczynamy od pierwszego

var boxes = []; //robimy pustą listę

var map = { //nowe ważne
	x: 0,
	y: 0,
	width: width + 500,
	height: height,
	img: "background1Img"
};

var basePlayer = {
	x: 100,
	y: map.height - 100
};

var player = {
	x: basePlayer.x, 
	y: basePlayer.y,
	width: 100,
	height: 150,
	speed: 10,
	velX: 0,
	velY: 0,
	jumping: false,
	grounded: false,
	direction: "right"
};

// dimensions
boxes.push({ //lewa grannica
	x: -10,
	y: -2, //żeby się stykało z górną granicą
	width: 10,
	height: map.height + 22 //żeby się stykało z dolną granicą
});
boxes.push({ //dolna granica
	x: -10,
	y: map.height,
	width: map.width + 20,
	height: 20 //grube, żeby nie znikał
});
boxes.push({ //prawa granica
	x: map.width,
	y: -2,
	width: 10,
	height: map.height + 22
});
boxes.push({ //górna granica
	x: 0,
	y: -2,
	width: map.width,
	height: 2
});

boxes.push({ //pierwsza platfroma
	x: 70,
	y: map.height - 350,
	width: 80,
	height: 40
});
boxes.push({
	x: 220,
	y: map.height - 330,
	width: 80,
	height: 80
});
boxes.push({ //cztery pudełka, ostatnie mniejsze
	x: 270,
	y: map.height - 80,
	width: 40,
	height: 40
}); //teraz jakieś pośrodku
boxes.push({ //bezimienny obiekt
	x: 400,
	y: map.height - 250,
	width: 100,
	height: 40
});
var teleporter = {
	x: map.width - 70 - 160,
	y: map.height - 200,
	width: 80,
	height: 200,
	img: "teleporterImg"
};

canvas.width = width;
canvas.height = height;

var bullets = []; //na amunicję
class Bullet {
	constructor() {
		this.baseX = player.x + player.width/2; //tam gdzie player się znajduje
		this.baseY = player.y + player.height/2; //potem to wykalibrujemy by leciało nie z lewego górnego rogu laseczki
		this.x = this.baseX;
		this.y = this.baseY;
		this.width = 20;
		this.height = 20; //chyba tyle //ewentualnie jeszcze speed //gdzieś musi być bullet.x++ ... //razem z każdym frejmem. a nie z wciśniętą spacją //jeszcze mają być niezliczone //ewentualnie można dać limit tych bulletów //ale co. strzelisz trzy i koniec? //tak samo z rysowaniem //gdzieś musi sprawdzać czy obiekt istnieje //bullet.push?
		this.direction = player.direction;
	}
}

//var spacePressed = false;