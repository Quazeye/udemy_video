// track variables
const Track_W = 40;
const Track_H = 40;
const Track_Gap = 2;
const Track_Cols = 20;
const Track_Rows = 15;

// track array - creates a new array with track laid out by hand.
var trackGrid = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
				 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
				 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				 1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 3, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 5, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
				 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
				 0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
				 0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;



function isObstacleAtColRow(col,row) {
	if(col >= 0 && col < Track_Cols && 
	   row >=0 && row < Track_Rows) {
		var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		return(trackGrid[trackIndexUnderCoord] != TRACK_ROAD);
	} else {
		return false;
	}
}

function carTrackHandling(whichCar) {
	// find which column and row the car is in
	var carTrackCol = Math.floor(whichCar.x / Track_W);
	var carTrackRow = Math.floor(whichCar.y / Track_H);

	// find the array index under the car
	var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

	// check to make sure car is within play area
	if(carTrackCol >= 0 && carTrackCol < Track_Cols && 
	   carTrackRow >=0 && carTrackRow < Track_Rows) {
		
		// if car hits wall reduce its speed and reverse it
		if(isObstacleAtColRow(carTrackCol, carTrackRow)) {
			// next two lines added to fix car burrows into wall bug in video 9.6.
			// undoes car movement which got it onto the wall.
			whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
			whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

			whichCar.speed *= -0.5;
		} // end of track found
	} // end of valid col and row
} // end of carTrackHandling func

function rowColToArrayIndex(col, row) {
	return col + Track_Cols * row;
}

function drawTracks() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0; eachRow<Track_Rows; eachRow++) {
		for(var eachColumn=0; eachColumn<Track_Cols; eachColumn++) {
			var tileKindHere = trackGrid[arrayIndex];			
			var useImg = trackPics[tileKindHere];
			canvasContext.drawImage(useImg,drawTileX,drawTileY);

			drawTileX += Track_W;
			arrayIndex++;
		} // end of for each col
		drawTileX = 0;
		drawTileY += Track_H;
	} //end of for each row
} // end of drawTracks func