let score = {
    scoreHeight: 0,
    leftScoreLeft: 0,
    levelLeft: 0,
    flastInterval: 50,
    lastFlash: 0,
    progress: 21,
    lastMoney: 0,
    coinIMG: NaN,
    coinRotate: 0,
    coinLeft: 0,
    coinTop: 0,
    lastLevel: 1,
    levelUpPos: 0,
    prompts: [],
    getSize(x) {
        if (x > 20) {
            return 28;
        }
        return -0.08 * x * x + 1.6 * x + 28;
    },
    getLevelUpYPos(x) { //(0 <= x <= 100)
        if (x < 0) {
            return -10000;
        }
        return ((-1 + 0.0595833 * x - 0.0011875 * x * x + 7.91667 * Math.pow(10, -6) * x * x * x) + .5) * height;

    },
    drawScore() {
        this.drawscore();
        this.drawMoney();
        this.drawLevel();
        this.drawPrompts();
        this.drawFreezeGame();
    },
    drawPrompts() {
        if (this.prompts.length === 0) {
            return;
        }
        this.prompts.forEach((item, index, arr) => {
            push();
            let translatedAlpha = (item.alpha > 150) ? 150  : item.alpha;
            fill(115, 99, 87, item.alpha);
            // stroke(255);
            // strokeWeight(1);
            textAlign(CENTER, BOTTOM);
            textSize(60);
            text(item.text, horizontal(50), item.position);
            pop();
            item.position -= item.alpha/200;
            item.alpha -= 3;
            if (item.alpha < 0) {
                arr.splice(index, 1);
            }
        });
    },
    addPrompts(a) {
        // console.log("adding item", a);
        this.prompts.push({text: a, position: height / 5 * 3, alpha: 355})
    },
    drawFreezeGame() {
        if (freezeGame) {
            push();
            fill('red');
            textAlign(CENTER, BOTTOM);
            textSize(90);
            text("Game Over!", horizontal(50), vertical(50));
            pop();
        }
    },
    drawscore() {
        if (Game.score - this.flastInterval >= this.lastFlash) {
            this.progress = 0;
            this.lastFlash = Math.floor(Game.score / this.flastInterval) * this.flastInterval;
        }
        this.progress += 1;
        textSize(this.getSize(this.progress));
        fill('#736357');
        text("Score: " + Game.score, this.leftScoreLeft, this.scoreHeight);
    },
    drawLevel() {
        fill('#736357');
        textSize(30);
        text("Level: " + Game.level, this.levelLeft, this.coinTop);
        push();
        imageMode(CENTER);
        translate(width * 0.5 - 150, this.getLevelUpYPos(this.levelUpPos));
        textSize(150);
        rotate(radians(25));
        text("Level " + Game.level, 0, 0);
        pop();
        this.levelUpPos -= 1;
        if (this.lastLevel !== Game.level) {
            this.levelUpPos = 100;
            this.lastLevel = Game.level;
        }
    },
    drawMoney() {
        push();
        imageMode(CENTER);
        translate(this.coinLeft, this.scoreHeight - height * 0.025);
        rotate(Math.sin((this.coinRotate < 9.42) ? this.coinRotate : 0));
        image(this.coinIMG, 0, 0, 30, 30);
        pop();
        textSize(30);
        text(Math.floor(Game.money), this.coinLeft + 45, this.coinTop);
        if (this.coinRotate > 10 * 3.14) {
            this.coinRotate = 0;
        }
        this.coinRotate += 0.1;
        // console.log(this.coinRotate);
    }

};
