const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;


function warriorClass() {

	this.x = 75;
	this.y = 75;
	this.ang = 0;
	this.speed = 0;
	this.myWarriorPic; // which picture to use
	this.name = "Untitled Warrior";

	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.keyHeld_East = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft =leftKey; 
	}

	this.reset = function(whichImage, warriorName) {
		this.name = warriorName;
		this.myWarriorPic = whichImage;
		this.speed = 0;

		for(var eachRow=0; eachRow<World_Rows; eachRow++) {
			for(var eachColumn=0; eachColumn<World_Cols; eachColumn++) {
				var arrayIndex = rowColToArrayIndex(eachColumn, eachRow);
				if(worldGrid[arrayIndex] == WORLD_PLAYERSTART) {
					worldGrid[arrayIndex] = WORLD_ROAD;
					this.ang = -Math.PI/2;  // starts with warrior facing north
					this.x = eachColumn * World_W + World_W / 2;
					this.y = eachRow * World_H + World_H / 2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of warriorReset func

	this.move = function() {
		this.speed *= GROUNDSPEED_DECAY_MULT;

		if(this.keyHeld_North) {
			this.speed += DRIVE_POWER;
		}
		if(this.keyHeld_South) {
			this.speed -= REVERSE_POWER;
		}
		if(Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
			if(this.keyHeld_West) {
				this.ang -= TURN_RATE;
			}
			if(this.keyHeld_East) {
				this.ang += TURN_RATE;
			}
		}
		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;

			warriorWorldHandling(this);
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, this.ang);	
	}
}