
var myLoadManager = new AssetManager();
		// set image root
myLoadManager.setRoot('pics'); //hmmmmm??????? //to jest jakaś zmienna //musi być zadeklerowana w którymś z poprzednich plików
		
		// preload our images
myLoadManager.queueDownload('Jump (2).png');
myLoadManager.queueDownload('Jump (10).png');
myLoadManager.queueDownload('spikes.png');
myLoadManager.queueDownload('teleporter.png');
myLoadManager.queueDownload('monster.png');
myLoadManager.queueDownload('monster2.png');
myLoadManager.queueDownload('bullet.png');
myLoadManager.queueDownload('loszka.png');
myLoadManager.queueDownload('background1.jpg');
myLoadManager.queueDownload('background2.jpg');
myLoadManager.queueDownload('background3.jpg');
myLoadManager.queueDownload('background4.jpg');
myLoadManager.queueDownload('background5.jpg');
myLoadManager.queueDownload('background6.png');
myLoadManager.queueDownload('background7.jpg');
myLoadManager.queueDownload('background8.jpg');
for (var i=1; i<= 10; i++){
	myLoadManager.queueDownload("Idle (" + i + ").png");
}
for (var i=1; i<= 8; i++){
	myLoadManager.queueDownload("Run (" + i + ").png");
}
for (var i=1; i<= 7; i++){
	myLoadManager.queueDownload("Dead (" + i + ").png");
}
for (var i=1; i<= 3; i++){
	myLoadManager.queueDownload("Shoot (" + i + ").png");
}
myLoadManager.queueDownload('fireball.png');
myLoadManager.queueDownload('speaker.png');
myLoadManager.queueDownload('coin.png');
myLoadManager.queueDownload('mute.png');
myLoadManager.queueDownload('background9.jpg');
myLoadManager.queueDownload('wisielec.png');
for (var i=1; i<= 10; i++){
	myLoadManager.queueDownload("Idle" + i + "(2).png");
}
for (var i=1; i<= 8; i++){
	myLoadManager.queueDownload("Run" + i + "(2).png");
}
for (var i=1; i<= 3; i++){
	myLoadManager.queueDownload("Shoot" + i + "(2).png");
}
myLoadManager.queueDownload('Jump2(2).png');
myLoadManager.queueDownload('Jump10(2).png');
myLoadManager.queueDownload('wisielec(2).png');
myLoadManager.queueDownload('background10.jpg');
level0();

var music = new Audio("music/music.mp3");
var scream = new Audio("music/scream.mp3");
var bounce = new Audio("music/bounce.flac");
var win = new Audio("music/win.wav");
coinSnd = new Audio("music/coin.mp3");