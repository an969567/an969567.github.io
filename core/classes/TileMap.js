
function TileMap() {

	TileMap.MAPWIDTH=196, //148, //32, //128,
	TileMap.MAPHEIGHT=11; //11;

	TileMap.cEMPTY		= 0,
	TileMap.cTILE		= 1,
	TileMap.cNOBULLETBLOCK = 2,	// blocks everything except bullets
	TileMap.cDOWNTILE	= 3;	// can jump from below
	
	TileMap.pNOPARALLAX = 0,	// no layers (used in rooms and buildings)
	TileMap.pSIMPLE = 1,		// simple 2 layers
	TileMap.pFULL = 2;			// 3 layers
	
	
	
	
	this.map = [(TileMap.MAPWIDTH+1)*(TileMap.MAPHEIGHT+1)];
	this.tilemap = [(TileMap.MAPWIDTH+1)*(TileMap.MAPHEIGHT+1)];

	this.level=0;
	this.world=0;
	this.worldActiveChyms=0;
	this.worldOffset=0;
	this.worldOffsetY=0;
	this.worldShake=0;
	this.worldAge=0;
	this.lockScreen=0;
	this.lockVertical=false;
	this.CameraTakeOver=false;	// if something else besides player takes focus
	this.CameraIsView=false;	// signal player we are back on camera-position checking
	this.lockVerticalValue=0;
	this.softLock=0;
	this.shakeR=0;
	this.autoScroll=false;
	
	this.inTutorial=false;
	
	this.isCOOP=false;
	this.playersAliveCount=0;
	this.lastPlayerAlive=0;
	
	this.isInDoor=false;;
	this.doorX=0;
	this.doorY=0;
	this.oldPlayerX=0;	// used to keep track of player when going into a room
	this.oldPlayerY=0;
	this.oldPlayer2X=0;	// used to keep track of player when going into a room
	this.oldPlayer2Y=0;
	
	this.worldParallaxType=0;
	
	this.SlowMotion=false;
	this.slowMoFactor=0;
	this.slowMoCountdown=0;
	
	this.isPlatformer=true;	// gameboy/mario type gameplay
	

	
	this.copyWorld=function(source) {
		for (var i=TileMap.MAPWIDTH*TileMap.MAPHEIGHT; --i>=0; ) {
			this.map[i]=source.map[i];
			this.tilemap[i]=source.tilemap[i];
		}

		this.worldOffset=source.worldOffset;
		this.worldOffsetY=source.worldOffsetY;
		this.oldPlayerX=source.oldPlayerX;
		this.oldPlayerY=source.oldPlayerY;
		this.oldPlayer2X=source.oldPlayer2X;
		this.oldPlayer2Y=source.oldPlayer2Y;
		this.doorX=source.doorX;
		this.doorY=source.doorY;
		this.isCOOP=source.isCOOP;
		this.inTutorial=source.inTutorial;
		this.autoScroll=source.autoScroll;
		this.isPlatformer=source.isPlatformer;
		
		this.lockVertical=source.lockVertical;
		this.worldParallaxType=source.worldParallaxType;
		this.playersAliveCount=source.playersAliveCount;
	}
	
	
	// clear map
	this.reinit=function() {
		for (var i=TileMap.MAPWIDTH*TileMap.MAPHEIGHT; --i>=0; ) {
			this.map[i]=TileMap.cEMPTY;
			this.tilemap[i]=0;
		}
		
		this.inTutorial=false;
		
		this.SlowMotion=false;
		this.slowMoFactor=0;
		this.slowMoCountdown=0;
		this.worldOffset=0;
		this.worldOffsetY=0;
		this.worldShake=0;
		this.lockScreen=-1;
		this.softLock=-1;
		this.shakeR=0;
		this.CameraTakeOver=false;
		this.CameraIsView=true;

		this.isPlatformer=false;
		
		this.autoScroll=false;
		this.worldAge=0;
	}
	
	
	this.setEmpty=function( x, y) {
		this.setTile(x,y,TileMap.cEMPTY);
		this.tilemap[x+(y*TileMap.MAPWIDTH)]=0;
	}
	
	this.setDoor=function(x, y) {
		this.setTile(x,y,TileMap.cTILE);
		this.tilemap[x+(y*TileMap.MAPWIDTH)]=21;
	}
	
	this.setTile=function( x,  y,  tile) {
		this.map[x+(y*TileMap.MAPWIDTH)]=tile;
	}
	
	this.getTile=function( x,  y) {
		return this.map[x+(y*TileMap.MAPWIDTH)];
	}
	
	
	this.cut=function( x,  y,  w,  h) {
		var tx=x;
		var ty=y;
		
		while (tx<x+w && tx>=0 && tx<TileMap.MAPWIDTH) {
			ty=y;
			while (ty<y+h && ty>=0 && ty<TileMap.MAPWIDTH) {
				this.map[tx+(ty*TileMap.MAPWIDTH)]=TileMap.cEMPTY;
				ty++;
			}
			tx++;
		}
	}
	

	// add solids
	this.put=function( x,  y,  w,  h,  t) {
		var tx=x;
		var ty=y;
		
		while (tx<x+w && tx>=0 && tx<TileMap.MAPWIDTH) {
			ty=y;
			// v1.3.0
			while (ty<y+h && ty>=0 && ty<TileMap.MAPHEIGHT) {
				this.map[tx+(ty*TileMap.MAPWIDTH)]=t;
				ty++;
			}
			tx++;
		}
	}
	
	
	
	
	this.isSolid=function( x,  y) {
		if (x<0 || y<0 || x>TileMap.MAPWIDTH || y>TileMap.MAPHEIGHT) return false;
		if (this.map[x+(y*TileMap.MAPWIDTH)]>=TileMap.cTILE) return true; 
		return false;
	}

	this.isSolidBullet=function(x, y) {
		if (x<0 || y<0 || x>TileMap.MAPWIDTH || y>TileMap.MAPHEIGHT) return false;
		if (this.map[x+(y*TileMap.MAPWIDTH)]==TileMap.cTILE && this.map[x+(y*TileMap.MAPWIDTH)]!=TileMap.cNOBULLETBLOCK) return true; 
		return false;
	}
	
	this.isSolidBelow=function( x,  y) {
		if (x<0 || y<0 || x>TileMap.MAPWIDTH || y>TileMap.MAPHEIGHT) return false;
		if (this.map[x+(y*TileMap.MAPWIDTH)]>=TileMap.cTILE && this.map[x+(y*TileMap.MAPWIDTH)]<TileMap.cDOWNTILE) return true; 
		return false;
	}
	
	this.isSolidShown=function( x,  y) {
		if (this.map[x+(y*TileMap.MAPWIDTH)]>TileMap.cEMPTY) return true; 
		return false;
	}

	// check for 2 rows of solid below (skips the single-platform)
	this.isDoubleSolid=function( x,  y) {
		if (x<0 || y<0 || x>TileMap.MAPWIDTH || y>TileMap.MAPHEIGHT-1) return false;
		if (this.map[x+(y*TileMap.MAPWIDTH)]>=TileMap.cTILE && this.map[x+(y*TileMap.MAPWIDTH)]<TileMap.cDOWNTILE
			&& this.map[x+((y+1)*TileMap.MAPWIDTH)]>=TileMap.cTILE && this.map[x+((y+1)*TileMap.MAPWIDTH)]<TileMap.cDOWNTILE
		) return true; 
		return false;
	}
	
	
	
	
	this.generate=function() {
		// process all tiles, and figure out the correct tile IDX for rendering
		for (var x=0; x<TileMap.MAPWIDTH; x++) {
			for (var y=0;y<TileMap.MAPHEIGHT; y++) {
				
				if (this.map[x+(y*TileMap.MAPWIDTH)]==TileMap.cEMPTY) this.tilemap[x+(y*TileMap.MAPWIDTH)]=0;
				else {
					// centered on all edges
					if (this.isSolid(x-1,y) && this.isSolid(x,y-1) && this.isSolid(x+1,y) && this.isSolid(x,y+1)) {
						this.tilemap[x+(y*TileMap.MAPWIDTH)]=5;

						if (!this.isSolid(x-1,y-1)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=10; // _|
						else if (!this.isSolid(x+1,y-1)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=11;  // |_
						else if (!this.isSolid(x-1,y+1)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=12; // -|
						else if (x<TileMap.MAPWIDTH-1 && !this.isSolid(x+1,y+1)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=13; // |-
					}
					
					// single platform
					else if (!this.isSolid(x,y-1) && !this.isSolid(x,y+1)) {
						this.map[x+(y*TileMap.MAPWIDTH)]=TileMap.cDOWNTILE;
						
						// left cap
						if (!this.isSolid(x-1,y)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=14;
						// mid cent
						else if (this.isSolid(x-1,y) && this.isSolid(x+1,y)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=15;
						else this.tilemap[x+(y*TileMap.MAPWIDTH)]=16;
					}
					
					// top left corner
					else if (x>0 && !this.isSolid(x, y-1) && !this.isSolid(x-1,y) && this.isSolid(x+1,y) && this.isSolid(x,y+1)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=1;

					// top right corner
					else if (x<TileMap.MAPWIDTH-1 && !this.isSolid(x, y-1) && !this.isSolid(x+1,y) && this.isSolid(x-1,y) && this.isSolid(x,y+1) && this.isSolid(x-1,y+1)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=3;
					
					// bottom left corner
					else if (x<TileMap.MAPWIDTH-1 && !this.isSolid(x-1,y) && !this.isSolid(x,y+1) && this.isSolid(x,y-1) && this.isSolid(x+1,y) && this.isSolid(x+1,y-1)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=7;

					// bottom right corner
					else if (!this.isSolid(x+1,y) && !this.isSolid(x,y+1) && this.isSolid(x,y-1) && this.isSolid(x-1,y)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=9;

					// vertical left side
					else if (x>0 && !this.isSolid(x-1,y) && this.isSolid(x+1,y) && this.isSolid(x,y-1) && this.isSolid(x,y+1)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=4;
					
					// vertical right side
					else if (x<TileMap.MAPWIDTH-1 && this.isSolid(x-1,y) && !this.isSolid(x+1,y) && this.isSolid(x,y-1) && this.isSolid(x,y+1)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=6;
					
					// horizontal top side
					else if ((x==0 || this.isSolid(x-1,y)) && (x==TileMap.MAPWIDTH-1 || this.isSolid(x+1,y)) && y>0 && !this.isSolid(x,y-1) ) this.tilemap[x+(y*TileMap.MAPWIDTH)]=2;
					
					// horizontal bottom side
					else if (y<TileMap.MAPHEIGHT-1 && this.isSolid(x-1,y) && this.isSolid(x+1,y) && !this.isSolid(x,y+1) ) this.tilemap[x+(y*TileMap.MAPWIDTH)]=8;
					
					// just solid stuff
					else this.tilemap[x+(y*TileMap.MAPWIDTH)]=5;
				}
			}
		}

		
	}

	
	// used for: Plane yard, Jungle, Syberia
	this.generateZoneOne=function() {
		var y;
		var x;
		var tx;
		var ty;
		var done;
		var foundFloor;
		
		
		// add pilars underneath "floating" platform edges (only if there is floor beneath)
		x=0;
		while (x<TileMap.MAPWIDTH) {
			
			// hunt sole platforms
			done=false;
			y=0;
			while (y<TileMap.MAPHEIGHT-2 && !done) {
				if (this.tilemap[x+(y*TileMap.MAPWIDTH)]==14 || this.tilemap[x+(y*TileMap.MAPWIDTH)]==16) {
					
					foundFloor=false;
					ty=y+1;
					while (ty<TileMap.MAPHEIGHT && !foundFloor) {
						if (this.isSolid(x,ty)) foundFloor=true;
						ty++;
					}
					
					if (foundFloor) {
						y++;
						while (!this.isSolid(x,y) && y<TileMap.MAPHEIGHT) {
							this.tilemap[x+(y*TileMap.MAPWIDTH)]=17;
							y++;
						}
					}
					done=true;
				}
				y++;
			}
			
			x++;
		}
		
		
		// add random "broken" pilars
		x=getRandom(24);
		while (x<TileMap.MAPWIDTH) {
			// make sure spot is empty
			done=false;
			y=0;
			while (y<TileMap.MAPHEIGHT-2 && !done) {
				if (this.tilemap[x+(y*TileMap.MAPWIDTH)]>13) done=true;
				y++;
			}
			
			// we can add a pilar here
			if (!done) {
				y=1+getRandom(4);
				if (!this.isSolid(x,y)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=18;
				y++;
				while (y<TileMap.MAPHEIGHT && !done) {
					while (!this.isSolid(x,y) && y<TileMap.MAPHEIGHT) {
						this.tilemap[x+(y*TileMap.MAPWIDTH)]=17;
						y++;
					}
					done=true;
				}
			}
			
			x+=2+getRandom(56);
		}
		
		// add fences
		x=getRandom(24);
		while (x<TileMap.MAPWIDTH) {
			// find floor height
			done=false;
			y=TileMap.MAPHEIGHT-1;
			while (y>0 && !done) {
				if (this.isSolid(x,y)) y--;
				else done=true;
			}
			
			// we can add a fence here
			tx=3+getRandom(3);
			ty=2+getRandom(2);
			this.setFence(x,y,tx,ty);
			
			x+=tx+getRandom(56);			
		}
		
		
		
		// v1.3.0
		if (this.level!=3) {
			x=getRandom(24);
			while (x<TileMap.MAPWIDTH) {
				// find floor height
				done=false;
				y=TileMap.MAPHEIGHT-1;
				while (y>0 && !done) {
					if (this.isSolid(x,y)) y--;
					else done=true;
				}
				
				// we can add a fence here
				tx=3+getRandom(3);
				ty=2+getRandom(2);
				this.setFence(x,y,tx,ty);
				
				x+=tx+getRandom(56);			
			}
		}		
	}
	
	
	
	
	
	// used for: Egypt
	this.generateZoneTwo=function() {
		var y;
		var x;
		var tx;
		var ty;
		var done;
		
		
		// add pilars underneath "floating" platform edges
		x=0;
		while (x<TileMap.MAPWIDTH) {
			
			// hunt sole platforms
			done=false;
			y=0;
			while (y<TileMap.MAPHEIGHT-2 && !done) {
				if (this.tilemap[x+(y*TileMap.MAPWIDTH)]==15) {
					y++;
					while (y<TileMap.MAPHEIGHT && (!this.isSolid(x,y) || !this.isSolid(x,y+1)) ) {
						this.tilemap[x+(y*TileMap.MAPWIDTH)]=17;
						y++;
					}
					done=true;
				}
				y++;
			}
			
			x++;
		}
		
		
		// add random "broken" pilars
		x=getRandom(24);
		while (x<TileMap.MAPWIDTH) {
			// make sure spot is empty
			done=false;
			y=0;
			while (y<TileMap.MAPHEIGHT-2 && !done) {
				if (this.tilemap[x+(y*TileMap.MAPWIDTH)]>13) done=true;
				y++;
			}
			
			// we can add a pilar here
			if (!done) {
				y=1+getRandom(4);
				if (!this.isSolid(x,y)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=18;
				y++;
				while (y<TileMap.MAPHEIGHT && !done) {
					while (y<TileMap.MAPHEIGHT && !this.isSolid(x,y)) {
						this.tilemap[x+(y*TileMap.MAPWIDTH)]=17;
						y++;
					}
					done=true;
				}
			}
			
			x+=2+getRandom(56);
		}
	}
	

	// used for: Hell
	this.generateZoneThree=function() {
		var y;
		var x;
		var done;
		
		

		

		// add random "broken" pilars
		x=getRandom(24);
		while (x<TileMap.MAPWIDTH) {
			// make sure spot is empty
			done=false;
			y=0;
			while (y<TileMap.MAPHEIGHT-2 && !done) {
				if (this.tilemap[x+(y*TileMap.MAPWIDTH)]>15) done=true;
				y++;
			}
			
			// we can add a pilar here
			if (!done) {
				y=1+getRandom(4);
				if (!this.isSolid(x,y)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=18;
				y++;
				while (y<TileMap.MAPHEIGHT && !done) {
					while (!this.isSolid(x,y) && y<TileMap.MAPHEIGHT) {
						this.tilemap[x+(y*TileMap.MAPWIDTH)]=17;
						y++;
					}
					done=true;
				}
			}
			
			x+=2+getRandom(24);
		}

		
		// add pilars underneath "floating" platform edges
		x=0;
		while (x<TileMap.MAPWIDTH) {
			
			// hunt sole platforms
			done=false;
			y=0;
			while (y<TileMap.MAPHEIGHT-2 && !done) {
				if (this.tilemap[x+(y*TileMap.MAPWIDTH)]==15) {
					y++;
					while (y<TileMap.MAPHEIGHT && !this.isSolid(x,y) ) {
						this.tilemap[x+(y*TileMap.MAPWIDTH)]=17;
						y++;
					}
					done=true;
				}
				y++;
			}
			
			x++;
		}
		
		// add random "shrugs"
		x=getRandom(24);
		while (x<TileMap.MAPWIDTH-2) {
			done=false;
			// find floor
			y=0;
			while (y<TileMap.MAPHEIGHT-2 && !done) {
				if (this.isSolid(x,y) && this.isSolid(x+1,y)) done=true;
				y++;
			}
			
			if (done) {
				y-=2;
				if (y>=0 && y<TileMap.MAPHEIGHT) {
					if (x%2==0) {
						this.tilemap[x+(y*TileMap.MAPWIDTH)]=19;
						this.tilemap[x+1+(y*TileMap.MAPWIDTH)]=20;
					} else {
						this.tilemap[x+(y*TileMap.MAPWIDTH)]=21;
						this.tilemap[x+1+(y*TileMap.MAPWIDTH)]=22;
					}
				}
			}
			
			x+=2+getRandom(56);
			
		}

	}
	
	

	
	// used for: Kong world
	this.generateZoneKong=function() {
		var y;
		var x;
		var done;

		

		// add random "broken" pilars
		x=getRandom(24);
		while (x<TileMap.MAPWIDTH) {
			// make sure spot is empty
			done=false;
			y=0;
			while (y<TileMap.MAPHEIGHT-2 && !done) {
				if (this.tilemap[x+(y*TileMap.MAPWIDTH)]>15) done=true;
				y++;
			}
			
			// we can add a pilar here
			if (!done) {
				y=1+getRandom(4);
				if (!this.isSolid(x,y)) this.tilemap[x+(y*TileMap.MAPWIDTH)]=18;
				y++;
				while (y<TileMap.MAPHEIGHT && !done) {
					while (!this.isSolid(x,y) && y<TileMap.MAPHEIGHT) {
						this.tilemap[x+(y*TileMap.MAPWIDTH)]=17;
						y++;
					}
					done=true;
				}
			}
			
			x+=2+getRandom(24);
		}

		
		// add pilars underneath "floating" platform edges
		x=1;
		while (x<TileMap.MAPWIDTH-1) {
			
			// hunt sole platforms
			done=false;
			y=0;
			while (y<TileMap.MAPHEIGHT-2 && !done) {
				if (this.tilemap[x+(y*TileMap.MAPWIDTH)]==15 && 
					(this.tilemap[x-1+(y*TileMap.MAPWIDTH)]==14 || this.tilemap[x+1+(y*TileMap.MAPWIDTH)]==16)
				 ){
					y++;
					while (y<TileMap.MAPHEIGHT && !this.isSolid(x,y) ) {
						this.tilemap[x+(y*TileMap.MAPWIDTH)]=17;
						y++;
					}
					done=true;
				}
				y++;
			}
			
			x++;
		}
	}
	
	
	
	this.isAreaEmpty=function( left,  bottom,  width,  height) {
		var foundTile=true;
		for (var x=width; --x>=0;) {
			for (var y=height; --y>=0;) {
				if (this.isSolid(left+x, bottom-y)) foundTile=false;
			}
		}
		
		return foundTile;
	}
	
	
	this.setFence=function( left,  bottom,  width,  height) {
		var ty;
		
		for (var x=width; --x>=0;) {
			ty=bottom-height;
			while (left+x<TileMap.MAPWIDTH-1 && ty>=0 && ty<TileMap.MAPHEIGHT-1) {
				if (!this.isSolid(left+x, ty)) {
					if (ty==bottom-height) this.tilemap[left+x+(ty*TileMap.MAPWIDTH)]=19;
					else this.tilemap[left+x+(ty*TileMap.MAPWIDTH)]=20;
				}
				ty++;
			}
		}
	}	
	
	
	this.preRender=function( sprite, prerenderCanvas ) {
		var tmpX=this.worldOffset;
		var tmpY=this.worldOffsetY;
		this.worldOffset=0;
		this.worldOffsetY=0;
		
		prerenderCanvas.clearRect ( 0,0 , (196<<4)<<useMultiFactor,(11<<4)<<useMultiFactor);		
		
		var tile;
		
		var renderX;
		var renderY;
		
		renderX=0-this.worldOffset+this.shakeR;
		
		
		for (var x=0; x<TileMap.MAPWIDTH; x++ ) {
			
				renderY=0-this.worldOffsetY+this.shakeR;

				for (var y=0; y<TileMap.MAPHEIGHT; y++) {
						
						tile=this.tilemap[x+(y*TileMap.MAPWIDTH)]-1;
						
						if (tile>15) {
							tile-=16;
							prerenderCanvas.drawImage(sprite, 
								(tile<<4)<<useMultiFactor, 16<<useMultiFactor, 
								16<<useMultiFactor,16<<useMultiFactor,  
								renderX<<useMultiFactor,renderY<<useMultiFactor, 
								16<<useMultiFactor,16<<useMultiFactor);						
						} else if (tile>=0) {
							prerenderCanvas.drawImage(sprite, 
								(tile<<4)<<useMultiFactor, 0, 
								16<<useMultiFactor,16<<useMultiFactor,  
								renderX<<useMultiFactor,renderY<<useMultiFactor, 
								16<<useMultiFactor,16<<useMultiFactor);						
						}
					renderY+=16;
					
				}

				renderX+=16;
			
		}		
		
		this.worldOffset=tmpX;
		this.worldOffsetY=tmpY;
	}
	
	
	this.update=function() {
		this.worldAge++;
		if (this.worldShake>0) this.worldShake--;
		
		this.shakeR=0;
		if (this.worldShake>0) {
			if (this.worldShake>12) this.shakeR=getRandom(4)-2;
			else if (this.worldShake>6) this.shakeR=getRandom(4)-2;
			else this.shakeR=getRandom(2)-1; 
		}
	}
	
	
	
	this.paintPre=function(imgPreRender, displayW, displayH) {
		var renderX;
		var renderY;
		
		
		renderX=0;
		renderY=0-this.worldOffsetY;
		if (renderY<0) renderY=0;

// TODO
		this.worldOffset-=this.shakeR;
		this.worldOffsetY-=this.shakeR;
		
		if (this.worldOffset+displayW>(TileMap.MAPWIDTH<<4)) this.worldOffset=(TileMap.MAPWIDTH<<4)-displayW;
		if (this.worldOffset<0) this.worldOffset=0;
		
		renderSubImageAtPoint(imgPreRender, renderX,renderY, this.worldOffset,0, displayW,displayH);
		
		this.worldOffset+=this.shakeR;
		this.worldOffsetY+=this.shakeR;
	}
	
	
	
	
	this.paint=function( sprite, displayW, displayH) {
		var tile;
		
		var renderX;
		var renderY;
		
		
		renderX=0-this.worldOffset+this.shakeR;
		
		
		
		for (var x=0; x<TileMap.MAPWIDTH; x++ ) {
			
				if (renderX>-16 && renderX<displayW) {
					
					renderY=0-this.worldOffsetY+this.shakeR;

					// QQQ We render only 6 tiles heigh, rest is supposedly black area for style and touch controls ;)
					for (var y=0; y<TileMap.MAPHEIGHT; y++) {
						
						if (renderY>-16 && renderY<displayH) {
							
							tile=this.tilemap[x+(y*TileMap.MAPWIDTH)]-1;
							
							if (tile>15) {
								tile-=16;
								renderSubImageAtPoint(sprite, renderX,renderY, tile<<4,16, 16,16);
							} else if (tile>=0) {
								renderSubImageAtPoint(sprite, renderX,renderY, tile<<4,0, 16,16);
							}
						}
						
						renderY+=16;
						
					}
				}
				renderX+=16;
			
		}
	}
		
		
}