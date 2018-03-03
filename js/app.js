'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed + 200 ;

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
    
    //reset positions for enemy
    if (this.x > 500) {
        this.x = -50;
        this.speed = 200 + Math.floor(Math.random() * 200);
    }

    // Check for collision between player and enemies 
    //(LOSE)
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        window.alert("Oops! Try Again :(");
        player.reset();
        player.initScore();
    }    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(
        Resources.get(this.sprite),
        this.x,
        this.y
    );
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // player cannot move outside canvas
    if (this.y > 400) {
        this.y = 400;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // player reach water (WIN)
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        window.alert("Geart! you Won ☻");
        this.reset();
        this.updateScore();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(
        Resources.get(this.sprite),
        this.x, 
        this.y
    );
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            this.y -= this.speed + 83;
            break;
        case 'down':
            this.y += this.speed + 83;
            break;
        case 'left':
            this.x -= this.speed + 101;
            break;
        case 'right':
            this.x += this.speed + 101;
            break;
    }
};

var score = 0;
var scoreLabel = document.getElementById("score");
//Score
Player.prototype.initScore = function(){
    score= 0;
    scoreLabel.innerHTML = score;
    
};

Player.prototype.updateScore = function(){
    score++;
    scoreLabel.innerHTML = score;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(200, 400, 50);

var yAxis = [60, 140, 225];
var enemies;

yAxis.forEach( function(yAxis){
    enemies = new Enemy( 0, yAxis , Math.floor(Math.random()* 300));
    allEnemies.push(enemies);
    
});

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
