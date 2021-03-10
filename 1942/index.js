var score = 0;
var difficulty = 1;
var heroes = [
	{
		level: 3,
		positionX: '-85px',
		positionY: '-180px',
		positionXToLeft: '-58px',
		positionXToRight: '-113px',
		toRight: false,
		toLeft: false,
		bulletsPosition: [8, 40],
		size: '27px',
		bulletSize: 50,
		bulletSpeed: 15,
		x: 300,
		y: 300,
	},
	{
		level: 2,
		positionX: '-90px',
		positionY: '-265px',
		positionXToLeft: '-72px',
		positionXToRight: '-108px',
		toRight: false,
		toLeft: false,
		bulletsPosition: [1, 35],
		size: '18px',
		bulletSize: 30,
		bulletSpeed: 10,
		x: 300,
		y: 300,
	},
	{
		level: 1,
		positionX: '-91px',
		positionY: '-336px',
		positionXToLeft: '-76px',
		positionXToRight: '-106px',
		toRight: false,
		toLeft: false,
		bulletsPosition: [0, 27],
		size: '16px',
		bulletSize: 20,
		bulletSpeed: 5,
		x: 300,
		y: 300,
	},
];

var hero = heroes[2];
var heroElement = document.querySelector('#hero');
var enemyTypes = [
	'-8px -11px',
	'-34px -10',
	'-66px -13px',
	'-95px -15px',
	'-124px -13px',
	'-155px -12px',
	'-184px -15px',
	'-55px -66px',
	'-74px -68px',
	'-92px -68px',
	'-111px -66px',
	'-130px -66px',
];
var enemies = [];
var bullets = [];
var explosions = [];

function generateEnemy() {
	return {
		x: Math.random() * 1270,
		y: Math.random() * 100,
		positionX: enemyTypes[Math.floor(Math.random() * enemyTypes.length)],
	};
}

function generateEnemies() {
	for (let i = 0; i < 7 * difficulty; i++) {
		enemies.push(generateEnemy());
	}
}

function displayHero() {
	heroElement.style.top = hero.y + 'px';
	heroElement.style.left = hero.x + 'px';
	if (hero.toRight) {
		heroElement.style.backgroundPositionX = hero.positionXToRight;
	} else if (hero.toLeft) {
		heroElement.style.backgroundPositionX = hero.positionXToLeft;
	} else {
		heroElement.style.backgroundPositionX = hero.positionX;
	}
	heroElement.style.backgroundPositionY = hero.positionY;
	heroElement.style.width = hero.size;
	heroElement.style.height = hero.size;
}

function displayEnemies() {
	var render = '';
	for (let i = 0; i < enemies.length; i++) {
		render +=
			'<div class="enemy1" style="top:' +
			enemies[i].y +
			'px; left:' +
			enemies[i].x +
			'px; background-position:' +
			enemies[i].positionX +
			'"></div>';
	}
	document.getElementById('enemies').innerHTML = render;
}

function moveEnemies() {
	for (let i = 0; i < enemies.length; i++) {
		enemies[i].y += 5;
		if (enemies[i].y >= 720) {
			enemies[i].y = 0;
			enemies[i].x = Math.random() * 720;
		}
	}
}

function moveBullets() {
	for (let i = 0; i < bullets.length; i++) {
		bullets[i].y -= hero.bulletSpeed;
		if (bullets[i].y < 0) {
			bullets.shift();
		}
	}
}

function displayBullets() {
	var render = '';
	for (let i = 0; i < bullets.length; i++) {
		render +=
			'<div class="bullet" style="top:' +
			bullets[i].y +
			'px; left:' +
			bullets[i].x +
			'px; transform: scale(' +
			hero.level +
			')"></div>';
	}
	document.getElementById('bullets').innerHTML = render;
}

function displayExplosion() {
	var render = '';
	for (let i = 0; i < explosions.length; i++) {
		render +=
			'<div class="explosion" id="explosion' +
			i +
			'" style="top:' +
			explosions[i].y +
			'px; left:' +
			explosions[i].x +
			'px; transform: scale(' +
			hero.level +
			')"></div>';
	}
	document.getElementById('explosions').innerHTML = render;
}

