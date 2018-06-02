//GAME SETTINGS
const EmptyPlotPositions = [[20, 32], [36, 32], [49, 32], [62, 32], [35, 47.5], [50, 47.5], [65, 47.5], [25, 65], [40, 65], [65, 65], [30, 85], [46, 85], [62, 85], [78, 85]];
const TOWER_CONST = [{}, {price: 25, name: 'Cannon'}, {price: 50, name: "Bubble"},
    {price: 75, name: 'Flamer'}, {price: 100, name: 'Farm'}];
const TOWER_UPGRADES = ['', '', '', '', '', 'Force', 'Range', 'Speed', 'Sell'];

let Towers = [],
    Enemies = [];
let Time = 0;
let selectedTower = null;
let backgroundSprite;
//SETUP
let UI;
let startMenuMusic, backgroundMusic;
let musicPlaying = false;
let backgroundImg, backgroundBlankImg, plotImg, enemyImages = [], towerImages = [], crown;
let menuMusicPlaying = false;
let popSound, cashSound, buttonSound, towerSelectedSound;
const ENEMYSTARTINGPOS = 0;
let ENEMYSPEED = 1;
let gameOverRadius = 10;
//controls the currentRange
let rangeValue = 0;
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
    backgroundMusic = loadSound('assets/sounds/backgroundMusic.mp3');
    startMenuMusic = loadSound('assets/sounds/startMenuMusic.mp3');
    startMenuMusic.setVolume(.3);
    backgroundMusic.setVolume(.3);
    //font
    gameFont = loadFont('assets/fonts/coolstory regular.ttf');
    //sound
    popSound = loadSound('assets/sounds/popSound.mp3');
    cashSound = loadSound('assets/sounds/cashSound.mp3');
    buttonSound = loadSound('assets/sounds/buttonSound.mp3');
    towerSelectedSound = loadSound('assets/sounds/towerSelectedSound.mp3');
    //images
    backgroundImg = loadImage('assets/images/background.jpg');
    backgroundBlankImg = loadImage('assets/images/backgroundBlank.jpg');
    plotImg = loadImage('assets/images/emptyPlot.png');
    score.coinIMG = loadImage(`assets/images/coin.svg`);
    crown = loadImage(`assets/images/crown.png`);
    for (let i = 1; i < 7; i++) {
        enemyImages[i] = loadImage(`assets/images/enemy${i}.png`);
    }
    for (let i = 1; i < 5; i++) {
        towerImages[i] = loadImage(`assets/images/tower${i}.png`);
    }
    towerImages.push(loadImage(`assets/images/upforce.svg`));
    towerImages.push(loadImage(`assets/images/uprange.svg`));
    towerImages.push(loadImage(`assets/images/upfreq.svg`));
    towerImages.push(loadImage(`assets/images/sell.svg`));
}

function setup() {
    setupStartScreen();
    textFont(gameFont);
    frameRate(60);
    //Center all balls
    ellipseMode(CENTER);
    scoreHeight = height * .3;
    leftScoreLeft = width * .05;
    createCanvas(windowWidth, windowHeight);
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
    if (Game.gameState === GameStates.GameStart) {
        if (!menuMusicPlaying) {
            menuMusicPlaying = true;
            startMenuMusic.loop();
        }
    }
    if (Game.gameState === GameStates.InGame) {
        if (!musicPlaying) {
            startMenuMusic.stop();
            menuMusicPlaying = false;
            musicPlaying = true;
            backgroundMusic.loop();
        }
        backgroundSprite.display();
    } else {
        image(backgroundBlankImg, 0, 0, this.width, this.height);
    }
    if (Game.gameState === GameStates.InGame) {
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
        StartScreen();
    } else if (Game.gameState === GameStates.Tutorial) {
        Tutorial();
    } else if (Game.gameState === GameStates.GameOver) {
        //GAME OVER
        EndScreen();
    } else if (Game.gameState === GameStates.Credits) {
        //Credits
        CreditScreen();
    } else if (Game.gameState === GameStates.LeaderBoard) {
        //GAME OVER
        drawLeaderboard();
    } else if (Game.gameState === GameStates.NameEnter) {
        //GAME OVER
        drawNameEnter();
    }
}
