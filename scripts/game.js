//all the buttons for the menus before the game starts
let replayButton;
let exitButton;
let startButton;
let tutorialButton;
let leaderBoardButton;
let leaderBoardUpButton;
let leaderBoardDownButton;
let creditsButton;
let submitNameButton;
let cancelNameButton;
let returnToMainMenuButton;
let input;
let inputError = "";
let welcomeMessage;

let shiftRightButton;
let shiftLeftButton

let tutorial = {
    currentImage: 1,
    currentPage: 0,
    pages: [
        () => {
            push();
            fill('#736357');
            textAlign(CENTER, BOTTOM);
            textSize(40);
            text("The last cookie is under attack!", horizontal(50), vertical(40));
            textSize(30);
            text("The bugs of west papertown seek to drain the precious cookie of its chocolaty blood...", horizontal(50), vertical(50));
            text("...and only YOU can stop them!", horizontal(50), vertical(55));
            pop();
            shiftRightButton.display();
        },
        () => {
            push();
            fill('#736357');
            textAlign(CENTER, BOTTOM);
            textSize(30);
            text("You are in charge of building up a defense of towers", horizontal(50), vertical(50));
            text("We've marked all the available real estate with 'X's", horizontal(50), vertical(55));
            imageMode(CENTER);
            image(plotImg, horizontal(50), vertical(65), 100, 100);
            pop();
            shiftLeftButton.display();
            shiftRightButton.display();
        },
        () => {
            if (frameCount % 60 * 4 === 0) {
                tutorial.currentImage = Math.round(random(1, 4));
            }
            push();
            fill('#736357');
            textAlign(CENTER, BOTTOM);
            textSize(30);
            text("Click the 'X' you want to build on and then choose your tower!", horizontal(50), vertical(50));
            imageMode(CENTER);
            image(towerImages[tutorial.currentImage], horizontal(50), vertical(65), 100, 100);
            pop();
            shiftLeftButton.display();
            shiftRightButton.display();
        },
        () => {
            push();
            fill('#736357');
            textAlign(CENTER, BOTTOM);
            textSize(30);
            text("You have a limited supply of money but a shady organization with", horizontal(50), vertical(50));
            text("questionable morals will pay you for every bug squashed", horizontal(50), vertical(55));
            imageMode(CENTER);
            image(score.coinIMG, horizontal(50), vertical(65), 100, 100);
            pop();
            shiftLeftButton.display();
            shiftRightButton.display();
        },
        () => {
            push();
            fill('#736357');
            textAlign(CENTER, BOTTOM);
            textSize(40);
            text("Good luck soldier!", horizontal(50), vertical(50));
            pop();
            shiftLeftButton.display();
        }
    ]
};

