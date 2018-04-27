let Towers = [],
    Enemies = [];
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
    console.log(plotImg);
    backgroundImg.resize(windowWidth, windowHeight);
    backgroundSprite.addImage("Background", backgroundImg);
    backgroundSprite.onMousePressed = () => {
        UI = null;
    };
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

    //Setup Game
    Game.startGame();
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



let mouseInArea = (xMin, xMax, yMin, yMax) => {
    if (mouseX > xMin && mouseX < xMax && mouseY > yMin && mouseY < yMax) {
        return true;
    }
}
