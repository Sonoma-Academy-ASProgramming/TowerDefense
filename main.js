//GAME SETTINGS
const EmptyPlotPositions = [[20, 32], [36, 32], [49, 32], [62, 32]];

let Towers = [],
    Enemies = [];
let Time = 0;
let selectedTower = null;
let backgroundSprite;
//SETUP
let UI;
let backgroundMusic;
let popSound, cashSound, backgroundImg, plotImg, rewardImg, enemyImages = [], towerImages = [];
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
let gameFont;

//----------\vars/---------/main\---------------

function preload() {
    //music
    //backgroundMusic = loadSound('./sounds/backgroundMusic.mp3');
    //font
    gameFont = loadFont('./Fonts/coolstory regular.ttf');
    //sound
    popSound = loadSound('./sounds/popSound.mp3');
    cashSound = loadSound('./sounds/cashSound.mp3');
    //images
    backgroundImg = loadImage('./images/background.png');
    plotImg = loadImage('./images/emptyPlot.png');
    score.coinIMG = loadImage(`./images/coin.svg`);
    rewardImg = loadImage(`./images/reward.png`);
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
        selectedTower = null;
    };

    for (let pos of EmptyPlotPositions) {
        Towers.push(new EmptyPlot(horizontal(pos[0]), verticle(pos[1])));
    }
    score.scoreHeight = height * .25;
    score.leftScoreLeft = width * .03;
    score.levelLeft = width * .45;
    score.coinLeft = width * 0.8;

    score.coinTop = score.scoreHeight - height * 0.01;
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
        image(rewardImg, 100, 200, 100, 100);
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
        if (mouseIsPressed) {
            Game.startGame();
        }
        fill("black");
        rect(0, 0, width, height);
        push();
        fill("white");
        textAlign(CENTER, BOTTOM);
        textSize(100);
        text("Click to Start", width / 2, height / 2);
        pop();
    } else if (Game.gameState === GameStates.GameOver) {
        //GAME OVER
        /*Animate Game Over*/
        if (gameOverRadius < Math.sqrt(width * width + height * height)) {
            gameOverRadius += 50;
        }
        fill("black");
        ellipse(width / 2, height / 2, gameOverRadius);
        push();
        fill("white");
        textAlign(CENTER, BOTTOM);
        textSize(100);
        text("Game Over!", width / 2, height / 2);
        pop();
    }
}

$(document).keydown(function (event) {
    if ((event.keyCode == 123)|| (event.ctrlKey && event.shiftKey && event.keyCode == 73)) { // Prevent F12
        alert("Please respect this game!")
        return false;
    }
});
