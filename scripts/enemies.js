function generateEnemies(val) {
    while (val > 0) {
        switch (true) {
            case val >= 160000:
                val -= 160000;
                Enemies.push(new Enemy(100, 'orange', 0.7));
                break;
            case val >= 8000:
                val -= 8000;
                Enemies.push(new Enemy(50, 'purple', 0.9));
                break;
            case val >= 400:
                val -= 400;
                Enemies.push(new Enemy(25, 'red', 1.1));
                break;
            case val >= 20:
                val -= 20;
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
        this.time = 0;
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
        if (Enemies.length === 0 && Game.spawning === 0) {
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
    //  fill(255 / this.futureHealth * 10, 0, 0);
    ellipse(this.xPos, this.yPos, this.radius, this.radius);
    if (this.time <= 0) {
        this.delete();
    }
};

function getPosition(t) {
    let x = t;
    let y = height / 2;
    return {
        x,
        y
    };
}
