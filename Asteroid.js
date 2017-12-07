
function Asteroid(pos_, vel_, se_, size_, health_) {
    /*
        Needs:
        position
        rotation speed (no bearing on velocity)
        velocity
        reference to sound engine
        reference to BG engine
        an ArbitraryShape object
        a kill function? (leave this to the GM actually)
        a draw function
        */
    
    //console.log("Asteroid received position: (" + pos_.x + ", " + pos_.y + ")");
    this.pos = pos_; //this is a vector2
    //console.log("Asteroid received velocity: (" + vel_.x + ", " + vel_.y + ")");
    this.vel = vel_; //this is a vector2
    this.theta = Math.random() * 2 * Math.PI;
    this.dTheta = Math.random() * 0.01 + 0.005;
    this.size = size_;
    this.health = health_;
    
    /*
    this.h = h_;
    this.s = s_;
    this.v = v_;
    */
    
    this.se = se_;
    
    
    this.shape = new ArbitraryShape(this.pos.x, this.pos.y, this.size * width/500, this.theta, 0, 0, 0, 255, this.se.getHue2(), this.s, this.se.getIntensity(), 255, width/300);
    
    var shapeVersion = Math.random() * 6;
    
    if (shapeVersion < 3) {
        this.shape.addPoint(40,0);
        this.shape.addPoint(0,40);
        this.shape.addPoint(-40,0);
        this.shape.addPoint(0,-40);
        this.shape.addPoint(40,0);
    } else if (shapeVersion < 4) {
        this.shape.addPoint(40,0);
        this.shape.addPoint(0,50);
        this.shape.addPoint(-40,0);
        this.shape.addPoint(0,-40);
        this.shape.addPoint(40,0);
    } else if (shapeVersion < 6) {
        this.shape.addPoint(40,0);
        this.shape.addPoint(0,40);
        this.shape.addPoint(-40,10);
        this.shape.addPoint(0,-40);
        this.shape.addPoint(60,0);
    }
    
    
    
    this.update = function(intensity, hue) {
        this.pos.addVec(this.vel);
        this.theta += this.dTheta;
        
        this.shape.setColor(0, 0, 0, 255, this.se.getHue2(), 100, this.se.getIntensity(), 255, width/300);
        
        //this.shape.setColor(0, 0, 0, 255, this.se.getHue(), this.s, this.se.getIntensity(), (this.lifeTime - this.age)/this.lifeTime, width/300);
        
        //this.shape.setColor(0, 0, 0, 255, 5, 100, 100, 100);
        
        
        this.shape.relocate(this.pos.x, this.pos.y);
        this.shape.setTheta(this.theta);
        
        //this.vel.scale(0.995);
    }
    
    this.getX = function() {
        return this.pos.x;
    }
    
    this.getY = function() {
        return this.pos.y;
    }
    
    this.relocate = function(x_, y_) {
        this.pos.x = x_;
        this.pos.y = y_;
    }
    
    this.draw = function() {
        //console.log("Drawing Asteroid...");
        
        
        
        this.shape.draw();
        
        push()
        colorMode(RGB);
        fill(255, 0, 0);
        text(this.health, this.pos.x, this.pos.y);
        pop();
    }
}