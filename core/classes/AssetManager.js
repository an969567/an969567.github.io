
function AssetManager() {
	this.successCount = 0;
	this.errorCount = 0;  
	this.cache = {};
	this.images = [];
	this.downloadQueue = [];
	this.resourceRoot="";
}

AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}

AssetManager.prototype.setRoot = function (res) {
	this.resourceRoot=res;
}

AssetManager.prototype.downloadAll = function(downloadCallback) {
	if (this.downloadQueue.length === 0) {
		downloadCallback();
  	}
  	
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            that.successCount += 1;
            
/*	
			// resize attempt.. not working fast enough tho            
		    var src_canvas = document.createElement('canvas');
		    src_canvas.width = this.width;
		    src_canvas.height = this.height;
		
		    var src_ctx = src_canvas.getContext('2d');
		    src_ctx.drawImage(this, 0,0);
		    var src_data = src_ctx.getImageData(0, 0, this.width, this.height).data;
		
		    var dst_canvas = document.createElement('canvas');
		    dst_canvas.width = this.width * 4;
		    dst_canvas.height = this.height * 4;
		    var dst_ctx = dst_canvas.getContext('2d');
		
		    var offset = 0;
		    for (var y = 0; y < this.height; ++y) {
		        for (var x = 0; x < this.width; ++x) {
		            var r = src_data[offset++];
		            var g = src_data[offset++];
		            var b = src_data[offset++];
		            var a = src_data[offset++] / 100.0;
		            dst_ctx.fillStyle = 'rgba(' + [r, g, b, a].join(',') + ')';
		            dst_ctx.fillRect(x*4, y*4, 4, 4);
		        }
		    }
		    
		    this.src=dst_canvas.toDataURL("image/png");
*/            
			if (that.isDone()) {
        		downloadCallback();
    		}            
        }, false);
        img.addEventListener("error", function() {
        	that.errorCount += 1;
			if (that.isDone()) {
        		downloadCallback();
    		}        	
    	}, false);
    	
        img.src = this.resourceRoot+"/"+path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.getTotal = function() {
	return this.downloadQueue.length-1;
}

AssetManager.prototype.getDone = function () {
	return (this.successCount + this.errorCount);
}

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length <= this.successCount + this.errorCount);
}


AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}

// resizer for pixelart (no aliasing)
AssetManager.prototype.noalias = function(scale) {
		for (var i= this.downloadQueue.length; --i>=0;) {
			
			var img=this.cache[this.downloadQueue[i]];
			
		    var src_canvas = document.createElement('canvas');
		    src_canvas.width = img.width;
		    src_canvas.height = img.height;
		
		    var src_ctx = src_canvas.getContext('2d');
		    src_ctx.drawImage(img, 0,0);
		    var src_data = src_ctx.getImageData(0, 0, img.width, img.height).data;
/*		    
ctx.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height, 0, 0, 200, 200);
var scaledImage = new Image();
scaledImage.onload = ...;
scaledImage.src = canvas.toDataURL("image/png");		    
*/		    
		
		    var dst_canvas = document.createElement('canvas');
		    dst_canvas.width = img.width * scale;
		    dst_canvas.height = img.height * scale;
		    var dst_ctx = dst_canvas.getContext('2d');
		
		    var offset = 0;
		    for (var y = 0; y < img.height; ++y) {
		        for (var x = 0; x < img.width; ++x) {
		            var r = src_data[offset++];
		            var g = src_data[offset++];
		            var b = src_data[offset++];
		            var a = src_data[offset++] / 100.0;
		            dst_ctx.fillStyle = 'rgba(' + [r, g, b, a].join(',') + ')';
		            dst_ctx.fillRect(x * scale, y * scale, scale, scale);
		        }
		    }
		    
		    img.src=dst_canvas.toDataURL("image/png");
		}

}




