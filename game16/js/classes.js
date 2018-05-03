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
}