let GameStates = {
    'GameStart': 0,
    'InGame': 1,
    'GameOver': 2,
    'Tutorial': 3,
    'LeaderBoard': 4,
    'Credits': 5,
    'NameEnter': 6
};
let Game = {
    level: 1,
    score: 0,
    money: 110,
    gameTime: 0,
    gameState: GameStates.GameStart,
    spawning: 10,
    startMenu: () => {
        tutorialMusic.stop();
        let messageNumber = Math.round(Math.random(welcomeMessages.length));
        welcomeMessage = welcomeMessages[messageNumber];
        Sprites = [];
        spriteCount = 0;
        Game.gameState = GameStates.GameStart;
        setupStartScreen();
    },
    tutorial: () => {
        startMenuMusic.stop();
        Sprites = [];
        spriteCount = 0;
        Game.gameState = GameStates.Tutorial;
        returnToMainMenuButton = new Supersprite(horizontal(50), vertical(86), 200, 75, {type: 'button', text: "Back"});
        returnToMainMenuButton.onMousePressed = () => {
            buttonSound.play();
            tutorial.currentPage = 0;
            Game.startMenu();
        };
        shiftLeftButton = new Supersprite(horizontal(30), vertical(65), 150, 75);
        shiftLeftButton.addImage(leftArrow);
        shiftLeftButton.onMousePressed = () => {
            if (tutorial.currentPage > 0) {
                buttonSound.play();
                tutorial.currentPage -= 1;
            }
        };
        shiftRightButton = new Supersprite(horizontal(65), vertical(65), 150, 75);
        shiftRightButton.addImage(rightArrow);
        shiftRightButton.onMousePressed = () => {
            if (tutorial.currentPage < tutorial.pages.length - 1) {
                buttonSound.play();
                tutorial.currentPage += 1;
            }
        };
    },
    startGame: () => {
        /*Define Variables*/
        Game.spawning = 10;
        Game.level = 1;
        Game.score = 0;
        Game.money = 30;
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
                let diff = Math.pow(Game.level, 2);
                if (Game.level > 10) {
                    diff /= 3
                }
                generateEnemies(diff);
            }
        }, 1000);
        UI = new GUI();
        for (let pos of EmptyPlotPositions) {
            Towers.push(new EmptyPlot(horizontal(pos[0]), vertical(pos[1])));
        }
        if (menuMusicPlaying) {
            menuMusicPlaying = false;
            startMenuMusic.stop();
        }
        if (!musicPlaying) {
            musicPlaying = true;
            backgroundMusic.loop();
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
            leaderboard.init();
            Game.startGame()
        };
        exitButton.onMousePressed = () => {
            buttonSound.play();
            Game.goLeaderboard()
        };

        if (!menuMusicPlaying) {
            menuMusicPlaying = true;
            startMenuMusic.loop();
        }
        if (musicPlaying) {
            musicPlaying = false;
            backgroundMusic.stop();
        }

        Game.gameState = GameStates.GameOver;
        leaderboard.getLeaderboard(true);
    },
    showCredits: () => {
        Sprites = [];
        spriteCount = 0;
        returnToMainMenuButton = new Supersprite(horizontal(50), vertical(86), 200, 75, {
            type: 'button',
            text: "Main Menu"
        });
        returnToMainMenuButton.onMousePressed = () => {
            buttonSound.play();
            Game.startMenu();
        };
        Game.gameState = GameStates.Credits;
    }, goLeaderboard: () => {
        leaderboard.init();
        leaderboard.getLeaderboard();
        Sprites = [];
        spriteCount = 0;
        returnToMainMenuButton = new Supersprite(horizontal(50), vertical(86), 200, 75, {
            type: 'button',
            text: "Main Menu"
        });
        leaderBoardDownButton = new Supersprite(horizontal(30), vertical(86), 200, 75, {
            type: 'button',
            text: "Last"
        });
        leaderBoardUpButton = new Supersprite(horizontal(70), vertical(86), 200, 75, {
            type: 'button',
            text: "Next"
        });
        returnToMainMenuButton.onMousePressed = () => {
            buttonSound.play();
            Game.startMenu();
        };
        leaderBoardDownButton.onMousePressed = () => {
            buttonSound.play();
            leaderboardPageDown()
        };
        leaderBoardUpButton.onMousePressed = () => {
            buttonSound.play();
            leaderboardPageUp()
        };
        if (!musicPlaying) {
            backgroundMusic.stop();
            musicPlaying = false;
        }
        if (!startMenuMusic) {
            menuMusicPlaying = true;
            startMenuMusic.loop();
        }
        Game.gameState = GameStates.LeaderBoard;
    },
    goNameEnter: () => {
        if (Game.score < 200 || isNaN(Game.score)) {
            console.log("score too low or is NaN, not submitting to leaderboard.");
            Game.gameOver();
            return;
        }

        input = createInput(`Player ${Math.floor(Math.random() * 10000)}`);
        input.position(horizontal(50), vertical(40));
        input.class('playerInput');
        input.elt.focus();
        input.elt.select();
        input.center('horizontal');
        submitNameButton = new Supersprite(horizontal(60), vertical(60), 200, 75, {type: 'button', text: "Submit"});
        cancelNameButton = new Supersprite(horizontal(40), vertical(60), 200, 75, {type: 'button', text: "Cancel"});
        cancelNameButton.onMousePressed = () => {
            buttonSound.play();
            inputError = "";
            input.remove();
            Game.gameOver();
        };
        submitNameButton.onMousePressed = () => {
            buttonSound.play();
            leaderboard.playerName = input.value();
            if (leaderboard.playerName.length >= 20) {
                inputError = "Name must be less than 20 characters.";
                return;
            }
            submitNameButton.options.text = "Submitting...";
            leaderboard.addLeaderboard().then(() => {
                inputError = "";
                input.remove();
                Game.gameOver();
            }, err => {
                inputError = err;
                submitNameButton.options.text = "Submit";
            });
        };
        Game.gameState = GameStates.NameEnter;
    }
};

function setupStartScreen() {
    let messageNumber = Math.floor(Math.random() * welcomeMessages.length);
    welcomeMessage = welcomeMessages[messageNumber];
    startButton = new Supersprite(horizontal(50), vertical(50), 200, 75, {type: 'button', text: "Start Game"});
    startButton.onMousePressed = () => {
        buttonSound.play();
        Game.startGame();
    };
    tutorialButton = new Supersprite(horizontal(50), vertical(62), 200, 75, {type: 'button', text: "Tutorial"});
    tutorialButton.onMousePressed = () => {
        buttonSound.play();
        Game.tutorial();
    };
    leaderBoardButton = new Supersprite(horizontal(50), vertical(74), 200, 75, {
        type: 'button',
        text: "View Leaderboard"
    });
    leaderBoardButton.onMousePressed = () => {
        buttonSound.play();
        Game.goLeaderboard();
    };
    creditsButton = new Supersprite(horizontal(50), vertical(86), 200, 75, {type: 'button', text: "Credits"});
    creditsButton.onMousePressed = () => {
        buttonSound.play();
        Game.showCredits();
    };
    if (!startMenuMusic) {
        startMenuMusic.loop();
        startMenuMusic = true;
    }
    if (musicPlaying) {
        musicPlaying = false;
        backgroundMusic.stop();
    }
}

