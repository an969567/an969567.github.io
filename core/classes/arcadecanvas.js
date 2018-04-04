var engineRoot="";
var soundRoot="";	
var frameRate = 0;
var canvas;
var lastTime;
var triggerFullscreen=false;
var isFullScreen=false;
var isNodeKit=false;

var displayW=240;
var displayH=320;
var lowDisplayW=240;
var lowDisplayH=160;

gamepadSupport.init();


var isDesktop=true;
var isDemo=false;


var useMultiFactor = 0;
var keyBoardOut = true;
var isTouchBase = false;
var isFirefoxOS = false;

var GameState;	

var loopStart;
var loopEnd;
var loopPause;
var secondPassed=false;

var upPressed;
var upLocked;
var downPressed;
var downLocked;
var rightPressed;
var rightLocked;
var leftPressed;
var leftLocked;
var actionButton1;
var actionButton1Locked;
var actionButton2;
var actionButton2Locked;

var pl2_upPressed;
var pl2_upLocked;
var pl2_downPressed;
var pl2_downLocked;
var pl2_rightPressed;
var pl2_rightLocked;
var pl2_leftPressed;
var pl2_leftLocked;
var pl2_actionButton1;
var pl2_actionButton1Locked;
var pl2_actionButton2;
var pl2_actionButton2Locked;
var pl2_backPressed;
var pl2_backLocked;
var isAnalog=false;

var backPressed=false;
var backLocked=false;

var worldTicks;

// touch stuff
var mTouch = [];
var mTouchX = new Array(25);
var mTouchY = new Array(25);
var mTouchID = new Array(25);
var touchX=-1;
var touchY=-1;
var touched=false;
var touchReleased=true;


// tilt
var TiltXSpeed;
var TiltYSpeed;

var canvas;
var ctx;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
    
    
    
    
var params = {};

if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}
    
 
function init() {
    canvas = document.getElementById('mycanvas');

	upPressed=false;
	upLocked=false;
	rightPressed=false;
	rightLocked=false;
	downPressed=false;
	downLocked=false;
	leftPressed=false;
	leftLocked=false;
	actionButton1=false;
	actionButton1Locked=false;
	actionButton2=false;
	actionButton2Locked=false;
	
 	worldTicks=0;
 	
 	
 	
    if (canvas.getContext){

        ctx = canvas.getContext('2d');
        
        		// initialise our size
        if (isFirefoxOS) {
			useMultiFactor=0;
			drawableResource=engineRoot+"drawable/";
			
			lowDisplayW=window.innerWidth>>1;
			lowDisplayH=160;
			displayW=lowDisplayW<<1;
			
			canvas.width=lowDisplayW<<useMultiFactor;
			canvas.height=lowDisplayH<<useMultiFactor;
			
			ctx = canvas.getContext('2d');        
		} else {
			
			useMultiFactor=2;
			drawableResource=engineRoot+"drawablex4/";
	
			lowDisplayW=window.innerWidth>>useMultiFactor;
			lowDisplayH=160;
	
			canvas.width=lowDisplayW<<useMultiFactor;
			canvas.height=lowDisplayH<<useMultiFactor;
			
		  	ctx = canvas.getContext('2d');
		  	ctx.imageSmoothingEnabled = false;
		}	
		
        
        // Initialize game, before game start to call updates
        // This is function which you need to make every game!
        initGameEngine();
        
        
        
        // We need to initialize lastTime, so we don't get false delta value on first update
        lastTime = new Date().getTime();
        loopPause=new Date().getTime();
		loopStart = new Date().getTime();
        loopEnd=loopStart;

		runThread();

		// Setup events
        canvas.onmousemove = fw_mouseMove;
        canvas.onmousedown = fw_mouseDown;
        canvas.onmouseup = fw_mouseUp;    

		// reset touch
		touchX=-1;
		touchY=-1;
		touched=false;
		touchReleased=true;
		
		for (var i=mTouchX.length; --i>=0;) {
			mTouchX[i]=-1;
			mTouchY[i]=-1;
			mTouchID[i]=-1;
		}
		
		canvas.addEventListener('touchstart', function(event) {
			event.preventDefault();

			mTouch=event.touches;
			
			var pointerID;
			var touch;
			for (var i=0; i<event.touches.length; i++) {
			    touch = event.touches[i];
			    
			    if (i==0) {
				    touchX=touch.pageX;
				    touchY=touch.pageY;
				    touched=true;
				}
			}			
		}
		, false);

		
		canvas.addEventListener('touchmove', function(event) {
			event.preventDefault();
			
			mTouch=event.touches;
			
			var pointerID;
			var touch;

			for (var i=0; i<event.touches.length; i++) {
			    touch = event.touches[i];
			    
			    if (i==0) {
				    touchX=touch.pageX;
				    touchY=touch.pageY;
				    touched=true;
				}
			}
			
		}
		, false);
		
		canvas.addEventListener('touchend', function(event) {
			event.preventDefault();
			
			mTouch=event.touches;
			touchX=-1;
			touchY=-1;
			touchReleased=true;
		}
		, false);
		
		
    } else {
        alert('You need HTML5 compatible browser to see this!.. try Google Chrome ');
    }
}







