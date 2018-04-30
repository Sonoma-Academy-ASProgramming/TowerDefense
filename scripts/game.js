let GameStates = {
    'GameStart': 0,
    'InGame': 1,
    'GameOver': 2
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
    },
    levelUp: () => {
        if (Game.gameState === GameStates.InGame) {
            Game.level++;
            setTimeout(() => {
                Game.spawning = 10;
            }, 2000)
        }
    },
    gameOver: () => {
        Enemies = [];
        Game.gameState = GameStates.GameOver;
    }
};