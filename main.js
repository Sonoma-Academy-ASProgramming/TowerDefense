let Towers = [],
    Enemies = [],
    Shoots = [];
let Time = 0;
let selectedTower = null;
let backgroundSprite;
//SETUP
let Buttons = [];
let UI;
let popSound, backgroundImg, plotImg;
const ENEMYSTARTINGPOS = 0;
const ENEMYSPEED = 1;

//
let rl;
let f;
let s;
let th;
let r;
let l;
//----------\vars/---------/main\---------------

function preload() {
    popSound = loadSound('sounds/popSound.mp3');
    backgroundImg = loadImage('./images/background.png');
    plotImg = loadImage('./images/emptyPlot.png');
}

function setup() {
    frameRate(60);
    UI = null;
    //Center all balls
    ellipseMode(CENTER);

    createCanvas(windowWidth, windowHeight);
    backgroundSprite = createSprite(width / 2, height / 2, width, height);
    backgroundImg.resize(windowWidth, windowHeight);
    backgroundSprite.addImage("Background", backgroundImg);
    backgroundSprite.onMousePressed = () => {
        UI = null;
    }
    Towers.push(new EmptyPlot(250, 230));
    Towers.push(new EmptyPlot(500, 230));
    Towers.push(new EmptyPlot(750, 230));
    Towers.push(new EmptyPlot(1000, 230));
    rl = height * 0.17;
    f = height * 0.4;
    s = f + rl;//height * 0.57;
    th = s + rl + height * 0.02;
    r = width * 5 / 6;
    l = width / 6;

    //CREATE LEVELS
    setInterval(testGenEmys, 750);
    generateEnemies(60);
}

function testGenEmys() {
    generateEnemies(Math.floor(Math.random() * 90) + 20);
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
    if (t < width * 5 / 6) {
        return {
            x: t,
            y: f
        };
    } else if ((t >= r) && (t < r + rl)) {
        return {
            x: r,
            y: t - r + f
        }
    } else if ((t >= r + rl) && (t < r + r + rl - l)) {
        return {
            x: r - (t - r - rl),
            y: s
        }
    } else if ((t >= r + r + rl - l) && (t < r + r + rl - l + rl)) {
        return {
            x: l,
            y: t - (r + r + rl - l) + s
        }
    } else if ((t >= r + r + rl - l + rl + height * 0.02) && (t < r + r + rl - l + rl + r - l)) {
        return {
            x: t - (r + r + rl - l + rl) + l,
            y: th
        }
    } else {
        return {
            x: -1000,
            y: -1000
        }
    }

}

function generateEnemies(val) {
    while (val > 0) {
        switch (true) {
            case val >= 160000:
                val -= 160000;
                Enemies.push(new Enemy(100, 'orange', 0.7));
                break;
            case val >= 8000:
                val -= 8000;
                Enemies.push(new Enemy(50, 'purple', 0.9));
                break;
            case val >= 400:
                val -= 400;
                Enemies.push(new Enemy(25, 'red', 1.1));
                break;
            case val >= 20:
                val -= 20;
                Enemies.push(new Enemy(10, 'blue', 1.3));
                break;
            case val >= 1:
                val -= 1;
                Enemies.push(new Enemy(1, 'green', 1.5));
                break;
        }
    }
}

//CLASSES ------------------------------------------------------------------------------

class Enemy {
    constructor(value, color, speed) {
        this.xPos = 0;
        this.yPos = height / 2;
        this.radius = 25;
        this.time = 0;
        this.speed = speed;
        this.speed = 5;
        this.value = value;
        this.futureHealth = value;
        this.color = color;
    }
}

Enemy.prototype.hit = function (force) {
    this.value -= force;
    if (this.value <= 0) {
        popSound.play();
        this.delete();
    }
}
Enemy.prototype.delete = function () {
    Enemies.splice(Enemies.indexOf(this), 1);
}
Enemy.prototype.draw = function () {
    this.time += this.speed * ENEMYSPEED;
    this.xPos = getPosition(this.time).x;
    this.yPos = getPosition(this.time).y;
    fill(this.color);
    //  fill(255 / this.futureHealth * 10, 0, 0);
    ellipse(this.xPos, this.yPos, this.radius, this.radius);
    // if (this.time <= 0) {
    //     this.delete();
    // }
    if (this.time > r + r + rl - l + rl + r - l){
        alert("game over");
        console.log(this);
    }
}

var mouseInArea = (xMin, xMax, yMin, yMax) => {
    if (mouseX > xMin && mouseX < xMax && mouseY > yMin && mouseY < yMax) {
        return true;
    }
}
