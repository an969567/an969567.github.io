function AssetManager() { //konstruktor //potem dodajemy już tylko metody //wszystkie properties są tutaj zdefiniowane //Czyli sam asset Manager nie bierze żadnych arguemntów
	this.successCount = 0; 
	this.cache = {};
	this.downloadQueue = [];
	this.resourceRoot=""; //co to
}

AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}

AssetManager.prototype.setRoot = function (res) { //res od resource
	this.resourceRoot=res; //może root plików
}

AssetManager.prototype.downloadAll = function() { //wysyła funkcję? //w sensie bierze jako argument funkcję
    for (var i = 0; i < this.downloadQueue.length; i++) { //wygląda znajomo
        var path = this.downloadQueue[i];
        var img = new Image();
        img.src = this.resourceRoot+"/"+path;
        this.cache[path] = img;
        var that = this;
        img.addEventListener("load", function() { //przywoływana ta funkcja przy udaniu //kurwa czemu to pomarańczowemu działa kurwa mać //może jakieś prototypy zrobił
            that.successCount += 1;
            //console.log(img); //może w momencie jak już wszystkie przeszły to tyle tylko zostaje
            //console.log(that.successCount);            
        }, false);
    }
}

AssetManager.prototype.getTotal = function() {
	return this.downloadQueue.length; //hmm ten minus jeden trochę dziwny //usuwamy go
}

AssetManager.prototype.getDone = function () {
	return (this.successCount); //zwraca liczbę
}

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length <= this.successCount); //zwraca fałsz jeżeli successCount + errorCount są mniejsze od długości kolejki
}


AssetManager.prototype.getAsset = function(path) {
    return this.cache[path]; //czy on operuje na pamięci cache przeglądarki? //nie raczej
}

//do działania przed uruchomieniem update(). Musi przywołać update.

var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");

width = 1366;
height = 584;

canvas.width = width;
canvas.height = height;

function drawRect(x, y, w, h, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, w, h);
}

function makeRGBA(r, g, b, a) {
	a=(1.0/255)*a;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

function drawLoadingBar() {
	ctx.fillStyle = "#ffff00";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	tx=100;
	ty=100;
	
	drawRect(tx-1,ty-1,202,32,makeRGBA(200,666,200,255));
	
	var total=myLoadManager.getTotal(); //to są dane do loading baru
	var currentDone=myLoadManager.getDone();
	var tz = (200.0/total /* to jest to */)*currentDone;
	drawRect(tx,ty, tz, 30 ,makeRGBA(200,200,400,255));
	console.log(tz);
}

function przypisz() {
	//idle1Img = myLoadManager.getAsset('Idle (1).png');
	jumpImg = myLoadManager.getAsset('Jump (2).png');
	fallImg = myLoadManager.getAsset('Jump (10).png');
	spikesImg = myLoadManager.getAsset('spikes.png');
	teleporterImg = myLoadManager.getAsset('teleporter.png');
	monsterImg = myLoadManager.getAsset('monster.png');
	monster2Img = myLoadManager.getAsset('monster2.png');
	bulletImg = myLoadManager.getAsset('bullet.png');
	loszkaImg = myLoadManager.getAsset('loszka.png');
	background1Img = myLoadManager.getAsset('background1.jpg');
	background2Img = myLoadManager.getAsset('background2.jpg');
	background3Img = myLoadManager.getAsset('background3.jpg');
	background4Img = myLoadManager.getAsset('background4.jpg');
	background5Img = myLoadManager.getAsset('background5.jpg');
	background6Img = myLoadManager.getAsset('background6.png');
	background7Img = myLoadManager.getAsset('background7.jpg');
	background8Img = myLoadManager.getAsset('background8.jpg');
	idleImg = [];
	for (var i=0; i<= 9; i++){
		idleImg[i] = myLoadManager.getAsset("Idle (" + (i + 1) + ").png");
	}
	runImg = [];
	for (var i=1; i<= 8; i++){
		runImg[i] = myLoadManager.getAsset("Run (" + i + ").png");
	}
	deadImg = [];
	for (var i=1; i<= 7; i++){
		deadImg[i] = myLoadManager.getAsset("Dead (" + i + ").png");
	}
	shootImg = [];
	for (var i=1; i<= 3; i++){
		shootImg[i] = myLoadManager.getAsset("Shoot (" + i + ").png");
	}
	fireballImg = myLoadManager.getAsset('fireball.png');
	speakerImg = myLoadManager.getAsset('speaker.png');
	coinImg = myLoadManager.getAsset('coin.png');
	muteImg = myLoadManager.getAsset('mute.png');
	/* tutaj wpiszemy*/
	loadSetup();
	loadLevel2();
	loadLevel3();
	loadLevel4();
	loadLevel5();
	loadLevel6();
	loadLevel7();
	loadLevel8();
	update();
}

var tylko_raz = 0; //globalne

function level0() {
	if(tylko_raz == 0){
		myLoadManager.downloadAll(); //aaa bo w pętli każemy mu pobierać
		tylko_raz++;
	}
	drawLoadingBar();
	if(!myLoadManager.isDone()/*tutaj warunek, że jeszcze się ładuje*/)window.requestAnimationFrame(level0); //ważne
	//czyli co, on dalej się robi w kółko chyba
	else /*przywołanie funkcji, która przypisze obiekty do menadżera*/ przypisz();
}

function Coin(){
	this.fall = function() { score++; this.y += 3000; coinSnd.play(); };
	this.img = coinImg;
	this.width = 40;
	this.height = 41;
}

keys = [];//wciśnięte klawisze