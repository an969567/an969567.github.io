function Player(myid) {

	Player.PL_WIDTH=12;
	Player.PL_HEIGHT=12;
	
	Player.i_FLAMETHROWER=1,
	Player.i_ELECTRO = 2,
	Player.i_JETPACK = 3,
	Player.i_GRENADES = 4,
	Player.i_SKULLGUN = 5,
	Player.i_DOUBLEGUN = 6,
	// v1.3.0
	Player.i_CHICKENGUN = 7,
	Player.i_ITEMS	= 8,		// everything before this is an "ITEM"
	
	Player.i_TANK = 9;		// oh baby you're mine!	
	
	this.id=myid;
	
	// location and movement
	this.floatX=0;
	this.floatY=0;
	this.x=0;
	this.y=0;
	this.xSpeed=0;
	this.ySpeed=0;
	this.maxSpeed=64;
	this.yIncrease=0;

	this.onGround=false;;
	this.onGroundCountdown=0;
	this.onElevato=false;
	this.onChute=false;
	this.onChopper=false;
	this.inCover=false;
	this.inTank=false;
	this.openMouth=0;
	
	this.noMoveCount=0;	// used to delay the acting on keypresses when level starts
	
	this.leftPressed=false;
	this.rightPressed=false;
	this.jumpPressed=false;
	this.jumpReleased=false;
	this.actionPressed=false;
	this.actionReleased=false;
	this.actionDelay=0;
	this.actionBlocked=0;
	
	this.blockPlayerMovement=false;
	
	// sounds
	this.doHitSound=false;
	this.doDieSound=false;
	this.doJumpSound=false;
	this.doLandSound=false;
	this.doShootSound=false;
	this.doGrabSound=false;
	
	this.atDoor=false;;
	this.inDoor=false;
	this.doorAlpha=0;
	this.doorAlphaTarget=0;
	this.doorTargetX=0;
	this.doorTargetY=0;
	this.doorTargetID=0;
	this.doorLoadRoom=false;
	
	this.score=0;
	this.distance=0;
	this.coins=0;
	
	this.killCount=0;
	this.coverKillCount=0;
	this.grenadeKillCount=0;
	this.chainKill=0;
	this.chainDelay=0;
	this.mechBallCount=0;
	this.crashCount=0;
	this.driveCount=0;
	this.wormCount=0;
	this.skullCount=0;
	this.hellTankCount=0;

	
	this.ammo=0;
	this.beacon=0;
	this.showBeacon=false;
	this.isBeacon=false;;
	this.lives=0;
	this.maxLives=0;
	this.maxAmmo=0;
	
	this.hasContinue=false;
	this.hasSpecialDrink=false;
	this.specialDrinkCounter=0;
	this.hasArmor=false;
	this.armorCounter=0;
	
	// visibility
	this.Frame=0;
	this.FrameDelay=0;
	this.FrameStep=0;
	this.MirrorFrame=0;
	this.myDirection=0;
	this.SpriteSet=0;
	

	// status, health, etc
	this.level=0;
	this.weapon=0;
	
	this.invincableCounter=0;
	this.hitCounter=0;
	this.diedCounter=0;
	this.Died=false;
	this.transport=false;
	this.Dropped=false;	// same animation as died, but without the died=true

	// status info box
	this.characterID=-1;
	this.stFaceY=0;
	this.stFaceDelay=0;
	this.stFaceYSpeed=0;
	this.stBoxY=0;
	this.stBoxYSpeed=0;
	this.stInfoID=0;
	this.stAlpha=0;
	
	
	this.gameReset=function() {
		this.maxLives=155000;
		this.maxAmmo=35000;
		this.weapon=3;
		this.inDoor=false;
		this.atDoor=false;
		this.doorLoadRoom=false;
		this.onChute=true;
		
		this.lives=this.maxLives;
		this.ammo=this.maxAmmo;
		
		this.hasArmor=true;
		
		this.Died=false;
		this.diedCounter=0;
		
		this.hasSpecialDrink=true;
		
		this.skullCount=3;
		this.hellTankCount=3;
	}
	
	
	this.resetForLevel=function() {
		this.killCount=0;
		this.mechBallCount=0;
		this.grenadeKillCount=0;
		this.coverKillCount=0;
		this.crashCount=0;
		this.chainKill=0;
		this.chainDelay=0;
		this.driveCount=0;
		this.wormCount=0;
		this.specialDrinkCounter=0;
	}	
	
	
	this.init=function( aX,  aY) {
		this.x=aX<<4;
		this.y=aY<<4;
		
		this.floatX=this.x<<4;
		this.floatY=this.y<<4;
		
		this.xSpeed=1;
		this.ySpeed=0;
		this.yIncrease=0;
		this.onGround=true;
		this.onElevator=false;
		this.onGroundCountdown=0;
		
		
		
		this.Frame=0;
		this.FrameDelay=0;
		if (this.x>240) {
			this.MirrorFrame=Player.PL_HEIGHT;
			this.myDirection=1;
		} else {
			this.MirrorFrame=0;
			this.myDirection=1;
		}
		
		
		this.invincableCounter=0;
		this.hitCounter=0;
		
		this.resetMovement();
		this.actionReleased=true;
		this.actionBlocked=0;
		
		this.doHitSound=false;
		this.doDieSound=false;
		this.doLandSound=false;
		this.doShootSound=false;
		this.doJumpSound=false;
		this.doGrabSound=false;
		
		this.blockPlayerMovement=false;
		this.transport=false;
		
		
		this.noMoveCount=8;
		
		this.actionDelay=0;
		this.Dropped=false;
		
		this.inDoor=false;
		this.atDoor=false;
		this.inTank=false;
		this.openMouth=0;
		
		this.doorAlpha=255;
		this.doorAlphaTarget=255;
		this.doorLoadRoom=false;
		
		this.beacon=-1;
		this.showBeacon=false;
		this.isBeacon=false;

		this.onChopper=false;
		
		this.setInfo(-1);
	}

	this.setInfo=function(nInfoID) {
		this.stInfoID=nInfoID;
		this.stFaceY=32;
		this.stFaceDelay=48;
		this.stFaceYSpeed=-4;
		this.stBoxY=48;
		this.stBoxYSpeed=-4;
		this.stAlpha=255;
	}


	this.die=function(myBullet) {

		if (this.invincableCounter>0 || this.Died) return;

		if (myBullet.xSpeed<0) fxAdd(this.x+getRandom(16), this.y+getRandom(16)-8, FX.fPARTICLE,-1);
		else fxAdd(this.x+getRandom(16), this.y+getRandom(16)-8, FX.fPARTICLE,1);

		
		if (this.armorCounter>0) {
			this.armorCounter-=myBullet.energy;
			if (this.armorCounter<=0) {
				this.armorCounter=0;
				fxAdd(this.x,this.y+4, FX.fDEBRI,0);
				fxAdd(this.x+8,this.y, FX.fDEBRI,0);
				this.hasArmor=false;
			}
		} else {
			this.lives-=myBullet.energy;
		}
		
		this.doHitSound=true;
		
		if (this.lives<1 && this.inTank) {
			this.lives=this.maxLives;
			this.inTank=false;
			this.setWeapon(1);
		}
		
		if (this.lives<0) {
			this.lives=0;
			this.initDie();

			// add some particles
			for (var i=10; --i>=0;) {
				if (myBullet.xSpeed<0) fxAdd(this.x+getRandom(16), this.y+getRandom(16)-8, FX.fPARTICLE,-1);
				else fxAdd(this.x+getRandom(16), this.y+getRandom(16)-8, FX.fPARTICLE,1);
			}
			
			if (this.myDirection>0) {
				if (myBullet.xSpeed<0) {
					this.Frame=(5*Player.PL_WIDTH);
					this.xSpeed=-64;
				} else {
					this.Frame=(6*Player.PL_WIDTH);
					this.xSpeed=64;
				}
			} else {
				if (myBullet.xSpeed>0) {
					this.Frame=(5*Player.PL_WIDTH);
					this.xSpeed=64;
				} else {
					this.Frame=(6*Player.PL_WIDTH);
					this.xSpeed=-64;
				}
			}


		}

	}

	
	this.setDieFrame=function() {
		this.Frame=(6*Player.PL_WIDTH);
		this.xSpeed=0;
	}
	
	
	this.initDie=function() {
		if (this.Died) return;
		this.Died=true;
		this.diedCounter=96;
		this.doDieSound=true;
		this.yIncrease=-64;
		this.ySpeed=-112;
		this.hasSpecialDrink=false;
	}


	
	
	
	this.teleport=function() {
		if (this.transport) return;
		this.transport=true;
	}
	
	
	this.resetMovement=function() {
		this.leftPressed=false;
		this.rightPressed=false;
		this.jumpPressed=false;
		this.actionPressed=false;
		this.jumpReleased=true;
	}

	
	this.addScore=function(value) {
		this.score+=value;
	}
	
	
	this.addCoin=function( value) {
		this.coins+=value;
	}
	
	this.setWeapon=function(weaponID) {
		
		// init amount of ammo
		switch (weaponID) {
			case 1:
				this.ammo=this.maxAmmo;
			break;
			
			
			case 2:	 // flamethrower
				this.ammo=96;
				if (this.weapon!=2) {
					this.setInfo(Player.i_FLAMETHROWER);
				}
			break;
			
			
			case 3: // electro
				this.ammo=this.maxAmmo;
				if (this.weapon!=3) {
					this.setInfo(Player.i_ELECTRO);
				}
			break;
			
			
			case 4: // JETPACK
				this.ammo=this.maxAmmo;
				if (this.weapon!=4) {
					this.setInfo(Player.i_JETPACK);
				}
			break;
			
			
			case 5: // TANK
				this.ammo=this.maxAmmo;
				if (this.weapon!=5) {
					this.setInfo(Player.i_TANK);
				}
			break;
			
			
			case 6: // grenades
				this.ammo=this.maxAmmo>>2;
				if (this.weapon!=6) {
					this.setInfo(Player.i_GRENADES);
				}
			break;

			case 7: // skullgun
				this.ammo=this.maxAmmo>>1;
				if (this.weapon!=7) {
					this.setInfo(Player.i_SKULLGUN);
				}
			break;
			
			
			case 8 : // double gun
				this.ammo=this.maxAmmo;
				if (this.weapon!=8) {
					this.setInfo(Player.i_DOUBLEGUN);
				}
			break;
		}

		this.weapon=weaponID;
	}
	
	
	this.shoot=function(myWorld) {
		var coverOffset=0;
		if (this.inCover) coverOffset=-8;
		
		this.openMouth=8;
		
		switch (this.weapon) {
			case 1 : // normal bullets
				if (this.myDirection<0) {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bBULLET, this.x, this.y+4+getRandom(3)+coverOffset, this.myDirection);
					fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
					this.xSpeed+=8;
					if (this.onGround) this.ySpeed-=4;
					this.onGround=false;
				} else {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bBULLET, this.x+12, this.y+4+getRandom(3)+coverOffset, this.myDirection);
					fxAdd(this.x+12,this.y+8,FX.fSMALLEXPLODE,1);
					this.xSpeed-=8;
					if (this.onGround) this.ySpeed-=4;
					this.onGround=false;
				}
				
				
				
//				if (this.myDirection>0) fxAdd(this.x-getRandom(16),this.y-(12+getRandom(12)),FX.fRATAT,0);
//				else fxAdd(this.x+getRandom(16),this.y-(12+getRandom(12)),FX.fRATAT,0);
				
				fxAdd(this.x+getRandom(12),this.y+8,FX.fSHELL,-this.myDirection);
				
				this.doShootSound=true;
				this.ammo--;
				this.actionDelay=4<<4;
			break;
			
			
			
			case 2: // flame thrower
				if (this.myDirection<0) {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bFLAME, this.x-8, this.y+4+getRandom(3)+coverOffset, this.myDirection);
				} else {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bFLAME, this.x+12, this.y+4+getRandom(3)+coverOffset, this.myDirection);
				}
				
				if (myWorld.worldAge%6==0) this.doShootSound=true;
				this.ammo-=2;
				if (this.ammo<0) this.ammo=0;
				this.actionDelay=2<<4;				
			break;
			

			case 3: // electro
				if (this.myDirection<0) { //Player.myDirection
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bELECTRO, this.x-8, this.y+4+getRandom(3)+coverOffset, this.myDirection);
				} else {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bELECTRO, this.x+12, this.y+4+getRandom(3)+coverOffset, this.myDirection);
				}
				
				this.ammo-=16;
				if (this.ammo<0) this.ammo=0; //!!
				
				this.doShootSound=true; //!!!
				this.actionDelay=8<<4;		//to jest przecież stała wartość		
			break;
			
			
			case 4: // jetpack
				bulletAdd(Bullets.OWNER_PLAYER, Bullets.bDROPPER, this.x+4, this.y+10, this.myDirection);
				this.ammo-=4;
				this.actionDelay=4<<4;
			break;
			
			
			case 5: // TANK
				if (this.myDirection<0) {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bTRILASER, this.x+1, this.y-13, -2);
					fxAdd(this.x+1,this.y+10,FX.fBIGEXPLODE,1);
					this.ySpeed=-4;
					this.doShootSound=true;
					this.actionDelay=8<<4;
				} else if (this.myDirection>0) {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bTRILASER, this.x+8, this.y-13, 2);
					fxAdd(this.x+30,this.y+10,FX.fBIGEXPLODE,1);
					this.ySpeed=-4;
					this.doShootSound=true;
					this.actionDelay=8<<4;
				}
				
			break;
			
			case 6: // grenadier
				if (this.myDirection<0) {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bROCKET, this.x, this.y+8, this.myDirection);
					fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
					if (this.onGround) this.ySpeed=-16;
					this.onGround=false;
					this.xSpeed=8;
				} 
				if (this.myDirection>0) {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bROCKET, this.x, this.y+8, this.myDirection);
					fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
					if (this.onGround) this.ySpeed=-16;
					this.onGround=false;
					this.xSpeed=-8;
				}		
				
				this.doShootSound=true;
				this.ammo-=1;
				this.actionDelay=4<<4;
			break;
			
			
			case 7:// skull flame thrower
				if (this.myDirection<0) {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bTRIPLEFLAME, this.x-8, this.y+4+getRandom(3)+coverOffset, this.myDirection);
				} else {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bTRIPLEFLAME, this.x+12, this.y+4+getRandom(3)+coverOffset, this.myDirection);
				}
				
				this.ammo--;
				if (this.ammo<0) this.ammo=0;
				
				this.doShootSound=true;
				this.actionDelay=4<<4;				
			break;
			
			case 8 : // normal bullets
				bulletAdd(Bullets.OWNER_PLAYER, Bullets.bBULLET, this.x, this.y+4+getRandom(3)+coverOffset, 2);
				fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
				bulletAdd(Bullets.OWNER_PLAYER, Bullets.bBULLET, this.x+12, this.y+4+getRandom(3)+coverOffset, -2);
				fxAdd(this.x+12,this.y+8,FX.fSMALLEXPLODE,1);
				if (this.onGround) this.ySpeed-=4;
				this.onGround=false;
				
				fxAdd(this.x+getRandom(12),this.y+8,FX.fSHELL,-this.myDirection);
				fxAdd(this.x+getRandom(12),this.y+8,FX.fSHELL,-this.myDirection);
				
				this.doShootSound=true;
				this.ammo-=4;
				this.actionDelay=5<<4;
			break;
			
			// v1.3.0
			case 9: // chicken gun
				if (this.myDirection<0) {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bEGGS, this.x, this.y+4+getRandom(3)+coverOffset, this.myDirection);
					fxAdd(this.x-4,this.y+8,FX.fSMALLEXPLODE,1);
					this.xSpeed+=8;
					if (this.onGround) this.ySpeed-=4;
					this.onGround=false;
				} else {
					bulletAdd(Bullets.OWNER_PLAYER, Bullets.bEGGS, this.x+12, this.y+4+getRandom(3)+coverOffset, this.myDirection);
					fxAdd(this.x+12,this.y+8,FX.fSMALLEXPLODE,1);
					this.xSpeed-=8;
					if (this.onGround) this.ySpeed-=4;
					this.onGround=false;
				}
				
				// feather!
				fxAdd(this.x+getRandom(12)-2, this.y+getRandom(12)-4, FX.fDEBRI, 5);
				
				this.doShootSound=true;
				this.ammo--;
				this.actionDelay=4<<4;
			break;
			
		}
		
		
		if (this.ammo<=0 && this.weapon>1) {
			this.setWeapon(1);
		}
	}
	
	
	this.regenerate=function() {
		this.lives=this.maxLives;
	}
	
	
	this.addLife=function(amount) {
		this.lives+=amount;
		if (this.lives>this.maxLives) this.lives=this.maxLives;
	}

	this.addAmmo=function(amount) {
		// v1.3.0
		if (this.weapon==9) return;
		
		this.ammo+=amount;
		if (this.ammo>this.maxAmmo) this.ammo=this.maxAmmo;
	}
	
	
	this.addBeacon=function() {
		this.beacon++;
	}
	
	
	this.addChain=function() {
		this.chainKill++;
		this.chainDelay=128;
	}
	

