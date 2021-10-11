/***********************/
/* MADE BY OGAN OEZKUL */
/* AKA RYUGUU - CHAN   */
/***********************/

// all the graphical routines

// [0] <- Balls.LocX < 0
// [1] <- Balls.LocY < 0
// [2] <- Balls.LocY > winY
// [3] <- Balls.LocX > winX
var IsThereOffscreenBallsArray = [ false, false, false, false ];

// The area where everything goes
var Win = document.getElementById("mainGame");

// The gap between the grid's lines
var GridGap = 50;

// The game window's size
var winX = Win.width;	// X
var winY = Win.height;	// Y

// black screen
var BlackScreen = Win.getContext('2d');

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
var PLayerCenterY = (winY / 2);

function gfxInit()
{
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
        GridLine.stroke();			// tracer de point A au point B
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

}


// Drawing the dragon ball b on the map
function DrawBall(b)
{
	ballCircle.beginPath();
	ballCircle.arc
	(
		(b.LocX),			// center's x 
		(b.LocY),			// center's y 
		(10),				// rayon
		(0 * Math.PI),		// starting angle
		(2 * Math.PI),		// ending angle
	);
	ballCircle.fillStyle = "#FFFFFF";
	ballCircle.strokeStyle = "black";
	ballCircle.fill();
	ballCircle.stroke();
}

// update the graphics
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
		this.GridLine.moveTo(x,0);		// point de depart
		this.GridLine.lineTo(x,winX);	// point de terminaison
		this.GridLine.stroke();			// tracer de point A au point B
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

	// reset!
	//DBG00.innerHTML = "";

	// loop that will be use as to indicate the player where the dragon ball is when it's too far from the player
	for (x = 0; x < Balls.length; ++x)
	{
		// ugly looking code here 
		if (Balls[x].LocX < 0) 		{ IsThereOffscreenBallsArray[0] = true; }
		if (Balls[x].LocY < 0) 		{ IsThereOffscreenBallsArray[1] = true; }
		if (Balls[x].LocY > winY)	{ IsThereOffscreenBallsArray[2] = true; }
		if (Balls[x].LocX > winX)	{ IsThereOffscreenBallsArray[3] = true; }

		// debugging display
		//DBG00.innerHTML += "Ball " + Balls[x].Num + " (" + Balls[x].LocX + " ; " + Balls[x].LocY + ")<br/>";
	}

	Win.style.borderLeftColor	= IsThereOffscreenBallsArray[0]	== true ? "red" : "black";
	Win.style.borderBottomColor = IsThereOffscreenBallsArray[2] == true ? "red" : "black";
	Win.style.borderTopColor 	= IsThereOffscreenBallsArray[1] == true ? "red" : "black";
	Win.style.borderRightColor 	= IsThereOffscreenBallsArray[3] == true ? "red" : "black";

	// reset all the flags
	IsThereOffscreenBallsArray[0] = false;
	IsThereOffscreenBallsArray[1] = false;
	IsThereOffscreenBallsArray[2] = false;
	IsThereOffscreenBallsArray[3] = false;

}