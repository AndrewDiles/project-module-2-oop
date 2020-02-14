

class Yoda {

    constructor(theRoot, playerX, playerY) {
        this.root = theRoot;
        this.x = playerX;
        this.y = playerY;
        this.destroyed = false;
        this.domElement = document.createElement('img');
        this.domElement.src = './images/babyYoda2.png';
        // We modify the CSS style of the DOM node.
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = `${this.y}px`;
        this.domElement.style.zIndex = 7;
        // Show that the user can actually see the img DOM node, we append it to the root DOM node.
        theRoot.appendChild(this.domElement);
        this.speed = 7;
    }

    // We set the speed property of the enemy. This determines how fast it moves down the screen. 
    // To make sure that every enemy has a different speed, we use Math.random()
    // this method will be called on the enemy instance every few milliseconds. The parameter
    // timeDiff refers to the number of milliseconds since the last update was called. 
    update(timeDiff) {
        // We update the y property of the instance in proportion of the amount of time
        // since the last call to update. We also update the top css property so that the image
        // is updated on screen
        this.y = this.y - timeDiff * this.speed;
        this.domElement.style.top = `${this.y}px`;
        // If the y position of the DOM element is greater than the GAME_HEIGHT then the enemy is at the bottom
        // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
        // the destroyed property to indicate that the enemy should no longer be in play
        if (this.y <= 5) {
                this.root.removeChild(this.domElement);
                this.destroyed = true;
        }
    }
}