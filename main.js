let Towers = [],
    Enemies = [],
    Shoots = [];
let Time = 0;
let backgroundSprite;
//SETUP
let Buttons = [];
let UI;
let cannonImg;
let popSound;
const ENEMYSTARTINGPOS = 0;
const ENEMYSPEED = 1;

function preload() {
    popSound = loadSound('sounds/popSound.mp3');
    cannonImg = loadImage('./icons/cannonIcon.png');
}

function setup() {
    frameRate(60);
    UI = null;
    //Center all balls
    cannonImg.resize(80, 80);
    ellipseMode(CENTER);

    createCanvas(windowWidth, windowHeight);
    backgroundSprite = createSprite(width / 2, height / 2, width, height);
    backgroundSprite.shapeColor = 'green';
    backgroundSprite.onMousePressed = () => {
        UI = null;
    }
    Towers.push(new Plot(250, 250));
    Shoots.push(new Shoot(250, 250, 1));


    //CREATE LEVELS
    generateEnemies(100);
}

//GAME LOGIC
function draw() {
    drawSprite(backgroundSprite);
    Time += 1;
    Enemies.forEach((enemy) => {
        enemy.draw();
    });

    Towers.forEach((tower) => {
        tower.update();
    });
    //GUI should always be rendered last
    try {
        UI.update();
    } catch (e) {

    }
}

//SPECIAL MOUSE EVENT HANDLING
function mousePressed() {

}

//------------------------FUNCTIONS-----------------------------------------

function getPosition(t) {
    let x = t;
    let y = height / 2;
    return {
        x,
        y
    };
}

function generateEnemies(val) {
    while (val > 0) {
        switch (true) {
            case val >= 100:
                val -= 100;
                Enemies.push(new Enemy(100));
                break;
            case val >= 50:
                val -= 50;
                Enemies.push(new Enemy(50));
                break;
            case val >= 25:
                val -= 25;
                Enemies.push(new Enemy(25));
                break;
            case val >= 10:
                val -= 10;
                Enemies.push(new Enemy(10));
                break;
            case val >= 1:
                val -= 1;
                Enemies.push(new Enemy(1));
                break;
        }
    }
}

//CLASSES ------------------------------------------------------------------------------

class Enemy {
    constructor(value) {
        console.log(value);
        this.xPos = 0;
        this.yPos = height / 2;
        this.radius = 25;
        this.time = 0; //random(0, -100);
        this.speed = 1;
        this.value = value;
        this.futureHealth = value;
        switch (value) {
            case 1:
                this.color = 'green';
                //this.speed = 1.5;
                break;
            case 5:
                this.color = 'blue';
                //this.speed = 1.3;
                break;
            case 10:
                this.color = 'red';
                //  this.speed = 1.1;
                break;
            case 25:
                this.color = 'purple';
                //    this.speed = 0.9;
                break;
            case 50:
                this.color = 'orange';
                //      this.speed = 0.7;
                break;
            case 100:
                this.color = 'black';
                //        this.speed = 0.5;
                break;
        }
    }
}
Enemy.prototype.hit = function(force) {
    this.value -= force;
    if (this.value <= 0) {
        popSound.play();
        this.delete();
    }
}
Enemy.prototype.delete = function() {
    Enemies.splice(Enemies.indexOf(this), 1);
}
Enemy.prototype.draw = function() {
    this.time += this.speed * ENEMYSPEED;
    this.xPos = getPosition(this.time).x;
    this.yPos = getPosition(this.time).y;
    fill(255 / this.futureHealth * 10, 0, 0);
    ellipse(this.xPos, this.yPos, this.radius, this.radius);
    if (this.time <= 0) {
        this.delete();
    }
}

var mouseInArea = (xMin, xMax, yMin, yMax) => {
    if (mouseX > xMin && mouseX < xMax && mouseY > yMin && mouseY < yMax) {
        return true;
    }
}
