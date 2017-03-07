var roadPic = document.createElement("img");
var wallPic = document.createElement("img");

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

function trackLoadImages() {
	roadPic.src = "track_road.png";
	wallPic.src = "track_wall.png";
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

function rowColToArrayIndex(col, row) {
	return col + Track_Cols * row;
}

function drawTracks() {

	for(var eachRow=0; eachRow<Track_Rows; eachRow++) {
		for(var eachColumn=0; eachColumn<Track_Cols; eachColumn++) {
	
			var arrayIndex = rowColToArrayIndex(eachColumn, eachRow);

			if(trackGrid[arrayIndex] == TRACK_ROAD) {
				canvasContext.drawImage(roadPic,Track_W*eachColumn,Track_H*eachRow);
			} else if(trackGrid[arrayIndex] == TRACK_WALL) {
				canvasContext.drawImage(wallPic,Track_W*eachColumn,Track_H*eachRow);
			}

		} // end of for each col
	} //end of for each row
} // end of drawTracks func