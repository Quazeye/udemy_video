var carPic = document.createElement("img");
var carPicLoaded = false;

// car variables
var carX = 75;
var carY = 75;
var carAng = 0;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;

// track variables
const Track_W = 40;
const Track_H = 40;
const Track_Gap = 2;
const Track_Cols = 20;
const Track_Rows = 15;

// track array - creates a new array with track laid out by hand.
var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
				 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;

var canvas, canvasContext;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

var mouseX = 0;
var mouseY = 0;

function updateMousePos(evt) {
	
	// gets the canvas bounding rectangle and root document
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	// mouse X postition is equal to the mousemove evt clientX
	// - the left bounding rectable (rect.left) - the root documents
	// scroll left..
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

}

function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	if(evt.keyCode == KEY_LEFT_ARROW) {
		keyHeld_TurnLeft = true;
	}
	if(evt.keyCode == KEY_RIGHT_ARROW) {
		keyHeld_TurnRight = true;
	}
	if(evt.keyCode == KEY_UP_ARROW) {
		keyHeld_Gas = true;
	}
	if(evt.keyCode == KEY_DOWN_ARROW) {
		keyHeld_Reverse = true;
	}

	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key Released: "+evt.keyCode);
	if(evt.keyCode == KEY_LEFT_ARROW) {
		keyHeld_TurnLeft = false;
	}
	if(evt.keyCode == KEY_RIGHT_ARROW) {
		keyHeld_TurnRight = false;
	}
	if(evt.keyCode == KEY_UP_ARROW) {
		keyHeld_Gas = false;
	}
	if(evt.keyCode == KEY_DOWN_ARROW) {
		keyHeld_Reverse = false;
	}

	evt.preventDefault();
}


// function to fill array with value true.  

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	// listen for mouse movement and sent it as an event to updateMousePos
	canvas.addEventListener('mousemove', updateMousePos);

	//listen for keyboard input
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	carPic.onload = function() {
		carPicLoaded = true;
	}
	carPic.src = "player1car.png";

	carReset();
}

function carReset() {
	for(var eachRow=0; eachRow<Track_Rows; eachRow++) {
		for(var eachColumn=0; eachColumn<Track_Cols; eachColumn++) {
			var arrayIndex = rowColToArrayIndex(eachColumn, eachRow);
			if(trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
				trackGrid[arrayIndex] = TRACK_ROAD;
				carAng = -Math.PI/2;  // starts with car facing north
				carX = eachColumn * Track_W + Track_W / 2;
				carY = eachRow * Track_H + Track_H / 2;
			}
		}
	}
}

function updateAll() {
	moveAll();
	drawAll();
}

function carMove() {
	carSpeed *= GROUNDSPEED_DECAY_MULT;

	if(keyHeld_Gas) {
		carSpeed += DRIVE_POWER;
	}
	if(keyHeld_Reverse) {
		carSpeed -= REVERSE_POWER;
	}
	if(keyHeld_TurnLeft) {
		carAng -= TURN_RATE;
	}
	if(keyHeld_TurnRight) {
		carAng += TURN_RATE;
	}

	carX += Math.cos(carAng) * carSpeed;
	carY += Math.sin(carAng) * carSpeed;
}

function isWallAtColRow(col,row) {
	if(col >= 0 && col < Track_Cols && 
	   row >=0 && row < Track_Rows) {
		var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		return(trackGrid[trackIndexUnderCoord] == TRACK_WALL);
	} else {
		return false;
	}
}

function carTrackHandling() {
	// find which column and row the car is in
	var carTrackCol = Math.floor(carX / Track_W);
	var carTrackRow = Math.floor(carY / Track_H);

	// find the array index under the car
	var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

	// check to make sure car is within play area
	if(carTrackCol >= 0 && carTrackCol < Track_Cols && 
	   carTrackRow >=0 && carTrackRow < Track_Rows) {
		
		// if car hits wall reduce its speed and reverse it
		if(isWallAtColRow(carTrackCol, carTrackRow)) {
			// next two lines added to fix car burrows into wall bug in video 9.6.
			// undoes car movement which got it onto the wall.
			carX -= Math.cos(carAng) * carSpeed;
			carY -= Math.sin(carAng) * carSpeed;

			carSpeed *= -0.5;
		} // end of track found
	} // end of valid col and row
} // end of carTrackHandling func

function moveAll() {
	carMove();
	
	carTrackHandling();

}

function rowColToArrayIndex(col, row) {
	return col + Track_Cols * row;
}

function drawTracks() {

	for(var eachRow=0; eachRow<Track_Rows; eachRow++) {
		for(var eachColumn=0; eachColumn<Track_Cols; eachColumn++) {
	
			var arrayIndex = rowColToArrayIndex(eachColumn, eachRow);

			if(trackGrid[arrayIndex] == TRACK_WALL) {
				colorRect(Track_W*eachColumn,Track_H*eachRow, Track_W-Track_Gap, Track_H-Track_Gap, 'blue');
			} // end of if track is visible
		} // end of for each track
	}

} // end of drawTracks func

function drawAll() {
	// clear the screen
	colorRect(0,0, canvas.width, canvas.height, 'black');
	
	// draw the car
	// colorCircle(carX, carY, 10, 'white');
	if(carPicLoaded) {
		drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
	}

	drawTracks();
	
}

// function to draw a bitmap with a rotation
function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
	
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap,-useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();

}

// function to draw colored rectangles
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

// function to draw colored circles
function colorCircle(centerX, centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

// function to draw colored text
function colorText(showWords, textX, textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}