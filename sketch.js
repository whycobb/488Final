/**
 * State 1: Vibrant
 * State 2: transition
 * State 3: Calm
 */

//variables for the arrow

var myShip;
var GM;
var BG;
var SE;
var KBD;
var rotation;
var velocityX;
var velocityY;
var velocity;

var mySound;

var myCanvas;
var myCTX;

var foward = false, reverse = false, clockwise = false, counterClockwise = false;



function preload() {
    mySound = loadSound("volume.mp3");
}

function setup() {
    //put setup code here
    createCanvas(500, 450);
    
    KBD = new KBDArray;
    
    SE = new SoundEngine(mySound);
    
    if (!mySound.isPlaying()) {
        mySound.play();
    }
    
    //weed
    
    GM = new GameManager(KBD, SE);
    
}

function draw() {
    clear();
    //background(0, 50, 120);
    background(0, 0, 0);
    
    //get input
    KBD.setCCW(keyIsDown(LEFT_ARROW));
    KBD.setCW(keyIsDown(RIGHT_ARROW));
    KBD.setFWD(keyIsDown(UP_ARROW));
    KBD.setBWD(keyIsDown(DOWN_ARROW));
    KBD.setPause(keyIsDown(80));
    KBD.setFire(keyIsDown(32));
    KBD.setK(keyIsDown(75))
    
    
    
    
    
    
    GM.update();
    
    GM.draw();
    
    /*
    textSize(10);
    fill(255, 0, 0);
    textAlign(LEFT);
    text("Framerate: " + getFrameRate(), 5, 190);*/
}
