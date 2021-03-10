var maps = [];
var score = 0;

var map = selectRandomMap();

function selectRandomMap() {
	generateMap();
	return maps[Math.floor(Math.random() * maps.length)];
}

function generateMap() {
	var MAP_WIDTH = 30;
	var MAP_HEIGHT = 30;
	let values = [];
	map = [];
	for (let i = 1; i <= 100; i++) {
		// probabilities of blocks on the map
		if (i >= 98) {
			values.push(5);
		} else if (i >= 85) {
			values.push(4);
		} else if (i >= 60) {
			values.push(2);
		} else {
			values.push(1);
		}
	}
	for (let map = 0; map < 5; map++) {
		let map = [];
		console.log(MAP_HEIGHT);
		for (let i = 0; i < MAP_HEIGHT; i++) {
			let row = [];
			for (let j = 0; j < MAP_WIDTH; j++) {
				let value = 0;
				if (
					i == 0 ||
					j == 0 ||
					i == MAP_HEIGHT - 1 ||
					j == MAP_WIDTH - 1
				) {
					value = 2;
				} else {
					random = Math.floor(Math.random() * values.length);
					value = values[random];
				}

				row.push(value);
			}
			map.push(row);
		}
		map[1][1] = 3;
		maps.push(map);
	}
}

function displayWorld() {
	let render = '';
	for (let i = 0; i < map.length; i++) {
		render += '\n<div class="row">\n';
		for (let j = 0; j < map[i].length; j++) {
			switch (map[i][j]) {
				case 0:
					render += '<div class="empty"></div>';
					break;
				case 1:
					render += '<div class="coin"></div>';
					break;
				case 2:
					render += '<div class="brick"></div>';
					break;
				case 3:
					render += '<div class="pacman"></div>';
					break;
				case 4:
					render += '<div class="cherry"></div>';
					break;
				case 5:
					render += '<div class="ghost"></div>';
					break;
				default:
					break;
			}
		}
		render += '</div>';
	}
	document.getElementById('world').innerHTML = render;
}

function updateScore() {
	document.getElementById('score').innerHTML = score;
}

displayWorld();

var pacman = {
	x: 1,
	y: 1,
};
document.onkeydown = function (e) {
	var hasMatch = true;
	switch (e.code) {
		case 'ArrowRight':
			if (map[pacman.y][pacman.x + 1] != 2) {
				pacman.x += 1;
			}
			break;
		case 'ArrowLeft':
			if (map[pacman.y][pacman.x - 1] != 2) {
				pacman.x -= 1;
			}
			break;
		case 'ArrowUp':
			if (map[pacman.y - 1][pacman.x] != 2) {
				pacman.y -= 1;
			}
			break;
		case 'ArrowDown':
			if (map[pacman.y + 1][pacman.x] != 2) {
				pacman.y += 1;
			}
			break;
		default:
			hasMatch = false;
			break;
	}

	console.log(pacman);

	if (hasMatch) {
		chasePacman();
		(function () {
			for (let i = 0; i < map.length; i++) {
				for (let j = 0; j < map[i].length; j++) {
					if (map[i][j] == 3) {
						let newPosition = map[pacman.y][pacman.x];

						if (newPosition == 4) {
							score += 20;
						} else if (newPosition == 1) {
							score += 10;
						}
						map[i][j] = 0;
						map[pacman.y][pacman.x] = 3;

						return;
					}
				}
			}
		})();
	}
	displayWorld();
	updateScore();
};

document.getElementById('randomBtn').onclick = function (e) {
	map = selectRandomMap();
	score = 0;
	displayWorld();
	updateScore();
};

function chasePacman() {
	console.log('run');
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] == 5) {
				let toReplace = 1;
				let newX = 0,
					newY = 0;

				console.log(pacman, x, y);
				if (x < pacman.x && y < pacman.y) {
					// To upper right
					newX = x + 1;
					newY = y + 1;
				} else if (x > pacman.x && y < pacman.y) {
					//  To upper left
					newX = x - 1;
					newY = y + 1;
				} else if (x > pacman.x && y > pacman.y) {
					//  To lower left
					newX = x - 1;
					newY = y - 1;
				} else {
					//  To lower right
					newX = x + 1;
					newY = y - 1;
				}

				if (map[newY][newX] == 2 || map[newY][newX] == 5) {
					if (map[y][newX] != 2 && map[newY][newX] != 5) {
						newY = y;
					} else if (map[newY][x] != 2 && map[newY][newX] != 5) {
						newX = x;
					} else {
						newX = x;
						newY = y;
					}
				}

				if (map[newY][newX] == 3) {
					document.getElementById('message').innerHTML = 'Game Over';
					setTimeout(reset, 2000);
					return;
				} else if (map[newY][newX] != 2 && map[newY][newX] != 5) {
					map[newY][newX] = 5;
					map[y][x] = 1;
				}
			}
		}
	}
	// displayWorld();
}

function moveToX(i, j) {
	let toReplace = 1;
	if (pacman.x < j) {
		if (map[i][j - 1] != 2) {
			map[i][j] = 1;
			toReplace = map[i][j - 1];
			map[i][j - 1] = 5;
		}
	} else if (map[i][j + 1] != 2) {
		map[i][j] = 1;
		toReplace = map[i][j + 1];
		map[i][j + 1] = 5;
	}
	return toReplace;
}

function moveToY(i, j) {
	let toReplace = 1;
	if (pacman.y < i) {
		if (map[i - 1][j] != 2) {
			map[i][j] = 1;
			toReplace = map[i - 1][j];
			map[i - 1][j] = 5;
		}
	} else if (map[i + 1][j] != 2) {
		map[i][j] = 1;
		toReplace = map[i + 1][j];
		map[i + 1][j] = 5;
	}
	return toReplace;
}

// setInterval(chasePacman, 1000);

function reset() {
	pacman = {
		x: 1,
		y: 1,
	};
	score = 0;
	updateScore();
	map = selectRandomMap();
	displayWorld();
	document.getElementById('message').innerHTML = '';
}
