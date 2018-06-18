canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"); //jakby wskaźnik

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                //alert(allText); //nice!!!
            }
        }
    }
    rawFile.send(null);
}

readTextFile("map3.json");

obj = JSON.parse(allText);

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime(); //lambda function
}


/********************************************************************/
//WCZYTANIE PLIKÓW

tile1 = new Image()
tile1.src = "images/slice03_03.png";

/*******************************************************************/
//PLAYER
player = obj.layers[1].objects[0]; //działa


/*******************************************************************/
//CONSTANTS

GRAVITY = 9.8;


/*********************************************************************/

console.log(obj.layers[0].data)

tile = {};
tile.width = obj.tilewidth;
tile.height = obj.tileheight;

map = {};
map.width = obj.layers[0].width;
map.height = obj.layers[0].height;

canvas.width = map.width * tile.width;
canvas.height = map.height * tile.height;

function paintTile(x, y, color){
	//color = "blue";
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.rect(x * tile.width, y * tile.height, tile.width, tile.height);
	ctx.fill();
}

tiles = obj.layers[0].data;

function myDraw(myObject){
    ctx.drawImage(myObject.img, myObject.x, myObject.y);
}

function renderTile(x, y){
    /*bierze z pliku zbiorowego*/
    console.log(x, y);
    ctx.drawImage(tile1, x * tile.width, y * tile.height);
}

function renderMap(){
	for (i=0; i <tiles.length; i++){
		x = i % 10; //dzielone przez map.width powinno być
		y = Math.floor(i/10); //a to przez map.height
		if(tiles[i] == 0) paintTile(x,y, "blue");
        else renderTile(x, y);
	}
}

//renderMap()

function renderPlayer(){
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fill();
}

//renderPlayer();

function update(){
    renderMap();
    player.y += GRAVITY;
    renderPlayer();
    requestAnimationFrame(update);
}

update();