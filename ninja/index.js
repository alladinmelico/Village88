const character = document.querySelector('#character');
var leftValue = 0;
var topValue = 0;
var BACKGROUND_WIDTH = 500;
var BACKGROUND_HEIGHT = 500;
var CHARACTER_WIDTH = 58;
var CHARACTER_HEIGHT = 85;

function update() {
	character.style.left = leftValue + 'px';
	character.style.top = topValue + 'px';
	console.log(character.style.left, character.style.top);
}

function isInsideGame() {
	if (
		leftValue <= BACKGROUND_WIDTH - CHARACTER_SIZE &&
		topValue <= BACKGROUND_HEIGHT - CHARACTER_SIZE &&
		leftValue >= 0 &&
		topValue >= 0
	) {
		return true;
	}
	return false;
}

document.onkeydown = function (e) {
	let characterBG = character.style.backgroundImage;
	console.log(characterBG);
	if (
		e.key === 'ArrowRight' &&
		leftValue < BACKGROUND_WIDTH - CHARACTER_WIDTH
	) {
		// RIGHT
		leftValue += 10;
		if (characterBG == 'url("right1.png")') {
			console.log('to right 2');
			character.style.backgroundImage = "url('right2.png')";
		} else {
			console.log('to right 1');
			character.style.backgroundImage = "url('right1.png')";
		}
	} else if (e.key === 'ArrowLeft' && leftValue > 0) {
		// LEFT
		leftValue -= 10;
		if (characterBG == 'url("left1.png")') {
			character.style.backgroundImage = "url('left2.png')";
		} else {
			character.style.backgroundImage = "url('left1.png')";
		}
	} else if (
		e.key === 'ArrowDown' &&
		topValue < BACKGROUND_HEIGHT - CHARACTER_HEIGHT
	) {
		// DOWN
		topValue += 10;
		if (characterBG == 'url("down1.png")') {
			character.style.backgroundImage = "url('down2.png')";
		} else {
			character.style.backgroundImage = "url('down1.png')";
		}
	} else if (e.key === 'ArrowUp' && topValue > 0) {
		// UP
		topValue -= 10;
		if (characterBG == 'url("top1.png")') {
			character.style.backgroundImage = "url('top2.png')";
		} else {
			character.style.backgroundImage = "url('top1.png')";
		}
	}
	update();
};
