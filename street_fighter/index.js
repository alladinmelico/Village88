var action = 'STANDING';
var which_frame = 0;

var character1Element = document.querySelector('#character1');
var character2Element = document.querySelector('#character2');
var healthBar1Element = document.querySelector('#healthbar1');
var healthBar2Element = document.querySelector('#healthbar2');

var character1 = {
	top: 185,
	left: 100,
	health: 100,
};
var character2 = {
	top: 185,
	left: 400,
	health: 100,
};

function GameLoop() {
	displayCharacters();
}

setInterval(GameLoop, 150);

function displayCharacters() {
	character1Element.style.top = character1.top + 'px';
	character1Element.style.left = character1.left + 'px';
	character2Element.style.top = character2.top + 'px';
	character2Element.style.left = character2.left + 'px';

	healthBar1Element.style.width = character1.health * 2.3 + 'px';
	healthBar2Element.style.width = character2.health * 2.3 + 'px';

	if (action == 'STANDING') {
		character1Element.style.background =
			"url('ken.png') -" + which_frame * 70 + 'px -80px';
		which_frame = which_frame + 1;

		if (which_frame >= 4) {
			which_frame = 0;
		}
	} else if (action == 'PUNCH') {
		if (
			which_frame == 2 &&
			character1.left > character2.left - 150 &&
			character1.left < character2.left + 50
		) {
			character2.health = character2.health - 5;
		}
		character1Element.style.background =
			"url('ken.png') -" + which_frame * 70 + 'px -160px';
		which_frame = which_frame + 1;

		if (which_frame >= 3) {
			which_frame = 0;
			action = 'STANDING';
		}
	} else if (action == 'ROUND_KICK') {
		if (
			which_frame == 2 &&
			character1.left > character2.left - 150 &&
			character1.left < character2.left + 50
		) {
			character2.health = character2.health - 8;
		}

		document.getElementById('character1').style.background =
			"url('ken.png') -" + which_frame * 70 + 'px -560px';
		which_frame = which_frame + 1;

		if (which_frame >= 5) {
			which_frame = 0;
			action = 'STANDING';
		}
	}
}

document.onkeydown = function (e) {
	console.log(e);
	if (e.keyCode == 37 && character1.left > 0) {
		character1.left = character1.left - 10;
	} else if (e.keyCode == 39 && character1.left < 800) {
		character1.left = character1.left + 10;
		console.log(character1);
	} else if (e.keyCode == 190) {
		action = 'PUNCH';
	} else if (e.keyCode == 191) {
		action = 'ROUND_KICK';
	}

	which_frame = 0;
};
