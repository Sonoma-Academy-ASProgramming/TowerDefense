//GAME SETTINGS
const EmptyPlotPositions = [[20, 32], [36, 32], [49, 32], [62, 32], [35, 47.5], [50, 47.5], [65, 47.5], [25, 65], [40, 65], [65, 65], [30, 85], [46, 85], [62, 85], [78, 85]];
const TOWER_CONST = [{}, {price: 25, name: 'Cannon'}, {price: 50, name: "Bubble"},
    {price: 75, name: 'Flamer'}, {price: 100, name: 'Farm'}];
const TOWER_UPGRADES = ['', '', '', '', '', 'Force', 'Range', 'Speed', 'Sell'];
const welcomeMessages = ["The Most Important Meal of the Day!", "Seasonal Fruit!", "Palm Oil Free!", "Yanny!", "Laurel!", "It's Not a Phase!", "Minecraft Did This!", "Covfefe!", "The Snack That Smiles Back!", "Congratulations Class of 2018!", "Who you gonna call?"];
let Towers = [],
    Enemies = [];
let Time = 0;
let selectedTower = null;
let backgroundSprite;
//SETUP
let UI;
let leftArrow;
let rightArrow;
let startMenuMusic, tutorialMusic, backgroundMusic;
let musicPlaying = false;
let tutorialMusicPlaying = false;
let menuMusicPlaying = false;
let backgroundImg, backgroundBlankImg, plotImg, enemyImages = [], towerImages = [], crown;
let popSound, cashSound, buttonSound, towerSelectedSound;
const ENEMYSTARTINGPOS = 0;
let ENEMYSPEED = 1;
let gameOverRadius = 10;
//controls the currentRange
let rangeValue = 0;
let freezeGame = false;
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
    backgroundMusic = loadSound('/views/TowerDefense/assets/sounds/backgroundMusic.mp3');
    startMenuMusic = loadSound('/views/TowerDefense/assets/sounds/startMenuMusic.mp3');
    tutorialMusic = loadSound('/views/TowerDefense/assets/sounds/tutorialMusic.mp3');
    startMenuMusic.setVolume(.3);
    backgroundMusic.setVolume(.3);
    tutorialMusic.setVolume(.3);
    //font
    gameFont = loadFont('/views/TowerDefense/assets/fonts/coolstory regular.ttf');
    //sound
    popSound = loadSound('/views/TowerDefense/assets/sounds/popSound.mp3');
    cashSound = loadSound('/views/TowerDefense/assets/sounds/cashSound.mp3');
    buttonSound = loadSound('/views/TowerDefense/assets/sounds/buttonSound.mp3');
    towerSelectedSound = loadSound('/views/TowerDefense/assets/sounds/towerSelectedSound.mp3');
    //images
    backgroundImg = loadImage('/views/TowerDefense/assets/images/background.jpg');
    backgroundBlankImg = loadImage('/views/TowerDefense/assets/images/backgroundBlank.jpg');
    plotImg = loadImage('/views/TowerDefense/assets/images/emptyPlot.png');
    score.coinIMG = loadImage(`/views/TowerDefense/assets/images/coin.svg`);
    crown = loadImage(`/views/TowerDefense/assets/images/crown.png`);
    leftArrow = loadImage('/views/TowerDefense/assets/images/leftArrow.png');
    rightArrow = loadImage('/views/TowerDefense/assets/images/rightArrow.png');
    for (let i = 1; i < 7; i++) {
        enemyImages[i] = loadImage(`/views/TowerDefense/assets/images/enemy${i}.png`);
    }
    for (let i = 1; i < 5; i++) {
        towerImages[i] = loadImage(`/views/TowerDefense/assets/images/tower${i}.png`);
    }
    towerImages.push(loadImage(`/views/TowerDefense/assets/images/upforce.svg`));
    towerImages.push(loadImage(`/views/TowerDefense/assets/images/uprange.svg`));
    towerImages.push(loadImage(`/views/TowerDefense/assets/images/upfreq.svg`));
    towerImages.push(loadImage(`/views/TowerDefense/assets/images/sell.svg`));
}

function setup() {
  leftArrow.resize(150, 75);
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
          musicPlaying = false;
          tutorialMusicPlaying = false;
            menuMusicPlaying = true;
            startMenuMusic.loop();
        }
    }
    if (Game.gameState === GameStates.Tutorial) {
      if(!tutorialMusicPlaying) {
        musicPlaying = false;
        menuMusicPlaying = false;
        tutorialMusicPlaying = true;
        tutorialMusic.loop();
      }
    }
    if (Game.gameState === GameStates.InGame) {
        if (!musicPlaying) {
            startMenuMusic.stop();
            menuMusicPlaying = false;
            tutorialMusicPlaying = false;
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
