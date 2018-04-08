var engineRoot="";
var soundRoot="";	

window.addEventListener('load', init, false);
window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

	var MAXWORLD = 3;



	var activePlayer=new PlayerProfile();
	
	var INLOADER = 1,
		INSPLASH = 2,
		INMENU = 3,
		INGAME = 4,
	
		INSPLASH3 = 48,
		INSTARTSCREEN = 49,
		INMAINMENU = 50,
		INSETTINGS = 51,
		INITMAP = 52, 
		INPAUSE = 53,
		INCONTINUE = 54,
		INMISSIONS = 55,
		INALLMISSIONS = 56,
		INCONTROLS = 57,
		INCONTROLKEYS = 58,
		INANIMATION = 59,
		INDIED = 60,
		INJOYSTICK=61,
		INUPSELL = 62;

	// Preloader
	var myLoadManager = new AssetManager();
	
	

	var scoreboard = new Array(6);
	var timeboard = new Array(2);
	var digitsboard = new Array(3);
	
	var joystickSettings=0;

	// used for our splash logo/intro
	var splash;
	var splashicn;
	var splashFrame;
	var splashDone=false;
	var splashAlpha;
	var splashYSpeed;
	var splashY;
	
	
	var sprites=new Array(32);
	var hwImage;
	var desktopImage;
	var upsellImage;
	
	
	var fxList = new Array(320);
	var bulletList = new Array(128);
	var monsterList = new Array(256);
	var copyMonsterList = new Array(256);
	
	// keep track, we only offer an unlock once per game!
	var characterUnlockAdded = new Array(16);
	
	var cloudX = new Array(6);
	var cloudY = new Array(6);
	var nextCloud;
	
	var myPlayer = new Player(1);	
	var myPlayer2 = new Player(2);
	var tmpPlayer;
	
	var myWorld = new TileMap();
	var copyWorld = new TileMap();
	
	var gaveContinueOption;
	var lastWorld;
	var startWorld;
	var world;		// world progress
	var level;		// game progress level
	var SecretWorldLoad;
	var worldOrder = new Array(16); 
	var continueUseCount;

	var worldChapterAlpha;
	var worldChapterAlphaTarget;
	var worldChapterDelay;
	
	var	statusBarY;
	var statusBarTarget;
	var generalInfo;
	var generalAlpha;
	var generalAlphaTarget;
	var generalDelay;
	var scaler;
	
	var menuSelectedSideBySide; // if 2 players characters selected side by side
	var menuSettingsItem;
	var menuReady1;
	var menuReady2;
	var menuSelected1;
	var menuSelectedY1;
	var menuAlpha1;
	var menuDelay1;
	var menuSelected2;
	var menuSelectedY2;
	var menuSlide1;
	var menuSlide2;
	var menuAlpha2;
	var menuDelay2;
	var nextState;
	var startTouchY;
	var endTouchY;
	
	
	// mission screen stuff
	var missionY=new Array(3);
	var missionX=new Array(3);
	var missionAlpha=new Array(3);
	var missionShake;
	var missionAge;
	
	// used for darkening the unselected soldiers in the plane
	var	menuPlaneBlackX1;
	var	menuPlaneBlackX2;

	// global used for drawing, calculating, etc
	var tx;
	var ty;
	var tx2;
	var ty2;
	var done;
	var myMapBitmap;
	var myMapCanvas;

	var dest = new Rect();
	var src = new Rect();


	
	function initGameEngine() {
		initSounds();

		
		// our prerender buffer for the tilemap		
		myMapBitmap = document.createElement('canvas');
    	myMapBitmap.width = (196<<4)<<useMultiFactor;
    	myMapBitmap.height = (11<<4)<<useMultiFactor;
    	myMapCanvas=myMapBitmap.getContext('2d');

		
		
		// set image root
		myLoadManager.setRoot(drawableResource);
		
		// preload our images
		myLoadManager.queueDownload('spl1.png');
		myLoadManager.queueDownload('spl2.png');
		
		myLoadManager.queueDownload('a01.png');
		myLoadManager.queueDownload('anim01.png');
		myLoadManager.queueDownload('anim02.png');
		myLoadManager.queueDownload('anim03.png');
		myLoadManager.queueDownload('anim04.png');
		myLoadManager.queueDownload('anim05.png');
		myLoadManager.queueDownload('anim06.png');
		myLoadManager.queueDownload('b01.png');
		myLoadManager.queueDownload('boss1.png');
		myLoadManager.queueDownload('boss2.png');
		myLoadManager.queueDownload('boss3.png');
		myLoadManager.queueDownload('boss4.png');
		myLoadManager.queueDownload('boss5.png');
		myLoadManager.queueDownload('fx.png');
		myLoadManager.queueDownload('fxg.png');
		myLoadManager.queueDownload('joystick.png');
		myLoadManager.queueDownload('logo.png');
		myLoadManager.queueDownload('m01b.png');
		myLoadManager.queueDownload('m01g.png');
		myLoadManager.queueDownload('m02b.png');
		myLoadManager.queueDownload('m04b.png');
		myLoadManager.queueDownload('m05b.png');
		myLoadManager.queueDownload('m05g.png');
		myLoadManager.queueDownload('m06b.png');
		myLoadManager.queueDownload('p01.png');
		myLoadManager.queueDownload('p01b.png');
		myLoadManager.queueDownload('p02.png');
		myLoadManager.queueDownload('p03.png');
		myLoadManager.queueDownload('p04.png');
		myLoadManager.queueDownload('p04b.png');
		myLoadManager.queueDownload('p05.png');
		myLoadManager.queueDownload('p05b.png');
		myLoadManager.queueDownload('p06.png');
		myLoadManager.queueDownload('p06b.png');
		myLoadManager.queueDownload('p07.png');
		myLoadManager.queueDownload('p07b.png');
		myLoadManager.queueDownload('p08.png');
		myLoadManager.queueDownload('p09.png');
		myLoadManager.queueDownload('p100.png');
		myLoadManager.queueDownload('p101.png');
		myLoadManager.queueDownload('p101b.png');
		myLoadManager.queueDownload('p102.png');
		myLoadManager.queueDownload('p102b.png');
		myLoadManager.queueDownload('playerb.png');
		myLoadManager.queueDownload('playerba.png');
		myLoadManager.queueDownload('playerep.png');
		myLoadManager.queueDownload('playergc.png');
		myLoadManager.queueDownload('players.png');
		myLoadManager.queueDownload('playersr.png');
		myLoadManager.queueDownload('playerwm.png');
		myLoadManager.queueDownload('playerps.png');
		myLoadManager.queueDownload('t01.png');
		myLoadManager.queueDownload('t02.png');
		myLoadManager.queueDownload('t03.png');
		myLoadManager.queueDownload('t04.png');
		myLoadManager.queueDownload('t05.png');
		myLoadManager.queueDownload('t06.png');
		myLoadManager.queueDownload('t07.png');
		myLoadManager.queueDownload('t08.png');
		myLoadManager.queueDownload('t09.png');
		myLoadManager.queueDownload('t100.png');
		myLoadManager.queueDownload('t101.png');
		myLoadManager.queueDownload('t102.png');
		myLoadManager.queueDownload('tripod.png');
		myLoadManager.queueDownload('uiachieve.png');
		myLoadManager.queueDownload('uigame.png');
		myLoadManager.queueDownload('uiinputsetup.png');
		myLoadManager.queueDownload('uidesktop.png');
		myLoadManager.queueDownload('uiupsell.png');
		myLoadManager.queueDownload('uihwkeys.png');
		
		myLoadManager.queueDownload('anim99.png');
		myLoadManager.queueDownload('p103.png');
		myLoadManager.queueDownload('t103.png');
		myLoadManager.queueDownload('p01b.png');
		myLoadManager.queueDownload('boss1.png');
		myLoadManager.queueDownload('p10.png');
		myLoadManager.queueDownload('t10.png');
		myLoadManager.queueDownload('p10b.png');
		myLoadManager.queueDownload('boss6.png');
		
		
		myLoadManager.downloadAll(function() {});
		
		for (var i = copyMonsterList.length - 1; i >= 0; i--) {
			copyMonsterList[i]=new Monster();
			copyMonsterList[i].deleted = true;
		}
		
		
		activePlayer.loadSettings();


		GameState=INLOADER;
	}




function InitMenu(playMusic) {
	paused = false;
	menuMode = MENU_STARTSCREEN;
	menuState = -1;
	nextState = -1;
	
	menuSelected=-1;

	uiAlpha = 0;
	uiAlphaTarget = 255;

	GameState = INMENU;

	menuTiming = 0;
	paused = false;
}



