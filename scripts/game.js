let replayButton;
let exitButton;
let startButton;
let tutorialButton;
let leaderBoardButton;
let creditsButton;
let returnToMainMenuButton;

let GameStates = {
    'GameStart': 0,
    'InGame': 1,
    'GameOver': 2,
    'Tutorial': 3,
    'LeaderBoard': 4,
    'Credits': 5
};
let Game = {
    level: 1,
    score: 0,
    money: 110,
    gameTime: 0,
    gameState: GameStates.GameStart,
    spawning: 10,
    startMenu: () => {
      console.log('starting');
      Sprites = [];
      spriteCount = 0;
      console.log('partially cleared');
      console.log('cleared');
      Game.gameState = GameStates.GameStart;
      console.log(Game.gameState);
      setupStartScreen();
    },
    startGame: () => {
        /*Define Variables*/
        Game.spawning = 10;
        Game.level = 1;
        Game.score = 0;
        Game.money = 110;
        Game.gameTime = 0;
        Game.gameState = GameStates.InGame;
        backgroundSprite = new Supersprite(width / 2, height / 2, width, height);
        backgroundSprite.addImage(backgroundImg);
        backgroundSprite.onMousePressed = () => {
            UI.delete();
            selectedTower = null;
        };
        try {
            replayButton.delete();
            exitButton.delete();
        } catch (e) {

        }
        replayButton = null;
        exitButton = null;
        /*Start Game and Clock*/
        setInterval(() => {
            Game.gameTime++;
            if (Game.spawning > 0) {
                Game.spawning--;
                generateEnemies(Game.level * Game.level);
            }
        }, 1000);
        UI = new GUI();
        for (let pos of EmptyPlotPositions) {
            Towers.push(new EmptyPlot(horizontal(pos[0]), vertical(pos[1])));
        }
    },
    levelUp: () => {
        Game.level++;
        setTimeout(() => {
            Game.spawning = 10;
        }, 2000)
    },
    gameOver: () => {
        Sprites = [];
        spriteCount = 0;
        Enemies = [];
        Towers = [];
        UI.delete();
        replayButton = new Supersprite(horizontal(35), vertical(90), 200, 75, {type: 'button', text: "Replay"});
        exitButton = new Supersprite(horizontal(70), vertical(90), 200, 75, {type: 'button', text: "Leaderboard"});
        replayButton.onMousePressed = () => {
            buttonSound.play();
            Game.startGame()
        };
        exitButton.onMousePressed = () => {
          buttonSound.play();
            Game.gameState = GameStates.LeaderBoard;
        };
        Game.gameState = GameStates.GameOver;
    },
    showCredits: () => {
      Sprites = [];
      spriteCount = 0;
      returnToMainMenuButton = new Supersprite(horizontal(50), vertical(86), 200, 75, {type: 'button', text: "Back"});
      returnToMainMenuButton.onMousePressed = () => {
        buttonSound.play();
        Game.startMenu();
      }
      Game.gameState = GameStates.Credits;
    }
};

function setupStartScreen() {
  startButton = new Supersprite(horizontal(50), vertical(50), 200, 75, {type: 'button', text: "Start Game"});
  startButton.onMousePressed = () => {
    buttonSound.play();
    Game.startGame();
  };
  tutorialButton = new Supersprite(horizontal(50), vertical(62), 200, 75, {type: 'button', text: "Tutorial"});
  tutorialButton.onMousePressed = () => {
    buttonSound.play();
    window.open('https://www.roblox.com', '_blank');
  };
  leaderBoardButton = new Supersprite(horizontal(50), vertical(74), 200, 75, {type: 'button', text: "View Leaderboard"});
  leaderBoardButton.onMousePressed = () => {
    buttonSound.play();
    console.log('opening leaderboard');
  };
  creditsButton = new Supersprite(horizontal(50), vertical(86), 200, 75, {type: 'button', text: "Credits"});
  creditsButton.onMousePressed = () => {
    buttonSound.play();
    Game.showCredits();
  }
}

function StartScreen() {
  push();
  fill('#736357');
  textAlign(CENTER, BOTTOM);
  textSize(60);
  text("GAC Attack!", horizontal(50), vertical(30));
  pop();
  startButton.display();
  tutorialButton.display();
  leaderBoardButton.display();
  creditsButton.display();
}

function EndScreen() {
    replayButton.display();
    exitButton.display();
    push();
    fill('#736357');
    textAlign(CENTER, BOTTOM);
    textSize(60);
    text("Game Over!", horizontal(50), vertical(30));
    pop();
}

function CreditScreen() {
  push();
  fill('#736357');
  textAlign(CENTER, BOTTOM);
  textSize(60);
  text("GAC Attack!", horizontal(50), vertical(30));
  textSize(35);
  text("Game made by:", horizontal(50), vertical(40));
  textSize(25);
  text("Kheva Mann", horizontal(50), vertical(50));
  text("Liev Haroche", horizontal(50), vertical(60));
  text("Sean Sun", horizontal(50), vertical(70));
  pop();
  returnToMainMenuButton.display();
}
