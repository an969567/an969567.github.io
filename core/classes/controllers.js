/**
 * Copyright 2012 Google Inc. All Rights Reserved.
 * @author mwichary@google.com (Marcin Wichary)
 */
 
var firstDevice=-1;
var controllersFound=0;
var twoPlayerController=false;
var last_button=-999;
var last_controller;
	
	// controller1 
var reverse_xaxis=false;
var reverse_yaxis=false;
var x_axis=-999;
var y_axis=-999;
	
var button_a=0;
var button_b=1;
var button_c=2;
var button_d=3;
	
	// controller2
var pl2_last_button=-999;
var pl2_last_controller;
	
	// controller2 
var pl2_reverse_xaxis=false;
var pl2_reverse_yaxis=false;
var pl2_x_axis=-999;
var pl2_y_axis=-999;
	
var pl2_button_a=0;
var pl2_button_b=1;
var pl2_button_c=2;
var pl2_button_d=3;

 
var gamepadSupport = {
  // A number of typical buttons recognized by Gamepad API and mapped to
  // standard controls. Any extraneous buttons will have larger indexes.
  TYPICAL_BUTTON_COUNT: 16,

  // A number of typical axes recognized by Gamepad API and mapped to
  // standard controls. Any extraneous buttons will have larger indexes.
  TYPICAL_AXIS_COUNT: 4,

  // Whether weâ€™re requestAnimationFrameing like itâ€™s 1999.
  ticking: false,

  // The canonical list of attached gamepads, without â€œholesâ€ (always
  // starting at [0]) and unified between Firefox and Chrome.
  gamepads: [],

  // Remembers the connected gamepads at the last check; used in Chrome
  // to figure out when gamepads get connected or disconnected, since no
  // events are fired.
  prevRawGamepadTypes: [],

  // Previous timestamps for gamepad state; used in Chrome to not bother with
  // analyzing the polled data if nothing changed (timestamp is the same
  // as last time).
  prevTimestamps: [],

  /**
   * Initialize support for Gamepad API.
   */
  init: function() {
    // As of writing, it seems impossible to detect Gamepad API support
    // in Firefox, hence we need to hardcode it in the third clause.
    // (The preceding two clauses are for Chrome.)
    var gamepadSupportAvailable = !!navigator.getGamepads ||
        !!navigator.webkitGamepads ||
        (navigator.userAgent.indexOf('Firefox/') != -1);

    if (gamepadSupportAvailable) {
      // Firefox supports the connect/disconnect event, so we attach event
      // handlers to those.
      window.addEventListener('MozGamepadConnected',
                              gamepadSupport.onGamepadConnect, false);
      window.addEventListener('MozGamepadDisconnected',
                              gamepadSupport.onGamepadDisconnect, false);

      // Since Chrome only supports polling, we initiate polling loop straight
      // away. For Firefox, we will only do it if we get a connect event.
      if (!!navigator.webkitGamepads || !!navigator.getGamepads) {
        gamepadSupport.startPolling();
      }
    }
  },
  

  /**
   * React to the gamepad being connected. Today, this will only be executed
   * on Firefox.
   */
  onGamepadConnect: function(event) {
    // Add the new gamepad on the list of gamepads to look after.
    gamepadSupport.gamepads.push(event.gamepad);

    // Ask the tester to update the screen to show more gamepads.
    gamepadSupport.updateGamepads(gamepadSupport.gamepads);

    // Start the polling loop to monitor button changes.
    gamepadSupport.startPolling();
  },

  // This will only be executed on Firefox.
  onGamepadDisconnect: function(event) {
    // Remove the gamepad from the list of gamepads to monitor.
    for (var i in gamepadSupport.gamepads) {
      if (gamepadSupport.gamepads[i].index == event.gamepad.index) {
        gamepadSupport.gamepads.splice(i, 1);
        break;
      }
    }

    // If no gamepads are left, stop the polling loop.
    if (gamepadSupport.gamepads.length == 0) {
      gamepadSupport.stopPolling();
    }

    // Ask the tester to update the screen to remove the gamepad.
    tester.updateGamepads(gamepadSupport.gamepads);
  },

  /**
   * Starts a polling loop to check for gamepad state.
   */
  startPolling: function() {
    // Donâ€™t accidentally start a second loop, man.
    if (!gamepadSupport.ticking) {
      gamepadSupport.ticking = true;
      gamepadSupport.tick();
    }
  },

  /**
   * Stops a polling loop by setting a flag which will prevent the next
   * requestAnimationFrame() from being scheduled.
   */
  stopPolling: function() {
    gamepadSupport.ticking = false;
  },

  /**
   * A function called with each requestAnimationFrame(). Polls the gamepad
   * status and schedules another poll.
   */
  tick: function() {
    gamepadSupport.pollStatus();
    gamepadSupport.scheduleNextTick();
  },

  scheduleNextTick: function() {
    // Only schedule the next frame if we havenâ€™t decided to stop via
    // stopPolling() before.
    if (gamepadSupport.ticking) {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(gamepadSupport.tick);
      } else if (window.mozRequestAnimationFrame) {
        window.mozRequestAnimationFrame(gamepadSupport.tick);
      } else if (window.webkitRequestAnimationFrame) {
        window.webkitRequestAnimationFrame(gamepadSupport.tick);
      }
      // Note lack of setTimeout since all the browsers that support
      // Gamepad API are already supporting requestAnimationFrame().
    }
  },

  /**
   * Checks for the gamepad status. Monitors the necessary data and notices
   * the differences from previous state (buttons for Chrome/Firefox,
   * new connects/disconnects for Chrome). If differences are noticed, asks
   * to update the display accordingly. Should run as close to 60 frames per
   * second as possible.
   */
  pollStatus: function() {
    // Poll to see if gamepads are connected or disconnected. Necessary
    // only on Chrome.
    gamepadSupport.pollGamepads();
    

    for (var i in gamepadSupport.gamepads) {
      var gamepad = gamepadSupport.gamepads[i];

      // Donâ€™t do anything if the current timestamp is the same as previous
      // one, which means that the state of the gamepad hasnâ€™t changed.
      // This is only supported by Chrome right now, so the first check
      // makes sure weâ€™re not doing anything if the timestamps are empty
      // or undefined.
      if (gamepad.timestamp &&
          (gamepad.timestamp == gamepadSupport.prevTimestamps[i])) {
        continue;
      }
      gamepadSupport.prevTimestamps[i] = gamepad.timestamp;

		// refresh values
		gamepadSupport.updateGamepads(gamepadSupport.gamepads);

    }
  },

  // This function is called only on Chrome, which does not yet support
  // connection/disconnection events, but requires you to monitor
  // an array for changes.
  pollGamepads: function() {

    // Get the array of gamepads â€“ the first method (function call)
    // is the most modern one, the second is there for compatibility with
    // slightly older versions of Chrome, but it shouldnâ€™t be necessary
    // for long.
    var rawGamepads =
        (navigator.getGamepads && navigator.getGamepads()) ||
        navigator.webkitGamepads;

	controllersFound=0;
	
    if (rawGamepads) {
      // We donâ€™t want to use rawGamepads coming straight from the browser,
      // since it can have â€œholesâ€ (e.g. if you plug two gamepads, and then
      // unplug the first one, the remaining one will be at index [1]).
      gamepadSupport.gamepads = [];

      // We only refresh the display when we detect some gamepads are new
      // or removed; we do it by comparing raw gamepad table entries to
      // â€œundefined.â€
      var gamepadsChanged = false;

      for (var i = 0; i < rawGamepads.length; i++) {
        if (typeof rawGamepads[i] != gamepadSupport.prevRawGamepadTypes[i]) {
          gamepadsChanged = true;
          gamepadSupport.prevRawGamepadTypes[i] = typeof rawGamepads[i];
        }

        if (rawGamepads[i]) {
			if (firstDevice<0) firstDevice=i;
			controllersFound++;
			gamepadSupport.gamepads.push(rawGamepads[i]);
			alert(controllersFound);
        }
      }

    }
  },
  
  updateGamepads: function(gamepads) {
	for (var i in gamepads) {
		var gamepad = gamepads[i];
		
		if (gamepad) {
			isAnalog=true;
			
			if (i==firstDevice) {
				pl1_stickX=gamepad.axes[0]*128;
				pl1_stickY=gamepad.axes[1]*128;
				
				if (reverse_xaxis) pl1_stickX=-pl1_stickX;
				if (reverse_yaxis) pl1_stickY=-pl1_stickY;
				
				if (pl1_stickX<-12) leftPressed=true;
				else {
					leftPressed=false
					leftLocked=false;
				}
				
				if (pl1_stickX>12) rightPressed=true;
				else {
					rightPressed=false;
					rightLocked=false;
				}
				
				if (pl1_stickY<-12) upPressed=true;
				else {
					upPressed=false
					upLocked=false;
				}
				
				if (pl1_stickY>12) downPressed=true;
				else {
					downPressed=false;
					downLocked=false;
				}
				
				last_button=-999;
				if (gamepad.buttons[0]) last_button=0;
				else if (gamepad.buttons[1]) last_button=1;
				else if (gamepad.buttons[2]) last_button=2;
				else if (gamepad.buttons[3]) last_button=3;
				else if (gamepad.buttons[4]) last_button=4;
				
				if (gamepad.buttons[button_a]) {
					actionButton2=true;
				} else {
					actionButton2=false;
					actionButton2Locked=false;
				}
				if (gamepad.buttons[button_b]) {
					actionButton1=true;
				} else {
					actionButton1=false;
					actionButton1Locked=false;
				}
				if (gamepad.buttons[button_c]) {
					backPressed=true;
				} else {
					backPressed=false;
					backLocked=false;
				}
			}
			
							
			padsConnected = true;
		}
	}
  
  }

};