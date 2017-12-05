function Shot(x_, y_, theta_, intensity_) {
    /*
        Needs:
        position
        theta
        intensity (at time of birth)
        reference to sound engine?
        reference to BG engine?
        an ArbitraryShape object
            (multiple of these? for different intensities)
                    actually that might make concrete
                    intensity storage redundant, if I can just store that by 
                        nope I nee intensity for damage calc
        */
    
    this.posX = x_;
    this.posY = y_;
    this.theta = theta_;
    this.inensity = intensity_;
    this.health = intensity_;
    
    this.update = function() {
        //change position
        var vel = new YCVector2(15 * (width/500), 0);
        vel.rotate(this.theta);
        
        this.posX += vel.x;
        this.posY += vel.y;
        
    }
    
    this.collide = function() {
        this.health--;
    }
    
    this.draw = function() {
        push();
        fill(120 + (125 * this.intensity), 120 + (125 * this.intensity), 120 + (125 * this.intensity));
        noStroke();
        ellipse(this.posX, this.posY, 10, 10);
        pop();
        
    }
}