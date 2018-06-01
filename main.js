//GAME SETTINGS
const EmptyPlotPositions = [[20, 32], [36, 32], [49, 32], [62, 32]];
const TOWER_CONST = [{}, {price: 25, name: 'Cannon'}, {price: 50, name: "Bubble"},
    {price: 75, name: 'Mortar'}, {price: 100, name: 'Farm'}];
const TOWER_UPGRADES = ['', '', '', '', '', 'Force', 'Range', 'Speed', 'Sell'];

let Towers = [],
    Enemies = [];
let Time = 0;
let selectedTower = null;
let backgroundSprite;
//SETUP
let UI;
let backgroundMusic;
let musicPlaying = false;
let popSound, cashSound, backgroundImg, backgroundBlankImg, plotImg, enemyImages = [], towerImages = [],crown;
const ENEMYSTARTINGPOS = 0;
let ENEMYSPEED = 1;
let gameOverRadius = 10;
let freezeGame = false;
//
let rl;
let f;
let s;
let th;
let r;
let l;
//
let gameFont;

//----------\vars/---------/main\---------------

function preload() {
    //music
    backgroundMusic = loadSound('./sounds/backgroundMusic.mp3');
    //font
    gameFont = loadFont('./Fonts/coolstory regular.ttf');
    //sound
    popSound = loadSound('./sounds/popSound.mp3');
    cashSound = loadSound('./sounds/cashSound.mp3');
    //images
    backgroundImg = loadImage('./images/background.jpg');
    backgroundBlankImg = loadImage('./images/backgroundBlank.jpg');
    plotImg = loadImage('./images/emptyPlot.png');
    score.coinIMG = loadImage(`./images/coin.svg`);
    crown = loadImage(`./images/crown.png`);
    for (let i = 1; i < 7; i++) {
        enemyImages[i] = loadImage(`./images/enemy${i}.png`);
    }
    for (let i = 1; i < 5; i++) {
        towerImages[i] = loadImage(`./images/tower${i}.png`);
    }
    towerImages.push(loadImage(`./images/upforce.svg`));
    towerImages.push(loadImage(`./images/uprange.svg`));
    towerImages.push(loadImage(`./images/upfreq.svg`));
    towerImages.push(loadImage(`./images/coin.svg`));
}

function setup() {
    textFont(gameFont);
    frameRate(60);
    //Center all balls
    ellipseMode(CENTER);
    scoreHeight = height * .3;
    leftScoreLeft = width * .05;
    canvas = createCanvas(windowWidth, windowHeight);
    backgroundSprite = new Supersprite(width / 2, height / 2, width, height);
    backgroundSprite.addImage(backgroundImg);
    backgroundSprite.onMousePressed = () => {
        UI.delete();
        selectedTower = null;
    };
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
        if (!musicPlaying) {
            musicPlaying = true;
            backgroundMusic.play();
        }
        backgroundSprite.display();
    } else {
        image(backgroundBlankImg, 0, 0, this.width, this.height);
    }
    if (Game.gameState === GameStates.InGame) {
        Time += (freezeGame)?0:1;
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
        StartScreen();
    } else if (Game.gameState === GameStates.GameOver) {
        //GAME OVER
        EndScreen();
    } else if (Game.gameState === GameStates.LeaderBoard) {
        //GAME OVER
        drawLeaderboard();
    }
}
