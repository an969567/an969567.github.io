
var myLoadManager = new AssetManager();
		// set image root
myLoadManager.setRoot('pics'); //hmmmmm??????? //to jest jakaś zmienna //musi być zadeklerowana w którymś z poprzednich plików
		
		// preload our images
//myLoadManager.queueDownload('Idle (1).png');
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
for (var i=0; i<= 9; i++){
	myLoadManager.queueDownload("Idle (" + (i + 1) + ").png");
}
/*for (var i=1; i<= 8; i++){
	eval("myLoadManager.queueDownload('Run (" + i + ").png');");
}*/
level0();
//background7Img.onload = function(){console.log("background7 loaded");};
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
