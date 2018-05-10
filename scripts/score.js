let score = {
    scoreHeight: 0,
    leftScoreLeft: 0,
    levelLeft: 0,
    flastInterval: 50,
    lastFlash: 0,
    progress: 21,
    lastMoney: 0,
    coinIMG: loadImage("coin.svg"),
    getSize(x) {
        if (x > 20) {
            return 28;
        }
        return -0.08 * x * x + 1.6 * x + 28;
    },
    getLevelUpYPos() {
        if (x > 0) {
            return -10000;
        }
        return (-1 + 0.0595833 * x - 0.0011875 * x * x + 7.91667 * Math.pow(10, -6) * x * x * x) * height;

    },
    drawScore() {
        this.drawscore();
        this.drawLevel();

    },
    drawscore() {
        if (Game.score - this.flastInterval >= this.lastFlash) {
            this.progress = 0;
            this.lastFlash = Math.floor(Game.score / this.flastInterval) * this.flastInterval;
        }
        this.progress += 1;
        textSize(this.getSize(this.progress));
        fill(0, 0, 0);
        text("Score: " + Game.score, this.leftScoreLeft, this.scoreHeight);
    },
    drawLevel() {
        fill(0, 0, 0);
        textSize(30);
        text("Level: " + Game.level, this.levelLeft, this.scoreHeight - height * 0.01);
    },
    drawMoney() {
        fill(0, 0, 0);
        textSize(30);
        text("Level: " + Game.level, this.levelLeft, this.scoreHeight - height * 0.01);
    }

};

/*let score = {
    scoreHeight: 0,
    leftScoreLeft: 0,
    red: 0,
    flastInterval: 50,
    lastFlash: 0,
    inc: (36-28)/(255-150)*5,
    textSize:28,
    getSize(x){
      return -0.08*x*x+1.6*x+28;
    },
    drawScore() {
        if (Game.score - this.flastInterval >= this.lastFlash) {
            this.red = 255;
            this.textSize = 36;
            this.lastFlash = Math.floor(Game.score / this.flastInterval) * this.flastInterval;
        }
        if (this.red > 150) {
            this.red -= 5;
            this.textSize -= this.inc;
            textSize((this.textSize));
            // console.log(this.textSize)
            // count++;
            console.log(count++);
        } else {
            this.red = 0;
            textSize(28);
        }
        fill(this.red, 0, 0);
        text("Score:" + Game.score, this.leftScoreLeft, this.scoreHeight);
    }
};

let count = 0;
*/