// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
scoreDisplay = document.getElementById('score');
timeDisplay = document.getElementById('time');

const deathmusic = new Audio('audio/pause.mp3');
const bgmusic = new Audio('audio/bgmusic.mp3');
const never = new Audio('audio/neversaynever.mp3');

const interactionWorkAround = function () {
    bgmusic.loop= 'true';
    bgmusic.play();
}

setTimeout(interactionWorkAround, 2000);


class Engine {
    // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
    // You need to provide the DOM node when you create an instance of the class
    constructor(theRoot) {
        // We need the DOM element every time we create a new enemy so we
        // store a reference to it in a property of the instance.
        this.root = theRoot;
        // We create our hamburger.
        // Please refer to Player.js for more information about what happens when you create a player
        this.player = new Player(this.root);
        // Initially, we have no enemies in the game. The enemies property refers to an array
        // that contains instances of the Enemy class
        this.enemies = [];
        // We add the background image to the game
        addBackground(this.root);
        this.score = 0;
        this.time = 0;
    }

    // The gameLoop will run every few milliseconds. It does several things
    //  - Updates the enemy positions
    //  - Detects a collision between the player and any enemy
    //  - Removes enemies that are too low from the enemies array
    gameLoop = () => {
        // This code is to see how much time, in milliseconds, has elapsed since the last
        // time this method was called.
        // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
        if (this.lastFrame === undefined) this.lastFrame = (new Date).getTime();
        let timeDiff = (new Date).getTime() - this.lastFrame;
        this.lastFrame = (new Date).getTime();
        // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
        // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
        this.enemies.forEach(enemy => {
            enemy.update(timeDiff);
        });
        // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
        // We use filter to accomplish this.
        // Remember: this.enemies only contains instances of the Enemy class.
        this.enemies = this.enemies.filter(enemy => {
            return !enemy.destroyed;
        });

        let num = (Math.round(100*this.time));
        // console.log(num);
        if(num%500===0 && num != 0 && MAX_ENEMIES<16){
            console.log('here comes another one');
            MAX_ENEMIES++;
            console.log(MAX_ENEMIES);
        }



        // We need to perform the addition of enemies until we have enough enemies.
        while (this.enemies.length < MAX_ENEMIES) {
            // We find the next available spot and, using this spot, we create an enemy.
            // We add this enemy to the enemies array 
            const spot = nextEnemySpot(this.enemies);
            this.enemies.push(new Enemy(this.root, spot));
        }

        // player's x location: this.player.x
        // player's y location: this.player.y


        // Adding 1 point per game loop

        this.score += 1;
        this.time += 0.0215
        scoreDisplay.innerText = this.score;
        timeDisplay.innerText = Math.floor(this.time);


        // if(Math.floor(this.time)%10==0) {MAX_ENEMIES++;}

        // We check if the player is dead. If he is, we alert the user
        // and return from the method (Why is the return statement important?)
        if (this.isPlayerDead()) {
            bgmusic.pause();
            never.play();
            // document.getElementById("myAudio").loop = true;
            deathmusic.loop = 'true';
            deathmusic.play();
            // window.alert("Game over");         //damn is this annoying...
            return;
        }
        // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
        setTimeout(this.gameLoop, 20);
    }
    // This method is not implemented correctly, which is why
    // the burger never dies. In your exercises you will fix this method.
    isPlayerDead = () => {
        let dead = false
        this.enemies.forEach(element => {
            if (
                element.y <this.player.y+10 && element.y >this.player.y-95 &&
                element.x <this.player.x+35 && element.x >this.player.x-35){
                dead = true;
            }
        });


        
        return dead;
    }
}