/**
 * Update the player 
 *
 * @param myWorld An World object, contains the map which we will check for collisions
 */

	this.update=function(myWorld, displayW) { //Player.update
		var tx;
		var ty;
		var ty2;
		var tx2;
		
		
		
		
		if (this.chainDelay>0) this.chainDelay--;
		else this.chainKill=0;
		
		
		this.distance=this.x>>3;
		
		
		// reset cover kills
		if (!this.inCover) this.coverKillCount=0;
		
		this.showBeacon=false;
		this.isBeacon=false;
		this.inCover=false;
		
		if (this.openMouth>0) this.openMouth--;
		
		
		if (this.Died || this.Dropped) {

			if (this.Died && myWorld.worldAge%6==0) {
				
				if (this.xSpeed<-32 || this.xSpeed>32) {
					if (this.xSpeed>0) fxAdd(this.x+getRandom(16), this.y+getRandom(16)-8, FX.fPARTICLE,-1);
					else fxAdd(this.x+getRandom(16), this.y+getRandom(16)-8, FX.fPARTICLE,1);
				}
			}
			
			this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
			
			this.y=this.floatY>>4;
			if (this.y>148) this.xSpeed=0;
			
			
			this.floatX+=this.xSpeed>>myWorld.slowMoFactor;
			this.x=this.floatX>>4;
			
			if (this.ySpeed<240 && this.yIncrease!=0) this.ySpeed+=16>>myWorld.slowMoFactor;
			if (this.ySpeed>0) {
				tx=(this.x+(Player.PL_WIDTH>>1))>>4;
				ty=(this.y+Player.PL_HEIGHT+3)>>4;
				if (myWorld.isSolid(tx,ty)) {
					this.y=(ty<<4)-Player.PL_HEIGHT+3;
					this.floatY=this.y<<4;
					this.doLandSound=true;

					//xSpeed=xSpeed>>1;
					if (this.xSpeed>0) {
						this.xSpeed-=16>>myWorld.slowMoFactor;
						if (this.xSpeed<0) this.xSpeed=0;
					} else if (this.xSpeed<0) {
						this.xSpeed+=16>>myWorld.slowMoFactor;
						if (this.xSpeed>0) this.xSpeed=0;
					}

					if (this.Died) {
						if (this.yIncrease<0) this.yIncrease+=16;
						this.ySpeed=this.yIncrease;
					}
				}
			}
			
			if (this.diedCounter>0) this.diedCounter--;
			else {
				this.Dropped=false;
			}
			
			
			return;
		}

		
		
		// not died !
		if (this.invincableCounter>0) this.invincableCounter--;
		
		
		if (this.inDoor) {
			this.inTank=false;
			
			if (this.doorAlpha>this.doorAlphaTarget) {
				this.doorAlpha-=32;
				if (this.doorAlpha<=this.doorAlphaTarget) {
					this.doorAlpha=this.doorAlphaTarget;
					this.doorAlphaTarget=255;
					
					if (this.doorTargetY<0 && this.doorTargetX<0) {
						this.doorLoadRoom=true;
						this.doorAlpha=this.doorAlphaTarget+1;
					} else {
						this.x=this.doorTargetX;
						this.y=this.doorTargetY;
						this.floatX=this.x<<4;
						this.floatY=this.y<<4;
					}
				}
			} else if (this.doorAlpha<this.doorAlphaTarget) {
				this.doorAlpha+=32;
				if (this.doorAlpha>=this.doorAlphaTarget) {
					this.doorAlpha=this.doorAlphaTarget;
					this.inDoor=false;
				}
			}
			
			return;
		}
		
		
		var originalSlowMoFactor=myWorld.slowMoFactor;
		if (this.hasSpecialDrink && !myWorld.isInDoor) {
			myWorld.slowMoFactor=0;	// we keep running!
			if (this.specialDrinkCounter>0 && myWorld.worldAge%3==0) {
				this.specialDrinkCounter--;
				if (this.specialDrinkCounter==0) this.hasSpecialDrink=false;
			}
			
			if (myWorld.worldAge%2==0) fxAdd(this.x, this.y, FX.fPLAYERECHO, this.myDirection*this.id);
		}
		
		
		if (this.noMoveCount>0)this.noMoveCount--;

		
		if (!this.transport && !this.blockPlayerMovement && this.noMoveCount==0) {
			if (this.leftPressed) {
				if (this.xSpeed>0) this.xSpeed=0;
				this.xSpeed-=8;
				if (this.xSpeed<-this.maxSpeed) this.xSpeed=-this.maxSpeed;

				this.myDirection=-1;
			} else if (this.rightPressed) {
				if (this.xSpeed<0) this.xSpeed=0;
				this.xSpeed+=8;
				if (this.xSpeed>this.maxSpeed) this.xSpeed=this.maxSpeed;

				this.myDirection=1;
			} else {
				this.xSpeed=0;
			}
			
			
			
			// jetpack movement
			if (this.weapon==4 && this.actionPressed) this.jumpPressed=true;
			
			if (this.jumpPressed && this.jumpReleased) {
				this.inTank=false;
				
				if (this.weapon==4) {
					// jetpack
					if (this.ySpeed>-64) this.ySpeed-=16>>myWorld.slowMoFactor;
					//ammo--;

					if (this.ammo%2==0) {
						fxAdd(this.x+10,this.y+5,FX.fSMOKETRAIL,0);
						fxAdd(this.x,this.y+5,FX.fSMOKETRAIL,0);
						
						fxAdd(this.x,this.y+5,FX.fFIREBULB,0);
						fxAdd(this.x+10,this.y+5,FX.fFIREBULB,0);
					}
					
					this.jumpReleased=true;
					
				} else if (this.onGroundCountdown>0 || this.onGround) { 
					// jump movement
					this.jumpReleased=false;
					
					if (this.atDoor) {
						this.inTank=false;
						this.inDoor=true;
						this.doorAlpha=255;
						this.doorAlphaTarget=0;
						this.atDoor=false;
					} else {
						if (this.ySpeed>24) fxAdd(this.x+4,this.y+4,FX.fTWIRLLAND,0);
						this.ySpeed=-120;
						
						this.doJumpSound=true;
					
						this.onGroundCountdown=0;
						this.onGround=false;
					}
				}
			} else if (!this.jumpPressed) this.jumpReleased=true;
		}
		
		
		this.atDoor=false;
		
		// animation frames
		if (this.myDirection>0) this.MirrorFrame=0;
		else if (this.myDirection<0) this.MirrorFrame=Player.PL_HEIGHT;


		if (this.FrameStep>0) {
			this.FrameStep--;
		} else {
			if (this.ySpeed<0) {
				this.Frame=(3*Player.PL_WIDTH);
				//if (this.ySpeed<-8 && !this.hasJetpack) fxAdd(this.x,this.y,FX.DUSTTINY,0);
			} else if (this.ySpeed>16 && !this.onElevator) {
				this.Frame=(4*Player.PL_WIDTH);
			} else if (!this.onGround) {
				this.Frame=0;
			} else if (this.xSpeed!=0) {
				if (this.FrameDelay>4 || this.Frame>(2*Player.PL_WIDTH)) {
					this.FrameDelay=4;
					this.Frame=(1*Player.PL_WIDTH);
				}
				if (this.FrameDelay>0) this.FrameDelay--;
				else {
					if (this.Frame<(2*Player.PL_WIDTH)) this.Frame=(2*Player.PL_WIDTH);
					else {
						if (getRandom(8)<4) this.Frame=0;
						else this.Frame=(1*Player.PL_WIDTH);
					}
					this.FrameDelay=4;
				}
			} else {
				if (getRandom(96)<8) this.Frame=0;
				else this.Frame=(1*Player.PL_WIDTH);
			}
		}
		
		
		this.floatY+=this.ySpeed>>myWorld.slowMoFactor;
		
		if (this.onGroundCountdown>0) this.onGroundCountdown--;

		if (this.onChute) {
			if (this.ySpeed<2<<4) this.ySpeed+=16;
		} else if (this.weapon==4){
			if (!this.jumpPressed && this.ySpeed<96) this.ySpeed+=8;
		} else {
			if (this.ySpeed<240) this.ySpeed+=8; //>>myWorld.slowMoFactor;
		}
		this.y=this.floatY>>4;
		
		if (this.ySpeed<-96 && this.y%2==0 && this.weapon!=4) {
			fxAdd(this.x+4,this.y+16,FX.fTWIRL,0);
		}
		
		if (this.y>148) {
			if (!this.Died) {
				this.initDie();
				this.floatY=this.y<<4;
				this.ySpeed=0;
				this.xSpeed=0;
				this.diedCounter=48;
			}
			this.y=320;
		}
		

		
		
			if ( this.ySpeed<0) { 
				tx=(this.x+1)>>4;			// left foot
				tx2=(this.x+Player.PL_WIDTH-1)>>4;		// right foot
				
				ty=this.y>>4;			// and at the top

				if (ty>=0 && ty<=31 && tx>=0 && tx2<=TileMap.MAPWIDTH) {
					if (myWorld.isSolidBelow(tx,ty) || myWorld.isSolidBelow(tx2,ty) ) {
						this.ySpeed=0;
						this.y=(ty<<4)+Player.PL_HEIGHT+2;
						this.floatY=this.y<<4;
						
					} else if (!this.onElevator) {
						this.onGround=false;
						if (this.ySpeed<96) this.ySpeed+=this.yIncrease;

					}
				} else if (tx2>TileMap.MAPWIDTH) {
					this.y=(ty<<4)+Player.PL_HEIGHT+1;
					this.floatY=this.y<<4;
					this.setOnGround();
					this.ySpeed=0;
					
				} else if (!this.onElevator) {
					this.onGround=false;
					if (this.ySpeed<96) this.ySpeed+=this.yIncrease;
				}
			} else {
				tx=(this.x+1)>>4;			// check at center of player
	            tx2=(this.x+Player.PL_WIDTH-1)>>4;		    // right foot
				ty=(this.y+Player.PL_HEIGHT)>>4;		    // and at the bottom


					
				if (ty>=0 && ty<TileMap.MAPHEIGHT && tx>=0 && tx<TileMap.MAPWIDTH) {

					if (myWorld.isSolid(tx,ty) || myWorld.isSolid(tx2,ty)) {
						this.yIncrease=8;
						this.y=(ty<<4)-Player.PL_HEIGHT;
						this.floatY=this.y<<4;
						
						this.setOnGround();
						this.ySpeed=0;
					} else if (!this.onElevator){
						this.onGround=false;
						if (this.ySpeed<96) this.ySpeed+=this.yIncrease;
					}
				} else if (!this.onElevator){
					this.onGround=false;
					if (this.ySpeed<96) this.ySpeed+=this.yIncrease;
				}
			}


			// horizontal movement
			this.floatX+=(this.xSpeed>>myWorld.slowMoFactor);
			
			this.x=this.floatX>>4;
			if (this.x<0) {
				this.x=0;
				this.floatX=this.x<<4;
				this.xSpeed=0;
			}
			if (this.x>=(TileMap.MAPWIDTH<<4)-16) {
				this.x=(TileMap.MAPWIDTH<<4)-16;
				this.floatX=this.x<<4;
				this.xSpeed=0;
			}
			
			if (myWorld.CameraIsView) { 
				if (this.x<myWorld.lockScreen) {
					this.x=myWorld.lockScreen;
					this.floatX=this.x<<4;
					this.xSpeed=0;
				}
				if (this.x<myWorld.worldOffset+12) {
					this.x=myWorld.worldOffset+12;
					this.floatX=this.x<<4;
					this.xSpeed=0;
				} else if (this.x>myWorld.worldOffset+displayW-Player.PL_WIDTH) {
					this.x=myWorld.worldOffset+displayW-Player.PL_WIDTH;
					this.floatX=this.x<<4;
					this.xSpeed=0;
				} else if (myWorld.lockScreen>=0 && this.x>myWorld.lockScreen+displayW-Player.PL_WIDTH) {
					this.x=myWorld.lockScreen+displayW-Player.PL_WIDTH;
					this.floatX=this.x<<4;
					this.xSpeed=0;
				} else if (myWorld.softLock>0 && this.x>myWorld.softLock+displayW-Player.PL_WIDTH) {
					this.x=myWorld.softLock+displayW-Player.PL_WIDTH;
					this.floatX=this.x<<4;
					this.xSpeed=0;
				}
			}
			
			ty=(this.y+2)>>4;			// y + height>>1  + ySpeed  - so check at middle of the body
			ty2=(this.y+Player.PL_HEIGHT-2)>>4;
			if (this.myDirection<0) {
				tx=this.x>>4;
				
				if (myWorld.isSolidBelow(tx,ty) || myWorld.isSolidBelow(tx,ty2)) {
					this.x=(tx<<4)+16; //WIDTH+1;
					this.xSpeed=0;
					this.floatX=this.x<<4;
					
					// in cover? if only 1 tile-heigh next to us
					if (this.leftPressed && !myWorld.isSolidBelow(tx,ty-1)) this.inCover=true;
				}
			} else  if (this.myDirection>0) {
				tx=(this.x+Player.PL_WIDTH)>>4;
				if (myWorld.isSolidBelow(tx,ty) || myWorld.isSolidBelow(tx,ty2)) {
					this.x=(tx<<4)-Player.PL_WIDTH;
					this.xSpeed=0;
					this.floatX=this.x<<4;

					// in cover? if only 1 tile-heigh next to us
					if (this.rightPressed && !myWorld.isSolidBelow(tx,ty-1)) this.inCover=true;
				}
			}
		
		if (this.actionDelay>0) this.actionDelay-=16>>myWorld.slowMoFactor;
		else if ( (this.ammo>0 && this.actionPressed) || (this.weapon==4 && !this.onGround && !this.onChute) ) {
			this.actionPressed=false;
			this.actionBlocked++;
			this.shoot(myWorld);
		}
			
			
				
 		this.onElevator=false;
		this.blockPlayerMovement=false;
		
		myWorld.slowMoFactor=originalSlowMoFactor;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	this.setOnGround=function() {
		if (!this.onGround && !this.onElevator) {
			if (this.ySpeed>24) {
				this.doLandSound=true;
				fxAdd(this.x+4,this.y+4,FX.fTWIRLLAND,0);
			}
		}
		
		this.onChute=false;
		this.onGround=true;
		this.onGroundCountdown=2;
	}
	




	
	this.Paint=function( mySprite, myWorld) {
		var tx;
		var ty;
		
		if (this.Died && (this.diedCounter<16 && this.diedCounter%4<2)) return;
		
		// v1.3.0
		var mFrame=this.MirrorFrame; //+ (avatarID<<5);

		if (this.invincableCounter%4<2) {
			
			if (this.inTank) {
				tx=this.x-myWorld.worldOffset;
				ty=this.y-myWorld.worldOffsetY-19;
				
				
				renderSubImageAtPoint(mySprite, tx,ty, this.Frame,this.MirrorFrame, Player.PL_WIDTH,Player.PL_HEIGHT);
				
				// render mouth open
				if (this.myDirection<0) {
					renderSubImageAtPoint(mySprite, tx+2,ty+6, 73,24, 6,2);
				} else {
					renderSubImageAtPoint(mySprite, tx+4,ty+6, 73,24, 6,2);
				}
			} else {
				tx=this.x-myWorld.worldOffset;
				ty=this.y-myWorld.worldOffsetY;
				
				setAlpha(this.doorAlpha);
				
				renderSubImageAtPoint(mySprite, tx,ty, this.Frame,this.MirrorFrame, Player.PL_WIDTH, Player.PL_HEIGHT);

				// render mouth open
				if (this.openMouth>0) {
					if (this.myDirection<0) {
						renderSubImageAtPoint(mySprite, tx+2,ty+6, 73,24, 6,2);
					} else {
						renderSubImageAtPoint(mySprite, tx+4,ty+6, 73,24, 6,2);
					}
				}
				
				// render weapon
				if (!this.Died) {
					
					if (this.hasArmor) {
						if (this.myDirection>0) {
							renderSubImageAtPoint(mySprite, tx,ty+6, 37,53, 11,6);
						} else {
							renderSubImageAtPoint(mySprite, tx+1,ty+6, 48,53, 11,6);
						}
					}
					
					if (this.Frame==24) ty++;
					
					switch (this.weapon) {
						
						case 1:
							if (this.myDirection<0) {
								if (this.inCover) ty-=2;
								else ty+=8;
								renderSubImageAtPoint(mySprite, tx,ty, 9,24, 9,3);
								if (this.inCover) ty+=2;
								else ty-=8;
							} else {
								tx+=3;
								if (this.inCover) ty-=2;
								else ty+=8;
								renderSubImageAtPoint(mySprite, tx,ty, 0,24, 9,3);
								tx-=3;
								if (this.inCover) ty+=2;
								else ty-=8;
							}
						break;
						
						
						case 2: // flame thrower
							if (this.myDirection<0) {
								if (this.inCover) ty-=2;
								else ty+=8;
								renderSubImageAtPoint(mySprite, tx,ty, 48,24, 10,4);
								if (this.inCover) ty+=2;
								else ty-=8;
							} else {
								tx+=2;
								if (this.inCover) ty-=2;
								else ty+=8;
								renderSubImageAtPoint(mySprite, tx,ty, 37,24, 10,4);
								tx-=2;
								if (this.inCover) ty+=2;
								else ty-=8;
							}
						break;
						
						
						case 3: // electro gun
							if (this.myDirection<0) {
								if (this.inCover) ty-=2;
								else ty+=6;
								renderSubImageAtPoint(mySprite, tx,ty, 48,28, 11,6);
								if (this.inCover) ty+=2;
								else ty-=6;
							} else {
								tx+=1;
								if (this.inCover) ty-=2;
								else ty+=6;
								renderSubImageAtPoint(mySprite, tx,ty, 37,24, 11,6);
								tx-=1;
								if (this.inCover) ty+=2;
								else ty-=6;
							}
						break;
						
						
						case 4: // jetpack
							if (this.myDirection<0) {
								tx+=9;
								ty+=6;
								renderSubImageAtPoint(mySprite, tx,ty, 66,24, 7,7);
								tx-=9;
								ty-=6;
							} else {
								tx-=3;
								ty+=6;
								renderSubImageAtPoint(mySprite, tx,ty, 59,24, 7,7);
								tx+=3;
								ty-=6;
							}
						break;
						
						
						
						case 6: // grenades
							if (this.myDirection<0) {
								tx+=3;
								ty+=3;
								renderSubImageAtPoint(mySprite, tx,ty, 45,34, 8,8);
								tx-=3;
								ty-=3;
							} else {
								tx+=1;
								ty+=3;
								renderSubImageAtPoint(mySprite, tx,ty, 37,34, 8,8);
								tx-=1;
								ty-=3;
							}							
						break;
						
						
						case 7: // skull fireblaster
							if (this.myDirection<0) {
								if (this.inCover) ty-=2;
								else ty+=7;
								tx+=1;
								renderSubImageAtPoint(mySprite, tx,ty, 47,41, 10,4);
								tx-=1;
								if (this.inCover) ty+=2;
								else ty-=7;
							} else {
								if (this.inCover) ty-=2;
								else ty+=7;
								tx+=1;
								renderSubImageAtPoint(mySprite, tx,ty, 37,41, 10,4);
								tx-=1;
								if (this.inCover) ty+=2;
								else ty-=7;
							}							
						
						break;
						
						
						case 8 : // double gun
							if (this.myDirection>0) {
								if (this.inCover) ty-=2;
								else ty+=8;
								renderSubImageAtPoint(mySprite, tx+12,ty, 0,24, 5,3);
								renderSubImageAtPoint(mySprite, tx-2,ty, 13,24, 5,3);
								
								if (this.inCover) ty+=2;
								else ty-=8;
							} else {
								if (this.inCover) ty-=2;
								else ty+=8;
								renderSubImageAtPoint(mySprite, tx+10,ty, 0,24, 5,3);
								renderSubImageAtPoint(mySprite, tx-2,ty, 13,24, 5,3);
								
								if (this.inCover) ty+=2;
								else ty-=8;
								
							}
						break;
						
						// v1.3.0 chicken gun
						case 9:
							if (this.myDirection<0) {
								if (this.inCover) ty-=2;
								else ty+=7;
								tx+=1;
								renderSubImageAtPoint(mySprite, tx,ty, 65,34, 11,6);
								tx-=1;
								if (this.inCover) ty+=2;
								else ty-=7;
							} else {
								if (this.inCover) ty-=2;
								else ty+=7;
								tx+=1;
								renderSubImageAtPoint(mySprite, tx,ty, 54,34, 11,6);
								tx-=1;
								if (this.inCover) ty+=2;
								else ty-=7;
							}
						break;
						
					}
				}
				
				
				if (this.onChute) {
					tx-=13;
					ty-=27;
					
					if (this.xSpeed!=0) {
						ctx.save();
//						ctx.translate( (tx+19)<<useMultiFactor, (ty+16)<<useMultiFactor);
//						ctx.rotate( convertToRadians(-(this.xSpeed>>3)) );
//						ctx.translate( -(tx+19)<<useMultiFactor, -(ty+16)<<useMultiFactor);
						ctx.translate( (tx+19)<<useMultiFactor, (ty+16)<<useMultiFactor);
						ctx.rotate( convertToRadians(-(this.xSpeed>>3)) );
						ctx.translate( -(tx+19)<<useMultiFactor, -(ty+16)<<useMultiFactor);
					}
					
					renderSubImageAtPoint(mySprite, tx,ty, 0,27, 37,32);
	
					if (this.xSpeed!=0) {
						ctx.restore();
					}
				}
			}
			
		}

	}
	


	
}