function animateExplosion() {
	let positions = ['-34px', '-58px', '-81px', '-111px', '-143px'];
	for (let i = 0; i < positions.length; i++) {
		setTimeout(function () {
			for (let j = 0; j < explosions.length; j++) {
				document.getElementById(
					'explosion' + j
				).style.backgroundPositionX = positions[i];
			}
		}, i * 100);
	}
	setTimeout(function () {
		explosions = [];
	}, 700);
}

function changeHero() {
	let tempX = hero.x;
	let tempY = hero.y;
	if (score >= 50 * difficulty) {
		hero = heroes[0];
	} else if (score >= 30 * difficulty) {
		hero = heroes[1];
	} else {
		hero = heroes[2];
	}
	console.log(hero);
	hero.x = tempX;
	hero.y = tempY;
	displayHero();
}

function detectCollision() {
	for (let i = 0; i < bullets.length; i++) {
		for (let j = 0; j < enemies.length; j++) {
			if (
				Math.abs(bullets[i].x - enemies[j].x) < bullets[i].size &&
				Math.abs(bullets[i].y - enemies[j].y) < bullets[i].size
			) {
				let audioExplode = document.getElementById('audioExplode');
				audioExplode.currentTime = 0;
				audioExplode.play();
				explosions.push({ x: enemies[j].x, y: enemies[j].y });
				enemies[j] = enemies[enemies.length - 1];
				enemies.pop();
				bullets[i] = bullets[bullets.length - 1];
				bullets.pop();
				score += 10;
				changeHero();
				return;
			}
		}
	}
}

function displayScore() {
	document.getElementById('score').innerHTML = score;
	document.getElementById('level').innerHTML = hero.level;
}

function detectCrash() {
	let heroIntSize = parseInt(hero.size.slice(0, 2));
	for (let i = 0; i < enemies.length; i++) {
		if (
			Math.abs(hero.x - enemies[i].x) < heroIntSize &&
			Math.abs(hero.y - enemies[i].y) < heroIntSize
		) {
			hero = heroes[2];
			hero.x = 300;
			hero.y = 300;
			score = 0;
			enemies = [];
			generateEnemies();
			return;
		}
	}
}

function gameLoop() {
	displayHero();
	moveEnemies();
	displayEnemies();
	moveBullets();
	displayBullets();
	detectCollision();
	detectCrash();
	displayExplosion();
	displayScore();
	animateExplosion();
}

setInterval(gameLoop, 100);

document.onkeydown = function (e) {
	switch (e.code) {
		case 'ArrowLeft':
			hero.x -= 10;
			hero.toLeft = true;
			break;
		case 'ArrowRight':
			hero.x += 10;
			hero.toRight = true;
			break;
		case 'ArrowUp':
			hero.y -= 10;
			break;
		case 'ArrowDown':
			hero.y += 10;
			break;
		case 'Space':
			bullets.push({
				x: hero.x + hero.bulletsPosition[0],
				y: hero.y - hero.bulletsPosition[1],
				size: hero.bulletSize,
			});
			displayBullets();
			break;
		default:
			break;
	}
	displayHero();
};

// reset position
document.onkeyup = function (e) {
	switch (e.code) {
		case 'ArrowLeft':
			hero.toLeft = false;
			break;
		case 'ArrowRight':
			hero.toRight = false;
			break;
		case 'ArrowUp':
			break;
		case 'ArrowDown':
			break;
		case 'Space':
			break;
		default:
			break;
	}
	displayHero();
};

document.getElementById('add').onclick = function (e) {
	enemies = [];
	difficulty++;
	document.getElementById('difficulty').innerHTML = difficulty;
	generateEnemies();
};
document.getElementById('less').onclick = function (e) {
	enemies = [];
	difficulty--;
	if (difficulty == 0) {
		difficulty = 1;
	}
	document.getElementById('difficulty').innerHTML = difficulty;
	generateEnemies();
};

generateEnemies();
