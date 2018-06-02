function getPosition(t) {
    if (t < width * 5 / 6) {
        return {
            x: t,
            y: f,
            r: 90
        };
    } else if ((t >= r) && (t < r + rl)) {
        return {
            x: r,
            y: t - r + f,
            r: 180
        }
    } else if ((t >= r + rl) && (t < r + r + rl - l)) {
        return {
            x: r - (t - r - rl),
            y: s,
            r: 270
        }
    } else if ((t >= r + r + rl - l) && (t < r + r + rl - l + rl + height * 0.02)) {
        return {
            x: l,
            y: t - (r + r + rl - l) + s,
            r: 180
        }
    } else if ((t >= r + r + rl - l + rl + height * 0.02) && (t < r + r + rl - l + rl + r - l)) {
        return {
            x: t - (r + r + rl - l + rl) + l,
            y: th,
            r: 90
        }
    } else {
        return {
            x: -1000,
            y: -1000
        }
    }

}

function generateEnemies(val) {
    while (val > 0) {
        switch (true) {
            case val >= 100000:
                val -= 100000;
                Enemies.push(new Enemy(100000, 6, 0.5));
                break;
            case val >= 10000:
                val -= 10000;
                Enemies.push(new Enemy(10000, 5, 1));
                break;
            case val >= 1000:
                val -= 1000;
                Enemies.push(new Enemy(1000, 4, 1.5));
                break;
            case val >= 100:
                val -= 100;
                Enemies.push(new Enemy(100, 3, 2));
                break;
            case val >= 10:
                val -= 10;
                Enemies.push(new Enemy(10, 2, 2.5));
                break;
            case val >= 1:
                val -= 1;
                Enemies.push(new Enemy(1, 1, 3));
                break;
        }
    }
}

//CLASSES ------------------------------------------------------------------------------


class Enemy {
    constructor(value, id, speed) {
        this.xPos = 0;
        this.yPos = height / 2;
        this.radius = 25;
        this.time = Math.floor(Math.random() * -100);
        this.speed = speed;
        this.value = value;
        this.futureHealth = value;
        this.id = id;
    }
}

Enemy.prototype.hit = function (force) {
    this.value -= force;
    Game.score += Math.round(force + constrain(1000 - this.time, 0, Number.MAX_VALUE) / 100);
    Game.money += force / 3;
    if (this.value <= 0) {
        popSound.play();
        this.delete();
        //Levels up if all enemies have been killed and no new enemies are being created
        if (Enemies.length === 0 && Game.spawning === 0 && Game.gameState === GameStates.InGame) {
            Game.levelUp();
        }
    }
};
Enemy.prototype.delete = function () {
    Enemies.splice(Enemies.indexOf(this), 1);
};
Enemy.prototype.draw = function () {
    this.time += (freezeGame) ? 0 : this.speed * ENEMYSPEED;
    this.xPos = getPosition(this.time).x;
    this.yPos = getPosition(this.time).y;
    push();
    imageMode(CENTER);
    translate(this.xPos, this.yPos);
    rotate(radians(getPosition(this.time).r));
    image(enemyImages[this.id], 0, 0, 50, 50);
    pop();
    if (this.time > r + r + rl - l + rl + r - l) {
        if (leaderboard.playerName.length > 0) {
            //Go to prompt screen
            //When user submits wait and show loading
            //addLeaderboard() and wait for a result from callback
            //if error ask for again
            //Once added call game over to display leaderboard
            Game.gameOver();
            /*"Player" + Math.floor(Math.random() * 10000)*/
        }
    }
};
