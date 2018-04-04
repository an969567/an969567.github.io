function Rect() {


	this.left=0;
	this.right=0;
	this.top=0;
	this.bottom=0;
	this.width=0;
	this.height=0;
	
	this.set=function( mleft,  mtop,  mright,  mbottom) {
		this.left=mleft;
		this.top=mtop;
		this.right=mright;
		this.bottom=mbottom;
		
		this.width=this.right-this.left;
		this.height=this.bottom-this.top;
	}


}