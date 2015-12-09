// Enemies our player must avoid

/**
* @description      represents an enemy class
* @param x int      represents the starting point for the x-axis
* @param y int      same as x, but for y-axis
* @param speed int  relative speed used for the enemy
* @returns obj      a new enemy instance
*/
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    
    // remove enemy from array when it passes from the 
    // screen
    if (this.x > 600 && allEnemies.length > 5) {
        allEnemies.shift();
    }

    // for each enemy get the floor of it's x position, then
    // check for collision 
    for (var i = 0; i < allEnemies.length; i++) {
        floorX = Math.floor(allEnemies[i].x);
        allEnemies[i].collide();
    }
    // this.collide();
    return this.x;
};

//collision method used for detecting a collision
//on the screen between player and enemy
Enemy.prototype.collide = function(){
    // player will only be on 1 of three y axis, 
    // * check for player to be in range of the x axis 
    // * of an enemy, if so player.reset();
    
    if (this.y == player.y && floorX + 40 > player.x - 25 && floorX < player.x + 25) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** 
*   @description used to create a varaibles to use in
*                the creating of a new enemy instance 
*   @returns     nothing
*
*/
var bugGen = function() {
    setInterval(function() {
        // preset speeds, just to keep it all reasonable
        // and easy to ipdate
        var speed = [100, 125, 150, 175, 200];
        var speedRand = Math.floor(Math.random() * speed.length);
        
        // starting points on canvas of y-axis for enemies to spawn
        var startPos = [225, 140, 55];
        var rowRand = Math.floor(Math.random() * startPos.length);
        var enemy = new Enemy(-100, startPos[rowRand], speed[speedRand]);

        allEnemies.push(enemy);
        

    }, 1250);
};

/**
*   @description    represents a player class
*   @returns        a new player
*/

var Player = function(){
    this.x = 200;
    this.y = 395;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(){};

Player.prototype.handleInput = function(keypress){
    // apply movement to character, keeping him in the
    // boundaries of the canvas
    switch(keypress){
        case 'up': if (this.y > 20) {
            this.y -= 85;
        }
        //reset player if water is reached
        if (this.y < 25) {
            this.reset();
        }
        break;

        case 'down': if (this.y < 311) {
            this.y += 85;
        }
        break;

        case 'right': if (this.x < 400) {
            this.x += 100;
        }
        break;

        case 'left': if (this.x > 50) {
            this.x -= 100;
        }
        break;

    }    
};

Player.prototype.reset = function(){
    player.x = 200;
    player.y = 395; 
};

player = new Player();
var allEnemies = [];
bugGen();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
