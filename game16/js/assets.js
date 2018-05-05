//ładowanie plików
var Manager = [];
var ile = 0;
function Ile(s){
	ile++; console.log(ile, s);};
//Manager.push(["jumpImg","pics/Jump (2).png"]);
/*var jumpImg = new Image();
jumpImg.src = "pics/Jump (2).png";
jumpImg.onload = Ile("jumpImg");*/
Manager.push(["fallImg","pics/Jump (10).png"]);
Manager.push(["spikesImg","pics/spikes.png"]); //chyba za poźno się właduje
var myLoadManager = new AssetManager();
		// set image root
myLoadManager.setRoot('pics'); //hmmmmm??????? //to jest jakaś zmienna //musi być zadeklerowana w którymś z poprzednich plików
		
		// preload our images
myLoadManager.queueDownload('Idle (1).png');
myLoadManager.queueDownload('Jump (2).png');
myLoadManager.queueDownload('spikes.png');
var spikesImg = new Image();
spikesImg.src = "pics/spikes.png";
spikesImg.onload = Ile;
Load1();
console.log("33%");
level0();
var teleporterImg = new Image();
teleporterImg.src = "pics/teleporter.png";
var monsterImg = new Image();
monsterImg.src = "pics/monster.png";
var monster2Img = new Image();
monster2Img.src = "pics/monster2.png";
function log () {console.log("zaczęto odliczanie");};
setTimeout(log, 5000);
var bulletImg = new Image();
bulletImg.src = "pics/bullet.png";
var loszkaImg = new Image();
loszkaImg.src = "pics/loszka.png";
var background1Img = new Image();
background1Img.src = "pics/background1.jpg";
var background2Img = new Image();
background2Img.src = "pics/background2.jpg";
var background3Img = new Image();
console.log("77%");
background3Img.src = "pics/background3.jpg";
var background4Img = new Image();
background4Img.src = "pics/background4.jpg";
var background5Img = new Image();
background5Img.src = "pics/background5.jpg";
var background6Img = new Image();
background6Img.src = "pics/background6.png";
var background7Img = new Image();
background7Img.src = "pics/background7.jpg";
background7Img.onload = function(){console.log("background7 loaded");};
var idleImg = [];
for (var i=0; i<= 9; i++){
	idleImg[i] = new Image();
	idleImg[i].src = "pics/Idle (" + (i + 1) + ").png";
}
for (var i=1; i<= 8; i++){
	eval("var run" + i + "Img = new Image();");
	eval("run" + i + "Img.src = 'pics/Run (" + i + ").png';");
}
for (var i=1; i<= 7; i++){
	eval("var dead" + i + "Img = new Image();");
	eval("dead" + i + "Img.src = 'pics/Dead (" + i + ").png';");
}
for (var i=1; i<= 3; i++){
	eval("var shoot" + i + "Img = new Image();");
	eval("shoot" + i + "Img.src = 'pics/Shoot (" + i + ").png';");
}
var music = new Audio("music/music.mp3");
var scream = new Audio("music/scream.mp3");
var bounce = new Audio("music/bounce.flac");
var win = new Audio("music/win.wav");

//LoadManager();
