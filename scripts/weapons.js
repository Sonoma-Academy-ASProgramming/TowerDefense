class Shoot {
    constructor(towerX, towerY, type, sprite) {
        //TOWER TYPES WEIRD WORKAROUND
        let bullTypes = [0, 1, 3, 2];
        type = bullTypes[type];
        this.Bullets = [];
        this.x = towerX;
        this.y = towerY;
        this.force = 1;
        this.range = 150;
        this.sprite = sprite;
        this.areaDamage = (type === 2) ? 0.5 : 0;
        this.areaDamageRange = (type === 2) ? 50 : 0;
        this.type = type;
        this.time = (type === 1) ? 10 : 50;
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

Shoot.prototype.getAreaDamagedEmies = function (targetEmy) {
    let sortedEnemies = Enemies.slice(0).filter((emy) => {
        let p1, p2;
        if (ENEMYSTARTINGPOS === 0) {
            p1 = getPosition(emy.time + this.time * emy.speed * ENEMYSPEED);
        } else {
            p1 = getPosition(ENEMYSTARTINGPOS - emy.time + this.time * emy.speed * ENEMYSPEED);
        }
        if (ENEMYSTARTINGPOS === 0) {
            p2 = getPosition(targetEmy.time + this.time * targetEmy.speed * ENEMYSPEED);
        } else {
            p2 = getPosition(ENEMYSTARTINGPOS - targetEmy.time + this.time * targetEmy.speed * ENEMYSPEED);
        }
        // console.log(p1,Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)));
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)) <= this.areaDamageRange;
    });
    // sortedEnemies.forEach((emy, index) => {
    //     let p1, p2;
    //     if (ENEMYSTARTINGPOS === 0) {
    //         p1 = getPosition(emy.time + this.time * emy.speed * ENEMYSPEED);
    //     } else {
    //         p1 = getPosition(ENEMYSTARTINGPOS - emy.time + this.time * emy.speed * ENEMYSPEED);
    //     }
    //     if (ENEMYSTARTINGPOS === 0) {
    //         p2 = getPosition(targetEmy.time + this.time * targetEmy.speed * ENEMYSPEED);
    //     } else {
    //         p2 = getPosition(ENEMYSTARTINGPOS - targetEmy.time + this.time * targetEmy.speed * ENEMYSPEED);
    //     }
    //     this.p1 = p1;
    //     this.p2 = p2;
    //     p1.tint = 180;
    //     p2.tint = 180;
    //     console.log("p1:"+p1.x+"  p2:"+p2.x+"  index " + index + ": " + Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)));
    // });
    // alert("");
    // console.log(p1,Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)));
// console.log(sortedEnemies);
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
    if (!enemy) {
        return;
    }
    enemy.futureHealth -= this.force;
    let areaDamagedEmies;
    if (this.type === 2) {
        areaDamagedEmies = this.getAreaDamagedEmies(enemy);
        areaDamagedEmies.forEach((item, index) => {
            Enemies[Enemies.indexOf(item)].futureHealth -= this.areaDamage;
        });
    }

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
        additionalForceToTheseEmies: areaDamagedEmies,
        type: this.type,
        enemy
    };
    let angle = Math.atan2(newObj.x - newObj.aimX, newObj.y - newObj.aimY);
    angle = angle * (180 / Math.PI);
    if (angle < 0) {
        angle = 360 + angle;
    }
    this.sprite.rotation = 360 - angle;
    this.Bullets.push(newObj);
};

Shoot.prototype.update = function () {
    this.Bullets.forEach((item, index) => {
        // item.x += item.Xinc;
        // item.y += item.Yinc;
        item.frame += item.inc;
        //CHECK FOR COLLISION
        if (item.frame > 1.0) {
            item.enemy.hit(this.force);
            if (this.type === 2) {
                // let outp = "";
                item.additionalForceToTheseEmies.forEach((emy) => {
                    // outp += emy.xPos.toString()+", ";
                    if (Enemies.indexOf(emy) > -1)
                        Enemies[Enemies.indexOf(emy)].hit(this.areaDamage);
                });
                // console.log(outp);

            }
            this.Bullets.splice(index, 1);
        }
    });
};

Shoot.prototype.draw = function () {
    this.update();
    this.Bullets.forEach((item) => {
        let pos = this.GetPos(item.frame, item.x, item.y, item.mX, item.mY, item.aimX, item.aimY);
        push();
        this.setColor(item.frame);
        ellipse(pos.x, pos.y, this.GetSize(item.frame));
        pop();
    });
};

Shoot.prototype.setColor = function (t) {
    if (this.type === 1) {
        fill(0, 0, 0);
        // console.log("1")
    } else if (this.type === 2) {
        // let alpha = (0.5-Math.abs(t - .5)) * 2 * 200 + 55;
        let a = Math.sin(t * 2 * 5 * Math.PI) * 153;
        fill(255, a, 30, 100);
        noStroke();
        // console.log("2")
    } else if (this.type === 3) {
        let alpha = 0, red = 255;
        if (t >= .25) {
            red = 255 - t * (1 / .75) * 150;
        }
        if (t >= .5) {
            alpha = 255 - ((t - .5) * 2 * 100);
        }
        fill(red, 255, 255, alpha);
        stroke(1);
    }
}

Shoot.prototype.GetPos = function (t, x0, y0, x1, y1, x2, y2) {
    if (this.type === 3) //bubble bullets && area damage bullets
        return {
            x: (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2,
            y: (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2
        };
    else if (this.type === 2 || this.type === 1) //normal bullets
        return {
            x: (x2 - x0) * t + x0,
            y: (y2 - y0) * t + y0,
        };
    else if (this.type === 4) { // feature coming in the future
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
    if (this.type === 200) {
        const max = 20;
        return max - Math.abs(t - .5) * 2 * max + org;
    } else if (this.type === 1) {
        return org;
    } else if (this.type === 3) {
        return t * 25 + 5;
    } else if (this.type === 2) {
        const max = 20;
        return 60 + t * (this.areaDamageRange - 60);
    }
};

Shoot.prototype.dist = function (x0, y0, x1, y1) {

};