function LogicLoop() {
	touchX = -1;
	touchY = -1;
	if (mTouch[0]!=null && mTouch[0].pageX >= 0 && mTouch[0].pageY >= 0) {
		touchY = (lowDisplayH / 100) * ((100 / displayH) * mTouch[0].pageY);
		touchX = (lowDisplayW / 100) * ((100 / displayW) * mTouch[0].pageX);
	}


	switch (GameState) {
		case INLOADER:
			if (myLoadManager.isDone()) { // && mySoundPool.isDone()) {

				splashicn = myLoadManager.getAsset('spl1.png');
				splash = myLoadManager.getAsset('spl2.png');
				
				desktopImage = myLoadManager.getAsset('uidesktop.png');
				upsellImage = myLoadManager.getAsset('uiupsell.png');
				hwImage= myLoadManager.getAsset('uihwkeys.png');
				
				// world graphics, freed and reloaded at loadWorld
				sprites[2]=myLoadManager.getAsset('p01.png');
				sprites[7]=myLoadManager.getAsset('t01.png');
				sprites[8]=myLoadManager.getAsset('p01b.png');
				
		
				sprites[0] = myLoadManager.getAsset('playerb.png');
				sprites[1] = myLoadManager.getAsset('fx.png');
				// sprites[2] used for background scenery
				sprites[3] = myLoadManager.getAsset('a01.png');
				sprites[4] = myLoadManager.getAsset('b01.png');
				
				sprites[5] = myLoadManager.getAsset('m01b.png');
				sprites[6] = myLoadManager.getAsset('m02b.png');
				// sprites[7] used for tiles
				// sprites[8] used for parallax
				sprites[9] = myLoadManager.getAsset('tripod.png');
		//		sprites[10] = myLoadManager.getAsset('m03b.png');
				sprites[11] = myLoadManager.getAsset('m04b.png');
				sprites[12] = myLoadManager.getAsset('m05b.png');
				sprites[13] = myLoadManager.getAsset('m06b.png');
				// used for player2
				sprites[14] = myLoadManager.getAsset('playerb.png');
				// sprites[15] used for boss2
				sprites[15] = myLoadManager.getAsset('boss1.png');
				
				sprites[25] = myLoadManager.getAsset('uiinputsetup.png');
				
				// sprites[26] = animation image
				
				sprites[27] = myLoadManager.getAsset('uiachieve.png');
				sprites[28] = myLoadManager.getAsset('logo.png');
				sprites[29] = myLoadManager.getAsset('joystick.png');
				sprites[30] = myLoadManager.getAsset('uigame.png');


				splashFrame = 0;
				splashDone = false;
				splashAlpha = 0;
				splashY = 0;
				splashYSpeed = -8;

				popAchievementY = -20;
				popAchievementYTarget = -24;
				
				worldTicks = 0;

				GameState=INSPLASH;
				playSound('FX_SPLASH');
				
				button_a=activePlayer.controller1[4];
				button_b=activePlayer.controller1[5];
				button_c=activePlayer.controller1[6];
				button_d=activePlayer.controller1[7];
				
				
			} else {
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(0,0,canvas.width,canvas.height);
			
				tx=(lowDisplayW>>1)-64;
				ty=lowDisplayH-32;
				
				drawRect(tx,ty,tx+130,ty+3,makeRGBA(200,200,200,255));
				tx++;
				ty++;
				drawRect(tx,ty,tx+128,ty+1,makeRGBA(255,255,255,255));
				
				var total=myLoadManager.getTotal()+mySoundPool.getTotal();
				var currentDone=myLoadManager.getDone()+mySoundPool.getDone();
				
				drawRect(tx,ty, tx+((100.0/total)*currentDone), ty+1  ,makeRGBA(200,200,200,255));
			}
		break;
		
		
		
		case INSPLASH:
			drawRect(0,0,lowDisplayW<<useMultiFactor,lowDisplayH<<useMultiFactor,makeRGBA(255,255,255,255));

			setAlpha(splashAlpha);

			if (!splashDone || splashAlpha < 255) {
				splashAlpha += 32;
				if (splashAlpha > 255)
					splashAlpha = 255;
			}

			if (!splashDone) {
				splashFrame += 16;
				if (splashFrame == 96) {
					splashFrame = 0;
					splashDone = true;
				}
			}

			// jump
			if (splashYSpeed < 6) splashYSpeed++;
			splashY += splashYSpeed;
			if (splashY >= 0) {
				splashY = 0;
				splashYSpeed = -(splashYSpeed >> 1);
			}

			// landscape calculations
			tx = (lowDisplayW >> 1) - 32;
			ty = ((lowDisplayH >> 1) - 48) + splashY;

			// render pixel
			renderSubImageAtPoint(splashicn, tx,ty, splashFrame<<2,0, 64,64);
			

			// render name
			setAlpha(255);
			tx = (lowDisplayW >> 1) - 61;
			ty = (lowDisplayH >> 1) + 30;
			renderSubImageAtPoint(splash,tx,ty,0,16,122,18);
			

			if (worldTicks > 48 && splashDone) {
					if (activePlayer.stickX[0]==-999 && activePlayer.stickY[0]==-999)
						activePlayer.resetControls(lowDisplayW, lowDisplayH);
					

					
					initMenu();

					menuSlide1=200;
					menuSlide2=0;
					
					scaler=2.5;
					splashAlpha=255;
					worldTicks=0;
					GameState=INSPLASH3;
			}
		break;
		
		
		case INSPLASH3:
				drawPaint(255,0,0,0);
				renderBackground();

				// render soldiers
				renderSoldiersNonactive();
				renderMenuOptions();

				fxUpdate();
				fxRender(1);
				fxRender(2);


				// logo
				tx=(lowDisplayW>>1)-69;
				ty=8;

				if (scaler>1.0) {
					renderSubImageAtPoint(sprites[28],tx,ty,  0,144,  138,49);
				}
				

				if (scaler>1.0) {
					scaler-=0.4;
					if (scaler<1.2) {
						scaler=1.0;
						playSound('FX_CLANG');
						myWorld.worldShake=16;
						worldTicks=0;
					}
				} else {
					scaler=1.0;
					splashAlpha-=48;
					if (splashAlpha<0) {
						splashAlpha=0;
					} else {
						fxAdd(getRandom(lowDisplayW-32), getRandom(lowDisplayH-32), FX.fHUGEEXPLODE, 0);
						fxAdd(getRandom(lowDisplayW-32), getRandom(lowDisplayH-32), FX.fCIRCLEEXPLODE, 0);
					}

					if (worldTicks>24) {
						destroyMap();
						splash=null;
						
						menuSettingsItem=0;
						GameState=INMAINMENU;
						
						
						
					}
				}

		break;
		
		
		
			case INSTARTSCREEN:
				drawPaint(255,0,0,0);

				renderBackgroundStart();
				        
				// logo
				tx=(lowDisplayW>>1)-69;
				ty=16;
				renderSubImageAtPoint(sprites[28], tx,ty, 0,144, 138,49);
				
				// (c)
				tx=(lowDisplayW>>1)-58;
				ty=lowDisplayH-16;
				renderSubImageAtPoint(sprites[28], tx,ty, 119,0, 117,11);
				
				
				// START
				tx=(lowDisplayW>>1)-17;
				ty=(lowDisplayH>>1);
				if (worldTicks%32<16) {
					renderSubImageAtPoint(sprites[28], tx,ty, 294,137, 34,7);
				}
				
				if ((touchReleased && touchX>16 && touchY>16 && touchX<lowDisplayW-16 && touchY<lowDisplayH-16) 
					|| (actionButton2 && !actionButton2Locked)
					){
					if (actionButton2) actionButton2Locked=true;
					else touchReleased=false;
					menuSettingsItem=0; 
					
					menuSlide1=200;
					menuSlide2=0;
					GameState=INMAINMENU;
				}
			break;

			case INMAINMENU:
				drawPaint(255,0,0,0);
				renderBackground();
				// render music-speaker
				renderSpeaker();
				
				
				// render soldiers
				renderSoldiersNonactive();
				
				if (menuSettingsItem>2) {
					menuSettingsItem=0; 
				}
				
				if (leftPressed && !leftLocked) {
					leftLocked=true;
					if (menuSettingsItem>1) {
						playSound('FX_PLOP');
						menuSettingsItem--;
					} else {
						menuSettingsItem=1;
					}
				}
				
				if (rightPressed && !rightLocked) {
					rightLocked=true;
					if (menuSettingsItem<2) {
						playSound('FX_PLOP');
						menuSettingsItem++;
					}
				}

				
				renderMenuOptions();
				
			break;
			
			
			
			case INMENU:
				drawPaint(255,0,0,0);
				renderBackground();

				// render music-speaker
				renderSpeaker();
				
				
				// v1.3.0
				if (!menuReady1) {
					if (leftPressed && !leftLocked && menuSelected1>0) {
						leftLocked=true;
						
						splashY=menuSelected1;
						done=false;
						while (menuSelected1>0 && !done) {
							menuSelected1--;
							done=true;
							if (!activePlayer.didUnlockCharacter(menuSelected1)) done=false;
							if (menuSelected1==menuSelected2 && myWorld.isCOOP) done=false;
						}
						
						if (!done) menuSelected1=splashY; 
						else {
							menuSelectedY1=50;
							menuAlpha1=255;
							menuDelay1=64;
							
							playSound('FX_COIN');
						}							
						
					}
					
					if (rightPressed && !rightLocked && menuSelected1<6) {
						rightLocked=true;
						splashY=menuSelected1;
						done=false;
						while (menuSelected1<=6 && !done) {
							menuSelected1++;
							done=true;
							if (!activePlayer.didUnlockCharacter(menuSelected1)) done=false;
							if (menuSelected1==menuSelected2 && myWorld.isCOOP) done=false;
						}
						
						if (!done) menuSelected1=splashY;
						else {
							menuSelectedY1=50;
							menuAlpha1=255;
							menuDelay1=64;
							
							playSound('FX_COIN');
						}
					}
				}
				
				// v1.3.0
				if (!myWorld.isCOOP && pl2_actionButton2 && !pl2_actionButton2Locked) {
					pl2_actionButton2Locked=true;
					myWorld.isCOOP=true;
					playSound('FX_COIN');
					if (menuSelected2<0) menuSelected2=myPlayer2.characterID;
					if (menuSelected2<0) menuSelected2=4;
				}
				
								
				if (myWorld.isCOOP && actionButton2 && !actionButton2Locked && menuSelected1>=0) {
					menuReady1=!menuReady1;
					actionButton2Locked=true;
				}

				
				// v1.3.0
				if (myWorld.isCOOP && !menuReady2) {
					if (pl2_leftPressed && !pl2_leftLocked && menuSelected2>0) {
						pl2_leftLocked=true;
						splashY=menuSelected2;
						done=false;
						while (menuSelected2>0 && !done) {
							menuSelected2--;
							done=true;
							if (!activePlayer.didUnlockCharacter(menuSelected2)) done=false;
							if (menuSelected2==menuSelected1) done=false;
						}
						
						if (!done) menuSelected2=splashY; 
						else {
							menuSelectedY2=50;
							menuAlpha2=255;
							menuDelay2=64;
							
							playSound('FX_COIN');
						}							
					}
					
					if (pl2_rightPressed && !pl2_rightLocked && menuSelected2<6) {
						pl2_rightLocked=true;
						splashY=menuSelected2;
						done=false;
						while (menuSelected2<=6 && !done) {
							menuSelected2++;
							done=true;
							if (!activePlayer.didUnlockCharacter(menuSelected2)) done=false;
							if (menuSelected2==menuSelected1) done=false;
						}
						
						if (!done) menuSelected2=splashY;
						else {
							menuSelectedY2=50;
							menuAlpha2=255;
							menuDelay2=64;
							
							playSound('FX_COIN');
						}
					}
				}
								
				if (myWorld.isCOOP && pl2_actionButton2 && !pl2_actionButton2Locked && menuSelected2>=0) {
					menuReady2=!menuReady2;
					pl2_actionButton2Locked=true;
				}
				
				
				// render soldiers
				tx = ((lowDisplayW >> 1) - 132); //142);
				ty = 50;
				
				// first seat
				menuPlaneBlackX1=-1;
				menuPlaneBlackX2=lowDisplayW;
				
				tx+=31; 
				ty+=52;
				for (var i=0; i<8; i++) {
					setAlpha(255);

					if (i!=menuSelected1 && touchReleased && touchX>=tx-10 && touchX<=tx+12 && touchY<=ty+24 && touchY>=50 && !myWorld.isCOOP) {
						touchReleased=false;

						//if (i!=2 && i!=7) {
						if (activePlayer.didUnlockCharacter(i)) {
							menuSelected1=i;
							
							menuSelectedY1=50;
							menuAlpha1=255;
							menuDelay1=64;
							
							playSound('FX_COIN');
						}
					}
					
					
					
					if (!activePlayer.didUnlockCharacter(i)) 
						renderSubImageAtPoint(sprites[28], tx,ty, 160+(i*11),114, 11,12);
					else if (getRandom(80)>72) 
						renderSubImageAtPoint(sprites[28], tx,ty, 160+(i*11),23, 11,12);
					else 
						renderSubImageAtPoint(sprites[28], tx,ty, 160+(i*11),11, 11,12);
					
					
					// render current char info
					if (menuSelected1==i) {
						setAlpha(menuAlpha1);
						if (menuDelay1>0) menuDelay1--;
						else {
							//if (menuAlpha1>0) menuAlpha1-=8;
							//if (menuAlpha1<=0) menuAlpha1=0;
						}
						if (menuSelectedY1>21) menuSelectedY1-=((menuSelectedY1)-(21)>>1);
						renderSoldier(i, 6, menuSelectedY1);
						
						// add light-mask 
						menuSelectedSideBySide=false;
						menuPlaneBlackX1=tx-10;
						setAlpha(128);
						
						// (special case for when player2 is next to us)
						if (myWorld.isCOOP) {
							if ((menuSelected1==0 && menuSelected2==1) ||
								(menuSelected1==1 && menuSelected2==2) ||		// v1.3.0
								(menuSelected1==2 && menuSelected2==3) ||	// v1.3.0
								 (menuSelected1==4 && menuSelected2==5) ||
								 (menuSelected1==5 && menuSelected2==6)
								) {
								menuSelectedSideBySide=true;
								renderSubImageAtPoint(sprites[28], tx-10,50, 326,35, 54,74);
								
							} else if (
								 (menuSelected1==1 && menuSelected2==0) ||
								 (menuSelected1==2 && menuSelected2==1) ||	// v1.3.0
								 (menuSelected1==3 && menuSelected2==2) ||	// v1.3.0
								 (menuSelected1==5 && menuSelected2==4) ||
								 (menuSelected1==6 && menuSelected2==5)
							   ) {
								
								menuSelectedSideBySide=true;
								renderSubImageAtPoint(sprites[28], tx-30,50, 326,35, 54,74);
								
							} else {
								menuSelectedSideBySide=false;
								
								renderSubImageAtPoint(sprites[28], tx-10,50, 294,35, 32,74);
								
							}
						} else {
							menuSelectedSideBySide=false;

							renderSubImageAtPoint(sprites[28], tx-10,50, 294,35, 32,74);							
						}
						
						setAlpha(255);
					}


					// render current char info
					if (menuSelected2==i && myWorld.isCOOP) {
						setAlpha(menuAlpha2);
						if (menuDelay2>0) menuDelay2--;
						else {
//							if (menuAlpha2>0) menuAlpha2-=8;
//							if (menuAlpha2<=0) menuAlpha2=0;
						}
						if (menuSelectedY2>21) menuSelectedY2-=((menuSelectedY2)-(21)>>1);
						renderSoldier(i, (lowDisplayW)-106, menuSelectedY2);

						// add light-mask
						menuPlaneBlackX2=tx-10;
						setAlpha(128);
						if ( !menuSelectedSideBySide ) {
							renderSubImageAtPoint(sprites[28], tx-10,50, 294,35, 32,74);
							setAlpha(255);
						}
					}
					
					
					if ( (menuSelected1==i && menuReady1) || (menuSelected2==i && menuReady2) ) {
						renderSubImageAtPoint(sprites[30], tx-6,ty+2, 61,159, 23,7);
					}
					
					
					if (i==3) tx+=79;
					else tx+=20;
				}
				
				
				// black out the plane (except for where selected soldiers are)
				if (menuPlaneBlackX1<menuPlaneBlackX2 && menuPlaneBlackX1>=0) tx=menuPlaneBlackX1;
				else tx=menuPlaneBlackX2;
				if (tx>0) {
						

					drawRect(0,50,tx,50+74,makeRGBA(0,0,0,128));
					
					if (menuPlaneBlackX2>tx && !menuSelectedSideBySide) {
						drawRect(tx+32,50, menuPlaneBlackX2,50+74,makeRGBA(0,0,0,128));
						if (menuPlaneBlackX2<lowDisplayW){
							drawRect(menuPlaneBlackX2+32,50, lowDisplayW,50+74,makeRGBA(0,0,0,128));
						}
					} else if (menuPlaneBlackX1>tx && !menuSelectedSideBySide) {
						drawRect(tx+32,50 ,menuPlaneBlackX1,50+74,makeRGBA(0,0,0,128));
						if (menuPlaneBlackX1<lowDisplayW){
							drawRect(menuPlaneBlackX1+31,50, lowDisplayW,50+74,makeRGBA(0,0,0,128));
						}
					} else if (menuSelectedSideBySide) {
						drawRect(tx+54,50,lowDisplayW,50+74,makeRGBA(0,0,0,128));
					} else {
						drawRect(tx+32,50,lowDisplayW,50+74,makeRGBA(0,0,0,128));
					}
				}
				
				
				// rerender door
//				if (menuSelected1!=-1 && (!myWorld.isCOOP || menuSelected2!=-1)) {
					tx = ((lowDisplayW >> 1) - 132)+117; // - 142)+117;
					ty = 50+35;
					renderSubImageAtPoint(sprites[28], tx,ty, 117,71, 28,27);
					
					
					// render clouds
					tx = ((lowDisplayW >> 1) - 132); //-142);
					ty = 50;
					clipRect(tx+117,ty+36,tx+145,ty+63);
					for (var i=3; --i>=0;) {
						//renderSubImageAtPoint(sprites[28], cloudX[i],ty+28+cloudY[i], 119,12, 142,21);
						renderSubImageAtPoint(sprites[28], cloudX[i],ty+28+cloudY[i], 119,12,  24,9);
							
						
						cloudX[i]-=(i+1);
						if (cloudX[i]<(lowDisplayW>>1)-60) {
							cloudX[i]=(lowDisplayW>>1)+40+getRandom(32);
							cloudY[i]=getRandom(32);
						}
						
					}
					endClip();


				// GO sign
				fxUpdate();
				fxRender(1);
				
				
				if (menuSelected1!=-1 && (!myWorld.isCOOP || menuSelected2!=-1 || (menuReady1 && menuReady2) )) {


					// GO!
					if (!myWorld.isCOOP || (menuReady1 && menuReady2)) {
						tx=(lowDisplayW>>1)-15;
						ty=58;
						
						if (worldTicks%32<16) {
							renderSubImageAtPoint(sprites[28], tx,ty, 285,0, 31,19);
						}
					}
					
					
					if (   (touchReleased && touchX>=tx && touchY>=ty && touchX<=tx+32 && touchY<=ty+58 && !myWorld.isCOOP) 
						|| (actionButton2 && !actionButton2Locked) 
						|| (menuReady1 && menuReady2) 
						) {
						if (actionButton2) actionButton2Locked=true;
						else touchReleased=false;
						playSound('FX_COIN');
						
						menuReady1=false;
						menuReady2=false;
						initGame(menuSelected1,menuSelected2);
					}

					if (worldTicks%18==0) {
						fxAdd((lowDisplayW>>1)-7, 50+58, FX.fENTRY, 0);
					}
					
				} else {
					// select your soldier
					if (worldTicks%32<16) {
						tx=(lowDisplayW>>1)-54;
						ty=50+38;
						renderSubImageAtPoint(sprites[30], tx,ty, 125,56, 109,14);
					}
				}
			
			
			
				// v1.3.0
				if (!myWorld.isCOOP && controllersFound>1) {
					if (worldTicks%48<24) {
						// shoot to join
						tx=lowDisplayW-48;
						ty=8;
						renderSubImageAtPoint(sprites[30], tx,ty, 51,99, 32,15);
					}
				}

				renderMenuOptions();				

			break;


			
			case INSETTINGS:
				if (nextState!=INPAUSE) {	
					drawPaint(255,0,0,0);
					renderBackground();
					// render soldiers
					renderSoldiersNonactive();
				} else {
					drawPaint(255,74,79,75);
				}
				
				
				if (upPressed && !upLocked && menuSettingsItem>0) {
					upLocked=true;
					menuSettingsItem--;
					playSound('FX_PLOP');
				}
				if ( (downPressed && !downLocked) && 
					((menuSettingsItem<2 && controllersFound>0) ||
					(menuSettingsItem<2 && controllersFound==0) ||
					(isDemo && nextState!=INPAUSE && menuSettingsItem<3)
					))  {
					downLocked=true;
					menuSettingsItem++;
					playSound('FX_PLOP');
				}
				
				
				// menu options
				ty=16;
				tx=(lowDisplayW>>1)-54;
				
				// objectives
				if (menuSettingsItem==0) 
					renderSubImageAtPoint(sprites[30], tx,ty, 0,194, 108,17);
				else 
					renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);

				renderSubImageAtPoint(sprites[30], tx+54-20,ty+5, 0,159, 41,7);
				if ((touchReleased && touchX>=tx && touchY>=ty && touchX<=tx+108 && touchY<=ty+17) 
					|| (actionButton2 && !actionButton2Locked && menuSettingsItem==0)
					){
					if (actionButton2) actionButton2Locked=true;
					else touchReleased=false;
					playSound('FX_PLOP');
					if (nextState!=INPAUSE) {
						fetchMissions(-1);
						initMissions(); //All();
					} else {
						initMissions();
					}
				}
				
				ty+=24;
				// audio
				if (menuSettingsItem==1) 
					renderSubImageAtPoint(sprites[30], tx,ty, 0,194, 108,17);
				else 
					renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
				if (activePlayer.useMusic) {
					renderSubImageAtPoint(sprites[30], tx+54-26,ty+5, 0,211, 53,7);
				} else if (activePlayer.useSFX) {
					renderSubImageAtPoint(sprites[30], tx+54-25,ty+5, 0,218, 54,7);
				} else {
					renderSubImageAtPoint(sprites[30], tx+54-15,ty+5, 0,225, 29,7);
				}
				if ((touchReleased && touchX>=tx && touchY>=ty && touchX<=tx+108 && touchY<=ty+17) 
					|| (actionButton2 && !actionButton2Locked && menuSettingsItem==1)
					){
					if (actionButton2) actionButton2Locked=true;
					else touchReleased=false;
					playSound('FX_PLOP');

					if (activePlayer.useMusic) {
						if (nextState==INMAINMENU) stopBackground();
						activePlayer.useMusic=false;
						playSound('FX_ACHIEVE');
					} else {
						if (activePlayer.useSFX) {
							activePlayer.useSFX=false;
							playSound('FX_ACHIEVE');
						} else {
							activePlayer.useSFX=true;
							activePlayer.useMusic=true;
							playSound('FX_ACHIEVE');
							if (nextState==INMAINMENU) playBackground();
						}
					} 
					
					activePlayer.saveSettings();
				}

				
				//if (controllersFound>0) {
					ty+=24;
					// button settings / controls
					if (menuSettingsItem==2) 
						renderSubImageAtPoint(sprites[30], tx,ty, 0,194, 108,17);
					else 
						renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
	
					renderSubImageAtPoint(sprites[30], tx+54-16,ty+5, 86,166, 33,7);
	
					if ((touchReleased && touchX>=tx && touchY>=ty && touchX<=tx+108 && touchY<=ty+17) 
						|| (actionButton2 && !actionButton2Locked && menuSettingsItem==2)
						){
						if (actionButton2) actionButton2Locked=true;
						else touchReleased=false;
						playSound('FX_PLOP');
						menuSelected1=-1;
						// for chromeos/desktop this needs bt-controller input
						
						if (controllersFound>0) {
							joystickSettings=0;
							GameState=INJOYSTICK;
						} else {
							GameState=INCONTROLKEYS;
						}
						
					}
				//}			
							

			
				if (isDemo) {
						ty+=24;
						dest.set(tx,ty,tx+108,ty+17);
						if (menuSettingsItem==3) src.set(0,194, 108,211);
						else src.set(0,128, 108,145);
						drawBitmap(sprites[30],src,dest);
						src.set(54,218, 97,225);
						dest.set(tx+54-21, ty+5,  tx+54+22, ty+5+7);
						drawBitmap(sprites[30],src,dest);
						if ((touchReleased && touchX>=tx && touchY>=ty && touchX<=tx+108 && touchY<=ty+17) 
								|| (actionButton2 && !actionButton2Locked && menuSettingsItem==3)
								){
								if (actionButton2) actionButton2Locked=true;
								else touchReleased=false;
								playSound('FX_PLOP');
								
								menuSlide1=0;
								menuSlide2=200;
								GameState=INUPSELL;
						}
					}
				
				
				
				
				
				renderMenuOptions();
			break;
			
	
			case INITMAP:
				paused = false;
	
				statusBarY=-80;
				statusBarTarget=0;
				
				loadWorld();
				lastWorld=world;
				
				if (world>0) setChapter();

				// activate those beacons!
				if (!myWorld.inTutorial) {
					if (worldOrder[world]==1 && level==1) generalInit(1);
					else if (level==3) generalInit(4);	 // end boss
					else generalInfo=0;
				}
				
				activePlayer.saveSettings();

				
				playBackground();
				GameState = INGAME;
			break;
			
			
			
			case INPAUSE:
				renderScene();
				drawPaint(160,0,0,0);
				setAlpha(255);
				
				if (menuSettingsItem>2) {
					menuSettingsItem=0; 
				}
				
				if (leftPressed && !leftLocked) {
					leftLocked=true;
					if (menuSettingsItem>1) {
						playSound('FX_PLOP');
						menuSettingsItem--;
					} else {
						menuSettingsItem=1;
					}
				}
				
				if (rightPressed && !rightLocked) {
					rightLocked=true;
					if (menuSettingsItem<2) {
						playSound('FX_PLOP');
						menuSettingsItem++;
					}
				}				
				
				
				// current objectives
				if (!myWorld.isCOOP) {
					tx=(lowDisplayW>>1)-54;
					ty=25;
					// background bar (missions)
					renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
					tx=(lowDisplayW>>1)-41;
					renderSubImageAtPoint(sprites[30], tx,ty+1, 0,180, 82,14);
					
					tx=(lowDisplayW>>1)-54;
					done=false;
					ty=52;
					
					for (var i=0; i<3; i++) {
						splashY=activePlayer.getMission(i);

						if (splashY!=-1) {
							// v1.3.0 
							done=true;
							tx=(lowDisplayW>>1)-54;
							//ty=52+(i*18);
						
							// background bar
							renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
						
							// render completion star
							if (!activePlayer.isAchieved( splashY )) {
								renderSubImageAtPoint(sprites[30], tx+4,ty+4, 66,145, 10,10);
							} else {
								renderSubImageAtPoint(sprites[30], tx+4,ty+4, 76,145, 10,10);
							}
						
							renderAchievement(tx+20,ty+6,splashY);
							ty+=18;
						}
					}
					
					// v1.3.0
					if (!done) {
						renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
						renderAchievement(tx+20,ty+6,-888);
					}
					
				}
				
				
				
				renderMenuOptions();
			break;
			
			
			
			case INCONTINUE:
				renderScene();
				
				// render continue
				tx=(lowDisplayW>>1)-37;
				ty=(lowDisplayH>>1)-14;
				renderSubImageAtPoint(sprites[30], tx,ty, 34,114, 74,14);
				
				// countdown
				tx=(lowDisplayW>>1)-6;
				ty+=16;
				renderSubImageAtPoint(sprites[30], tx,ty, continueUseCount*12,11,  12,14);
				
				// render "yes"
				tx=(lowDisplayW>>1)-15;
				ty+=16;
				renderSubImageAtPoint(sprites[29], tx,ty, 60,0, 30,30);
				tx+=9;
				ty+=8;
				renderSubImageAtPoint(sprites[29], tx,ty, 80,46, 12,14);
				
				if ((touchReleased && touchX>=tx-16 && touchY>=ty-16 && touchX<=tx+48 && touchY<=ty+48)
					|| (actionButton2 && !actionButton2Locked) || (actionButton1 && !actionButton1Locked)) {
					if (actionButton2) actionButton2Locked=true;
					else if (actionButton1) actionButton1Locked=true;
					else touchReleased=false;

					playSound('FX_ACHIEVE');
					
					// player jumps back in
					myPlayer.Died=false;
					myPlayer.gameReset();
					myPlayer.resetForLevel();
					myPlayer.init(myPlayer.x>>4, -3);
					myPlayer.onChute=true;
					myPlayer.coins=0;
					
					paused=false;
					GameState=INGAME;
				}
				
				
				if (secondPassed) {
					continueUseCount--;
					secondPassed=false;
					if (continueUseCount==0) {
						stopBackground();
						initMenu();
						menuSlide1=200;
						menuSlide2=0;
						nextState=INMAINMENU;
						uploadHighscore();

						if (GameState!=INDIED) initMissions();
					}
				}
				
				if (backPressed && !backLocked) {
					backLocked=true;
					stopBackground();
					initMenu();
					initMissions();
					menuSlide1=200;
					menuSlide2=0;
					nextState=INMAINMENU;
				}
			break;
			
			
			case INMISSIONS:
				drawPaint(255,0,0,0);
				
				missionAge++;
				
				renderBackground();

				drawPaint(200,0,0,0);
				
				
				tx=(lowDisplayW>>1)-54;
				ty=25;
				// background bar (missions)
				renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
				
				tx=(lowDisplayW>>1)-41;
				renderSubImageAtPoint(sprites[30], tx,ty+1, 0,180, 82,14);
				
				tx=(lowDisplayW>>1)-54;

				// v1.3.0
				ty=52;
				done=false;
				
				for (var i=0; i<3; i++) {
					setAlpha(missionAlpha[i]);
					
					if (activePlayer.getMission(i)>=0) {
					
						done=true;
						
						if (missionY[i]>ty) {
							missionY[i]-=(missionY[i]-ty)>>1;
							if (missionY[i]<=ty+4) missionY[i]=ty;
						}
						
						tx=missionX[i];
						ty=missionY[i];
						// background bar
						renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
						
						
						// store current achievement id for faster processing 
						splashY=activePlayer.getMission(i);
						
						// render completion star
						
						if (!activePlayer.isAchieved( splashY ) || missionAge<8+(i*8)) {
							renderSubImageAtPoint(sprites[30], tx+4,ty+4, 66,145, 10,10);
						} else {
							if (missionAge==8+(i*8)) playSound('FX_CHYMLOCK');
							renderSubImageAtPoint(sprites[30], tx+4,ty+4, 76,145, 10,10);
						}
						 
						
						renderAchievement(tx+20,ty+6,splashY);
						
	
						
						if (nextState!=INPAUSE) {
							if (activePlayer.isAchieved( splashY ) && missionAge>64+(i*8)) {
								tx=(lowDisplayW>>1)-52;
								missionX[i]-= (tx-missionX[i]);
								missionAlpha[i]-=24;
								if (missionAlpha[i]<0) {
									missionAlpha[i]=0;
		
									if (missionAge>96) {
										activePlayer.setMission(i, -1);
										fetchMissions(i);
										missionY[i]=200+(i*100);
										missionX[i]=(lowDisplayW>>1)-54;
										missionAlpha[i]=255;
									}
								}
							} else if (splashY<0) {
								if (missionAge>96) {
									activePlayer.setMission(i, -1);
									fetchMissions(i);
									missionY[i]=200+(i*100);
									missionX[i]=(lowDisplayW>>1)-54;
									missionAlpha[i]=255;
								}
							}
						}
						setAlpha(255);
						
						ty+=18;
					}
				}

				// v1.3.0
				if (!done) {
					renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
					renderAchievement(tx+20,ty+6,-888);
				}
				
				// swap bars based on achievement id?
				if (activePlayer.getMission(2)<activePlayer.getMission(1)) swapMissions(2,1);
				if (activePlayer.getMission(1)<activePlayer.getMission(0)) swapMissions(1,0);
				
					
				if ( (nextState!=INITMAP && nextState!=INANIMATION) || (missionAge>96) ) {
					renderMenuOptions();
					
					if ((rightPressed && !rightLocked) || (actionButton2 && !actionButton2Locked)) {
						if (actionButton2) actionButton2Locked=true;
						else rightLocked=true;
						
						playSound('FX_COIN');
						menuSlide1=200;
						menuSlide2=0;
						GameState=nextState;
						if (nextState==INANIMATION) initAnimation();
					}
					
					
					if (nextState==INMENU && backPressed && !backLocked) {
						backLocked=true;
						playSound('FX_COIN');
						menuSlide1=200;
						menuSlide2=0;
						GameState=nextState;
					}
				}
			break;
			
			
			
			case INALLMISSIONS:
				drawPaint(255,74,79,75);
				
				
				missionAge++;
				
				tx=(lowDisplayW>>1)-54;
				ty=2;
				// background bar (missions)
				renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
				tx=(lowDisplayW>>1)-41;
				renderSubImageAtPoint(sprites[30], tx,ty+1, 0,180, 82,14);
				
				// completed count
				setDigits(activePlayer.completedCount, scoreboard);
//				tx=(lowDisplayW-64);
				tx=lowDisplayW-( (2*14)+6);
				ty=2;
				foundFirst=false;
				for (var i = 3; i<6; i++) {
					if (foundFirst || scoreboard[i]!=0 || i==5) {
						foundFirst=true;
						renderSubImageAtPoint(sprites[30], tx,ty, 54+(scoreboard[i]*6),0,  6,7);
						tx+=7;
					}
				}
				
				// /
				renderSubImageAtPoint(sprites[30], tx,ty, 94,25, 4,7);
				
				tx+=6;
				// total achievements
				setDigits(PlayerProfile.A_MAXACHIEVEMENTS, scoreboard);
				foundFirst=false;
				for (var i = 3; i<6; i++) {
					if (foundFirst || scoreboard[i]!=0 || i==5) {
						foundFirst=true;
						renderSubImageAtPoint(sprites[30], tx,ty, 54+(scoreboard[i]*6),0, 6,7);
						tx+=7;
					}
				}
				
				
				tx=(lowDisplayW>>1)-54;
				
				splashY=menuSelected1;
				
				ty=24; //+menuSelectedY1;
				while (ty<lowDisplayH-32 && splashY<PlayerProfile.A_MAXACHIEVEMENTS) {
					// background bar
					renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
					
					// render completion star
					if (!activePlayer.isAchieved( splashY ) ) {
						renderSubImageAtPoint(sprites[30], tx+4,ty+4, 66,145, 10,10);
					} else {
						renderSubImageAtPoint(sprites[30], tx+4,ty+4, 76,145, 10,10);
					}
					 
					
					renderAchievement(tx+20,ty+6,splashY);
					
					ty+=18;
					splashY++;
				}
				
				setAlpha(200);
				// touch controls
				if (!keyBoardOut) {
					// left
					if (menuSelected1>0) {
						tx=8;
						ty=(lowDisplayH>>1)-19;
						renderSubImageAtPoint(sprites[29], tx,ty, 0,0, 30,30);
						if (touchReleased && touchX>=tx-8 && touchY>=ty && touchX<=tx+38 && touchY<=ty+38) {
							touchReleased=false;
							playSound('FX_COIN');
							
							menuSelected1-=6;
							if (menuSelected1<0) menuSelected1=0;
						}
					}
					
					// right
					if (menuSelected1+6<PlayerProfile.A_MAXACHIEVEMENTS) {
						tx=lowDisplayW-38;
						ty=(lowDisplayH>>1)-19;
						renderSubImageAtPoint(sprites[29], tx,ty, 30,0, 30,30);
						if (touchReleased && touchX>=tx-8 && touchY>=ty && touchX<=lowDisplayW && touchY<=ty+38) {
							touchReleased=false;
							playSound('FX_COIN');
							menuSelected1+=6;
						}
					}
				}
				setAlpha(255);
				
				if (leftPressed && !leftLocked) {
					leftLocked=true;
					playSound('FX_COIN');
					if (menuSelected1>0) {
						menuSelected1-=6;
						if (menuSelected1<0) menuSelected1=0;
					}
				}				
				
				if (rightPressed && !rightLocked) {
					rightLocked=true;
					playSound('FX_COIN');
					if (menuSelected1+6<=PlayerProfile.A_MAXACHIEVEMENTS) {
						menuSelected1+=6;
					}
				}
				
				
				// render menu bar
				tx=(lowDisplayW>>1)-32;
				ty=lowDisplayH-12;
				renderSubImageAtPoint(sprites[28], tx,ty, 316,0, 64,12);
				// render side bars
				while (tx>0) {
					tx-=64;
					renderSubImageAtPoint(sprites[28], tx,ty, 316,12, 64,12);
				}
				tx=(lowDisplayW>>1)+32;
				while (tx<lowDisplayW) {
					renderSubImageAtPoint(sprites[28], tx,ty, 316,12, 64,12);
					tx+=64;
				}


				if ((touchReleased && touchX>80 && touchY>lowDisplayH-16 && touchY<=lowDisplayH && touchX<=lowDisplayW-80) ||
					(backPressed && !backLocked) || (menuPressed && !menuLocked)
					){
					if (backPressed) backLocked=true;
					else if (menuPressed) menuLocked=true;
					else touchReleased=false;
					playSound('FX_PLOP');
					GameState=nextState;
					playSound('FX_PLOP');
					menuSettingsItem=0; 
				}

			break;
			
			case INCONTROLKEYS:
				drawPaint(255,0,0,0);
				renderBackground();
				renderSoldiersNonactive();
				
				// render the controller help on screen
				tx=(lowDisplayW>>1)-120;
				ty=(lowDisplayH>>1)-84;
				dest.set(tx,ty,tx+240,ty+124);
				src.set(0,0,240,124);
				drawBitmap(hwImage, src,dest);
				
				renderMenuOptions();
			break;
			
			
			case INCONTROLS:
				drawPaint(255,0,0,0);
				renderBackground();
				renderSoldiersNonactive();
				
				
					if (menuSelected1>=0) {
						if (touchReleased) menuSelected1=-1;
						else {
							activePlayer.stickX[menuSelected1]=touchX+menuSelectedY1;
							activePlayer.stickY[menuSelected1]=touchY+menuSelectedY2;
						}
					}
					
					
					for (var button=4; --button>=0;) {
						tx = activePlayer.stickX[button];
						ty = activePlayer.stickY[button];
						
						
						if (menuSelected1<0 && touchX>=tx && touchY>=ty && touchX<=tx+30 && touchY<=ty+30) {
							menuSelected1=button;
							touchReleased=false;
							menuSelectedY1=tx-touchX;
							menuSelectedY2=ty-touchY;
						}
						
						switch (button) {
							case 0 : // left
								setAlpha(120);
								renderSubImageAtPoint(sprites[29], tx,ty, 0,0, 30,30);
	
								setAlpha(255);
								renderSubImageAtPoint(sprites[30], tx+8,ty+8, 84,60, 10,14);
							break;
							
							case 1 : // right
								setAlpha(120);
								renderSubImageAtPoint(sprites[29], tx,ty, 30,0, 30,30);
								
								setAlpha(255);
								renderSubImageAtPoint(sprites[29], tx+12,ty+8, 94,60, 10,14);
							break;
	
							case 2 : // up
								setAlpha(120);
								renderSubImageAtPoint(sprites[29], tx,ty, 60,0, 30,30);
								
								setAlpha(255);
								renderSubImageAtPoint(sprites[30], tx+8,ty+10, 104,60, 14,10);
							break;
	
							case 3 : // fire
								setAlpha(120);
								renderSubImageAtPoint(sprites[29], tx,ty, 60,0, 30,30);
								
								setAlpha(255);
								renderSubImageAtPoint(sprites[30], tx,ty, 104,70, 14,14);
							break;
						}
					}
					
					
					
					ty=32;
					tx=(lowDisplayW>>1)-60;
					renderSubImageAtPoint(sprites[30], tx,ty, 125,41, 121,14);
					
					// RESET
					ty+=20;
					tx=(lowDisplayW>>1)-54;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
					renderSubImageAtPoint(sprites[30], tx+54-10,ty+5, 54,211, 21,7);
					if ((touchReleased && touchX>=tx && touchY>=ty && touchX<=tx+108 && touchY<=ty+17) 
						|| (actionButton2 && !actionButton2Locked && menuSettingsItem==0)
						){
						if (actionButton2) actionButton2Locked=true;
						else touchReleased=false;
						playSound('FX_PLOP');
						activePlayer.resetControls(lowDisplayW, lowDisplayH);
					}
					
					
					// DONE
					ty+=20;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
					renderSubImageAtPoint(sprites[30], tx+54-8,ty+5, 76,211, 17,7);
					if ((touchReleased && touchX>=tx && touchY>=ty && touchX<=tx+108 && touchY<=ty+17) 
						|| (actionButton2 && !actionButton2Locked && menuSettingsItem==1)
						){
						if (actionButton2) actionButton2Locked=true;
						else touchReleased=false;
						playSound('FX_PLOP');
						menuSettingsItem=-1;
						menuSelected1=-1;
						GameState=INSETTINGS;
						activePlayer.saveSettings();
					}
					
					// KEY setup
					ty+=20;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,128, 108,17);
					renderSubImageAtPoint(sprites[30], tx+54-32,ty+5, 104,85, 64,7);
					if ((touchReleased && touchX>=tx && touchY>=ty && touchX<=tx+108 && touchY<=ty+17) 
						|| (actionButton2 && !actionButton2Locked && menuSettingsItem==1)
						){
						if (actionButton2) actionButton2Locked=true;
						else touchReleased=false;
						playSound('FX_PLOP');
						menuSettingsItem=-1;
						menuSelected1=-1;
						GameState=INCONTROLKEYS;
						activePlayer.saveSettings();
					}
					
				
			break;
			
			
			case INANIMATION:
				drawPaint(255,0,0,0);
				
				// render picture
				tx=(lowDisplayW>>1)-74;
				ty=statusBarY;
				renderSubImageAtPoint(sprites[26], tx,ty, 0,0, 148,75);
				
				if (statusBarY<statusBarTarget) {
					statusBarY+=(statusBarTarget-statusBarY)>>2;
					if (statusBarY>=statusBarTarget-4) {
						statusBarY=statusBarTarget;
						generalDelay=1;
					}
				} else if (statusBarY>statusBarTarget) {
					statusBarY-=generalDelay;
					generalDelay=generalDelay<<1;
				}
				
				if (generalAlpha<generalAlphaTarget) {
					generalAlpha+=8;
					if (generalAlpha>=generalAlphaTarget) generalAlpha=generalAlphaTarget;
				} else if (generalAlpha>generalAlphaTarget) {
					generalAlpha-=8;
					if (generalAlpha<=generalAlphaTarget) {
						generalAlpha=generalAlphaTarget;
						stopBackground();
						GameState=INITMAP;
					}
				}
				
				// text
				setAlpha(generalAlpha);
				tx=(lowDisplayW>>1)-64;
				ty=74;
				renderSubImageAtPoint(sprites[26], tx,ty, 0,75, 128,53);
				setAlpha(255);
				
				// play button
				tx=lowDisplayW-16;
				ty=(lowDisplayH)-30;
				renderSubImageAtPoint(sprites[30], tx,ty, 94,60, 10,14);
				if ((touchReleased && touchX>=tx-16 && touchY>=ty-8 && touchX<=tx+48 && touchY<=ty+22) 
					|| (actionButton2 && !actionButton2Locked)) {
					if (actionButton2) actionButton2Locked=true;
					else touchReleased=false;
					playSound('FX_PLOP');
					generalAlphaTarget=0;
					statusBarTarget=-200;
				}				
			break;
			
			

			case INDIED:
				// environment stuff (rain, snow, )
				if (myWorld.worldAge%4==0 && !myWorld.isInDoor && myWorld.world<100) {
					if (worldOrder[world]==1) bulletAdd(Bullets.OWNER_ANYONE, Bullets.bRAINDROP, myWorld.worldOffset+getRandom(lowDisplayW), myWorld.worldOffsetY-(11+getRandom(16)), 0); // raindrop
					if (worldOrder[world]==3) bulletAdd(Bullets.OWNER_ANYONE, Bullets.bRAINDROP, myWorld.worldOffset+getRandom(lowDisplayW), myWorld.worldOffsetY-(11+getRandom(16)), 1);	// snowflake
				}
				
				// position world 
				myWorld.SlowMotion=false;
				myWorld.slowMoFactor=0;
				myWorld.lockScreen=-1;

				bulletUpdate();
				monsterUpdate();

				fxUpdate();
				
				renderScene();
				
				if (generalAlpha<=generalAlphaTarget) {
					generalAlpha+=8;
					if (generalAlpha>=generalAlphaTarget) {
						generalAlpha=generalAlphaTarget;
						if (generalDelay>0) generalDelay--;
						else generalAlphaTarget=0;
					}
				} else if (generalAlpha>generalAlphaTarget) {
					generalAlpha-=24;
					if (generalAlpha<=generalAlphaTarget) {
						generalAlpha=0;

						stopBackground();
						initMenu();
						menuSlide1=200;
						menuSlide2=200;
						nextState=INMAINMENU;
						initMissions();
					}
				}				

				ty=(lowDisplayH>>1)-20;
				// shadebar
				drawRect(0,ty,displayW,ty+32,makeRGBA(0,0,0, generalAlpha));
				setAlpha(255);
				
				ty+=8;
				tx=(lowDisplayW>>1)-34;
				renderSubImageAtPoint(sprites[30], tx,ty, 0,232, 67,7);
				
				setDigits(myPlayer.score, scoreboard);
				tx = (lowDisplayW>>1)- ((6-statusBarY)*6);
				ty +=8;
				for (var i = statusBarY; i < 6; i++) {
					renderSubImageAtPoint(sprites[30], tx,ty, scoreboard[i]*12,11, 12,14);
					tx += 12;
				}
				
				
				if (touchReleased && touchX>0 && touchY>0) {
					touchReleased=false;
					generalAlphaTarget=0;
				}
			break;
			
			
			case INJOYSTICK:
				drawPaint(255,0,0,0);	
				renderBackground();
				renderSoldiersNonactive();

				// controller
				tx=(lowDisplayW>>1)-6;
				ty+=48-20;
				
				if (twoPlayerController) {
					tx-=7;
					dest.set(tx,ty,tx+12,ty+12);
					src.set(160,84, 172,96);
					drawBitmap(sprites[28],src,dest);
					
					if (joystickSettings<8) {
						dest.set(tx,ty-13,tx+8,ty-2);
						src.set(269,140, 277,151);
						drawBitmap(sprites[1],src,dest);
					}
					
					tx+=14;
				}
				
				dest.set(tx,ty,tx+12,ty+12);
				src.set(160,84, 172,96);
				drawBitmap(sprites[28],src,dest);
				
				if (twoPlayerController && joystickSettings>8) {
					dest.set(tx,ty-13,tx+8,ty-2);
					src.set(278,140, 286,151);
					drawBitmap(sprites[1],src,dest);
				}
				
				
				
				// speech box
				tx=(lowDisplayW>>1)-64;
				ty=(lowDisplayH>>1);
				dest.set(tx,ty,tx+128,ty+24);
				src.set(0,64,128,88);
				drawBitmap(sprites[25],src,dest);
				
				tx+=4;
				ty+=9;
				
				switch (joystickSettings) {
					case 0:	// define x_axis
						tx+=64-29;
						dest.set(tx,ty,tx+58,ty+5);
						src.set(0,0,58,5);
						drawBitmap(sprites[25],src,dest);

						// check for input
						if (pl1_stickX<-12 || pl1_stickX>12) {
							if (pl1_stickX<0) reverse_xaxis=false;
							else reverse_xaxis=true;
							
							joystickSettings++;
						}
					break;
					
					
					case 1: // define y_axis
						tx+=64-25;
						dest.set(tx,ty,tx+50,ty+5);
						src.set(0,6,50,11);
						drawBitmap(sprites[25],src,dest);

						// check for input
						if (pl1_stickY<-12 || pl1_stickY>12) {
							if (pl1_stickY<0) reverse_yaxis=false;
							else reverse_yaxis=true;
							joystickSettings++;
						}
					break;
					
					case 2: // action button
						tx+=64-36;
						dest.set(tx,ty,tx+72,ty+5);
						src.set(0,36,72,41);
						drawBitmap(sprites[25],src,dest);
						if (last_button!=-999) {
							button_a=last_button;
							last_button=-999;
							joystickSettings++;
						}
					break;					
					

					case 3: // jump button
						tx+=64-32;
						dest.set(tx,ty,tx+64,ty+5);
						src.set(0,59,64,64);
						drawBitmap(sprites[25],src,dest);
						if (last_button!=-999) {
							button_b=last_button;
							last_button=-999;
							joystickSettings++;
							joystickSettings=7;
						}
					break;

					case 7: // escape button
						tx+=64-36;
						dest.set(tx,ty,tx+74,ty+5);
						src.set(0,42,74,47);
						drawBitmap(sprites[25],src,dest);
						if (last_button!=-999) {
							button_c=last_button;
							last_button=-999;
							joystickSettings++;
							if (!twoPlayerController) joystickSettings=100;
							else {
								backPressed=false;
								worldTicks=0;
							}
						}
					break;					
					
					
					// delay between controllers
					case 8: 
						if (worldTicks>32) {
							joystickSettings++;
						}
					break;
					
					
					// 2nd controller
					case 9:	// define x_axis
						tx+=64-29;
						dest.set(tx,ty,tx+58,ty+5);
						src.set(0,0,58,5);
						drawBitmap(sprites[25],src,dest);

						// check for input
						if (pl2_last_axis!=-99 && (pl2_last_axis_value<-80 || pl2_last_axis_value>80)) {
								// one stick-direction defined
								pl2_x_axis=pl2_last_axis;
								if (pl2_last_axis_value<0) pl2_reverse_xaxis=false;
								else pl2_reverse_xaxis=true;
								joystickSettings++;
						}
					break;
					
					
					case 10: // define y_axis
						tx+=64-25;
						dest.set(tx,ty,tx+50,ty+5);
						src.set(0,6,50,11);
						drawBitmap(sprites[25],src,dest);

						// check for input
						if (pl2_last_axis!=pl2_x_axis && (pl2_last_axis_value<-80 || pl2_last_axis_value>80)) {
								// one stick-direction defined
								pl2_y_axis=pl2_last_axis;
								if (pl2_last_axis_value<0) pl2_reverse_yaxis=false;
								else pl2_reverse_yaxis=true;
								joystickSettings++;
						}
					break;
					
					case 11: // action button
						tx+=64-36;
						dest.set(tx,ty,tx+72,ty+5);
						src.set(0,36,72,41);
						drawBitmap(sprites[25],src,dest);
						if (pl2_last_button!=-999) {
							pl2_button_a=pl2_last_button;
							pl2_last_button=-999;
							joystickSettings++;
							joystickSettings=16;
						}
					break;					
					
					case 12: // d-pad left
						tx+=64-29;
						dest.set(tx,ty,tx+58,ty+5);
						src.set(0,12,58,17);
						drawBitmap(sprites[25],src,dest);
						if (pl2_last_button!=-999) {
							pl2_dpad_left=pl2_last_button;
							pl2_last_button=-999;
							joystickSettings++;
						}
					break;
					
					
					case 13: // d-pad right
						tx+=64-31;
						dest.set(tx,ty,tx+62,ty+5);
						src.set(0,24,62,29);
						drawBitmap(sprites[25],src,dest);
						if (pl2_last_button!=-999) {
							pl2_dpad_right=pl2_last_button;
							pl2_last_button=-999;
							joystickSettings++;
						}
					break;			
					
					
					case 14: // d-pad up
						tx+=64-25;
						dest.set(tx,ty,tx+50,ty+5);
						src.set(0,18,50,23);
						drawBitmap(sprites[25],src,dest);
						if (pl2_last_button!=-999) {
							pl2_dpad_up=pl2_last_button;
							pl2_last_button=-999;
							joystickSettings++;
						}
					break;					

					case 15: // d-pad down
						tx+=64-29;
						dest.set(tx,ty,tx+58,ty+5);
						src.set(0,30,58,35);
						drawBitmap(sprites[25],src,dest);
						if (pl2_last_button!=-999) {
							pl2_dpad_down=pl2_last_button;
							pl2_last_button=-999;
							joystickSettings++;
						}
					break;					


					case 16: // escape button
						tx+=64-36;
						dest.set(tx,ty,tx+74,ty+5);
						src.set(0,42,74,47);
						drawBitmap(sprites[25],src,dest);
						if (pl2_last_button!=-999) {
							pl2_button_c=pl2_last_button;
							pl2_last_button=-999;
							joystickSettings=100;
						}
					break;					
						
					
					
					default:
						
						activePlayer.controller1[4]=button_a;
						activePlayer.controller1[5]=button_b;
						activePlayer.controller1[6]=button_c;
						activePlayer.controller1[7]=button_d;
						activePlayer.controller1[8]=x_axis;
						activePlayer.controller1[9]=y_axis;
						if (reverse_xaxis) activePlayer.controller1[10]=1;
						else activePlayer.controller1[10]=0;
						if (reverse_yaxis) activePlayer.controller1[11]=1;
						else activePlayer.controller1[11]=0;
						
						
						activePlayer.controller2[4]=pl2_button_a;
						activePlayer.controller2[5]=pl2_button_b;
						activePlayer.controller2[6]=pl2_button_c;
						activePlayer.controller2[7]=pl2_button_d;
						activePlayer.controller2[8]=pl2_x_axis;
						activePlayer.controller2[9]=pl2_y_axis;
						if (pl2_reverse_xaxis) activePlayer.controller2[10]=1;
						else activePlayer.controller2[10]=0;
						if (pl2_reverse_yaxis) activePlayer.controller2[11]=1;
						else activePlayer.controller2[11]=0;
						
						
						activePlayer.useFullScreen=isFullScreen;
						activePlayer.saveSettings();
						
						playSound('FX_PLOP');
						menuSettingsItem=-1;
						menuSelected1=-1;
						GameState=INSETTINGS;
					break;
				}
				
				
				
				
				// esc - back
				/*
				tx=(lowDisplayW-38);
				ty=(lowDisplayH-20)+(200-menuSlide1);
				
				dest.set(tx,ty,tx+36,ty+7);
				src.set(218,8, 254,15);
				drawBitmap(sprites[30],src,dest);
				*/

				// quick hack to make menu stuff work
				/*
				GameState=INSETTINGS;
				renderMenuOptions();
				if (GameState!=INSETTINGS) {
					menuSettingsItem=-1;
					menuSelected1=-1;
					GameState=INSETTINGS;
				} else {
					GameState=INJOYSTICK;
				}
				*/
			break;
		
			// v1.3.1
			case INUPSELL:
				drawPaint(255,0,0,0);
				renderBackground();
				// render music-speaker
				renderSpeaker();
				
				// render advert
				tx=0;
				ty=0;
				dest.set(0,0,lowDisplayW,lowDisplayH);
				src.set(0,0,lowDisplayW,160);
				drawBitmap(upsellImage,src,dest);
				
				if (menuSettingsItem>2) {
					// v1.3.0
					menuSettingsItem=1;
				}
				
				if (leftPressed && !leftLocked) {
					leftLocked=true;
					if (menuSettingsItem>1) {
						playSound('FX_PLOP');
						menuSettingsItem--;
					} else {
						menuSettingsItem=1;
					}
				}
				
				if (rightPressed && !rightLocked) {
					rightLocked=true;
					if (menuSettingsItem<2) {
						playSound('FX_PLOP');
						menuSettingsItem++;
					}
				}
				
				renderMenuOptions();
			break;
			
		}

		
		renderUnlockedAchievement();
}

 
 
 
 
	function GameLoop() {
		doControlls();
		
		
		// environment stuff (rain, snow, )
		if (myWorld.worldAge%4==0 && !myWorld.isInDoor && myWorld.world<100) {
			if (worldOrder[world]==1) bulletAdd(Bullets.OWNER_ANYONE, Bullets.bRAINDROP, myWorld.worldOffset+getRandom(lowDisplayW), myWorld.worldOffsetY-(11+getRandom(16)), 0); // raindrop
			if (worldOrder[world]==3) bulletAdd(Bullets.OWNER_ANYONE, Bullets.bRAINDROP, myWorld.worldOffset+getRandom(lowDisplayW), myWorld.worldOffsetY-(11+getRandom(16)), 1);	// snowflake
		}
		
		
		myWorld.playersAliveCount=0;
		if (!myPlayer.Died && !myPlayer.onChute) {
			myWorld.playersAliveCount++;
			myWorld.lastPlayerAlive=1;
		} else if (myPlayer.Died && myWorld.isCOOP && myWorld.world<100 && !myPlayer2.Died)  {
			// no continue in Special worlds
			if (myPlayer.actionPressed && myPlayer.diedCounter==0 && !myWorld.isInDoor && myPlayer.hasContinue && myWorld.world<100) { //myPlayer.score>=50+(continueUseCount*50)) {
				myPlayer.Died=false;
				myPlayer.gameReset();
				myPlayer.resetForLevel();
				myPlayer.init(myPlayer2.x>>4, -3);
				myPlayer.onChute=true;
				myPlayer.hasContinue=false;
				
				//continueUseCount+=2;
			}
		}
		
		if (myWorld.isCOOP && !myPlayer2.Died) {
			myWorld.playersAliveCount++;
			myWorld.lastPlayerAlive=2;
		} else if (myPlayer2.Died && !myPlayer.onChute && myWorld.isCOOP && myWorld.world<100 && !myPlayer.Died){
			
			if (myPlayer2.actionPressed && myPlayer2.diedCounter==0 && !myWorld.isInDoor && myPlayer.hasContinue && myWorld.world<100) { // myPlayer.score>=50+(continueUseCount*50)) {
				myPlayer2.Died=false;
				myPlayer2.gameReset();
				myPlayer2.resetForLevel();
				myPlayer2.init(myPlayer.x>>4, -3);
				myPlayer2.onChute=true;

				myPlayer.hasContinue=false;
				//continueUseCount+=2;
			}
			
		}

		if (myWorld.playersAliveCount==0 && !myPlayer.onChute && !myPlayer2.onChute) statusBarTarget=-64;
		

		
		// render chapter info
		if (worldChapterAlpha<worldChapterAlphaTarget) {
			worldChapterAlpha+=12;
			if (worldChapterAlpha>=worldChapterAlphaTarget) {
				worldChapterAlpha=worldChapterAlphaTarget;
				worldChapterAlphaTarget=0;
				worldChapterDelay=24;
			}
		} else if (worldChapterAlpha>worldChapterAlphaTarget) {
			if (worldChapterDelay>0) worldChapterDelay--;
			else worldChapterAlpha-=16;
			if (worldChapterAlpha<worldChapterAlphaTarget) worldChapterAlpha=worldChapterAlphaTarget;
		}
		
		// animate statusbar (when players touch ground)
		
		if ((!myPlayer2.onChute || !myWorld.isCOOP || myPlayer2.Died) && !myPlayer.onChute && generalInfo==0) {
			if (statusBarY<=statusBarTarget) {
				statusBarY+=(statusBarTarget-statusBarY)>>1;
			} else if (statusBarY>statusBarTarget) {
				statusBarY+=(statusBarTarget-statusBarY)>>1;
			}
		}
		
		
		if (myPlayer.hasSpecialDrink && !myWorld.isInDoor) {
			myWorld.slowMoCountdown=16;
			myWorld.slowMoFactor=2;
		}
		
		
		// position world 
		if (myWorld.slowMoCountdown>0) myWorld.slowMoCountdown--;
		else {
			myWorld.SlowMotion=false;
			myWorld.slowMoFactor=0;
		}

		if (myPlayer.diedCounter>64 || myPlayer2.diedCounter>64) {
			myWorld.SlowMotion=true;
			myWorld.slowMoFactor=3;
		}
		
		
		if (myWorld.isInDoor) myWorld.lockScreen=0;
		
		
		// worldoffset is done different in 2 player mode
		if (myWorld.autoScroll) {
			myWorld.worldOffset+=3;
			myWorld.CameraTakeOver=true;
			if (myPlayer.x<myWorld.worldOffset-16) myPlayer.Died=true;
			if (myWorld.isCOOP && myPlayer2.x<myWorld.worldOffset-16) myPlayer2.Died=true;
		}
		
		myWorld.CameraIsView=false;
		if (!myWorld.CameraTakeOver){
			if (myWorld.playersAliveCount>1) {
				if (myPlayer2.x>myPlayer.x) {
					tx=myPlayer.x+((myPlayer2.x-myPlayer.x)>>1);
				} else {
					tx=myPlayer2.x+((myPlayer.x-myPlayer2.x)>>1);
				}
	
				if (myPlayer2.y>myPlayer.y) {
					ty=myPlayer.y+((myPlayer2.y-myPlayer.y)>>1);
				} else {
					ty=myPlayer2.x+((myPlayer.y-myPlayer2.y)>>1);
				}
	
				
				// horizontal
				if (myWorld.softLock>0) {
	
					if (!myPlayer.onChopper && !myPlayer2.onChopper) myWorld.worldOffset+= ((tx- (lowDisplayW>>1))-myWorld.worldOffset)>>2;
					if (myWorld.worldOffset>myWorld.softLock) myWorld.worldOffset=myWorld.softLock;
	
				} else if (myWorld.lockScreen<0) {
					
					if (!myPlayer.onChopper && !myPlayer2.onChopper) myWorld.worldOffset+=  ((tx- (lowDisplayW>>1))-myWorld.worldOffset)>>2;
				
				} else {
				
					tx=((myWorld.lockScreen)-myWorld.worldOffset)>>2;
					if (tx>4) tx=4;
					else if (tx<-4) tx=-4;
					myWorld.worldOffset+=tx;
					
				}
				
	
				if (myWorld.worldOffset<0) myWorld.worldOffset=0;
				else if (myWorld.worldOffset>(TileMap.MAPWIDTH<<4)-lowDisplayW) myWorld.worldOffset=(TileMap.MAPWIDTH<<4)-lowDisplayW;
				
	
				// vertical
				if (myWorld.lockVertical || myPlayer.onChute || myPlayer2.onChute) myWorld.worldOffsetY=myWorld.lockVerticalValue;
				else {
					if (myPlayer2.y<myPlayer.y) {
						myWorld.worldOffsetY+=((myPlayer2.y-80)-myWorld.worldOffsetY)>>2;
						if (myWorld.worldOffsetY<myPlayer.y-132) myWorld.worldOffsetY=myPlayer.y-132;
					} else {
						myWorld.worldOffsetY+=((myPlayer.y-80)-myWorld.worldOffsetY)>>2;
						if (myWorld.worldOffsetY<myPlayer2.y-132) myWorld.worldOffsetY=myPlayer2.y-132;
					}
				}
				
				if (myWorld.worldOffsetY>0) myWorld.worldOffsetY=0;
				
				if (myWorld.worldOffset<tx-12 || myWorld.lockScreen>0 || myWorld.softLock>0) myWorld.CameraIsView=true;
				
				myWorld.update();
				
			} else {
				if (myWorld.lastPlayerAlive==1) tmpPlayer=myPlayer;
				else tmpPlayer=myPlayer2;
				
				if (myWorld.softLock>0) {
					if (!tmpPlayer.onChopper) myWorld.worldOffset+=  ((tmpPlayer.x-128)-myWorld.worldOffset)>>2;
					if (myWorld.worldOffset>myWorld.softLock) myWorld.worldOffset=myWorld.softLock;
				} else if (myWorld.lockScreen<0) {
					if (!tmpPlayer.onChopper) myWorld.worldOffset+=  ((tmpPlayer.x-128)-myWorld.worldOffset)>>2;
				} else {
					tx=((myWorld.lockScreen)-myWorld.worldOffset)>>2;
					if (tx>4) tx=4;
					else if (tx<-4) tx=-4;
					myWorld.worldOffset+=tx;  
				}
				
				if (myWorld.lockVertical || tmpPlayer.onChute) myWorld.worldOffsetY=myWorld.lockVerticalValue;
				else myWorld.worldOffsetY+=((tmpPlayer.y-80)-myWorld.worldOffsetY)>>2;
				if (myWorld.worldOffsetY>0) myWorld.worldOffsetY=0;
				
				if (myWorld.worldOffset<tx-12 || myWorld.lockScreen>0 || myWorld.softLock>0) myWorld.CameraIsView=true;

				
				myWorld.update();
		
				
				if (myWorld.worldOffset<0) myWorld.worldOffset=0;
				else if (myWorld.worldOffset>(TileMap.MAPWIDTH<<4)-lowDisplayW) myWorld.worldOffset=(TileMap.MAPWIDTH<<4)-lowDisplayW;
	
			}
		} else {
			if (myWorld.worldOffset<0) myWorld.worldOffset=0;
			else if (myWorld.worldOffset>(TileMap.MAPWIDTH<<4)-lowDisplayW) myWorld.worldOffset=(TileMap.MAPWIDTH<<4)-lowDisplayW;
		}
		
		// start updating!
		myPlayer.update(myWorld, lowDisplayW);
		playPlayerSounds(myPlayer);

		// update player 2
		if (myWorld.isCOOP) {
			myPlayer2.update(myWorld, lowDisplayW);
			playPlayerSounds(myPlayer2);
		}
		
		
		

		myWorld.lockScreen=-1;

		bulletUpdate();
		monsterUpdate();

		fxUpdate();

		renderScene();


		if (myPlayer.atDoor && !activePlayer.getHint(PlayerProfile.HINT_ENTERBUILDINGS)) {
			generalInit(5);
			activePlayer.setHint(PlayerProfile.HINT_ENTERBUILDINGS);
		}
		
		
		
		if (myPlayer.score>=2500) unlockAchievement(PlayerProfile.A_SCORE2500PTS);
		if (myPlayer.score>=2000) unlockAchievement(PlayerProfile.A_SCORE2000PTS);
		if (myPlayer.score>=1000) unlockAchievement(PlayerProfile.A_SCORE1000PTS);
		if (myPlayer.score>=500) unlockAchievement(PlayerProfile.A_SCORE500PTS);
		
		if (myPlayer.chainKill>1) unlockAchievement(PlayerProfile.A_CHAINEXPLODE2);
		if (myPlayer.chainKill>2) unlockAchievement(PlayerProfile.A_CHAINEXPLODE3);
		
		if (myPlayer.inCover && myPlayer.onGround) unlockAchievement(PlayerProfile.A_TAKECOVER);
		
		if ((myPlayer.Died && myPlayer.diedCounter<=0)
			&& (!myWorld.isCOOP || (myPlayer2.Died && myPlayer2.diedCounter<=0)) ) {
			
			
			if (myWorld.world>100) endSecretWorld();
			else {
				
				if (myPlayer.hasContinue && !myWorld.isCOOP) {
					initContinue();
					myPlayer.hasContinue=false;
				} else if (isDemo) {
					stopBackground();
					initMenu();
					menuSlide1=0;
					menuSlide2=200;
					GameState=INUPSELL;
				} else {
					if (!myWorld.isCOOP) {
						uploadHighscore();
					} else {
						stopBackground();
						initMenu();
						nextState=INMAINMENU;
					}
				}

			}
			
		} else if (myPlayer.transport || myPlayer2.transport) {
			
			if (!myWorld.isCOOP && level<4) {
				activePlayer.maxLevelReached[myPlayer.characterID][worldOrder[world]]=level;
			}
			
			myPlayer.resetForLevel();
			myPlayer2.resetForLevel();

			if (myWorld.world>100) {
				if (myWorld.world==101) unlockAchievement(PlayerProfile.A_BANANAS);
				endSecretWorld();
			} else {
				
				level++;
				nextState=INITMAP;
				menuSlide1=200;
				menuSlide2=200;
				
				
				if (level>3) {
					level=1;
					
					activePlayer.tours[myPlayer.characterID]++;
					
					if (worldOrder[world]==5) {
						if (myPlayer.characterID==0) unlockAchievement(PlayerProfile.A_BACOMPLETEHELL);
						else if (myPlayer.characterID==6) unlockAchievement(PlayerProfile.A_COMPLETEHELL);
					}
					
					
					
					// v1.3.1
					if (isDemo) {
						world=999; // trigger inupsell
						stopBackground();
						initMenu();
						nextState=INMAINMENU;
					} else {					
						
						world++;
						
						// restore player health
						myPlayer.gameReset();
						myPlayer2.gameReset();
		
						if (world>5) world=1;
						else {
							nextState=INANIMATION;
						}
					}
				}
				
				stopBackground();
				initMissions();
				
				if (world==999) {
					menuSlide1=0;
					menuSlide2=200;
					GameState=INUPSELL;
				}
				
			}
			
		}
		
		
		// transition indoors or to the next world
		if ((myPlayer.doorLoadRoom && !myPlayer.Died) 
			|| (myPlayer2.doorLoadRoom && !myPlayer2.Died) 
			) {

			// probably moving inside a building, loadworld takes care of that
			loadWorld();
		}

		if (SecretWorldLoad>0) loadSecretWorld(SecretWorldLoad);


		
		renderUnlockedAchievement();
	}







