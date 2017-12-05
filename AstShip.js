
function AstShip(x_, y_, theta_, h_, s_, v_, kbd_, se_, size_) {
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
     *      Okay I left projectiles to GM because it's easier
     *  ToDo: death animation
     * 
     */
    
    this.posX = x_;
    this.posY = y_;
    this.theta = theta_;
    this.h = h_;
    this.s = s_;
    this.v = v_;
    //ship has a reference to the kbd handler
    this.KBD = kbd_;
    //ship has a reference to the sound engine
    this.SE = se_;
    this.size = size_;
    
    this.state = 0; //0 is spawning, 1 is active, 2 is dying
    this.flash = false;
    this.spawnTimer = 0;
    
    this.rotating = false;
    this.finTheta = 0;
    this.interpFrame = 0;
    
    this.velocity = new YCVector2(0, 0);
    this.dTheta = 0;
    
    this.shape = new ArbitraryShape(this.posX, this.posY, this.size, this.theta, 0, 0, 0, 255, this.h, this.s, this.v, 255, 2);
    
    this.shape.addPoint(10, 0);
    this.shape.addPoint(-10, 10);
    this.shape.addPoint(-5, 0);
    this.shape.addPoint(-10, -10);
    this.shape.addPoint(10, 0);
    
    this.rubble = [];
    
    this.update = function(intensity) {
        //KBD is the keyboard array
        
        //state 0: spawning, and
        //state 1: active
        if (this.state < 2) { 
            if (this.state == 0) {
                if (this.spawnTimer > 200) this.state = 1;

                this.flash = (this.spawnTimer % 30 < 15) ? true : false;


                this.spawnTimer++;
            }
            
            
            if (this.KBD.fire) {
                //fire weapon
                fill(255, 0, 0);
                ellipse(280, 260, 50, 20);
            }

            this.rotating = false;

            if (this.KBD.cw || this.KBD.ccw) {
                if (this.KBD.cw) {
                    //rotate clockwise
                    if (this.dTheta > -0.18){
                        this.dTheta -= 0.008;
                    }

                    this.rotating = true;


                }
                if (this.KBD.ccw) {
                    //rotate counterclockwise
                    if (this.dTheta < 0.18){
                        this.dTheta += 0.008;
                    }

                    this.rotating = true;
                }
            }

            if (!this.rotating) {
                if (Math.abs(this.dTheta) < 0.001) this.dTheta = 0;
                else this.dTheta *= 0.9;
            }

            this.theta += this.dTheta;
            if (this.theta > (2*PI)) this.theta -= (2*PI);
            if (this.theta < (-2*PI)) this.theta += (2*PI);


            if (this.KBD.bwd) {
                //decelerate
                if (this.velocity.getMagnitude() < 0.1) {
                    this.velocity.set(0, 0);
                } else {
                    this.velocity.scale(0.96);
                }
            } else if (this.KBD.fwd) {
                //accelerate forward
                var accel = new YCVector2(0.1 * (width/500), 0);
                accel.rotate(this.theta);
                this.velocity.addVec(accel);

                if (this.velocity.getMagnitude() > 10 * (width/500)) {
                    this.velocity.setMagnitude(10 * (width/500));
                }

            } else {
                //slow deceleration
                if (this.velocity.getMagnitude() < 0.1) {
                    this.velocity.set(0, 0);
                } else {
                    this.velocity.scale(0.99);
                }
            }



            this.posX += this.velocity.x;
            this.posY += this.velocity.y;
            if (this.posX > width) this.posX -= width;
            if (this.posX < 0) this.posX += width;

            if (this.posY > height) this.posY -= height;
            if (this.posY < 0) this.posY += height;

            this.shape.relocate(this.posX, this.posY);
            this.shape.setTheta(this.theta);
        }
        //state 2: dying
        else {
            
            
        }
        
        
        //this.shape.setColor(0, 0, 0, 0, Math.random() * 360, 255, 255, 255);
        
        textAlign(LEFT);
        textSize(10);
        text("dTheta: " + this.dTheta.toFixed(3), 10, 260);
        text("theta: " + this.theta.toFixed(3), 10, 270);
        text("finTheta: " + this.finTheta.toFixed(3), 10, 280);
        
        text("velocity: (" + this.velocity.x.toFixed(1) + ", " + this.velocity.y.toFixed(1) + ")", 200, 260);
        text("position: (" + this.posX.toFixed(1) + ", " + this.posY.toFixed(1) + ")", 200, 270);
        text("speed: " + this.velocity.getMagnitude().toFixed(3), 200, 280);
    }
    
    this.draw = function() {
        fill(255, 0, 0);
        //if (this.KBD.fire) rect(280, 260, 50, 20);
        if (this.KBD.cw) rect(400, 260, 20, 20);
        if (this.KBD.ccw) rect(340, 260, 20, 20);
        if (this.KBD.fwd) rect(370, 230, 20, 20);
        if (this.KBD.bwd) rect(370, 260, 20, 20);
        
        if (this.state == 1 || (this.state == 0 && !this.flash)) {
            this.shape.draw();
        } else {
            for (var picante = 0; picante < this.rubble.length; picante++) {
                this.rubble[picante].draw();
            }
        }
        
    }
    
    //this kills the man
    this.kill = function() {
        if (this.state != 0) {
            this.state = 2;
        }
        
    }
    
    this.setColor = function(h_, s_, v_) {
        
    }
    
}



