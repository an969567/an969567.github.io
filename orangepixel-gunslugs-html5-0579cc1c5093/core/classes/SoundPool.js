 function SoundPool(channelCount) {
	this.useSound=false;
	this.extension='.ogg';
	this.channelCount=channelCount;
	
	// init our pool variables
	this.soundCount=0;
	this.successCount = 0;
	this.errorCount = 0;  
	this.soundList={};
	this.useAudioContext=true;
	
	// check support for OGG or MP3, else we bail out
	this.extension='.ogg';
   	if (!document.createElement('audio').canPlayType('audio/ogg')) {
   		this.extension='.mp3';
   		if (!document.createElement('audio').canPlayType('audio/mpeg')) return; 
   	}

   		
	try{
		this.audioContext = new AudioContext();
	}catch(e) {
		try{
			this.audioContext = new webkitAudioContext();
		}catch(e) {
			// simple <audio> tag, crude but it works in most of these cases
			if (document.createElement('audio').canPlayType) {

				this.useAudioContext=false;
				this.audiochannels = new Array();
				for (i=0;i<channelCount;i++) {
					this.audiochannels[i] = new Array();
					this.audiochannels[i]['channel'] = new Audio();	// create a new audio object
					this.audiochannels[i]['finished'] = -1;			// expected end time for this channel
				}
				
				this.currentChannel=-1;	
			} else {
				return;
			}
		}
	}

	this.useSound=true;
}



SoundPool.prototype.load=function(path,soundid) {
	if (!this.useSound) return;
	this.soundCount++;
	
	path+=this.extension;

	
	if (this.useAudioContext) {
	
		var soundpoolself=this;
		var loadrequest = new XMLHttpRequest();
			loadrequest.open("GET", path, true);
			loadrequest.responseType = "arraybuffer";
			loadrequest.send();
			
			loadrequest.onload = function() {
				  soundpoolself.audioContext.decodeAudioData(loadrequest.response, function onSuccess(decodedBuffer) {
				    // Decoding was successful, do something useful with the audio buffer
				    soundpoolself.soundList[soundid]=decodedBuffer;
				    soundpoolself.successCount++;
				  }, function onFailure() {
				    alert("Decoding the audio buffer failed");
				    soundpoolself.errorCount++;
				  });
			};
	} else {
		var snd=new Audio();
        var soundpoolself=this;
        
        snd.addEventListener("canplaythrough", 
        	function() {
            	soundpoolself.successCount += 1;
        	}, 
        	false);
        
        snd.addEventListener("error", 
        	function() {
        		soundpoolself.errorCount += 1;
    		}, 
    		false);
    	
    	snd.src=path;
		this.soundList[soundid]=snd;	
	}
}

SoundPool.prototype.getTotal = function() {
	return this.soundCount-1;
}

SoundPool.prototype.getDone = function () {
	return (this.successCount + this.errorCount);
}


SoundPool.prototype.isDone = function() {
    return (this.soundCount <= this.successCount + this.errorCount);
}



SoundPool.prototype.playSound=function(soundid, loop) {
	if (!this.useSound || !this.soundList[soundid]) return;

	if (this.useAudioContext) {
		
		var gainNode=this.audioContext.createGain() ? this.audioContext.createGain() : this.audioContext.createGainNode();
		var source=this.audioContext.createBufferSource();
		source.buffer = this.soundList[soundid];
		if (loop) source.loop="loop";

		source.connect(gainNode); 
		gainNode.connect(this.audioContext.destination);
		gainNode.gain.value=0.7;
		source.start(0);
		
	    return {
	      source: source,
	      gainNode: gainNode
	    };		
	} else {
	
		// find first available channel
		var foundChannel=false;
		this.currentChannel=0;
		while (!foundChannel  &&  this.currentChannel<this.audiochannels.length) {
			if (this.audiochannels[this.currentChannel]['channel']) {
				if (this.audiochannels[this.currentChannel]['channel'].src && !this.audiochannels[this.currentChannel]['channel'].ended) {
					this.currentChannel++;
				} else {
					 foundChannel=true;
				} 
			} else {
				foundChannel=true;
			}
		}
		
		if (foundChannel) {
			this.audiochannels[this.currentChannel]['channel'].src = this.soundList[soundid].src;
			this.audiochannels[this.currentChannel]['channel'].load();

			
			this.audiochannels[this.currentChannel]['channel'].play();
			if (loop) {
				this.audiochannels[this.currentChannel]['channel'].addEventListener('ended', 
					function() {
    					this.currentTime = 0;
    					this.play();
					}, false);
				//songLoop(this.audiochannels[this.currentChannel]['channel']) );
			}			

			
			return this.currentChannel;
		}
		return null;
	}
}
 
SoundPool.prototype.stopSound=function(soundid) {
	if (!this.useSound) return;
	if (this.useAudioContext) {
		soundid.source.stop(0);
	} else {
		this.audiochannels[soundid]['channel'].removeEventListener('ended',null);
		this.audiochannels[soundid]['channel'].pause();
		this.audiochannels[soundid]['channel'] = new Audio();
	}
}

SoundPool.prototype.setVolume=function(soundid,volume) {
	if (!this.useSound) return;
	if (this.useAudioContext) {
		soundid.gainNode.gain.value=volume;	
	} else {
		this.audiochannels[soundid]['channel'].volume=volume;
	}
}
