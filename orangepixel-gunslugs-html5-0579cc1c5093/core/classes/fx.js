function FX() {
	
	FX.fTWIRL			= 1, // player jump
	FX.fTWIRLLAND		= 2, // player land
	FX.fBIGEXPLODE		= 3,
	FX.fSMALLEXPLODE 	= 4,
	FX.fRATAT			= 5, // used for other speech
	FX.fPARTICLE		= 6,
	FX.fGUN			= 7,
	FX.fSIGNAL			= 8,
	FX.fCHECKPOINT		= 9,
	FX.fSHELL			= 10,
	FX.fZING			= 11, // used for other speechbubbles
	FX.fSMOKETRAIL		= 12,
	FX.fFIREBULB		= 13, // used in jetpack
	FX.fHUGEEXPLODE	= 14,
	FX.fENERGYORB		= 15,
	FX.fCIRCLEEXPLODE	= 16,
	FX.fDEBRI			= 17,
	FX.fENTRY			= 18,
	FX.fCOIN			= 19,
	FX.fMUSIC			= 20,
	FX.fPLUME			= 21,
	FX.fVANISH			= 22, // avatar vanishing
	FX.fPLAYERECHO		= 23,
	FX.fHELP			= 24;
	
	this.tx=0;
	this.ty=0;
	this.floatX=0;
	this.floatY=0;
	this.x=0;
	this.y=0;
	this.xSpeed=0;
	this.ySpeed=0;
	this.w=0;
	this.h=0;
	this.animDelay=0;
	this.animSpeed=0;
	this.animFrame=0;
	this.animFrameA=0;
	this.aOffset=0;
	this.died=false;
	
	this.xIncrease=0;
	this.yIncrease=0;
	
	this.aiState=0;
	this.aiCountDown=0;
	
	this.renderPass=0;
	this.spriteSet=0;

	this.fType=0;
	
	this.SubType=0;

	this.rotation=0;
	this.alpha=0;
	
	this.visible=true;
	this.deleted=true;
	
	
	this.init=function( ax,  ay,  aType,  aSubType) {
		this.deleted=false;
		
		this.spriteSet=1;	// default FX spriteset
		this.x=ax;
		this.y=ay;
		this.fType=aType;
		this.SubType=aSubType;
		
		this.ySpeed=0;
		this.xSpeed=0;

		this.animSpeed=2;
		this.animFrameA=0;
		
		this.alpha=255;
		
		this.rotation=0;
		this.visible=true;
		
		this.renderPass=1;

		switch (this.fType) {
			case FX.fTWIRL:
				this.w=8;
				this.h=8;
				this.animFrame=0;
				this.aOffset=0;
				this.animFrameA=8;
				this.animSpeed=2;
			break;
			
			
			case FX.fTWIRLLAND:
				this.w=8;
				this.h=8;
				this.animFrame=0;
				this.aOffset=16;
				this.animFrameA=8;
				this.animSpeed=1;
			break;
			
			case FX.fBIGEXPLODE:
				this.w=16;
				this.h=16;
				this.animFrame=0;
				this.aOffset=24+(getRandom(3)<<4);
				this.animFrameA=16;
				this.animSpeed=2;
				this.alpha=255-(getRandom(5)<<4);
			break;
			
			
			case FX.fSMALLEXPLODE:
				this.w=8;
				this.h=8;
				this.animFrame=40;
				this.aOffset=this.SubType*8;
				this.animFrameA=8;
				this.alpha=255;
				this.animSpeed=1;
			break;
			
			
			case FX.fRATAT:
				this.animSpeed=16;
				this.aiCountDown=24;
				switch (this.SubType) {
					case 0: // ratat
						this.w=29;
						this.h=8;
						this.aOffset=8;
						this.animFrame=0;
						this.aiCountDown=4;
					break;
					
					case 1: // click!
						this.w=21;
						this.h=7;
						this.aOffset=24;
						this.animFrame=80;
						this.aiCountDown=4;
					break;
					
					case 2: // bla
						this.w=13;
						this.h=7;
						this.aOffset=8;
						this.animFrame=30;
						this.aiCountDown=4;
					break;
					
					case 3: // let's heat it up (flamethrower)
						this.w=61;
						this.aOffset=72;
						this.animFrame=0;
					break;
					
					
					case 4: // no more music
						this.w=87;
						this.h=14;
						this.aOffset=0;
						this.animFrame=149;
					break;
					
					case 5: // just went deaf
						this.w=87;
						this.h=7;
						this.aOffset=15;
						this.animFrame=149;
					break;
					
					case 6: // sweet tunes
						this.w=77;
						this.h=14;
						this.aOffset=22;
						this.animFrame=149;
					break;
					
					
					
					case 10:	// shhhh
						this.w=21;
						this.h=7;
						this.aOffset=135;
						this.animFrame=135;
					break;
					
					case 11: 	// I'm hiding
						this.w=47;
						this.h=7;
						this.aOffset=135;
						this.animFrame=156;
					break;
					
					case 12:	// take these
						this.w=43;
						this.h=7;
						this.aOffset=135;
						this.animFrame=203;
					break;
					
					case 13:	// owned it
						this.w=36;
						this.h=7;
						this.aOffset=176;
						this.animFrame=116;
					break;
					
					case 14:	// damn monkey game
						this.w=61;
						this.h=7;
						this.aOffset=183;
						this.animFrame=116;
					break;
					
					
					case 15: // you shall not pass
						this.w=71;
						this.h=7;
						this.aOffset=190;
						this.animFrame=0;
					break;
					
					case 16: //hihi just kiddin
						this.w=69;
						this.h=7;
						this.aOffset=190;
						this.animFrame=73;
					break;
					
					case 17: // regen you
						this.w=71;
						this.h=7;
						this.aOffset=190;
						this.animFrame=163;
					break;
					
					case 18: // buy continue?
						this.w=57;
						this.h=7;
						this.aOffset=197;
						this.animFrame=0;
					break;
					
					case 19:// very rare!
						this.w=17;
						this.h=7;
						this.aOffset=197;
						this.animFrame=58;
					break;
					
					case 20: // -cough-
						this.w=27;
						this.h=7;
						this.aOffset=197;
						this.animFrame=96;
					break;
					
					case 21:// rare!
						this.w=19;
						this.h=7;
						this.aOffset=197;
						this.animFrame=76;
					break;
					
					case 22: // grab a drink soldier
						this.w=80;
						this.h=7;
						this.aOffset=197;
						this.animFrame=125;
					break;
					
					case 23: // war
						this.w=15;
						this.h=7;
						this.aOffset=204;
						this.animFrame=0;
					break;
				
					case 24: // hick
						this.w=23;
						this.h=7;
						this.aOffset=204;
						this.animFrame=16;
					break;
					
					case 25: //whasit good for
						this.w=62;
						this.h=7;
						this.aOffset=204;
						this.animFrame=40;
					break;
					
					case 26: // abslotty ntink
						this.w=51;
						this.h=7;
						this.aOffset=204;
						this.animFrame=103;
					break;
					
					case 27: // buy armor?
						this.w=57;
						this.h=7;
						this.aOffset=211;
						this.animFrame=0;
					break;
					
					case 28: // it'll save you
						this.w=52;
						this.h=7;
						this.aOffset=211;
						this.animFrame=58;
					break;
					
					case 29: // tickets here
						this.w=79;
						this.h=7;
						this.aOffset=65;
						this.animFrame=149;
					break;
					
					case 30: // what a ride
						this.w=41;
						this.h=7;
						this.aOffset=281;
						this.animFrame=0;
					break;
					
					case 31:// this game 
						this.w=61;
						this.h=7;
						this.aOffset=281;
						this.animFrame=42;
					break;
					
					case 32: // is broken..
						this.w=39;
						this.h=7;
						this.aOffset=281;
						this.animFrame=104;
					break;
					
					case 33: // only 4 colors
						this.w=51;
						this.h=7;
						this.aOffset=281;
						this.animFrame=144;
					break;
					
					case 34:
						this.w=77;
						this.h=7;
						this.aOffset=176;
						this.animFrame=155;
					break;
					
					// v1.3.0 - artschool
					case 35:
						this.w=39;
						this.h=7;
						this.aOffset=288;
						this.animFrame=0;
					break;
					case 36: // everyone a critic
						this.w=71;
						this.h=7;
						this.aOffset=288;
						this.animFrame=40;
					break;
					
				}

			break;
			
			
			case FX.fPARTICLE:
				this.w=2;
				this.h=2;
				this.animFrame=72+(getRandom(4)<<1);
				this.aOffset=2;
				this.ySpeed=-getRandom(8);
				if (this.SubType>0) {
					this.xSpeed=getRandom(4);
				} else if (this.SubType<0) {
					this.xSpeed=-getRandom(4);
				} else {
					this.xSpeed=getRandom(8)-4;
				}
				this.animSpeed=96;
			break;
			
		
			case FX.fGUN:
				this.w=8;
				this.h=16;
				this.animFrame=72;
				this.aOffset=5;
				this.xSpeed=getRandom(8)-4;
				this.ySpeed=-(2+getRandom(4));
				this.animSpeed=16;
			break;
			
			
			case FX.fSIGNAL:
				this.w=16;
				this.h=16;
				this.animFrame=64;
				this.aOffset=24;
				this.aiState=1;
				this.aiCountDown=2;
				this.alpha=255;
				this.animSpeed=99;
				this.renderPass=2;
			break;
			
			
			case FX.fCHECKPOINT:
				switch (this.SubType) {
					case 1: // wave one
						this.w=90;
						this.h=14;
						this.animFrame=0;
						this.aOffset=72;
					break;

					case 2: // wave two
						this.w=90;
						this.h=14;
						this.animFrame=0;
						this.aOffset=86;
					break;

					case 3: // time up!
						this.w=70;
						this.h=14;
						this.animFrame=0;
						this.aOffset=100;
					break;
					
					case 4: // checkpoint
						this.w=100;
						this.h=14;
						this.animFrame=0;
						this.aOffset=114;
					break;
				}
				
				this.animSpeed=64;
				this.renderPass=3;
				this.tx=0;
				this.ty=0;
				this.aiCountDown=0;
			break;
			
			case FX.fSHELL:
				if (getRandom(24)<12) {
					this.w=4;
					this.h=2;
					this.animFrame=80;
					this.aOffset=0;
				} else {
					this.w=2;
					this.h=4;
					this.animFrame=84;
					this.aOffset=0;
				}
				this.ySpeed=-getRandom(8);
				this.xSpeed=this.SubType*getRandom(4);
				this.animSpeed=48;
			break;
			
			case FX.fZING:
				this.animSpeed=99;
				this.ySpeed=-4;

				switch (this.SubType) {
					case 0 : // zing
						this.w=32;
						this.h=14;
						this.animFrame=64;
						this.aOffset=40;
					break;
					
					case 1: // ARGHH
						this.w=32;
						this.h=16;
						this.animFrame=0;
						this.aOffset=128;
					break;
				}
			break;
			
			case FX.fSMOKETRAIL:
				this.w=8;
				this.h=8;
				this.animFrame=86+(getRandom(2)*8);
				this.aOffset=0;
				this.animSpeed=8;
				this.animFrameA=0;
				this.x+=getRandom(8)-4;
				
				if (this.SubType==-1 || this.SubType==1) {	// blown by chopper
					this.ySpeed=-2;
					this.xSpeed=(this.SubType*getRandom(4));
				}
			break;
			
			case FX.fFIREBULB:
				this.w=8;
				this.h=8;
				this.renderPass=0;
				this.animFrame=86;
				this.aOffset=8;
				this.animSpeed=2;
				this.alpha=getRandom(255);
			break;
			

			case FX.fHUGEEXPLODE:
				this.w=32;
				this.h=32;
				this.animFrame=0;
				this.aOffset=144;
				this.animFrameA=32;
				this.animSpeed=2;
				this.alpha=255-(getRandom(4)<<1);
			break;

			case FX.fENERGYORB:
				this.w=24;
				this.h=8;
				this.animFrame=111;
				this.aOffset=getRandom(2)<<3;
				this.animSpeed=5;
				this.xSpeed=getRandom(4)-2;
				this.ySpeed=-2;
				this.xIncrease=getRandom(2);
				if (this.xIncrease==0) this.xIncrease--;
				this.animFrameA=8;
				this.alpha=255;
				
				this.xIncrease=this.xIncrease<<4;
				
				this.renderPass=2;
			break;
			
			case FX.fCIRCLEEXPLODE:
				this.w=16;
				this.h=16;
				this.animFrame=48;
				this.aOffset=24;
				this.alpha=255;
				this.animFrameA=-16;
				this.animSpeed=2;
				this.alpha=255-(getRandom(4)<<4);
				
				this.renderPass=2;
			break;
			
			case FX.fDEBRI:
				switch (this.SubType) {
					case 0:	// flying pieces (crates, robots, etc)
						this.w=8;
						this.h=8;
						this.animFrame=64+(getRandom(4)<<3);
						this.aOffset=56;
						this.xSpeed=getRandom(8)-4;
						this.ySpeed=-getRandom(8);
						this.animSpeed=8+getRandom(24);
					break;
					
					
					case 1: // roof debri
						this.animFrame=78;
						if (getRandom(16)<8) {
							this.w=2;
							this.h=2;
						} else {
							this.w=1;
							this.h=1;
						}
						this.xSpeed=0;
						this.ySpeed=(1+getRandom(6));
						this.animSpeed=8;
						this.aiCountDown=48+getRandom(24);
					break;
					
					
					case 2: // boss2 gun debri
						this.animFrame=185;
						this.aOffset=77;
						this.w=71;
						this.h=41;
						
						this.spriteSet=12;

						this.xSpeed=-4;
						this.ySpeed=-8;
						this.animSpeed=99;
						this.aiCountDown=48+getRandom(24);
					break;
					
					
					case 3:	// boss 3 door
						this.animFrame=230;
						this.aOffset=57;
						this.w=26;
						this.h=19;
						
						this.spriteSet=12;
						
						this.xSpeed=getRandom(8)-4;
						this.ySpeed=-8;
						this.animSpeed=99;
						this.aiCountDown=48+getRandom(24);
						this.SubType=2;
					break;
					
					
					case 4: // boss3 top
						this.animFrame=0;
						this.aOffset=0;
						this.w=96;
						this.h=48;
						this.spriteSet=15;

						this.xSpeed=getRandom(8)-4;
						this.ySpeed=-8;
						this.animSpeed=99;
						this.aiCountDown=48+getRandom(24);
						
						this.SubType=2;
					break;
					
					// v1.3.0 chicken-feathers
					case 5:
						this.w=4;
						this.h=4;
						this.animFrame=72+(getRandom(3)<<3);
						this.aOffset=64;

						this.animSpeed=99;
						
						this.xSpeed=getRandom(8)-4;
						this.ySpeed=-(getRandom(4)+4);
						
						if (this.xSpeed>0) this.xIncrease=-8;
						else this.xIncrease=8;
						
						this.SubType=3;
					break;
					
					case 6: // boss7 small gun
						this.animFrame=126;
						this.aOffset=109;
						this.w=38;
						this.h=11;
						
						this.spriteSet=15;
						
						this.xSpeed=getRandom(8)-4;
						this.ySpeed=-8;
						this.animSpeed=99;
						this.aiCountDown=48+getRandom(24);
						this.SubType=2;
					break;
					
					case 7: // boss7 glass
						tx=getRandom(32);
						ty=getRandom(32);
						this.animFrame=252+tx;
						this.aOffset=109+ty;
						this.w=10;
						this.h=10;
						
						this.x+=tx;
						this.y+=ty;
						
						this.alpha=128;
						this.spriteSet=15;
						
						this.xSpeed=getRandom(8)-4;
						this.ySpeed=-8;
						this.animSpeed=99;
						this.aiCountDown=48+getRandom(24);
						this.SubType=2;
					break;
					
				}
			break;
			
			
			case FX.fENTRY:
				this.w=14;
				this.h=9;
				this.animFrame=135;
				this.aOffset=0;
				this.animSpeed=2;
				this.ySpeed=-1;
				this.renderPass=1;
			break;
			
			case FX.fCOIN:
				this.w=8;
				this.h=8;
				this.animFrame=12;
				this.animFrameA=8;
				this.aOffset=16;
				this.animSpeed=2;
				this.renderPass=2;
				this.ySpeed=-2;
				this.spriteSet=3;
			break;
			
			case FX.fMUSIC:
				this.w=5;
				this.h=7;
				this.animFrame=96+(getRandom(2)*5);
				this.aOffset=8;
				if (getRandom(8)<4) {
					this.ySpeed=3;
					this.yIncrease=-8;
				} else {
					this.ySpeed=-3;
					this.yIncrease=8;
				}
				this.xSpeed=-4;
				this.alpha=228;
				this.animSpeed=999;
				this.renderPass=1;
			break;
			
			case FX.fPLUME:
				switch (this.SubType) {
					case 10:
						this.w=11;
						this.h=7;
						this.animFrame=160;
						this.aOffset=158;
					break;
					
					case 15:
						this.w=11;
						this.h=7;
						this.animFrame=172;
						this.aOffset=158;
					break;
					
					case 25:
						this.w=22;
						this.h=14;
						this.animFrame=160;
						this.aOffset=144;
					break;

					case 55:
						this.w=22;
						this.h=14;
						this.animFrame=183;
						this.aOffset=144;
					break;
					
					case 100:
						this.w=32;
						this.h=14;
						this.animFrame=206;
						this.aOffset=144;
					break;
					
					case 200:
						this.w=32;
						this.h=14;
						this.animFrame=206;
						this.aOffset=159;
					break;
				}
				
				this.ySpeed=-8;
				this.animSpeed=24;
				this.animFrameA=0;
			break;
			
			case FX.fVANISH:
				this.w=1;
				this.h=12;
				this.animFrame=this.SubType;
				this.aOffset=11;
				this.ySpeed=-getRandom(8);
				this.aiCountDown=0;//getRandom(8);
				this.animSpeed=999;
				this.spriteSet=28;
			break;
			
			case FX.fPLAYERECHO:
				this.w=12;
				this.h=12;
				if (this.SubType<0) this.aOffset=12;
				else this.aOffset=0;
				this.animFrame=0;
				this.renderPass=1;
				this.alpha=255;
				this.animSpeed=999;
				
				if (this.SubType==-1 || this.SubType==1) this.spriteSet=0;
				else this.spriteSet=14;
			break;
			
			case FX.fHELP:
				this.w=32;
				this.h=16;
				this.animFrame=101;
				this.aOffset=16;
				this.animSpeed=64;
			break;
		}
		
		
		
		this.floatX=this.x<<4;
		this.floatY=this.y<<4;
		this.xSpeed=this.xSpeed<<4;
		this.ySpeed=this.ySpeed<<4;
		
		this.animSpeed=this.animSpeed<<4;
		this.animDelay=this.animSpeed;
		
		this.died=false;
	}
	
	
	
	
	this.update=function(myWorld) {
		
		this.animDelay-=(16>>myWorld.slowMoFactor);
		
		if (this.animDelay<=0) {
			this.animDelay=this.animSpeed;
			this.animFrame+=this.animFrameA;

			switch (this.fType) {
				
				default:
					this.died=true;
				break;
				
				case FX.TWIRL:
					if (this.animFrame>32) this.died=true;
				break;
				
				case FX.fTWIRLLAND:
					if (this.animFrame>88) this.died=true;
				break;
				
				case FX.fBIGEXPLODE:
					if (this.animFrame>48) this.animFrame=48;
				break;
				
				case FX.fSMALLEXPLODE:
					if (this.animFrame>64) this.died=true;
				break;
				
				case FX.fHUGEEXPLODE:
					if (this.animFrame>128) this.animFrame=128;
				break;
				
				case FX.fENERGYORB:
					this.animFrame=111;
					this.aOffset+=8;
					if (this.aOffset>48) this.died=true;
				break;

				case FX.fCIRCLEEXPLODE:
					if (this.animFrame<0) this.died=true;
				break;
				
				case FX.fENTRY:
					this.animFrame=135;
					this.aOffset+=9;
					if (this.aOffset>54) this.died=true;
				break;
				
				case FX.fCOIN:
					if (this.animFrame>36) this.died=true;
				break;
			}
		}
		
		
		

		switch (this.fType) {
			case FX.fTWIRL:
				this.alpha-=16>>myWorld.slowMoFactor;
				if (this.alpha<=0) {
					this.alpha=0;
					this.died=true;
				}
			break;
			
			case FX.fBIGEXPLODE:
				this.alpha-=32>>myWorld.slowMoFactor;
				if (this.alpha<=0) {
					this.alpha=0;
					this.died=true;
				}
			break;
			
			case FX.fSMALLEXPLODE:
				this.alpha-=8>>myWorld.slowMoFactor;
				if (this.alpha<=0) {
					this.alpha=0;
					this.died=true;
				}
			break;
			
			case FX.fRATAT:
				this.animDelay=999;
				if (this.aiCountDown>0) this.aiCountDown--;
				else {
					this.alpha-=16>>myWorld.slowMoFactor;
					if (this.alpha<=0) {
						this.alpha=0;
						this.died=true;
					}
				}
			break;
			
			
			case FX.fPARTICLE:
				this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
				this.floatY+=this.ySpeed>>myWorld.slowMoFactor;

				this.x=this.floatX>>4;
				this.y=this.floatY>>4;
				if (this.ySpeed<12<<4) this.ySpeed+=16>>myWorld.slowMoFactor;
				
				if (myWorld.isSolid(this.x>>4, this.y>>4)) {
					this.y=(this.y>>4)<<4;
					this.floatY=this.y<<4;
					
					if (this.xSpeed>1) this.xSpeed=this.xSpeed>>1;
					else if (this.xSpeed<-1) this.xSpeed=this.xSpeed>>1;
					else this.xSpeed=0;
				}
			break;
			
			case FX.fGUN:
				this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
				this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
				
				this.x=this.floatX>>4;
				this.y=this.floatY>>4;
				if (this.ySpeed<12<<4) this.ySpeed+=16>>myWorld.slowMoFactor;
			break;
			
			case FX.fSIGNAL:
				if (this.aiCountDown>0) this.aiCountDown--;
				else {
					this.aiCountDown=1;
					this.aiState++;
					if (this.aiState>6) this.died=true;
					this.alpha-=32>>myWorld.slowMoFactor;
					if (this.alpha<0) {
						this.alpha=0;
						this.died=true;
					}
				}
			break;
			
			
			case FX.fSHELL:
				this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
				this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
				
				this.x=this.floatX>>4;
				this.y=this.floatY>>4;
				if (this.ySpeed<8<<4) this.ySpeed+=16>>myWorld.slowMoFactor;
				if (this.xSpeed<0) this.xSpeed+=8>>myWorld.slowMoFactor;
				else if (this.xSpeed>0) this.xSpeed-=8>>myWorld.slowMoFactor;
				
				if (myWorld.isSolid(this.x>>4, this.y>>4)) this.died=true;
			break;
			
			case FX.fZING:
				this.animDelay=999;
				if (this.ySpeed<0) this.ySpeed+=(16>>myWorld.slowMoFactor);
				else this.ySpeed=0;
				
				this.alpha-=(16>>myWorld.slowMoFactor);
				if (this.alpha<=0) {
					this.alpha=0;
					this.died=true;
				}
			break;
			
			case FX.fSMOKETRAIL:
				this.animDelay=99;
				this.alpha-=(16>>myWorld.slowMoFactor);
				if (this.alpha<0) {
					this.alpha=0;
					this.died=true;
				}
				
				this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
				this.floatY+=this.ySpeed>>myWorld.slowMoFactor;

				this.x=this.floatX>>4;
				this.y=this.floatY>>4;
				
			break;			
		
			case FX.fHUGEEXPLODE:
				this.alpha-=32>>myWorld.slowMoFactor;
				if (this.alpha<=0) {
					this.alpha=0;
					this.died=true;
				}
			break;
			
			case FX.fENERGYORB:

				this.xSpeed+=this.xIncrease;
				if (this.xSpeed>16) this.xIncrease=-8;
				else if (this.xSpeed<-16) this.xIncrease=8;
				
				this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
				this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
				
				this.x=this.floatX>>4;
				this.y=this.floatY>>4;
				
				this.alpha-=16>>myWorld.slowMoFactor;
				if (this.alpha<0) {
					this.died=true;
					this.alpha=0;
				}
			break;	
			
			
			case FX.fDEBRI:
				switch (this.SubType) {
					case 0:
						if (this.ySpeed<96) this.ySpeed+=8;
						if (this.xSpeed<0) this.rotation-=16;
						else if (this.xSpeed>0) this.rotation+=16;
						if (this.rotation>359) this.rotation-=360;
						if (this.rotation<0) this.rotation+=360;
						
						this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
						this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
					break;
					
					case 1:
						if (this.ySpeed<96) this.ySpeed+=8;

						this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
					break;
					
					case 2:
						if (this.ySpeed<96) this.ySpeed+=16>>myWorld.slowMoFactor;
						if (this.xSpeed<0) this.rotation-=16;
						else if (this.xSpeed>0) this.rotation+=16;
						if (this.rotation>359) this.rotation-=360;
		
						this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
						this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
						this.animDelay=999;
					break;
					
					// v1.3.0
					case 3: // feathers
						if (this.ySpeed<32) this.ySpeed+=16>>myWorld.slowMoFactor;
						
						if (this.xSpeed<0) this.xSpeed+=16>>myWorld.slowMoFactor;
						else if (this.xSpeed>0) this.xSpeed-=16>>myWorld.slowMoFactor;
						
						if (this.ySpeed>=16 && this.xSpeed>-32 && this.xSpeed<32) {
							this.xSpeed+=this.xIncrease;
							if (this.xSpeed>0) this.xIncrease=-8;
							else if (this.xSpeed<0) this.xIncrease=8;
						}
						
						this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
						this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
						this.animDelay=999;
					break;
					
				}
				this.x=this.floatX>>4;
				this.y=this.floatY>>4;
				
				if (myWorld.isSolid(this.x>>4,this.y>>4)) this.died=true;
			break;
			
			case FX.fENTRY:
				this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
				this.y=this.floatY>>4;
			break;

			case FX.fCOIN:
				this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
				this.y=this.floatY>>4;
			break;
			
			
			case FX.fMUSIC:
				this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
				this.ySpeed+=this.yIncrease;
				if (this.ySpeed<=-32) this.yIncrease=8;
				else if (this.ySpeed>=32) this.yIncrease=-8;
				this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
				if (this.xSpeed<-8) this.xSpeed+=4;
				
				this.y=this.floatY>>4;
				this.x=this.floatX>>4;

				this.alpha-=8;
				if (this.alpha<=0) {
					this.alpha=0;
					this.died=true;
				}
				this.animDelay=999;
			break;
			
			
			case FX.fPLUME:
				this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
				this.y=this.floatY>>4;
				this.ySpeed+=8;
				if (this.ySpeed>0) this.ySpeed=0;
			break;
			
			
			case FX.fVANISH:
				this.animDelay=999;
				if (this.aiCountDown>0) this.aiCountDown--;
				else {
					this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
					if (this.ySpeed>-96) this.ySpeed-=8;
					this.alpha-=16;
					if (this.alpha<=0) {
						this.alpha=0;
						this.died=true;
					}
				}
				this.y=this.floatY>>4;
			break;
		
			case FX.fPLAYERECHO:
				this.animDelay=999;
				this.alpha-=32;
				if (this.alpha<0) {
					this.alpha=0;
					this.died=true;
				}
			break;
			
			case FX.fHELP:
				this.y=myWorld.worldOffsetY+16;
				this.floatY=this.y<<4;
			break;
		}
		
	
	}
	

}