// quick function to get random numbers easily
function getRandom(val) {
	var rand_no = Math.floor(val*Math.random()) ;
	return rand_no;
}

function convertToRadians(degree) {
	return degree*(Math.PI/180);
}

function runThread() {
	requestAnimFrame(runThread);

    loopEnd = new Date().getTime();
	if (loopEnd-loopStart<24) return;

    var currTime = new Date().getTime();
    lastTime = currTime;
    
    loopStart = new Date().getTime();
    
    if (GameState==INGAME) GameLoop();
    else LogicLoop();
    
    worldTicks++;
    if (worldTicks>1000) worldTicks-=1000;


	if (loopEnd-loopPause>1000) {
		secondPassed=true;
		loopPause=loopEnd;
	}



	// center "gunslugs.com" link
    getGame = document.getElementById('getfull');
    getGame.style.position='absolute';
    getGame.style.left=((window.innerWidth>>1)-(getGame.offsetWidth>>1))+"px";
    getGame.style.top=((window.innerHeight)-(getGame.offsetHeight+32))+"px";
    getGame.style.visibility='visible';

}



var mouseX=0;
var mouseY=0;

var mouseButton;


	
function fw_mouseMove(evt)
{
    // We calculate mouse canvas position
    mouseX = evt.clientX - canvas.offsetLeft;
    mouseY = evt.clientY - canvas.offsetTop;
}
 
function fw_mouseDown(evt)
{
    // We calculate mouse canvas position
    mouseX = evt.clientX - canvas.offsetLeft;
    mouseY = evt.clientY - canvas.offsetTop;
 
    touchX=(mouseX);
    touchY=(mouseY);
    
    // Button is pressed down
    switch(evt.which) {
        case 1 : mouseButton |= 0x01;    // left
            break;
        case 2 : mouseButton |= 0x02;    // middle
            break;
        case 3 : mouseButton |= 0x04;    // right
            break;
    }
 
}
 
function fw_mouseUp(evt)
{
    // We calculate mouse canvas position
    mouseX = evt.clientX - canvas.offsetLeft;
    mouseY = evt.clientY - canvas.offsetTop;
 
    touchX=-1;
    touchY=-1;
 
    // Button released
    switch(evt.which) {
        case 1 : mouseButton &= 0x06;
            break;
        case 2 : mouseButton &= 0x05;
            break;
        case 3 : mouseButton &= 0x03;
            break;
    }
    
    touchReleased=true;
 
}






function onKeyDown(evt){
	switch (evt.keyCode) {
		case 27:
			backPressed=true;
			evt.preventDefault();
			return false; 
		break;
		
		case 32: // SPACE used as alternate to action button
			actionButton2=true;
			evt.preventDefault(); 
			return false; 
		break;		
		
		case 38: 
			upPressed=true; 
			evt.preventDefault();
			return false; 
		break;
		case 40: 
			downPressed=true;
			evt.preventDefault();
			return false; 
		break;
		case 37: 
			leftPressed=true;
			evt.preventDefault(); 
			return false; 
		break;
		case 39: 
			rightPressed=true;
			evt.preventDefault(); 
			return false; 
		break;
	
		case 65:  // a
			leftPressed=true;
			evt.preventDefault(); 
			return false; 
		break;
	
		case 68: // d 
			rightPressed=true;
			evt.preventDefault(); 
			return false; 
		break;
	
		case 77: // m
			actionButton2=true;
			evt.preventDefault();
			return false;
		break;	
		
		case 83: // s
			downPressed=true; 
			evt.preventDefault();
			return false; 
		break;		

		case 87: // w
			upPressed=true; 
			evt.preventDefault();
			return false; 
		break;		

		
		case 88: 
			actionButton2=true;
			
			if (triggerFullscreen) {
				if (isNodeKit) {
					var gui = require('nw.gui');
					gui.Window.get().toggleFullscreen();    
				} else {
					var element = document.getElementById('mycanvas');

				    if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen(element.ALLOW_KEYBOARD_INPUT);
				    } else if (element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen(element.ALLOW_KEYBOARD_INPUT);
					}
	
					ctx = canvas.getContext('2d');
				}				

				var element = document.getElementById('mycanvas');
				isFullScreen=element.fullScreenEnabled; 
	
				triggerFullscreen=false;
			}
			
			evt.preventDefault(); 
			return false; 
		break; // x
		
		case 89: 
			actionButton1=true;
			evt.preventDefault(); 
			return false; 
		break; // y
		
		case 90: 
			actionButton1=true;
			evt.preventDefault(); 
			return false; 
		break; // z
		
		
	}
}