function destroyMap() {

	for (var i = fxList.length - 1; i >= 0; i--) {
		if (fxList[i]==null) fxList[i]=new FX();
		fxList[i].deleted = true;
	}
	for (var i = monsterList.length - 1; i >= 0; i--) {
		if (monsterList[i]==null) monsterList[i]=new Monster();
		monsterList[i].deleted = true;
	}
	for (var i = bulletList.length - 1; i >= 0; i--) {
		if (bulletList[i]==null) bulletList[i]=new Bullets(); 
		bulletList[i].deleted = true;
	}

	myWorld.reinit();

}



	function isMonsterFree( aX,  aY) {
		var isFree=true;
		
		for (var m=0; m<monsterList.length; m++) {
			if (!monsterList[m].deleted && !monsterList[m].died) {
				if (monsterList[m].x>>4==aX && monsterList[m].y>>4==aY) isFree=false;
			}
		}
		
		return isFree;
	}
	
	
	
	
	function monsterAdd( mType,  aX,  aY,  mSpriteSet,  mSubType) {
		var i = 0;
		while (i < monsterList.length && !monsterList[i].deleted) i++;
		if (i < monsterList.length) {
			monsterList[i].init(mType, aX, aY, mSpriteSet, mSubType, myWorld);
			return i;
		}
		return -1;
	}


	function monsterUpdate() {
		var i = 0;

		myWorld.worldActiveChyms=0;

		while (i < monsterList.length) {
			if (!monsterList[i].deleted && !monsterList[i].died && 
					monsterList[i].myType==Monster.mCHYM && 
					monsterList[i].aiState<2) myWorld.worldActiveChyms++;
			i++;
		}
		

		
		i=0;
		
		while (i < monsterList.length) {

			if (!monsterList[i].deleted) {
				if (!paused) {
					monsterList[i].update(myWorld, myPlayer, myPlayer2, lowDisplayW);

					if (monsterList[i].doFallSound) {
						monsterList[i].doFallSound = false;
						
						if (monsterList[i].myType==Monster.mTANK) {
							// used to trigger achievement unlock
							unlockAchievement(PlayerProfile.A_DRIVETANK);
						} else if (monsterList[i].myType==Monster.mDROPSHIP) {
							if (monsterList[i].subType==2) monsterAdd(Monster.mSOLDIER, -(monsterList[i].x+12),-(monsterList[i].y+14), 5, 5);
							else monsterAdd(Monster.mSOLDIER, -(monsterList[i].x+12),-(monsterList[i].y+14), 5, getRandom(2));
						}
						
					}

					if (monsterList[i].doHitSound) {
						monsterList[i].doHitSound = false;
						if (monsterList[i].myType==Monster.mCOIN) {
							playSound('FX_COIN2');
							if (myPlayer.coins>=175) unlockAchievement(PlayerProfile.A_COLLECT175COINS);
							if (myPlayer.coins>=150) unlockAchievement(PlayerProfile.A_COLLECT150COINS);
							if (myPlayer.coins>=125) unlockAchievement(PlayerProfile.A_COLLECT125COINS);
							if (myPlayer.coins>=100) unlockAchievement(PlayerProfile.A_COLLECT100COINS);
							if (myPlayer.coins>=75) unlockAchievement(PlayerProfile.A_COLLECT75COINS);
						} else if (monsterList[i].myType==Monster.mDROPSHIP) {
							if (monsterList[i].aiState==10) generalInit(3);
							else generalInit(2);
						} else if (monsterList[i].myType==Monster.mCHYM) {
							playSound('FX_CHYMLOCK');
							
							// last chym, so general is pleased
							if (myWorld.worldActiveChyms==1) generalInit(6);
							unlockAchievement(PlayerProfile.A_ACTIVATEBEACON);
								
						} else if (monsterList[i].myType==Monster.mAVATAR) {
							playSound('FX_CHYMLOCK');
						}
					}

					if (monsterList[i].doMoveSound) {
						monsterList[i].doMoveSound = false;
						if (monsterList[i].myType==Monster.mDROPSHIP || monsterList[i].myType==Monster.mBOSS4) playSoundPosition('FX_CHOPPER',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mBALLUP) playSoundPosition('FX_BOUNCE',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mMINE) playSoundPosition('FX_CLICK',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mBOSS2) playSoundPosition('FX_DRILL',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mBOSS3) playSoundPosition('FX_EXPLODE',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mBOSS7) playSoundPosition('FX_DRILL',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mBOSS6) playSoundPosition('FX_DRILL',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mDRUM) {
							bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, monsterList[i].x+8, monsterList[i].y, 0);
						} else if (monsterList[i].myType==Monster.mWORM) {
							playSoundPosition('FX_WORM', monsterList[i].x);
						} else if (monsterList[i].myType==Monster.mSOLDIER && level!=3) {
							unlockAchievement(PlayerProfile.A_AIRKILLDUDE);
						} else if (monsterList[i].myType==Monster.mFIREBALL) {
							playSound('FX_FLAME');
						} else if (monsterList[i].myType==Monster.mARCADE) {
							stopBackground();
							getMusic(true);
							playBackground();
							myPlayer.coins--;
						} else if (monsterList[i].myType==Monster.mCHICKEN) {
							playSoundPosition('FX_CHICK', monsterList[i].x);
						}
					}

					
					if (monsterList[i].doExplodeSound) {
						monsterList[i].doExplodeSound = false;
						if (monsterList[i].myType==Monster.mTRIPOD 
							|| monsterList[i].myType==Monster.mCRATE
							|| monsterList[i].myType==Monster.mBUILDING
							|| monsterList[i].myType==Monster.mBALLUP
							|| monsterList[i].myType==Monster.mDRUM
							|| monsterList[i].myType==Monster.mMINE 
							|| monsterList[i].myType==Monster.mBOUNCER
							|| (monsterList[i].myType>=Monster.mBOSS1 && monsterList[i].myType<=Monster.mBOSS5)
							) {
							
							if (getRandom(8)<4) playSoundPosition('FX_EXPLODE',monsterList[i].x);
							else playSoundPosition('FX_EXPLODE2',monsterList[i].x);
						}
						else if (monsterList[i].myType==Monster.mDROPSHIP && monsterList[i].aiState==11) { 
							// unlock achievement (level completed just have to get into the dropship)
							unlockAchievement( ((world-1)*3) + (level-1) );
							// also unlock the lower achievements (we obviously completed them now)
							tx=((world-1)*3) + (level-1);
							while (tx>0) {
								tx--;
								unlockAchievement(tx);
							}
							
							// unlock tutorial achievement
							if (myWorld.inTutorial) {
								myWorld.inTutorial=false;
								activePlayer.showTutorial=false;
								unlockAchievement(PlayerProfile.A_BOOTCAMP);
								activePlayer.saveSettings();
							}
							
						} 
						else playSoundPosition('FX_DIE',monsterList[i].x);
					}

					if (monsterList[i].doShoot) {
						monsterList[i].doShoot = false;
						if (monsterList[i].myType==Monster.mSOLDIER) {
							switch (monsterList[i].subType) {
								case 2:
									//playSoundPosition(FX_ROCKETSHOOT,monsterList[i].x);
									playSoundPosition('FX_FLAME',monsterList[i].x);
								break;
								case 3:
									playSoundPosition('FX_FLAME',monsterList[i].x);
								break;
								case 4:
									playSoundPosition('FX_LASER',monsterList[i].x);
								break;
								case 5:
									playSoundPosition('FX_FLAME3',monsterList[i].x);
								break;
							}
						}
						else if (monsterList[i].myType==Monster.mBALLUP) playSoundPosition('FX_LASER',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mTRIPOD) playSoundPosition('FX_BIGSHOOT2',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mWORM) {
							if (!activePlayer.getHint(PlayerProfile.HINT_TREMOR)) {
								generalInit(8);
								activePlayer.setHint(PlayerProfile.HINT_TREMOR);
							}
							playSoundPosition('FX_EXPLODE2',monsterList[i].x);
						} else if (monsterList[i].myType==Monster.mSTEAMPIPE || monsterList[i].myType==Monster.mBOSS7) playSoundPosition('FX_STEAM', monsterList[i].x);
						else if (monsterList[i].myType==Monster.mBOSS1 || monsterList[i].myType==Monster.mBOSS2 || monsterList[i].myType==Monster.mBOSS6) playSoundPosition('FX_BIGSHOOT',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mBOSS3) playSoundPosition('FX_FLAME',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mBOSS5) playSoundPosition('FX_WORM', monsterList[i].x);
						else if (monsterList[i].myType==Monster.mTANK) {
							if (monsterList[i].subType==2) playSoundPosition('FX_FLAME',monsterList[i].x);
							else playSoundPosition('FX_EXPLODE',monsterList[i].x);
						} else playSoundPosition('FX_SHOOT',monsterList[i].x);
					}


					if (monsterList[i].doLandSound) {
						monsterList[i].doLandSound = false;
						if (monsterList[i].myType==Monster.mBOUNCER) playSoundPosition('FX_BOUNCE',monsterList[i].x);
						else if (monsterList[i].myType==Monster.mBOSS6) playSoundPosition('FX_WORM', monsterList[i].x);
						else if (monsterList[i].myType==Monster.mARCADE) {
							generalInit(11);
						}
						// v1.3.0
						else if (monsterList[i].myType!=Monster.mTANK) playSoundPosition('FX_LAND',monsterList[i].x);
					}
			
				}
				

				
				if (monsterList[i].died) {
					monsterList[i].deleted = true;
				
					if (monsterList[i].myType==Monster.mCRATE) {
						if (monsterList[i].subType<0) {
							
							// unlocked a gunslug
							generalInit(10);
							activePlayer.unlockCharacter(-(monsterList[i].subType+1));
							activePlayer.saveSettings();
							
							monsterAdd(Monster.mAVATAR, monsterList[i].x+7,monsterList[i].y+4, 28,  (-monsterList[i].subType+99) );
							
						} else if (monsterList[i].subType>0) { 
							monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3, monsterList[i].subType-1);
						} else {
							tx=getRandom(80);
							if (tx<26) monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,1);
							else if (tx<70) monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,0);
						}
					}
					
					if (monsterList[i].myType==Monster.mSOLDIER && !myWorld.isPlatformer) {
						
						if (myPlayer.inTank) {
							myPlayer.driveCount++;
							if (myPlayer.driveCount>=5) unlockAchievement(PlayerProfile.A_DRIVEFIVEDUDES);
							if (myPlayer.driveCount>=10) unlockAchievement(PlayerProfile.A_DRIVETENDUDES);
						}
						
						if (myPlayer.killCount>=50) unlockAchievement(PlayerProfile.A_KILL50GUYS);
						else if (myPlayer.killCount>=20) unlockAchievement(PlayerProfile.A_KILL20GUYS);
						else if (myPlayer.killCount>=10) unlockAchievement(PlayerProfile.A_KILL10GUYS);
						
						if (myPlayer.grenadeKillCount>=10) unlockAchievement(PlayerProfile.A_KILL10GRENADES);
						
						tx=getRandom(72);
						ty=monsterList[i].subType;
						if (tx<32) {
							// spawn ammo, or a special weapon!
							switch (ty) {
								case 2: // grenades
									monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,5);
									if (!activePlayer.getHint(PlayerProfile.HINT_DROPPEDWEAPONS)) {
										generalInit(7);
										activePlayer.setHint(PlayerProfile.HINT_DROPPEDWEAPONS);
									}
								break;
								
								case 3: // flamethrower
									monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,2);
									if (!activePlayer.getHint(PlayerProfile.HINT_DROPPEDWEAPONS)) {
										generalInit(7);
										activePlayer.setHint(PlayerProfile.HINT_DROPPEDWEAPONS);
									}
								break;

								case 4: // electro gun
									monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,3);

									if (!activePlayer.getHint(PlayerProfile.HINT_DROPPEDWEAPONS)) {
										generalInit(7);
										activePlayer.setHint(PlayerProfile.HINT_DROPPEDWEAPONS);
									}
								break;
								
								case 5: // skull
									monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,6);

									if (!activePlayer.getHint(PlayerProfile.HINT_DROPPEDWEAPONS)) {
										generalInit(7);
										activePlayer.setHint(PlayerProfile.HINT_DROPPEDWEAPONS);
									}
								break;
								
								
								default:
									if (getRandom(100)<14 && !myWorld.inTutorial) {
										// double gun
										monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,7);
										if (!activePlayer.getHint(PlayerProfile.HINT_DROPPEDWEAPONS)) {
											generalInit(7);
											activePlayer.setHint(PlayerProfile.HINT_DROPPEDWEAPONS);
										}
									} else monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,1);
								break;
							}
						} else if (tx<40 && (level==3 || world==5 || world==1)) {
							monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,0);
						}
					}
					
					if (monsterList[i].myType==Monster.mJETPACK) {
						tx=getRandom(72);
						// v1.3.0
						if (tx<32 || (myWorld.level==1 && myWorld.world==3 && !activePlayer.didUnlockCharacter(5) && !characterUnlockAdded[5])) {
							// spawn a jetpack
							monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,4);
							if (!activePlayer.getHint(PlayerProfile.HINT_DROPPEDWEAPONS)) {
								generalInit(7);
								activePlayer.setHint(PlayerProfile.HINT_DROPPEDWEAPONS);
							}
							
							
							// setup an unlock area for Willis Kiyay?
							if (!myWorld.isCOOP && worldOrder[world]==3 && myPlayer.characterID!=5 && !activePlayer.didUnlockCharacter(5) && !characterUnlockAdded[5]) {
								// add a special platform way up in the sky
								tx=(monsterList[i].x>>4);
								monsterAdd(Monster.mPLATFORM, tx,-12,  7,0);
								monsterAdd(Monster.mCRATE, tx+1,-13, 12, -6);
								// v1.3.0
								playSound('FX_DIE');
								fxAdd(tx,0,FX.fHELP,0);
								characterUnlockAdded[5]=true;
							}
							
						}
					}
					
					if (monsterList[i].myType==Monster.mMINE
						|| monsterList[i].myType==Monster.mBOUNCER) 
						bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, monsterList[i].x+6, monsterList[i].y, 0);
					
					
					if (monsterList[i].myType==Monster.mTANK) {
						if (monsterList[i].aiState==901) {
							// spawn player tank!
							monsterAdd(Monster.mTANK, monsterList[i].x, monsterList[i].y, 12, 1);
						} else {
							if (worldOrder[world]==5) {
								myPlayer.hellTankCount++;
								
								if (myPlayer.hellTankCount>=5) unlockAchievement(PlayerProfile.A_DESTROY5HELLTANKS);
							}
						}
					}
					
					if (monsterList[i].myType==Monster.mWORM && monsterList[i].aiState>=900) {
						myPlayer.wormCount++;
						if (myPlayer.wormCount>=1) unlockAchievement(PlayerProfile.A_BLOWUPDEATHWORM);
					}
					
					
					if (monsterList[i].myType==Monster.mARCADE) {
						if (monsterList[i].aiState==2) {
							// Load ARCADE world
							SecretWorldLoad=1;
							// costs!
							myPlayer.coins-=25;
						}

						if (monsterList[i].aiState==10) {
							// Load Mario world
							SecretWorldLoad=2;
						}
						
						if (monsterList[i].aiState==11) {
							// award a continue
							playSound('FX_CHYMLOCK');
							if (myWorld.isCOOP) myPlayer.coins-=50;
							else myPlayer.coins-=100;
							myPlayer.hasContinue=true; // shared for 2 players
						}
						
						if (monsterList[i].aiState==13) {
							// special energy drink
							playSound('FX_CHYMLOCK');
							myPlayer.coins-=25;
							myPlayer.hasSpecialDrink=true; // shared for 2 players
							myPlayer.specialDrinkCounter=128;

							myPlayer2.hasSpecialDrink=true; // shared for 2 players
							myPlayer2.specialDrinkCounter=128;
							
							unlockAchievement(PlayerProfile.A_GRABENERGYDRINK);
						}
						
						if (monsterList[i].aiState==14) {
							// armor
							playSound('FX_CHYMLOCK');
							myPlayer.hasArmor=true;
							myPlayer.armorCounter=256;
							myPlayer2.hasArmor=true;
							myPlayer2.armorCounter=256;
							if (!myWorld.isCOOP) myPlayer.coins-=50;
							else myPlayer.coins-=100;
						}
						
						if (monsterList[i].aiState==16) {
							// ticket machine
							SecretWorldLoad=3;
							myPlayer.coins-=25;
						}

						if (monsterList[i].aiState==17) {
							// gameboy!
							myPlayer.coins-=50;
							SecretWorldLoad=4;
						}
						
						// v1.2.0 - dr who
						if (monsterList[i].aiState==18) {
							// gameboy!
							myPlayer.coins-=50;
							SecretWorldLoad=5;
						}

						// v1.3.0 - sketchworld
						if (monsterList[i].aiState==19) {
							// gameboy!
							myPlayer.coins-=50;
							SecretWorldLoad=6;
						}
						
					}
					
					if (monsterList[i].myType==Monster.mGENERAL) {
						generalInit(monsterList[i].subType);
					}
					
					if (monsterList[i].myType==Monster.mBALLUP && monsterList[i].aiState>=900) {
						myPlayer.mechBallCount++;
						if (myPlayer.mechBallCount>=8) unlockAchievement(PlayerProfile.A_KILLFOURMECHBALLS);
					}
					
					if (monsterList[i].myType==Monster.mDROPSHIP && monsterList[i].aiState>=900) {
						myPlayer.crashCount++;
						if (myPlayer.crashCount>=1) unlockAchievement(PlayerProfile.A_MAKECHOPPERCRASH);
					}
					
					if (monsterList[i].myType==Monster.mFIREBALL && monsterList[i].aiState>=900) {
						unlockAchievement(PlayerProfile.A_KILLFIRESKULL);
						myPlayer.skullCount++;
						
						if (myPlayer.skullCount>=5) unlockAchievement(PlayerProfile.A_KILL5SKULLS);
					}
					
					// v1.3.0
					if (monsterList[i].myType==Monster.mCHICKEN && monsterList[i].aiState>=900) {
						tx=getRandom(72);
						if (tx<32) {
							monsterAdd(Monster.mPICKUP,monsterList[i].x,monsterList[i].y,3,8);
							if (!activePlayer.getHint(PlayerProfile.HINT_DROPPEDWEAPONS)) {
								generalInit(7);
								activePlayer.setHint(PlayerProfile.HINT_DROPPEDWEAPONS);
							}
						}
					}
					
				} else {
					if (monsterList[i].myType==Monster.mCHYM && monsterList[i].aiState<2) myWorld.worldActiveChyms++;
				}

			}
			i++;
		}
	}

	
	function monsterRender( renderPass ) {
		var count;
		var i = 0;

		while (i < monsterList.length) {
			if (!monsterList[i].deleted	&& monsterList[i].renderPass == renderPass) {

				if (monsterList[i].visible) {
					tx = monsterList[i].x-myWorld.worldOffset;
					ty = monsterList[i].y-myWorld.worldOffsetY;

					
					setAlpha(monsterList[i].alpha);
					
					if (monsterList[i].myType==Monster.mBUILDING) {
						tx-=myWorld.shakeR;
						ty-=myWorld.shakeR;
					}

					if (monsterList[i].rotation != 0) {
						ctx.save();
						ctx.translate( (tx+(monsterList[i].w>>1))<<useMultiFactor, (ty+(monsterList[i].h>>1))<<useMultiFactor);
						ctx.rotate( convertToRadians(monsterList[i].rotation) );
						ctx.translate( -(tx+(monsterList[i].w>>1))<<useMultiFactor, -(ty+(monsterList[i].h>>1))<<useMultiFactor);
					}

					
					
					// tank
					if (monsterList[i].myType==Monster.mTANK && monsterList[i].aiState<10) {
						// add head behind the front
						if (monsterList[i].myDirection<0) {
							renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx+6,ty+1, 64,21, 12,8);
						} else {
							renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx+16,ty+1, 64,29, 12,8);
						}
					}

					// crate with Gunslug
					if (monsterList[i].myType==Monster.mCRATE && monsterList[i].subType<0) {
						renderSubImageAtPoint(sprites[28], tx+6,ty+4, 149+(-monsterList[i].subType*11),11, 11,12);
						
						if (monsterList[i].subType==-7) {
							// add chain to Sarge' crate
							while (ty>0) {
								ty-=16;
								renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx+7,ty, 78,54, 7,16);
							}
							ty = monsterList[i].y-myWorld.worldOffsetY;
						}
					}
					
					
					if (monsterList[i].myType==Monster.mBOSS6) {
						if (renderPass==0) {
							// render neck
							ty+=58;
							while (ty<160) {
								renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx+24,ty, 68,monsterList[i].yOffset+86, 45,29);
								ty+=29;
							}
							ty = monsterList[i].y-myWorld.worldOffsetY;
						}
					}
					
					
					// normal rendering
					if (monsterList[i].myType!=Monster.mBOSS6 || renderPass==0) {
						renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx,ty, monsterList[i].xOffset,monsterList[i].yOffset, monsterList[i].w, monsterList[i].h);
					}
				
					// building signs
					if (monsterList[i].myType==Monster.mBUILDING &&
						(monsterList[i].subType==3 || monsterList[i].subType==5)
						){
						tx+=9;
						ty-=11;
						renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx,ty, monsterList[i].targetX,monsterList[i].targetY, 64,24);						
					}

					
					
					// sand/fire worm
					if (monsterList[i].myType==Monster.mWORM && monsterList[i].aiState>1) {
						// render body
						ty+=16;
						count=6;
						while (ty<monsterList[i].targetY-myWorld.worldOffsetY && count>0) {
							renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx,ty, monsterList[i].xOffset,134, 47,16 );
							count--;
							ty+=16;
						}
						
						// tail
						renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx,ty, monsterList[i].xOffset,150, 47,16);
					}
					
					// boss stuff
					if (monsterList[i].myType==Monster.mBOSS1) {
						// render arm
						if (monsterList[i].aiState>3 && monsterList[i].aiCountDown>16) {
							// arm is down into ground
							tx+=32;
							ty+=14;
							renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx,ty, 151,48, 27,36);
						} else {
							renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx,ty, 92,48, 59,27);
						}
					}
					
					
					
					// boss stuff
					if (monsterList[i].myType==Monster.mBOSS2 && monsterList[i].visible) {
						if (monsterList[i].yOffset==108) ty--;
						// render gun turret
						if (monsterList[i].aiState<900) {
							renderSubImageAtPoint(sprites[12], tx+72,ty+33, 185,77, 71,41);
						}
						
						// render arm1
						if (monsterList[i].aiState==5) {
							// arm is down into ground
							renderSubImageAtPoint(sprites[12], tx+50,ty+73, 151,48, 27,36);
						} else {
							renderSubImageAtPoint(sprites[12], tx+18,ty+63, 92,48, 59,27);
						}
						
						if (monsterList[i].yOffset==108) ty+=2;
						// render arm2
						if (monsterList[i].aiState==7) {
							// arm is down into ground
							renderSubImageAtPoint(sprites[12], tx+110,ty+73, 151,48, 27,36);
						} else {
							renderSubImageAtPoint(sprites[12], tx+78,ty+61, 92,48, 59,27);
						}
						
						if (monsterList[i].yOffset==108) ty-=2;
						// render arm3
						renderSubImageAtPoint(sprites[12], tx+105,ty+44, 92,48, 59,27);
					}
					
					
					
					if (monsterList[i].myType==Monster.mBOSS3) {
						// render door
						if (monsterList[i].energy>64) {
							
							if (monsterList[i].energy>112) 
								renderSubImageAtPoint(sprites[12], tx+43,ty, 230,0, 26,19);
							else if (monsterList[i].energy>96) 
								renderSubImageAtPoint(sprites[12], tx+43,ty, 230,19, 26,19);
							else if (monsterList[i].energy>80) 
								renderSubImageAtPoint(sprites[12], tx+43,ty, 230,38, 26,19);
							else 
								renderSubImageAtPoint(sprites[12], tx+43,ty, 230,57, 26,19);
						}
						
						// render top part at right location
						if (monsterList[i].aiState<901) {
							ty-=48;
							ty+=monsterList[i].targetY;
							renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx,ty, monsterList[i].xOffset,0, 95,48);
						}
					}
					
					
					// render fingers
					if (monsterList[i].myType==Monster.mBOSS6) {
						if (renderPass==2) {
							ty=116; //-myWorld.worldOffsetY;
							// left hand
							tx-=64;
							renderFinger(monsterList[i],0,tx,ty);
							tx+=13;
							ty--;
							renderFinger(monsterList[i],1,tx,ty);
							tx+=13;
							ty+=2;
							renderFinger(monsterList[i],2,tx,ty);
							
							// right hand
							tx+=128;
							ty=116;
							renderFinger(monsterList[i],3,tx,ty);
							
							tx+=13;
							ty--;
							renderFinger(monsterList[i],4,tx,ty);

							tx+=13;
							ty+=2;
							renderFinger(monsterList[i],5,tx,ty);
							
							monsterList[i].renderPass=0;
						} else {
							// render head shell
							if (monsterList[i].energy>48) {
								if (monsterList[i].myDirection<0) {
									renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx+59,ty+1, 0,monsterList[i].yOffset+86, 34,33);
								} else {
									renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx+59,ty+1, 34,monsterList[i].yOffset+86, 34,33);
								}
							}
							
							monsterList[i].renderPass=2;
						}
					}
					
					
					// v1.3.0
					if (monsterList[i].myType==Monster.mBOSS7) {
						// render door
						if (monsterList[i].myParts[0]>0) {
							// lower gun
							if (monsterList[i].animIncrease==0) renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx,ty+82, 126,120, 39,11);
							else renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx,ty+82, 126,109, 39,11);
						}

						if (monsterList[i].myParts[1]>0) {
							// lower gun
							if (monsterList[i].animIncrease==1) renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx+26,ty+51, 126,120, 39,11); 
							else renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx,ty+82, 126,109, 39,11); 
						}
						monsterList[i].animIncrease=-1;
						
						if (monsterList[i].energy>=8) {
							// render glassopening
							if (monsterList[i].wasHit>0 && monsterList[i].aiState>=6) {
								renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx+64,ty+23, 210,109, 43,42);
							} else {
								setAlpha(128);
								renderSubImageAtPoint(sprites[monsterList[i].SpriteSet], tx+64,ty+23, 166,109, 43,42);
							}
							theCanvas.drawBitmap(sprites[monsterList[i].SpriteSet],	src, dest, myPaint);
							setAlpha(255);
						}

					}
					
					
					
					if (monsterList[i].rotation != 0) {
						ctx.restore();
					}
				}
			}
			i++;
		}
		setAlpha(255);
	}

	function renderFinger( myMonster,  id,  tx, ty) {
		if (myMonster.getFinger(id)==0) return;
		
		if (id<3) {
			if (myMonster.getFinger(id)==1 || myMonster.getFinger(id)>7) {
				renderSubImageAtPoint(sprites[myMonster.SpriteSet], tx,ty-17, 149,myMonster.yOffset+86, 18,30);
			} else {
				renderSubImageAtPoint(sprites[myMonster.SpriteSet], tx,ty, 113,myMonster.yOffset+86, 18,30);
			}
		} else {
			if (myMonster.getFinger(id)==1 || myMonster.getFinger(id)>7) {
				renderSubImageAtPoint(sprites[myMonster.SpriteSet], tx,ty-17, 167,myMonster.yOffset+86, 18,30);
			} else {
				renderSubImageAtPoint(sprites[myMonster.SpriteSet], tx,ty, 132,myMonster.yOffset+86, 18,30);
			}
		}
	}
	
	
	function fxAdd( ax,  ay,  aType,  aSubType) {
		var i = 0;
		while (i < fxList.length && !fxList[i].deleted)	i++;
		if (i < fxList.length) fxList[i].init(ax, ay, aType, aSubType);
	}

	function fxUpdate() {
		var i = 0;

		while (i < fxList.length) {
			if (!fxList[i].deleted) {
				if (!paused) fxList[i].update(myWorld);

				if (fxList[i].died) {
					fxList[i].deleted = true;
					if (fxList[i].fType==FX.fDEBRI) fxAdd(fxList[i].x,fxList[i].y,FX.fSMOKETRAIL,0);
				}
			}

			i++;
		}
	}

	function fxRender( renderPass ) {
		var i = 0;

		while (i < fxList.length) {
			if (!fxList[i].deleted && fxList[i].renderPass==renderPass) {

				tx = fxList[i].x-myWorld.worldOffset;
				ty = fxList[i].y-myWorld.worldOffsetY;
				
				if (fxList[i].fType==FX.fCHECKPOINT) {
					tx=((lowDisplayW>>1)-(fxList[i].w>>1)); // +fxList[i].tx;
					ty=fxList[i].y;
				}

				setAlpha(fxList[i].alpha);

				if (fxList[i].fType==FX.fSIGNAL){
					setScale(tx-((fxList[i].w*fxList[i].aiState)>>1), ty-((fxList[i].h*fxList[i].aiState)>>1),  fxList[i].aiState,fxList[i].aiState);
					renderSubImageAtPoint(sprites[fxList[i].spriteSet], tx-((fxList[i].w*fxList[i].aiState)>>1), ty-((fxList[i].h*fxList[i].aiState)>>1), fxList[i].animFrame,fxList[i].aOffset, fxList[i].w,fxList[i].h);
					endScale();
				} else {

					if (fxList[i].rotation != 0) {
						ctx.save();
						ctx.translate( (tx+(fxList[i].w>>1))<<useMultiFactor, (ty+(fxList[i].h>>1))<<useMultiFactor);
						ctx.rotate( convertToRadians(fxList[i].rotation) );
						ctx.translate( -(tx+(fxList[i].w>>1))<<useMultiFactor, -(ty+(fxList[i].h>>1))<<useMultiFactor);
					}				
					
					renderSubImageAtPoint(sprites[fxList[i].spriteSet], tx,ty, fxList[i].animFrame,fxList[i].aOffset, fxList[i].w,fxList[i].h);
					
					if (fxList[i].rotation != 0) ctx.restore();
				}
			}
			i++;
		}
		setAlpha(255);
	}

	function bulletAdd( bOwner,  bType,  ax,  ay,  aSubType) {
		var i = 0;
		while (i < bulletList.length && !bulletList[i].deleted)	i++;
		if (i < 128) bulletList[i].init(bOwner, ax, ay, bType, aSubType);
	}

	function bulletUpdate() {
		var i = 0;

		while (i < bulletList.length) {
			if (!bulletList[i].deleted) {
				if (!paused) {
					bulletList[i].update(myPlayer, myPlayer2, myWorld, lowDisplayW);
					
					if (bulletList[i].doMoveSound) {
						bulletList[i].doMoveSound=false;
					}
					
					for (var m=0; m<monsterList.length; m++) {
						if (!monsterList[m].deleted && !monsterList[m].died && bulletList[i].collidesWith(monsterList[m])) {
							if (monsterList[m].hitByBullet(bulletList[i], myWorld, myPlayer)) {
								
								bulletList[i].killCount++;
								
								if (bulletList[i].myType!=Bullets.bEXPLOSION) {
									if (bulletList[i].myType!=Bullets.bRAINDROP) fxAdd(bulletList[i].x,bulletList[i].y,FX.fCIRCLEEXPLODE,0);
									
									bulletList[i].hitMonster(monsterList[m]);
									
									if (myPlayer.inCover) {
										myPlayer.coverKillCount++;
										if (myPlayer.coverKillCount>=5) unlockAchievement(PlayerProfile.A_COVERSHOOT5);
									}
								}
							}
						}
					}
					
					
					if (bulletList[i].myType==Bullets.bTRIPLEFLAME && bulletList[i].aiState==700) {
						if (bulletList[i].xSpeed<0) {
							bulletAdd(bulletList[i].bOwner, Bullets.bTRIPLEFLAMEMINI, bulletList[i].x, bulletList[i].y, -1);
							bulletAdd(bulletList[i].bOwner, Bullets.bTRIPLEFLAMEMINI, bulletList[i].x, bulletList[i].y, -2);
							bulletAdd(bulletList[i].bOwner, Bullets.bTRIPLEFLAMEMINI, bulletList[i].x, bulletList[i].y, -3);
						} else {
							bulletAdd(bulletList[i].bOwner, Bullets.bTRIPLEFLAMEMINI, bulletList[i].x, bulletList[i].y, 1);
							bulletAdd(bulletList[i].bOwner, Bullets.bTRIPLEFLAMEMINI, bulletList[i].x, bulletList[i].y, 2);
							bulletAdd(bulletList[i].bOwner, Bullets.bTRIPLEFLAMEMINI, bulletList[i].x, bulletList[i].y, 3);
						}
					}
					
				}

				if (bulletList[i].died) {
					bulletList[i].deleted = true;
					
					if (bulletList[i].myType==Bullets.bEXPLOSION) {
						if (bulletList[i].killCount>=4) unlockAchievement(PlayerProfile.A_BLOWUP4DUDES);
						if (bulletList[i].killCount>=2) unlockAchievement(PlayerProfile.A_BLOWUP2DUDES);
					}
					
					if (bulletList[i].myType==Bullets.bROCKET && bulletList[i].energy==999) {
//						bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, bulletList[i].x,bulletList[i].y, 0);						
					}
					
					// v1.3.0
					if (bulletList[i].myType==Bullets.bEGGS) {
						fxAdd(bulletList[i].x,bulletList[i].y,FX.fSMALLEXPLODE,0);						
					}
					
				} else {
					if (bulletList[i].myType==Bullets.bEXPLOSION) myWorld.worldShake=bulletList[i].energy;
				}
			}

			i++;
		}
	}

	function bulletRender() {
		var i = 0;

		while (i < bulletList.length) {
			if (!bulletList[i].deleted && bulletList[i].visible) {

				tx = bulletList[i].x-myWorld.worldOffset;
				ty = bulletList[i].y-myWorld.worldOffsetY;

				setAlpha(bulletList[i].alpha);

				renderSubImageAtPoint(sprites[bulletList[i].SpriteSet], tx,ty, bulletList[i].xOffset,bulletList[i].yOffset, bulletList[i].w,bulletList[i].h);

			}
			i++;
		}
		setAlpha(255);
	}
	
	
	function renderBackgroundStart() {
		
		myWorld.update();
		
		// layer 2
		tx = -(myWorld.worldOffset / 6) % 120;
		ty = 0; 
		while (tx < lowDisplayW) {
			renderSubImageAtPoint(sprites[2], tx,ty, 0,0,  120,96);
			tx += 120;
		}

		// layer 1
		tx = -((myWorld.worldOffset >> 2) % 512);
		ty = 16;
		var yOffset=( (myWorld.worldOffset>>2) >>9)*80;
		while (tx < lowDisplayW) {
			renderSubImageAtPoint(sprites[8], tx,ty, 0,yOffset,  512,80);
			tx += 512;
			yOffset+=80;
		}
		
		
		// tiny layer 
		tx = -(myWorld.worldOffset>>1) % 120;
		ty = 0; 
		while (tx < lowDisplayW) {
			renderSubImageAtPoint(sprites[2], tx,ty+96, 0,96,  120,64);
			tx += 120;
		}

		// render floor
		tx=0+myWorld.shakeR;
		ty=(lowDisplayH-32)-myWorld.shakeR;
		while (tx<lowDisplayW) {
			renderSubImageAtPoint(sprites[7], tx,ty, 16,0,  16,16);

			renderSubImageAtPoint(sprites[7], tx,ty+16, 64,0,  16,16);
			renderSubImageAtPoint(sprites[7], tx,ty+32, 64,0,  16,16);
			tx+=16;
		}
		
		
		tx=(lowDisplayW>>1)-80;
		ty=(lowDisplayH-32)-55;
		renderSubImageAtPoint(sprites[13], tx,ty, 80,0,  160,55);
	}
	
	function renderBackground() {

		// airplane
		tx = ((lowDisplayW >> 1) - 132); // 142);
//		tx = 0
		ty = 50;
		//(285>>1)-(lowDisplayW>>1)
		renderSubImageAtPoint(sprites[28], tx,ty, 0,35,  285,74);

		// fill left part of screen if needed
		while (tx>0) {
			tx-=23;
			renderSubImageAtPoint(sprites[28], tx,ty, 0,35, 23,74);
		}
		tx= ((lowDisplayW>>1)-142+285);
		while (tx<lowDisplayW) {
			renderSubImageAtPoint(sprites[28], tx,ty, 0,35,  23,74);
			tx+=23;
		}
	
	}
	
	
	function renderSpeaker() {
		tx=(lowDisplayW>>1)+102;
		ty=63;
		renderSubImageAtPoint(sprites[28], tx,ty, 143,11,  16,16);
		if (touchReleased && touchX>=tx-8 && touchY>=ty-8 && touchX<=tx+24 && touchY<=ty+24) {
			touchReleased=false;
			

			if (activePlayer.useMusic) {
				stopBackground();
				activePlayer.useMusic=false;
				fxAdd( ((lowDisplayW>>1)-60)+getRandom(80) , 60+getRandom(24),FX.fRATAT,4);
				playSound('FX_ACHIEVE');
			} else {
				if (activePlayer.useSFX) {
					activePlayer.useSFX=false;
					fxAdd( ((lowDisplayW>>1)-60)+getRandom(80) , 60+getRandom(24),FX.fRATAT,5);
					playSound('FX_ACHIEVE');
				} else {
					activePlayer.useSFX=true;
					activePlayer.useMusic=true;
					fxAdd( ((lowDisplayW>>1)-60)+getRandom(80) , 60+getRandom(24),FX.fRATAT,6);
					playSound('FX_ACHIEVE');
					playBackground();
				}
			} 
			activePlayer.saveSettings();
		}
		if (activePlayer.useMusic && worldTicks%8==0 && getRandom(16)>6) {
			fxAdd(tx,ty,FX.fMUSIC,0);
		}
	}
	
	
	function renderSoldiersNonactive() {
		var tx = ((lowDisplayW >> 1) - 132);
		var ty = 50;
		
		// first seat
		menuPlaneBlackX1=-1;
		menuPlaneBlackX2=lowDisplayW;
		
		tx+=31; 
		ty+=52;
		for (var i=0; i<8; i++) {
			setAlpha(255);
			
			if (!activePlayer.didUnlockCharacter(i)) 
				renderSubImageAtPoint(sprites[28], tx,ty, 160+(i*11),114,  11,12);
			else if (getRandom(80)>72) 
				renderSubImageAtPoint(sprites[28], tx,ty, 160+(i*11),23,  11,12);
			else 
				renderSubImageAtPoint(sprites[28], tx,ty, 160+(i*11),11,  11,12);
			

			if (i==3) tx+=79;
			else tx+=20;
		}
		
		
		drawPaint(128,0,0,0);
		
		
		// rerender door
		tx = ((lowDisplayW >> 1) - 132)+117;
		ty = 50+35;
		renderSubImageAtPoint(sprites[28], tx,ty, 117,71,  28,27);
		
		// render clouds
		tx = ((lowDisplayW >> 1) - 132);
		ty = 50;
		clipRect(tx+117,ty+36,tx+145,ty+63);
		for (var i=3; --i>=0;) {
			renderSubImageAtPoint(sprites[28], cloudX[i],ty+28+cloudY[i], 119,12,  24,9);
			
			cloudX[i]-=(i+1);
			if (cloudX[i]<(lowDisplayW>>1)-60) {
				cloudX[i]=(lowDisplayW>>1)+40+getRandom(32);
				cloudY[i]=getRandom(32);
			}
			
		}
		endClip();

		// GO sign
		fxUpdate();
		fxRender(1);
	}

	
	
	
	function renderMenuOptions() {
		
		// logo
		if (GameState!=INPAUSE && GameState!=INUPSELL && GameState!=INMISSIONS) {
			tx=(lowDisplayW>>1)-69;
			ty=8-menuSlide1;

			renderSubImageAtPoint(sprites[28], tx,ty, 0,144,  138,49);
			
			/*
			if (isDemo && GameState!=INMISSIONS) {
				tx=(lowDisplayW>>1)-23;
				ty=lowDisplayH-14;
				
				dest.set(tx,ty,tx+47,ty+7);
				src.set(0,0,47,7);
				drawBitmap(desktopImage,src,dest);
			}	
			*/		
		}
			
			
		if (GameState==INMENU) {
			if (activePlayer.highScore>0) {
				// "personal best"
				setAlpha(menuSlide1);
				tx=(lowDisplayW>>1)-25;
				ty=(lowDisplayH>>1)-52;
				
				renderSubImageAtPoint(sprites[30], tx,ty, 14,232,  51,7);
				
				// render hi-score
				setDigits(activePlayer.highScore, scoreboard);
				tx = (lowDisplayW>>1);
				ty+=8;
				
				foundFirst=false;
				for (var i = 0; i < 6; i++) {
					if (foundFirst || scoreboard[i]!=0 || i==5) {
						if (!foundFirst) {
							// center it
							tx-=((6-i)*6)>>1;
						}
						foundFirst=true;
						renderSubImageAtPoint(sprites[30], tx,ty, 54+(scoreboard[i]*6),0,  6,7);
						tx+=7;
					}
				}
				setAlpha(255);
			}
		}
			
			
			
			
		// play
		if (GameState!=INMISSIONS && GameState!=INUPSELL) {
			tx=26-menuSlide1;
			// ui
			if (GameState==INMENU && menuSelected1>=0 && !keyBoardOut) tx=26; 
			ty=lowDisplayH-20;
			if (menuSettingsItem==1) {
				renderSubImageAtPoint(sprites[30], tx-26,ty-1, 26,194,  82,17);
				renderSubImageAtPoint(sprites[30], tx-20,ty, 84,99,  22,13);
			} else {
				renderSubImageAtPoint(sprites[30], tx-26,ty-1, 26,128,  82,17);
			}
			renderSubImageAtPoint(sprites[30], tx,ty, 125,11,  34,14);
		}
		
		if (GameState==INMAINMENU || (GameState==INMISSIONS  && nextState!=INITMAP && nextState!=INANIMATION)  || GameState==INPAUSE ||(GameState==INMENU && menuSelected1>=0 && !keyBoardOut)) {
			if ( (touchReleased && touchX>=tx-26 && touchY>=ty && touchX<=tx+120 && touchY<=ty+14)
					|| (actionButton2 && !actionButton2Locked && menuSettingsItem==1)) {
				if (actionButton2) actionButton2Locked=true;
				else touchReleased=false;
				playSound('FX_PLOP');
				
				if (GameState==INPAUSE) {
					paused=false;
					GameState=INGAME;
					playBackground();
				} else if (GameState==INMENU && menuSelected1>=0) {
					// ui
					playSound('FX_COIN');
					
					menuReady1=false;
					menuReady2=false;
					initGame(menuSelected1,menuSelected2);
				} else {
					menuSlide2=200;
					menuReady1=false;
					menuReady2=false;
					myWorld.isCOOP=false;
					GameState=INMENU;
				}
			}
		}

		//options
		if (GameState!=INMISSIONS && GameState!=INUPSELL) {
			tx=(lowDisplayW-64)+menuSlide1;
			ty=lowDisplayH-20;
			
			if (menuSettingsItem==2) {
				renderSubImageAtPoint(sprites[30], tx-22,ty-1, 0,194,  (lowDisplayW-(tx-22)),17);
				renderSubImageAtPoint(sprites[30], tx-20,ty, 84,99,  18,13);
			} else {
				renderSubImageAtPoint(sprites[30], tx-22,ty-1, 0,128,  (lowDisplayW-(tx-22)),17);
			}
			
			// v2.0.0
			if (GameState==INMISSIONS) {
				renderSubImageAtPoint(sprites[30], tx,ty, 168,26,  34,14);
			} else if (GameState==INPAUSE) {
				renderSubImageAtPoint(sprites[30], tx,ty, 125,71,  34,14);
			} else {
				renderSubImageAtPoint(sprites[30], tx,ty, 160,11,  58,14);
			}			
		}
		
				
		if (GameState==INMAINMENU || GameState==INMISSIONS || GameState==INPAUSE) {
			if ( (touchReleased && touchX>=tx-26 && touchY>=ty && touchX<=tx+120 && touchY<=ty+14)
					|| (actionButton2 && !actionButton2Locked && menuSettingsItem==2)) {
				if (actionButton2) actionButton2Locked=true;
				else touchReleased=false;
				playSound('FX_PLOP');

				if (GameState==INMISSIONS) {
					menuSlide1=200;
					menuSlide2=0;
					GameState=INMAINMENU;
				} else if (GameState==INPAUSE) {
					initMenu();
					GameState=INMAINMENU;
					menuSlide1=200;
					menuSlide2=0;
				} else {
					menuSettingsItem=-1; 
					menuSlide2=200;
					nextState=INMAINMENU;
					GameState=INSETTINGS;
				}
			}
		}

		

		//back
		if (GameState!=INMAINMENU && GameState!=INPAUSE) {
				// render esc-back
				if (isDesktop) { 
					tx=(lowDisplayW-38);
					ty=(lowDisplayH-20)+(200-menuSlide1);
					
					if (nextState!=INMAINMENU) {
						// render x - play
						dest.set(tx,ty,tx+28,ty+7);
						src.set(218,16, 246,23);
						drawBitmap(sprites[30],src,dest);
					} else {
						dest.set(tx,ty,tx+36,ty+7);
						src.set(218,8, 254,15);
						drawBitmap(sprites[30],src,dest);
					}
				} else {

					tx=(lowDisplayW-71);
					ty=(lowDisplayH-20)+(200-menuSlide1); //4; //lowDisplayH-20;
					renderSubImageAtPoint(sprites[30], tx-37,ty-1, 0,128,  108,17);
					if (GameState==INMISSIONS && nextState!=INMAINMENU) {
						// play
						renderSubImageAtPoint(sprites[30], tx,ty, 125,11,  34,14);
					} else {
						tx=(lowDisplayW-71);
						ty=(lowDisplayH-20)+(200-menuSlide1); //4; //lowDisplayH-20;
						renderSubImageAtPoint(sprites[30], tx-37,ty-1, 0,128,  108,17);
					
						renderSubImageAtPoint(sprites[30], tx,ty, 168,26,  34,14);
					}
				}	
				
				if ( (touchReleased && touchX>=tx-37 && touchY>=ty && touchX<=tx+120 && touchY<=ty+14)
						|| (actionButton1 && !actionButton1Locked)
						|| (backPressed && !backLocked)) {
					if (actionButton1) actionButton1Locked=true;
					else if (backPressed) backLocked=true;
					else touchReleased=false;
		
					playSound('FX_PLOP');
		
					if (nextState==INPAUSE) GameState=INPAUSE;
					else if (GameState==INMENU) {
						menuSlide1=200;
						menuSlide2=0;

						GameState=INMAINMENU;
					} else {
						menuSlide1=200;
						menuSlide2=0;
						GameState=nextState;
						if (nextState==INANIMATION) initAnimation();
					}
				}
			
		}
		
		// FACEBOOK
		if (!keyBoardOut) {
			if (GameState!=INPAUSE) {
				tx=4-menuSlide1;
				ty=4;
				renderSubImageAtPoint(sprites[30], tx,ty, 102,145,  16,16);
				
				if (GameState==INMAINMENU) {
					if (touchReleased && touchX>=tx && touchY>=ty && touchX<=tx+16 && touchY<=ty+17) {
						touchReleased=false;
						playSound('FX_PLOP');
	/*					
						String url = "http://facebook.com/orangepixel";
						Intent i = new Intent(Intent.ACTION_VIEW);
						i.setData(Uri.parse(url));
						getParentActivity().startActivity(i);
	*/					
					}
				}
				
				// more games button
				tx=(lowDisplayW-25)+menuSlide1;
				ty=4;
				renderSubImageAtPoint(sprites[30], tx,ty, 109,128,  25,17);
				
				if (GameState==INMAINMENU) {
					if (touchReleased && touchX>=tx && touchY>=ty && touchX<=tx+25 && touchY<=ty+17) {
						touchReleased=false;
						playSound('FX_PLOP');
	/*					
						String url = "market://search?q=pub:OrangePixel";
						Intent i = new Intent(Intent.ACTION_VIEW);
						i.setData(Uri.parse(url));
						getParentActivity().startActivity(i);
	*/					
					}
				}
			}
		}
	
		if (menuSlide1>menuSlide2) {
			menuSlide1-=menuSlide1>>1;
			if (menuSlide1<=menuSlide2+2) menuSlide1=menuSlide2;
		} else if (menuSlide1<menuSlide2) {
			
			menuSlide1+=1+((200-(menuSlide2-menuSlide1))>>1);
			if (menuSlide1>=menuSlide2-2) menuSlide1=menuSlide2;
		}
		
		
	}
	
	
	
	
	function renderScene() {
		
			// render parallax layers if not indoors
			switch (myWorld.worldParallaxType){
				case TileMap.pNOPARALLAX:
					// render indoor background
					tx = -(myWorld.worldOffset)%120;
					ty = 0;
					while (tx < lowDisplayW) {
						renderSubImageAtPoint(sprites[2], tx,ty, 0,0,  120,160);
						tx += 120;
					}
				break;
				
				case TileMap.pSIMPLE:
					// layer 3
					tx = 0;
					ty = 0;
					while (tx < lowDisplayW) {
						renderSubImageAtPoint(sprites[2], tx,ty, 0,0,  120,160);
						tx += 120;
						
					}
					
					// layer 2
					tx = -(myWorld.worldOffset >> 1) % 120;
					ty = 0; 
					while (tx < lowDisplayW) {
						renderSubImageAtPoint(sprites[2], tx,ty, 120,0,  120,96);
						tx += 120;
					}
					
				break;
				
				
			
				case TileMap.pFULL:
					// layer 2
					tx = -(myWorld.worldOffset / 6) % 120;
					ty = 0; 
					while (tx < lowDisplayW) {
						renderSubImageAtPoint(sprites[2], tx,ty, 0,0,  120,96);
						tx += 120;
					}
			
					// layer 1
					tx = -((myWorld.worldOffset >> 2) % 512);
					ty = 16;
					var yOffset=( (myWorld.worldOffset>>2) >>9)*80;
					while (tx < lowDisplayW) {
						renderSubImageAtPoint(sprites[8], tx,ty, 0,yOffset,  512,80);
						tx += 512;
						yOffset+=80;
					}
					
					
					// tiny layer 
					tx = -(myWorld.worldOffset>>1) % 120;
					ty = 0; 
					while (tx < lowDisplayW) {
						renderSubImageAtPoint(sprites[2], tx,ty+96, 0,96,  120,64);
						tx += 120;
					}
				break;
			}
		
		
		
		// update and render the various items
		fxRender(0);
		monsterRender(0);
		monsterRender(1);
		
		// render tilemap
		myWorld.paintPre(myMapBitmap, lowDisplayW, lowDisplayH);
		//myWorld.paint(sprites[7], bufferCanvas, null, lowDisplayW, lowDisplayH);

		monsterRender(2);

		myPlayer.Paint(sprites[0], myWorld);
		if (myWorld.isCOOP) myPlayer2.Paint(sprites[14], myWorld);

		bulletRender();
		fxRender(1);
		


		fxRender(2);
		fxRender(3);
		
		monsterRender(3);
		
		
		// hell fire
		if (worldOrder[world]==5 && !myWorld.isInDoor && world<100) {
			
			tx=-(myWorld.worldOffset<<1)%64;
			ty=(lowDisplayH-32)-(myWorld.worldOffsetY>>1); 

			nextCloud=0;
			while (tx<lowDisplayW && nextCloud<6) {
				
				renderSubImageAtPoint(sprites[2], tx,ty, 120,cloudY[nextCloud],  64,32);

				if (!paused && myWorld.worldAge%4==0) {
					cloudY[nextCloud]+=32;
					if (cloudY[nextCloud]>96) cloudY[nextCloud]=0;
				}
				
				nextCloud++;
				tx+=64;
			}
		}
		
		
		if (GameState!=INDIED) {
			renderStatusBar();
		}
	}


	function renderStatusBar() {
		

		if (!myPlayer.Died || !myWorld.isCOOP) {
			// energy
			tx=2;
			ty=statusBarY+2;
			
			// show lives as a bar
			if (myPlayer.hasArmor) {
				if (myPlayer.armorCounter>24 || worldTicks%24<12) {
					renderSubImageAtPoint(sprites[30], tx,ty, 39,0,  8,6);
					ty=statusBarY+11;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
					ty+=3;
					percent=((24/256)*myPlayer.armorCounter);
					renderSubImageAtPoint(sprites[30], tx,ty, 72,7,  percent,4);
					ty+=3;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
				}
			} else if (myPlayer.lives>24 || worldTicks%24<12) {
				renderSubImageAtPoint(sprites[30], tx,ty, 24,0,  8,7);
				ty=statusBarY+11;
				renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
				ty+=3;
				percent=((24/myPlayer.maxLives)*myPlayer.lives);
				renderSubImageAtPoint(sprites[30], tx,ty, 0,3,  percent,4);
				ty+=3;
				renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
			}
			
			// ammo
			if (myPlayer.weapon>0) {
				tx=34;
				ty=statusBarY+2;
				renderSubImageAtPoint(sprites[30], tx,ty, 32,0,  7,7);
				
				// bar
				if (myPlayer.ammo>24 || worldTicks%24<12) {
					ty=statusBarY+11;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
					ty+=3;
					percent=((24/myPlayer.maxAmmo)*myPlayer.ammo);
					renderSubImageAtPoint(sprites[30], tx,ty, 0,7,  percent,4);
					ty+=3;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
				}
			}
			
			if (myPlayer.hasSpecialDrink) {
				tx=68;
				// bar
				if (myPlayer.specialDrinkCounter>24 || worldTicks%24<12) {
					ty=statusBarY+11;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
					ty+=3;
					percent=((24/128)*myPlayer.specialDrinkCounter);
					renderSubImageAtPoint(sprites[30], tx,ty, 48,7,  percent,4);
					ty+=3;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
				}				
			}
			
			// continue?
			if (myPlayer.hasContinue && !myWorld.isCOOP) {
				tx=lowDisplayW-20;
				ty=statusBarY+11;
				renderSubImageAtPoint(sprites[30], tx,ty, 84,99,  18,13);
			}
		} else {
			if (myPlayer.hasContinue && myWorld.world<100) {
				// render "SHOOT TO PLAY"
				if (worldTicks%24<12) {
					tx=18;
					ty=statusBarY+8;
					renderSubImageAtPoint(sprites[30], tx,ty, 51,99,  32,15);
				}
			} else if (myWorld.world<100) {
				// CONTJE!
				tx=16;
				ty=statusBarY+8;
				renderCreditsNeeded(tx,ty);
			}
		}
		

		
		if (myWorld.isCOOP) {
			if (!myPlayer2.Died) {
				// energy
				tx=lowDisplayW-26;
				ty=statusBarY+2;
				
				if (myPlayer2.hasArmor) {
					if (myPlayer2.armorCounter>24 || worldTicks%24<12) {
						renderSubImageAtPoint(sprites[30], tx,ty, 39,0,  8,6);
						ty=statusBarY+11;
						renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
						ty+=3;
						percent=((24/256)*myPlayer2.armorCounter);
						renderSubImageAtPoint(sprites[30], tx,ty, 72,7,  percent,4);
						ty+=3;
						renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
					}
				// show lives as a bar
				} else if (myPlayer2.lives>16 || worldTicks%24<12) {
					renderSubImageAtPoint(sprites[30], tx,ty, 24,0,  8,7);
					ty=statusBarY+11;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
					ty+=3;
					percent=((24/myPlayer2.maxLives)*myPlayer2.lives);
					renderSubImageAtPoint(sprites[30], tx+24-percent,ty, 0,3,  24,5);
					ty+=3;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
				}
				
				// ammo
				if (myPlayer2.weapon>0) {
					tx=lowDisplayW-60;
					ty=statusBarY+2;
					renderSubImageAtPoint(sprites[30], tx+17,ty, 32,0,  7,7);
					
					// bar
					if (myPlayer2.ammo>16 || worldTicks%24<12) {
						ty=statusBarY+11;
						renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
						ty+=3;
						percent=((24/myPlayer2.maxAmmo)*myPlayer2.ammo);
						renderSubImageAtPoint(sprites[30], tx+24-percent,ty, 0,7,  percent,4);
						ty+=3;
						renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
					}
				}
				
				if (myPlayer2.hasSpecialDrink) {
					tx=lowDisplayW-90;
					// bar
					if (myPlayer2.specialDrinkCounter>24 || worldTicks%24<12) {
						ty=statusBarY+11;
						renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
						ty+=3;
						percent=((24/128)*myPlayer2.specialDrinkCounter);
						renderSubImageAtPoint(sprites[30], tx,ty, 48,7,  percent,4);
						ty+=3;
						renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
					}				
				}
				
			} else {
				if (myPlayer.hasContinue && myWorld.world<100) {
					// render "SHOOT TO PLAY"
					if (worldTicks%24<12) {
						tx=lowDisplayW-48;
						ty=statusBarY+8;
						renderSubImageAtPoint(sprites[30], tx,ty, 51,99,  32,15);
					}
				} else if (myWorld.world<100){
					// CONTJE
					tx=lowDisplayW-60;
					ty=statusBarY+8;
					renderCreditsNeeded(tx,ty);
				}
			}
			
		}
		
		
		
		
		// $ money meter
		
		if (!myWorld.isCOOP) {
			tx=2;
			ty=statusBarY+22;
				renderSubImageAtPoint(sprites[30], tx,ty, 117,0,  7,7);
		
				setDigits(myPlayer.coins,scoreboard);
				tx+=8; //14;
				foundFirst=false;
				for (var i = 2; i < 6; i++) {
					if (foundFirst || scoreboard[i]!=0 || i==5) {
						foundFirst=true;
						renderSubImageAtPoint(sprites[30], tx,ty, 54+(scoreboard[i]*6),0,  6,7);
						tx+=7;
					}
				}			
		} else {
			if (myPlayer.hasContinue) {
				tx=1;
				ty=lowDisplayH-14;
				renderSubImageAtPoint(sprites[30], tx,ty, 84,99,  18,13);
			}
			
			tx=(lowDisplayW>>1)-25;
			ty=statusBarY+4;
			renderSubImageAtPoint(sprites[30], tx,ty, 92,32,  13,14);
	
			setDigits(myPlayer.coins,scoreboard);
			tx+=14;
			foundFirst=false;
			for (var i = 2; i < 6; i++) {
				if (foundFirst || scoreboard[i]!=0 || i==5) {
					foundFirst=true;
					renderSubImageAtPoint(sprites[30], tx,ty, scoreboard[i]*12,11,  12,14);
					tx += 12;
				}
			}			
			
		}
		
		
		// player1 status box
		if (myPlayer.stInfoID>0) renderInfoBox(myPlayer, false);
		if (myPlayer2.stInfoID>0) renderInfoBox(myPlayer2, true);
		
		
		// beacon (if player standing at one)
		if (myPlayer.beacon>-1 && myPlayer.showBeacon) {
			
			tx=(lowDisplayW>>1)-16;
			//ty=lowDisplayH-24; //16;
			if (myWorld.isCOOP) ty=19;
			else ty=13;
			renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
			ty+=3;
			percent=((24/64)*myPlayer.beacon);
			renderSubImageAtPoint(sprites[30], tx,ty, 24,7,  percent,4);
			ty+=3;
			renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  24,3);
			
			if (myPlayer.isBeacon) {
				tx=(lowDisplayW>>1)-20;
				ty-=7;
				renderSubImageAtPoint(sprites[30], tx,ty, 115,50,  9,10);
			}
			
			
		}

		

		// render score
		if (!myWorld.isCOOP) {
			setDigits(myPlayer.score, scoreboard);
			tx = (lowDisplayW>>1)-18;
			ty = statusBarY+2;
			for (var i = 0; i < 6; i++) {
				renderSubImageAtPoint(sprites[30], tx,ty, 54+(scoreboard[i]*6),0,  6,7);
				tx += 6;
			}
		}
		
		if (worldChapterAlpha>0) {
			setAlpha(worldChapterAlpha);
			tx=(lowDisplayW>>1)-23;
			ty=24;
			renderSubImageAtPoint(sprites[30], tx,ty, 0,25,  29,7);

			tx+=34;
			renderSubImageAtPoint(sprites[30], tx,ty, 54+(world*6),0,  6,7);
			// .
			tx+=6;
			renderSubImageAtPoint(sprites[30], tx,ty+4, 114,4,  3,7);
			// level
			tx+=3;
			renderSubImageAtPoint(sprites[30], tx,ty, 54+(level*6),0,  6,7);
			
			ty+=8;
			tx=(lowDisplayW>>1)-50;
			while (tx<(lowDisplayW>>1)+50) {
				renderSubImageAtPoint(sprites[30], tx,ty, 0,0,  20,3);
				tx+=20;
			}
			
			ty+=4;
			if (myWorld.inTutorial) {
				// bootcamp
				tx=(lowDisplayW>>1)-33;
				renderSubImageAtPoint(sprites[30], tx,ty, 0,239,  66,14);
				
			} else switch (worldOrder[world]) {
				case 1:	 // plane yard
					tx=(lowDisplayW>>1)-40;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,46,  80,14);
				break;

				case 2:	 // the jungle
					tx=(lowDisplayW>>1)-39;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,32,  77,14);
				break;
				
				case 3: // siberia
					tx=(lowDisplayW>>1)-29;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,85,  58,14);
					
				break;

				case 4: // egypt
					tx=(lowDisplayW>>1)-21;
					renderSubImageAtPoint(sprites[30], tx,ty, 60,85,  42,14);
				break;
				
				case 5: // hell
					tx=(lowDisplayW>>1)-17;
					renderSubImageAtPoint(sprites[30], tx,ty, 0,113,  34,14);
				break;
				
				// v1.3.0
				case 6: // Marine dock
					tx=(lowDisplayW>>1)-43;
					renderSubImageAtPoint(sprites[30], tx,ty, 111,114,  86,14);
				break;
				
			}
			
			setAlpha(255);
		} else if (generalInfo!=0) {
			
			if (generalAlpha<=generalAlphaTarget) {
				if (generalAlpha==0 && generalInfo>0) playSound('FX_ACHIEVE');

				generalAlpha+=8;
				if (generalAlpha>=generalAlphaTarget) {
					generalAlpha=generalAlphaTarget;
					generalDelay--;
					if (generalDelay<=0) {
						generalAlphaTarget=0;
					}
				}
			} else if (generalAlpha>generalAlphaTarget) {
				generalAlpha-=8;
				if (generalAlpha<=generalAlphaTarget) {
					generalAlpha=0;
					generalInfo=0;
				}
			}
		
			// render general info
			drawRect(0,18,lowDisplayW,50,makeRGBA(0,0,0,generalAlpha));			
			
			tx=generalAlpha+76;
			if (tx>255) tx=255;
			setAlpha(tx);
			if (generalInfo<0) {
				
				// achievements!
				tx=(lowDisplayW>>1)-87;
				ty=26;
				renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
				// text
				tx+=16;
				renderSubImageAtPoint(sprites[1], tx,ty, 135,128,  79,7);
				// achievement
				ty+=8;

				renderAchievement(tx,ty, -(generalInfo+1));
				
				
			} else {
				switch(generalInfo) {
					case 1:	// active beacons!
						tx=(lowDisplayW>>1)-87;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,100,  169,14);
					break;
					
					
					case 2: // get in the damn chopper
						tx=(lowDisplayW>>1)-53;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,114,  91,7);
					break;
					
					case 3:// not on vacation! activate!�
						tx=(lowDisplayW>>1)-60;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,121,  86,7);
						ty+=7;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,100,  104,7);
					break;
					
					case 4: // look alive! big bad ass
						tx=(lowDisplayW>>1)-59;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 32,128,  103,14);
					break;
					
					
					case 5: // move up to enter building
						tx=(lowDisplayW>>1)-54;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 72,72,  97,7);
					break;
					
					case 6: // get to pickup area asap!
						tx=(lowDisplayW>>1)-67;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 72,79,  121,14);
					break;
					
					case 7: // grab weapons
						tx=(lowDisplayW>>1)-70;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 92,114,  126,14);
					break;
					
					case 8 : // tremor
						tx=(lowDisplayW>>1)-22;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 72,93,  30,7);
					break;
					
					case 9: // told you..
						tx=(lowDisplayW>>1)-26;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 103,93,  37,7);
					break;
					
					
					case 10: // saving sorry ass
						tx=(lowDisplayW>>1)-66;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,176,  115,14);
					break;

					case 11: // grab more coins
						tx=(lowDisplayW>>1)-66;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 112,211,  91,7);
					break;
					
					case 12: // land mines
						tx=(lowDisplayW>>1)-64;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,218,  115,14);
					break;
					
					case 13: // shoot crates
						tx=(lowDisplayW>>1)-105;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,232,  191,14);
					break;
					
					case 14: // get moving 
						tx=(lowDisplayW>>1)-43;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,246,  67,7);
					break;
					
					case 15: // cover shoot
						tx=(lowDisplayW>>1)-100;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,253,  185,14);
					break;
					
					case 16: // deactivate beacons
						tx=(lowDisplayW>>1)-95;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,267,  171,7);
					break;

					case 17: // kick some ass
						tx=(lowDisplayW>>1)-46;
						ty=26;
						renderSubImageAtPoint(sprites[28], tx,ty, 103,114,  15,16);
						// text
						tx+=16;
						renderSubImageAtPoint(sprites[1], tx,ty, 0,274,  75,7);
					break;
				}
			}
			setAlpha(255);
		}
			

		


		// render controls
		if (!keyBoardOut && !myWorld.isCOOP && GameState==INGAME) {

			for (var button=4; --button>=0;) {
				tx = activePlayer.stickX[button];
				ty = activePlayer.stickY[button];
				
				switch (button) {
					case 0 : // left
						setAlpha(120);
						renderSubImageAtPoint(sprites[29], tx,ty, 0,0,  30,30);

						setAlpha(255);
						renderSubImageAtPoint(sprites[30], tx+8,ty+8, 84,60,  10,14);
					break;
					
					case 1 : // right
						setAlpha(120);
						renderSubImageAtPoint(sprites[29], tx,ty, 30,0,  30,30);
						
						setAlpha(255);
						renderSubImageAtPoint(sprites[30], tx+12,ty+8, 94,60,  10,14);
					break;

					case 2 : // up
						setAlpha(120);
						renderSubImageAtPoint(sprites[29], tx,ty, 60,0,  30,30);
						
						setAlpha(255);
						renderSubImageAtPoint(sprites[30], tx+8,ty+10, 104,60,  14,10);
					break;

					case 3 : // fire
						setAlpha(120);
						renderSubImageAtPoint(sprites[29], tx,ty, 60,0,  30,30);
						
						setAlpha(255);
						renderSubImageAtPoint(sprites[30], tx+8,ty+8, 104,70,  14,14);
					break;
				}
			}
			
			
			if (myWorld.isCOOP) {
				
				// arrow pointing at player1 (offscreen)
				setAlpha(255);
				if (!myPlayer.Died && myPlayer.y-myWorld.worldOffsetY<0) {
					tx=(myPlayer.x-myWorld.worldOffset);
					tx-=7;
					ty=1;

					renderSubImageAtPoint(sprites[1], tx,ty, 135,62,  14,9);
				}

				// arrow pointing at player2 (offscreen)
				if (!myPlayer2.Died && myPlayer2.y-myWorld.worldOffsetY<0) {
					tx=(myPlayer2.x-myWorld.worldOffset);
					tx-=7;
					ty=1;
					renderSubImageAtPoint(sprites[1], tx,ty, 135,62,  14,9);
				}
			}
			
			// pause
			setAlpha(120);
			tx=(lowDisplayW>>1)-6;
			ty=(lowDisplayH)-30;
			renderSubImageAtPoint(sprites[29], tx,ty, 90,14,  14,14);
			
			setAlpha(255);

		}

	}

	
	function renderUnlockedAchievement() {
		// render achievements
		if (popAchievementY < popAchievementYTarget) {
			popAchievementY += (popAchievementYTarget - popAchievementY) >> 1;
			if (popAchievementY > popAchievementYTarget - 2) {
				if (popAchievementDelay > 0)
					popAchievementDelay--;
				else
					popAchievementYTarget = -32;
			}
		} else if (popAchievementY > popAchievementYTarget) {
			popAchievementY -= (popAchievementY - popAchievementYTarget) >> 1;
			if (popAchievementY < popAchievementYTarget + 2)
				popAchievementY = popAchievementYTarget;
		}


		if (popAchievementY != popAchievementYTarget) {
			tx = (lowDisplayW>>1)-54;
			ty = popAchievementY;
			
			
			// background bar
			renderSubImageAtPoint(sprites[30], tx,ty, 0,128,  108,17);
			
			
			// render completion star
			if (popAchievementID>=0) {
				if (!activePlayer.isAchieved( popAchievementID )) {
					renderSubImageAtPoint(sprites[30], tx+4,ty+4, 66,145,  10,10);
				} else {
					renderSubImageAtPoint(sprites[30], tx+4,ty+4, 76,145,  10,10);
				}
			}
			
			renderAchievement(tx+20,ty+6,popAchievementID);
			
		}
	}
	
	
	
	
	
	function renderInfoBox(tmpPlayer, onRight) {
		if (tmpPlayer.stBoxY==48) playSound('FX_COIN');
		
		if (myPlayer.weapon>1) unlockAchievement(PlayerProfile.A_GRABNEWWEAPON);
		if (myPlayer.weapon==4) unlockAchievement(PlayerProfile.A_TAKEJETPACKRIDE);
		// v1.3.0
		if (myPlayer.weapon==9) unlockAchievement(PlayerProfile.A_EASTERBUNNY);

		tmpPlayer.stBoxY+=tmpPlayer.stBoxYSpeed;
		if (tmpPlayer.stBoxY<2 && tmpPlayer.stBoxYSpeed<4) tmpPlayer.stBoxYSpeed++;
		if (tmpPlayer.stBoxY>=0 && tmpPlayer.stBoxYSpeed>=0) {
			tmpPlayer.stBoxYSpeed=0;
			tmpPlayer.stBoxY=0;
		}				
		tmpPlayer.stFaceY+=tmpPlayer.stFaceYSpeed;
		if (tmpPlayer.stFaceY<2 && tmpPlayer.stFaceYSpeed<4) tmpPlayer.stFaceYSpeed++;
		if (tmpPlayer.stFaceY>=0 && tmpPlayer.stFaceYSpeed>=0) {
			tmpPlayer.stFaceYSpeed=0;
			tmpPlayer.stFaceY=0;
			
			if (tmpPlayer.stFaceDelay>0) tmpPlayer.stFaceDelay--;
			else {
				tmpPlayer.stAlpha-=16;
				if (tmpPlayer.stAlpha<=0) {
					tmpPlayer.stAlpha=0;
					tmpPlayer.stInfoID=-1;
				}
			}
		}

		setAlpha(tmpPlayer.stAlpha);
		
		// render info box
		if (onRight) tx=lowDisplayW-96;
		else tx=12;
		ty=22+tmpPlayer.stBoxY;
		renderSubImageAtPoint(sprites[30], tx,ty, 0,60,  84,25);
		
		// render info
		if (tmpPlayer.stInfoID<=Player.i_ITEMS) {
			// render "item"
			if (onRight) tx+=4;
			else tx+=13;
			ty+=5;
			renderSubImageAtPoint(sprites[1], tx,ty, 51,72,  19,7);
			ty+=9;
		}
		
		switch (tmpPlayer.stInfoID) {
			case Player.i_FLAMETHROWER:
				renderSubImageAtPoint(sprites[1], tx,ty, 0,72,  50,7);
			break;

			case Player.i_ELECTRO:
				renderSubImageAtPoint(sprites[1], tx,ty, 0,79,  42,7);
			break;

			case Player.i_JETPACK:
				renderSubImageAtPoint(sprites[1], tx,ty, 42,79,  29,7);
			break;

			case Player.i_GRENADES:
				renderSubImageAtPoint(sprites[1], tx,ty, 0,93,  33,7);
			break;
			
			case Player.i_SKULLGUN:
				renderSubImageAtPoint(sprites[1], tx,ty, 34,93,  35,7);
			break;
			
			case Player.i_DOUBLEGUN:
				renderSubImageAtPoint(sprites[1], tx,ty, 142,93,  27,7);
			break;
			
			// v1.3.0
			case Player.i_CHICKENGUN:
				renderSubImageAtPoint(sprites[1], tx,ty, 160,100,  43,7);
			break;
			
			case Player.i_TANK:
				renderSubImageAtPoint(sprites[1], tx,ty, 0,86,  71,7);
			break;
		}
		
		// render face box
		if (onRight) tx=lowDisplayW-23;
		else tx=2;
		ty=24+tmpPlayer.stFaceY;
		renderSubImageAtPoint(sprites[30], tx,ty, 105,32,  19,18);
		// face
		tx+=4;
		ty+=3;
		renderSubImageAtPoint(sprites[28], tx,ty, 160+(tmpPlayer.characterID*11),11,  11,12);
		
		setAlpha(255);
	}
	
	
	
	function renderSoldier( id,  tx,  ty) {
		if (id==7) return;
		
		var tx2;
	
		// render info box
		if (tx<(lowDisplayW>>1)) {
			tx2=2; 
			renderSubImageAtPoint(sprites[30], tx2+13,ty-7, 0,60,  84,25);
			tx+=17;
		} else {
			tx2=lowDisplayW-19;

			renderSubImageAtPoint(sprites[30], tx2-77,ty-7, 0,60,  84,25);
			tx=tx2-72;
		}

		if (!activePlayer.didUnlockCharacter(id) ) {
			// locked
			renderSubImageAtPoint(sprites[28], tx,ty, 142,130,  23,5);
		} else {
	
			renderSubImageAtPoint(sprites[30], tx2,ty-4, 105,32,  19,18);
			// face
			tx2+=4;
			renderSubImageAtPoint(sprites[28], tx2,ty, 160+(id*11),11,  11,12);
			
			ty-=2;
			switch (id) {
				case 0: // BA
					renderSubImageAtPoint(sprites[28], tx,ty, 0,109,  63,5);
				break;
				
				case 1: // rumble
					renderSubImageAtPoint(sprites[28], tx,ty, 64,109,  48,5);
				break;
				
				// v1.3.0
				case 2: // Scarlett Sonya
					renderSubImageAtPoint(sprites[28], tx,ty, 167,130,  52,5);
				break;
				
				case 3: //sly rocko
					renderSubImageAtPoint(sprites[28], tx,ty, 113,109,  32,5);
				break;
	
				case 4: // gun chick
					renderSubImageAtPoint(sprites[28], tx,ty, 145,109,  32,5);
				break;
	
				case 5: // evil priestly
					renderSubImageAtPoint(sprites[28], tx,ty, 178,109,  48,5);
				break;
	
			
				case 6: // sarge
					renderSubImageAtPoint(sprites[28], tx,ty, 227,109,  19,5);					
				break;
			}
	
			// tours
			ty+=6;
			renderSubImageAtPoint(sprites[28], tx,ty, 248,109,  21,5);
			// tour count
			setDigits(activePlayer.tours[id],scoreboard);
			foundFirst=false;
			tx2=tx+22;
			for (var i = 0; i < 6; i++) {
				if (foundFirst || scoreboard[i]!=0 || i==5) {
					renderSubImageAtPoint(sprites[30], tx2,ty, 29+(scoreboard[i]*3),25,  3,5);
					tx2+=4;
				}
			}
			
			
			
			                                 
			// awards
			ty+=6;
			tx2=tx;
			for (var i=1; i<16; i++) {
				if (activePlayer.maxLevelReached[id][i]>0) {
					renderSubImageAtPoint(sprites[28], tx2,ty, 282+(activePlayer.maxLevelReached[id][i]*3),28+(i*7),  3,7);
					tx2+=4;
				}
			}
		}
	}

	
	function renderCreditsNeeded(mx, my) {
		renderSubImageAtPoint(sprites[30], mx,my, 0,99,  33,14);
	}

	
	
