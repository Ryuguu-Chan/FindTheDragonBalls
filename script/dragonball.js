/***********************/
/* MADE BY OGAN OEZKUL */
/* AKA RYUGUU - CHAN   */
/***********************/

// anything that concerns the dragonballs

// The crystal ball object
class CrystalBall
{
	// it's constructor
	constructor(numero = null, locationX = null, locationY = null)
	{
		this.Num 		= numero;		// 1, 2, 3, 4, 5, 6, 7
		this.LocX 		= locationX;	// The ball's X coordinate
		this.LocY 		= locationY;	// The ball's Y coordinate
	}
}

// the 7 dragon balls
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

// Area where the 7 dragon balls would be replaced
var BallsPlacementMem = [];