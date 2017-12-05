
function GameManager(kbd_, se_) {
    this.myShip = new AstShip(250, 150, 1, 100, 100, 100, kbd_, se_, width/700);
    this.asteroids = [];
    this.shots = [];
    this.KBD = kbd_;
    this.SE = se_;
    this.state = 1; //1 is play, 0 is pause
    var unPauseCheck;
    
    
    
    this.update = function() {
        if (this.state == 1) {
            //update ship
            this.myShip.update(1);
            
            //update shots
            var spentShots = [];
            
            for (var shotCount = 0; shotCount < this.shots.length; shotCount++) {
                this.shots[shotCount].update();
                if ((this.shots[shotCount].posX > width) ||
                    (this.shots[shotCount].posX < 0) ||
                    (this.shots[shotCount].posY > height) ||
                    (this.shots[shotCount].posY < 0)) {
                    spentShots.push(shotCount);
                }
            }
            
            function sorty(a, b) {
                return a - b;
            }
            spentShots.sort(sorty);
            
            //remove spent shots
            for (var toblerone = 0; toblerone < spentShots.length; toblerone++) {
                if (spentShots[toblerone] > -1) {
                    this.shots.splice(spentShots[toblerone], 1);
                }
            }
            
            
            
            //spawn needed shots
            if (KBD.fire) this.shots.push(new Shot(this.myShip.posX, this.myShip.posY, this.myShip.theta, this.SE.getIntensity()));
            
            //update asteroids
            
            
            //check for collisions
            
            
            
            //remove spent shots
            
            //MOVE CODE FROM ABOVE, BUT SOMETHING WAS BREAKING SO BE CAREFUL
            
        
            
            //check keyboard update for pause
            if (!KBD.pause) unPauseCheck = false;
            
            if (KBD.pause && !unPauseCheck) this.state = 0;
            
            
            
            
            
            
        } else if (this.state == 0) {
            //check keyboard for unpause
            if (!KBD.pause) unPauseCheck = true;
            
            if (KBD.pause && unPauseCheck) this.state = 1;
            
            
            //code to pulse the pause menu?
            
            //if possible: save position of playhead, slow down music into a dreamlike kind of pace, then resume at correct position and at full speed when unpaused?
            
            //or do a pitch-down fade out, and move the playhead back a bit to "spin the record back up" without losing position when you resume
            
        }
    }
    
    this.draw = function() {
        
        
        
        
        this.myShip.draw();
        
        for (var shotCount2 = 0; shotCount2 < this.shots.length; shotCount2++) {
            this.shots[shotCount2].draw();
        }
        
        textSize(10);
        fill(255, 0, 0);
        textAlign(LEFT);
        text("Shots: " + this.shots.length, 20, 40);
        
        
        
        if (this.state == 0) {
            //draw pause icon
            textSize(50);
            fill(255, 0, 0);
            textAlign(CENTER);
            text("PAUSED", 250, 150);
        }
    }
}