var mySoundPool = new SoundPool(18);
var myGameMusic = -1;
var lastTune;

function initSounds() {

    // local running version won't support loading audio, so skip if running from filesystem
    // upload the game to a server to enjoy the sound effects

	if (window.location.protocol == "file:" || (params.noaudio && params.noaudio==1) ) {
		activePlayer.useMusic=false;
		activePlayer.useSFX=false;
		return;
	}



	// sound only works when running from an actual url, not locally
	// comment this out if running local

	// note: extensions are loaded in soundpool based on browser

	mySoundPool.load(soundRoot+'audio/fxsplash','FX_SPLASH');
	mySoundPool.load(soundRoot+'audio/fxjump','FX_JUMP');
	mySoundPool.load(soundRoot+'audio/fxland','FX_LAND');
	mySoundPool.load(soundRoot+'audio/fxdie','FX_DIE');
	mySoundPool.load(soundRoot+'audio/fxplop','FX_PLOP');
	mySoundPool.load(soundRoot+'audio/fxshoot','FX_SHOOT');
	mySoundPool.load(soundRoot+'audio/fxshoot1','FX_SHOOT2');
	mySoundPool.load(soundRoot+'audio/fxshoot2','FX_SHOOT3');
	mySoundPool.load(soundRoot+'audio/fxshoot3','FX_SHOOT4');
	mySoundPool.load(soundRoot+'audio/fxrocketshoot','FX_ROCKETSHOOT');		
	mySoundPool.load(soundRoot+'audio/fxexplode','FX_EXPLODE');
	mySoundPool.load(soundRoot+'audio/fxexplode2','FX_EXPLODE2');
	mySoundPool.load(soundRoot+'audio/fxchymlock','FX_CHYMLOCK');
	mySoundPool.load(soundRoot+'audio/fxchop','FX_CHOPPER');
	mySoundPool.load(soundRoot+'audio/fxclick','FX_CLICK');
	mySoundPool.load(soundRoot+'audio/fxpickup','FX_PICKUP');
	mySoundPool.load(soundRoot+'audio/fxbounce','FX_BOUNCE');
	mySoundPool.load(soundRoot+'audio/fxbigshoot','FX_BIGSHOOT');
	mySoundPool.load(soundRoot+'audio/fxflame','FX_FLAME');
	mySoundPool.load(soundRoot+'audio/fxcoin','FX_COIN');
	mySoundPool.load(soundRoot+'audio/fxbigshoot2','FX_BIGSHOOT2');
	mySoundPool.load(soundRoot+'audio/fxachieve','FX_ACHIEVE');
	mySoundPool.load(soundRoot+'audio/fxdrill','FX_DRILL');
	mySoundPool.load(soundRoot+'audio/fxworm','FX_WORM');
	mySoundPool.load(soundRoot+'audio/fxlaser','FX_LASER');
	mySoundPool.load(soundRoot+'audio/fxflame2','FX_FLAME2');
	mySoundPool.load(soundRoot+'audio/fxcoin2','FX_COIN2');
	mySoundPool.load(soundRoot+'audio/fxflame3','FX_FLAME3');
	mySoundPool.load(soundRoot+'audio/fxclang','FX_CLANG');		
	// v1.3.0
	mySoundPool.load(soundRoot+'audio/fxsteam','FX_STEAM');
	mySoundPool.load(soundRoot+'audio/fxchick','FX_CHICK');		

	/*
	  music removed from the opensourced version
        mySoundPool.load(soundRoot+'audio/tune1','TUNE1');
        mySoundPool.load(soundRoot+'audio/tune2','TUNE2');
        mySoundPool.load(soundRoot+'audio/tune3','TUNE3');
        mySoundPool.load(soundRoot+'audio/tune4','TUNE4');
        mySoundPool.load(soundRoot+'audio/tune5','TUNE5');
        mySoundPool.load(soundRoot+'audio/tune6','TUNE6');
	*/

}

 
	function playPlayerSounds( myPlayer) {
		if (myPlayer.doJumpSound) {
			myPlayer.doJumpSound = false;
			playSound('FX_JUMP');
		}

		if (myPlayer.doLandSound) {
			myPlayer.doLandSound = false;
			playSound('FX_LAND');
		}
		
		if (myPlayer.doShootSound) {
			myPlayer.doShootSound = false;
			//playSound('FX_SHOOT');
			
			switch (myPlayer.weapon) {
				case 2: 
					playSound('FX_FLAME');
				break;
				
				case 3:
					playSound('FX_LASER');
				break;
				
				case 6:
					playSound('FX_ROCKETSHOOT');
				break;
				
				case 7:
					playSound('FX_FLAME3');
				break;
				
				default:
					playShoot();
				break;
			}
		}

		if (myPlayer.doGrabSound) {
			myPlayer.doGrabSound = false;
			playSound('FX_PICKUP');
		}


	}


	
	function playShoot() {
		playSound('FX_SHOOT2'+getRandom(3));
	}
	
	
	function playSound( sound) {
		if (activePlayer.useSFX) {
			mySoundPool.playSound(sound,false);
		}
	}
	
	function playSoundPosition( sound,  location) {
		if (activePlayer.useSFX) {
			mySoundPool.playSound(sound,false);
		}
	}
	
	function stopAllSounds() {
//QQQ
	}

	function playBackground() {
		if (activePlayer.useMusic) {
			switch (lastTune) {
				default:
					myGameMusic=mySoundPool.playSound('TUNE1',true);
				break;
				case 1:
					myGameMusic=mySoundPool.playSound('TUNE2',true);
				break;
				case 2:
					myGameMusic=mySoundPool.playSound('TUNE3',true);
				break;
				case 3:
					myGameMusic=mySoundPool.playSound('TUNE4',true);
				break;
				case 4:
					myGameMusic=mySoundPool.playSound('TUNE5',true);
				break;
				case 5:
					myGameMusic=mySoundPool.playSound('TUNE6',true);
				break;
			}
		}
	}

	function stopBackground() {
		if (activePlayer.useMusic && myGameMusic && myGameMusic!=-1) mySoundPool.stopSound(myGameMusic);
	}

	function getMusic(justGetNext) {
		// randomly pick one of our tunes
		var newTune=lastTune;
		
		if (justGetNext) {
			newTune++;
			if (newTune>5) newTune=0;
		} else {
			while (newTune==lastTune) {
				newTune=getRandom(6);
			}
		}
		
		if (GameState==INMENU || GameState==INMAINMENU) newTune=0;
		
		lastTune=newTune;
				
	}
	
	function freeMusic() {
	}

	 function setDigits(value, digits) {
			var temp=Math.round(value);
			var i=2;
	
			for (i=0; i<digits.length; i++)	digits[i]=0;
			i=digits.length-1;
			while (i>=0) {
				digits[i] = temp % 10;
				temp = (temp/10)>>0;
				if (temp == 0) i=-1;
				else i--;
			}
			
	}
	
	
	function doControlls() {
		if (myPlayer.blockPlayerMovement && myPlayer2.blockPlayerMovement) return;

		var tmpY;
		var tmpX;

		myPlayer.leftPressed = false;
		myPlayer.rightPressed = false;
		myPlayer.jumpPressed = false;
		myPlayer.actionPressed = false;

		myPlayer2.leftPressed = false;
		myPlayer2.rightPressed = false;
		myPlayer2.jumpPressed = false;
		myPlayer2.actionPressed = false;
		
		// pause button
		if (!keyBoardOut) {
			tx=(lowDisplayW>>1)-6;
			ty=(lowDisplayH)-30;
//			tmpY = (lowDisplayH / 100) * ((100 / displayH) * mTouchY[0]);
//			tmpX = ((lowDisplayW) / 100) * ((100 / displayW) * mTouchX[0]);
			tmpY = (lowDisplayH / 100) * ((100 / displayH) * touchY);
			tmpX = ((lowDisplayW) / 100) * ((100 / displayW) * touchX);

			if (touchReleased && tmpX>=tx-4 && tmpX<=tx+18 && tmpY>=ty-4 && tmpY<=ty+18) {
				touchReleased=false;
				InitPauseMenu();
			}
			
			for (var button=4; --button>=0;) {
				tx = activePlayer.stickX[button];
				ty = activePlayer.stickY[button];
				
				tx-=4;
				ty-=4;
				if (ty<0) ty=0;
				if (tx<0) tx=0;
			
				//for (var j=mTouchX.length; --j >= 0;) {
				for (var j=mTouch.length; --j >= 0;) {

//					tmpY = (lowDisplayH / 100) * ((100 / displayH) * mTouchY[j]);
//					tmpX = ((lowDisplayW) / 100) * ((100 / displayW) * mTouchX[j]);

					tmpY = (lowDisplayH / 100) * ((100 / displayH) * mTouch[j].pageY);
					tmpX = ((lowDisplayW) / 100) * ((100 / displayW) * mTouch[j].pageX);
					
					if (tmpX>=tx && tmpX<=tx+40 && tmpY>=ty && tmpY<=ty+40) {
						switch (button) {
							case 0: 
								myPlayer.leftPressed=true;
							break;
							case 1: 
								myPlayer.rightPressed=true;
							break;
							case 2:  //jump
								myPlayer.jumpPressed=true;
							break;
							case 3: // shoot
								myPlayer.actionPressed=true;
							break;
						}
					}
				}
			}
				
	
		}



		if (backPressed && !backLocked) {
			backLocked = true;
			InitPauseMenu();
		}

		
		
		if (leftPressed) {
			myPlayer.leftPressed = true;
			leftLocked = true;
		}
		if (rightPressed) {
			myPlayer.rightPressed = true;
			rightLocked = true;
		}
		if (upPressed || actionButton1) {
			if (actionButton1) actionButton1Locked=true;
			myPlayer.jumpPressed = true;
		}

		if (actionButton2) {
			actionButton2Locked = true;
			myPlayer.actionPressed = true;
		}
		
		
		if (pl2_leftPressed) {
			myPlayer2.leftPressed = true;
			pl2_leftLocked = true;
		}
		if (pl2_rightPressed) {
			myPlayer2.rightPressed = true;
			pl2_rightLocked = true;
		}
		if (pl2_upPressed) {
			myPlayer2.jumpPressed = true;
		}

		if (pl2_actionButton1 || pl2_actionButton2) {
			if (pl2_actionButton1) pl2_actionButton1Locked = true; 
			else pl2_actionButton2Locked = true;
			myPlayer2.actionPressed = true;
		}
		
		
		
		
	}


	
	function setChapter() {
		worldChapterAlpha=0;
		worldChapterAlphaTarget=255;
		worldChapterDelay=64;
	}
	
	
	
	
	
	function initMenu() {
		destroyMap();
		GameState=INMENU;
		getMusic(false);
		
		menuSlide1=200;
		menuSlide2=0;
		
		//init clouds
		if (lowDisplayW>0) {
			for (var i=3; --i>=0;) {
				cloudX[i]=getRandom(lowDisplayW);
				cloudY[i]=getRandom(40);
			}
		}
		
		menuSelected1=myPlayer.characterID;
		menuSelected2=myPlayer2.characterID;
		// v1.3.0
		menuSelected2=-1;
		menuReady2=false;
		menuReady1=false; 
		
		menuSettingsItem=1;
		
		paused=false;
		
		activePlayer.saveSettings();

		nextState=INMENU;
		
		playBackground();
	}
	
	
	function InitPauseMenu() {
		paused=true;
		GameState=INPAUSE;
		menuSettingsItem=0;
		
		menuSettingsItem=1;
		
		menuSlide1=200;
		menuSlide2=0;
		
		stopBackground();
	}
	
	
	function initContinue() {
		paused=true;
		continueUseCount=9;
		GameState=INCONTINUE;
	}
	
	function initAnimation() {
		GameState=INANIMATION;

		statusBarY=-200;
		statusBarTarget=4;
		generalAlpha=0;
		generalAlphaTarget=255;
		
		switch (worldOrder[world]) {
			
			case 1:
				sprites[26]=myLoadManager.getAsset('anim01.png');
			break;
			
			case 2:
				sprites[26]=myLoadManager.getAsset('anim02.png');
			break;

			case 3:
				sprites[26]=myLoadManager.getAsset('anim03.png');
			break;

			case 4:
				sprites[26]=myLoadManager.getAsset('anim04.png');
			break;

			case 5:
				sprites[26]=myLoadManager.getAsset('anim05.png');
			break;
			
			// v1.3.0
			case 6:
				sprites[26] = myLoadManager.getAsset('anim06.png');
			break;
			
			default:
				stopBackground();
				GameState=INITMAP;
			break;
		}
	}
	
	
	function swapMissions( source,  destination) {
		splashY=activePlayer.getMission(source);
		var tmpY=missionY[source];
		var tmpX=missionX[source];
		var tmpA=missionAlpha[source];
		
		activePlayer.setMission(source, activePlayer.getMission(destination));
		missionY[source]=missionY[destination];
		missionX[source]=missionX[destination];
		missionAlpha[source]=missionAlpha[destination];
		
		activePlayer.setMission(destination, splashY);
		missionY[destination]=tmpY;
		missionX[destination]=tmpX;
		missionAlpha[destination]=tmpA;
	}
	
	
	function renderAchievement( px,  py,  achieveID) {
		var idd;
		// v1.3.0
		if (achieveID==-888) {
			renderSubImageAtPoint(sprites[30], px+6,py, 170,85, 51,7);
		} else if (achieveID==-99) {
			renderSubImageAtPoint(sprites[30], px+6,py, 131,0, 55,7);
		} else if (activePlayer.getAchievement( achieveID ) <0) {
			return;
		} else if (activePlayer.getAchievement( achieveID ) <15) {
			
			idd=activePlayer.getAchievement(achieveID)+1;
			if (idd>9) {
				renderSubImageAtPoint(sprites[30], px,py, 60,0, 6,7);

				renderSubImageAtPoint(sprites[30], px+6,py, 54+((idd-10)*6),0, 6,7);
				px+=6;
			} else {
				renderSubImageAtPoint(sprites[30], px,py, 54+((idd)*6),0, 6,7);
			}	
			
			renderSubImageAtPoint(sprites[27], px+6,py, 34,0, 33,7);
			// in 1 run
			renderSubImageAtPoint(sprites[27], px+41,py, 90,42, 37,7);
	
		} else if (achieveID>=0) {
			idd=activePlayer.getAchievement( achieveID );
			
			if (idd>=50) {
				// right side of the image
				renderSubImageAtPoint(sprites[27], px,py, 128,(idd-50)*7, 88,7);
			} else {
				renderSubImageAtPoint(sprites[27], px,py, 0,(idd-14)*7, 88,7);
			}
		}
	}	
	
	
	function fetchMissions(missionid) {
		var missionGroup=missionid;
		if (missionGroup<0) {
			missionGroup=0;
			activePlayer.setMission(0, -1);
			activePlayer.setMission(1, -1);
			activePlayer.setMission(2, -1);
		}
		
		var i=0;
		var done=false;
		
		// we only allow 1 "complete mission" objective each time
		var setMissionCompleteMission = false;
		// and only allow 1 "play as"
		var playWithMission=false;
		
		if (activePlayer.getMission(0)>=0 && activePlayer.getMissionAchieveID(0)<PlayerProfile.A_RESQUESLY) setMissionCompleteMission=true;
		else if (activePlayer.getMission(1)>=0 && activePlayer.getMissionAchieveID(1)<PlayerProfile.A_RESQUESLY) setMissionCompleteMission=true;
		else if (activePlayer.getMission(2)>=0 && activePlayer.getMissionAchieveID(2)<PlayerProfile.A_RESQUESLY) setMissionCompleteMission=true;
		
		if (activePlayer.getMissionAchieveID(0)>=PlayerProfile.A_RESQUESLY && activePlayer.getMissionAchieveID(0)<=PlayerProfile.A_RESQUESARGE) playWithMission=true;
		else if (activePlayer.getMissionAchieveID(1)>=PlayerProfile.A_RESQUESLY && activePlayer.getMissionAchieveID(1)<=PlayerProfile.A_RESQUESARGE) playWithMission=true;
		else if (activePlayer.getMissionAchieveID(2)>=PlayerProfile.A_RESQUESLY && activePlayer.getMissionAchieveID(2)<=PlayerProfile.A_RESQUESARGE) playWithMission=true;
		
		// find the first 3 missions that are unachieved
		while (i<PlayerProfile.A_MAXACHIEVEMENTS && missionGroup<3 && !done) {
			if (!activePlayer.isAchieved(i) && i!=activePlayer.getMission(0) && i!=activePlayer.getMission(1) && i!=activePlayer.getMission(2)
				&& (activePlayer.getAchievement(i)>=PlayerProfile.A_RESQUESLY || !setMissionCompleteMission)
				&& (activePlayer.getAchievement(i)<PlayerProfile.A_RESQUESLY || activePlayer.getAchievement(i)>PlayerProfile.A_RESQUESARGE || !playWithMission)
			) {
				activePlayer.setMission(missionGroup, i);

				if (activePlayer.getAchievement(i)<PlayerProfile.A_RESQUESLY) setMissionCompleteMission=true;
				if (activePlayer.getAchievement(i)>=PlayerProfile.A_RESQUESLY && activePlayer.getAchievement(i)<=PlayerProfile.A_RESQUESARGE) playWithMission=true;
				
				missionGroup++;
				if (missionid>=0) done=true;
			}
			i++;
		}
	}

	function resetMissionBars() {
		missionY[0]=200;
		missionY[1]=300;
		missionY[2]=400;
		
		missionX[0]=(lowDisplayW>>1)-54;
		missionX[1]=(lowDisplayW>>1)-54;
		missionX[2]=(lowDisplayW>>1)-54;
		
		missionAlpha[0]=255;
		missionAlpha[1]=255;
		missionAlpha[2]=255;

		missionAge=0;
	}
	
	
	// check if a specific achievement is in the current mission list
	function isCurrentMission( id) {
		if (activePlayer.getMissionAchieveID(0)==id || activePlayer.getMissionAchieveID(1)==id || activePlayer.getMissionAchieveID(2)==id) return true;
		else return false;
	}
	
	
	function initMissions() {
	
		if (GameState!=INSETTINGS) {
			// only show if we actually achieved some stuff just now
			if (!activePlayer.isAchieved(activePlayer.getMission(0)) &&
				!activePlayer.isAchieved(activePlayer.getMission(1)) &&
				!activePlayer.isAchieved(activePlayer.getMission(2))) {

				menuSlide1=200;
				menuSlide2=0;
				GameState=nextState;
				
				if (nextState==INANIMATION) initAnimation();
				
				return;
			}
		} else {
			// v2.0.5
			menuSlide1=0;
			menuSlide2=200;
			// v2.0.5
			nextState=INMAINMENU;
		}

		
		missionShake=8;

		resetMissionBars();
		GameState=INMISSIONS;
	}
	
	
	
	function initMissionsAll() {
		menuSelected1=0;
		menuSelectedY1=16;	// offset in list
		menuSelectedY2=0;	// used for scroll speed
		
		startTouchY=-1;
		endTouchY=-1;
		
		GameState=INALLMISSIONS;
	}	
	
	function initGame( playerID,  playerID2) {
		//sprites[0].recycle();
		//sprites[14].recycle();

		for (var i=16; --i>=0;) {
			characterUnlockAdded[i]=false;
		}
	
		
		
		
		SecretWorldLoad=-1;
		lastWorld=-1;
		world=1;
		level=1;
		// v1.3.0
		myWorld.level=level;
		
		
		// DEBUG
		//level=3;
		
		continueUseCount=0;
		

		myPlayer.score=0;
		myPlayer.coins=0;
		myPlayer.hasContinue=false;

		myPlayer.gameReset();
		myPlayer2.gameReset();
		GameState=INITMAP;
		

		myPlayer.characterID=playerID;
		myPlayer2.characterID=playerID2;
		
		
		switch (myPlayer.characterID) {
				
			case 0:	// Bad Ass Baracuda
				sprites[0]=myLoadManager.getAsset('playerba.png');
			break;
			
			case 1: // Johnny Rumble
				sprites[0]=myLoadManager.getAsset('playerb.png');
			break;
			
			
			// v1.3.0
			case 2: // Scarlett Sony
				sprites[0] = myLoadManager.getAsset('playerps.png');
			break;
			
			
			case 3: // Sly Rocko
				sprites[0]=myLoadManager.getAsset('playersr.png');
			break;
			
			
			case 4: // Gun Chick
				sprites[0]=myLoadManager.getAsset('playergc.png');
			break;
			
			case 5: // Willis Kiyay /  Evil Priesty
				sprites[0]=myLoadManager.getAsset('playerwm.png');
			break;
			
			case 6: // Sarge
				sprites[0]=myLoadManager.getAsset('players.png');
			break;
			
			
			case 7: // none
			break;

		}

		
		switch (myPlayer2.characterID) {
			
			case 0:	// Bad Ass Baracuda
				sprites[14]=myLoadManager.getAsset('playerba.png');
			break;
			
			case 1: // Johnny Rumble
				sprites[14]=myLoadManager.getAsset('playerb.png');
			break;
			
			
			// v1.3.0
			case 2: // Scarlett Sonya
				sprites[14] = myLoadManager.getAsset('playerps.png');
			break;
			
			
			case 3: // Sly Rocko
				sprites[14]=myLoadManager.getAsset('playersr.png');
			break;
			
			
			case 4: // Gun Chick
				sprites[14]=myLoadManager.getAsset('playergc.png');
			break;
			
			case 5: // Evil Priesty
				sprites[14]=myLoadManager.getAsset('playerwm.png');
			break;
			
			case 6: // Sarge
				sprites[14]=myLoadManager.getAsset('players.png');
			break;
			
			
			case 7: // none
			break;
	
		}
		
		
		// BA starts in Egypt
		if (playerID==0) world=4;
		
		// v1.3.0  - Scarlett Sonya
		if (playerID==2) world=6;
		
		// Sly Rocko starts in Jungle
		if (playerID==3) world=2;

		// Gunchick temporary starts in Gameboy land
//		if (playerID==4) world=6;	

		// Willis starts in Siberia
		if (playerID==5) world=3;
		
		// Sarge in Hell
		if (playerID==6) world=5;

        if (myWorld.isCOOP) world=1;

		// clear world sequence
		for (var i=1; i<16; i++) {
			worldOrder[i]=world;
			world++;
			
			if (world>6 && playerID==2) world=2;
			if (world>6) world=1;
		}
		
		// now start at first slot of the worldOrder
		world=1;

		fetchMissions(-1);
		
		
		
		switch (myPlayer.characterID) {
			case 0:	// Bad Ass Baracuda
				unlockAchievement(PlayerProfile.A_RESQUEBA);
			break;
			
			// v1.3.0
			case 2: // Scarleyy Sonya
				unlockAchievement(PlayerProfile.A_RESQUESONYA);
			break;
		
			case 3: // Sly Rocko
				unlockAchievement(PlayerProfile.A_RESQUESLY);
			break;
		
			case 5: // Willis Kiyay /  Evil Priesty
				unlockAchievement(PlayerProfile.A_RESQUEWILLIS);
			break;
		
			case 6: // Sarge
				unlockAchievement(PlayerProfile.A_RESQUESARGE);
			break;
		}
		
		
		if (level==1) initAnimation();
		else stopBackground();
		
	}
	
	function generalInit( infoID) {
		generalInfo=infoID;
		generalAlpha=0;
		generalAlphaTarget=180;
		generalDelay=112;
	}
	
	
	function initDied() {
		GameState=INDIED;
		generalAlpha=0;
		generalAlphaTarget=180;
		generalDelay=96;
		generalInfo=0;
		
		// find first and amount of digits
		foundFirst=false;
		statusBarY=0;
		for (var i = 0; i < 6; i++) {
			if ((!foundFirst && scoreboard[i]!=0) || (!foundFirst && i==5)) {
				foundFirst=true;
				statusBarY=i;
			}
		}
	}
	
	
	
	

	function freeWorld() {
		sprites[2] = null;
		sprites[7] = null;
		sprites[8] = null;
		sprites[15] = null;
	}

	
	function loadWorld() {
		var mx;
		var my;
		var mw;

		freeWorld();

		
		// load inside of building?
		if (!myWorld.isInDoor && (myPlayer.doorLoadRoom || myPlayer2.doorLoadRoom) ) {
			sprites[2]=myLoadManager.getAsset('p02.png');
			sprites[7]=myLoadManager.getAsset('t02.png');
			sprites[8]=myLoadManager.getAsset('p01b.png');
		} else {
			gaveContinueOption=false;
			
			// load graphical world
			switch (worldOrder[world]) {
				case 1: // plane yard
					sprites[2]=myLoadManager.getAsset('p01.png');
					sprites[7]=myLoadManager.getAsset('t01.png');
					sprites[8]=myLoadManager.getAsset('p01b.png');
					
					sprites[15]=myLoadManager.getAsset('boss1.png');
				break;
				
				
				
				case 2: // jungle
					sprites[2]=myLoadManager.getAsset('p04.png');
					sprites[7]=myLoadManager.getAsset('t04.png');
					sprites[8]=myLoadManager.getAsset('p04b.png');
					sprites[15]=myLoadManager.getAsset('boss2.png');
				break;
				

				
				case 3: // syberia
					sprites[2]=myLoadManager.getAsset('p05.png');
					sprites[7]=myLoadManager.getAsset('t05.png');
					sprites[8]=myLoadManager.getAsset('p05b.png');
					sprites[15]=myLoadManager.getAsset('boss3.png');
				break;
				
				
				case 4: // egypt
					sprites[2]=myLoadManager.getAsset('p06.png');
					sprites[7]=myLoadManager.getAsset('t06.png');
					sprites[8]=myLoadManager.getAsset('p06b.png');
					sprites[15]=myLoadManager.getAsset('boss4.png');
				break;

				case 5: // hell
					sprites[2]=myLoadManager.getAsset('p07.png');
					sprites[7]=myLoadManager.getAsset('t07.png');
					sprites[8]=myLoadManager.getAsset('p07b.png');
					sprites[15]=myLoadManager.getAsset('boss5.png');
					
					// init flames
					ty=0;
					for (var i=6; --i>=0;) {
						cloudY[i]=ty;
						ty+=32;
						if (ty>96) ty=0;
					}
					nextCloud=0;
				break;
				
				// v1.3.0 - Subbase
				case 6: // Sub-base
					sprites[2]=myLoadManager.getAsset('p10.png');
					sprites[7]=myLoadManager.getAsset('t10.png');
					sprites[8]=myLoadManager.getAsset('p10b.png');
					sprites[15]=myLoadManager.getAsset('boss6.png');
				break;
				
				case 7: // underground
					sprites[2]=myLoadManager.getAsset('p03.png');
					sprites[7]=myLoadManager.getAsset('t01.png');
					sprites[8]=myLoadManager.getAsset('p01b.png');
					sprites[15]=myLoadManager.getAsset('boss1.png');
				break;
			}
		}
		
		
		
		if (!myWorld.isInDoor && (myPlayer.doorLoadRoom || myPlayer2.doorLoadRoom) ) {

			// load and generate "building inside"

			copyWorld.copyWorld(myWorld);
			if (myPlayer.doorLoadRoom) {
				copyWorld.doorX=myPlayer.x;
				copyWorld.doorY=myPlayer.y;
			} else {
				copyWorld.doorX=myPlayer2.x;
				copyWorld.doorY=myPlayer2.y;
			}
			copyWorld.oldPlayerX=myPlayer.x;
			copyWorld.oldPlayerY=myPlayer.y;
			copyWorld.oldPlayer2X=myPlayer2.x;
			copyWorld.oldPlayer2Y=myPlayer2.y;
			
			for (var i=0;i<monsterList.length - 1; i++) {
				copyMonsterList[i].copy(monsterList[i]);
			}
			
			
			if (myPlayer.doorTargetID==5) loadShopRoom();
			else loadZoneRoom(-1);
			
			
			
			myPlayer.doorLoadRoom=false;
			myPlayer2.doorLoadRoom=false;
			
			
		} else if (myWorld.isInDoor) {
			
			
			// get back our real world, we are leaving a room
			// restore previous world
			// put both players at the door location
			
			myWorld.copyWorld(copyWorld);

			if (myPlayer.Died){
				myPlayer.init(myWorld.oldPlayerX>>4,myWorld.oldPlayerY>>4);
				myPlayer.Died=true;
				myPlayer.setDieFrame();
			} else {
				myPlayer.init(myWorld.doorX>>4,myWorld.doorY>>4);
			}
			
			if (myWorld.isCOOP) {
				if (myPlayer2.Died){ 
					myPlayer2.init(myWorld.oldPlayer2X>>4,myWorld.oldPlayer2Y>>4);
					myPlayer2.Died=true;
					myPlayer.setDieFrame();
				} else {
					myPlayer2.init(myWorld.doorX>>4,myWorld.doorY>>4);
				}
			
			} else {
				myWorld.worldOffset=(myPlayer.x-128);
			}
			
			myWorld.isInDoor=false;
			myPlayer.doorLoadRoom=false;
			myPlayer2.doorLoadRoom=false;
			
			for (var i=0;i<monsterList.length - 1; i++) {
				monsterList[i].copy(copyMonsterList[i]);
			}
			
			
			
		} else if (level==3) {
				
				getMusic(false);

				// generate an end-of-world boss level
			
				destroyMap();
				
				// add some random blocks
				mx=0;
				my=6;
				mw=TileMap.MAPWIDTH;
				
				myWorld.reinit();
				myWorld.isInDoor=false;
				if (worldOrder[world]!=3) {
					myWorld.lockVertical=true;
					myWorld.lockVerticalValue=-32;
				}
				myWorld.worldParallaxType=TileMap.pFULL;
				
				if (worldOrder[world]==5) myWorld.put(mx,my,mw,1,TileMap.cTILE);
				else myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
				// unjumpable ledge (I hope)
				//myWorld.put(48,0,20,11,TileMap.cTILE);

				myPlayer.init(3,-3);
				myPlayer2.init(2,-4);
				
				// add the boss
				switch (worldOrder[world]) {
					case 1:
						monsterAdd(Monster.mBOSS2, 32, my-1, 15, 0);
					break;
					
					case 2:
						myWorld.put( 27, my-2, 3,1, TileMap.cTILE);
						myWorld.put( 30, my-4, 1,1, TileMap.cTILE);
						
						monsterAdd(Monster.mBOSS3, 32, my-1, 15, 0);
					break;
					
					
					case 3:
						monsterAdd(Monster.mBOSS4, 24, my-1, 15, 0);
					break;
					
					case 4:
						myWorld.put( 27, my-2, 3,1, TileMap.cTILE);
						myWorld.put( 24, my-4, 3,1, TileMap.cTILE);
						monsterAdd(Monster.mBOSS5, 32, my-1, 15, 0);
					break;
					
					
					case 5: // hell
						tx=24;
						
						myWorld.put( tx-7, my-4, 3,1, TileMap.cTILE);
						myWorld.put( tx-6, my-2, 3,1, TileMap.cTILE);
						
						// right side
						myWorld.put( tx+4, my-2, 3,1, TileMap.cTILE);
						myWorld.put( tx+5, my-4, 3,1, TileMap.cTILE);
						
						myWorld.put(tx-1,my,2,1,TileMap.cEMPTY);
						
						monsterAdd(Monster.mBOSS6, tx-3, 0, 15, 0);
					break;
					
					// v1.3.0
					case 6: // marinedock
						myWorld.put( 17, my-2, 3,1, TileMap.cTILE);
						monsterAdd(Monster.mBOSS7, 22, my-1, 15, 0);
					break;
					
				}
				
				
				// add some randomly blocks as celing
				myWorld.generate();

				if (worldOrder[world]==4) myWorld.generateZoneTwo();
				else if (worldOrder[world]==5) myWorld.generateZoneThree();
				else myWorld.generateZoneOne();
				
				// sprinkle some soldiers at the start
				tx=4+getRandom(16);
				while (tx<26) {
					// find floor
					ty=TileMap.MAPHEIGHT-1;
					while (ty>0 && myWorld.isSolid(tx,ty)) ty--;

					if (ty>0) monsterAdd(Monster.mSOLDIER, tx,ty, 5, getRandom(2));
					
					tx+=1+getRandom(8);
				}

				// add random crates 
				tx=1+getRandom(16);
				while (tx<20) {
					// find floor
					//ty=TileMap.MAPHEIGHT-1;
					ty=0;
					while (ty<TileMap.MAPHEIGHT-1 && !myWorld.isSolid(tx,ty)) ty++;
					ty--;
					// add some ammo crates and medi crates
					if ((tx<30 || tx>36) && isMonsterFree(tx,ty)) {
						monsterAdd(Monster.mCRATE, tx,ty, 12, 2);
						myWorld.setTile(tx, ty, TileMap.cTILE);
						if (getRandom(80)<16) {
							monsterAdd(Monster.mCRATE, tx,ty-1, 12, 1);
							myWorld.setTile(tx, ty-1, TileMap.cTILE);
						}
					}
					tx+=1+getRandom(12);
				}
			
				
				
				// hunt down the ground spot for our teleporter out of here
				my=0;
				mx=42;
				while (!myWorld.isSolid(mx, my) && my<TileMap.MAPHEIGHT) my++;

				my--;
				// resque chopper
				if (!myWorld.isSolid(mx+1,my+1)) monsterAdd(Monster.mDROPSHIP, mx-1,my-1, 12, 1);
				else monsterAdd(Monster.mDROPSHIP, mx-1,my-1, 12, 1);
				
				
				// lock level
				monsterAdd(Monster.mCHYM, 47,5, 3, 999);
				
				if (!myPlayer.Died) myPlayer.onChute=true;
				if (!myPlayer2.Died) myPlayer2.onChute=true;
		} else {
				
			getMusic(false);
			
			// generate standard level
			if (!myPlayer.Died)	myPlayer.onChute=true;
			if (!myPlayer2.Died) myPlayer2.onChute=true;
			
			
			if (worldOrder[world]>=1 && worldOrder[world]<=4) loadZone();
			if (worldOrder[world]==5) loadZoneHell();
			if (worldOrder[world]==6) loadZoneMarine();			
			
		}
		
		
		
		myWorld.world=worldOrder[world];
		setAlpha(255);
		myWorld.preRender(sprites[7], myMapCanvas);
	
	}
	
	
	
	function loadSecretWorld( nWorld) {
		freeWorld();
		SecretWorldLoad=-1;
		
		// load graphical world
		switch (nWorld) {
			case 1: // Arcade world!
				sprites[2]=myLoadManager.getAsset('p100.png');
				sprites[7]=myLoadManager.getAsset('t100.png');
				sprites[8]=myLoadManager.getAsset('p01b.png');
				sprites[15]=myLoadManager.getAsset('boss1.png');
				
				loadZoneKong();
			break;
			
			
			case 2: // "Mario"
				sprites[2]=myLoadManager.getAsset('p101.png');
				sprites[7]=myLoadManager.getAsset('t101.png');
				sprites[8]=myLoadManager.getAsset('p101b.png');
				sprites[15]=myLoadManager.getAsset('boss1.png');
				
				loadZonePlatform();
			break;

			
			case 3: // "Railroad"
				sprites[2]=myLoadManager.getAsset('p102.png');
				sprites[7]=myLoadManager.getAsset('t102.png');
				sprites[8]=myLoadManager.getAsset('p102b.png');
				sprites[15]=myLoadManager.getAsset('boss1.png');
				
				loadZoneTrain();
				
				unlockAchievement(PlayerProfile.A_CHOOCHOO);
			break;
			
			
			case 4: // Gameboy/Stardash
				sprites[2]=myLoadManager.getAsset('p08.png');
				sprites[7]=myLoadManager.getAsset('t08.png');
				sprites[8]=myLoadManager.getAsset('p01b.png');
				sprites[15]=myLoadManager.getAsset('boss1.png');
				
				loadZoneGB();
			break;
			
			// v1.2.0 dr who
			case 5:
				// select a random world
				var j=world;
				// v1.3.0 change all 5's to 6's
				world+=(1+ getRandom(6) );
				while (world>6) world-=6;
				if (world==j) world++;
				while (world>6) world-=6;

				level=1;
				
				// restore player health
				myPlayer.gameReset();
				myPlayer2.gameReset();

				myWorld.isInDoor=false;
				
				GameState=INANIMATION;

				statusBarY=-200;
				statusBarTarget=4;
				generalAlpha=0;
				generalAlphaTarget=255;
				// v1.2.0 - who
				sprites[26] = myLoadManager.getAsset('anim99.png');

				return;
			
			// v1.3.0 - sketch world
			case 6: 
				sprites[2]=myLoadManager.getAsset('p103.png');
				sprites[7]=myLoadManager.getAsset('t103.png');
				sprites[8]=myLoadManager.getAsset('p01b.png');
				
				sprites[15]=myLoadManager.getAsset('boss1.png');
				
				loadZoneSketch();
				
				unlockAchievement(PlayerProfile.A_SKETCH);
			break;
			
		}
		
			
//		getMusic();
		
		// generate standard level
		if (!myPlayer.Died)	myPlayer.onChute=true;
		if (!myPlayer2.Died) myPlayer2.onChute=true;
			
		
		myWorld.world=100+nWorld;
		setAlpha(255);
		myWorld.preRender(sprites[7], myMapCanvas);
	}
	
	function endSecretWorld() {
		var completed=!myPlayer.Died;
		
		// v1.3.0
		if (myWorld.isCOOP && !myPlayer2.Died) completed=true;
		
		freeWorld();

		// load inside of building
		sprites[2]=myLoadManager.getAsset('p02.png');
		sprites[7]=myLoadManager.getAsset('t02.png');
		sprites[8]=myLoadManager.getAsset('p01b.png');

		myPlayer.Died=false;
		myPlayer.gameReset();
		myPlayer.init(myPlayer.x>>4, -3);
		myPlayer.onChute=false;

		if (myWorld.isCOOP) {
			myPlayer2.gameReset();
			myPlayer2.init(myPlayer2.x>>4, -3);
			myPlayer2.onChute=false;
		}
		
		// restore the correct room
		switch (myWorld.world) {
			case 101: // move back to the Arcade
				loadZoneRoom(300);
				
				if (completed) {
					fxAdd(myPlayer.x-32,myPlayer.y-40,FX.fRATAT,13);
					// add coin-spawner
					monsterAdd(Monster.mAVATAR,myPlayer.x>>4, myPlayer.y>>4, 12,999);
				} else {
					fxAdd(myPlayer.x-32,myPlayer.y-40,FX.fRATAT,14);
				}
			break;
			
			case 102: // move back to Pipe
				loadZoneRoom(301);
			break;

			case 103: // move back to ticketmachine
				loadZoneRoom(302);
				
				if (completed) {
					fxAdd(myPlayer.x-32,myPlayer.y-40,FX.fRATAT,13);
					// add coin-spawner
					monsterAdd(Monster.mAVATAR,myPlayer.x>>4, myPlayer.y>>4, 12,999);
				} else {
					fxAdd(myPlayer.x-32,myPlayer.y-40,FX.fRATAT,30);
				}
				
			break;

			case 104: // move back to gameboyroom
				loadZoneRoom(303);
			break;
			
			// v1.3.0
			case 106:
				loadZoneRoom(304);
				
				if (completed) {
					fxAdd( myPlayer.x-32 , myPlayer.y-40,FX.fRATAT,13);
					// add coin-spawner
					monsterAdd(Monster.mAVATAR,myPlayer.x>>4, myPlayer.y>>4, 12,999);
				} else {
					fxAdd( myPlayer.x-32 , myPlayer.y-40,FX.fRATAT,36);
				}
				
			break;
			
		}
		
		
		statusBarTarget=0;
		
		myWorld.world=worldOrder[world];
		setAlpha(255);
		myWorld.preRender(sprites[7], myMapCanvas);
	}
	
	
	function loadUnderground() {
		destroyMap();
		
		// add some random blocks
		var mx=0;
		var my=6;
		var mw=TileMap.MAPWIDTH;
		var mw2=0;
		
		myWorld.reinit();
		myWorld.isInDoor=false;
		myWorld.lockVertical=true;
		myWorld.lockVerticalValue=0;
		myWorld.worldParallaxType=TileMap.pSIMPLE;
		myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
		myWorld.put(mx,0,mw,2,TileMap.cTILE);
		myWorld.put(0,0,2,TileMap.MAPHEIGHT,TileMap.cTILE);
		myWorld.put(TileMap.MAPWIDTH-2,0,2,TileMap.MAPHEIGHT,TileMap.cTILE);
		
		// create first compartments
		mx=8;
		myWorld.put(mx,0,3,4,TileMap.cTILE);
		monsterAdd(Monster.mDOOR,mx+1,4,12,1);
		mx+=16;
		myWorld.put(mx,0,3,4,TileMap.cTILE);
		monsterAdd(Monster.mDOOR,mx+1,4,12,1);
		
		// create welcome dude
		monsterAdd(Monster.mAVATAR, 6,5, 6, 10);
		
		// create random compartments
		while (mx<TileMap.MAPWIDTH-10) {
			myWorld.put(mx,0,3,4,TileMap.cTILE);
			mx+=16+getRandom(12);
		}
		
		
		myPlayer.init(3,my-1);
		myPlayer2.init(2,my-2);
		
		myWorld.generate();
		
		// add random crates all over
		tx=8+getRandom(16);
		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=TileMap.MAPHEIGHT-1;
			while (ty>0 && myWorld.isSolid(tx,ty)) ty--;
			
			// make sure there are no other objects placed here
			if (isMonsterFree(tx,ty) && !myWorld.isSolid(tx,ty-1) && !myWorld.isSolid(tx,ty-2)) {
				monsterAdd(Monster.mCRATE, tx,ty, 12, 0);
				myWorld.setTile(tx, ty, TileMap.cTILE);
			}
			tx+=1+getRandom(16);
		}

		
		
		// add random avatars
		tx=26+getRandom(16);
		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=TileMap.MAPHEIGHT-1;
			while (ty>0 && myWorld.isSolid(tx,ty)) ty--;
			
			// make sure there are no other objects placed here
			if (isMonsterFree(tx,ty) && !myWorld.isSolid(tx,ty-1) && !myWorld.isSolid(tx,ty-2)) {
				monsterAdd(Monster.mAVATAR, tx,ty, 6, getRandom(3));
			}
			tx+=1+getRandom(16);
		}		
		
	}
	
	
	
	// shooter zone, outdoor, rough terrain, lots of stuff, boosters and buildings
	// used for World1, World2
	function loadZone() {
		var lastChym=0;
		var nextChym=32;
		var lastTripod=32;
		var lastPlatform=0;
		var lastJetpack=20;
		var lastGrenadier=32;
		var lastMine=16;
		var lastBouncer=20;
		var lastBuilding=32;
		var lastDropShip=4;
		var lastTank=0;
		
		var lastGap=2000;
		
		var stillRoomToPlace;	// set to false if a big object was placed at location
		var inGap;
		
		if (worldOrder[world]==2) lastTank=80;
		else lastTank=24;
		
		
		if (worldOrder[world]==3) lastGap=20+getRandom(48);
		if (worldOrder[world]==4) lastTripod=4;
		if (worldOrder[world]==5) lastGap=8;
		
		destroyMap();
		
		
		// add some random blocks
		var mx=0;
		var my=6;
		var mw=8;
		var mw2=0;
		
		myWorld.reinit();
		myWorld.isInDoor=false;
		myWorld.lockVertical=false;
		myWorld.worldParallaxType=TileMap.pFULL;
		
		// generate tutorial area
		if (activePlayer.showTutorial && worldOrder[world]==1 && !myWorld.isCOOP) {
			myWorld.inTutorial=true;
			activePlayer.didHints[PlayerProfile.HINT_ENTERBUILDINGS]=false;
			mw=16;
			myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
			monsterAdd(Monster.mGENERAL, mx+6, my-1,12, 14); // get moving rookie
			mx+=mw;
			
			// jumping
			my-=2;
			mw=10;
			myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
			// land crates!
			monsterAdd(Monster.mCRATE, mx+6,my-1, 12, 0);
			monsterAdd(Monster.mCRATE, mx+6,my-2, 12, 0);
			monsterAdd(Monster.mCRATE, mx+7,my-1, 12, 0);
			monsterAdd(Monster.mGENERAL, mx+2, my-1,12, 13); // crates

			mx+=mw;
			my+=2;
			mw=12;
			myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
			// landmine
			monsterAdd(Monster.mMINE, mx+6, my-1,12, 0);  
			monsterAdd(Monster.mGENERAL, mx, my-1,12, 12); // landmines
			
			mx+=mw;
			my-=1;
			mw=12;
			myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
			// crates cover system
			monsterAdd(Monster.mCRATE, mx+3,my-1, 12, -99);
			monsterAdd(Monster.mGENERAL, mx+2, my-1,12, 15); // crates-cover
			
			monsterAdd(Monster.mSOLDIER, mx+7,my-1, 5, getRandom(2));
			monsterAdd(Monster.mSOLDIER, mx+9,my-1, 5, getRandom(2));
			mx+=mw;
			
			// building
			my-=1;
			mw=16;
			myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
			lastChym=mx+8;
			monsterAdd(Monster.mBUILDING, lastChym,my-1, 13, 0); 
			monsterAdd(Monster.mCHYM, lastChym+2,my-4, 3, 0);
			monsterAdd(Monster.mGENERAL, mx-1, my-1,12, 16); // deactivate beacons
			nextChym=mx+32;
			// deactivate beacons
			
			mx+=mw;
			monsterAdd(Monster.mGENERAL, mx, my-1,12, 17); // kick some ass
			
		}
		
		
		myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
		mx+=mw;
		
		
		
		
		myPlayer.init(3,-3);
		myPlayer2.init(2,-4);
		
		while (mx<=TileMap.MAPWIDTH) {
			stillRoomToPlace=true;
			inGap=false;
			

			// make sure the end of the map is flat
			if (mx>=TileMap.MAPWIDTH-8) mw=8;
			else {
				mw=3+getRandom(24);
				if (mx+mw>=TileMap.MAPWIDTH-8) mw=TileMap.MAPWIDTH-mx;
			}
				
			
			if (lastGap<mx && mx+18<TileMap.MAPWIDTH-8 && my>3) {
				// add random floating platforms to pass the gap
				stillRoomToPlace=false;
				inGap=true;
				
				myWorld.put(mx+2,my-2,3,1,TileMap.cTILE);
				myWorld.put(mx+7,my-4,3,1,TileMap.cTILE);
				myWorld.put(mx+12,my-3,3,1,TileMap.cTILE);
				
				mw=18;
				lastGap=(mx+12)+16+getRandom(96);
			} else {
				
				if (worldOrder[world]==5) {
					
					my+=getRandom(3)-1;
					
				} else {
					
					if (my<5) {
						my=my+1+getRandom(2);
					} else if (getRandom(6)<3 || my>6){
						my=my-(1+getRandom(2));
					} else {
						my=my+1+getRandom(2);
					}
				}
				
				if (my<3) my=3+getRandom(4);
				if (my>6) my=6;
				
				if (worldOrder[world]==5) myWorld.put(mx,my,mw,1,TileMap.cTILE);
				else myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
			}
			
			
			// place a chym?
			if (!inGap && mw>4 && nextChym<mx) {
				lastChym=mx+(mw>>1)-2;
				if (lastChym>TileMap.MAPWIDTH-8) lastChym=mx+1;
				if (lastChym<TileMap.MAPWIDTH-16) {
					monsterAdd(Monster.mBUILDING, lastChym,my-1, 13, 0); 
					monsterAdd(Monster.mCHYM, lastChym+2,my-4, 3, 0);
					stillRoomToPlace=false;
				}
				nextChym=mx+32;
			}

			
				// big enough for a generic building?
				if (stillRoomToPlace && mw>12 && lastBuilding<mx) {
					lastBuilding=mx+(mw>>1)-5;
					if (lastBuilding<TileMap.MAPWIDTH-13) {
						monsterAdd(Monster.mBUILDING, lastBuilding,my-1, 13, 1);
					}
					lastBuilding=mx+48;
				}


			// can we place a tripod here?
			if (!inGap && (worldOrder[world]>1 || level>1) && worldOrder[world]<4 && mw>16 && lastTripod<mx && my>4 && mx<TileMap.MAPWIDTH-8) {
				monsterAdd(Monster.mTRIPOD, mx+mw-6,my, 9, 0);
				lastTripod=mx+16;
				stillRoomToPlace=false;
			}
			
			// earth worm, world 4+ ("replaces" the tripod)
			if (!inGap && worldOrder[world]>3 && mw>8 && lastTripod<mx && my>4 && mx<TileMap.MAPWIDTH-8) {
				if (worldOrder[world]==5) monsterAdd(Monster.mWORM, mx+mw-6,my, 12, 1);
				else monsterAdd(Monster.mWORM, mx+mw-6,my, 12, 0);
				lastTripod=mx+mw+16;
				
				// unlock BA Baracuda
				if (!myWorld.isCOOP && worldOrder[world]==4 && level==1 && !activePlayer.didUnlockCharacter(0) && !characterUnlockAdded[0]) {
					characterUnlockAdded[0]=true;
					monsterAdd(Monster.mCRATE, mx+mw-6,my-1, 12, -1);
				}

			}
			
			
			// tanks?
			if (!inGap && worldOrder[world]>1 && worldOrder[world]<5 && lastTank<mx && mw>16 && mx<TileMap.MAPWIDTH-8) {
				monsterAdd(Monster.mTANK, mx+(mw>>1),my-2, 12, 0);
				if (worldOrder[world]==2) lastTank=164;	// one tank
				else lastTank=mx+24+getRandom(8);
			}

			
			// place floating platform?
			if (stillRoomToPlace && my>3 && lastPlatform<mx && mw>3) {
				mw2=2+(getRandom(3));
				if (mw2<=mw-2 && mx+(mw>>1)-(mw2>>1)<TileMap.MAPWIDTH-10) {
					tx= (mx+ (mw>>1)-(mw2>>1) );
					//myWorld.put( tx, my-2, mw2,1, TileMap.cTILE);
					myWorld.put( tx, my-2, 3,1, TileMap.cTILE);
					
					
					if ((worldOrder[world]>1 || level>1) && mx>lastGrenadier) {
						monsterAdd(Monster.mSOLDIER, mx+(mw>>1), my-4, 5, 2);
						lastGrenadier=mx+12+getRandom(12);
					} else if (worldOrder[world]>2){
						monsterAdd(Monster.mSOLDIER, mx+(mw>>1), my-4, 5, 4);
					}
					
					
					// WORLD: Jungle, Egypt
					// check if we can add a platform top-left
					if (worldOrder[world]==2 || worldOrder[world]==4) {
						if (myWorld.isAreaEmpty(tx-4 , my-4, 3, 1) && getRandom(72)<16 && lastPlatform<tx-5) {
							// on left side
							myWorld.put( tx-4, my-4, 3,1, TileMap.cTILE);
							
							//if (my-5>0) monsterAdd(Monster.mCRATE, tx-3,my-5, 12, 0);
							if (my-5>0) monsterAdd(Monster.mSOLDIER, tx-3,my-5, 5, 2);
							
						} else if (myWorld.isAreaEmpty(tx+4 , my-4, 3, 1)) {
							// on right side
							myWorld.put( tx+4, my-4, 3,1, TileMap.cTILE);
							
							if (my-5>0) monsterAdd(Monster.mSOLDIER, tx+5,my-5, 5, 2); //getRandom(2));
							
							if (mw2<9) mw2=9;
						}
					}
					
					lastPlatform=mx+mw2;
				}
			}
			
			
			// mines?
			if (stillRoomToPlace && mx>lastMine && mx+mw<TileMap.MAPWIDTH-8) {
				
				switch (worldOrder[world]) {
					case 1:
						monsterAdd(Monster.mMINE, mx+getRandom(mw),my-1, 12, 0);
						if (level==1) lastMine=mx+(mw<<2);
						else lastMine=mx+(mw<<1);
					break;

					case 3:
						lastMine=mx+getRandom(mw);
						monsterAdd(Monster.mBALLUP,lastMine,my-1,12,1);
						monsterAdd(Monster.mBALLUP,lastMine,my-1,12,2);
						monsterAdd(Monster.mBALLUP,lastMine,my-1,12,3);
					break;
					
					case 4:
						lastMine=mx+getRandom(mw);
						if (getRandom(24)<12) {
							monsterAdd(Monster.mBALLUP,lastMine,my-1,12,1);
							monsterAdd(Monster.mBALLUP,lastMine,my-1,12,2);
							monsterAdd(Monster.mBALLUP,lastMine,my-1,12,3);
						} else {
							monsterAdd(Monster.mMINE, mx+getRandom(mw),my-1, 12, 0);							
						}
						lastMine=mx+mw;
					break;
					
					default:
						monsterAdd(Monster.mMINE, mx+getRandom(mw),my-1, 12, 0);
						lastMine=mx+mw;
					break;
				}
			}
			
			
			if (worldOrder[world]>2 && mx>lastJetpack) {
				
				monsterAdd(Monster.mJETPACK, mx,getRandom(3), 11, 0);
				lastJetpack=mx+15;
			}
			
			// v1.3.0  add Scarlett Sonya
			if (!myWorld.isCOOP && activePlayer.tours[1]>=3 && activePlayer.maxLevelReached[1][2]>=3 && worldOrder[world]==1 && level==2 && !activePlayer.didUnlockCharacter(2) && !characterUnlockAdded[2]) {
//			if (!myWorld.isCOOP && worldOrder[world]==1 && level==2 && !activePlayer.didUnlockCharacter(2) && !characterUnlockAdded[2]) {
				characterUnlockAdded[2]=true;
				monsterAdd(Monster.mCRATE, mx+mw-6,my-1, 12, -3);
			}
			
			// bouncers
			if (worldOrder[world]>1 && 
				(level>1 || worldOrder[world]>2) 
				&& stillRoomToPlace 
				&& mx>lastBouncer 
				&& mx<TileMap.MAPWIDTH-16) {
				
				lastBouncer=getRandom(mw);
				monsterAdd(Monster.mBOUNCER, mx+lastBouncer,my-1, 12, 0);
				if (worldOrder[world]>2) lastBouncer+=4+getRandom(4);
				else lastBouncer+=8+getRandom(8);
			}
			
			

			if (!inGap && mx>lastDropShip && mx<TileMap.MAPWIDTH-32) {
				// find target floor height, and position chopper above
				ty=0; //TileMap.MAPHEIGHT-1;
				// now find the top of this solid area
				//while (ty>0 && myWorld.isSolid(mx,ty)) ty--;

				// find first solid from top down
				while (ty<TileMap.MAPHEIGHT-1 && !myWorld.isSolid(mx,ty)) ty++;

				if (!myWorld.isSolid(mx,ty)) ty=0; 
				monsterAdd(Monster.mDROPSHIP, (mx<<4),(ty<<4)-96, 12, 0);
				if (level==1) lastDropShip+=26;
				else lastDropShip+=15;
			}
			
			
			stillRoomToPlace=false;
			mx+=mw;
			
			if (worldOrder[world]==5) mx++;
		}
		
		// hunt down the ground spot for our teleporter out of here
		my=6;
		mx=TileMap.MAPWIDTH-8;
		while (myWorld.isSolid(mx, my)) my--;

		// resque chopper
		if (!myWorld.isSolid(mx+1,my+1)) monsterAdd(Monster.mDROPSHIP, mx-1,my-1, 12, 1);
		else monsterAdd(Monster.mDROPSHIP, mx-1,my-1, 12, 1);
		
		
		
		
		
		
		// add some randomly blocks as celing
		myWorld.generate();
		
		if (worldOrder[world]==4) myWorld.generateZoneTwo();
		else myWorld.generateZoneOne();
		
		
		// sprinkle soldiers all over
		tx=12+getRandom(16);
		if (myWorld.inTutorial) tx+=54;
		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=TileMap.MAPHEIGHT-1;
			while (ty>0 && myWorld.isSolid(tx,ty)) ty--;

			//if (ty>0) monsterAdd(Monster.mSOLDIER, (tx<<4),(ty<<4)+14, 5, getRandom(2));
			if (ty>0) monsterAdd(Monster.mSOLDIER, tx,ty, 5, getRandom(2));
			
			tx+=1+getRandom(8);
		}

		
		// sprinkle undergrounders
		if (worldOrder[world]==2) { 
			tx=14+getRandom(16);
			while (tx<TileMap.MAPWIDTH) {
				// find floor
				ty=TileMap.MAPHEIGHT-1;
				while (ty>0 && myWorld.isSolid(tx,ty)) ty--;
	
				if (ty>0) monsterAdd(Monster.mSOLDIER, tx,ty+1, 5,  3);
				
				tx+=20+getRandom(6);
			}		
		}
		
		
		// add random crates all over
		tx=8+getRandom(16);
		if (myWorld.inTutorial) tx+=54;
		
		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=TileMap.MAPHEIGHT-1;
			while (ty>0 && myWorld.isSolid(tx,ty)) ty--;
			
			
			// make sure there are no other objects placed here
			if (isMonsterFree(tx,ty)) {
				// make sure it's not making the jump higher as 2 tiles (so check on left + down1)
				if (myWorld.isSolid(tx-1,ty+2) || myWorld.isSolid(tx-1,ty+1)) {
					monsterAdd(Monster.mCRATE, tx,ty, 12, 0);
					myWorld.setTile(tx, ty, TileMap.cTILE);
				}
			}
			
			if (worldOrder[world]>=5) tx+=4+getRandom(12);
			else tx+=1+getRandom(8);
				//tx+=1+getRandom(12-(worldOrder[world]<<1));
		}		
		
		// v1.3.0 - add some chicken!
		if (!myWorld.inTutorial && worldOrder[world]<3 || worldOrder[world]==4 || worldOrder[world]==6) {
			tx=8+getRandom(96);
			while (tx<TileMap.MAPWIDTH) {
				// find floor
				ty=TileMap.MAPHEIGHT-1;
				while (ty>0 && myWorld.isSolid(tx,ty)) ty--;
				
				
				// make sure there are no other objects placed here
				if (isMonsterFree(tx,ty)) {
					monsterAdd(Monster.mCHICKEN, tx,ty, 12, 0);
				}
				tx+=2+getRandom(64);
			}
		}

		
		// add random drums of gassoline!
		if (worldOrder[world]>1) {
			tx=6+getRandom(24);
			while (tx<TileMap.MAPWIDTH) {
				// find floor
				ty=TileMap.MAPHEIGHT-1;
				while (ty>0 && myWorld.isSolid(tx,ty)) ty--;
			
				// make sure there are no other objects placed here
				if (isMonsterFree(tx,ty) && isMonsterFree(tx,ty+1) && !myWorld.isSolid(tx,ty-1) && !myWorld.isSolid(tx,ty-2)) {
					monsterAdd(Monster.mDRUM, tx,ty, 12, 0);
					myWorld.setTile(tx, ty, TileMap.cTILE);
				}
				
				switch (worldOrder[world]) {
					case 2: // jungle 
						tx+=4+getRandom(60);
					break;
					case 3: // syberia
						tx+=4+getRandom(20);
					break;
					case 4: // egypt 
						tx+=4+getRandom(32);
					break;
					default:
						tx+=4+getRandom(20);
					break;
				}
				
			}		
		}
		
	}
	
	
	
	// v1.3.0
	function loadZoneMarine() {
		var lastChym=0;
		var nextChym=32;
		var lastTripod=32;
		var lastPlatform=0;
		var lastGrenadier=32;
		var lastMine=16;
		var lastBouncer=20;
		var lastBuilding=32;
		var lastDropShip=4;
		var lastTank=0;
		var lastSteam=0;		
		
		var stillRoomToPlace;	// set to false if a big object was placed at location
		var inGap;
		
		lastTank=24;

		lastTripod=4;
		
		destroyMap();
		
		// add some random blocks
		var mx=0;
		var my=6;
		var mw=8;
		var mw2=0;
		
		myWorld.reinit();
		myWorld.isInDoor=false;
		myWorld.lockVertical=false;
		myWorld.worldParallaxType=TileMap.pFULL;
		
		myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
		mx+=mw;
		
		myPlayer.init(3,-3);
		myPlayer2.init(2,-4);
		
		while (mx<=TileMap.MAPWIDTH) {
			stillRoomToPlace=true;
			inGap=false;
			

			// make sure the end of the map is flat
			if (mx>=TileMap.MAPWIDTH-8) mw=8;
			else {
				mw=3+getRandom(24);
				if (mx+mw>=TileMap.MAPWIDTH-8) mw=TileMap.MAPWIDTH-mx;
			}
				
			
				
			if (worldOrder[world]==5) {
				
				my+=getRandom(3)-1;
				
			} else {
				
				if (my<5) {
					my=my+1+getRandom(2);
				} else if (getRandom(6)<3 || my>6){
					my=my-(1+getRandom(2));
				} else {
					my=my+1+getRandom(2);
				}
			}
			
			if (my<3) my=3+getRandom(4);
			if (my>6) my=6;
			
			if (worldOrder[world]==5) myWorld.put(mx,my,mw,1,TileMap.cTILE);
			else myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
			
			
			// place a chym?
			if (!inGap && mw>4 && nextChym<mx) {
				lastChym=mx+(mw>>1)-2;
				if (lastChym>TileMap.MAPWIDTH-8) lastChym=mx+1;
				if (lastChym<TileMap.MAPWIDTH-16) {
					monsterAdd(Monster.mBUILDING, lastChym,my-1, 13, 0); 
					monsterAdd(Monster.mCHYM, lastChym+2,my-4, 3, 0);
					stillRoomToPlace=false;
				}
				nextChym=mx+32;
			}

			// big enough for a generic building?
			if (stillRoomToPlace && mw>12 && lastBuilding<mx) {
				lastBuilding=mx+(mw>>1)-5;
				if (lastBuilding<TileMap.MAPWIDTH-13) {
					monsterAdd(Monster.mBUILDING, lastBuilding,my-1, 13, 1);
				}
				lastBuilding=mx+48;
			}


			// can we place a tripod here?
			if (!inGap && (worldOrder[world]>1 || level>1) && worldOrder[world]<4 && mw>16 && lastTripod<mx && my>4 && mx<TileMap.MAPWIDTH-8) {
				monsterAdd(Monster.mTRIPOD, mx+mw-6,my, 9, 0);
				lastTripod=mx+16;
				stillRoomToPlace=false;
			}
			
			// tanks?
			if (!inGap && lastTank<mx && mw>16 && mx<TileMap.MAPWIDTH-8) {
				monsterAdd(Monster.mTANK, mx+(mw>>1),my-2, 12, 0);
				lastTank=mx+24+getRandom(8);
			}

			
			// place floating platform?
			if (stillRoomToPlace && my>3 && lastPlatform<mx && mw>3) {
				mw2=2+(getRandom(3));
				if (mw2<=mw-2 && mx+(mw>>1)-(mw2>>1)<TileMap.MAPWIDTH-10) {
					tx= (mx+ (mw>>1)-(mw2>>1) );
					myWorld.put( tx, my-2, 3,1, TileMap.cTILE);
					
					
					if (mx>lastGrenadier) {
						monsterAdd(Monster.mSOLDIER, mx+(mw>>1), my-4, 5, 2);
						lastGrenadier=mx+12+getRandom(12);
					} else {
						monsterAdd(Monster.mSOLDIER, mx+(mw>>1), my-4, 5, 4);
					}
					
					lastPlatform=mx+mw2;
				}
			}
			
			
			// mines?
			if (stillRoomToPlace && mx>lastMine && mx+mw<TileMap.MAPWIDTH-8) {
				
				monsterAdd(Monster.mMINE, mx+getRandom(mw),my-1, 12, 0);
				lastMine=mx+mw+getRandom(16);
			}
			
			// bouncers
			if (stillRoomToPlace 
				&& mx>lastBouncer 
				&& mx<TileMap.MAPWIDTH-16) {
				
				lastBouncer=getRandom(mw);
				monsterAdd(Monster.mBOUNCER, mx+lastBouncer,my-1, 12, 0);
				if (worldOrder[world]>2) lastBouncer+=4+getRandom(4);
				else lastBouncer+=8+getRandom(8);
			}

			
			// steam pipes
			if (stillRoomToPlace && mx>lastSteam && mx<TileMap.MAPWIDTH-16) {
				lastSteam=getRandom(mw);
				monsterAdd(Monster.mSTEAMPIPE, mx+lastSteam,my, 12, 0);
				lastSteam+=16+getRandom(8);
			}
			

			if (!inGap && mx>lastDropShip && mx<TileMap.MAPWIDTH-32) {
				// find target floor height, and position chopper above
				ty=0; //TileMap.MAPHEIGHT-1;
				// now find the top of this solid area

				// find first solid from top down
				while (ty<TileMap.MAPHEIGHT-1 && !myWorld.isSolid(mx,ty)) ty++;

				if (!myWorld.isSolid(mx,ty)) ty=0; 
				monsterAdd(Monster.mDROPSHIP, (mx<<4),(ty<<4)-96, 12, 0);
				if (level==1) lastDropShip+=26;
				else lastDropShip+=15;
			}
			
			
			stillRoomToPlace=false;
			mx+=mw;
			
			if (worldOrder[world]==5) mx++;
		}
		
		// hunt down the ground spot for our teleporter out of here
		my=6;
		mx=TileMap.MAPWIDTH-8;
		while (myWorld.isSolid(mx, my)) my--;

		// resque chopper
		if (!myWorld.isSolid(mx+1,my+1)) monsterAdd(Monster.mDROPSHIP, mx-1,my-1, 12, 1);
		else monsterAdd(Monster.mDROPSHIP, mx-1,my-1, 12, 1);
		
		// add some randomly blocks as celing
		myWorld.generate();
		
		if (worldOrder[world]==4) myWorld.generateZoneTwo();
		else myWorld.generateZoneOne();
		
		
		// sprinkle soldiers all over
		tx=12+getRandom(16);
		if (myWorld.inTutorial) tx+=54;
		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=TileMap.MAPHEIGHT-1;
			while (ty>0 && myWorld.isSolid(tx,ty)) ty--;

			//if (ty>0) monsterAdd(Monster.mSOLDIER, (tx<<4),(ty<<4)+14, 5, getRandom(2));
			if (ty>0) monsterAdd(Monster.mSOLDIER, tx,ty, 5, getRandom(2));
			
			tx+=1+getRandom(8);
		}

		tx=8+getRandom(96);
		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=TileMap.MAPHEIGHT-1;
			while (ty>0 && myWorld.isSolid(tx,ty)) ty--;
			
			
			// make sure there are no other objects placed here
			if (isMonsterFree(tx,ty)) {
				monsterAdd(Monster.mCHICKEN, tx,ty, 12, 0);
			}
			tx+=2+getRandom(64); //jak działa getRandom? //zdefiniowane w arcadecanvas.js //zwracaliczby od 0 do 63. całkowite.
		}
		
		// add random crates all over
		tx=8+getRandom(16);
		if (myWorld.inTutorial) tx+=54;
		
		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=TileMap.MAPHEIGHT-1;
			while (ty>0 && myWorld.isSolid(tx,ty)) ty--;
			
			
			// make sure there are no other objects placed here
			if (isMonsterFree(tx,ty)) { //tile x, tile y chyba
				// make sure it's not making the jump higher as 2 tiles (so check on left + down1)
				if (myWorld.isSolid(tx-1,ty+2) || myWorld.isSolid(tx-1,ty+1)) {
					monsterAdd(Monster.mCRATE, tx,ty, 12, 0);
					myWorld.setTile(tx, ty, TileMap.cTILE);
				}
			}
			
			if (worldOrder[world]>=5) tx+=4+getRandom(12);
			else tx+=1+getRandom(8);
		}		
		
		// add random drums of gassoline!
		if (worldOrder[world]>1) {
			tx=6+getRandom(24);
			while (tx<TileMap.MAPWIDTH) {
				// find floor
				ty=TileMap.MAPHEIGHT-1;
				while (ty>0 && myWorld.isSolid(tx,ty)) ty--;
			
				// make sure there are no other objects placed here
				if (isMonsterFree(tx,ty) && isMonsterFree(tx,ty+1) && !myWorld.isSolid(tx,ty-1) && !myWorld.isSolid(tx,ty-2)) {
					monsterAdd(Monster.mDRUM, tx,ty, 12, 0);
					myWorld.setTile(tx, ty, TileMap.cTILE);
				}
				
				tx+=4+getRandom(20);
				
			}		
		}
		
	}
	

	
	
	
	// used for Hell
	function loadZoneHell() {
		var lastChym=0;
		var nextChym=32;
		var lastTripod=32;
		var lastPlatform=0;
		var lastJetpack=20;
		var lastMine=16;
		var lastBouncer=20;
		var lastBuilding=32;
		var lastDropShip=4;
		var lastTank=0;
		
		var lastGap=2000;
		
		var stillRoomToPlace;	// set to false if a big object was placed at location
		var inGap;
		
		lastGap=8;
		
		destroyMap();
		
		// add some random blocks
		var mx=0;
		var my=6;
		var mw=8;
		var mw2=0;
		
		myWorld.reinit();
		myWorld.isInDoor=false;
		myWorld.lockVertical=false;
		myWorld.worldParallaxType=TileMap.pFULL;
		myWorld.put(mx,my,mw,1,TileMap.cTILE);
		mx+=mw+1;
		
		

		
		myPlayer.init(3,-3);
		myPlayer2.init(2,-4);
		
		while (mx<=TileMap.MAPWIDTH) {
			stillRoomToPlace=true;
			inGap=false;
			

			// make sure the end of the map is flat
			if (mx>=TileMap.MAPWIDTH-16) mw=16;
			else {
				mw=3+getRandom(24);
				if (mx+mw>=TileMap.MAPWIDTH-16) mw=TileMap.MAPWIDTH-mx;
			}
				
			
			if (lastGap<mx && lastGap+16<TileMap.MAPWIDTH-8 && my>3) {
				// add random floating platforms to pass the gap
				stillRoomToPlace=false;
				inGap=true;
				
				if (my<5) {
					my=my+1+getRandom(2);
				} else if (getRandom(6)<3 || my>6){
					my=my-(1+getRandom(2));
				} else {
					my=my+1+getRandom(2);
				}				

				if (my<3) my=3+getRandom(4);
				if (my>6) my=6;
				
				myWorld.put(mx,my,8,1,TileMap.cTILE);
				
				mw=10;
				lastGap=(mx+12)+16+getRandom(12);
			} else {
				
				my+=getRandom(3)-1;
				
				if (my<3) my=3+getRandom(4);
				if (my>6) my=6;
				
				myWorld.put(mx,my,mw,1,TileMap.cTILE);
			}
			
			
			// place a chym?
			if (!inGap && mw>4 && nextChym<mx) {
				lastChym=mx+(mw>>1)-2;
				if (lastChym>TileMap.MAPWIDTH-8) lastChym=mx+1;
				if (lastChym<TileMap.MAPWIDTH-16) {
					monsterAdd(Monster.mBUILDING, lastChym,my-1, 13, 0); 
					monsterAdd(Monster.mCHYM, lastChym+2,my-4, 3, 0);
					stillRoomToPlace=false;
				}
				nextChym=mx+32;
			}

			// big enough for a generic building?
			if (stillRoomToPlace && mw>12 && lastBuilding<mx) {
				lastBuilding=mx+(mw>>1)-5;
				if (lastBuilding<TileMap.MAPWIDTH-13) {
					monsterAdd(Monster.mBUILDING, lastBuilding,my-1, 13, 1);
				}
				lastBuilding=mx+48;
			}
			
			// can we place a tripod here?
			if (!inGap && mw>16 && lastTripod<mx && my>4 && mx<TileMap.MAPWIDTH-8) {
				monsterAdd(Monster.mTRIPOD, mx+mw-6,my, 9, 0);
				lastTripod=mx+16;
				stillRoomToPlace=false;
			}
			
			// earth worm, world 4+ ("replaces" the tripod)
			if (!inGap && mw>4 && lastTripod<mx && mx<TileMap.MAPWIDTH-8) {
				monsterAdd(Monster.mWORM, mx+mw-6,5, 12, 1);
				lastTripod=mx+mw+12;
			}
			
			
			// tanks?
			if (!inGap && lastTank<mx && mw>16 && mx<TileMap.MAPWIDTH-8) {
				monsterAdd(Monster.mTANK, mx+(mw>>1),my-2, 12, 2);
				lastTank=mx+8+getRandom(8);
			}

			
			// place floating platform?
			if (stillRoomToPlace && my>3 && lastPlatform<mx && mw>3) {
				mw2=2+(getRandom(3));
				if (mw2<=mw-2 && mx+(mw>>1)-(mw2>>1)<TileMap.MAPWIDTH-10) {
					tx= (mx+ (mw>>1)-(mw2>>1) );
					myWorld.put( tx, my-2, 3,1, TileMap.cTILE);
				
					
					// check if we can add a platform top-left
					if (myWorld.isAreaEmpty(tx-4 , my-4, 3, 1) && getRandom(72)<16 && lastPlatform<tx-5) {
						// on left side
						myWorld.put( tx-4, my-4, 3,1, TileMap.cTILE);
						
					} else if (myWorld.isAreaEmpty(tx+4 , my-4, 3, 1)) {
						// on right side
						myWorld.put( tx+4, my-4, 3,1, TileMap.cTILE);
						
						
						// setup an unlock area for Sarge?
						if (!myWorld.isCOOP && !activePlayer.didUnlockCharacter(6) && !characterUnlockAdded[6]) {
							// hunt floor at hotspot  and place Sarge in a cage
							monsterAdd(Monster.mCRATE, tx+8,my-5, 12, -7);
							characterUnlockAdded[6]=true;
						}
						
						
						if (mw2<9) mw2=9;
					}
					
					lastPlatform=mx+mw2;
				}
			}
			
			
			// mines?
			if (stillRoomToPlace && mx>lastMine && mx+mw<TileMap.MAPWIDTH-8) {
				monsterAdd(Monster.mMINE, mx+getRandom(mw),my-1, 12, 0);
				
				lastMine=mx+mw;
			}
			
			
			if (mx>lastJetpack) {
				
				monsterAdd(Monster.mJETPACK, mx,getRandom(3), 11, 0);
				lastJetpack=mx+15;
			}
			
			// bouncers
			if (stillRoomToPlace 
				&& mx>lastBouncer 
				&& mx<TileMap.MAPWIDTH-16) {
				
				lastBouncer=getRandom(mw);
				monsterAdd(Monster.mBOUNCER, mx+lastBouncer,my-1, 12, 0);
				lastBouncer+=4+getRandom(4);
			}
			
			
			if (!inGap && mx>lastDropShip && mx<TileMap.MAPWIDTH-32) {
				// find target floor height, and position chopper above
				ty=0;
				// find first solid from top down
				while (ty<TileMap.MAPHEIGHT-1 && !myWorld.isSolid(mx,ty)) ty++;

				if (!myWorld.isSolid(mx,ty)) ty=0; 
				monsterAdd(Monster.mDROPSHIP, (mx<<4),(ty<<4)-96, 12, 2);
				lastDropShip+=14;
			}
			

			stillRoomToPlace=false;
			mx+=mw+1;
		}
		
		// hunt down the ground spot for our teleporter out of here
		my=0;
		mx=TileMap.MAPWIDTH-6;
		while ((my==0 || my==TileMap.MAPHEIGHT) && mx>TileMap.MAPWIDTH-32) {
			while (!myWorld.isSolid(mx, my) && my<TileMap.MAPHEIGHT) my++;
			if (!myWorld.isSolid(mx,my)) {
				mx--;
				my=0;
			}
		}
		
		if (mx>=TileMap.MAPWIDTH) mx=TileMap.MAPWIDTH-14;
		

		// resque chopper
		monsterAdd(Monster.mDROPSHIP, mx-1,my-2, 12, 1);
		
		
		
		
		
		
		// add some randomly blocks as celing
		myWorld.generate();
		myWorld.generateZoneThree();
		
		
		// sprinkle soldiers all over
		tx=4+getRandom(16);
		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;

			//if (ty>0) monsterAdd(Monster.mSOLDIER, (tx<<4),(ty<<4)+14, 5, getRandom(2));
			if (ty<TileMap.MAPHEIGHT) monsterAdd(Monster.mSOLDIER, tx,ty, 5, 5);
			
			
			tx+=1+getRandom(8);
		}
		
		// sprinkle fireballs
		tx=16+getRandom(16);
		while (tx<TileMap.MAPWIDTH) {
			ty=TileMap.MAPHEIGHT-1;
			monsterAdd(Monster.mFIREBALL, tx,ty, 12, 0);
			
			tx+=4+getRandom(12);
		}
		

		
		
		// add random crates all over
		tx=8+getRandom(16);

		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;
			
			// make sure there are no other objects placed here
			if (ty<TileMap.MAPHEIGHT && ty>0) { // && isMonsterFree(tx,ty)) {
				monsterAdd(Monster.mCRATE, tx,ty-1, 12, 0);
				myWorld.setTile(tx, ty, TileMap.cTILE);
			}
			
			tx+=4+getRandom(12);
		}		
	}
	
	
	
	// used for Kong arcade level
	function loadZoneKong() {
		var lastMine=0;
		var lastPlatform=0;
		var lastBouncer=4;
		
		var lastGap=2000;
		
		var stillRoomToPlace;	// set to false if a big object was placed at location
		
		lastGap=8;
		
		destroyMap();
		
		// add some random blocks
		var mx=0;
		var my=6;
		var mw=8;
		var mw2=0;
		
		myWorld.reinit();
		myWorld.isInDoor=false;
		myWorld.lockVertical=false;
		myWorld.worldParallaxType=TileMap.pNOPARALLAX; 
		myWorld.put(mx,my,mw,1,TileMap.cTILE);
		mx+=mw+1;
		
		

		
		myPlayer.init(3,-3);
		myPlayer2.init(2,-4);
		
		while (mx<=TileMap.MAPWIDTH) {
			stillRoomToPlace=true;
			

			// make sure the end of the map is flat
			if (mx>=TileMap.MAPWIDTH-8) mw=8;
			else {
				mw=3+getRandom(24);
				if (mx+mw>=TileMap.MAPWIDTH-8) mw=TileMap.MAPWIDTH-mx;
			}
				
			
			if (lastGap<mx && lastGap+16<TileMap.MAPWIDTH-8 && my>3) {
				// add random floating platforms to pass the gap
				stillRoomToPlace=false;
				
				if (my<5) {
					my=my+1+getRandom(2);
				} else if (getRandom(6)<3 || my>6){
					my=my-(1+getRandom(2));
				} else {
					my=my+1+getRandom(2);
				}				

				if (my<3) my=3+getRandom(4);
				if (my>6) my=6;
				
				myWorld.put(mx,my,8,1,TileMap.cTILE);
				
				mw=10;
				lastGap=(mx+12)+16+getRandom(12);
			} else {
				
				my+=getRandom(3)-1;
				
				if (my<3) my=3+getRandom(4);
				if (my>6) my=6;
				
				myWorld.put(mx,my,mw,1,TileMap.cTILE);
			}
			
			
			// place floating platform?
			if (stillRoomToPlace && my>3 && lastPlatform<mx && mw>3) {
				mw2=1+(getRandom(2));
				if (mw2<=mw-2 && mx+(mw>>1)-(mw2>>1)<TileMap.MAPWIDTH-10) {
					tx= (mx+ (mw>>1)-(mw2>>1) );
					myWorld.put( tx, my-2, 3,1, TileMap.cTILE);
					
					
					// check if we can add a platform top-left
					if (myWorld.isAreaEmpty(tx-4 , my-4, 3, 1) && getRandom(72)<16 && lastPlatform<tx-5) {
						// on left side
						myWorld.put( tx-4, my-4, 3,1, TileMap.cTILE);
						
					} else if (myWorld.isAreaEmpty(tx+4 , my-4, 3, 1)) {
						// on right side
						myWorld.put( tx+4, my-4, 3,1, TileMap.cTILE);
						
						if (mw2<9) mw2=9;
					}
					
					lastPlatform=mx+mw2;
				}
			}
			
			
			// mines?
			if (stillRoomToPlace && mx>lastMine && mx+mw<TileMap.MAPWIDTH-8) {
				monsterAdd(Monster.mMINE, mx+getRandom(mw),my-1, 12, 0);
				
				lastMine=mx+mw;
			}
			
			
			
			// bouncers
			if (stillRoomToPlace 
				&& mx>lastBouncer 
				&& mx<TileMap.MAPWIDTH-16) {
				
				lastBouncer=getRandom(mw);
				monsterAdd(Monster.mBOUNCER, mx+lastBouncer,my-1, 12, 0);
				lastBouncer+=4+getRandom(4);
			}
			

			stillRoomToPlace=false;
			mx+=mw+1;
		}
		
		// hunt down the ground spot for our teleporter out of here
		my=0;
		mx=TileMap.MAPWIDTH-8;
		while ((my==0 || my==TileMap.MAPHEIGHT) && mx<TileMap.MAPWIDTH) {
			while (!myWorld.isSolid(mx, my) && my<TileMap.MAPHEIGHT) my++;
			mx++;
		}
		
		if (mx>=TileMap.MAPWIDTH) mx=TileMap.MAPWIDTH-14;
		

		// finish flag
		tx=TileMap.MAPWIDTH-20;
		done=false;
		while (!done) {
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;
			if (ty>0 && ty<TileMap.MAPHEIGHT) {
				monsterAdd(Monster.mARCADE, tx ,ty-1, 12, 4);	// flag
				done=true;
			} else tx--;
		}
		
		
		
		
		
		
		// add some randomly blocks as celing
		myWorld.generate();
		myWorld.generateZoneKong();
		
		
		// sprinkle fireballs
		tx=16+getRandom(4);
		while (tx<TileMap.MAPWIDTH) {
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;

			monsterAdd(Monster.mFIREBALL, tx,ty-1, 12, 1);
			
			tx+=6+getRandom(8);
		}
		
		
		// add random drums of gassoline!
		tx=6+getRandom(24);
		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;
		
			// make sure there are no other objects placed here
			if (ty>0 && ty<TileMap.MAPHEIGHT) {
				ty--;
				if (isMonsterFree(tx,ty) && isMonsterFree(tx,ty+1) && !myWorld.isSolid(tx,ty-1) && !myWorld.isSolid(tx,ty-2)) {
					monsterAdd(Monster.mDRUM, tx,ty, 12, 0);
					myWorld.setTile(tx, ty, TileMap.cTILE);
				}
			}
			
			tx+=4+getRandom(16);
		}		

		
		
		// add random crates all over
		tx=8+getRandom(16);

		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;
			
			// make sure there are no other objects placed here
			if (ty<TileMap.MAPHEIGHT && ty>0) { // && isMonsterFree(tx,ty)) {
				monsterAdd(Monster.mCRATE, tx,ty-1, 12, 0);
				myWorld.setTile(tx, ty, TileMap.cTILE);
			}
			
			tx+=16+getRandom(22);
		}			
		
	}


	
	// v1.3.0 - sketch
	function loadZoneSketch() {
		var lastMine=0;
		var lastPlatform=0;
		var lastBouncer=4;
		
		var lastGap=2000;
		
		var stillRoomToPlace;	// set to false if a big object was placed at location
		
		lastGap=8;
		
		destroyMap();
		
		// add some random blocks
		var mx=0;
		var my=6;
		var mw=8;
		var mw2=0;
		
		myWorld.reinit();
		myWorld.isInDoor=false;
		myWorld.lockVertical=false;
		myWorld.worldParallaxType=TileMap.pNOPARALLAX; 
		myWorld.put(mx,my,mw,1,TileMap.cTILE);
		mx+=mw+1;
		
		

		
		myPlayer.init(3,-3);
		myPlayer2.init(2,-4);
		
		while (mx<=TileMap.MAPWIDTH) {
			stillRoomToPlace=true;
			

			// make sure the end of the map is flat
			if (mx>=TileMap.MAPWIDTH-8) mw=8;
			else {
				mw=3+getRandom(24);
				if (mx+mw>=TileMap.MAPWIDTH-8) mw=TileMap.MAPWIDTH-mx;
			}
				
			
			if (lastGap<mx && lastGap+16<TileMap.MAPWIDTH-8 && my>3) {
				// add random floating platforms to pass the gap
				stillRoomToPlace=false;
				
				if (my<5) {
					my=my+1+getRandom(2);
				} else if (getRandom(6)<3 || my>6){
					my=my-(1+getRandom(2));
				} else {
					my=my+1+getRandom(2);
				}				

				if (my<3) my=3+getRandom(4);
				if (my>6) my=6;
				
				myWorld.put(mx,my,8,1,TileMap.cTILE);
				
				mw=10;
				lastGap=(mx+12)+16+getRandom(12);
			} else {
				
				my+=getRandom(3)-1;
				
				if (my<3) my=3+getRandom(4);
				if (my>6) my=6;
				
				myWorld.put(mx,my,mw,1,TileMap.cTILE);
			}
			
			
			// place floating platform?
			if (stillRoomToPlace && my>3 && lastPlatform<mx && mw>3) {
				mw2=1+(getRandom(2));
				if (mw2<=mw-2 && mx+(mw>>1)-(mw2>>1)<TileMap.MAPWIDTH-10) {
					tx= (mx+ (mw>>1)-(mw2>>1) );
					myWorld.put( tx, my-2, 3,1, TileMap.cTILE);
					
					
					// check if we can add a platform top-left
					if (myWorld.isAreaEmpty(tx-4 , my-4, 3, 1) && getRandom(72)<16 && lastPlatform<tx-5) {
						// on left side
						myWorld.put( tx-4, my-4, 3,1, TileMap.cTILE);
						
					} else if (myWorld.isAreaEmpty(tx+4 , my-4, 3, 1)) {
						// on right side
						myWorld.put( tx+4, my-4, 3,1, TileMap.cTILE);
						
						if (mw2<9) mw2=9;
					}
					
					lastPlatform=mx+mw2;
				}
			}
			
			
			// mines?
			if (stillRoomToPlace && mx>lastMine && mx+mw<TileMap.MAPWIDTH-8) {
				monsterAdd(Monster.mMINE, mx+getRandom(mw),my-1, 12, 0);
				lastMine=mx+mw;
			}
			
			
			
			// jetpacks
			if (stillRoomToPlace 
				&& mx>lastBouncer 
				&& mx<TileMap.MAPWIDTH-16) {
				
				lastBouncer=getRandom(mw);
				monsterAdd(Monster.mBOUNCER, mx+lastBouncer,my-1, 12, 0);
				lastBouncer+=4+getRandom(4);
			}
			

			stillRoomToPlace=false;
			mx+=mw+1;
		}
		
		// hunt down the ground spot for our teleporter out of here
		my=0;
		mx=TileMap.MAPWIDTH-8;
		while ((my==0 || my==TileMap.MAPHEIGHT) && mx<TileMap.MAPWIDTH) {
			while (!myWorld.isSolid(mx, my) && my<TileMap.MAPHEIGHT) my++;
			mx++;
		}
		
		if (mx>=TileMap.MAPWIDTH) mx=TileMap.MAPWIDTH-14;
		

		// finish flag
		tx=TileMap.MAPWIDTH-20;
		done=false;
		while (!done) {
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;
			if (ty>0 && ty<TileMap.MAPHEIGHT) {
				monsterAdd(Monster.mARCADE, tx ,ty-1, 12, 4);	// flag
				done=true;
			} else tx--;
		}
		
		
		
		
		
		
		// add some randomly blocks as celing
		myWorld.generate();
		myWorld.generateZoneKong();
		
		
		// sprinkle jetpacks
		tx=16+getRandom(4);
		while (tx<TileMap.MAPWIDTH) {
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;

			monsterAdd(Monster.mJETPACK, tx,ty-1, 11, 0);
			
			tx+=6+getRandom(8);
		}
		
		
		// add random drums of gassoline!
		tx=6+getRandom(24);
		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;
		
			// make sure there are no other objects placed here
			if (ty>0 && ty<TileMap.MAPHEIGHT) {
				ty--;
				if (isMonsterFree(tx,ty) && isMonsterFree(tx,ty+1) && !myWorld.isSolid(tx,ty-1) && !myWorld.isSolid(tx,ty-2)) {
					monsterAdd(Monster.mDRUM, tx,ty, 12, 0);
					myWorld.setTile(tx, ty, TileMap.cTILE);
				}
			}
			
			tx+=4+getRandom(16);
		}		

		
		
		// add random crates all over
		tx=8+getRandom(16);

		while (tx<TileMap.MAPWIDTH) {
			// find floor
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;
			
			// make sure there are no other objects placed here
			if (ty<TileMap.MAPHEIGHT && ty>0) { // && isMonsterFree(tx,ty)) {
				monsterAdd(Monster.mCRATE, tx,ty-1, 12, 0);
				myWorld.setTile(tx, ty, TileMap.cTILE);
			}
			
			tx+=16+getRandom(22);
		}			
		
	}
	

	

	
	// used for platformer levels
	function loadZonePlatform() {
		var lastPlatform=0;
		
		var lastGap;
		
		var stillRoomToPlace;	// set to false if a big object was placed at location
		
		lastGap=24;
		
		destroyMap();
		
		// add some random blocks
		var mx=0;
		var my=6;
		var mw=8;
		var mw2=0;
		
		myWorld.reinit();
		myWorld.isInDoor=false;
		myWorld.lockVertical=false;
		myWorld.worldParallaxType=TileMap.pFULL; 
		myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
		mx+=mw+1;
		
		

		
		myPlayer.init(3,-3);
		myPlayer2.init(2,-4);
		
		while (mx<=TileMap.MAPWIDTH) {
			stillRoomToPlace=true;
			
			// make sure the end of the map is flat
			if (mx>=TileMap.MAPWIDTH-8) mw=8;
			else {
				mw=3+getRandom(24);
				if (mx+mw>=TileMap.MAPWIDTH-8) mw=TileMap.MAPWIDTH-mx;
			}
				
			
			if (lastGap<mx && mx+18<TileMap.MAPWIDTH-8 && my>3) {
				// add random floating platforms to pass the gap
				stillRoomToPlace=false;
				
				myWorld.put(mx+2,my-2,3,1,TileMap.cTILE);
				myWorld.put(mx+7,my-4,3,1,TileMap.cTILE);
				myWorld.put(mx+12,my-3,3,1,TileMap.cTILE);
				
				mw=18;
				lastGap=(mx+12)+16+getRandom(96);
			} else {
				
				if (worldOrder[world]==5) {
					
					my+=getRandom(3)-1;
					
				} else {
					
					if (my<5) {
						my=my+1+getRandom(2);
					} else if (getRandom(6)<3 || my>6){
						my=my-(1+getRandom(2));
					} else {
						my=my+1+getRandom(2);
					}
				}
				
				if (my<3) my=3+getRandom(4);
				if (my>6) my=6;
				
				myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
				
				if (mw>3) {
					// add coins
					mw2=mx+(mw>>1)-2;
					for (var i=4; --i>=0;) {
						monsterAdd(Monster.mCOIN, mw2+i,my-1,3,1);
					}
				}
			}
			
			
			// place floating platform?
			if (stillRoomToPlace && my>3 && lastPlatform<mx && mw>3) {
				mw2=2+(getRandom(3));
				if (mw2<=mw-2 && mx+(mw>>1)-(mw2>>1)<TileMap.MAPWIDTH-10) {
					tx= (mx+ (mw>>1)-(mw2>>1) );
					//myWorld.put( tx, my-2, mw2,1, TileMap.cTILE);
					myWorld.put( tx, my-2, 3,1, TileMap.cTILE);
					
					// add coins
					monsterAdd(Monster.mCOIN, tx,my-3,3,1);
					monsterAdd(Monster.mCOIN, tx+1,my-3,3,1);
					monsterAdd(Monster.mCOIN, tx+2,my-3,3,1);
					
					
					monsterAdd(Monster.mSOLDIER, mx+(mw>>1), my-4, 5, getRandom(2));
					
					
					if (myWorld.isAreaEmpty(tx-4 , my-4, 3, 1) && getRandom(72)<16 && lastPlatform<tx-5) {
						// on left side
						myWorld.put( tx-4, my-4, 3,1, TileMap.cTILE);
						// add coins
						monsterAdd(Monster.mCOIN, tx-4,my-5,3,1);
						monsterAdd(Monster.mCOIN, tx-3,my-5,3,1);
						monsterAdd(Monster.mCOIN, tx-2,my-5,3,1);
						
						if (my-5>0) monsterAdd(Monster.mSOLDIER, tx-3,my-5, 5, getRandom(2));
						
					} else if (myWorld.isAreaEmpty(tx+4 , my-4, 3, 1)) {
						// on right side
						myWorld.put( tx+4, my-4, 3,1, TileMap.cTILE);
						// add coins
						monsterAdd(Monster.mCOIN, tx+4,my-5,3,1);
						monsterAdd(Monster.mCOIN, tx+5,my-5,3,1);
						monsterAdd(Monster.mCOIN, tx+6,my-5,3,1);
						
						if (my-5>0) monsterAdd(Monster.mSOLDIER, tx+5,my-5, 5, getRandom(2));
						
						if (mw2<9) mw2=9;
					}
					
					lastPlatform=mx+mw2;
				}
			}
			
			
			stillRoomToPlace=false;
			mx+=mw;
		}
		
		// hunt down the ground spot for our teleporter out of here
		my=0;
		mx=TileMap.MAPWIDTH-8;
		while ((my==0 || my==TileMap.MAPHEIGHT) && mx<TileMap.MAPWIDTH) {
			while (!myWorld.isSolid(mx, my) && my<TileMap.MAPHEIGHT) my++;
			mx++;
		}
		
		if (mx>=TileMap.MAPWIDTH) mx=TileMap.MAPWIDTH-14;
		

		// finish flag
		tx=TileMap.MAPWIDTH-20;
		done=false;
		while (!done) {
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;
			if (ty>0 && ty<TileMap.MAPHEIGHT) {
				monsterAdd(Monster.mARCADE, tx ,ty-1, 12, 4);	// flag
				done=true;
			} else tx--;
		}
		
		
		
		
		
		// add some randomly blocks as celing
		myWorld.generate();
		
		myPlayer.weapon=0;
		
		// sprinkle dudes
		tx=4+getRandom(16);
		while (tx<TileMap.MAPWIDTH) {
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;

			monsterAdd(Monster.mSOLDIER, tx,ty-1, 5, getRandom(3));
			
			tx+=4+getRandom(6);
		}
		
	}
	
	
	function loadZoneTrain() {
		var lastMine=0;
		var lastCrate=2;
		var lastJetpack=16;
		var lastDropShip=32;
		
		destroyMap();
		
		// add some random blocks
		var mx=0;
		var my=4;
		var mw=8;
		
		myWorld.reinit();
		myWorld.isInDoor=false;
		myWorld.lockVertical=false;
		myWorld.worldParallaxType=TileMap.pFULL;
		myWorld.autoScroll=true;
		
		myPlayer.init(6,-1);
		myPlayer2.init(5,-2);
		
		while (mx<=TileMap.MAPWIDTH) {
			
			// make sure the end of the map is flat
			if (mx>=TileMap.MAPWIDTH-8) mw=8;
			else {
				mw=8+getRandom(16);
				if (mx+mw>=TileMap.MAPWIDTH-8) mw=TileMap.MAPWIDTH-mx;
			}
				
			
			myWorld.put(mx,my,mw,9-my,TileMap.cTILE);
			

			// add a mine?
			if (lastMine<mx+mw) {
				lastMine=mx+getRandom(mw);
				monsterAdd(Monster.mMINE, lastMine, my-1,12, 0);
				lastMine=mx+mw+getRandom(16);
			}

			// add a jetpack dude
			if (lastJetpack<mx+mw) {
				lastJetpack=mx+getRandom(mw);
				monsterAdd(Monster.mJETPACK, mx,getRandom(3), 11, 0);
				lastJetpack=mx+mw+getRandom(16);
			}
			

			// add random crates all over
			if (lastCrate<mx+mw) {
				lastCrate=mx+getRandom(mw);
				monsterAdd(Monster.mCRATE, lastCrate,my-1, 12, 0);
				//myWorld.setTile(lastCrate, my-1, TileMap.cTILE);
				lastCrate+=1+getRandom(10);
			}				
			
			
			// dropship
			if (lastDropShip<mx) {
				lastDropShip=mx+getRandom(mw);

				ty=-2;
				monsterAdd(Monster.mDROPSHIP, (mx<<4),(ty<<4)-96, 12, 0);
				
				lastDropShip=mx+mw+getRandom(16);
			}
			
			mx+=mw+1;
		}
		

		// hunt down the ground spot for our teleporter out of here
		my=0;
		mx=TileMap.MAPWIDTH-8;
		while ((my==0 || my==TileMap.MAPHEIGHT) && mx<TileMap.MAPWIDTH) {
			while (!myWorld.isSolid(mx, my) && my<TileMap.MAPHEIGHT) my++;
			mx++;
		}
		
		if (mx>=TileMap.MAPWIDTH) mx=TileMap.MAPWIDTH-14;
		

		// finish flag
		tx=TileMap.MAPWIDTH-14;
		done=false;
		while (!done) {
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;
			if (ty>0 && ty<TileMap.MAPHEIGHT) {
				monsterAdd(Monster.mARCADE, tx ,ty-1, 12, 4);	// flag
				done=true;
			} else tx--;
		}
		
		
		// add some randomly blocks as celing
		myWorld.generate();
		
		// sprinkle dudes
		tx=4+getRandom(16);
		while (tx<TileMap.MAPWIDTH) {
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;

			monsterAdd(Monster.mSOLDIER, tx,ty-1, 5, getRandom(3));
			
			tx+=4+getRandom(6);
		}
	}
	
	// Gameboy/stardash world
	function loadZoneGB() {
		var lastPlatform=0;
		var inGap;
		var lastGap;
		
		var stillRoomToPlace;	// set to false if a big object was placed at location
		
		lastGap=80+getRandom(64);
		
		destroyMap();
		
		// add some random blocks
		var mx=0;
		var my=8;
		var mw=8;
		var mw2=0;
		
		myWorld.reinit();
		myWorld.isInDoor=false;
		myWorld.lockVertical=false;
		myWorld.worldParallaxType=TileMap.pNOPARALLAX;
		myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
		myWorld.isPlatformer=true;
		mx+=mw;
		
		

		
		myPlayer.init(3,my-1);
		myPlayer2.init(2,my-1);
		myPlayer.weapon=0;
		myPlayer2.weapon=0;

		
		while (mx<=TileMap.MAPWIDTH) {
			stillRoomToPlace=true;
			inGap=false;
			
			// make sure the end of the map is flat
			if (mx>=TileMap.MAPWIDTH-16) mw=16;
			else {
				mw=3+getRandom(8);
				if (mx+mw>=TileMap.MAPWIDTH-16) mw=TileMap.MAPWIDTH-mx;
			}
				
			
			if (lastGap<mx && mx+18<TileMap.MAPWIDTH-16 && my>5) {
				// add random floating platforms to pass the gap
				stillRoomToPlace=false;
				inGap=true;
				
				myWorld.put(mx+2,my-2,3,1,TileMap.cTILE);
				myWorld.put(mx+7,my-4,3,1,TileMap.cTILE);
				myWorld.put(mx+12,my-3,3,1,TileMap.cTILE);
				
				mw=18;
				lastGap=(mx+12)+16+getRandom(96);
			} else {
				
				if (my<5) {
					my=my+1+getRandom(2);
				} else if (getRandom(6)<3 || my>6){
					my=my-(1+getRandom(2));
				} else {
					my=my+1+getRandom(2);
				}
				
				if (my<3) my=3+getRandom(4);
				if (my>8) my=8;
				
				myWorld.put(mx,my,mw,11-my,TileMap.cTILE);
				
				if (mw>3) {
					// add coins
					mw2=mx+(mw>>1)-2;
					for (var i=4; --i>=0;) {
						monsterAdd(Monster.mCOIN, mw2+i,my-1,3,1);
					}
				}
			}
			
			
			// place floating platform?
			if (stillRoomToPlace && my>5 && lastPlatform<mx && mw>3) {
				mw2=2+(getRandom(3));
				if (mw2<=mw-2 && mx+(mw>>1)-(mw2>>1)<TileMap.MAPWIDTH-10) {
					tx= (mx+ (mw>>1)-(mw2>>1) );
					//myWorld.put( tx, my-2, mw2,1, TileMap.cTILE);
					myWorld.put( tx, my-2, 3,1, TileMap.cTILE);
					
					// add coins
					monsterAdd(Monster.mCOIN, tx,my-3,3,1);
					monsterAdd(Monster.mCOIN, tx+1,my-3,3,1);
					monsterAdd(Monster.mCOIN, tx+2,my-3,3,1);
					
					if (myWorld.isAreaEmpty(tx-4 , my-4, 3, 1) && getRandom(72)<16 && lastPlatform<tx-5) {
						// on left side
						myWorld.put( tx-4, my-4, 3,1, TileMap.cTILE);
						// add coins
						monsterAdd(Monster.mCOIN, tx-4,my-5,3,1);
						monsterAdd(Monster.mCOIN, tx-3,my-5,3,1);
						monsterAdd(Monster.mCOIN, tx-2,my-5,3,1);
					} else if (myWorld.isAreaEmpty(tx+4 , my-4, 3, 1) && getRandom(72)<16) {
						// on right side
						myWorld.put( tx+4, my-4, 3,1, TileMap.cTILE);
						// add coins
						monsterAdd(Monster.mCOIN, tx+4,my-5,3,1);
						monsterAdd(Monster.mCOIN, tx+5,my-5,3,1);
						monsterAdd(Monster.mCOIN, tx+6,my-5,3,1);
						if (mw2<9) mw2=9;
					}
					
					lastPlatform=mx+mw2;
				}
			}
			
			
			stillRoomToPlace=false;
			mx+=mw;
		}
		
		// sprinkle dudes
		tx=16;
		while (tx<TileMap.MAPWIDTH) {
			ty=0;
			while (ty<TileMap.MAPHEIGHT && !myWorld.isSolid(tx,ty)) ty++;

			monsterAdd(Monster.mSOLDIER, tx,ty-1, 5, getRandom(2));
			
			tx+=2+getRandom(2);
		}

		
		// hunt down the ground spot for our teleporter out of here
		my=0;
		mx=TileMap.MAPWIDTH-16;
		while ((my==0 || my==TileMap.MAPHEIGHT) && mx<TileMap.MAPWIDTH) {
			while (!myWorld.isSolid(mx, my) && my<TileMap.MAPHEIGHT) my++;
			mx++;
		}
		
		if (mx>=TileMap.MAPWIDTH) mx=TileMap.MAPWIDTH-14;
		

		// finish flag
		tx=TileMap.MAPWIDTH-20;
		done=false;
		while (!done) {
			ty=TileMap.MAPHEIGHT-1;
			while (ty>1 && myWorld.isSolid(tx,ty)) ty--;
			if (ty>0 && ty<TileMap.MAPHEIGHT) {
				monsterAdd(Monster.mARCADE, tx ,ty, 12, 4);	// flag
				done=true;
			} else tx--;
		}
		
		
		
		
		
		// add some randomly blocks as celing
		myWorld.generate();
		myWorld.generateZoneOne();
		
	}
	
	
	
	
	// load one of various random zones
	function loadZoneRoom( roomID) {
		var player1Died=myPlayer.Died;
		var player2Died=myPlayer2.Died;
		
		var doorX=((lowDisplayW>>1)>>4);
		var doorX2;
		
		destroyMap();

		// enclosed room, so create a rectangle area and fill the rest with black
		myWorld.reinit();
		myWorld.isInDoor=true;
		myWorld.lockVertical=true;
		myWorld.lockVerticalValue=0;
		myWorld.worldParallaxType=TileMap.pNOPARALLAX;
		myWorld.put(0, 0, TileMap.MAPWIDTH, TileMap.MAPHEIGHT, TileMap.cTILE);
		
		// cut out somewhere in the level
		//myWorld.cut((TileMap.MAPWIDTH>>1)-10, 2, 20, 6);
		myWorld.cut( doorX-5, 2, 11, 5);
		

		if (roomID<0) {
			roomID=1+getRandom(13);
			// create continue room?
			if (myWorld.isCOOP) {
				if (!myPlayer.hasContinue && myPlayer.coins>=50 && !gaveContinueOption) roomID=900;
			} else {
				if (!myPlayer.hasContinue && myPlayer.coins>=100 && !gaveContinueOption) roomID=900;
			}
		}
		
		if (isDemo && roomID>2) roomID=1+getRandom(2);
		
		// limit rooms depending on coin count
		if (activePlayer.showTutorial && worldOrder[world]==1) roomID=1; 
		if (roomID==7 && !activePlayer.useMusic) roomID++;
		if (roomID==8 && myPlayer.coins<25) roomID=1+getRandom(6);
		if (roomID==9 && myPlayer.coins<50) roomID=1+getRandom(6);
		// v1.2.0
		if (roomID==12 && activePlayer.maxLevelReached[myPlayer.characterID][2]<3) roomID=1+getRandom(6);
		
		if (!myWorld.isCOOP && worldOrder[world]==2 && level==1 && !activePlayer.didUnlockCharacter(3) && !characterUnlockAdded[3]) roomID=0;

		switch (roomID) {
			case 0:	// hostage resque (sly rocko)
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				
				characterUnlockAdded[3]=true;
				monsterAdd(Monster.mCRATE, doorX+4,4, 12, -4);
			break;
			
			default:
				// Storage room, full of crates, have some fun shooting them
				doorX2=doorX+6;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				
				// crates on other end of the room
				tx=doorX+7;
				ty2=6;
				doorX++;
				while (tx<doorX2) {
					ty=ty2;
					while (ty<7) {
						monsterAdd(Monster.mCRATE, tx,ty, 12, 2);
						ty++;
					}
					ty2--;
					tx++;
				}				
			break;
			
			
			case 2:
				// "Princess peach"
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mAVATAR, doorX+4 ,6, 6, 10);	// peach
				
				unlockAchievement(PlayerProfile.A_PEACHY);
			break;
			
			
			case 3:	// Arcade
				doorX2=doorX+6;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX+4 ,6, 12, 0);	// mnoid
				monsterAdd(Monster.mARCADE, doorX+6 ,6, 12, 1);	// inc
				monsterAdd(Monster.mARCADE, doorX2-1 ,6, 12, 2);	// chronocash
			break;
			
			
			case 4: // single crate
				// Storage room, full of crates, have some fun shooting them
				doorX2=doorX-2;
				doorX+=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				
				monsterAdd(Monster.mCRATE, doorX2,6, 12, 2);
			break;
			
			
			case 5: // simple ledge
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				
				// add a platform randomly in the room with medi+ammo
				tx=(doorX-4)+getRandom(5);
				ty=5;
				myWorld.put(tx,ty,2,1, TileMap.cTILE);
				if (getRandom(64)<32) monsterAdd(Monster.mPICKUP,tx<<4,(ty-1)<<4,3,1);
				else monsterAdd(Monster.mPICKUP,(tx)<<4,(ty-1)<<4,3,0);
				if (getRandom(64)<32) monsterAdd(Monster.mPICKUP,(tx+1)<<4,(ty-1)<<4,3,1);
				else monsterAdd(Monster.mPICKUP,(tx+1)<<4,(ty-1)<<4,3,0);
		
				// add a platform randomly in the room with medi+ammo
				tx=(doorX-4)+getRandom(5);
				ty=3;
				myWorld.put(tx,ty,2,1,  TileMap.cTILE);
				if (getRandom(64)<32) monsterAdd(Monster.mPICKUP,tx<<4,(ty-1)<<4,3,1);
				else monsterAdd(Monster.mPICKUP,(tx)<<4,(ty-1)<<4,3,0);
				if (getRandom(64)<32) monsterAdd(Monster.mPICKUP,(tx+1)<<4,(ty-1)<<4,3,1);
				else monsterAdd(Monster.mPICKUP,(tx+1)<<4,(ty-1)<<4,3,0);
			break;
			
			case 6:
				// "Wizard"
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mAVATAR, doorX+2 ,6, 6, 11);	// Wizard
				
				monsterAdd(Monster.mCRATE, doorX+3,6, 12, 2);
				monsterAdd(Monster.mCRATE, doorX-3,6, 12, 2);
			break;		
			
			
			case 7: // jukebox
				doorX2=doorX+4;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX2,6, 12, 10);	// Jukebox

				// sweet tunes of GH
				fxAdd( ((lowDisplayW>>1)-60)+getRandom(80) , 60+getRandom(24),FX.fRATAT,6);
				
				unlockAchievement(PlayerProfile.A_DJDROPBEAT);
			break;			
			
			case 8: // BAR
				doorX2=doorX;
				doorX-=4;
				
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				
				monsterAdd(Monster.mARCADE, doorX2-1 ,6, 12, 7);	// bar	
				monsterAdd(Monster.mARCADE, doorX2+1 ,6, 12, 8);	// special drink	
				monsterAdd(Monster.mAVATAR, doorX2+3 ,6, 6, 13);	// bartender
				monsterAdd(Monster.mAVATAR, doorX2-1 ,6, 6, 14);	// drunk dude
			break;
			
			case 9: // robocoppy armor room
				doorX2=doorX+6;
				doorX-=4;
				
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mAVATAR, doorX+2 ,6, 6, 15);	// voodoo dude
				
				monsterAdd(Monster.mARCADE, doorX2-1 ,6, 12, 9);	// armour			
			break;

			case 10:	// Train tickets!
				doorX2=doorX+6;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX+4 ,6, 12, 11);	// ticketmachine
				monsterAdd(Monster.mAVATAR, doorX+3 ,6, 6, 16);	// conductor
			break;		
			

			case 11:	// Gameboy
				doorX2=doorX+6;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX+4 ,6, 12, 13);	// gameboy
				monsterAdd(Monster.mAVATAR, doorX+3 ,6, 6, 17);	// boy with cap
			break;		
			
			
			// v1.2.0 dr who
			case 12:
				doorX2=doorX+4;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX2  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX2  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX2 ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX+4 ,6, 12, 15);	// dr who
				monsterAdd(Monster.mAVATAR, doorX+3 ,6, 6, 18);	// dude with bow tie
			break;
			
			// v1.3.0 - sketch world
			case 13:
				doorX2=doorX+4;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX2  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX2  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX2 ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX+4 ,6, 12, 16);	// ezel
				
				// artschool
				fxAdd( ((lowDisplayW>>1)-60)+getRandom(80) , 60+getRandom(24),FX.fRATAT,35);
			break;
			
			
			case 99 : // SMB land
				doorX2=doorX+6;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX+4 ,6, 12, 5);	// PIPE				
			break;
			
			
			case 300:
				// return from arcade
				doorX2=doorX+6;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX+6  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX+6  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX+4 ,6, 12, 0);	// mnoid
				monsterAdd(Monster.mARCADE, doorX+6 ,6, 12, 3);	// inc-inactive
				monsterAdd(Monster.mARCADE, doorX2-1 ,6, 12, 2);	// chronocash
			break;
			
			
			case 301:
				// return from mario
				doorX2=doorX+6;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX+6  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX+6  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
			break;	
			
			case 302:
				// return from trainride
				doorX2=doorX+6;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX+4 ,6, 12, 12);	// ticketmachine inactive
				monsterAdd(Monster.mAVATAR, doorX+3 ,6, 6, 16);	// conductor				
			break;
			

			case 303:	// Gameboy
				doorX2=doorX+6;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX+4 ,6, 12, 14);	// gameboy
				monsterAdd(Monster.mAVATAR, doorX+3 ,6, 6, 17);	// boy with cap
			break;		
			
			
			// v1.3.0 - sketch world
			case 304:
				doorX2=doorX+4;
				doorX-=4;
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX2  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX2  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX2 ,6, 13, 2);
				monsterAdd(Monster.mARCADE, doorX+4 ,6, 12, 17);	// ezel
			break;			
			
			
			case 900: // continue room
				doorX2=doorX+6;
				doorX-=4;
				
				if (player1Died) {
					myPlayer.init(-100,-100);
					myPlayer.Died=true;
				} else {
					myPlayer.init( doorX  ,6);	
				}
				
				if (player2Died) {
					myPlayer2.init(-100,-100);
					myPlayer2.Died=true;
				} else {
					myPlayer2.init( doorX  ,6);	
				}
				monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
				monsterAdd(Monster.mAVATAR, doorX+2 ,6, 6, 12);	// voodoo dude
				
				monsterAdd(Monster.mARCADE, doorX2-1 ,6, 12, 6);	// statue			
				
				gaveContinueOption=true;
				
				unlockAchievement(PlayerProfile.A_VOODOOTASTIC);
			break;
			
		}
		
		
		
		myWorld.worldOffset=0;
		myWorld.worldOffsetY=0;
		myWorld.lockScreen=myWorld.worldOffset;
		
		// get the right tiles
		myWorld.generate();

	}

	
	function loadShopRoom() {
		var player1Died=myPlayer.Died;
		var player2Died=myPlayer2.Died;
		
		var doorX=((lowDisplayW>>1)>>4);
		
		destroyMap();

		// enclosed room, so create a rectangle area and fill the rest with black
		myWorld.reinit();
		myWorld.isInDoor=true;
		myWorld.lockVertical=true;
		myWorld.lockVerticalValue=0;
		myWorld.worldParallaxType=TileMap.pNOPARALLAX;
		myWorld.put(0, 0, TileMap.MAPWIDTH, TileMap.MAPHEIGHT, TileMap.cTILE);
		
		// cut out somewhere in the level
		//myWorld.cut((TileMap.MAPWIDTH>>1)-10, 2, 20, 6);
		myWorld.cut( doorX-5, 2, 11, 5);
		
		// add two platforms left and two platforms right with random goodies
		tx=doorX-4;
		ty=5;
		myWorld.put(tx,ty,2,1, TileMap.cTILE);
		
		tx=(doorX);
		ty=5;
		myWorld.put(tx,ty,2,1, TileMap.cTILE);
		
		tx=(doorX+2);
		ty=5;
		myWorld.put(tx,ty,2,1, TileMap.cTILE);
		
		if (player1Died) {
			myPlayer.init(-100,-100);
			myPlayer.Died=true;
		} else {
			myPlayer.init( doorX  ,6);	
		}
		
		if (player2Died) {
			myPlayer2.init(-100,-100);
			myPlayer2.Died=true;
		} else {
			myPlayer2.init( doorX  ,6);	
		}
		
		monsterAdd(Monster.mBUILDING, doorX ,6, 13, 2);
		
		myWorld.worldOffset=0;
		myWorld.worldOffsetY=0;
		myWorld.lockScreen=myWorld.worldOffset;
		
		// get the right tiles
		myWorld.generate();

	}
	
	
	var popAchievementID;
	var popAchievementY;
	var popAchievementYTarget;
	var popAchievementDelay = 0;
	
	
	function uploadHighscore() {
/*	
		popAchievementID = -99;
		
		if (popAchievementYTarget<0) {
			popAchievementYTarget = 2;
			popAchievementDelay = 64;
			playSound('FX_ACHIEVE');
		}
*/
		if (myPlayer.score>activePlayer.highScore) {
			initDied();
			activePlayer.highScore=myPlayer.score;
		} else {
			stopBackground();
			initMenu();
			nextState=INMAINMENU;
			menuSlide1=200;
			menuSlide2=200;
			initMissions();
		}
	}

	
	function unlockAchievement(id) {
		if (activePlayer.getAchievementByID(id) || myWorld.isCOOP) return;
			
		// first check if it's in our current Mission list
		if (activePlayer.getMissionAchieveID(0)==id || 
			activePlayer.getMissionAchieveID(1)==id || 
			activePlayer.getMissionAchieveID(2)==id) {

			if (activePlayer.getMissionAchieveID(0)==id) {
				popAchievementID = activePlayer.getMission(0);
				//generalInit( -(popAchievementID+1) );
			}
			if (activePlayer.getMissionAchieveID(1)==id) {
				popAchievementID = activePlayer.getMission(1);
				//generalInit( -(popAchievementID+1) );
			}
			if (activePlayer.getMissionAchieveID(2)==id) {
				popAchievementID = activePlayer.getMission(2);
				//generalInit( -(popAchievementID+1) );
			}

			activePlayer.setAchieved(id);
			
			if (popAchievementYTarget<0) {
				popAchievementYTarget = 2;
				popAchievementDelay = 64;
				playSound('FX_ACHIEVE');
			}
						
		}
	}
	
	
	
 