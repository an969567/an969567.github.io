chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.htm', {
  	id: "gunslugs",
    bounds: {
      width: 1024,
      height: 640,
    },
    minWidth: 960,
    minHeight: 640
  });
});