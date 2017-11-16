/**
 * State 1: Vibrant
 * State 2: transition
 * State 3: Calm
 */

//variables for the arrow

var myShip;
var GM;
var rotation;
var velocityX;
var velocityY;
var velocity;

var myCanvas;
var myCTX;

var foward = false, reverse = false, clockwise = false, counterClockwise = false;

function setup() {
    //put setup code here
    createCanvas(500, 300);
    
    //weed
    
    GM = new GameManager();
    
}

function draw() {
    clear();
    background(0, 50, 120);
    
    GM.draw();
}
