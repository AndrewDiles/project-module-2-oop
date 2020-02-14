// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen

const laser = new Audio('audio/laserBlast.wav');
// const yoda = document.getElementById('yoda');
let loaded = true;
console.log(yoda);
console.log(yoda.display);
yoda.style.display= 'none !important';
yoda.style.lenft = '300px';

class Player {
    // The constructor takes one parameter. This parameter refers to the parent DOM node.
    // We will be adding a DOM element to this parent DOM node.
    constructor(root) {
        // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
        // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
        // the leftmost x position of the image.
        this.x = 7 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - 2 * PLAYER_HEIGHT -10;
        let y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
        // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
        // DOM node in a property.
        this.domElement = document.createElement("img");
        this.domElement.src = 'images/falcon.png';                      // change to falcon once size is the same
        // this.domElement.style.height = '150px';                         //added
        // this.domElement.style.width= '200px';                           //added
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top =` ${y}px`;
        this.domElement.style.zIndex = '10';
        root.appendChild(this.domElement);
    }
    // This method will be called when the user presses the left key. See in Engine.js
    // how we relate the key presses to this method

    moveLeft() {
        if (this.x > 0) {
            this.x = this.x - PLAYER_WIDTH;
        }
        this.domElement.style.left = `${this.x}px`;
    }
    // We do the same thing for the right key. See Engine.js to see when this happens.
    moveRight() {
        if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
            this.x = this.x + PLAYER_WIDTH;
        }
        this.domElement.style.left = `${this.x}px`;
    }
    moveDown() {
        if (this.y + 2*PLAYER_HEIGHT < GAME_HEIGHT) {
            this.y = this.y + PLAYER_HEIGHT;
        }
        this.domElement.style.top = `${this.y}px`;
    }
    moveUp() {
        if (this.y > 0) {
            this.y = this.y - PLAYER_HEIGHT;
        }
        this.domElement.style.top = `${this.y}px`;
    }
    fire() {
        if (loaded) {laser.play();
            loaded=false;
            new Yoda(this.root,this.domElement.style.left+80,this.domElement.style.top+15);

            // yoda.style.display = 'block';
            yoda.style.top = `${this.domElement.style.top+15}px`;
            console.log(yoda.style.left);
            // console.log(this.domElement.style.top);
            yoda.style.left = `${this.domElement.style.left+80}px`;
            setTimeout(function(){loaded=true;}, 1500);
        }
    }

}