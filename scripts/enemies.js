function getPosition(t) {
    if (t < width * 5 / 6) {
        return {
            x: t,
            y: f
        };
    } else if ((t >= r) && (t < r + rl)) {
        return {
            x: r,
            y: t - r + f
        }
    } else if ((t >= r + rl) && (t < r + r + rl - l)) {
        return {
            x: r - (t - r - rl),
            y: s
        }
    } else if ((t >= r + r + rl - l) && (t < r + r + rl - l + rl)) {
        return {
            x: l,
            y: t - (r + r + rl - l) + s
        }
    } else if ((t >= r + r + rl - l + rl + height * 0.02) && (t < r + r + rl - l + rl + r - l)) {
        return {
            x: t - (r + r + rl - l + rl) + l,
            y: th
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
            case val >= 10000:
                val -= 10000;
                Enemies.push(new Enemy(10000, 'orange', 0.7));
                break;
            case val >= 1000:
                val -= 1000;
                Enemies.push(new Enemy(1000, 'purple', 0.9));
                break;
            case val >= 100:
                val -= 100;
                Enemies.push(new Enemy(100, 'red', 1.1));
                break;
            case val >= 10:
                val -= 10;
                Enemies.push(new Enemy(10, 'blue', 1.3));
                break;
            case val >= 1:
                val -= 1;
                Enemies.push(new Enemy(1, 'green', 1.5));
                break;
        }
    }
}

//CLASSES ------------------------------------------------------------------------------


class Enemy {
    constructor(value, color, speed) {
        this.xPos = 0;
        this.yPos = height / 2;
        this.radius = 25;
        this.time = Math.floor(Math.random() * -100);
        this.speed = speed;
        this.value = value;
        this.futureHealth = value;
        this.color = color;
    }
}

Enemy.prototype.hit = function (force) {
    this.value -= force;
    Game.score += force;
    if (this.value <= 0) {
        popSound.play();
        this.delete();
        //Levels up if all enemies have been killed and no new enemies are being created
        if (Enemies.length === 0 && Game.getSpawning() === 0) {
            Game.levelUp();
        }
    }
};
Enemy.prototype.delete = function () {
    Enemies.splice(Enemies.indexOf(this), 1);
};
Enemy.prototype.draw = function () {
    this.time += this.speed * ENEMYSPEED;
    this.xPos = getPosition(this.time).x;
    this.yPos = getPosition(this.time).y;
    fill(this.color);
    ellipse(this.xPos, this.yPos, this.radius, this.radius);
    if (this.time > r + r + rl - l + rl + r - l) {
        Game.gameOver();
    }
};
