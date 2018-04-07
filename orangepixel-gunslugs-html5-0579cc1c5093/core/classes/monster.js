function Monster() {

	// scenery types
	Monster.DUDEWIDTH = 12,
	Monster.DUDEHEIGHT = 12;
	
	
	// scenery types
	Monster.mPICKUP = 0,
	Monster.mZOMBIE	= 1,
	Monster.mSOLDIER = 2,
	Monster.mAVATAR = 3,
	Monster.mCHYM	 = 4,
	Monster.mPLATFORM  =5,

	Monster.mCOIN	 = 6,
	Monster.mTRIPOD	 = 7,
	Monster.mTRIPODLEG	 = 8,
	Monster.mJETPACK = 9,
	Monster.mDROPSHIP = 10,

	Monster.mBALLUP = 11,
	Monster.mMINE = 12,
	Monster.mGUNNER = 13,
	Monster.mCRATE = 14,
	Monster.mBUILDING = 15,
	Monster.mDOOR = 16,
	Monster.mBOUNCER = 17,
	Monster.mTANK	= 18,
	Monster.mDRUM	= 19,
	Monster.mWORM	= 20,
	Monster.mFIREBALL  = 21,
	Monster.mARCADE = 22,	// used for various "trigger items"
	Monster.mGENERAL  =23,
	// v1.3.0
	Monster.mSTEAMPIPE = 24,
	Monster.mCHICKEN = 25,
								
	Monster.mBOSS1	= 26,
	Monster.mBOSS2	= 27,	// real boss1 (huge)
	Monster.mBOSS3	= 28,	// 2nd big boss
	Monster.mBOSS4	= 29, 	// fly-machine
	Monster.mBOSS5  = 30,	// MEGA WORM
	Monster.mBOSS6  = 31,	// Skully
								
	// v1.3.0
	Monster.mBOSS7  = 32;
															
	
	// position and size in the world
	this.floatX=0;
	this.floatY=0;
	this.w=0;
	this.h=0;
	this.x=0;
	this.y=0;
	this.targetX=0;
	this.targetY=0;
	this.startX=0;
	this.startY=0;
	this.rotation=0;
	this.onGround=false;
	this.hitWall=false;
	this.atEdge=false;
	this.inJump=false;
	this.allowJump=false;

	// velocity and direction
	this.ySpeed=0;
	this.xSpeed=0;
	this.xIncrease=0;
	this.yIncrease=0;
	this.maxSpeed=0;
	this.myDirection=0;
	
	this.gotPlayerId=0;
	this.fireDelay=0;
	
	// animation and drawing values
	this.SpriteSet=0;
	this.xOffset=0;
	this.yOffset=0;
	this.xOffsetAdd=0;
	this.animDelay=0;
	this.animIncrease=0;
	this.animSpeed=0;
	this.visible=true;
	this.wasHit=0;
	this.alpha=0;
	
	this.renderPass=0;
	
	// fingers of Boss6
	this.myParts=[6];
	
	// type and AI states
	this.myType=0;
	this.subType=0;
	this.energy=0;
	this.maxEnergy=0;
	this.aiState=0;
	this.aiCountDown=0;
	this.died=false;
	this.hasPlayer=false;

	this.doShoot=false;
	this.doHitSound=false;
	this.doMoveSound=false;
	this.doExplodeSound=false;
	this.doFallSound=false;
	this.doLandSound=false;
	
	// entity information
	this.deleted=false;
	
	this.chatOrder = [20];


		this.copy=function(source) {
			this.floatX=source.floatX;
			this.floatY=source.floatY;
			this.w=source.w;
			this.h=source.h;
			this.x=source.x;
			this.y=source.y;
			this.targetX=source.targetX;
			this.targetY=source.targetY;
			this.startX=source.startX;
			this.startY=source.startY;
			this.rotation=source.rotation;
			this.onGround=source.onGround;
			this.hitWall=source.hitWall;
			this.atEdge=source.atEdge;
			this.inJump=source.inJump;
			this.allowJump=source.allowJump;

			// velocity and direction
			this.ySpeed=source.ySpeed;
			this.xSpeed=source.xSpeed;
			this.xIncrease=source.xIncrease;
			this.yIncrease=source.yIncrease;
			this.maxSpeed=source.maxSpeed;
			this.myDirection=source.myDirection;
			
			this.fireDelay=source.fireDelay;
			
			// animation and drawing values
			this.SpriteSet=source.SpriteSet;
			this.xOffset=source.xOffset;
			this.yOffset=source.yOffset;
			this.xOffsetAdd=source.xOffsetAdd;
			this.animDelay=source.animDelay;
			this.animIncrease=source.animIncrease;
			this.animSpeed=source.animSpeed;
			this.visible=source.visible;
			this.wasHit=source.wasHit;
			this.alpha=source.alpha;
			
			this.renderPass=source.renderPass;
			
			// type and AI states
			this.myType=source.myType;
			this.subType=source.subType;
			this.energy=source.energy;
			this.maxEnergy=source.maxEnergy;
			this.aiState=source.aiState;
			this.aiCountDown=source.aiCountDown;
			this.died=source.died;
			this.hasPlayer=source.hasPlayer;

			this.doShoot=source.doShoot;
			this.doHitSound=source.doHitSound;
			this.doMoveSound=source.doMoveSound;
			this.doExplodeSound=source.doExplodeSound;
			this.doFallSound=source.doFallSound;
			this.doLandSound=source.doLandSound;
			
			this.gotPlayerId=source.gotPlayerId;
			
			// entity information
			this.deleted=source.deleted;
		}


		this.init=function(mType, aX,aY, mSpriteSet, mSubType, myWorld) {
			// we are now concidered active monster
			this.deleted=false;
			
			this.gotPlayerId=-1;
			
			this.renderPass=2;
			// and let's get our selves sorted out!
			this.myType=mType;
			this.subType=mSubType;

			// where? ah! there:
			this.x=aX<<4;
			this.y=aY<<4;
			this.startX=this.x;
			this.startY=this.y;
			this.targetX=this.x;
			this.targetY=this.y;
			this.rotation=0;
			this.xSpeed=0;
			this.ySpeed=0;
			
			// what? 
			this.SpriteSet=mSpriteSet;
			this.visible=true;
			this.alpha=255;
			this.aiState=0;
			this.wasHit=0;
			
			// we demand our defaults!
			this.died=false;
			this.hasPlayer=false;
			this.doHitSound=false;
			this.doShoot=false;
			this.doMoveSound=false;
			this.doExplodeSound=false;
			this.doFallSound=false;
			this.doLandSound=false;
			this.energy=0;
			this.maxEnergy=0;
			this.fireDelay=0;

			// define type specifics (DNA!)
			switch (this.myType) {
				case Monster.mPICKUP:
					this.x=aX;
					this.y=aY;
					this.aiCountDown=256;
					
					switch (this.subType) {
						case 0: // medikit
							this.w=12;
							this.h=9;
							this.xOffset=0;
							this.yOffset=12;
							this.aiCountDown=96;
						break;
						
						case 1: // ammo
							this.w=13;
							this.h=12;
							this.xOffset=0;
							this.yOffset=0;
							this.aiCountDown=96;
						break;
						
						
						
						case 2: // flamethrower
							this.w=12;
							this.h=7;
							this.xOffset=0;
							this.yOffset=24;
						break;
						
						
						case 3: // electro
							this.w=11;
							this.h=6;
							this.xOffset=24;
							this.yOffset=24;
						break;
						
						
						case 4: // jetpack
							this.w=10;
							this.h=7;
							this.xOffset=46;
							this.yOffset=24;
						break;
						
						case 5: // grenadelauncher
							this.w=7;
							this.h=5;
							this.xOffset=44;
							this.yOffset=16;
						break;
						
						case 6: // skullflamethingy
							this.w=10;
							this.h=4;
							this.xOffset=0;
							this.yOffset=31;
						break;
						
						case 7 : // double-gun
							this.w=11;
							this.h=3;
							this.xOffset=20;
							this.yOffset=31;
						break;
						
						// v1.3.0
						case 8: // chicken gun
							this.w=11;
							this.h=6;
							this.xOffset=43;
							this.yOffset=31;
						break;
						
					}
					this.ySpeed=-16;
				break;
				
				
				case Monster.mSOLDIER:
					this.w=12;
					this.h=12;
					this.xOffset=0;
					this.yOffset=0;
					this.aiState=0;
					this.ySpeed=32;
					
					this.energy=1+getRandom(2);
					this.maxSpeed=32;
					
					if (aX<0) {
						this.x=-aX;
						this.y=-aY;
					}
					
					this.fireDelay=(aX%16)<<4;
					
					this.aiState=700;
					switch (this.subType) {
						case 2: // grenadier
							this.maxSpeed=24;
							this.energy=4;
							this.aiState=700;
						break;
						
						
						case 3: // underground (jumps when player is passed) + flamethrower
							this.energy=4;
							this.aiState=701;
							this.visible=false;
							this.maxSpeed=16;
						break;
						
						
						case 4: // electro maniac
							this.energy=3;
							this.maxSpeed=40;
						break;
					}
				break;
				
				case Monster.mAVATAR:
					this.w=12;
					this.h=12;
					this.xOffset=0;
					this.yOffset=0;
					this.aiState=0;
					this.ySpeed=32;
					
					this.energy=1+getRandom(2);
					this.maxSpeed=32;
					
					
					this.yIncrease=this.subType;
					this.aiState=700;

					switch (this.subType) {
						
						case 10:		// "princess peach" hiding
							this.yIncrease=0;
							this.aiCountDown=0;
							this.chatOrder[0]=10;
							this.chatOrder[1]=11;
							this.chatOrder[2]=12;
							this.chatOrder[3]=-2;	// spawn coins
						break;
						
						
						case 11:		// "Wizard"
							this.yIncrease=1;
							this.aiCountDown=0;
							this.chatOrder[0]=15;
							this.chatOrder[1]=16;
							this.chatOrder[2]=17;
							this.chatOrder[3]=-3;	// regen
						break;

						
						case 12:		// voodoo guy with continue
							this.aiCountDown=0;
							this.yIncrease=2;
							this.chatOrder[0]=18;
							this.chatOrder[1]=19;
							this.chatOrder[2]=20;
							this.chatOrder[3]=21;
							this.chatOrder[4]=-1;
						break;

						case 13:		// bartender with special drink
							this.aiCountDown=0;
							this.yIncrease=3;
							this.chatOrder[0]=22;
							this.chatOrder[1]=-1;
						break;
						
						case 14: 		// drunk dude at bar (invisible, just text)
							this.aiCountDown=0;
							this.yIncrease=-1;
							this.chatOrder[0]=23;
							this.chatOrder[1]=24;
							this.chatOrder[2]=25;
							this.chatOrder[3]=24;
							this.chatOrder[4]=26;
							this.chatOrder[5]=24;
							this.chatOrder[6]=-1;
							this.visible=false;
							this.aiState=1;
						break;
						
						case 15:		// robocoppy
							this.aiCountDown=0;
							this.yIncrease=4;
							this.chatOrder[0]=27;
							this.chatOrder[1]=28;
							this.chatOrder[2]=-1;
						break;
						
						case 16: // conductor
							this.yIncrease=5;
							this.aiCountDown=0;
							this.chatOrder[0]=29;
							this.chatOrder[1]=-1;
						break;

						case 17: // boy
							this.yIncrease=6;
							this.aiCountDown=0;
							this.chatOrder[0]=31;
							this.chatOrder[1]=32;
							this.chatOrder[2]=33;
							this.chatOrder[3]=-1;
						break;

						// v1.2.0 
						case 18:// bow tie dude
							this.yIncrease=7;
							this.aiCountDown=0;
							this.chatOrder[0]=34;
							this.chatOrder[1]=-1;
						break;
						
						case 999:	// invisible coin-spawn
							this.aiState=3;
							this.aiCountDown=45;
							this.visible=false;
						break;
						
					}
					
					// resqued Gunslug
					if (this.subType>=100 && this.subType<=107) {
						this.xOffset=160+((this.subType-100)*11);
						this.yOffset=11;
						this.w=11;
						this.h=12;
						this.aiCountDown=64;
						if (this.subType==106) this.aiCountDown=2;
						this.aiState=800;
						this.x=aX;
						this.y=aY;
					}
					
					
					if (aX<0) {
						this.x=aX;
						this.y=aY;
					}
					
				break;

				case Monster.mCHYM:
					this.w=12;
					this.h=16;
					this.xOffset=25;
					this.yOffset=0;
					this.aiCountDown=24;
					this.energy=0;
					
					
					// special case, used to lock the screen (end boss levels are shorter)
					if (this.subType==999) {
						this.visible=false;
						this.aiState=999;
					}
				break;
				
				
				case Monster.mPLATFORM:
					this.w=48;
					this.h=16;
					this.xOffset=208;
					this.yOffset=0;
				break;
				
				case Monster.mCOIN:
					this.x=aX;
					this.y=aY;
					this.w=8;
					this.h=8;
					this.xOffset=12;
					this.yOffset=16;
					this.animSpeed=2;
					this.ySpeed=-(24+getRandom(24));
					this.xSpeed=(getRandom(8)-4)<<4;
					this.aiCountDown=96;
					
					this.aiState=0;
					
					if (this.subType==1) { // no gravity ,just hanging
						this.ySpeed=0;
						this.aiState=1;
						this.y=aY<<4;
						this.x=aX<<4;
					}
				break;
				
				
				
				case Monster.mTRIPOD:
					this.w=80;
					this.h=120;
					this.y-=120;
					this.xOffset=0;
					this.yOffset=0;
					this.energy=12;
				break;
				
				case Monster.mTRIPODLEG:
					this.w=34;
					this.h=64;
					this.x+=46;
					this.y-=64;
					this.xOffset=46;
					this.yOffset=56;
					this.renderPass=3;
				break;
				
				case Monster.mJETPACK:
					this.w=15;
					this.h=12;
					this.xOffset=0;
					this.yOffset=0;
					
					this.yIncrease=-8;
					
					this.energy=2;
					this.maxSpeed=40;
				break;
				
				
				
				case Monster.mDROPSHIP:
					this.animDelay=0;
					
					switch (this.subType) {
						case 0:	// drop ship, spawns soldiers
							this.xSpeed=128;
							this.ySpeed=32;
							this.w=64;
							this.h=32;
							this.xOffset=0;
							this.yOffset=0;
							this.aiState=0;
							this.visible=false;
							this.x=aX;
							this.y=aY;
							this.energy=16;
						break;
						
						
						case 1: // resque-chopper, takes player out of the level
							this.xSpeed=0;
							this.ySpeed=0;
							this.targetY=((this.y>>4)<<4)+4;
							this.targetX=this.x;
							
							this.w=64;
							this.h=32;
							this.xOffset=0;
							this.yOffset=54;
							this.aiState=10;
							this.y-=48;
							this.visible=false;
							
							this.aiCountDown=64;
							this.energy=999; // can't die! it's here to resque player
						break;
						
						
						case 2:	// hell-drop ship, spawns soldiers
							this.xSpeed=128;
							this.ySpeed=32;
							this.w=64;
							this.h=32;
							this.xOffset=96;
							this.yOffset=149;
							this.aiState=0;
							this.visible=false;
							this.x=aX;
							this.y=aY;
							this.energy=16;
						break;
						
					}
					
				break;
				
				
				case Monster.mBALLUP:
					this.w=16;
					this.h=16;
					this.xOffset=160;
					this.yOffset=149;
					this.myDirection=1;
					this.aiState=0; // partly in ground
					this.targetY=this.y;
					this.y+=13;
					this.visible=false;
					this.energy=4;
					
					this.fireDelay=this.subType<<6;
				break;
				
				
				case Monster.mMINE:
					this.w=16;
					this.h=7;
					this.y+=9;
					this.xOffset=64;
					this.yOffset=0;
					
					this.aiState=0;
					this.animSpeed=2<<4;
				break;
				
				
				case Monster.mGUNNER:
					if (this.subType==0) {
						// gun turret itself
						this.w=32;
						this.h=22;
						this.xOffset=0;
						this.yOffset=32;
						this.y-=6;
					} else {
						// gunner dude
						this.w=12;
						this.h=12;
						this.xOffset=0;
						this.yOffset=24;
						this.x+=14;
						this.y-=4;
						this.aiState=1;
						this.energy=8;
					}
				break;
				
				case Monster.mCRATE:
					this.w=16;
					this.h=16;
					this.xOffset=32;
					this.yOffset=38;
					this.aiState=0;
					this.aiCountDown=1;
					
					// v1.2.0
					this.atEdge=false;
					
					if (this.subType==-99) {
						// metal crate, tutorial only for now
						this.xOffset=225;
						this.yOffset=118;
						this.aiState=20;
						this.energy=999;
					} else if (this.subType<0) {
						// <0 means an unlockable Gunslug!
						this.w=22;
						this.h=16;
						this.xOffset=64;
						this.yOffset=71;
						this.aiState=10;
						this.energy=16;
					}
				break;
				
				
				case Monster.mBUILDING:
					this.renderPass=0;
					this.startX=aX;
					this.startY=aY;
					switch (this.subType) {
						case 0:	// BOOSTER BUILDING
							this.w=80;
							this.h=69;
							this.y-=this.h-17;
							this.xOffset=0;
							this.yOffset=0;
							this.aiState=0;
							this.fireDelay=0;	// used to trigger entry icon
							
						break;
						
						case 1: // general building
							this.w=160;
							this.h=54;
							this.y-=(this.h-17);
							this.xOffset=80;
							this.yOffset=0;
							this.aiState=0;
							this.fireDelay=0;
						break;
						
						
						case 2: // just a door
							this.w=23;
							this.h=21;
							this.x-=4;
							this.y-=(this.h-16);
							this.xOffset=80;
							this.yOffset=55;
							this.aiState=0;
							this.fireDelay=0;
							this.aiCountDown=32;
						break;
						
						
						case 3: // "start" building
							this.w=80;
							this.h=50;
							this.y-=this.h-17;
							this.xOffset=0;
							this.yOffset=20;
							this.aiState=0;
							this.fireDelay=0;	// used to trigger entry icon
							this.aiCountDown=1;	// used as doorTargetID
							
							// use target for sign-offsets
							this.targetX=103;
							this.targetY=55;
						break;

						case 4: // "options" building
							this.w=80;
							this.h=50;
							this.y-=this.h-17;
							this.xOffset=0;
							this.yOffset=20;
							this.aiState=0;
							this.fireDelay=0;	// used to trigger entry icon
							this.aiCountDown=2;	// used as doorTargetID
							this.subType=3; // works same as STart door
							// use target for sign-offsets
							this.targetX=167;
							this.targetY=55;
						break;
						
						case 5: // shop
							this.w=80;
							this.h=50;
							this.y-=this.h-17;
							this.xOffset=0;
							this.yOffset=20;
							this.aiState=0;
							this.fireDelay=0;	// used to trigger entry icon
							this.aiCountDown=1;	// used as doorTargetID
							
							// use target for sign-offsets
							this.targetX=168;
							this.targetY=55;
						break;
					}
					
				break;
				
				case Monster.mDOOR:
					if (this.subType==0 || this.subType==1) { //vertical 1=on 0=off
						this.w=16;
						this.h=16;
						this.xOffset=32;
						this.yOffset=48;
						// find size of wall
						this.startY=this.y>>4;
						this.startX=this.x>>4;

						while (!myWorld.isSolid(this.startX,this.startY) && this.startY<TileMap.MAPHEIGHT) {
							this.startY++;
						}
						this.targetY=this.startY-1;
						this.startY=this.y>>4;
						if (this.subType==1) this.aiState=1;//switchWall(true,myWorld);
						else this.aiState=0;
						
					} else { // horizontal 3=on 2=off
						this.h=16;
						this.w=16;
						this.xOffset=32;
						this.yOffset=64;
						// find size of wall
						this.startY=this.y>>4;
						this.startX=this.x>>4;
						while (!myWorld.isSolid(this.startX,this.startY) && startX<TileMap.MAPWIDTH) {
							this.startX++;
						}
						this.targetX=this.startX-1;
						this.startX=this.x>>4;
						
						if (this.subType==3) this.aiState=1; //switchWall(true,myWorld);
						else this.aiState=0;
					}
					
					this.aiCountDown=0;
					this.visible=false;
				break;			
				
				case Monster.mBOUNCER:
					this.w=12;
					this.h=12;
					this.xOffset=80;
					this.yOffset=0;
					this.xSpeed=0;
					this.energy=4;
					this.aiState=0;
					
					if (this.subType==999) {
						this.x=aX;
						this.y=aY;
					}
				break;
				
				
				case Monster.mTANK:
					this.w=32;
					this.h=32;
					this.xOffset=0;
					this.yOffset=86;
					this.startX=0;
					this.startY=86;
					
					switch (this.subType) {
						case 0:	// monster controlled
							this.energy=16;
							this.aiState=0;
							this.myDirection=-1;
							this.fireDelay=24<<4;
						break;
						
						case 1: // player1 controlled
							this.energy=64;
							this.aiState=10;
							this.myDirection=1;
							this.x=aX;
							this.y=aY;
						break;
						
						
						case 2: // hell-tank
							this.startX=96;
							this.startY=118;
							this.xOffset=96;
							this.yOffset=118;
							this.energy=16;
							this.aiState=0;
							this.myDirection=-1;
							this.fireDelay=24<<4;
						break;
					}
					this.aiCountDown=0;
				break;
				
				
				
				
				case Monster.mDRUM:
					this.w=14;
					this.h=16;
					this.xOffset=65;
					this.yOffset=54;
					this.aiState=0;
					this.energy=2;
					if (this.subType==999) {
						this.x=aX;
						this.y=aY;
					}
				break;
				
				
				case Monster.mWORM:
					this.w=47;
					this.h=16;
					
					
					this.xOffset=this.subType*48;
					this.yOffset=118;
					
					this.y+=16;
					this.aiState=0;
					this.energy=48;
					
					this.targetY=this.y;
					
					this.renderPass=1;
					this.visible=false;
				break;
				
				
				case Monster.mFIREBALL:
					this.w=16;
					this.h=16;
					this.xOffset=128;
					this.yOffset=102;
					this.aiState=0;
					this.energy=4;
					this.xSpeed=-(1+getRandom(4))<<4;
					this.ySpeed=-(8+getRandom(6))<<4;
					
					if (this.subType==1) {
						this.xSpeed=-(3<<4);
						this.ySpeed=-(3<<4);
					}
				break;
				
				case Monster.mARCADE:
					this.yOffset=166;
					this.xOffset=this.subType<<4;
					this.w=16;
					this.h=26;
					this.y-=10;
					this.targetX=-1;
					
					this.aiState=0;
					this.wasHit=0;
					
					switch (this.subType) {
						case 1:	// working arcade
							this.aiState=2;
						break;
						
						case 4: // finish flah
							this.aiState=99;
						break;
						
						case 5: // mario
							this.aiState=10;
						break;
						
						case 6: // continue statue
							this.w=20;
							this.h=31;
							this.y-=5;
							this.xOffset=0;
							this.yOffset=192;
							this.aiState=11;
						break;
						
						case 7: // bar
							this.w=64;
							this.h=32;
							this.xOffset=0;
							this.yOffset=224;
							this.aiState=12;
							this.y-=6;
						break;
						
						case 8: // special drink
							this.w=15;
							this.h=14;
							this.xOffset=39;
							this.yOffset=192;
							this.aiState=13;
							this.y-=4;
						break;
						
						case 9: // armour
							this.w=16;
							this.h=19;
							this.y-=5;
							this.xOffset=54;
							this.yOffset=192;
							this.aiState=14;
						break;
					
						case 10: // jukebox
							this.w=20;
							this.h=31;
							this.xOffset=90;
							this.yOffset=192;
							this.aiState=15;
							this.y-=5;
						break;
						
						case 11: // ticketmachine
							this.w=20;
							this.h=31;
							this.xOffset=110;
							this.yOffset=192;
							this.y-=5;
							this.aiState=16;
						break;

						case 12: // ticketmachine-inactive
							this.w=20;
							this.h=31;
							this.xOffset=130;
							this.yOffset=192;
							this.y-=5;
							this.aiState=0;
						break;

						case 13: // gameboy
							this.w=19;
							this.h=31;
							this.xOffset=150;
							this.yOffset=192;
							this.y-=5;
							this.aiState=17;
						break;

						case 14: // gameboy-done
							this.w=19;
							this.h=31;
							this.xOffset=169;
							this.yOffset=192;
							this.y-=5;
							this.aiState=0;
						break;
						
						// v1.2.0
						case 15: // dr who?
							this.w=19;
							this.h=32;
							this.xOffset=188;
							this.yOffset=192;
							this.y-=5;
							this.aiState=18;
						break;
						
						// v1.3.0
						case 16: // ezel
							this.w=19;
							this.h=32;
							this.xOffset=62;
							this.yOffset=224;
							this.y-=5;
							this.aiState=19;
						break;
						
						case 17: // done painting
							this.w=20;
							this.h=31;
							this.xOffset=82;
							this.yOffset=224;
							this.y-=5;
							this.aiState=0;
						break;						
						
					}
					
				break;

				
				case Monster.mGENERAL:
					this.visible=false;
					this.aiState=0;
					this.aiCountDown=0;
				break;
				
				
				
				// v1.3.0
				case Monster.mSTEAMPIPE:
					this.aiState=0;
					this.aiCountDown=0;
					this.xOffset=80;
					this.yOffset=38;
					this.w=9;
					this.h=3;
				break;
				
				
				case Monster.mCHICKEN:
					this.w=10;
					this.h=10;
					this.y+=6;
					this.xOffset=160+(getRandom(2)*10);
					this.yOffset=165+(getRandom(1)*10);
					this.aiState=0; // picking
					this.aiCountDown=0;
					this.energy=8;
				break;				
				
				case Monster.mBOSS1:
					this.w=64;
					this.h=48;
					this.xOffset=92;
					this.yOffset=0;
					this.aiState=0;
					this.aiCountDown=0;
					this.energy=64;
					
					this.renderPass=0;
					
					this.targetY=this.y;
					this.y+=23;
				break;
				
				
				case Monster.mBOSS2:
					this.w=166;
					this.h=108;
					this.xOffset=0;
					this.yOffset=0;
					this.aiState=0;
					this.aiCountDown=0;
					this.energy=128;
					
					this.y-=92;
					this.renderPass=2;
				break;
				
				
				case Monster.mBOSS3:
					this.w=128;
					this.h=80;
					this.xOffset=0;
					this.yOffset=48;
					this.aiState=0;
					this.aiCountDown=0;
					this.energy=128;
					
					this.targetY=39;
					this.y-=64;
					this.renderPass=2;
				break;

				case Monster.mBOSS4:
					this.w=128;
					this.h=64;
					this.xOffset=0;
					this.yOffset=0;
					this.aiState=0;
					this.aiCountDown=0;
					this.energy=128;
					this.animDelay=4<<4;
					
					this.targetY=this.y+16;
					this.y=-128;
					this.renderPass=2;
				break;
				
				case Monster.mBOSS5:
					this.w=128;
					this.h=112;
					this.xOffset=0;
					this.yOffset=0;
					this.aiState=0;
					this.aiCountDown=0;
					this.energy=128;
					
					
					this.y-=96;
					this.renderPass=2;
				break;
				
				
				case Monster.mBOSS6:
					this.w=93;
					this.h=86;
					this.xOffset=0;
					this.yOffset=0;
					this.aiState=0;
					this.aiCountDown=0;
					this.energy=128;
					this.myDirection=-1;
					
					for (var i=6; --i>=0;) this.myParts[i]=0;
					this.y=160;
				break;
				
				// v1.3.0
				case Monster.mBOSS7:
					this.w=166;
					this.h=109;
					this.xOffset=0;
					this.yOffset=0;
					this.aiState=0;
					this.aiCountDown=0;
					this.energy=128;
					this.myDirection=-1;
					
					this.myParts[0]=40;
					this.myParts[1]=40;
					
					this.animIncrease=-1; // used to signal which gun was hit
					this.targetY=(this.y+16)-109;
					this.y=160;
				break;				
				
			}
			
			
			
			this.floatX=this.x<<4;
			this.floatY=this.y<<4;
			this.animDelay=this.animSpeed;
		}

		
		this.update=function( myWorld, myPlayer, myPlayer2, displayW ) {
			var tx=0;
			var ty=0;
			var dx=0;
			var dy=0;
			var found=false;
			var hitPlayer=false;
			
			var tmpPlayer;
			
			if (!myWorld.isCOOP) {
				tmpPlayer=myPlayer;
			} else {
				// tmpplayer focuses on the nearest player
				// unless gotPlayerId is set in the monster object, then we use only that one
				switch (this.gotPlayerId) {
					case 1:
						tmpPlayer=myPlayer;
					break;
					
					case 2:
						tmpPlayer=myPlayer2;
					break;
					
					default:
						// find nearest player
						tx=Math.abs(myPlayer.x-this.x);
						ty=Math.abs(myPlayer.y-this.y);
						
						dx=Math.abs(myPlayer2.x-this.x);
						dy=Math.abs(myPlayer2.y-this.y);
						
						if ( dy+(dx<<1) < ty+(tx<<1) ) tmpPlayer=myPlayer2;
						else tmpPlayer=myPlayer;
						
						
						if (this.checkHitPlayer(myPlayer.x,myPlayer.y) && !myPlayer.Died) tmpPlayer=myPlayer;
						else if (this.checkHitPlayer(myPlayer2.x,myPlayer2.y) && !myPlayer2.Died) tmpPlayer=myPlayer2;
						
					break;
				}
			}
			
			if (!tmpPlayer.Died) hitPlayer=this.checkHitPlayer(tmpPlayer.x,tmpPlayer.y);
			else hitPlayer=false;
			
			
			switch (this.myType) {
				case Monster.mPICKUP:
					this.doGravity(myWorld);
					
					if (hitPlayer && !tmpPlayer.inTank) {
						this.died=true;
						this.givePickup(tmpPlayer);
					}
					
					if (this.aiCountDown%4==0) {
						switch (this.subType) {
							case 2: // flamethrower
								if (this.xOffset==0) this.xOffset=12;
								else this.xOffset=0;
							break;
							
							case 3: // ELECTRO
								if (this.xOffset==35) this.xOffset=24;
								else this.xOffset=35;
							break;
							
							case 4: // jetpack
								if (this.xOffset==46) this.xOffset=56;
								else this.xOffset=46;
							break;
							
							case 5: // grenade
								if (this.xOffset==44) this.xOffset=51;
								else this.xOffset=44;
							break;
							
							case 6: // skullflame
								if (this.xOffset==0) this.xOffset=10;
								else this.xOffset=0;
							break;
							
							case 7: // double gun
								if (this.xOffset==20) this.xOffset=31;
								else this.xOffset=20;
							break;
							
														// v1.3.0
							case 8 : // chicken gun
								if (this.xOffset==43) this.xOffset=54;
								else this.xOffset=43;
							break;
							
						}
					}
					
					if (this.aiCountDown>16 || this.aiCountDown%4==0) this.visible=true;
					else this.visible=false;

					if (this.aiCountDown>0) {
						if (!myWorld.isInDoor) this.aiCountDown--;
					} else {
						this.died=true;
					}
				break;
				
				case Monster.mSOLDIER:
					if (hitPlayer && tmpPlayer.inTank) {
						for (var i=4; --i>=0;) {
							fxAdd(this.x,this.y,FX.fPARTICLE,1);
						}
						myPlayer.addScore(5);
						this.died=true;
						return;
					} else if (hitPlayer && myWorld.isPlatformer) {
							// head jumped?
							if (tmpPlayer.y+12>=this.y && tmpPlayer.y<this.y && !tmpPlayer.onGround) {
								this.died=true;
								tmpPlayer.y=this.y-12;
								tmpPlayer.floatY=tmpPlayer.y<<4;
								tmpPlayer.ySpeed=-64;
								return;
							} else {
								tmpPlayer.lives=0;
								tmpPlayer.initDie();
								if (tmpPlayer.myDirection>0) {
									if (this.xSpeed<0) {
										tmpPlayer.Frame=(5*12);
										tmpPlayer.xSpeed=-64;
									} else {
										tmpPlayer.Frame=(6*12);
										tmpPlayer.xSpeed=64;
									}
								} else {
									if (this.xSpeed>0) {
										tmpPlayer.Frame=(5*12);
										tmpPlayer.xSpeed=64;
									} else {
										tmpPlayer.Frame=(6*12);
										tmpPlayer.xSpeed=-64;
									}
								}								
							}
				} else {
 
					
					switch (this.aiState) {
						case 0:	 // dropping in
							this.doGravity(myWorld);
							
							ty=this.y>>4;
							tx=this.x>>4;
							if (this.onGround || myWorld.isSolid(tx,ty+2)) {
								this.aiState=2;
							}
							
							this.myDirection=-1;
						break;
						
						case 1: // move around until player is near
							this.doGravity(myWorld);
							
							if (tmpPlayer.x>this.x-96 && tmpPlayer.x<this.x+96 && tmpPlayer.y>this.y-8 && tmpPlayer.y<this.y+32) {
								
								this.aiState=2;
								
							} else {
								
								if (this.aiCountDown>0) {
									this.aiCountDown-=16>>myWorld.slowMoFactor;
						
									// turn head left/right if not walking
									if (this.xSpeed==0 && this.aiCountDown%96==0 && getRandom(24)<8) {
										this.myDirection=-this.myDirection;
									} else {
										this.doHorizontal(myWorld, tmpPlayer);
										if (this.hitWall && this.energy>0) {
											this.xSpeed=-this.xSpeed;
										}
									}
								} else {
									
									tx=getRandom(60);
									if (tx<20 || this.xSpeed!=0) {
										this.xSpeed=0;
										this.aiCountDown=48<<4;
									} else if (tx<40) {
										this.xSpeed=-16;
										this.aiCountDown=(16+getRandom(48))<<4;
									} else {
										this.xSpeed=16;
										this.aiCountDown=(16+getRandom(48))<<4;
									}
								}
							}

							if (this.xSpeed<0) this.myDirection=-1;
							else if (this.xSpeed>0) this.myDirection=1;
						break;
						
						
						case 2: // walk
							this.doGravity(myWorld);
							
							if (tmpPlayer.x<this.x-24) {
								if (this.xSpeed>0) this.xSpeed=0;
								this.xSpeed-=8;
								this.myDirection=-1;
								if (this.xSpeed<=-this.maxSpeed) this.xSpeed=-this.maxSpeed; 
							} else if (tmpPlayer.x>this.x+24) {
								if (this.xSpeed<0) this.xSpeed=0;
								this.xSpeed+=8;
								this.myDirection=1;
								if (this.xSpeed>=this.maxSpeed) this.xSpeed=this.maxSpeed;
							}

							
							
							this.doHorizontal(myWorld, tmpPlayer);
							if (this.hitWall && !this.atEdge) {
								if (this.onGround && tmpPlayer.x>this.x) {
									fxAdd(this.x+4,this.y+4,FX.fTWIRLLAND,0);
									if (this.subType==2) this.ySpeed=-64;
									else this.ySpeed=-96;
								} else if (this.onGround && tmpPlayer.x<this.x ) {
									fxAdd(this.x+4,this.y+4,FX.fTWIRLLAND,0);
									if (this.subType==2) this.ySpeed=-64;
									else this.ySpeed=-96;
								} else if (!myWorld.isPlatformer) {
									this.xSpeed=0;
								}
							}
							
							
							// grenadier don't fall large areas
							if (this.subType==2 && this.atEdge) {
								if (this.xSpeed<0) {
									this.xSpeed=this.maxSpeed;
									this.floatX+=this.xSpeed;
								} else {
									this.xSpeed=-this.maxSpeed;
									this.floatX+=this.xSpeed;
								}
							}
							
							
							if (this.fireDelay>0) this.fireDelay-=(16>>myWorld.slowMoFactor);
							
							if (this.fireDelay==0 && !myWorld.isPlatformer) {
								switch (this.subType) {
									case 2: // grenades
										if (tmpPlayer.x>this.x-240 && tmpPlayer.x<this.x+240 && tmpPlayer.y>this.y-48 && tmpPlayer.y<this.y+64) {
											if (this.myDirection<0 && tmpPlayer.x<this.x) {
												bulletAdd(Bullets.OWNER_MONSTER, Bullets.bROCKET, this.x, this.y, this.myDirection);
												fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
												this.fireDelay=16<<4;
												if (this.onGround) this.ySpeed=-16;
												this.xSpeed=8;
												this.doShoot=true;
											} 
											if (this.myDirection>0 && tmpPlayer.x>this.x) {
												bulletAdd(Bullets.OWNER_MONSTER, Bullets.bROCKET, this.x, this.y, this.myDirection);
												fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
												this.fireDelay=16<<4;
												if (this.onGround) this.ySpeed=-16;
												this.xSpeed=-8;
												this.doShoot=true;
											}
										}
									break;
									
									
									// underground
									case 3:
										if ( tmpPlayer.y+16>this.y && tmpPlayer.y<this.y+24) {
											if (this.myDirection<0 && tmpPlayer.x<this.x) {
												bulletAdd(Bullets.OWNER_MONSTER, Bullets.bFLAME, this.x-8, this.y+getRandom(3), this.myDirection);
												fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
												this.fireDelay=4<<4;
												if (myWorld.worldAge%24==0) this.doShoot=true;
											} 
											
											if (this.myDirection>0 && tmpPlayer.x>this.x ) {
												bulletAdd(Bullets.OWNER_MONSTER, Bullets.bFLAME, this.x+12, this.y+getRandom(3), this.myDirection);
												fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
												this.fireDelay=4<<4;
												
												if (myWorld.worldAge%24==0) this.doShoot=true;
											} 
											
										}									
									break;
									
									
									
									// electro
									case 4:
										if (tmpPlayer.y+16>this.y && tmpPlayer.y<this.y+48) {
											if (this.myDirection<0 && tmpPlayer.x<this.x ) {
												bulletAdd(Bullets.OWNER_MONSTER, Bullets.bELECTRO, this.x-8, this.y+4+getRandom(3), this.myDirection);
												fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
												this.fireDelay=12<<4;
												this.doShoot=true;
											} 
											
											if (this.myDirection>0 && tmpPlayer.x>this.x ) {
												bulletAdd(Bullets.OWNER_MONSTER, Bullets.bELECTRO, this.x+12, this.y+4+getRandom(3), this.myDirection);
												fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
												this.fireDelay=12<<4;
												this.doShoot=true;
											} 
										}									
									break;	
									
									
									// fire skulls
									case 5: 
										if (tmpPlayer.y+16>this.y && tmpPlayer.y<this.y+48) {
											if (this.myDirection<0 && tmpPlayer.x<this.x ) {
												bulletAdd(Bullets.OWNER_MONSTER, Bullets.bTRIPLEFLAME, this.x-8, this.y+4+getRandom(3), this.myDirection);
												fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
												this.fireDelay=12<<4;
												this.doShoot=true;
											} 
											
											if (this.myDirection>0 && tmpPlayer.x>this.x ) {
												bulletAdd(Bullets.OWNER_MONSTER, Bullets.bTRIPLEFLAME, this.x+12, this.y+4+getRandom(3), this.myDirection);
												fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
												this.fireDelay=12<<4;
												this.doShoot=true;
											} 
										}									
									break;
									
									
									
									default:
										if (tmpPlayer.y+16>this.y && tmpPlayer.y<this.y+24) {
											if (this.myDirection<0 && tmpPlayer.x<this.x) {
												bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBULLET, this.x, this.y+8+getRandom(3), this.myDirection);
												fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
												this.fireDelay=16<<4;
												if (this.onGround) this.ySpeed=-6;
												this.xSpeed+=8;
											} 
											if (this.myDirection>0 && tmpPlayer.x>this.x) {
												bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBULLET, this.x, this.y+8+getRandom(3), this.myDirection);
												fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
												this.fireDelay=16<<4;
												if (this.onGround) this.ySpeed=-6;
												this.xSpeed-=8;
											} 
										}
									break;
								}
							}
							break;
						
						
						
							// wait for activation
							case 700:
								if (this.x<myWorld.worldOffset+displayW+32 && this.x>myWorld.worldOffset-16) {
									this.aiState=0;
								}
							break;
							
							
							// undergrounder
							case 701:
								if (tmpPlayer.x>this.x+32) {
									this.aiState=0;
									this.ySpeed=-72;
									this.myDirection=1;
									this.visible=true;
									
									for (var i=4; --i>=0;) {
										fxAdd( this.x+getRandom(8), this.y-(getRandom(4)), FX.fSMOKETRAIL, getRandom(3)-1);
									}
								}
							break;
							
							// got shot!
							case 900:
								this.doGravity(myWorld);
								
								if (this.onGround) {
									this.yIncrease+=18;
									if (this.yIncrease>=0) {
										this.yIncrease=0;
										this.aiState=999;
										this.aiCountDown=32;
										myPlayer.killCount++;
										if (myPlayer.weapon==6) myPlayer.grenadeKillCount++;
									}
									this.ySpeed=this.yIncrease;
								}
								
								this.doHorizontal(myWorld, tmpPlayer);
								if (this.hitWall) {
									this.xSpeed=-this.xSpeed;
								}
							break;
							
							// blink and disappear
							case 999:
								if (this.aiCountDown>0) this.aiCountDown--;
								else {
									this.died=true;
								}
								
								if (this.aiCountDown>16 || this.aiCountDown%4==0) this.visible=true;
								else this.visible=false;
							break;
						}
					}
					
					
					if (this.aiState<900) {
						if (this.subType==5 && myWorld.worldAge%3==0) bulletAdd(Bullets.OWNER_MONSTER, Bullets.bFLAME, this.x, this.y, 0);
						
						if (this.myDirection<0) this.yOffset=Monster.DUDEHEIGHT+(this.subType*24);
						else if (this.myDirection>0) this.yOffset=0+(this.subType*24);
					
						if (this.animDelay>0) {
							this.animDelay-=(16>>myWorld.slowMoFactor);
						} else {
							if (this.ySpeed<0) {
								this.xOffset=(3*Monster.DUDEWIDTH);
							} else if (this.ySpeed>16) {
								this.xOffset=(4*Monster.DUDEWIDTH);
							} else if (!this.onGround) {
								this.xOffset=0;
							} else if (this.xSpeed!=0) {
								if (this.animDelay>4<<4 || this.xOffset>(2*Monster.DUDEWIDTH)) {
									this.animDelay=4<<4;
									this.xOffset=Monster.DUDEWIDTH;
								}
								if (this.animDelay>0) this.animDelay--;
								else {
									if (this.xOffset<(2*Monster.DUDEWIDTH)) this.xOffset=(2*Monster.DUDEWIDTH);
									else {
										if (getRandom(8)<4) this.xOffset=0;
										else this.xOffset=Monster.DUDEWIDTH;
									}
									this.animDelay=4<<4;
								}
							} else {
								if (getRandom(96)<8) this.xOffset=0;
								else this.xOffset=Monster.DUDEWIDTH;
							}
						}
						
					}
					
					if (this.aiState<700) this.checkOffWorld(myWorld,displayW);
				break;
				

				
				case Monster.mAVATAR:
					switch (this.aiState) {
						case 0:	 // dropping in
							this.doGravity(myWorld);
							
							ty=this.y>>4;
							tx=this.x>>4;
							if (this.onGround || myWorld.isSolid(tx,ty+2)) {
								this.aiState=1;
							}
							
							this.myDirection=-1;
						break;
						
						case 1: // move around
							if (this.yIncrease>=0) {
								this.doGravity(myWorld);
								
									
									if (this.aiCountDown>0) {
										this.aiCountDown-=16>>myWorld.slowMoFactor;
							
										// turn head left/right if not walking
										if (this.xSpeed==0 && this.aiCountDown%96==0 && getRandom(24)<8) {
											this.myDirection=-this.myDirection;
										} else {
											this.doHorizontal(myWorld, tmpPlayer);
											if (this.hitWall) {
												this.xSpeed=-this.xSpeed;
											}
										}
									} else {
										
										tx=getRandom(60);
										if (tx<20 || this.xSpeed!=0) {
											this.xSpeed=0;
											this.aiCountDown=48<<4;
										} else if (tx<40) {
											this.xSpeed=-16;
											this.aiCountDown=(16+getRandom(48))<<4;
										} else {
											this.xSpeed=16;
											this.aiCountDown=(16+getRandom(48))<<4;
										}
									}
	
								if (this.xSpeed<0) this.myDirection=-1;
								else if (this.xSpeed>0) this.myDirection=1;
							}
							
							if (this.fireDelay>0) this.fireDelay-=(16>>myWorld.slowMoFactor);

							if (this.fireDelay==0) {
								if (hitPlayer) {
									if (this.chatOrder[0]>0) {
										this.aiState=2;
										this.aiCountDown=0;
									} else {
										if (this.myDirection>0) fxAdd(this.x-getRandom(16),this.y-(12+getRandom(12)),FX.fRATAT,2);
										else fxAdd(this.x+getRandom(16),this.y-(12+getRandom(12)),FX.fRATAT,2);
										this.fireDelay=8<<4;
									}
								}
							}
						break;
						
						case 2:
							this.doGravity(myWorld);
							this.xSpeed=0;
							
							if (tmpPlayer.x<this.x-6) this.myDirection=-1;
							else if (tmpPlayer.x>this.x+6) this.myDirection=1;
							
							if (this.fireDelay>0) {
								this.fireDelay-=(16>>myWorld.slowMoFactor);
								if (this.chatOrder[this.aiCountDown]==2 && this.fireDelay%(16<<4)==0 && this.fireDelay>16) {
									if (this.myDirection>0) fxAdd(this.x-getRandom(16),this.y-(12+getRandom(12)),FX.fRATAT,2);
									else fxAdd(this.x+getRandom(16),this.y-(12+getRandom(12)),FX.fRATAT,2);
								}
							} else {
								if (this.myDirection>0) fxAdd(this.x-getRandom(16),this.y-(12+getRandom(12)),FX.fRATAT,this.chatOrder[this.aiCountDown]);
								else fxAdd(this.x+getRandom(16),this.y-(12+getRandom(12)),FX.fRATAT,this.chatOrder[this.aiCountDown]);
								this.fireDelay=36<<4;
								
								if (this.chatOrder[this.aiCountDown]>18 && this.chatOrder[this.aiCountDown]<22) this.fireDelay=20<<4;
								
								this.aiCountDown++;
								
								if (this.chatOrder[this.aiCountDown]==-2) {
									// spawn coins
									this.aiState=3;
									this.aiCountDown=15;
									this.chatOrder[0]=-1;
								}
								
								if (this.chatOrder[this.aiCountDown]==-3) {
									myPlayer.lives=myPlayer.maxLives;
									myPlayer.ammo=myPlayer.maxAmmo;

									myPlayer2.lives=myPlayer2.maxLives;
									myPlayer2.ammo=myPlayer2.maxAmmo;
									
									this.doHitSound=true;
									this.chatOrder[0]=-1;
									this.aiState=1;
								}
								
								if (this.chatOrder[this.aiCountDown]==-1) {
									this.chatOrder[0]=-1;
									this.aiState=1;
									
									bulletAdd(Bullets.OWNER_ANYONE, Bullets.bSWITCH, this.x, this.y, 0);
								}
							}
						break;

						
						// spawn coins
						case 3:
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiState=1;
								if (this.subType==999) this.died=true;
							}

							monsterAdd(Monster.mCOIN,this.x,this.y-10,3,0);
						break;
						
						// wait for activation
						case 700:
							if (this.x<myWorld.worldOffset+displayW+32 && this.x>myWorld.worldOffset-16) {
								this.aiState=0;
							}
						break;
						
						
						// resqued gunslug, stands here then vanishes
						case 800:
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								// create our vanish FX's
								for (var i=this.w; --i>=0;) {
									fxAdd(this.x+i, this.y, FX.fVANISH, this.xOffset+i);
								}
								this.died=true;
							}
						break;
						
						// got shot!
						case 900:
							this.doGravity(myWorld);
							
							if (this.onGround) {
								this.yIncrease+=18;
								if (this.yIncrease>=0) {
									this.yIncrease=0;
									this.aiState=999;
									this.aiCountDown=32;
								}
								this.ySpeed=this.yIncrease;
							}
							
							this.doHorizontal(myWorld, tmpPlayer);
							if (this.hitWall) {
								this.xSpeed=-this.xSpeed;
							}
							
						break;
						
						// blink and disappear
						case 999:
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.died=true;
							}
							
							if (this.aiCountDown>16 || this.aiCountDown%4==0) this.visible=true;
							else this.visible=false;
						break;
					}
					
					
					if (this.aiState<800) {
						if (this.myDirection<0) this.yOffset=Monster.DUDEHEIGHT+(this.yIncrease*24);
						else if (this.myDirection>0) this.yOffset=0+(this.yIncrease*24);
					
						if (this.animDelay>0) {
							this.animDelay-=(16>>myWorld.slowMoFactor);
						} else {
							if (this.ySpeed<0) {
								this.xOffset=(3*Monster.DUDEWIDTH);
							} else if (this.ySpeed>16) {
								this.xOffset=(4*Monster.DUDEWIDTH);
							} else if (!this.onGround) {
								this.xOffset=0;
							} else if (this.xSpeed!=0) {
								if (this.animDelay>4<<4 || this.xOffset>(2*Monster.DUDEWIDTH)) {
									this.animDelay=4<<4;
									this.xOffset=Monster.DUDEWIDTH;
								}
								if (this.animDelay>0) this.animDelay--;
								else {
									if (this.xOffset<(2*Monster.DUDEWIDTH)) this.xOffset=(2*Monster.DUDEWIDTH);
									else {
										if (getRandom(8)<4) this.xOffset=0;
										else this.xOffset=Monster.DUDEWIDTH;
									}
									this.animDelay=4<<4;
								}
							} else {
								if (getRandom(96)<8) this.xOffset=0;
								else this.xOffset=Monster.DUDEWIDTH;
							}
						}
					}
				break;
				
				
				
				case Monster.mCHYM:
					switch (this.aiState) {
						case 0: // untouched
							this.xOffset=25;
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								fxAdd(this.x+8, this.y-3, FX.fSIGNAL, 0);
								this.aiCountDown=24;
							}
							
							if (hitPlayer) {
								this.aiState=1;
							}
						break;
						
						case 1: // touched
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								fxAdd(this.x+8, this.y-3, FX.fSIGNAL, 0);
								this.aiCountDown=24;
							}
							
							if (hitPlayer) {
								this.energy++;
								
								// note: beacon always shown on player 1
								myPlayer.beacon=(this.energy<<2);
								myPlayer.showBeacon=true;
								myPlayer.isBeacon=true;
								
								if (this.energy>=16) {
									this.energy=16;
									myPlayer.beacon=-1;
									this.aiState=2;
									this.xOffset=13;
									
									this.doHitSound=true;

									fxAdd(this.x+getRandom(32)-16, this.y-12, FX.fZING,0);
									
									bulletAdd(Bullets.OWNER_PLAYER, Bullets.bBUILDINGDESTROY, this.x, this.y, 0);
									
									// spawn some debri
									for (var i=2; --i>=0;) {
										fxAdd(this.x+getRandom(this.w),this.y-getRandom(this.h),FX.fDEBRI,0);
									}
									
									// spawn coins
									for (var i=5;--i>=0;) {
										monsterAdd(Monster.mCOIN,this.x,this.y,3,0);
									}
									
									this.died=true;
									
								}
							}
						break;
						
						
						case 2: // stay activated
							this.xOffset=13;
						break;
						
						
						case 999: // lock screen
							if (this.x<myWorld.worldOffset+displayW) {
								myWorld.softLock=this.x-80;
							}
						break;
					}
				break;
				
				
				case Monster.mPLATFORM:
					// make sure we are solid for player
					if (myPlayer.x<=this.x+this.w-4 && myPlayer.x+12>=this.x && myPlayer.y<this.y+this.h && myPlayer.y+12>=this.y && myPlayer.ySpeed>=0) {
						myPlayer.y=this.y-Player.PL_HEIGHT;
						myPlayer.floatY=myPlayer.y<<4;
						myPlayer.setOnGround();
						myPlayer.ySpeed=0;
					}
					
					if (myPlayer2.x<=this.x+this.w-4 && myPlayer2.x+12>=this.x && myPlayer2.y>=this.y && myPlayer2.y+12<=this.y && myPlayer2.ySpeed>=0) {
						myPlayer2.y=this.y-Player.PL_HEIGHT;
						myPlayer2.floatY=myPlayer2.y<<4;
						myPlayer2.setOnGround();
						myPlayer2.ySpeed=0;
					}
				break;
				
				
				case Monster.mCOIN:
					if (this.animDelay>0) this.animDelay-=16>>myWorld.slowMoFactor;
					else {
						this.animDelay=2<<4;
						this.xOffset+=8;
						if (this.xOffset>36) this.xOffset=12;
					}
					
					
					if (this.aiState==0) {
						this.doGravity(myWorld);
						this.doHorizontal(myWorld, tmpPlayer);
						
						if (this.xSpeed<0) {
							this.xSpeed+=2;
							if (this.xSpeed>=0) this.xSpeed=0;
						} else if (this.xSpeed>0) {
							this.xSpeed-=2;
							if (this.xSpeed<=0) this.xSpeed=0;
						}
						
						if (this.aiCountDown>0) this.aiCountDown--;
						else {
							this.died=true;
						}
					}
					
					if (this.aiCountDown>16 || this.aiCountDown%4<2) this.visible=true;
					else this.visible=false;
					
					if (hitPlayer && this.ySpeed>=0) {
						this.died=true;
						this.doHitSound=true;
						// note: score only counted on player1
						myPlayer.addScore(1);
						myPlayer.addCoin(1);
					}
					
				break;
				
				
				
				
				case Monster.mTRIPOD:
					switch (this.aiState) {
						case 0:
							if (this.wasHit>0) {
								this.wasHit--;
								this.xOffset=80;
							} else {
								this.xOffset=0;
							}
							if (tmpPlayer.x>this.x-200 && tmpPlayer.x<this.x+200) {
								if (this.fireDelay>0) {
									this.fireDelay-=(16>>myWorld.slowMoFactor);
								} else {
								
									bulletAdd(Bullets.OWNER_MONSTER, Bullets.bTRILASER, this.x+12, this.y+38, -1);
									fxAdd(this.x+12,this.y+38,FX.fSMALLEXPLODE,1);

									// v1.3.0
									if (this.x>=myWorld.worldOffset-32 && this.x<myWorld.worldOffset+displayW+16) this.doShoot=true;
									this.fireDelay=10<<4;
								}
							}
						break;
						
						case 900:
							myWorld.worldShake=16; 

							fxAdd(this.x+8+getRandom(8),this.y+55+(this.aiCountDown<<3),FX.fBIGEXPLODE,0);
							fxAdd(this.x+8+getRandom(8),this.y+55+(this.aiCountDown<<3),FX.fSMALLEXPLODE,0);
								
							fxAdd(this.x+55+getRandom(8),this.y+48+(this.aiCountDown<<3),FX.fBIGEXPLODE,0);
							fxAdd(this.x+55+getRandom(8),this.y+48+(this.aiCountDown<<3),FX.fSMALLEXPLODE,0);
							

							if (this.aiCountDown%6==0) this.doExplodeSound=true;
							
							// slowmo when we blow up, only in world1, so it doesn't get boring/annoying
							//if (myWorld.world==1) {
								myWorld.SlowMotion=true;
								myWorld.slowMoFactor=3;
								myWorld.slowMoCountdown=8;
							//}
							
							this.aiCountDown--;
							this.h-=8;
							if (this.aiCountDown==0) {
								this.aiState=901;
								this.h=52;
								this.aiCountDown=1;
								this.ySpeed=64;
								
								bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, this.x+(this.w>>1),this.y+(this.h>>1), 0);
								
								// spawn some debri
								for (var i=4; --i>=0;) {
									fxAdd(this.x+getRandom(this.w)-8,this.y+48+getRandom(this.h-48),FX.fDEBRI,0);
								}
							}
						break;
						
						case 901:
							myWorld.worldShake=16;
							
							this.rotation-=4;
							if (this.rotation<0) this.rotation+=360;
							else if (this.rotation<300) this.rotation=300;
							
							if (this.rotation%12==0) fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fSMALLEXPLODE,0);
							else if (this.rotation%6==0) fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fCIRCLEEXPLODE,0);
							else fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fBIGEXPLODE,0);
							
							if (this.aiCountDown%6==0) this.doExplodeSound=true;
							
							this.doGravity(myWorld);
							if (this.onGround) {
								
								if (this.aiCountDown==0) {
									this.aiState=902;
									this.aiCountDown=12;
								} else {
									this.ySpeed=-24;
									this.aiCountDown--;
								}
								
								bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, this.x+(this.w>>1),this.y, 0);
								
								// spawn some debri
								for (var i=4; --i>=0;) {
									fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h-48),FX.fDEBRI,0);
								}
								
							}
						break;

						case 902:
							myWorld.worldShake=16; 
							
							this.visible=false;
							if (this.aiCountDown>0) this.aiCountDown--;
							else this.died=true;
							

							this.y=this.floatY>>4;
							this.x=this.floatX>>4;
							
							if (this.aiCountDown%2==0) {
								fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fHUGEEXPLODE,0);
								this.doExplodeSound=true;
							} else {
								fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fBIGEXPLODE,0);
							}
							
							// v1.3.0 - moved explode sound here
							if (myWorld.worldAge%4==0) this.doExplodeSound=true;
							
						break;
						
					}
				break;
				
				
				case Monster.mJETPACK:
					switch (this.aiState) {
						case 0:	// wait for activating
							if (this.x<myWorld.worldOffset+displayW+16 && this.x>myWorld.worldOffset-16) {
								this.aiState=1;
								this.aiCountDown=16;	// duration of shooting
							}
						break;
						
						case 1:	 // hunt player down
	
							if (this.y<tmpPlayer.y-16) this.yIncrease=8;
							else if (this.y>tmpPlayer.y-16) this.yIncrease=-8;
							
							this.ySpeed+=this.yIncrease>>myWorld.slowMoFactor;
							if (this.ySpeed<-36) this.ySpeed=-36;
							else if (this.ySpeed>36) this.ySpeed=36;
							
							if (this.aiCountDown==0) this.xIncrease=-8;
							else if (this.x<tmpPlayer.x-24) this.xIncrease=8;
							else if (this.x>tmpPlayer.x+24) this.xIncrease=-8;
							this.xSpeed+=this.xIncrease;
							if (this.xSpeed<-48) this.xSpeed=-48;
							else if (this.xSpeed>48) this.xSpeed=48;
							
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
							
							this.x=this.floatX>>4;
							this.y=this.floatY>>4;
									
							if (this.y<0) {
								this.y=0;
								this.floatY=this.y<<4;
								this.ySpeed=16;
								this.yIncrease=-8;
							}
							
							if (this.xSpeed<0) this.myDirection=-1;
							else this.myDirection=1;
							
							
							if (this.x<myWorld.worldOffset-32) this.died=true;
							ty=this.y>>4;
							tx=this.x>>4;
							
							
							fxAdd(this.x+10,this.y+5,FX.fSMOKETRAIL,0);
							fxAdd(this.x,this.y+5,FX.fSMOKETRAIL,0);
							
							fxAdd(this.x,this.y+5,FX.fFIREBULB,0);
							fxAdd(this.x+10,this.y+5,FX.fFIREBULB,0);
							
							
							if (this.fireDelay>0) {
								this.fireDelay-=(16>>myWorld.slowMoFactor);
							} else {
								bulletAdd(Bullets.OWNER_MONSTER, Bullets.bDROPPER, this.x+4, this.y+10, this.myDirection);
								this.fireDelay=4<<4;
								
								if (this.aiCountDown>0) this.aiCountDown--;
							}
							
						break;
						
						// got shot!
						case 900:
							this.doGravity(myWorld);
							
							if (this.onGround) {
								this.yIncrease+=18;
								if (this.yIncrease>=0) {
									this.yIncrease=0;
									this.aiState=999;
									this.aiCountDown=32;
								}
								this.ySpeed=this.yIncrease;
							}
							
							this.doHorizontal(myWorld, tmpPlayer);
							if (this.hitWall) {
								this.xSpeed=-this.xSpeed;
							}
							
						break;
						
						// blink and disappear
						case 999:
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.died=true;
							}
							
							if (this.aiCountDown>16 || this.aiCountDown%4==0) this.visible=true;
							else this.visible=false;
						break;
					}
					
					
					if (this.aiState<900) {
						if (this.myDirection<0) this.yOffset=12;
						else if (this.myDirection>0) this.yOffset=0;
					
						if (this.animDelay>0) {
							this.animDelay-=(16>>myWorld.slowMoFactor);
						} else {
							if (getRandom(96)<8) this.xOffset=0;
							else this.xOffset=15;
						}
					}		
					
				break;
				
				
				case Monster.mDROPSHIP:

					switch (this.aiState) {
						case 0: // wait for activation
							if (this.x<myWorld.worldOffset-64) {
								this.aiState=1;
								this.visible=true;
							}
						break;
						
						case 1: // fly to center, hold, and drop dudes
							this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							
							this.x=this.floatX>>4;
							this.y=this.floatY>>4;
							
							if (this.ySpeed>0 && this.y>0) this.ySpeed-=4;

							
							if (this.x>myWorld.worldOffset+176) {
								// check for floor
								this.doFallSound=false;
								tx=this.x>>4;
								ty=this.y>>4;
								while (ty<TileMap.MAPHEIGHT && !this.doFallSound) {
									if (myWorld.isSolidBelow(tx, ty)) this.doFallSound=true;
									ty++;
								}

								if (this.doFallSound) this.aiState=2;	// drop soldier (dofallsound triggers that)
							}
						break;
						
						
						case 2: // slow down for drop
							this.xSpeed-=12;
							if (this.xSpeed<=0) {
								this.xSpeed=0;
								this.aiState=3;
								this.aiCountDown=(2<<3)<<4;	// 4 soldiers*8 delay,  *16 for slowmofactor
							}
							
							this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							
							this.x=this.floatX>>4;
							this.y=this.floatY>>4;
							
							if (this.x%16==0) this.doFallSound=true; // drop soldier
						break;
						
						
						case 3: // do drop
							if (this.aiCountDown>0) {
								this.aiCountDown-=16>>myWorld.slowMoFactor;
								
								if (this.aiCountDown%128==0) this.doFallSound=true; // trigger a soldier drop
								
								
								if (this.aiCountDown<=0) {
									this.aiState=4;
								}
							}
						break;
						
						case 4: // fly out
							if (this.xSpeed<128) this.xSpeed+=24;
							this.ySpeed-=4;
							this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							
							this.x=this.floatX>>4;
							this.y=this.floatY>>4;
							
							if (this.x>myWorld.worldOffset+displayW+32) this.died=true;
						break;
						
						
						
						
						case 10: // resque-chopper, wait for player to board
							if (this.x<myWorld.worldOffset-96 || this.x>myWorld.worldOffset+displayW+64) return;
							else if (tmpPlayer.x>this.x) {
								// player activated pickup-zone
								if (myWorld.worldActiveChyms>0) {
									if (this.aiCountDown>0) {
										this.aiCountDown--;
										if (this.aiCountDown==0)	this.doHitSound=true;
									}
								} else {
									this.aiState=11;
									this.x=myWorld.worldOffset-48;
									this.floatX=this.x<<4;
									this.xSpeed=128;
									this.ySpeed=32;
									this.visible=true;
									this.doExplodeSound=true;
								}
							}
						break;
						
						case 11:	// fly in
							this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							
							this.x=this.floatX>>4;
							this.y=this.floatY>>4;
							
							if (this.x>=this.targetX) {
								this.xSpeed=0;
								this.targetX=this.x;
							}
							
							if (this.y>=this.targetY) {
								this.y=this.targetY;
								this.floatY=this.y<<4;
								this.ySpeed=0;
							}
							
							if (this.xSpeed==0 && this.ySpeed==0) {
								this.aiState=12;
								this.fireDelay=80;
								this.aiCountDown=128;
							}
						break;
						
						
						case 12: // wait for player to hop in
							if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
							else {
								this.fireDelay=(9*2)<<4;
								fxAdd(this.x+27, this.y+20, FX.fENTRY, 0);
							}
							
							if (this.aiCountDown>0) {
								this.aiCountDown--;
								// trigger the general telling them to get into the DAMN CHOPPER!
								if (this.aiCountDown==0) this.doHitSound=true;
							}
							
						// todo : player 2
							if (this.gotPlayerId==1 || (!myPlayer.Died && myPlayer.x>=this.x+22 && myPlayer.x+16<=this.x+64 && myPlayer.y>=this.y+8 && myPlayer.y+16<this.y+32 && myPlayer.ySpeed<0) ){
								myPlayer.x=this.x+28;
								myPlayer.y=this.y+this.h-21;
								myPlayer.myDirection=-1; // look back! like a cool GI
								myPlayer.blockPlayerMovement=true;
								myPlayer.onChopper=true;
								myPlayer.hasSpecialDrink=false;
								
								if (myPlayer2.Died || !myWorld.isCOOP) this.aiState=13;
								else if (this.gotPlayerId==-1 || this.gotPlayerId==1) this.gotPlayerId=1;
								else this.aiState=13; // both on the chopper!
							}
							
							if (this.gotPlayerId==2 || (!myPlayer2.Died && myPlayer2.x>=this.x+22 && myPlayer2.x+16<=this.x+64 && myPlayer2.y>=this.y+8 && myPlayer2.y+16<this.y+32 && myPlayer2.ySpeed<0) ) {
								myPlayer2.x=this.x+28;
								myPlayer2.y=this.y+this.h-21;
								myPlayer2.myDirection=-1; // look back! like a cool GI
								myPlayer2.blockPlayerMovement=true;
								myPlayer2.onChopper=true;
								myPlayer.hasSpecialDrink=false;
								
								if (myPlayer.Died) this.aiState=13; 
								else if (this.gotPlayerId==-1 || this.gotPlayerId==2) this.gotPlayerId=2;
								else this.aiState=13; // both on the chopper!
							}
							
						break;
						
						
						case 13: // move out, take player
							if (this.xSpeed<128) this.xSpeed+=24;
							this.ySpeed-=4;
							this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							
							this.x=this.floatX>>4;
							this.y=this.floatY>>4;
							
							if (this.y<-32) {
								this.y=-32;
								this.floatY=this.y<<4;
							}
							
							if (this.x>myWorld.worldOffset+displayW+32) {
								this.died=true;
								myPlayer.transport=true;
							}
							
							if (!myPlayer.Died) {
								myPlayer.x=this.x+28;
								myPlayer.y=this.y+this.h-21;
								myPlayer.onGround=true;
								myPlayer.ySpeed=0;
								myPlayer.xSpeed=0;
								myPlayer.myDirection=-1; // look back! like a cool GI
								myPlayer.onChopper=true;
							}
							
							if (!myPlayer2.Died){ 
								myPlayer2.x=this.x+28;
								myPlayer2.y=this.y+this.h-21;
								myPlayer2.onGround=true;
								myPlayer2.ySpeed=0;
								myPlayer2.xSpeed=0;
								myPlayer2.myDirection=-1; // look back! like a cool GI
								myPlayer2.onChopper=true;
							}
						break;
						
						
						// GOING DOWN!
						case 900:
							if (this.ySpeed<64) this.ySpeed+=16>>myWorld.slowMoFactor;
							if (this.xSpeed<112) this.xSpeed+=32>>myWorld.slowMoFactor;
							this.floatY+=this.ySpeed;
							this.floatX+=this.xSpeed;
							this.x=this.floatX>>4;
							this.y=this.floatY>>4;

							if (myWorld.worldAge%64>32) {
								fxAdd(this.x+getRandom(40),this.y+getRandom(20),FX.fSMOKETRAIL,0);
								fxAdd(this.x+getRandom(40),this.y+getRandom(20),FX.fSMALLEXPLODE,0);
							} else {
								fxAdd(this.x+getRandom(40),this.y+getRandom(20),FX.fBIGEXPLODE,0);
							}


							if (this.aiCountDown>0) {
								this.aiCountDown--;
								myWorld.SlowMotion=true;
								myWorld.slowMoFactor=3;
								myWorld.slowMoCountdown=4;
								myWorld.CameraTakeOver=true;
								// overwrite camera, follow us while we die
								myWorld.worldOffset=this.x-128;
								// v1.3.0
								if (myWorld.worldOffset>(TileMap.MAPWIDTH<<4)-displayW) myWorld.worldOffset=(TileMap.MAPWIDTH<<4)-displayW;
							}

							tx=(this.x+(this.w>>1))>>4;
							ty=(this.y+this.h)>>4;
							if (myWorld.isSolid(tx, ty) || this.y>160) {
								this.aiState=901;
								this.aiCountDown=12;
								myWorld.CameraTakeOver=false;
								// spawn some debri
								for (var i=4; --i>=0;) {
									fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fDEBRI,0);
								}
								
								bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, this.x+(this.w>>1),this.y+(this.h>>1), 0);
							}
						break;
						
						case 901:
							myWorld.worldShake=16; 
							
							this.visible=false;
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.died=true;
								
								for (var i=5;--i>=0;) {
									monsterAdd(Monster.mCOIN,this.x+getRandom(this.w),this.y-getRandom(this.h),3,0);
								}
							}
							

							this.y=this.floatY>>4;
							this.x=this.floatX>>4;
							
							if (this.aiCountDown%2==0) {
								fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fHUGEEXPLODE,0);
								this.doExplodeSound=true;
							} else {
								fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fBIGEXPLODE,0);
							}

							// v1.3.0 - moved explode sound here
							if (myWorld.worldAge%4==0) this.doExplodeSound=true;
						break;
					}

					// rotation angle based on speed
					if (this.aiState>0 && this.aiState!=10) {
						this.rotation=(this.xSpeed>>3);
						
						// "blink" blades
						this.animDelay+=16>>myWorld.slowMoFactor;
						if (this.animDelay>=32>>myWorld.slowMoFactor) {
							if (this.h==32) {
								this.h=30;
								this.yOffset+=2;
								this.y+=2;
							} else {
								this.h=32;
								this.yOffset-=2;
								this.y-=2;
								if (this.visible && this.x>myWorld.worldOffset-96 && this.x<myWorld.worldOffset+displayW+64) this.doMoveSound=true;
							}
							this.floatY=this.y<<4;
							this.animDelay=0;
							
						}
						
						
						// floor close by? cause some dust
						tx=(this.x>>4)+2;
						ty=(this.y>>4)+1;

						found=false;
						for (var i=0; i<3; i++) {
							if (!found) {
								if (myWorld.isSolid(tx,ty) && myWorld.isSolid(tx,ty+1)) {
									found=true;
									fxAdd( ( (tx+getRandom(4))-2)<<4, (ty<<4)-(getRandom(8)), FX.fSMOKETRAIL, getRandom(3)-1);
								}
							}
							ty++;
						}
					}
				break;
				
				
				case Monster.mBALLUP:
					switch (this.aiState) {
						case 0:
							if (tmpPlayer.x>this.x-96 && tmpPlayer.x<this.x+96) {
								this.aiState=1;
								this.ySpeed=-((this.subType+2)<<4); //<<1;
								this.aiCountDown=4;
								this.doMoveSound=true;
							}
						break;
						
						case 1:
							if (this.y<this.targetY) this.visible=true;
							this.floatY+=this.ySpeed;
							this.y=this.floatY>>4;
							if (this.y<=this.targetY-(this.subType<<4)) {
								this.aiState=2;
							}
						break;
						
						case 2: // pop up!
							if (this.y>>4>0) myWorld.setTile(this.x>>4, this.y>>4, TileMap.cEMPTY);
							
							this.onGround=false;
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							if (this.ySpeed<240) this.ySpeed+=16>>myWorld.slowMoFactor;
							this.y=this.floatY>>4;
							if (this.y>160) {
								this.y=176;
								this.floatY=this.y<<4;
								this.died=true;
							}	

							if (this.y>0) {
								tx=(this.x+(this.w>>1))>>4;
								ty=(this.y+this.h)>>4;
								if (myWorld.isDoubleSolid(tx, ty)) {
									this.y=(ty<<4)-this.h;
									this.floatY=this.y<<4;
									
									if (this.ySpeed>64) {
										fxAdd(this.x+4,this.y+4,FX.fTWIRLLAND,0);
									} else if (this.ySpeed>48) {
										this.doLandSound=true;
									}
									
									this.ySpeed=0;
									this.onGround=true;
								}
							}
							
							
							if (this.y>>4>0) myWorld.setTile(this.x>>4, this.y>>4, TileMap.cNOBULLETBLOCK);
							
							
							// check our direction and rotate if needed
							if (tmpPlayer.y<this.y-10) {
								if (tmpPlayer.x<this.x+8) {
									if (this.myDirection>3) this.myDirection--;
									else if (this.myDirection<3) this.myDirection++;
								} else if (tmpPlayer.x>this.x+8) {
									if (this.myDirection>4) this.myDirection--;
									else if (this.myDirection<4) this.myDirection++;
								}
							} else if (tmpPlayer.y>this.y+10) {
								if (tmpPlayer.x<this.x+8) {
									if (this.myDirection>1) this.myDirection--;
								} else if (tmpPlayer.x>this.x+8) {
									if (this.myDirection<6) this.myDirection++;
								}
							} else {
								if (tmpPlayer.x<this.x+8) {
									if (this.myDirection<2) this.myDirection++;
									else if (this.myDirection>2) this.myDirection--;
								} else {
									if (this.myDirection<5) this.myDirection++;
									else if (this.myDirection>5) this.myDirection--;
								}
							}
							
							this.xOffset=144+(this.myDirection<<4);
							
							
							
							
							if (this.fireDelay>0) {
								this.fireDelay-=(16>>myWorld.slowMoFactor);
							} else {
								bulletAdd(Bullets.OWNER_MONSTER, Bullets.bTRILASERSMALL, this.x+8, this.y+8, this.myDirection);
								fxAdd(this.x,this.y+14,FX.fSMALLEXPLODE,1);
								this.doShoot=true;
								this.fireDelay=24+(getRandom(48))<<3;
							}
						break;
						
						
						case 900:
							if (this.y>=0) {
								myWorld.setTile(this.x>>4, this.y>>4, TileMap.cEMPTY);
								if (this.subType<0) myWorld.setTile((this.x>>4)+1, this.y>>4, TileMap.cEMPTY);
							}
							this.died=true;
							this.doExplodeSound=true;
							fxAdd(this.x-8,this.y-16,FX.fHUGEEXPLODE,1);
						break;

					}
				break;
				
				case Monster.mMINE:
					switch (this.aiState) {
						case 0:	// blinking, nothing going on
							if (this.animDelay>0) this.animDelay-=16>>myWorld.slowMoFactor;
							else {
								this.animDelay=this.animSpeed;
								if (this.yOffset==0) this.yOffset=7;
								else this.yOffset=0;
							}
							
							if (hitPlayer) {
								this.aiState=1;
								this.yOffset=14;
								fxAdd(this.x-2, this.y-38, FX.fRATAT, 1);
								this.doMoveSound=true;
							}
						break;
						
						case 1: // activated
							if (!hitPlayer) {
								this.aiState=2;
								this.aiCountDown=8<<4;
								this.doMoveSound=true;
							}
						break;
							
						case 2:
							if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
							else {
								this.doExplodeSound=true;
								this.died=true;
								
								myPlayer.addChain();
							}
						break;
					}
				break;
				
				case Monster.mGUNNER:
					switch (this.aiState) {
						
					
						case 1:	// gunner dude
							
							this.yOffset=36;
							
						break;
						
						// got shot!
						case 900:
							this.doGravity(myWorld);
							
							if (this.onGround) {
								this.yIncrease+=18;
								if (this.yIncrease>=0) {
									this.yIncrease=0;
									this.aiState=999;
									this.aiCountDown=32;
								}
								this.ySpeed=this.yIncrease;
							}
							
							this.doHorizontal(myWorld, myPlayer);
							if (this.hitWall) {
								this.xSpeed=-this.xSpeed;
							}
							
						break;
						
						// blink and disappear
						case 999:
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.died=true;
							}
							
							if (this.aiCountDown>16 || this.aiCountDown%4==0) this.visible=true;
							else this.visible=false;
						break;
					}
					

					if (this.aiState>0 && this.aiState<900) {
						if (getRandom(96)<8) this.xOffset=0;
						else this.xOffset=Monster.DUDEWIDTH;
					}
					
				break;
				
				
				case Monster.mCRATE:
					if (hitPlayer && tmpPlayer.inTank) {
						this.aiCountDown=0;
						fxAdd(this.x+getRandom(this.w-8),this.y+getRandom(8),FX.fDEBRI,0);
						fxAdd(this.x+getRandom(this.w-8),this.y+getRandom(8),FX.fDEBRI,0);
						this.aiState=900;
						myWorld.setTile(this.x>>4, this.y>>4, TileMap.cNOBULLETBLOCK);
					}
					
					switch (this.aiState) {
						case 0:
							myWorld.setTile(this.x>>4, this.y>>4, TileMap.cEMPTY);

							// v1.2.0
							// check below tile
							if (this.atEdge) {
								myWorld.setTile(this.x>>4, (this.y>>4)+1, TileMap.cEMPTY);
								this.atEdge=false;
							}
							
							this.doGravity(myWorld);
							myWorld.setTile(this.x>>4, this.y>>4, TileMap.cNOBULLETBLOCK);
							// v1.2.0
							if (!myWorld.isSolid(this.x>>4, ((this.y+8)>>4)+1) && this.onGround) {
								myWorld.setTile(this.x>>4, ((this.y+8)>>4)+1, TileMap.cNOBULLETBLOCK);
								this.atEdge=true;
							}
						break;
						
						
						// crate with a Gunslug! - collect em all
						case 10:
							if (this.y>=0) {
								myWorld.setTile(this.x>>4, this.y>>4, TileMap.cEMPTY);
								myWorld.setTile((this.x>>4)+1, this.y>>4, TileMap.cEMPTY);
								if (this.subType!=-7) this.doGravity(myWorld);
								myWorld.setTile(this.x>>4, this.y>>4, TileMap.cNOBULLETBLOCK);
								myWorld.setTile((this.x>>4)+1, this.y>>4, TileMap.cNOBULLETBLOCK);
							}
						break;
						
						// metal crate
						case 20:
							myWorld.setTile(this.x>>4, this.y>>4, TileMap.cEMPTY);
							this.doGravity(myWorld);
							myWorld.setTile(this.x>>4, this.y>>4, TileMap.cNOBULLETBLOCK);
						break;
						
						case 900:
							if (this.y>=0) {
								myWorld.setTile(this.x>>4, this.y>>4, TileMap.cEMPTY);
								if (this.subType<0) myWorld.setTile((this.x>>4)+1, this.y>>4, TileMap.cEMPTY);
							}
							this.died=true;
						break;
					}
				break;
				
				
				case Monster.mBUILDING:
					switch (this.subType) {
						
						case 0:	// BOOSTER building
							switch (this.aiState) {
								case 0:	// booster building
									// make our ledge
									myWorld.put(this.startX, this.startY-2, 5,1,TileMap.cDOWNTILE);
									
									if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
									else {
										this.fireDelay=(9*2)<<4;
										fxAdd(this.x+33, this.y+43, FX.fENTRY, 0);
									}
									
									
									if (!myPlayer.atDoor && myPlayer.x>=this.x+21 && myPlayer.x+8<=this.x+56 && myPlayer.y+16>=this.y+48 && myPlayer.y<=this.y+this.h) {
										myPlayer.atDoor=true;
										myPlayer.doorTargetX=this.x+30;
										myPlayer.doorTargetY=this.y+20-Player.PL_HEIGHT;
										myPlayer.doorTargetID=this.subType;
									}

									if (!myPlayer2.atDoor && myPlayer2.x>=this.x+21 && myPlayer2.x+8<=this.x+56 && myPlayer2.y+16>=this.y+48 && myPlayer2.y<=this.y+this.h) {
										myPlayer2.atDoor=true;
										myPlayer2.doorTargetX=this.x+30;
										myPlayer2.doorTargetY=this.y+20-Player.PL_HEIGHT;
										myPlayer.doorTargetID=this.subType;
									}
								break;
								
								case 900:
									// remove ledge
									myWorld.put(this.startX, this.startY-2, 5,1,0);
									myWorld.worldShake=16; 
									this.aiState=901;
									// short delay before we start crumbling
									this.aiCountDown=24;
									this.ySpeed=1;
								break;
								
								case 901:
									if (this.aiCountDown%2==0) {
										this.doExplodeSound=true;
										fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fSMALLEXPLODE,0);
									}
									
									// v1.3.0 - moved explode sound here
									if (myWorld.worldAge%4==0) this.doExplodeSound=true;
									
									
									if (this.aiCountDown>0) this.aiCountDown--;
									else {
										this.aiState=902;
										this.aiCountDown=0;
										this.targetY=this.y+this.h-16;
									}
									myWorld.worldShake=16;
									
									if (this.aiCountDown>12) {
										myWorld.SlowMotion=true;
										myWorld.slowMoFactor=3;
										myWorld.slowMoCountdown=8;
									}
								break;
								
								
								case 902:
									myWorld.worldShake=16;
									fxAdd( this.x+getRandom(this.w), this.targetY-(getRandom(8)), FX.fSMOKETRAIL, getRandom(3)-1);
									
									if (this.aiCountDown%3==0) {
										this.doExplodeSound=true;
										this.rotation--;
										if (this.rotation<-45) this.rotation=-45;
										
										if (this.aiCountDown%6==0) fxAdd(this.x+getRandom(this.w),this.targetY-getRandom(64),FX.fHUGEEXPLODE,0);
										fxAdd(this.x+getRandom(this.w),this.targetY+getRandom(this.h-16),FX.fSMALLEXPLODE,0);

										if (this.ySpeed<6) this.ySpeed++;
									}
									
									// v1.3.0 - moved explode sound here
									if (myWorld.worldAge%4==0) this.doExplodeSound=true;
									
									this.aiCountDown++;
									
									this.y+=this.ySpeed;
									
									if (this.y>this.targetY) {
										this.died=true;
										// spawn some debri
										for (var i=4; --i>=0;) {
											fxAdd(this.x+getRandom(this.w)-8,this.targetY-getRandom(48),FX.fDEBRI,0);
										}
									}
								break;
							}
						break;
						
						
						
						case 1: // general building
							switch (this.aiState) {
								case 0:
									// clear our area from platforms
									//myWorld.cut(this.startX, this.startY-2, 10, 2);
									this.aiState=1;
								break;
								
								
								case 1:	
									if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
									else {
										this.fireDelay=(9*2)<<4;
										fxAdd(this.x+68, this.y+29, FX.fENTRY, 0);
									}
									
									
									if (myPlayer.x>=this.x+60 && myPlayer.x+8<=this.x+92 && myPlayer.y+16>=this.y+32 && myPlayer.y<=this.y+this.h) {
										if (!myPlayer.atDoor) {
											myPlayer.atDoor=true;
											myPlayer.doorTargetX=-1;
											myPlayer.doorTargetY=-1;
											myPlayer.doorTargetID=this.subType;
										} else if (myPlayer.inDoor) {
											// shutdown operations
											this.aiState=2;
										}
									}

									
									if (myPlayer2.x>=this.x+60 && myPlayer2.x+8<=this.x+92 && myPlayer2.y+16>=this.y+32 && myPlayer2.y<=this.y+this.h) {
										if (!myPlayer2.atDoor) {
											myPlayer2.atDoor=true;
											myPlayer2.doorTargetX=-1;
											myPlayer2.doorTargetY=-1;
											myPlayer.doorTargetID=this.subType;
										} else if (myPlayer2.inDoor) {
											// shutdown operations
											this.aiState=2;
										}
									}
								break;
							}
						break;
						
						
						
						case 2: // just a door
							switch (this.aiState) {
								case 0:
									if (this.aiCountDown>0) this.aiCountDown--;
									else this.aiState=1;
								break;
								
								case 1:
									if (myPlayer.x>=this.x-4 && myPlayer.x+8<=this.x+22 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
										if (!myPlayer.atDoor) {
											myPlayer.atDoor=true;
											myPlayer.doorTargetX=-1;
											myPlayer.doorTargetY=-1;
											myPlayer.doorTargetID=this.subType;
										} else if (myPlayer.inDoor) {
											this.aiState=2;
										}
									}
									
									if (myPlayer2.x>=this.x-4 && myPlayer2.x+8<=this.x+22 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
										if (!myPlayer2.atDoor) {
											myPlayer2.atDoor=true;
											myPlayer2.doorTargetX=-1;
											myPlayer2.doorTargetY=-1;
											myPlayer.doorTargetID=this.subType;
										} else if (myPlayer2.inDoor) {
											// shutdown operations
											this.aiState=2;
										}
									}
								break;
							}
						break;	
						
						
						case 5: // Shop
							switch (this.aiState) {
								case 0:
									this.aiState=1;
								break;
								
								
								case 1:	
									if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
									else {
										this.fireDelay=(9*2)<<4;
										fxAdd(this.x+33, this.y+29, FX.fENTRY, 0);
									}
									
									
									if (myPlayer.x>=this.x+30 && myPlayer.x+8<=this.x+50 && myPlayer.y+16>=this.y+48 && myPlayer.y<=this.y+this.h) {
										if (!myPlayer.atDoor) {
											myPlayer.atDoor=true;
											myPlayer.doorTargetX=-1;
											myPlayer.doorTargetY=-1;
											myPlayer.doorTargetID=this.subType;
										} else if (myPlayer.inDoor) {
											// shutdown operations
											this.aiState=2;
										}
									}
	
									
									if (myPlayer2.x>=this.x+30 && myPlayer2.x+8<=this.x+50 && myPlayer2.y+16>=this.y+48 && myPlayer2.y<=this.y+this.h) {
										if (!myPlayer2.atDoor) {
											myPlayer2.atDoor=true;
											myPlayer2.doorTargetX=-1;
											myPlayer2.doorTargetY=-1;
											myPlayer.doorTargetID=this.subType;
										} else if (myPlayer2.inDoor) {
											// shutdown operations
											this.aiState=2;
										}
									}
								break;
							}
					break;
						
					}
				break;
				
				case Monster.mDOOR:
					if (this.aiCountDown>0) this.aiCountDown--;
					
					switch (this.aiState) {
						case 0: // off
							this.switchWall(false, myWorld);
						break;
						
						case 1: //on
							this.switchWall(true, myWorld);
						break;
					}
				break;				
				
				
				case Monster.mBOUNCER:
					this.doGravity(myWorld);
					if (this.onGround) {
						if (this.subType==999 && this.aiState!=1) {
							this.aiState=1;
						}
						
						if (this.x<myWorld.worldOffset-16 || this.x>myWorld.worldOffset+displayW) this.doLandSound=false;
						this.ySpeed=-3<<4;

						if (this.aiState==1) {
							this.energy-=2;
							if (this.energy<=0) {
								this.energy=0;
								this.aiCountDown=8;
								this.aiState=2;
								this.doExplodeSound=true;
								fxAdd(this.x,this.y,FX.fBIGEXPLODE,0);
							}
						}
					}
					
					this.yOffset=(this.energy>>1)*12;

					if (this.checkHitPlayer(tmpPlayer.x, tmpPlayer.y+6)) {
						this.doExplodeSound=true;
						this.died=true;
					}
					if (this.checkHitPlayer(tmpPlayer.x, tmpPlayer.y+6)) {
						this.doExplodeSound=true;
						this.died=true;
					}
					
					this.doHorizontal(myWorld, myPlayer);
					
					if (this.aiState==2) {
						if (this.aiCountDown>0) this.aiCountDown--;
						else {
							this.doExplodeSound=true;
							this.died=true;
						}
					}
				break;

				
				case Monster.mTANK:
					switch (this.aiState) {
						case 0:
							if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
							else {
								this.aiCountDown=2<<4;
								if (this.myDirection<0) {
									if (this.xOffset==this.startX) this.xOffset=this.startX+32;
									else this.xOffset=this.startX;
								} else {
									if (this.xOffset==this.startX+64) this.xOffset=this.startX+96;
									else this.xOffset=this.startX+64;
								}
							}
							
							
							this.doGravity(myWorld);

							
							if (this.myDirection<0) {
								if ( tmpPlayer.x<this.x-32 && tmpPlayer.x>this.x-128 && this.xSpeed>-48) this.xSpeed-=16;
								else if (tmpPlayer.x>this.x-32 && tmpPlayer.x<this.x+128 && this.xSpeed<48) this.xSpeed+=16;
								else {
									if (this.xSpeed<0) {
										this.xSpeed+=16;
										if (this.xSpeed>=0) this.xSpeed=0;
									} else if (this.xSpeed>0) {
										if (this.xSpeed<=0) this.xSpeed=0;
										this.xSpeed=-16;
									}
								}
									
								if (tmpPlayer.x>this.x+48) this.myDirection=1;

							} else { 
							
								if (tmpPlayer.x>this.x+48 && this.xSpeed<48) this.xSpeed+=16;
								else if (tmpPlayer.x<this.x-48 && this.xSpeed>-48) this.xSpeed-=16;
								else {
									if (this.xSpeed<0) {
										this.xSpeed+=16;
										if (this.xSpeed>=0) this.xSpeed=0;
									} else if (this.xSpeed>0) {
										if (this.xSpeed<=0) this.xSpeed=0;
										this.xSpeed=-16;
									}
								}
									
								if (tmpPlayer.x<this.x-24) this.myDirection=-1;
							}							
							this.x=this.floatX>>4;
							this.doHorizontal(myWorld, myPlayer);
							
							if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
							else {
								if (this.subType==2) {// hell tank
									if ( tmpPlayer.y+16>this.y && tmpPlayer.y<this.y+48) {
										if (this.myDirection<0 && tmpPlayer.x<this.x && tmpPlayer.x>this.x-80) {
											bulletAdd(Bullets.OWNER_MONSTER, Bullets.bFLAME, this.x-8, this.y+20+getRandom(3), this.myDirection);
											fxAdd(this.x-4,this.y+20,FX.fSMALLEXPLODE,1);
											this.fireDelay=2<<4;
											if (this.x>myWorld.worldOffset-16 && this.x<myWorld.worldOffset+displayW) this.doShoot=true;
										} 
										
										if (this.myDirection>0 && tmpPlayer.x>this.x && tmpPlayer.x<this.x+100) {
											bulletAdd(Bullets.OWNER_MONSTER, Bullets.bFLAME, this.x+28, this.y+20+getRandom(3), this.myDirection);
											fxAdd(this.x+20,this.y+20,FX.fSMALLEXPLODE,1);
											this.fireDelay=2<<4;
											
											if (this.x>myWorld.worldOffset-16 && this.x<myWorld.worldOffset+displayW) this.doShoot=true;
										} 
										
									}									

								} else {
									
									if (this.myDirection<0 && tmpPlayer.x<this.x) {
										bulletAdd(Bullets.OWNER_MONSTER, Bullets.bTRILASER, this.x+1, this.y+10, -2);
										fxAdd(this.x+1,this.y+10,FX.fBIGEXPLODE,1);
										this.ySpeed=-4;
										if (this.x>myWorld.worldOffset-16 && this.x<myWorld.worldOffset+displayW) this.doShoot=true;
										this.fireDelay=16<<4;
									} else if (this.myDirection>0 && tmpPlayer.x>this.x) {
										bulletAdd(Bullets.OWNER_MONSTER, Bullets.bTRILASER, this.x+30, this.y+10, 2);
										fxAdd(this.x+30,this.y+10,FX.fBIGEXPLODE,1);
										this.ySpeed=-4;
										if (this.x>myWorld.worldOffset-16 && this.x<myWorld.worldOffset+displayW) this.doShoot=true;
										this.fireDelay=16<<4;
									}
									
								}
								
							}
						break;
						
						
						
						// player tank, wait for player
						case 10:
							if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
							else {
								this.fireDelay=(9*2)<<4;
								fxAdd(this.x+10, this.y+16, FX.fENTRY, 0);
							}
							
							this.doGravity(myWorld);
							
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								if (!myPlayer.Died && myPlayer.x>=this.x && myPlayer.x+16<=this.x+32 && myPlayer.y>=this.y && myPlayer.y+16<this.y+32 && myPlayer.ySpeed<0) {
									this.aiState=11;
									this.renderPass=3;
									myPlayer.setWeapon(5);
									myPlayer.inTank=true;
									myPlayer.x=this.x+15;
									myPlayer.ySpeed=0;
									this.gotPlayerId=1;
									this.doFallSound=true;
								} else if (!myPlayer2.Died && myPlayer2.x>=this.x && myPlayer2.x+16<=this.x+32 && myPlayer2.y>=this.y && myPlayer2.y+16<this.y+32 && myPlayer2.ySpeed<0) {
									this.aiState=11;
									this.renderPass=3;
									myPlayer2.setWeapon(5);
									myPlayer2.inTank=true;
									myPlayer2.x=x+15;
									myPlayer2.ySpeed=0;
									this.gotPlayerId=2;
									this.doFallSound=true;
								}
							}
						break;
						
						
						case 11:
							if (!tmpPlayer.inTank) {
								this.renderPass=2;
								
								// if weapon is already set, the player died! or better, we died :/
								if (tmpPlayer.weapon==1) this.aiState=900;
								else {
									this.gotPlayerId=-1;
									this.aiState=10;
									this.aiCountDown=80;
									tmpPlayer.setWeapon(1);
								}
							} else {
	
								if (tmpPlayer.myDirection<0) {
									this.y=tmpPlayer.y-20;
									this.x=tmpPlayer.x-6;
									this.myDirection=-1;
								} else {
									this.y=tmpPlayer.y-20;
									this.x=tmpPlayer.x-15;
									this.myDirection=1;
								}
								
								if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
								else {
									this.aiCountDown=2<<4;
									if (this.myDirection<0) {
										if (this.xOffset==0) this.xOffset=32;
										else this.xOffset=0;
									} else {
										if (this.xOffset==64) this.xOffset=96;
										else this.xOffset=64;
									}
								}
							}
						break;
						
						
						
						case 900: // enemy tank is hit, decide on throwing out the driver or blowing up completely
							myWorld.worldShake=16; 

							fxAdd(this.x+getRandom(32),this.y+(this.aiCountDown<<2),FX.fBIGEXPLODE,0);
							fxAdd(this.x+getRandom(32),this.y+(this.aiCountDown<<2),FX.fSMALLEXPLODE,0);
							
							
							if (this.aiCountDown%4==0) this.doExplodeSound=true;
							
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.died=true;
								
								// leave tank for player
								if (this.gotPlayerId<0 && this.startX==0) this.aiState=901;
								
									fxAdd(this.x,this.y+8,FX.fHUGEEXPLODE,0);
									// spawn some debri
									for (var i=4; --i>=0;) {
										fxAdd(this.x+getRandom(this.w)-8,this.y+16+getRandom(32),FX.fDEBRI,0);
									}
							}
						break;
					}
				break;

					
				
				case Monster.mDRUM:
					if (hitPlayer && tmpPlayer.inTank) {
						this.aiState=1;
						myWorld.setTile(this.x>>4, this.y>>4, TileMap.cEMPTY);
						this.aiState=1;
						this.doMoveSound=true;
						this.doExplodeSound=true;
						this.xSpeed=(getRandom(3)-1)<<5;
						this.ySpeed=-160;
						fxAdd(this.x-8,this.y+getRandom(this.h),FX.fHUGEEXPLODE,0);
					}
					
					switch (this.aiState) {
						case 0: // just block stuff
							if (this.onGround) myWorld.setTile(this.x>>4, this.y>>4, TileMap.cEMPTY);
							this.doGravity(myWorld);
							if (this.onGround) myWorld.setTile(this.x>>4, this.y>>4, TileMap.cNOBULLETBLOCK);
						break;
						
						
						case 1: // fly up and explode
							this.doHorizontal(myWorld, myPlayer);
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							this.y=this.floatY>>4;

							this.rotation+=16>>myWorld.slowMoFactor;
							if (this.rotation>360) this.rotation-=360;
							if (this.ySpeed<64) this.ySpeed+=16>>myWorld.slowMoFactor;
							else {
								this.doExplodeSound=true;
								this.doMoveSound=true;
								fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fHUGEEXPLODE,0);
								this.died=true;
							}
						break;
					}
				break;
				
				
				case Monster.mWORM:
					switch (this.aiState) {
						case 0:	// wait for player to be near
							if (myPlayer.x>this.x-48 && myPlayer.x<this.x+48) {
								this.aiState=1;
								this.aiCountDown=32;
								this.doShoot=true;
							}
						break;
						
						
						case 1: // spawn dust
							fxAdd(  this.x+getRandom(32), this.y-(getRandom(8)), FX.fSMOKETRAIL, getRandom(3)-1);
							fxAdd(  this.x+getRandom(32), this.y-(getRandom(8)), FX.fDEBRI, 0);
							

							myWorld.worldShake=16;

							if (myWorld.worldAge%4==0) this.doShoot=true;
							
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiState=2;
								this.ySpeed=-64;
								this.aiCountDown=6;
								this.visible=true;
								this.doMoveSound=true;
								
								bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, this.x+(this.w>>1), this.y, 0);
								bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, this.x+(this.w>>1), this.y+48, 0);
							}
						break;
						
						
						case 2: // fly up!
							this.floatY+=this.ySpeed;
							this.y=this.floatY>>4;
							this.x=this.floatX>>4;
							
							if (this.ySpeed>-112) this.ySpeed-=16;

							bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, this.x+(this.w>>1), this.y, 2);
							bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, this.x+(this.w>>1), this.y+32, 2);
							bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, this.x+(this.w>>1), this.y+70, 2);
							
							if (this.aiCountDown>0) {
								this.aiCountDown--;
							} else {
								bulletAdd(Bullets.OWNER_ANYONE, Bullets.bEXPLOSION, this.x+(this.w>>1), this.y+getRandom(96), 1);
								this.aiCountDown=6;
							}

							if (this.y<myWorld.worldOffsetY-128) this.died=true;
						break;
						
						
						case 900:
							if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
							else this.died=true;

							// v1.3.0
							if (myWorld.worldAge%4==0) this.doExplodeSound=true;
							fxAdd(this.x,this.y+getRandom(this.h),FX.fBIGEXPLODE,1);
						break;
					}
				break;
				
				
				case Monster.mFIREBALL:
					if (this.aiState==0 && this.x<myWorld.worldOffset+displayW+32 && this.x>myWorld.worldOffset-16) {
						if (this.subType==1) this.aiState=5;
						else this.aiState=1;
						this.doMoveSound=true;
					}
					
					switch (this.aiState) {
						case 1:
							this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							
							if (this.animDelay>0) this.animDelay-=16>>myWorld.slowMoFactor;
							else {
								this.animDelay=2<<4;
								this.xOffset+=16;
								if (this.xOffset>160) this.xOffset=128;
							}
							
							this.ySpeed+=8;
							
							this.y=this.floatY>>4;
							this.x=this.floatX>>4;
							if (this.y>160) this.died=true;
							
							if (myWorld.worldAge%3==0) bulletAdd(Bullets.OWNER_MONSTER, Bullets.bFLAME, this.x+8, this.y+4, 0);
						break;
						
						
						case 5: // default bouncing code
							this.doGravity(myWorld);
							if (this.onGround) {
								
								if (this.x<myWorld.worldOffset-16 || this.x>myWorld.worldOffset+displayW) this.doLandSound=true;
								this.ySpeed=-3<<4;

							}
							if (myWorld.worldAge%3==0) bulletAdd(Bullets.OWNER_MONSTER, Bullets.bFLAME, this.x+8, this.y+4, 0);
							this.doHorizontal(myWorld, tmpPlayer);
						break;
					}
					
					
					if (hitPlayer) {
						this.died=true;
						this.aiState=999;
						bulletAdd(Bullets.OWNER_MONSTER, Bullets.bEXPLOSION, this.x,this.y, 0);
					}
				break;
				
				
				case Monster.mARCADE:
					
					
					// INC Arcade box
					switch (this.aiState) {
						case 2:
							if (myPlayer.coins>=25) {
								if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
								else {
									this.fireDelay=(9*2)<<4;
									fxAdd(this.x, this.y+4, FX.fENTRY, 0);
								}
	
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Arcade level
									this.died=true;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Arcade level
									this.died=true;
								}	
								
							} else if (this.wasHit==0){
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Arcade level
									this.doLandSound=true;
									this.wasHit++;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Arcade level
									this.doLandSound=true;
									this.wasHit++;
								}	
							}
						break;
						
						// mario pipe
						case 10:
							// player on top of us?
							if (myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.onGround && myPlayer.y+12>=this.y-2) {
								// trigger Mario level
								this.died=true;
							}
	
							if (myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.onGround && myPlayer2.y+12>=this.y-2) {
								// trigger Mario level
								this.died=true;
							}
						break;
						
						
						// continue
						case 11:
							if (myWorld.isCOOP) this.xOffset=20;
							
							//if (myPlayer.coins>=100) {
								if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
								else {
									this.fireDelay=(9*2)<<4;
									fxAdd(this.x, this.y+4, FX.fENTRY, 0);
								}
	
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}	
								
							//}
						break;
						
						
						// BAR
						case 12:
							
						break;
						
						case 13: // energy drink
							if (myPlayer.coins>=25) {
								if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
								else {
									this.fireDelay=(9*2)<<4;
									fxAdd(this.x, this.y+16, FX.fENTRY, 0);
								}
	
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}
							} else if (this.wasHit==0){
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}
							}
						break;
							
						
						// armor
						case 14:
							if (myWorld.isCOOP) {
								this.xOffset=70;
								this.w=20;
							}
							
							if ( (!myWorld.isCOOP && myPlayer.coins>=50) 
								 || (myWorld.isCOOP && myPlayer.coins>=100) ) {
								if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
								else {
									this.fireDelay=(9*2)<<4;
									fxAdd(this.x, this.y+4, FX.fENTRY, 0);
								}
	
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}	
								
							} else if (this.wasHit==0) {
								
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}	
							}
						break;	
						
						// jukebox
						case 15:
							if (this.animDelay>0) this.animDelay--;
							else if (myPlayer.coins>0) {
								if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
								else {
									this.fireDelay=(9*2)<<4;
									fxAdd(this.x, this.y+4, FX.fENTRY, 0);
								}
	
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.doMoveSound=true;
									this.animDelay=96;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.doMoveSound=true;
									this.animDelay=32;
								}
							}
							
							if (myWorld.worldAge%8==0) fxAdd(this.x,this.y,FX.fMUSIC,0);
						break;
						
						// ticketmachine
						case 16:
							if (myPlayer.coins>=25) {
								if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
								else {
									this.fireDelay=(9*2)<<4;
									fxAdd(this.x, this.y+4, FX.fENTRY, 0);
								}
	
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}	
								
							} else if (this.wasHit==0) {
								
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}	
							}							
						break;
						
						// gameboy!
						case 17:
							if (myPlayer.coins>=50) {
								if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
								else {
									this.fireDelay=(9*2)<<4;
									fxAdd(this.x, this.y+4, FX.fENTRY, 0);
								}
	
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}	
								
							} else if (this.wasHit==0) {
								
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}	
							}							
						break;			
						
						// v1.2.0 - dr who
						case 18:
							if (myPlayer.coins>=50) {
								if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
								else {
									this.fireDelay=(9*2)<<4;
									fxAdd(this.x, this.y+4, FX.fENTRY, 0);
								}
	
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}	
								
							} else if (this.wasHit==0) {
								
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}	
							}							
						break;						
						
						// v1.3.0
						case 19:
							if (myPlayer.coins>=50) {
								if (this.fireDelay>0) this.fireDelay-=16>>myWorld.slowMoFactor;
								else {
									this.fireDelay=(9*2)<<4;
									fxAdd(this.x, this.y+4, FX.fENTRY, 0);
								}
	
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.died=true;
								}	
								
							} else if (this.wasHit==0) {
								
								if (myPlayer.ySpeed<0 && myPlayer.x>=this.x && myPlayer.x+8<=this.x+16 && myPlayer.y+16>=this.y && myPlayer.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}
	
								if (myPlayer2.ySpeed<0 && myPlayer2.x>=this.x && myPlayer2.x+8<=this.x+16 && myPlayer2.y+16>=this.y && myPlayer2.y<=this.y+this.h) {
									// trigger Continue bought
									this.doLandSound=true;
									this.wasHit++;
								}	
							}							
						break;
									
					
					// finnish flag
						case 99:
							if (this.targetX<0 && this.x<myWorld.worldOffset+displayW) {
								this.targetX=this.x+64-displayW;
								if (this.targetX<0) this.targetX=0;
								myWorld.lockScreen=this.targetX;
							}
	
							if (this.targetX>=0) myWorld.lockScreen=this.targetX;
							
							if (myPlayer.x>this.x+16 || myPlayer2.x>this.x+16) {
								myPlayer.transport=true;
								myPlayer2.transport=true;
							}
						break;
					}
				break;
				
				
				case Monster.mGENERAL:
					// trigger a general info
					if (myPlayer.x+16>=this.x) {
						this.died=true;
					}
				break;
				

				// v1.3.0
				case Monster.mSTEAMPIPE:
					if (this.aiCountDown>0) this.aiCountDown--;
					else {
						this.aiCountDown=48;
						this.aiState=1-this.aiState;
						if (this.aiState==1 && this.x>myWorld.worldOffset-16 && this.x<myWorld.worldOffset+displayW) this.doShoot=true;
					}
					
					if (this.aiState==1 && this.aiCountDown%3==0) {
						// blow some steam
						bulletAdd(Bullets.OWNER_MONSTER, Bullets.bSTEAM, this.x+2,this.y-4, 0);
					}
				break;
				
				case Monster.mCHICKEN:
					this.doGravity(myWorld);
					if (!this.onGround && this.aiState==0) {
						this.aiState=1;
						this.aiCountDown=0;
					}


					switch (this.aiState) {
						case 0: // picking, randomly
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								if (this.xOffset==160) {
									this.xOffset=170;
									this.aiCountDown=4+getRandom(28);
								} else {
									this.xOffset=160;
									this.aiCountDown=8;
								}
							}
						break;
						
						case 1: // falling
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiCountDown=8;
								if (this.xOffset==170) this.xOffset=180;
								else this.xOffset=170;
							}
							if (this.onGround) {
								this.xOffset=170;
								this.aiState=0;
								this.aiCountDown=0;
							}
						break;
						
						case 2: // wildly jumping up and "flying"
							if (this.aiCountDown%8==0) {
								if (this.xOffset==170) this.xOffset=180;
								else this.xOffset=170;
							}
							
							if (myWorld.worldAge%8==0) this.doMoveSound=true;
									
							this.doHorizontal(myWorld, tmpPlayer);
							if (this.hitWall && !this.atEdge) {
								if (this.onGround && tmpPlayer.x>this.x) {
									this.ySpeed=-48;
								} else if (this.onGround && tmpPlayer.x<this.x ) {
									this.ySpeed=-48;
								} else if (!myWorld.isPlatformer) {
									this.xSpeed=0;
								}
							}
									
									
							if (this.aiCountDown>0) this.aiCountDown--;
							else if (this.onGround){ 
								this.aiState=0;
								this.aiCountDown=0;
							}
						break;
					}
					
				break;
				
				
				
				
				case Monster.mBOSS1:
					if (this.aiState>0 && this.aiState<902) {
						myWorld.lockScreen=this.x-176;
					
						// beacon works in max of 32, so scale our energy to fit that energy bar
						myPlayer.beacon=this.energy;
						myPlayer.showBeacon=true;
					}
					
					
					switch (aiState) {
						case 0:	 // waiting for player
							myWorld.put(this.x>>4, this.y>>4, 4, 3, TileMap.cTILE);
							if (this.x<myWorld.worldOffset+displayW) {
								this.aiState=1;
								this.aiCountDown=0;
							}
						break;
						
						
						case 1: // start appearing slowly from under the ground
							this.floatY-=4;
							myWorld.worldShake=16;
							this.y=this.floatY>>4;

							fxAdd(this.x+getRandom(this.w)-8,this.y+16+getRandom(this.h),FX.fDEBRI,0);
							
							if (myWorld.worldAge%16==0) this.doExplodeSound=true;
							
							if (this.y<=this.targetY) {
								this.floatY=this.targetY<<4;
								this.y=this.floatY>>4;
								this.aiState=2;
								this.aiCountDown=80;
								this.fireDelay=12;
							}

						break;
						
						case 2: // shoot cycle
							if (this.fireDelay>18) this.xOffset=156;
							else this.xOffset=92;
							
							if (this.fireDelay>0) this.fireDelay--;
							else {
								this.fireDelay=26;

								bulletAdd(Bullets.OWNER_MONSTER, Bullets.bTRILASER, this.x+4, this.y+13, -99);
								fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
								
								this.doShoot=true;
							}

							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiState=3;
								this.aiCountDown=64;
								this.fireDelay=4;
							}
						break;
						
						case 3: // small delay
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiState=4;
								this.aiCountDown=8;
								this.fireDelay=4;
							}
						break;
						
						case 4: // throw arm down
							if (this.aiCountDown>0) {
								this.aiCountDown--;
							} else {
								this.fireDelay--;
								if (this.fireDelay==0) {
									this.aiState=2;
									this.aiCountDown=80;
									this.fireDelay=12;
								} else {
									this.aiCountDown=32;
									this.xOffset=92;
									for (var i=4; --i>=0;) {
										fxAdd(this.x+32+getRandom(16), this.y+32+getRandom(16), FX.fSMOKETRAIL, getRandom(3)-1);
										fxAdd(this.x+32+getRandom(16), this.y+32+getRandom(16), FX.fCIRCLEEXPLODE, 0);

										fxAdd(myPlayer.x+getRandom(16), this.y+32+getRandom(16), FX.fSMOKETRAIL, getRandom(3)-1);
										fxAdd(myPlayer.x+getRandom(16), this.y+32+getRandom(16), FX.fCIRCLEEXPLODE, 0);
									}
									
									myWorld.worldShake=16;
									// v1.3.0
									if (myWorld.worldAge%4==0) this.doExplodeSound=true;
									
									bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBOSSSPIKE, myPlayer.x, this.y+48, SpriteSet);

								}
							}
						break;
						
						
						
						case 900:
							myWorld.put(this.x>>4, this.y>>4, 4, 3, TileMap.cEMPTY);
							
							myWorld.worldShake=16; 

							fxAdd(this.x+getRandom(64),this.y+25+(this.aiCountDown<<1),FX.fBIGEXPLODE,0);
							fxAdd(this.x+getRandom(64),this.y+25+(this.aiCountDown<<1),FX.fSMALLEXPLODE,0);
							
							// v1.3.0
							if (myWorld.worldAge%4==0) this.doExplodeSound=true;
							
							this.aiCountDown--;

							if (this.aiCountDown==0) {
								this.aiState=901;
								this.h=35;
								this.aiCountDown=1;
								this.ySpeed=64;
								
								// spawn some debri
								for (var i=4; --i>=0;) {
									fxAdd(this.x+getRandom(this.w)-8,this.y+16+getRandom(32),FX.fDEBRI,0);
								}
							}
						break;
						
						case 901:
							myWorld.worldShake=16;
							
							this.rotation-=4;
							if (this.rotation<0) this.rotation+=360;
							else if (this.rotation<300) this.rotation=300;
							
							if (rotation%12==0) fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fSMALLEXPLODE,0);
							else if (this.rotation%6==0) fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fCIRCLEEXPLODE,0);
							else fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fBIGEXPLODE,0);
							
							// v1.3.0
							if (myWorld.worldAge%4==0) this.doExplodeSound=true;
							
							this.doGravity(myWorld);
							if (this.onGround) {
								
								if (this.aiCountDown==0) {
									this.aiState=902;
									this.aiCountDown=12;
								} else {
									this.ySpeed=-24;
									this.aiCountDown--;
								}
								
								// spawn some debri
								for (var i=4; --i>=0;) {
									fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(32),FX.fDEBRI,0);
								}
								
							}
						break;

						case 902:
							myWorld.worldShake=16; 
							
							this.visible=false;
							if (this.aiCountDown>0) this.aiCountDown--;
							else this.died=true;
							

							this.y=this.floatY>>4;
							this.x=this.floatX>>4;
							
							if (this.aiCountDown%2==0) {
								fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fHUGEEXPLODE,0);
								this.doExplodeSound=true;
							} else {
								fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fBIGEXPLODE,0);
							}
						break;

					}
				break;


				case Monster.mBOSS2:
					
					if (this.wasHit>0) {
						this.xOffset=166;
						this.wasHit--;
					} else {
						this.xOffset=0;
					}
					
					if (this.aiState>0 && this.aiState<900) {
						myWorld.lockScreen=this.targetX;
						
						myWorld.worldShake=16;
						if (myWorld.worldAge%8==0) this.doMoveSound=true;

						
						
						// beacon works in max of 64, so scale our energy to fit that energy bar
						myPlayer.beacon=this.energy>>1;
						myPlayer.showBeacon=true;
					}
					
					
					switch (this.aiState) {
						case 0:	 // waiting for player
							if (this.x<myWorld.worldOffset+displayW) {
								this.aiState=1;
								this.aiCountDown=0;
								this.targetX=this.x-displayW;
								this.x=myWorld.worldOffset+displayW+16;
							}
						break;
						
						case 1: // move into screen
							this.floatX-=24;
							this.x=this.floatX>>4;
							
							if (this.x<=myWorld.worldOffset+80) {
								this.x=myWorld.worldOffset+80;
								this.floatX=this.x<<4;
								this.aiState=2;
								this.aiCountDown=16;
							}
						break;
						
						
						case 2:
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiState=3;
								this.aiCountDown=3;
								this.fireDelay=8;
								this.xSpeed=0;
							}
						break;
						
						case 3: // shoot cycle
							this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
							this.x=this.floatX>>4;
							
							if (this.fireDelay>0) this.fireDelay--;
							else {
								this.fireDelay=24;

								bulletAdd(Bullets.OWNER_MONSTER, Bullets.bTRILASER, this.x+72, this.y+52, -99);
								fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
								
								this.xSpeed=16;
								
								this.doShoot=true;

								if (this.aiCountDown>0) this.aiCountDown--;
								else this.aiState=4;
							}
						break;					
						
						
						case 4: // move into screen
							this.floatX-=16;
							this.x=this.floatX>>4;
							
							if (this.x<=myWorld.worldOffset+80) {
								this.x=myWorld.worldOffset+80;
								this.floatX=this.x<<4;
								this.aiState=5;
								this.aiCountDown=32;
								
								for (var i=4; --i>=0;) {
									fxAdd(this.x+32+getRandom(16), this.y+92+getRandom(16), FX.fSMOKETRAIL, getRandom(3)-1);
									fxAdd(this.x+32+getRandom(16), this.y+92+getRandom(16), FX.fCIRCLEEXPLODE, 0);

									fxAdd(myPlayer.x+getRandom(16), this.y+92+getRandom(16), FX.fSMOKETRAIL, getRandom(3)-1);
									fxAdd(myPlayer.x+getRandom(16), this.y+92+getRandom(16), FX.fCIRCLEEXPLODE, 0);
								}
								
								myWorld.worldShake=16;
								this.doExplodeSound=true;
								
								bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBOSSSPIKE, myPlayer.x, this.y+108, 12);
							}
						break;
						
						
						case 5: // arm 1 down
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiCountDown=32;
								this.aiState=6;
							}
						break;
						
						case 6: // small delay, before arm 2
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiState=7;
								this.aiCountDown=32;
								for (var i=4; --i>=0;) {
									fxAdd(this.x+32+getRandom(16), this.y+92+getRandom(16), FX.fSMOKETRAIL, getRandom(3)-1);
									fxAdd(this.x+32+getRandom(16), this.y+92+getRandom(16), FX.fCIRCLEEXPLODE, 0);

									fxAdd(myPlayer.x+getRandom(16), this.y+92+getRandom(16), FX.fSMOKETRAIL, getRandom(3)-1);
									fxAdd(myPlayer.x+getRandom(16), this.y+92+getRandom(16), FX.fCIRCLEEXPLODE, 0);
								}
								
								myWorld.worldShake=16;
								this.doExplodeSound=true;
								
								bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBOSSSPIKE, myPlayer.x, this.y+108, 12);
							}
						break;
						
						case 7:
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiCountDown=32;
								this.aiState=8;
							}
						break;
						
						
						case 8: // wait for 2nd arm to return
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								// move out of screen
								this.floatX+=32;
								this.x=this.floatX>>4;
								if (this.x>myWorld.worldOffset+displayW+64) this.aiState=1;
								
								// spawn soldiers (they also leave behind ammo you need)
								if (myWorld.worldAge%16==0) monsterAdd(Monster.mSOLDIER,(this.x+4)>>4,(this.y+78)>>4,5,getRandom(2));
							}
						break;
						
						
						
						case 900:// move out of screen
							fxAdd(this.x+8+getRandom(48),this.y+55+(this.aiCountDown<<3),FX.fBIGEXPLODE,0);
							fxAdd(this.x+8+getRandom(48),this.y+55+(this.aiCountDown<<3),FX.fSMALLEXPLODE,0);

								this.aiState=901;
								this.aiCountDown=16;
						break;
						
						case 901:
							if (this.aiCountDown>0) {
								this.aiCountDown--;
								fxAdd(this.x+8+getRandom(this.w),this.y+55+(this.aiCountDown<<3),FX.fSMALLEXPLODE,0);
								fxAdd(this.x+8+getRandom(this.w),this.y+55+(this.aiCountDown<<3),FX.fHUGEEXPLODE,0);
								if (myWorld.worldAge%4==0) this.doExplodeSound=true;
							} else {
								this.aiState=902;
								this.aiCountDown=24;
								this.visible=false;
							}
						break;
						
						case 902:
							if (this.aiCountDown>0) {
								this.aiCountDown--;
								for (var i=4; --i>=0;) {
									fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fDEBRI,0);
								}
								if (myWorld.worldAge%4==0) this.doExplodeSound=true;
							} else {
								this.died=true;
							}
						break;
					}
				

					if (this.energy<16) fxAdd( this.x+getRandom(this.w), this.y+(getRandom(this.h)), FX.fSMOKETRAIL, getRandom(3)-1);
					else if (this.energy<64 && myWorld.worldAge%8==0) fxAdd( this.x+getRandom(this.w), this.y+(getRandom(this.h)), FX.fSMOKETRAIL, getRandom(3)-1);
					
					
					if (this.animDelay>0) this.animDelay-=16>>myWorld.slowMoFactor;
					else {
						this.animDelay=3<<4;
						if (this.yOffset==0) this.yOffset=108;
						else this.yOffset=0;
					}
					
					// block players
					if (this.aiState<900) {
						if (myPlayer.x+12>this.x) { 
							myPlayer.x=this.x-14;
							myPlayer.floatX=myPlayer.x<<4;
							if (myPlayer.xSpeed>-24) myPlayer.xSpeed=-24;
						}
						
						if (myPlayer2.x+12>this.x) { 
							myPlayer2.x=this.x-14;
							myPlayer.floatX=myPlayer.x<<4;
							if (myPlayer2.xSpeed>-24)myPlayer2.xSpeed=-24;
						}
					}
				break;
				
				
				case Monster.mBOSS3:

					if (this.wasHit>0) {
						this.xOffset=128;
						this.wasHit--;
					} else {
						this.xOffset=0;
					}

					
					if (this.aiState>0 && this.aiState<902) {
						myWorld.lockScreen=this.targetX;
						
						// beacon works in max of 64, so scale our energy to fit that energy bar
						myPlayer.beacon=this.energy>>1;
						myPlayer.showBeacon=true;
					}
					
					
					switch (this.aiState) {
						case 0:	 // waiting to be on screen
							if (this.x<myWorld.worldOffset+displayW-80) {
								this.aiState=1;
								this.aiCountDown=48;
								this.targetX=this.x-112;
								
								myWorld.put(this.x>>4, (this.y-39)>>4, 4,4,TileMap.cTILE);
							}
						break;
						
						
						case 1: // dramatic delay
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.aiState=2;
							}
						break;
						
						case 2: // extend
							if (myWorld.worldAge%8==0) this.doMoveSound=true;
							myWorld.worldShake=16;
							this.targetY--;
							if (this.targetY<=0) {
								this.targetY=0;
								this.aiState=3;
								this.aiCountDown=48<<4;
								this.fireDelay=16;
							}
							
						break;
						
						case 3: // extended
							if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
							else {
								this.doShoot=true;
								bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBIGFLAME, this.x-10, this.y-16+this.targetY, -this.fireDelay);
								this.aiCountDown=2<<4;
								this.fireDelay--;
								if (this.fireDelay<=0) {
									this.aiState=4;
									this.aiCountDown=64<<4;
								}
							}
						break;
						
						
						case 4:
							// spawn soldiers (they also leave behind ammo you need)
							if (myWorld.worldAge%16==0) {
								if (getRandom(16)<8) monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset)>>4,(this.y+64)>>4,5,getRandom(2));
								else monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+displayW)>>4,(this.y+64)>>4,5,getRandom(2));
							}
							
							if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
							else {
								
								if (this.energy<64 && this.targetY<=0) {
									this.aiState=5;
								} else if (this.energy<64){
									this.aiState=2;
								} else {
									this.aiState=3;
								}
								this.aiCountDown=48<<4;
								this.fireDelay=16;
							}
						break;
						
						
						case 5:
							if (myWorld.worldAge%8==0) this.doMoveSound=true;
							myWorld.worldShake=16;
							this.targetY++;
							if (this.targetY>=39) {
								this.targetY=39;
								this.aiState=3;
								this.aiCountDown=48<<4;
								this.fireDelay=16;
							}
							
						break;
						
						
						case 900:
							myWorld.worldShake=16;
							//targetY++;
							//if (targetY>=39) {
								//targetY=39;
								this.aiState=901;
								this.aiCountDown=16<<4;
								this.fireDelay=16;
								fxAdd(this.x,this.y-48+this.targetY,FX.fDEBRI,4);
								fxAdd(this.x+getRandom(16),this.y-48+this.targetY,FX.fHUGEEXPLODE,0);
								this.doExplodeSound=true;
							//}
							
							if (myWorld.worldAge%8<4) fxAdd(this.x+getRandom(this.w),this.y-48+targetY,FX.fSMALLEXPLODE,0);
							else {
								fxAdd(this.x+8+getRandom(48),this.y-48+this.targetY,FX.fBIGEXPLODE,0);
								this.doExplodeSound=true;
							}
						break;
						
						
						case 901: // top flies off
							if (this.aiCountDown>12<<4) {
								myWorld.SlowMotion=true;
								myWorld.slowMoFactor=3;
								myWorld.slowMoCountdown=4;
							}
							
							if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
							else {
								this.doExplodeSound=true;
								this.aiCountDown=16;
								this.y+=8;
								this.h-=8;
								this.yOffset+=8;
								
								fxAdd(this.x+3+getRandom(59),this.y+getRandom(this.h),FX.fDEBRI,0);
								
								fxAdd(this.x+33+getRandom(59),this.y,FX.fSMALLEXPLODE,0);
								fxAdd(this.x+33+getRandom(59),this.y,FX.fHUGEEXPLODE,0);

								if (this.h<=8) {
									this.h=8;
									this.aiState=904; // inactive
								}
							}
						break;
					}
					
					
					// block players
					if (this.aiState<900) {
						if (this.energy<16) fxAdd( this.x+getRandom(this.w), this.y+(getRandom(this.h)), FX.fSMOKETRAIL, getRandom(3)-1);
						else if (this.energy<64 && myWorld.worldAge%8==0) fxAdd( this.x+getRandom(this.w), this.y+(getRandom(this.h)), FX.fSMOKETRAIL, getRandom(3)-1);

						if (myPlayer.x+12>this.x+26) { 
							myPlayer.x=(this.x+26)-14;
							if (myPlayer.xSpeed>-24) myPlayer.xSpeed=-24;
						}
						
						if (myPlayer2.x+12>this.x+26) { 
							myPlayer2.x=(this.x+26)-14;
							if (myPlayer2.xSpeed>-24)myPlayer2.xSpeed=-24;
						}
					}
				break;

				
				
				case Monster.mBOSS4:
					if (this.aiState>0 && this.aiState<902) {
						myWorld.lockScreen=this.targetX;
						
						if (myWorld.worldAge%4==0) this.doMoveSound=true;
						
						// beacon works in max of 64, so scale our energy to fit that energy bar
						myPlayer.beacon=this.energy>>1;
						myPlayer.showBeacon=true;
					}
					
					
					switch (this.aiState) {
						case 0:	 // waiting to be on screen
							if (this.x<myWorld.worldOffset+displayW-80) {
								this.targetX=this.x-112;
								this.x=(this.targetX+(displayW>>1)-64);
								this.floatX=this.x<<4;
								this.aiState=1;
								this.aiCountDown=48;
								this.xSpeed=0;
							}
						break;
						
						
						case 1: // dramatic entrance
							this.ySpeed=16;
							this.floatY+=this.ySpeed;
							this.y=this.floatY>>4;
							if (this.y>this.targetY-64) {
								this.y=this.targetY-64;
								this.floatY=this.y<<4;
								this.ySpeed=0;
								this.aiCountDown=16<<4;
								this.aiState=2;
							}
						break;
						
						
						case 2: // delay, and float back to top of screen
							if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
							else {
								this.ySpeed=-16;
								this.floatY+=this.ySpeed;
								this.y=this.floatY>>4;
								if (this.y<=-32) {
									this.y=-32;
									this.floatY=this.y<<4;
									this.ySpeed=0;
									this.aiState=3;
									this.xSpeed=0;
									this.xIncrease=myWorld.worldOffset<<4;
								}
							}
						break;
						

						case 3: // move to left of screen quickly
							if (this.floatX<=this.xIncrease+32) {
								this.xSpeed+=8;
								if (this.xSpeed>0) this.xSpeed=0;
							} else {
								if (this.xSpeed>-32) this.xSpeed-=8;
							}
							
							this.floatX+=this.xSpeed;

							if (this.floatX<=this.xIncrease+32 && this.xSpeed==0) {
								this.floatX=this.xIncrease;
								this.aiState=4;
								this.xSpeed=0;
								this.xIncrease=(myWorld.worldOffset+displayW-128)<<4;
								this.aiCountDown=4<<4;
							}
							this.x=this.floatX>>4;
						break;
						
						case 4:
							if (this.xSpeed<16) this.xSpeed+=8;
							this.floatX+=this.xSpeed;
							this.x=this.floatX>>4;
							if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
							else {
								// drop bouncers
								monsterAdd(Monster.mBOUNCER, this.x+56,this.y+16, 12, 999);
								this.aiCountDown=32<<4;
							}
							
							if (myWorld.worldAge%16==0) {
								if (getRandom(16)<8) monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset)>>4,(this.y+64)>>4,5,getRandom(2));
								else monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+displayW)>>4,(this.y+64)>>4,5,getRandom(2));
							}
							
							if (this.floatX>=this.xIncrease) {
								this.floatX=this.xIncrease;
								this.aiState=5;
								this.xSpeed=0;
								this.ySpeed=0;
							}
						break;
						
						case 5: // fly up out of the screen
							this.ySpeed-=16;
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							this.y=this.floatY>>4;
							if (this.y<=-256) {
								this.x=getRandom(displayW-128)+myWorld.worldOffset;
								this.x=(this.targetX+(displayW>>1)-64);
								this.aiState=6;
								this.aiCountDown=3;
								this.ySpeed=16;
							}
							
						break;
						
						
						case 6: // quick drop, and leave a oildrum when moving back up
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							if (this.ySpeed<128) this.ySpeed+=16;
							this.y=this.floatY>>4;
							if (this.y>=this.targetY-64) {
								this.y=this.targetY-64;
								this.floatY=this.y<<4;
								this.ySpeed=-32;
								this.aiCountDown--;
								if (this.aiCountDown==0) {
									this.aiCountDown=24<<4;
									this.aiState=7;
									monsterAdd(Monster.mDRUM, this.x+56,this.y+16, 12, 999);
								}
							}
						break;
						
						case 7: // very short delay (blow-im up now!)
							if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
							else {
								this.aiState=8;
								this.aiCountDown=16<<4;
							}
						break;
						
						case 8: // fly up out of the screen
							this.ySpeed-=16;
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							this.y=this.floatY>>4;
							if (this.y<=-128) {
								this.x=getRandom(displayW-128)+myWorld.worldOffset;
								this.x=(this.targetX+(displayW>>1)-64);
								this.aiState=1;
								this.aiCountDown=3;
								this.ySpeed=16;
							}
							
							if (myWorld.worldAge%16==0) {
								if (getRandom(16)<8) monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset)>>4,(this.y+64)>>4,5,getRandom(2));
								else monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+displayW)>>4,(this.y+64)>>4,5,getRandom(2));
							}
						break;						
							
						case 900:
							if (this.xSpeed<48) this.xSpeed+=16;
							this.floatX+=this.xSpeed;
							this.doGravity(myWorld);
							
							if (myWorld.worldAge%3==0) this.doExplodeSound=true;
							
							if (this.onGround) {
								this.aiState=901;
								this.aiCountDown=16;
								this.visible=false;
								// spawn some debri
								for (var i=12; --i>=0;) {
									fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fDEBRI,0);
								}
							}
							
						break;
						
						
						case 901: // top flies off
							if (this.aiCountDown>0) this.aiCountDown--;
							else {
								this.died=true;
							}
							
							if (myWorld.worldAge%3==0) this.doExplodeSound=true;
							
							bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBIGFLAME, this.x+getRandom(this.w), this.y, 0);
							
							fxAdd(this.x+3+getRandom(this.w),this.y+getRandom(this.h),FX.fDEBRI,0);
							
							fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h)-16,FX.fSMALLEXPLODE,0);
							fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h)-8,FX.fHUGEEXPLODE,0);
						break;
					}
					
					
					if (this.animDelay>0) this.animDelay-=16>>myWorld.slowMoFactor;
					else {
						//if (ySpeed<=0) {
							bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBIGFLAME, this.x+getRandom(16), this.y+48, 999);
							bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBIGFLAME, this.x+93+getRandom(16), this.y+48, 999);
						//}
						this.animDelay=4<<4;
					}
					
					this.rotation=this.xSpeed>>2;
					
					if (this.wasHit>0) {
						this.rotation+=getRandom(this.wasHit)-(this.wasHit>>1);
						this.wasHit--;
					}
					
					// floor close by? cause some dust
					if (this.y>16) {
						tx=(this.x>>4)+2;
						ty=this.targetY>>4;
	
						fxAdd( ( (tx+getRandom(8))-2)<<4, (ty<<4)-(getRandom(8)), FX.fSMOKETRAIL, getRandom(3)-1);
					}
				break;
				
				
				
					case Monster.mBOSS5:
						
						if (this.aiState>0 && this.aiState<900) {
							myWorld.lockScreen=this.targetX;
							
							fxAdd(  this.x+getRandom(this.w), this.y+this.h-(getRandom(8)), FX.fSMOKETRAIL, getRandom(3)-1);
							fxAdd(  this.x+getRandom(this.w), this.y+this.h-(getRandom(8)), FX.fDEBRI, 0);
							
							// beacon works in max of 64, so scale our energy to fit that energy bar
							myPlayer.beacon=this.energy>>1;
							myPlayer.showBeacon=true;
						}
						
						
						
						switch (this.aiState) {
							case 0:	 // waiting for player
								if (this.x<myWorld.worldOffset+displayW) {
									this.targetX=(this.x-displayW)+this.w;
									this.aiState=1;
									this.aiCountDown=48<<4;
								}
							break;
							
							
							case 1: // idle anim
								if (this.animDelay>0) this.animDelay-=16>>myWorld.slowMoFactor;
								else {
									this.animDelay=3<<4;
									if (this.xOffset==0) this.xOffset=128;
									else this.xOffset=0;
								}
							

								if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
								else {
									// shoot a worm
									this.aiState=2;
									this.aiCountDown=16<<4;
								}
							break;
							
							case 2: // short delay before shooting
								if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
								else {
									// shoot a worm
									this.aiState=3;
									this.aiCountDown=16<<4;
									this.xOffset=0;
									this.yOffset=112;
									this.doShoot=true;
									bulletAdd(Bullets.OWNER_ANYONE, Bullets.bMEGAWORM, this.x,this.y+55, 0);
								}
							break;
							
							case 3:
								if (this.wasHit>0) {
									this.xOffset=128;
									this.wasHit--;
								} else {
									this.xOffset=0;
								}	
								
								if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
								else {
									this.aiState=4;
									this.aiCountDown=48<<4;
								}
							break;
							
							
							case 4: // short break for player to shoot us
								if (myWorld.worldAge%8==0) {
									monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+displayW)>>4,(this.y+64)>>4,5,getRandom(2));
								}
								
								if (this.wasHit>0) {
									this.xOffset=128;
									this.wasHit--;
								} else {
									this.xOffset=0;
								}	
								
								if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
								else {
									this.wasHit=0;
									this.aiState=1;
									this.aiCountDown=32<<4;
									this.xOffset=0;
									this.yOffset=0;
								}
							break;
							
							
							case 900:// move out of screen
								fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fBIGEXPLODE,0);
								fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fSMALLEXPLODE,0);

								this.aiState=901;
								this.aiCountDown=16;
							break;
							
							case 901:
								if (this.aiCountDown>0) {
									this.aiCountDown--;
									fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fSMALLEXPLODE,0);
									fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fHUGEEXPLODE,0);
									if (myWorld.worldAge%4==0) this.doExplodeSound=true;
								} else {
									this.aiState=902;
									this.aiCountDown=24;
									this.visible=false;
								}
							break;
							
							case 902:
								if (this.aiCountDown>0) {
									this.aiCountDown--;
									for (var i=4; --i>=0;) {
										fxAdd(this.x+getRandom(64)-8,this.y+getRandom(this.h),FX.fDEBRI,0);
									}
									if (myWorld.worldAge%4==0) this.doExplodeSound=true;
								} else {
									this.died=true;
								}
							break;
							
						}
					

						if (this.energy<16) fxAdd( this.x+getRandom(this.w), this.y+(getRandom(this.h)), FX.fSMOKETRAIL, getRandom(3)-1);
						else if (this.energy<64 && myWorld.worldAge%8==0) fxAdd( this.x+getRandom(this.w), this.y+(getRandom(this.h)), FX.fSMOKETRAIL, getRandom(3)-1);
						
						
						
						// block players
						if (myPlayer.x+12>this.x) { 
							myPlayer.x=this.x-14;
							if (myPlayer.xSpeed>-24) myPlayer.xSpeed=-24;
						}
						
						if (myPlayer2.x+12>this.x) { 
							myPlayer2.x=this.x-14;
							if (myPlayer2.xSpeed>-24)myPlayer2.xSpeed=-24;
						}
						
					break;

					
					case Monster.mBOSS6:
						this.renderPass=0;

						if (this.aiState>0 && this.aiState<902) {
							myWorld.lockScreen=this.targetX;
							
//							if (myWorld.worldAge%4==0) this.doMoveSound=true;
							
							// beacon works in max of 64, so scale our energy to fit that energy bar
							myPlayer.beacon=this.energy>>1;
							myPlayer.showBeacon=true;
						}
						
						
						switch (this.aiState) {
							case 0:	 // waiting to be on screen
								if (this.x<myWorld.worldOffset+displayW) {
									this.targetX=this.x+(this.w>>1)-(displayW>>1); //112;
									//x=(targetX+(displayW>>1)-45);
									this.floatX=this.x<<4;

									this.ySpeed=-96;
									//yIncrease=-16;
									this.targetY=-16<<4;
									this.aiState=1;
									this.aiCountDown=48<<4;
									this.xSpeed=0;
									
									this.doLandSound=true;
								}
							break;							
							
							case 1: // get up
								this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
								
								if (this.floatY<=this.targetY && this.ySpeed<96) this.ySpeed+=16;
								
								//if (yIncrease>0 && ySpeed<96) ySpeed+=yIncrease;
								//else if (yIncrease<0 && ySpeed>-96) ySpeed+=yIncrease;
								
								this.y=this.floatY>>4;
									
								if (this.floatY>=this.targetY && this.ySpeed>=0) {
								//if (aiCountDown>0) aiCountDown-=16>>myWorld.slowMoFactor;
								//else {
									this.aiState=2;
									this.ySpeed=-96;
									this.aiCountDown=0;
								}
							break;
							
							case 2: // move fingers onto the screen
								this.aiCountDown++;

								if (this.aiCountDown>22) {
									this.myParts[0]=2;
									this.myParts[5]=2;
									myWorld.worldShake=2;
									this.doMoveSound=true;
								} else if (this.aiCountDown>20) {
									this.myParts[0]=1;
									this.myParts[5]=1;
								} else if (this.aiCountDown>18) {
									this.myParts[1]=2;
									this.myParts[4]=2;
									myWorld.worldShake=2;
									this.doMoveSound=true;
								} else if (this.aiCountDown>16) {
									this.myParts[1]=1;
									this.myParts[4]=1;
								} else if (this.aiCountDown>10) {
									this.myParts[2]=2;
									this.myParts[3]=2;
									myWorld.worldShake=2;
									this.doMoveSound=true;
								} else if (this.aiCountDown>8) {
									this.myParts[2]=1;
									this.myParts[3]=1;
								}
								
							 
								if (this.aiCountDown>32) {
									this.aiState=3;
									this.aiCountDown=80<<4;
									myWorld.worldShake=16;
								}

							break;
							
							case 3: // look left / right
								if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
								else {
									if (tmpPlayer.x<this.x+45) this.myDirection=-1;
									else this.myDirection=1;
									this.aiCountDown=128<<4;
									myWorld.worldShake=16;
								}
								
								// spawn soldiers now and then
								if (myWorld.worldAge%80==0) {
									monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+getRandom(displayW))>>4,(myWorld.worldOffsetY-32)>>4,5,5);
								}
								
								
								if (this.aiCountDown>64<<4 && this.aiCountDown%16==0) {
									if (this.myDirection>0) {
										bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBIGFLAMESKULL, this.x+76, this.y+46, this.myDirection<<3);
										bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBIGFLAMESKULL, this.x+59, this.y+40, this.myDirection<<3);
										this.doShoot=true;
									} else {
										bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBIGFLAMESKULL, this.x+3, this.y+43, this.myDirection<<3);
										bulletAdd(Bullets.OWNER_MONSTER, Bullets.bBIGFLAMESKULL, this.x+22, this.y+46, this.myDirection<<3);
										this.doShoot=true;
									}
								}
									
								
								// restore fingers slowly
								if (myWorld.worldAge%200==0) {
									for (var i=5; i>=0; i--) {
										if (this.myParts[i]>2) {
											this.myParts[i]--;
											if (this.myParts[i]==2) this.doMoveSound=true;
										}
									}
								}
								
								if (this.myParts[0]>7 && this.myParts[1]>7 && this.myParts[2]>7 && this.myParts[3]>7 && this.myParts[4]>7 && this.myParts[5]>7) {
									this.aiState=4;
									this.ySpeed=-64;
									for (var i=5; i>=0; i--) this.myParts[i]=0;
									this.energy-=44;
									if (this.energy<=0) {
										this.energy=0;
										fxAdd(this.x+getRandom(this.w),this.y+55+getRandom(32),FX.fBIGEXPLODE,0);
										
										for (var i=5;--i>=0;) {
											monsterAdd(Monster.mCOIN,this.x+getRandom(this.w),this.y+getRandom(this.h),3,0);
										}
													
										this.ySpeed=-128;
										this.aiState=900;
									}
								}
							break;
							
							case 4: // sink
								myWorld.worldShake=16;
								this.doMoveSound=true;
								
								if (myWorld.worldAge%8==0) {
									monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+getRandom(displayW))>>4,(myWorld.worldOffsetY-32)>>4,5,5);
									
