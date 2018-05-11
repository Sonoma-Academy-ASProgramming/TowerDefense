let Towers = [],
    Enemies = [];
let Time = 0;
let selectedTower = null;
let backgroundSprite;
//SETUP
let UI;
let popSound, backgroundImg, plotImg, enemyImages = [], towerImages = [];
const ENEMYSTARTINGPOS = 0;
let ENEMYSPEED = 1;
let gameOverRadius = 10;
//
let rl;
let f;
let s;
let th;
let r;
let l;

//----------\vars/---------/main\---------------

function preload() {
    popSound = loadSound('./sounds/popSound.mp3');
    backgroundImg = loadImage('./images/background.png');
    plotImg = loadImage('./images/emptyPlot.png');
    score.coinIMG = loadImage(`./images/coin.svg`);
    for (let i = 1; i < 7; i++) {
        enemyImages[i] = loadImage(`./images/enemy${i}.png`);
    }
    for (let i = 1; i < 5; i++) {
        towerImages[i] = loadImage(`./images/tower${i}.png`);
    }
}

function setup() {
    UI = new GUI();
    frameRate(60);
    //Center all balls
    ellipseMode(CENTER);
    scoreHeight = height * .3;
    leftScoreLeft = width * .05;
    createCanvas(windowWidth, windowHeight);
    backgroundSprite = new Supersprite(width / 2, height / 2, width, height);
    backgroundSprite.addImage(backgroundImg);
    backgroundSprite.onMousePressed = () => {
        UI.delete();
    };

    Towers.push(new EmptyPlot(250, 230));
    Towers.push(new EmptyPlot(500, 230));
    Towers.push(new EmptyPlot(750, 230));
    Towers.push(new EmptyPlot(1000, 230));

    score.scoreHeight = height * .25;
    score.leftScoreLeft = width * .03;
    score.levelLeft = width * .45;
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
        backgroundSprite.display();
        Time += 1;
        Enemies.forEach((enemy) => {
            enemy.draw();
        });

        Towers.forEach((tower) => {
            tower.update();
        });
        score.drawScore();
        //GUI should always be rendered last
        UI.update();
    } else if (Game.gameState === GameStates.GameStart) {
        //Start Screen
        Game.startGame();
    } else if (Game.gameState === GameStates.GameOver) {
        //GAME OVER
        /*Animate Game Over*/
        if (gameOverRadius < Math.sqrt(width * width + height * height)) {
            gameOverRadius += 50;
        }
        ellipse(width / 2, height / 2, gameOverRadius);
        push();
        fill("white");
        textAlign(CENTER, BOTTOM);
        textSize(100);
        text("Game Over!", width / 2, height / 2);
        pop();
    }
}
