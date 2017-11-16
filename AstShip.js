
function AstShip(x_, y_, theta_, h_, s_, v_) {
    /**
     * Behaviour:
     *  Movement:
     *      Store velocity as a vector
     *      Right/Left rotate (I hope I still have my previous rotation code because it felt great)
     *          But also, potentially even better method:
     *              Save trueTheta and apparentTheta, make trueTheta as responsive as possible
     *              while animating on apparentTheta.
     *      Forward adds to the velocity vector
     *          if velocity vector exceeds max, normalize it back down (this prevents the locking)
     *      Back reduces velocity vector?
     *  Shoot:
     *      I think trip a flag to make the GameManager spawn a projectile
     *      Otherwise, this is fairly straightforward? But that would make collision a lot easier
     *  
     * 
     */
    
    this.posX = x_;
    this.posY = y_;
    this.theta = theta_;
    this.h = h_;
    this.s = s_;
    this.v = v_;
    
    this.shape = new ArbitraryShape(this.posX, this.posY, 1, this.theta, this.h, this.s, this.v);
    
    this.shape.addPoint(10, 0);
    this.shape.addPoint(-10, 10);
    this.shape.addPoint(-10, -10);
    
    this.draw = function() {
        this.shape.draw();
    }
    
}