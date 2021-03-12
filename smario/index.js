// constant values
var GRAVITY = 5;
var MAP_HEIGHT = 720;
var WORLD_WIDTH = 30;

var mario = {
	x: 300,
	y: 300,
	left: '-2px',
	top: '-252px',
	isBig: false,
	jumped: false,
	comingDown: false,
	speed: 0,
	poses: ['-2px', '-6px', '-120px', '-188px'],
};

var map = {
	background: {
		skySmall: {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
		},
		skyBig: {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
		},
	},
	obstacles: {
		brick: {
			left: '-78px',
			top: '-922px',
			width: 20,
			height: 20,
			x: 0,
			y: MAP_HEIGHT - 20,
		},
		wide: {
			left: '-2px',
			top: '-137px',
			width: 128,
			height: 88,
			x: 0,
			y: MAP_HEIGHT - 20,
		},
		medium: {
			left: '-120px',
			top: '-162px',
			width: 79,
			height: 64,
			x: 0,
			y: MAP_HEIGHT - 20,
		},
		tall: {
			left: '-299px',
			top: '-97px',
			width: 50,
			height: 129,
			x: 0,
			y: MAP_HEIGHT - 20,
		},
		small: {
			left: '-279px',
			top: '-185px',
			width: 64,
			height: 41,
		},
		extraSmall: {
			left: '-355px',
			top: '-185px',
			width: 48,
			height: 41,
		},
		greenTall: {
			left: '-299px',
			top: '-384px',
			width: 33,
			height: 64,
		},
		greenMedium: {
			left: '-270px',
			top: '-400px',
			width: 33,
			height: 48,
		},
		greenSmall: {
			left: '-308px',
			top: '-415px',
			width: 33,
			height: 41,
		},
		whiteTall: {
			left: '-299px',
			top: '-384px',
			width: 33,
			height: 64,
		},
		whiteMedium: {
			left: '-270px',
			top: '-400px',
			width: 33,
			height: 48,
		},
		whiteSmall: {
			left: '-308px',
			top: '-415px',
			width: 33,
			height: 41,
		},
	},
};

var obstacles = [];
var obstacleProbabilities = (function (e) {
	let values = [];
	for (let i = 1; i <= 100; i++) {
		// probabilities of blocks on the map
		if (i >= 80) {
			values.push('brick');
		} else if (i >= 75) {
			values.push('wide');
		} else if (i >= 70) {
			values.push('tall');
		} else {
			values.push('brick');
		}
	}
	return values;
})();

function drawWorld() {}

function generateObstacle() {
	let obstacle =
		map.obstacles[
			obstacleProbabilities[
				Math.floor(Math.random() * obstacleProbabilities.length)
			]
		];
	obstacle.x = Math.random() * 1270;
	return obstacle;
}

function generateObstacles() {
	for (let i = 0; i < WORLD_WIDTH; i++) {
		obstacles.push(generateObstacle());
	}
	console.log(obstacles);
}
generateObstacles();

function drawCharacter() {
	document.getElementById('mario').style.top = mario.y + 'px';
	document.getElementById('mario').style.left = mario.x + 'px';
}

function drawObstacles() {
	var render = '';
	for (let i = 0; i < obstacles.length; i++) {
		render +=
			'<div class="obstacle" style="top:' +
			Math.floor(obstacles[i].y) +
			'px; left:' +
			Math.floor(obstacles[i].x) +
			'px; width:' +
			obstacles[i].width +
			'px; height: ' +
			obstacles[i].height +
			'px; background-position:' +
			obstacles[i].left +
			' ' +
			obstacles[i].top +
			'"></div>';
	}
	document.getElementById('obstacles').innerHTML = render;
}

function gravity() {
	mario.speed += GRAVITY;
	mario.y += mario.speed;
	if (mario.y >= MAP_HEIGHT) {
		mario.speed = 0;
		mario.y = 300;
	}
}

function isOnPlatform() {
	for (let i = 0; i < obstacles.length; i++) {
		if (
			Math.abs(obstacles[i].x - mario.x) < obstacles[i].width &&
			Math.abs(obstacles[i].y - mario.y) < 5
		) {
			return true;
		}
	}
}

function gameLoop() {
	// if (jumped == 1 && coming_down == false) {
	// 	character_y = character_y - 20;
	// 	jumped = 2;
	// } else if (jumped == 2) {
	// 	character_y = character_y + 20;
	// 	coming_down = true;
	// 	jumped = 1;
	// } else if (jumped == 1 && coming_down == true) {
	// 	character_y = character_y + 20;
	// 	jumped = 0;
	// 	coming_down = false;
	// }
	drawWorld();
	drawCharacter();
	drawObstacles();
	gravity();
}

setInterval(gameLoop, 83);

document.onkeydown = function (e) {
	switch (e.code) {
		case 'ArrowRight':
			break;
		case 'ArrowLeft':
			break;
		case 'ArrowUp':
			break;
		case 'ArrowDown':
			break;
		case 'Space':
			mario.speed = 0;
			mario.y -= 150;
			if (!mario.jumped) {
			}
			break;
		default:
			hasMatch = false;
			break;
	}
	// if (e.keyCode == 37) {
	// 	x--;
	// } else if (e.keyCode == 39 && world[y][x + 1] == 0) {
	// 	x++;
	// 	console.log(y, x, world[y][x]);
	// }
	// //jumping
	// if (e.keyCode == 32 && jumped == 0) {
	// 	character_y = character_y - 20;
	// 	jumped = 1;
	// }
	// console.log(e.keyCode);
};
