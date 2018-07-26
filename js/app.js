// Enemies our player must avoid
// Enemy's constructor function
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed =  Math.floor((Math.random() * 200) + 20);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

	// When enemy reaches the right border he starts his movement from 
	// the left border again
	if (this.x > 503) {
        this.x = -100;
    }

    this.handleCollision(player); 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handle collision between enemy and player instances 
// and return player to initial position in case of collision
Enemy.prototype.handleCollision = function(player) {
	if ((player.x < this.x + 65) && (player.x + 65 > this.x) && (player.y < this.y + 45) && (player.y + 45 > this.y)) {
		player.x = 205;
		player.y = 400;
	}
}

// Player's constructor function
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
Player.prototype.update = function() {

	// Create Winner's message and restart a game
	function winnerMessage() {
		const winnerDiv = document.querySelector('.winnerDiv');
		const winnerText = document.querySelector('.winnerText');
		const playAgain = document.querySelector('.playAgain');
		const canvasBoard = document.querySelector('canvas');
		winnerDiv.style.display ='block';
		canvasBoard.className = 'blur';
    	winnerText.textContent = 'Congratulations! You are the winner!';
    	// Reload page completely when clicking "Play again" button
    	playAgain.addEventListener("click", restart);
   	}

	// Reload page completely after 0,5 of second 
	function restart() {
    	setTimeout(function(){
    		document.location.reload();
  		}, 500);
	}	

	// Conditions for preventing player's movement out of board
	if (this.x < 5) {
		this.x = 5;
	}
	if (this.x > 403) {
		this.x = 403;
	}
	if (this.y > 440) {
		this.y = 440;
	}

	// When player reaches the water, he moves on initial position 
	// and winner's message appears
    if (this.y < 25) {
    	this.x = 205;
   		this.y = 400;
   		winnerMessage();
   	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   
};

// method for handling player's movement
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
    case 'left': this.x -=50;
    break;
    case 'right': this.x +=50;
    break;
    case 'up': this.y -=50;
    break;
    case 'down': this.y +=50;
    break;
  }
};

// Instantiate  objects

// Instantiate enemy objects
const enemy1 = new Enemy(0, 140);
const enemy2 = new Enemy(-20, 60);
const enemy3 = new Enemy(30, 220);

// Place all enemy objects in an array called allEnemies
let allEnemies = [];

allEnemies.push(enemy1, enemy2, enemy3);

// Instantiate player object and place in a variable called player
const player = new Player(205, 400);

// This listens for key presses and sends the keys to 
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
