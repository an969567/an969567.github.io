function Bullets() {

	Bullets.bBULLET = 11, //zamieniliśmy //nic się nie stało //to co to za numerki? Kolejność rysowania?
	Bullets.bTRILASER = 2,
	Bullets.bROCKET = 3,
	Bullets.bEXPLOSION = 4,
	Bullets.bDROPPER = 5,
	Bullets.bSWITCH = 6,
	Bullets.bFLAME = 7,
	Bullets.bBOSSSPIKE = 8,
	Bullets.bELECTRO = 9,
	Bullets.bBIGFLAME = 10,
	Bullets.bTRIPLEFLAME = 1,
	Bullets.bTRIPLEFLAMEMINI = 12,
	Bullets.bTRILASERSMALL = 13,
	Bullets.bMEGAWORM = 14,
	Bullets.bBIGFLAMESKULL = 15,
	Bullets.bx = 16,
	Bullets.bBUILDINGDESTROY = 17;	// also used for snowflakes
	Bullets.bSTEAM = 18,
	Bullets.bEGGS = 19;
		
		// Bullet owner types
	Bullets.OWNER_PLAYER = 0,
	Bullets.OWNER_PLAYER2 = 1,
	Bullets.OWNER_MONSTER = 5,
	Bullets.OWNER_ANYONE = 3;

	
	this.myType=0;
	this.subType=0;
	this.aiState=0;
	this.aiCountDown=0;
	this.coverCountdown=0;
	this.bOwner=0;
	this.died=true;
	this.energy=0;

	this.floatX=0;
	this.floatY=0;
	this.x=0;
	this.y=0;
	this.xSpeed=0;
	this.ySpeed=0;
	this.ySpeedInc=0;
	this.xSpeedInc=0;
		
	this.doMoveSound=false;
		
	this.w=0;
	this.h=0;
	this.xOffset=0;
	this.yOffset=0;
	this.animDelay=0;
	this.SpriteSet=0;
	this.visible=true;
	this.alpha=255;

		// keep track how many dudes got killed by this bullet or explosion
	this.killCount=0;
	this.deleted=true;
	
	
	this.init=function(sOwner, sx, sy, sType, sSubType) {
			this.deleted=false;
			
			this.died=false;
			
			this.SpriteSet=4;
			this.bOwner=sOwner;
			
			this.x=sx;
			this.y=sy;
			this.xSpeed=0;
			this.ySpeed=0;
			this.energy=1;
			
			this.myType=sType;
			this.subType=sSubType;
			this.visible=true;
			
			this.alpha=255;
			
			this.coverCountdown=4;
			
			this.killCount=0;
			this.doMoveSound=false;
			
			switch (this.myType) {
				case Bullets.bBULLET:
					this.aiCountDown=32;
					this.w=6;
					this.h=4;
					if (this.subType<0) {
						this.xSpeed=-96;
						this.subType=-this.subType;
						this.xOffset=6;
					} else{
						this.xSpeed=96;
						this.xOffset=0;
					}
					this.yOffset=0;

					if (this.bOwner==Bullets.OWNER_MONSTER) this.energy=2;
					else this.energy=1;
					this.SpriteSet=4;
				break;
				
				case Bullets.bTRILASER:
					this.w=10;
					this.h=10;
					this.xSpeed=-64;
					this.ySpeed=128;
					this.xOffset=0;
					this.yOffset=4;
					
					if (this.bOwner==Bullets.OWNER_MONSTER) this.energy=48;
					else this.energy=16;
					
					this.aiCountDown=80;
					this.SpriteSet=4;
					
					
					
					// boss 1 bounce version
					if (this.subType==-99) {
						this.subType=1;
						this.energy=12;
					} else if (this.subType==-2 || this.subType==2) {
						this.ySpeed=64;
						if (this.subType<0) this.xSpeed=-164;
						else this.xSpeed=164;
						this.subType=0;
					} else {
						this.subType=0;
					}
				break;
				
				
				case Bullets.bROCKET:
					if (this.subType<0) {
						this.xSpeed=-96; //(16+myCanvas.getRandom(96));
					} else {
						this.xSpeed=96; //(16+myCanvas.getRandom(96));
					}
					this.ySpeed=-(64+getRandom(64));
					this.ySpeedInc=this.ySpeed;
					
					if (this.bOwner<=Bullets.OWNER_PLAYER2) this.energy=3;
					else this.energy=8;
					
					this.aiCountDown=80;
					this.SpriteSet=4;
				break;
				
				
				case Bullets.bEXPLOSION:
					this.w=64;
					this.h=64;
					this.y-=32;
					this.x-=32;
					if (this.subType==1 || this.subType==2) {
						this.w=48;
						this.x+=32;
					}
					this.aiCountDown=48;
					this.energy=32;
					this.visible=false;
				break;
				
				
				case Bullets.bDROPPER:
					this.w=6;
					this.h=6;
					this.xSpeed=this.subType*96;
					this.ySpeed=16;
					this.aiCountDown=80;
					this.SpriteSet=4;
					this.energy=4;
				break;
				
				case Bullets.bSWITCH:
					this.w=160;
					this.h=160;
					this.x-=80;
					this.y-=80;
					this.aiCountDown=48;
					this.energy=1;
					this.visible=false;
				break;
				
				
				case Bullets.bFLAME:
					this.w=8;
					this.h=7;
					this.xOffset=0;
					this.yOffset=25;
					this.aiCountDown=6<<4;
					this.xSpeed=this.subType*64;
					this.ySpeed=0;
					this.SpriteSet=4;
					this.alpha=160;
					this.energy=1;
				break;
				
				
				case Bullets.bBOSSSPIKE:
					this.w=8;
					this.h=25;
					this.xOffset=178;
					this.yOffset=48;
					this.h=0;
					this.aiState=0;
					this.SpriteSet=this.subType;
					this.energy=8;
				break;
				
				
				case Bullets.bELECTRO:
					this.w=6;
					this.h=6;
					this.xOffset=24+(getRandom(4)*6);
					this.yOffset=0;
					this.xSpeed=this.subType*32;
					this.ySpeed=0;
					
					if (this.bOwner<=Bullets.OWNER_PLAYER2) this.energy=2;
					else this.energy=1;
					
					this.aiCountDown=4;
					this.animDelay=2<<4;
				break;
				
				
				case Bullets.bBIGFLAME:
					this.w=16;
					this.h=16;
					this.xOffset=0;
					this.yOffset=48;
					this.SpriteSet=4;
					this.alpha=200;
					this.energy=4;
					this.aiCountDown=16;
					this.ySpeedInc=0;
					
					this.aiState=0;
					
					if (this.subType==999) {
						// exhaust, straight down
						this.xSpeed=0;
						this.ySpeed=0;
						this.aiState=2;
					} else {
						this.xSpeed=this.subType<<4;
						this.ySpeed=0;
					}
				break;
				
				
				case Bullets.bTRIPLEFLAME:
					this.w=8;
					this.h=8;
					this.xOffset=24;
					this.yOffset=6;
					this.aiState=0;
					this.aiCountDown=12<<4;
					this.xSpeed=this.subType*16;
					this.ySpeed=-2<<4;
					this.ySpeedInc=8;
					this.SpriteSet=4;
					this.energy=2;
				break;
				
				case Bullets.bTRIPLEFLAMEMINI:
					this.w=4;
					this.h=4;
					this.xOffset=32;
					this.yOffset=6;
					this.energy=1;
					this.SpriteSet=4;
					this.aiCountDown=12<<4;
					if (this.subType<0) {
						this.xSpeed=-80;
						switch (this.subType) {
							case -1: 
								this.ySpeed=-48;
							break;
							
							case -2:
								this.ySpeed=0;
							break;
							
							case -3:
								this.ySpeed=48;
							break;
						}
					} else {
						this.xSpeed=80;
						switch (this.subType) {
							case 1: 
								this.ySpeed=-48;
							break;
							
							case 2:
								this.ySpeed=0;
							break;
							
							case 3:
								this.ySpeed=48;
							break;
						}
					}
						
				break;
				
				
				case Bullets.bTRILASERSMALL:
					this.w=6;
					this.h=6;
					
					this.xOffset=42+(this.subType*6);
					this.yOffset=0;
					
					switch (this.subType) {
						case 1: // bot-left
							this.xSpeed=-128;
							this.ySpeed=128;
							this.x-=8;
							this.y+=4;
						break;

						case 2: // left
							this.xSpeed=-128;
							this.ySpeed=0;
							this.y-=2;
						break;
						
						case 3: // top-left
							this.xSpeed=-128;
							this.ySpeed=-128;
							this.y-=8;
							this.x-=8;
						break;
						
						case 4: // top-right
							this.xSpeed=128;
							this.ySpeed=-128;
						break;
						
						case 5: // right
							this.xSpeed=128;
							this.ySpeed=0;
							this.y-=2;
						break;
						
						case 6: // bot-right
							this.y+=4;
							this.x+=8;
							this.xSpeed=128;
							this.ySpeed=128;
						break;
					}
					
					this.energy=12;
					this.aiCountDown=80;
					this.SpriteSet=4;
				break;
				
				
				case Bullets.bMEGAWORM:
					this.w=48;
					this.h=48;
					this.xOffset=0;
					this.yOffset=64;
					this.xSpeed=-14<<4;
					this.ySpeed=0;
					this.SpriteSet=4;
					this.energy=80;
					this.aiCountDown=32;
				break;
				
				case Bullets.bBIGFLAMESKULL:
					this.w=16;
					this.h=16;
					this.xOffset=0;
					this.yOffset=48;
					this.SpriteSet=4;
					this.energy=2;
					this.aiCountDown=16;
					this.ySpeedInc=0;
					
					this.aiState=0;
					
					this.xSpeed=this.subType<<4;
					this.ySpeed=Math.abs(this.subType)<<4;
				break;
				
				case Bullets.bRAINDROP:
					switch (this.subType) {
						case 0:	// rain
							this.w=4;
							this.h=1+getRandom(3);
							this.xOffset=36;
							this.yOffset=6+getRandom(8);
							if (this.yOffset+this.h>17) this.h=17-this.yOffset;
							
							this.subType=getRandom(3);
							
							this.xSpeed=-32+(this.subType<<2);
							this.ySpeed=64+(this.subType<<4);
							
							this.subType=0;
						break;
						
						
						case 1: // snow
							this.w=1+getRandom(2);
							this.h=this.w;
							this.xOffset=43;
							this.yOffset=3;
							
							this.xSpeed=getRandom(3)<<4;
							this.ySpeed=(1+getRandom(3))<<4;
							
							if (this.xSpeed>0) this.xSpeedInc=-16;
							else this.xSpeedInc=16;
						break;
					}
				break;
				
				
				case Bullets.bBUILDINGDESTROY:
					this.w=48;
					this.h=48;
					this.y-=16;
					this.x-=16;
					this.aiCountDown=12;
					this.energy=32;
					this.visible=false;
				break;
				
				// v1.3.0
				case Bullets.bSTEAM:
					this.x+=getRandom(4)-2;
					
					switch (this.subType) {
						case 0:
							this.ySpeed=-32;
							this.xOffset=48+(getRandom(6)*6);
							this.yOffset=6;
							this.w=6;
							this.h=6;
						break;
						
						case 1: // shot by boss, horizontal
							this.xSpeed=-48;
							this.xOffset=48+(getRandom(6)*12);
							this.yOffset=18;
							this.w=12;
							this.h=12;
						break;
						
						case 2: // boss top gun
							this.xSpeed=-48;
							this.ySpeed=32;
							this.xOffset=48+(getRandom(6)*12);
							this.yOffset=18;
							this.w=12;
							this.h=12;
						break;
					}
					
					this.energy=4;
					this.aiCountDown=12;
					this.alpha=200;
				break;
				
				case Bullets.bEGGS:
					this.w=6;
					this.h=6;
					this.xOffset=48+(getRandom(6)*6);
					this.yOffset=12;
					this.energy=3;
					this.xSpeed=this.subType*96;
					this.ySpeed=-(2+getRandom(3))<<5;
					this.aiState=0;
				break;
				
			}
			
			this.floatX=this.x<<4;
			this.floatY=this.y<<4;
	}
	
	
		
		

	this.update=function(myPlayer, myPlayer2, myWorld, displayW) {

			var hitPlayer=false;
			var hitPlayer2=false;
			var tx;
			var ty;
			var originalSlowMoFactor=myWorld.slowMoFactor;
			
			if (this.bOwner>Bullets.OWNER_PLAYER2 && !myPlayer.Died && myPlayer.invincableCounter==0 && !myPlayer.transport) { 
				if (myPlayer.x+14>=this.x && myPlayer.x+2<this.x+this.w && myPlayer.y+14>this.y && myPlayer.y+2<this.y+this.h) hitPlayer=true;
			}

			if (this.bOwner>Bullets.OWNER_PLAYER2 && !myPlayer2.Died && myPlayer2.invincableCounter==0 && !myPlayer2.transport) { 
				if (myPlayer2.x+14>=this.x && myPlayer2.x+2<this.x+this.w && myPlayer2.y+14>this.y && myPlayer2.y+2<this.y+this.h) hitPlayer2=true;
			}
			

			if (this.x<myWorld.worldOffset-this.w || this.x>myWorld.worldOffset+displayW || this.y>160) {
				this.died=true;
				return;
			}
			
			if (myPlayer.hasSpecialDrink && this.bOwner<=Bullets.OWNER_PLAYER2) myWorld.slowMoFactor=0;
			
			if (this.coverCountdown>0) this.coverCountdown--;
			
			switch (this.myType) {
				case Bullets.bBULLET:
					
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.floatY+=this.ySpeed>>myWorld.slowMoFactor;

					this.x=this.floatX>>4;
					this.y=this.floatY>>4;

					this.collideCheck(myWorld,myPlayer, myPlayer2);
			
					if (this.aiCountDown>0) this.aiCountDown--;
					else {
						this.died=true;
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					
					if (this.xSpeed==0) this.died=true;
					
					if (hitPlayer) {
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
						this.died=true;
					}

					if (hitPlayer2) {
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
						this.died=true;
					}
				break;
				
				
				
				
				case Bullets.bTRILASER:
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.floatY+=this.ySpeed>>myWorld.slowMoFactor;

					this.x=this.floatX>>4;
					this.y=this.floatY>>4;
					
					this.collideCheck(myWorld,myPlayer,myPlayer2);
					if (this.subType==1 && this.died) {
						this.died=false;
						this.ySpeed=-64;
						this.y-=12;
						this.floatY=this.y<<4;
					}

					if (this.ySpeed<128) this.ySpeed+=16>>myWorld.slowMoFactor;
					
					if (this.aiCountDown>0) this.aiCountDown--;
					else {
						this.died=true;
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					
					
					if (hitPlayer) {
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
						this.died=true;
					}
					
					if (hitPlayer2) {
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
						this.died=true;
					}
				break;
				
				
				case Bullets.bROCKET:
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.floatY+=this.ySpeed>>myWorld.slowMoFactor;

					if (this.ySpeed<8<<4) this.ySpeed+=16>>myWorld.slowMoFactor;
					
					this.x=this.floatX>>4;
					this.y=this.floatY>>4;
					
					this.collideCheck(myWorld,myPlayer,myPlayer2);
					if (this.died) {
						this.doMoveSound=true;
						this.died=false;
						this.ySpeedInc+=16;
						if (this.ySpeedInc>0) this.ySpeedInc=0;
						this.ySpeed=this.ySpeedInc;
						this.y-=12;
						this.floatY=this.y<<4;
						if (this.energy==0 || this.xSpeed==0 || this.ySpeedInc==0) {
							this.died=true;
							this.energy=999;
						}
						
						
						if (this.xSpeed<0) {
							tx=(this.x+(this.w>>1))>>4;
							ty=(this.y)>>4;
							if (myWorld.isSolidBullet(tx-1, ty)) {
								this.died=true;
								this.energy=999;
							}
						} else if (this.xSpeed>0) {
							tx=(this.x+(this.w>>1))>>4;
							ty=(this.y)>>4;
							if (myWorld.isSolidBullet(tx+1, ty)) {
								this.died=true;
								this.energy=999;
							}
						}
						
					}
					
					fxAdd(this.x,this.y,FX.fSMOKETRAIL,0);
					
					if (this.ySpeed<-8) {
						if (this.xSpeed<-16) {
							this.xOffset=12;
							this.yOffset=0;
							this.w=6;
							this.h=6;
						} else if (this.xSpeed>16) {
							this.xOffset=18;
							this.yOffset=0;
							this.w=6;
							this.h=6;
						} else {
							this.xOffset=12;
							this.yOffset=12;
							this.w=4;
							this.h=6;
						}
					} else if (this.ySpeed>8) {
						if (this.xSpeed<-16) {
							this.xOffset=12;
							this.yOffset=6;
							this.w=6;
							this.h=6;
						} else if (this.xSpeed>16) {
							this.xOffset=18;
							this.yOffset=6;
							this.w=6;
							this.h=6;
						} else {
							this.xOffset=16;
							this.yOffset=12;
							this.w=4;
							this.h=6;
						}
						
					} else {
						if (this.xSpeed<0) {
							this.xOffset=6;
							this.yOffset=0;
							this.w=6;
							this.h=4;
						} else {
							this.xOffset=0;
							this.yOffset=0;
							this.w=6;
							this.h=4;
						}
					}
					
					
					if (this.aiCountDown>0) this.aiCountDown--;
					else {
						this.died=true;
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					
					if (this.bOwner>Bullets.OWNER_PLAYER2) {
						if (hitPlayer) {
							myPlayer.die(this);
							fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
							fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
							this.died=true;
						}
						
						if (hitPlayer2) {
							myPlayer2.die(this);
							fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
							fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
							this.died=true;
						}
					}
				break;
				
				
				
				case Bullets.bEXPLOSION:
					
					if (hitPlayer) {
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
					}

					if (hitPlayer2) {
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
					}

					if (this.subType==0 || this.subType==1) {
						if (this.w>40) fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fBIGEXPLODE,0);
						else if (this.w>20) fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fCIRCLEEXPLODE,0);
						else fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fCIRCLEEXPLODE,0);
					}
					
					
					this.w-=4;
					this.x+=2;
					this.h-=4;
					this.y+=2;
					
					if (this.w<=0) {
						this.died=true;
					}
				break;
				
				
				
				case Bullets.bDROPPER:
					if (this.xSpeed>0) {
						this.xSpeed-=8;
						if (this.xSpeed<0) this.xSpeed=0;
					} else if (this.xSpeed<0) {
						this.xSpeed+=8;
						if (this.xSpeed>0) this.xSpeed=0;
					}

					if (this.ySpeed<96) this.ySpeed+=8;
					
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
					this.x=this.floatX>>4;
					this.y=this.floatY>>4;
					
					this.collideCheck(myWorld,myPlayer,myPlayer2);
					
					if (myWorld.worldAge%8==0) fxAdd(this.x,this.y,FX.fSMOKETRAIL,0);
					
					if (this.xSpeed<-16) {
						this.xOffset=12;
						this.yOffset=6;
						this.w=6;
						this.h=6;
					} else if (this.xSpeed>16) {
						this.xOffset=18;
						this.yOffset=6;
						this.w=6;
						this.h=6;
					} else {
						this.xOffset=16;
						this.yOffset=12;
						this.w=4;
						this.h=6;
					}
					
					
					

					if (this.aiCountDown>0) this.aiCountDown--;
					else {
						this.died=true;
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					
					if (hitPlayer) {
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
						this.died=true;
					}					

					if (hitPlayer) {
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
						this.died=true;
					}					
				break;
				
				
				case Bullets.bSWITCH:
					if (this.energy>0) this.energy--;
					else this.died=true;
				break;
				
				
				case Bullets.bFLAME:
					if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
					else {
						this.xOffset+=8;
						if (this.xOffset>24) this.died=true;
						this.aiCountDown=4<<4;
						
						if (this.xOffset>16) this.ySpeed-=16;
						
						if (this.xSpeed<0) this.xSpeed+=8;
						else this.xSpeed-=8;
					}

					
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
					this.x=this.floatX>>4;
					this.y=this.floatY>>4;
					
					this.collideCheck(myWorld,myPlayer, myPlayer2);

					if (hitPlayer) { 
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					
					if (hitPlayer2) { 
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
				break;
				
				
				case Bullets.bBOSSSPIKE:
					switch (this.aiState) {
						case 0:
							if (this.h<25) {
								this.h+=5;
								this.y-=5;
							} else {
								this.aiState=1;
								this.aiCountDown=4;
							}
						break;
						
						case 1:
							if (hitPlayer) {
								myPlayer.die(this);
								fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
							}
							
							if (hitPlayer2) {
								myPlayer2.die(this);
								fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
							}
							
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiState=2;
							}
						break;
						
						case 2:
							if (this.h>0) {
								this.h-=5;
								this.y+=5;
							} else {
								this.died=true;
							}
						break;
					}
					
				break;
				
				
				
				
				case Bullets.bELECTRO:
					
					if (this.animDelay>0) this.animDelay-=16>>myWorld.slowMoFactor;
					else {
						this.animDelay=2<<4;
						this.xOffset+=6;
						if (this.xOffset>42) this.xOffset=24;

						if (this.ySpeed<64) this.ySpeed+=16>>myWorld.slowMoFactor;
					}

					if (this.xSpeed>0 && this.xSpeed<120) this.xSpeed+=8;
					else if (this.xSpeed<0 && this.xSpeed>-120) this.xSpeed-=8;
					
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.x=this.floatX>>4;
					
					tx=(this.x+(this.w>>1))>>4;
					ty=(this.y)>>4;
					if (myWorld.isSolid(tx, ty)) {
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						this.died=true;
					}
					
					if (hitPlayer) { 
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}

					if (hitPlayer2) { 
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
				break;
				
				
				case Bullets.bBIGFLAME:
					if (this.xSpeed<0) this.xSpeed+=16>>myWorld.slowMoFactor;
					if (this.xSpeed>0) this.xSpeed-=16>>myWorld.slowMoFactor;
					if (this.aiState==0 || this.aiState==2) {
						this.ySpeed+=16;
						if (this.ySpeed>96) this.ySpeed=96;
						this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
					}

					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.x=this.floatX>>4;
					this.y=this.floatY>>4;
					
					tx=(this.x+8)>>4;
					ty=(this.y+this.h)>>4;
					if (this.aiState>0 || myWorld.isSolid(tx,ty)) {
						if (this.aiState<2) {
							this.y=(ty<<4)-this.h;
							this.floatY=this.y<<4;
							this.aiState=1;
							
							this.ySpeed=0;
							this.xSpeed=0;
						} else {
							this.ySpeed=32;
							if (myWorld.isSolid(tx,ty)) {
								this.y=(ty<<4)-this.h;
								this.floatY=this.y<<4;
								this.aiState=1;
								this.ySpeed=0;
							}
						}
						
						if (this.animDelay>0) this.animDelay-=16>>myWorld.slowMoFactor;
						else {
							this.animDelay=16;
							this.xOffset+=16;
							if (this.xOffset>96) this.died=true;
						}
					}
					
					if (hitPlayer) { 
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}

					if (hitPlayer2) { 
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					
				break;
				
				
				case Bullets.bTRIPLEFLAME:
					if (this.xSpeed<0 && this.xSpeed>-96) this.xSpeed-=8;
					else if (this.xSpeed>0 && this.xSpeed<96) this.xSpeed+=8;
					
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
					this.x=this.floatX>>4;
					this.y=this.floatY>>4;
					
					this.ySpeed+=this.ySpeedInc;
					if (this.ySpeed>16) this.ySpeedInc=-8;
					else if (this.ySpeed<-16) this.ySpeedInc=8;
					
					this.collideCheck(myWorld,myPlayer,myPlayer2);
					
					this.aiCountDown-=16>>myWorld.slowMoFactor;
					if (this.aiCountDown<=0) {
						this.died=true;
						this.aiState=700;
					}
					
					if (hitPlayer) { 
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					
					if (hitPlayer2) { 
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
				break;
			
				
				case Bullets.bTRIPLEFLAMEMINI:
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
					this.x=this.floatX>>4;
					this.y=this.floatY>>4;
					
					this.collideCheck(myWorld,myPlayer,myPlayer2);

					this.aiCountDown-=16>>myWorld.slowMoFactor;
					if (this.aiCountDown<=0) {
						this.died=true;
						this.aiState=700;
					}
					
					if (hitPlayer) { 
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					
					if (hitPlayer2) { 
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					
				break;
				
				case Bullets.bTRILASERSMALL:
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.floatY+=this.ySpeed>>myWorld.slowMoFactor;

					this.x=this.floatX>>4;
					this.y=this.floatY>>4;
					
					this.collideCheck(myWorld,myPlayer,myPlayer2);
					
					if (this.aiCountDown>0) this.aiCountDown--;
					else {
						this.died=true;
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					
					
					if (hitPlayer) { 
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
						this.died=true;
					}
					
					if (hitPlayer2) {
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
						this.died=true;
					}
				break;		
				
				
				case Bullets.bMEGAWORM:
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.x=this.floatX>>4;
					
					if (this.aiCountDown>0) this.aiCountDown--;
					else {
						this.died=true;
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}
					

					if (hitPlayer) { 
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
					}
					
					if (hitPlayer2) {
						myPlayer2.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
						fxAdd(this.x-8,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
					}
				break;
				
				case Bullets.bBIGFLAMESKULL:
					this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
					this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
					this.x=this.floatX>>4;
					this.y=this.floatY>>4;
					
					 
					tx=(this.x+8)>>4;
					ty=(this.y+this.h)>>4;
					if (this.y>=88) {
						this.y=88;
						this.floatY=this.y<<4;
						
						if (this.animDelay>0) this.animDelay-=16>>myWorld.slowMoFactor;
						else {
							this.animDelay=16;
							this.xOffset+=16;
							if (this.xOffset>96) this.died=true;
						}
					}
					
					if (hitPlayer) { 
						myPlayer.die(this);
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					}

					if (hitPlayer2) { 
						myPlayer2.die(this);
						fxAdd(x,y,FX.fSMALLEXPLODE,0);
					}
					
				break;
				
				case Bullets.bRAINDROP:
					switch (this.subType) {
						case 0:
							this.floatX+=this.xSpeed;
							this.floatY+=this.ySpeed;
							this.x=this.floatX>>4;
							this.y=this.floatY>>4;
							this.collideCheck(myWorld, myPlayer, myPlayer2);
							if (hitPlayer || hitPlayer2) this.died=true;
						break;
						
						case 1: // snowflake
							this.floatX+=this.xSpeed;
							this.floatY+=this.ySpeed;
							this.x=this.floatX>>4;
							this.y=this.floatY>>4;
							this.collideCheck(myWorld, myPlayer, myPlayer2);
							if (hitPlayer || hitPlayer2) this.died=true;

							this.xSpeed+=this.xSpeedInc;
							if (this.xSpeed>32) this.xSpeedInc=-16;
							else if (this.xSpeed<-32) this.xSpeedInc=16;
						break;
					}
				break;
				
				
				// v1.3.0
				case Bullets.bSTEAM:
					if (this.subType==0) this.alpha-=4+(getRandom(12));
					else this.alpha-=4;
					
					if (this.alpha<=0) {
						this.alpha=0;
						this.died=true;
					}
					this.floatX+=this.xSpeed;
					this.x=this.floatX>>4;

					this.floatY+=this.ySpeed;
					if (this.ySpeed<-8) this.ySpeed+=2;
					this.y=this.floatY>>4;
					
					if (hitPlayer) {
						myPlayer.die(this);
					}

					if (hitPlayer2) {
						myPlayer2.die(this);
					}

				break;
				
				
				
				case Bullets.bEGGS:
					switch (this.aiState) {
						case 0:	 // flying
							if (this.ySpeed<48) this.ySpeed+=16>>myWorld.slowMoFactor;
							this.floatY+=this.ySpeed;
							this.y=this.floatY>>4;
							
							tx=(this.x+3)>>4;
							if (this.ySpeed>0) {
								ty=(this.y+6)>>4;
								// simple check for surface
								if (myWorld.isSolid(tx, ty)) {
									this.aiState=1;
									this.y=(ty<<4)-5;
									this.floatY=this.y<<4;
								}
							} else {
								ty=(this.y>>4);
								if (myWorld.isSolid(tx,ty)) {
									this.aiState=1;
									this.y=(ty<<4)+15;
									this.floatY=this.y<<4;
								}
							}
							
							if (this.xSpeed>0) {
								this.xOffset+=6;
								if (this.xOffset>78) this.xOffset=48;
							} else {
								this.xOffset-=6;
								if (this.xOffset<48) this.xOffset=78;
							}

							this.floatX+=this.xSpeed;
							this.x=this.floatX>>4;
							ty=(this.y+3)>>4;
							if (this.xSpeed>0) {
								tx=(this.x+6)>>4;
								if (myWorld.isSolid(tx, ty)) {
									this.aiState=1;
									this.x=(tx<<4)-5;
									this.floatX=this.x<<4;
								}
							} else {
								tx=(this.x>>4);
								if (myWorld.isSolid(tx, ty)) {
									this.aiState=1;
									this.x=(tx<<4)+15;
									this.floatX=this.x<<4;
								}
							}
							
							// simple check for surface
							if (this.aiState==1) {
								// stick to the floor waiting for enemy!
								this.died=false;
								this.aiState=1;
								this.aiCountDown=256;
							}
						break;
						
						case 1:// sticky
							tx=this.x>>4;
							ty=(this.y+2)>>4;
									
							if (!myWorld.isSolid(tx,ty+1)) {
								this.aiState=0;
							}
							
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
							// add explosion
								this.died=true;
								fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
							}
						break;
					}
				break;
				
			}
			
			
			myWorld.slowMoFactor=originalSlowMoFactor;
			
		
	}
	


	
	this.collideCheck=function(myWorld, myPlayer, myPlayer2) {
			var tx;
			var ty;
			var ty2;
			
			if (this.y<0 || this.y>TileMap.MAPHEIGHT*16) this.died=false;
			else if (this.x>(TileMap.MAPWIDTH*16) || this.x<0) {
				this.died=true;
			} else {
				if (this.bOwner==Bullets.OWNER_PLAYER && myPlayer.inCover && this.coverCountdown!=0) return;
				if (this.bOwner==Bullets.OWNER_PLAYER2 && myPlayer2.inCover && this.coverCountdown!=0) return;
				
				tx=(this.x+(this.w>>1))>>4;
				ty=(this.y)>>4;
				if (myWorld.isSolidBullet(tx, ty)) { // || myWorld.isSolidBullet(tx, ty2)) {
					if (this.myType!=Bullets.bRAINDROP) {
						fxAdd(this.x,this.y,FX.fSMALLEXPLODE,0);
					
						if (this.xSpeed<0) fxAdd(this.x,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
						else fxAdd(this.x,this.y+getRandom(16)-8,FX.fBIGEXPLODE,0);
					}
					this.died=true;
					this.y=(ty<<4)-this.h;
					this.floatY=this.y<<4;
				}
				
			}

	}	
	

	
	this.hitMonster=function(myMonster) {
		// v1.3.0
		if (this.myType==Bullets.bEGGS && myMonster.myType==Monster.mCRATE) return;

		this.died=true;
		
		if (this.myType==Bullets.bELECTRO) {
			this.aiCountDown--;
			if (this.aiCountDown>0) this.died=false;
		}
		
		if (this.myType==Bullets.bMEGAWORM) this.died=false;
	}
	
	
	this.collidesWith=function(myMonster) {
		var collide=false;

		// v1.2.0 added crate check
		if (this.bOwner!=Bullets.OWNER_ANYONE && this.bOwner>Bullets.OWNER_PLAYER2 && myMonster.myType!=Monster.mCRATE) return false;
		var cw=this.x+this.w;
		var ch=this.y+this.h;
		
		if (myMonster.myType==Monster.mBOSS6 || myMonster.myType==Monster.mWORM) return true;
		// v1.3.0
		if (myMonster.myType==Monster.mCHICKEN) return true;

		if ((myMonster.x<=cw) && (myMonster.x+myMonster.w>=this.x) && (myMonster.y<=ch) && (myMonster.y+myMonster.h>=this.y)) collide=true;
		return collide;
	}		
	
	
}