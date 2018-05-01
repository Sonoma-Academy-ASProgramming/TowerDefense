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
let ENEMYSPEED = 5;

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

    score.scoreHeight = height * .25;
    score.leftScoreLeft = width * .03;
    rl = height * 0.17;
    f = height * 0.4;
    s = f + rl;//height * 0.57;
    th = s + rl + height * 0.02;
    r = width * 5 / 6;
    l = width / 6;
}

//GAME LOGIC
function draw() {
    if (Game.gameState === GameStates.InGame) {

        drawSprite(backgroundSprite);
        Time += 1;
        Enemies.forEach((enemy) => {
            enemy.draw();
        });

        Towers.forEach((tower) => {
            tower.update();
        });
        score.drawScore();
        //GUI should always be rendered last
        try {
            UI.update();
        } catch (e) {

        }
    } else if (Game.gameState === GameStates.GameStart) {
        //Start Screen
        Game.startGame();
    } else if (Game.gameState === GameStates.GameOver) {
        //GAME OVER
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
