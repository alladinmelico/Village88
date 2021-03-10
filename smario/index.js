
	var world = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[2,2,2,2,2,2,2,2,2,2,2,3,3,0,0,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,3,3,0,0,2,2,2,2,0]
	];

	var map = {
		0: 'sky',
		1: 'question',
		2: 'ground',
		3: 'pipe'
	};

	var character_x = 0;
	var character_y = 450;

	var x = 0;
	var y = 7;

	var jumped = 0;
	var coming_down = false;

	function drawWorld()
	{
		var output = '';
		for(var i=0; i<world.length; i++)
		{
			output = output + "<div class='row'>";
			for(var j=x; j<x+10; j++)
			{
				output = output + "\n\t<div class='"+map[world[i][j]]+"'></div>";
			}
			output = output + "</div>\n";
		}
		document.getElementById('world').innerHTML = output;
	}

	function drawCharacter()
	{
		document.getElementById('chr').style.top = character_y;
		document.getElementById('chr').style.left = character_x;
	}

	function gameLoop()
	{
		if(jumped == 1 && coming_down == false)
		{
			character_y = character_y - 20;
			jumped = 2;
		}
		else if(jumped == 2)
		{
			character_y = character_y + 20;
			coming_down = true;
			jumped = 1;
		}
		else if(jumped == 1 && coming_down == true)
		{
			character_y = character_y + 20;
			jumped = 0;
			coming_down = false;
		}
		drawWorld();
		drawCharacter();
	}


	setInterval(gameLoop, 200);

	document.onkeydown = function(e)
	{
		if(e.keyCode == 37)
		{
			x--;
		}
		else if(e.keyCode == 39 && world[y][x+1] == 0)
		{
			x++;
			console.log(y, x, world[y][x]);
		}	
		//jumping
		if(e.keyCode == 32 && jumped == 0)
		{
			character_y = character_y - 20;
			jumped = 1;
		}
		// console.log(e.keyCode);
	}



