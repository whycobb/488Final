function SoundEngine() {
    this.intensity = 100;
    this.hue = 0;
    this.hue2 = 180;
    
    this.getIntensity = function() {
        return this.intensity;
    }
    
    this.getHue = function() {
        return this.hue;
    }
    
    this.getHue2 = function() {
        return this.hue2;
    }
    
    this.tick = function() {
        //this is going to be the doozy
        
        this.hue += 0.5;
        this.hue2 = this.hue + 180;
        
        if (this.hue > 360) this.hue -= 360;
        if (this.hue2 > 360) this.hue2 -= 360;
        
        
    }
}