/***********************/
/* MADE BY OGAN OEZKUL */
/* AKA RYUGUU - CHAN   */
/***********************/

// all the BGM routines

// list of BGM
var BGM = [
	"BGM/BGM00.wav",
	"BGM/BGM01.wav",
	"BGM/BGM02.wav",
	"BGM/BGM03.wav"
];

// the BGM player
var BGMplayer = new Audio();

// All the SFX
var SFXplayer = new Audio();

// has the BGM turned on?
var MusicActive = false;

// the icons
var MusicOn = "img/yes_music.png";
var MusicOff = "img/no_music.png";

// when BGMplayer ended a song
BGMplayer.onended = function()
{
	if (MusicActive === true)
	{
		PlayMusic();
    }
}

// when SFXplayer ended a sound effect
SFXplayer.onended = function()
{
	SFXplayer.pause();
	SFXplayer.currentTime = 0;
}

// function that plays BGM
function PlayMusic()
{

	// for avoid repetition
	BGMplayer.src = BGM[Math.round((Math.random() * BGM.length) + 0)];

	// for avoid the 'undefined' desease
	while (BGMplayer.src === "")
	{
		BGMplayer.src = BGM[Math.round((Math.random() * BGM.length) + 0)];
	}
	// BGMplayer.load();
	BGMplayer.play();
}

// when the user activate/deactivate BGM
function ActivateMusic()
{
	MusicActive = MusicActive == true ? false : true;

	if (MusicActive == true)
	{
		document.getElementById("MusicIconImg").setAttribute("src", MusicOn);
		PlayMusic();
	}
	else
	{
		// yea since they dind't implemented a "stop();" yet
		BGMplayer.pause();
		BGMplayer.currentTime = 0;

		document.getElementById("MusicIconImg").setAttribute("src", MusicOff);
	}
}