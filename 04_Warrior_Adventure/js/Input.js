const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;



var mouseX = 0;
var mouseY = 0;

function setupInput() {
	// listen for mouse movement and sent it as an event to updateMousePos
	canvas.addEventListener('mousemove', updateMousePos);

	//listen for keyboard input
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	// greenWarrior.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
	blueWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);

}

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

function keySet(keyEvent, whichWarrior, setTo) {
	if(keyEvent.keyCode == whichWarrior.controlKeyLeft) {
		whichWarrior.keyHeld_TurnLeft = setTo;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyRight) {
		whichWarrior.keyHeld_TurnRight = setTo;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyUp) {
		whichWarrior.keyHeld_Gas = setTo;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyDown) {
		whichWarrior.keyHeld_Reverse = setTo;
	}
}

function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	// keySet(evt,greenWarrior,true);
	keySet(evt,blueWarrior,true);

	// evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key Released: "+evt.keyCode);
	// keySet(evt,greenWarrior,false);
	keySet(evt,blueWarrior,false);
	
	// evt.preventDefault();
}