function onKeyUp(evt){
	switch (evt.keyCode) {
		case 27:
			backPressed=false;
			backLocked=false;
			evt.preventDefault();
			return false; 
		break;
		
		case 32: // SPACE used as alternate to action button
			actionButton2=false;
			actionButton2Locked=false;
			evt.preventDefault(); 
			return false; 
		break;		
		
	
		case 38: 
			upPressed=false;
			upLocked=false;
			evt.preventDefault();
			return false; 
		break;
		
		case 40: 
			downPressed=false; 
			downLocked=false;
			evt.preventDefault();
			return false;
		break;
		
		case 37: 
			leftPressed=false; 
			leftLocked=false;
			evt.preventDefault();
			return false;
		break;
		
		case 39: 
			rightPressed=false;
			rightLocked=false;
			evt.preventDefault();
			return false; 
		break;
		
		case 65:  // a
			leftPressed=false;
			leftLocked=false;
			evt.preventDefault(); 
			return false; 
		break;
	
		case 68: // d 
			rightPressed=false;
			rightLocked=false;
			evt.preventDefault(); 
			return false; 
		break;
	
		case 77: // m
			actionButton2=false;
			actionButton2Locked=false;
			evt.preventDefault();
			return false;
		break;	
		
		case 83: // s
			downPressed=false;
			downLocked=false; 
			evt.preventDefault();
			return false; 
		break;		
		
		case 87: // w
			upPressed=false;
			upLocked=false; 
			evt.preventDefault();
			return false; 
		break;		
		
		
		case 88: // x
			actionButton2=false;
			actionButton2Locked=false;
			evt.preventDefault();
			return false;
		break;
		
		case 89: // y
			actionButton1=false;
			actionButton1Locked=false;
			evt.preventDefault();
			return false;
		break;

		case 90: // z
			actionButton1=false;
			actionButton1Locked=false;
			evt.preventDefault();
			return false;
		break;


	}
}


function setAlpha(alpha) {
	ctx.globalAlpha=(1.0/255)*alpha;
}

// quick code to render part of an image (aka Sprites)
function renderAtPoint(imageObject, x, y) {
	ctx.drawImage(imageObject,x<<useMultiFactor,y<<useMultiFactor,imageObject.width, imageObject.height);
}

function renderSubImageAtPoint(imageObject, x, y, sourceX, sourceY, width, height)
{
	if (width<=0 || height<=0) return;
    ctx.drawImage(imageObject, sourceX<<useMultiFactor, sourceY<<useMultiFactor, width<<useMultiFactor, height<<useMultiFactor,  x<<useMultiFactor, y<<useMultiFactor, width<<useMultiFactor,height<<useMultiFactor);
}


function drawRect(x, y, w, h, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x<<useMultiFactor, y<<useMultiFactor, (w-x)<<useMultiFactor, (h-y)<<useMultiFactor);
}


// [r, g, b] color value 0 - 255
// [a] alpha value 0.0 - 1.0
function makeRGBA(r, g, b, a) {
	a=(1.0/255)*a;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}


function clipRect(x,y,w,h) {

	ctx.save();
	ctx.beginPath();
	ctx.rect(x<<useMultiFactor,y<<useMultiFactor,((w-x)<<useMultiFactor),((h-y)<<useMultiFactor));
	ctx.clip();
	
}

function endClip() {
	ctx.restore();
	ctx.beginPath();
	ctx.rect(0,0,(lowDisplayW<<useMultiFactor),(lowDisplayH<<useMultiFactor));
	ctx.clip();
}




// used for prerendering
var renderToCanvas = function (width, height, renderFunction) {
    var buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    renderFunction(buffer.getContext('2d'));
    return buffer;
};	

function setScale(cx, cy, h, v) {
	ctx.save();
	ctx.translate( cx<<useMultiFactor,cy<<useMultiFactor);
	ctx.scale( h, v);
	ctx.translate(-(cx<<useMultiFactor),-(cy<<useMultiFactor));
}

function endScale() {
	ctx.restore();
}


function drawBitmap(sprite, src,dest) {
	renderSubImageAtPoint(sprite, dest.left,dest.top, src.left,src.top, src.width, src.height);
}

function drawPaint(a, r, g, b) {
	drawRect(0,0,lowDisplayW,lowDisplayH,makeRGBA(r,g,b,a));
}



window.onresize = function(event) {

    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        if (isFirefoxOS) {
			useMultiFactor=0;
			drawableResource=engineRoot+"drawable/";
			lowDisplayW=window.innerWidth>>1;
			lowDisplayH=160;
			displayW=lowDisplayW<<1;
			
			canvas.width=lowDisplayW<<useMultiFactor;
			canvas.height=lowDisplayH<<useMultiFactor;
			
			
			verticalResize=1; //window.innerHeight/lowDisplayH;
			
			ctx = canvas.getContext('2d');        
		} else {        
			lowDisplayW=window.innerWidth>>useMultiFactor;
			lowDisplayH=160;
	
			displayW=lowDisplayW<<1;
	
			canvas.width=lowDisplayW<<useMultiFactor;
			canvas.height=lowDisplayH<<useMultiFactor;
			
			canvas.style.position="absolute";
			canvas.style.left=(window.innerWidth>>1)-(canvas.width>>1);
			canvas.style.top=((window.innerHeight>>1)-(canvas.height>>1))+"px";
			
			ctx = canvas.getContext('2d');
			ctx.webkitImageSmoothingEnabled = false;
			
			verticalResize=window.innerHeight/lowDisplayH;
		}
	}	
}