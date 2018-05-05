function Sprite(url) { //klasa

}
var liczenie = 0;
function LoadManager(){
  for(var i=0;i<Manager.length;i++){
    eval(Manager[i][0] + " = new Image();");
    eval(Manager[i][0] + ".src = '" + Manager[i][1]+ "';");
  }
}

function Load1 (){
	console.log("Włączyliśmy Load1")
	eval(Manager[liczenie][0] + " = new Image();");
    eval(Manager[liczenie][0] + ".src = '" + Manager[liczenie][1]+ "';");
    liczenie++;
    if (liczenie < Manager.length){
    	console.log(liczenie);
    	eval(Manager[liczenie-1][0] + ".onload = Load1;");
    }
    else
    	eval(Manager[liczenie-1][0] + ".onload = update;");
}

//console.log(spikesImg);

function AssetManager() { //konstruktor //potem dodajemy już tylko metody //wszystkie properties są tutaj zdefiniowane //Czyli sam asset Manager nie bierze żadnych arguemntów
	this.successCount = 0;
	this.errorCount = 0;  
	this.cache = {};
	this.images = [];
	this.downloadQueue = [];
	this.resourceRoot=""; //co to
}

AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}

AssetManager.prototype.setRoot = function (res) {
	this.resourceRoot=res; //może root plików
}

AssetManager.prototype.downloadAll = function(downloadCallback) { //wysyła funkcję? //w sensie bierze jako argument funkcję
	if (this.downloadQueue.length === 0) {
		downloadCallback();
  	}
  	
    for (var i = 0; i < this.downloadQueue.length; i++) { //wygląda znajomo
        var path = this.downloadQueue[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            that.successCount += 1;

			if (that.isDone()) {
        		downloadCallback();
    		}            
        }, false);
        img.addEventListener("error", function() {
        	that.errorCount += 1;
			if (that.isDone()) {
        		downloadCallback();
    		}        	
    	}, false);
    	
        img.src = this.resourceRoot+"/"+path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.getTotal = function() {
	return this.downloadQueue.length-1; //hmm ten minus jeden trochę dziwny
}

AssetManager.prototype.getDone = function () {
	return (this.successCount + this.errorCount); //zwraca liczbę
}

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length <= this.successCount + this.errorCount); //zwraca fałsz jeżeli successCount + errorCount są mniejsze od długości kolejki
}


AssetManager.prototype.getAsset = function(path) {
    return this.cache[path]; //czy on operuje na pamięci cache przeglądarki?
}

// resizer for pixelart (no aliasing)
AssetManager.prototype.noalias = function(scale) {
		for (var i= this.downloadQueue.length; --i>=0;) {
			
			var img=this.cache[this.downloadQueue[i]];
			
		    var src_canvas = document.createElement('canvas');
		    src_canvas.width = img.width;
		    src_canvas.height = img.height;
		
		    var src_ctx = src_canvas.getContext('2d');
		    src_ctx.drawImage(img, 0,0);
		    var src_data = src_ctx.getImageData(0, 0, img.width, img.height).data;
		
		    var dst_canvas = document.createElement('canvas'); //tworzy małe canvasy?
		    dst_canvas.width = img.width * scale;
		    dst_canvas.height = img.height * scale;
		    var dst_ctx = dst_canvas.getContext('2d');
		
		    var offset = 0;
		    for (var y = 0; y < img.height; ++y) {
		        for (var x = 0; x < img.width; ++x) {
		            var r = src_data[offset++];
		            var g = src_data[offset++];
		            var b = src_data[offset++];
		            var a = src_data[offset++] / 100.0;
		            dst_ctx.fillStyle = 'rgba(' + [r, g, b, a].join(',') + ')';
		            dst_ctx.fillRect(x * scale, y * scale, scale, scale);
		        }
		    }
		    
		    img.src=dst_canvas.toDataURL("image/png"); //toDataUrl to jakieś API?
		}
}

//do działania przed uruchomieniem update(). Musi przywołać update.

var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

function drawRect(x, y, w, h, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, w, h);
}

function makeRGBA(r, g, b, a) {
	a=(1.0/255)*a;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

function drawLoadingBar() {
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	tx=64;
	ty=32;
	
	drawRect(tx,ty,tx+130,ty+3,makeRGBA(200,200,200,255)); // to jest loading bar
	tx++;
	ty++;
	drawRect(tx,ty,tx+128,ty+1,makeRGBA(255,255,255,255));
	
	var total=myLoadManager.getTotal(); //to są dane do loading baru
	var currentDone=myLoadManager.getDone();
	
	drawRect(tx,ty, tx+((100.0/total /* to jest to */)*currentDone), ty+1  ,makeRGBA(200,200,200,255));
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
	idleImg = [];
	for (var i=0; i<= 9; i++) {
		idleImg[i] = myLoadManager.getAsset("Idle (" + (i + 1) + ").png");
	}
	for (var i=1; i<= 8; i++){
		eval("run" + i + "Img = myLoadManager.getAsset('Run (" + i + ").png');");
	}
	/* tutaj wpiszemy*/
	console.log("a");
	loadSetup();
	loadLevel2();
	loadLevel3();
	loadLevel4();
	loadLevel5();
	loadLevel6();
	loadLevel7();
	//update();
}

function level0() {
	myLoadManager.downloadAll(function () {});
	drawLoadingBar();
	if(!myLoadManager.isDone()/*tutaj warunek, że jeszcze się ładuje*/)window.requestAnimationFrame(level0); //ważne
	//czyli co, on dalej się robi w kółko chyba
	else /*przywołanie funkcji, która przypisze obiekty do menadżera*/ przypisz();
}