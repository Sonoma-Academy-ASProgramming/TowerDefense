let replayButton;
let exitButton;
let startButton;
let tutorialButton;
let leaderBoardButton;
let creditsButton;

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
    startGame: () => {
        /*Define Variables*/
        Game.spawning = 10;
        Game.level = 1;
        Game.score = 0;
        Game.money = 110;
        Game.gameTime = 0;
        Game.gameState = GameStates.InGame;
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
                generateEnemies(Game.level * 19);
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
            Game.startGame()
        };
        exitButton.onMousePressed = () => {
            Game.gameState = GameStates.LeaderBoard;
        };
        Game.gameState = GameStates.GameOver;
    },

};

function setupStartScreen() {
  startButton = new Supersprite(horizontal(50), vertical(30), 200, 75, {type: 'button', text: "Start Game"});
  startButton.onMousePressed = () => {
    Game.startGame();
  };
  tutorialButton = new Supersprite(horizontal(50), vertical(50), 200, 75, {type: 'button', text: "Tutorial"});
  tutorialButton.onMousePressed = () => {
    Window.open('https://www.roblox.com', _blank);
  };
  leaderBoardButton = new Supersprite(horizontal(50), vertical(70), 200, 75, {type: 'button', text: "View Leaderboard"});
  leaderBoardButton.onMousePressed = () => {
    console.log('opening leaderboard');
  };
  creditsButton = new Supersprite(horizontal(50), vertical(85), {type: 'button', text: "Credits"});
  creditsButton.onMousePressed = () => {
    console.log('This is a game made by some people');
  }
}

function StartScreen() {
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
