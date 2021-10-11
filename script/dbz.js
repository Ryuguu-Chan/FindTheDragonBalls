/***********************/
/* MADE BY OGAN OEZKUL */
/* AKA RYUGUU - CHAN   */
/***********************/

// var DBG00 = document.getElementById('debugDisplay00');

// Has the game started yet?
var PartyStarted = false;

// for all those <a> business (UP, DOWN, LEFT, RIGHT)
var PCmode = true;

// all the tactile things
var TactileButtons = document.getElementsByClassName('pButton');

// The amount of points
var Points = 0;

var CollectedDragonballs = 0;

// Dragonball Counter
var DragonBalls = 0;

// game start
var GameStarted = false;

// The level making button
var bRandomLevel = document.getElementById('makeL');

// the score text area
var Score = document.getElementById('points');

// for the level creation
var RandomFactor = 800;

// The amount of wins
var Wins = 0;

// kick-starting the graphical routines
gfxInit();

// phone detection (in case the phone screen's width is bigger than the limit set in the CSS file "s.css")
if (DetectPhone() == true) { TactileButtons.style.visibility = "visible" }

// hitbox point coordinates
// it will construct a box based on these 4 coordinates
// the script will treat them as it's verticies (if we look at a geomatrical way)
var HitboxVertexCoords = 
[
	[(winX/2) - 17, (winY/2) - 30 - (GridGap/2)],	// (0,0)
	[(winX/2) + 17, (winY/2) - 30 - (GridGap/2)],	// (x,0)
	[(winX/2) - 17, (winY/2) + 10 + (GridGap/2)],	// (0,y)
	[(winX/2) + 17, (winY/2) + 10 + (GridGap/2)]	// (x,y)
];

// When the user presses on one of those <a></a> things
function TactileKeyPressed(V)
{
	if (GetSize()[0] <= 800)
		MovePlayer(V);
}

// When the user presses any key 
function KeyPressed()
{
	if (GameStarted == true)
	{
		switch(event.keyCode)
		{
			case 119: /* W */ MovePlayer(119);  break; // *.LocY+=250 (For every dragon ball's coordinate)
			case 97:  /* A */ MovePlayer(97);   break; // *.LocX+=250 (For every dragon ball's coordinate)
			case 115: /* S */ MovePlayer(115);  break; // *.LocY-=250 (For every dragon ball's coordinate)
			case 100: /* D */ MovePlayer(100);	break; // *.LocX-=250 (For every dragon ball's coordinate)
		}
	}
}

// Function that will refresh the game screen


// Function that will move the character
// the way that works is not by translating the player from a coordinate to another
// but by translating the whole game world from a coordinate or another using some simple calculations according the direction which the player moves
function MovePlayer(direction)
{
	for (x = 0; x <= Balls.length - 1; ++x)
	{
		switch(direction)
		{
			// up
			case 119: Balls[x].LocY += (GridGap / 2); break;
			// left
			case 97: Balls[x].LocX += (GridGap / 2); break;
			// down
			case 115: Balls[x].LocY -= (GridGap / 2); break;
			// right
			case 100: Balls[x].LocX -= (GridGap / 2); break;
		}
		// hitbox detection pretty complicated calculations
		for (cY = HitboxVertexCoords[0][1]; cY < HitboxVertexCoords[2][1]; ++cY)
		{
			for (cX = HitboxVertexCoords[0][0]; cX < HitboxVertexCoords[1][0]; ++cX)
			{
				if (Math.round(Balls[x].LocX) == cX && Math.round(Balls[x].LocY) == cY)
				{
					// touché!
					Balls.splice(x, 1);
					++Points;
					Score.innerHTML = "SCORE : " + Points;
					++DragonBalls;
					++CollectedDragonballs;
					document.getElementById("ballpoints").outerHTML = '<span id="ballpoints">' + CollectedDragonballs;
					if (DragonBalls == 7/*Points % 7 === 0*/) // si le nombre de points est divisible par 7 (tout les 7 points)
					{
						// game done
						SFXplayer.src = "SFX/SFX01.wav";
						SFXplayer.play();

						bRandomLevel.innerText = "make another level";
						bRandomLevel.style.background = "red";
						GameStarted = false;
						BlackScreen.fillStyle = "black"
						BlackScreen.fillRect(0, 0, winX, winY);
						++Wins;
						RandomFactor += 50;

						bRandomLevel.disabled = false;
						document.getElementById('left').disabled = true;
						document.getElementById('right').disabled = true;
						document.getElementById('up').disabled = true;
						document.getElementById('down').disabled = true;

						DragonBalls = 0;
					}
					else
					{
						SFXplayer.src = "SFX/SFX00.wav";
						SFXplayer.play();
                    }
					Refresh();
					break;
				}
			}
		}
	}

	Refresh();
}

// Level creation function
function MakeLevel()
{
	if (GameStarted === false) 
	{
		CollectedDragonballs = 0;
		document.getElementById("ballpoints").outerHTML = '<span id="ballpoints">' + CollectedDragonballs;
		
		SFXplayer.src = "SFX/SFX00.wav";
		SFXplayer.play();
		Refresh();
		if (Balls.length == 0) {
			// remaking the Balls variable
			Balls[0] = new CrystalBall(); // 1st
			Balls[1] = new CrystalBall(); // 2nd
			Balls[2] = new CrystalBall(); // 3rd
			Balls[3] = new CrystalBall(); // 4th
			Balls[4] = new CrystalBall(); // 5th
			Balls[5] = new CrystalBall(); // 6th
			Balls[6] = new CrystalBall(); // 7th
		}

		// dragon balls creation
		for (i = 0; i < Balls.length; ++i) {
			// for making things easier
			Balls[i].LocX = Math.round(Math.random() * ((RandomFactor) - (-RandomFactor) + (-RandomFactor)));

			// for making things easier
			Balls[i].LocY = Math.round(Math.random() * ((RandomFactor) - (-RandomFactor) + (-RandomFactor)));

			// it's number (1 = 0+1, 2 = 1+1, ..., n = (n-1)+1)
			Balls[i].Num = i + 1;

			// drawing the dragon ball
			DrawBall(Balls[i]);
		}

		// placing all of them on a array
		BallsPlacementMem.push(Balls);

		GameStarted = GameStarted == false ? true : true;
		PartyStarted = PartyStarted == false ? true : true;

		if (GameStarted == true) {
			bRandomLevel.disabled = true;
			document.getElementById('left').disabled = false;
			document.getElementById('right').disabled = false;
			document.getElementById('up').disabled = false;
			document.getElementById('down').disabled = false;
		}

		// making the button gray
		bRandomLevel.style.background = "gray";
	}
	else
	{
		SFXplayer.src = "SFX/SFX02.wav";
		SFXplayer.play();
    }
}
