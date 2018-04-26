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
    //backgroundImg.resize(windowWidth, windowHeight);
    backgroundSprite.addImage("Background", backgroundImg);
    backgroundSprite.onMousePressed = () => {
        UI = null;
    };
    Towers.push(new EmptyPlot(250, 230));
    Towers.push(new EmptyPlot(500, 230));


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