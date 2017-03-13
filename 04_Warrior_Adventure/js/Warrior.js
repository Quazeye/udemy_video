const WALKING_SPEED = 3.0;

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
		var nextX = this.x;
		var nextY = this.y;

		if(this.keyHeld_North) {
			nextY -= WALKING_SPEED;
		}
		if(this.keyHeld_East) {
			nextX += WALKING_SPEED;
		}
		if(this.keyHeld_South) {
			nextY += WALKING_SPEED;
		}
		if(this.keyHeld_West) {
			nextX -= WALKING_SPEED;
		}

		var walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY);

		if(walkIntoTileIndex == WORLD_GOAL) {
			console.log(this.name + " WINS!");
			loadLevel(levelOne)
		} else if(walkIntoTileIndex == WORLD_ROAD) {
			this.x = nextX;
			this.y = nextY;
		}
		
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, 0);	
	}
}