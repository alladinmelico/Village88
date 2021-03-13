var birdElement = document.querySelector('#bird');
var bird = { top: 0, speed: 0 };
var gravity = 4;
var WORLD_HEIGHT = 615;
var pipes = [];
var score = 0;

function applyGravity() {
	bird.speed += gravity;
	bird.top += bird.speed;
	if (bird.top >= WORLD_HEIGHT) {
		bird.top = 0;
		bird.speed = 0;
		score = 0;
	}
}

function generatePipe() {
	let pipe = {
		left: 320,
		topPipe: {
			height: 0,
			backgroundYPosition: 0,
			backgroundXPosition: '-132px',
		},
		bottomPipe: {
			height: 0,
			backgroundYPosition: 773,
			backgroundXPosition: '-202px',
		},
	};
	let emptySpace = 180;
	let availableHeight = WORLD_HEIGHT - emptySpace;
	let topPipe = Math.floor(Math.random() * availableHeight);
	let bottomPipe = availableHeight - topPipe;
	pipe.topPipe.height = topPipe;
	pipe.bottomPipe.height = bottomPipe;
	pipe.topPipe.backgroundYPosition = 1156 - topPipe;
	pipes.push(pipe);
}

function updateScore() {
	document.getElementById('score').innerHTML = score;
}

function updatePipes() {
	for (let i = 0; i < pipes.length; i++) {
		pipes[i].left -= 10;
		if (pipes[i].left <= -63) {
			pipes[i] = pipes[pipes.length - 1];
			pipes.pop();
			score++;
			return;
		} else if (pipes[i].left <= 90) {
			if (pipes.length <= 1) {
				generatePipe();
			}
		}
	}
}

generatePipe();

function checkCollision() {
	for (let i = 0; i < pipes.length; i++) {
		if (
			pipes[i].left - 10 < 50 &&
			(pipes[i].topPipe.height + 180 - bird.top < 1 ||
				bird.top - pipes[i].topPipe.height < 1)
		) {
			score = 0;
			document.getElementById('gameover').showModal();
		}
	}
}

function renderPipes() {
	let render = '';
	for (let i = 0; i < pipes.length; i++) {
		render +=
			'<div class="pipe" style="left: ' +
			pipes[i].left +
			'px; top: 0px; background-position: ' +
			pipes[i].topPipe.backgroundXPosition +
			' -' +
			pipes[i].topPipe.backgroundYPosition +
			'px; height: ' +
			pipes[i].topPipe.height +
			'px"></div>';

		render +=
			'<div class="pipe" style="left: ' +
			pipes[i].left +
			'px; top:' +
			(pipes[i].topPipe.height + 180) +
			'px; background-position: ' +
			pipes[i].bottomPipe.backgroundXPosition +
			' -' +
			pipes[i].bottomPipe.backgroundYPosition +
			'px; height: ' +
			pipes[i].bottomPipe.height +
			'px"></div>';
	}
	document.getElementById('pipes').innerHTML = render;
}

function renderBird() {
	birdElement.style.top = bird.top + 'px';
	if (bird.speed > 30) {
		birdElement.style.transform = 'rotate(30deg)';
	} else if (bird.speed < 0) {
		birdElement.style.transform = 'rotate(-20deg)';
	} else {
		birdElement.style.transform = 'rotate(0deg)';
	}
}

function gameLoop() {
	applyGravity();
	renderBird();
	updatePipes();
	updateScore();
	renderPipes();
	checkCollision();
}

document.onkeydown = function (e) {
	if (e.code == 'Space') {
		bird.speed = -2;
		bird.top -= 100;
	}
};

document.getElementById('add').onclick = function (e) {
	gravity++;
	document.getElementById('gravity').innerHTML = gravity;
};

document.getElementById('subtract').onclick = function (e) {
	gravity--;
	if (gravity == 0) {
		gravity = 1;
	}
	document.getElementById('gravity').innerHTML = gravity;
};

document.getElementById('gameover').onclick = function (e) {
	score = 0;
	pipes = [];
	generatePipe();
	this.open = false;
};

setInterval(gameLoop, 100);
