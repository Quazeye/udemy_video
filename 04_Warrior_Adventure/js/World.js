// world variables
const World_W = 50;
const World_H = 50;
const World_Gap = 2;
const World_Cols = 16;
const World_Rows = 12;

// world array - creates a new array with world laid out by hand.

var levelOne =  [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
				 1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 0, 1,
				 1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1,
				 1, 2, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 1,
				 1, 0, 0, 1, 3, 3, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var worldGrid = [];

const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_GOAL = 3;
const WORLD_TREE = 4;
const WORLD_FLAG = 5;



function returnTileTypeAtColRow(col,row) {
	if(col >= 0 && col < World_Cols && 
	   row >=0 && row < World_Rows) {
		var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		return worldGrid[worldIndexUnderCoord];
	} else {
		return WORLD_WALL;
	}
}

function getTileTypeAtPixelCoord(atX, atY) {
	// find which column and row the warrior is in
	var warriorWorldCol = Math.floor(atX / World_W);
	var warriorWorldRow = Math.floor(atY / World_H);

	// find the array index under the warrior
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	// check to make sure warrior is within play area
	if(warriorWorldCol >= 0 && warriorWorldCol < World_Cols && 
	   warriorWorldRow >=0 && warriorWorldRow < World_Rows) {
		var tileHere = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow);
		
		return tileHere;
	} // end of valid col and row

	return WORLD_WALL; // treat outside the map boundary as solid area
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row) {
	return col + World_Cols * row;
}

function drawWorlds() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0; eachRow<World_Rows; eachRow++) {
		for(var eachColumn=0; eachColumn<World_Cols; eachColumn++) {
			var tileKindHere = worldGrid[arrayIndex];			
			var useImg = worldPics[tileKindHere];
			canvasContext.drawImage(useImg,drawTileX,drawTileY);

			drawTileX += World_W;
			arrayIndex++;
		} // end of for each col
		drawTileX = 0;
		drawTileY += World_H;
	} //end of for each row
} // end of drawWorlds func