function StartScreen() {
    push();
    fill('#736357');
    textAlign(CENTER, BOTTOM);
    textSize(60);
    text("GAC Attack!", horizontal(50), vertical(30));
    fill('#ff8c5e');
    textSize(Math.abs(Math.cos((frameCount * 1 / 30)) * 25) + 25);
    text(`${welcomeMessage}`, horizontal(50), vertical(38));
    pop();
    startButton.display();
    tutorialButton.display();
    leaderBoardButton.display();
    creditsButton.display();
}

function EndScreen() {
    replayButton.display();
    exitButton.display();
    if (leaderboard.dispReady) {
        // console.log(leaderboard.leaderboard);
        leaderboard.leaderboard.forEach((item, index) => {
            if (item.ranking === 1 || item.ranking === 2 || item.ranking === 3)
                image(crown, horizontal(40) - 60 + item.ranking * 4, vertical(37 + 6 * index) - 40 + item.ranking * 4, 40 - item.ranking * 8, 40 - item.ranking * 8);
            fill('#736357');
            textAlign(RIGHT, BOTTOM);
            textSize(30);
            text(item.ranking, horizontal(40), vertical(37 + 6 * index));
            textAlign(LEFT, BOTTOM);
            text(item.score, horizontal(43), vertical(37 + 6 * index));
            textAlign(LEFT, BOTTOM);
            text(item.name, horizontal(52), vertical(37 + 6 * index));
        });
    } else {
        fill('#736357');
        textAlign(CENTER, BOTTOM);
        textSize(40);
        text("Loading leaderboard...", horizontal(50), vertical(40));

    }
    // leaderboard.addLeaderboard()
    push();
    fill('#736357');
    textAlign(CENTER, BOTTOM);
    textSize(60);
    text("Game Over!", horizontal(50), vertical(30));
    pop();

}

function leaderboardPageUp() {
    if (leaderboard.leaderboard.length < leaderboard.dispSize + 1) {
        return;
    }
    leaderboard.startIdx += leaderboard.dispSize;
    leaderboard.getLeaderboard();
}

function leaderboardPageDown() {
    if (leaderboard.startIdx - leaderboard.dispSize < 1) {
        if (leaderboard.startIdx !== 1) {
            leaderboard.startIdx = 1;
        }
        return;
    } else {
        leaderboard.startIdx -= leaderboard.dispSize;
    }
    leaderboard.getLeaderboard();
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


function drawLeaderboard() {
    returnToMainMenuButton.display();
    leaderBoardUpButton.display();
    if (leaderboard.startIdx > 1) {
        leaderBoardDownButton.display();
    }
    fill('#736357');
    textAlign(CENTER, BOTTOM);
    textSize(70);
    text("Leaderboard", horizontal(50), vertical(33));
    if (leaderboard.dispReady) {
        leaderboard.leaderboard.forEach((item, index) => {
            if (item.ranking === 1 || item.ranking === 2 || item.ranking === 3)
                image(crown, horizontal(40) - 60 + item.ranking * 4, vertical(37 + 6 * index) - 40 + item.ranking * 4, 40 - item.ranking * 8, 40 - item.ranking * 8);
            fill('#736357');
            textAlign(RIGHT, BOTTOM);
            textSize(30);
            text(item.ranking, horizontal(40), vertical(37 + 6 * index));
            textAlign(LEFT, BOTTOM);
            text(item.score, horizontal(43), vertical(37 + 6 * index));
            textAlign(LEFT, BOTTOM);
            text(item.name, horizontal(52), vertical(37 + 6 * index));
        });
    } else {
        fill('#736357');
        textAlign(CENTER, BOTTOM);
        textSize(40);
        text("Loading leaderboard...", horizontal(50), vertical(40));

    }
}

function Tutorial() {
    returnToMainMenuButton.display();
    currentPage = tutorial.currentPage;
    tutorial.pages[currentPage]();
}

function drawNameEnter() {
    submitNameButton.display();
    cancelNameButton.display();
    push();
    fill('#736357');
    textAlign(CENTER, BOTTOM);
    textSize(70);
    text("Submit Score", horizontal(50), vertical(33));
    if (inputError.length > 0) {
        fill('#b8312b');
        textSize(20);
        text(inputError, horizontal(50), vertical(38));
    }
    pop();
}