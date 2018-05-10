class Shoot {
    constructor(towerX, towerY, force, type, range, howManyframesForTheBulletToGetToTheEnemy) {
        this.Bullets = [];
        this.x = towerX;
        this.y = towerY;
        this.force = force || 20;
        this.range = range || 500;
        this.type = type || 0;
        // this.type = 1;
        this.time = howManyframesForTheBulletToGetToTheEnemy || 50;
    }
}

Shoot.prototype.sortEnemy = function () {
    let sortedEnemies = Enemies.slice(0).sort((a, b) => {
        return b.time - a.time;
    });
    sortedEnemies = sortedEnemies.filter((emy) => {
        let p1;
        if (ENEMYSTARTINGPOS === 0) {
            p1 = getPosition(emy.time + this.time * emy.speed * ENEMYSPEED);
        } else {
            p1 = getPosition(ENEMYSTARTINGPOS - emy.time + this.time * emy.speed * ENEMYSPEED);
        }
        return Math.sqrt((p1.x - this.x) * (p1.x - this.x) + (p1.y - this.y) * (p1.y - this.y)) < this.range;
    });
    return sortedEnemies;
};

Shoot.prototype.fire = function () {
    let enemy = null;
    let sortedEnemies = this.sortEnemy();
    for (let i = 0; i < Enemies.length; i++) {
        try {
            if (sortedEnemies[i].futureHealth > 0 && sortedEnemies[i].time - this.time > 0) {
                enemy = sortedEnemies[i];
                break;
            }
        } catch (e) {
        }
    }
    enemy.futureHealth -= this.force;
    let aimFor;
    if (ENEMYSTARTINGPOS === 0) {
        aimFor = getPosition(enemy.time + this.time * enemy.speed * ENEMYSPEED);
    } else {
        aimFor = getPosition(ENEMYSTARTINGPOS - enemy.time + this.time * enemy.speed * ENEMYSPEED);
    }
    let Xinc = (aimFor.x - this.x) / this.time,
        Yinc = (aimFor.y - this.y) / this.time;
    let newObj = {
        x: this.x,
        y: this.y,
        aimX: aimFor.x,
        aimY: aimFor.y,
        mX: aimFor.x + random(50, -50) - (aimFor.x - this.x) * .7,
        mY: aimFor.y + random(50, -50),
        frame: 0,
        inc: 1 / this.time,
        force: this.force,
        type: this.type,
        enemy
    };
    this.Bullets.push(newObj);
};

Shoot.prototype.update = function () {
    this.Bullets.forEach((item, index) => {
        // item.x += item.Xinc;
        // item.y += item.Yinc;
        item.frame += item.inc;
        //CHECK FOR COLLISION
        if (item.frame > 1) {
            item.enemy.hit(this.force);
            this.Bullets.splice(index, 1);
        }
    });
};

Shoot.prototype.draw = function () {
    this.update();
    this.Bullets.forEach((item) => {
        let pos = this.GetPos(item.frame, item.x, item.y, item.mX, item.mY, item.aimX, item.aimY);
        fill('black');
        ellipse(pos.x, pos.y, this.GetSize(item.frame));
    });
};

Shoot.prototype.GetPos = function (t, x0, y0, x1, y1, x2, y2) {
    if (this.type === 0)
        return {
            x: (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2,
            y: (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2
        };
    else if (this.type === 1)
        return {
            x: (x2 - x0) * t + x0,
            y: (y2 - y0) * t + y0,
        };
    else if (this.type === 2) {
        const a = 1;
        const b = 0.5;
        return {
            x: b * t * Math.cos(t / 50 + a) + width / 2,
            y: b * t * Math.sin(t / 50 + a) + height / 2
        };
    }
};

Shoot.prototype.GetSize = function (t) {
    const org = 5;
    if (this.type === 0) {
        const max = 20;
        return max - Math.abs(t - .5) * 2 * max + org;
    } else if (this.type === 1) {
        return org;
    }
};

Shoot.prototype.dist = function (x0, y0, x1, y1) {

};