//ładowanie plików
var jumpImg = new Image();
jumpImg.src = "pics/Jump (2).png";
var spikesImg = new Image();
spikesImg.src = "pics/spikes.png";
var teleporterImg = new Image();
teleporterImg.src = "pics/teleporter.png";
var monsterImg = new Image();
monsterImg.src = "pics/monster.png";
var monster2Img = new Image();
monster2Img.src = "pics/monster2.png";
var monster2rightImg = new Image();
monster2rightImg.src = "pics/monster2right.png";
var runImg = new Image();
runImg.src = "pics/Run (3).png";
var bulletImg = new Image();
bulletImg.src = "pics/bullet.png";
var loszkaImg = new Image();
loszkaImg.src = "pics/loszka.png";
var shootImg = new Image();
shootImg.src = "pics/Shoot (1).png"
var background1Img = new Image();
background1Img.src = "pics/background1.jpg";
var background2Img = new Image();
background2Img.src = "pics/background2.jpg";
var background3Img = new Image();
background3Img.src = "pics/background3.jpg";
var background4Img = new Image();
background4Img.src = "pics/background4.jpg";
var background5Img = new Image();
background5Img.src = "pics/background5.jpg";
var background6Img = new Image();
background6Img.src = "pics/background6.png";
for (var i=1; i<= 10; i++){
	eval("var idle" + i + "Img = new Image();");
	eval("idle" + i + "Img.src = 'pics/Idle (" + i + ").png';");
}