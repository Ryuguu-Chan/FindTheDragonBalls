// The crystal ball object
class CrystalBall
{
	// it's constructor
	constructor(numero = null, locationX = null, locationY = null)
	{
		this.Num 	= numero;	// le numero de la boule
		this.LocX 	= locationX;	// la localisation de la boule X sur la carte
		this.LocY 	= locationY;	// la localisation de la boule Y sur la carte
	}
}

// Has the game started yet?
var PartyStarted = false;

// The amount of points
var Points = 0;

// The area where everything goes
var Win = document.getElementById("mainGame");

// The gap between the grid's lines
var GridGap = 50;

// game start
var GameStarted = false;

// the success text area
var SuccessText = document.getElementById('success');

// The level making button
var bRandomLevel = document.getElementById('makeL');

// the score text area
var Score = document.getElementById('points');

// for the level creation
var RandomFactor = 800;

// The game window's size
var winX = Win.width;	// X
var winY = Win.height;	// Y

// ecran noir
var BlackScreen = Win.getContext('2d');

// The amount of wins
var Wins = 0;

// 2D
var BGR = Win.getContext('2d');

// For the grid drawing
var GridLine = Win.getContext('2d');

// The triangle that will represent the player
var PlayerArrow = Win.getContext('2d');

// The crystal ball drawing
var ballCircle = Win.getContext('2d');

// The eraser rectangle
var ClearRect = Win.getContext('2d');

// Player's precalculated center point definition
var PlayerCenterX = (winX/2);
var PLayerCenterY = (winY/2);

// les 7 dragon balls
var Balls = 
[
	new CrystalBall(), // 1(0) 
	new CrystalBall(), // 2(1)
	new CrystalBall(), // 3(2)
	new CrystalBall(), // 4(3)
	new CrystalBall(), // 5(4)
	new CrystalBall(), // 6(5)
	new CrystalBall()  // 7(6)
];

// background color definition
BGR.fillStyle = "#005500";

// Making the background
BGR.fillRect(0,0,winX,winY);

// grid line's color definition
GridLine.strokeStyle = "#000000";

// Making columns
for (x = 0; x < winX; x+=GridGap) 
{
	// drawing the lines
	GridLine.moveTo(x,0);		// point de depart
	GridLine.lineTo(x,winX);	// point de terminaison
	GridLine.stroke();		// tracer de point A au point B
}

// Making rows 
for (y = 0; y < winY; y+=GridGap) 
{
	// drawing the lines
	GridLine.moveTo(0,y);
	GridLine.lineTo(winY,y);
	GridLine.stroke();
}

// making the triangle with some other calculations
PlayerArrow.beginPath();
PlayerArrow.moveTo((winX/2) - 20, (winY/2));
PlayerArrow.lineTo((winX/2) + 20, (winY/2));
PlayerArrow.lineTo((winX/2), (winY/2) - 30);
PlayerArrow.closePath();
PlayerArrow.stroke();
PlayerArrow.fillStyle = "#FF0000";
PlayerArrow.fill();

// hitbox point coordinates
// it will construct a box based on these 4 coordinates
// the script will treat them as it's verticies (if we look at a geomatrical way)
var HitboxVertexCoords = 
[
	[(winX/2) - 20, (winY/2) - 30 - (GridGap/2)],	// (0,0)
	[(winX/2) + 20, (winY/2) - 30 - (GridGap/2)],	// (x,0)
	[(winX/2) - 20, (winY/2) + 20 + (GridGap/2)],	// (0,y)
	[(winX/2) + 20, (winY/2) + 20 + (GridGap/2)]	// (x,y)
];

// Area where the 7 dragon balls would be replaced
var BallsPlacementMem = [];

// Drawing the dragon ball b on the map
function DrawBall(b)
{
	ballCircle.beginPath();
	ballCircle.arc
	(
		(b.LocX),		// center's x 
		(b.LocY),		// center's y 
		(10),			// rayon
		(0 * Math.PI),		// starting angle
		(2 * Math.PI),		// ending angle
	);
	ballCircle.fillStyle = "#FFFFFF";
	ballCircle.strokeStyle = "black";
	ballCircle.fill();
	ballCircle.stroke();
}

// When the user presses any key 
function KeyPressed()
{
	if (GameStarted == true)
	{
		switch(event.keyCode)
		{
			case 119: /* W */ MovePlayer(119);  break; 	// *.LocY+=250 (For every dragon ball's coordinate)
			case 97:  /* A */ MovePlayer(97);   break; 	// *.LocX+=250 (For every dragon ball's coordinate)
			case 115: /* S */ MovePlayer(115);  break; 	// *.LocY-=250 (For every dragon ball's coordinate)
			case 100: /* D */ MovePlayer(100);	break; 	// *.LocX-=250 (For every dragon ball's coordinate)
		}
	}
}

