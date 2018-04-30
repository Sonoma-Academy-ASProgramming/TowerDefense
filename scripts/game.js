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
    getSpawning: () => {
        return this.spawning;
    },
    startGame: () => {
        /*Define Variables*/
        this.spawning = 10;
        this.level = 1;
        this.score = 0;
        this.money = 110;
        this.gameTime = 0;
        this.gameState = GameStates.InGame;


        /*Start Game and Clock*/
        setInterval(() => {
            this.gameTime++;
            console.log(this.spawning);
            if (this.spawning > 0) {
                this.spawning--;
                generateEnemies(level * 19);
            }
        }, 1000);
    },
    spawnEnemies: () => {
        this.spawning = 10;
    },
    levelUp: () => {
        this.level++;
        setTimeout(() => {
            Game.spawnEnemies();
        }, 2000)
    },
    gameOver: () => {
        Enemies = [];
        this.gameState = GameStates.InGame;
    }
};