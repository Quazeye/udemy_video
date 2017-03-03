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

function setupInput() {
	// listen for mouse movement and sent it as an event to updateMousePos
	canvas.addEventListener('mousemove', updateMousePos);

	//listen for keyboard input
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
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