// Function that will refresh the game screen
function Refresh()
{
	// clear
	ClearRect.clearRect(0, 0, winX, winY);
	
	BGR.fillStyle = "#005500";
	
	// Making the background color
	BGR.fillRect(0,0,winX,winY);

	///<TODO>
	///Reparer le bug du contour du cercle a partirs d'ici
	///</TODO>

	// making columns
	for (x = 0; x < winX; x+=GridGap) 
	{
		// Drawing the lines
		this.GridLine.moveTo(x,0);	// point de depart
		this.GridLine.lineTo(x,winX);	// point de terminaison
		this.GridLine.stroke();		// tracer de point A au point B
	}

	// making rows
	for (y = 0; y < winY; y+=GridGap) 
	{
		// Drawing the lines
		this.GridLine.moveTo(0,y);
		this.GridLine.lineTo(winY,y);
		this.GridLine.stroke();
	}

	// Drawing the player's triangle
	PlayerArrow.beginPath();
	PlayerArrow.moveTo((winX/2) - 20, (winY/2));
	PlayerArrow.lineTo((winX/2) + 20, (winY/2));
	PlayerArrow.lineTo((winX/2), (winY/2) - 30);
	PlayerArrow.closePath();
	PlayerArrow.stroke();
	PlayerArrow.fillStyle = "#FF0000";
	PlayerArrow.fill();

	for (i = 0; i <= Balls.length; ++i)
	{
		try { DrawBall(Balls[i]); }
		catch (err) { /* doing nothing :P */ }
	}
}

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
					Score.innerHTML = "Points : " + Points;
					if (Points % 7 === 0) // si le nombre de points est divisible par 7 (tout les 7 points)
					{
						// game done
						SuccessText.innerHTML = "Congratulations, press the \"make another level\" button to continue!";
						bRandomLevel.innerText = "make another level";
						GameStarted = false;
						BlackScreen.fillStyle = "black"
						BlackScreen.fillRect(0,0,winX,winY);
						++Wins;
						RandomFactor+=50;
						
						bRandomLevel.disabled = false;
						document.getElementById('left').disabled = true;
						document.getElementById('right').disabled = true;
						document.getElementById('up').disabled = true;
						document.getElementById('down').disabled = true;
					}
					break;
				}
			}
		}
	}

	// loop that will be use as to indicate the player where the dragon ball is when it's too far from the player
	for (x = 0; x < Balls.length; ++x)
	{
		if (Balls[x].LocX > winX)
		{
			if (Win.style.borderRightColor != "red")
				Win.style.borderRightColor = "red";
		}
		else if (Balls[x].LocX < 0)
		{
			if (Win.style.borderLeftColor != "red")
				Win.style.borderLeftColor = "red";
		}
		else if (Balls[x].LocY > winY)
		{
			if (Win.style.borderBottomColor != "red")
				Win.style.borderBottomColor = "red";
		}
		else if (Balls[x].locY < 0)
		{
			if (Win.style.borderTopColor != "red")
				Win.style.borderTopColor = "red";
		}
		else
		{
			Win.style.borderColor = "black";
		}
	}
	Refresh();
}

// Level creation function
function MakeLevel()
{
	Refresh();
	SuccessText.innerHTML = "";
	if (Balls.length == 0)
	{
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
	for (i = 0; i < Balls.length; ++i)
	{
		// for making things easier
		Balls[i].LocX = Math.round(Math.random() * ((RandomFactor) - (-RandomFactor) + (-RandomFactor)));
		
		// for making things easier
		Balls[i].LocY = Math.round(Math.random() * ((RandomFactor) - (-RandomFactor) + (-RandomFactor)));
		
		// it's number (1 = 0+1, 2 = 1+1, ..., n = (n-1)+1)
		Balls[i].Num = i+1;

		// drawing the dragon ball
		DrawBall(Balls[i]);
	}

	// placing all of them on a array
	BallsPlacementMem.push(Balls);

	GameStarted = GameStarted   == false ? true : true;
	PartyStarted = PartyStarted == false ? true : true;

	if (GameStarted == true)
	{
		bRandomLevel.disabled = true;
		document.getElementById('left').disabled = false;
		document.getElementById('right').disabled = false;
		document.getElementById('up').disabled = false;
		document.getElementById('down').disabled = false;
	}

}
