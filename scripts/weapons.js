const cout = console.log;
class Shoot {
    constructor(towerX, towerY, force, type, howManyframesForTheBulletToGetToTheEnemy) {
        this.Bullets = [];
        this.x = towerX;
        this.y = towerY;
        this.force = force || 1;
        this.type = type || 0;
        // this.type = 1;
        this.time = howManyframesForTheBulletToGetToTheEnemy || 50;
    }
}

Shoot.prototype.findEnemy = function(howManyth) {
    let sortedEnemies = Enemies.slice(0).sort((a, b) => {
        return b.time - a.time;
    });
    return sortedEnemies[howManyth];
}

Shoot.prototype.fire = function() {
    // cout("firing");
    let enemy = null;
    let tmp;
    for (let i = 0; i < Enemies.length; i++) {
        try {
            tmp = this.findEnemy(i);
            if (tmp.futureHealth > 0 && tmp.time - this.time > 0) {
                enemy = tmp;
                break;
            }
        } catch (e) {}
    }
    if (!enemy) { //no valid enemies
        // cout("noemy");
        return;
    }
    enemy.futureHealth -= this.force;
    let aimFor;
    if (ENEMYSTARTINGPOS == 0) {
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
    // cout(newObj);
    // console.log(newObj)
    this.Bullets.push(newObj);
}

Shoot.prototype.update = function() {
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
}

Shoot.prototype.draw = function() {
    this.update();
    this.Bullets.forEach((item) => {
        let pos = this.GetPos(item.frame, item.x, item.y, item.mX, item.mY, item.aimX, item.aimY);
        // console.log(pos);
        fill('black');
        ellipse(pos.x, pos.y, 5, 5);
    });
}

Shoot.prototype.GetPos = function(t, x0, y0, x1, y1, x2, y2) {
    if (this.type == 0)
        return {
            x: (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2,
            y: (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2
        }
    else if (this.type == 1)
        return {
            x: (x2 - x0) * t + x0,
            y: (y2 - y0) * t + y0,
        }
}

Shoot.prototype.dist = function(x0, y0, x1, y1) {
    // Math.sqrt((item.enemy.xPos - item.x) * (item.enemy.xPos - item.x) + (item.enemy.yPos - item.y) * (item.enemy.yPos - item.y)) < item.enemy.radius / 2)

}
