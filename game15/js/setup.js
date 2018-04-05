//wersja 10 zmienione spacje na tabsy
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"), //czy ctx to teraz obiekt? //chyba tak
	width = 1500,
	height = 800,
	keys = [], //? wciśnięte klawisze chyba
	friction = 0.95,
	gravity = 0.1,
	alive = true, //śmierć
	right = true; //do kierunków

var frameCount = 0;
var licznik = 0; //do strzelania
var keys2=[]; //do keypress
var spacePressed2 = false;

var level = 1; //zaczynamy od pierwszego

//potem zrobimy assets.js

var boxes = []; //robimy pustą listę

var map = { //nowe ważne
	width: width + 500,
	height: height
};

var basePlayer = {
	x: 100,
	y: map.height - 100
};

var player = {
	x: basePlayer.x, 
	y: basePlayer.y,  //potem ustawimy, że bardziej z lewego brzegu
	width: 50,
	height: 50,
	speed: 3,
	velX: 0,
	velY: 0,
	jumping: false,
	grounded: false,
	direction: "right"
};

// dimensions
boxes.push({ //lewa grannica
	x: 0,
	y: 0,
	width: 10,
	height: map.height
});
boxes.push({ //dolna granica
	x: 0,
	y: map.height - 2,
	width: map.width,
	height: 20 //grube, żeby nie znikał
});
boxes.push({ //prawa granica
	x: map.width, //robimy mapę o 100 pixeli większą od canvasu
	y: 0,
	width: 10,
	height: map.height
});
boxes.push({ //górna granica
	x: 0,
	y: 0,
	width: map.width,
	height: 2
});

boxes.push({ //pushujemy obiekt który składa się z współrzędnych i wielkości
	x: 70,   //pierwsza platfroma
	y: map.height - 150,
	width: 80,
	height: 40
});
boxes.push({
	x: 220,
	y: map.height - 130,
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
var teleporter = { //podoba mi się ten design, oryginalny
	x: map.width - 70 - 160, //prawa platforma //ważniejsza, będzie teleporterem
	y: map.height - 200,
	width: 80,
	height: 200
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
		this.width = 10;
		this.height = 10; //chyba tyle //ewentualnie jeszcze speed //gdzieś musi być bullet.x++ ... //razem z każdym frejmem. a nie z wciśniętą spacją //jeszcze mają być niezliczone //ewentualnie można dać limit tych bulletów //ale co. strzelisz trzy i koniec? //tak samo z rysowaniem //gdzieś musi sprawdzać czy obiekt istnieje //bullet.push?
		this.direction = player.direction;
	}
}

//var spacePressed = false;