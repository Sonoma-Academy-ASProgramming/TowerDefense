let GameStates = {
    'GameStart': 0,
    'InGame': 1,
    'GameOver': 2,
    'Tutorial': 3,
    'LeaderBoard': 4
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
        Enemies = [];
        Towers = [];
        UI.delete();
        Game.gameState = GameStates.GameOver;
    }
};

function MenuScreen() {
    if (mouseIsPressed) {
        Game.startGame();
    }
    push();
    fill('#736357');
    textAlign(CENTER, BOTTOM);
    textSize(100);
    text("Click to Start", width / 2, height / 2);
    pop();
}
