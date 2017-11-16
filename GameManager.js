
function GameManager() {
    this.myShip = new AstShip(250, 150, 1, 100, 100, 100);
    this.asteroids = [];
    
    
    this.update = function() {
        
    }
    
    this.draw = function() {
        this.myShip.draw();
    }
}