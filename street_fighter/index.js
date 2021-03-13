var action = 'STANDING';

var character1Element = document.querySelector('#character1');
var character2Element = document.querySelector('#character2');
var healthBar1Element = document.querySelector('#healthbar1');
var healthBar2Element = document.querySelector('#healthbar2');

var actions = {
	STANDING: {
		y: '-80px',
		frames: 4,
	},
	FIRE: {
		y: '0px',
		frames: 4,
	},
	PUNCH: {
		y: '-160px',
		frames: 3,
	},
	MOVE: {
		y: '-240px',
		frames: 5,
	},
	KICK: {
		y: '-480px',
		frames: 5,
	},
	KICK: {
		y: '-480px',
		frames: 5,
	},
	ROUND_KICK: {
		y: '-560px',
		frames: 5,
	},
	JUMP: {
		y: '-640px',
		frames: 7,
	},
	SIT: {
		y: '-720px',
		frames: 1,
	},
};

var character1 = {
	top: 185,
	left: 100,
	health: 100,
	frame: 0,
	action: 'STANDING',
	speed: 0,
	toLeft: false,
};
var character2 = {
	top: 185,
	left: 400,
	health: 100,
	frame: 0,
	action: 'STANDING',
	speed: 0,
	toLeft: true,
};

var fires = [];

function characterAction(character, opponent) {
	let background = '';
	let frames = 0;
	switch (character.action) {
		case 'STANDING':
			background =
				"url('ken.png') -" +
				character.frame * 70 +
				'px ' +
				actions.STANDING.y;
			frames = actions.STANDING.frames;
			break;
		case 'MOVE':
			background =
				"url('ken.png') -" +
				character.frame * 70 +
				'px ' +
				actions.MOVE.y;
			frames = actions.MOVE.frames;
			break;
		case 'JUMP':
			background =
				"url('ken.png') -" +
				character.frame * 70 +
				'px ' +
				actions.JUMP.y;
			frames = actions.JUMP.frames;
			break;
		case 'SIT':
			background =
				"url('ken.png') -" +
				character.frame * 70 +
				'px ' +
				actions.SIT.y;
			frames = actions.SIT.frames;
			break;
		case 'PUNCH':
			if (
				character.frame == 2 &&
				character1.left > character2.left - 150 &&
				character1.left < character2.left + 50
			) {
				opponent.health -= 5;
			}
			background =
				"url('ken.png') -" +
				character.frame * 70 +
				'px ' +
				actions.PUNCH.y;

			frames = actions.PUNCH.frames;
			break;
		case 'ROUND_KICK':
			if (
				character.frame == 2 &&
				character1.left > character2.left - 150 &&
				character1.left < character2.left + 50
			) {
				opponent.health -= 8;
			}
			background =
				"url('ken.png') -" +
				character.frame * 70 +
				'px ' +
				actions.ROUND_KICK.y;
			frames = actions.ROUND_KICK.frames;
			break;
		case 'KICK':
			if (
				character.frame == 2 &&
				character1.left > character2.left - 150 &&
				character1.left < character2.left + 50
			) {
				opponent.health -= 8;
			}
			background =
				"url('ken.png') -" +
				character.frame * 70 +
				'px ' +
				actions.KICK.y;
			frames = actions.KICK.frames;
			break;
		case 'FIRE':
			background =
				"url('ken.png') -" +
				character.frame * 70 +
				'px ' +
				actions.FIRE.y;
			frames = actions.FIRE.frames;
			if (character.frame == 3) {
				if (character.toLeft) {
					fires.push({
						left: character.left - 50,
						top: character.top - 8,
						toLeft: true,
					});
				} else {
					fires.push({
						left: character.left + 50,
						top: character.top - 8,
						toLeft: false,
					});
				}
			}
			break;
		default:
			background = "url('ken.png') -" + character.frame * 70 + 'px -80px';
	}

	character.frame++;
	if (character.frame >= frames) {
		character.frame = 0;
		character.action = 'STANDING';
	}
	return background;
}

function updateHealthBar() {
	healthBar1Element.style.width = character1.health * 2.3 + 'px';
	healthBar2Element.style.width = character2.health * 2.3 + 'px';
}

function updateFires() {
	for (let i = 0; i < fires.length; i++) {
		let opponent = character2;
		if (fires[i].toLeft) {
			opponent = character1;
			fires[i].left -= 10;
		} else {
			fires[i].left += 10;
		}
		if (
			(fires[i].left > opponent.left - 10 &&
				fires[i].left < opponent.left + 10 &&
				fires[i].top > opponent.top - 80) ||
			fires[i].left >= 800
		) {
			opponent.health -= 20;
			console.log(character1);
			if (fires[i].toLeft) {
				opponent.left -= 10;
			} else {
				opponent.left += 10;
			}
			opponent.top -= 10;
			fires[i] = fires[fires.length - 1];
			fires.pop();
		}
	}
}

function renderFires() {
	let render = '';
	for (let i = 0; i < fires.length; i++) {
		let reflectFire = '';
		if (fires[i].toLeft) {
			reflectFire = ';transform: scaleX(-1)';
		}
		render +=
			'<div class="fire" style="left:' +
			fires[i].left +
			'px;top:' +
			fires[i].top +
			'px' +
			reflectFire +
			' "></div>';
	}
	document.getElementById('fires').innerHTML = render;
}

function applyGravity(character) {
	character.speed += 5;
	character.top += character.speed;
	if (character.top >= 180) {
		character.speed = 0;
		character.top = 180;
	}
}

function displayCharacters() {
	applyGravity(character1);
	applyGravity(character2);

	character1Element.style.top = character1.top + 'px';
	character1Element.style.left = character1.left + 'px';
	character2Element.style.top = character2.top + 'px';
	character2Element.style.left = character2.left + 'px';

	character1Element.style.background = characterAction(
		character1,
		character2
	);
	character2Element.style.background = characterAction(
		character2,
		character1
	);
}

document.onkeydown = function (e) {
	console.log(e);
	switch (e.code) {
		case 'ArrowRight':
			character2.left += 10;
			character2.action = 'MOVE';
			break;
		case 'ArrowLeft':
			character2.left -= 10;
			character2.action = 'MOVE';
			break;
		case 'ArrowUp':
			if (character2.action != 'JUMP') {
				character2.top -= 80;
			}
			character2.action = 'JUMP';
			break;
		case 'ArrowDown':
			character2.action = 'SIT';
			break;
		case 'KeyD':
			character1.left += 10;
			character1.action = 'MOVE';
			break;
		case 'KeyA':
			character1.left -= 10;
			character1.action = 'MOVE';
			break;
		case 'KeyW':
			if (character1.action != 'JUMP') {
				character1.top -= 80;
			}
			character1.action = 'JUMP';
			break;
		case 'KeyS':
			character1.action = 'SIT';
			break;
		case 'Period':
			character2.action = 'PUNCH';
			break;
		case 'Slash':
			character2.action = 'ROUND_KICK';
			break;
		case 'KeyM':
			character2.action = 'FIRE';
			break;
		case 'Comma':
			character2.action = 'KICK';
			break;
		case 'KeyQ':
			character1.action = 'PUNCH';
			break;
		case 'KewE':
			character1.action = 'ROUND_KICK';
			break;
		case 'KeyZ':
			character1.action = 'FIRE';
			break;
		case 'KeyX':
			character1.action = 'KICK';
			break;

		default:
			break;
	}
	character1.frame = 0;
};

function GameLoop() {
	displayCharacters();
	updateFires();
	renderFires();
	updateHealthBar();
}

setInterval(GameLoop, 150);
