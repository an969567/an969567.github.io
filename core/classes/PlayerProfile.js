function PlayerProfile() {

	PlayerProfile.HINT_ENTERBUILDINGS = 1,
	PlayerProfile.HINT_DROPPEDWEAPONS = 2,
	PlayerProfile.HINT_TREMOR = 3;

	
	// audio?
	this.useMusic=false;

	// audio?
	this.useMusic=true;
	this.useSFX=true;
	this.isPurchased=false;
	this.licenseAge=0;
	
	this.useArcadeMode=false;	// vertical, perfect for tablets and icade!
	
	// keep track of whatsnew info
	this.lastWhatsNew=0;

	this.controlScheme=0;
	
	this.stickX=new Array(6);
	this.stickY=new Array(6);

	this.controller1=new Array(12);
	this.controller2=new Array(12);
	
	// level reached for every world for every soldier (default is 0, no award)
	this.maxLevelReached=new Array(16);
	for (var i=this.maxLevelReached.length; --i>=0;) {
		this.maxLevelReached[i]=new Array(16);
	}
	this.tours=new Array(16);
	
	this.unlockedCharacters=new Array(16);
	this.unlockedCharacters[1]=true; // j rumble
	this.unlockedCharacters[4]=true;	// gunchick
	
	
	this.didHints=new Array(16);
	
	this.showTutorial=true;
	
	
	this.currentMissions=new Array(3);	// array of 3 holding current open missions
	this.achievements=new Array(128);
	this.completedCount=0;		// set internal
	this.highScore=0;
	
	// achievement constants
	PlayerProfile.A_COMPLETEMISSON11 = 0,
	PlayerProfile.A_COMPLETEMISSON12 = 1,
	PlayerProfile.A_COMPLETEMISSON13 = 2,
	PlayerProfile.A_COMPLETEMISSON21 = 3,
	PlayerProfile.A_COMPLETEMISSON22 = 4,
	PlayerProfile.A_COMPLETEMISSON23 = 5,
	PlayerProfile.A_COMPLETEMISSON31 = 6,
	PlayerProfile.A_COMPLETEMISSON32 = 7,
	PlayerProfile.A_COMPLETEMISSON33 = 8,
	PlayerProfile.A_COMPLETEMISSON41 = 9,
	PlayerProfile.A_COMPLETEMISSON42 = 10,
	PlayerProfile.A_COMPLETEMISSON43 = 11,
	PlayerProfile.A_COMPLETEMISSON51 = 12,
	PlayerProfile.A_COMPLETEMISSON52 = 13,
	PlayerProfile.A_COMPLETEMISSON53 = 14,
	PlayerProfile.A_RESQUESLY = 15,
	PlayerProfile.A_RESQUEWILLIS = 16,
	PlayerProfile.A_RESQUEBA = 17,
	PlayerProfile.A_RESQUESARGE = 18,
	PlayerProfile.A_VOODOOTASTIC = 19,
	PlayerProfile.A_BANANAS = 20,
	PlayerProfile.A_KILL10GUYS = 21,
	PlayerProfile.A_TAKEJETPACKRIDE = 22,
	PlayerProfile.A_DRIVETANK = 23,
	PlayerProfile.A_DRIVEFIVEDUDES = 24,
	PlayerProfile.A_DRIVETENDUDES = 25,
	PlayerProfile.A_MAKECHOPPERCRASH = 26,
	PlayerProfile.A_BLOWUP4DUDES = 27,
	PlayerProfile.A_ACTIVATEBEACON = 28,
	PlayerProfile.A_COVERSHOOT5	= 29,
	PlayerProfile.A_BLOWUP2DUDES = 30,
	PlayerProfile.A_AIRKILLDUDE = 31,
	PlayerProfile.A_GRABNEWWEAPON = 32,
	PlayerProfile.A_KILL20GUYS = 33,
	PlayerProfile.A_KILL10GRENADES = 34,
	PlayerProfile.A_CHAINEXPLODE2	= 35,
	PlayerProfile.A_KILLFOURMECHBALLS = 36,
	PlayerProfile.A_COLLECT75COINS = 37,
	PlayerProfile.A_COLLECT100COINS = 38,
	PlayerProfile.A_COLLECT125COINS = 39,
	PlayerProfile.A_COLLECT150COINS = 40,
	PlayerProfile.A_SCORE500PTS = 41,
	PlayerProfile.A_SCORE1000PTS = 42,
	PlayerProfile.A_SCORE2000PTS = 43,
	PlayerProfile.A_SCORE2500PTS = 44,
	PlayerProfile.A_KILL50GUYS = 45,
	PlayerProfile.A_CHAINEXPLODE3 = 46,
	PlayerProfile.A_COLLECT175COINS = 47,
	PlayerProfile.A_BLOWUPDEATHWORM = 48,
	PlayerProfile.A_KILLFIRESKULL	= 49,
							
	PlayerProfile.A_KILL5SKULLS = 50,
	PlayerProfile.A_DESTROY5HELLTANKS = 51,
	PlayerProfile.A_COMPLETEHELL = 52,
							
	PlayerProfile.A_BACOMPLETEHELL = 53,
	PlayerProfile.A_GRABENERGYDRINK = 54,
	PlayerProfile.A_PEACHY = 55,
							
	PlayerProfile.A_DJDROPBEAT = 56,
	PlayerProfile.A_TAKECOVER = 57,
	PlayerProfile.A_BOOTCAMP = 58,
							
	PlayerProfile.A_CHOOCHOO = 59,
							
	PlayerProfile.A_MAXACHIEVEMENTS = 60;

	// order from "Easy" to "hard"
	// mission list will check this from first to last and show the first 3 it finds "unachieved"
	this.aINDICES = [	57,28,58,	0,37,32,	1,26,56,	21,19,38,
													30,31,2,	29,3,41,	15,39,16,	23,4,55,
													33,20,22,	34,5,40,	42,54,35,	6,27,45,
													7,59,43,	46,36,47,	8,17,24,	9,25,18,
													44,10,48,	11,49,12,	50,13,51,	14,52,53  
	];
	
	

	this.resetCurrentMissions=function() {
		for (var i=3; --i>=0;) {
			this.currentMissions[i]=-1;		
		}
	}

	// call it first time	
	this.resetCurrentMissions();
	
	
	this.unlockCharacter=function( id) {
		this.unlockedCharacters[id]=true;
	}
	
	this.didUnlockCharacter=function( id) {
		return this.unlockedCharacters[id];
	}
	
	// we return the achievement based on the indices array not the actual value
	this.isAchieved=function(id) {
		if (id<0) return false;
		return (this.achievements[ this.aINDICES[id] ]);
	}
	
	
	this.getAchievementByID=function( id) {
		if (id<0) return false;
		return this.achievements[ id ];
	}
	
	
	this.setAchieved=function( id) {
		if (id<0) return;
		this.achievements[ id ]=true;
		this.calculateCompleted();
	}
	
	this.setMission=function( id, mission) {
		this.currentMissions[id]=mission;
	}
	
	this.getMissionAchieveID=function( id) {
		if (this.currentMissions[id]<0) return -1;
		return this.aINDICES[ this.currentMissions[id] ];
	}

	this.getMission=function( id) {
		return this.currentMissions[id];
	}
	
	this.getAchievement=function( id) {
		if (id<0) return -1;
		return this.aINDICES[id];	
	}
	

	this.resetAchievements=function() {
		for (var i=128; --i>=0;) {
			this.achievements[i]=false;
		}
	}

	// recalculate completion count
	this.calculateCompleted=function() {
		this.completedCount=0;
		for (var i=0; i<PlayerProfile.A_MAXACHIEVEMENTS; i++) {
			if (  this.achievements[ this.aINDICES[i] ]) this.completedCount++;
		}
	}



	this.loadSettings=function() {
		for (var i=4; --i>=0;) {
			this.stickX[i]=-999;
			this.stickY[i]=-999;
		}
	
		for (var i=12; --i>=0;) {
			this.controller1[i]=-999;
			this.controller2[i]=-999;
		};
		
		// default button mapping
		this.controller1[4]=0;
		this.controller1[5]=1;
		this.controller1[6]=2;
		this.controller1[7]=3;

		this.controller2[4]=0;
		this.controller2[5]=1;
		this.controller2[6]=2;
		this.controller2[7]=3;		
	
		try {
				// try chrome-storage instead
				chrome.storage.sync.get('gunslugs', function (result) {
			        var myData = JSON.parse(result.gunslugs);
					activePlayer.useMusic=myData.usemusic;
					activePlayer.useSFX=myData.usesfx;
					activePlayer.useArcadeMode=myData.useArcadeMode;
					if (myData.isPurchased) activePlayer.isPurchased=myData.isPurchased;
					if (myData.licenseAge) activePlayer.licenseAge=myData.licenseAge;
				
					activePlayer.lastWhatsNew=myData.lastWhatsNew;
					activePlayer.controlScheme=myData.controlScheme;
					activePlayer.showTutorial=myData.showTutorial;
					activePlayer.highScore=myData.highScore;		
					
					if (myData.stickX) activePlayer.stickX=myData.stickX;
					if (myData.stickY) activePlayer.stickX=myData.stickY;
					if (myData.unlock) activePlayer.maxLevelReached=myData.unlock;
					if (myData.tours) activePlayer.tours=myData.tours;	
					if (myData.hint) activePlayer.didHints=myData.hint;	
					if (myData.characters) activePlayer.unlockedCharacters=myData.characters;	
					if (myData.achievement) activePlayer.achievements=myData.achievement;
					if (myData.controller1) activePlayer.controller1=myData.controller1;
					if (myData.controller2) activePlayer.controller2=myData.controller2;
					
			    });	

		
		}catch(e) {
			try {
		
				// try default browser storage
				if (localStorage["gunslugs"]!= null) {
				
					var myData=JSON.parse(localStorage["gunslugs"]);
					
					this.useMusic=myData.usemusic;
					this.useSFX=myData.usesfx;
					this.useArcadeMode=myData.useArcadeMode;
				
					this.lastWhatsNew=myData.lastWhatsNew;
					this.controlScheme=myData.controlScheme;
					this.showTutorial=myData.showTutorial;
					this.highScore=myData.highScore;
					if (myData.isPurchased) this.isPurchased=myData.isPurchased
					if (myData.licenseAge) this.licenseAge=myData.licenseAge;
						
					if (myData.stickX) this.stickX=myData.stickX;
					if (myData.stickY) this.stickX=myData.stickY;
					if (myData.unlock) this.maxLevelReached=myData.unlock;
					if (myData.tours) this.tours=myData.tours;	
					if (myData.hint) this.didHints=myData.hint;	
					if (myData.characters) this.unlockedCharacters=myData.characters;	
					if (myData.achievement) this.achievements=myData.achievement;
					if (myData.controller1) this.controller1=myData.controller1;
					if (myData.controller2) this.controller2=myData.controller2;				
				}
			
			} catch(e) {
			}
		}		

	

		this.unlockedCharacters[1]=true; // j rumble
		this.unlockedCharacters[4]=true;	// gunchick
		
		if (this.stickX[0]==null) {
			for (var i=4; --i>=0;) {
				this.stickX[i]=-999;
				this.stickY[i]=-999;
			}
		}		
		this.calculateCompleted();
		
	}
	
	
	this.saveSettings=function() {
		var myData=JSON.stringify({
					"usemusic":this.useMusic , 
					"usesfx":this.useSFX , 
					"useArcadeMode":this.useArcadeMode,
					"lastWhatsNew":this.lastWhatsNew,
					"controlScheme":this.controlScheme,
					"showTutorial":this.showTutorial,
					"isPurchased":this.isPurchased,
					"licenseAge":this.licenseAge,
					"highScore":this.highScore,
					"stickX":this.stickX,
					"stickY":this.stickY,
					"unlock":this.maxLevelReached,
					"tours":this.tours,
					"hint":this.didHints,
					"characters":this.unlockedCharacters,
					"achievement":this.achievements,
					"controller1":this.controller1,
					"controller2":this.controller2
					});	
					
		try {
				chrome.storage.sync.set({'gunslugs': myData});
		} catch(e) {
			// chrome app storage
			try {
				// default browser storage
				localStorage["gunslugs"]=myData;
			} catch(e) {
			}
		}
					
	}
	
	this.resetControls=function( displayW,  displayH) {
		
		// left
		this.stickX[0]=4;
		this.stickY[0]=displayH-36;

		// right
		this.stickX[1]=52;
		this.stickY[1]=displayH-36;

		// render jump
		this.stickX[2]=displayW-40;
		this.stickY[2]=displayH-36;

		// render shoot
		this.stickX[3]=displayW-84;
		this.stickY[3]=displayH-36;
	}	


	
	this.setHint=function( id) {
		this.didHints[id]=true;
	}

	this.getHint=function(id) {
		return this.didHints[id];
	}
	
	
	
}