//									if (getRandom(16)<8) monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset)>>4,(this.y+64)>>4,5,5);
//									else monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+displayW)>>4,(this.y+64)>>4,5,5);
								}
								
								if (this.ySpeed<128) this.ySpeed+=8;
								this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
								this.y=this.floatY>>4;
								
								if (this.y>160) {
									this.aiState=5;
									this.aiCountDown=24<<4;
									this.targetY+=32<<4;
								}
							break;
							
							case 5: // delay / spawn soldiers
								if (myWorld.worldAge%8==0) {
									if (getRandom(16)<8) monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset)>>4,(y+64)>>4,5,5);
									else monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+displayW)>>4,(this.y+64)>>4,5,5);
								}
								
								if (this.aiCountDown>0) this.aiCountDown-=16>>myWorld.slowMoFactor;
								else {
									this.ySpeed=-96;
									//yIncrease=-16;
									this.aiState=1;
									this.aiCountDown=48<<4;
									this.doLandSound=true;
								}
							break;

							
							
							
							
							case 900:// move out of screen
								this.doMoveSound=true;
								myWorld.worldShake=48;
								fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fBIGEXPLODE,0);
								fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fSMALLEXPLODE,0);
								fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fHUGEEXPLODE,0);
								
								if (this.ySpeed<80) this.ySpeed+=8;
								this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
								this.y=this.floatY>>4;
								
								if (this.y>160) {
									this.aiState=901;
									this.aiCountDown=16;
									this.died=true;
									myPlayer.addScore(200);
									fxAdd(this.x+(this.w>>1)-16, this.y+this.h,FX.fPLUME,200);
								}
							break;
						}
						
						
						
						tx=(this.x-48)>>4;
						ty=(88>>4);
						myWorld.setTile(tx, ty, TileMap.cEMPTY);
						myWorld.setTile(tx+1, ty, TileMap.cEMPTY);
						myWorld.setTile(tx+2, ty, TileMap.cEMPTY);
						
						if (this.myParts[0]>1 && this.myParts[0]<8) myWorld.setTile(tx, ty, TileMap.cNOBULLETBLOCK);
						if (this.myParts[1]>1 && this.myParts[1]<8) myWorld.setTile(tx+1, ty, TileMap.cNOBULLETBLOCK);
						if (this.myParts[2]>1 && this.myParts[2]<8) myWorld.setTile(tx+2, ty, TileMap.cNOBULLETBLOCK);
						
						tx=(this.x+96)>>4;
						myWorld.setTile(tx, ty, TileMap.cEMPTY);
						myWorld.setTile(tx+1, ty, TileMap.cEMPTY);
						myWorld.setTile(tx+2, ty, TileMap.cEMPTY);
						if (this.myParts[3]>1 && this.myParts[3]<8) myWorld.setTile(tx, ty, TileMap.cNOBULLETBLOCK);
						if (this.myParts[4]>1 && this.myParts[4]<8) myWorld.setTile(tx+1, ty, TileMap.cNOBULLETBLOCK);
						if (this.myParts[5]>1 && this.myParts[5]<8) myWorld.setTile(tx+2, ty, TileMap.cNOBULLETBLOCK);

						
						if (this.myDirection>0) this.xOffset=93;
						else this.xOffset=0;
					
						if (this.wasHit>0) {
							this.wasHit--;
							this.yOffset=128;
						} else {
							this.yOffset=0;
						}

					break;
					
					
					// v1.3.0
					case Monster.mBOSS7:
						this.renderPass=0;
						if (this.wasHit>0) this.wasHit--;
						
						if (this.aiState>0 && this.aiState<900) {
							myWorld.lockScreen=this.targetX;

							fxAdd(  this.x+getRandom(this.w), (this.targetY>>4)+this.h-(16+(getRandom(8))), FX.fSMOKETRAIL, getRandom(3)-1);
							
							// beacon works in max of 64, so scale our energy to fit that energy bar
							myPlayer.beacon=this.energy>>1;
							myPlayer.showBeacon=true;
						}
						
						// bop a bit
						if (this.aiState>1 && this.aiState<900) {
							this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
							if (this.floatY<this.targetY-16 && this.ySpeed<16) this.ySpeed+=8;
							else if (this.floatY>this.targetY+16 && this.ySpeed>-16) this.ySpeed-=8;
							this.y=this.floatY>>4;
						}
						
						switch (this.aiState) {
							case 0:	 // waiting to be on screen
								if (this.x<myWorld.worldOffset+displayW-this.w) {
									this.targetX=(this.x-displayW)+this.w;
	
									//targetY=-16<<4;
									this.ySpeed=-48;
									this.aiState=1;
									this.aiCountDown=48<<4;
									this.xSpeed=0;
									
									this.doLandSound=true;
								}
							break;							
							
							case 1: // get up
								myWorld.worldShake=48;
								this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
								if (this.floatY<=this.targetY && this.ySpeed<96) this.ySpeed+=16;
								
								if (myWorld.worldAge%4==0) this.doMoveSound=true;
								this.y=this.floatY>>4;
									
								if (this.floatY>=this.targetY && this.ySpeed>=0) {
									this.aiState=2;
									this.fireDelay=4;

									// make top solid
									//myWorld.put((x+16)>>4, (y+29)>>4,5,1,1);
									
									this.ySpeed=0;
									this.aiCountDown=0;
								}
							break;
							
							
							
							case 2: // always bop a bit, and countdown before blowing steam
								if (this.aiCountDown>0) this.aiCountDown--;
								else {
									this.aiCountDown=48;
									if (this.myParts[0]>0) this.aiState=3;
									else this.aiState=5;
									this.doShoot=true;
								}
								
								// spawn soldiers (they also leave behind ammo you need)
								if (myWorld.worldAge%32==0) {
									monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+displayW)>>4,(this.y+78)>>4,5,getRandom(2));
								}
							break;
							
							case 3:
								if (this.aiCountDown>0) this.aiCountDown--;
								else {
									this.aiCountDown=96;
									if (this.myParts[1]>0) this.aiState=4;
									else this.aiState=2;
								}
								
								if (this.aiCountDown%3==0) {
									// blow some steam
									bulletAdd(Bullets.OWNER_MONSTER, Bullets.bSTEAM, this.x,this.y+82, 1);
								}
							break;
							
							
							// top gun
							case 4:
								if (this.aiCountDown>0) this.aiCountDown--;
								else {
									this.aiCountDown=48;
									if (this.myParts[1]>0) this.aiState=5;
									else this.aiState=3;
									this.doShoot=true;
								}
								// spawn soldiers (they also leave behind ammo you need)
								if (myWorld.worldAge%32==0) { 
									monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+displayW)>>4,(this.y+78)>>4,5,getRandom(2));
								}
							break;
							
							case 5:
								if (this.aiCountDown>0) this.aiCountDown--;
								else {
									this.aiCountDown=96;
									if (this.myParts[0]>0) this.aiState=2;
									else this.aiState=4;
								}
								
								if (this.aiCountDown%3==0) {
									// blow some steam
									bulletAdd(Bullets.OWNER_MONSTER, Bullets.bSTEAM, this.x+26,this.y+51, 1);
								}
							break;
							
							// glass window
							case 6:
								// spawn soldiers (they also leave behind ammo you need)
								if (myWorld.worldAge%24==0) {
									monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+displayW)>>4,(this.y+78)>>4,5,getRandom(2));
								}
							break;
							
							case 7:
								if (this.wasHit>0) this.xOffset=166;
								else this.xOffset=0;
								// spawn soldiers (they also leave behind ammo you need)
								if (myWorld.worldAge%24==0) {
									monsterAdd(Monster.mSOLDIER,(myWorld.worldOffset+displayW)>>4,(this.y+78)>>4,5,getRandom(2));
								}
							break;
							
							// sink!
							case 900:
								if (myWorld.worldAge%24==0) {
									this.rotation++;
									if (this.rotation>60) this.rotation=60;
								}
								if (this.ySpeed<48) this.ySpeed+=8;
							
								if (myWorld.worldAge%8==0) this.doExplodeSound=true;
								
								myWorld.worldShake=48;
								fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fBIGEXPLODE,0);
								fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fSMALLEXPLODE,0);
								fxAdd(this.x+getRandom(this.w),this.y+getRandom(this.h),FX.fHUGEEXPLODE,0);
								
								
								this.floatY+=this.ySpeed;
								this.y=this.floatY>>4;
								if (this.y>160) {
									myPlayer.addScore(200);
									fxAdd(this.x+(this.w>>1)-16, this.y+this.h,FX.fPLUME,200);
									this.died=true;
								}
							break;
						}
						
						
						// block players
						if (this.aiState>0 && this.aiState<900) {
							if (myPlayer.x+12>this.x+16) { 
								myPlayer.x=(this.x+16)-12;
								// v1.2.0
								myPlayer.floatX=myPlayer.x<<4;
								if (myPlayer.xSpeed>-24) myPlayer.xSpeed=-24;
							}
							
							if (myPlayer2.x+12>this.x+16) { 
								myPlayer2.x=(this.x+16)-12;
								// v1.2.0
								myPlayer.floatX=myPlayer.x<<4;
								if (myPlayer2.xSpeed>-24)myPlayer2.xSpeed=-24;
							}
						}						
					break;
					
					
			}

		}		
		
		this.checkOffWorld=function( myWorld,  displayW) {
			if (this.x<myWorld.worldOffset-64 || this.x>myWorld.worldOffset+displayW+64) this.died=true;
		}
		
		
		this.doGravity=function(myWorld) {
			var tx;
			var ty;
			
			this.onGround=false;
			
			this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
			
			if (this.ySpeed<240) this.ySpeed+=8>>myWorld.slowMoFactor;
			this.y=this.floatY>>4;
			if (this.y+this.h<0) return;
			
			if (this.y>160) {
				this.y=176;
				this.floatY=this.y<<4;
				
				this.died=true;
			}	
			
			
			if (this.ySpeed<0) {
				tx=(this.x+(this.w>>1))>>4;
				ty=this.y>>4;
				if (myWorld.isSolidBelow(tx, ty)) {
					this.y=(ty<<4)+16;
					this.floatY=this.y<<4;
				}
			} else {
				tx=(this.x+(this.w>>1))>>4;
				ty=(this.y+this.h)>>4;
				if (myWorld.isSolid(tx, ty)) {
					this.y=(ty<<4)-this.h;
					this.floatY=this.y<<4;
					
					if (this.ySpeed>64) {
						fxAdd(this.x+4,this.y+4,FX.fTWIRLLAND,0);
					} else if (this.ySpeed>8) {
						this.doLandSound=true;
					}
					
					this.ySpeed=0;
					this.onGround=true;

				}
			}

		}

		
		this.doHorizontal=function(myWorld, myPlayer) {
			var foundFloor=false;
			var tx;
			var tx2;
			var ty;
			var ty2;
			
			this.hitWall=false;
			this.atEdge=false;
			
			this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
			
			this.x=this.floatX>>4;
			if (this.xSpeed<0) {
				tx=(this.x>>4);
				ty=(this.y+2)>>4;			// y + height>>1  + ySpeed  - so check at middle of the body
				ty2=(this.y+this.h-2)>>4;

				if (this.onGround) {
					if (!myWorld.isSolid(tx,ty) && !myWorld.isSolid(tx-1,ty+1)) this.atEdge=true;
				}
				
				if (tx==0 || myWorld.isSolidBelow(tx, ty) || myWorld.isSolidBelow(tx, ty2)) {
					this.x=(tx<<4)+16;
					this.floatX=this.x<<4;
					this.hitWall=true;
				}
				
				// at a real ledge? (no ground below on the left
				if (this.onGround) {
					this.foundFloor=false;
					//tx--;
					while (tx>0 && ty<TileMap.MAPHEIGHT && !this.foundFloor) {
						if (myWorld.isSolid(tx, ty)) this.foundFloor=true;
						ty++;
					}
					
					if (!this.foundFloor && this.energy>0) {
						// check if player is near and onground, if so, we can try jumping!
						if (this.onGround && myPlayer.x>this.x-48 && myPlayer.onGround && myPlayer.y>=this.y && this.h<18) {
							fxAdd(this.x+4,this.y+4,FX.fTWIRLLAND,0);
							this.ySpeed=-64;
							this.xSpeed=-this.maxSpeed;
							this.onGround=false;
						} else {
							this.x=((tx)<<4)+16;
							this.floatX=this.x<<4;
							this.hitWall=true;
							this.atEdge=true;
						}
					}
				}

			} else {
				tx2=(this.x+this.w-2)>>4;
				tx=(this.x+16)>>4;
				ty=(this.y+2)>>4;			// y + height>>1  + ySpeed  - so check at middle of the body
				ty2=(this.y+this.h-2)>>4;
				
				if (this.onGround) {
					if (!myWorld.isSolid(tx2,ty) && !myWorld.isSolid(tx2+1,ty+1)) this.atEdge=true;
				}
				
				if (tx==TileMap.MAPWIDTH-1 || myWorld.isSolidBelow(tx, ty) || myWorld.isSolidBelow(tx, ty2) || myWorld.isSolidBelow(tx2, ty) || myWorld.isSolidBelow(tx2, ty2)) {
					this.x=(tx<<4)-16;
					this.floatX=this.x<<4;
					this.hitWall=true;
				}

				// at a real ledge? (no ground below on the left
				if (this.onGround) {
					this.foundFloor=false;
					//tx++;
					while (tx<TileMap.MAPWIDTH-1 && ty<TileMap.MAPHEIGHT && !this.foundFloor) {
						if (myWorld.isSolid(tx, ty)) this.foundFloor=true;
						ty++;
					}
					
					if (!this.foundFloor && this.energy>0) {
						// check if player is near and onground, if so, we can try jumping!
						if (this.onGround && myPlayer.x<this.x+64 && myPlayer.onGround && myPlayer.y>=this.y && this.h<18) {
							fxAdd(this.x+4,this.y+4,FX.fTWIRLLAND,0);
							this.ySpeed=-64;
							this.xSpeed=this.maxSpeed;
							this.onGround=false;
						} else {
							this.x=((tx)<<4)-16;
							this.floatX=this.x<<4;
							this.hitWall=true;
							this.atEdge=true;
						}
					}
				}
			}
			
		}
		
		
		this.checkHitPlayer=function( playerX, playerY) {
			if (playerX+12>=this.x && playerX<=this.x+this.w && playerY+12>=this.y && playerY<=this.y+this.h) return true;
			return false;
		}


		this.hitByBullet=function(myBullet, myWorld, myPlayer) {
			var preenergy;
			var tx;
			
			if (myBullet.myType==Bullets.bRAINDROP) return true;
			
			switch (this.myType) {
				case Monster.mSOLDIER:
					if (this.aiState>=900 || myBullet.myType==Bullets.bSWITCH) return false;
					
					this.energy-=myBullet.energy;
					if (this.energy<=0) {
						this.doExplodeSound=true;
						
						if (myBullet.xSpeed<0) {
							if (this.myDirection<0) this.xOffset=(6*Monster.DUDEWIDTH);
							else this.xOffset=(5*Monster.DUDEWIDTH);
							this.xSpeed=-32;
							
							for (var i=4; --i>=0;) {
								fxAdd(this.x+16,myBullet.y,FX.fPARTICLE,1);
							}
							
						} else {
							if (this.myDirection<0) this.xOffset=(5*Monster.DUDEWIDTH);
							else this.xOffset=(6*Monster.DUDEWIDTH);
							this.xSpeed=32;
	
							for (var i=4; --i>=0;) {
								fxAdd(this.x,myBullet.y,FX.fPARTICLE,-1);
							}
						}
						
						fxAdd(this.x,this.y,FX.fBIGEXPLODE,0);
						
						fxAdd(this.x-8,this.y-16,FX.fZING,1);
						
						monsterAdd(Monster.mCOIN,this.x,this.y,3,0);
						
						this.ySpeed=-32;
						this.yIncrease=-24;
						
						if (this.aiState==0) this.doMoveSound=true;	// trigger the airdop achievement 
						
						this.aiState=900;
						
						myPlayer.addScore(5);
					}
					
					return true;
				

				case Monster.mTRIPOD:
					if (this.aiState>=900 || myBullet.myType==Bullets.bSWITCH || (myBullet.x<this.x+this.w-32 && myBullet.y>this.y+24 && myBullet.myType!=Bullets.bEXPLOSION)) return false;
					
					this.energy-=myBullet.energy;
					this.wasHit=4;
					
					if (this.energy<=0) {
						this.doExplodeSound=true;
						
						// go boom
						// leggs go up in smoke
						this.aiCountDown=3;

						for (var i=5;--i>=0;) {
							monsterAdd(Monster.mCOIN,this.x+getRandom(this.w),this.y+getRandom(this.h),3,0);
						}
						
						this.ySpeed=-32;
						this.aiState=900;
						
						myPlayer.addScore(25);
						fxAdd(this.x+(this.w>>1)-11, this.y+this.h,FX.fPLUME,25);
						
						if (myBullet.myType==Bullets.bEXPLOSION) myPlayer.addChain();
					}
					return true;
				
					
				case Monster.mJETPACK:
					if (this.aiState>=900 || myBullet.myType==Bullets.bSWITCH) return false;
					
					this.energy-=myBullet.energy;
					if (this.energy<=0) {
						this.doExplodeSound=true;
						if (myBullet.xSpeed<0) {
							if (this.myDirection<0) this.xOffset=(3*15);
							else this.xOffset=(2*15);
							this.xSpeed=-32;
							
							for (var i=4; --i>=0;) {
								fxAdd(this.x+16,myBullet.y,FX.fPARTICLE,1);
							}
							
						} else {
							if (this.myDirection<0) this.xOffset=(2*15);
							else this.xOffset=(3*15);
							this.xSpeed=32;
	
							for (var i=4; --i>=0;) {
								fxAdd(this.x,myBullet.y,FX.fPARTICLE,-1);
							}
						}
						
						fxAdd(this.x,this.y,FX.fBIGEXPLODE,0);
						
						monsterAdd(Monster.mCOIN,this.x,this.y,3,0);
						monsterAdd(Monster.mCOIN,this.x,this.y,3,0);
						
						this.ySpeed=-32;
						this.yIncrease=-24;
						this.aiState=900;
						
						myPlayer.addScore(10);
						fxAdd(this.x+(this.w>>1)-5, this.y+this.h,FX.fPLUME,10);
					}
					
					return true;	
				
				
				case Monster.mMINE:
					if (myBullet.myType!=Bullets.bEXPLOSION) return false;
					this.energy-=myBullet.energy;
					if (this.energy<=0) {
						this.energy=0;
						this.aiState=2;
						this.aiCountDown=8<<4;
						this.doMoveSound=true;
						if (myBullet.myType==Bullets.bEXPLOSION) myPlayer.addChain();
					}
					return true;
					
				case Monster.mBALLUP:
					if (myBullet.myType==Bullets.bSWITCH) return false;
					
					if (myBullet.bOwner!=Bullets.OWNER_PLAYER && myBullet.bOwner!=Bullets.OWNER_PLAYER2 && myBullet.bOwner!=Bullets.OWNER_ANYONE) return false;
					this.energy--;

					fxAdd(this.x+getRandom(8),this.y+getRandom(8),FX.fDEBRI,0);
					fxAdd(this.x+getRandom(8),this.y+getRandom(8),FX.fDEBRI,0);
					
					fxAdd(this.x+getRandom(8),this.y+getRandom(8),FX.fBIGEXPLODE,0);
					
					if (this.energy<=0) {
						this.aiState=900;
						myPlayer.addScore(5);
					}
					return true;

					
				case Monster.mDROPSHIP:
					if (this.aiState<1 || this.aiState>9) return false;
					
					this.energy-=myBullet.energy;
					if (this.energy<=0) {
						this.doExplodeSound=true;
						this.aiState=900;
						this.aiCountDown=48; //128;
						this.ySpeed=0;
						
						myPlayer.addScore(55);
						fxAdd(this.x+(this.w>>1)-11, this.y+this.h,FX.fPLUME,55);
						
						if (myBullet.myType==Bullets.bEXPLOSION) myPlayer.addChain();
					}
					return true;
					
					
				case Monster.mGUNNER:
					if (this.aiState==0 || this.aiState>=900 || myBullet.myType==Bullets.bSWITCH) return false;
					
					this.energy-=myBullet.energy;
					if (this.energy<=0) {
						this.doExplodeSound=true;
						
						if (myBullet.xSpeed<0) {
							if (this.myDirection<0) this.xOffset=(3*Monster.DUDEWIDTH);
							else this.xOffset=(2*Monster.DUDEWIDTH);
							this.xSpeed=-32;
							
							for (var i=4; --i>=0;) {
								fxAdd(this.x+16,myBullet.y,FX.fPARTICLE,1);
							}
							
						} else {
							if (this.myDirection<0) this.xOffset=(2*Monster.DUDEWIDTH);
							else this.xOffset=(3*Monster.DUDEWIDTH);
							this.xSpeed=32;
	
							for (var i=4; --i>=0;) {
								fxAdd(this.x,myBullet.y,FX.fPARTICLE,-1);
							}
						}
						
						fxAdd(this.x,this.y,FX.fBIGEXPLODE,0);
						
						monsterAdd(Monster.mCOIN,this.x,this.y,3,0);
						monsterAdd(Monster.mCOIN,this.x,this.y,3,0);
						
						fxAdd(this.x-8,this.y-16,FX.fZING,1);
						
						this.ySpeed=-32;
						this.yIncrease=-24;
						this.aiState=900;
					}
					
					return true;	
					
					
				case Monster.mCRATE:
					if (myBullet.myType==Bullets.bSWITCH) return false;
					// top of crate not hittable (so we can do cover)
					// v1.2.0
					if (myBullet.y<this.y+6 && myPlayer.inCover && (myBullet.bOwner==Bullets.OWNER_PLAYER || myBullet.bOwner==Bullets.OWNER_PLAYER2) ) return false;
					if (this.subType<=-99) return true;
					
					if (this.subType<0) {
						if (myBullet.bOwner!=Bullets.OWNER_PLAYER && myBullet.bOwner!=Bullets.OWNER_PLAYER2) return true;
						this.energy--;

						fxAdd(this.x+getRandom(8),this.y+getRandom(8),FX.fDEBRI,0);
						fxAdd(this.x+getRandom(8),this.y+getRandom(8),FX.fDEBRI,0);
						
						if (this.energy<=0) {
							this.aiState=900;
						}
					} else {
						// v1.2.0
						if (myBullet.bOwner!=Bullets.OWNER_PLAYER && myBullet.bOwner!=Bullets.OWNER_PLAYER2) return true;
						this.aiCountDown--;
						if (this.aiCountDown<=0) {
							this.xOffset+=16;
							this.aiCountDown=0;
							
							fxAdd(this.x+getRandom(8),this.y+getRandom(8),FX.fDEBRI,0);
							fxAdd(this.x+getRandom(8),this.y+getRandom(8),FX.fDEBRI,0);
	
							if (this.xOffset>64) {
								this.aiState=900;
							}
						}
					}
					return true;
				
					
				case Monster.mBUILDING:
					if (this.subType!=0 || this.aiState>800 || myBullet.myType!=Bullets.bBUILDINGDESTROY) return false;
					
					this.aiState=900;
					
					return true;
				
					
				case Monster.mDOOR:
					if (this.aiCountDown>0 || myBullet.myType!=Bullets.bSWITCH) return false;
					this.aiState=1-this.aiState;
					this.aiCountDown=8;
				break;
				
				case Monster.mBOUNCER:
					this.energy-=myBullet.energy;
					if (myBullet.xSpeed<0) this.xSpeed=32;
					else this.xSpeed=-32;
					this.aiState=1;

					if (this.energy<=0) {
						this.energy=0;
						this.aiCountDown=8;
						this.aiState=2;
						fxAdd(this.x,this.y,FX.fBIGEXPLODE,0);
						
						if (myBullet.myType==Bullets.bEXPLOSION) myPlayer.addChain();
					}
					return true;
					
					
				case Monster.mTANK:
					if (this.aiState>=10) return false;
					
					this.energy-=myBullet.energy;

					if (this.energy<=0) {
						this.energy=0;
						this.aiCountDown=8;
						if (this.aiState<10) { 
							this.aiState=900;
							myPlayer.addScore(50);
							fxAdd(this.x+(this.w>>1)-5, this.y+this.h,FX.fPLUME,15);
						}
						fxAdd(this.x,this.y,FX.fBIGEXPLODE,0);
						if (myBullet.myType==Bullets.bEXPLOSION) myPlayer.addChain();
					}
					return true;
					
				case Monster.mDRUM:
					if (myBullet.myType==Bullets.bSWITCH || this.aiState>0) return false;
					// top of crate not hittable (so we can do cover)
					if (myBullet.y<this.y+2 && myBullet.myType!=Bullets.bEXPLOSION) return false;
					
					this.energy--;
					if (this.energy<=0) {
						myWorld.setTile(this.x>>4, this.y>>4, TileMap.cEMPTY);
						this.aiState=1;
						this.doMoveSound=true;
						this.doExplodeSound=true;
						this.xSpeed=(getRandom(3)-1)<<5;
						this.ySpeed=-160;
						fxAdd(this.x-8,this.y+getRandom(this.h),FX.fHUGEEXPLODE,0);
						
						if (myBullet.myType==Bullets.bEXPLOSION) myPlayer.addChain();
					}
					return true;
					
					
				case Monster.mWORM:
					// always get hit, do specific checking cause we are much bigger then we seem
					if (myBullet.bOwner>Bullets.OWNER_PLAYER2) return false;
					if (myBullet.x>this.x+this.w || myBullet.x+myBullet.w<this.x) return false;
					if (myBullet.y>this.y+128 || myBullet.y+myBullet.h<this.y) return false;
					if (myBullet.myType==Bullets.bSWITCH || this.aiState>=900) return false;
					
					// make sure this bullet gets obsorbed 
					myBullet.died=true;
					this.energy-=8;
					
					if (this.energy<=0) {
						this.aiState=900;
						this.aiCountDown=4<<4;
						this.doExplodeSound=true;
						fxAdd(this.x-8,this.y+getRandom(this.h),FX.fHUGEEXPLODE,0);
						
						myPlayer.addScore(200);
						
						if (myBullet.myType==Bullets.bEXPLOSION) myPlayer.addChain();
					}
					return true;
					
				case Monster.mFIREBALL:
					if (myBullet.myType==Bullets.bSWITCH) return false;
					
					this.energy-=myBullet.energy;
					if (this.energy<=0) {
						this.doExplodeSound=true;
						
						fxAdd(this.x,this.y,FX.fBIGEXPLODE,0);
						monsterAdd(Monster.mCOIN,this.x,this.y,3,0);
						this.died=true;
						this.aiState=999;
						
						myPlayer.addScore(10);
						fxAdd(this.x+(this.w>>1)-5, this.y+this.h,FX.fPLUME,10);
					}
					
					return true;					
					
				// v1.3.0
				case Monster.mCHICKEN:
					// always get hit, do specific checking cause we are much bigger then we seem
					if (myBullet.y>this.y+128 || myBullet.y+myBullet.h<this.y) return false;
					if (myBullet.myType==Bullets.bSWITCH || this.aiState>=900) return false;
					
					
					
					if (myBullet.x<=this.x+this.w && myBullet.x+myBullet.w>=this.x && myBullet.y<=this.y+this.h && myBullet.y+myBullet.h>=this.y ) {
						// chicken dies
						this.energy--;
						fxAdd(this.x+getRandom(12)-2, this.y+getRandom(12)-4, FX.fDEBRI, 5);
						
						// scatter/flee?
						if (this.aiState==0) {
							this.aiState=2;
							this.aiCountDown=48+getRandom(64);
							this.ySpeed=-48;
	
							if (myBullet.x<this.x) {
								this.myDirection=1;
								this.xSpeed=32;
								this.yOffset=165;
							} else {
								this.myDirection=-1;
								this.xSpeed=-32;
								this.yOffset=175;
							}
						}
						
						if (this.energy<=0) {
							this.died=true;
							this.aiState=900;
							for (var i=4; --i>=0;) {
								fxAdd(this.x+getRandom(12)-2, this.y+getRandom(12)-4, FX.fDEBRI, 5);
							}
						}
						return true;
					}
					
				break;
					
				
				case Monster.mBOSS1:
					if (this.aiState>=900 || myBullet.myType==Bullets.bSWITCH) return false;
					
					this.energy-=myBullet.energy;
					
					if (this.energy<=0) {
						this.doExplodeSound=true;

						for (var i=5;--i>=0;) {
							monsterAdd(Monster.mCOIN,this.x+getRandom(this.w),this.y+getRandom(this.h),3,0);
						}
						
						this.ySpeed=-32;
						this.aiState=900;
						this.aiCountDown=3;
						
						myPlayer.addScore(100);
						fxAdd(this.x+(this.w>>1)-16, this.y+this.h,FX.fPLUME,100);
					}
					return true;
					
					
					
				case Monster.mBOSS2:
					if (this.aiState>=900 || myBullet.myType==Bullets.bSWITCH) return false;
					
					if (myBullet.y<this.y+92 || myBullet.x>this.x+30)	{
						this.energy-=myBullet.energy;
						// extra decrease, to make it easier
						if (myWorld.worldAge%5==0) this.energy--;
					} else {
						return false;
					}
					
					this.wasHit=1;
					
					if (this.energy<=0) {
						this.energy=0;
						
						//if (this.aiState<3) {
							this.doExplodeSound=true;
	
							for (var i=5;--i>=0;) {
								monsterAdd(Monster.mCOIN,this.x+getRandom(this.w),this.y+getRandom(this.h),3,0);
							}
							
							fxAdd(this.x+72,this.y+33,FX.fDEBRI,2);
							
							this.aiState=900;
							this.aiCountDown=3;
							myPlayer.addScore(200);
							fxAdd(this.x+(this.w>>1)-16, this.y+this.h,FX.fPLUME,200);
						//}
					}
					return true;
					
					
				case Monster.mBOSS3:
					if (this.aiState>=900 || myBullet.myType==Bullets.bSWITCH) return false;
					if (myBullet.y>this.y+26 || myBullet.x<this.x+44 || this.targetY>16) return false;
					this.preenergy=this.energy;

					this.wasHit=1;
					
					this.energy-=myBullet.energy;
					if (this.energy<64 && myWorld.worldAge%5==0) this.energy--;
					
					fxAdd(this.x+44,this.y,FX.fBIGEXPLODE,0);
					
					if (this.preenergy>=64 && this.energy<64) {
						fxAdd(this.x+43,this.y,FX.fDEBRI,3);
						fxAdd(this.x+43+getRandom(16),this.y,FX.fHUGEEXPLODE,0);
						this.doExplodeSound=true;
					}
					
					
					if (this.energy<=0) {
						this.energy=0;
						
						this.doExplodeSound=true;

						for (var i=5;--i>=0;) {
							monsterAdd(Monster.mCOIN,this.x+getRandom(this.w),this.y+getRandom(this.h),3,0);
						}
						
						this.aiState=900;
						this.aiCountDown=3;
						myPlayer.addScore(200);
						fxAdd(this.x+(this.w>>1)-16, this.y+this.h,FX.fPLUME,200);
					}
					return true;
					
				case Monster.mBOSS4:
					if (this.aiState>=900 || myBullet.myType==Bullets.bSWITCH || myBullet.y>this.y+44) return false;
					this.energy-=myBullet.energy;
					
					if (myBullet.myType==Bullets.bEXPLOSION) {
						fxAdd(this.x+getRandom(this.w)-16,this.y+32,FX.fHUGEEXPLODE,0);
						// small cheat, make sure this explosion hits us only once
						myBullet.died=true;
						myWorld.worldShake=16;
						this.doExplodeSound=true;
						this.wasHit=myBullet.energy;
						
						// spawn some debri
						for (var i=12; --i>=0;) {
							fxAdd(this.x+getRandom(this.w)-8,this.y+getRandom(this.h),FX.fDEBRI,0);
						}
						
						this.aiCountDown=16<<4;
						this.aiState=7;
						
					} else fxAdd(this.x+getRandom(this.w),this.y+32,FX.fBIGEXPLODE,0);
					
					if (this.energy<=0) {
						this.energy=0;
						for (var i=5;--i>=0;) {
							monsterAdd(Monster.mCOIN,this.x+getRandom(this.w),this.y+getRandom(this.h),3,0);
						}
												
						this.aiState=900;
						myPlayer.addScore(200);
						fxAdd(this.x+(this.w>>1)-16, this.y+this.h,FX.fPLUME,200);
					}
					return true;

					
				case Monster.mBOSS5:
					if (this.aiState!=4 || myBullet.y<this.y+55 || myBullet.y>this.y+102 | myBullet.x<this.x+18) return false;
					this.energy-=myBullet.energy;
					
					fxAdd(this.x+getRandom(this.w),this.y+55+getRandom(32),FX.fBIGEXPLODE,0);
					
					this.wasHit=1;
					
					if (this.energy<=0) {
						this.energy=0;
						for (var i=5;--i>=0;) {
							monsterAdd(Monster.mCOIN,this.x+getRandom(this.w),this.y+getRandom(this.h),3,0);
						}
												
						this.aiState=900;
						myPlayer.addScore(200);
						fxAdd(this.x+(this.w>>1)-16, this.y+this.h,FX.fPLUME,200);
					}
					return true;
					
					
				case Monster.mBOSS6:
					// we always get hit, so need to do specific checking
					//if (this.energy>100) {
						
						if (myBullet.y<80) return false;
						tx=this.x-64;
						if (myBullet.x>=tx && myBullet.x<tx+64) {
							// left hand
							if (myBullet.x<=tx+13 && this.myParts[0]>1 && this.myParts[0]<8) {
								this.myParts[0]++;
								this.wasHit=1;
								return true;
							} else if (myBullet.x<=tx+26 && this.myParts[1]>1 && this.myParts[1]<8) {
								this.myParts[1]++;
								this.wasHit=1;
								return true;
							} else if (myBullet.x<=tx+39 && this.myParts[2]>1 && this.myParts[2]<8) {
								this.myParts[2]++;
								this.wasHit=1;
								return true;
							}
						}
						
						tx=this.x+80;
						if (myBullet.x>=tx && myBullet.x<tx+64) {
							// right hand
							if (myBullet.x<=tx+13 && this.myParts[3]>1 && this.myParts[3]<8) {
								this.myParts[3]++;
								this.wasHit=1;
								return true;
							} else if (myBullet.x<=tx+26 && this.myParts[4]>1 && this.myParts[4]<8) {
								this.myParts[4]++;
								this.wasHit=1;
								return true;
							} else if (myBullet.x<=tx+39 && this.myParts[5]>1 && this.myParts[5]<8) {
								this.myParts[5]++;
								this.wasHit=1;
								return true;
							}
						}
					//}
					
					return false;
					
					
					
					// v1.3.0
					case Monster.mBOSS7:
						if (this.aiState<6) {
							if (myBullet.y>this.y+72 && myBullet.y<this.y+98 && this.myParts[0]>0) {
								this.preenergy=this.energy;
	
								this.wasHit=2;
								this.animIncrease=0;
								
								this.energy-=myBullet.energy;
								fxAdd(this.x+getRandom(16),this.y+82,FX.fBIGEXPLODE,0);
								
								this.myParts[0]-=myBullet.energy;
								
								if (this.myParts[0]<=0) {
									fxAdd(this.x,this.y+82,FX.fDEBRI,6);
									fxAdd(this.x+getRandom(16),this.y+82,FX.fHUGEEXPLODE,0);
									this.doExplodeSound=true;
									this.aiCountDown=24;
									
									if (this.myParts[1]==0) this.aiState=6;
								}
								return true;
							}
							
							if (myBullet.y>this.y+51 && myBullet.y<this.y+62 && myBullet.x>this.x+29 && this.myParts[1]>0) {
								this.preenergy=this.energy;
	
								this.wasHit=2;
								this.animIncrease=1;
								
								this.energy-=myBullet.energy;
								this.myParts[1]-=myBullet.energy;
								fxAdd(this.x+26+getRandom(16),this.y+51,FX.fBIGEXPLODE,0);
								
								if (this.myParts[1]<=0) {
									fxAdd(this.x+26,this.y+51,FX.fDEBRI,6);
									fxAdd(this.x+26+getRandom(16),this.y+51,FX.fHUGEEXPLODE,0);
									this.doExplodeSound=true;
									this.aiCountDown=24;
									if (this.myParts[0]==0) this.aiState=6;
								}
								return true;
							}
							return false;
						} else if (this.aiState<7) {
							if (myBullet.y<this.y+23 || myBullet.y>this.y+64 || myBullet.x<this.x+64) return false;
							
							this.preenergy=this.energy;

							this.wasHit=2;
							
							this.energy-=myBullet.energy;
							fxAdd(this.x+64+getRandom(40),this.y+23+getRandom(40),FX.fBIGEXPLODE,0);
							
							if (this.preenergy>=8 && this.energy<8) {
								for (var i=4; --i>=0;) {
									fxAdd(this.x+64,this.y+23,FX.fDEBRI,7);
								}
								
								fxAdd(this.x+70+getRandom(16),this.y+32,FX.fHUGEEXPLODE,0);
								this.doExplodeSound=true;
								this.aiState=7;
								this.aiCountDown=24;
							}
							return true;
						} else if (this.aiState>6) {
							this.energy-=myBullet.energy;
							fxAdd(this.x+64+getRandom(40),this.y+23+getRandom(40),FX.fBIGEXPLODE,0);
							if (this.energy<=0) {
								fxAdd(this.x+70+getRandom(16),this.y+32,FX.fHUGEEXPLODE,0);
								this.doExplodeSound=true;
								this.aiState=900;
								this.aiCountDown=24;
							}
							return true;
						}
							

						return false;
					
					
			}
			return false;
		}
		
		
		// wall stuff
		this.switchWall=function( on, myWorld) {
			var count=0;
			if (on) {
				if (this.subType<2) { // vertical
					count=this.startY;
					while (count<=this.targetY) {
						myWorld.setDoor(this.x>>4,count);
						count++;
					}
				} else { // horizontal
					count=this.startX;
					while (count<=this.targetX) {
						myWorld.setDoor(count,(this.y>>4));
						count++;
					}
				}
			} else {
				if (this.subType<2) { // verticall
					count=this.startY;
					while (count<=this.targetY) {
						myWorld.setEmpty(this.x>>4,count);
						//myWorld.setDoor(this.x>>4,count);
						count++;
					}
				} else { // horizontal
					count=this.startX;
					while (count<=this.targetX) {
						myWorld.setEmpty(count, (this.y>>4));
						//myWorld.setDoor(count,(this.y>>4));
						count++;
					}
				}
			}
		}

		
		// specific interaction code between monsters and players
		
		this.givePickup=function( myPlayer) {
			switch (this.subType) {
				case 0:	 // medikit
					myPlayer.addLife(32);
					myPlayer.doGrabSound=true;
				break;
				
				
				case 1: // ammo
					myPlayer.addAmmo(24);
					myPlayer.doGrabSound=true;
				break;
				
				
				case 2: // flamethrower
					myPlayer.setWeapon( 2 );
					myPlayer.doGrabSound=true;
				break;
				
				case 3: // electro
					myPlayer.setWeapon( 3 );
					myPlayer.doGrabSound=true;
				break;
				
				case 4: // jetpack
					myPlayer.setWeapon( 4 );
					myPlayer.doGrabSound=true;
				break;
				
				case 5: // grenadelauncher
					myPlayer.setWeapon( 6 );
					myPlayer.doGrabSound=true;
				break;
				
				case 6: // skullflame
					myPlayer.setWeapon( 7 );
					myPlayer.doGrabSound=true;
				break;
				
				case 7: // double-gun
					myPlayer.setWeapon( 8 );
					myPlayer.doGrabSound=true;
				break;
				
				// v1.3.0
				case 8 : // chicken gun
					myPlayer.setWeapon( 9 );
					myPlayer.doGrabSound=true;
				break;
				
			}
		}
		
		
		this.getFinger=function(id) {
			return this.myParts[id];
		}
		

}




	
